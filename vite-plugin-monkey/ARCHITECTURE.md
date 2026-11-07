# Architecture

The next major version intentionally rejects legacy configuration. The public
contract is exported by `src/node/types.ts`; configuration reference and migration
mapping live in `website/guide/configuration.md` and its Chinese translation.

## Ownership

- `config/resolve.ts` validates, clones and freezes configuration. `config/context.ts`
  creates instance-local state; no installation URL or build collector lives on
  `globalThis`. Metadata normalization does not mutate the caller's objects.
- `config/resolved.ts` owns normalized configuration types; `build/state.ts`
  owns per-build dependency and resource collections. Global bindings are derived
  from configuration. Resource resolution caches survive watch rebuilds, while
  metadata includes only modules used by the current graph.
- `metadata/` owns the field schema, normalization and comment serialization.
- `permissions/` owns grant names and static detection.
- `dependencies/` handles global and resource module resolution.
  Global binding/URL collection and resource virtual-module code are separated
  from the Vite hook adapters in `globals-plugin.ts` and `resources-plugin.ts`.
- `assets/` handles emitted resource URLs; `runtime/` contains browser templates.
- `modules/transform.ts` owns source analysis and the `moduleRunnerTransform`
  protocol adapter shared by direct wrappers and registered modules. It identifies
  real top-level await, normalizes generated imports and preserves imported tag
  calls. `compile.ts` resolves module IDs and emits generator factories;
  `globals.ts` supplies shared getter-based default/namespace compatibility.
  `wrap.ts` emits direct single-chunk wrappers; `bundle.ts` assembles registered graphs.
  `names.ts` reuses `getSafeIdentifier` to avoid user declarations and free
  references, including decoded escaped names. Vite helper spellings are protected
  during transformation, generated names are allocated, then user spellings are
  restored. Outer registry names are chosen against all chunks and global expressions.
  `runtime.ts` links and executes the
  closed graph without Node, Vite or transport dependencies; `bundle.ts` assembles
  the main-thread script. Worker transport connects through the runtime's load callback.
  `start()` links and executes an already registered synchronous graph in the
  current call stack; dynamic `import()` always schedules execution through a
  cached Promise. Async generators and Worker resource loading remain asynchronous.
- `workers/` adapts Vite's Worker output into registered module graphs.
  `worker-plugin.ts` connects Vite hooks; `runtime.ts` owns the bootstrap and resource bridge.
  The bootstrap is compressed before string serialization using the build's
  minifier and options; `build.minify: false` preserves its readable source.
  Production Dedicated Workers use a Classic bootstrap and a separate module
  registry per instance. Stable module IDs describe dependencies; transport Blob
  URLs are created and revoked inside the Worker.
  Worker bootstrap locals live in a private closure; registration and asset
  hooks use names selected against the complete Worker graph.
- `build/` prepares shared entry/CSS/Worker modules and selects direct wrapping
  or the module registry from `modules/`. It
  compresses the finished script without invoking a second Vite build, collects
  grants and emits userscript artifacts. `vite/build/`
  connects these stages to Vite hooks and handles source CSS transformations.
  Collection is scoped to the current graph so removed modules/resources
  disappear on watch rebuilds. `workers/finalize.ts` handles Worker output graphs.
  The CSS helper participates in the initial Vite build, so ordinary CSS imports
  can use the single-chunk path. Extracted CSS is injected before entry execution.
  Both renderers return code; grant collection and removal of consumed output
  chunks belong to the common emission stage. CSS injection expressions are
  shared between the direct prelude and CSS injection module. Polyfill and CSS
  imports are prepended to the actual entry chunk; no synthetic main entry is needed.
- `dev/` owns bridge configuration, installation/entry script generation and HTTP
  routes; `vite/dev/server.ts` registers them and resolves the development client.
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
Dynamic imports use an internal module registry, inlined when needed and shared
with the Worker implementation. Rollup and SystemJS are not dependencies.
JavaScript splitting retains Vite's default behavior. A single chunk can also
use direct wrapping when every static import maps to a configured global.
Vite's module-runner transform rewrites imported references; generated import
declarations become wrapper parameters, with no loader or registry. Named
imports read the original global, while default/namespace imports use getters
on a separate compatibility object without mutating that global. Dynamic
imports, internal static imports and exports require module linking.
Unresolved imports and remaining `import.meta` expressions are build errors.
Static asset URLs are resolved before this stage; there is no synthetic module URL.
Direct wrappers use async functions only for actual top-level
await, including top-level for-await.
The adapter consumes Vite's transformed helper calls and requires emitted chunks
to have explicit exports and statically resolvable imports. Remaining computed
imports, unknown modules and export-star declarations produce build errors.

Execution tracks the current dependency path to break cycle backedges. Other
branches reuse a shared dependency's execution Promise, including its failure;
independent branches can proceed. Whole-cycle completion is not tracked: an
external importer of a completed member of an asynchronous cycle may execute
early and miss the cycle's failure. This limitation applies to main scripts and
Workers. The runtime cannot restore source-module boundaries merged by Vite.

Worker builds use Vite's ESM output as an intermediate representation, then
convert it to registered generator factories. Inline mode embeds the graph; resource
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
`pnpm test:browser:contracts` command checks the eager-registration transport
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
