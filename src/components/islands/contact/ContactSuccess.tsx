import type { ContactFormCopy } from "~/lib/contactCopy";

export interface NextSteps {
  title: string;
  items: readonly { label: string; text: string }[];
}

/**
 * The confirmation that replaces the form. It carries the next steps, at the
 * one moment they are the whole question: on the way in they were a wall
 * between the visitor and the field they came to type in.
 */
export default function ContactSuccess({ copy, nextSteps }: { copy: ContactFormCopy; nextSteps?: NextSteps }) {
  return (
    <div className="contact-success flex flex-col items-start gap-4 py-12" role="status">
      <span className="contact-success__mark" aria-hidden="true">
        ✓
      </span>
      <h3
        // Focused as it MOUNTS: the success view fades in after the form has
        // faded out, so an effect keyed on the submit state would find no heading.
        ref={(el) => el?.focus()}
        tabIndex={-1}
        className="text-2xl font-[var(--font-display)] font-medium text-white outline-none"
        style={{ fontVariationSettings: '"opsz" 144' }}
      >
        {copy.form.successTitle}
      </h3>
      <p className="text-white/75">{copy.form.successMessage}</p>

      {/* A <dl>, like `ui/FirstCall.astro` renders them, so the pairing of
          label and text survives without the visual card around it. */}
      {nextSteps && nextSteps.items.length > 0 && (
        <div className="contact-next mt-4 w-full">
          <h4 className="contact-next__title">{nextSteps.title}</h4>
          <dl className="contact-next__list">
            {nextSteps.items.map((item) => (
              <div className="contact-next__item" key={item.label}>
                <dt className="contact-next__label">{item.label}</dt>
                <dd className="contact-next__text">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
