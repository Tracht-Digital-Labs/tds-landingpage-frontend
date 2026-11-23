// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CONTACT_DRAFT_KEY } from "~/lib/contactDraft";
import {
  CATALOGUE,
  CATALOGUE_PRODUCTS,
  TOPIC_IDS,
  buildDraft,
  recommend,
  savingsLevel,
  situationOptions,
  type FinderProduct,
} from "~/lib/serviceFinder";
import { FINDER_COPY } from "~/lib/serviceFinderCopy";
import ServiceFinder from "./ServiceFinder";

/**
 * The service assistant rendered: the three questions, what a missing answer
 * says, the result, and the draft it hands to the contact form. The scoring
 * itself is `serviceFinder.test.ts`.
 */

const copy = FINDER_COPY.de;

/** Every catalogue product, minus one, so a match without a product is skipped. */
const PRODUCTS: FinderProduct[] = CATALOGUE_PRODUCTS.filter((p) => p.id !== "relaunch-konzept").map((p) => ({
  id: p.id,
  title: p.title.de,
  categoryName: CATALOGUE[p.category].name.de,
  href: `/leistungen/${p.slug.de}`,
  savings: savingsLevel(p.id),
}));

function open(lang: "de" | "en" = "de") {
  render(<ServiceFinder lang={lang} products={PRODUCTS} contactHref="/#kontakt" catalogueHref="/shop/leistungen" />);
}

const finder = () => document.querySelector(".finder") as HTMLElement;
const submit = () => fireEvent.submit(document.querySelector("form.finder__stage")!);
const check = (label: string) => fireEvent.click(screen.getByRole("checkbox", { name: new RegExp(label) }));
const atStep = (step: string) => waitFor(() => expect(finder().dataset.step).toBe(step));
const topic = (id: keyof typeof CATALOGUE) => CATALOGUE[id].topic.de;

beforeEach(() => {
  // The site's own motion switch: every transition is instant, so a step's
  // exit does not wait on animation frames jsdom never paints.
  document.documentElement.setAttribute("data-a11y-motion", "off");
  sessionStorage.clear();
});

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute("data-a11y-motion");
});

describe("ServiceFinder: the questions", () => {
  it("opens on the topics, one checkbox per topic, without taking focus", () => {
    open();
    expect(finder().dataset.step).toBe("1");
    expect(screen.getByText("Schritt 1 von 3")).toBeTruthy();
    expect(screen.getAllByRole("checkbox")).toHaveLength(TOPIC_IDS.length);
    expect(document.querySelector("legend")?.textContent).toBe(copy.topicsQuestion);
    expect(screen.queryByRole("button", { name: copy.back })).toBeNull();
    expect(document.activeElement).toBe(document.body);
    expect(document.querySelectorAll(".finder__segment")).toHaveLength(3);
    // Each topic names its category underneath.
    expect(screen.getAllByRole("checkbox")[0]!.closest("label")!.textContent).toBe(
      CATALOGUE.webauftritt.topic.de + CATALOGUE.webauftritt.name.de,
    );
  });

  it("pops a tick on a chosen answer and takes it away again", () => {
    open();
    const box = screen.getByRole("checkbox", { name: new RegExp(topic("webauftritt")) });
    const tick = () => box.closest("label")!.querySelector(".finder__check svg");
    expect(tick()).toBeNull();
    fireEvent.click(box);
    expect(tick()).not.toBeNull();
    fireEvent.click(box);
    return waitFor(() => expect(tick()).toBeNull());
  });

  it("says in words that a topic is missing, ties it to the group, and clears it on a pick", async () => {
    open();
    submit();
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toBe(copy.pickOne);
    const fieldset = document.querySelector("fieldset")!;
    expect(fieldset.getAttribute("aria-describedby")).toBe(`${document.querySelector(".finder__help")!.id} ${alert.id}`);
    check(topic("webauftritt"));
    expect(screen.queryByRole("alert")).toBeNull();
    expect(fieldset.getAttribute("aria-describedby")).toBe(document.querySelector(".finder__help")!.id);
  });

  it("offers the starting points of the chosen topics and focuses the new question", async () => {
    open();
    check(topic("webauftritt"));
    submit();
    await atStep("2");
    const offered = situationOptions(["webauftritt"], "de").map((c) => c.text);
    expect(screen.getAllByRole("checkbox").map((b) => b.closest("label")!.textContent)).toEqual(offered);
    check(offered[0]!);
    expect((screen.getByRole("checkbox", { name: offered[0] }) as HTMLInputElement).checked).toBe(true);
    expect(document.activeElement?.tagName).toBe("LEGEND");
    expect(document.activeElement?.textContent).toBe(copy.situationsQuestion);
  });

  it("keeps the answers when going back", async () => {
    open();
    check(topic("webauftritt"));
    submit();
    await atStep("2");
    fireEvent.click(screen.getByRole("button", { name: copy.back }));
    await atStep("1");
    expect((screen.getByRole("checkbox", { name: new RegExp(topic("webauftritt")) }) as HTMLInputElement).checked).toBe(true);
  });

  it("asks for the stage with radios and insists on one", async () => {
    open();
    check(topic("webauftritt"));
    submit();
    await atStep("2");
    submit();
    await atStep("3");
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    expect(screen.getByRole("button", { name: new RegExp(copy.showResult) })).toBeTruthy();
    submit();
    expect((await screen.findByRole("alert")).textContent).toBe(copy.pickStage);
    fireEvent.click(screen.getByRole("radio", { name: new RegExp(copy.stages.rough.label) }));
    expect(screen.queryByRole("alert")).toBeNull();
  });
});

