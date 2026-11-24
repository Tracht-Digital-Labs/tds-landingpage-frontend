/**
 * Everything entered so far, with a way back to each step: the earlier steps
 * are hidden on the last one, so it shows what will be sent.
 */
export default function ContactSummary({
  title,
  edit,
  rows,
  onGo,
}: {
  title: string;
  /** The "Ändern" label. */
  edit: string;
  /** One row per earlier step: its title and the values given there. */
  rows: readonly { step: string; values: readonly unknown[] }[];
  onGo: (index: number) => void;
}) {
  return (
    <div className="contact-summary">
      <p className="contact-summary__title">{title}</p>
      <dl className="contact-summary__list">
        {rows.map((row, index) => (
          <div className="contact-summary__row" key={row.step}>
            <dt>{row.step}</dt>
            <dd>{joined(row.values) || "–"}</dd>
            <button type="button" className="contact-summary__edit" onClick={() => onGo(index)}>
              {edit}
            </button>
          </div>
        ))}
      </dl>
    </div>
  );
}

const joined = (values: readonly unknown[]) =>
  values
    .map((value) => String(value ?? "").trim())
    .filter(Boolean)
    .join(" · ");
