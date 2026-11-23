// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mountSmoothScroll } from "./smoothScroll";

/**
 * Which link clicks become a section jump, through the mounted scroll
 * runtime: on the touch path, with the site's motion switch off, so a jump is
 * one `window.scrollTo` and no animation frame is involved.
 */

let unmount: () => void;
let scrolled: ScrollToOptions[];

function link(href: string, attrs: Record<string, string> = {}) {
  const a = document.createElement("a");
  a.href = href;
  a.textContent = "Link";
  for (const [k, v] of Object.entries(attrs)) a.setAttribute(k, v);
  document.body.append(a);
  return a;
}

/** Clicks `a`; true when the runtime took the click over. */
function click(a: Element, init: MouseEventInit = {}) {
  const event = new MouseEvent("click", { bubbles: true, cancelable: true, button: 0, ...init });
  a.dispatchEvent(event);
  return event.defaultPrevented;
}

beforeEach(() => {
  window.history.replaceState(null, "", "/leistungen/");
  document.body.innerHTML = `<main><section id="about">Über</section><section id="über">Umlaut</section><section id="1-start">Ziffer</section></main>`;
  document.documentElement.setAttribute("data-a11y-motion", "off");
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: query === "(pointer: coarse)", media: query }));
  scrolled = [];
  vi.spyOn(window, "scrollTo").mockImplementation(((options: ScrollToOptions) => {
    scrolled.push(options);
  }) as typeof window.scrollTo);
  unmount = mountSmoothScroll();
});

afterEach(() => {
  unmount();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  document.documentElement.removeAttribute("data-a11y-motion");
  document.body.innerHTML = "";
});

describe("section jumps from links", () => {
  it("takes over a plain click on a link to a section of this page and records the hash", () => {
    expect(click(link("/leistungen#about"))).toBe(true);
    expect(scrolled).toEqual([{ top: 0, behavior: "instant" }]);
    expect(location.hash).toBe("#about");
  });

  it("treats a trailing slash as the same page", () => {
    expect(click(link("/leistungen#about"))).toBe(true);
    window.history.replaceState(null, "", "/leistungen");
    expect(click(link("/leistungen/#about"))).toBe(true);
  });

  it("finds an id that is no valid selector, and a percent-encoded one", () => {
    expect(click(link("/leistungen/#1-start"))).toBe(true);
    expect(click(link("/leistungen/#%C3%BCber"))).toBe(true);
  });

  it("leaves modified, non-primary and already handled clicks to the browser", () => {
    const a = link("/leistungen/#about");
    for (const init of [{ metaKey: true }, { ctrlKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
      expect(click(a, init), JSON.stringify(init)).toBe(false);
    }
    a.addEventListener("click", (e) => e.preventDefault(), { once: true });
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    a.dispatchEvent(event);
    expect(scrolled).toEqual([]);
  });

  it("leaves links elsewhere to the browser", () => {
    expect(click(link("/leistungen/#about", { target: "_blank" }))).toBe(false);
    expect(click(link("/leistungen/#about", { target: "_self" }))).toBe(true);
    expect(click(link("https://example.org/leistungen/#about"))).toBe(false);
    expect(click(link("/kontakt/#about"))).toBe(false);
    expect(click(link("/leistungen/"))).toBe(false);
    expect(click(link("/leistungen/#"))).toBe(false);
    expect(click(link("/leistungen/#gibt-es-nicht"))).toBe(false);
  });

  it("follows a click on an element inside the link", () => {
    const a = link("/leistungen/#about");
    const inner = document.createElement("span");
    a.append(inner);
    expect(click(inner)).toBe(true);
  });

  it("stops taking clicks once unmounted", () => {
    unmount();
    expect(click(link("/leistungen/#about"))).toBe(false);
    expect(window.tdsScrollTo).toBeUndefined();
    unmount = () => {};
  });
});
