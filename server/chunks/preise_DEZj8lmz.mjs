import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { t as createComponent } from "./astro-component_DQzQPKGT.mjs";
import { t as createAstro } from "./compiler_Bfjj3pqE.mjs";
// src/pages/en/preise.astro
var preise_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Preise,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://tracht-digital.de");
var $$Preise = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Preise;
	return Astro.redirect("https://shop.tracht-digital.de/en/?art=own", 301);
}, "/home/runner/work/tds-landingpage-frontend/tds-landingpage-frontend/src/pages/en/preise.astro", void 0);
var $$file = "/home/runner/work/tds-landingpage-frontend/tds-landingpage-frontend/src/pages/en/preise.astro";
var $$url = "/en/preise";
// \0virtual:astro:page:src/pages/en/preise@_@astro
var page = () => preise_exports;
export { page };
