// @vitest-environment jsdom
import { necessaryOnly } from "@tracht-digital-labs/tds-shared/consent";
import { clearConsent, writeConsent } from "@tracht-digital-labs/tds-shared/consent/store";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  INTEREST_WEIGHTS,
  MAX_PRODUCTS,
  PRODUCT_INTEREST_KEY,
  bumpInterest,
  cameFromSearch,
  likeliestProduct,
  parseInterest,
} from "./productInterest";

/** A fresh module per test: the page's weights are module state. */
const load = async () => {
  vi.resetModules();
  return import("./productInterest");
};
const grantComfort = () => writeConsent({ ...necessaryOnly(), functional: true }, "de");

describe("product interest weights", () => {
  it("adds weights and moves the counted product to the most recent end", () => {
    const weights = bumpInterest(bumpInterest([], ["a", "b"], 1), ["a"], 2);
    expect(weights).toEqual([
      ["b", 1],
      ["a", 3],
    ]);
  });

  it("names the heaviest product, the one counted last on a tie", () => {
    expect(likeliestProduct([["a", 3], ["b", 1]])).toBe("a");
    expect(likeliestProduct([["a", 2], ["b", 2]])).toBe("b");
    expect(likeliestProduct([])).toBeNull();
  });

  it(`remembers at most ${MAX_PRODUCTS} products, dropping the least recent`, () => {
    const ids = Array.from({ length: MAX_PRODUCTS + 3 }, (_, index) => `p-${index}`);
    const weights = bumpInterest([], ids, 1);
    expect(weights).toHaveLength(MAX_PRODUCTS);
    expect(weights[0]?.[0]).toBe("p-3");
  });

  it("reads back only product ids with a positive weight", () => {
    expect(parseInterest('[["online-formular-statt-papier",2],["<b>",1],["x",-1],["y","2"],"z"]')).toEqual([
      ["online-formular-statt-papier", 2],
    ]);
    expect(parseInterest("{not json")).toEqual([]);
    expect(parseInterest('{"a":1}')).toEqual([]);
  });

  it("recognises a search engine's results as the referrer, not the site itself or a blank one", () => {
    expect(cameFromSearch("https://www.google.de/")).toBe(true);
    expect(cameFromSearch("https://duckduckgo.com/")).toBe(true);
    expect(cameFromSearch("https://search.brave.com/search?q=x")).toBe(true);
    expect(cameFromSearch("https://tracht-digital.de/leistungen/webauftritt")).toBe(false);
    expect(cameFromSearch("https://notgoogle.example/")).toBe(false);
    expect(cameFromSearch("")).toBe(false);
  });
});

describe("product interest in the browser", () => {
  beforeEach(() => {
    localStorage.clear();
    clearConsent();
    document.body.innerHTML = "";
  });
  afterEach(() => {
    Object.defineProperty(document, "referrer", { value: "", configurable: true });
  });

  it("stores nothing without the Komfort consent, but this page still counts", async () => {
    const interest = await load();
    interest.recordProductInterest(["e-mail-umzug"], 2);
    expect(localStorage.getItem(PRODUCT_INTEREST_KEY)).toBeNull();
    expect(interest.likeliestProduct(interest.readProductInterest())).toBe("e-mail-umzug");
  });

  it("stores the weights with the consent and deletes them when it is withdrawn", async () => {
    grantComfort();
    const interest = await load();
    const stop = interest.mountProductInterest();
    interest.recordProductInterest(["e-mail-umzug"], 2);
    expect(parseInterest(localStorage.getItem(PRODUCT_INTEREST_KEY))).toEqual([["e-mail-umzug", 2]]);

    writeConsent(necessaryOnly(), "de");
    expect(localStorage.getItem(PRODUCT_INTEREST_KEY)).toBeNull();
    stop();
  });

  it("counts a page's products three times when the visit came from a search engine", async () => {
    grantComfort();
    document.body.innerHTML = '<main data-interest-products="website-wartung-12-monate e-mail-umzug"></main>';
    Object.defineProperty(document, "referrer", { value: "https://www.bing.com/", configurable: true });
    const interest = await load();
    interest.mountProductInterest()();
    expect(interest.readProductInterest()).toEqual([
      ["website-wartung-12-monate", INTEREST_WEIGHTS.searchEntry],
      ["e-mail-umzug", INTEREST_WEIGHTS.searchEntry],
    ]);
  });

  it("counts a followed product tile and tells the page", async () => {
    document.body.innerHTML = '<a href="#" data-interest-product="onepager-website"><span>Onepager</span></a>';
    const interest = await load();
    const heard: string[] = [];
    const stopListening = interest.onProductInterest((weights) => heard.push(interest.likeliestProduct(weights) ?? ""));
    const stop = interest.mountProductInterest();
    document.querySelector("span")?.click();
    expect(interest.readProductInterest()).toEqual([["onepager-website", INTEREST_WEIGHTS.tile]]);
    expect(heard).toEqual(["onepager-website"]);
    stop();
    stopListening();
  });

  it("weighs the assistant's strongest match above its others", async () => {
    const interest = await load();
    interest.recordAssistantResult(["rechnungen-digital-schreiben", "einen-ablauf-automatisieren"]);
    expect(interest.likeliestProduct(interest.readProductInterest())).toBe("rechnungen-digital-schreiben");
  });
});
