# CDN 与压缩 {#cdn-and-minification}

## CDN 工具 {#cdn-utilities}

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

有以下 CDN 可使用，详情见 [cdn.ts](https://github.com/lisonge/vite-plugin-monkey/blob/main/vite-plugin-monkey/src/node/cdn.ts)

- [jsdelivr](https://www.jsdelivr.com/)
- [unpkg](https://unpkg.com/)
- [cdnjs](https://cdnjs.com/libraries)
- [zhimg](https://unpkg.zhimg.com/)
- [npmmirror](https://registry.npmmirror.com/)

如果你想使用其他 CDN，请查看 [external-scripts](https://greasyfork.org/zh-CN/help/external-scripts)

## 压缩混淆 {#minification}

由于 greasyfork 的 [代码规则](https://greasyfork.org/zh-CN/help/code-rules)

> 提交到 Greasy Fork 的代码不得混淆或最小化

因此插件将 [viteConfig.build.minify](https://cn.vitejs.dev/config/build-options.html#build-minify) 的默认值更改为 `false`

如果你想启用压缩混淆，只需要手动设置 `viteConfig.build.minify=true`
