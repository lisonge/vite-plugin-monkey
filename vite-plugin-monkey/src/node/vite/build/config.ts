import type { Plugin, UserConfig } from 'vite';
import type { MonkeyContext } from '../../utils/types.ts';
import { assetMarker } from '../../assets/resolve.ts';

export const configFactory = (
  getContext: (root?: string) => Promise<MonkeyContext>,
): Plugin => {
  let context: MonkeyContext;
  return {
    name: 'monkey:config',
    apply: 'build',
    config: {
      order: 'post',
      async handler(userConfig) {
        context = await getContext(userConfig.root);
        if (context.config.assets.publicPath) {
          const build = (userConfig.build ??= {});
          const options = (build.rolldownOptions ??= {});
          const output = (options.output ??= {});
          for (const item of Array.isArray(output) ? output : [output]) {
            item.assetFileNames ??= '[name]-[hash][extname]';
          }
        }
        return {
          ...(context.config.assets.publicPath
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
          build: {
            assetsInlineLimit: context.config.assets.publicPath
              ? 0
              : Number.MAX_SAFE_INTEGER,
            chunkSizeWarningLimit: Number.MAX_SAFE_INTEGER,
            assetsDir: './',
            cssCodeSplit: false,
            minify: userConfig.build?.minify ?? false,
            cssMinify: userConfig.build?.cssMinify ?? true,
            sourcemap: false,
            rolldownOptions: {
              input: context.config.entry,
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
