# vite-plugin-monkey

<p>
  <a href="https://www.npmjs.com/package/vite-plugin-monkey"><img src="https://img.shields.io/npm/v/vite-plugin-monkey.svg" alt="npm package"></a>
  <a href="https://github.com/lisonge/vite-plugin-monkey/releases/"><img src="https://img.shields.io/node/v/vite-plugin-monkey.svg" alt="node compatibility"></a>
</p>

[README](README.md) | [中文文档](README_zh.md)

A vite plugin server and build your.user.js for userscript engine like [Tampermonkey](https://www.tampermonkey.net/) and [Violentmonkey](https://violentmonkey.github.io/) and [Greasemonkey](https://www.greasespot.net/)

## feature

- support Tampermonkey and Violentmonkey and Greasemonkey
- inject userscript comment to build bundle
- auto open \*.user.js in default browser when userscript change
- external cdn url inject to userscript @require
- external module inject to userscript @resource
- use GM_api by ESM import with type hints
- intelligently collect GM_api that is used and automatically configure userscript @grant comment
- support to generate the correct sourceMap mapping when build dist.user.js
- when vite preview, auto open browser install dist.user.js
- full typescript support and vite feature

## quick usage (recommend)

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

## installation

```shell
pnpm add -D vite-plugin-monkey
# npm i -D vite-plugin-monkey
# yarn add -D vite-plugin-monkey
```

## config

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
   * // vite.config.ts, plugin will auto modify config
   * resolve: {
   *   alias: {
   *     [clientAlias]: 'vite-plugin-monkey/dist/client',
   *   },
   * }
   * @example
   * // vite-env.d.ts, you must manual modify vite-env.d.ts file for type hint
   * declare module clientAlias {
   *   export * from 'vite-plugin-monkey/dist/client';
   * }
   */
  clientAlias?: string;
  server?: {
    /**
     * auto open *.user.js in default browser when userscript comment change or vite server first start.
     * if you don't want to open when vite server first start, just want to open when userscript comment change, you should set viteConfig.server.open=false
     * @default
     * process.platform == 'win32' || process.platform == 'darwin'
     */
    open?: boolean;

    /**
     * name prefix, distinguish server.user.js and build.user.js in monkey extension install list, if you not want prefix, set false
     * @default 'server:'
     */
    prefix?: string | ((name: string) => string) | false;

    /**
     * mount GM_api to unsafeWindow, not recommend it, you should use GM_api by ESM import
     * @default false
     * @example
     * // if set true, you can export all from vite-plugin-monkey/dist/client to global for type hint
     * // vite-env.d.ts
     * type MonkeyWindow = import('vite-plugin-monkey/dist/client').MonkeyWindow;
     * declare const unsafeWindow: MonkeyWindow['unsafeWindow'];
     * declare const GM: MonkeyWindow['GM'];
     * declare const GM_addStyle: MonkeyWindow['GM_addStyle'];
     * declare const GM_addElement: MonkeyWindow['GM_addElement'];
     * declare const GM_deleteValue: MonkeyWindow['GM_deleteValue'];
     * declare const GM_listValues: MonkeyWindow['GM_listValues'];
     * declare const GM_addValueChangeListener: MonkeyWindow['GM_addValueChangeListener'];
     * declare const GM_removeValueChangeListener: MonkeyWindow['GM_removeValueChangeListener'];
     * declare const GM_setValue: MonkeyWindow['GM_setValue'];
     * declare const GM_getValue: MonkeyWindow['GM_getValue'];
     * declare const GM_log: MonkeyWindow['GM_log'];
     * declare const GM_getResourceText: MonkeyWindow['GM_getResourceText'];
     * declare const GM_getResourceURL: MonkeyWindow['GM_getResourceURL'];
     * declare const GM_registerMenuCommand: MonkeyWindow['GM_registerMenuCommand'];
     * declare const GM_unregisterMenuCommand: MonkeyWindow['GM_unregisterMenuCommand'];
     * declare const GM_openInTab: MonkeyWindow['GM_openInTab'];
     * declare const GM_xmlhttpRequest: MonkeyWindow['GM_xmlhttpRequest'];
     * declare const GM_download: MonkeyWindow['GM_download'];
     * declare const GM_getTab: MonkeyWindow['GM_getTab'];
     * declare const GM_saveTab: MonkeyWindow['GM_saveTab'];
     * declare const GM_getTabs: MonkeyWindow['GM_getTabs'];
     * declare const GM_notification: MonkeyWindow['GM_notification'];
     * declare const GM_setClipboard: MonkeyWindow['GM_setClipboard'];
     * declare const GM_info: MonkeyWindow['GM_info'];
     * declare const GM_cookie: MonkeyWindow['GM_cookie'];
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
     * @default false
     */
    metaFileName?: string | boolean | ((fileName: string) => string);

    /**
     * this object can be array or object, array=Object.entries(object)
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
     *  // youe need manually set userscript.require = ['https://unpkg.com/vue@3.0.0/dist/vue.global.js'], when command=='build'
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
     * [ // array structure, this example come from playground/ex-vue-demi
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
     * the judgment is based on String.prototype.includes, if code.includes('GM_xxx'), add \@grant GM_xxx to userscript
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
     *   'element-plus/dist/index.css': [ // compat externalGlobals cdn function
     *      (version, name, importName, resolveName)=>importName, // if (!!value) === false, plugin will use default value
     *      (version, name, importName, resolveName)=>`https://unpkg.com/${name}@${version}/${resolveName}`, // if (!!value) === false, plugin will use default value
     *   ],
     *   'element-plus/dist/index.css': cdn.jsdelivr(),
     * }
     */
    externalResource?: ExternalResource;

    /**
     * if you want to enable sourcemap, you can set `viteConfig.build.sourcemap='inline'`
     *
     * In addition, if `monkeyConfig.build.sourcemap && viteConfig.build.sourcemap===undefined`
     *
     * the plugin wll set `viteConfig.build.sourcemap='inline'`
     */
    sourcemap?: {
      /**
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

## externalGlobals cdn util

```js
// use example
import { cdn } from 'vite-plugin-monkey';
const buildConfig = {
  externalGlobals: {
    'blueimp-md5': cdn.bytecdntp('md5', 'js/md5.min.js'),
  },
  externalResource: {
    'element-plus/dist/index.css': cdn.jsdelivr(),
  },
};
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

## ESM GM_api

we can use GM_api by esm module

```ts
import { GM_cookie, unsafeWindow, monkeyWindow, GM_addElement } from '$';
// $ is the alias of vite-plugin-monkey/dist/client, you can use others

// whatever it is serve or build mode, monkeyWindow is always the window of [UserScript Scope]
console.log(monkeyWindow);

GM_addElement && GM_addElement(document.body, 'div', { innerHTML: 'hello' });

// whatever it is serve or build mode, unsafeWindow is always host window
if (unsafeWindow == window) {
  console.log('scope->host, esm mode');
} else {
  console.log('scope->monkey, iife mode');
}
GM_cookie &&
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

## example

test example, see [/playground](/playground)

and preact/react/svelte/vanilla/vue/solid examples, see [create-monkey](/packages/create-monkey)

## some note

### [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

in `vite serve` mode, the code entry is added as script to target host document.head, code need work between two origins

#### for http header csp

you can use [Tampermonkey](https://www.tampermonkey.net/) then open `extension://iikmkjmpaadaobahmlepeloendndfphd/options.html#nav=settings`

at `Security`, set `Modify existing content security policy (CSP) headers` to `Remove entirely (possibly unsecure)`

full detail see [issues/1](https://github.com/lisonge/vite-plugin-monkey/issues/1)

and if you use `Violentmonkey`/`Greasemonkey`, you can solve it in the following ways

- chrome - [Disable Content-Security-Policy](https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden/)
- edge - [Disable Content-Security-Policy](https://microsoftedge.microsoft.com/addons/detail/disable-contentsecurity/ecmfamimnofkleckfamjbphegacljmbp?hl=zh-CN)
- firefox - disable `security.csp.enable` in the `about:config` menu

#### for html csp

- MITM modify html by <https://wproxy.org/whistle/>

- if csp allow `*.xx.com`, you can set `viteConfig.server.host=localhost.xx.com` and add `127.0.0.1 localhost.xx.com` to your hosts file, if your need fake https ca, you can use [mkcert](https://github.com/FiloSottile/mkcert)

- by chrome-remote-interface [issues/1#issuecomment-1236060681](https://github.com/lisonge/vite-plugin-monkey/issues/1#issuecomment-1236060681)

### Mixed IIFE and UMD at @require

the variable declared by `var` from iife-cdn will not become the property of window at monkeyWindow scope

so if an umd lib is dependent on an iife lib, such as `element-plus` is dependent on `vue`, `element-plus` cdn will not work

detail see [issues/5](https://github.com/lisonge/vite-plugin-monkey/issues/5) or [greasyfork#1084](https://github.com/JasonBarnabe/greasyfork/issues/1084)

the solution is that we append a dataUrl script that will set iife-variable as the property of window after iife-cdn

```js
// solution example
import { cdn, util } from 'vite-plugin-monkey';
const buildConfig = {
  vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js').concat(
    await util.fn2dataUrl(() => {
      // @ts-ignore
      window.Vue = Vue;
    }),
  ),
  'element-plus': cdn.jsdelivr('ElementPlus', 'dist/index.full.min.js'),
};
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
