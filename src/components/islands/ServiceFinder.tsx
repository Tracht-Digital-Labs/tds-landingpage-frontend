import Arrow from "~/components/ui/Arrow";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type SyntheticEvent } from "react";
import { AnimatePresence, MotionScope, m } from "@tracht-digital-labs/tds-shared/motion/react";
import FinderOption from "./finder/FinderOption";
import FinderResult from "./finder/FinderResult";
import type { Lang } from "~/lib/i18n";
import { handOffContactDraft } from "~/lib/contactDraft";
import { recordAssistantResult } from "~/lib/productInterest";
import { FINDER_COPY } from "~/lib/serviceFinderCopy";
import {
  STAGE_IDS,
  STEP_COUNT,
  TOPIC_IDS,
  buildDraft,
  recommend,
  situationOptions,
  topicWords,
  type FinderProduct,
  type SituationChoice,
  type StageId,
  type TopicId,
} from "~/lib/serviceFinder";

interface Props {
  lang?: Lang;
  products: FinderProduct[];
  /** The contact section on the home page of this language. */
  contactHref: string;
  /** The Shop's catalogue, filtered to our own services. */
  catalogueHref: string;
}

/**
 * Leistungsassistent — see `lib/serviceFinder.ts` for what it asks and why, and
 * `components/ServiceAssistant.astro` for the dialog it lives in.
 *
 * ### Built as a form, not as a quiz widget
 *
 * - Every question is a `<fieldset>` whose `<legend>` is the question, and the
 *   answers are native checkboxes and radios inside their labels: announced,
 *   operable with Space, grouped, no ARIA to keep in sync. The inputs are only
 *   visually replaced — they stay focusable, and the ring is drawn around the
 *   whole answer card.
 * - A step change moves focus to the new question (and to the result heading),
 *   so a screen reader hears where it is and a phone does not stay scrolled
 *   below a list that is gone. Never on the first render — hydrating must not
 *   pull focus out of the page. Because a new step mounts only once the old one
 *   has left (`mode="wait"`), the focus is given by a callback ref on mount.
 * - A missing answer is said in words (`role="alert"`, tied to the group), not
 *   by a disabled button nobody can explain.
 * - It sends nothing: the result's link hands a draft to the contact form, and
 *   the dialog closes on that hand-off.
 *
 * ### Motion (2026-09-22)
 *
 * The progress fills segment by segment on a spring; a question slides in from
 * the side it is going to (forward from the right, back from the left); a
 * checked answer pops its tick; the result cards arrive one after another.
 * `initial={false}` on the presence: the first question is on screen as it
 * hydrates, never animated in from `opacity: 0`. Reduced motion (the OS, via
 * `MotionScope`, or the site's own switch) turns every one of them off.
 */
