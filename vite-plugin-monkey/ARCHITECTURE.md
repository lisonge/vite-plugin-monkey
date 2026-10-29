# Architecture

The next major version intentionally rejects legacy configuration. The public
contract is exported by `src/node/types.ts`; configuration reference and migration
mapping live in `website/guide/configuration.md` and its Chinese translation.

## Ownership

- `config/resolve.ts` validates, clones and freezes configuration. `config/context.ts`
  creates instance-local state; no installation URL or build collector lives on
  `globalThis`. Metadata normalization does not mutate the caller's objects.
- `metadata/` owns the field schema, normalization and comment serialization.
- `permissions/` owns grant names and static detection.
- `dependencies/` handles global and resource module resolution.
- `assets/` handles emitted resource URLs; `runtime/` contains browser templates.
- `workers/` adapts Vite's Worker output into System.register module graphs.
  Production Dedicated Workers use a Classic bootstrap and a separate SystemJS
  registry per instance. Stable module IDs describe dependencies; transport Blob
  URLs are created and revoked inside the Worker.
- `vite/build/` adapts CSS and final userscript
  packaging to Vite's build hooks. Collection is scoped to the current graph so
  removed modules/resources disappear on watch rebuilds.
- `vite/dev/server.ts` owns installation endpoints and the sandbox bridge.
- `vite/shared/` contains preview and explicit `?style` element imports.
- `src/client/` provides the development runtime for the `$` module.
  `client.d.ts` is the single declaration entry for the complete `$` API,
  including synchronous `GM_*` exports. Named `TampermonkeyGM`, `ViolentmonkeyGM`
  and `GreasemonkeyGM` interfaces, with their corresponding info and window
  types, describe manager differences. Runtime auto-import presets still filter
  names per manager; `$` is resolved by the plugin.
  Development accesses the manager's sandbox through a versioned project-specific document bridge;
  production uses direct GM globals. It never mounts APIs onto the page window.

## Boundaries

Vite owns server settings, HMR, output directories,
target and minification. Monkey owns metadata, grants, userscript filenames,
external dependencies and CSS injection. Externals apply only to production.
SystemJS is an internal dynamic-import implementation, inlined when needed.

Worker builds use Vite's ESM output as an intermediate representation, then
convert it to System.register chunks. Inline mode embeds the graph; resource
mode registers chunks and internal assets in userscript metadata. Each Worker
has a private MessageChannel to its parent. The parent reads GM resource URLs
into bytes, while the Worker creates local asset URLs before entry execution
and loads module chunks on demand. After the entry initializes, the Worker
reports readiness and waits for the parent's acknowledgment before replaying
queued application messages. Application errors are reported through the Worker
error event without terminating the instance. Initialization failures still
terminate it, close the resource channel, abort pending reads and release the
bootstrap Blob URL. GM APIs are not
installed in the Worker global scope. SharedWorker, URL-only Worker exports and
nested Workers are outside the production adapter's supported entry forms.

Metadata factories and URL resolvers run in Node. Custom resource loaders are ordinary
browser modules and participate in bundling and grant detection; callbacks are
not stringified as loader code. Dynamic resource imports resolve module namespace
objects with a default export and retain a single cached promise.

## Verification

`pnpm test` runs Vitest unit, production-build, server and website tests.
`pnpm test:types` checks the public API. Separate declaration projects check the
unified client entry and named manager types, and the global declarations with
their `Window` augmentation. Both use `strict: true` and `skipLibCheck: false`
against generated declarations. `pnpm test:browser` uses Playwright Test
in two independent processes: development runs with `NODE_ENV=development`, and
production runs with `NODE_ENV=production`. The suites can also run separately
with `pnpm test:browser:dev` and `pnpm test:browser:build`.

Development browser tests cover cross-origin sandbox imports, lazy modules, CSS,
Workers and HMR. Independent React/Vue/Solid fixtures verify component updates
and state preservation. Production tests execute built userscripts and verify
Worker module loading, internal assets and instance isolation. The optional
`pnpm test:browser:contracts` command retains the SystemJS registry prototype
outside the default regression run.

`test/support/project.ts` owns project files and Vite lifecycles for both runners.
The Playwright fixtures add an isolated context and mock userscript manager per
test, a separate host-page origin and failure diagnostics. Traces, screenshots,
logs and generated scripts accompany failures. Install Chromium with
`pnpm exec playwright install chromium`; installed Edge can be selected with
`PLAYWRIGHT_CHANNEL=msedge`.

The playgrounds provide manual framework and userscript-manager examples. Each
has a `dev` script, and CI builds them as smoke checks. Browser tests use their
own source fixtures. Template configurations migrate with the API;
`create-monkey/template-*` has no added tests.

The browser harness simulates a userscript manager's sandbox; it is not a replacement
for checking manager-specific restrictions in Tampermonkey or Violentmonkey.
