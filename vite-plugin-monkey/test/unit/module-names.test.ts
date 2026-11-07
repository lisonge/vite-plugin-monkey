import assert from 'node:assert/strict';
import vm from 'node:vm';
import { test } from 'vitest';
import { wrapChunk } from '../../src/node/modules/wrap.ts';
import { bundleModules } from '../../src/node/modules/bundle.ts';

const render = (
  mode: string,
  code: string,
  globals: Record<string, string> = { lib: 'Library' },
) =>
  mode === 'wrapper'
    ? wrapChunk(code, '', globals)
    : bundleModules(new Map([['entry.js', code]]), 'entry.js', globals);

test.each(['wrapper', 'registry'])(
  '%s derives readable import variables from package and module names',
  async (mode) => {
    for (const [specifier, expected] of [
      ['vue', 'vue'],
      ['@vue/runtime-dom', 'vue_runtime_dom'],
      ['lodash-es', 'lodash_es'],
      ['3d-viewer', '_3d_viewer'],
      ['./utils/math.js', 'utils_math_js'],
      ['@scope/pkg/subpath', 'scope_pkg_subpath'],
      ['@vue//runtime--__dom__', 'vue_runtime_dom'],
      ['class', 'class1'],
      ['eval', 'eval1'],
    ]) {
      const code = await render(
        mode,
        `import { answer } from ${JSON.stringify(specifier)}; globalThis.answer = answer;`,
        { [specifier]: 'Library' },
      );
      assert.ok(code);
      assert.ok(code.includes(`${expected}.answer`), code);
      const context = vm.createContext({ Library: { answer: 42 } });
      vm.runInContext(code, context);
      assert.equal(context.answer, 42);
    }
  },
);

test.each(['wrapper', 'registry'])(
  '%s uses decimal suffixes to separate normalized imports and user names',
  async (mode) => {
    const code = await render(
      mode,
      `
      import { answer as first } from 'a-b';
      import { answer as second } from 'a_b';
      globalThis.reserved = [typeof a_b, ${Array.from({ length: 10 }, (_, index) => `typeof a_b${index}`).join(',')}];
      globalThis.result = [first, second];
    `,
      { 'a-b': 'First', a_b: 'Second' },
    );
    assert.ok(code);
    assert.match(code, /\ba_b10\.answer\b/);
    assert.match(code, /\ba_b11\.answer\b/);
    const context = vm.createContext({
      First: { answer: 1 },
      Second: { answer: 2 },
    });
    vm.runInContext(code, context);
    assert.deepEqual(Array.from(context.result), [1, 2]);
    assert.deepEqual(Array.from(context.reserved), Array(11).fill('undefined'));
  },
);

test.each(['wrapper', 'registry'])(
  '%s adds a suffix only for a binding collision after underscore normalization',
  async (mode) => {
    const code = await render(
      mode,
      `
      import { answer as first } from 'a-b';
      import { answer as second } from '@a//__b';
      const a_bHelper = 3;
      globalThis.result = [first, second, a_bHelper];
    `,
      { 'a-b': 'First', '@a//__b': 'Second' },
    );
    assert.ok(code);
    assert.match(code, /\ba_b\.answer\b/);
    assert.match(code, /\ba_b1\.answer\b/);
    const context = vm.createContext({
      First: { answer: 1 },
      Second: { answer: 2 },
    });
    vm.runInContext(code, context);
    assert.deepEqual(Array.from(context.result), [1, 2, 3]);
  },
);

test.each(['wrapper', 'registry'])(
  '%s avoids ordinary helper words without capturing user calls',
  async (mode) => {
    const code = await render(
      mode,
      `
      import { answer } from 'lib';
      const facade = 7, lib0 = 8, principal = 9;
      const { linkage } = { linkage: 10 };
      globalThis.result = [answer, facade, lib0, principal, linkage,
        typeof acquire, typeof relay, typeof provenance,
        typeof catalogue, typeof enroll, publish('user')];
      globalThis.shadow = lib1 => answer + lib1;
    `,
    );
    assert.ok(code);
    const context = vm.createContext({
      Library: { answer: 42 },
      publish: (value: string) => value,
    });
    vm.runInContext(code, context);
    assert.deepEqual(Array.from(context.result), [
      42,
      7,
      8,
      9,
      10,
      ...Array(5).fill('undefined'),
      'user',
    ]);
    assert.equal(context.shadow(1), 43);
  },
);

