/**
 * The hero's card wheel: drag, spring and its own slow turn (`ui/HeroCarousel.astro`).
 * Mounted from the component's script; moved here unchanged so it is
 * type-checked and testable like the rest of `lib/`.
 */
import { lessMotion } from "~/lib/a11yPrefs";
import { projectedDistance, velocityTracker } from "~/lib/momentum";
import { releaseTarget, slotAt, stepSpring, HAND_SPRING, IDLE_SPRING } from "~/lib/heroWheel";

export function mountHeroCarousel(): void {
  /** How long the front card rests before the wheel turns on its own. */
  const REST_MS = 11000;
  /** Pointer travel before a press becomes a drag (a click stays a click). */
  const SLOP_PX = 6;
  /** Pixels over which a card fades out toward an edge: narrow, so the front
      card (about 3.5rem from the window at 1024 px) never dims. */
  const FADE_PX = 48;

  document.querySelectorAll<HTMLElement>("[data-hero-carousel]").forEach((root) => {
    const cards = [...root.querySelectorAll<HTMLElement>("[data-hero-card]")];
    const n = cards.length;
    if (n < 3) return;
    const half = Math.floor(n / 2);
    const homes = cards.map((card) => Number(card.style.getPropertyValue("--slot")) || 0);
    const wheel = root.querySelector<HTMLElement>(".hero-carousel__wheel")!;
    /** Pixels of drag per card: a fifth of the hero, at least 160. */
    const pxPerCard = () => Math.max(160, wheel.clientWidth * 0.2);

    // The ONE number the wheel is: its position in cards. Hand, spring and the
    // wheel's own turn all move this, so a press in mid-turn holds the wheel
    // where it is. It used to be CSS transitions on a slot, and taking the
    // transition away for a drag dropped every card onto its target at once.
    let position = 0;
    let target = 0;
    let velocity = 0;
    let spring = IDLE_SPRING;
    let frame = 0;
    let last = 0;

    let onScreen = false;
    let hovered = false;
    let focused = false;
    let dragging = false;
    let timer = 0;

    const hero = root.closest<HTMLElement>(".hero") ?? root.parentElement ?? root;
    const links = cards.map((card) => card.querySelector<HTMLElement>(".hero-carousel__link"));

    /** Never a card cut off by an edge (2026-11-04): the hero clips at its own
        box and the window at its width, so a card fades out as it nears
        either and is gone by the time it would touch it. All writes first,
        then all reads: one layout per frame, not one per card. */
    const fadeAtEdges = () => {
      const box = hero.getBoundingClientRect();
      const right = Math.min(box.right, document.documentElement.clientWidth);
      const left = Math.max(box.left, 0);
      const fades = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        if (!rect.width) return 1;
        const inside = Math.min(rect.left - left, right - rect.right, rect.top - box.top, box.bottom - rect.bottom);
        return Math.max(0, Math.min(1, inside / FADE_PX));
      });
      fades.forEach((fade, i) => links[i]?.style.setProperty("--hc-fade", fade.toFixed(3)));
    };

    const paint = () => {
      cards.forEach((card, i) => {
        const slot = slotAt(homes[i]!, position, n);
        card.style.setProperty("--slot", slot.toFixed(4));
        const nearest = Math.round(slot);
        const depth = String(Math.min(Math.abs(nearest), 3));
        if (card.dataset.depth === depth && card.dataset.nearest === String(nearest)) return;
        card.dataset.depth = depth;
        card.dataset.nearest = String(nearest);
        if (nearest === 0) delete card.dataset.side;
        else card.dataset.side = nearest < 0 ? "left" : "right";
        const front = nearest === 0;
        card.querySelector("a")?.setAttribute("tabindex", front ? "0" : "-1");
        if (front) card.removeAttribute("aria-hidden");
        else card.setAttribute("aria-hidden", "true");
      });
      fadeAtEdges();
    };

    // The resting pose needs its fades too, and a resize or a scroll (the
    // carousel leaves with the copy) moves the cards against the edges.
    let refade = 0;
    const queueFade = () => {
      if (refade || !onScreen) return;
      refade = requestAnimationFrame(() => {
        refade = 0;
        fadeAtEdges();
      });
    };
    fadeAtEdges();
    window.addEventListener("resize", queueFade, { passive: true });
    window.addEventListener("scroll", queueFade, { passive: true });

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const next = stepSpring(position, velocity, target, spring, dt);
      position = next.position;
      velocity = next.velocity;
      paint();
      frame = next.settled ? 0 : requestAnimationFrame(tick);
    };
    const run = () => {
      if (lessMotion()) {
        position = target;
        velocity = 0;
        paint();
        return;
      }
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const hold = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      velocity = 0;
    };

    const running = () => onScreen && !hovered && !focused && !dragging && !document.hidden && !lessMotion();
    const schedule = () => {
      window.clearTimeout(timer);
      if (!running()) return;
      timer = window.setTimeout(() => {
        spring = IDLE_SPRING;
        target = Math.round(target) + 1;
        run();
        schedule();
      }, REST_MS);
    };

    // --- The pointer: drag to turn, click a neighbour to bring it forward.
    let press: { id: number; x: number; from: number; origin: number } | null = null;
    const tracker = velocityTracker();
    let swallowClick = false;

    wheel.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || !(event.target as Element).closest("[data-hero-card]")) return;
      // The wheel may still be moving: it stops where it is, under the hand.
      hold();
      swallowClick = false;
      press = { id: event.pointerId, x: event.clientX, from: position, origin: Math.round(position) };
      tracker.reset();
      tracker.push(event.clientX, event.timeStamp);
    });
    wheel.addEventListener("pointermove", (event) => {
      if (!press || event.pointerId !== press.id) return;
      const dx = event.clientX - press.x;
      if (!dragging) {
        if (Math.abs(dx) < SLOP_PX) return;
        // Capture only past the slop: captured from the press, a plain click
        // would never reach the card.
        dragging = true;
        wheel.setPointerCapture(event.pointerId);
        root.dataset.dragging = "";
        window.clearTimeout(timer);
      }
      position = press.from - dx / pxPerCard();
      paint();
      tracker.push(event.clientX, event.timeStamp);
    });
    const release = (event: PointerEvent, cancelled: boolean) => {
      if (!press || event.pointerId !== press.id) return;
      // A cancelled pointer reports no usable position, so the last move counts.
      const speed = cancelled ? 0 : tracker.release(event.timeStamp);
      const { origin } = press;
      press = null;
      spring = HAND_SPRING;
      if (!dragging) {
        run();
        return;
      }
      dragging = false;
      swallowClick = !cancelled;
      delete root.dataset.dragging;
      const coast = lessMotion() ? 0 : projectedDistance(speed);
      target = releaseTarget({ position, origin, coast: -coast / pxPerCard(), limit: half });
      // The hand's speed carries into the spring: no stop between the two.
      velocity = lessMotion() ? 0 : (-speed * 1000) / pxPerCard();
      run();
      schedule();
    };
    wheel.addEventListener("pointerup", (event) => release(event, false));
    wheel.addEventListener("pointercancel", (event) => release(event, true));

    wheel.addEventListener(
      "click",
      (event) => {
        if (swallowClick) {
          swallowClick = false;
          event.preventDefault();
          return;
        }
        const card = (event.target as Element).closest<HTMLElement>("[data-hero-card]");
        if (!card) return;
        const slot = Math.round(slotAt(homes[cards.indexOf(card)] ?? 0, position, n));
        if (slot === 0) return; // The front card is a link.
        event.preventDefault();
        spring = HAND_SPRING;
        target = Math.round(position) + slot;
        run();
        schedule();
      },
      true,
    );

    root.addEventListener("pointerenter", () => {
      hovered = true;
      schedule();
    });
    root.addEventListener("pointerleave", () => {
      hovered = false;
      schedule();
    });
    root.addEventListener("focusin", () => {
      focused = true;
      schedule();
    });
    root.addEventListener("focusout", (event) => {
      if (root.contains(event.relatedTarget as Node | null)) return;
      focused = false;
      schedule();
    });
    document.addEventListener("visibilitychange", schedule);
    new MutationObserver(schedule).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-a11y-motion"],
    });
    new IntersectionObserver((entries) => {
      onScreen = entries.some((entry) => entry.isIntersecting);
      schedule();
    }).observe(root);
  });
}
