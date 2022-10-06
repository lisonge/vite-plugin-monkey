// ==UserScript==
// @name         external-source
// @namespace    https://github.com/lisonge
// @version      1.0.0
// @author       monkey
// @description  default_description
// @icon         https://vitejs.dev/logo.svg
// @match        https://i.songe.li/
// @require      https://cdn.jsdelivr.net/npm/vue@3.2.38/dist/vue.global.prod.js
// @require      data:application/javascript,window.Vue%3DVue%3B
// @require      https://cdn.jsdelivr.net/npm/element-plus@2.2.16/dist/index.full.min.js
// @resource     animate.css                      https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.css
// @resource     base64-img/test/img/car.svg      https://unpkg.com/base64-img@1.0.4/test/img/car.svg
// @resource     base64-img/test/img/car.svg?raw  https://cdn.jsdelivr.net/npm/base64-img@1.0.4/test/img/car.svg
// @resource     base64-img/test/img/car.svg?url  https://cdn.jsdelivr.net/npm/base64-img@1.0.4/test/img/car.svg
// @resource     element-plus/dist/index.css      https://cdn.jsdelivr.net/npm/element-plus@2.2.16/dist/index.css
// @resource     element-plus/dist/index.css?raw  https://cdn.jsdelivr.net/npm/element-plus@2.2.16/dist/index.css
// @resource     element-plus/package.json        https://npm.elemecdn.com/element-plus@2.2.16/package.json
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @grant        unsafeWindow
// ==/UserScript==

(function(Vue2, elementPlus) {
  var _a, _b;
  "use strict";
  function _interopNamespace(e) {
    if (e && e.__esModule)
      return e;
    const n2 = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
    if (e) {
      for (const k in e) {
        if (k !== "default") {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n2, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n2.default = e;
    return Object.freeze(n2);
  }
  const Vue__namespace = /* @__PURE__ */ _interopNamespace(Vue2);
  const cssLoader = (e) => {
    const t = GM_getResourceText(e);
    return GM_addStyle(t), t;
  }, jsonLoader = (e) => JSON.parse(GM_getResourceText(e)), urlLoader = (e, t) => GM_getResourceURL(e, false).replace(/^data:application;base64,/, `data:${t};base64,`), rawLoader = (e) => GM_getResourceText(e);
  cssLoader("element-plus/dist/index.css");
  const ElementPlusPkg = jsonLoader("element-plus/package.json");
  cssLoader("animate.css");
  var r = (_a = document.__monkeyWindow) != null ? _a : window;
  r.GM;
  r.unsafeWindow = (_b = r.unsafeWindow) != null ? _b : window;
  var n = r.unsafeWindow;
  r.GM_info;
  r.GM_cookie;
  const carSvgUrl = urlLoader("base64-img/test/img/car.svg", "image/svg+xml");
  const tUrl = urlLoader("base64-img/test/img/car.svg?url", "image/svg+xml");
  const tRaw = rawLoader("base64-img/test/img/car.svg?raw");
  const cssRaw = rawLoader("element-plus/dist/index.css?raw");
  console.log({
    Vue: Vue__namespace,
    ElDatePicker: elementPlus.ElDatePicker,
    ElButton: elementPlus.ElButton,
    ElementPlusPkg,
    unsafeWindow: n,
    carSvgUrl,
    tUrl,
    tRaw,
    cssRaw
  });
  document.body.append(
    (() => {
      const img = document.createElement("img");
      img.src = carSvgUrl;
      return img;
    })()
  );
})(Vue, ElementPlus);
