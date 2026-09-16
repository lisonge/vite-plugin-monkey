import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import { parseSync } from 'vite';
import type { Rolldown } from 'vite';
import { collectGrant } from '../src/node/utils/grant.ts';
import { getProgramImportNodes } from '../src/node/utils/others.ts';
import {
  transformTlaToIdentifier,
  transformIdentifierToTla,
} from '../src/node/utils/topLevelAwait.ts';

const context = {
  parse: (code: string) => parseSync('fixture.js', code).program,
} as Rolldown.PluginContext;
const chunk = (code: string) =>
  ({ type: 'chunk', code, modules: {} }) as Rolldown.OutputChunk;

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
    [...collectGrant(context, [chunk(code)], undefined, false)].sort(),
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

test('restored for-await wrapper executes to completion', async () => {
  const output = chunk(
    `(function () { globalThis.result = _TLA_FOR((async () => { for await (const x of [1, 2]) { globalThis.sum = (globalThis.sum || 0) + x; } })()); })()`,
  );
  transformIdentifierToTla(context, output, '_TLA_');
  const sandbox = vm.createContext({});
  await vm.runInContext(output.code, sandbox);
  assert.equal(sandbox.sum, 3);
});
