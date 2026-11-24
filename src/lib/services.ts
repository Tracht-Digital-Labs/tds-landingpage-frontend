import { cmsFor, fetchBlocks } from "./cms";
import type { Lang } from "./i18n";
// `references.ts` takes only TYPES back from this module (`import type`, so
// erased at build), which is what keeps this pair from becoming a runtime
// cycle of the kind `contentCache.ts` exists to document.
import { referencesForService } from "./references";
import { panels } from "./services/panels";
import { processService } from "./services/process";
import { consulting } from "./services/consulting";
import { solutions } from "./services/solutions";
import { webPresence } from "./services/web-presence";

export type ServiceId =
  | "panels"
  | "consulting"
  | "process"
  | "solutions"
  | "web-presence";

export type ServiceCmsKey =
  | "service_panels"
  | "service_consulting"
  | "service_process"
  | "service_solutions"
  | "service_web_presence";

export interface ServiceReference {
  title: string;
  context: string;
  challenge: string;
  solution: string;
  result: string;
  /** Optional, verifiable metric. An empty string means no metric is shown. */
  metric: string;
  /**
   * Journal article this case links to. **Code-owned and unreachable from the
   * CMS** — `validateServiceReferences` rebuilds each item field by field and
   * never copies this one, so a block that carries an `articleUrl` cannot put
   * a link on the page. Same rule as `ServiceDefinition.slug` and the demo
   * hosts: editable copy, never an editable destination.
   */
  articleUrl?: string;
  /**
   * The customer's own site, on a case published under their name. Same rule
   * and same enforcement as {@link ServiceReference.articleUrl}: the CMS may
   * rewrite the words around it, never supply or change it.
   *
   * Unlike `articleUrl` this does not vary by language — see
   * `ReferenceCase.siteUrl`.
   */
  siteUrl?: string;
}

