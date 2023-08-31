// ==UserScript==
// @name       mini-css
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     author_name
// @icon       https://vitejs.dev/logo.svg
// @match      https://songe.li/*
// @grant      GM_addStyle
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const t=document.createElement("style");t.textContent=o,document.head.append(t)})(" .read-the-docs{color:#888;position:fixed;top:60px;right:0;bottom:0;left:260px;background:#fff;z-index:1050;padding:10px 20px 200px;overflow-y:auto;box-shadow:-2px 2px 6px #bbb}body{display:flex;background-color:#0ff} ");

(function () {
	'use strict';

	var _monkeyWindow = /* @__PURE__ */ (() => window)();
	console.log(`hello wolrd`);
	console.log(_monkeyWindow.close());

})();