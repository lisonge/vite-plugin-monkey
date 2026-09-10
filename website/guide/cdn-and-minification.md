# CDN and Minification

## CDN Utilities

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

there is the following cdn to use, full detail see [cdn.ts](https://github.com/lisonge/vite-plugin-monkey/blob/main/vite-plugin-monkey/src/node/cdn.ts)

- [jsdelivr](https://www.jsdelivr.com/)
- [unpkg](https://unpkg.com/)
- [cdnjs](https://cdnjs.com/libraries)
- [zhimg](https://unpkg.zhimg.com/)
- [npmmirror](https://registry.npmmirror.com/)

if you want use other cdn, you can see [external-scripts](https://greasyfork.org/help/external-scripts)

## Minification

because of the [code-rules](https://greasyfork.org/en/help/code-rules) of greasyfork

> Code posted to Greasy Fork must not be obfuscated or minified

so plugin will change the default value of [viteConfig.build.minify](https://cn.vitejs.dev/config/build-options.html#build-minify) to `false`

if you want to enable minify, just set `viteConfig.build.minify=true`
