// ==UserScript==
// @name         dynamic-import
// @namespace    https://github.com/lisonge
// @version      1.0.0
// @author       monkey
// @description  default_description
// @icon         https://vitejs.dev/logo.svg
// @match        https://i.songe.li/*
// @require      https://cdn.jsdelivr.net/npm/md5@2.3.0/dist/md5.min.js
// @require      https://cdn.jsdelivr.net/npm/vue@3.2.45/dist/vue.global.prod.js
// @require      data:application/javascript,window.Vue%3DVue%3B
// @require      https://cdn.jsdelivr.net/npm/element-plus@2.2.21/dist/index.full.min.js
// @resource     animate.css  https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.css
// @grant        GM_getResourceText
// ==/UserScript==

(function(md5, vue, elementPlus) {
  "use strict";
  const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
  function _interopNamespace(e) {
    if (e && e.__esModule)
      return e;
    const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
    if (e) {
      for (const k in e) {
        if (k !== "default") {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }
  function _mergeNamespaces(n, m) {
    for (var i = 0; i < m.length; i++) {
      const e = m[i];
      if (typeof e !== "string" && !Array.isArray(e)) {
        for (const k in e) {
          if (k !== "default" && !(k in n)) {
            const d = Object.getOwnPropertyDescriptor(e, k);
            if (d) {
              Object.defineProperty(n, k, d.get ? d : {
                enumerable: true,
                get: () => e[k]
              });
            }
          }
        }
      }
    }
    return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
  }
  const md5__namespace = /* @__PURE__ */ _interopNamespace(md5);
  const md5__default = /* @__PURE__ */ _interopDefaultLegacy(md5);
  const vue__namespace = /* @__PURE__ */ _interopNamespace(vue);
  const vue__default = /* @__PURE__ */ _interopDefaultLegacy(vue);
  const elementPlus__namespace = /* @__PURE__ */ _interopNamespace(elementPlus);
  const elementPlus__default = /* @__PURE__ */ _interopDefaultLegacy(elementPlus);
  if (location.href.includes("animate.css=on")) {
    Promise.resolve().then(() => _monkeyResourceImport_animate$1);
    document.querySelectorAll("div").forEach((div) => {
      div.classList.add("animate__shakeX");
      div.classList.add("animate__animated");
    });
    console.log("dynamic import animate.css");
  }
  (async () => {
    if (location.href.includes("md5=on")) {
      const md52 = (await Promise.resolve().then(() => _monkeyDynamicImport_md5_)).default;
      console.log(`md5('xx')=${md52("xx")}`);
      console.log("dynamic import md5");
    }
    const Vue2 = await Promise.resolve().then(() => _monkeyDynamicImport_vue_);
    const ElementPlus2 = await Promise.resolve().then(() => _monkeyDynamicImport_elementPlus_);
    console.log({
      Vue: Vue2,
      ElementPlus: ElementPlus2,
      default: ElementPlus2.default
    });
  })();
  const cssLoader = (e) => {
    const t = GM_getResourceText(e), o = document.createElement("style");
    return o.innerText = t, document.head.append(o), t;
  };
  const _monkeyResourceImport_animate = cssLoader("animate.css");
  const _monkeyResourceImport_animate$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: _monkeyResourceImport_animate
  }, Symbol.toStringTag, { value: "Module" }));
  const _monkeyDynamicImport_md5_ = /* @__PURE__ */ _mergeNamespaces({
    __proto__: null,
    default: md5__default.default
  }, [md5__namespace]);
  const _monkeyDynamicImport_vue_ = /* @__PURE__ */ _mergeNamespaces({
    __proto__: null,
    default: vue__default.default
  }, [vue__namespace]);
  const _monkeyDynamicImport_elementPlus_ = /* @__PURE__ */ _mergeNamespaces({
    __proto__: null,
    default: elementPlus__default.default
  }, [elementPlus__namespace]);
})(MD5, Vue, ElementPlus);
