/**
 * The contact form's stepper and request rules, without React: which fields a
 * step checks, when a field counts as filled, the subject an emergency sends,
 * and how an assistant draft joins what the visitor typed.
 *
 * **Runtime import allowed:** the island bundles this.
 */
import { ContactSchema } from "@tracht-digital-labs/tds-shared/schemas";

/** Field ids double as the prefix of their error messages' ids. */
export type FieldName = "name" | "email" | "message" | "consent";

/** The fields each step checks before "Weiter" moves on. */
export const STEP_FIELDS: readonly (readonly FieldName[])[] = [["name", "email"], [], ["message", "consent"]];

export const LAST_STEP = STEP_FIELDS.length - 1;

/** The first step holding one of the invalid fields, or -1. */
export const firstInvalidStep = (invalid: Partial<Record<string, unknown>>): number =>
  STEP_FIELDS.findIndex((fields) => fields.some((field) => invalid[field]));

/** Whether a value passes the shared schema's rule for that one field. */
export function fieldValid(field: "name" | "email" | "company" | "message", value: unknown): boolean {
  if (!String(value ?? "").trim()) return false;
  const shape = (ContactSchema as unknown as { shape?: Record<string, { safeParse: (v: unknown) => { success: boolean } }> }).shape;
  return shape?.[field]?.safeParse(value).success ?? true;
}

/**
 * The subject sent: the chosen reason, or none. An emergency puts
 * `urgentSubject` in front, so it arrives marked in the panel without a new
 * field in `ContactSchema`; the schema caps a subject at 200 characters.
 */
export function subjectFor(subject: string | undefined, urgent: boolean, urgentSubject: string): string | undefined {
  const reason = String(subject ?? "").trim();
  if (!urgent) return reason || undefined;
  return (reason ? `${urgentSubject}: ${reason}` : urgentSubject).slice(0, 200);
}

/**
 * The message after a draft arrives: what the visitor typed stays on top and
 * the draft goes underneath, once. `null` when the draft is already there.
 */
export function withDraft(current: string, draft: string): string | null {
  if (current.includes(draft.trim())) return null;
  return current.trim() ? `${current.trimEnd()}\n\n${draft}` : draft;
}
