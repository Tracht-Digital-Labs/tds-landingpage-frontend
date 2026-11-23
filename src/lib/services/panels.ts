import type { ServiceDefinition } from "../services";

/** The service at `/leistungen/kundenportale`. */
export const panels = {
  // The headline service since 2026-10-06: one panel per business — orders,
  // customers, appointments and reports in one place, with logins for the
  // team and a portal for the customers. It is built on the same panel
  // platform this studio runs itself (admin + customer portal), which is
  // why the copy may say "a proven base" without inventing a reference.
  id: "panels",
  number: "01",
  cmsKey: "service_panels",
  slug: { de: "kundenportale", en: "customer-portals" },
  seoTitle: {
    de: "Kundenportal & Verwaltungspanel erstellen lassen | Tracht Digital",
    en: "Customer Portal & Admin Panel Development | Tracht Digital",
  },
  seoDescription: {
    de: "Kundenportal und Verwaltungspanel erstellen lassen: Aufträge, Kunden und Termine in einem System. Tracht Digital Solutions aus Schwarzenbek bei Hamburg.",
    en: "Customer portal and admin panel development: orders, customers and appointments in one system. Tracht Digital Solutions from Schwarzenbek near Hamburg.",
  },
  // 2026-10-12: the point is structure — from project management to
  // automation, in one system the business runs on.
  updatedAt: "2026-10-12",
  keywords: {
    de: ["Kundenportal", "Projektmanagement", "Automatisierung", "Verwaltungspanel"],
    en: ["Customer portal", "Project management", "Automation", "Admin panel"],
  },
  tagline: {
    de: "Betrieb strukturieren, vom Projekt bis zur Automatisierung",
    en: "Structure the business, from projects to automation",
  },
  image: "/images/services/05-kundenportale-editorial.webp",
  fallback: {
    de: {
      label: "Alle Leistungen",
      title: "Kundenportale & Verwaltungspanels",
      summary:
        "Ein eigenes Panel, das den Betrieb strukturiert: von Projektmanagement über Kunden und Aufträge bis zu Automatisierungen.",
      intro:
        "In vielen Betrieben laufen Tabellen, Mails und Notizen nebeneinander. Ein Panel bringt *Struktur* hinein: Projekte, Aufgaben, Kunden und Unterlagen an einem Ort, wiederkehrende Schritte laufen automatisch. Das Team sieht, was zu tun ist, Kunden finden ihre Unterlagen selbst. Grundlage ist ein erprobtes System, das Tracht Digital Solutions selbst einsetzt, kein Neubau von null.",
      situationsTitle: "Typische Ausgangslagen",
      situations: [
        "Aufträge und Kundendaten liegen verteilt in Tabellen, Mails und Ordnern.",
        "Kunden fragen nach Informationen, die sie selbst abrufen könnten.",
        "Ein Überblick über den aktuellen Stand fehlt.",
      ],
      responsibilitiesTitle: "Leistungsumfang",
      responsibilities: [
        "Projektmanagement, Kunden, Aufträge und Unterlagen in einem System",
        "Automatisierungen für wiederkehrende Schritte, z. B. Erinnerungen und Status-Mails",
        "Rollen und sichere Logins für Team und Kunden",
        "Datenübernahme, Einführung und laufende Betreuung",
      ],
      outcomesTitle: "Ergebnis",
      outcomes: [
        "Eine klare Struktur: der aktuelle Stand auf einen Blick",
        "Alle wichtigen Informationen an einem Ort, auch mobil",
        "Kunden erledigen Anfragen selbst im Portal",
      ],
      boundariesTitle: "Nicht enthalten",
      boundaries: [
        "Buchhaltung und Lohn bleiben in den dafür gemachten Programmen.",
        "Was ein fertiges Programm gut kann, wird nicht nachgebaut.",
      ],
      processTitle: "Vorgehen",
      process: [
        "Abläufe und Rollen erfassen",
        "Mit dem Wichtigsten starten, dann erweitern",
        "Einführen, schulen und weiter betreuen",
      ],
      priceLabel: "Preis",
      priceText: "Auf Anfrage. Bei festem Umfang gibt es Festpreise für einzelne Ausbaustufen.",
      referencesLabel: "Veröffentlicht nur mit Freigabe der Kunden.",
      referencesHeadline: "Einblicke aus der Praxis",
      references: [],
      ctaTitle: "Zu viele Informationen an zu vielen Orten?",
      ctaText: "Im Erstgespräch zeigt sich, wie ein Panel für den eigenen Betrieb aussehen kann.",
      ctaButton: "Erstgespräch vereinbaren",
    },
    en: {
      label: "All services",
      title: "Customer Portals & Admin Panels",
      summary:
        "A panel of its own that structures the business: from project management through customers and orders to automation.",
      intro:
        "Many businesses run spreadsheets, emails and notes side by side. A panel brings *structure*: projects, tasks, customers and documents in one place, recurring steps run automatically. The team sees what needs doing, customers find their documents themselves. It is built on a proven system that Tracht Digital Solutions runs itself, not from scratch.",
      situationsTitle: "Typical situations",
      situations: [
        "Orders and customer data are spread across spreadsheets, emails and folders.",
        "Customers ask for information they could look up themselves.",
        "There is no overview of where things stand.",
      ],
      responsibilitiesTitle: "Scope of services",
      responsibilities: [
        "Project management, customers, orders and documents in one system",
        "Automation for recurring steps, e.g. reminders and status emails",
        "Roles and secure logins for team and customers",
        "Data migration, rollout and ongoing support",
      ],
      outcomesTitle: "Results",
      outcomes: [
        "A clear structure: where things stand at a glance",
        "All important information in one place, on mobile too",
        "Customers handle requests themselves in the portal",
      ],
      boundariesTitle: "Not included",
      boundaries: [
        "Accounting and payroll stay in the programs made for them.",
        "What a ready-made program does well is not rebuilt.",
      ],
      processTitle: "Approach",
      process: [
        "Capture workflows and roles",
        "Start with what matters most, then extend",
        "Roll out, train and keep supporting",
      ],
      priceLabel: "Price",
      priceText: "On request. Once the scope is set, fixed prices for single stages.",
      referencesLabel: "Published only with the client's approval.",
      referencesHeadline: "Examples from practice",
      references: [],
      ctaTitle: "Too much information in too many places?",
      ctaText: "An initial consultation shows what a panel for the business can look like.",
      ctaButton: "Arrange an initial consultation",
    },
  },
} satisfies ServiceDefinition;
