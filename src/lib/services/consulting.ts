import type { ServiceDefinition } from "../services";

/** The service at `/leistungen/beratung-konzeption`. */
export const consulting = {
  id: "consulting",
  number: "03",
  cmsKey: "service_consulting",
  slug: { de: "beratung-konzeption", en: "consulting-planning" },
  seoTitle: {
    de: "IT- & Digitalisierungsberatung, Konzeption | Tracht Digital",
    en: "IT & Digital Consulting and Planning | Tracht Digital",
  },
  seoDescription: {
    de: "IT- und Digitalisierungsberatung für Betriebe: was digital gebraucht wird, was es kostet, womit es losgeht. Tracht Digital Solutions aus Schwarzenbek.",
    en: "IT and digitalization consulting for businesses: what is needed, what it costs, where to start. Tracht Digital Solutions from Schwarzenbek near Hamburg.",
  },
  // 2026-10-12: consulting and concept work on what is needed, with the
  // whole of the know-how behind every other service.
  updatedAt: "2026-10-12",
  keywords: {
    de: ["Bedarf klären", "Fachwissen", "Konzeption", "Fahrplan"],
    en: ["Needs assessment", "Expertise", "Concept", "Roadmap"],
  },
  tagline: {
    de: "Klären, was gebraucht wird, mit Fachwissen und Konzept",
    en: "Work out what is needed, with expertise and a plan",
  },
  image: "/images/services/01-beratung-editorial.webp",
  fallback: {
    de: {
      label: "Alle Leistungen",
      title: "Beratung & Konzeption",
      summary:
        "Beratung und Konzeption mit dem ganzen Fachwissen aus IT, Software und Web: was der Betrieb digital braucht, was es kostet, womit es losgeht.",
      intro:
        "Bevor etwas gekauft oder gebaut wird, steht eine Frage: *Was wird gebraucht?* Die Beratung bringt das ganze Fachwissen aus IT, Software und Web ein und geht vom Betrieb aus, nicht vom Produkt. Am Ende steht fest, was sich lohnt, was es kostet und was zuerst kommt. Auch dann, wenn die Antwort lautet: noch nicht.",
      situationsTitle: "Typische Ausgangslagen",
      situations: [
        "Es gibt viele Ideen, aber keine Reihenfolge.",
        "Eine größere Anschaffung soll vorher geprüft werden.",
        "Mehrere Systeme oder Anbieter müssen zusammenarbeiten.",
      ],
      responsibilitiesTitle: "Leistungsumfang",
      responsibilities: [
        "Bedarf klären: was der Betrieb digital braucht und was nicht",
        "Ziele, Abläufe und vorhandene Technik aufnehmen",
        "Möglichkeiten und Kosten verständlich vergleichen",
        "Konzept mit umsetzbarem Fahrplan",
      ],
      outcomesTitle: "Ergebnis",
      outcomes: [
        "Ein klarer Startpunkt",
        "Die Kosten sind bekannt, bevor entschieden wird",
        "Teure Fehlentscheidungen werden vermieden",
      ],
      boundariesTitle: "Nicht enthalten",
      boundaries: [
        "Beratung ersetzt keinen Anwalt und keine Steuerberatung.",
        "Die Umsetzung wird getrennt vereinbart.",
      ],
      processTitle: "Vorgehen",
      process: [
        "Ausgangslage und Ziel aufnehmen",
        "Möglichkeiten bewerten",
        "Fahrplan festhalten, dann umsetzen oder übergeben",
      ],
      priceLabel: "Preis",
      priceText: "Auf Anfrage. Für ein klar abgegrenztes Konzept gibt es einen Festpreis.",
      referencesLabel: "Veröffentlicht nur mit Freigabe der Kunden.",
      referencesHeadline: "Einblicke aus der Praxis",
      references: [],
      ctaTitle: "Erst Klarheit, dann Entscheidung?",
      ctaText: "Eine kurze Schilderung der Lage genügt. Im Erstgespräch wird geklärt, welche Frage zuerst dran ist.",
      ctaButton: "Erstgespräch vereinbaren",
    },
    en: {
      label: "All services",
      title: "Consulting & Planning",
      summary:
        "Consulting and planning with full expertise in IT, software and the web: what the business needs digitally, what it costs, where to start.",
      intro:
        "Before anything is bought or built, there is one question: *what is needed?* The consulting brings full expertise in IT, software and the web and starts from the business, not the product. At the end it is clear what pays off, what it costs and what comes first. Including when the answer is: not yet.",
      situationsTitle: "Typical situations",
      situations: [
        "There are plenty of ideas, but no order to them.",
        "A larger investment should be checked first.",
        "Several systems or suppliers have to work together.",
      ],
      responsibilitiesTitle: "Scope of services",
      responsibilities: [
        "Work out what the business needs digitally, and what not",
        "Capture goals, workflows and existing technology",
        "Compare options and costs in plain language",
        "Concept with an actionable roadmap",
      ],
      outcomesTitle: "Results",
      outcomes: [
        "A clear starting point",
        "Costs are known before deciding",
        "Expensive wrong turns are avoided",
      ],
      boundariesTitle: "Not included",
      boundaries: [
        "Consulting does not replace a lawyer or tax adviser.",
        "Implementation is agreed separately.",
      ],
      processTitle: "Approach",
      process: [
        "Capture the situation and the goal",
        "Weigh the options",
        "Write down the roadmap, then build or hand over",
      ],
      priceLabel: "Price",
      priceText: "On request. A clearly bounded concept gets a fixed price.",
      referencesLabel: "Published only with the client's approval.",
      referencesHeadline: "Examples from practice",
      references: [],
      ctaTitle: "Clarity before a decision?",
      ctaText: "A short description of the situation is enough. The initial consultation settles which question comes first.",
      ctaButton: "Arrange an initial consultation",
    },
  },
} satisfies ServiceDefinition;
