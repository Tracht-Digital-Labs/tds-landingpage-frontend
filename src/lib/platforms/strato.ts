import type { PlatformDefinition } from "../platforms";
import { COST, REFERENCES, SOURCE } from "./shared";

/** The STRATO page (`/leistungen/strato`). */
export const strato: PlatformDefinition = {
  id: "strato",
  name: "STRATO",
  kind: "builder",
  slug: "strato",
  seoTitle: {
    de: "STRATO-Website: Hilfe & Umzug zu WordPress | Tracht Digital",
    en: "STRATO Websites: Help and Moving to WordPress | Tracht Digital",
  },
  updatedAt: "2026-10-12",
  wikipedia: {
    de: "https://de.wikipedia.org/wiki/Strato_AG",
    en: "https://en.wikipedia.org/wiki/Strato_AG",
  },
  keywords: {
    de: ["Baukasten-Hilfe", "Relaunch", "Gestaltung", "Umzug zu WordPress"],
    en: ["Builder help", "Relaunch", "Design", "Moving to WordPress"],
  },
  articleSlugs: ["website-fuenf-dinge-die-fehlen", "konzept-vor-umsetzung"],
  sources: [SOURCE.stratoBuilder, SOURCE.stratoWordpress, SOURCE.childThemes],
  content: {
    de: {
      label: "Webauftritt",
      title: "Hilfe für STRATO-Websites, vom Baukasten bis WordPress",
      summary:
        "Homepage-Baukasten oder WordPress bei STRATO? Tracht Digital Solutions hilft bei Aufbau, Fehlern und Design und beim Umzug zu WordPress.",
      answer:
        "Tracht Digital Solutions ist ein Unternehmen aus Schwarzenbek bei Hamburg. Es hilft bei Websites auf STRATO, ob Homepage-Baukasten oder WordPress: bei Aufbau, Fehlern und Gestaltung und *beim Umzug zu WordPress*.",
      situationsTitle: "Typische Ausgangslagen",
      situations: [
        "Der Homepage-Baukasten ist eingerichtet, aber die Seite wirkt nicht professionell.",
        "Die WordPress-Seite bei STRATO zeigt Fehler oder lädt langsam.",
        "Der Baukasten kann nicht, was gebraucht wird.",
      ],
      offersTitle: "Leistungsumfang",
      offers: [
        {
          id: "fehler-beheben",
          title: "Fehler beheben und Pflege",
          text: "Hilfe bei Problemen mit Baukasten, WordPress und Einstellungen.",
          points: [
            "Menüs und Seitenstruktur im Baukasten",
            "Fehler und Updates bei WordPress",
            "Domain, SSL und E-Mail prüfen",
          ],
        },
        {
          id: "relaunch",
          title: "Neue Website oder Relaunch",
          text: "Die Seite wird im Baukasten neu aufgebaut oder mit WordPress umgesetzt.",
          points: [
            "Struktur und Inhalte ordnen",
            "Gestaltung passend zum Betrieb",
            "Für Handy und Bildschirm",
          ],
        },
        {
          id: "vorlagen",
          title: "Vorlagen und Gestaltung",
          text: "Vorlage, Farben, Schriften und Bilder werden angepasst, bei WordPress mit einem Child-Theme.",
          points: [
            "Passende Vorlage auswählen",
            "Farben und Schriften nach der Marke",
            "Einheitliche Seiten statt Flickenteppich",
          ],
        },
        {
          id: "umzug",
          title: "Umzug zu WordPress",
          text: "Stößt der Baukasten an Grenzen, zieht die Seite zu WordPress um.",
          points: [
            "Inhalte und Bilder übernehmen",
            "Domain und E-Mail mitnehmen",
            "Weiterleitungen für alte Adressen",
          ],
        },
      ],
      comparison: {
        title: "STRATO Homepage-Baukasten oder WordPress?",
        intro:
          "Kurz gesagt: Der Baukasten bringt Vorlagen und Technik fertig mit. WordPress bietet mehr Gestaltung und Funktionen, braucht aber Pflege.",
        columns: ["Kriterium", "Homepage-Baukasten", "WordPress, z. B. mit Hosting für WordPress"],
        rows: [
          ["Einstieg", "Vorlage wählen und Inhalte einfügen", "Theme, Plugins und Struktur einrichten"],
          ["Technik", "STRATO kümmert sich um die Technik", "Braucht Updates: Hosting für WordPress aktualisiert WordPress automatisch"],
          ["Gestaltung", "Vorlagen des Baukastens", "Viele Themes oder ein eigenes Design"],
          ["Shop", "Über den SmartWebshop", "Über Plugins, z. B. WooCommerce"],
          ["Passt, wenn", "schnell eine übersichtliche Seite gebraucht wird", "mehr Gestaltung oder Funktionen gebraucht werden"],
        ],
      },
      outcomesTitle: "Ergebnis",
      outcomes: [
        "Die Seite wirkt professionell",
        "Fehler sind behoben, mit klarer Ursache",
        "Ein Umzug zu WordPress, bei dem Domain und E-Mail mitkommen",
      ],
      boundariesTitle: "Nicht enthalten",
      boundaries: [
        "Verträge und Tarife bleiben bei STRATO.",
        "Nicht jede Baukasten-Funktion lässt sich eins zu eins nachbauen, das wird vorher geklärt.",
        "Tracht Digital Solutions arbeitet unabhängig und ist kein Partner von STRATO.",
      ],
      processTitle: "Vorgehen",
      process: [
        "Kurze Beschreibung, was genutzt wird und was nicht klappt, ein Link genügt",
        "Prüfung der Seite mit Weg und Aufwand",
        "Vor einem Umzug werden alle Inhalte gesichert",
      ],
      costTitle: COST.de.title,
      costText: COST.de.text,
      referencesHeadline: REFERENCES.de.headline,
      referencesLabel: REFERENCES.de.label,
      faqTitle: "Häufige Fragen zu STRATO-Websites",
      faq: [
        {
          q: "Hilft Tracht Digital Solutions auch beim STRATO Homepage-Baukasten?",
          a: "Ja. Vorlage, Seiten und Einstellungen werden eingerichtet, dazu gibt es eine Einweisung in die eigene Pflege.",
        },
        {
          q: "Wann lohnt sich der Wechsel vom Baukasten zu WordPress?",
          a: "Wenn Funktionen, Gestaltung oder ein Shop gebraucht werden, die der Baukasten nicht bietet. Sonst bleibt der Baukasten oft die einfachere Lösung.",
        },
        {
          q: "Kann die Domain bei STRATO bleiben?",
          a: "Ja. Die Domain kann bei STRATO bleiben und auf die neue Seite zeigen oder mit umziehen.",
        },
        {
          q: "Was kostet die Hilfe bei einer STRATO-Website?",
          a: "Abgerechnet wird nach Aufwand oder zum Festpreis. Kosten entstehen erst, wenn wir einen Auftrag vereinbaren. Der STRATO-Tarif läuft wie bisher direkt über STRATO.",
        },
      ],
      ctaTitle: "Die STRATO-Website soll mehr können?",
      ctaText: "Eine kurze Nachricht zu System und Vorhaben genügt, ein Link reicht.",
      ctaButton: "Erstgespräch vereinbaren",
    },
    en: {
      label: "Web presence",
      title: "Help with STRATO websites, from site builder to WordPress",
      summary:
        "STRATO website builder or WordPress at STRATO? Tracht Digital Solutions helps with setup, errors and design, and with moving to WordPress.",
      answer:
        "Tracht Digital Solutions is a company based in Schwarzenbek near Hamburg. It helps with websites at STRATO, on the Homepage-Baukasten website builder or WordPress: with setup, errors and design, and *with moving to WordPress*.",
      situationsTitle: "Typical situations",
      situations: [
        "The website builder is set up, but the site does not look professional.",
        "The WordPress site at STRATO shows errors or loads slowly.",
        "The builder cannot do what is needed.",
      ],
      offersTitle: "Scope of services",
      offers: [
        {
          id: "fix-errors",
          title: "Fixing errors and upkeep",
          text: "Help with problems in the builder, in WordPress and with settings.",
          points: [
            "Menus and page structure in the builder",
            "WordPress errors and updates",
            "Checking domain, SSL and email",
          ],
        },
        {
          id: "relaunch",
          title: "New website or relaunch",
          text: "The site is rebuilt in the builder or moved onto WordPress.",
          points: [
            "Ordering structure and content",
            "A design that suits the business",
            "Built for phones and screens",
          ],
        },
        {
          id: "templates",
          title: "Templates and design",
          text: "Template, colours, fonts and images are adjusted, on WordPress with a child theme.",
          points: [
            "Choosing a suitable template",
            "Colours and fonts to match the brand",
            "Consistent pages instead of a patchwork",
          ],
        },
        {
          id: "migration",
          title: "Moving to WordPress",
          text: "When the builder reaches its limits, the site moves to WordPress.",
          points: [
            "Carrying over content and images",
            "Taking domain and email along",
            "Redirects for old addresses",
          ],
        },
      ],
      comparison: {
        title: "STRATO website builder or WordPress?",
        intro:
          "In short: the builder comes with templates and technology ready to go. WordPress offers more design and features but needs upkeep.",
        columns: ["Criterion", "Homepage-Baukasten (website builder)", "WordPress, e.g. with WordPress hosting"],
        rows: [
          ["Getting started", "Pick a template and add content", "Set up theme, plugins and structure"],
          ["Technology", "STRATO takes care of the technology", "Needs updates: STRATO's WordPress hosting updates WordPress automatically"],
          ["Design", "The builder's templates", "Many themes or a custom design"],
          ["Shop", "Via the SmartWebshop", "Via plugins, e.g. WooCommerce"],
          ["Fits if", "a clear site is needed quickly", "more design or features are needed"],
        ],
      },
      outcomesTitle: "Results",
      outcomes: [
        "The site looks professional",
        "Errors are fixed, with a clear cause",
        "A move to WordPress in which domain and email come along",
      ],
      boundariesTitle: "Not included",
      boundaries: [
        "Contracts and plans stay with STRATO.",
        "Not every builder feature can be rebuilt one to one, that is clarified first.",
        "Tracht Digital Solutions works independently and is not a STRATO partner.",
      ],
      processTitle: "Approach",
      process: [
        "A short note on what is used and what is not working, a link is enough",
        "A review of the site with the way forward and the effort",
        "All content is backed up before a move",
      ],
      costTitle: COST.en.title,
      costText: COST.en.text,
      referencesHeadline: REFERENCES.en.headline,
      referencesLabel: REFERENCES.en.label,
      faqTitle: "Common questions about STRATO websites",
      faq: [
        {
          q: "Does Tracht Digital Solutions also help with the STRATO website builder?",
          a: "Yes. Template, pages and settings are set up, together with a walkthrough for in-house upkeep.",
        },
        {
          q: "When is it worth moving from the builder to WordPress?",
          a: "When features, design or a shop are needed that the builder does not offer. Otherwise the builder is often the simpler option.",
        },
        {
          q: "Can the domain stay at STRATO?",
          a: "Yes. It can stay at STRATO and point to the new site, or move along.",
        },
        {
          q: "What does help with a STRATO website cost?",
          a: "Work is billed by effort or at a fixed price. Costs only arise once we agree on an assignment. The STRATO plan stays billed by STRATO.",
        },
      ],
      ctaTitle: "STRATO website should do more?",
      ctaText: "A short note on the system and the plan is enough, a link will do.",
      ctaButton: "Arrange an initial consultation",
    },
  },
};
