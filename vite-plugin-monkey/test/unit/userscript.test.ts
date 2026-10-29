import assert from 'node:assert/strict';
import { test } from '../support/fixture.ts';
import { finalMonkeyOptionToComment } from '../../src/node/metadata/index.ts';
import type { AntifeatureType } from '../../src/node/metadata/tampermonkey.ts';
import { createContext } from '../../src/node/config/context.ts';
import type { MonkeyOptions } from '../../src/node/utils/types.ts';
const generate = async (
  root: string,
  userscript: MonkeyOptions['userscript'],
) => {
  const option = await createContext(
    {
      entry: 'src/main.ts',
      userscript,
    },
    root,
  );
  return finalMonkeyOptionToComment(option, new Set(), 'build');
};
const metadata = (comment: string) => {
  const lines = comment.split('\n');
  assert.equal(lines.shift(), '// ==UserScript==');
  assert.equal(lines.pop(), '// ==/UserScript==');
  return lines.map((line) => {
    assert.ok(line.startsWith('// @'));
    assert.equal(line, line.trimEnd());
    return line
      .slice(3)
      .replace(/^(@\S+) +/, '$1 ')
      .replace(/^(@(?:resource|antifeature(?::\S+)?) \S+) +/, '$1 ');
  });
};
test('omits unset fields and false flags', async ({ project }) => {
  const { root } = project;
  assert.deepEqual(
    metadata(await generate(root, { noframes: false, unwrap: false })),
    [],
  );
});
test('generates string fields in metadata order', async ({ project }) => {
  const { root } = project;
  const comment = await generate(root, {
    name: 'Example script',
    namespace: 'example',
    version: '1.2.3',
    author: 'Example author',
    description: 'Keeps  internal spaces',
    license: 'MIT',
    copyright: '2026 Example',
    icon: 'https://example.com/icon.png',
    iconURL: 'https://example.com/icon-url.png',
    icon64: 'https://example.com/icon64.png',
    icon64URL: 'https://example.com/icon64-url.png',
    defaulticon: 'https://example.com/default.png',
    homepage: 'https://example.com/home',
    homepageURL: 'https://example.com/home-url',
    website: 'https://example.com',
    source: 'https://example.com/source',
    supportURL: 'https://example.com/support',
    downloadURL: 'https://example.com/script.user.js',
    updateURL: 'https://example.com/script.meta.js',
    sandbox: 'JavaScript',
    'inject-into': 'page',
    'run-at': 'document-start',
    compatible: 'chrome',
    incompatible: 'safari',
    contributionAmount: '$1',
    contributionURL: 'https://example.com/donate',
    noframes: true,
    unwrap: true,
  });
  assert.deepEqual(metadata(comment), [
    '@name Example script',
    '@namespace example',
    '@version 1.2.3',
    '@author Example author',
    '@description Keeps  internal spaces',
    '@license MIT',
    '@copyright 2026 Example',
    '@icon https://example.com/icon.png',
    '@iconURL https://example.com/icon-url.png',
    '@icon64 https://example.com/icon64.png',
    '@icon64URL https://example.com/icon64-url.png',
    '@defaulticon https://example.com/default.png',
    '@homepage https://example.com/home',
    '@homepageURL https://example.com/home-url',
    '@website https://example.com',
    '@source https://example.com/source',
    '@supportURL https://example.com/support',
    '@downloadURL https://example.com/script.user.js',
    '@updateURL https://example.com/script.meta.js',
    '@sandbox JavaScript',
    '@inject-into page',
    '@run-at document-start',
    '@compatible chrome',
    '@incompatible safari',
    '@contributionAmount $1',
    '@contributionURL https://example.com/donate',
    '@noframes',
    '@unwrap',
  ]);
});
test('generates default and localized names and descriptions', async ({
  project,
}) => {
  const { root } = project;
  assert.deepEqual(
    metadata(
      await generate(root, {
        name: { '': 'Example', 'zh-CN': '示例', ja: 'サンプル' },
        description: { '': 'Description', 'zh-CN': '说明' },
      }),
    ),
    [
      '@name Example',
      '@name:zh-CN 示例',
      '@name:ja サンプル',
      '@description Description',
      '@description:zh-CN 说明',
    ],
  );
});
test('preserves package defaults and localized fallbacks across development and production', async ({
  project,
}) => {
  await project.write({
    'package.json': JSON.stringify({
      name: 'Package name',
      description: 'Package description',
      version: '1.2.3',
      author: { name: 'Package author' },
      license: 'MIT',
      homepage: 'https://example.test/home',
      repository: { url: 'git+https://example.test/source' },
      bugs: { url: 'https://example.test/issues' },
    }),
  });
  const context = await createContext(
    {
      entry: 'main.ts',
      userscript: {
        grant: [],
        name: { 'zh-CN': '本地名称' },
        description: { fr: 'Description locale' },
        version: undefined,
        homepage: undefined,
      },
    },
    project.root,
  );
  const before = structuredClone(context.config.userscript);
  const expected = [
    '@name Package name',
    '@name:zh-CN 本地名称',
    '@author Package author',
    '@description Package description',
    '@description:fr Description locale',
    '@license MIT',
    '@homepageURL https://example.test/home',
    '@source https://example.test/source',
    '@supportURL https://example.test/issues',
  ];
  assert.deepEqual(
    metadata(finalMonkeyOptionToComment(context, new Set(), 'serve')),
    expected.map((line) => line.replace(/^(@name(?::\S+)? )/, '$1[dev] ')),
  );
  assert.deepEqual(
    metadata(finalMonkeyOptionToComment(context, new Set(), 'build')),
    expected,
  );
  assert.deepEqual(context.config.userscript, before);
  assert.deepEqual(
    metadata(await generate(project.root, { name: '', description: '' })).slice(
      0,
      5,
    ),
    [
      '@name',
      '@version 1.2.3',
      '@author Package author',
      '@description',
      '@license MIT',
    ],
  );
});
for (const array of [false, true]) {
  test(`generates repeatable fields from ${array ? 'arrays' : 'single values'}`, async ({
    project,
  }) => {
    const { root } = project;
    const values = (first: string, second: string) =>
      array ? [first, second] : first;
    const comment = await generate(root, {
      include: values('https://example.com/*', 'https://other.com/*'),
      match: values('*://example.com/*', '*://other.com/*'),
      exclude: values(
        'https://example.com/private/*',
        'https://other.com/private/*',
      ),
      'exclude-match': values(
        '*://example.com/admin/*',
        '*://other.com/admin/*',
      ),
      require: values('https://example.com/a.js', 'https://example.com/b.js'),
      tag: values('utilities', 'productivity'),
      connect: values('example.com', 'other.com'),
    });
    assert.deepEqual(metadata(comment), [
      '@include https://example.com/*',
      ...(array ? ['@include https://other.com/*'] : []),
      '@match *://example.com/*',
      ...(array ? ['@match *://other.com/*'] : []),
      '@exclude https://example.com/private/*',
      ...(array ? ['@exclude https://other.com/private/*'] : []),
      '@exclude-match *://example.com/admin/*',
      ...(array ? ['@exclude-match *://other.com/admin/*'] : []),
      '@require https://example.com/a.js',
      ...(array ? ['@require https://example.com/b.js'] : []),
      '@tag utilities',
      ...(array ? ['@tag productivity'] : []),
      '@connect example.com',
      ...(array ? ['@connect other.com'] : []),
    ]);
  });
}
test('serializes regular expressions in include and exclude fields', async ({
  project,
}) => {
  const { root } = project;
  assert.deepEqual(
    metadata(
      await generate(root, {
        include: /https:\/\/example\.com\/.*/,
        exclude: [/private/, /admin/i],
      }),
    ),
    [
      '@include /https:\\/\\/example\\.com\\/.*/',
      '@exclude /private/',
      '@exclude /admin/i',
    ],
  );
});
for (const array of [false, true]) {
  test(`serializes webRequest ${array ? 'rules' : 'a single rule'} as JSON`, async ({
    project,
  }) => {
    const { root } = project;
    const first = { selector: '*://example.com/*', action: 'cancel' };
    const second = {
      selector: { include: 'https://other.com/*' },
      action: { redirect: 'https://example.com/' },
    };
    assert.deepEqual(
      metadata(
        await generate(root, {
          webRequest: array ? [first, second] : first,
        }),
      ),
      [
        '@webRequest {"selector":"*://example.com/*","action":"cancel"}',
        ...(array
          ? [
              '@webRequest {"selector":{"include":"https://other.com/*"},"action":{"redirect":"https://example.com/"}}',
            ]
          : []),
      ],
    );
  });
}
test('merges collected dependencies and sorts resources by name', async ({
  project,
}) => {
  const { root } = project;
  const option = await createContext(
    {
      entry: 'src/main.ts',
      userscript: {
        require: 'https://example.com/manual.js',
        resource: {
          zebra: 'https://example.com/old.txt',
          alpha: 'https://example.com/a.txt',
        },
      },
    },
    root,
  );
  option.state.collectRequireUrls.push('https://example.com/collected.js');
  option.state.collectResource = {
    zebra: 'https://example.com/new.txt',
    beta: 'https://example.com/b.txt',
  };
  assert.deepEqual(
    metadata(finalMonkeyOptionToComment(option, new Set(), 'build')),
    [
      '@require https://example.com/manual.js',
      '@require https://example.com/collected.js',
      '@resource alpha https://example.com/a.txt',
      '@resource beta https://example.com/b.txt',
      '@resource zebra https://example.com/new.txt',
    ],
  );
});
test('deduplicates and sorts explicit grants without merging detected grants', async ({
  project,
}) => {
  const { root } = project;
  const option = await createContext(
    {
      entry: 'src/main.ts',
      userscript: { grant: ['GM_setValue', 'GM_getValue', 'GM_getValue'] },
    },
    root,
  );
  assert.deepEqual(
    metadata(
      finalMonkeyOptionToComment(
        option,
        new Set(['GM_getValue', 'GM_addStyle']),
        'build',
      ),
    ),
    ['@grant GM_getValue', '@grant GM_setValue'],
  );
});
for (const $extra of [
  { custom: 'hello world', other: ['first', 'second'] },
  [
    ['custom', 'hello world'],
    ['other', ['first', 'second']],
  ],
] satisfies import('../../src/node/types.ts').Userscript['$extra'][]) {
  test(`generates extra metadata from ${Array.isArray($extra) ? 'tuples' : 'an object'}`, async ({
    project,
  }) => {
    const { root } = project;
    assert.deepEqual(metadata(await generate(root, { $extra })), [
      '@custom hello world',
      '@other first second',
    ]);
  });
}
test('aligns metadata keys and resource names without changing value spaces', async ({
  project,
}) => {
  const { root } = project;
  assert.equal(
    await generate(root, {
      name: 'Example',
      description: 'Two  spaces',
      resource: { long: 'https://example.com/b', a: 'https://example.com/a' },
    }),
    [
      '// ==UserScript==',
      '// @name         Example',
      '// @description  Two  spaces',
      '// @resource     a     https://example.com/a',
      '// @resource     long  https://example.com/b',
      '// ==/UserScript==',
    ].join('\n'),
  );
});
for (const mode of ['serve', 'build'] as const) {
  test(`generates a referral-link without a description (${mode})`, async ({
    project,
  }) => {
    const { root } = project;
    const option = await createContext(
      {
        entry: 'src/main.ts',
        userscript: { grant: [], antifeature: { type: 'referral-link' } },
      },
      root,
    );
    const comment = finalMonkeyOptionToComment(option, new Set(), mode);
    assert.match(comment, /^\/\/ @antifeature +referral-link$/m);
  });
  test(`generates multiple and localized antifeatures (${mode})`, async ({
    project,
  }) => {
    const { root } = project;
    const antifeature: AntifeatureType[] = [
      { type: 'ads', description: 'Displays ads' },
      { type: 'tracking', description: 'Tracks usage' },
      { type: 'miner', description: 'Mines coins' },
      { type: 'membership', description: 'Requires membership' },
      { type: 'payment', description: '' },
      { type: 'referral-link', description: 'Earns commission' },
      { type: 'referral-link', tag: 'zh-CN', description: '包含返佣链接' },
      { type: 'referral-link', tag: 'en' },
    ];
    const option = await createContext(
      {
        entry: 'src/main.ts',
        userscript: { antifeature },
      },
      root,
    );
    const comment = finalMonkeyOptionToComment(option, new Set(), mode);
    assert.deepEqual(
      comment
        .split('\n')
        .filter((line) => line.startsWith('// @antifeature'))
        .map((line) => line.replace(/ +/g, ' ')),
      [
        '// @antifeature ads Displays ads',
        '// @antifeature membership Requires membership',
        '// @antifeature miner Mines coins',
        '// @antifeature payment',
        '// @antifeature referral-link Earns commission',
        '// @antifeature tracking Tracks usage',
        '// @antifeature:en referral-link',
        '// @antifeature:zh-CN referral-link 包含返佣链接',
      ],
    );
  });
}

