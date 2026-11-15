import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

// The behaviour lives in tds-shared (`withUtf8Charset`, tested there); this
// holds the wiring: Node responses through the middleware, Apache's own cache
// hits and static files through .htaccess.
describe("UTF-8 charset header", () => {
  it("is wired into the middleware and mirrored for Apache's own cache hits", () => {
    expect(readFileSync("src/middleware.ts", "utf8")).toMatch(/sequence\(\s*utf8Charset,/);
    expect(readFileSync("public/.htaccess", "utf8")).toMatch(/^AddDefaultCharset UTF-8$/m);
  });
});
