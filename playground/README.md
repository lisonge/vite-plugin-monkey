# Playground

Playgrounds are for manual userscript installation, runtime and HMR checks.
Automated regression cases live in `vite-plugin-monkey/test/`. Playwright Test
uses independent fixtures for development, production and React/Vue/Solid HMR;
it does not build or modify these playgrounds. Run `pnpm test:browser:dev` or
`pnpm test:browser:build` for those suites, and see the
[test guide](../vite-plugin-monkey/test/README.md) for browser setup and reports.
Generated bundles are ignored by Git. `create-monkey` templates are not part of
this test setup.

## Start

From the repository root, run `pnpm install`, then `pnpm playground`.
This starts the lab on port 5173.
Open `http://localhost:5173/` and follow the installation link, then open
`https://songe.li/` with Tampermonkey or Violentmonkey enabled.
All playground scripts match `https://songe.li/*`; no local host-page server is
needed. Keep the Vite dev server running to serve modules and HMR. Run each
scenario using the injected panel buttons.

| Command                               | Manual checks                                                            |
| ------------------------------------- | ------------------------------------------------------------------------ |
| `pnpm playground`                     | GM imports/storage, image/CSS/WASM URLs, Worker, dynamic imports and TLA |
| `pnpm --filter @playground/react dev` | React Fast Refresh and state preservation                                |
| `pnpm --filter @playground/vue dev`   | Vue SFC/scoped Sass, Pinia, Element Plus and UnoCSS HMR                  |
| `pnpm --filter @playground/solid dev` | Solid HMR and interactive counter                                        |

Run one playground at a time; all use port 5173 with `strictPort`. Disable scripts
from other playgrounds when switching so multiple panels do not mask failures.
For HMR checks, edit the indicated component title/style, save, and confirm that
the update appears without duplicate panels. A build alone does not verify HMR.

## Production scripts

`pnpm build:playground` type-checks the TypeScript entry/config files and builds
all four projects. Vue SFC compilation is checked by the Vite build; this is not
a separate Vue template type-checking setup. CI runs these builds, plus the lab
and Vue external variants, as integration smoke checks for the manual examples.

For the lab, run `pnpm --filter @playground/lab build`, then
`pnpm --filter @playground/lab preview`. Install
`http://localhost:4173/lab.user.js`, disable its development counterpart, and open
`https://songe.li/`. The same process works for the frameworks with
`react.user.js`, `vue.user.js` or `solid.user.js`.

- `pnpm --filter @playground/lab build:external` emits image/WASM resources and
  Worker module chunks whose URLs point to `http://localhost:4173/`, plus external normalize.css resources.
  Keep preview running while installing and using this variant. Check SVG, CSS
  background, WASM named import, `?init`, `?url`, `new URL`, inline/raw and Worker.
- `pnpm --filter @playground/vue build:external` uses CDN Vue/Pinia/Element Plus
  globals and external CSS. This manual variant needs internet access; automated
  external-global/resource tests use local fake packages and do not fetch a CDN.
- `pnpm --filter @playground/lab build:watch` rebuilds the production script when
  source files change. Reinstall the result when checking changes in a manager;
  build watch is not browser HMR.

Changing between default and external builds replaces that project's `dist`.
Reinstall the script after switching. GM storage uses the lab-only
`monkey-playground-count` key; running its scenario increments this value.

The Worker scene creates two ordinary Workers from the same entry and a third
using `?worker&inline`. It checks lazy execution, concurrent/repeated dynamic
import caching, top-level await, independent module state, and SVG/WASM loaded
inside the Worker. Messages are sent immediately after construction to exercise
the production startup queue. The default build embeds Worker modules and
assets; the external build uses resource-backed chunks and internal assets,
while the explicit inline Worker keeps its code graph embedded. Each Worker is
terminated when the scene finishes.

## Migration map

| Previous playground                      | Replacement                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------ |
| `assets-base-url`                        | Lab assets scene and external build; build/serve asset regression tests              |
| `build-watch`                            | Lab `build:watch`; automated watch resource-removal test                             |
| `dynamic-import`, `test-top-level-await` | Lab async scene; VM execution tests for dynamic imports, TLA and for-await           |
| `example`                                | Lab GM scene; metadata and client-import regression tests; certificate setup removed |
| `external-source`                        | Lab external resources and Vue external build; local-package regression tests        |
| `ex-vue-demi`                            | Vue/Pinia/Element Plus integration with current dependency versions                  |
| `mini-css`                               | Vue UnoCSS/scoped Sass HMR; build tests for CSS, lazy/empty Sass and `?style`        |
| `react-ts`, `solid-ts`                   | Small React/Solid HMR playgrounds                                                    |

The old unrelated demo styling, live-site fetches, cookie inspection, window
closing and formatting demo are intentionally removed. These were manual demo
actions, not regression assertions. Framework templates remain unchanged.
