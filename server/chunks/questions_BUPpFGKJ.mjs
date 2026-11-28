import { t as __exportAll } from "./rolldown-runtime_D3KUYPsf.mjs";
import { T as renderComponent, j as renderTemplate } from "./sequence_BNfUeCqt.mjs";
import { t as createComponent } from "./astro-component_DQzQPKGT.mjs";
import "./compiler_Bfjj3pqE.mjs";
import { t as $$QuestionsPage } from "./QuestionsPage_B33QIxa2.mjs";
// src/pages/en/questions.astro
var questions_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Questions,
	file: () => $$file,
	url: () => $$url
});
var $$Questions = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "QuestionsPage", $$QuestionsPage, { "lang": "en" })}`;
}, "/home/runner/work/tds-landingpage-frontend/tds-landingpage-frontend/src/pages/en/questions.astro", void 0);
var $$file = "/home/runner/work/tds-landingpage-frontend/tds-landingpage-frontend/src/pages/en/questions.astro";
var $$url = "/en/questions";
// \0virtual:astro:page:src/pages/en/questions@_@astro
var page = () => questions_exports;
export { page };
