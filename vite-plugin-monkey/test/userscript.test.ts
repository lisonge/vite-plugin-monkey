import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test, { after, before } from 'node:test';
import { finalMonkeyOptionToComment } from '../src/node/userscript/index.ts';
import type { AntifeatureType } from '../src/node/userscript/tampermonkey.ts';
import { grantNames } from '../src/node/utils/gmApi.ts';
import { resolvedOption } from '../src/node/utils/option.ts';
import type { MonkeyOption } from '../src/node/utils/types.ts';

let root: string;
before(async () => {
  root = await fs.mkdtemp(path.join(os.tmpdir(), 'monkey-userscript-'));
});
after(async () => {
  if (root) {
    assert.equal(path.dirname(root), os.tmpdir());
    assert.ok(path.basename(root).startsWith('monkey-userscript-'));
    await fs.rm(root, { recursive: true, force: true });
  }
});

const generate = async (userscript: MonkeyOption['userscript'], align = 0) => {
  const option = await resolvedOption(
    { entry: 'src/main.ts', align, userscript },
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
    return line.slice(3);
  });
};

test('omits unset fields and false flags', async () => {
  assert.deepEqual(
    metadata(await generate({ noframes: false, unwrap: false })),
    [],
  );
});

test('generates string fields in metadata order', async () => {
  const comment = await generate({
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

test('generates default and localized names and descriptions', async () => {
  assert.deepEqual(
    metadata(
      await generate({
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

for (const array of [false, true]) {
  test(`generates repeatable fields from ${array ? 'arrays' : 'single values'}`, async () => {
    const values = (first: string, second: string) =>
      array ? [first, second] : first;
    const comment = await generate({
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

test('serializes regular expressions in include and exclude fields', async () => {
  assert.deepEqual(
    metadata(
      await generate({
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
  test(`serializes webRequest ${array ? 'rules' : 'a single rule'} as JSON`, async () => {
    const first = { selector: '*://example.com/*', action: 'cancel' };
    const second = {
      selector: { include: 'https://other.com/*' },
      action: { redirect: 'https://example.com/' },
    };
    assert.deepEqual(
      metadata(
        await generate({
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

test('merges collected dependencies and sorts resources by name', async () => {
  const option = await resolvedOption(
    {
      entry: 'src/main.ts',
      align: false,
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
  option.collectRequireUrls.push('https://example.com/collected.js');
  option.collectResource = {
    zebra: 'https://example.com/new.txt',
    beta: 'https://example.com/b.txt',
  };
  assert.deepEqual(
    metadata(await finalMonkeyOptionToComment(option, new Set(), 'build')),
    [
      '@require https://example.com/manual.js',
      '@require https://example.com/collected.js',
      '@resource alpha https://example.com/a.txt',
      '@resource beta https://example.com/b.txt',
      '@resource zebra https://example.com/new.txt',
    ],
  );
});

test('merges, deduplicates and sorts explicit and collected grants', async () => {
  const option = await resolvedOption(
    {
      entry: 'src/main.ts',
      align: false,
      userscript: { grant: ['GM_setValue', 'GM_getValue', 'GM_getValue'] },
    },
    root,
  );
  assert.deepEqual(
    metadata(
      await finalMonkeyOptionToComment(
        option,
        new Set(['GM_getValue', 'GM_addStyle', '']),
        'build',
      ),
    ),
    ['@grant GM_addStyle', '@grant GM_getValue', '@grant GM_setValue'],
  );
});

for (const grant of ['none', '*', 'GM_getValue'] as const) {
  test(`generates the ${grant} grant setting`, async () => {
    const option = await resolvedOption(
      {
        entry: 'src/main.ts',
        align: false,
        userscript: { grant },
      },
      root,
    );
    assert.deepEqual(
      metadata(
        await finalMonkeyOptionToComment(
          option,
          new Set(['GM_setValue']),
          'build',
        ),
      ),
      grant === 'none'
        ? ['@grant none']
        : grant === '*'
          ? [...grantNames].sort().map((name) => `@grant ${name}`)
          : ['@grant GM_getValue', '@grant GM_setValue'],
    );
  });
}

for (const $extra of [
  { custom: 'hello world', other: ['first', 'second'] },
  [
    ['custom', 'hello world'],
    ['other', ['first', 'second']],
  ],
] satisfies NonNullable<MonkeyOption['userscript']>['$extra'][]) {
  test(`generates extra metadata from ${Array.isArray($extra) ? 'tuples' : 'an object'}`, async () => {
    assert.deepEqual(metadata(await generate({ $extra })), [
      '@custom hello world',
      '@other first second',
    ]);
  });
}

test('aligns metadata keys and resource names without changing value spaces', async () => {
  assert.equal(
    await generate(
      {
        name: 'Example',
        description: 'Two  spaces',
        resource: { long: 'https://example.com/b', a: 'https://example.com/a' },
      },
      2,
    ),
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

for (const mode of ['serve', 'build', 'meta'] as const) {
  test(`passes generated metadata and ${mode} mode to the generate callback`, async () => {
    const option = await resolvedOption(
      {
        entry: 'src/main.ts',
        align: false,
        userscript: { name: 'Example' },
        generate: async (input) => {
          assert.equal(input.mode, mode);
          assert.deepEqual(metadata(input.userscript), ['@name Example']);
          return `${input.userscript}\n// custom suffix`;
        },
      },
      root,
    );
    assert.equal(
      await finalMonkeyOptionToComment(option, new Set(), mode),
      '// ==UserScript==\n// @name Example\n// ==/UserScript==\n// custom suffix',
    );
  });
}

for (const mode of ['serve', 'build', 'meta'] as const) {
  for (const align of [0, 2]) {
    test(`generates a referral-link without a description (${mode}, align=${align})`, async () => {
      const option = await resolvedOption(
        {
          entry: 'src/main.ts',
          align,
          userscript: { antifeature: { type: 'referral-link' } },
        },
        root,
      );
      const comment = await finalMonkeyOptionToComment(option, new Set(), mode);
      assert.match(comment, /^\/\/ @antifeature +referral-link$/m);
    });

    test(`generates multiple and localized antifeatures (${mode}, align=${align})`, async () => {
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
      const option = await resolvedOption(
        { entry: 'src/main.ts', align, userscript: { antifeature } },
        root,
      );
      const comment = await finalMonkeyOptionToComment(option, new Set(), mode);
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
}
