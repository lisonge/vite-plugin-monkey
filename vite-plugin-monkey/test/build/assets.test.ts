import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { test } from '../support/fixture.ts';
import { buildOutput, userScript } from '../support/project.ts';
import monkey from '../../src/node/index.ts';
import { createContext } from '../../src/node/config/context.ts';
test('external assets retain bytes, metadata and runtime URL semantics', async ({
  project,
}) => {
  const { root } = project;
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
    project.build({
      plugins: [
        monkey({
          entry: 'main.js',
          output: { meta: true },
          assets: assetsBaseUrl ? { publicPath: assetsBaseUrl } : {},
        }),
      ],
    });
  const result = await run('https://example.com/releases/v1/');
  const output = buildOutput(result);
  const script = userScript(result);
  const assets = output.filter(
    (x) => x.type === 'asset' && !x.fileName.endsWith('.meta.js'),
  );
  assert.equal(assets.length, 2);
  assert.ok(assets.every((asset) => !asset.fileName.includes('/')));
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
    context as typeof context & {
      initialized: Promise<WebAssembly.Instance>;
    }
  ).initialized;
  assert.ok(initialized instanceof WebAssembly.Instance);
  assert.ok(calls.length >= 3);
  assert.ok(calls.every((name) => assets.some((a) => a.fileName === name)));
  assert.match(styles.join(''), /#icon/);
  assert.doesNotMatch(styles.join(''), /__MONKEY_ASSET/);
  const values = (
    context as typeof context & {
      result: [string, URL];
    }
  ).result;
  assert.match(values[0], /^data:application\/wasm;base64,/);
  assert.ok(values[1] instanceof URL);
  const wasm = await WebAssembly.instantiateStreaming(fetch(values[0]));
  assert.ok(wasm.instance instanceof WebAssembly.Instance);
  for (const asset of assets) {
    assert.ok(
      script.code.includes(`https://example.com/releases/v1/${asset.fileName}`),
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
  assert.equal(
    buildOutput(inline).filter((x) => x.fileName.startsWith('assets/')).length,
    0,
  );
});
for (const assetsBaseUrl of [undefined, 'https://example.com/releases/v1/']) {
  test(
    `bare WASM named imports initialize before use (${assetsBaseUrl ? 'external' : 'inline'})`,
    { timeout: 10000 },
    async ({ project }) => {
      const { root } = project;
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
      const result = await project.build({
        plugins: [
          monkey({
            entry: 'main.ts',
            output: {},
            assets: assetsBaseUrl ? { publicPath: assetsBaseUrl } : {},
          }),
        ],
      });
      const output = buildOutput(result);
      const script = userScript(result);
      const assets = output.filter((x) => x.type === 'asset');
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
        assert.match(assets[0].fileName, /^answer-[^/]+\.wasm$/);
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
    },
  );
}
test('dynamic imports, minification and repeated builds retain only current resources', async ({
  project,
}) => {
  const { root } = project;
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
    `import('./lazy.js').then(m => globalThis.done(m.default), globalThis.fail);`,
  );
  const plugins = monkey({
    entry: 'main.js',
    output: {},
    assets: {
      publicPath: 'https://example.com/v1',
    },
    userscript: { grant: ['GM_getResourceURL'] },
  });
  const run = () =>
    project.build({
      build: { write: false, minify: true },
      plugins,
    });
  for (const name of ['a', 'b']) {
    await fs.writeFile(
      path.join(root, 'lazy.js'),
      `import url from './${name}.png'; export default url;`,
    );
    const result = await run();
    const output = buildOutput(result);
    assert.equal(output.filter((x) => x.type === 'chunk').length, 1);
    const script = userScript(result);
    assert.equal(
      script.code.match(/@resource\s/g)?.length,
      1,
      script.code.slice(-2200),
    );
    assert.match(script.code, /@grant\s+GM_getResourceURL/);
    const completed = Promise.withResolvers<string>();
    const context = vm.createContext({
      console,
      URL,
      setTimeout,
      done: completed.resolve,
      fail: completed.reject,
      GM_getResourceURL: (key: string) => `blob:https://example.com/${key}`,
    });
    context.self = context;
    vm.runInContext(script.code, context);
    assert.match(
      await completed.promise,
      new RegExp(`^blob:https://example.com/${name}-`),
    );
  }
});
test('explicit JS and CSS URL imports remain external assets', async ({
  project,
}) => {
  const { root } = project;
  const sources = ['export const answer = 42;', 'body{color:red}\n'];
  await fs.writeFile(path.join(root, 'payload.js'), sources[0]);
  await fs.writeFile(path.join(root, 'payload.css'), sources[1]);
  await fs.writeFile(
    path.join(root, 'main.js'),
    `import js from './payload.js?url'; import css from './payload.css?url'; globalThis.result = [js, css];`,
  );
  const result = await project.build({
    plugins: [
      monkey({
        entry: 'main.js',
        output: {},
        assets: {
          publicPath: 'https://example.com/',
        },
      }),
    ],
  });
  const output = buildOutput(result);
  const script = userScript(result);
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
    const asset:
      | import('vite').Rolldown.OutputAsset
      | import('vite').Rolldown.OutputChunk
      | undefined = output.find(
      (item) => item.type === 'asset' && item.fileName === name,
    );
    assert.ok(asset?.type === 'asset');
    assert.equal(asset.source.toString(), sources[index]);
    assert.equal(context.result[index], `blob:https://songe.li/${name}`);
    assert.ok(script.code.includes(`https://example.com/${name}`));
  }
  assert.equal(script.code.match(/@resource\s/g)?.length, 2);
});
test('rejects invalid bases and conflicting resource declarations', async ({
  project,
}) => {
  const { root } = project;
  for (const assetsBaseUrl of [
    '/relative/',
    'file:///tmp/',
    'https://example.com/?x=1',
  ]) {
    await assert.rejects(
      createContext(
        {
          entry: 'main.js',
          output: {},
          assets: {
            publicPath: assetsBaseUrl,
          },
        },
        process.cwd(),
      ),
    );
  }
  await fs.writeFile(
    path.join(root, 'main.js'),
    `import image from './a.png'; console.log(image);`,
  );
  await fs.writeFile(path.join(root, 'a.png'), 'image');
  await assert.rejects(
    project.build({
      build: {
        write: false,
        rolldownOptions: {
          output: { assetFileNames: 'assets/a b[extname]' },
        },
      },
      plugins: [
        monkey({
          entry: 'main.js',
          output: {},
          assets: {
            publicPath: 'https://example.com/',
          },
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
      project.build({
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
            output: {},
            assets: {
              publicPath: 'https://example.com/',
            },
          }),
        ],
      }),
      /Conflicting resource|remove grant|grants.mode/,
    );
  }
});
test('explicit inline/raw imports and extracted CSS preserve their contracts', async ({
  project,
}) => {
  const { root } = project;
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
  const result = await project.build({
    plugins: [
      monkey({
        entry: 'main.js',
        output: {},
        assets: {
          publicPath: 'https://example.com/',
        },
      }),
    ],
  });
  const script = userScript(result);
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
});

for (const variant of [
  'default',
  'string',
  'function',
  'array-default',
  'array-custom',
] as const) {
  test('resource asset naming: ' + variant, async ({ project }) => {
    const { root } = project;
    await fs.writeFile(path.join(root, 'image.png'), 'image');
    await fs.writeFile(
      path.join(root, 'main.js'),
      "import image from './image.png'; globalThis.image=image;",
    );
    const custom =
      variant === 'string' ||
      variant === 'function' ||
      variant === 'array-custom';
    const output =
      variant === 'array-default'
        ? [{}]
        : variant === 'array-custom'
          ? [{ assetFileNames: 'custom/[name][extname]' }]
          : variant === 'function'
            ? { assetFileNames: () => 'custom/[name][extname]' }
            : variant === 'string'
              ? { assetFileNames: 'custom/[name][extname]' }
              : undefined;
    const result = await project.build({
      build: { write: false, rolldownOptions: { output } },
      plugins: [
        monkey({
          entry: 'main.js',
          assets: {
            publicPath:
              'https://github.com/owner/repo/releases/download/v1.0.0/',
          },
        }),
      ],
    });
    const assets = buildOutput(result).filter((item) => item.type === 'asset');
    assert.equal(assets.length, 1);
    if (custom) assert.equal(assets[0].fileName, 'custom/image.png');
    else assert.match(assets[0].fileName, /^image-[^/]+\.png$/);
    const script = userScript(result);
    assert.ok(
      script.code.includes(
        'https://github.com/owner/repo/releases/download/v1.0.0/' +
          assets[0].fileName,
      ),
    );
  });
}
