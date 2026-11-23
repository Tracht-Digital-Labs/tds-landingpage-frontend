import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ISLANDS = join(__dirname, "..", "components", "islands");

/**
 * For tests: the contact form island's source, `ContactForm.tsx` and every
 * module under `contact/`, as one text. Source-level rules about the form
 * ("the dropdown registers as `subject`", "the thank-you focuses on mount")
 * hold for the island as a whole, whichever file the code sits in.
 */
export function contactIslandSource(): string {
  const parts = join(ISLANDS, "contact");
  const files = [
    join(ISLANDS, "ContactForm.tsx"),
    ...readdirSync(parts)
      .filter((name) => /\.tsx?$/.test(name) && !name.includes(".test."))
      .map((name) => join(parts, name)),
  ];
  return files.map((file) => readFileSync(file, "utf8")).join("\n");
}
