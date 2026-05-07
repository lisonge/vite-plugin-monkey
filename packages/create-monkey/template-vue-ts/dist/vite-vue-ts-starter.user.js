// ==UserScript==
// @name       vite-vue-ts-starter
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// @require    https://cdn.jsdelivr.net/npm/vue@3.5.34/dist/vue.global.prod.js
// @grant      GM_addStyle
// ==/UserScript==

(function(vue) {
	var s = new Set();
	var _css = async (t) => {
		if (s.has(t)) return;
		s.add(t);
		((c) => {
			if (typeof GM_addStyle === "function") GM_addStyle(c);
			else (document.head || document.documentElement).appendChild(document.createElement("style")).append(c);
		})(t);
	};
	_css(" .read-the-docs[data-v-79349b4c]{color:#888}.logo[data-v-183b1330]{will-change:filter;height:6em;padding:1.5em;transition:filter .3s}.logo[data-v-183b1330]:hover{filter:drop-shadow(0 0 2em #646cffaa)}.logo.vue[data-v-183b1330]:hover{filter:drop-shadow(0 0 2em #42b883aa)}\n/*$vite$:1*/ ");
	_css(":root{--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light dark;color:#ffffffde;font-synthesis:none;text-rendering:optimizelegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%;background-color:#242424;font-family:Inter,Avenir,Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:24px}@media (prefers-color-scheme:dark){:root{--lightningcss-light: ;--lightningcss-dark:initial}}a{color:#646cff;-webkit-text-decoration:inherit;text-decoration:inherit;font-weight:500}a:hover{color:#535bf2}body{place-items:center;min-width:320px;min-height:100vh;margin:0;display:flex}h1{font-size:3.2em;line-height:1.1}button{cursor:pointer;background-color:#1a1a1a;border:1px solid #0000;border-radius:8px;padding:.6em 1.2em;font-family:inherit;font-size:1em;font-weight:500;transition:border-color .25s}button:hover{border-color:#646cff}button:focus,button:focus-visible{outline:4px auto -webkit-focus-ring-color}.card{padding:2em}#app{text-align:center;max-width:1280px;margin:0 auto;padding:2rem}@media (prefers-color-scheme:light){:root{color:#213547;background-color:#fff}a:hover{color:#747bff}button{background-color:#f9f9f9}}");
	var _hoisted_1$1 = { class: "card" };
	var HelloWorld_vue_vue_type_script_setup_true_lang_default = (0, vue.defineComponent)({
		__name: "HelloWorld",
		props: { msg: {} },
		setup(__props) {
			const count = (0, vue.ref)(0);
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, [
					(0, vue.createElementVNode)("h1", null, (0, vue.toDisplayString)(__props.msg), 1),
					(0, vue.createElementVNode)("div", _hoisted_1$1, [(0, vue.createElementVNode)("button", {
						type: "button",
						onClick: _cache[0] || (_cache[0] = ($event) => count.value++)
					}, "count is " + (0, vue.toDisplayString)(count.value), 1), _cache[1] || (_cache[1] = (0, vue.createElementVNode)("p", null, [
						(0, vue.createTextVNode)(" Edit "),
						(0, vue.createElementVNode)("code", null, "components/HelloWorld.vue"),
						(0, vue.createTextVNode)(" to test HMR ")
					], -1))]),
					_cache[2] || (_cache[2] = (0, vue.createElementVNode)("p", null, [
						(0, vue.createTextVNode)(" Check out "),
						(0, vue.createElementVNode)("a", {
							href: "https://vuejs.org/guide/quick-start.html#local",
							target: "_blank"
						}, "create-vue"),
						(0, vue.createTextVNode)(", the official Vue + Vite starter ")
					], -1)),
					_cache[3] || (_cache[3] = (0, vue.createElementVNode)("p", null, [
						(0, vue.createTextVNode)(" Install "),
						(0, vue.createElementVNode)("a", {
							href: "https://github.com/johnsoncodehk/volar",
							target: "_blank"
						}, "Volar"),
						(0, vue.createTextVNode)(" in your IDE for a better DX ")
					], -1)),
					_cache[4] || (_cache[4] = (0, vue.createElementVNode)("p", { class: "read-the-docs" }, "Click on the Vite and Vue logos to learn more", -1))
				], 64);
			};
		}
	});
	var _plugin_vue_export_helper_default = (sfc, props) => {
		const target = sfc.__vccOpts || sfc;
		for (const [key, val] of props) target[key] = val;
		return target;
	};
	var HelloWorld_default = _plugin_vue_export_helper_default(HelloWorld_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-79349b4c"]]);
	var vite_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='31.88'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20257'%3e%3cdefs%3e%3clinearGradient%20id='IconifyId1813088fe1fbc01fb466'%20x1='-.828%25'%20x2='57.636%25'%20y1='7.652%25'%20y2='78.411%25'%3e%3cstop%20offset='0%25'%20stop-color='%2341D1FF'%3e%3c/stop%3e%3cstop%20offset='100%25'%20stop-color='%23BD34FE'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient%20id='IconifyId1813088fe1fbc01fb467'%20x1='43.376%25'%20x2='50.316%25'%20y1='2.242%25'%20y2='89.03%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFEA83'%3e%3c/stop%3e%3cstop%20offset='8.333%25'%20stop-color='%23FFDD35'%3e%3c/stop%3e%3cstop%20offset='100%25'%20stop-color='%23FFA800'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23IconifyId1813088fe1fbc01fb466)'%20d='M255.153%2037.938L134.897%20252.976c-2.483%204.44-8.862%204.466-11.382.048L.875%2037.958c-2.746-4.814%201.371-10.646%206.827-9.67l120.385%2021.517a6.537%206.537%200%200%200%202.322-.004l117.867-21.483c5.438-.991%209.574%204.796%206.877%209.62Z'%3e%3c/path%3e%3cpath%20fill='url(%23IconifyId1813088fe1fbc01fb467)'%20d='M185.432.063L96.44%2017.501a3.268%203.268%200%200%200-2.634%203.014l-5.474%2092.456a3.268%203.268%200%200%200%203.997%203.378l24.777-5.718c2.318-.535%204.413%201.507%203.936%203.838l-7.361%2036.047c-.495%202.426%201.782%204.5%204.151%203.78l15.304-4.649c2.372-.72%204.652%201.36%204.15%203.788l-11.698%2056.621c-.732%203.542%203.979%205.473%205.943%202.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505%204.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z'%3e%3c/path%3e%3c/svg%3e";
	var vue_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='37.07'%20height='36'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20198'%3e%3cpath%20fill='%2341B883'%20d='M204.8%200H256L128%20220.8L0%200h97.92L128%2051.2L157.44%200h47.36Z'%3e%3c/path%3e%3cpath%20fill='%2341B883'%20d='m0%200l128%20220.8L256%200h-51.2L128%20132.48L50.56%200H0Z'%3e%3c/path%3e%3cpath%20fill='%2335495E'%20d='M50.56%200L128%20133.12L204.8%200h-47.36L128%2051.2L97.92%200H50.56Z'%3e%3c/path%3e%3c/svg%3e";
	var _hoisted_1 = {
		href: "https://vite.dev",
		target: "_blank"
	};
	var _hoisted_2 = ["src"];
	var _hoisted_3 = {
		href: "https://vuejs.org/",
		target: "_blank"
	};
	var _hoisted_4 = ["src"];
	(0, vue.createApp)(_plugin_vue_export_helper_default((0, vue.defineComponent)({
		__name: "App",
		setup(__props) {
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, [(0, vue.createElementVNode)("div", null, [(0, vue.createElementVNode)("a", _hoisted_1, [(0, vue.createElementVNode)("img", {
					src: (0, vue.unref)(vite_default),
					class: "logo",
					alt: "Vite logo"
				}, null, 8, _hoisted_2)]), (0, vue.createElementVNode)("a", _hoisted_3, [(0, vue.createElementVNode)("img", {
					src: (0, vue.unref)(vue_default),
					class: "logo vue",
					alt: "Vue logo"
				}, null, 8, _hoisted_4)])]), (0, vue.createVNode)(HelloWorld_default, { msg: "Vite + Vue" })], 64);
			};
		}
	}), [["__scopeId", "data-v-183b1330"]])).mount((() => {
		const app = document.createElement("div");
		document.body.append(app);
		return app;
	})());
})(Vue);
