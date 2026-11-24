import type { PlatformId } from "./platforms";
import { CATALOGUE } from "./serviceFinder";
import type { ServiceId } from "./services";

/**
 * The Shop products a service or platform page stands for, counted as the
 * visitor's interest when the page is viewed (`lib/productInterest.ts`).
 *
 * Only where the page is plainly about those products. Consulting, portals and
 * tailored solutions have no product in the Shop's catalogue, so a view of
 * them counts nothing. The platform pages lead with taking over, repairing and
 * maintaining a site, which is the maintenance product.
 */
export const SERVICE_INTEREST: Record<ServiceId, readonly string[]> = {
  "web-presence": CATALOGUE.webauftritt.lead,
  process: CATALOGUE.digitalisierung.lead,
  consulting: [],
  panels: [],
  solutions: [],
};

export const PLATFORM_INTEREST: Record<PlatformId, readonly string[]> = {
  wordpress: ["website-wartung-12-monate", "sicherheits-update-wordpress"],
  woocommerce: ["website-wartung-12-monate"],
  shopware: ["website-wartung-12-monate"],
  typo3: ["website-wartung-12-monate"],
  strato: ["website-wartung-12-monate", "website-umzug-zu-neuem-hoster"],
};

/** The `data-interest-products` value, absent when the page stands for no product. */
export function interestAttribute(ids: readonly string[]): string | undefined {
  return ids.length > 0 ? ids.join(" ") : undefined;
}
