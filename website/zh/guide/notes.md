# 注意事项

## 和其他插件一起使用

插件将通过 [generateBundle](https://rollupjs.org/plugin-development/#generatebundle) 重新构建你的代码

请尽量确保插件的顺序是**最后一个**

## [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

在 `vite serve` 模式下，代码入口被作为 script 添加到目标环境 document.head，代码需要在两个源之间正常工作

但是浏览器会根据 CSP 策略阻止这个 script 的执行

安装扩展 [Disable-CSP](https://github.com/lisonge/Disable-CSP) 即可禁用 CSP

## 通过 @require 加载的 IIFE 和 UMD 混用的问题

iife-cdn 使用 `var` 声明的变量在油猴脚本作用域下不会成为 window 的属性

因此如果一个 umd 库依赖了一个 iife 库， 例如 `element-plus` 依赖 `vue`，`element-plus` cdn 在这种情况下无法正常运行

详情见 [issues/5](https://github.com/lisonge/vite-plugin-monkey/issues/5) 或 [greasyfork#1084](https://github.com/JasonBarnabe/greasyfork/issues/1084)

解决方法是 在 iife-cdn 后面追加一个 `dataUrl` 脚本，把 iife 声明的变量作为 `window` 的属性

```js
// 解决方案例子
import { cdn, util } from 'vite-plugin-monkey';
const buildConfig = {
  vue: cdn
    .jsdelivr('Vue', 'dist/vue.global.prod.js')
    .concat(util.dataUrl(';window.Vue=Vue;')),
  'element-plus': cdn.jsdelivr('ElementPlus', 'dist/index.full.min.js'),
};
```

## Polyfill

与 vite legacy 一起使用时，需要设置 `renderLegacyChunks=false`

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
