import { describe, expect, it } from "vitest";
import { fieldValid, firstInvalidStep, subjectFor, withDraft } from "./contactSteps";

describe("subjectFor", () => {
  it("sends the trimmed reason, or nothing", () => {
    expect(subjectFor("  Neue Website ", false, "Notfall")).toBe("Neue Website");
    expect(subjectFor("  ", false, "Notfall")).toBeUndefined();
    expect(subjectFor(undefined, false, "Notfall")).toBeUndefined();
  });

  it("marks an emergency and stays inside the schema's 200 characters", () => {
    expect(subjectFor("", true, "Notfall")).toBe("Notfall");
    expect(subjectFor("Neue Website", true, "Notfall")).toBe("Notfall: Neue Website");
    expect(subjectFor("x".repeat(250), true, "Notfall")).toHaveLength(200);
  });
});

describe("withDraft", () => {
  it("fills an empty field and goes under typed text, once", () => {
    expect(withDraft("", "Entwurf.")).toBe("Entwurf.");
    expect(withDraft("  ", "Entwurf.")).toBe("Entwurf.");
    expect(withDraft("Eigenes.  ", "Entwurf.")).toBe("Eigenes.\n\nEntwurf.");
    expect(withDraft("Eigenes.\n\nEntwurf.", " Entwurf. ")).toBeNull();
  });
});

describe("the step rules", () => {
  it("finds the first step with an invalid field", () => {
    expect(firstInvalidStep({ message: {}, email: {} })).toBe(0);
    expect(firstInvalidStep({ consent: {} })).toBe(2);
    expect(firstInvalidStep({})).toBe(-1);
  });

  it("checks a field against the shared schema and never counts blank as valid", () => {
    expect(fieldValid("email", "erika@example.de")).toBe(true);
    expect(fieldValid("email", "erika")).toBe(false);
    expect(fieldValid("company", "   ")).toBe(false);
  });
});
