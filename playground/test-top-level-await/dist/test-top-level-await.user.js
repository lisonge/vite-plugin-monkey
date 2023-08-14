// ==UserScript==
// @name       test-top-level-await
// @namespace  vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @match      https://songe.li
// ==/UserScript==

(async function () {
  'use strict';

  console.log(await (window == null ? void 0 : window.fetch(`/`)));
  for await (const v of [Promise.resolve(1), Promise.resolve(2)]) {
    console.log(v);
  };
  console.log((+await( fetch(`/`)) || await( fetch(`/`))) && await( fetch(`/`)));

})();
