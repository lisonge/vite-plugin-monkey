import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { mergeConfig } from 'vite';
import type { InlineConfig, Rolldown } from 'vite';
import monkey from '../../src/node/index.ts';
import type { MonkeyOptions } from '../../src/node/types.ts';
import { test } from '../support/fixture.ts';
import {
  nextBuild,
  buildOutput,
  userScript,
  type TestProject,
} from '../support/project.ts';

const publicPath = 'https://example.com/releases/v1/';
async function buildWorker(
  project: TestProject,
  options: Partial<MonkeyOptions> = {},
  config: InlineConfig = {},
) {
  const result = await project.build(
    mergeConfig(
      {
        plugins: [
          monkey({
            entry: 'main.js',
            output: { script: 'worker.user.js' },
            assets: { publicPath },
            ...options,
          }),
        ],
      },
      config,
    ),
  );
  const output = buildOutput(result);
  const script = userScript(result);
  assert.doesNotMatch(script.code, /__MONKEY_WORKER_(?:GRAPH|URL)__/);
  return { output, script };
}

const resources = (code: string) =>
  new Map(
    [...code.matchAll(/@resource\s+(\S+)\s+(\S+)/g)].map((match) => [
      match[1],
      match[2],
    ]),
  );

test.for([
  [
    'sharedworker query',
    `import W from './worker.js?sharedworker'; new W();`,
    /SharedWorker is not supported/,
  ],
  [
    'sharedworker URL',
    `new SharedWorker(new URL('./worker.js', import.meta.url));`,
    /SharedWorker is not supported/,
  ],
  [
    'worker URL export',
    `import url from './worker.js?worker&url'; console.log(url);`,
    /worker&url/,
  ],
  [
    'nested query',
    `import W from './worker.js?worker'; new W();`,
    /Nested Workers/,
  ],
  [
    'nested constructor',
    `import W from './worker.js?worker'; new W();`,
    /Nested Workers/,
  ],
  [
    'GM import',
    `import W from './worker.js?worker'; new W();`,
    /GM APIs are not available/,
  ],
] as const)(
  'rejects unsupported Worker boundary: %s',
  async ([name, main, error], { project }) => {
    const worker =
      name === 'nested query'
        ? `import Child from './child.js?worker'; new Child();`
        : name === 'nested constructor'
          ? `new Worker(new URL('./child.js', import.meta.url));`
          : name === 'GM import'
            ? `import { GM_getValue } from '$'; postMessage(GM_getValue('answer'));`
            : 'self.onmessage = () => self.postMessage(42);';
    await project.write({
      'main.js': main,
      'worker.js': worker,
      'child.js': 'postMessage(1);',
    });
    await assert.rejects(buildWorker(project), error);
  },
);

test('resource Workers require permissions while inline Workers permit grant none', async ({
  project,
}) => {
  await project.write({
    'main.js': `import W from './worker.js?worker'; globalThis.worker = new W();`,
    'worker.js': `self.onmessage = () => self.postMessage(42);`,
  });
  await assert.rejects(
    buildWorker(project, { userscript: { grant: 'none' } }),
    /require.*GM_getResourceURL|remove grant/,
  );
  const { output, script } = await buildWorker(project, {
    userscript: { grant: 'none' },
    assets: {},
  });
  assert.match(script.code, /@grant\s+none/);
  assert.equal(resources(script.code).size, 0);
  assert.deepEqual(
    output.map((item) => item.fileName),
    ['worker.user.js'],
  );
});

test('Worker publicDir URL and import resources retain bytes and metadata', async ({
  project,
}) => {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg"><text>public</text></svg>';
  await project.write({
    'main.js': `import W from './worker.js?worker'; new W();`,
    'worker.js': `import imported from '/public.svg?url'; self.onmessage = () => self.postMessage([imported, new URL('/public.svg', import.meta.url).href]);`,
    'public/public.svg': svg,
  });
  const { output, script } = await buildWorker(project);
  assert.equal(
    resources(script.code).get('public.svg'),
    publicPath + 'public.svg',
  );
  const asset = output.find((item) => item.fileName === 'public.svg');
  assert.ok(asset?.type === 'asset');
  assert.equal(Buffer.from(asset.source).toString(), svg);
  const workerCode = output
    .filter((item) => item.type === 'asset')
    .filter((item) => item.fileName.endsWith('.system.js'))
    .map((item) => item.source.toString())
    .join('\n');
  assert.match(workerCode, /__MONKEY_WORKER_ASSET_URL__/);
  assert.doesNotMatch(
    workerCode,
    /__MONKEY_WORKER_ASSET_START__|__VITE_PUBLIC_ASSET__/,
  );
});

