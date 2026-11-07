# Build a Library Using GM API {#build-a-library-using-gm-api}

For a library consumed by vite-plugin-monkey projects, import GM APIs from `$` and keep `$` external in the library's ESM output:

```ts
// src/index.ts
import { GM_setValue } from '$';

export const setValue = (name: string, value: unknown) => {
  GM_setValue(name, value);
};
```

For example, with tsup:

```ts
// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  platform: 'browser',
  dts: true,
  external: ['$'],
});
```

Load `vite-plugin-monkey/client` in your TypeScript `types` configuration for the `$` declarations; it is not a runtime import. See [GM API](./gm-api).

Consumers install the library and import it normally. Their vite-plugin-monkey instance resolves `$`: development reads APIs through the userscript sandbox bridge, while production generates a virtual module referencing the manager's GM globals. The library does not bundle the development client.

For a separate IIFE distributed through `@require`, provide your own entry or adapter that reads GM globals. The old `vite-plugin-monkey/dist/native` entry is no longer provided. Such an artifact must contain no unresolved `$` imports, and its required grants must be configured in the consuming userscript.
