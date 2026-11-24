import type { ServiceDefinition } from "../services";

/** The service at `/leistungen/prozessoptimierung`. */
export const processService = {
  id: "process",
  number: "02",
  cmsKey: "service_process",
  // The SLUG still says "prozessoptimierung" while the title says "Abläufe
  // digitalisieren", and that is on purpose: the rename (2026-09-29) was
  // about the word a customer reads, not about the URL. Changing the slug
  // would cost a redirect and every inbound link for a word nobody types
  // into a browser bar anyway. `Prozessoptimierung` survives as a keyword
  // chip and inside the title, because it IS what people search for.
  slug: { de: "prozessoptimierung", en: "process-optimization" },
  seoTitle: {
    de: "Digitale Buchführung & Projektmanagement | Tracht Digital",
    en: "Digital Bookkeeping & Project Management | Tracht Digital",
  },
  seoDescription: {
    de: "Abläufe digitalisieren: digitale Buchführung, Projektmanagement und passende Werkzeuge im Betrieb einführen. Tracht Digital Solutions bei Hamburg.",
    en: "Digitalizing workflows: digital bookkeeping, project management and the right tools brought into the business. Tracht Digital Solutions near Hamburg.",
  },
  // 2026-10-12: named by what gets brought in — digital bookkeeping and a
  // project management system — with the workflow around it.
  updatedAt: "2026-10-12",
  keywords: {
    de: ["Digitale Buchführung", "Projektmanagement", "Prozessoptimierung", "Automatisierung"],
    en: ["Digital bookkeeping", "Project management", "Process optimization", "Automation"],
  },
  tagline: {
    de: "Digitale Buchführung und Projektmanagement einführen",
    en: "Introduce digital bookkeeping and project management",
  },
  image: "/images/services/02-prozesse-editorial.webp",
  fallback: {
    de: {
      label: "Alle Leistungen",
      title: "Abläufe digitalisieren",
      summary:
        "Digitale Werkzeuge im Betrieb einbinden, zum Beispiel digitale Buchführung oder ein Projektmanagementsystem, samt passender Abläufe.",
      intro:
        "Digitalisierung heißt nicht, alles neu zu machen. Oft fehlt nur ein passendes Werkzeug, *richtig eingebunden*: Belege und Rechnungen laufen digital in die Buchführung, Projekte und Aufgaben stehen in einem System statt in Mails. Auswahl, Einrichtung und die Einführung im Team gehören dazu.",
      situationsTitle: "Typische Ausgangslagen",
      situations: [
        "Belege und Rechnungen wandern auf Papier oder per Mail hin und her.",
        "Projekte und Aufgaben stehen in Mails, auf Zetteln und in Köpfen.",
        "Dieselben Daten werden mehrfach eingetippt.",
      ],
      responsibilitiesTitle: "Leistungsumfang",
      responsibilities: [
        "Digitale Buchführung einbinden: Belege, Rechnungen, Übergabe an die Kanzlei",
        "Projektmanagementsystem auswählen, einrichten und im Team einführen",
        "Bestehende Abläufe mit dem Team aufnehmen, Zeitfresser und Fehlerquellen finden",
        "Einen einfacheren Ablauf einrichten, mit passender Automatisierung",
      ],
      outcomesTitle: "Ergebnis",
      outcomes: [
        "Keine doppelte Dateneingabe mehr",
        "Weniger Fehler durch Handarbeit",
        "Mehr Zeit für die eigentliche Arbeit",
      ],
      boundariesTitle: "Nicht enthalten",
      boundaries: [
        "Die Buchführung selbst und die Steuerberatung bleiben bei der Kanzlei.",
        "Nicht jeder Sonderfall lohnt eine Automatisierung.",
      ],
      processTitle: "Vorgehen",
      process: [
        "Ablauf mitverfolgen und dokumentieren",
        "Die größten Zeitfresser zuerst angehen",
        "Einführen und bei Bedarf nachbessern",
      ],
      priceLabel: "Preis",
      priceText: "Auf Anfrage. Sobald Ablauf und Ziel klar sind, gibt es einen Festpreis.",
      referencesLabel: "Veröffentlicht nur mit Freigabe der Kunden.",
      referencesHeadline: "Einblicke aus der Praxis",
      references: [],
      ctaTitle: "Welcher Ablauf kostet jede Woche Zeit?",
      ctaText: "Eine kurze Beschreibung genügt. Im Erstgespräch zeigt sich, ob sich eine Vereinfachung lohnt.",
      ctaButton: "Erstgespräch vereinbaren",
    },
    en: {
      label: "All services",
      title: "Digitalizing Workflows",
      summary:
        "Bringing digital tools into the business, for example digital bookkeeping or a project management system, with the workflows to match.",
      intro:
        "Digitalizing does not mean starting over. Often all that is missing is a fitting tool, *properly integrated*: receipts and invoices flow digitally into the bookkeeping, projects and tasks live in one system instead of in emails. Selection, setup and team onboarding are part of it.",
      situationsTitle: "Typical situations",
      situations: [
        "Receipts and invoices travel back and forth on paper or by email.",
        "Projects and tasks live in emails, on notes and in people's heads.",
        "The same data gets typed in more than once.",
      ],
      responsibilitiesTitle: "Scope of services",
      responsibilities: [
        "Integrate digital bookkeeping: receipts, invoices, hand-over to the accountant",
        "Choose a project management system, set it up and introduce it to the team",
        "Map existing workflows with the team, find time sinks and error sources",
        "Set up a simpler workflow, with the right automation",
      ],
      outcomesTitle: "Results",
      outcomes: [
        "No more double data entry",
        "Fewer mistakes from manual work",
        "More time for the actual work",
      ],
      boundariesTitle: "Not included",
      boundaries: [
        "The bookkeeping itself and tax advice stay with the accountant.",
        "Not every exception is worth automating.",
      ],
      processTitle: "Approach",
      process: [
        "Follow the workflow and document it",
        "Tackle the biggest time sinks first",
        "Roll it out and refine it",
      ],
      priceLabel: "Price",
      priceText: "On request. Once the workflow and the goal are clear, there is a fixed price.",
      referencesLabel: "Published only with the client's approval.",
      referencesHeadline: "Examples from practice",
      references: [],
      ctaTitle: "Which routine costs time every week?",
      ctaText: "A short description is enough. An initial consultation shows whether simplifying it pays off.",
      ctaButton: "Arrange an initial consultation",
    },
  },
} satisfies ServiceDefinition;
