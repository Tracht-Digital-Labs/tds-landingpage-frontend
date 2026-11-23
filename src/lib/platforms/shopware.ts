import type { PlatformDefinition } from "../platforms";
import { COST, REFERENCES, SHOP_COMPARISON, SOURCE } from "./shared";

/** The Shopware 6 page (`/leistungen/shopware`). */
export const shopware: PlatformDefinition = {
  id: "shopware",
  name: "Shopware 6",
  kind: "shop",
  slug: "shopware",
  seoTitle: {
    de: "Shopware 6: Shop, Theme & Fehlerbehebung | Tracht Digital",
    en: "Shopware 6: Shops, Themes and Fixes | Tracht Digital",
  },
  updatedAt: "2026-10-12",
  wikipedia: {
    de: "https://de.wikipedia.org/wiki/Shopware",
    en: "https://en.wikipedia.org/wiki/Shopware",
  },
  keywords: {
    de: ["Fehler beheben", "Shop erstellen", "Theme anpassen", "Umstieg von Shopware 5"],
    en: ["Fixing errors", "Building shops", "Themes", "Moving from Shopware 5"],
  },
  articleSlugs: ["lohnt-sich-ein-webshop", "produktpflege-per-handy"],
  sources: [SOURCE.shopwareEol, SOURCE.shopwareMigration, SOURCE.shopwareGithub, SOURCE.wooGithub],
  content: {
    de: {
      label: "Webauftritt",
      title: "Shopware-6-Shop erstellen, reparieren und anpassen",
      summary:
        "Tracht Digital Solutions richtet Shopware-6-Shops ein, behebt Fehler nach Updates und baut Themes, auch beim Umstieg von Shopware 5.",
      answer:
        "Tracht Digital Solutions ist ein Unternehmen aus Schwarzenbek bei Hamburg. Für Shopware 6 richtet es Shops ein, behebt Fehler und baut Themes. Es begleitet auch den Umstieg von Shopware 5, dessen Sicherheitsupdates *am 31. Juli 2024 endeten*.",
      situationsTitle: "Typische Ausgangslagen",
      situations: [
        "Nach einem Update lädt die Storefront oder die Administration nicht mehr richtig.",
        "Eine Erweiterung verträgt sich nicht mit der neuen Version.",
        "Der Shop läuft noch auf Shopware 5, ohne Sicherheitsupdates.",
      ],
      offersTitle: "Leistungsumfang",
      offers: [
        {
          id: "fehler-beheben",
          title: "Shopware-6-Fehler beheben",
          text: "Fehler werden systematisch eingegrenzt und an der Ursache behoben.",
          points: [
            "Fehler nach Updates",
            "Konflikte zwischen Erweiterungen",
            "Probleme bei Checkout, Zahlung oder Versand",
          ],
        },
        {
          id: "shop-erstellen",
          title: "Shopware-6-Shop erstellen",
          text: "Einrichtung eines neuen Shops oder der Umzug von Shopware 5.",
          points: [
            "Einrichtung und Verkaufskanäle",
            "Produkte anlegen oder importieren",
            "Umstieg mit dem Migrationsassistenten",
          ],
        },
        {
          id: "theme",
          title: "Shopware-6-Theme anpassen",
          text: "Das Theme baut auf Storefront auf. So bleiben Updates möglich.",
          points: [
            "Eigenes Theme statt Änderungen am Kern",
            "Farben, Schriften und Layout nach der Marke",
            "Erlebniswelten für Startseite und Aktionen",
          ],
        },
      ],
      comparison: SHOP_COMPARISON.de,
      outcomesTitle: "Ergebnis",
      outcomes: [
        "Der Shop läuft auf einer unterstützten Version",
        "Updates sind wieder planbar",
        "Das Design passt zur Marke und übersteht Updates",
      ],
      boundariesTitle: "Nicht enthalten",
      boundaries: [
        "Lizenzen für Shopware-Pläne und Erweiterungen werden direkt an den Anbieter gezahlt.",
        "Beim Umstieg von Shopware 5 ziehen die Daten um, Theme und Erweiterungen entstehen neu.",
        "Tracht Digital Solutions arbeitet unabhängig und ist kein offizieller Shopware-Partner.",
      ],
      processTitle: "Vorgehen",
      process: [
        "Kurze Beschreibung des Problems, mit Shop-Version, falls bekannt",
        "Prüfung des Shops mit Ursache und Aufwand",
        "Updates werden auf einer Kopie getestet, dann gehen sie live",
      ],
      costTitle: COST.de.title,
      costText: COST.de.text,
      referencesHeadline: REFERENCES.de.headline,
      referencesLabel: REFERENCES.de.label,
      faqTitle: "Häufige Fragen zu Shopware 6",
      faq: [
        {
          q: "Shopware 5 bekommt keine Sicherheitsupdates mehr, was jetzt?",
          a: "Die Sicherheitsupdates endeten am 31. Juli 2024. Sinnvoll ist der Umstieg auf Shopware 6: Die Daten ziehen mit dem Migrationsassistenten um, Theme und Erweiterungen entstehen neu.",
        },
        {
          q: "Wer behebt Fehler nach einem Shopware-Update?",
          a: "Tracht Digital Solutions findet heraus, ob Update, Erweiterung oder Theme den Fehler auslöst, und behebt die Ursache.",
        },
        {
          q: "Was kostet ein Shopware-6-Shop?",
          a: "Das hängt von Sortiment, Design und Erweiterungen ab. Abgerechnet wird nach Aufwand oder zum Festpreis. Kosten entstehen erst, wenn wir einen Auftrag vereinbaren.",
        },
        {
          q: "Ist Shopware 6 besser als WooCommerce?",
          a: "Nicht besser, sondern anders: Shopware 6 ist ein eigenständiges Shopsystem, WooCommerce erweitert WordPress.",
        },
      ],
      ctaTitle: "Der Shopware-Shop braucht Hilfe?",
      ctaText: "Eine kurze Nachricht, was nicht läuft, genügt, gern mit Shop-Version und Link.",
      ctaButton: "Erstgespräch vereinbaren",
    },
    en: {
      label: "Web presence",
      title: "Building, fixing and customising Shopware 6 shops",
      summary:
        "Tracht Digital Solutions sets up Shopware 6 shops, fixes errors after updates and builds themes, including the move from Shopware 5.",
      answer:
        "Tracht Digital Solutions is a company based in Schwarzenbek near Hamburg. For Shopware 6 it sets up shops, fixes errors and builds themes. It also handles the move from Shopware 5, whose security updates *ended on 31 July 2024*.",
      situationsTitle: "Typical situations",
      situations: [
        "After an update the storefront or the administration no longer loads properly.",
        "An extension does not work with the new version.",
        "The shop still runs on Shopware 5, without security updates.",
      ],
      offersTitle: "Scope of services",
      offers: [
        {
          id: "fix-errors",
          title: "Fixing Shopware 6 errors",
          text: "Errors are narrowed down systematically and fixed at the cause.",
          points: [
            "Errors after updates",
            "Conflicts between extensions",
            "Problems with checkout, payment or shipping",
          ],
        },
        {
          id: "build-shop",
          title: "Building a Shopware 6 shop",
          text: "Setting up a new shop, or moving it over from Shopware 5.",
          points: [
            "Setup and sales channels",
            "Adding or importing products",
            "Moving with the migration assistant",
          ],
        },
        {
          id: "theme",
          title: "Customising the Shopware 6 theme",
          text: "The theme builds on Storefront. That keeps updates possible.",
          points: [
            "A dedicated theme instead of changes to the core",
            "Colours, fonts and layout to match the brand",
            "Shopping Experiences for the home page and promotions",
          ],
        },
      ],
      comparison: SHOP_COMPARISON.en,
      outcomesTitle: "Results",
      outcomes: [
        "The shop runs on a supported version",
        "Updates are plannable again",
        "The design fits the brand and survives updates",
      ],
      boundariesTitle: "Not included",
      boundaries: [
        "Licences for Shopware plans and extensions go to the provider directly.",
        "Moving from Shopware 5 carries the data across; theme and extensions are rebuilt.",
        "Tracht Digital Solutions works independently and is not an official Shopware partner.",
      ],
      processTitle: "Approach",
      process: [
        "A short description of the problem, with the shop version if known",
        "A review of the shop with cause and effort",
        "Updates are tested on a copy, then they go live",
      ],
      costTitle: COST.en.title,
      costText: COST.en.text,
      referencesHeadline: REFERENCES.en.headline,
      referencesLabel: REFERENCES.en.label,
      faqTitle: "Common questions about Shopware 6",
      faq: [
        {
          q: "Shopware 5 no longer gets security updates, what now?",
          a: "Security updates ended on 31 July 2024. Moving to Shopware 6 makes sense: the data moves with the migration assistant, while theme and extensions are rebuilt.",
        },
        {
          q: "Who fixes errors after a Shopware update?",
          a: "Tracht Digital Solutions finds out whether the update, an extension or the theme triggers the error and fixes the cause.",
        },
        {
          q: "What does a Shopware 6 shop cost?",
          a: "That depends on catalogue, design and extensions. Work is billed by effort or at a fixed price. Costs only arise once we agree on an assignment.",
        },
        {
          q: "Is Shopware 6 better than WooCommerce?",
          a: "Not better, different: Shopware 6 is a standalone shop system, WooCommerce extends WordPress.",
        },
      ],
      ctaTitle: "Shopware shop needs help?",
      ctaText: "A short note on what is not working is enough, shop version and a link help.",
      ctaButton: "Arrange an initial consultation",
    },
  },
};
