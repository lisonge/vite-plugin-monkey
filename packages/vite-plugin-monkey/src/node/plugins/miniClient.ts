import { transformWithEsbuild } from 'vite';
import type { ESBuildTransformResult, PluginOption } from 'vite';
import type { FinalMonkeyOption } from '../types';

export default (finalPluginOption: FinalMonkeyOption): PluginOption => {
  let result: ESBuildTransformResult | undefined = undefined;
  return {
    name: 'monkey/miniClient',
    apply: 'build',
    async transform(code, id) {
      if (id.endsWith('vite-plugin-monkey/dist/client/index.mjs')) {
        if (!result) {
          result = await transformWithEsbuild(code, id, {
            minify: true,
            sourcemap: false,
            legalComments: 'none',
          });
        }
        return result;
      }
    },
  };
};
