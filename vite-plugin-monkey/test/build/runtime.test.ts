import assert from 'node:assert/strict';
import vm from 'node:vm';
import { test } from '../support/fixture.ts';
test('client imports collect grants and call the userscript API', async ({
  project,
}) => {
  await project.write({
    'main.js': `import { GM_getValue, GM_setValue } from '$'; GM_setValue('answer', GM_getValue('seed', 0) + 1);`,
  });
  const script = await project.buildScript();
  const calls: unknown[] = [];
  vm.runInNewContext(script.code, {
    GM_getValue: (key: string, fallback: number) => {
      assert.equal(key, 'seed');
      assert.equal(fallback, 0);
      return 41;
    },
    GM_setValue: (...args: unknown[]) => calls.push(args),
  });
  assert.deepEqual(calls, [['answer', 42]]);
  assert.match(script.code, /@grant\s+GM_getValue/);
  assert.match(script.code, /@grant\s+GM_setValue/);
  assert.doesNotMatch(script.code, /@grant\s+GM_deleteValue/);
});
test.for([false, true])(
  'IIFE top-level await preserves parenthesized calls with minify=%s',
  async (minify, { project }) => {
    await project.write({
      'main.js': `
        const called = await (async () => 42)();
        const chained = await (Promise.resolve({ value: 41 })).then(({ value }) => value + 1);
        const tagged = await (async () => 42)\`tag\`;
        const nested = await Promise.resolve(await (async () => 42)());
        globalThis.done([called, chained, tagged, nested, typeof called]);
      `,
    });
    const script = await project.buildScript({}, { build: { minify } });
    const completed = Promise.withResolvers<unknown[]>();
    await vm.runInNewContext(script.code, { done: completed.resolve });
    assert.deepEqual(Array.from(await completed.promise), [
      42,
      42,
      42,
      42,
      'number',
    ]);
  },
);
test.for([false, true])(
  'dynamic imports and top-level await execute with minify=%s',
  async (minify, { project }) => {
    await project.copy('async');
    const script = await project.buildScript({}, { build: { minify } });
    const completed = Promise.withResolvers<number[]>();
    const context = vm.createContext({
      console,
      setTimeout,
      done: completed.resolve,
    });
    context.self = context;
    vm.runInContext(script.code, context);
    assert.deepEqual(Array.from(await completed.promise), [1, 2, 42, 7, 8]);
  },
);
test.for([false, true])(
  'dynamic imports in a manually split chunk remain lazy and await initialization with minify=%s',
  async (minify, { project }) => {
    await project.write({
      'main.js': `import { run } from './loader.js'; globalThis.ready(run);`,
      'loader.js': `export const run = () => import('./lazy.js');`,
      'lazy.js': `
        globalThis.events.push('start');
        globalThis.started();
        export const answer = await globalThis.wait;
        globalThis.events.push('end');
      `,
    });
    const script = await project.buildScript(
      {},
      {
        build: {
          minify,
          rolldownOptions: {
            output: {
              codeSplitting: {
                groups: [{ name: 'loader', test: /loader\.js$/ }],
              },
            },
          },
        },
      },
    );
    const ready = Promise.withResolvers<() => Promise<{ answer: number }>>();
    const started = Promise.withResolvers<void>();
    const release = Promise.withResolvers<number>();
    const events: string[] = [];
    const context = vm.createContext({
      console,
      setTimeout,
      ready: ready.resolve,
      started: started.resolve,
      wait: release.promise,
      events,
    });
    context.self = context;
    vm.runInContext(script.code, context);
    const run = await ready.promise;
    assert.deepEqual(events, []);
    const lazy = run();
    await started.promise;
    assert.deepEqual(events, ['start']);
    release.resolve(42);
    const namespace = await lazy;
    assert.equal(namespace.answer, 42);
    assert.deepEqual(events, ['start', 'end']);
    assert.equal(await run(), namespace);
    assert.deepEqual(events, ['start', 'end']);
  },
);
test('parenthesized top-level await builds without import or export syntax', async ({
  project,
}) => {
  await project.write({
    'main.js':
      'const value = await (async () => 42)(); globalThis.done([value, typeof value]);',
  });
  const script = await project.buildScript();
  const completed = Promise.withResolvers<unknown[]>();
  await vm.runInNewContext(script.code, { done: completed.resolve });
  assert.deepEqual(Array.from(await completed.promise), [42, 'number']);
});
test('external globals preserve static and dynamic imports without bundling the dependency', async ({
  project,
}) => {
  await project.write({
    'node_modules/fixture-lib/package.json': JSON.stringify({
      name: 'fixture-lib',
      version: '1.2.3',
      type: 'module',
      main: 'index.js',
    }),
    'node_modules/fixture-lib/index.js': `throw new Error('must remain external');`,
    'main.js': `import { answer } from 'fixture-lib'; const lazy = await import('fixture-lib'); globalThis.done([answer(), lazy.answer()]);`,
  });
  const script = await project.buildScript({
    dependencies: {
      'fixture-lib': {
        kind: 'global',
        global: 'FixtureLib',
        urls: ['https://example.test/library.js'],
      },
    },
  });
  const completed = Promise.withResolvers<number[]>();
  const context = vm.createContext({
    console,
    URL,
    setTimeout,
    FixtureLib: { answer: () => 42 },
    done: completed.resolve,
  });
  context.self = context;
  vm.runInContext(script.code, context);
  assert.deepEqual(Array.from(await completed.promise), [42, 42]);
  assert.match(script.code, /@require\s+https:\/\/example.test\/library.js/);
  assert.doesNotMatch(script.code, /must remain external/);
});
test('external CSS, raw, inline and URL resources use the declared GM loaders', async ({
  project,
}) => {
  await project.write({
    'node_modules/fixture-lib/package.json': JSON.stringify({
      name: 'fixture-lib',
      version: '1.2.3',
      main: 'index.js',
    }),
    'node_modules/fixture-lib/index.js': '',
    'node_modules/fixture-lib/style.css': '.fixture { color: red; }',
    'main.js': `import 'fixture-lib/style.css'; import raw from 'fixture-lib/style.css?raw'; import inline from 'fixture-lib/style.css?inline'; import url from 'fixture-lib/style.css?url'; globalThis.result = [raw, inline, url];`,
  });
  const imports = [
    'fixture-lib/style.css',
    'fixture-lib/style.css?raw',
    'fixture-lib/style.css?inline',
    'fixture-lib/style.css?url',
  ];
  const script = await project.buildScript({
    dependencies: Object.fromEntries(
      imports.map((name) => [
        name,
        { kind: 'resource' as const, url: 'https://example.test/style.css' },
      ]),
    ),
  });
  const styles: string[] = [];
  const reads: string[] = [];
  const context = vm.createContext({
    GM_addStyle: (css: string) => styles.push(css),
    GM_getResourceText: (name: string) => {
      reads.push(name);
      return '.fixture { color: red; }';
    },
    GM_getResourceURL: (name: string) => {
      assert.equal(name, imports[3]);
      return 'data:application;base64,YQ==';
    },
  });
  vm.runInContext(script.code, context);
  assert.deepEqual(styles, ['.fixture { color: red; }']);
  assert.deepEqual(reads.sort(), imports.slice(0, 3).sort());
  assert.deepEqual(Array.from(context.result), [
    '.fixture { color: red; }',
    '.fixture { color: red; }',
    'data:text/css;base64,YQ==',
  ]);
  assert.equal(script.code.match(/@resource\s/g)?.length, 4);
});
test('CSS, lazy Sass, empty Sass and style imports preserve their side effects', async ({
  project,
}) => {
  await project.write({
    'main.js': `import './base.css'; import './empty.scss'; import sheet from './sheet.css?style'; await import('./lazy.scss'); globalThis.done([sheet(), sheet()]);`,
    'base.css': '.base { color: red; }',
    'empty.scss': '// empty styles must not break bundling',
    'sheet.css': '.sheet { color: green; }',
    'lazy.scss': '$color: blue; .lazy { color: $color; }',
  });
  const script = await project.buildScript({});
  const styles: string[] = [];
  const completed = Promise.withResolvers<
    {
      textContent: string;
    }[]
  >();
  const context = vm.createContext({
    console,
    setTimeout,
    done: completed.resolve,
    GM_addStyle: (css: string) => styles.push(css),
    document: {
      createElement: (tag: string) => {
        assert.equal(tag, 'style');
        return {
          textContent: '',
        };
      },
    },
  });
  context.self = context;
  vm.runInContext(script.code, context);
  const [first, second] = await completed.promise;
  assert.notEqual(first, second);
  assert.match(first.textContent, /\.sheet\s*\{/);
  assert.equal(first.textContent, second.textContent);
  assert.match(styles.join(''), /\.base\s*\{/);
  assert.match(styles.join(''), /\.lazy\s*\{/);
});
