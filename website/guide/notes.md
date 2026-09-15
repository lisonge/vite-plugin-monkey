# Notes {#notes}

## Work with other plugins {#work-with-other-plugins}

plugin will rebuild your code by [generateBundle](https://rollupjs.org/plugin-development/#generatebundle) hook

please ensure that the order of the plugin is **the last one**

## [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) {#csp}

in `vite serve` mode, the code entry is added as script to target host document.head, code need work between two origins

but the browser will prevent the execution of this script according to the CSP strategy

now just use browser extension [Disable-CSP](https://github.com/lisonge/Disable-CSP)

## Local Network Access {#local-network-access}

Chrome 142 introduced the Local Network Access permission. In `vite serve` mode, the target page loads development scripts from a local address such as `127.0.0.1`, so the browser may request permission or block loading.

On the target page where your userscript runs, click the site information icon to the left of the address bar, open **Site settings**, set **Local network access** to **Allow**, and reload the target page.

This permission is separate from CSP and CORS. Even with Disable-CSP installed, you still need to grant the target site local network access. Changing the development server's CORS response headers cannot replace this permission.

Permission requests are only available in secure contexts. Public HTTP pages cannot request this permission. If the target site supports HTTPS, use its HTTPS page for development.

See the [Chrome documentation](https://developer.chrome.com/blog/local-network-access) and [issue #263](https://github.com/lisonge/vite-plugin-monkey/issues/263) for details.

## Mixed IIFE and UMD at @require {#mixed-iife-and-umd-at-require}

the variable declared by `var` from iife-cdn will not become the property of window at monkeyWindow scope, because monkeyWindow scope is not global scope

so if an umd lib is dependent on an iife lib, such as `element-plus` is dependent on `vue`, `element-plus` cdn will not work

detail see [issues/5](https://github.com/lisonge/vite-plugin-monkey/issues/5) or [greasyfork#1084](https://github.com/JasonBarnabe/greasyfork/issues/1084)

the solution is that we append a dataUrl script that will set iife-variable as the property of window after iife-cdn

```ts
import { defineConfig } from 'vite';
import monkey, { cdn, util } from 'vite-plugin-monkey';

export default defineConfig(async ({ command, mode }) => ({
  plugins: [
    monkey({
      // ...
      build: {
        externalGlobals: {
          vue: cdn
            .jsdelivr('Vue', 'dist/vue.global.prod.js')
            .concat(util.dataUrl(';window.Vue=Vue;')),
          'element-plus': cdn.jsdelivr('ElementPlus', 'dist/index.full.min.js'),
        },
      },
    }),
  ],
}));
```

## Polyfill {#polyfill}

when plugin works with vite legacy, it is necessary to set `renderLegacyChunks=false`

```ts
// vite.config.ts
import legacy from '@vitejs/plugin-legacy';
import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    legacy({
      renderLegacyChunks: false,
      modernPolyfills: true,
    }),
    monkey({
      entry: './src/main.ts',
    }),
  ],
});
```
