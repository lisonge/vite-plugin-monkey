// ==UserScript==
// @name        background-script
// @namespace   npm/vite-plugin-monkey
// @version     0.0.0
// @author      monkey
// @icon        https://vitejs.dev/logo.svg
// @background
// ==/UserScript==

(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.monkey = factory());
})(this, function() {
  "use strict";
  const main = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3e3);
  });
  return main;
});

return window.monkey;