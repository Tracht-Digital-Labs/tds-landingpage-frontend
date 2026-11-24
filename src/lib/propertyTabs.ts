/**
 * The bookmarks' behaviour (`PropertyTabs.astro`): their dark-section split.
 * Mounted from the component's script; moved here unchanged so it is
 * type-checked and testable like the rest of `lib/`.
 */
import { makeTwin, measureDarkRanges, splitClip, type Range } from "~/lib/darkSplit";

export function mountPropertyTabs(): void {
  // The inverted twin (see the CSS above and `lib/darkSplit.ts`), clipped
  // with the original at the line of every full-bleed dark band — the colour
  // changes at the section edge, not all at once. Bands are measured once and
  // again only when the page's height changes; a scroll frame is arithmetic.
  const nav = document.querySelector<HTMLElement>("[data-property-tabs]");
  if (nav && window.matchMedia("(min-width: 64rem) and (hover: hover) and (pointer: fine)").matches) {
    const twin = makeTwin(nav, "property-tabs--twin");
    nav.after(twin);

    let ranges: Range[] = [];
    let box = { top: 0, bottom: 0 };
    const measure = () => {
      // Only grounds that reach the left edge the tabs sit on — a navy card
      // inside the content column never passes behind them.
      ranges = measureDarkRanges((element) => element.getBoundingClientRect().left < 48);
      const rect = nav.getBoundingClientRect();
      box = { top: rect.top, bottom: rect.bottom };
    };
    let frame = 0;
    let lastTwin = "";
    const update = () => {
      frame = 0;
      // ONLY the twin is clipped. The nav underneath is painted whole and
      // therefore always takes the pointer — it used to be clipped to the
      // light part, which is why a white bookmark could not be clicked at all
      // (the twin over it is `inert` by design). See `lib/darkSplit.ts`.
      const y = window.scrollY;
      const clip = splitClip(y + box.top, y + box.bottom, ranges);
      if (clip !== lastTwin) twin.style.clipPath = lastTwin = clip;
    };
    measure();
    update();
    window.addEventListener("scroll", () => {
      if (!frame) frame = requestAnimationFrame(update);
    }, { passive: true });
    const remeasure = () => {
      measure();
      update();
    };
    window.addEventListener("resize", remeasure);
    new ResizeObserver(remeasure).observe(document.documentElement);

    /**
     * Warm the property a visitor is reaching for, before they click
     * (2026-09-28, asked for).
     *
     * Each bookmark leads to a DIFFERENT ORIGIN — the journal, the tools, the
     * portal, the shop — so the cost of the first click is mostly DNS and a
     * TLS handshake to a host the browser has never spoken to. `preconnect`
     * removes exactly that, and it is the part that works cross-origin
     * without the other site having to agree to anything. `prefetch` for the
     * document is added beside it and is a bonus: a browser may decline it
     * for a cross-origin navigation, and nothing here depends on it.
     *
     * It lives in this file rather than in the motion layer because it must
     * happen with the runtime absent, under reduced motion, and on the very
     * first pointer move — none of which the motion layer guarantees.
     */
    const warmed = new Set<string>();
    const warm = (tab: HTMLAnchorElement) => {
      const href = tab.href;
      if (!href || warmed.has(href)) return;
      warmed.add(href);
      let origin: string;
      try {
        origin = new URL(href).origin;
      } catch {
        return;
      }
      const head = document.head;
      const preconnect = document.createElement("link");
      preconnect.rel = "preconnect";
      preconnect.href = origin;
      // Without it the handshake is opened on a second, uncredentialed
      // connection and the navigation still pays for its own.
      preconnect.crossOrigin = "use-credentials";
      head.append(preconnect);

      const prefetch = document.createElement("link");
      prefetch.rel = "prefetch";
      prefetch.href = href;
      prefetch.as = "document";
      head.append(prefetch);
    };

    const anchors = Array.from(nav.querySelectorAll<HTMLAnchorElement>("[data-property-tab]"));
    for (const tab of anchors) {
      tab.addEventListener("pointerenter", () => warm(tab));
      tab.addEventListener("focus", () => warm(tab));
    }

    /**
     * Near, not on: the pointer coming within reach of the left edge warms the
     * bookmark it is level with. One rAF per move at most, and the boxes are
     * read once — the tabs are `position: fixed` in a column that only moves
     * when the window resizes.
     */
    let rows: Array<{ tab: HTMLAnchorElement; middle: number }> = [];
    const measureRows = () => {
      rows = anchors.map((tab) => {
        const rect = tab.getBoundingClientRect();
        return { tab, middle: rect.top + rect.height / 2 };
      });
    };
    measureRows();
    window.addEventListener("resize", measureRows);

    const REACH_X = 220;
    let pending = 0;
    window.addEventListener(
      "pointermove",
      (event) => {
        if (event.pointerType !== "mouse" || event.clientX > REACH_X) return;
        if (pending) return;
        pending = requestAnimationFrame(() => {
          pending = 0;
          let best: HTMLAnchorElement | null = null;
          let bestDistance = Infinity;
          for (const row of rows) {
            const distance = Math.abs(event.clientY - row.middle);
            if (distance < bestDistance) {
              bestDistance = distance;
              best = row.tab;
            }
          }
          if (best) warm(best);
        });
      },
      { passive: true },
    );
  }
}