for (const mode of ['serve', 'build'] as const) {
  test.for(['normal-tabs', ['incognito-tabs', 'container-id-2']])(
    'preserves run-in in ' + mode + ' metadata: %j',
    async (runIn, { project }) => {
      const { root } = project;
      const context = await createContext(
        { entry: 'main.ts', userscript: { 'run-in': runIn } },
        root,
      );
      const comment = finalMonkeyOptionToComment(context, new Set(), mode);
      assert.deepEqual(
        [...comment.matchAll(/@run-in\s+([^\r\n]+)/g)].map((m) => m[1]),
        Array.isArray(runIn) ? runIn : [runIn],
      );
    },
  );
}

for (const mode of ['serve', 'build'] as const) {
  test(
    'emits Violentmonkey and Greasy Fork metadata in ' + mode,
    async ({ project }) => {
      const { root } = project;
      const context = await createContext(
        {
          entry: 'main.ts',
          userscript: {
            'top-level-await': true,
            tag: ['ui', 'tools'],
            installURL: 'https://example.test/install.user.js',
            compatible: ['firefox Needs permission', 'chrome'],
            incompatible: ['safari', 'opera'],
          },
        },
        root,
      );
      const lines = metadata(
        finalMonkeyOptionToComment(context, new Set(), mode),
      );
      for (const line of [
        '@top-level-await',
        '@tag ui',
        '@tag tools',
        '@installURL https://example.test/install.user.js',
        '@compatible firefox Needs permission',
        '@compatible chrome',
        '@incompatible safari',
        '@incompatible opera',
      ])
        assert.ok(lines.includes(line), line);
    },
  );
}
test('omits disabled top-level-await', async ({ project }) => {
  const { root } = project;
  assert.doesNotMatch(
    await generate(root, { 'top-level-await': false }),
    /@top-level-await/,
  );
});

test('orders localized and extra known fields while preserving unknown extras', async ({
  project,
}) => {
  const comment = await generate(project.root, {
    name: { ja: '名前', '': 'Name' },
    require: ['https://example.test/b.js', 'https://example.test/a.js'],
    resource: { z: 'https://example.test/z', a: 'https://example.test/a' },
    installURL: 'https://example.test/install.user.js',
    'run-in': ['normal-tabs', 'incognito-tabs'],
    'top-level-await': true,
    $extra: [
      ['name:fr', 'Nom'],
      ['require', 'https://example.test/c.js'],
      ['custom-z', 'z'],
      ['custom-a', 'a'],
    ],
  });
  assert.deepEqual(metadata(comment), [
    '@name Name',
    '@name:ja 名前',
    '@name:fr Nom',
    '@require https://example.test/b.js',
    '@require https://example.test/a.js',
    '@require https://example.test/c.js',
    '@resource a https://example.test/a',
    '@resource z https://example.test/z',
    '@installURL https://example.test/install.user.js',
    '@run-in normal-tabs',
    '@run-in incognito-tabs',
    '@top-level-await',
    '@custom-z z',
    '@custom-a a',
  ]);
});
