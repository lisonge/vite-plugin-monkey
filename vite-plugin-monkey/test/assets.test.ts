import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import test from 'node:test';
import { build, createServer, parseSync, Visitor } from 'vite';
import monkey from '../src/node/index.ts';
import { resolvedOption } from '../src/node/utils/option.ts';

test('external assets retain bytes, metadata and runtime URL semantics', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'monkey-assets-'));
  try {
    await fs.writeFile(
      path.join(root, 'package.json'),
      JSON.stringify({ name: 'assets-test' }),
    );
    await fs.writeFile(
      path.join(root, 'solver.wasm'),
      Buffer.from([0, 97, 115, 109, 1, 0, 0, 0]),
    );
    await fs.writeFile(
      path.join(root, 'image.svg'),
      '<svg xmlns="http://www.w3.org/2000/svg"/>',
    );
    await fs.writeFile(
      path.join(root, 'style.css'),
      'body { background: url("./image.svg#icon"); }',
    );
    await fs.writeFile(
      path.join(root, 'main.js'),
      `import wasm from './solver.wasm?url'; import init from './solver.wasm?init'; import './style.css'; globalThis.initialized = init(); globalThis.result = [wasm, new URL('./solver.wasm', import.meta.url)];`,
    );
    const run = (assetsBaseUrl?: string) =>
      build({
        root,
        configFile: false,
        logLevel: 'silent',
        build: { write: false },
        plugins: [
          monkey({
            entry: 'main.js',
            build: { assetsBaseUrl, metaFileName: true },
          }),
        ],
      });
    const result = await run('https://example.com/releases/v1/');
    assert.ok(!Array.isArray(result) && 'output' in result);
    const output = result.output;
    const script = output.find((x) => x.fileName.endsWith('.user.js'));
    assert.ok(script && script.type === 'chunk');
    const assets = output.filter((x) => x.fileName.startsWith('assets/'));
    assert.equal(assets.length, 2);
    const wasmAsset = assets.find((x) => x.fileName.endsWith('.wasm'));
    assert.ok(wasmAsset?.type === 'asset');
    assert.deepEqual(
      Buffer.from(wasmAsset.source),
      Buffer.from([0, 97, 115, 109, 1, 0, 0, 0]),
    );
    const calls: string[] = [];
    const styles: string[] = [];
    const context = {
      URL,
      WebAssembly,
      atob,
      GM_getResourceURL: (name: string) => {
        calls.push(name);
        return 'data:application;base64,AGFzbQEAAAA=';
      },
      GM_addStyle: (css: string) => styles.push(css),
    };
    vm.runInNewContext(script.code, context);
    const initialized = await (
      context as typeof context & { initialized: Promise<WebAssembly.Instance> }
    ).initialized;
    assert.ok(initialized instanceof WebAssembly.Instance);
    assert.ok(calls.length >= 3);
    assert.ok(calls.every((name) => assets.some((a) => a.fileName === name)));
    assert.match(styles.join(''), /#icon/);
    assert.doesNotMatch(styles.join(''), /__MONKEY_ASSET/);
    const values = (context as typeof context & { result: [string, URL] })
      .result;
    assert.match(values[0], /^data:application\/wasm;base64,/);
    assert.ok(values[1] instanceof URL);
    const wasm = await WebAssembly.instantiateStreaming(fetch(values[0]));
    assert.ok(wasm.instance instanceof WebAssembly.Instance);
    for (const asset of assets) {
      assert.ok(
        script.code.includes(
          `https://example.com/releases/v1/${asset.fileName}`,
        ),
      );
    }
    assert.match(script.code, /@grant\s+GM_getResourceURL/);
    const meta = output.find((x) => x.fileName.endsWith('.meta.js'));
    assert.ok(meta?.type === 'asset');
    assert.equal(
      String(meta.source)
        .match(/@resource[^\n]*/g)
        ?.join('\n'),
      script.code.match(/@resource[^\n]*/g)?.join('\n'),
    );
    const inline = await run();
    assert.ok(!Array.isArray(inline) && 'output' in inline);
    assert.equal(
      inline.output.filter((x) => x.fileName.startsWith('assets/')).length,
      0,
    );
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});

