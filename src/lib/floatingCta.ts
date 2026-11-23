/**
 * The floating pill's behaviour (`FloatingCta.astro`): its dark-section split and the receiver swipe.
 * Mounted from the component's script; moved here unchanged so it is
 * type-checked and testable like the rest of `lib/`.
 */
import { SHADOW_PAD, makeTwin, measureDarkRanges, splitClip, type Range } from "~/lib/darkSplit";
import { TRAVEL_MAX, isPhone, mountReceiverSwipe } from "~/lib/receiverSwipe";

export function mountFloatingCta(): void {
  /** The farthest the swipe track (and its hard shadow) reaches left of the pill. */
  const SWIPE_REACH = TRAVEL_MAX + SHADOW_PAD;
  /** How long the track takes to shrink back into the pill (CSS). */
  const TRACK_SHRINK_MS = 320;

  const group = document.querySelector<HTMLElement>(".floating-cta-group");
  const topBtn = group?.querySelector<HTMLElement>(".floating-cta-top");

  if (group) {
    /**
     * The inverted twin (see the CSS and `lib/darkSplit.ts`): laid exactly
     * over the pill and clipped, with the original, at the line of every dark
     * band — the colour changes AT the section edge, part of the pill already
     * white while the rest is still navy.
     */
    const twin = makeTwin(group, "floating-cta-group--twin");
    group.after(twin);
    const twinA11y = twin.querySelector<HTMLElement>(".a11y-toggle");
    const a11y = group.querySelector<HTMLElement>(".a11y-toggle");
    // Mirror the states that change the pill's layout, so both fold alike.
    const mirror = () => {
      for (const key of ["suppressed", "scrolledDown"] as const) {
        const value = group.dataset[key];
        if (value === undefined) delete twin.dataset[key];
        else if (twin.dataset[key] !== value) twin.dataset[key] = value;
      }
      if (twinA11y && a11y) twinA11y.hidden = a11y.hidden;
    };
    new MutationObserver(mirror).observe(group, { attributes: true, subtree: true, attributeFilter: ["data-suppressed", "data-scrolled-down", "hidden"] });

    /**
     * The lane, MEASURED. The CSS values are a one-button guess and the pill
     * is up to three buttons tall: on a 390px phone it covered the footer's
     * copyright line and 18 focus stops sat partly behind it. Pill height plus
     * its `bottom` offset — not `innerHeight - rect.bottom`, which would count
     * the cookie notice's translate a second time (`--tds-bottom-lane` is
     * added separately wherever the lane is used). Inline on <html>, so it
     * overrides the CSS fallbacks above, including the `0px` ones.
     *
     * Written once the pill has SETTLED, not on every resize (2026-10-12). Its
     * slots fold with a 320 ms `grid-template-rows` transition, so the box
     * changes size every frame of a fold — and an inherited custom property on
     * <html> invalidates the style of the whole document. That was a full
     * style recalculation per frame (~300 ms each at CPU ×4) every time the
     * pill folded during a scroll: the worst jank on the page.
     */
    let lane = "";
    let laneTimer = 0;
    const LANE_SETTLE_MS = 180;
    new ResizeObserver(() => {
      window.clearTimeout(laneTimer);
      laneTimer = window.setTimeout(() => {
        const value = `${Math.ceil(group.offsetHeight + (parseFloat(getComputedStyle(group).bottom) || 0))}px`;
        if (value === lane) return;
        lane = value;
        document.documentElement.style.setProperty("--lp-floating-lane", value);
      }, LANE_SETTLE_MS);
    }).observe(group);

    /** Dark bands in page coordinates; measured, never read per frame. */
    let darkRanges: Range[] = [];
    /** The pill's box in the viewport — fixed, so it moves only on resize. */
    let box = { top: 0, bottom: 0 };

    const measure = () => {
      darkRanges = measureDarkRanges();
      const rect = group.getBoundingClientRect();
      box = { top: rect.top, bottom: rect.bottom };
    };

    // In dark mode every ground is dark, so the twin covers the whole pill.
    const documentIsDark = () =>
      document.documentElement.getAttribute("data-theme") === "dark";

    let frame = 0;
    // Compare before writing: a data-attribute write invalidates style for
    // the whole control, sixty times a second.
    const setFlag = (key: "scrolledDown" | "suppressed", on: boolean) => {
      const value = on ? "true" : "false";
      if (group.dataset[key] !== value) group.dataset[key] = value;
    };

    let lastTwin = "";
    /** The twin's clip stays wide until this time (the track shrinking back). */
    let wideUntil = 0;
    // No tucking away on phones any more (2026-10-19, asked for): the pill
    // used to slide off the right edge while the reader scrolled down, and
    // the contact action vanished exactly while someone was reading. It stays
    // put on every screen width now.
    const update = () => {
      frame = 0;
      // Fold out "Nach oben" after ~one viewport of scroll.
      setFlag("scrolledDown", window.scrollY > window.innerHeight * 0.8);

      // Pure arithmetic from here down — no layout is read during a scroll.
      // ONLY the twin is clipped. The pill itself is painted whole underneath
      // and therefore always takes the pointer — it used to be clipped to the
      // light part, which is why the receiver was dead over the contact block
      // and in the footer, the two places it is most wanted. See
      // `lib/darkSplit.ts`.
      const y = window.scrollY;
      // While the receiver is swiped, its track reaches out of the pill to
      // the left; the twin's clip has to reach as far, or the track changes
      // colour at the pill's edge instead of at the band's line.
      const reachLeft = group.dataset.swipe || performance.now() < wideUntil ? SWIPE_REACH : SHADOW_PAD;
      const clip = splitClip(y + box.top, y + box.bottom, darkRanges, documentIsDark(), reachLeft);
      if (clip !== lastTwin) twin.style.clipPath = lastTwin = clip;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    /**
     * Coalesced into the next frame: both observers below fire during a fold
     * and while lazy content changes the page height, and measuring inside the
     * observer callback forced a synchronous style + layout pass on top of the
     * frame's own.
     */
    let measureFrame = 0;
    const remeasure = () => {
      if (measureFrame) return;
      measureFrame = requestAnimationFrame(() => {
        measureFrame = 0;
        measure();
        update();
      });
    };

    measure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    // The pill grows and shrinks as its slots fold: follow its box.
    new ResizeObserver(remeasure).observe(group);

    /**
     * Fold the trunk away while the page already shows the same action: the
     * hero while it still reaches into the upper half of the viewport, the
     * contact section as soon as any of it is visible. No IntersectionObserver
     * (or neither section on this page) means nothing to wait for.
     */
    const hero = document.getElementById("hero");
    const contact = document.getElementById("contact");
    if ((hero || contact) && "IntersectionObserver" in window) {
      const onScreen = new Set<Element>();
      const record = (entries: IntersectionObserverEntry[]) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        setFlag("suppressed", onScreen.size > 0);
      };
      if (hero) {
        new IntersectionObserver(record, { rootMargin: "0px 0px -50% 0px" }).observe(hero);
      }
      if (contact) {
        new IntersectionObserver(record).observe(contact);
      }
    } else {
      setFlag("suppressed", false);
    }

    // Anything that changes the page's height moves every range below it.
    new ResizeObserver(remeasure).observe(document.documentElement);

    // Re-evaluate when the colour theme flips.
    new MutationObserver(update).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // On a smartphone the receiver is swiped left, like answering a call. The
    // twin's clip widens while it is (see `update`).
    if (isPhone()) mountReceiverSwipe(group, twin);
    // On release the track shrinks back into the pill over 300 ms; the clip
    // stays wide until it has, or the twin's half would be cut off mid-way.
    new MutationObserver(() => {
      if (!group.dataset.swipe) {
        wideUntil = performance.now() + TRACK_SHRINK_MS;
        window.setTimeout(schedule, TRACK_SHRINK_MS + 20);
      }
      schedule();
    }).observe(group, { attributes: true, attributeFilter: ["data-swipe"] });

    topBtn?.addEventListener("click", () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const bounceScroll = (window as unknown as {
        tdsScrollTo?: (target: number, opts?: { immediate?: boolean }) => void;
      }).tdsScrollTo;
      if (bounceScroll) {
        bounceScroll(0, { immediate: reduce });
      } else {
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }
    });
  }
}
