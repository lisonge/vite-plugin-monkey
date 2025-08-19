// ==UserScript==
// @name       build-watch
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// @resource   element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.10.7/dist/index.css
// @grant      GM_addStyle
// @grant      GM_deleteValue
// @grant      GM_getResourceText
// @grant      window.onurlchange
// ==/UserScript==

(async function () {
  'use strict';

  var _GM_addStyle = /* @__PURE__ */ (() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)();
  var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
  var _GM_getResourceText = /* @__PURE__ */ (() => typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0)();
  var _monkeyWindow = /* @__PURE__ */ (() => window)();
  const cssLoader = (e) => _GM_addStyle(_GM_getResourceText(e));
  cssLoader("element-plus/dist/index.css");
  _GM_deleteValue("key");
  await( fetch(`/`));
  await( fetch(`/`));
  console.log(_monkeyWindow.onurlchange);
  for await (const x of [1, 2, 3, 4, 5]) {
    await( fetch(`/` + x));
  };
  const fn = async () => {
    const r = await fetch(`/`);
    console.log(r);
  };
  await( fn());

})();