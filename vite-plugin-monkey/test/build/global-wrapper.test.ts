import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs/promises';
import path from 'node:path';
import { test } from '../support/fixture.ts';
import type { TestProject } from '../support/project.ts';

const dependencies = {
  'external-library': {
    kind: 'global' as const,
    global: 'FixtureLib',
    urls: ['https://example.test/library.js'],
  },
};
const noRegistry = (code: string) => {
  assert.doesNotMatch(code, /Missing module registration|Unknown module:/);
  assert.match(code, /@require\s+https:\/\/example.test\/library.js/);
};

const outputCases = ['wrapper', 'registry'].flatMap((mode) =>
  ([false, true, 'terser'] as const).map((minify) => ({ mode, minify })),
);

async function buildGlobals(
  project: TestProject,
  mode: string,
  minify: false | true | 'terser',
) {
  if (minify === 'terser') await project.linkDependencies(['terser']);
  if (mode === 'registry') {
    await project.write({ 'lazy.js': 'export const answer = 42;' });
    await fs.appendFile(
      path.join(project.root, 'main.js'),
      `\nglobalThis.loadExtra = () => import('./lazy.js');`,
    );
  }
  const script = await project.buildScript(
    { dependencies },
    { build: { minify } },
  );
  if (mode === 'wrapper') noRegistry(script.code);
  else assert.match(script.code, /Missing module registration/);
  return script;
}

test.for(outputCases)(
  'named globals keep live reads, scopes, unbound calls and synchronous startup: %j',
  async ({ mode, minify }, { project }) => {
    await project.write({
      'main.js': `
        import { count, increment, receiver } from 'external-library';
        const FixtureLib = 'local';
        events.push('entry');
        globalThis.read = () => count;
        globalThis.increment = () => increment();
        globalThis.call = () => [receiver(), receiver?.(), receiver\`tag\`];
        globalThis.captureTag = () => receiver\`tag\${replaceReceiver()}\`;
        globalThis.shadow = (count) => ({ count, FixtureLib });
      `,
    });
    const script = await buildGlobals(project, mode, minify);
    const events: string[] = [];
    const library = {
      count: 1,
      increment() {
        library.count++;
      },
      receiver: function (this: unknown) {
        'use strict';
        return this;
      },
    };
    const context = vm.createContext({
      events,
      FixtureLib: library,
      replaceReceiver() {
        library.receiver = () => 'changed';
      },
    });
    const tick = Promise.resolve().then(() => events.push('microtask'));
    vm.runInContext(script.code, context);
    assert.deepEqual(events, ['entry']);
    assert.equal(context.read(), 1);
    context.increment();
    assert.equal(context.read(), 2);
    library.count = 3;
    assert.equal(context.read(), 3);
    assert.deepEqual(Array.from(context.call()), [
      undefined,
      undefined,
      undefined,
    ]);
    assert.equal(context.shadow(99).count, 99);
    assert.equal(context.shadow(99).FixtureLib, 'local');
    assert.equal(context.captureTag(), undefined);
    assert.equal(library.receiver(), 'changed');
    await tick;
    assert.deepEqual(events, ['entry', 'microtask']);
  },
);

test.for(outputCases)(
  'default and namespace globals preserve values without mutation: %j',
  async ({ mode, minify }, { project }) => {
    await project.write({
      'main.js': `
      import value, { default as alias } from 'external-library';
      import * as first from 'external-library';
      import * as second from 'external-library';
      const Object = 'local Object', Reflect = 'local Reflect';
      globalThis.read = () => [value, alias, first.default, first === second];
      globalThis.namespace = first;
      globalThis.locals = [Object, Reflect];
    `,
    });
    const script = await buildGlobals(project, mode, minify);
    const symbol = Symbol('export');
    for (const value of [
      42,
      null,
      undefined,
      Object.freeze({ answer: 42, [symbol]: 7 }),
      { default: 7, answer: 42 },
      Object.freeze(function answer() {
        return 42;
      }),
    ]) {
      const keys = Reflect.ownKeys(Object(value));
      let reads = 0;
      const context = vm.createContext({
        get FixtureLib() {
          reads++;
          return value;
        },
      });
      vm.runInContext(script.code, context);
      assert.equal(reads, 1);
      const expected =
        value != null && 'default' in Object(value)
          ? (value as { default: number }).default
          : value;
      assert.deepEqual(Array.from(context.read()), [
        expected,
        expected,
        expected,
        true,
      ]);
      assert.deepEqual(Array.from(context.locals), [
        'local Object',
        'local Reflect',
      ]);
      assert.deepEqual(Reflect.ownKeys(Object(value)), keys);
      if (value && typeof value === 'object' && 'default' in value) {
        value.default = 8;
        value.answer = 43;
        assert.deepEqual(Array.from(context.read()), [8, 8, 8, true]);
        assert.equal(context.namespace.answer, 43);
      }
      if (value && Object.hasOwn(Object(value), symbol))
        assert.equal(context.namespace[symbol], 7);
    }
  },
);

test('default import functions stay callable without mutating a frozen global', async ({
  project,
}) => {
  await project.write({
    'main.js': `import answer from 'external-library'; globalThis.answer = answer();`,
  });
  const script = await project.buildScript({ dependencies });
  noRegistry(script.code);
  const value = Object.freeze(function (this: unknown) {
    'use strict';
    assert.equal(this, undefined);
    return 42;
  });
  const context = vm.createContext({ FixtureLib: value });
  vm.runInContext(script.code, context);
  assert.equal(context.answer, 42);
  assert.equal(Object.hasOwn(value, 'default'), false);
});

test.for([false, true])(
  'global imports do not introduce an await before user code: minify=%s',
  async (minify, { project }) => {
    await project.write({
      'main.js': `import { answer } from 'external-library'; events.push(answer); await gate; events.push('after'); done();`,
    });
    const script = await project.buildScript(
      { dependencies },
      { build: { minify } },
    );
    noRegistry(script.code);
    const events: unknown[] = [];
    const gate = Promise.withResolvers<void>();
    const done = Promise.withResolvers<void>();
    vm.runInNewContext(script.code, {
      events,
      gate: gate.promise,
      done: done.resolve,
      FixtureLib: { answer: 42 },
    });
    assert.deepEqual(events, [42]);
    gate.resolve();
    await done.promise;
    assert.deepEqual(events, [42, 'after']);
  },
);

test('global import failures and user errors remain synchronous', async ({
  project,
}) => {
  await project.write({
    'main.js': `import { answer } from 'external-library'; answer(); throw new Error('user error');`,
  });
  const script = await project.buildScript({ dependencies });
  noRegistry(script.code);
  assert.throws(
    () => vm.runInNewContext(script.code, {}),
    /FixtureLib is not defined/,
  );
  assert.throws(
    () => vm.runInNewContext(script.code, { FixtureLib: { answer() {} } }),
    /user error/,
  );
});

test('side-effect imports keep require metadata without reading an unused global', async ({
  project,
}) => {
  await project.write({
    'main.js': `import 'external-library'; globalThis.answer = 42;`,
  });
  const script = await project.buildScript({ dependencies });
  noRegistry(script.code);
  const context = vm.createContext({
    get FixtureLib() {
      throw new Error('unused global');
    },
  });
  vm.runInContext(script.code, context);
  assert.equal(context.answer, 42);
});
