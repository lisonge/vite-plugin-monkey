import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { createServer } from 'vite';
import monkey from '../src/node/index.ts';

test('dev worker wrappers resolve their entry against the module origin', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'monkey-workers-'));
  const server = await createServer({
    root,
    configFile: false,
    logLevel: 'silent',
    server: { middlewareMode: true, open: false, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true, entries: [] },
    plugins: [monkey({ entry: 'worker.js' })],
  });
  try {
    await fs.writeFile(path.join(root, 'worker.js'), '');
    for (const kind of ['sharedworker', 'worker']) {
      const result = await server.transformRequest(`/worker.js?${kind}`);
      assert.ok(result);
      const calls: {
        kind: string;
        url: string;
        name?: string;
        type: string;
      }[] = [];
      const constructor = (kind: string) =>
        class {
          constructor(url: string, options: { name?: string; type: string }) {
            calls.push({ kind, url, ...options });
          }
        };
      const context = vm.createContext({
        URL,
        moduleMeta: { url: `http://localhost:5173/dev/worker.js?${kind}` },
        Worker: constructor('worker'),
        SharedWorker: constructor('sharedworker'),
      });
      vm.runInContext(
        result.code
          .replace(/import\.meta/g, 'moduleMeta')
          .replace('export default function', 'globalThis.Wrapper = function'),
        context,
      );
      new context.Wrapper({ name: 'named-worker' });
      new context.Wrapper();
      assert.equal(calls.length, 2);
      assert.equal(calls[0].kind, kind);
      assert.equal(calls[0].name, 'named-worker');
      assert.equal(calls[1].name, undefined);
      assert.equal(calls[0].type, 'module');
      assert.match(calls[0].url, /^data:text\/javascript;charset=utf-8,/);
      assert.equal(
        decodeURIComponent(calls[0].url.split(',')[1]),
        'import "http://localhost:5173/dev/worker.js?worker_file&type=module";',
      );
      const urlOnly = await server.transformRequest(`/worker.js?${kind}&url`);
      assert.ok(urlOnly);
      assert.match(urlOnly.code, /export default new URL\(/);
    }
  } finally {
    await server.close();
    await fs.rm(root, { recursive: true, force: true });
  }
});
