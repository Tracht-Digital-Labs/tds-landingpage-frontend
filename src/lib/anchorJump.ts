/**
 * Which link clicks become an animated section jump (`smoothScroll.ts`):
 * a plain primary click on a same-tab link to an element on this very page.
 * Everything else — a modifier key, another tab, another page or origin, a
 * bare `#`, a hash nothing answers to — stays the browser's.
 */

export interface AnchorJump {
  element: HTMLElement;
  /** The link's hash, for `history.pushState`. */
  hash: string;
}

export function anchorJumpTarget(event: MouseEvent): AnchorJump | null {
  if (event.defaultPrevented || event.button !== 0) return null;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;

  const link = (event.target as Element | null)?.closest("a[href]");
  if (!(link instanceof HTMLAnchorElement)) return null;
  if (link.target && link.target !== "_self") return null;

  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin) return null;
  const samePath = url.pathname.replace(/\/+$/, "") === location.pathname.replace(/\/+$/, "");
  // `hash` is empty for a bare `#` as well as for none.
  if (!samePath || !url.hash) return null;

  const element = elementFor(url.hash);
  return element instanceof HTMLElement ? { element, hash: url.hash } : null;
}

/** An id that is no valid selector (`#1-start`) or is percent-encoded still resolves. */
function elementFor(hash: string): Element | null {
  try {
    return document.querySelector(hash);
  } catch {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  }
}
