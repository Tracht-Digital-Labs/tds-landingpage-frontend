import { describe, expect, it } from "vitest";
import { PLATFORM_INTEREST, SERVICE_INTEREST, interestAttribute } from "./productInterestPages";
import { CATALOGUE_PRODUCTS } from "./serviceFinder";
import { SERVICE_PRODUCTS } from "./serviceProducts";

const catalogue = new Set(CATALOGUE_PRODUCTS.map((product) => product.id));

describe("pages counted as product interest", () => {
  it("name only products the questionnaire can preselect", () => {
    for (const ids of [...Object.values(SERVICE_INTEREST), ...Object.values(PLATFORM_INTEREST)]) {
      for (const id of ids) expect(catalogue, id).toContain(id);
    }
  });

  it("count a home page product tile under its catalogue id", () => {
    for (const product of SERVICE_PRODUCTS) expect(catalogue, product.id).toContain(product.slug.de);
  });

  it("leave the attribute off a page that stands for no product", () => {
    expect(interestAttribute(SERVICE_INTEREST.consulting)).toBeUndefined();
    expect(interestAttribute(PLATFORM_INTEREST.wordpress)).toBe("website-wartung-12-monate sicherheits-update-wordpress");
  });
});
