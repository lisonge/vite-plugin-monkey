// ==UserScript==
// @name       mini-css
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     author_name
// @icon       https://vitejs.dev/logo.svg
// @match      https://songe.li/*
// @tag        tag1
// @tag        tag2
// @grant      GM_addStyle
// @grant      GM_getValue
// @grant      GM_registerMenuCommand
// @grant      GM_webRequest
// ==/UserScript==
// hello

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const t=document.createElement("style");t.textContent=o,document.head.append(t)})(" .read-the-docs{color:#888;position:fixed;top:60px;right:0;bottom:0;left:260px;background:#fff;z-index:1050;padding:10px 20px 200px;overflow-y:auto;box-shadow:-2px 2px 6px #bbb}body{display:flex;background-color:#0ff} ");

(function () {
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
  var GM = /* @__PURE__ */ (() => monkeyWindow.GM)();
  var GM_getValue = /* @__PURE__ */ (() => monkeyWindow.GM_getValue)();
  var GM_registerMenuCommand = /* @__PURE__ */ (() => monkeyWindow.GM_registerMenuCommand)();
  var GM_webRequest = /* @__PURE__ */ (() => monkeyWindow.GM_webRequest)();
  console.log(`hello wolrd`);
  console.log(Object.keys(GM));
  GM_registerMenuCommand("", (e) => {
  });
  GM_getValue("key", String("default"));
  console.log(
    GM_webRequest([], (...args) => {
      console.log(args);
    })
  );

})();