import type { ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Collapse } from "@tracht-digital-labs/tds-shared/motion/react";
import type { FieldName } from "~/lib/contactSteps";

/**
 * The contact form's field pieces. Each field sits in a `.contact-field-row`
 * so the focus-within styles in `sections/Contact.astro` can light up its
 * label. The family is `contact-field-*`, not `field-*`: tds-shared's
 * primitives.css owns `.field` for the input element itself.
 */

export const fieldClass = [
  "contact-field block w-full appearance-none bg-transparent",
  "px-3 py-3 text-base text-white leading-snug",
  "border-0 outline-none focus:outline-none focus:ring-0",
].join(" ");

export const errorId = (field: FieldName) => `contact-${field}-error`;

/** `aria-invalid` and the error's id while the field has an error. */
export const a11yFor = (field: FieldName, invalid: boolean) =>
  invalid ? { "aria-invalid": true as const, "aria-describedby": errorId(field) } : {};

export const rowClass = (invalid = false) => `contact-field-row ${invalid ? "contact-field-row--error" : ""}`;

/** A field that is complete and valid is filled (`.contact-field-row[data-filled]`). */
export const filled = (ok: boolean) => (ok ? "" : undefined);

const ICONS = {
  name: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  email: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></>,
  company: <><path d="M3 21h18M5 21V5l8-2v18M13 9l6 2v10M8 8h1M8 12h1M8 16h1" /></>,
  subject: <><path d="M4 5h16v11H8l-4 4z" /></>,
};

export function InputIcon({ name }: { name: keyof typeof ICONS }) {
  return (
    <span className="contact-input__icon" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {ICONS[name]}
      </svg>
    </span>
  );
}

/** A field's error line, tied to the field by `errorId`. */
export function FieldError({ field, show, children }: { field: FieldName; show: boolean; children: ReactNode }) {
  return (
    <Collapse open={show}>
      <p id={errorId(field)} className="contact-field-error text-xs mt-2">
        {children}
      </p>
    </Collapse>
  );
}

/** One single-line text field with its icon, label and error. */
export function TextRow({
  id,
  label,
  icon,
  type = "text",
  autoComplete,
  required = false,
  placeholder,
  ok,
  errorText,
  invalid = false,
  input,
}: {
  id: "name" | "email" | "company";
  label: string;
  icon: keyof typeof ICONS;
  type?: "text" | "email";
  autoComplete: string;
  required?: boolean;
  placeholder: string;
  ok: boolean;
  /** Only name and email are checked, so only they have an error line. */
  errorText?: string;
  invalid?: boolean;
  input: UseFormRegisterReturn;
}) {
  const checked = id === "company" ? null : id;
  return (
    <div className={rowClass(invalid)} data-filled={filled(ok)}>
      <label htmlFor={id} className="contact-field-label">
        {label}
      </label>
      <div className="contact-input">
        <InputIcon name={icon} />
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          required={required || undefined}
          placeholder={placeholder}
          className={fieldClass}
          {...(checked ? a11yFor(checked, invalid) : {})}
          {...input}
        />
      </div>
      {checked && (
        <FieldError field={checked} show={invalid}>
          {errorText}
        </FieldError>
      )}
    </div>
  );
}

/**
 * One step of the form. Only the current one is shown (`hidden`, never
 * `opacity: 0`); its legend takes focus when the step changes.
 */
export function Step({
  number,
  title,
  done,
  grow,
  current,
  children,
}: {
  number: number;
  title: string;
  done: boolean;
  grow?: boolean;
  current: boolean;
  children: ReactNode;
}) {
  return (
    <fieldset
      className={`contact-step${grow ? " contact-step--grow" : ""}`}
      data-done={done ? "" : undefined}
      hidden={!current}
    >
      {/* Visually hidden: the progress row above already shows the title. */}
      <legend className="contact-step__head sr-only" id={`contact-step-${number}`} tabIndex={-1}>
        <span className="contact-step__num" aria-hidden="true">{done ? "✓" : number}</span>
        {title}
      </legend>
      {children}
    </fieldset>
  );
}
