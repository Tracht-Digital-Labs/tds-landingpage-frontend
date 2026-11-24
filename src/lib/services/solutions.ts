import type { ServiceDefinition } from "../services";

/** The service at `/leistungen/individuelle-loesungen`. */
export const solutions = {
  id: "solutions",
  number: "04",
  cmsKey: "service_solutions",
  slug: { de: "individuelle-loesungen", en: "tailored-solutions" },
  seoTitle: {
    de: "Auftragsprogrammierung & Automatisierung | Tracht Digital",
    en: "Custom Programming & Automation | Tracht Digital",
  },
  seoDescription: {
    de: "Auftragsprogrammierung und Automatisierung für Betriebe: Tools und Skripte übernehmen Datenpflege und Klickarbeit. Tracht Digital Solutions bei Hamburg.",
    en: "Custom programming and automation for businesses: tools and scripts take over data handling and repetitive clicking. Tracht Digital Solutions near Hamburg.",
  },
  // 2026-10-12: leads with contract programming — small tools and scripts
  // that take over dull data handling and repetitive clicking.
  updatedAt: "2026-10-12",
  keywords: {
    de: ["Auftragsprogrammierung", "Automatisierung", "Schnittstellen", "Eigene Tools"],
    en: ["Contract programming", "Automation", "Integrations", "Custom tools"],
  },
  tagline: {
    de: "Tools und Skripte statt Handarbeit",
    en: "Tools and scripts instead of manual work",
  },
  image: "/images/services/03-loesungen-editorial.webp",
  fallback: {
    de: {
      label: "Alle Leistungen",
      title: "Individuelle Lösungen",
      summary:
        "Auftragsprogrammierung für Betriebe: Tools und Automatisierungsskripte übernehmen stumpfe Datenverarbeitung und Klickarbeit.",
      intro:
        "Daten abtippen, Listen abgleichen, jeden Tag dieselben Klicks: Solche Arbeit kann ein Tool oder Skript übernehmen. Entwickelt wird es im Auftrag, passend zum jeweiligen Ablauf. Die vorhandene Technik bleibt, ergänzt wird *nur, was fehlt*.",
      situationsTitle: "Typische Ausgangslagen",
      situations: [
        "Daten werden abgetippt oder jeden Tag dieselben Schritte geklickt.",
        "Mehrere Programme arbeiten nicht zusammen.",
        "Die Standardsoftware kann eine Besonderheit des Betriebs nicht.",
      ],
      responsibilitiesTitle: "Leistungsumfang",
      responsibilities: [
        "Auftragsprogrammierung: Tools und Automatisierungsskripte für Datenverarbeitung und Klickarbeit",
        "Schnittstellen zwischen vorhandenen Programmen",
        "Abwägen: Standardprodukt, Schnittstelle oder Eigenbau",
        "Entwicklung und Test nach klarer Aufgabenstellung",
        "Übergabe, Dokumentation und weitere Betreuung",
      ],
      outcomesTitle: "Ergebnis",
      outcomes: [
        "Stumpfe Handarbeit erledigt ein Skript",
        "Die Programme arbeiten zusammen",
        "Lesbarer, dokumentierter Quellcode",
      ],
      boundariesTitle: "Nicht enthalten",
      boundaries: [
        "Bewährte Standardsoftware wird nicht ohne Grund neu gebaut.",
        "Schnittstellen gehen nur so weit, wie die Anbieter sie zulassen.",
      ],
      processTitle: "Vorgehen",
      process: [
        "Ziele und vorhandene Technik erfassen",
        "In klaren Etappen bauen und testen",
        "Einführen und weiter betreuen",
      ],
      priceLabel: "Preis",
      priceText: "Auf Anfrage. Bei festem Umfang gibt es Festpreise für einzelne Etappen.",
      referencesLabel: "Veröffentlicht nur mit Freigabe der Kunden.",
      referencesHeadline: "Einblicke aus der Praxis",
      references: [],
      ctaTitle: "Zu viel Handarbeit am Bildschirm?",
      ctaText: "Eine kurze Beschreibung des Ablaufs genügt. Im Erstgespräch wird geklärt, was sich automatisieren lässt.",
      ctaButton: "Erstgespräch vereinbaren",
    },
    en: {
      label: "All services",
      title: "Tailored Solutions",
      summary:
        "Contract programming for businesses: tools and automation scripts take over dull data handling and repetitive clicking.",
      intro:
        "Typing data over, matching lists, the same clicks every day: a tool or script can take over that work. It is developed to order, fitted to the workflow. Existing technology stays; only *what is missing* is added.",
      situationsTitle: "Typical situations",
      situations: [
        "Data is typed over or the same steps are clicked every day.",
        "Several programs do not work together.",
        "Standard software cannot handle a quirk of the business.",
      ],
      responsibilitiesTitle: "Scope of services",
      responsibilities: [
        "Contract programming: tools and automation scripts for data handling and repetitive clicking",
        "Integrations between existing programs",
        "Weigh it up: off-the-shelf, integration or custom build",
        "Development and testing against a clear brief",
        "Hand-over, documentation and ongoing support",
      ],
      outcomesTitle: "Results",
      outcomes: [
        "A script does the dull manual work",
        "The programs work together",
        "Readable, documented source code",
      ],
      boundariesTitle: "Not included",
      boundaries: [
        "Proven standard software is not rebuilt without reason.",
        "Integrations go only as far as the vendors allow.",
      ],
      processTitle: "Approach",
      process: [
        "Capture goals and existing technology",
        "Build and test in clear stages",
        "Roll out and keep supporting",
      ],
      priceLabel: "Price",
      priceText: "On request. Once the scope is set, fixed prices for single stages.",
      referencesLabel: "Published only with the client's approval.",
      referencesHeadline: "Examples from practice",
      references: [],
      ctaTitle: "Too much manual work at the screen?",
      ctaText: "A short description of the workflow is enough. The initial consultation settles what can be automated.",
      ctaButton: "Arrange an initial consultation",
    },
  },
} satisfies ServiceDefinition;
