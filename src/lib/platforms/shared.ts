import type { Lang } from "../i18n";
import type { PlatformComparison, PlatformSource } from "../platforms";

/** Copy and sources more than one platform page uses (`lib/platforms.ts`). */

export const COST: Record<Lang, { title: string; text: string }> = {
  de: {
    title: "Was kostet das?",
    text: "Vor Beginn steht ein Festpreis oder ein eigenes Angebot. Kosten entstehen erst, wenn wir einen Auftrag vereinbaren.",
  },
  en: {
    title: "What does it cost?",
    text: "Work starts only after a fixed price or a quote of its own. Costs only arise once we agree on an assignment.",
  },
};

export const REFERENCES: Record<Lang, { headline: string; label: string }> = {
  de: {
    headline: "Aus der Praxis",
    label: "Veröffentlicht nur mit Freigabe der Kunden.",
  },
  en: {
    headline: "From practice",
    label: "Published only with the client's approval.",
  },
};

/** Both shop pages answer the same question the same way. */
export const SHOP_COMPARISON: Record<Lang, PlatformComparison> = {
  de: {
    title: "WooCommerce oder Shopware 6?",
    intro:
      "Kurz gesagt: WooCommerce erweitert WordPress, Shopware 6 ist ein eigenständiges Shopsystem. Entscheidend sind die vorhandene Website und das Sortiment.",
    columns: ["Kriterium", "WooCommerce", "Shopware 6"],
    rows: [
      ["Grundlage", "Plugin für WordPress", "Eigenständiges Shopsystem"],
      ["Website und Shop", "Ein System mit der WordPress-Seite", "Inhalte über Erlebniswelten im Shop"],
      ["Gestaltung", "WordPress-Themes, anpassbar per Child-Theme", "Themes auf Basis von Storefront"],
      ["Lizenz", "Open Source", "Community Edition als Open Source, dazu kostenpflichtige Pläne"],
      ["Passt, wenn", "WordPress schon im Einsatz ist", "der Shop das Herzstück ist, mit vielen Artikeln oder Kanälen"],
    ],
  },
  en: {
    title: "WooCommerce or Shopware 6?",
    intro:
      "In short: WooCommerce extends WordPress, Shopware 6 is a standalone shop system. What matters most is the existing website and the catalogue.",
    columns: ["Criterion", "WooCommerce", "Shopware 6"],
    rows: [
      ["Basis", "WordPress plugin", "Standalone shop system"],
      ["Website and shop", "One system with the WordPress site", "Content via Shopping Experiences in the shop"],
      ["Design", "WordPress themes, customisable with a child theme", "Themes based on Storefront"],
      ["Licence", "Open source", "Community Edition as open source, plus paid plans"],
      ["Fits if", "WordPress is already in use", "the shop is the core, with many products or channels"],
    ],
  },
};

const same = (url: string): Record<Lang, string> => ({ de: url, en: url });

export const SOURCE = {
  childThemes: {
    label: { de: "WordPress-Entwicklerdoku: Child-Themes", en: "WordPress developer docs: child themes" },
    url: same("https://developer.wordpress.org/themes/advanced-topics/child-themes/"),
  },
  wpThemes: {
    label: {
      de: "WordPress-Entwicklerdoku: Themes (Block- und klassische Themes)",
      en: "WordPress developer docs: themes (block and classic)",
    },
    url: same("https://developer.wordpress.org/themes/"),
  },
  w3techs: {
    label: {
      de: "W3Techs: Verbreitung von WordPress (September 2026)",
      en: "W3Techs: WordPress usage statistics (September 2026)",
    },
    url: same("https://w3techs.com/technologies/details/cm-wordpress"),
  },
  wooGithub: {
    label: { de: "WooCommerce auf GitHub (Quellcode und Lizenz)", en: "WooCommerce on GitHub (source code and licence)" },
    url: same("https://github.com/woocommerce/woocommerce"),
  },
  shopwareGithub: {
    label: { de: "Shopware auf GitHub (Quellcode und Lizenz)", en: "Shopware on GitHub (source code and licence)" },
    url: same("https://github.com/shopware/shopware"),
  },
  shopwareEol: {
    label: {
      de: "endoflife.date: Shopware-Versionen und Supportzeiträume",
      en: "endoflife.date: Shopware versions and support periods",
    },
    url: same("https://endoflife.date/shopware"),
  },
  shopwareMigration: {
    label: {
      de: "Shopware: Migration von Shopware 5 zu Shopware 6",
      en: "Shopware: migrating from Shopware 5 to Shopware 6",
    },
    url: {
      de: "https://www.shopware.com/de/migration/shopware-5-zu-shopware-6/",
      en: "https://www.shopware.com/en/migration/shopware-5-to-shopware-6/",
    },
  },
  typo3News: {
    label: { de: "TYPO3 News: Supportende für TYPO3 v12 LTS", en: "TYPO3 News: end of support for TYPO3 v12 LTS" },
    url: same("https://news.typo3.com/article/typo3-v12-lts-end-of-free-support"),
  },
  typo3Roadmap: {
    label: { de: "TYPO3: Roadmap und Supportzeiträume", en: "TYPO3: roadmap and support periods" },
    url: same("https://typo3.com/typo3-cms/development-roadmap/roadmap"),
  },
  typo3Sitepackage: {
    label: { de: "TYPO3-Doku: Site-Package-Tutorial", en: "TYPO3 docs: site package tutorial" },
    url: same("https://docs.typo3.org/m/typo3/tutorial-sitepackage/main/en-us/"),
  },
  stratoBuilder: {
    label: { de: "STRATO: Homepage-Baukasten", en: "STRATO: Homepage-Baukasten website builder (German)" },
    url: same("https://www.strato.de/homepage-baukasten/"),
  },
  stratoWordpress: {
    label: { de: "STRATO: Hosting für WordPress", en: "STRATO: WordPress hosting (German)" },
    url: same("https://www.strato.de/hosting/wordpress-hosting/"),
  },
} as const satisfies Record<string, PlatformSource>;
