import { AnimatePresence, m } from "@tracht-digital-labs/tds-shared/motion/react";

/** `{ duration: 0 }` while the site's own motion switch is off. */
export type Still = { duration: number } | undefined;

/**
 * One answer: a native checkbox or radio inside its label, only visually
 * replaced. It stays focusable and announced; the ring is drawn around the
 * whole card.
 */
export default function FinderOption({
  type,
  name,
  value,
  checked,
  onChange,
  label,
  hint,
  still,
}: {
  type: "checkbox" | "radio";
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  hint?: string;
  still: Still;
}) {
  return (
    <label className={type === "radio" ? "finder__option finder__option--radio" : "finder__option"}>
      <input className="finder__input" type={type} name={name} value={value} checked={checked} onChange={onChange} />
      <Tick on={checked} still={still} />
      <span className="finder__option-body">
        <span className="finder__option-label">{label}</span>
        {hint !== undefined && <span className="finder__option-hint">{hint}</span>}
      </span>
    </label>
  );
}

/**
 * The tick that pops when an answer is chosen. A component of its own, at
 * module level: defined inside another component, it would be a new type on
 * every render, remount each time and never play its entrance.
 */
function Tick({ on, still }: { on: boolean; still: Still }) {
  return (
    <span className="finder__check" aria-hidden="true">
      <AnimatePresence initial={false}>
        {on && (
          <m.svg
            key="tick"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ scale: 0.2, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.2, opacity: 0 }}
            transition={still ?? { type: "spring", bounce: 0.55, visualDuration: 0.32 }}
          >
            <polyline points="5 12.5 10 17.5 19 7" />
          </m.svg>
        )}
      </AnimatePresence>
    </span>
  );
}
