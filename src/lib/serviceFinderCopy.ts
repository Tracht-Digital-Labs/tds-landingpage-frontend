/**
 * The service assistant's words: the questions, the result and the draft it
 * hands to the contact form (`FINDER_COPY`), and the dialog and tile around it
 * (`FINDER_SECTION`). The catalogue and the scoring are `serviceFinder.ts`.
 *
 * It addresses no one directly, like the rest of the site, and names no
 * amount (`serviceFinder.test.ts`).
 */
import type { Lang } from "./i18n";
import type { SavingsLevel, StageId } from "./serviceFinder";

interface FinderCopy {
  progress: (step: number, total: number) => string;
  resultLabel: string;
  topicsQuestion: string;
  topicsHelp: string;
  unsure: { label: string; hint: string };
  situationsQuestion: string;
  situationsHelp: string;
  stageQuestion: string;
  stageHelp: string;
  stages: Record<StageId, { label: string; hint: string }>;
  pickOne: string;
  pickStage: string;
  next: string;
  back: string;
  showResult: string;
  restart: string;
  resultTitle: string;
  rankBest: string;
  rankAlso: string;
  whyLabel: string;
  detailLink: string;
  savingsLabel: string;
  savingsLevels: Record<SavingsLevel, string>;
  savingsNote: string;
  noMatch: string;
  note: string;
  catalogueLink: string;
  cta: string;
  handoffNote: string;
  draft: { intro: string; services: string; situations: string; stage: string };
}

export const FINDER_COPY: Record<Lang, FinderCopy> = {
  de: {
    progress: (step, total) => `Schritt ${step} von ${total}`,
    resultLabel: "Ergebnis",
    topicsQuestion: "Worum geht es vor allem?",
    topicsHelp: "Mehrfachauswahl möglich.",
    unsure: { label: "Noch unklar", hint: "Dann wird zuerst gemeinsam sortiert." },
    situationsQuestion: "Was davon kommt im Betrieb vor?",
    situationsHelp: "Mehrfachauswahl möglich oder einfach weiter.",
    stageQuestion: "Wie weit ist das Vorhaben?",
    stageHelp: "Eine Antwort.",
    stages: {
      clear: { label: "Klar umrissen", hint: "Ziel und Umfang stehen fest." },
      rough: { label: "Eine grobe Idee", hint: "Die Richtung steht, die Details noch nicht." },
      open: { label: "Noch ganz offen", hint: "Erst sortieren, was dran ist." },
    },
    pickOne: "Bitte mindestens eine Antwort wählen.",
    pickStage: "Bitte eine Antwort wählen.",
    next: "Weiter",
    back: "Zurück",
    showResult: "Ergebnis anzeigen",
    restart: "Neu starten",
    resultTitle: "Das passt zum Anliegen",
    rankBest: "Passt am besten",
    rankAlso: "Passt ebenfalls",
    whyLabel: "Angaben dazu:",
    detailLink: "Im Shop ansehen",
    savingsLabel: "Geschätzte Zeitersparnis",
    savingsLevels: {
      low: "gering, unter 1 Std. im Monat",
      medium: "mittel, 1–5 Std. im Monat",
      high: "hoch, über 5 Std. im Monat",
    },
    savingsNote: "Die Zeitersparnis ist eine grobe Schätzung für einen kleinen Betrieb, keine Zusage.",
    noMatch: "Das lässt sich am besten im Erstgespräch sortieren.",
    note: "Eine erste Orientierung. Was genau passt, klären wir im Erstgespräch.",
    catalogueLink: "Alle Leistungen",
    cta: "Mit dieser Auswahl Erstgespräch vereinbaren",
    handoffNote: "Die Auswahl landet im Kontaktformular. Gesendet wird erst beim Absenden.",
    draft: {
      intro: "Aus dem Leistungsassistenten:",
      services: "Passende Leistungen",
      situations: "Ausgangslage",
      stage: "Stand",
    },
  },
  en: {
    progress: (step, total) => `Step ${step} of ${total}`,
    resultLabel: "Result",
    topicsQuestion: "What matters most?",
    topicsHelp: "Choose as many as apply.",
    unsure: { label: "Not clear yet", hint: "Then things get sorted out together first." },
    situationsQuestion: "Which of these happen in the business?",
    situationsHelp: "Choose as many as apply, or just continue.",
    stageQuestion: "How far along is the project?",
    stageHelp: "One answer.",
    stages: {
      clear: { label: "Clearly defined", hint: "Goal and scope are settled." },
      rough: { label: "A rough idea", hint: "The direction is set, the details are not." },
      open: { label: "Still completely open", hint: "First work out what needs doing." },
    },
    pickOne: "Please choose at least one answer.",
    pickStage: "Please choose one answer.",
    next: "Next",
    back: "Back",
    showResult: "Show result",
    restart: "Start again",
    resultTitle: "What fits the request",
    rankBest: "Best fit",
    rankAlso: "Also fits",
    whyLabel: "Answers given:",
    detailLink: "View in the shop",
    savingsLabel: "Estimated time saved",
    savingsLevels: {
      low: "low, under 1 hour a month",
      medium: "medium, 1–5 hours a month",
      high: "high, over 5 hours a month",
    },
    savingsNote: "Time saved is a rough estimate for a small business, not a promise.",
    noMatch: "This is best sorted out in a first conversation.",
    note: "A first sense of direction. We work out exactly what fits in the first conversation.",
    catalogueLink: "All services",
    cta: "Arrange an initial consultation with this selection",
    handoffNote: "The selection goes into the contact form. Nothing is sent until it is submitted.",
    draft: {
      intro: "From the service assistant:",
      services: "Matching services",
      situations: "Starting point",
      stage: "Stage",
    },
  },
};

/** The dialog around the assistant, and the tile that opens it. */
export const FINDER_SECTION: Record<
  Lang,
  { title: string; intro: string; close: string; tileKind: string; tileTitle: string }
> = {
  de: {
    title: "Welche Leistung passt?",
    intro: "Drei kurze Fragen. Danach ist klar, welche Leistungen aus dem Shop passen.",
    close: "Leistungsassistent schließen",
    tileKind: "Leistungsassistent",
    tileTitle: "Welche Leistung passt?",
  },
  en: {
    title: "Which service fits?",
    intro: "Three short questions. Then it is clear which services from the shop fit.",
    close: "Close the service assistant",
    tileKind: "Service assistant",
    tileTitle: "Which service fits?",
  },
};
