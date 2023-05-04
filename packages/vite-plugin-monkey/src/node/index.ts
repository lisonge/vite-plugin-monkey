import type { PluginOption } from 'vite';
import { resolvedOption } from './option';
import monkeyPluginList from './plugins';
import type { MonkeyOption } from './types';
import type {
  Format,
  GreasemonkeyUserScript,
  MonkeyUserScript,
  TampermonkeyUserScript,
  ViolentmonkeyUserScript,
} from './userscript';

export * as cdn from './cdn';
export * as util from './util';
export type {
  MonkeyUserScript,
  TampermonkeyUserScript,
  ViolentmonkeyUserScript,
  GreasemonkeyUserScript,
  Format,
  MonkeyOption,
};

export default (pluginOption: MonkeyOption): PluginOption => {
  const finalPluginOption = resolvedOption(pluginOption);

  const monkeyPlugin: PluginOption = {
    name: 'monkey:entry',
    async config(userConfig, { command }) {
      const isServe = command == 'serve';

      return {
        resolve: {
          alias: {
            [finalPluginOption.clientAlias]: 'vite-plugin-monkey/dist/client',
          },
        },
        define: {
          'process.env.NODE_ENV':
            userConfig.define?.['process.env.NODE_ENV'] ??
            JSON.stringify(
              userConfig.mode ?? (isServe ? 'development' : 'production'),
            ),
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
          rollupOptions: {
            // serve pre-bundling need
            input: finalPluginOption.entry,
          },
          sourcemap: false,

          // TODO
          // sourcemap: sourcemap,
        },
      };
    },
  };

  return [monkeyPlugin, ...monkeyPluginList.map((m) => m(finalPluginOption))];
};
