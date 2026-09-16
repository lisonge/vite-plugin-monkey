import type { Plugin, UserConfig } from 'vite';
import type { ResolvedMonkeyOption } from '../utils/types.ts';
import { assetMarker } from '../utils/assets.ts';

export const configFactory = (
  getOption: (root?: string) => Promise<ResolvedMonkeyOption>,
): Plugin => {
  let option: ResolvedMonkeyOption;
  return {
    name: 'monkey:config',
    config: {
      order: 'post',
      async handler(userConfig) {
        option = await getOption(userConfig.root);
        return {
          ...(option.build.assetsBaseUrl
            ? ({
                experimental: {
                  renderBuiltUrl(filename, context) {
                    if (context.type === 'asset') {
                      return assetMarker(filename);
                    }
                    const existing = userConfig.experimental?.renderBuiltUrl;
                    return existing?.(filename, context);
                  },
                },
              } satisfies UserConfig)
            : {}),
          resolve: {
            alias: {
              [option.clientAlias]: 'vite-plugin-monkey/dist/client',
            },
          },
          build: {
            assetsInlineLimit: option.build.assetsBaseUrl
              ? 0
              : Number.MAX_SAFE_INTEGER,
            chunkSizeWarningLimit: Number.MAX_SAFE_INTEGER,
            assetsDir: './',
            cssCodeSplit: false,
            minify: userConfig.build?.minify ?? false,
            cssMinify: userConfig.build?.cssMinify ?? true,
            sourcemap: false,
            rolldownOptions: {
              ...(option.build.assetsBaseUrl &&
              !Array.isArray(userConfig.build?.rolldownOptions?.output)
                ? {
                    output: {
                      assetFileNames:
                        userConfig.build?.rolldownOptions?.output
                          ?.assetFileNames ?? 'assets/[name]-[hash][extname]',
                    },
                  }
                : {}),
              input: option.entry,
              onLog(level, log, defaultHandler) {
                // ignore top-level await warning
                if (
                  level === 'warn' &&
                  log.code === 'TOLERATED_TRANSFORM' &&
                  log.message.includes('Top-level await is not available')
                ) {
                  return;
                }
                defaultHandler(level, log);
              },
              experimental: {
                // https://github.com/rolldown/rolldown/issues/9006
                attachDebugInfo: 'none',
              },
            },
          },
        };
      },
    },
  };
};
