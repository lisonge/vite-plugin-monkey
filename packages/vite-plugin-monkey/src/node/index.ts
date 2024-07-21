import type { Plugin, UserConfig } from 'vite';
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

export default (pluginOption: MonkeyOption): Plugin[] => {
  const finalPluginOption = resolvedOption(pluginOption);

  const monkeyPlugin: Plugin = {
    name: 'monkey:entry',
    enforce: 'post',
    async config(userConfig, { command }) {
      const isServe = command == 'serve';

      const ret: UserConfig = {
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

          sourcemap: false,

          // TODO
          // sourcemap: sourcemap,
        },
      };

      // background or crontab script use lib
      if (
        finalPluginOption.userscript.background ||
        finalPluginOption.userscript.crontab
      ) {
        ret.build!.lib = {
          entry: finalPluginOption.entry,
          name: 'monkey',
          formats: ['umd'],
          fileName: 'monkey.user.js',
        };
      } else {
        ret.build!.rollupOptions = {
          // serve pre-bundling need
          input: finalPluginOption.entry,
        };
      }

      return ret;
    },
  };

  return [monkeyPlugin, ...monkeyPluginList.map((m) => m(finalPluginOption))];
};
