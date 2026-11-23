import Arrow from "~/components/ui/Arrow";

/** Back, and either "Weiter" or the submit button on the last step. */
export default function StepperActions({
  canGoBack,
  isLast,
  submitting,
  labels,
  onBack,
  onNext,
}: {
  canGoBack: boolean;
  isLast: boolean;
  submitting: boolean;
  labels: { back: string; next: string; submit: string; submitting: string };
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="contact-stepper-actions">
      {canGoBack && (
        <button type="button" className="contact-back" onClick={onBack}>
          <span aria-hidden="true"><Arrow dir="left" /></span> {labels.back}
        </button>
      )}
      {!isLast ? (
        <button key="next" type="button" className="submit-button contact-next-button min-h-[3.25rem] px-8 py-4 text-[0.9375rem] font-semibold rounded-full inline-flex items-center justify-center gap-2 cursor-pointer" onClick={onNext}>
          {labels.next} <span aria-hidden="true"><Arrow dir="right" /></span>
        </button>
      ) : (
        <button
          // Its own key: React would otherwise reuse the "Weiter" element and
          // flip its type to submit inside that very click, sending the form.
          key="submit"
          type="submit"
          disabled={submitting}
          className="submit-button group relative w-full sm:w-auto min-h-[3.25rem] px-8 py-4 text-[0.9375rem] font-semibold rounded-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          <span className="relative z-10 inline-flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-0.5">
            {submitting ? labels.submitting : labels.submit}
            {submitting ? (
              <span className="tds-spinner tds-spinner--sm" aria-hidden="true" />
            ) : (
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <polyline points="9 6 15 12 9 18" />
              </svg>
            )}
          </span>
        </button>
      )}
    </div>
  );
}
