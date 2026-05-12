// ==UserScript==
// @name         external-source
// @namespace    https://github.com/lisonge
// @version      1.0.0
// @description  default_description
// @icon         https://vitejs.dev/logo.svg
// @match        https://songe.li/
// @require      https://cdn.jsdelivr.net/npm/vue@3.5.32/dist/vue.global.prod.js
// @require      data:application/javascript,window.Vue%3DVue
// @require      https://cdn.jsdelivr.net/npm/element-plus@2.13.7/dist/index.full.min.js
// @resource     element-plus/dist/index.css      https://cdn.jsdelivr.net/npm/element-plus@2.13.7/dist/index.css
// @resource     element-plus/dist/index.css?raw  https://cdn.jsdelivr.net/npm/element-plus@2.13.7/dist/index.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        unsafeWindow
// ==/UserScript==

(function(vue, element_plus) {
	"use strict";
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	vue = __toESM(vue);
	var _GM_addStyle = typeof GM_addStyle != "undefined" ? GM_addStyle : void 0;
	var _GM_getResourceText = typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0;
	var _unsafeWindow = typeof unsafeWindow != "undefined" ? unsafeWindow : void 0;
	var cssLoader = (name) => _GM_addStyle(_GM_getResourceText(name));
	var rawLoader = (name) => _GM_getResourceText(name);
	cssLoader("element-plus/dist/index.css");
	var package_default = {
		name: "element-plus",
		version: "2.13.7",
		description: "A Component Library for Vue 3",
		keywords: [
			"element-plus",
			"element",
			"component library",
			"ui framework",
			"ui",
			"vue"
		],
		homepage: "https://element-plus.org/",
		bugs: { "url": "https://github.com/element-plus/element-plus/issues" },
		license: "MIT",
		main: "lib/index.js",
		module: "es/index.mjs",
		types: "es/index.d.ts",
		exports: {
			".": {
				"types": "./es/index.d.ts",
				"import": "./es/index.mjs",
				"require": "./lib/index.js"
			},
			"./global": { "types": "./global.d.ts" },
			"./es": {
				"types": "./es/index.d.ts",
				"import": "./es/index.mjs"
			},
			"./lib": {
				"types": "./lib/index.d.ts",
				"require": "./lib/index.js"
			},
			"./es/*.mjs": {
				"types": "./es/*.d.ts",
				"import": "./es/*.mjs"
			},
			"./es/*": {
				"types": ["./es/*.d.ts", "./es/*/index.d.ts"],
				"import": "./es/*.mjs"
			},
			"./lib/*.js": {
				"types": "./lib/*.d.ts",
				"require": "./lib/*.js"
			},
			"./lib/*": {
				"types": ["./lib/*.d.ts", "./lib/*/index.d.ts"],
				"require": "./lib/*.js"
			},
			"./*": "./*"
		},
		unpkg: "dist/index.full.js",
		jsdelivr: "dist/index.full.js",
		repository: {
			"type": "git",
			"url": "git+https://github.com/element-plus/element-plus.git"
		},
		publishConfig: { "access": "public" },
		style: "dist/index.css",
		sideEffects: [
			"dist/*",
			"theme-chalk/**/*.css",
			"theme-chalk/src/**/*.scss",
			"es/components/*/style/*",
			"lib/components/*/style/*"
		],
		peerDependencies: { "vue": "^3.3.0" },
		dependencies: {
			"@ctrl/tinycolor": "^4.2.0",
			"@element-plus/icons-vue": "^2.3.2",
			"@floating-ui/dom": "^1.0.1",
			"@popperjs/core": "npm:@sxzz/popperjs-es@^2.11.7",
			"@types/lodash": "^4.17.20",
			"@types/lodash-es": "^4.17.12",
			"@vueuse/core": "12.0.0",
			"async-validator": "^4.2.5",
			"dayjs": "^1.11.19",
			"lodash": "^4.17.23",
			"lodash-es": "^4.17.23",
			"lodash-unified": "^1.0.3",
			"memoize-one": "^6.0.0",
			"normalize-wheel-es": "^1.2.0",
			"vue-component-type-helpers": "^3.2.4"
		},
		devDependencies: {
			"@types/node": "*",
			"vue-router": "^4.0.16"
		},
		vetur: {
			"tags": "tags.json",
			"attributes": "attributes.json"
		},
		"web-types": "web-types.json",
		browserslist: [
			"> 1%",
			"not ie 11",
			"not op_mini all"
		],
		gitHead: "9d58a05124b5c4d4859a9d5bae05309062b73688"
	};
	var _ = rawLoader("element-plus/dist/index.css?raw");
	console.log({
		Vue: vue,
		ElDatePicker: element_plus.ElDatePicker,
		ElButton: element_plus.ElButton,
		ElementPlusPkg: package_default,
		unsafeWindow: _unsafeWindow,
		cssRaw: _
	});
})(Vue, ElementPlus);
