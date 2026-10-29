import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { test } from '../support/fixture.ts';
import { parseSync, Visitor } from 'vite';
import monkey from '../../src/node/index.ts';
test('dev WASM imports fetch from the module origin on a foreign page', async ({
  project,
}) => {
  const { root } = project;
  const server = await project.createServer({
    base: '/dev/',
    server: {
      host: '127.0.0.1',
      port: 0,
      open: false,
      hmr: false,
      watch: null,
    },
    optimizeDeps: { noDiscovery: true, entries: [] },
    plugins: [monkey({ entry: 'main.ts' })],
  });
  await fs.writeFile(path.join(root, 'main.ts'), '');
  await fs.writeFile(
    path.join(root, 'answer.wasm'),
    Buffer.from(
      '0061736d010000000105016000017f03020100070a0106616e7377657200000a06010400412a0b',
      'hex',
    ),
  );
  await server.listen();
  const address = server.httpServer!.address();
  assert.ok(address && typeof address !== 'string');
  const origin = `http://127.0.0.1:${address.port}`;
  for (const query of ['?import', '?init&import']) {
    const transformed = await fetch(`${origin}/dev/answer.wasm${query}`);
    assert.equal(transformed.status, 200);
    let helperPath = '';
    let wasmPath = '';
    new Visitor({
      ImportDeclaration(node) {
        if (String(node.source.value).includes('wasm-helper'))
          helperPath = String(node.source.value);
      },
      Literal(node) {
        if (
          typeof node.value === 'string' &&
          node.value.endsWith('/answer.wasm')
        )
          wasmPath = node.value;
      },
    }).visit(parseSync('wasm.js', await transformed.text()).program);
    assert.ok(helperPath);
    assert.equal(wasmPath, '/dev/answer.wasm');
    const helper = await fetch(new URL(helperPath, origin));
    assert.equal(helper.status, 200);
    const requests: string[] = [];
    const context = vm.createContext({
      URL,
      WebAssembly,
      atob,
      moduleMeta: { url: new URL(helperPath, origin).href },
      fetch: async (input: string | URL) => {
        // Browser fetch resolves strings against the host page, not the module.
        const url = new URL(input, 'https://songe.li/');
        requests.push(url.href);
        assert.equal(url.origin, origin, `${query} fetched from the host page`);
        return fetch(url);
      },
    });
    vm.runInContext(
      (await helper.text())
        .replace(/import\.meta/g, 'moduleMeta')
        .replace(/^export default /m, 'globalThis.initWasm = '),
      context,
    );
    const instance = await context.initWasm({}, wasmPath);
    assert.equal(instance.exports.answer(), 42);
    assert.deepEqual(requests, [origin + wasmPath]);
  }
});
