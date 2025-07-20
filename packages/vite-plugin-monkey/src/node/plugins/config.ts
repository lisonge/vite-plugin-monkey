import type { Plugin } from 'vite';
import type { ResolvedMonkeyOption } from '../utils/types';

export const configFactory = (
  getOption: () => Promise<ResolvedMonkeyOption>,
): Plugin => {
  let option: ResolvedMonkeyOption;
  return {
    name: 'monkey:config',
    async config(userConfig) {
      option = await getOption();
      return {
        resolve: {
          alias: {
            [option.clientAlias]: 'vite-plugin-monkey/dist/client',
          },
        },
        esbuild: {
          supported: {
            'top-level-await': true,
          },
        },
        build: {
          assetsInlineLimit: Number.MAX_SAFE_INTEGER,
          chunkSizeWarningLimit: Number.MAX_SAFE_INTEGER,
          modulePreload: false,
          assetsDir: './',
          cssCodeSplit: false,
          minify: userConfig.build?.minify ?? false,
          cssMinify: userConfig.build?.cssMinify ?? true,
          sourcemap: false,
          rollupOptions: {
            input: option.entry,
          },
        },
      };
    },
  };
};
