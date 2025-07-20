// ==UserScript==
// @name     test-top-level-await
// @version  0.0.0
// @match    https://songe.li
// @grant    GM_cookie
// @grant    unsafeWindow
// @grant    window.close
// @grant    window.focus
// @grant    window.onurlchange
// ==/UserScript==

(async function () {
  'use strict';

  var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
  var key = `__monkeyWindow-` + (() => {
    try {
      return new URL((_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href)).origin;
    } catch {
      return location.origin;
    }
  })();
  var monkeyWindow = document[key] ?? window;
  console.log(await( window?.fetch(`/`)));
  for await (const v of [Promise.resolve(1), Promise.resolve(2)]) {
    console.log(v);
  };
  console.log((+await( fetch(`/`)) || await( fetch(`/`))) && await( fetch(`/`)));
  if (monkeyWindow.onurlchange === null) {
    monkeyWindow.addEventListener("urlchange", console.log);
  }
  monkeyWindow.focus();
  monkeyWindow.close();
  monkeyWindow.unsafeWindow.test = 42;
  monkeyWindow.GM_cookie = 42;

})();