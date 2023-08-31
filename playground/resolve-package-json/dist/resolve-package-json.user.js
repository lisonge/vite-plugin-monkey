// ==UserScript==
// @name       resolve-package-json
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// @require    https://cdn.jsdelivr.net/npm/@formkit/vue@1.0.0-beta.11/dist/formkit-vue.js
// ==/UserScript==

(function (vue) {
	'use strict';

	console.log({ plugin: vue.plugin, defaultConfig: vue.defaultConfig });

})(FormKit);