import { PluginOption, ResolvedConfig, transformWithEsbuild } from 'vite';
import type { FinalMonkeyOption } from '../types';
import fs from 'node:fs/promises';

// https://github.com/vitejs/vite/blob/42e0d6af67743841bd38ed504cb8cbaaafb6313f/packages/vite/src/node/plugins/asset.ts#L327

export const inlinesAssetPlugin = (
  finalOption: FinalMonkeyOption,
): PluginOption => {
  let viteConfig: ResolvedConfig;
  return {
    name: 'monkey:inlinesAsset',
    enforce: 'post',
    apply: 'build',
    async configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    async transform(code, id) {
      if (
        viteConfig.assetsInclude(id) &&
        [`.svg`, `.svg?inline`, `.svg?url`].some((s) => id.endsWith(s)) &&
        code.includes(`__VITE_ASSET__`)
      ) {
        const base64Text = (await fs.readFile(id.split('?')[0])).toString(
          'base64',
        );
        return `export default ${JSON.stringify(
          `data:image/svg+xml;base64,` + base64Text,
        )}`;
      }
    },
    generateBundle(opts, bundle) {
      for (const key in bundle) {
        if ([`.svg`].some((s) => key.endsWith(s))) {
          delete bundle[key];
        }
      }
    },
  };
};
