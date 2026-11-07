import assert from 'node:assert/strict';
import vm from 'node:vm';
import { test } from 'vitest';
import {
  compileModules,
  chunkModuleId,
} from '../../src/node/modules/compile.ts';
import { createModuleRegistry } from '../../src/node/modules/runtime.ts';
import { bundleModules } from '../../src/node/modules/bundle.ts';

async function bundle(
  sources: Record<string, string>,
  entry: string,
  globals: Record<string, unknown> = {},
) {
  const compiled = Object.fromEntries(
    Object.entries(await compileModules(new Map(Object.entries(sources)))).map(
      ([name, code]) => [chunkModuleId(name), code],
    ),
  );
  const registry = createModuleRegistry(async (id) => {
    vm.runInContext(compiled[id], context);
  });
  const context = vm.createContext({
    ...globals,
    __monkeyRegister: registry.register,
  });
  return () => registry.importModule(chunkModuleId(entry));
}

test('module factories request only the helpers their code uses', async () => {
  const sources = {
    'empty.js': `globalThis.answer = 42;`,
    'static.js': `import './empty.js';`,
    'dynamic.js': `import('./empty.js');`,
    'export.js': `export const answer = 42;`,
    'combined.js': `import './empty.js'; export const load = () => import('./export.js');`,
    'collision.js': `events.push(typeof publish); export const answer = 42;`,
  };
  const compiled = await compileModules(new Map(Object.entries(sources)));
  for (const [id, parameters] of Object.entries({
    'empty.js': '',
    'static.js': '',
    'dynamic.js': '{ acquire }',
    'export.js': '{ publish }',
    'combined.js': '{ acquire, publish }',
    'collision.js': '{ publish: publish1 }',
  })) {
    assert.ok(compiled[id].includes(`function*(${parameters})`), compiled[id]);
    // Worker chunks are parsed as standalone classic scripts.
    new vm.Script(compiled[id]);
  }
  const events: string[] = [];
  const run = await bundle(sources, 'collision.js', { events });
  assert.equal((await run()).answer, 42);
  assert.deepEqual(events, ['undefined']);
});

test('side-effect imports keep execution order alongside imports and re-exports from the same module', async () => {
  const sources = {
    'entry.js': `import './effect.js'; import './value.js';
      import { value } from './value.js'; export { value as forwarded } from './value.js';
      events.push(value);`,
    'effect.js': `events.push('effect');`,
    'value.js': `events.push('value'); export const value = 42;`,
    'observer.js': `import { forwarded } from './entry.js'; capture(forwarded);`,
  };
  const compiled = await compileModules(new Map(Object.entries(sources)));
  assert.ok(compiled['entry.js'].includes('["./effect.js","./value.js"]'));
  assert.doesNotMatch(compiled['entry.js'], /linkage\(0\)/);
  assert.equal(compiled['entry.js'].match(/linkage\(1\)/g)?.length, 2);
  const events: unknown[] = [];
  const script = await bundleModules(
    new Map(Object.entries(sources)),
    'observer.js',
    {},
  );
  let forwarded: unknown;
  assert.equal(
    vm.runInNewContext(script, {
      events,
      capture(value: unknown) {
        forwarded = value;
      },
    }),
    undefined,
  );
  assert.deepEqual(events, ['effect', 'value', 42]);
  assert.equal(forwarded, 42);
});

test('package IDs stay distinct from root-relative chunks across nested imports', async () => {
  const sources = new Map([
    [
      'pages/main.js',
      `import { value as external } from '@vue/runtime-dom';
       import { value as internal } from '../@vue/runtime-dom';
       export const values = [external, internal];
       export const load = () => import('../lazy/answer.js');
       capture({ values, load });`,
    ],
    ['@vue/runtime-dom', `export const value = 2;`],
    [
      'lazy/answer.js',
      `import { value } from '../@vue/runtime-dom'; export const answer = value + 40;`,
    ],
  ]);
  const script = await bundleModules(sources, 'pages/main.js', {
    '@vue/runtime-dom': 'Vue',
  });
  assert.ok(script.includes('.set("@vue/runtime-dom",'));
  assert.ok(script.includes('enroll("./pages/main.js",'));
  assert.ok(script.includes('["@vue/runtime-dom","./@vue/runtime-dom"]'));
  assert.ok(script.includes('linkage(0)'));
  assert.ok(script.includes('linkage(1)'));
  assert.ok(script.includes('acquire("./lazy/answer.js"'));
  assert.doesNotMatch(script, /\\u0000external:/);
  const ready = Promise.withResolvers<{
    values: number[];
    load(): Promise<{ answer: number }>;
  }>();
  assert.equal(
    vm.runInNewContext(script, { Vue: { value: 1 }, capture: ready.resolve }),
    undefined,
  );
  const entry = await ready.promise;
  assert.deepEqual(Array.from(entry.values), [1, 2]);
  const lazy = await entry.load();
  assert.equal(lazy.answer, 42);
  assert.equal(await entry.load(), lazy);
});

