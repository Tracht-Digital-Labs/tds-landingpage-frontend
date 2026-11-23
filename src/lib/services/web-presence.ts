import type { ServiceDefinition } from "../services";

/** The service at `/leistungen/webauftritt`. */
export const webPresence = {
  // The broadest of the five, and deliberately so: a site, a shop and the
  // marketing that brings people to them are one job, not three. Marketing
  // was briefly its own service; splitting it made the visitor choose
  // between building a presence and being found through it, which is not a
  // choice a small business has. The ad-budget sentence in `boundaries`
  // came from that entry and has to stay — a fixed price on its own
  // understates what running ads actually costs.
  id: "web-presence",
  number: "05",
  cmsKey: "service_web_presence",
  slug: { de: "webauftritt", en: "web-presence" },
  seoTitle: {
    de: "Individuelle Website erstellen lassen | Tracht Digital",
    en: "Custom Websites Built Around Each Business | Tracht Digital",
  },
  seoDescription: {
    de: "Website und Onlineshop erstellen lassen: nach Maß, ohne Baukasten-Vorlage und ohne KI-Einheitstext. Tracht Digital Solutions aus Schwarzenbek bei Hamburg.",
    en: "Custom websites and online shops: made to measure, without site-builder templates or generic AI copy. Tracht Digital Solutions from Schwarzenbek near Hamburg.",
  },
  // 2026-10-12: the page now leads with what sets the work apart — a site
  // made for this business and its customers, not a template and not
  // generated filler. Taking over existing sites is still offered, second.
  updatedAt: "2026-10-12",
  // "SEO & KI-Suche" rather than "Google Ads & SEO": being found now means
  // two different machines reading the same page, and the second one is the
  // search this site can speak to from its own work. Google Ads is still
  // named in `responsibilities` below, where it belongs — it is a service,
  // not a thing somebody types into a search box.
  keywords: {
    de: ["Individuelle Websites", "Onlineshops", "Passend zum Firmenbild", "SEO & KI-Suche"],
    en: ["Custom websites", "Online shops", "True to the brand", "SEO & AI search"],
  },
  tagline: {
    de: "Websites nach Maß statt Vorlage",
    en: "Made-to-measure websites, not templates",
  },
  image: "/images/services/04-webauftritt-editorial.webp",
  fallback: {
    de: {
      label: "Alle Leistungen",
      title: "Webauftritt",
      summary:
        "Websites und Shops nach Maß: ausgerichtet auf die Kunden und passend zum Firmenbild, ohne Baukasten-Vorlage und ohne KI-Einheitstext.",
      intro:
        "Viele Websites sehen gleich aus: dieselbe Vorlage, dieselben Floskeln, oft von einer KI geschrieben. Eine Website von Tracht Digital Solutions sieht nach dem Betrieb aus, für den sie gebaut ist. Am Anfang steht die Frage, *wer die Kunden sind* und was sie suchen: Gestaltung, Texte und Funktionen folgen daraus. Bestehende Seiten werden auch übernommen; ersetzt wird nur, was im Weg steht.",
      situationsTitle: "Typische Ausgangslagen",
      situations: [
        "Die Website sieht aus wie viele andere: Texte und Bilder wirken austauschbar.",
        "Die Seite ist veraltet oder der Shop macht Ärger.",
        "Die Seite sieht gut aus, aber kaum jemand fragt an.",
      ],
      responsibilitiesTitle: "Leistungsumfang",
      responsibilities: [
        "Gestaltung passend zum Firmenbild, für Handy und Bildschirm",
        "Aufbau und Texte aus Sicht der Kunden, nicht aus einer Vorlage",
        "Onlineshops einrichten oder reparieren, z. B. WooCommerce oder Shopware 6",
        "Übernahme bestehender Seiten auf WordPress, TYPO3 oder bei STRATO",
        "Marketing: Auffindbarkeit bei Google und in KI-Antworten (SEO und GEO), Google Ads und Unternehmensprofil",
      ],
      outcomesTitle: "Ergebnis",
      outcomes: [
        "Eine Website, die auf den ersten Blick zum Betrieb gehört",
        "Besucher verstehen sofort das Angebot",
        "Gefunden werden, bei Google und in KI-Antworten",
      ],
      boundariesTitle: "Nicht enthalten",
      boundaries: [
        "Das Werbebudget für Anzeigen geht direkt an Google.",
        "Texte, Fotos und Rechtstexte brauchen Zuarbeit aus dem Betrieb.",
        "Platzierungen bei Google lassen sich nicht kaufen, in KI-Antworten genauso wenig.",
      ],
      processTitle: "Vorgehen",
      process: [
        "Kunden, Ziele und Firmenbild kennenlernen",
        "Gestaltung und Texte entwerfen und gemeinsam abstimmen",
        "Bauen, online stellen und sichtbar machen",
      ],
      priceLabel: "Preis",
      priceText:
        "Die Preise stehen im Shop, jedes Projekt bekommt ein schriftliches Angebot.",
      referencesLabel: "Veröffentlicht nur mit Freigabe der Kunden.",
      referencesHeadline: "Einblicke aus der Praxis",
      references: [],
      ctaTitle: "Eine Website, die nach dem eigenen Betrieb aussieht?",
      ctaText: "Im Erstgespräch geht es um Betrieb, Kunden und den sinnvollen Umfang.",
      ctaButton: "Erstgespräch vereinbaren",
    },
    en: {
      label: "All services",
      title: "Web Presence",
      summary:
        "Made-to-measure websites and shops: built around the customers and true to the brand, without site-builder templates or generic AI copy.",
      intro:
        "Many websites look the same: the same template, the same phrases, often written by an AI. A website by Tracht Digital Solutions looks like the business it is built for. It starts with *who the customers are* and what they look for, design, copy and features follow from that. Existing sites are taken over too; only what stands in the way is replaced.",
      situationsTitle: "Typical situations",
      situations: [
        "The website looks like many others, copy and images feel interchangeable.",
        "The site is outdated or the shop is causing problems.",
        "The site looks good, but hardly anyone gets in touch.",
      ],
      responsibilitiesTitle: "Scope of services",
      responsibilities: [
        "Design true to the brand, for phones and screens",
        "Structure and copy from the customers' point of view, not a template",
        "Set up or repair online shops, e.g. WooCommerce or Shopware 6",
        "Take over existing sites on WordPress, TYPO3 or at STRATO",
        "Marketing: findability on Google and in AI answers (SEO and GEO), Google Ads and business profile",
      ],
      outcomesTitle: "Results",
      outcomes: [
        "A website that recognisably belongs to the business",
        "Visitors understand the offer straight away",
        "Being found, on Google and in AI answers",
      ],
      boundariesTitle: "Not included",
      boundaries: [
        "The ad budget goes to Google directly.",
        "Copy, photos and legal texts need input from the business.",
        "Google rankings cannot be bought, nor can a mention in an AI answer.",
      ],
      processTitle: "Approach",
      process: [
        "Get to know customers, goals and brand",
        "Draft design and copy and agree on them together",
        "Build, put online and make visible",
      ],
      priceLabel: "Price",
      priceText:
        "Prices are listed in the shop, every project gets a written quote.",
      referencesLabel: "Published only with the client's approval.",
      referencesHeadline: "Examples from practice",
      references: [],
      ctaTitle: "A website that looks like the business?",
      ctaText: "The initial consultation covers the business, its customers and a sensible scope.",
      ctaButton: "Arrange an initial consultation",
    },
  },
} satisfies ServiceDefinition;