test.each(['wrapper', 'registry'])(
  '%s avoids declared and free Vite helper names',
  async (mode) => {
    const code = await render(
      mode,
      `
    import { answer } from 'lib';
    const __vite_ssr_import_0__ = 7;
    const __vite_ssr_exports__ = 8;
    globalThis.result = [answer, __vite_ssr_import_0__, __vite_ssr_exports__,
      typeof __vite_ssr_import__, typeof __vite_ssr_exportName__,
      typeof __vite_ssr_dynamic_import__, typeof __vite_ssr_exportAll__,
      typeof __vite_ssr_import_meta__, typeof __vite_ssr_export_default__];
    globalThis.shadow = (__vite_ssr_import_0__) => answer + __vite_ssr_import_0__;
  `,
    );
    assert.ok(code);
    const context = vm.createContext({ Library: { answer: 42 } });
    vm.runInContext(code, context);
    assert.deepEqual(Array.from(context.result), [
      42,
      7,
      8,
      ...Array(6).fill('undefined'),
    ]);
    assert.equal(context.shadow(1), 43);
  },
);

test.each(['wrapper', 'registry'])(
  '%s preserves escaped names, strings and public import names',
  async (mode) => {
    const code = await render(
      mode,
      String.raw`
    import { __vite_ssr_import__ as value } from 'lib';
    const \u005f_vite_ssr_import_0__ = 9;
    const object = { __vite_ssr_import_0__ };
    globalThis.result = [value, object.__vite_ssr_import_0__,
      '__vite_ssr_import__', '\u005f_vite_ssr_import__',
      typeof \u005f_vite_ssr_exports__];
  `,
    );
    assert.ok(code);
    const context = vm.createContext({ Library: { __vite_ssr_import__: 42 } });
    vm.runInContext(code, context);
    assert.deepEqual(Array.from(context.result), [
      42,
      9,
      '__vite_ssr_import__',
      '__vite_ssr_import__',
      'undefined',
    ]);
  },
);

test('registry locals do not shadow free references across chunks or global expressions', async () => {
  const code = await bundleModules(
    new Map([
      [
        'entry.js',
        `import './other.js'; import { answer } from 'lib'; globalThis.answer = answer;`,
      ],
      [
        'other.js',
        String.raw`globalThis.types = [typeof register, typeof reg\u0069stry, typeof registry1, typeof enroll, typeof catalog\u0075e, typeof catalogue1]; globalThis.read = () => [register, registry, enroll, catalogue];`,
      ],
    ]),
    'entry.js',
    { lib: 'catalogue.library' },
  );
  const registry = { library: { answer: 42 } };
  const context = vm.createContext({
    register: 'original',
    registry,
    enroll: 'enroll global',
    catalogue: registry,
  });
  vm.runInContext(code, context);
  assert.deepEqual(Array.from(context.types), [
    'string',
    'object',
    'undefined',
    'string',
    'object',
    'undefined',
  ]);
  assert.deepEqual(Array.from(context.read()), [
    'original',
    registry,
    'enroll global',
    registry,
  ]);
  assert.equal(context.answer, 42);
});

test('public exports and dynamic imports retain names resembling Vite helpers', async () => {
  const code = await bundleModules(
    new Map([
      [
        'entry.js',
        `globalThis.load = () => import('./__vite_ssr_import__.js');`,
      ],
      [
        '__vite_ssr_import__.js',
        `const __vite_ssr_export_default__ = 7; const principal = 8; export { __vite_ssr_export_default__, principal }; export default 42;`,
      ],
    ]),
    'entry.js',
    {},
  );
  const context = vm.createContext({});
  vm.runInContext(code, context);
  const namespace = await context.load();
  assert.equal(namespace.default, 42);
  assert.equal(namespace.__vite_ssr_export_default__, 7);
  assert.equal(namespace.principal, 8);
});

test('missing runtime-like globals remain missing and global writes keep their target', async () => {
  const code = await bundleModules(
    new Map([
      [
        'entry.js',
        `
    globalThis.types = [typeof register, typeof registry];
    globalThis.read = () => register;
    globalThis.write = value => { register = value; };
  `,
      ],
    ]),
    'entry.js',
    {},
  );
  const context = vm.createContext({});
  vm.runInContext(code, context);
  assert.deepEqual(Array.from(context.types), ['undefined', 'undefined']);
  assert.throws(() => context.read(), { name: 'ReferenceError' });
  assert.throws(() => context.write(42), { name: 'ReferenceError' });
  context.register = 1;
  context.write(42);
  assert.equal(context.register, 42);
});