test.for(
  [false, true].flatMap((standalone) =>
    ['', 'await Promise.resolve();'].map((prefix) => ({ standalone, prefix })),
  ),
)(
  'factories retain strict mode with destructured parameters: %j',
  async ({ standalone, prefix }) => {
    const ready = Promise.withResolvers<{
      receiver(): unknown;
      write(): void;
    }>();
    const sources = {
      'entry.js': `${prefix} export function receiver() { return this; } export function write() { missingGlobal = 1; } ready({ receiver, write });`,
    };
    const script = await bundleModules(
      new Map(Object.entries(sources)),
      'entry.js',
      {},
    );
    assert.equal(script.match(/"use strict"/g)?.length, 1);
    const run = standalone
      ? await bundle(sources, 'entry.js', { ready: ready.resolve })
      : () => {
          assert.equal(
            vm.runInNewContext(script, { ready: ready.resolve }),
            undefined,
          );
          return ready.promise;
        };
    const { receiver, write } = (await run()) as {
      receiver(): unknown;
      write(): void;
    };
    assert.equal(receiver(), undefined);
    assert.throws(write, { name: 'ReferenceError' });
  },
);

test('static import metadata is omitted for named, default, namespace and re-exports', async () => {
  const sources = {
    'entry.js': `import value, { answer } from './value.js';
      import * as namespace from './value.js';
      import './effect.js';
      export { answer as forwarded } from './value.js';
      export const result = [value, answer, namespace.answer];`,
    'value.js': `export default 1; export const answer = 42;`,
    'effect.js': `events.push('effect');`,
  };
  const compiled = await compileModules(new Map(Object.entries(sources)));
  assert.doesNotMatch(compiled['entry.js'], /importedNames/);
  assert.ok(compiled['entry.js'].includes('["./value.js","./effect.js"]'));
  assert.equal(compiled['entry.js'].match(/linkage\(0\)/g)?.length, 3);
  const events: string[] = [];
  const run = await bundle(sources, 'entry.js', { events });
  const entry = await run();
  assert.deepEqual(Array.from(entry.result as number[]), [1, 42, 42]);
  assert.equal(entry.forwarded, 42);
  assert.deepEqual(events, ['effect']);
});

test('module registry links hoisted functions before evaluating a cycle', async () => {
  const run = await bundle(
    {
      'a.js': `import { result } from './b.js'; export function answer() { return 42; } export { result };`,
      'b.js': `import { answer } from './a.js'; export const result = answer();`,
    },
    'a.js',
  );
  assert.equal((await run()).result, 42);
});

test.each(['const value = 42', 'let value = 42', 'class value {}'])(
  'cyclic reads of uninitialized exports reject: %s',
  async (declaration) => {
    const sources = {
      'entry.js': `import './reader.js'; export ${declaration};`,
      'reader.js': `import { value } from './entry.js'; events.push(value);`,
    };
    const events: unknown[] = [];
    const run = await bundle(sources, 'entry.js', { events });
    await assert.rejects(run(), { name: 'ReferenceError' });
    assert.deepEqual(events, []);

    const script = await bundleModules(
      new Map(Object.entries(sources)),
      'entry.js',
      {},
    );
    assert.throws(() => vm.runInNewContext(script, { events }), {
      name: 'ReferenceError',
    });
    assert.deepEqual(events, []);
  },
);

