import type { Plugin } from 'vite';
import path from 'node:path';
import factories from './vite/index.ts';
import { createContext, createBuildState } from './config/context.ts';
import type { MonkeyOptions, MonkeyContext } from './utils/types.ts';

export type * from './types.ts';
export { npmCdn, type NpmCdnOptions } from './npm-cdn.ts';
export { scriptDataUrl } from './script-data-url.ts';
export {
  gmAutoImportPreset,
  type GmAutoImportOptions,
  type GmAutoImportPreset,
} from './auto-import.ts';

export default (pluginOption: MonkeyOptions): Plugin[] => {
  let context: Promise<MonkeyContext> | undefined;
  let root = '';
  const getContext = (configRoot = root) => {
    if (!context) {
      root = path.resolve(configRoot);
      context = createContext(pluginOption, root);
    }
    return context;
  };
  const rootPlugin: Plugin = {
    name: 'monkey:root',
    buildStart: {
      order: 'pre',
      sequential: true,
      async handler() {
        const current = await getContext();
        current.state = createBuildState();
      },
    },
    config: {
      order: 'pre',
      handler(config) {
        // Vite+ may use the pnpm workspace root as cwd, so prefer the Vite root
        // to resolve the actual workspace package and its relative entry.
        root = path.resolve(config.root ?? '');
        context = undefined;
      },
    },
  };
  return [rootPlugin, ...factories.map((factory) => factory(getContext))];
};
