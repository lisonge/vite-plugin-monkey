// ==UserScript==
// @name         ex-vue-demi
// @namespace    https://github.com/lisonge
// @version      1.0.0
// @description  default_description
// @icon         https://vitejs.dev/logo.svg
// @match        https://songe.li/
// @require      https://cdn.jsdelivr.net/npm/vue@3.5.32/dist/vue.global.prod.js
// @require      https://cdn.jsdelivr.net/npm/vue-demi@latest/lib/index.iife.js
// @require      data:application/javascript,%3Bwindow.Vue%3DVue%3B
// @require      https://cdn.jsdelivr.net/npm/pinia@3.0.4/dist/pinia.iife.prod.js
// @require      https://cdn.jsdelivr.net/npm/element-plus@2.13.7/dist/index.full.min.js
// @resource     element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.13.7/dist/index.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function(vue, pinia, element_plus) {
  'use strict';
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
	element_plus = __toESM(element_plus);
	var _GM_addStyle = typeof GM_addStyle != "undefined" ? GM_addStyle : void 0;
	var _GM_getResourceText = typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0;
	var cssLoader = (name) => _GM_addStyle(_GM_getResourceText(name));
	cssLoader("element-plus/dist/index.css");
	var useMainStore = (0, pinia.defineStore)("main", {
		state: () => ({
			counter: 0,
			name: "Eduardo"
		}),
		getters: {
			doubleCounter: (state) => state.counter * 2,
			doubleCounterPlusOne() {
				return this.doubleCounter + 1;
			}
		},
		actions: { reset() {
			this.counter = 0;
		} }
	});
	var App_default = (0, vue.defineComponent)({
		__name: "App",
		setup(__props) {
			const main = useMainStore();
			const { counter, doubleCounter } = (0, pinia.storeToRefs)(main);
			return (_ctx, _cache) => {
				const _component_el_button = (0, vue.resolveComponent)("el-button");
				return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, [
					(0, vue.createElementVNode)("div", null, "counter:" + (0, vue.toDisplayString)((0, vue.unref)(counter)), 1),
					(0, vue.createElementVNode)("div", null, "doubleCounter:" + (0, vue.toDisplayString)((0, vue.unref)(doubleCounter)), 1),
					(0, vue.createVNode)(_component_el_button, {
						type: "success",
						onClick: _cache[0] || (_cache[0] = ($event) => (0, vue.unref)(main).counter++)
					}, {
						default: (0, vue.withCtx)(() => [..._cache[1] || (_cache[1] = [(0, vue.createTextVNode)("main.counter++", -1)])]),
						_: 1
					})
				], 64);
			};
		}
	});
	var pinia$1 = (0, pinia.createPinia)();
	var app = (0, vue.createApp)(App_default);
	app.use(element_plus.default);
	app.use(pinia$1);
	app.mount((() => {
		const div = document.createElement("div");
		document.body.append(div);
		return div;
	})());
})(Vue, Pinia, ElementPlus);
