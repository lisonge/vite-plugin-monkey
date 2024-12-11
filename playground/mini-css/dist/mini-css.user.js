// ==UserScript==
// @name       mini-css
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     author_name
// @icon       https://vitejs.dev/logo.svg
// @match      https://songe.li/*
// @grant      GM_addStyle
// @grant      GM_getValue
// @grant      GM_registerMenuCommand
// @grant      GM_webRequest
// ==/UserScript==
// hello

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const t=document.createElement("style");t.textContent=o,document.head.append(t)})(" .read-the-docs{color:#888;position:fixed;top:60px;right:0;bottom:0;left:260px;background:#fff;z-index:1050;padding:10px 20px 200px;overflow-y:auto;box-shadow:-2px 2px 6px #bbb}body{display:flex;background-color:#0ff} ");

(function () {
  'use strict';

  var _GM = /* @__PURE__ */ (() => typeof GM != "undefined" ? GM : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_webRequest = /* @__PURE__ */ (() => typeof GM_webRequest != "undefined" ? GM_webRequest : void 0)();
  console.log(`hello wolrd`);
  console.log(Object.keys(_GM));
  _GM_registerMenuCommand("", (e) => {
  });
  _GM_getValue("key", String("default"));
  console.log(
    _GM_webRequest([], (...args) => {
      console.log(args);
    })
  );

})();