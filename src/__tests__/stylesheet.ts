import { readFileSync } from "node:fs";
import { join } from "node:path";

const STYLES = join(__dirname, "..", "styles");

/**
 * For tests: `styles/<name>.css` with its own partials (`./<name>/*.css`)
 * inlined where they are imported, so a source-level rule about the
 * stylesheet holds whichever partial the rule sits in. Package imports
 * (Tailwind, tds-shared) stay as they are.
 */
export function readStylesheet(name: string): string {
  const partial = new RegExp(`^@import "\\./(${name}/[\\w-]+\\.css)";\\r?$`, "gm");
  return readFileSync(join(STYLES, `${name}.css`), "utf8").replace(partial, (_, file: string) =>
    readFileSync(join(STYLES, file), "utf8"),
  );
}
