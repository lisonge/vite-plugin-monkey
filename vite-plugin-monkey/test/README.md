# Tests

Node tests use Vitest. Browser tests use Playwright Test with real, headless
Chromium. The browser suite has separate development and production processes,
and each test owns its temporary project, browser context and Vite instances.

Run from the repository root:

| Command                       | Purpose                                                |
| ----------------------------- | ------------------------------------------------------ |
| `pnpm test`                   | All plugin and website Node tests, once                |
| `pnpm test:watch`             | Watch Node test and source changes                     |
| `pnpm test --project build`   | Only real production builds                            |
| `pnpm test --project serve`   | Only development server tests                          |
| `pnpm test:types`             | Type-check source, tests, public API and configuration |
| `pnpm test:coverage`          | Plugin Node source coverage in `coverage/`             |
| `pnpm test:browser`           | Development and production browser suites              |
| `pnpm test:browser:dev`       | Development browser suite                              |
| `pnpm test:browser:build`     | Production browser suite                               |
| `pnpm test:browser:contracts` | Optional SystemJS registry prototype                   |

Install the browser once with `pnpm exec playwright install chromium`. An
installed Edge can be selected by setting `PLAYWRIGHT_CHANNEL=msedge`.

Type declaration tests use generated package declarations. Run
`pnpm --filter vite-plugin-monkey build` before `pnpm test:types`. This is
release/type verification; playground development and runtime tests load source
directly.

GM declaration checks load the single `vite-plugin-monkey/client` entry and
verify the complete `$` API. Manager-specific method and return-value checks
use named types such as `TampermonkeyGM`, `ViolentmonkeyGM` and `GreasemonkeyGM`
from that same module. Auto-import presets still filter runtime names by manager.
The client and global declaration checks run in separate TypeScript projects,
both with `strict: true` and `skipLibCheck: false`. `types/tsconfig.json` checks
the unified client entry and named manager types; `types/tsconfig.global.json`
also checks `global.d.ts`, including its globals and `Window` augmentation.

## Test layers

| Directory             | Runner          | Coverage                                                         |
| --------------------- | --------------- | ---------------------------------------------------------------- |
| `unit/`               | Vitest          | Metadata, configuration and transformations                      |
| `build/`              | Vitest          | Real Vite production builds, emitted files and Node VM execution |
| `serve/`              | Vitest          | Real Vite servers, HTTP endpoints and transformed modules        |
| `types/`              | TypeScript      | Compile-time plugin option and GM API assertions                 |
| `browser/dev/`        | Playwright Test | Cross-origin development runtime, Workers, CSS and framework HMR |
| `browser/build/`      | Playwright Test | Built userscripts, Worker resource loading and module semantics  |
| `browser/contracts/`  | Playwright Test | Optional experiments outside the default regression suite        |
| `website/.vitepress/` | Vitest          | Website contracts                                                |

Vitest projects use forked workers with file isolation. Build tests run with
`NODE_ENV=production`; serve tests run with `NODE_ENV=development`.
`pnpm test:browser` starts two separate Playwright Test processes with those same
environments. This also separates dependencies loaded by Vite and framework
plugins; changing `NODE_ENV` between cases in one process would leave their
module caches shared.

Development browser tests check GM imports, cross-origin modules, lazy imports,
CSS, Workers and HMR. React, Vue and Solid use small source fixtures under
`fixtures/frameworks/`. Their tests edit a component and verify both the updated
UI and preserved counter state. They do not build or mutate `playground/`.

## Fixtures and diagnostics

`support/project.ts` owns temporary projects and cleanup independently of either
runner. `support/fixture.ts` adapts it to Vitest; `support/browser.ts` adapts it to
Playwright Test and exports `test` and `expect`. Both runners expose the same
`project` fixture for file writes, builds and Vite servers. `buildOutput()` and
`userScript()` select completed build output; `nextBuild()` waits for a watch
rebuild while its watcher remains owned by the project.

Browser tests receive a shared set of fixtures:

- `project` creates files, copies source fixtures and starts Vite builds/servers.
- `page` uses Playwright's isolated context. Chromium is reused by the worker
  process, while storage, pages and mock manager state are isolated per test.
- `host` provides a local page origin separate from the Vite server.
- `userscript` installs the development bridge or runs a production userscript
  with the mock manager.
- `diagnostics` records console messages, browser errors and network activity.

The fixtures close servers, Workers, contexts and temporary projects after each
test, including failed cases. Inputs copied from `fixtures/` can be edited
without changing shared source files. External-dependency cases use local
packages and resource bytes instead of relying on a CDN.

Playwright keeps traces and screenshots on failure. Diagnostic logs and generated
userscripts are attached to the failing test. Results live in
`test-results/dev/`, `test-results/build/` or `test-results/contracts/`; HTML
reports use the matching directories under `playwright-report/`.

For example, open the production report with:

```sh
pnpm exec playwright show-report playwright-report/build
```

## Production Workers and SystemJS

`build/workers.test.ts` checks the real Vite pipeline, resource metadata, custom
output paths, publicDir assets, permission errors and watch rebuild cleanup.
The production browser suite executes emitted userscripts with an in-memory
userscript manager. It covers inline/resource modes with `?worker`,
`?worker&inline`, and the static `new Worker(new URL(...))` syntax. The manager
returns data URLs and Blob URLs from actual build output.

Runtime assertions cover lazy chunk reads and execution, namespace caching,
cycles/live bindings/top-level await, multiple instances, SVG/binary/WASM
resources, MIME types, startup message queues, immediate transfer detachment and
missing-resource errors. The private resource channel is checked separately
from application messages.

After entry initialization, a Worker waits for the parent's readiness
acknowledgment before replaying queued application messages.
`unit/worker-runtime.test.ts` holds that acknowledgment to verify message order.
Browser tests gate entry initialization explicitly, then verify that a queued
application error leaves the instance, dynamic imports and resource reads usable.
Initialization failures still terminate the Worker, close its message ports,
abort resource reads and release the bootstrap Blob URL.

The default production suite also runs isolated SystemJS `blob-chunks` semantic
tests. `support/systemjs-worker.ts` compiles ESM fixtures with Rollup's `system`
format and executes them in Classic Workers. It preserves module boundaries so
the assertions exercise actual cycles, live bindings, dynamic import caching,
top-level await ordering/rejection and instance isolation. Message-driven gates
control asynchronous execution.

The production harness and prototypes share request/event bookkeeping from
`fixtures/shared/worker-requests.ts`. Their Worker construction and behavior
assertions remain separate from each other and from the plugin's runtime bridge.

`pnpm test:browser:contracts` runs the alternative `registry` prototype, which
embeds all named `System.register` declarations in one Worker script. It is not
part of the default regression run. Both prototype transports use stable module
IDs and embed all module bytes in the initial payload; only the production
resource tests exercise retrieval through GM resources. The prototypes do not
establish correctness for every cyclic graph containing top-level await.

## Playground and CI

`playground/` contains manual examples for installation, framework interaction
and real userscript-manager verification. CI builds them as integration smoke
checks; automated browser regression inputs live under `test/fixtures/`.
`create-monkey/template-*` has no added tests.

The browser harness simulates a manager's sandbox. Tampermonkey/Violentmonkey
restrictions and page CSP still require checks with an installed extension.

CI runs Node tests, type checks and playground builds on Linux and Windows.
Linux also runs development and production browser suites in separate steps and
uploads failure reports, traces, screenshots and attachments. Publishing depends
on this workflow. Node coverage is informational and describes plugin source,
not generated code executed inside a VM or browser.