test('Worker assets distinguish emitted filenames containing # from URL fragments', async ({
  project,
}) => {
  const emittedName = 'media/图#标.svg';
  const svg = '<svg xmlns="http://www.w3.org/2000/svg"><g id="icon"/></svg>';
  await project.write({
    'main.js': `import W from './worker.js?worker'; new W();`,
    'worker.js': `
      import emitted from './picture.svg';
      import publicAsset from '/public.svg?url';
      self.postMessage([
        emitted,
        new URL('./picture.svg#symbol', import.meta.url).href,
        publicAsset,
        new URL('/public.svg#symbol', import.meta.url).href,
      ]);
    `,
    'picture.svg': svg,
    'public/public.svg': svg,
  });
  const { output, script } = await buildWorker(
    project,
    {},
    {
      worker: {
        rolldownOptions: { output: { assetFileNames: () => emittedName } },
      },
    },
  );
  const metadata = resources(script.code);
  assert.equal(
    metadata.get(emittedName),
    publicPath + 'media/' + encodeURIComponent('图#标.svg'),
  );
  assert.equal(metadata.get('public.svg'), publicPath + 'public.svg');
  assert.equal(metadata.size, 3);
  for (const name of [emittedName, 'public.svg']) {
    const asset = output.find((item) => item.fileName === name);
    assert.ok(asset?.type === 'asset');
    assert.equal(Buffer.from(asset.source).toString(), svg);
  }
  const modules = output.filter(
    (item) => item.type === 'asset' && item.fileName.endsWith('.system.js'),
  );
  assert.equal(modules.length, 1);
  const worker = modules[0];
  assert.ok(worker.type === 'asset');
  const names: string[] = [];
  let result: string[] = [];
  let execute: (() => void | Promise<void>) | undefined;
  vm.runInNewContext(Buffer.from(worker.source).toString(), {
    URL,
    __MONKEY_WORKER_ASSET_URL__(name: string) {
      names.push(name);
      assert.ok(name === emittedName || name === 'public.svg');
      return name === emittedName
        ? 'blob:https://example.test/emitted'
        : 'blob:https://example.test/public';
    },
    self: {
      postMessage(values: string[]) {
        result = Array.from(values);
      },
    },
    System: {
      register(
        imports: string[],
        declare: (
          exports: () => void,
          context: { meta: { url: string } },
        ) => { execute: () => void | Promise<void> },
      ) {
        assert.equal(imports.length, 0);
        execute = declare(() => {}, {
          meta: { url: 'blob:https://example.test/worker' },
        }).execute;
      },
    },
  });
  assert.ok(execute);
  await execute();
  assert.deepEqual(new Set(names), new Set([emittedName, 'public.svg']));
  assert.deepEqual(result, [
    'blob:https://example.test/emitted',
    'blob:https://example.test/emitted#symbol',
    'blob:https://example.test/public',
    'blob:https://example.test/public#symbol',
  ]);
});

