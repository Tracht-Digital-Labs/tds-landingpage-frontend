import { useEffect } from "react";
import type { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import type { ContactFormData } from "@tracht-digital-labs/tds-shared/schemas";
import { CONTACT_DRAFT_EVENT, CONTACT_DRAFT_KEY, parseContactDraft } from "~/lib/contactDraft";
import { withDraft } from "~/lib/contactSteps";

/**
 * A draft from the service assistant (`lib/contactDraft.ts`): read from
 * storage when the form hydrates after the jump down here, or taken from the
 * event when it is already live. Text in the field, nothing else — the visitor
 * still reads, edits and sends. What they typed themselves is never replaced;
 * the draft goes underneath it.
 */
export function useContactDraft({
  getValues,
  setValue,
  reasons,
  assistantReasons,
}: {
  getValues: UseFormGetValues<ContactFormData>;
  setValue: UseFormSetValue<ContactFormData>;
  /** The options the reason dropdown renders. */
  reasons: readonly string[];
  /** Service id → the reason that service preselects. */
  assistantReasons: Readonly<Record<string, string>>;
}) {
  useEffect(() => {
    const apply = (value: unknown) => {
      const draft = parseContactDraft(value);
      if (!draft) return;

      // The reason the recommendation maps to, only while the visitor has not
      // chosen one. Checked against the options actually rendered: a value the
      // select has no <option> for would set the field to nothing at all, and
      // a panel edit to the list is exactly how that happens.
      const mapped = draft.service ? assistantReasons[draft.service] : undefined;
      if (mapped && reasons.includes(mapped) && !String(getValues("subject") ?? "").trim()) {
        setValue("subject", mapped, { shouldDirty: true });
      }

      const message = withDraft(String(getValues("message") ?? ""), draft.message);
      if (message !== null) setValue("message", message, { shouldDirty: true });
    };

    try {
      const stored = window.sessionStorage.getItem(CONTACT_DRAFT_KEY);
      if (stored) {
        apply(stored);
        window.sessionStorage.removeItem(CONTACT_DRAFT_KEY);
      }
    } catch {
      // Storage blocked: the event below still delivers to a live form.
    }
    const onDraft = (event: Event) => {
      apply((event as CustomEvent<unknown>).detail);
      try {
        window.sessionStorage.removeItem(CONTACT_DRAFT_KEY);
      } catch {
        // Storage blocked: nothing was stored either.
      }
    };
    window.addEventListener(CONTACT_DRAFT_EVENT, onDraft);
    return () => window.removeEventListener(CONTACT_DRAFT_EVENT, onDraft);
  }, [getValues, setValue, reasons, assistantReasons]);
}
