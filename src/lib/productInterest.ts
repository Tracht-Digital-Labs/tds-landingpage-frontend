import { consentGranted, onConsentChange } from "@tracht-digital-labs/tds-shared/consent/store";

/**
 * Which of the Shop's products a visitor has looked at on this site, so the
 * time-savings questionnaire can preselect the likeliest one.
 *
 * Each signal adds a weight to a product id (the catalogue's German slug):
 * - a service or platform page names its products (`productInterestPages.ts`);
 *   a view counts `view`, arriving on it from a search engine `searchEntry`;
 * - a product tile that was followed counts `tile`;
 * - the Leistungsassistent's result counts `assistantTop` for its strongest
 *   match and `assistant` for the others.
 *
 * Nothing leaves the browser. The weights are stored in localStorage only with
 * the "Komfort" (`functional`) consent; without it they last for the current
 * page, and withdrawing the consent deletes the stored record.
 *
 * No runtime import of the catalogue: every page's script bundles this file.
 */
export const PRODUCT_INTEREST_KEY = "tds-product-interest";
export const PRODUCT_INTEREST_EVENT = "tds:product-interest";

export const INTEREST_WEIGHTS = {
  view: 1,
  searchEntry: 3,
  tile: 2,
  assistantTop: 3,
  assistant: 1,
} as const;

/** At most this many products are remembered; the least recent goes first. */
export const MAX_PRODUCTS = 12;

/** Least recently counted first. */
export type InterestWeights = readonly (readonly [string, number])[];

const PRODUCT_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SEARCH_HOST = /(?:^|\.)(?:google|bing|duckduckgo|ecosia|startpage|qwant|yahoo|yandex|baidu)\.[a-z.]+$/;

/** The stored record back, dropping anything that is not a product id with a positive weight. */
export function parseInterest(raw: string | null): InterestWeights {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return value
      .filter(
        (entry): entry is [string, number] =>
          Array.isArray(entry) &&
          typeof entry[0] === "string" &&
          PRODUCT_ID.test(entry[0]) &&
          typeof entry[1] === "number" &&
          Number.isFinite(entry[1]) &&
          entry[1] > 0,
      )
      .map(([id, weight]) => [id, weight] as const)
      .slice(-MAX_PRODUCTS);
  } catch {
    return [];
  }
}

/** Add `weight` to each id and move it to the most recent end. */
export function bumpInterest(weights: InterestWeights, ids: readonly string[], weight: number): InterestWeights {
  const next = new Map(weights);
  for (const id of new Set(ids)) {
    if (!PRODUCT_ID.test(id)) continue;
    const total = (next.get(id) ?? 0) + weight;
    next.delete(id);
    next.set(id, total);
  }
  return [...next].slice(-MAX_PRODUCTS);
}

/** The heaviest product; on a tie the one counted last. */
export function likeliestProduct(weights: InterestWeights): string | null {
  let best: readonly [string, number] | null = null;
  for (const entry of weights) if (!best || entry[1] >= best[1]) best = entry;
  return best?.[0] ?? null;
}

/** Did the visitor arrive from a search engine's results? */
export function cameFromSearch(referrer: string): boolean {
  try {
    const host = new URL(referrer).hostname;
    return SEARCH_HOST.test(host) || host === "search.brave.com";
  } catch {
    return false;
  }
}

/* ── Browser ─────────────────────────────────────────────────────────── */

let current: InterestWeights | null = null;

function stored(): InterestWeights {
  try {
    return parseInterest(localStorage.getItem(PRODUCT_INTEREST_KEY));
  } catch {
    return [];
  }
}

function persist(weights: InterestWeights): void {
  try {
    if (consentGranted("functional")) localStorage.setItem(PRODUCT_INTEREST_KEY, JSON.stringify(weights));
    else localStorage.removeItem(PRODUCT_INTEREST_KEY);
  } catch {
    /* storage blocked: the weights last for this page */
  }
}

/** This page's weights: the stored ones with consent, plus what was counted here. */
export function readProductInterest(): InterestWeights {
  current ??= consentGranted("functional") ? stored() : [];
  return current;
}

export function recordProductInterest(ids: readonly string[], weight: number): void {
  if (ids.length === 0) return;
  current = bumpInterest(readProductInterest(), ids, weight);
  persist(current);
  window.dispatchEvent(new CustomEvent<InterestWeights>(PRODUCT_INTEREST_EVENT, { detail: current }));
}

/** The assistant's result: its strongest match counts most. */
export function recordAssistantResult(productIds: readonly string[]): void {
  const [top, ...rest] = productIds;
  if (top) recordProductInterest([top], INTEREST_WEIGHTS.assistantTop);
  recordProductInterest(rest, INTEREST_WEIGHTS.assistant);
}

/** Called with the full weights whenever something is counted on this page. */
export function onProductInterest(fn: (weights: InterestWeights) => void): () => void {
  const listener = (event: Event) => fn((event as CustomEvent<InterestWeights>).detail);
  window.addEventListener(PRODUCT_INTEREST_EVENT, listener);
  return () => window.removeEventListener(PRODUCT_INTEREST_EVENT, listener);
}

/**
 * Every page: count the page's own products (`data-interest-products` on
 * `<main>`), followed product tiles (`data-interest-product`), and keep the
 * stored record in step with the consent.
 */
export function mountProductInterest(): () => void {
  const page = document.querySelector<HTMLElement>("[data-interest-products]");
  const ids = page?.dataset.interestProducts?.split(" ").filter(Boolean) ?? [];
  recordProductInterest(ids, cameFromSearch(document.referrer) ? INTEREST_WEIGHTS.searchEntry : INTEREST_WEIGHTS.view);

  const onClick = (event: MouseEvent) => {
    const tile = (event.target as Element | null)?.closest?.<HTMLElement>("[data-interest-product]");
    const id = tile?.dataset.interestProduct;
    if (id) recordProductInterest([id], INTEREST_WEIGHTS.tile);
  };
  document.addEventListener("click", onClick);
  // Consent given later keeps what this page counted; withdrawn, the record goes.
  const stopConsent = onConsentChange(() => persist(readProductInterest()));
  return () => {
    document.removeEventListener("click", onClick);
    stopConsent();
  };
}
