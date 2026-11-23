import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, type ContactFormData } from "@tracht-digital-labs/tds-shared/schemas";
import { runtimeSetting } from "@tracht-digital-labs/tds-shared/api";
import { Collapse, Presence } from "@tracht-digital-labs/tds-shared/motion/react";
import { contactFormCopy } from "~/lib/contactCopy";
import { LAST_STEP, STEP_FIELDS, fieldValid, firstInvalidStep, subjectFor } from "~/lib/contactSteps";
import ContactProgress from "./contact/ContactProgress";
import ContactSuccess, { type NextSteps } from "./contact/ContactSuccess";
import ConsentField from "./contact/ConsentField";
import ContactSummary from "./contact/ContactSummary";
import ReasonFields from "./contact/ReasonFields";
import StepperActions from "./contact/StepperActions";
import { FieldError, Step, TextRow, a11yFor, errorId, fieldClass, filled, rowClass } from "./contact/fields";
import { useContactDraft } from "./contact/useContactDraft";

/**
 * Where this form posts if the host has not been configured.
 *
 * Baked in by Vite at build time. `runtimeSetting("contactUrl", …)` prefers
 * whatever `/install/` wrote into `tds-runtime.json` on the host, so
 * the endpoint can be re-pointed (or routed through the same-origin proxy)
 * without a rebuild. No config on the host means this value, i.e. exactly the
 * behaviour before the wizard existed.
 */
const CONTACT_API_URL =
  (import.meta.env.PUBLIC_CONTACT_API_URL as string | undefined) ??
  "https://api.tracht-digital.de/contact";

type SubmitState = "idle" | "submitting" | "success" | "error";

type Lang = "de" | "en";

/**
 * Contact form. Posts to tds-contact-api over CORS and validates with
 * `ContactSchema` from tds-shared, so frontend and backend agree on the rules
 * (the PHP backend mirrors the same schema by hand).
 *
 * ### What changed in the 2026-09 pass, and why
 *
 * - **No `motion`.** Every field was a motion element whose server-rendered
 *   markup carried its entrance's start state, `opacity: 0`, until the island
 *   hydrated — so without JavaScript, or before `client:visible` fired, the
 *   form was an empty navy box. The fields render visible now; the only motion
 *   left is CSS the reduced-motion clamp already handles.
 * - **Errors are tied to their fields.** A message below an input used to be a
 *   loose paragraph; it is now that input's `aria-describedby`, the input says
 *   `aria-invalid`, and required fields say so. react-hook-form still moves
 *   focus to the first invalid field on submit.
 * - **One live region, for status only.** `aria-live` used to sit on the whole
 *   form, which asks a screen reader to announce every change inside it.
 * - **Success takes focus.** The form is replaced by the confirmation; focus
 *   would otherwise fall back to `<body>` and the confirmation go unheard.
 * - **The words come from `lib/contactCopy.ts`** (2026-09-15): the site
 *   addresses no one directly (2026-10-12), the shared bundle says "Sie", and
 *   the sentences that would address the visitor — errors, success, the
 *   failure message — are overridden there.
 * - **A reason dropdown, and the next steps AFTER sending** (2026-09-21). The
 *   chosen reason travels as `subject`, so the request arrives in the panel
 *   under a heading instead of as one more untitled message. And the four
 *   "what happens next" points, which used to sit above the form, now fill the
 *   confirmation (`contact/ContactSuccess.tsx`).
 *
 * The pieces live in `contact/`; the step rules in `lib/contactSteps.ts`.
 *
 * ### Why `reasons` and `nextSteps` are props
 *
 * Both are CMS-editable (`contact.reasons`, `first_call`), and resolving a
 * block means `cmsFor`, which is server-only. An island cannot call it. So
 * `sections/Contact.astro` resolves and hands the finished values down.
 */
