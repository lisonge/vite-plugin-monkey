# Configuration

Version 9 rejects unknown options without legacy aliases. Vite owns ports, HMR, target, minify and outDir.

```ts
import monkey, { npmCdn } from 'vite-plugin-monkey';
monkey({
  entry: 'src/main.ts',
  userscript: { name: 'Example', match: ['https://songe.li/*'] },
  dev: { namePrefix: '[dev] ' },
  output: { script: 'example.user.js', meta: true },
  dependencies: {
    vue: {
      kind: 'global',
      global: 'Vue',
      urls: [npmCdn({ path: 'dist/vue.global.prod.js' })],
    },
  },
  css: { inject: 'auto' },
});
```

| Option         | Contract                                                  |
| -------------- | --------------------------------------------------------- |
| entry          | Required file relative to Vite root                       |
| userscript     | Metadata object; grant is optional, none or a grant array |
| dev.namePrefix | '[dev] ' by default; empty string disables it             |
| output.script  | Package name plus .user.js; scoped names use hyphens      |
| output.meta    | Omitted/false, true for inferred .meta.js, or a filename  |
| assets         | Omit publicPath to inline; set publicPath for resources   |
| dependencies   | Production-only global/resource descriptors               |
| css.inject     | auto (default), gm, dom or false                          |

Output paths must remain inside outDir. Metadata alignment is internal. Public option objects have named exported types.

Development entry URLs preserve spaces, Unicode and `%` in file paths. Entries outside Vite root use `/@fs/` and remain subject to `server.fs.allow`. Vite's module loader currently does not support `#` in source filenames, even when the URL encodes it as `%23`.

## Metadata and permissions

userscript accepts an object only. Compute dynamic or asynchronous metadata in the outer Vite defineConfig function. Package metadata still supplies defaults, and script and meta share the same values. Source watch rebuilds reset collected build state without reevaluating configuration. $extra adds custom fields but cannot set grant.

```ts
import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig(({ command, mode }) => ({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        description: command === 'serve' ? 'Development' : mode,
        match: ['https://songe.li/*'],
      },
    }),
  ],
}));
```

Automatic detection supports static API references, not full data-flow analysis. For dynamic access or untraceable aliases, set userscript.grant to a complete array, including resource and CSS requirements. Arrays accept supported API names only.

Configure only userscript.grant: omit it for production detection and all supported development grants; use 'none' for @grant none, or an array for the exact list in both environments. An empty array emits no grant. Production rejects required APIs with 'none'. There is no permissions or dev.grant override. Reinstall the development script after changing explicit grants.

## Dependencies and assets

Global dependencies use `{ kind: 'global', global, urls }`. global is an identifier or dotted path. urls are ordered @require URLs; an empty array allows manual userscript.require. URLs can be strings or async functions receiving `{ name, version, importName, resolveName }`.

Resource dependencies use `{ kind: 'resource', name?, url, loader? }`. Loaders are inferred from suffixes or specified as `'css' | 'json' | 'raw' | 'url'` or `{ entry: './src/load-resource.ts' }`. A module loader default-exports a browser function receiving ResourceLoaderContext (package fields, resourceName, resourceUrl, dynamic). Dependencies participate in bundling and permission detection. Async results are awaited; dynamic imports resolve a namespace with default.

`npmCdn({ provider?, path? })` returns a callable `DependencyUrlResolver`. The provider defaults to `jsdelivr`; `unpkg` and `jsdelivr-fastly` are also supported. The path defaults to the resolved package file. It does not return a dependency descriptor.

`assets: { publicPath: 'https://example.com/releases/v1/' }` emits images, fonts, WASM and Worker module chunks as @resource entries. The directory URL must be absolute HTTP(S), without credentials, query or fragment. Upload assets before distribution. Explicit asset ?inline and ?raw retain their semantics.

