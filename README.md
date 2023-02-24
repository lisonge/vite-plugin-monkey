# vite-plugin-monkey

<p>
  <a href="https://www.npmjs.com/package/vite-plugin-monkey"><img src="https://img.shields.io/npm/v/vite-plugin-monkey.svg" alt="npm package"></a>
  <a href="https://github.com/lisonge/vite-plugin-monkey/releases/"><img src="https://img.shields.io/node/v/vite-plugin-monkey.svg" alt="node compatibility"></a>
</p>

[README](README.md) | [中文文档](README_zh.md)

A vite plugin server and build your.user.js for userscript engine like [Tampermonkey](https://www.tampermonkey.net/) and [Violentmonkey](https://violentmonkey.github.io/), [Greasemonkey](https://www.greasespot.net/), [ScriptCat](https://docs.scriptcat.org/)

## Feature

- support Tampermonkey, Violentmonkey, Greasemonkey, ScriptCat, etc
- inject userscript comment to build bundle
- auto open \*.user.js in default browser when userscript change
- external cdn url inject to userscript @require
- external module inject to userscript @resource
- use GM_api by ESM import with type hints
- intelligently collect GM_api that is used and automatically configure userscript @grant comment
- support to generate the correct sourceMap mapping when build dist.user.js
- when vite preview, auto open browser install dist.user.js
- full typescript support and vite feature

## Quick Start

just like vite create

```shell
pnpm create monkey
# npm create monkey
# yarn create monkey
```

then you can choose the following template

| JavaScript                                                     | TypeSript                                                            |
| -------------------------------------------------------------- | -------------------------------------------------------------------- |
| [empty](/packages/create-monkey/template-empty) (only js)      | [empty-ts](/packages/create-monkey/template-empty-ts) (only ts)      |
| [vanilla](/packages/create-monkey/template-vanilla) (js + css) | [vanilla-ts](/packages/create-monkey/template-vanilla-ts) (ts + css) |
| [vue](/packages/create-monkey/template-vue)                    | [vue-ts](/packages/create-monkey/template-vue-ts)                    |
| [react](/packages/create-monkey/template-react)                | [react-ts](/packages/create-monkey/template-react-ts)                |
| [preact](/packages/create-monkey/template-preact)              | [preact-ts](/packages/create-monkey/template-preact-ts)              |
| [svelte](/packages/create-monkey/template-svelte)              | [svelte-ts](/packages/create-monkey/template-svelte-ts)              |
| [solid](/packages/create-monkey/template-solid)                | [solid-ts](/packages/create-monkey/template-solid-ts)                |

<details open>
  <summary>Sample: Initializing a Template</summary>

![vue-ts](https://user-images.githubusercontent.com/38517192/191197238-214abda1-f54f-4042-a046-2d7e6cf697a2.gif)

</details>

<details open>
  <summary>Sample: Hot Module Replacement</summary>

![hmr](https://user-images.githubusercontent.com/38517192/191197411-3d6f3795-e842-4cc1-a494-5d5f8425fd15.gif)

</details>

<details open>
  <summary>Sample: Build & Preview</summary>

![build&preview](https://user-images.githubusercontent.com/38517192/191197542-9c763af0-de2e-4a85-88c6-75a6d5924af9.gif)

</details>

## Installation

```shell
pnpm add -D vite-plugin-monkey
# npm i -D vite-plugin-monkey
# yarn add -D vite-plugin-monkey
```

## Config

<!-- template-start-MonkeyOption -->

[MonkeyOption](/packages/vite-plugin-monkey/src/node/types.ts#L117)

<details open>
  <summary>MonkeyOption Type</summary>

```ts
export type MonkeyOption = {
  /**
   * userscript entry file path
   */
  entry: string;
  userscript: MonkeyUserScript;
  format?: Format;

  /**
   * alias of vite-plugin-monkey/dist/client
   * @default '$'
   * @example
   * // vite-env.d.ts for type hint
   *
   * // if you use default value `$`
   * /// <reference types="vite-plugin-monkey/client" />
   *
   * // if you use other_alias
   * declare module other_alias {
   *   export * from 'vite-plugin-monkey/dist/client';
   * }
   */
  clientAlias?: string;
  server?: {
    /**
     * auto open install url in default browser when userscript comment change
     *
     * and set `viteConfig.server.open ??== monkeyConfig.server.open`
     * @default
     * process.platform == 'win32' || process.platform == 'darwin' // if platform is Win/Mac
     */
    open?: boolean;

    /**
     * name prefix, distinguish server.user.js and build.user.js in monkey extension install list, if you not want prefix, set false
     * @default 'server:'
     */
    prefix?: string | ((name: string) => string) | false;

    /**
     * mount GM_api to unsafeWindow, not recommend it, you should use GM_api by ESM import, or use [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
     * @default false
     * @example
     * // if set true, you can use `vite-plugin-monkey/global` for type hint
     * // vite-env.d.ts
     * /// <reference types="vite-plugin-monkey/global" />
     */
    mountGmApi?: boolean;
  };
  build?: {
    /**
     * build bundle userscript file name
     *
     * it should end with '.user.js'
     * @default (package.json.name??'monkey')+'.user.js'
     */
    fileName?: string;

    /**
     * build bundle userscript comment file name, this file is only include comment
     *
     * it can be used by userscript.updateURL, when checking for updates, just download this small file instead of downloading the entire script
     *
     * it should end with '.meta.js', if set false, will not generate this file
     *
     * if set true, will equal to fileName.replace(/\\.user\\.js$/,'.meta.js')
     *
     * @default false
     */
    metaFileName?: string | boolean | ((fileName: string) => string);

    /**
     * this config can be array or object, array=Object.entries(object)
     *
     * if value is string or function, it or its return value is exportVarName
     *
     * if value is Array, the first [item or its return value] is exportVarName, the items after it all are url that is [require url]
     *
     * if module is unimported, plugin will not add require url to userscript
     *
     * @example
     * { // map structure
     *  vue:'Vue',
     *  // if set this
     *  // you need manually set userscript.require = ['https://unpkg.com/vue@3.0.0/dist/vue.global.js'], when `vite build`
     *
     *  vuex:['Vuex', (version, name)=>`https://unpkg.com/${name}@${version}/dist/vuex.global.js`],
     *  // plugin will auto add this url to userscript.require
     *
     *  'prettier/parser-babel': [
     *    'prettierPlugins.babel',
     *    (version, name, importName) => {
     *      // name == `prettier`
     *      // importName == `prettier/parser-babel`
     *      const subpath = `${importName.split('/').at(-1)}.js`;
     *      return `https://cdn.jsdelivr.net/npm/${name}@${version}/${subpath}`;
     *    },
     *  ],
     *  // sometimes importName deffers from package name
     * }
     * @example
     * [ // array structure, this example come from [playground/ex-vue-demi](https://github.com/lisonge/vite-plugin-monkey/tree/main/playground/ex-vue-demi)
     *   [
     *     'vue',
     *     cdn
     *       .jsdelivr('Vue', 'dist/vue.global.prod.js')
     *       .concat('https://unpkg.com/vue-demi@latest/lib/index.iife.js')
     *       .concat(
     *         await util.fn2dataUrl(() => {
     *           window.Vue = Vue;
     *         }),
     *       ),
     *   ],
     *   ['pinia', cdn.jsdelivr('Pinia', 'dist/pinia.iife.prod.js')],
     *   [
     *     'element-plus',
     *     cdn.jsdelivr('ElementPlus', 'dist/index.full.min.js'),
     *   ],
     * ]
     */
    externalGlobals?: ExternalGlobals;

    /**
     * according to final code bundle, auto inject GM_* or GM.* to userscript comment grant
     *
     * tree shaking code, then if code.includes('GM_xxx'), add \@grant GM_xxx to userscript
     * @default true
     */
    autoGrant?: boolean;

    /**
     * if you want minify all, just set viteConfig.build.minify=true
     * @default true
     */
    minifyCss?: boolean;

    /**
     * @example
     * {  // resourceName default value is pkg.importName
     *   'element-plus/dist/index.css': pkg=>`https://unpkg.com/${pkg.name}@${pkg.version}/${pkg.resolveName}`,
     *   'element-plus/dist/index.css': {
     *     resourceName: pkg=>pkg.importName,
     *     resourceUrl: pkg=>`https://unpkg.com/${pkg.name}@${pkg.version}/${pkg.resolveName}`,
     *     loader: pkg=>{ // there are default loaders that support [css, json, the assets that vite support, ?url, ?raw] file/name suffix
     *        const css = GM_getResourceText(pkg.resourceName);
     *        GM_addStyle(css);
     *        return css;
     *     },
     *     nodeLoader: pkg=>{
     *        return [
     *          `export default (()=>{`,
     *          `const css = GM_getResourceText(${JSON.stringify(pkg.resourceName)});`,
     *          `GM_addStyle(css);`,
     *          `return css;`,
     *          `})();`
     *        ].join('');
     *     },
     *   },
     *   'element-plus/dist/index.css': [
     *      (version, name, importName, resolveName)=>importName,
     *      (version, name, importName, resolveName)=>`https://unpkg.com/${name}@${version}/${resolveName}`,
     *       // for compat externalGlobals cdn function, if (version/name/importName/resolveName) == '', plugin will use their own default values
     *   ],
     *   'element-plus/dist/index.css': cdn.jsdelivr(),
     * }
     */
    externalResource?: ExternalResource;

    /**
     * if you want to enable sourcemap, you need set `viteConfig.build.sourcemap='inline'`
     *
     * In addition, if `monkeyConfig.build.sourcemap && viteConfig.build.sourcemap===undefined`
     *
     * the plugin will also set `viteConfig.build.sourcemap='inline'`
     */
    sourcemap?: {
      /**
       * you must build and install userscript in advance, then open devtools -> source -> page, find this userscript
       *
       * It is the line number of `// ==UserScript==` -1, The offset of different userscript engines is different
       *
       * If you don't set it, devtools console may log map error code position
       *
       * About it, you can see [violentmonkey#1616](https://github.com/violentmonkey/violentmonkey/issues/1616) and [tampermonkey#1621](https://github.com/Tampermonkey/tampermonkey/issues/1621)
       *
       * ![image](https://user-images.githubusercontent.com/38517192/196080452-4733bec5-686c-4d63-90a8-9a8eb51d7e7c.png)
       *
       * @default
       * 0
       */
      offset?: number;
      /**
       * ![image](https://user-images.githubusercontent.com/38517192/196079942-835a0d25-e0bf-4373-aff8-73aba9b1d37c.png)
       * @default
       * `/${namespace}/${name}/`; // if name is string
       * `/${namespace}/${name['']}/`; // if name is object
       */
      sourceRoot?: string;
    };
  };
};
```

</details>

<!-- template-end-MonkeyOption -->

## CDN util for external

```ts
import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';
export default defineConfig({
  plugins: [
    monkey({
      build: {
        externalGlobals: {
          react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
        },
        externalResource: {
          'element-plus/dist/index.css': cdn.jsdelivr(),
        },
      },
    }),
  ],
});
```

there is the following cdn to use, full detail see [cdn.ts](/packages/vite-plugin-monkey/src/node/cdn.ts)

- [jsdelivr](https://www.jsdelivr.com/)
- [unpkg](https://unpkg.com/)
- [bytecdntp](https://cdn.bytedance.com/)
- [bootcdn](https://www.bootcdn.cn/all/)
- [baomitu](https://cdn.baomitu.com/)
- [staticfile](https://staticfile.org/)
- [cdnjs](https://cdnjs.com/libraries)
- [zhimg](https://unpkg.zhimg.com/)

if you want use other cdn, you can see [external-scripts](https://greasyfork.org/help/external-scripts)

## GM_api usage

### ESM usage

we can use GM_api by esm module

```ts
// main.ts
import { GM_cookie, unsafeWindow, monkeyWindow, GM_addElement } from '$';
// $ is the default alias of vite-plugin-monkey/dist/client
// if you want use 'others', set monkeyConfig.clientAlias='others'

// whatever it is serve or build mode, monkeyWindow is always the window of [UserScript Scope]
console.log(monkeyWindow);

GM_addElement(document.body, 'div', { innerHTML: 'hello' });

// whatever it is serve or build mode, unsafeWindow is always host window
if (unsafeWindow == window) {
  console.log('scope->host, host esm scope');
} else {
  console.log('scope->monkey, userscript scope');
}

GM_cookie.list({}, (cookies, error) => {
  if (error) {
    console.log(error);
  } else {
    const [cookie] = cookies;
    if (cookie) {
      console.log(cookie);
    }
  }
});
```

### Global variables usage

set `monkeyConfig.server.mountGmApi=true`

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      // ...
      server: { mountGmApi: true },
    }),
  ],
});
```

GM_api will mount to the property of `host window/globalThis`

```ts
// main.ts
console.log(GM_cookie == globalThis.GM_cookie);
console.log({ GM_cookie, unsafeWindow, monkeyWindow, GM_addElement });
```

### Auto import usage

use [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import monkey, { util } from 'vite-plugin-monkey';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    monkey({
      // ...
    }),
    AutoImport({
      imports: [util.unimportPreset],
    }),
  ],
});
```

```ts
// main.ts
// auto import example
console.log({ GM_cookie, unsafeWindow, monkeyWindow, GM_addElement });
```

## Example

test examples, see [/playground](/playground)

and preact/react/svelte/vanilla/vue/solid examples, see [create-monkey](/packages/create-monkey)

## Some note

### Work with other plugins

plugin will rebuild your code by [generateBundle](https://rollupjs.org/plugin-development/#generatebundle) hook

please try to ensure that the order of the plugin is **the last one**

### Dynamic Import

when `vite build`, plugin will build your code to iife formats

and set `inlineDynamicImports=true`, the dynamic import in code will become static import, the `side effects` are also effective immediately

```ts
// main.ts
if (xxx) {
  import('vue');
}
```

will become

```ts
import * as module_0 from 'vue';
if (xxx) {
  Promise.resolve(module_0);
}
```

### Top Level await

when `vite build`, it is unavailable

### [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

in `vite serve` mode, the code entry is added as script to target host document.head, code need work between two origins

#### For http header csp

you can use [Tampermonkey](https://www.tampermonkey.net/) then open `extension://iikmkjmpaadaobahmlepeloendndfphd/options.html#nav=settings`

