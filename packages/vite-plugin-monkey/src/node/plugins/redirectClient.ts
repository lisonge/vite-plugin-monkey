import type { Plugin } from 'vite';
import type { FinalMonkeyOption } from '../types';

export const redirectClientPlugin = (_: FinalMonkeyOption): Plugin => {
  return {
    name: 'monkey:redirectClient',
    enforce: 'pre',
    apply: 'build',
    resolveId(source, importer, options) {
      if (source == 'vite-plugin-monkey/dist/client') {
        return this.resolve(
          'vite-plugin-monkey/dist/native',
          importer,
          options,
        );
      }
    },
  };
};
