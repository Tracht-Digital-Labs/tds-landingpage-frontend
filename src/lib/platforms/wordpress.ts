import type { PlatformDefinition } from "../platforms";
import { COST, REFERENCES, SOURCE } from "./shared";

/** The WordPress page (`/leistungen/wordpress`). */
export const wordpress: PlatformDefinition = {
  id: "wordpress",
  name: "WordPress",
  kind: "cms",
  slug: "wordpress",
  seoTitle: {
    de: "WordPress: Website, Wartung & Fehlerhilfe | Tracht Digital",
    en: "WordPress: Websites, Maintenance and Fixes | Tracht Digital",
  },
  updatedAt: "2026-10-12",
  wikipedia: {
    de: "https://de.wikipedia.org/wiki/WordPress",
    en: "https://en.wikipedia.org/wiki/WordPress",
  },
  keywords: {
    de: ["Fehler & Wartung", "Relaunch", "Themes", "Umzug"],
    en: ["Errors & maintenance", "Relaunch", "Themes", "Migration"],
  },
  articleSlugs: ["website-fuenf-dinge-die-fehlen", "konzept-vor-umsetzung"],
  sources: [SOURCE.w3techs, SOURCE.childThemes, SOURCE.wpThemes],
  content: {
    de: {
      label: "Webauftritt",
      title: "WordPress-Website erstellen, reparieren und pflegen",
      summary:
        "Tracht Digital Solutions baut WordPress-Websites, behebt Fehler, passt Themes an und übernimmt Updates und Pflege, aus Schwarzenbek bei Hamburg.",
      answer:
        "Tracht Digital Solutions ist ein Unternehmen aus Schwarzenbek bei Hamburg. Es betreut WordPress-Websites: Fehler beheben, Updates, neue Seiten, Themes und Umzüge. WordPress läuft laut W3Techs auf *40,3 % aller Websites* (September 2026).",
      situationsTitle: "Typische Ausgangslagen",
      situations: [
        "Statt der Website erscheint eine weiße Seite oder ein kritischer Fehler.",
        "Updates stehen seit Monaten aus, weil danach etwas kaputtgehen könnte.",
        "Die Seite ist veraltet, langsam oder auf dem Handy schwer zu bedienen.",
      ],
      offersTitle: "Leistungsumfang",
      offers: [
        {
          id: "fehler-beheben",
          title: "Fehler beheben und Wartung",
          text: "Die Ursache wird gefunden, die Seite danach aktuell gehalten.",
          points: [
            "Weiße Seite oder Fehler nach Updates",
            "Updates von WordPress, Themes und Plugins",
            "Sicherung vor jedem Eingriff",
          ],
        },
        {
          id: "relaunch",
          title: "Neue Website oder Relaunch",
          text: "Neubau oder Überarbeitung der Seite, mit klarer Struktur.",
          points: [
            "Seiten und Inhalte ordnen",
            "Für Handy und Bildschirm",
            "Grundlagen für Google",
          ],
        },
        {
          id: "theme",
          title: "Themes und Templates",
          text: "Anpassungen kommen in ein Child-Theme, so bleiben sie bei Updates erhalten.",
          points: [
            "Bestehendes Theme anpassen",
            "Block-Themes und klassische Themes",
            "Eigenes Theme nach eigenem Design",
          ],
        },
        {
          id: "umzug",
          title: "Umzug und Upgrades",
          text: "Umzug der Seite, mit Domain, E-Mail und Weiterleitungen.",
          points: [
            "Vom Baukasten zu WordPress",
            "Umzug zu einem anderen Hoster",
            "Aktuelle PHP-Version",
          ],
        },
      ],
      comparison: {
        title: "Block-Theme oder klassisches Theme?",
        intro:
          "Kurz gesagt: Block-Themes werden direkt im Website-Editor bearbeitet, klassische Themes über PHP-Vorlagen und den Customizer.",
        columns: ["Kriterium", "Block-Theme", "Klassisches Theme"],
        rows: [
          ["Aufbau", "Vorlagen aus Blöcken, Einstellungen in der theme.json", "PHP-Vorlagen, Einstellungen im Customizer"],
          ["Bearbeiten", "Kopf, Fuß und Vorlagen im Website-Editor", "Vieles nur im Code oder in Theme-Optionen"],
          ["Update-sicher anpassen", "Eigene Styles und Vorlagen, bei Bedarf Child-Theme", "Child-Theme"],
          ["Passt, wenn", "Layout und Inhalte selbst angepasst werden sollen", "eine bestehende Seite stabil weiterlaufen soll"],
        ],
      },
      outcomesTitle: "Ergebnis",
      outcomes: [
        "Die Seite läuft wieder und bleibt aktuell",
        "Updates mit Sicherung vorher",
        "Eine Seite, die auf dem Handy funktioniert",
      ],
      boundariesTitle: "Nicht enthalten",
      boundaries: [
        "Texte, Bilder und Rechtstexte kommen vom Kunden.",
        "Hosting, Domain und Premium-Plugins werden direkt an den Anbieter gezahlt.",
        "Tracht Digital Solutions arbeitet unabhängig und ist nicht mit WordPress.org oder Automattic verbunden.",
      ],
      processTitle: "Vorgehen",
      process: [
        "Kurze Beschreibung des Problems, ein Link genügt",
        "Prüfung der Seite mit Ursache und Aufwand",
        "Vor jedem Eingriff entsteht eine Sicherung",
      ],
      costTitle: COST.de.title,
      costText: COST.de.text,
      referencesHeadline: REFERENCES.de.headline,
      referencesLabel: REFERENCES.de.label,
      faqTitle: "Häufige Fragen zu WordPress",
      faq: [
        {
          q: "Eine WordPress-Seite zeigt einen kritischen Fehler, was tun?",
          a: "Meist steckt ein Plugin, das Theme oder ein Update dahinter. Tracht Digital Solutions findet die Ursache und bringt die Seite wieder zum Laufen.",
        },
        {
          q: "Wer übernimmt Updates und Wartung für WordPress?",
          a: "Tracht Digital Solutions hält WordPress, Themes und Plugins aktuell und sichert vorher, nach Bedarf oder als Monatsmodell.",
        },
        {
          q: "Was kostet eine WordPress-Website?",
          a: "Das hängt von Umfang und Funktionen ab. Abgerechnet wird nach Aufwand oder zum Festpreis. Kosten entstehen erst, wenn wir einen Auftrag vereinbaren.",
        },
        {
          q: "Lässt sich eine Seite vom Baukasten zu WordPress umziehen?",
          a: "Ja. Inhalte und Bilder werden übernommen, Weiterleitungen sorgen dafür, dass alte Links funktionieren.",
        },
      ],
      ctaTitle: "Die WordPress-Seite braucht Hilfe?",
      ctaText: "Eine kurze Nachricht, was nicht läuft, genügt, ein Link reicht.",
      ctaButton: "Erstgespräch vereinbaren",
    },
    en: {
      label: "Web presence",
      title: "Building, fixing and maintaining WordPress websites",
      summary:
        "Tracht Digital Solutions builds WordPress websites, fixes errors, customises themes and takes care of updates and upkeep, from Schwarzenbek near Hamburg.",
      answer:
        "Tracht Digital Solutions is a company based in Schwarzenbek near Hamburg. It looks after WordPress websites: fixing errors, updates, new sites, themes and migrations. According to W3Techs, WordPress runs *40.3% of all websites* (September 2026).",
      situationsTitle: "Typical situations",
      situations: [
        "Instead of the website there is a white page or a critical error.",
        "Updates have been waiting for months because something might break.",
        "The site is outdated, slow or hard to use on a phone.",
      ],
      offersTitle: "Scope of services",
      offers: [
        {
          id: "fix-errors",
          title: "Fixing errors and maintenance",
          text: "The cause is found, and the site is kept up to date afterwards.",
          points: [
            "White page or errors after updates",
            "Updates of WordPress, themes and plugins",
            "A backup before every change",
          ],
        },
        {
          id: "relaunch",
          title: "New website or relaunch",
          text: "Rebuilding or reworking the site, with a clear structure.",
          points: [
            "Ordering pages and content",
            "Built for phones and screens",
            "Search essentials",
          ],
        },
        {
          id: "theme",
          title: "Themes and templates",
          text: "Customisations go into a child theme, so they survive updates.",
          points: [
            "Customising an existing theme",
            "Block themes and classic themes",
            "A dedicated theme, built to a custom design",
          ],
        },
        {
          id: "migration",
          title: "Migrations and upgrades",
          text: "Moving the site, with domain, email and redirects.",
          points: [
            "From a site builder to WordPress",
            "Moving to another host",
            "A current PHP version",
          ],
        },
      ],
      comparison: {
        title: "Block theme or classic theme?",
        intro:
          "In short: block themes are edited right in the Site Editor, classic themes through PHP templates and the Customizer.",
        columns: ["Criterion", "Block theme", "Classic theme"],
        rows: [
          ["Structure", "Templates made of blocks, settings in theme.json", "PHP templates, settings in the Customizer"],
          ["Editing", "Header, footer and templates in the Site Editor", "Much of it only in code or theme options"],
          ["Update-safe changes", "Custom styles and templates, a child theme if needed", "Child theme"],
          ["Fits if", "layout and content should be adjusted in-house", "an existing site should keep running reliably"],
        ],
      },
      outcomesTitle: "Results",
      outcomes: [
        "The site works again, and stays up to date",
        "Updates with a backup first",
        "A site that works on phones",
      ],
      boundariesTitle: "Not included",
      boundaries: [
        "Copy, images and legal texts come from the client.",
        "Hosting, domain and premium plugins go to the provider directly.",
        "Tracht Digital Solutions works independently and is not affiliated with WordPress.org or Automattic.",
      ],
      processTitle: "Approach",
      process: [
        "A short description of the problem, a link is enough",
        "A review of the site with cause and effort",
        "A backup before every change",
      ],
      costTitle: COST.en.title,
      costText: COST.en.text,
      referencesHeadline: REFERENCES.en.headline,
      referencesLabel: REFERENCES.en.label,
      faqTitle: "Common questions about WordPress",
      faq: [
        {
          q: "A WordPress site shows a critical error, what now?",
          a: "Usually a plugin, the theme or an update is behind it. Tracht Digital Solutions finds the cause and gets the site running again.",
        },
        {
          q: "Who takes care of WordPress updates and maintenance?",
          a: "Tracht Digital Solutions keeps WordPress, themes and plugins up to date and backs up first, as needed or as a monthly arrangement.",
        },
        {
          q: "What does a WordPress website cost?",
          a: "That depends on scope and features. Work is billed by effort or at a fixed price. Costs only arise once we agree on an assignment.",
        },
        {
          q: "Can a site move from a site builder to WordPress?",
          a: "Yes. Content and images are carried over, and redirects keep old links working.",
        },
      ],
      ctaTitle: "WordPress site needs help?",
      ctaText: "A short note on what is not working is enough, a link will do.",
      ctaButton: "Arrange an initial consultation",
    },
  },
};
