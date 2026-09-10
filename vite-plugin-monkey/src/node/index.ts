import type { Plugin } from 'vite';
import path from 'node:path';
import factorys from './plugins/index.ts';
import { resolvedOption } from './utils/option.ts';
import type { MonkeyOption, ResolvedMonkeyOption } from './utils/types.ts';
import { dataUrl } from './utils/others.ts';
import type { InlinePreset } from 'unimport';
import { gmIdentifiers } from './utils/gmApi.ts';

export type * from './types.ts';
export * as cdn from './cdn.ts';

export default (pluginOption: MonkeyOption): Plugin[] => {
  let option: Promise<ResolvedMonkeyOption> | undefined;
  let root = '';
  const getOption = (configRoot = root) => {
    if (!option) {
      root = path.resolve(configRoot);
      option = resolvedOption(pluginOption, root);
    }
    return option;
  };
  const rootPlugin: Plugin = {
    name: 'monkey:root',
    config: {
      order: 'pre',
      handler(config) {
        // Vite+ may use the pnpm workspace root as cwd, so prefer the Vite root
        // to resolve the actual workspace package and its relative entry.
        root = path.resolve(config.root ?? '');
        option = undefined;
      },
    },
  };
  return [
    rootPlugin,
    ...(factorys
      .map((f) => f(getOption, pluginOption))
      .filter(Boolean) as Plugin[]),
  ];
};

/**
 * GM api preset when you use unimport or unplugin-auto-import
 *
 * Note, there is not comment in automatically generated unimport.d.ts/auto-imports.d.ts file
 */
const unimportPreset = {
  from: 'vite-plugin-monkey/dist/client',
  imports: ['GM', ...gmIdentifiers, 'unsafeWindow', 'monkeyWindow'],
} satisfies InlinePreset;

export const util = {
  dataUrl,
  unimportPreset,
};
