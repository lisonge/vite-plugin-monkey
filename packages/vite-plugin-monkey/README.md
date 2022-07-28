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
- full typescript support and vite feature

## quick usage (recommend)

just like vite create

```shell
pnpm create monkey
# npm create monkey
# yarn create monkey
```

then you can choose the following template

- [vue](https://github.com/lisonge/create-monkey/tree/main/template-vue)
- [vue-ts](https://github.com/lisonge/create-monkey/tree/main/template-vue-ts)
- [react](https://github.com/lisonge/create-monkey/tree/main/template-react)
- [react-ts](https://github.com/lisonge/create-monkey/tree/main/template-react-ts)
- [preact-preact](https://github.com/lisonge/create-monkey/tree/main/template-preact)
- [svelte](https://github.com/lisonge/create-monkey/tree/main/template-svelte)
- [svelte-ts](https://github.com/lisonge/create-monkey/tree/main/template-svelte-ts)
- [vanilla](https://github.com/lisonge/create-monkey/tree/main/template-vanilla) (native js)
- [vanilla-ts](https://github.com/lisonge/create-monkey/tree/main/template-vanilla-ts) (native ts)

![vue-ts](https://github.com/lisonge/src/raw/main/img/2022-07-17_19-15-35.gif)

Hot Module Replacement

![hmr](https://github.com/lisonge/src/raw/main/img/2022-07-18_18-00-12.gif)

## installation

```shell
pnpm add -D vite-plugin-monkey
# npm i -D vite-plugin-monkey
# yarn add -D vite-plugin-monkey
```

## config

[MonkeyOption](./src/index.ts#L41)

```ts
export interface MonkeyOption {
  /**
   * userscript entry file path
   */
  entry: string;
  userscript: MonkeyUserScript;
  format?: Format;
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
  };
  build?: {
    /**
     * build bundle userscript file name, it should end with '.user.js'
     * @default (package.json.name||'monkey')+'.user.js'
     */
    fileName?: string;

    /**
     * @example
     * {
     *  vue:'Vue',
     *  // need manually set userscript.require = ['https://unpkg.com/vue@3.0.0/dist/vue.global.js']
     *  vuex:['Vuex', 'https://unpkg.com/vuex@4.0.0/dist/vuex.global.js'],
     *  // recommended this, plugin will auto add this url to userscript.require
     *  vuex:['Vuex', (version)=>`https://unpkg.com/vuex@${version}/dist/vuex.global.js`],
     *  // better recommended this
     *  vuex:['Vuex', (version, name)=>`https://unpkg.com/${name}@${version}/dist/vuex.global.js`],
     *  // or this
     * }
     *
     */
    externalGlobals?: Record<
      string,
      string | [string, string | ((version: string, name: string) => string)]
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

[MonkeyUserScript](./src/userscript/index.ts#L138)

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

- [GreasemonkeyUserScript](./src/userscript/greasemonkey.ts#L38)
- [TampermonkeyUserScript](./src/userscript/tampermonkey.ts#L77)
- [ViolentmonkeyUserScript](./src/userscript/violentmonkey.ts#L81)
- [GreasyforkUserScript](./src/userscript/index.ts#L33)
- [MergemonkeyUserScript](./src/userscript/index.ts#L61)

[Format](./src/userscript/common.ts#L12)

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

there is the following cdn to use, full detail see [cdn.ts](./src/cdn.ts)

- [jsdelivr](./src/cdn.ts#L1) <https://www.jsdelivr.com/>
- [unpkg](./src/cdn.ts#L43) <https://unpkg.com/>
- [bytecdntp](./src/cdn.ts#L59) <https://cdn.bytedance.com/>
- [bootcdn](./src/cdn.ts#L75) <https://www.bootcdn.cn/all/>
- [baomitu](./src/cdn.ts#L91) <https://cdn.baomitu.com/>
- [staticfile](./src/cdn.ts#L107) <https://staticfile.org/>
- [cdnjs](./src/cdn.ts#L122) <https://cdnjs.com/libraries>
- [zhimg](./src/cdn.ts#L138) <https://unpkg.zhimg.com/>

if you want use other cdn, you can see [external-scripts](https://greasyfork.org/zh-CN/help/external-scripts)

## example

vite config is simple, see [vite.config.ts](./test/example/vite.config.ts), build file see [example-project.user.js](./test/example/dist/example-project.user.js)

and preact/react/svelte/vanilla/vue examples see [create-monkey](https://github.com/lisonge/create-monkey.git)

## note

### CSP

you can use [Tampermonkey](https://www.tampermonkey.net/) then open `extension://iikmkjmpaadaobahmlepeloendndfphd/options.html#nav=settings`

at `Security`, set `Modify existing content security policy (CSP) headers` to `Remove entirely (possibly unsecure)`

full detail see [issues/1](https://github.com/lisonge/vite-plugin-monkey/issues/1)

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
