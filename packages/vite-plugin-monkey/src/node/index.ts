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
      let sourcemap = userConfig.build?.sourcemap;
      if (sourcemap === undefined) {
        if (pluginOption.build?.sourcemap) {
          sourcemap = 'inline';
        } else {
          sourcemap = false;
        }
      }

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
        build: {
          assetsInlineLimit: Number.MAX_SAFE_INTEGER,
          modulePreload: false,
          assetsDir: './',
          cssCodeSplit: false,
          minify: userConfig.build?.minify ?? false,
          rollupOptions: {
            // serve pre-bundling need
            input: finalPluginOption.entry,
          },

          // TODO
          // sourcemap: sourcemap,

          // lib: {
          //   entry: finalPluginOption.entry,
          //   formats: ['system' as any],
          //   fileName: () => {
          //     return finalPluginOption.build.fileName;
          //   },
          //   name: '__exposed__',
          // },
        },
      };
    },
  };

  return [monkeyPlugin, ...monkeyPluginList.map((m) => m(finalPluginOption))];
};
