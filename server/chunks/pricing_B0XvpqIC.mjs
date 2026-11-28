import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as createComponent } from "./astro-component_DQzQPKGT.mjs";
import { t as createAstro } from "./compiler_Bfjj3pqE.mjs";
// src/pages/en/pricing.astro
var pricing_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Pricing,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://tracht-digital.de");
var $$Pricing = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Pricing;
	return Astro.redirect("https://shop.tracht-digital.de/en/?art=own", 301);
}, "/home/runner/work/tds-landingpage-frontend/tds-landingpage-frontend/src/pages/en/pricing.astro", void 0);
var $$file = "/home/runner/work/tds-landingpage-frontend/tds-landingpage-frontend/src/pages/en/pricing.astro";
var $$url = "/en/pricing";
// \0virtual:astro:page:src/pages/en/pricing@_@astro
var page = () => pricing_exports;
export { page };
