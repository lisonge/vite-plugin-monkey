# CDN and Minification {#cdn-and-minification}

## CDN Utilities {#cdn-utilities}

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

## External assets {#external-assets}

Set `monkey({ entry: 'src/main.ts', build: { assetsBaseUrl: 'https://example.com/releases/v1/' } })` to emit static assets such as WASM, images and fonts from the build graph as separate files. JavaScript remains a single userscript. Omit this option to keep the default inline behavior.

`assetsBaseUrl` is the absolute HTTP(S) directory hosting `dist`, without a query or fragment. Asset filenames default to `assets/[name]-[hash][extname]`. For example, `assets/solver-AbCd.wasm` produces an identically named `@resource` pointing to `https://example.com/releases/v1/assets/solver-AbCd.wasm`.

Asset imports, `?url`, statically analyzable `new URL(..., import.meta.url)` expressions and CSS asset URLs use `GM_getResourceURL`. The plugin adds the required grant even with `autoGrant` disabled; explicit `grant: 'none'` is incompatible. Explicit `?inline`, `?raw` and existing `externalResource` mappings retain their behavior. Conflicting resource names with different URLs fail the build.

Emitted asset filenames must not contain whitespace because they also serve as `@resource` names. The build rejects such names.

Upload assets before publishing the userscript and optional metadata file. Use versioned directories and retain older assets for users who have not upgraded. The plugin does not upload files. Userscript managers preload `@resource` entries; these are not on-demand downloads.

Development continues to use Vite's asset server. This option does not fix dependency optimization paths in development, split JS/Workers, transform arbitrary string paths, or register every file in `publicDir`. It uses Vite's experimental `renderBuiltUrl` hook. The plugin handles externalized asset URLs and delegates other URLs to an existing user hook.

## Minification {#minification}

because of the [code-rules](https://greasyfork.org/en/help/code-rules) of greasyfork

> Code posted to Greasy Fork must not be obfuscated or minified

so plugin will change the default value of [viteConfig.build.minify](https://cn.vitejs.dev/config/build-options.html#build-minify) to `false`

if you want to enable minify, just set `viteConfig.build.minify=true`
