/**
 * The time-savings calculator's behaviour (`sections/TimeSavings.astro`).
 * Mounted from the component's script; moved here unchanged so it is
 * type-checked and testable like the rest of `lib/`.
 */
import { lessMotion } from "~/lib/a11yPrefs";
import { handOffContactDraft } from "~/lib/contactDraft";
import { PHONE_QUERY, keepInView } from "~/lib/keepInView";
import { formatSavings, savings, savingsDraft, type SavingsInput } from "~/lib/savingsCalculator";

export function mountTimeSavings(): void {
  const COUNT_MS = 900;
  const easeOut = (t: number) => 1 - (1 - t) ** 3;

  for (const form of document.querySelectorAll<HTMLFormElement>("[data-savings]")) {
    const section = form.closest("section");
    const plate = section?.querySelector<HTMLElement>("[data-savings-result-plate]");
    if (!section || !plate) continue;
    const lang = form.dataset.lang === "en" ? "en" : "de";
    const ring = Number(section.querySelector<SVGCircleElement>("[data-savings-arc]")?.dataset.ring ?? 0);
    const pendingCopy = section.querySelector<HTMLElement>("[data-savings-pending]")?.textContent ?? "";
    const ctaLabel = section.querySelector<HTMLElement>("[data-savings-cta-label]");
    const ctaCopy = ctaLabel?.textContent ?? "";
    const tracks = [...form.querySelectorAll<HTMLElement>("[data-savings-track]")];

    const read = (): SavingsInput | null => {
      const data = new FormData(form);
      const value = (name: string) => (data.has(name) ? Number(data.get(name)) : Number.NaN);
      const input = { minutes: value("minutes"), perWeek: value("perWeek"), share: value("share") };
      return Object.values(input).every(Number.isFinite) ? input : null;
    };

    // The gliding pill: measured in the change handler or a task after a
    // resize, never inside a frame or an observer callback (motion.md).
    const place = (track: HTMLElement, instant: boolean) => {
      const checked = track.querySelector<HTMLInputElement>("input:checked");
      const target = checked?.nextElementSibling as HTMLElement | null;
      track.closest("fieldset")?.toggleAttribute("data-answered", !!checked);
      if (!target) {
        track.removeAttribute("data-chosen");
        return;
      }
      const first = !track.hasAttribute("data-chosen");
      if (instant || first) track.setAttribute("data-instant", "");
      // Relative to the track's padding box (the label is the span's offset
      // parent, so offsetLeft would always read 0).
      const box = track.getBoundingClientRect();
      const spot = target.getBoundingClientRect();
      track.style.setProperty("--thumb-x", `${spot.left - box.left - track.clientLeft}px`);
      track.style.setProperty("--thumb-y", `${spot.top - box.top - track.clientTop}px`);
      track.style.setProperty("--thumb-w", `${target.offsetWidth}px`);
      track.style.setProperty("--thumb-h", `${target.offsetHeight}px`);
      if (instant || first) {
        void track.offsetWidth;
        track.removeAttribute("data-instant");
      }
      // A first choice pops the pill in from its place (scale, bounce).
      track.setAttribute("data-chosen", "");
    };
    let resizeTask = 0;
    const replaceAll = () => {
      window.clearTimeout(resizeTask);
      resizeTask = window.setTimeout(() => tracks.forEach((track) => place(track, true)), 60);
    };
    form.setAttribute("data-glide", "");
    new ResizeObserver(replaceAll).observe(form);
    void document.fonts?.ready.then(replaceAll);

    // Counting numbers: only the aria-hidden twins move; the sentence for
    // screen readers is written once, with the final values.
    const shown = { year: 0, days: 0 };
    let frame = 0;
    const paint = (year: number, days: number) => {
      for (const node of section.querySelectorAll<HTMLElement>('[data-savings-count="year"]')) node.textContent = formatSavings(year, lang);
      for (const node of section.querySelectorAll<HTMLElement>('[data-savings-count="days"]')) node.textContent = formatSavings(days, lang);
    };
    const countTo = (year: number, days: number) => {
      cancelAnimationFrame(frame);
      const from = { ...shown };
      if (lessMotion()) {
        Object.assign(shown, { year, days });
        paint(year, days);
        return;
      }
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / COUNT_MS, 1);
        const k = easeOut(t);
        shown.year = from.year + (year - from.year) * k;
        shown.days = from.days + (days - from.days) * k;
        // Hours round to whole numbers while counting, so the digits settle.
        paint(t < 1 && shown.year >= 10 ? Math.round(shown.year) : shown.year, shown.days);
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    let wasReady = false;
    const update = (event?: Event) => {
      const target = event?.target as HTMLInputElement | undefined;
      const track = target?.closest<HTMLElement>("[data-savings-track]");
      if (track) place(track, false);

      const answered = tracks.filter((item) => item.querySelector("input:checked")).length;
      for (const dot of section.querySelectorAll<HTMLElement>("[data-savings-dot]")) {
        dot.toggleAttribute("data-on", !!form.querySelector(`input[name="${dot.dataset.savingsDot}"]:checked`));
      }
      const input = read();
      const figures = section.querySelector<HTMLElement>("[data-savings-figures]");
      const pending = section.querySelector<HTMLElement>("[data-savings-pending]");
      const legend = section.querySelector<HTMLElement>("[data-savings-legend]");
      const handoff = section.querySelector<HTMLElement>("[data-savings-handoff]");
      const arc = section.querySelector<SVGCircleElement>("[data-savings-arc]");
      const label = section.querySelector<SVGTitleElement>("[data-savings-chart-label]");
      const announce = section.querySelector<HTMLElement>("[data-savings-announce]");
      plate.dataset.state = input ? "ready" : "pending";
      if (figures) figures.hidden = !input;
      if (legend) legend.hidden = !input;
      if (handoff) handoff.hidden = !input;
      if (pending) {
        pending.hidden = !!input;
        const left = 3 - answered;
        pending.textContent = left === 1 ? (form.dataset.pendingOne ?? "") : left === 2 ? (form.dataset.pendingTwo ?? "") : pendingCopy;
      }
      if (ctaLabel) ctaLabel.textContent = input ? (ctaLabel.dataset.ready ?? ctaCopy) : ctaCopy;

      if (!input) {
        arc?.setAttribute("stroke-dasharray", `0 ${ring}`);
        cancelAnimationFrame(frame);
        Object.assign(shown, { year: 0, days: 0 });
        if (label) label.textContent = pendingCopy;
        wasReady = false;
        return;
      }
      const result = savings(input);
      for (const key of ["year", "rest"] as const) {
        for (const node of section.querySelectorAll<HTMLElement>(`[data-savings-value="${key}"]`)) {
          node.textContent = formatSavings(result[key], lang);
        }
      }
      // At least a sliver, so a small saving still shows on the ring.
      const slice = result.year > 0 ? Math.max(result.yearShare, 0.015) : 0;
      arc?.setAttribute("stroke-dasharray", `${(ring * slice).toFixed(2)} ${ring}`);
      countTo(result.year, result.days);
      const sentence = (form.dataset.chartLabel ?? "")
        .replace("{year}", formatSavings(result.year, lang))
        .replace("{days}", formatSavings(result.days, lang))
        .replace("{work}", formatSavings(Number(form.dataset.workHours ?? 0), lang));
      if (label) label.textContent = sentence;
      if (announce) announce.textContent = sentence;

      // The third answer on a phone: show the plate down to the button, once.
      if (!wasReady && event && window.matchMedia(PHONE_QUERY).matches) {
        const row = plate.querySelector<HTMLElement>(".savings-chart-row");
        const action = plate.querySelector<HTMLElement>(".savings-action");
        if (row && action) keepInView(row, action, 120);
      }
      wasReady = true;
    };
    form.addEventListener("change", update);
    form.addEventListener("submit", (event) => event.preventDefault());
    section.querySelector("[data-savings-cta]")?.addEventListener("click", () => {
      const input = read();
      if (input) handOffContactDraft({ message: savingsDraft(form.dataset.draft ?? "", input, lang), service: "process" });
    });
    // Answers the browser restored (back navigation) show at once, no count.
    for (const track of tracks) place(track, true);
    const restored = read();
    if (restored) {
      const result = savings(restored);
      Object.assign(shown, { year: result.year, days: result.days });
    }
    update();
  }
}
