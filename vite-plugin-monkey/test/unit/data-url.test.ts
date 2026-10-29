import assert from 'node:assert/strict';
import vm from 'node:vm';
import { test, expectTypeOf } from 'vitest';
import { scriptDataUrl } from '../../src/node/index.ts';

test('undefined arguments preserve position, count and function defaults', () => {
  const values: unknown[] = [];
  const url = scriptDataUrl(
    function (a = 'default', b?: number, c?: unknown) {
      console.log(a, b, c, arguments.length);
    },
    undefined,
    2,
    undefined,
  );
  vm.runInNewContext(decodeURIComponent(url.slice(url.indexOf(',') + 1)), {
    console: { log: (...args: unknown[]) => values.push(...args) },
  });
  assert.deepEqual(values, ['default', 2, undefined, 3]);
});
test.each([
  () => 1,
  Symbol('value'),
  1n,
  { nested: () => 1 },
  [Symbol('nested')],
])('unsupported serialized argument %# fails at generation', (value) => {
  assert.throws(
    () => scriptDataUrl((input: unknown) => input, value),
    /JSON-serializable/,
  );
});
test('circular arguments fail at generation', () => {
  const value: { self?: unknown } = {};
  value.self = value;
  assert.throws(
    () => scriptDataUrl((input: unknown) => input, value),
    /circular/i,
  );
});

test('source data URLs preserve Unicode and URL-sensitive characters', () => {
  const source = 'console.log("中文 # % ?");';
  assert.equal(decodeURIComponent(scriptDataUrl(source).split(',')[1]), source);
});

test('function data URLs return a string and serialize arguments', () => {
  const messages: unknown[] = [];
  const value = { text: 'quote " and newline\n', number: 42 };
  const url = scriptDataUrl((input: typeof value) => console.log(input), value);
  expectTypeOf(url).toEqualTypeOf<string>();
  assert.equal(typeof url, 'string');
  const code = decodeURIComponent(
    url.slice('data:application/javascript,'.length),
  );
  vm.runInNewContext(code, {
    console: { log: (input: unknown) => messages.push(input) },
  });
  assert.equal(JSON.stringify(messages), JSON.stringify([value]));
});
