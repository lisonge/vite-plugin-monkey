import assert from 'node:assert/strict';
import path from 'node:path';
import { rollup } from 'rollup';
import { getSystemjsSource } from '../../src/node/utils/systemjs.ts';
import type { BrowserFixtures } from './browser.ts';
import type { TestProject } from './project.ts';
import { createWorkerRequests } from '../fixtures/shared/worker-requests.ts';

export type WorkerTransport = 'registry' | 'blob-chunks';

// Prototype only: stable IDs describe the graph; Blob URLs only transport code.
export async function buildSystemWorker(
  project: TestProject,
  mode: WorkerTransport,
) {
  await project.copy('systemjs-worker');
  const { root } = project;
  const bundle = await rollup({
    input: path.join(root, 'entry.js'),
    // Keep the re-export module so live bindings cross a real module boundary.
    treeshake: false,
    onwarn(warning, warn) {
      if (warning.code !== 'CIRCULAR_DEPENDENCY') warn(warning);
    },
  });
  try {
    const { output } = await bundle.generate({
      format: 'system',
      preserveModules: true,
      preserveModulesRoot: root,
      entryFileNames: (chunk) => {
        assert.ok(chunk.facadeModuleId);
        return path.basename(chunk.facadeModuleId);
      },
      minifyInternalExports: false,
    });
    const chunks = output.filter((item) => item.type === 'chunk');
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

    const base = 'https://monkey.invalid/worker-prototype/';
    const sources = Object.fromEntries(
      chunks.map((item) => [new URL(item.fileName, base).href, item.code]),
    );
    const registrations = chunks
      .map((item) => {
        assert.ok(item.code.startsWith('System.register('));
        return item.code.replace(
          'System.register(',
          `System.register(${JSON.stringify(new URL(item.fileName, base).href)}, `,
        );
      })
      .join('\n');
    return `
${await getSystemjsSource()}
const sources = ${JSON.stringify(mode === 'blob-chunks' ? sources : Object.fromEntries(Object.keys(sources).map((key) => [key, null])))};
const loaded = [];
const instantiate = System.instantiate;
System.instantiate = async function(id, parent, meta) {
  if (!Object.hasOwn(sources, id)) throw new Error('Unknown Worker module: ' + id);
  loaded.push(id.slice(${base.length}));
  if (${JSON.stringify(mode)} === 'registry') return instantiate.call(this, id, parent, meta);
  const url = URL.createObjectURL(new Blob([sources[id]], { type: 'text/javascript' }));
  try {
    return await instantiate.call(this, url, parent, meta);
  } finally {
    URL.revokeObjectURL(url);
  }
};
${mode === 'registry' ? registrations : ''}
const ready = System.import(${JSON.stringify(base + 'entry.js')});
ready.catch(error => self.postMessage({ fatal: String(error.stack || error) }));
self.addEventListener('message', async ({ data }) => {
  const { id, method, args } = data;
  try {
    const entry = await ready;
    const value = method === 'loaded' ? [...loaded] : await entry[method](...args);
    self.postMessage({ id, value });
  } catch (error) {
    self.postMessage({ id, error: String(error.stack || error) });
  }
});
`;
  } finally {
    await bundle.close();
  }
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