test('dev WASM imports fetch from the module origin on a foreign page', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'monkey-wasm-dev-'));
  const server = await createServer({
    root,
    base: '/dev/',
    configFile: false,
    logLevel: 'silent',
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
  try {
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
          assert.equal(
            url.origin,
            origin,
            `${query} fetched from the host page`,
          );
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
  } finally {
    await server.close();
    await fs.rm(root, { recursive: true, force: true });
  }
});

for (const assetsBaseUrl of [undefined, 'https://example.com/releases/v1/']) {
  test(
    `bare WASM named imports initialize before use (${assetsBaseUrl ? 'external' : 'inline'})`,
    { timeout: 10000 },
    async () => {
      const root = await fs.mkdtemp(path.join(os.tmpdir(), 'monkey-wasm-'));
      try {
        // (module (func (export "answer") (result i32) i32.const 42))
        const bytes = Buffer.from(
          '0061736d010000000105016000017f03020100070a0106616e7377657200000a06010400412a0b',
          'hex',
        );
        await fs.writeFile(path.join(root, 'answer.wasm'), bytes);
        await fs.writeFile(
          path.join(root, 'main.ts'),
          `import { answer } from './answer.wasm'; globalThis.done(answer());`,
        );
        const result = await build({
          root,
          configFile: false,
          logLevel: 'silent',
          build: { write: false },
          plugins: [monkey({ entry: 'main.ts', build: { assetsBaseUrl } })],
        });
        assert.ok(!Array.isArray(result) && 'output' in result);
        const script = result.output.find((x) =>
          x.fileName.endsWith('.user.js'),
        );
        assert.ok(script?.type === 'chunk');
        const assets = result.output.filter((x) => x.type === 'asset');
        assert.equal(assets.length, assetsBaseUrl ? 1 : 0);
        const calls: string[] = [];
        const completed = Promise.withResolvers<number>();
        const context = {
          WebAssembly,
          atob,
          fetch,
          done: completed.resolve,
          GM_getResourceURL: (name: string) => {
            calls.push(name);
            const asset = assets.find((x) => x.fileName === name);
            assert.ok(asset?.type === 'asset');
            assert.deepEqual(Buffer.from(asset.source), bytes);
            return `data:application/octet-stream;base64,${Buffer.from(asset.source).toString('base64')}`;
          },
        };
        await vm.runInNewContext(script.code, context);
        assert.equal(await completed.promise, 42);
        if (assetsBaseUrl) {
          assert.match(assets[0].fileName, /^assets\/answer-.*\.wasm$/);
          assert.deepEqual(calls, [assets[0].fileName]);
          const resource = script.code.match(/@resource\s+(\S+)\s+(\S+)/);
          assert.ok(resource);
          assert.equal(resource[1], assets[0].fileName);
          assert.equal(resource[2], assetsBaseUrl + assets[0].fileName);
          assert.match(script.code, /@grant\s+GM_getResourceURL/);
        } else {
          assert.deepEqual(calls, []);
          assert.doesNotMatch(
            script.code,
            /@resource\s|@grant\s+GM_getResourceURL/,
          );
        }
      } finally {
        await fs.rm(root, { recursive: true, force: true });
      }
    },
  );
}

