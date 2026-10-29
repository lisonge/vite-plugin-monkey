import '../../style.d.ts';
import { expectTypeOf } from 'vitest';
import createStyle from './fixture.css?style';
expectTypeOf(createStyle).toEqualTypeOf<() => HTMLStyleElement>();
monkey({ entry: 'main.ts', userscript: { grant: ['GM_getValue'] } });
monkey({ entry: 'main.ts', userscript: { grant: 'none' } });
// @ts-expect-error grant accepts an array or none, not a single API name
monkey({ entry: 'main.ts', userscript: { grant: 'GM_getValue' } });
// @ts-expect-error permissions was removed
monkey({ entry: 'main.ts', permissions: { mode: 'detect' } });
// @ts-expect-error development has no separate grant override
monkey({ entry: 'main.ts', dev: { grant: [] } });
// @ts-expect-error dynamic metadata belongs in the outer Vite configuration
monkey({ entry: 'main.ts', userscript: () => ({ name: 'Dynamic' }) });
import monkey from '../../src/node/index.ts';
import type { MonkeyOptions } from '../../src/node/index.ts';
import type { GM } from '$';
import type { Plugin } from 'vite';
import type { InlinePreset } from 'unimport';
import {
  npmCdn,
  scriptDataUrl,
  gmAutoImportPreset,
} from '../../src/node/index.ts';
import type {
  DependencyUrlResolver,
  GmAutoImportPreset,
} from '../../src/node/index.ts';
expectTypeOf(npmCdn()).toEqualTypeOf<DependencyUrlResolver>();
expectTypeOf(gmAutoImportPreset()).toEqualTypeOf<GmAutoImportPreset>();
expectTypeOf(gmAutoImportPreset()).toExtend<InlinePreset>();
scriptDataUrl((value: number) => value + 1, 2);
// @ts-expect-error serialized arguments must match the function parameters
scriptDataUrl((value: number) => value + 1, '2');
// @ts-expect-error old utility namespace is removed
import { util } from '../../src/node/index.ts';
// @ts-expect-error old CDN namespace is removed
import { cdn } from '../../src/node/index.ts';
// @ts-expect-error old option name is removed
import type { MonkeyOption } from '../../src/node/index.ts';
void util;
void cdn;
expectTypeOf<MonkeyOption>();
expectTypeOf(monkey).returns.toEqualTypeOf<Plugin[]>();

expectTypeOf<ReturnType<typeof GM.getValue<number>>>().toEqualTypeOf<
  Promise<number>
>();
const option: MonkeyOptions = {
  entry: 'src/main.ts',
  userscript: {
    name: { '': 'Example', 'zh-CN': '示例' },
    match: ['https://example.test/*'],
    'top-level-await': true,
    tag: ['tools'],
    compatible: ['chrome', 'firefox'],
    incompatible: 'safari',
    installURL: 'https://example.test/install.user.js',
  },
  output: {},
  assets: {
    publicPath: 'https://example.test/releases/',
  },
  dependencies: {
    vue: {
      kind: 'global',
      global: 'Vue',
      urls: ['https://example.test/vue.js'],
    },
    'fixture/style.css': {
      kind: 'resource',
      url: 'https://example.test/style.css',
    },
  },
};
monkey(option);
// @ts-expect-error an entry is required
monkey({});
monkey({
  entry: 'main.ts',
  output: {},
  assets: {
    // @ts-expect-error publicPath must be a string
    publicPath: true,
  },
});

expectTypeOf<typeof GM.audio>().toEqualTypeOf<import('$').GmAsyncAudioType>();
expectTypeOf<typeof import('$').GM_getValue>().toEqualTypeOf<
  import('$').GmGetValueType
>();

monkey({ entry: 'main.ts', assets: {} });
// @ts-expect-error use Vite server.open
monkey({ entry: 'main.ts', dev: { install: { open: true } } });
// @ts-expect-error publicPath alone selects resource mode
monkey({ entry: 'main.ts', assets: { mode: 'inline' } });
