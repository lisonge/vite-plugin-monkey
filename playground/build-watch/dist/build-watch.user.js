// ==UserScript==
// @name       build-watch
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// @require    https://cdn.jsdelivr.net/npm/vue@3.2.47/dist/vue.global.prod.js
// @resource   element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.2.31/dist/index.css
// @grant      GM_deleteValue
// @grant      GM_getResourceText
// @grant      GM_listValues
// @grant      GM_setValue
// ==/UserScript==

(function (vue) {
  'use strict';

  var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
  var _GM_listValues = /* @__PURE__ */ (() => typeof GM_listValues != "undefined" ? GM_listValues : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  const cssLoader = (e) => {
    const t = GM_getResourceText(e), o = document.createElement("style");
    return o.innerText = t, document.head.append(o), t;
  };
  cssLoader("element-plus/dist/index.css");
  _GM_deleteValue("key");
  _GM_setValue("key", "value");
  console.log(_GM_listValues());
  console.log({ createApp: vue.createApp, ref: vue.ref });
  (async () => {
  })();

})(Vue);
