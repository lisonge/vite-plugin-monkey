// ==UserScript==
// @name       test-top-level-await
// @namespace  vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @match      https://songe.li
// @grant      GM_cookie
// @grant      unsafeWindow
// @grant      window.close
// @grant      window.focus
// @grant      window.onurlchange
// ==/UserScript==

(async function () {
  'use strict';

  var _monkeyWindow = /* @__PURE__ */ (() => window)();
  console.log(await (window == null ? void 0 : window.fetch(`/`)));
  for await (const v of [Promise.resolve(1), Promise.resolve(2)]) {
    console.log(v);
  };
  console.log((+await( fetch(`/`)) || await( fetch(`/`))) && await( fetch(`/`)));
  if (_monkeyWindow.onurlchange === null) {
    _monkeyWindow.addEventListener("urlchange", console.log);
  }
  _monkeyWindow.focus();
  _monkeyWindow.close();
  _monkeyWindow.unsafeWindow.test = 42;
  _monkeyWindow.GM_cookie = 42;

})();