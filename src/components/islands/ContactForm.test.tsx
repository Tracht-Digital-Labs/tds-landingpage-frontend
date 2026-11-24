// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resetRuntimeConfig } from "@tracht-digital-labs/tds-shared/api";
import { CONTACT_DRAFT_EVENT, CONTACT_DRAFT_KEY } from "~/lib/contactDraft";
import ContactForm from "./ContactForm";

/**
 * The contact form rendered: the three steps, what "Weiter" checks, what is
 * posted, and what a visitor reads afterwards. `contactForm.test.ts` holds the
 * source-level rules (keys, option prompt, committed reasons).
 */

const REASONS = ["Neue Website", "Bestehende Website übernehmen"];
const NEXT_STEPS = {
  title: "So geht es weiter",
  items: [
    { label: "Antwort", text: "Innerhalb von 24 Stunden." },
    { label: "Gespräch", text: "Ein kurzer Termin." },
  ],
};

let posted: unknown[];

/** The contact endpoint answers `status`, or throws when `status` is null. */
function endpoint(status: number | null = 200) {
  posted = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (!url.endsWith("/contact")) return new Response("{}", { status: 404 });
      posted.push(JSON.parse(String(init?.body)));
      if (status === null) throw new TypeError("Failed to fetch");
      return new Response("{}", { status });
    }),
  );
}

function renderForm(props: Partial<Parameters<typeof ContactForm>[0]> = {}) {
  render(
    <ContactForm
      reasons={REASONS}
      assistantReasons={{ relaunch: "Bestehende Website übernehmen", unknown: "Gibt es nicht" }}
      nextSteps={NEXT_STEPS}
      {...props}
    />,
  );
}

const step = (n: number) => document.getElementById(`contact-step-${n}`)!.closest("fieldset") as HTMLFieldSetElement;
const field = (label: string) => screen.getByLabelText(label, { exact: false }) as HTMLInputElement;
const type = (label: string, value: string) => fireEvent.change(field(label), { target: { value } });
const company = () => document.getElementById("company") as HTMLInputElement;
const reason = () => document.getElementById("subject") as HTMLSelectElement;
const message = () => document.getElementById("message") as HTMLTextAreaElement;
const progress = () => screen.getByRole("list", { name: /^(Schritt|Step) / });
const progressButton = (n: number) => within(progress()).getAllByRole("button")[n - 1]!;
const summary = () => screen.getByText("Bisherige Angaben").nextElementSibling as HTMLElement;

async function clickNext(expectStep: number) {
  fireEvent.click(screen.getByRole("button", { name: /Weiter/ }));
  await waitFor(() => expect(step(expectStep).hidden).toBe(false));
}

function fillContact() {
  type("Name", "Erika Muster");
  type("E-Mail", "erika@example.de");
}

async function toMessage() {
  fillContact();
  await clickNext(2);
  await clickNext(3);
}

async function send(text = "Die Seite lädt seit gestern nicht mehr.") {
  fireEvent.change(message(), { target: { value: text } });
  fireEvent.click(screen.getByRole("checkbox", { name: /willige/ }));
  fireEvent.click(screen.getByRole("button", { name: /Nachricht senden/ }));
}

const sentHeading = () => screen.findByRole("heading", { level: 3 });

