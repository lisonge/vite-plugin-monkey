# Overview {#overview}

<p>
  <a href="https://www.npmjs.com/package/vite-plugin-monkey"><img src="https://img.shields.io/npm/v/vite-plugin-monkey.svg" alt="npm package"></a>
  <a href="https://github.com/lisonge/vite-plugin-monkey/releases/"><img src="https://img.shields.io/node/v/vite-plugin-monkey.svg" alt="node compatibility"></a>
</p>

A vite plugin server and build your.user.js for userscript engine like [Tampermonkey](https://www.tampermonkey.net/) and [Violentmonkey](https://violentmonkey.github.io/), [Greasemonkey](https://www.greasespot.net/), [ScriptCat](https://docs.scriptcat.org/)

## Feature {#feature}

- support Tampermonkey, Violentmonkey, Greasemonkey, ScriptCat, etc
- inject userscript comment to build bundle
- provide a development installation page; use Vite `server.open` to open it automatically
- external cdn url inject to userscript @require
- external module inject to userscript @resource
- use GM_api by ESM import with type hints
- intelligently collect GM_api that is used and automatically configure userscript @grant comment
- support `top level await` and `dynamic import` in single file
- provide a built-userscript installation page through Vite preview
- full typescript support and vite feature
