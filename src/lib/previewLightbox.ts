/**
 * The preview lightbox's behaviour (`ui/PreviewLightbox.astro`).
 * Mounted from the component's script; moved here unchanged so it is
 * type-checked and testable like the rest of `lib/`.
 */
import { animatedDialog } from "~/lib/motion/dialog";

export function mountPreviewLightbox(): void {
  /**
   * Wire every magnifier in a section to that section's one dialog.
   *
   * Scoped per section rather than per document so a second shelf on a future
   * page gets its own dialog instead of quietly driving the first one's.
   */

  const dialogs = document.querySelectorAll<HTMLDialogElement>("[data-preview-dialog]");

  for (const dialog of dialogs) {
    // No dialog support means no enlarging. The buttons stay `hidden`, which
    // is the state they shipped in, so nothing has to be undone.
    if (typeof dialog.showModal !== "function") continue;

    const scope = dialog.closest("section") ?? document;
    const buttons = scope.querySelectorAll<HTMLButtonElement>("[data-preview-open]");
    if (buttons.length === 0) continue;

    const img = dialog.querySelector<HTMLImageElement>("[data-preview-img]");
    const well = dialog.querySelector<HTMLElement>("[data-preview-well]");
    const title = dialog.querySelector<HTMLElement>("[data-preview-title]");
    const host = dialog.querySelector<HTMLElement>("[data-preview-host]");
    const visit = dialog.querySelector<HTMLAnchorElement>("[data-preview-visit]");
    const strip = dialog.querySelector<HTMLElement>("[data-preview-views-strip]");
    const close = dialog.querySelector<HTMLButtonElement>("[data-preview-close]");
    if (!img || !well || !title || !host || !visit || !strip || !close) continue;

    /** One further capture of the same subject, as the card serialised it. */
    interface View {
      id: string;
      label: string;
      src: string;
      ratio: string;
    }

    /**
     * Put one capture in the well.
     *
     * `--preview-ratio` reserves the box before the file arrives, which is why
     * every caller sends the picture's own size: the dialog holds a
     * certificate (13:10), a screenshot (16:10) and a full page (1:3) from the
     * same markup, and a single hard-coded ratio letterboxes two of the three.
     */
    const show = (src: string, ratio: string | undefined, alt: string) => {
      img.src = src;
      img.alt = alt;
      if (ratio) img.style.setProperty("--preview-ratio", ratio);
      else img.style.removeProperty("--preview-ratio");
      well.scrollTop = 0;
    };

    // Bounces in and out (lib/motion/dialog.ts); Escape goes the same way.
    const modal = animatedDialog(dialog);

    /**
     * The control that opened the dialog, so focus can go back to it.
     *
     * `showModal()` moves focus into the dialog but nothing returns it, and a
     * keyboard user who lands back at the top of the document after closing an
     * overlay has lost their place in a horizontally scrolling shelf — which
     * is precisely the place that is hardest to find again.
     */
    let opener: HTMLElement | null = null;

    for (const button of buttons) {
      button.addEventListener("click", () => {
        const src = button.dataset.previewSrc;
        if (!src) return;

        const alt = button.dataset.previewAlt ?? "";
        show(src, button.dataset.previewRatio, alt);
        title.textContent = button.dataset.previewTitle ?? "";
        host.textContent = button.dataset.previewHost ?? "";

        // A full page scrolls, a screenshot does not. Set on the DIALOG so the
        // rule can reach both the well and the picture inside it.
        dialog.dataset.fit = button.dataset.previewFit ?? "cover";

        /* A subject with nothing to link to — a design study, a certificate —
           hides the call to action rather than pointing it at "#". The href is
           cleared as well: a hidden anchor still carries its target into the
           accessibility tree on some engines. */
        const href = button.dataset.previewHref;
        visit.hidden = !href;
        if (href) visit.href = href;
        else visit.removeAttribute("href");

        // The view strip, rebuilt per opening. Absent for everything but the
        // two design studies that have a second capture.
        strip.replaceChildren();
        let views: View[] = [];
        try {
          views = button.dataset.previewViews ? (JSON.parse(button.dataset.previewViews) as View[]) : [];
        } catch {
          // A malformed attribute costs the strip, never the dialog.
          views = [];
        }
        strip.hidden = views.length < 2;
        if (!strip.hidden) {
          for (const [index, view] of views.entries()) {
            const choice = document.createElement("button");
            choice.type = "button";
            choice.className = "preview__view";
            choice.textContent = view.label;
            choice.setAttribute("aria-pressed", index === 0 ? "true" : "false");
            choice.addEventListener("click", () => {
              show(view.src, view.ratio, `${alt}: ${view.label}`);
              for (const sibling of strip.querySelectorAll("[aria-pressed]")) {
                sibling.setAttribute("aria-pressed", sibling === choice ? "true" : "false");
              }
            });
            strip.append(choice);
          }
        }

        opener = button;
        modal.open();
      });

      // Revealed only now that there is something behind it.
      button.hidden = false;
    }

    close.addEventListener("click", () => modal.close());

    /**
     * Backdrop dismissal.
     *
     * A click on the backdrop reports the DIALOG as its target, because the
     * backdrop is a pseudo-element with no node of its own; a click on the
     * content reports something inside `.preview__frame`. So "the target is
     * the dialog itself" is exactly "the visitor clicked outside".
     */
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) modal.close();
    });

    // The resting source from the markup, restored on close.
    const blank = img.getAttribute("src") ?? "";

    dialog.addEventListener("close", () => {
      opener?.focus();
      opener = null;
      // Drop the source so a closed dialog is not holding a decoded 1440×900
      // bitmap for every screenshot the visitor happened to open.
      img.src = blank;
      // And the per-subject state with it: a 1×1 transparent GIF left in a
      // scrolling well at a full page's ratio is a tall empty box on the next
      // opening, before the new file has arrived.
      img.style.removeProperty("--preview-ratio");
      dialog.dataset.fit = "cover";
      strip.replaceChildren();
      strip.hidden = true;
    });
  }
}
