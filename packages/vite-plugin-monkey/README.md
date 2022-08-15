# vite-plugin-monkey

<p>
  <a href="https://www.npmjs.com/package/vite-plugin-monkey"><img src="https://img.shields.io/npm/v/vite-plugin-monkey.svg" alt="npm package"></a>
  <a href="https://github.com/lisonge/vite-plugin-monkey/releases/"><img src="https://img.shields.io/node/v/vite-plugin-monkey.svg" alt="node compatibility"></a>
</p>

[README](README.md) | [中文文档](README_zh.md)

vite plugin server and build \*.user.js for [Tampermonkey](https://www.tampermonkey.net/) and [Violentmonkey](https://violentmonkey.github.io/) and [Greasemonkey](https://www.greasespot.net/)

## feature

- support Tampermonkey and Violentmonkey and Greasemonkey
- inject userscript comment to build bundle
- auto open \*.user.js in default browser when userscript change
- external cdn url inject to userscript @require
- use GM_api by ESM import with type hints
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

<details open>
  <summary>Sample: Initializing a Template</summary>

![vue-ts](https://github.com/lisonge/src/raw/main/img/2022-07-17_19-15-35.gif)

</details>

<details open>
  <summary>Sample: Hot Module Replacement</summary>

![hmr](https://github.com/lisonge/src/raw/main/img/2022-07-18_18-00-12.gif)

</details>

<details open>
  <summary>Sample: Build & Preview</summary>

![build&preview](https://github.com/lisonge/src/raw/main/img/2022-08-15_11-02-58.gif)

</details>

## installation

```shell
pnpm add -D vite-plugin-monkey
# npm i -D vite-plugin-monkey
# yarn add -D vite-plugin-monkey
```

## config

[MonkeyOption](/packages/vite-plugin-monkey/src/node/index.ts#L43)

```ts
export interface MonkeyOption {
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
   * // vite-env.d.ts, you must manual modify .env file
   * declare module clientAlias {
   *   export * from 'vite-plugin-monkey/dist/client';
   * }
   */
  clientAlias?: string;
  server?: {
    /**
     * auto open *.user.js in default browser when userscript comment change or vite server first start
     * @default true
     */
    open?: boolean;

    /**
     * name prefix, distinguish server.user.js and build.user.js in monkey extension install list, if you not want prefix, set false
     * @default 'dev:'
     */
    prefix?: string | ((name: string) => string) | false;

    /**
     * mount GM_api to unsafeWindow, not recommend it, you should use GM_api by ESM import
     * @default false
     */
    mountGmApi?: boolean;
  };
  build?: {
    /**
     * build bundle userscript file name, it should end with '.user.js'
     * @default (package.json.name||'monkey')+'.user.js'
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
    metaFileName?: string | boolean;

    /**
     * @example
     * {
     *  vue:'Vue',
     *  // need manually set userscript.require = ['https://unpkg.com/vue@3.0.0/dist/vue.global.js']
     *  vuex:['Vuex', 'https://unpkg.com/vuex@4.0.0/dist/vuex.global.js'],
     *  // use fixed version, plugin will auto add this url to userscript.require
     *  vuex:['Vuex', (version, name)=>`https://unpkg.com/${name}@${version}/dist/vuex.global.js`],
     *  // best recommended this
     * }
     * // type Lib2Url = (version: string, name: string) => string
     */
    externalGlobals?: Record<
      string,
      string | [string, ...(string | Lib2Url)[]]
    >;

    /**
     * according to final code bundle, auto inject GM_* or GM.* to userscript comment grant
     *
     * the judgment is based on String.prototype.includes
     * @default true
     */
    autoGrant?: boolean;

    /**
     * check all require urls for availability, http code is 2xx
     * @default false
     */
    checkCDN?: boolean;
  };
}
```

[MonkeyUserScript](/packages/vite-plugin-monkey/src/node/userscript/index.ts#L138)

```ts
/**
 * UserScript, merge metadata from Greasemonkey, Tampermonkey, Violentmonkey, Greasyfork
 */
export type MonkeyUserScript = GreasemonkeyUserScript &
  TampermonkeyUserScript &
  ViolentmonkeyUserScript &
  GreasyforkUserScript &
  MergemonkeyUserScript;
```

- [GreasemonkeyUserScript](/packages/vite-plugin-monkey/src/node/userscript/greasemonkey.ts#L38)
- [TampermonkeyUserScript](/packages/vite-plugin-monkey/src/node/userscript/tampermonkey.ts#L77)
- [ViolentmonkeyUserScript](/packages/vite-plugin-monkey/src/node/userscript/violentmonkey.ts#L81)
- [GreasyforkUserScript](/packages/vite-plugin-monkey/src/node/userscript/index.ts#L31)
- [MergemonkeyUserScript](/packages/vite-plugin-monkey/src/node/userscript/index.ts#L62)

[Format](/packages/vite-plugin-monkey/src/node/userscript/common.ts#L9)

```ts
/**
 * format userscript comment
 */
export type Format = {
  /**
   * @description note font_width/font_family, suggest fixed-width font
   * @default 2, true
   */
  align?: number | boolean | AlignFunc;
};

export type AlignFunc = (
  p0: [string, ...string[]][],
) => [string, ...string[]][];
```

## externalGlobals cdn util

```js
// use example
import { cdn } from 'vite-plugin-monkey';
{
  externalGlobals: {
    'blueimp-md5': cdn.bytecdntp('md5', 'js/md5.min.js'),
  },
}
```

there is the following cdn to use, full detail see [cdn.ts](/packages/vite-plugin-monkey/src/node/cdn.ts)

- [jsdelivr](/packages/vite-plugin-monkey/src/node/cdn.ts#L1) <https://www.jsdelivr.com/>
- [unpkg](/packages/vite-plugin-monkey/src/node/cdn.ts#L43) <https://unpkg.com/>
- [bytecdntp](/packages/vite-plugin-monkey/src/node/cdn.ts#L59) <https://cdn.bytedance.com/>
- [bootcdn](/packages/vite-plugin-monkey/src/node/cdn.ts#L75) <https://www.bootcdn.cn/all/>
- [baomitu](/packages/vite-plugin-monkey/src/node/cdn.ts#L91) <https://cdn.baomitu.com/>
- [staticfile](/packages/vite-plugin-monkey/src/node/cdn.ts#L107) <https://staticfile.org/>
- [cdnjs](/packages/vite-plugin-monkey/src/node/cdn.ts#L122) <https://cdnjs.com/libraries>
- [zhimg](/packages/vite-plugin-monkey/src/node/cdn.ts#L138) <https://unpkg.zhimg.com/>

if you want use other cdn, you can see [external-scripts](https://greasyfork.org/zh-CN/help/external-scripts)

## ESM GM_api

we can use GM_api by esm module

```ts
import { GM_cookie, unsafeWindow, monkeyWindow, GM_addElement } from '$';
// $ is the alias of vite-plugin-monkey/dist/client, you can use others

// whatever it is serve or build mode, monkeyWindow is always the window of [UserScript Scope]
console.log(monkeyWindow);

GM_addElement(document.body, 'div', { innerHTML: 'hello' });

// whatever it is serve or build mode, unsafeWindow is always host window
if (unsafeWindow == window) {
  console.log('scope->host, esm mode');
} else {
  console.log('scope->monkey, iife mode');
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

## example

vite config is simple, see [vite.config.ts](/playground/example/vite.config.ts), build file see [example-project.user.js](/playground/example/dist/example.user.js)

and preact/react/svelte/vanilla/vue examples see [create-monkey](/packages/create-monkey)

## some note

### [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

you can use [Tampermonkey](https://www.tampermonkey.net/) then open `extension://iikmkjmpaadaobahmlepeloendndfphd/options.html#nav=settings`

at `Security`, set `Modify existing content security policy (CSP) headers` to `Remove entirely (possibly unsecure)`

full detail see [issues/1](https://github.com/lisonge/vite-plugin-monkey/issues/1)

and if you use `Violentmonkey`/`Greasemonkey`, you can solve it in the following ways

- chrome - [Disable Content-Security-Policy](https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden/)
- edge - [Disable Content-Security-Policy](https://microsoftedge.microsoft.com/addons/detail/disable-contentsecurity/ecmfamimnofkleckfamjbphegacljmbp?hl=zh-CN)
- firefox - disable `security.csp.enable` in the `about:config` menu

### Polyfill

because of [vite/issues/1639](https://github.com/vitejs/vite/issues/1639), now you can not use `@vitejs/plugin-legacy`

the following is a feasible solution by @require cdn

```ts
import { defineConfig } from 'vite';
import monkeyPlugin from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkeyPlugin({
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