beforeEach(() => {
  resetRuntimeConfig();
  sessionStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("ContactForm: the steps", () => {
  it("shows one step at a time and only lets a visitor go back to steps they reached", () => {
    endpoint();
    renderForm();
    expect([step(1).hidden, step(2).hidden, step(3).hidden]).toEqual([false, true, true]);
    expect(progress().getAttribute("aria-label")).toBe("Schritt 1 von 3");
    const buttons = within(progress()).getAllByRole("button") as HTMLButtonElement[];
    expect(buttons.map((b) => b.textContent)).toEqual(["1Kontaktdaten", "2Anliegen", "3Nachricht"]);
    expect(buttons.map((b) => b.disabled)).toEqual([false, true, true]);
    expect(buttons[0]!.getAttribute("aria-current")).toBe("step");
  });

  it("holds the first step until name and email are valid, and ties each error to its field", async () => {
    endpoint();
    renderForm();
    fireEvent.click(screen.getByRole("button", { name: /Weiter/ }));
    await waitFor(() => expect(field("Name").getAttribute("aria-invalid")).toBe("true"));
    expect(step(2).hidden).toBe(true);
    expect(field("Name").getAttribute("aria-describedby")).toBe("contact-name-error");
    expect(document.getElementById("contact-name-error")?.textContent).toBeTruthy();
    expect(field("E-Mail").getAttribute("aria-invalid")).toBe("true");
    expect(field("Name").closest(".contact-field-row")?.className).toContain("contact-field-row--error");
    // The message is not checked before its step.
    expect(message().getAttribute("aria-invalid")).toBeNull();
  });

  it("moves on with Enter instead of sending, and focuses the new step", async () => {
    endpoint();
    renderForm();
    fillContact();
    fireEvent.submit(field("Name").closest("form")!);
    await waitFor(() => expect(step(2).hidden).toBe(false));
    await waitFor(() => expect(document.activeElement?.id).toBe("contact-step-2"));
    expect(posted).toEqual([]);
    expect(progress().getAttribute("aria-label")).toBe("Schritt 2 von 3");
  });

  it("does not move focus on first render", () => {
    endpoint();
    renderForm();
    expect(document.activeElement).toBe(document.body);
  });

  it("marks a finished step as done and its complete fields as filled", async () => {
    endpoint();
    renderForm();
    fillContact();
    await waitFor(() => expect(field("Name").closest(".contact-field-row")?.hasAttribute("data-filled")).toBe(true));
    expect(company().closest(".contact-field-row")?.hasAttribute("data-filled")).toBe(false);
    await clickNext(2);
    const items = within(progress()).getAllByRole("listitem");
    expect(items.map((li) => li.getAttribute("data-state"))).toEqual(["done", "current", null]);
    expect(items[0]!.textContent).toBe("✓Kontaktdaten");
    expect(step(1).hasAttribute("data-done")).toBe(true);
    expect((progressButton(3) as HTMLButtonElement).disabled).toBe(true);
  });

  it("offers Back from the second step on, and shows a current step by its number", async () => {
    endpoint();
    renderForm();
    expect(screen.queryByRole("button", { name: /Zurück/ })).toBeNull();
    fillContact();
    await clickNext(2);
    fireEvent.click(screen.getByRole("button", { name: /Zurück/ }));
    await waitFor(() => expect(step(1).hidden).toBe(false));
    // Done and current: the number, not the tick.
    expect(within(progress()).getAllByRole("listitem")[0]!.textContent).toBe("1Kontaktdaten");
  });

  it("counts the reason step as done when only the emergency box is ticked", async () => {
    endpoint();
    renderForm();
    fillContact();
    await clickNext(2);
    fireEvent.click(screen.getByRole("checkbox", { name: "Notfall" }));
    await clickNext(3);
    expect(within(progress()).getAllByRole("listitem")[1]!.getAttribute("data-state")).toBe("done");
  });

  it("summarises the earlier steps and goes back to one on request", async () => {
    endpoint();
    renderForm();
    fireEvent.change(company(), { target: { value: "Muster GmbH" } });
    await toMessage();
    expect(summary().textContent).toContain("Erika Muster · erika@example.de · Muster GmbH");
    expect(within(summary()).getAllByRole("definition")[1]!.textContent).toBe("–");
    fireEvent.click(within(summary()).getAllByRole("button", { name: "Ändern" })[1]!);
    await waitFor(() => expect(step(2).hidden).toBe(false));
    // A reached step stays reachable after going back.
    expect((progressButton(3) as HTMLButtonElement).disabled).toBe(false);
  });

  it("guides the message with a hint element tied to the field, and the error after it", async () => {
    endpoint();
    renderForm();
    await toMessage();
    expect(message().getAttribute("placeholder")).toBeNull();
    expect(message().getAttribute("aria-describedby")).toBe("contact-message-hint");
    expect(document.getElementById("contact-message-hint")?.textContent).toMatch(/Zwei, drei Sätze/);
    fireEvent.click(screen.getByRole("button", { name: /Nachricht senden/ }));
    await waitFor(() => expect(message().getAttribute("aria-invalid")).toBe("true"));
    expect(message().getAttribute("aria-describedby")).toBe("contact-message-hint contact-message-error");
    expect(screen.getByRole("checkbox", { name: /willige/ }).getAttribute("aria-describedby")).toBe(
      "contact-consent-error",
    );
  });

  it("opens the reason dropdown on a prompt, not on an answer", () => {
    endpoint();
    renderForm();
    expect([...reason().options].map((o) => [o.value, o.text])).toEqual([
      ["", "Bitte auswählen"],
      ["Neue Website", "Neue Website"],
      ["Bestehende Website übernehmen", "Bestehende Website übernehmen"],
    ]);
    expect(reason().value).toBe("");
  });

  it("renders no reason dropdown when the list is empty", () => {
    endpoint();
    renderForm({ reasons: [] });
    expect(reason()).toBeNull();
  });

  it("speaks English when asked to", () => {
    endpoint();
    renderForm({ lang: "en" });
    expect(progress().getAttribute("aria-label")).toBe("Step 1 of 3");
    expect(screen.getByRole("button", { name: /Next/ })).toBeTruthy();
  });
});

describe("ContactForm: sending", () => {
  it("posts the fields, the reason and the language, then shows the next steps", async () => {
    endpoint();
    renderForm();
    fillContact();
    await clickNext(2);
    fireEvent.change(reason(), { target: { value: "Neue Website" } });
    await clickNext(3);
    await send();

    const heading = await sentHeading();
    expect(document.activeElement).toBe(heading);
    expect(posted).toHaveLength(1);
    expect(posted[0]).toMatchObject({
      name: "Erika Muster",
      email: "erika@example.de",
      subject: "Neue Website",
      message: "Die Seite lädt seit gestern nicht mehr.",
      consent: true,
      lang: "de",
    });
    expect(screen.getByText("So geht es weiter")).toBeTruthy();
    expect(screen.getByText("Innerhalb von 24 Stunden.")).toBeTruthy();
  });

  it("marks an emergency as the subject when no reason was chosen", async () => {
    endpoint();
    renderForm();
    fillContact();
    await clickNext(2);
    fireEvent.click(screen.getByRole("checkbox", { name: "Notfall" }));
    await clickNext(3);
    expect(within(summary()).getAllByRole("definition")[1]!.textContent).toBe("Notfall");
    await send();
    await sentHeading();
    expect((posted[0] as { subject: string }).subject).toBe("Notfall");
  });

  it("puts the emergency in front of a chosen reason", async () => {
    endpoint();
    renderForm();
    fillContact();
    await clickNext(2);
    fireEvent.change(reason(), { target: { value: "Neue Website" } });
    fireEvent.click(screen.getByRole("checkbox", { name: "Notfall" }));
    await clickNext(3);
    expect(within(summary()).getAllByRole("definition")[1]!.textContent).toBe("Neue Website · Notfall");
    await send();
    await sentHeading();
    expect((posted[0] as { subject: string }).subject).toBe("Notfall: Neue Website");
  });

  it("sends no subject when no reason was chosen", async () => {
    endpoint();
    renderForm();
    await toMessage();
    await send();
    await sentHeading();
    expect((posted[0] as { subject?: string }).subject).toBeUndefined();
  });

  it("names the failure with the email address and shakes the form", async () => {
    endpoint(500);
    renderForm();
    await toMessage();
    await send();
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("kontakt@tracht-digital.de");
    expect(within(alert).getByRole("link").getAttribute("href")).toBe("mailto:kontakt@tracht-digital.de");
    expect(document.querySelector(".shake")).not.toBeNull();
    await waitFor(() => expect(document.querySelector(".shake")).toBeNull(), { timeout: 2000 });
  });

  it("treats an unreachable endpoint as a failure", async () => {
    endpoint(null);
    renderForm();
    await toMessage();
    await send();
    expect(await screen.findByRole("alert")).toBeTruthy();
    expect(screen.queryByRole("heading", { level: 3 })).toBeNull();
    expect(document.querySelector(".shake")).not.toBeNull();
  });

  it("returns to the first step with an error when sending from the last one", async () => {
    endpoint();
    renderForm();
    await toMessage();
    fireEvent.click(progressButton(1));
    await waitFor(() => expect(step(1).hidden).toBe(false));
    type("Name", "");
    fireEvent.click(progressButton(3));
    await waitFor(() => expect(step(3).hidden).toBe(false));
    await send();
    await waitFor(() => expect(step(1).hidden).toBe(false));
    expect(posted).toEqual([]);
  });
});

describe("ContactForm: a draft from the service assistant", () => {
  it("takes a stored draft on hydration, preselects the mapped reason and clears the store", async () => {
    sessionStorage.setItem(CONTACT_DRAFT_KEY, JSON.stringify({ message: "Relaunch geplant.", service: "relaunch" }));
    endpoint();
    renderForm();
    await waitFor(() => expect(message().value).toBe("Relaunch geplant."));
    expect(reason().value).toBe("Bestehende Website übernehmen");
    expect(sessionStorage.getItem(CONTACT_DRAFT_KEY)).toBeNull();
  });

  it("appends a live draft under the visitor's own text, once, and keeps their reason", async () => {
    endpoint();
    renderForm();
    fireEvent.change(message(), { target: { value: "Eigener Text.  " } });
    fireEvent.change(reason(), { target: { value: "Neue Website" } });
    sessionStorage.setItem(CONTACT_DRAFT_KEY, "stale");

    const draft = { message: "Vom Assistenten.", service: "relaunch" };
    act(() => {
      window.dispatchEvent(new CustomEvent(CONTACT_DRAFT_EVENT, { detail: draft }));
    });
    act(() => {
      window.dispatchEvent(new CustomEvent(CONTACT_DRAFT_EVENT, { detail: draft }));
    });
    expect(message().value).toBe("Eigener Text.\n\nVom Assistenten.");
    expect(reason().value).toBe("Neue Website");
    expect(sessionStorage.getItem(CONTACT_DRAFT_KEY)).toBeNull();
  });

  it("ignores a mapped reason the dropdown does not offer", () => {
    endpoint();
    renderForm();
    act(() => {
      window.dispatchEvent(new CustomEvent(CONTACT_DRAFT_EVENT, { detail: { message: "Hallo.", service: "unknown" } }));
    });
    expect(reason().value).toBe("");
    expect(message().value).toBe("Hallo.");
  });

  it("sends no subject for a mapped reason the dropdown does not offer", async () => {
    endpoint();
    renderForm();
    act(() => {
      window.dispatchEvent(
        new CustomEvent(CONTACT_DRAFT_EVENT, { detail: { message: "Die Seite lädt seit gestern nicht.", service: "unknown" } }),
      );
    });
    await toMessage();
    fireEvent.click(screen.getByRole("checkbox", { name: /willige/ }));
    fireEvent.click(screen.getByRole("button", { name: /Nachricht senden/ }));
    await sentHeading();
    expect((posted[0] as { subject?: string }).subject).toBeUndefined();
  });

  it("stops listening once unmounted", () => {
    endpoint();
    renderForm();
    cleanup();
    sessionStorage.setItem(CONTACT_DRAFT_KEY, "für das nächste Formular");
    window.dispatchEvent(new CustomEvent(CONTACT_DRAFT_EVENT, { detail: { message: "Spät." } }));
    expect(sessionStorage.getItem(CONTACT_DRAFT_KEY)).toBe("für das nächste Formular");
  });
});