at `Security`, set `Modify existing content security policy (CSP) headers` to `Remove entirely (possibly unsecure)`

full detail see [issues/1](https://github.com/lisonge/vite-plugin-monkey/issues/1)

and if you use `Violentmonkey`/`Greasemonkey`, you can solve it in the following ways

- chrome - [Disable Content-Security-Policy](https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden/)
- edge - [Disable Content-Security-Policy](https://microsoftedge.microsoft.com/addons/detail/disable-contentsecurity/ecmfamimnofkleckfamjbphegacljmbp?hl=zh-CN)
- firefox - disable `security.csp.enable` in the `about:config` menu

#### For html csp

- MITM modify html by <https://wproxy.org/whistle/>

- if csp allow `*.xx.com`, you can set `viteConfig.server.host=localhost.xx.com` and add `127.0.0.1 localhost.xx.com` to your hosts file, if your need fake https ca, you can use [mkcert](https://github.com/FiloSottile/mkcert)

- by chrome-remote-interface [issues/1#issuecomment-1236060681](https://github.com/lisonge/vite-plugin-monkey/issues/1#issuecomment-1236060681)

### Mixed IIFE and UMD at @require

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
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js').concat(
            await util.fn2dataUrl(() => {
              // @ts-ignore
              window.Vue = Vue; // work with element-plus
            }),
          ),
          'element-plus': cdn.jsdelivr('ElementPlus', 'dist/index.full.min.js'),
        },
      },
    }),
  ],
}));
```

### Polyfill

because of [vite/issues/1639](https://github.com/vitejs/vite/issues/1639), now you can not use `@vitejs/plugin-legacy`

the following is a feasible solution by @require cdn

```ts
import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      // ...
      userscript: {
        require: [
          // polyfill all
          'https://cdn.jsdelivr.net/npm/core-js-bundle@latest/minified.js',
          // or use polyfill.io
          // https://polyfill.io/v3/polyfill.min.js
        ],
      },
    }),
  ],
});
```
