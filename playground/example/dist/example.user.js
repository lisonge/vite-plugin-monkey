// ==UserScript==
// @name               example
// @name:ja            hentai
// @name:zh            测试_
// @namespace          https://github.com/lisonge
// @version            1.0.1
// @author             lisonge
// @description        default description zh
// @description:zh     描述
// @description:en     description
// @description:ja     説明z
// @description:zh-CN  描述
// @license            MIT
// @icon               https://vitejs.dev/logo.svg
// @homepage           https://github.com/lisonge/vite-plugin-monkey#readme
// @homepageURL        https://github.com/lisonge/vite-plugin-monkey#readme
// @source             https://github.com/lisonge/vite-plugin-monkey.git
// @supportURL         https://github.com/lisonge/vite-plugin-monkey/issues
// @include            /^https:\/\/i\.songe\.li\/.*/
// @match              https://songe.li/
// @require            https://cdn.jsdelivr.net/npm/prettier@3.8.2/standalone.js
// @require            https://cdn.jsdelivr.net/npm/prettier@3.8.2/babel.js
// @resource           element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.13.7/dist/index.css
// @grant              GM_addElement
// @grant              GM_addStyle
// @grant              GM_cookie
// @grant              GM_getResourceText
// @grant              unsafeWindow
// ==/UserScript==

(async function(prettier, prettier_plugins_babel) {
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
	prettier = __toESM(prettier);
	prettier_plugins_babel = __toESM(prettier_plugins_babel);
	var s = new Set();
	var _css = async (t) => {
		if (s.has(t)) return;
		s.add(t);
		((c) => {
			if (typeof GM_addStyle === "function") GM_addStyle(c);
			else (document.head || document.documentElement).appendChild(document.createElement("style")).append(c);
		})(t);
	};
	_css(":root{--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light dark;color:#ffffffde;font-synthesis:none;text-rendering:optimizelegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%;background-color:#242424;font-family:Inter,Avenir,Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:24px}@media (prefers-color-scheme:dark){:root{--lightningcss-light: ;--lightningcss-dark:initial}}a{color:#646cff;-webkit-text-decoration:inherit;text-decoration:inherit;font-weight:500}a:hover{color:#535bf2}body{place-items:center;min-width:320px;min-height:100vh;margin:0;display:flex}h1{font-size:3.2em;line-height:1.1}button{cursor:pointer;background-color:#1a1a1a;border:1px solid #0000;border-radius:8px;padding:.6em 1.2em;font-family:inherit;font-size:1em;font-weight:500;transition:border-color .25s}button:hover{border-color:#646cff}button:focus,button:focus-visible{outline:4px auto -webkit-focus-ring-color}.card{padding:2em}#app{text-align:center;max-width:1280px;margin:0 auto;padding:2rem}@media (prefers-color-scheme:light){:root{color:#213547;background-color:#fff}a:hover{color:#747bff}button{background-color:#f9f9f9}}");
	var _GM_addElement = typeof GM_addElement != "undefined" ? GM_addElement : void 0;
	var _GM_addStyle = typeof GM_addStyle != "undefined" ? GM_addStyle : void 0;
	var _GM_cookie = typeof GM_cookie != "undefined" ? GM_cookie : void 0;
	var _GM_getResourceText = typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0;
	var _unsafeWindow = typeof unsafeWindow != "undefined" ? unsafeWindow : void 0;
	var _monkeyWindow = window;
	var cssLoader = (name) => _GM_addStyle(_GM_getResourceText(name));
	cssLoader("element-plus/dist/index.css");
	var plugins = [prettier_plugins_babel.default];
	var lang2parser = {
		js: "babel",
		jsx: "babel",
		ts: "babel-ts",
		tsx: "babel-ts",
		json: "json",
		json5: "json5"
	};
	Object.assign(lang2parser, { java: "java" });
	var formatCode = async (code, lang) => {
		if (lang2parser[lang]) try {
			return prettier.default.format(code, {
				parser: lang2parser[lang],
				plugins
			});
		} catch {}
		return code;
	};
	console.log("document.readyState", document.readyState);
	console.log(_monkeyWindow);
	_GM_addElement && _GM_addElement("div", { innerHTML: "hello" });
	if (_unsafeWindow == window) console.log("scope->host");
	else console.log("scope->monkey");
	_GM_cookie?.list({}, (cookies, error) => {
		if (error) console.log(error);
		else {
			const [cookie] = cookies;
			if (cookie) console.log(cookie);
		}
	});
	console.log("format tsx code");
	console.log(await(formatCode(`const App=()=>{return(<div class={styles.App}>
<header class={styles.header}>
<img src={logo} class={styles.logo} alt="logo" />
<p>
Edit <code>src/App.tsx</code> and save to reload.
</p>
<a
class={styles.link}
href="https://github.com/solidjs/solid"
target="_blank"
rel="noopener noreferrer"
>
Learn Solid
</a>
</header>
</div>
);
};`, "tsx")));
	var css = document.createElement("style");
	css.append("body { background-color: red; }");
	document.head.appendChild(css);
})(prettier, prettierPlugins.babel);