export interface ServiceContent {
  /** Back-link label for the services overview on the homepage. */
  label: string;
  title: string;
  /** Shared by the homepage card and the detail-page lead. */
  summary: string;
  intro: string;
  situationsTitle: string;
  situations: string[];
  responsibilitiesTitle: string;
  responsibilities: string[];
  outcomesTitle: string;
  outcomes: string[];
  boundariesTitle: string;
  boundaries: string[];
  processTitle: string;
  process: string[];
  priceLabel: string;
  priceText: string;
  referencesLabel: string;
  referencesHeadline: string;
  references: ServiceReference[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
}

export interface ServiceDefinition {
  /** Stable, code-owned identity. Never sourced from the CMS. */
  id: ServiceId;
  /**
   * Stable display ORDER shared by overview, sitemap and navigation.
   *
   * It is never rendered as text. A visitor reaching a service from a card or
   * from search is told "04" about a list they never saw, so the numerals came
   * off the detail hero and the pricing cards; only the sequence survives.
   */
  number: string;
  /** Stable, code-owned CMS block key. */
  cmsKey: ServiceCmsKey;
  /** Stable, localized route segments. Never editable in the CMS. */
  slug: Record<Lang, string>;
  /**
   * The detail page's `<title>`: what a searcher types first, the brand last.
   *
   * Code-owned like `slug` and `keywords`. The H1 stays the service's short
   * name ("Webauftritt"), which is what the rest of the site calls it; the
   * title is where the search words go ("Website & Onlineshop erstellen
   * lassen") — a bare "Webauftritt | Tracht Digital Solutions" matched no
   * query anybody makes.
   */
  seoTitle: Record<Lang, string>;
  /**
   * The `<meta name="description">` (and og/twitter description) of the
   * detail page, added 2026-11-11. Answer-first for search and answer
   * engines: the search term, then who and where — none of which the visible
   * `summary` (card text and hero lead) names. Meta only: the JSON-LD keeps
   * describing the page with the visible `summary`. Code-owned like
   * `seoTitle`; 81–160 characters in both languages (`services.test.ts`).
   */
  seoDescription: Record<Lang, string>;
  /**
   * ISO date of the last change to this service's committed copy. Rendered as
   * "Stand" on the detail page and published as its `dateModified`. Raise it
   * only when the content changes; a panel override does not move it.
   */
  updatedAt: string;
  /**
   * Plain everyday words for the overview card's chips.
   *
   * A visitor scanning the cards wants to know what a service IS — "Websites ·
   * Onlineshops · Google Ads & SEO" — not how it is carried out; the detail
   * page answers that.
   *
   * Code-owned like `number` and `slug`, deliberately: keeping them out of
   * the CMS means the Website-CMS structured schema (another repository)
   * does not have to change in step with this file.
   */
  keywords: Record<Lang, readonly string[]>;
  /**
   * WHAT the service is, in a few words — the line under its title in the
   * home page's services list (2026-10-05). It used to be the first
   * `outcomes` entry, which told a visitor what they would get but never
   * what the service was. Code-owned like `keywords`, for the same reason.
   */
  tagline: Record<Lang, string>;
  /**
   * Optional background image for the card and the detail hero, as a path
   * under `/images/services/`.
   *
   * `null` renders no image at all — not a broken `<img>`, not an empty
   * box — so this can ship before the artwork exists.
   */
  image: string | null;
  fallback: Record<Lang, ServiceContent>;
}

/**
 * Single source of truth for service identity, order, routes and local content.
 * One file per service under `services/`, listed here in display order.
 * The CMS may override every content field, but never ids, slugs, keywords,
 * images or prices used in structured data. References come from
 * `references.ts`; no customer story is published until a real, approved case
 * exists there.
 *
 * ### The order (since 2026-10-06)
 *
 * Kundenportale & Verwaltungspanels first: the site's focus moved to building
 * a business its own panel, and to digitalization in general. Then the
 * digitalization services — simplify, sort, build — and the web presence
 * last. It stays the service the shop system and CMS pages belong to; it is
 * simply no longer the headline (it stood first from 2026-09-15 to 10-05).
 *
 * ### Copy rules
 *
 * - Neutral voice since 2026-10-12: no "du", no "Sie" (see addressForm.test.ts).
 * - **Short and clear** (asked for 2026-09-15): three points per list, one
 *   statement per line, no filler.
 * - `summary` is the visible card text and the detail page's hero lead, and
 *   describes the page in its JSON-LD. The `<meta name="description">` is
 *   `seoDescription` since 2026-11-11 (a panel edit of `summary` no longer
 *   reaches it). Both stay between 81 and 160 characters in BOTH languages,
 *   which `services.test.ts` measures.
 */
export const serviceDefinitions = [panels, processService, consulting, solutions, webPresence] satisfies readonly ServiceDefinition[];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

/**
 * Validate the special empty-by-default reference collection.
 *
 * `cmsFor()` deliberately refuses to infer a schema from an empty fallback
 * list. References need an empty local default (publishing invented examples
 * is not acceptable), so this boundary validates the raw CMS field instead.
 * One malformed item rejects the complete collection, matching `cmsFor()`'s
 * safe list-boundary fallback behaviour.
 */
export function validateServiceReferences(value: unknown): ServiceReference[] {
  if (!Array.isArray(value) || value.length === 0) return [];

  const references: ServiceReference[] = [];
  for (const candidate of value) {
    if (!isRecord(candidate)) return [];

    const title = requiredString(candidate.title);
    const context = requiredString(candidate.context);
    const challenge = requiredString(candidate.challenge);
    const solution = requiredString(candidate.solution);
    const result = requiredString(candidate.result);
    const metric =
      candidate.metric === undefined || candidate.metric === null || candidate.metric === ""
        ? ""
        : requiredString(candidate.metric);

    if (!title || !context || !challenge || !solution || !result || metric === null) {
      return [];
    }

    references.push({ title, context, challenge, solution, result, metric });
  }

  return references;
}

export function getServiceById(id: ServiceId): ServiceDefinition {
  const service = serviceDefinitions.find((candidate) => candidate.id === id);
  // The ServiceId union and the committed catalog are maintained together.
  // Throwing here exposes an internal drift during development instead of
  // returning a broken link in production.
  if (!service) throw new Error(`Unknown service id: ${id}`);
  return service;
}

export function getServiceBySlug(
  lang: Lang,
  slug: string | undefined,
): ServiceDefinition | undefined {
  if (!slug) return undefined;
  return serviceDefinitions.find((service) => service.slug[lang] === slug);
}

export function serviceHref(service: ServiceDefinition, lang: Lang): string {
  return lang === "de"
    ? `/leistungen/${service.slug.de}`
    : `/en/services/${service.slug.en}`;
}

/**
 * Services that were published and then withdrawn, and where their visitors
 * should land instead.
 *
 * These slugs were indexed and linked, so answering them with the 404 the
 * route would otherwise produce throws that away — and for Marketing it would
 * be wrong as well as wasteful: the content did not disappear, it moved into
 * Web Presence. Contract development moved into Tailored Solutions the same
 * way. Complete IT has no successor, so it points at the overview rather than
 * at a service that would have to pretend to cover it.
 *
 * Keyed by the retired slug, per language, because the pair is what a visitor
 * actually typed. `retiredServiceTarget` is called by both `[slug]` routes
 * BEFORE they give up and 404 — the dynamic route still matches these paths,
 * which is the only reason no new redirect mechanism is needed.
 */
const retiredServiceTargets: Record<Lang, Record<string, string>> = {
  de: {
    auftragsprogrammierung: "/leistungen/individuelle-loesungen",
    marketing: "/leistungen/webauftritt",
    "komplette-it": "/#services",
  },
  en: {
    "contract-development": "/en/services/tailored-solutions",
    marketing: "/en/services/web-presence",
    "complete-it": "/en/#services",
  },
};

export function retiredServiceTarget(
  lang: Lang,
  slug: string | undefined,
): string | undefined {
  if (!slug) return undefined;
  return retiredServiceTargets[lang][slug];
}

/** Exported for the test that keeps the table honest as the catalog changes. */
export { retiredServiceTargets };

/**
 * Merge CMS reference text onto the committed cases, position by position.
 *
 * The committed list is the base and owns **every destination**; the CMS owns
 * the words. An editor rewriting the first card rewrites the first committed
 * case and keeps its links. A CMS entry past the end of the committed list is
 * an editor-authored case and simply has none — there is nowhere for it to
 * point that this repo could vouch for.
 *
 * Every destination is stripped off the override before anything is restored,
 * rather than only overwritten where a committed one exists. `validateService
 * References` already drops them upstream, so this is belt and braces — but
 * the old form leaned entirely on that: at any position whose committed case
 * lacks a link, a CMS-supplied one passed straight through.
 */
export function mergeReferences(
  committed: readonly ServiceReference[],
  fromCms: readonly ServiceReference[],
): ServiceReference[] {
  if (fromCms.length === 0) return [...committed];

  return fromCms.map((override, i) => {
    const base = committed[i];
    const { articleUrl: _article, siteUrl: _site, ...text } = override;
    return {
      ...text,
      ...(base?.articleUrl ? { articleUrl: base.articleUrl } : {}),
      ...(base?.siteUrl ? { siteUrl: base.siteUrl } : {}),
    };
  });
}

/**
 * Resolve the editable CMS block over the committed localized fallback.
 *
 * References do not go through `cmsFor` — it infers its schema from the
 * fallback and cannot describe this list — so they are resolved here, in three
 * cases that are deliberately distinct:
 *
 *  - **No `references` key**, or a malformed one: the committed cases render.
 *    That is the normal state; nobody has to retype a published case into the
 *    panel for it to appear.
 *  - **An explicitly empty array**: the section disappears entirely. This is
 *    the documented way to pull a reference off the site without a deploy, and
 *    a committed base would have silently taken it away — hence the key check
 *    rather than a length check on the validated result.
 *  - **A valid non-empty array**: it overrides the text, position by position,
 *    and never the links (see {@link mergeReferences}).
 */
export async function resolveServiceContent(
  service: ServiceDefinition,
  lang: Lang,
): Promise<ServiceContent> {
  const { references: _references, ...fallback } = service.fallback[lang];
  const resolved = await cmsFor(service.cmsKey, lang, fallback);
  const blocks = await fetchBlocks(lang);
  const block = blocks[service.cmsKey];

  const committed = referencesForService(service.id, lang);
  const hasKey = isRecord(block) && "references" in block;
  const emptied = hasKey && Array.isArray(block.references) && block.references.length === 0;

  const references = emptied
    ? []
    : mergeReferences(
        committed,
        isRecord(block) ? validateServiceReferences(block.references) : [],
      );

  return { ...resolved, references };
}
