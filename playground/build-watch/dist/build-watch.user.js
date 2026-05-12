// ==UserScript==
// @name       build-watch
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// @resource   element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.13.7/dist/index.css
// @grant      GM_addStyle
// @grant      GM_deleteValue
// @grant      GM_getResourceText
// @grant      window.onurlchange
// ==/UserScript==

(async function() {
	"use strict";
	var _GM_addStyle = typeof GM_addStyle != "undefined" ? GM_addStyle : void 0;
	var _GM_deleteValue = typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0;
	var _GM_getResourceText = typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0;
	var _monkeyWindow = window;
	var cssLoader = (name) => _GM_addStyle(_GM_getResourceText(name));
	cssLoader("element-plus/dist/index.css");
	_GM_deleteValue("key");
	await(fetch(`/`));
	await(fetch(`/`));
	console.log(_monkeyWindow.onurlchange);
	await(async () => {
		for await (const x of [
			1,
			2,
			3,
			4,
			5
		]) await(fetch(`/` + x));
	})();
	var fn = async () => {
		const r = await fetch(`/`);
		console.log(r);
	};
	await(fn());
})();
