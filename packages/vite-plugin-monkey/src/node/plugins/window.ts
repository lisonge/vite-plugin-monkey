import { normalizePath, PluginOption } from 'vite';
import type { FinalMonkeyOption } from '../types';

export default (finalPluginOption: FinalMonkeyOption): PluginOption => {
  let isServe = false;
  return {
    name: 'monkey:window',
    config(_, { command }) {
      isServe = command == 'serve';
    },
    transform(code, id) {
      id = normalizePath(id);
      if (id.endsWith('vite-plugin-monkey/dist/client/index.mjs')) {
        return {
          code: code.replaceAll(
            /__MONKEY_WINDOW__/g,
            isServe ? `document.__monkeyWindow` : `window`,
          ),
          map: null,
        };
      }
    },
  };
};
