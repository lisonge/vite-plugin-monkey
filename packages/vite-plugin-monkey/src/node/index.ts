import type { Plugin } from 'vite';
import factorys from './plugins';
import { resolvedOption } from './utils/option';
import type { MonkeyOption, ResolvedMonkeyOption } from './utils/types';
import { dataUrl } from './utils/others';
import type { InlinePreset } from 'unimport';
import { gmIdentifiers } from './utils/gmApi';

export type * from './types';
export * as cdn from './cdn';

export default (pluginOption: MonkeyOption): Plugin[] => {
  let option: ResolvedMonkeyOption;
  return factorys.map((f) =>
    f(async () => {
      return option || resolvedOption(pluginOption).then((v) => (option = v));
    }),
  );
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
