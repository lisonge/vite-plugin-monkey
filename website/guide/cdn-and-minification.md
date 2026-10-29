# CDN and Minification

```ts
import { npmCdn } from 'vite-plugin-monkey';

const dependencies = {
  vue: {
    kind: 'global',
    global: 'Vue',
    urls: [npmCdn({ path: 'dist/vue.global.prod.js' })],
  },
  'element-plus/dist/index.css': {
    kind: 'resource',
    url: npmCdn({ provider: 'unpkg' }),
  },
};
```

`npmCdn({ provider, path })` returns a URL resolver using the installed package version. The provider defaults to `jsdelivr`; `unpkg` and `jsdelivr-fastly` are also supported. The optional path overrides the resolved package file. Configure other CDNs with a `DependencyUrlResolver` receiving a `PackageContext` object.

For emitted WASM, image and font files, set assets to { publicPath: 'https://example.com/releases/v1/' }. Upload assets before publishing the userscript. Resource names follow emitted filenames; conflicting names or whitespace are rejected. Explicit ?inline and ?raw retain their behavior. These settings only affect production.

Vite build.minify controls minification; the plugin defaults it to false. Keep readable output when required by your distribution site.

Resource mode defaults to `[name]-[hash][extname]`, placing assets beside the userscript. Set `publicPath` to a GitHub Release download directory such as `https://github.com/OWNER/REPO/releases/download/v1.0.0/`, then upload the script and assets individually. An explicit `build.rolldownOptions.output.assetFileNames` takes precedence, including string and function values. Custom subdirectories require matching hosting paths.
