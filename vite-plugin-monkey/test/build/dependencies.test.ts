import assert from 'node:assert/strict';
import vm from 'node:vm';
import type {
  PackageContext,
  ResourceLoaderContext,
} from '../../src/node/types.ts';
import { test } from '../support/fixture.ts';

test.for(['__proto__', 'constructor', 'toString'])(
  'resource dictionary safely stores %s after dependency collection',
  async (name, { project }) => {
    await project.write({
      'main.js': "import text from 'remote-text'; globalThis.result = text;",
    });
    const result = await project.buildScript({
      dependencies: {
        'remote-text': {
          kind: 'resource',
          name,
          url: 'https://example.test/text',
          loader: 'raw',
        },
      },
    });
    assert.ok(result.code.includes(name));
    const context = vm.createContext({
      GM_getResourceText: (resource: string) => {
        assert.equal(resource, name);
        return 'value';
      },
    });
    vm.runInContext(result.code, context);
    assert.equal(context.result, 'value');
    await assert.rejects(
      project.buildScript({
        userscript: {
          resource: Object.fromEntries([[name, 'https://example.test/other']]),
        },
        dependencies: {
          'remote-text': {
            kind: 'resource',
            name,
            url: 'https://example.test/text',
            loader: 'raw',
          },
        },
      }),
      /Conflicting resource/,
    );
  },
);

test('unused global dependencies never resolve packages or run URL callbacks', async ({
  project,
}) => {
  await project.write({ 'main.js': 'globalThis.answer = 42;' });
  const script = await project.buildScript({
    dependencies: {
      'missing-unused-library': {
        kind: 'global',
        global: 'Unused',
        urls: [
          () => {
            throw new Error('must not run');
          },
        ],
      },
    },
  });
  assert.doesNotMatch(script.code, /@require/);
});

test('SystemJS external namespaces preserve defaults without mutating values', async ({
  project,
}) => {
  await project.write({
    'main.js': `import('external-library').then(globalThis.done);`,
  });
  const script = await project.buildScript({
    dependencies: {
      'external-library': {
        kind: 'global',
        global: 'External',
        urls: ['https://example.test/external.js'],
      },
    },
  });
  for (const value of [
    42,
    null,
    Object.freeze({ answer: 42 }),
    { answer: 42 },
    { default: 7 },
    Object.freeze(function answer() {
      return 42;
    }),
  ]) {
    const before = value == null ? [] : Reflect.ownKeys(Object(value));
    const completed = Promise.withResolvers<{ default: unknown }>();
    const warnings: unknown[] = [];
    const context = vm.createContext({
      URL,
      External: value,
      done: completed.resolve,
      console: { warn: (...args: unknown[]) => warnings.push(args) },
    });
    context.self = context;
    vm.runInContext(script.code, context);
    const namespace = await completed.promise;
    assert.equal(
      namespace.default,
      value && typeof value === 'object' && 'default' in value
        ? value.default
        : value,
    );
    assert.deepEqual(
      value == null ? [] : Reflect.ownKeys(Object(value)),
      before,
    );
    assert.deepEqual(warnings, []);
  }
});

test('fixed URLs support globals and built-in resources without local packages', async ({
  project,
}) => {
  await project.write({
    'main.js': `
      import { answer } from 'remote-library';
      import text from 'remote-text';
      const data = await import('remote-data.json');
      globalThis.done([answer(), text, data.default]);
    `,
  });
  const script = await project.buildScript({
    dependencies: {
      'remote-library': {
        kind: 'global',
        global: 'RemoteLibrary',
        urls: ['https://example.test/library.js'],
      },
      'remote-text': {
        kind: 'resource',
        url: 'https://example.test/text.txt',
        loader: 'raw',
      },
      'remote-data.json': {
        kind: 'resource',
        url: 'https://example.test/data.json',
      },
    },
  });
  const completed = Promise.withResolvers<unknown[]>();
  vm.runInNewContext(script.code, {
    RemoteLibrary: { answer: () => 42 },
    GM_getResourceText: (name: string) => {
      if (name === 'remote-text') return 'remote text';
      assert.equal(name, 'remote-data.json');
      return '7';
    },
    done: completed.resolve,
  });
  assert.deepEqual(Array.from(await completed.promise), [42, 'remote text', 7]);
  assert.match(script.code, /@require\s+https:\/\/example.test\/library.js/);
  assert.match(
    script.code,
    /@resource\s+remote-text\s+https:\/\/example.test\/text.txt/,
  );
  assert.match(
    script.code,
    /@resource\s+remote-data.json\s+https:\/\/example.test\/data.json/,
  );
});

