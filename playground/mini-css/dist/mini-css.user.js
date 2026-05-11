// ==UserScript==
// @name       mini-css
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     author_name
// @icon       https://vitejs.dev/logo.svg
// @match      https://songe.li/*
// @require    https://cdn.jsdelivr.net/npm/vue@3.5.32
// @resource   element-plus/dist/index.css         https://cdn.jsdelivr.net/npm/element-plus@2.13.7/dist/index.css
// @resource   element-plus/dist/index.css?inline  https://cdn.jsdelivr.net/npm/element-plus@2.13.7/dist/index.css
// @resource   normalize.css                       https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css
// @tag        tag1
// @tag        tag2
// @grant      GM_addStyle
// @grant      GM_getResourceText
// @grant      GM_getValue
// @grant      GM_registerMenuCommand
// @grant      GM_webRequest
// ==/UserScript==

(async function(vue) {
  'use strict';
	var s = new Set();
	var _css = async (t) => {
		if (s.has(t)) return;
		s.add(t);
		((c) => {
			if (typeof GM_addStyle === "function") GM_addStyle(c);
			else (document.head || document.documentElement).appendChild(document.createElement("style")).append(c);
		})(t);
	};
	_css(" *,:before,:after,::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-ring-offset-shadow:0 0 #0000;--un-ring-shadow:0 0 #0000;--un-shadow-inset: ;--un-shadow:0 0 #0000;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:#93c5fd80}.flex{display:flex}.dark .dark\\:bg-red\\:10{background-color:#f871711a}.test[data-v-0eae1295]{color:red}\n/*$vite$:1*/ ");
	var style2_default = ".style2{background-color:red}";
	var style3_default = ".style3{background-color:#00f}";
	var _GM = typeof GM != "undefined" ? GM : void 0;
	var _GM_addStyle = typeof GM_addStyle != "undefined" ? GM_addStyle : void 0;
	var _GM_getResourceText = typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0;
	var _GM_getValue = typeof GM_getValue != "undefined" ? GM_getValue : void 0;
	var _GM_registerMenuCommand = typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0;
	var _GM_webRequest = typeof GM_webRequest != "undefined" ? GM_webRequest : void 0;
	var cssLoader = (name) => _GM_addStyle(_GM_getResourceText(name));
	var rawLoader = (name) => _GM_getResourceText(name);
	var cache$2;
	var _$2 = () => cache$2 ?? (cache$2 = cssLoader("normalize.css"));
	var cache$1;
	var _$1 = () => cache$1 ?? (cache$1 = rawLoader("element-plus/dist/index.css?inline"));
	var cache;
	var _ = () => cache ?? (cache = cssLoader("element-plus/dist/index.css"));
	_css(".read-the-docs{color:#888;z-index:1050;background:#fff;padding:10px 20px 200px;position:fixed;top:60px;bottom:0;left:260px;right:0;overflow-y:auto;box-shadow:-2px 2px 6px #bbb}body{background-color:#0ff;display:flex}");
	var _plugin_vue_export_helper_default = (sfc, props) => {
		const target = sfc.__vccOpts || sfc;
		for (const [key, val] of props) target[key] = val;
		return target;
	};
	var _sfc_main = {};
	var _hoisted_1 = { class: "flex dark:bg-red:10" };
	function _sfc_render(_ctx, _cache) {
		const _component_el_button = (0, vue.resolveComponent)("el-button");
		return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, [
			(0, vue.createElementVNode)("div", _hoisted_1, "counter:" + (0, vue.toDisplayString)(_ctx.counter), 1),
			(0, vue.createElementVNode)("div", null, "doubleCounter:" + (0, vue.toDisplayString)(_ctx.doubleCounter), 1),
			(0, vue.createVNode)(_component_el_button, {
				type: "success",
				onClick: _cache[0] || (_cache[0] = ($event) => _ctx.main.counter++)
			}, {
				default: (0, vue.withCtx)(() => [..._cache[1] || (_cache[1] = [(0, vue.createTextVNode)("main.counter++", -1)])]),
				_: 1
			})
		], 64);
	}
	var Test_default = _plugin_vue_export_helper_default(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0eae1295"]]);
	var style5_default = "div{background-color:#00f}";
	var _style = (b, a = document.createElement("style")) => (a.append(b), a);
	var style5_css_default = _style(style5_default);
	console.log(`hello wolrd`);
	console.log(Test_default);
	console.log(Object.keys(_GM));
	_GM_registerMenuCommand("", (e) => {});
	_GM_getValue("key", String("default"));
	console.log(_GM_webRequest([], (...args) => {
		console.log(args);
	}));
	if (location.search.includes("test")) {
		await(_css(style2_default));
		_css(style3_default);
		_css(style3_default);
		_$2();
		const x = await(_$1());
		console.log(x);
	} else _();
	console.log(style5_css_default);
})(Vue);
