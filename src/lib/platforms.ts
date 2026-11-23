import type { Lang } from "./i18n";
import { woocommerce } from "./platforms/woocommerce";
import { shopware } from "./platforms/shopware";
import { wordpress } from "./platforms/wordpress";
import { typo3 } from "./platforms/typo3";
import { strato } from "./platforms/strato";

/**
 * The shop systems and CMS that get a page of their own — code-owned, like
 * `references.ts` and `demoCatalog.ts`.
 *
 * ### Why these pages exist
 *
 * People who need help with a shop or a website search for the SYSTEM they
 * have: "WooCommerce Fehler", "Shopware 6 Theme", "TYPO3 Update", "STRATO
 * Homepage-Baukasten". The service pages describe what is on offer in general
 * words; these pages meet that search where it starts, one page per system.
 * They belong to the Webauftritt service: their back link, breadcrumb and hub
 * all point there.
 *
 * One page per system, not one per offer ("WooCommerce Fehler beheben",
 * "WooCommerce Theme" …): three thin pages on one topic compete with each other
 * and none of them says enough. The offers are sections of the page, each with
 * an anchor.
 *
 * ### The rules this content keeps (tests: `platforms.test.ts`)
 *
 * - **No amount.** Decided 2026-09-15: these pages name no price and no rate.
 *   They explain how a price comes about and link to the published rates.
 * - No direct address (since 2026-10-12; "du" before), like the rest of the
 *   site: the copy is about Tracht Digital Solutions and the work; no free and
 *   no time-boxed first conversation; the one sentence about its cost is
 *   "Kosten entstehen erst, wenn wir einen Auftrag vereinbaren.".
 * - **Short.** Three points per list, four questions, one statement per
 *   sentence (asked for 2026-09-15). The page is read, not scrolled past.
 * - **Nothing invented.** Every fact about a system is in `sources` with a link
 *   to where it is stated, and dated through `updatedAt`. Raise `updatedAt`
 *   only when the content changes — it is rendered as "Stand" and published as
 *   `dateModified`, and a date moved without a change is a false freshness
 *   signal.
 * - **Independent.** Every page says that this is not an official partner of
 *   the vendor, and no page shows a vendor's logo.
 * - **No anonymous case on these pages, ever.** The anonymous retail case in
 *   `references.ts` is anonymous, and naming the systems involved would
 *   identify the client by elimination — which is why `references.test.ts`
 *   bans exactly those system names from its prose. A case appears here only
 *   when it is published under the client's name and lists the platform in
 *   `ReferenceCase.platforms`.
 *
 * One file per system under `platforms/`, the copy and sources they share in
 * `platforms/shared.ts`.
 *
 * **No runtime imports** beyond types and that folder: the page, the sitemap
 * and the cache route table all read this file.
 */

export type PlatformId = "woocommerce" | "shopware" | "wordpress" | "typo3" | "strato";

export interface PlatformSource {
  label: Record<Lang, string>;
  url: Record<Lang, string>;
}

export interface PlatformOffer {
  /** Anchor on the page. Code-owned, in the page's language. */
  id: string;
  title: string;
  /** Opens with what the reader gets — the answer comes first. */
  text: string;
  points: readonly string[];
}

export interface PlatformComparison {
  title: string;
  /** One or two sentences that answer the table's question on their own. */
  intro: string;
  columns: readonly string[];
  /** The first cell of every row is its row header. */
  rows: readonly (readonly string[])[];
}

export interface PlatformFaqItem {
  q: string;
  a: string;
}

export interface PlatformContent {
  /** The back link's words: the parent service. */
  label: string;
  /** The H1. */
  title: string;
  /** The lead under the H1 AND the page's meta description (81–160 characters). */
  summary: string;
  /**
   * The statement a reader — or an answer engine — can quote on its own: who,
   * what, for whom, where. Rendered as the large paragraph under the hero.
   */
  answer: string;
  situationsTitle: string;
  situations: readonly string[];
  /** Title of the card that lists the offers as the page's table of contents. */
  offersTitle: string;
  offers: readonly PlatformOffer[];
  comparison: PlatformComparison;
  outcomesTitle: string;
  outcomes: readonly string[];
  boundariesTitle: string;
  boundaries: readonly string[];
  processTitle: string;
  process: readonly string[];
  costTitle: string;
  /** How a price comes about — without an amount. */
  costText: string;
  referencesHeadline: string;
  referencesLabel: string;
  faqTitle: string;
  faq: readonly PlatformFaqItem[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
}

export interface PlatformDefinition {
  id: PlatformId;
  /** The system's own name, as its vendor writes it. */
  name: string;
  kind: "shop" | "cms" | "builder";
  /** The same in both trees: `/leistungen/<slug>` and `/en/services/<slug>`. */
  slug: string;
  /** The `<title>`: system and intent first, the brand last. */
  seoTitle: Record<Lang, string>;
  /** ISO date of the last content change. See the rules above. */
  updatedAt: string;
  /** The system's encyclopedia entry — `about.sameAs` in the page's JSON-LD. */
  wikipedia: Record<Lang, string>;
  /**
   * Short scope words for the system's tile on the Webauftritt page — the same
   * job `ServiceDefinition.keywords` does: two to four, none a sentence.
   */
  keywords: Record<Lang, readonly string[]>;
  articleSlugs: readonly JournalSlug[];
  sources: readonly PlatformSource[];
  content: Record<Lang, PlatformContent>;
}

/**
 * Journal articles a platform page may point to, with committed link text.
 *
 * The labels are this site's words for the link, not the articles' titles
 * (those are the blog's copy and addressed its readers formally): a link has
 * to read right in this site's neutral voice.
 */
export const JOURNAL_ARTICLES = {
  "website-fuenf-dinge-die-fehlen": {
    de: "Fünf Dinge, die auf vielen Websites fehlen",
    en: "Five things many websites are missing",
  },
  "lohnt-sich-ein-webshop": {
    de: "Lohnt sich ein Webshop für ein Ladengeschäft?",
    en: "Is an online shop worth it for a local business?",
  },
  "produktpflege-per-handy": {
    de: "Produktpflege muss nicht am Schreibtisch hängen",
    en: "Product upkeep does not have to be tied to a desk",
  },
  "konzept-vor-umsetzung": {
    de: "Warum ein Konzept billiger ist als ein zweiter Versuch",
    en: "Why a concept is cheaper than a second attempt",
  },
} as const satisfies Record<string, Record<Lang, string>>;

export type JournalSlug = keyof typeof JOURNAL_ARTICLES;

export const platformDefinitions: readonly PlatformDefinition[] = [woocommerce, shopware, wordpress, typo3, strato];

/** `/leistungen/<slug>` or `/en/services/<slug>`. */
export function platformHref(platform: PlatformDefinition, lang: Lang): string {
  return lang === "de" ? `/leistungen/${platform.slug}` : `/en/services/${platform.slug}`;
}

/** The platform served under this slug, if any. Slugs are the same in both trees. */
export function getPlatformBySlug(slug: string | undefined): PlatformDefinition | undefined {
  if (!slug) return undefined;
  return platformDefinitions.find((platform) => platform.slug === slug);
}

export function getPlatformById(id: PlatformId): PlatformDefinition {
  const platform = platformDefinitions.find((candidate) => candidate.id === id);
  // Same contract as `getServiceById`: the union and the catalog are kept together.
  if (!platform) throw new Error(`Unknown platform id: ${id}`);
  return platform;
}
