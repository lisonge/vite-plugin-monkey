import assert from 'node:assert/strict';
import vm from 'node:vm';
import { test } from 'vitest';
import { wrapChunk } from '../../src/node/modules/wrap.ts';
import { bundleModules } from '../../src/node/modules/bundle.ts';

const renderers = {
  wrapper: (code: string, globals: Record<string, string>) =>
    wrapChunk(code, '', globals),
  registry: (code: string, globals: Record<string, string>) =>
    bundleModules(new Map([['entry.js', code]]), 'entry.js', globals),
};

test.each(['wrapper', 'registry'] as const)(
  '%s: shared namespace adapters preserve evaluation order, live bindings and helper name isolation',
  async (mode) => {
    const code = await renderers[mode](
      `import first from 'first'; import * as firstNamespace from 'first';
       import second from 'second'; import * as secondNamespace from 'second';
       events.push('entry');
       globalThis.read = () => [first, firstNamespace.value, second, secondNamespace.value, typeof assimilate, typeof assimilate1];`,
      {
        first: `assimilate.lookup('first')`,
        second: `assimilate.lookup('second')`,
      },
    );
    assert.ok(code);
    assert.equal(code.match(/Reflect\.ownKeys/g)?.length, 1);
    const events: string[] = [];
    const first = { default: 'initial', value: 1 };
    const second = { value: 2 };
    const libraries = { first, second };
    const globals = Object.fromEntries(
      Object.entries(libraries).map(([name, value]) => [
        name,
        new Proxy(value, {
          ownKeys(target) {
            events.push('wrap:' + name);
            return Reflect.ownKeys(target);
          },
        }),
      ]),
    );
    const context = vm.createContext({
      events,
      assimilate: {
        lookup(name: string) {
          events.push('lookup:' + name);
          return globals[name];
        },
      },
    });
    vm.runInContext(code, context);
    assert.deepEqual(events, [
      'lookup:first',
      'wrap:first',
      'lookup:second',
      'wrap:second',
      'entry',
    ]);
    assert.deepEqual(Array.from(context.read()), [
      'initial',
      1,
      globals.second,
      2,
      'object',
      'undefined',
    ]);
    first.default = 'updated';
    first.value = 3;
    second.value = 4;
    assert.deepEqual(Array.from(context.read()), [
      'updated',
      3,
      globals.second,
      4,
      'object',
      'undefined',
    ]);
    assert.deepEqual(Object.keys(first), ['default', 'value']);
    assert.deepEqual(Object.keys(second), ['value']);
  },
);

test.each(['wrapper', 'registry'] as const)(
  '%s: namespace member calls and tags retain their namespace receiver',
  async (mode) => {
    const code = await renderers[mode](
      `
    import * as namespace from 'lib';
    globalThis.namespace = namespace;
    globalThis.result = [namespace.receiver(), namespace.receiver\`tag\`];
  `,
      { lib: 'FixtureLib' },
    );
    assert.ok(code);
    const context = vm.createContext({
      FixtureLib: {
        receiver() {
          return this;
        },
      },
    });
    vm.runInContext(code, context);
    assert.equal(context.result[0], context.namespace);
    assert.equal(context.result[1], context.namespace);
  },
);

test.each(['wrapper', 'registry'] as const)(
  '%s: repeated static imports evaluate one global expression and share a namespace',
  async (mode) => {
    const code = await renderers[mode](
      `
    import value from 'lib';
    import { answer } from 'lib';
    import * as first from 'lib';
    import * as second from 'lib';
    globalThis.result = [value, answer, first === second];
  `,
      { lib: 'lookup()' },
    );
    assert.ok(code);
    const library = { answer: 42 };
    let reads = 0;
    const context = vm.createContext({
      lookup() {
        reads++;
        return library;
      },
    });
    vm.runInContext(code, context);
    assert.deepEqual(Array.from(context.result), [library, 42, true]);
    assert.equal(reads, 1);
  },
);

test.each([
  `import { answer } from 'unknown'; console.log(answer);`,
  `import { answer } from 'lib'; import('lib');`,
  `import { answer } from 'lib'; export { answer };`,
])('module graphs stay on the registry path: %s', async (code) => {
  assert.equal(await wrapChunk(code, '', { lib: 'FixtureLib' }), undefined);
});
