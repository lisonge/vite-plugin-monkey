import {
  compileModules,
  chunkModuleId,
} from '../../src/node/modules/compile.ts';
import { createModuleRegistry } from '../../src/node/modules/runtime.ts';
import assert from 'node:assert/strict';
import { build } from 'vite';
import path from 'node:path';
import { removePreloadFactory } from '../../src/node/vite/build/removePreload.ts';
import type { BrowserFixtures } from './browser.ts';
import type { TestProject } from './project.ts';
import { createWorkerRequests } from '../fixtures/shared/worker-requests.ts';

export type WorkerTransport = 'registry' | 'blob-chunks';

export async function buildModuleWorker(
  project: TestProject,
  mode: WorkerTransport,
) {
  await project.copy('module-worker');
  const { root } = project;
  const result = await build({
    root,
    configFile: false,
    logLevel: 'silent',
    plugins: [removePreloadFactory()],
    build: {
      write: false,
      target: 'esnext',
      minify: false,
      modulePreload: false,
      rolldownOptions: {
        input: path.join(root, 'entry.js'),
        treeshake: false,
        preserveEntrySignatures: 'strict',
        output: {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: root,
          entryFileNames: '[name].js',
        },
      },
    },
  });
  assert.ok(!Array.isArray(result) && 'output' in result);
  const chunks = result.output.filter((item) => item.type === 'chunk');
  const chunk = (name: string) => {
    const result = chunks.find((item) => item.fileName === name);
    assert.ok(result, `Missing module ${name}`);
    return result;
  };
  assert.ok(chunk('cycle-a.js').imports.includes('cycle-b.js'));
  assert.ok(chunk('cycle-b.js').imports.includes('cycle-a.js'));
  assert.ok(chunk('entry.js').dynamicImports.includes('lazy.js'));
  assert.ok(chunk('tla-importer.js').imports.includes('tla.js'));
  assert.ok(chunk('observer.js').imports.includes('reexport.js'));
  const compiled = await compileModules(
    new Map(chunks.map((item) => [item.fileName, item.code])),
  );
  const sources = Object.fromEntries(
    Object.entries(compiled).map(([name, code]) => [chunkModuleId(name), code]),
  );
  return `
const createModuleRegistry = ${createModuleRegistry.toString()};
const loaded = [];
const sources = ${JSON.stringify(mode === 'blob-chunks' ? sources : {})};
const registrations = {${
    mode === 'registry'
      ? Object.entries(sources)
          .map(([id, code]) => `${JSON.stringify(id)}: () => { ${code} }`)
          .join(',')
      : ''
  }};
const registry = createModuleRegistry(async id => {
  loaded.push(id);
  if (${JSON.stringify(mode)} === 'registry') { registrations[id](); return; }
  if (!Object.hasOwn(sources, id)) throw new Error('Unknown Worker module: ' + id);
  const url = URL.createObjectURL(new Blob([sources[id]], { type: 'text/javascript' }));
  try { importScripts(url); } finally { URL.revokeObjectURL(url); }
});
globalThis.__monkeyRegister = registry.register;
const ready = registry.importModule('./entry.js');
ready.catch(error => self.postMessage({ fatal: String(error.stack || error) }));
self.addEventListener('message', async ({ data }) => {
  const { id, method, args } = data;
  try {
    const entry = await ready;
    self.postMessage({ id, value: method === 'loaded' ? [...loaded] : await entry[method](...args) });
  } catch (error) { self.postMessage({ id, error: String(error.stack || error) }); }
});`;
}

export async function createWorkerLab(
  {
    page,
    diagnostics,
    disposables,
  }: Pick<BrowserFixtures, 'page' | 'diagnostics' | 'disposables'>,
  source: string,
) {
  const lab = await page.evaluateHandle(
    ({ code, requestsSource }) => {
      const createRequests = new Function(
        'return (' + requestsSource + ')',
      )() as typeof createWorkerRequests;
      // Every instance uses the exact same URL, including the isolation test.
      const url = URL.createObjectURL(
        new Blob([code], { type: 'text/javascript' }),
      );
      function createProbe() {
        const worker = new Worker(url, { type: 'classic' });
        const requests = createRequests();
        worker.addEventListener('error', (event) =>
          requests.fail(new Error(event.message)),
        );
        worker.addEventListener('messageerror', () =>
          requests.fail(new Error('Invalid Worker message')),
        );
        worker.addEventListener('message', ({ data }) => {
          if (data.fatal) return requests.fail(new Error(data.fatal));
          requests.receive(data);
        });
        return {
          call(method: string, args: unknown[]) {
            const { id, response } = requests.request();
            worker.postMessage({ id, method, args });
            return response;
          },
          event: requests.event,
          close() {
            worker.terminate();
            requests.fail(new Error('Worker terminated'));
          },
        };
      }
      const workers: ReturnType<typeof createProbe>[] = [];
      return {
        create() {
          workers.push(createProbe());
          return workers.length - 1;
        },
        call(index: number, method: string, args: unknown[]) {
          return workers[index].call(method, args);
        },
        event(index: number, name: string) {
          return workers[index].event(name);
        },
        close() {
          workers.forEach((worker) => worker.close());
          URL.revokeObjectURL(url);
        },
      };
    },
    { code: source, requestsSource: createWorkerRequests.toString() },
  );
  disposables.defer(async () => {
    await lab.evaluate((lab) => lab.close());
    await lab.dispose();
  });
  return {
    requests: diagnostics.requests,
    async create() {
      const index = await lab.evaluate((lab) => lab.create());
      return {
        call: (method: string, ...args: unknown[]) =>
          lab.evaluate(
            (lab, input) => lab.call(input.index, input.method, input.args),
            { index, method, args },
          ),
        event: (name: string) =>
          lab.evaluate((lab, input) => lab.event(input.index, input.name), {
            index,
            name,
          }),
      };
    },
  };
}
