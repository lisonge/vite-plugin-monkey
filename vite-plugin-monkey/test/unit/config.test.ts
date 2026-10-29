import assert from 'node:assert/strict';
import { test } from '../support/fixture.ts';
import { createContext } from '../../src/node/config/context.ts';
import type { MonkeyOptions } from '../../src/node/index.ts';
import { finalMonkeyOptionToComment } from '../../src/node/metadata/index.ts';

test('configuration is cloned and frozen while build state is instance-local', async ({
  project,
}) => {
  const { root } = project;
  const input: MonkeyOptions = {
    entry: 'main.js',
    userscript: {
      name: { '': 'Fixture' },
      match: [/https:\/\/example.test\/.*/],
      resource: { z: 'https://example.test/z', a: 'https://example.test/a' },
      antifeature: [{ type: 'tracking' }, { type: 'ads' }],
      $extra: [['custom', ['first', 'second']]],
    },
  };
  const first = await createContext(input, root),
    second = await createContext(input, root);
  assert.deepEqual(first.config.assets, { publicPath: undefined });
  assert.equal(first.config.dev.namePrefix, '[dev] ');
  assert.equal(Object.isFrozen(first.config.userscript.name), true);
  assert.equal(
    Object.isFrozen(
      (input.userscript as import('../../src/node/types.ts').Userscript).name,
    ),
    false,
  );
  first.state.collectRequireUrls.push('https://example.test/a.js');
  assert.deepEqual(second.state.collectRequireUrls, []);
  const beforeFormatting = structuredClone(first.config.userscript);
  finalMonkeyOptionToComment(first, new Set(), 'serve');
  assert.deepEqual(first.config.userscript, beforeFormatting);
  assert.match(
    finalMonkeyOptionToComment(second, new Set(), 'build'),
    /@name\s+Fixture/,
  );
});

test.for([
  'grants',
  'permissions',
  'grant',
  'externals',
  'styles',
  'hooks',
  'metadata',
  'build',
  'server',
  'serve',
  'format',
  'align',
  'generate',
  'clientAlias',
  'styleImport',
])('rejects unknown option %s', async (key, { project }) => {
  const { root } = project;
  await assert.rejects(
    createContext({ entry: 'main.js', [key]: {} } as MonkeyOptions, root),
    { message: `[monkey] Unknown options.${key}` },
  );
});

test('validates userscript objects before metadata generation', async ({
  project,
}) => {
  const objectError = '[monkey] userscript must be an object';
  for (const [userscript, message] of [
    [() => ({}), objectError],
    [async () => ({}), objectError],
    [null, objectError],
    [[], objectError],
    [42, objectError],
    ['invalid', objectError],
    [{ unknown: 'value' }, '[monkey] Unknown userscript.unknown'],
    [
      { $extra: { grant: 'GM_getValue' } },
      '[monkey] $extra cannot set grant; use userscript.grant',
    ],
    [
      { $extra: [['grant', ['GM_getValue']]] },
      '[monkey] $extra cannot set grant; use userscript.grant',
    ],
    [
      { unwrap: true, 'top-level-await': true },
      '[monkey] userscript.top-level-await cannot be combined with unwrap',
    ],
  ] as const) {
    const input = { entry: 'main.js', userscript } as unknown as MonkeyOptions;
    await assert.rejects(createContext(input, project.root), { message });
  }
});

test.for([undefined, null, true])(
  'rejects a global dependency without a string expression: %j',
  async (global, { project }) => {
    await assert.rejects(
      createContext(
        {
          entry: 'main.js',
          dependencies: { remote: { kind: 'global', global, urls: [] } },
        } as unknown as MonkeyOptions,
        project.root,
      ),
      { message: '[monkey] Invalid global dependency remote' },
    );
  },
);

test('none and explicit permissions enforce distinct contracts', async ({
  project,
}) => {
  const { root } = project;
  const none = await createContext(
    { entry: 'main.js', userscript: { grant: 'none' } },
    root,
  );
  assert.match(
    finalMonkeyOptionToComment(none, new Set(), 'build'),
    /@grant\s+none/,
  );
  assert.throws(
    () => finalMonkeyOptionToComment(none, new Set(['GM_getValue']), 'build'),
    /conflicts/,
  );
  const explicit = await createContext(
    {
      entry: 'main.js',
      userscript: { grant: ['GM_getValue'] },
    },
    root,
  );
  const code = finalMonkeyOptionToComment(
    explicit,
    new Set(['GM_setValue']),
    'build',
  );
  assert.match(code, /@grant\s+GM_getValue/);
  assert.doesNotMatch(code, /GM_setValue/);
});