describe("ServiceFinder: the result", () => {
  async function answer(topics: string[], situations: string[], stage: "clear" | "rough" | "open") {
    open();
    for (const label of topics) check(label);
    submit();
    await atStep("2");
    for (const label of situations) check(label);
    submit();
    await atStep("3");
    fireEvent.click(screen.getByRole("radio", { name: new RegExp(FINDER_COPY.de.stages[stage].label) }));
    submit();
    await atStep("result");
  }

  it("ranks the matches with their reasons, savings and links, and focuses the heading", async () => {
    const situation = situationOptions(["webauftritt"], "de")[0]!;
    await answer([topic("webauftritt")], [situation.text], "clear");

    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading.textContent).toBe(copy.resultTitle);
    expect(document.activeElement).toBe(heading);
    expect(screen.getByText(copy.resultLabel)).toBeTruthy();

    const expected = recommend({ topics: ["webauftritt"], situations: [situation], stage: "clear" }, "de");
    const cards = screen.getAllByRole("listitem").filter((li) => li.classList.contains("finder__match"));
    expect(cards.map((li) => within(li).getByRole("heading", { level: 4 }).textContent)).toEqual(
      expected.map((m) => PRODUCTS.find((p) => p.id === m.productId)!.title),
    );
    const first = cards[0]!;
    expect(first.dataset.rank).toBe("best");
    expect(cards[1]!.dataset.rank).toBe("also");
    expect(first.querySelector(".finder__rank")!.textContent).toBe(`1${copy.rankBest}`);
    const best = PRODUCTS.find((p) => p.id === expected[0]!.productId)!;
    expect(within(first).getByRole("link").getAttribute("href")).toBe(best.href);
    const lit = first.querySelectorAll(".finder__savings-meter [data-on]").length;
    expect(lit).toBe(["low", "medium", "high"].indexOf(best.savings) + 1);
    expect(first.textContent).toContain(copy.savingsLevels[best.savings]);
    expect([...first.querySelectorAll(".finder__why li")].map((li) => li.textContent)).toEqual(
      expected[0]!.reasons.map((r) => `✓${r}`),
    );
  });

  it("skips a match whose product the page does not list", async () => {
    await answer([topic("webauftritt")], [situationOptions(["webauftritt"], "de")[1]!.text], "clear");
    const expected = recommend(
      { topics: ["webauftritt"], situations: [situationOptions(["webauftritt"], "de")[1]!], stage: "clear" },
      "de",
    ).map((m) => m.productId);
    expect(expected).toContain("relaunch-konzept");
    expect(document.querySelectorAll(".finder__matches > li")).toHaveLength(expected.length - 1);
  });

  it("says so when nothing matched", async () => {
    await answer([copy.unsure.label], [], "open");
    expect(screen.getByText(copy.noMatch)).toBeTruthy();
  });

  it("hands the answers to the contact form as a draft, dropping starting points of a deselected topic", async () => {
    open();
    check(topic("webauftritt"));
    submit();
    await atStep("2");
    const dropped = situationOptions(["webauftritt"], "de")[0]!;
    check(dropped.text);
    fireEvent.click(screen.getByRole("button", { name: copy.back }));
    await atStep("1");
    check(topic("webauftritt"));
    check(topic("schulung"));
    submit();
    await atStep("2");
    submit();
    await atStep("3");
    fireEvent.click(screen.getByRole("radio", { name: new RegExp(copy.stages.open.label) }));
    submit();
    await atStep("result");

    const cta = screen.getByRole("link", { name: new RegExp(copy.cta) });
    expect(cta.getAttribute("href")).toBe("/#kontakt");
    fireEvent.click(cta);
    const answers = { topics: ["schulung" as const], situations: [], stage: "open" as const };
    expect(JSON.parse(sessionStorage.getItem(CONTACT_DRAFT_KEY)!)).toEqual(
      buildDraft(recommend(answers, "de"), answers, "de"),
    );
    expect(screen.getByRole("link", { name: copy.catalogueLink }).getAttribute("href")).toBe("/shop/leistungen");
  });

  it("starts over with nothing chosen", async () => {
    await answer([topic("webauftritt")], [], "clear");
    fireEvent.click(screen.getByRole("button", { name: copy.restart }));
    await atStep("1");
    expect(screen.getAllByRole("checkbox").every((b) => !(b as HTMLInputElement).checked)).toBe(true);
  });

  it("speaks English when asked to", () => {
    open("en");
    expect(screen.getByText("Step 1 of 3")).toBeTruthy();
    expect(document.querySelector("legend")?.textContent).toBe(FINDER_COPY.en.topicsQuestion);
  });
});
