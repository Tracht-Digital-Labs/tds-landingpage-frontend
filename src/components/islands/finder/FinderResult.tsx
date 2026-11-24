import Arrow from "~/components/ui/Arrow";
import { m } from "@tracht-digital-labs/tds-shared/motion/react";
import { SAVINGS_LEVELS, type FinderMatch, type FinderProduct } from "~/lib/serviceFinder";
import { FINDER_COPY } from "~/lib/serviceFinderCopy";
import type { Lang } from "~/lib/i18n";
import type { Still } from "./FinderOption";

/**
 * The result: the ranked matches with the visitor's own reasons, then the
 * hand-off to the contact form. Cards the page has no product for are skipped.
 */
export default function FinderResult({
  lang,
  matches,
  products,
  catalogueHref,
  contactHref,
  onHandOff,
  onRestart,
  headingRef,
  still,
}: {
  lang: Lang;
  matches: readonly FinderMatch[];
  products: readonly FinderProduct[];
  catalogueHref: string;
  contactHref: string;
  onHandOff: () => void;
  onRestart: () => void;
  /** Focuses the heading as it mounts. */
  headingRef: (node: HTMLElement | null) => void;
  still: Still;
}) {
  const copy = FINDER_COPY[lang];
  return (
    <>
      <h3 ref={headingRef} tabIndex={-1} className="finder__result-title">
        {copy.resultTitle}
      </h3>
      {matches.length === 0 && <p className="finder__summary">{copy.noMatch}</p>}
      <ol className="finder__matches">
        {matches.map((match, index) => {
          const product = products.find((candidate) => candidate.id === match.productId);
          if (!product) return null;
          return (
            <m.li
              key={match.productId}
              className="finder__match"
              data-rank={index === 0 ? "best" : "also"}
              initial={still ? false : { y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={still ?? { type: "spring", bounce: 0.3, visualDuration: 0.45, delay: 0.12 + index * 0.09 }}
            >
              <p className="finder__rank">
                <span className="finder__rank-badge" aria-hidden="true">
                  {index + 1}
                </span>
                {index === 0 ? copy.rankBest : copy.rankAlso}
              </p>
              <h4 className="finder__match-title">{product.title}</h4>
              <p className="finder__summary">{product.categoryName}</p>
              <p className="finder__savings">
                <span className="finder__savings-label">{copy.savingsLabel}:</span>
                <span className="finder__savings-meter" aria-hidden="true">
                  {SAVINGS_LEVELS.map((level, rank) => (
                    <span key={level} data-on={rank <= SAVINGS_LEVELS.indexOf(product.savings) ? "" : undefined} />
                  ))}
                </span>
                <span>{copy.savingsLevels[product.savings]}</span>
              </p>
              {match.reasons.length > 0 && (
                <>
                  <p className="finder__why-label">{copy.whyLabel}</p>
                  <ul className="finder__why">
                    {match.reasons.map((reason) => (
                      <li key={reason}>
                        <span aria-hidden="true" className="finder__tick">
                          ✓
                        </span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <a className="finder__detail" href={product.href}>
                {copy.detailLink}
                <span aria-hidden="true"><Arrow dir="right" /></span>
              </a>
            </m.li>
          );
        })}
      </ol>
      <p className="finder__note">
        {copy.note} {copy.savingsNote}{" "}
        <a className="finder__price-link" href={catalogueHref}>
          {copy.catalogueLink}
        </a>
      </p>
      <div className="finder__actions">
        <a className="finder__cta finder__cta--contact" href={contactHref} onClick={onHandOff}>
          {copy.cta}
          <span aria-hidden="true"><Arrow dir="right" /></span>
        </a>
        <button type="button" className="finder__secondary" onClick={onRestart}>
          {copy.restart}
        </button>
        <p className="finder__handoff">{copy.handoffNote}</p>
      </div>
    </>
  );
}
