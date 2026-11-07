import assert from 'node:assert/strict';
import vm from 'node:vm';
import type { InlineConfig, Rolldown } from 'vite';
import { test } from '../support/fixture.ts';

const cases = [false, true].flatMap((split) =>
  [false, true].map((minify) => ({ split, minify })),
);

test('external global bindings are available during synchronous startup', async ({
  project,
}) => {
  await project.write({
    'main.js': `import { answer } from 'fixture-lib'; events.push(answer());`,
    'node_modules/fixture-lib/package.json':
      '{"name":"fixture-lib","version":"1.0.0","main":"index.js"}',
    'node_modules/fixture-lib/index.js':
      'throw new Error("must remain external");',
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
  const events: number[] = [];
  vm.runInNewContext(script.code, { events, FixtureLib: { answer: () => 42 } });
  assert.deepEqual(events, [42]);
});

test.for([false, true])(
  'terser options and synchronous startup survive final compression: split=%s',
  async (split, { project }) => {
    await project.linkDependencies(['terser']);
    await project.write({
      'main.js': `import './effect.js'; console.log('remove this'); globalThis.answer = 42;`,
      'effect.js': `globalThis.effect = true;`,
    });
    const script = await project.buildScript(
      {},
      {
        build: {
          minify: 'terser',
          terserOptions: {
            maxWorkers: 1,
            compress: { drop_console: true },
            mangle: false,
          },
          rolldownOptions: { output: split ? { preserveModules: true } : {} },
        },
      },
    );
    const context = vm.createContext({});
    vm.runInContext(script.code, context);
    assert.equal(context.answer, 42);
    assert.equal(context.effect, true);
    assert.doesNotMatch(script.code, /remove this/);
  },
);
function capture(split: boolean, minify: boolean) {
  let chunks: Rolldown.OutputChunk[] = [];
  const config: InlineConfig = {
    build: {
      minify,
      rolldownOptions: { output: split ? { preserveModules: true } : {} },
    },
    plugins: [
      {
        name: 'capture-intermediate-chunks',
        generateBundle: {
          order: 'pre',
          handler(_, bundle) {
            chunks = Object.values(bundle).filter(
              (item) => item.type === 'chunk',
            );
          },
        },
      },
    ],
  };
  return { config, chunks: () => chunks };
}

test.for(cases)(
  'synchronous startup, bindings and dependency order: %j',
  async ({ split, minify }, { project }) => {
    await project.write({
      'main.js': `import { value, increment } from './value.js'; import './effect.js'; increment(); events.push('entry:' + value);`,
      'value.js': `events.push('value'); export let value = 1; export function increment() { value++; }`,
      'effect.js': `events.push('effect');`,
    });
    const probe = capture(split, minify);
    const script = await project.buildScript({}, probe.config);
    assert.equal(probe.chunks().length, split ? 3 : 1);
    const events: string[] = [];
    const tick = Promise.resolve().then(() => events.push('microtask'));
    vm.runInNewContext(script.code, { events });
    assert.deepEqual(events, ['value', 'effect', 'entry:2']);
    await tick;
    assert.deepEqual(events, ['value', 'effect', 'entry:2', 'microtask']);
    if (!split)
      assert.doesNotMatch(
        script.code,
        /__vite_ssr_|Missing module registration/,
      );
  },
);

test.for(cases)(
  'synchronous startup throws before returning: %j',
  async ({ split, minify }, { project }) => {
    await project.write({
      'main.js': `import './effect.js'; throw new Error('startup failed');`,
      'effect.js': `events.push('effect');`,
    });
    const probe = capture(split, minify);
    const script = await project.buildScript({}, probe.config);
    assert.equal(probe.chunks().length, split ? 2 : 1);
    const events: string[] = [];
    assert.throws(
      () => vm.runInNewContext(script.code, { events }),
      /startup failed/,
    );
    assert.deepEqual(events, ['effect']);
  },
);

test.for([false, true])(
  'single chunk runs before its first top-level await: minify=%s',
  async (minify, { project }) => {
    await project.write({
      'main.js': `events.push('before'); await gate; events.push('after'); done();`,
    });
    const script = await project.buildScript({}, { build: { minify } });
    const gate = Promise.withResolvers<void>();
    const done = Promise.withResolvers<void>();
    const events: string[] = [];
    vm.runInNewContext(script.code, {
      events,
      gate: gate.promise,
      done: done.resolve,
    });
    assert.deepEqual(events, ['before']);
    gate.resolve();
    await done.promise;
    assert.deepEqual(events, ['before', 'after']);
  },
);

test('static chunk cycles link hoisted functions and execute synchronously', async ({
  project,
}) => {
  await project.write({
    'main.js': `import { result } from './a.js'; events.push(result);`,
    'a.js': `import { result } from './b.js'; export function answer() { return 42; } export { result };`,
    'b.js': `import { answer } from './a.js'; export const result = answer();`,
  });
  const probe = capture(true, false);
  const script = await project.buildScript({}, probe.config);
  assert.equal(probe.chunks().length, 3);
  const events: number[] = [];
  vm.runInNewContext(script.code, { events });
  assert.deepEqual(events, [42]);
});

test('static async chunk waits without blocking an independent sibling', async ({
  project,
}) => {
  await project.write({
    'main.js': `import './waiting.js'; import './sibling.js'; events.push('entry'); done();`,
    'waiting.js': `events.push('waiting'); await gate; events.push('resolved');`,
    'sibling.js': `events.push('sibling'); sibling();`,
  });
  const probe = capture(true, false);
  const script = await project.buildScript({}, probe.config);
  assert.equal(probe.chunks().length, 3);
  const gate = Promise.withResolvers<void>();
  const sibling = Promise.withResolvers<void>();
  const done = Promise.withResolvers<void>();
  const events: string[] = [];
  vm.runInNewContext(script.code, {
    events,
    gate: gate.promise,
    sibling: sibling.resolve,
    done: done.resolve,
  });
  await sibling.promise;
  assert.deepEqual(events, ['waiting', 'sibling']);
  gate.resolve();
  await done.promise;
  assert.deepEqual(events, ['waiting', 'sibling', 'resolved', 'entry']);
});

test('default splitting keeps dynamic code separate and its evaluation deferred', async ({
  project,
}) => {
  await project.write({
    'main.js': `events.push('entry'); globalThis.load = () => import('./lazy.js');`,
    'lazy.js': `events.push('lazy'); export const answer = 42;`,
  });
  const probe = capture(false, false);
  const script = await project.buildScript({}, probe.config);
  assert.equal(probe.chunks().length, 2);
  const events: string[] = [];
  const context = vm.createContext({ events });
  vm.runInContext(script.code, context);
  assert.deepEqual(events, ['entry']);
  const first = context.load();
  const second = context.load();
  assert.deepEqual(events, ['entry']);
  assert.equal(await first, await second);
  assert.deepEqual(events, ['entry', 'lazy']);
});

test('CSS injection precedes synchronous entry execution without a module runtime', async ({
  project,
}) => {
  await project.write({
    'main.js': `import './style.css'; events.push('entry');`,
    'style.css': 'body { color: red; }',
  });
  const script = await project.buildScript();
  const events: string[] = [];
  vm.runInNewContext(script.code, {
    events,
    GM_addStyle: () => events.push('css'),
  });
  assert.deepEqual(events, ['css', 'entry']);
  assert.doesNotMatch(script.code, /__vite_ssr_|Missing module registration/);
});

test.for(
  [false, true].flatMap((css) =>
    [false, true].flatMap((polyfill) =>
      [false, true].map((minify) => ({ css, polyfill, minify })),
    ),
  ),
)(
  'the real entry starts after its CSS and polyfill dependencies: %j',
  async ({ css, polyfill, minify }, { project }) => {
    await project.write({
      'main.js': `${css ? "import './style.css';" : ''}
        import './effect.js'; events.push('entry');
        globalThis.load = () => import('./lazy.js');`,
      'effect.js': `events.push('effect');`,
      'lazy.js': `events.push('lazy'); export const answer = 42;`,
      'style.css': 'body { color: red; }',
    });
    const polyfillId = '\0vite/legacy-polyfills';
    const script = await project.buildScript(
      {},
      {
        plugins: polyfill
          ? [
              {
                name: 'test-polyfill-entry',
                buildStart() {
                  this.emitFile({
                    type: 'chunk',
                    id: polyfillId,
                    fileName: 'polyfills.js',
                  });
                },
                resolveId(id) {
                  if (id === polyfillId) return id;
                },
                load(id) {
                  if (id === polyfillId) return `events.push('polyfill');`;
                },
              },
            ]
          : [],
        build: {
          minify,
          rolldownOptions: {
            output: {
              preserveModules: true,
              entryFileNames: 'nested/[name].js',
            },
          },
        },
      },
    );
    assert.doesNotMatch(script.code, /virtual:monkey-entry/);
    if (!minify) assert.match(script.code, /\.start\("\.\/nested\/main.js"\)/);
    const events: string[] = [];
    const context = vm.createContext({
      events,
      GM_addStyle: () => events.push('css'),
    });
    const expected = [
      ...(polyfill ? ['polyfill'] : []),
      ...(css ? ['css'] : []),
      'effect',
      'entry',
    ];
    vm.runInContext(script.code, context);
    assert.deepEqual(events, expected);
    const lazy = await context.load();
    assert.equal(lazy.answer, 42);
    assert.equal(await context.load(), lazy);
    assert.deepEqual(events, [...expected, 'lazy']);
  },
);