test('URL callbacks retain package metadata for globals and built-in resources', async ({
  project,
}) => {
  await project.write({
    'node_modules/fixture-lib/package.json': JSON.stringify({
      name: 'fixture-lib',
      version: '1.2.3',
      main: 'index.js',
    }),
    'node_modules/fixture-lib/index.js': '',
    'node_modules/fixture-lib/data.json': '{}',
    'main.js': `import { answer } from 'fixture-lib'; import data from 'fixture-lib/data.json'; globalThis.result = [answer(), data];`,
  });
  const globalContexts: PackageContext[] = [];
  const resourceContexts: PackageContext[] = [];
  const script = await project.buildScript({
    dependencies: {
      'fixture-lib': {
        kind: 'global',
        global: 'FixtureLib',
        urls: [
          'https://example.test/setup.js',
          (pkg) => {
            globalContexts.push(pkg);
            return `https://example.test/${pkg.name}@${pkg.version}/${pkg.resolveName}`;
          },
          async (pkg) => {
            globalContexts.push(pkg);
            return `https://example.test/${pkg.name}@${pkg.version}/extra.js`;
          },
        ],
      },
      'fixture-lib/data.json': {
        kind: 'resource',
        url: async (pkg) => {
          resourceContexts.push(pkg);
          return `https://example.test/${pkg.name}@${pkg.version}/${pkg.resolveName}`;
        },
      },
    },
  });
  const globalContext = {
    name: 'fixture-lib',
    version: '1.2.3',
    importName: 'fixture-lib',
    resolveName: 'index.js',
  };
  assert.deepEqual(globalContexts, [globalContext, globalContext]);
  assert.equal(globalContexts[0], globalContexts[1]);
  assert.deepEqual(resourceContexts, [
    {
      ...globalContext,
      importName: 'fixture-lib/data.json',
      resolveName: 'data.json',
    },
  ]);
  const context = vm.createContext({
    FixtureLib: { answer: () => 42 },
    GM_getResourceText: () => '7',
  });
  vm.runInContext(script.code, context);
  assert.deepEqual(Array.from(context.result), [42, 7]);
  assert.match(
    script.code,
    /@require\s+https:\/\/example.test\/fixture-lib@1.2.3\/index.js/,
  );
  assert.match(
    script.code,
    /@resource\s+fixture-lib\/data.json\s+https:\/\/example.test\/fixture-lib@1.2.3\/data.json/,
  );
});

test.for(['fixed', 'callback'] as const)(
  'module loaders retain package and resource context with a %s URL',
  async (urlKind, { project }) => {
    await project.write({
      'node_modules/fixture-data/package.json': JSON.stringify({
        name: 'fixture-data',
        version: '2.3.4',
        main: 'data.bin',
      }),
      'node_modules/fixture-data/data.bin': 'data',
      'loader.js': 'export default (context) => context;',
      'main.js': `
        import context from 'fixture-data';
        const dynamic = await import('fixture-data');
        globalThis.done(JSON.stringify([context, dynamic.default]));
      `,
    });
    const url = 'https://example.test/data.bin';
    const callbackContexts: PackageContext[] = [];
    const script = await project.buildScript({
      dependencies: {
        'fixture-data': {
          kind: 'resource',
          name: 'data',
          url:
            urlKind === 'fixed'
              ? url
              : (pkg) => {
                  callbackContexts.push(pkg);
                  return url;
                },
          loader: { entry: './loader.js' },
        },
      },
    });
    const completed = Promise.withResolvers<string>();
    vm.runInNewContext(script.code, { done: completed.resolve });
    const contexts: ResourceLoaderContext[] = JSON.parse(
      await completed.promise,
    );
    const packageContext = {
      name: 'fixture-data',
      version: '2.3.4',
      importName: 'fixture-data',
      resolveName: 'data.bin',
    };
    assert.deepEqual(
      contexts,
      [false, true].map((dynamic) => ({
        ...packageContext,
        resourceName: 'data',
        resourceUrl: url,
        dynamic,
      })),
    );
    assert.deepEqual(
      callbackContexts,
      urlKind === 'fixed' ? [] : [packageContext, packageContext],
    );
  },
);

test.for([
  ['remote.css?inline&url&raw', undefined, 'text'],
  ['remote.svg?url&raw', undefined, 'data:image/svg+xml;base64,AA=='],
  ['remote.svg?inline&raw', undefined, 'data:image/svg+xml;base64,AA=='],
  ['remote.json?raw', undefined, 'text'],
  ['remote.svg?url', 'raw', 'text'],
] as const)(
  'resource loader precedence for %s',
  async ([name, loader, expected], { project }) => {
    await project.write({
      'main.js':
        'import value from ' +
        JSON.stringify(name) +
        '; globalThis.result = value; globalThis.lazy = () => import(' +
        JSON.stringify(name) +
        ');',
    });
    const script = await project.buildScript({
      dependencies: {
        [name]: {
          kind: 'resource',
          url: 'https://example.test/resource',
          loader,
        },
      },
    });
    const context = vm.createContext({
      GM_getResourceText: () => 'text',
      GM_getResourceURL: () => 'data:application;base64,AA==',
    });
    vm.runInContext(script.code, context);
    assert.equal(context.result, expected);
    const first = context.lazy();
    assert.equal(context.lazy(), first);
    assert.equal((await first).default, expected);
  },
);
