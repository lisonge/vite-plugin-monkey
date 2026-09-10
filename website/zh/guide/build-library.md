# 构建使用 GM API 的库

如果您想封装 GM_api 构建一个库后给其他人使用

以前的做法一般是直接在库代码里将 GM_api 作为全局变量访问，然后通过 `@require` 在脚本里引用加载

但是这无法让我们通过 npm 等包管理器去管理这个依赖，也不适配 vite-plugin-monkey 的 ESM GM_api 的用法

现在您只需要在您的库代码里正常从 `vite-plugin-monkey/dist/client` 导入 GM_api，然后在打包的时候将 `vite-plugin-monkey/dist/client` 作为排除依赖即可

这样您就能构建一个正常在 vite-plugin-monkey 里使用的库，用户使用这个库只需要使用 npm 安装后正常 `import` 使用即可

当然如果您直接将 `vite-plugin-monkey/dist/client` 打包到构建产物中，这个库也能直接通过 `@require` 引用

但是为了使构建产物更加简洁，建议您在构建的时候将 `vite-plugin-monkey/dist/client` 重定向到 `vite-plugin-monkey/dist/native`

以下是一个使用 tsup 同时打包 ESM 和 IIFE 格式的例子，ESM 提供给 vite-plugin-monkey 用户，IIFE 提供给想通过 `@require` 引用的用户

同时 IIFE 格式也能作为 vite-plugin-monkey 的 `externalGlobals` 的配置来减少构建产物的大小

```ts
// /src/index.ts
import { GM_setValue } from 'vite-plugin-monkey/dist/client';

export const setValue = (name: string, value: unknown) => {
  console.log('you invoke setValue', name, value);
  GM_setValue(name, value);
};
```

```ts
// tsup.config.ts
import { defineConfig } from 'tsup';

const outExtension = (ctx: { format: 'esm' | 'cjs' | 'iife' }) => ({
  js: { esm: '.mjs', cjs: '.cjs', iife: '.iife.js' }[ctx.format],
});

export default defineConfig([
  {
    // for vite import
    entry: ['src/index.ts'],
    outDir: 'dist',
    sourcemap: true,
    platform: 'browser',
    outExtension,
    dts: true,
    format: ['esm'],
    external: ['vite-plugin-monkey/dist/client'],
  },
  {
    // for userscript @require
    entry: ['src/index.ts'],
    outDir: 'dist',
    sourcemap: true,
    platform: 'browser',
    outExtension,
    dts: false,
    format: ['iife'],
    minify: true,
    globalName: `GmExtra`,
    target: 'es2015',
    esbuildOptions: (options) => {
      options.alias = {
        'vite-plugin-monkey/dist/client': 'vite-plugin-monkey/dist/native',
      };
    },
  },
]);
```