export default function ContactForm({
  lang = "de",
  reasons = [],
  assistantReasons = {},
  nextSteps,
}: {
  lang?: Lang;
  /** Options for the reason dropdown, already resolved against the CMS. */
  reasons?: readonly string[];
  /**
   * Service id → the reason that service preselects, from
   * `sections/Contact.astro`. A prop rather than a lookup here: the options
   * are written there and are CMS-editable, so the mapping has to live beside
   * them or the two drift apart silently.
   */
  assistantReasons?: Readonly<Record<string, string>>;
  /** What happens after sending — rendered in place of the form. */
  nextSteps?: NextSteps;
}) {
  const copy = contactFormCopy(lang);

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  // The emergency checkbox. Not a form field: `ContactSchema` knows no such
  // key and zodResolver would drop it. It marks the subject instead.
  const [urgent, setUrgent] = useState(false);
  const shake = useShake();
  // The stepper: which step shows, and how far the visitor has come.
  const [stage, setStage] = useState(0);
  const [reached, setReached] = useState(0);
  const movedRef = useRef(false);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { consent: undefined as unknown as true },
  });

  useContactDraft({ getValues, setValue, reasons, assistantReasons });

  // A step change moves focus to the new step's legend; never on hydration.
  useEffect(() => {
    if (!movedRef.current) return;
    document.getElementById(`contact-step-${stage + 1}`)?.focus();
  }, [stage]);

  const goTo = (index: number) => {
    movedRef.current = true;
    setStage(index);
    setReached((value) => Math.max(value, index));
  };

  const next = async () => {
    const fields = [...STEP_FIELDS[stage]!];
    if (fields.length > 0 && !(await trigger(fields))) return;
    goTo(Math.min(stage + 1, LAST_STEP));
  };

  /** After a failed submit, show the first step that holds an error. */
  const onInvalid = (invalid: Partial<Record<string, unknown>>) => {
    const first = firstInvalidStep(invalid);
    if (first >= 0 && first !== stage) goTo(first);
  };

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState("submitting");
    try {
      // Resolved on submit, not at mount: the config is one memoised request
      // and this keeps it off the critical path of a page most visitors never
      // submit anything on.
      const endpoint = await runtimeSetting("contactUrl", CONTACT_API_URL);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, subject: subjectFor(data.subject, urgent, copy.urgentSubject), lang }),
        // A hanging endpoint left the form in "submitting" for good, with the
        // button disabled and nothing to say why. 20s, then the error view.
        signal: AbortSignal.timeout(20_000),
      });
      if (res.ok) {
        setSubmitState("success");
        return;
      }
    } catch {
      // Unreachable or timed out: the same error view as a refusal.
    }
    setSubmitState("error");
    shake.start();
  };

  const submitting = submitState === "submitting";
  const [nameValue, emailValue, companyValue, subjectValue, messageValue] = watch([
    "name",
    "email",
    "company",
    "subject",
    "message",
  ]);
  const { steps, stepper } = copy;
  const nameOk = fieldValid("name", nameValue);
  const emailOk = fieldValid("email", emailValue);
  const messageOk = fieldValid("message", messageValue);
  const doneSteps = [nameOk && emailOk, Boolean(subjectValue || urgent), messageOk];

  const form = (
    <div className={shake.on ? "shake" : ""}>
      {/* `data-motion-stagger`: the rows — the reason dropdown among them —
          arrive one after another as the form scrolls in (lib/motion/ux.ts,
          vanilla Motion on this markup, off screen only). The honeypot is
          `aria-hidden` and skipped, or the fade would reveal it. */}
      <form
        onSubmit={(event) => {
          // Enter in an early step moves on instead of sending.
          if (stage < LAST_STEP) {
            event.preventDefault();
            void next();
            return;
          }
          void handleSubmit(onSubmit, onInvalid)(event);
        }}
        className="contact-form space-y-6"
        noValidate
        data-motion-stagger
        data-track-form="contact"
      >
        <div
          style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
          aria-hidden="true"
        >
          <label htmlFor="website">Website</label>
          <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <ContactProgress
          titles={steps}
          stage={stage}
          reached={reached}
          done={doneSteps}
          label={stepper.progress(stage + 1, steps.length)}
          onGo={goTo}
        />

        <Step number={1} title={steps[0]} done={doneSteps[0]!} current={stage === 0}>
          <div className="contact-form-pair">
            <TextRow
              id="name"
              label={copy.form.name}
              icon="name"
              autoComplete="name"
              required
              placeholder={copy.form.namePlaceholder}
              ok={nameOk}
              errorText={copy.errors.name}
              invalid={Boolean(errors.name)}
              input={register("name")}
            />
            <TextRow
              id="email"
              label={copy.form.email}
              icon="email"
              type="email"
              autoComplete="email"
              required
              placeholder={copy.form.emailPlaceholder}
              ok={emailOk}
              errorText={copy.errors.email}
              invalid={Boolean(errors.email)}
              input={register("email")}
            />
          </div>
          <TextRow
            id="company"
            label={copy.form.company}
            icon="company"
            autoComplete="organization"
            placeholder={copy.form.companyPlaceholder}
            ok={fieldValid("company", companyValue)}
            input={register("company")}
          />
        </Step>

        <Step number={2} title={steps[1]} done={doneSteps[1]!} current={stage === 1}>
          <ReasonFields
            copy={copy}
            reasons={reasons}
            chosen={Boolean(subjectValue)}
            input={register("subject")}
            urgent={urgent}
            onUrgent={setUrgent}
          />
        </Step>

        <Step number={3} title={steps[2]} done={doneSteps[2]!} grow current={stage === 2}>
          <ContactSummary
            title={stepper.summary}
            edit={stepper.edit}
            rows={[
              { step: steps[0], values: [nameValue, emailValue, companyValue] },
              { step: steps[1], values: [subjectValue, urgent ? copy.urgentLabel : ""] },
            ]}
            onGo={goTo}
          />
          <div className={`${rowClass(Boolean(errors.message))} contact-field-row--message`} data-filled={filled(messageOk)}>
            <label htmlFor="message" className="contact-field-label">
              {copy.form.message}
            </label>
            {/* The guidance is a real element, not the placeholder: a
                placeholder vanishes with the first keystroke, which is when the
                visitor still needs to know what to write. Tied to the field with
                `aria-describedby`, alongside the error when there is one. */}
            <p id="contact-message-hint" className="contact-field-hint">
              {copy.messageHint}
            </p>
            <textarea
              id="message"
              rows={6}
              required
              className={`${fieldClass} resize-none`}
              {...a11yFor("message", Boolean(errors.message))}
              // Overrides the `aria-describedby` from `a11yFor` deliberately:
              // the hint applies whether or not there is an error, so when there
              // IS one the field has to point at both, in reading order.
              aria-describedby={
                errors.message
                  ? `contact-message-hint ${errorId("message")}`
                  : "contact-message-hint"
              }
              {...register("message")}
            />
            <FieldError field="message" show={Boolean(errors.message)}>
              {copy.errors.message}
            </FieldError>
          </div>

          <ConsentField copy={copy} invalid={Boolean(errors.consent)} input={register("consent")} />

          <Collapse open={submitState === "error"}>
            <p id="contact-form-error" className="contact-field-error text-sm" role="alert">
              {copy.failure}
              <a href={`mailto:${copy.email}`} className="underline">
                {copy.email}
              </a>
            </p>
          </Collapse>
        </Step>

        <StepperActions
          canGoBack={stage > 0}
          isLast={stage === LAST_STEP}
          submitting={submitting}
          labels={{
            back: stepper.back,
            next: stepper.next,
            submit: copy.form.submit,
            submitting: copy.form.submitting,
          }}
          onBack={() => goTo(stage - 1)}
          onNext={() => void next()}
        />

        {/* Status only — the error above is its own `role="alert"`. */}
        <p className="sr-only" aria-live="polite">
          {submitting ? copy.form.submitting : ""}
        </p>
      </form>
    </div>
  );

  // Form -> thank-you: a cross-fade rather than a cut. Server-rendered as the
  // form, never hidden (Presence does not animate its first mount).
  return (
    <Presence view={submitState === "success" ? "success" : "form"}>
      {submitState === "success" ? <ContactSuccess copy={copy} nextSteps={nextSteps} /> : form}
    </Presence>
  );
}

/** The 600ms shake after a failed send; a repeat restarts it. */
function useShake() {
  const [on, setOn] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const start = () => {
    if (timer.current) clearTimeout(timer.current);
    setOn(true);
    timer.current = setTimeout(() => setOn(false), 600);
  };
  return { on, start };
}
