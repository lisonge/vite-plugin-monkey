// ==UserScript==
// @name         dynamic-import
// @namespace    https://github.com/lisonge
// @version      1.0.0
// @description  default_description
// @icon         https://vitejs.dev/logo.svg
// @match        https://songe.li/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.5.32/dist/vue.global.prod.js
// @require      data:application/javascript,%3Bwindow.Vue%3DVue%3B
// @require      https://cdn.jsdelivr.net/npm/element-plus@2.13.7/dist/index.full.min.js
// @require      https://cdn.jsdelivr.net/npm/systemjs@6.15.1/dist/system.min.js
// @require      https://cdn.jsdelivr.net/npm/systemjs@6.15.1/dist/extras/named-register.min.js
// @require      data:application/javascript,%3B(typeof%20System!%3D'undefined')%26%26(System%3Dnew%20System.constructor())%3B
// ==/UserScript==

System.addImportMap({ imports: {
	"vue": "user:vue",
	"element-plus": "user:element-plus"
} });
System.set("user:vue", (() => {
	const _ = Vue;
	"default" in _ || (_.default = _);
	return _;
})());
System.set("user:element-plus", (() => {
	const _ = ElementPlus;
	"default" in _ || (_.default = _);
	return _;
})());
System.register("./___monkey.entry.js", [], (function(exports, module) {
	"use strict";
	return { execute: (async function() {
		var Vue = await module.import("vue");
		var ElementPlus = await module.import("element-plus");
		console.log({
			Vue,
			ElementPlus,
			default: ElementPlus.default
		});
		if (location.search.includes("b")) await module.import("./b-B8cWZ8UH-BON5HD3J.js");
	}) };
}));
System.register("./b-B8cWZ8UH-BON5HD3J.js", [], (function() {
	"use strict";
	return { execute: (function() {
		fetch("/");
	}) };
}));
System.import("./___monkey.entry.js", "./");
