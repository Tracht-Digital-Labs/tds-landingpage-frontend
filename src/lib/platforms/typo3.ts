import type { PlatformDefinition } from "../platforms";
import { COST, REFERENCES, SOURCE } from "./shared";

/** The TYPO3 page (`/leistungen/typo3`). */
export const typo3: PlatformDefinition = {
  id: "typo3",
  name: "TYPO3",
  kind: "cms",
  slug: "typo3",
  seoTitle: {
    de: "TYPO3: Update, Relaunch & Wartung | Tracht Digital",
    en: "TYPO3: Upgrades, Relaunches and Maintenance | Tracht Digital",
  },
  updatedAt: "2026-10-12",
  wikipedia: {
    de: "https://de.wikipedia.org/wiki/TYPO3",
    en: "https://en.wikipedia.org/wiki/TYPO3",
  },
  keywords: {
    de: ["Fehler & Wartung", "Relaunch", "Templates", "Upgrade"],
    en: ["Errors & maintenance", "Relaunch", "Templates", "Upgrades"],
  },
  articleSlugs: ["website-fuenf-dinge-die-fehlen", "konzept-vor-umsetzung"],
  sources: [SOURCE.typo3News, SOURCE.typo3Roadmap, SOURCE.typo3Sitepackage],
  content: {
    de: {
      label: "Webauftritt",
      title: "TYPO3-Website updaten, reparieren und pflegen",
      summary:
        "Tracht Digital Solutions bringt TYPO3-Websites auf eine unterstützte Version, behebt Fehler und übernimmt die Pflege, aus Schwarzenbek bei Hamburg.",
      answer:
        "Tracht Digital Solutions ist ein Unternehmen aus Schwarzenbek bei Hamburg. Es betreut TYPO3-Websites: Upgrades, Fehlerbehebung, Templates und Relaunches. Wichtig: TYPO3 v12 bekommt *seit dem 1. Mai 2026 keine Community-Updates mehr*.",
      situationsTitle: "Typische Ausgangslagen",
      situations: [
        "Die Seite läuft noch auf TYPO3 v12 oder älter.",
        "Nach einem Update funktioniert eine Extension nicht mehr.",
        "Die Agentur, die die Seite gebaut hat, betreut sie nicht mehr.",
      ],
      offersTitle: "Leistungsumfang",
      offers: [
        {
          id: "fehler-beheben",
          title: "Fehler beheben und Wartung",
          text: "Fehler werden gefunden, TYPO3 bleibt mit Sicherheitsupdates aktuell.",
          points: [
            "Fehler im Backend oder Frontend",
            "Extensions nach Updates reparieren",
            "Sicherung vor jedem Eingriff",
          ],
        },
        {
          id: "relaunch",
          title: "Neue Website oder Relaunch",
          text: "Die Seite wird neu aufgesetzt, mit aktuellem TYPO3 und einem Backend, das die Redaktion gut bedienen kann.",
          points: [
            "Seitenbaum und Inhalte neu ordnen",
            "Für Handy und Bildschirm",
            "Weiterleitungen für alte Adressen",
          ],
        },
        {
          id: "templates",
          title: "Templates und Extensions",
          text: "Templates entstehen in einem eigenen Site-Package, getrennt vom TYPO3-Kern.",
          points: [
            "Fluid-Templates im Site-Package",
            "Extensions prüfen, anpassen oder ersetzen",
            "Eigene Inhaltselemente für die Redaktion",
          ],
        },
        {
          id: "upgrade",
          title: "Upgrades und Umzug",
          text: "Die Installation wird Schritt für Schritt auf eine aktuelle LTS-Version gehoben.",
          points: [
            "Upgrade auf TYPO3 v13 oder v14 LTS",
            "Extensions vorher prüfen",
            "Umzug auf einen neuen Server",
          ],
        },
      ],
      comparison: {
        title: "TYPO3-Versionen und ihr Support",
        intro:
          "Kurz gesagt: TYPO3 v12 bekommt seit Mai 2026 keine Community-Updates mehr. Unterstützt werden v13 LTS und v14 LTS.",
        columns: ["Version", "Stand", "Was das bedeutet"],
        rows: [
          ["TYPO3 v11 LTS", "Community-Support endete im Oktober 2024", "Upgrade dringend einplanen"],
          ["TYPO3 v12 LTS", "Seit dem 1. Mai 2026 keine Community-Updates", "Upgrade planen oder übergangsweise kostenpflichtiges ELTS"],
          ["TYPO3 v13 LTS", "Sicherheitsupdates bis Ende 2027", "Unterstützt, nächster Schritt ist v14"],
          ["TYPO3 v14 LTS", "Sicherheitsupdates bis Juni 2029", "Aktuelle Version für neue Projekte"],
        ],
      },
      outcomesTitle: "Ergebnis",
      outcomes: [
        "Die Seite läuft auf einer unterstützten Version",
        "Sicherheitsupdates kommen wieder regelmäßig",
        "Ein Ansprechpartner, auch ohne die alte Agentur",
      ],
      boundariesTitle: "Nicht enthalten",
      boundaries: [
        "ELTS und Premium-Extensions werden direkt an den Anbieter gezahlt.",
        "Sehr alte Extensions werden nach Absprache ersetzt.",
        "Tracht Digital Solutions arbeitet unabhängig und ist kein offizieller TYPO3-Partner.",
      ],
      processTitle: "Vorgehen",
      process: [
        "Link und TYPO3-Version genügen für den Start",
        "Prüfung der Installation mit Weg und Aufwand",
        "Das Upgrade entsteht auf einer Kopie und wird getestet",
      ],
      costTitle: COST.de.title,
      costText: COST.de.text,
      referencesHeadline: REFERENCES.de.headline,
      referencesLabel: REFERENCES.de.label,
      faqTitle: "Häufige Fragen zu TYPO3",
      faq: [
        {
          q: "Muss eine Seite von TYPO3 v12 upgraden?",
          a: "Ja, möglichst bald: Seit dem 1. Mai 2026 gibt es keine Community-Updates mehr für v12. Kostenpflichtiges ELTS verschafft Zeit, ersetzt das Upgrade aber nicht.",
        },
        {
          q: "Funktionieren Extensions nach dem Upgrade noch?",
          a: "Das wird vorher für jede Extension geprüft. Was nicht mehr gepflegt wird, wird angepasst oder ersetzt.",
        },
        {
          q: "Was kostet ein TYPO3-Upgrade?",
          a: "Das hängt von Version, Extensions und Templates ab. Nach der Prüfung stehen Aufwand oder Festpreis fest. Kosten entstehen erst, wenn wir einen Auftrag vereinbaren.",
        },
        {
          q: "Übernimmt Tracht Digital Solutions TYPO3-Seiten einer anderen Agentur?",
          a: "Ja. Nach einem Überblick über die Installation geht es um Fehler, Updates und Weiterentwicklung.",
        },
      ],
      ctaTitle: "Die TYPO3-Seite braucht ein Update?",
      ctaText: "Link und TYPO3-Version genügen, danach ist klar, welcher Weg sinnvoll ist.",
      ctaButton: "Erstgespräch vereinbaren",
    },
    en: {
      label: "Web presence",
      title: "Upgrading, fixing and maintaining TYPO3 websites",
      summary:
        "Tracht Digital Solutions brings TYPO3 websites onto a supported version, fixes errors and takes over the upkeep, from Schwarzenbek near Hamburg.",
      answer:
        "Tracht Digital Solutions is a company based in Schwarzenbek near Hamburg. It looks after TYPO3 websites: upgrades, fixing errors, templates and relaunches. Important: TYPO3 v12 has had *no community updates since 1 May 2026*.",
      situationsTitle: "Typical situations",
      situations: [
        "The site still runs on TYPO3 v12 or older.",
        "An extension stopped working after an update.",
        "The agency that built the site no longer looks after it.",
      ],
      offersTitle: "Scope of services",
      offers: [
        {
          id: "fix-errors",
          title: "Fixing errors and maintenance",
          text: "Errors are found, and TYPO3 stays current with security updates.",
          points: [
            "Errors in backend or frontend",
            "Repairing extensions after updates",
            "A backup before every change",
          ],
        },
        {
          id: "relaunch",
          title: "New website or relaunch",
          text: "The site is rebuilt, on current TYPO3, with a backend the editors can work with.",
          points: [
            "Reorganising the page tree and content",
            "Built for phones and screens",
            "Redirects for old addresses",
          ],
        },
        {
          id: "templates",
          title: "Templates and extensions",
          text: "Templates live in a site package of their own, separate from the TYPO3 core.",
          points: [
            "Fluid templates in a site package",
            "Checking, adapting or replacing extensions",
            "Custom content elements for the editors",
          ],
        },
        {
          id: "upgrade",
          title: "Upgrades and migrations",
          text: "The installation is raised step by step to a current LTS version.",
          points: [
            "Upgrading to TYPO3 v13 or v14 LTS",
            "Checking extensions first",
            "Moving to a new server",
          ],
        },
      ],
      comparison: {
        title: "TYPO3 versions and their support",
        intro:
          "In short: TYPO3 v12 has had no community updates since May 2026. v13 LTS and v14 LTS are supported.",
        columns: ["Version", "Status", "What it means"],
        rows: [
          ["TYPO3 v11 LTS", "Community support ended in October 2024", "Plan the upgrade urgently"],
          ["TYPO3 v12 LTS", "No community updates since 1 May 2026", "Plan the upgrade or use paid ELTS for now"],
          ["TYPO3 v13 LTS", "Security updates until the end of 2027", "Supported, the next step is v14"],
          ["TYPO3 v14 LTS", "Security updates until June 2029", "The current version for new projects"],
        ],
      },
      outcomesTitle: "Results",
      outcomes: [
        "The site runs on a supported version",
        "Security updates arrive regularly again",
        "One point of contact, even without the old agency",
      ],
      boundariesTitle: "Not included",
      boundaries: [
        "ELTS and premium extensions go to the provider directly.",
        "Very old extensions are replaced by agreement.",
        "Tracht Digital Solutions works independently and is not an official TYPO3 partner.",
      ],
      processTitle: "Approach",
      process: [
        "The link and the TYPO3 version are enough to start",
        "A review of the installation with the way forward and the effort",
        "The upgrade is built on a copy and tested",
      ],
      costTitle: COST.en.title,
      costText: COST.en.text,
      referencesHeadline: REFERENCES.en.headline,
      referencesLabel: REFERENCES.en.label,
      faqTitle: "Common questions about TYPO3",
      faq: [
        {
          q: "Does a site need to upgrade from TYPO3 v12?",
          a: "Yes, as soon as possible: there have been no community updates for v12 since 1 May 2026. Paid ELTS buys time but does not replace the upgrade.",
        },
        {
          q: "Do extensions still work after the upgrade?",
          a: "Every extension is checked beforehand. Whatever is no longer maintained is adapted or replaced.",
        },
        {
          q: "What does a TYPO3 upgrade cost?",
          a: "That depends on the version, extensions and templates. After the review the effort or a fixed price is clear. Costs only arise once we agree on an assignment.",
        },
        {
          q: "Does Tracht Digital Solutions take over TYPO3 sites from another agency?",
          a: "Yes. After an overview of the installation, the work covers errors, updates and further development.",
        },
      ],
      ctaTitle: "TYPO3 site needs an upgrade?",
      ctaText: "The link and the TYPO3 version are enough, then it is clear which way makes sense.",
      ctaButton: "Arrange an initial consultation",
    },
  },
};
