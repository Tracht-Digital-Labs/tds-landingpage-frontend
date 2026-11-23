import type { CSSProperties } from "react";

/**
 * The stepper's progress row (2026-11-03): one step at a time, so the card
 * never asks everything at once. Earlier steps stay reachable; later ones only
 * once the visitor has been there.
 */
export default function ContactProgress({
  titles,
  stage,
  reached,
  done,
  label,
  onGo,
}: {
  titles: readonly string[];
  stage: number;
  reached: number;
  done: readonly boolean[];
  /** The list's accessible name, e.g. "Schritt 1 von 3". */
  label: string;
  onGo: (index: number) => void;
}) {
  return (
    <ol
      className="contact-progress"
      aria-label={label}
      style={{ "--contact-progress": stage / (titles.length - 1) } as CSSProperties}
    >
      {titles.map((title, index) => (
        <li key={title} className="contact-progress__item" data-state={index === stage ? "current" : done[index] ? "done" : undefined}>
          <button
            type="button"
            className="contact-progress__button"
            disabled={index > reached}
            aria-current={index === stage ? "step" : undefined}
            onClick={() => onGo(index)}
          >
            <span className="contact-progress__num" aria-hidden="true">
              {done[index] && index !== stage ? "✓" : index + 1}
            </span>
            <span className="contact-progress__title">{title}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}