test('dynamic imports, minification and repeated builds retain only current resources', async () => {
  const root = await fs.mkdtemp(
    path.join(os.tmpdir(), 'monkey-assets-dynamic-'),
  );
  try {
    await fs.writeFile(
      path.join(root, 'package.json'),
      '{"name":"dynamic-assets"}',
    );
    await fs.writeFile(path.join(root, 'a.png'), 'first-image');
    await fs.writeFile(path.join(root, 'b.png'), 'second-image');
    await fs.writeFile(
      path.join(root, 'lazy.js'),
      `import url from './a.png'; export default url;`,
    );
    await fs.writeFile(
      path.join(root, 'main.js'),
      `globalThis.loaded = import('./lazy.js').then(m => globalThis.result = m.default);`,
    );
    const plugins = monkey({
      entry: 'main.js',
      build: {
        assetsBaseUrl: 'https://example.com/v1',
        systemjs: 'inline',
        autoGrant: false,
      },
    });
    const run = () =>
      build({
        root,
        configFile: false,
        logLevel: 'silent',
        build: { write: false, minify: true },
        plugins,
      });
    for (const name of ['a', 'b']) {
      await fs.writeFile(
        path.join(root, 'lazy.js'),
        `import url from './${name}.png'; export default url;`,
      );
      const result = await run();
      assert.ok(!Array.isArray(result) && 'output' in result);
      assert.equal(result.output.filter((x) => x.type === 'chunk').length, 1);
      const script = result.output.find((x) => x.type === 'chunk');
      assert.ok(script?.type === 'chunk');
      assert.equal(
        script.code.match(/@resource\s/g)?.length,
        1,
        script.code.slice(-2200),
      );
      assert.match(script.code, /@grant\s+GM_getResourceURL/);
      const context = vm.createContext({
        console,
        URL,
        setTimeout,
        GM_getResourceURL: (key: string) => `blob:https://example.com/${key}`,
      });
      context.self = context;
      vm.runInContext(script.code, context);
      // System.import schedules evaluation on the microtask queue.
      await new Promise((resolve) => setTimeout(resolve, 20));
      await context.loaded;
      assert.match(context.result, new RegExp(`assets/${name}-`));
    }
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});

test('explicit JS and CSS URL imports remain external assets', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'monkey-url-assets-'));
  try {
    const sources = ['export const answer = 42;', 'body{color:red}\n'];
    await fs.writeFile(path.join(root, 'payload.js'), sources[0]);
    await fs.writeFile(path.join(root, 'payload.css'), sources[1]);
    await fs.writeFile(
      path.join(root, 'main.js'),
      `import js from './payload.js?url'; import css from './payload.css?url'; globalThis.result = [js, css];`,
    );
    const result = await build({
      root,
      configFile: false,
      logLevel: 'silent',
      build: { write: false },
      plugins: [
        monkey({
          entry: 'main.js',
          build: { assetsBaseUrl: 'https://example.com/' },
        }),
      ],
    });
    assert.ok(!Array.isArray(result) && 'output' in result);
    const script = result.output.find((item) => item.type === 'chunk');
    assert.ok(script?.type === 'chunk');
    const calls: string[] = [];
    const context = vm.createContext({
      GM_getResourceURL(name: string) {
        calls.push(name);
        return `blob:https://songe.li/${name}`;
      },
    });
    vm.runInContext(script.code, context);
    assert.equal(calls.length, 2);
    for (const [index, name] of calls.entries()) {
      const asset = result.output.find((item) => item.fileName === name);
      assert.ok(asset?.type === 'asset');
      assert.equal(asset.source.toString(), sources[index]);
      assert.equal(context.result[index], `blob:https://songe.li/${name}`);
      assert.ok(script.code.includes(`https://example.com/${name}`));
    }
    assert.equal(script.code.match(/@resource\s/g)?.length, 2);
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});

