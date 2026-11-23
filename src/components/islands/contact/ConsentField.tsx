import type { UseFormRegisterReturn } from "react-hook-form";
import type { ContactFormCopy } from "~/lib/contactCopy";
import { FieldError, a11yFor } from "./fields";

/** The consent checkbox with its link to the privacy notice. */
export default function ConsentField({
  copy,
  invalid,
  input,
}: {
  copy: ContactFormCopy;
  invalid: boolean;
  input: UseFormRegisterReturn;
}) {
  return (
    <div>
      <label className="flex items-center gap-3 cursor-pointer">
        {/* The native checkbox stays the control — focusable, in the tab
            order, announced as a checkbox — and is only made invisible.
            The round box beside it is a <span>, and that split is not
            decoration: an `appearance: none` <input> painted its tick
            background as a dark hole on this page, reproducibly. */}
        <input
          type="checkbox"
          className="contact-consent-input"
          required
          {...a11yFor("consent", invalid)}
          {...input}
        />
        <span className="contact-consent-box" aria-hidden="true" />
        <span className="text-xs text-white/75 leading-relaxed">
          {copy.form.consent}{" "}
          <a
            href="/legal/datenschutz"
            className="underline underline-offset-2 hover:no-underline"
            style={{ color: "var(--color-accent-pink)" }}
          >
            {copy.form.consentLink}
          </a>{" "}
          {copy.form.consentSuffix}
        </span>
      </label>
      <FieldError field="consent" show={invalid}>
        {copy.errors.consent}
      </FieldError>
    </div>
  );
}
