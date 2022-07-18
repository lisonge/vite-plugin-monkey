# vite-plugin-monkey

[README](README.md) | [中文文档](README_zh.md)

一个 vite 插件，用来辅助开发 [Tampermonkey](https://www.tampermonkey.net/) 和 [Violentmonkey](https://violentmonkey.github.io/) 和 [Greasemonkey](https://www.greasespot.net/) 的脚本

## 特性

- 支持 Tampermonkey 和 Violentmonkey 和 Greasemonkey 的脚本辅助开发
- 打包自动注入脚本配置头部注释
- 当 第一次启动 或 脚本配置注释改变时 自动在默认浏览器打开脚本安装
- 友好的利用 @require 配置库的 cdn 的方案，大大减少构建脚本大小
- 完全的 Typescript 和 Vite 的开发体验，比如模块热替换,秒启动

## 快速使用 (推荐)

使用方式与 vite create 一致

```shell
pnpm create monkey
# npm create monkey
# yarn create monkey
```

然后你能从以下模板选择

- [vue](https://github.com/lisonge/create-monkey/tree/main/template-vue)
- [vue-ts](https://github.com/lisonge/create-monkey/tree/main/template-vue-ts)
- [react](https://github.com/lisonge/create-monkey/tree/main/template-react)
- [react-ts](https://github.com/lisonge/create-monkey/tree/main/template-react-ts)
- [preact-preact](https://github.com/lisonge/create-monkey/tree/main/template-preact)
- [svelte](https://github.com/lisonge/create-monkey/tree/main/template-svelte)
- [svelte-ts](https://github.com/lisonge/create-monkey/tree/main/template-svelte-ts)
- [vanilla](https://github.com/lisonge/create-monkey/tree/main/template-vanilla) (原生 js)
- [vanilla-ts](https://github.com/lisonge/create-monkey/tree/main/template-vanilla-ts) (原生 ts)

![vue-ts](https://github.com/lisonge/src/raw/main/img/2022-07-17_19-15-35.gif)

## 单独安装

```shell
pnpm add -D vite-plugin-monkey
# npm i -D vite-plugin-monkey
# yarn add -D vite-plugin-monkey
```

## 配置

[MonkeyOption](./src/index.ts#L42)

```ts
export interface MonkeyOption {
  /**
   * 脚本文件的入口路径
   */
  entry: string;
  userscript: MonkeyUserScript;
  format?: Format;
  server?: {
    /**
     * 当 第一次启动 或 脚本配置注释改变时 自动在默认浏览器打开脚本
     * @default true
     */
    open?: boolean;

    /**
     * 开发阶段的脚本名字前缀，用以在脚本安装列表里区分构建好的脚本
     * @default 'dev:'
     */
    prefix?: string | ((name: string) => string);
  };
  build?: {
    /**
     * 打包构建的脚本文件名字 应该以 '.user.js' 结尾
     * @default (package.json.name||'monkey')+'.user.js'
     */
    fileName?: string;

    /**
     * @example
     * {
     *  vue:'Vue',
     *  // 你需要额外设置脚本配置 userscript.require = ['https://unpkg.com/vue@3.0.0/dist/vue.global.js']
     *  vuex:['Vuex', 'https://unpkg.com/vuex@4.0.0/dist/vuex.global.js'],
     *  // 插件将会自动注入 cdn 链接到 userscript.require
     *  vuex:['Vuex', (version)=>`https://unpkg.com/vuex@${version}/dist/vuex.global.js`],
     *  // 相比之前的，加了版本号，当依赖升级的时候，cdn 链接自动改变
     *  vuex:['Vuex', (version, name)=>`https://unpkg.com/${name}@${version}/dist/vuex.global.js`],
     *  // 还可以加依赖名字,不过各个依赖的 cdn basename 都不尽一致, 导致可能没什么用
     * }
     *
     */
    externalGlobals?: Record<
      string,
      string | [string, string | ((version: string, name: string) => string)]
    >;

    /**
     * 自动识别代码里用到的 浏览器插件api，然后自动配置 GM_* 或 GM.* 函数到脚本配置注释头
     *
     * 识别依据是判断代码文本里有没有特定的函数名字
     * @default true
     */
    autoGrant?: boolean;
  };
}
```

[MonkeyUserScript](./src/userscript/index.ts#L138)

```ts
/**
 * 综合后的脚本配置, 合并了来自 Greasemonkey, Tampermonkey, Violentmonkey, Greasyfork 的元数据
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
 * 格式化脚本头配置注释
 */
export type Format = {
  /**
   * @description 对齐的空格数量，请注意，显示的时候，保证你的代码是等宽字体
   * @default 2, true
   */
  align?: number | boolean | AlignFunc;
};

// 自定义对齐函数
export type AlignFunc = (
  p0: [string, ...string[]][]
) => [string, ...string[]][];
```

## 例子

vite 非常容易上手，请直接看 [vite.config.ts](./test/example/vite.config.ts)

例子中的构建产物在 [example-project.user.js](./test/example/dist/example-project.user.js)

preact/react/svelte/vanilla/vue 的例子在 [create-monkey](https://github.com/lisonge/create-monkey.git)

## 注意

### CSP

你可以使用 [Tampermonkey](https://www.tampermonkey.net/) 然后打开插件配置 `extension://iikmkjmpaadaobahmlepeloendndfphd/options.html#nav=settings`

在 `安全`, 设置 `如果站点有内容安全策略（CSP）则向其策略:` 为 `全部移除（可能不安全）`

具体情况请看 [issues/1](https://github.com/lisonge/vite-plugin-monkey/issues/1)

### Polyfill

由于 <https://github.com/vitejs/vite/issues/1639>, 你暂时不能使用 `@vitejs/plugin-legacy`

一种可行的方案是直接在 @require 加 cdn 去 polyfill

```ts
import { defineConfig } from 'vite';
import monkeyPlugin from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkeyPlugin({
      userscript: {
        require: [
          // polyfill 全部
          'https://cdn.jsdelivr.net/npm/core-js-bundle@latest/minified.js',
          // 或者使用 polyfill.io 智能 polyfill, 不过 polyfill.io 在大陆网络连通性很差, 几乎不能用
          // https://polyfill.io/v3/polyfill.min.js
          // 或者使用字节的cdn
          // https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/core-js/3.21.1/minified.min.js
        ],
      },
    }),
  ],
});
```
