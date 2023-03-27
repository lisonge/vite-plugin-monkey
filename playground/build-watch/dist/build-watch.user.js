// ==UserScript==
// @name       build-watch
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// @resource   element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.2.31/dist/index.css
// @grant      GM_deleteValue
// @grant      GM_getResourceText
// ==/UserScript==

(async function () {
  'use strict';

  var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
  const cssLoader = (e) => {
    const t = GM_getResourceText(e), o = document.createElement("style");
    return o.innerText = t, document.head.append(o), t;
  };
  cssLoader("element-plus/dist/index.css");
  _GM_deleteValue("key");
  (await fetch(`/`));
  (await fetch(`/`));
  const fn = async () => {
    const r = await fetch(`/`);
    console.log(r);
  };
  (await fn());

})();
