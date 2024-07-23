// ==UserScript==
// @name         external-source
// @namespace    https://github.com/lisonge
// @version      1.0.0
// @author       monkey
// @description  default_description
// @icon         https://vitejs.dev/logo.svg
// @match        https://songe.li/
// @require      https://cdn.jsdelivr.net/npm/vue@3.4.21/dist/vue.global.prod.js
// @require      data:application/javascript,window.Vue%3DVue%3B
// @require      https://cdn.jsdelivr.net/npm/element-plus@2.6.2/dist/index.full.min.js
// @resource     animate.css                      https://fastly.jsdelivr.net/npm/animate.css@4.1.1/animate.css
// @resource     base64-img/test/img/car.svg      https://unpkg.com/base64-img@1.0.4/test/img/car.svg
// @resource     base64-img/test/img/car.svg?raw  https://cdn.jsdelivr.net/npm/base64-img@1.0.4/test/img/car.svg
// @resource     base64-img/test/img/car.svg?url  https://cdn.jsdelivr.net/npm/base64-img@1.0.4/test/img/car.svg
// @resource     element-plus/dist/index.css      https://cdn.jsdelivr.net/npm/element-plus@2.6.2/dist/index.css
// @resource     element-plus/dist/index.css?raw  https://cdn.jsdelivr.net/npm/element-plus@2.6.2/dist/index.css
// @resource     element-plus/package.json        https://npm.elemecdn.com/element-plus@2.6.2/package.json
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @grant        unsafeWindow
// ==/UserScript==

(function (Vue, elementPlus) {
  'use strict';

  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
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

  const Vue__namespace = /*#__PURE__*/_interopNamespaceDefault(Vue);

  const cssLoader = (e) => {
    const t = GM_getResourceText(e);
    return GM_addStyle(t), t;
  }, jsonLoader = (e) => JSON.parse(GM_getResourceText(e)), urlLoader = (e, t) => GM_getResourceURL(e, false).replace(/^data:application;base64,/, `data:${t};base64,`), rawLoader = (e) => GM_getResourceText(e);
  cssLoader("element-plus/dist/index.css");
  const ElementPlusPkg = jsonLoader("element-plus/package.json");
  cssLoader("animate.css");
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const carSvgUrl = urlLoader("base64-img/test/img/car.svg", "image/svg+xml");
  const tUrl = urlLoader("base64-img/test/img/car.svg?url", "image/svg+xml");
  const tRaw = rawLoader("base64-img/test/img/car.svg?raw");
  const cssRaw = rawLoader("element-plus/dist/index.css?raw");
  console.log({
    Vue: Vue__namespace,
    ElDatePicker: elementPlus.ElDatePicker,
    ElButton: elementPlus.ElButton,
    ElementPlusPkg,
    unsafeWindow: _unsafeWindow,
    carSvgUrl,
    tUrl,
    tRaw,
    // tInline,
    cssRaw
    // cssUrl,
    // cssInline,
  });
  document.body.append(
    (() => {
      const img = document.createElement("img");
      img.src = carSvgUrl;
      return img;
    })()
  );

})(Vue, ElementPlus);