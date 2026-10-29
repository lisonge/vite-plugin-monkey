import assert from 'node:assert/strict';
import vm from 'node:vm';
import { test } from '../support/fixture.ts';

test('a resource loader is a bundled browser module, including dynamic import semantics', async ({
  project,
}) => {
  await project.write({
    'node_modules/fixture-data/package.json': JSON.stringify({
      name: 'fixture-data',
      version: '1.0.0',
      main: 'data.bin',
    }),
    'node_modules/fixture-data/data.bin': 'not JavaScript',
    'loader.js': `import { GM_getResourceText } from '$'; export default ({resourceName}) => GM_getResourceText(resourceName).toUpperCase();`,
    'main.js': `import('fixture-data').then(m=>globalThis.done(m.default));`,
  });
  const result = await project.buildScript({
    dependencies: {
      'fixture-data': {
        kind: 'resource',
        url: 'https://example.test/data.bin',
        loader: { entry: './loader.js' },
      },
    },
  });
  const done = Promise.withResolvers<string>();
  vm.runInNewContext(result.code, {
    GM_getResourceText: () => 'hello',
    done: done.resolve,
  });
  assert.equal(await done.promise, 'HELLO');
  assert.match(
    result.code,
    /@resource\s+fixture-data\s+https:\/\/example.test\/data.bin/,
  );
  assert.match(result.code, /@grant\s+GM_getResourceText/);
});

test.for(['dom', false] as const)(
  'CSS injection %s does not require GM_addStyle',
  async (inject, { project }) => {
    await project.write({
      'main.js': `import './style.css'; globalThis.loaded=true;`,
      'style.css': 'body { color: red; }',
    });
    const result = await project.buildScript({
      userscript: { grant: 'none' },
      css: { inject },
    });
    assert.match(result.code, /@grant\s+none/);
    assert.doesNotMatch(result.code, /GM_addStyle/);
  },
);

test('none rejects APIs discovered in production', async ({ project }) => {
  await project.write({
    'main.js': `import {GM_getValue} from '$'; globalThis.answer=GM_getValue('answer');`,
  });
  await assert.rejects(
    project.buildScript({ userscript: { grant: 'none' } }),
    /userscript.grant none conflicts/,
  );
});

test('application objects with API suffixes do not require grants', async ({
  project,
}) => {
  await project.write({
    'main.js': `
      const myGM = { getValue() { return globalThis.seed; } };
      const custom_GM = { deleteValue() { return globalThis.seed + 1; } };
      const otherwindow = { close() { return globalThis.seed + 2; } };
      globalThis.services = [myGM, custom_GM, otherwindow];
      globalThis.result = [myGM.getValue(), custom_GM.deleteValue(), otherwindow.close()];
    `,
  });
  const result = await project.buildScript({ userscript: { grant: 'none' } });
  assert.match(result.code, /@grant\s+none/);
  const context = vm.createContext({ seed: 40 });
  vm.runInContext(result.code, context);
  assert.deepEqual(Array.from(context.result), [40, 41, 42]);
});

test.for([false, true])(
  'local GM parameters do not require permissions with minify=%s',
  async (minify, { project }) => {
    await project.write({
      'main.js': `
    globalThis.read = function (GM, GM_getValue, name) {
      return [GM.getValue(), GM[name](), GM_getValue()];
    };
  `,
    });
    const result = await project.buildScript(
      { userscript: { grant: 'none' } },
      { build: { minify } },
    );
    assert.match(result.code, /@grant\s+none/);
    const context = vm.createContext({});
    vm.runInContext(result.code, context);
    assert.deepEqual(
      Array.from(context.read({ getValue: () => 1 }, () => 2, 'getValue')),
      [1, 1, 2],
    );
  },
);

test.for([false, true])(
  'redeclared GM aliases require grants with minify=%s',
  async (minify, { project }) => {
    await project.write({
      'main.js':
        'var api = GM; var api; globalThis.value = api.getValue("key");',
    });
    await assert.rejects(
      project.buildScript(
        { userscript: { grant: 'none' } },
        { build: { minify } },
      ),
      /GM.getValue/,
    );
    const result = await project.buildScript({}, { build: { minify } });
    assert.match(result.code, /@grant\s+GM.getValue/);
  },
);

test('dynamic API lookup requires explicit permissions', async ({
  project,
}) => {
  await project.write({
    'main.js':
      "import {GM} from '$'; globalThis.result=GM[globalThis.method]('key');",
  });
  await assert.rejects(project.buildScript(), /Cannot detect permissions/);
  const result = await project.buildScript({
    userscript: { grant: ['GM.getValue'] },
  });
  assert.match(result.code, /@grant\s+GM.getValue/);
});
test.for([false, true])(
  'literal API lookup is detected with minify=%s',
  async (minify, { project }) => {
    await project.write({
      'main.js':
        "import {GM} from '$'; globalThis.result=GM['getValue']('key');",
    });
    assert.match(
      (await project.buildScript({}, { build: { minify } })).code,
      /@grant\s+GM.getValue/,
    );
  },
);

test('static async resource loader resolves before its importer runs', async ({
  project,
}) => {
  await project.write({
    'node_modules/fixture-data/package.json': JSON.stringify({
      name: 'fixture-data',
      version: '1.0.0',
      main: 'data.bin',
    }),
    'node_modules/fixture-data/data.bin': 'data',
    'loader.js': 'export default async () => 42;',
    'main.js': "import value from 'fixture-data'; globalThis.done(value);",
  });
  const result = await project.buildScript({
    dependencies: {
      'fixture-data': {
        kind: 'resource',
        url: 'https://example.test/data',
        loader: { entry: './loader.js' },
      },
    },
  });
  const done = Promise.withResolvers<number>();
  vm.runInNewContext(result.code, { done: done.resolve });
  assert.equal(await done.promise, 42);
});
