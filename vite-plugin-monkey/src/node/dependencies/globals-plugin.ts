import { normalizePath, type Plugin } from 'vite';
import type { MonkeyContext } from '../config/context.ts';
import { getGlobalBindings, collectRequireUrls } from './global-modules.ts';

export const externalGlobalsFactory = (
  getContext: (root?: string) => Promise<MonkeyContext>,
): Plugin => {
  let context: MonkeyContext;
  return {
    name: 'monkey:externalGlobals',
    enforce: 'pre',
    apply: 'build',
    config: {
      order: 'post',
      async handler(config) {
        context = await getContext(config.root);
        return {
          build: {
            rolldownOptions: {
              external: Object.keys(
                getGlobalBindings(context.config.dependencies),
              ),
            },
          },
        };
      },
    },
    async generateBundle() {
      const used = new Set(Array.from(this.getModuleIds()).map(normalizePath));
      context.state.collectRequireUrls = await collectRequireUrls(
        context.config.dependencies,
        context.config.entry,
        used,
      );
    },
  };
};