test.for(['iife', 'es'] as const)(
  'preserves custom worker naming and split modules with worker.format %s',
  async (format, { project }) => {
    await project.write({
      'main.js': `import W from './worker.js?worker'; new W();`,
      'worker.js': `import picture from './picture.svg'; self.onmessage = async () => self.postMessage([picture, (await import('./lazy.js')).answer]);`,
      'lazy.js': `export const answer = await Promise.resolve(42);`,
      'picture.svg': '<svg xmlns="http://www.w3.org/2000/svg"/>',
    });
    const { output, script } = await buildWorker(
      project,
      {},
      {
        worker: {
          format,
          rolldownOptions: {
            output: {
              entryFileNames: 'workers/[name]-[hash].mjs',
              chunkFileNames: 'chunks/[name]-[hash].mjs',
              assetFileNames: () => 'media/[name]-[hash][extname]',
            },
          },
        },
        build: { minify: 'oxc' },
      },
    );
    const metadata = resources(script.code);
    assert.equal(metadata.size, 3);
    for (const directory of ['workers/', 'chunks/', 'media/']) {
      const filename = [...metadata.keys()].find((name) =>
        name.startsWith(directory),
      );
      assert.ok(filename, `Missing ${directory}`);
      assert.equal(metadata.get(filename), publicPath + filename);
      assert.ok(output.some((item) => item.fileName === filename));
    }
    assert.match(script.code, /@grant\s+GM_getResourceURL/);
  },
);

test('shared entry inline/regular imports and main-thread assets are not removed or duplicated', async ({
  project,
}) => {
  await project.write({
    'main.js': `import W from './worker.js?worker'; import Inline from './worker.js?worker&inline'; import picture from './picture.svg'; globalThis.probes = [new W(), new Inline(), picture];`,
    'worker.js': `import picture from './picture.svg'; self.onmessage = async () => self.postMessage([picture, (await import('./lazy.js')).answer]);`,
    'lazy.js': `export const answer = 42;`,
    'picture.svg': '<svg xmlns="http://www.w3.org/2000/svg"/>',
  });
  const { output, script } = await buildWorker(project);
  const metadata = resources(script.code);
  const files = output.filter((item) => item.type === 'asset');
  assert.equal(
    files.filter((item) => item.fileName.endsWith('.svg')).length,
    1,
  );
  assert.equal(
    files.filter((item) => item.fileName.endsWith('.system.js')).length,
    2,
  );
  assert.equal(metadata.size, 3);
  assert.equal([...script.code.matchAll(/@resource\s/g)].length, 3);
  for (const file of files)
    assert.equal(metadata.get(file.fileName), publicPath + file.fileName);
});

test(
  'watch refreshes public Worker assets and drops removed Worker resources',
  { timeout: 20_000 },
  async ({ project }) => {
    const { root } = project;
    await project.write({
      'main.js': `import W from './worker.js?worker'; globalThis.worker = new W();`,
      'worker.js': `import picture from '/a.svg?url'; self.onmessage = () => self.postMessage(picture);`,
      'public/a.svg': '<svg>first</svg>',
      'public/b.svg': '<svg>second</svg>',
    });
    let output: Rolldown.OutputBundle = {};
    const watcher = await project.build({
      build: { watch: {}, write: true },
      plugins: [
        monkey({
          entry: 'main.js',
          output: { script: 'worker.user.js' },
          assets: { publicPath },
        }),
        {
          name: 'capture-worker-output',
          writeBundle(_, bundle) {
            output = bundle;
          },
        },
      ],
    });

    const script = () => {
      const item = output['worker.user.js'];
      assert.ok(item?.type === 'chunk');
      return item.code;
    };
    await nextBuild(watcher);
    assert.ok(resources(script()).has('a.svg'));
    const changedAsset = nextBuild(watcher);
    await fs.writeFile(path.join(root, 'public/a.svg'), '<svg>changed</svg>');
    await changedAsset;
    const asset = output['a.svg'];
    assert.ok(asset?.type === 'asset');
    assert.equal(Buffer.from(asset.source).toString(), '<svg>changed</svg>');
    const changedImport = nextBuild(watcher);
    await fs.writeFile(
      path.join(root, 'worker.js'),
      `import picture from '/b.svg?url'; self.onmessage = () => self.postMessage(picture);`,
    );
    await changedImport;
    assert.ok(!resources(script()).has('a.svg'));
    assert.ok(resources(script()).has('b.svg'));
    assert.ok(!output['a.svg']);
    const removedWorker = nextBuild(watcher);
    await fs.writeFile(path.join(root, 'main.js'), `console.log('no worker');`);
    await removedWorker;
    assert.equal(resources(script()).size, 0);
    assert.doesNotMatch(script(), /GM_getResourceURL/);
    assert.deepEqual(Object.keys(output), ['worker.user.js']);
  },
);