test('cyclic var exports are undefined before assignment and live afterwards', async () => {
  const events: unknown[] = [];
  const run = await bundle(
    {
      'entry.js': `import './reader.js'; export var value = 42; export function update() { value = 43; } export { read } from './reader.js';`,
      'reader.js': `import { value } from './entry.js'; events.push(value); export function read() { return value; }`,
    },
    'entry.js',
    { events },
  );
  const entry = (await run()) as { read(): number; update(): void };
  assert.deepEqual(events, [undefined]);
  assert.equal(entry.read(), 42);
  entry.update();
  assert.equal(entry.read(), 43);
});

test('TDZ errors propagate through re-exports and remain catchable by user code', async () => {
  const events: string[] = [];
  const run = await bundle(
    {
      'entry.js': `import './reader.js'; export let value = 42; export function update() { value++; } export { read } from './reader.js';`,
      'forward.js': `export { value as forwarded } from './entry.js';`,
      'reader.js': `import { forwarded } from './forward.js'; try { events.push(forwarded); } catch (error) { events.push(error.name); } export function read() { return forwarded; }`,
    },
    'entry.js',
    { events },
  );
  const entry = (await run()) as { read(): number; update(): void };
  assert.deepEqual(events, ['ReferenceError']);
  assert.equal(entry.read(), 42);
  entry.update();
  assert.equal(entry.read(), 43);
});

test('module registry retains live bindings, shadowing and unbound calls', async () => {
  const run = await bundle(
    {
      'a.js': `export let count = 0; export function add() { return ++count; } export function receiver() { return this; }`,
      'b.js': `import { count, add, receiver } from './a.js'; export function run(count) { add(); return [count, receiver(), receiver?.(), receiver\`tag\`]; } export function read() { return { count }; }`,
    },
    'b.js',
  );
  const entry = (await run()) as {
    run(count: number): unknown[];
    read(): { count: number };
  };
  assert.deepEqual(Array.from(entry.run(99)), [
    99,
    undefined,
    undefined,
    undefined,
  ]);
  assert.equal(entry.read().count, 1);
});

test('a waiting async dependency does not block its synchronous sibling', async () => {
  const gate = Promise.withResolvers<void>();
  const started = Promise.withResolvers<void>();
  const sibling = Promise.withResolvers<void>();
  const events: string[] = [];
  const run = await bundle(
    {
      'entry.js': `import './waiting.js'; import './sibling.js'; events.push('entry');`,
      'waiting.js': `events.push('waiting'); started(); await gate; events.push('resolved');`,
      'sibling.js': `events.push('sibling'); sibling();`,
    },
    'entry.js',
    {
      events,
      gate: gate.promise,
      started: started.resolve,
      sibling: sibling.resolve,
    },
  );
  const done = run();
  await Promise.all([started.promise, sibling.promise]);
  assert.deepEqual(events, ['waiting', 'sibling']);
  gate.resolve();
  await done;
  assert.deepEqual(events, ['waiting', 'sibling', 'resolved', 'entry']);
});

test.for([undefined, null, '', false])(
  'module registry caches failed dynamic evaluation throwing %s',
  async (failure) => {
    const calls: string[] = [];
    const run = await bundle(
      {
        'entry.js': `export const load = () => import('./fail.js');`,
        'fail.js': `calls.push('execute'); throw failure;`,
      },
      'entry.js',
      { calls, failure },
    );
    const entry = (await run()) as { load(): Promise<unknown> };
    for (let i = 0; i < 2; i++) {
      const result = await Promise.resolve()
        .then(() => entry.load())
        .then(
          () => ({ ok: true }),
          (error) => ({ error }),
        );
      assert.deepEqual(result, { error: failure });
    }
    assert.deepEqual(calls, ['execute']);
  },
);

test('module registry preserves top-level for-await across static dependencies', async () => {
  const run = await bundle(
    {
      'entry.js': `import { total } from './values.js'; export { total };`,
      'values.js': `export let total = 0; for await (const value of [Promise.resolve(20), 22]) total += value;`,
    },
    'entry.js',
  );
  assert.equal((await run()).total, 42);
});

test('compiler reports unresolved and computed imports', async () => {
  await assert.rejects(
    compileModules(new Map([['entry.js', `import('./missing.js');`]])),
    /Unresolved/,
  );
  await assert.rejects(
    compileModules(new Map([['entry.js', `import(globalThis.target);`]])),
    /statically known/,
  );
});
