import type { UseFormRegisterReturn } from "react-hook-form";
import type { ContactFormCopy } from "~/lib/contactCopy";
import { InputIcon, fieldClass, filled, rowClass } from "./fields";

/** Step 2: the reason for getting in touch, and the emergency box. */
export default function ReasonFields({
  copy,
  reasons,
  chosen,
  input,
  urgent,
  onUrgent,
}: {
  copy: ContactFormCopy;
  reasons: readonly string[];
  /** Whether a reason is selected, for the row's filled state. */
  chosen: boolean;
  input: UseFormRegisterReturn;
  urgent: boolean;
  onUrgent: (urgent: boolean) => void;
}) {
  return (
    <div className="contact-form-pair">
      {/* Optional on purpose: making it mandatory costs submissions from the
          people whose request fits no entry, and they are the ones worth
          hearing from. Rendered only when there are options — the list is
          CMS-editable and can be emptied. */}
      {reasons.length > 0 && (
        <div className={rowClass()} data-filled={filled(chosen)}>
          <label htmlFor="subject" className="contact-field-label">
            {copy.reasonLabel}
          </label>
          {/* The SAME `fieldClass` as the text fields (2026-09-21): the closed
              control reads as one more row of the form — transparent, on
              the row's underline, with the accent line growing on focus.
              Only the OPEN list keeps its own frosted surface
              (`::picker(select)` in Contact.astro). */}
          <div className="contact-input">
            <InputIcon name="subject" />
            <select id="subject" className={`${fieldClass} contact-select`} defaultValue="" {...input}>
              <option value="">{copy.reasonEmpty}</option>
              {reasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Short-notice emergencies are taken (2026-10-11). The same round box
          as the consent, in a row that fills pink when ticked. Just the word,
          no description (2026-10-12). Not a form field: `ContactSchema` knows
          no such key; it marks the subject instead. */}
      <label className="contact-urgent-toggle">
        <input
          type="checkbox"
          className="contact-consent-input"
          checked={urgent}
          onChange={(event) => onUrgent(event.target.checked)}
        />
        <span className="contact-consent-box" aria-hidden="true" />
        <span className="contact-urgent-toggle__title">{copy.urgentLabel}</span>
      </label>
    </div>
  );
}
