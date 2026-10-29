# Build a Library Using GM API {#build-a-library-using-gm-api}

If you want to encapsulate GM_api to build a library for others to use

The previous practice generally involved accessing GM_api as a global variable directly in the library code and then referencing and loading it in userscript through `@require`.

However, this approach does not allow us to manage this dependency through npm or other package managers, and it is not compatible with the usage of ESM GM_api in vite-plugin-monkey.

Now, you only need to import GM_api normally from `$` in your library code. Modify your build config and exclude `$`.

This way, you can build a library that can be used in vite-plugin-monkey. Users of this library only need to install it via npm and use it normally with `import`.

Of course, if you directly bundle `$` into the build artifact, the library can also be referenced directly through `@require`.

However, to make the build artifact more concise, it is recommended that you redirect `$` to `vite-plugin-monkey/dist/native` during the build.

Below is an example using tsup to simultaneously package ESM and IIFE formats. ESM is provided to vite-plugin-monkey users, and IIFE is provided to users who want to reference it through `@require`.

Additionally, the IIFE format can also be used as a configuration for vite-plugin-monkey's dependencies to reduce the size of the build artifact.

```ts
// /src/index.ts
import { GM_setValue } from '$';

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
    external: ['$'],
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
        $: 'vite-plugin-monkey/dist/native',
      };
    },
  },
]);
```
