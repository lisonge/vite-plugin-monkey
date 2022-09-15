// ==UserScript==
// @name         dynamic-import
// @namespace    https://github.com/lisonge
// @version      1.0.0
// @author       monkey
// @description  default_description
// @icon         https://vitejs.dev/logo.svg
// @match        https://i.songe.li/*
// @require      https://cdn.jsdelivr.net/npm/md5@2.3.0/dist/md5.min.js
// @resource     animate.css  https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// ==/UserScript==

// use vite-plugin-monkey@2.4.2 at 2022-09-15T06:05:47.711Z

(function() {
  "use strict";
  if (location.href.includes("animate.css=on")) {
    Promise.resolve().then(() => _animate$1);
    document.querySelectorAll("div").forEach((div) => {
      div.classList.add("animate__shakeX");
      div.classList.add("animate__animated");
    });
    console.log("dynamic import animate.css");
  }
  (async () => {
    if (location.href.includes("md5=on")) {
      const md5 = (await Promise.resolve().then(() => _monkeyDynamicImport_md5_)).default;
      console.log(`md5('xx')=${md5("xx")}`);
      console.log("dynamic import md5");
    }
  })();
  const cssLoader = (e) => {
    const t = GM_getResourceText(e);
    return GM_addStyle(t), t;
  };
  const _animate = cssLoader("animate.css");
  const _animate$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: _animate
  }, Symbol.toStringTag, { value: "Module" }));
  const MD5$1 = MD5;
  const _monkeyDynamicImport_md5_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: MD5$1
  }, Symbol.toStringTag, { value: "Module" }));
})();
