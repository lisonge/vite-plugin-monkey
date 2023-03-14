// ==UserScript==
// @name       test-sourcemap
// @namespace  vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @match      https://lisonge.com/*
// @require    https://cdn.jsdelivr.net/npm/systemjs@6.14.0/dist/system.min.js
// @require    https://cdn.jsdelivr.net/npm/systemjs@6.14.0/dist/extras/named-register.min.js
// ==/UserScript==


System.register("./__entry.js", [], (function (exports, module) {
  'use strict';
  return {
    execute: (async function () {

      const test = () => {
        let a = 0;
        const x = () => {
          a++;
          console.log(a);
        };
        return { x };
      };
      test().x();
      const response = (await fetch(
        `https://cdn.jsdelivr.net/npm/vite@4.1.4/package.json`
      ));
      console.log((await response.json()));

    })
  };
}));

System.import("./__entry.js", "./");