export default function ServiceFinder({ lang = "de", products, contactHref, catalogueHref }: Props) {
  const copy = FINDER_COPY[lang];
  const uid = useId();
  // 0 topics · 1 starting points · 2 stage · STEP_COUNT result
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [topics, setTopics] = useState<TopicId[]>([]);
  const [situations, setSituations] = useState<SituationChoice[]>([]);
  const [stage, setStage] = useState<StageId | null>(null);
  const [hint, setHint] = useState("");
  const firstRender = useRef(true);

  const siteMotionOff =
    typeof document !== "undefined" && document.documentElement.hasAttribute("data-a11y-motion");
  const still = siteMotionOff ? { duration: 0 } : undefined;

  const options = useMemo(() => situationOptions(topics, lang), [topics, lang]);
  const matches = useMemo(
    () => (step === STEP_COUNT ? recommend({ topics, situations, stage }, lang) : []),
    [step, topics, situations, stage, lang],
  );
  // A result shown is the visit's clearest product interest (the time-savings
  // questionnaire preselects from it).
  useEffect(() => {
    if (matches.length > 0) recordAssistantResult(matches.map((match) => match.productId));
  }, [matches]);

  /** Focus a freshly mounted question or result — never on hydration. */
  // Stable identity: an inline callback ref runs again on every render, and
  // would pull focus off the checkbox the visitor just ticked.
  const focusOnMount = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    node.focus();
  }, []);

  const toggleTopic = (id: TopicId) => {
    setHint("");
    setTopics((current) => (current.includes(id) ? current.filter((topic) => topic !== id) : [...current, id]));
  };

  const toggleSituation = (choice: SituationChoice) => {
    setSituations((current) =>
      current.some((selected) => selected.key === choice.key)
        ? current.filter((selected) => selected.key !== choice.key)
        : [...current, choice],
    );
  };

  const next = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === 0 && topics.length === 0) {
      setHint(copy.pickOne);
      return;
    }
    if (step === 2 && stage === null) {
      setHint(copy.pickStage);
      return;
    }
    if (step === 0) {
      // Starting points of a topic the visitor has since deselected are no
      // longer on offer, so they must not count either.
      const offered = new Set(situationOptions(topics, lang).map((choice) => choice.key));
      setSituations((current) => current.filter((choice) => offered.has(choice.key)));
    }
    setHint("");
    setDirection(1);
    setStep((current) => Math.min(current + 1, STEP_COUNT));
  };

  const back = () => {
    setHint("");
    setDirection(-1);
    setStep((current) => Math.max(current - 1, 0));
  };

  const restart = () => {
    setTopics([]);
    setSituations([]);
    setStage(null);
    setHint("");
    setDirection(-1);
    setStep(0);
  };

  const handOff = () => {
    handOffContactDraft(buildDraft(matches, { topics, situations, stage }, lang));
  };

  /**
   * How far a step travels, in percent of its own width — MORE than 100.
   *
   * The clip of `.finder__stage-track` is wider than a step: it reaches 8px
   * left and 12px right past the content so the cards' hard shadows and focus
   * rings are not cut (see `ServiceAssistant.astro`). A step moved by exactly
   * 100% therefore stopped with its edge and its shadow still INSIDE that
   * margin — the old step never fully left the view (reported 2026-10-05).
   * 115% clears it at every width: about 40px on a phone, 125px on desktop.
   */
  const SLIDE_TRAVEL = 115;

  /**
   * A step SWIPES: the next one comes in from the right while the one before
   * it leaves to the left, and neither fades (2026-09-28, asked for).
   *
   * What it replaced: a 48px nudge with an opacity cross-fade, which reads as
   * two cards dissolving into each other rather than as one strip moving on.
   * Without the fade the travel has to be the full width — a step appearing
   * out of nothing 48px off its resting place would be a pop, not a slide —
   * so the distance is `100%` of the stage and `.finder__stage-track` clips
   * it. THAT CLIP IS REQUIRED: the dialog is `overflow: auto`, so a step
   * standing one stage-width to the right is horizontal overflow, and a
   * scrollbar appeared across the bottom of the assistant for the length of
   * every transition.
   *
   * `popLayout` rather than `mode="wait"`: waiting plays the two halves one
   * after the other, which is a gap in the middle of what should be one
   * movement. `popLayout` takes the leaving step out of the flow so both are
   * on screen together without the incoming one being pushed down the page.
   */
  const slide = {
    enter: (dir: 1 | -1) => ({ x: `${dir * SLIDE_TRAVEL}%` }),
    center: { x: "0%" },
    exit: (dir: 1 | -1) => ({ x: `${dir * -SLIDE_TRAVEL}%` }),
  };
  /**
   * No bounce on the step slide, unlike everything else here.
   *
   * A bounce of 0.18 over 0.42s overshot the resting position by about 9px and
   * then drifted back over a further third of a second — measured at 1440px,
   * the incoming step passed its target of x=304 and sat at x=295 before
   * easing home, with the whole move taking ~770ms.
   *
   * Two things go wrong at once there. `.finder__stage-track` clips at x=296,
   * so the overshoot puts the step — and the Zurück button at its left edge —
   * a pixel OUTSIDE the clip. And the tail is long enough to read as the
   * buttons hanging against the edge after the slide has visibly finished,
   * which is what it was reported as.
   *
   * A card may overshoot; a full-width panel carrying the controls may not,
   * because its overshoot is the controls leaving their place. `bounce: 0` is
   * a critically damped spring: it arrives and stops.
   */
  const slideTransition = still ?? {
    x: { type: "spring" as const, bounce: 0, visualDuration: 0.34 },
  };

  const question = step === 0 ? copy.topicsQuestion : step === 1 ? copy.situationsQuestion : copy.stageQuestion;
  const help = step === 0 ? copy.topicsHelp : step === 1 ? copy.situationsHelp : copy.stageHelp;
  const helpId = `${uid}-help`;
  const hintId = `${uid}-hint`;
  const done = Math.min(step + 1, STEP_COUNT);

  return (
    <MotionScope>
      <div className="finder" data-step={step === STEP_COUNT ? "result" : step + 1}>
        {/* Progress: the words carry it; the segments only repeat it for the eye. */}
        <div className="finder__progress">
          <span>{step === STEP_COUNT ? copy.resultLabel : copy.progress(done, STEP_COUNT)}</span>
          <span className="finder__segments" aria-hidden="true">
            {Array.from({ length: STEP_COUNT }, (_, index) => (
              <span key={index} className="finder__segment">
                <m.i
                  initial={false}
                  animate={{ scaleX: index < done ? 1 : 0 }}
                  transition={still ?? { type: "spring", bounce: 0.3, visualDuration: 0.45 }}
                />
              </span>
            ))}
          </span>
        </div>

        {/* The clip the swipe needs — see the note on `slide`. */}
        <div className="finder__stage-track">
        <AnimatePresence initial={false} mode="popLayout" custom={direction}>
          {step === STEP_COUNT ? (
            <m.div
              key="result"
              className="finder__stage"
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
            >
              <FinderResult
                lang={lang}
                matches={matches}
                products={products}
                catalogueHref={catalogueHref}
                contactHref={contactHref}
                onHandOff={handOff}
                onRestart={restart}
                headingRef={focusOnMount}
                still={still}
              />
            </m.div>
          ) : (
            <m.form
              key={`step-${step}`}
              className="finder__stage"
              onSubmit={next}
              noValidate
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
            >
              <fieldset className="finder__fieldset" aria-describedby={hint ? `${helpId} ${hintId}` : helpId}>
                <legend ref={focusOnMount} tabIndex={-1} className="finder__question">
                  {question}
                </legend>
                <p id={helpId} className="finder__help">
                  {help}
                </p>

                <div className="finder__options">
                  {step === 0 &&
                    TOPIC_IDS.map((id) => (
                      <FinderOption
                        key={id}
                        type="checkbox"
                        name={`${uid}-topic`}
                        value={id}
                        checked={topics.includes(id)}
                        onChange={() => toggleTopic(id)}
                        {...topicWords(id, lang)}
                        still={still}
                      />
                    ))}

                  {step === 1 &&
                    options.map((choice) => (
                      <FinderOption
                        key={choice.key}
                        type="checkbox"
                        name={`${uid}-situation`}
                        value={choice.key}
                        checked={situations.some((selected) => selected.key === choice.key)}
                        onChange={() => toggleSituation(choice)}
                        label={choice.text}
                        still={still}
                      />
                    ))}

                  {step === 2 &&
                    STAGE_IDS.map((id) => (
                      <FinderOption
                        key={id}
                        type="radio"
                        name={`${uid}-stage`}
                        value={id}
                        checked={stage === id}
                        onChange={() => {
                          setHint("");
                          setStage(id);
                        }}
                        {...copy.stages[id]}
                        still={still}
                      />
                    ))}
                </div>
              </fieldset>

              {hint && (
                <p id={hintId} className="finder__hint" role="alert">
                  {hint}
                </p>
              )}

              <div className="finder__nav">
                {step > 0 && (
                  <button type="button" className="finder__secondary" onClick={back}>
                    {copy.back}
                  </button>
                )}
                <button type="submit" className="finder__cta">
                  {step === STEP_COUNT - 1 ? copy.showResult : copy.next}
                  <span aria-hidden="true"><Arrow dir="right" /></span>
                </button>
              </div>
            </m.form>
          )}
        </AnimatePresence>
        </div>
      </div>
    </MotionScope>
  );
}

