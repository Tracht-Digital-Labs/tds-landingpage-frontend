import type { PlatformDefinition } from "../platforms";
import { COST, REFERENCES, SHOP_COMPARISON, SOURCE } from "./shared";

/** The WooCommerce page (`/leistungen/woocommerce`). */
export const woocommerce: PlatformDefinition = {
  id: "woocommerce",
  name: "WooCommerce",
  kind: "shop",
  slug: "woocommerce",
  seoTitle: {
    de: "WooCommerce: Shop erstellen & Fehler beheben | Tracht Digital",
    en: "WooCommerce: Shop Builds, Themes and Fixes | Tracht Digital",
  },
  updatedAt: "2026-10-12",
  wikipedia: {
    de: "https://de.wikipedia.org/wiki/WooCommerce",
    en: "https://en.wikipedia.org/wiki/WooCommerce",
  },
  keywords: {
    de: ["Fehler beheben", "Shop erstellen", "Theme anpassen"],
    en: ["Fixing errors", "Building shops", "Themes"],
  },
  articleSlugs: ["lohnt-sich-ein-webshop", "produktpflege-per-handy"],
  sources: [SOURCE.childThemes, SOURCE.wooGithub, SOURCE.shopwareGithub],
  content: {
    de: {
      label: "Webauftritt",
      title: "WooCommerce-Shop erstellen, reparieren und anpassen",
      summary:
        "Tracht Digital Solutions baut WooCommerce-Shops, behebt Fehler und passt Themes update-sicher an, aus Schwarzenbek bei Hamburg.",
      answer:
        "Tracht Digital Solutions ist ein Unternehmen aus Schwarzenbek bei Hamburg. Für WooCommerce richtet es Shops ein, behebt Fehler und passt Themes so an, dass Updates möglich bleiben, mit *einem festen Ansprechpartner*.",
      situationsTitle: "Typische Ausgangslagen",
      situations: [
        "Nach einem Update zeigt der Shop eine weiße Seite oder einen kritischen Fehler.",
        "Kunden brechen im Checkout ab, weil Zahlung oder Versand nicht funktionieren.",
        "Der Shop lädt langsam, und niemand weiß, warum.",
      ],
      offersTitle: "Leistungsumfang",
      offers: [
        {
          id: "fehler-beheben",
          title: "WooCommerce-Fehler beheben",
          text: "Gesucht wird die Ursache, statt nur das Symptom zu überdecken.",
          points: [
            "Weiße Seite oder kritischer Fehler nach Updates",
            "Probleme in Warenkorb, Checkout oder Zahlung",
            "Plugin-Konflikte und langsame Ladezeiten",
          ],
        },
        {
          id: "shop-erstellen",
          title: "WooCommerce-Shop erstellen",
          text: "Einrichtung des Shops auf WordPress, bereit für den deutschen Markt.",
          points: [
            "WordPress und WooCommerce einrichten",
            "Produkte anlegen oder importieren",
            "Zahlung, Versand und rechtliche Grundlagen, z. B. mit Germanized",
          ],
        },
        {
          id: "theme",
          title: "WooCommerce-Theme anpassen",
          text: "Änderungen kommen in ein Child-Theme, so bleiben Updates möglich.",
          points: [
            "Design passend zur Marke",
            "Produktseiten, Kategorien und Warenkorb",
            "Für Handy und kurze Ladezeiten",
          ],
        },
      ],
      comparison: SHOP_COMPARISON.de,
      outcomesTitle: "Ergebnis",
      outcomes: [
        "Der Shop läuft wieder, mit klarer Ursache",
        "Kunden kommen ohne Hürden durch den Checkout",
        "Das Design übersteht das nächste Update",
      ],
      boundariesTitle: "Nicht enthalten",
      boundaries: [
        "Rechtstexte liefert eine Kanzlei oder ein Rechtstexte-Dienst, eingebaut werden sie hier.",
        "Gebühren und Premium-Plugins werden direkt an den Anbieter gezahlt.",
        "Tracht Digital Solutions arbeitet unabhängig und ist kein offizieller Partner von WooCommerce oder Automattic.",
      ],
      processTitle: "Vorgehen",
      process: [
        "Kurze Beschreibung des Problems, gern mit Link",
        "Prüfung des Shops mit Ursache und Aufwand",
        "Änderungen werden auf einer Kopie getestet, dann gehen sie live",
      ],
      costTitle: COST.de.title,
      costText: COST.de.text,
      referencesHeadline: REFERENCES.de.headline,
      referencesLabel: REFERENCES.de.label,
      faqTitle: "Häufige Fragen zu WooCommerce",
      faq: [
        {
          q: "Wer behebt Fehler in einem WooCommerce-Shop?",
          a: "Tracht Digital Solutions findet die Ursache (meist ein Plugin, ein Update oder das Theme) und behebt sie.",
        },
        {
          q: "Was kostet ein WooCommerce-Shop?",
          a: "Das hängt von Produkten, Zahlungsarten und Design ab. Abgerechnet wird nach Aufwand oder zum Festpreis. Kosten entstehen erst, wenn wir einen Auftrag vereinbaren.",
        },
        {
          q: "Bleiben Anpassungen bei Theme-Updates erhalten?",
          a: "Ja, wenn sie in einem Child-Theme stehen. Genau so werden sie eingebaut.",
        },
        {
          q: "Für wen ist WooCommerce das richtige Shopsystem?",
          a: "Für Betriebe, die schon WordPress nutzen. Bei großen Sortimenten lohnt der Vergleich mit Shopware 6.",
        },
      ],
      ctaTitle: "Der Shop braucht Hilfe?",
      ctaText: "Eine kurze Nachricht, was nicht läuft, genügt, gern mit Link.",
      ctaButton: "Erstgespräch vereinbaren",
    },
    en: {
      label: "Web presence",
      title: "Building, fixing and customising WooCommerce shops",
      summary:
        "Tracht Digital Solutions builds WooCommerce shops, fixes errors and customises themes in an update-safe way, from Schwarzenbek near Hamburg.",
      answer:
        "Tracht Digital Solutions is a company based in Schwarzenbek near Hamburg. For WooCommerce it sets up shops, fixes errors and customises themes so that updates stay possible, with *one steady point of contact*.",
      situationsTitle: "Typical situations",
      situations: [
        "After an update the shop shows a white page or a critical error.",
        "Customers abandon checkout because payment or shipping does not work.",
        "The shop loads slowly, and nobody knows why.",
      ],
      offersTitle: "Scope of services",
      offers: [
        {
          id: "fix-errors",
          title: "Fixing WooCommerce errors",
          text: "The cause is tracked down instead of covering up the symptom.",
          points: [
            "White page or critical error after updates",
            "Problems in cart, checkout or payment",
            "Plugin conflicts and slow loading times",
          ],
        },
        {
          id: "build-shop",
          title: "Building a WooCommerce shop",
          text: "Setting up the shop on WordPress, ready for the German market.",
          points: [
            "Setting up WordPress and WooCommerce",
            "Adding or importing products",
            "Payment, shipping and legal essentials, e.g. with Germanized",
          ],
        },
        {
          id: "theme",
          title: "Customising the WooCommerce theme",
          text: "Changes go into a child theme, so updates stay possible.",
          points: [
            "A design that fits the brand",
            "Product pages, categories and cart",
            "Built for phones and short loading times",
          ],
        },
      ],
      comparison: SHOP_COMPARISON.en,
      outcomesTitle: "Results",
      outcomes: [
        "The shop works again, with a clear cause",
        "Customers get through checkout without obstacles",
        "The design survives the next update",
      ],
      boundariesTitle: "Not included",
      boundaries: [
        "Legal texts come from a law firm or a legal text service, they are put in place here.",
        "Fees and premium plugins go to the provider directly.",
        "Tracht Digital Solutions works independently and is not an official partner of WooCommerce or Automattic.",
      ],
      processTitle: "Approach",
      process: [
        "A short description of the problem, a link helps",
        "A review of the shop with cause and effort",
        "Changes are tested on a copy, then they go live",
      ],
      costTitle: COST.en.title,
      costText: COST.en.text,
      referencesHeadline: REFERENCES.en.headline,
      referencesLabel: REFERENCES.en.label,
      faqTitle: "Common questions about WooCommerce",
      faq: [
        {
          q: "Who fixes errors in a WooCommerce shop?",
          a: "Tracht Digital Solutions finds the cause (usually a plugin, an update or the theme) and fixes it.",
        },
        {
          q: "What does a WooCommerce shop cost?",
          a: "That depends on products, payment methods and design. Work is billed by effort or at a fixed price. Costs only arise once we agree on an assignment.",
        },
        {
          q: "Do customisations survive theme updates?",
          a: "Yes, if they live in a child theme. That is how they are built.",
        },
        {
          q: "Who is WooCommerce the right shop system for?",
          a: "For businesses that already use WordPress. With a large catalogue it is worth comparing Shopware 6.",
        },
      ],
      ctaTitle: "Shop needs help?",
      ctaText: "A short note on what is not working is enough, a link helps.",
      ctaButton: "Arrange an initial consultation",
    },
  },
};