Resource mode defaults to `[name]-[hash][extname]`, placing assets beside the userscript. Set `publicPath` to a GitHub Release download directory such as `https://github.com/OWNER/REPO/releases/download/v1.0.0/`, then upload the script and assets individually. An explicit `build.rolldownOptions.output.assetFileNames` takes precedence, including string and function values. Custom subdirectories require matching hosting paths.

## Workers

Dedicated Workers support these production entry forms:

```ts
import TaskWorker from './worker.ts?worker';
import InlineTaskWorker from './worker.ts?worker&inline';

const worker = new TaskWorker({ name: 'task' });
const inlineWorker = new InlineTaskWorker();
const urlWorker = new Worker(new URL('./worker.ts', import.meta.url), {
  type: 'module',
});
```

Write Worker code as ESM, including static imports, dynamic imports and top-level await. Production builds run it as a Classic Worker with an isolated SystemJS module registry. Dynamic imports retain deferred execution and module caching; cycles and live bindings are linked across chunks. The plugin owns the intermediate Worker format, so `worker.format` does not select the runtime format. Vite's Worker plugins and output naming options remain available.

| Asset mode         | Worker code                                            | Worker images, fonts and WASM                                     |
| ------------------ | ------------------------------------------------------ | ----------------------------------------------------------------- |
| `inline` (default) | Entire module graph embedded in the userscript         | Embedded resources                                                |
| `resource`         | Module chunks emitted as `@resource`, loaded on demand | Emitted as `@resource`, prepared before the Worker entry executes |

`?worker&inline` always embeds the Worker module graph; its internal assets still follow `assets.publicPath`. A single output script with embedded assets therefore uses the default `inline` mode. In resource mode, upload all emitted chunks and assets alongside the userscript. Worker output names can be customized through `worker.rolldownOptions.output`; directories and basenames follow those settings, while compiled module filenames end in `.system.js`. Default resource output is flat.

The parent userscript reads resource bytes with `GM_getResourceURL` and sends them through a private `MessageChannel` for each Worker. The Worker creates its own Blob URLs, so it does not need access to GM APIs or Blob URLs created in the userscript sandbox. Static resource imports, `?url`, `new URL('./asset', import.meta.url)` and WASM `?init` can use these local URLs. Resource mode requires `GM_getResourceURL`; include that grant when using explicit permissions.

Messages sent immediately after construction are queued until the entry is ready. Initialization failures dispatch a Worker `error` event; later dynamic-import failures reject the import promise. Missing modules/resources do not fall back to network requests. Call `terminate()` when finished to release the Worker and its bridge.

Production `SharedWorker`, `?worker&url` and nested Workers are currently rejected. The asset bridge does not expose general GM APIs inside Workers. Development continues to use Vite's module server; SystemJS is a production implementation. Browser CSP and userscript-manager restrictions still apply to Worker and Blob creation.

## CSS and runtime

css.inject auto prefers GM_addStyle and falls back to DOM; gm requires GM_addStyle, dom creates a style element, false disables injection. ?style exports a factory: call createStyle() to obtain a new HTMLStyleElement for manual insertion. During development, factory-created elements share HMR updates; native cloneNode() copies do not. Use ?inline for custom injection.

Import APIs from `$` and load the unified `vite-plugin-monkey/client` declaration entry. It declares the complete API; named types such as `TampermonkeyGM`, `ViolentmonkeyGM` and `GreasemonkeyGM` describe manager differences. See [GM API](./gm-api) for usage and auto-import presets. Development uses Vite's regular module server; bundled dev is unsupported. Missing bridges and protocol/project mismatches throw errors without falling back to the page window.

Use Vite `server.open` to open the development installation page automatically, for example `defineConfig({ server: { open: true }, plugins: [monkey({ entry: "src/main.ts" })] })`.

During development, local CSS `url()` resources are embedded as Data URLs after Vite compiles CSS. Both PostCSS and Lightning CSS are supported, including CSS Modules, `?inline` and `?style`. The plugin preserves your PostCSS configuration and does not set `server.origin`; CSS resources do not require separate requests to a fixed development port. Resource changes participate in HMR. Production assets still follow `assets.publicPath`.