test('rejects expression globals, invalid resource mode and obsolete nested options', async ({
  project,
}) => {
  const { root } = project;
  for (const input of [
    {
      dependencies: {
        vue: { kind: 'global', global: 'window.Vue || {}', urls: [] },
      },
    },
    { output: {}, assets: { mode: 'resource' } },
    { dev: { mountGmApi: true } },
  ])
    await assert.rejects(
      createContext({ entry: 'main.js', ...input } as MonkeyOptions, root),
    );
});

test('grant omission detects in production and grants all in development', async ({
  project,
}) => {
  const context = await createContext({ entry: 'main.js' }, project.root);
  const build = finalMonkeyOptionToComment(
    context,
    new Set(['GM_getValue']),
    'build',
  );
  assert.match(build, /@grant\s+GM_getValue/);
  assert.doesNotMatch(build, /GM_setValue/);
  assert.match(
    finalMonkeyOptionToComment(context, new Set(), 'serve'),
    /@grant\s+GM_setValue/,
  );
  for (const grant of ['none', [], ['GM.getValue']] as const) {
    const c = await createContext(
      {
        entry: 'main.js',
        userscript: { grant: typeof grant === 'string' ? grant : [...grant] },
      },
      project.root,
    );
    const grants = (mode: 'serve' | 'build') =>
      finalMonkeyOptionToComment(c, new Set(), mode)
        .split('\n')
        .filter((line) => line.includes('@grant'));
    assert.deepEqual(grants('serve'), grants('build'));
    if (Array.isArray(grant) && !grant.length)
      assert.deepEqual(grants('build'), []);
  }
});

test('rejects obsolete dev overrides and invalid grant values', async ({
  project,
}) => {
  for (const dev of [{ permissions: {} }, { grant: [] }])
    await assert.rejects(
      createContext(
        { entry: 'main.js', dev } as unknown as MonkeyOptions,
        project.root,
      ),
      /Unknown dev/,
    );
  for (const grant of [
    null,
    '*',
    'GM_getValue',
    ['none'],
    ['*'],
    ['invalid'],
    { mode: 'detect' },
    42,
  ])
    await assert.rejects(
      createContext(
        { entry: 'main.js', userscript: { grant } } as unknown as MonkeyOptions,
        project.root,
      ),
      /userscript.grant/,
    );
});

test('publicPath alone selects resource output and rejects invalid values', async ({
  project,
}) => {
  for (const assets of [undefined, {}, { publicPath: undefined }]) {
    const context = await createContext(
      { entry: 'main.js', assets },
      project.root,
    );
    assert.equal(context.config.assets.publicPath, undefined);
  }
  const context = await createContext(
    {
      entry: 'main.js',
      assets: { publicPath: 'https://example.test/releases' },
    },
    project.root,
  );
  assert.equal(
    context.config.assets.publicPath,
    'https://example.test/releases/',
  );
  for (const assets of [
    { mode: 'inline' },
    { mode: 'resource', publicPath: 'https://example.test/' },
    ...[null, 42, '', '/relative', 'ftp://example.test/'].map((publicPath) => ({
      publicPath,
    })),
  ])
    await assert.rejects(
      createContext(
        { entry: 'main.js', assets } as unknown as MonkeyOptions,
        project.root,
      ),
    );
  await assert.rejects(
    createContext(
      {
        entry: 'main.js',
        dev: { install: { open: true } },
      } as unknown as MonkeyOptions,
      project.root,
    ),
    /Unknown dev.install/,
  );
});

test('resource loaders accept shorthand and module entries only', async ({
  project,
}) => {
  const input = (loader: unknown) =>
    ({
      entry: 'main.js',
      dependencies: {
        remote: { kind: 'resource', url: 'https://example.test/file', loader },
      },
    }) as MonkeyOptions;
  for (const loader of [
    undefined,
    'css',
    'json',
    'raw',
    'url',
    { entry: './loader.ts' },
  ])
    await createContext(input(loader), project.root);
  for (const loader of [
    null,
    [],
    '',
    'text',
    {},
    { entry: '' },
    { entry: 42 },
    { kind: 'builtin', name: 'raw' },
    { kind: 'module', entry: './loader.ts' },
  ])
    await assert.rejects(createContext(input(loader), project.root));
});