test('rejects invalid bases and conflicting resource declarations', async () => {
  for (const assetsBaseUrl of [
    '/relative/',
    'file:///tmp/',
    'https://example.com/?x=1',
  ]) {
    await assert.rejects(
      resolvedOption(
        { entry: 'main.js', build: { assetsBaseUrl } },
        process.cwd(),
      ),
    );
  }
  const root = await fs.mkdtemp(
    path.join(os.tmpdir(), 'monkey-assets-conflict-'),
  );
  try {
    await fs.writeFile(
      path.join(root, 'main.js'),
      `import image from './a.png'; console.log(image);`,
    );
    await fs.writeFile(path.join(root, 'a.png'), 'image');
    await assert.rejects(
      build({
        root,
        configFile: false,
        logLevel: 'silent',
        build: {
          write: false,
          rolldownOptions: {
            output: { assetFileNames: 'assets/a b[extname]' },
          },
        },
        plugins: [
          monkey({
            entry: 'main.js',
            build: { assetsBaseUrl: 'https://example.com/' },
          }),
        ],
      }),
      /External asset names must not contain whitespace/,
    );
    for (const userscript of [
      { resource: { 'assets/a.png': 'https://different.example/a.png' } },
      { grant: 'none' as const },
    ]) {
      await assert.rejects(
        build({
          root,
          configFile: false,
          logLevel: 'silent',
          build: {
            write: false,
            rolldownOptions: {
              output: { assetFileNames: 'assets/[name][extname]' },
            },
          },
          plugins: [
            monkey({
              entry: 'main.js',
              userscript,
              build: { assetsBaseUrl: 'https://example.com/' },
            }),
          ],
        }),
        /Conflicting resource|remove grant/,
      );
    }
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});

test('explicit inline/raw imports and extracted CSS preserve their contracts', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'monkey-assets-css-'));
  try {
    await fs.writeFile(path.join(root, 'a.png'), 'image');
    await fs.writeFile(path.join(root, 'font.woff2'), 'font');
    await fs.writeFile(
      path.join(root, 'style.css'),
      '@font-face { font-family: fixture; src: url(./font.woff2); }',
    );
    await fs.writeFile(
      path.join(root, 'main.js'),
      `import image from './a.png?inline'; import text from './a.png?raw'; import './style.css'; globalThis.result = [image, text];`,
    );
    const result = await build({
      root,
      configFile: false,
      logLevel: 'silent',
      build: { write: false },
      plugins: [
        monkey({
          entry: 'main.js',
          styleImport: false,
          build: { assetsBaseUrl: 'https://example.com/' },
        }),
      ],
    });
    assert.ok(!Array.isArray(result) && 'output' in result);
    const script = result.output.find((x) => x.type === 'chunk');
    assert.ok(script?.type === 'chunk');
    const context = vm.createContext({
      GM_addStyle: (css: string) => {
        assert.match(css, /blob:https/);
      },
      GM_getResourceURL: () => 'blob:https://example.com/font',
    });
    vm.runInContext(script.code, context);
    assert.match(context.result[0], /^data:image\/png;base64,/);
    assert.equal(context.result[1], 'image');
    assert.equal(script.code.match(/@resource\s/g)?.length, 1);
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});

test(
  'watch rebuild drops removed resource declarations',
  { timeout: 15000 },
  async () => {
    const root = await fs.mkdtemp(
      path.join(os.tmpdir(), 'monkey-assets-watch-'),
    );
    let watcher: Awaited<ReturnType<typeof build>> | undefined;
    try {
      await fs.writeFile(path.join(root, 'a.png'), 'image');
      const entry = path.join(root, 'main.js');
      await fs.writeFile(entry, `import a from './a.png'; console.log(a);`);
      watcher = await build({
        root,
        configFile: false,
        logLevel: 'silent',
        build: { watch: {} },
        plugins: [
          monkey({
            entry: 'main.js',
            build: {
              fileName: 'test.user.js',
              assetsBaseUrl: 'https://example.com/',
            },
          }),
        ],
      });
      assert.ok(!Array.isArray(watcher) && 'on' in watcher);
      const active = watcher;
      const nextBuild = () =>
        new Promise<void>((resolve, reject) => {
          const listener = (event: { code: string; error?: unknown }) => {
            if (event.code === 'END' || event.code === 'ERROR') {
              active.off('event', listener);
              if (event.code === 'ERROR') reject(event.error);
              else resolve();
            }
          };
          active.on('event', listener);
        });
      await nextBuild();
      assert.match(
        await fs.readFile(path.join(root, 'dist/test.user.js'), 'utf8'),
        /@resource/,
      );
      const rebuilt = nextBuild();
      await fs.writeFile(entry, `console.log('no assets');`);
      await rebuilt;
      assert.doesNotMatch(
        await fs.readFile(path.join(root, 'dist/test.user.js'), 'utf8'),
        /@resource|GM_getResourceURL/,
      );
    } finally {
      if (watcher && !Array.isArray(watcher) && 'close' in watcher)
        await watcher.close();
      await fs.rm(root, { recursive: true, force: true });
    }
  },
);
