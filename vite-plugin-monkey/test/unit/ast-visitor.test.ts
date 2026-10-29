import assert from 'node:assert/strict';
import { test } from 'vitest';
import vm from 'node:vm';
import { parseSync } from 'vite';
import type { Rolldown } from 'vite';
import { collectGrant } from '../../src/node/permissions/detect.ts';
import { getProgramImportNodes } from '../../src/node/utils/others.ts';
import {
  transformTlaToIdentifier,
  transformIdentifierToTla,
} from '../../src/node/utils/topLevelAwait.ts';
const context = {
  parse: (code, options) => parseSync('fixture.js', code, options).program,
} as Rolldown.PluginContext;
const chunk = (code: string) =>
  ({ type: 'chunk', code, modules: {} }) as Rolldown.OutputChunk;
test('local, hoisted and nested bindings do not request GM permissions', () => {
  const code = `
    function read(GM, GM_getValue, name) { GM[name](); return GM_getValue(); }
    function hoisted() { GM.getValue(); var GM; }
    { GM.getValue(); const GM = {}; }
    try {} catch (GM) { GM.getValue(); }
    const local = function GM_getValue() { return GM_getValue(); };
    const GM = {}; GM.getValue();
  `;
  assert.deepEqual([...collectGrant(context, [chunk(code)], undefined)], []);
});
test('renamed GM imports and guarded aliases retain their permissions', () => {
  const code = `
    import { GM as api, GM_setValue as save } from '$';
    api.getValue('key'); save('key', 1);
    const generated = (() => typeof GM !== 'undefined' ? GM : undefined)();
    generated.deleteValue('key');
  `;
  assert.deepEqual(
    [...collectGrant(context, [chunk(code)], undefined)].sort(),
    ['GM.deleteValue', 'GM.getValue', 'GM_setValue'].sort(),
  );
});
test('grant traversal distinguishes references from bindings and property names', () => {
  const code = `
    const object = { GM_deleteValue: 1 };
    object.GM_listValues;
    const { GM_setValue } = object;
    function GM_getTabs(GM_openInTab = GM_getValue) { return GM_info; }
    const shorthand = { GM_getResourceText };
    const computed = { [GM_getResourceURL]: true };
    object[GM_addStyle];
    GM.setValue('key', 1);
    monkeyWindow.GM_xmlhttpRequest({});
  `;
  assert.deepEqual(
    [...collectGrant(context, [chunk(code)], undefined)].sort(),
    [
      'GM.setValue',
      'GM_getValue',
      'GM_info',
      'GM_getResourceText',
      'GM_getResourceURL',
      'GM_addStyle',
      'GM_xmlhttpRequest',
    ].sort(),
  );
});
test('import traversal handles literal and static template imports', () => {
  const nodes = getProgramImportNodes(
    context.parse(
      `import a from 'a'; import('b'); import(\`c\`); import(name); import(\`d\${name}\`);`,
    ),
  );
  assert.deepEqual(
    nodes.map((n) => n.value),
    ['a', 'b', 'c'],
  );
});
test('grant members match exact API objects and their generated aliases', () => {
  const code = `
    myGM.getValue('key');
    custom_GM.deleteValue('key');
    otherwindow.close();
    othermonkeyWindow.focus();
    const _GM = (() => typeof GM !== 'undefined' ? GM : undefined)();
    const _monkeyWindow = (() => window)();
    _GM['setValue']('key', 1);
    GM.getValues(['key']);
    _monkeyWindow.close();
    monkeyWindow['focus']();
    window.onurlchange = () => {};
    (() => typeof GM !== 'undefined' ? GM : undefined)().getValue('key');
    (() => window)().GM_getValue('key');
  `;
  assert.deepEqual(
    [...collectGrant(context, [chunk(code)], undefined)].sort(),
    [
      'GM.setValue',
      'GM.getValues',
      'GM.getValue',
      'GM_getValue',
      'window.close',
      'window.focus',
      'window.onurlchange',
    ].sort(),
  );
});
test('redeclared var aliases retain provenance and static blocks isolate var bindings', () => {
  for (const code of [
    'var api = GM; var api; api.getValue();',
    'var api; var api = GM; api.getValue();',
    'class Example { static { var GM = {}; GM.getValue(); } } GM.getValue();',
  ])
    assert.deepEqual(
      [...collectGrant(context, [chunk(code)], undefined)],
      ['GM.getValue'],
    );
  assert.deepEqual(
    [
      ...collectGrant(
        context,
        [chunk('_GM.getValue(); _monkeyWindow.close(); _GM[name]();')],
        undefined,
      ),
    ],
    [],
  );
});
test('top-level await traversal leaves nested function awaits unchanged', () => {
  const source = chunk(`
    const x = await Promise.resolve(1);
    async function f() { return await Promise.resolve(2); }
    const g = async () => await Promise.resolve(3);
    class C { async method() { return await Promise.resolve(4); } }
    for await (const item of []) { console.log(item); }
  `);
  const result = transformTlaToIdentifier(context, source, '_TLA_');
  assert.ok(result);
  assert.equal(result.code.match(/_TLA_\(/g)?.length, 1);
  assert.equal(result.code.match(/_TLA_FOR/g)?.length, 1);
  assert.equal(result.code.match(/return await/g)?.length, 2);
  assert.match(result.code, /=> await Promise/);
});
test('restored await preserves member, call and tagged-template precedence', async () => {
  const output = chunk(`(function () {
    globalThis.result = [
      _TLA_(Promise.resolve({ value: 7 })).value,
      _TLA_(Promise.resolve(() => 8))(),
      _TLA_(Promise.resolve(() => 9))\`tag\`,
      _TLA_(Promise.resolve({ value: 10 }))?.value
    ];
  })()`);
  transformIdentifierToTla(context, output, '_TLA_');
  const sandbox = vm.createContext({});
  await vm.runInContext(output.code, sandbox);
  assert.deepEqual(Array.from(sandbox.result), [7, 8, 9, 10]);
});
test.each([
  '(async () => 42)()',
  '(Promise.resolve({ value: 41 })).then(({ value }) => value + 1)',
  '(async () => 42)`tag`',
  '(null ?? (async () => 42))?.()',
  '(Promise.resolve(42))',
  '/* operand */ (async () => 42)()',
  'Promise.resolve(await (async () => 42)())',
])('top-level await round-trip preserves operand %s', async (expression) => {
  const transformed = transformTlaToIdentifier(
    context,
    chunk(
      `const value = await ${expression}; globalThis.result = [value, typeof value];`,
    ),
    '_TLA_',
  );
  assert.ok(transformed);
  const output = chunk(`(function () { ${transformed.code} })()`);
  transformIdentifierToTla(context, output, '_TLA_');
  const sandbox = vm.createContext({});
  await vm.runInContext(output.code, sandbox);
  assert.deepEqual(Array.from(sandbox.result), [42, 'number']);
});
test('restored for-await wrapper executes to completion', async () => {
  const output = chunk(
    `(function () { globalThis.result = _TLA_FOR((async () => { for await (const x of [1, 2]) { globalThis.sum = (globalThis.sum || 0) + x; } })()); })()`,
  );
  transformIdentifierToTla(context, output, '_TLA_');
  const sandbox = vm.createContext({});
  await vm.runInContext(output.code, sandbox);
  assert.equal(sandbox.sum, 3);
});

test('import traversal ignores empty and computed sources but visits nested imports', () => {
  const nodes = getProgramImportNodes(
    context.parse(
      [
        "import ''; import(''); import(``); import(42); import(null);",
        "import('prefix' + name); import(`prefix${name}`);",
        "import(import('nested')); function load() { return import('inside'); }",
      ].join('\n'),
    ),
  );
  assert.deepEqual(
    nodes.map(({ value }) => value),
    ['nested', 'inside'],
  );
});
