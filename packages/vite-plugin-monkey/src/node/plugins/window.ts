import type { PluginOption } from 'vite';
import type { FinalMonkeyOption } from '../types';

export const windowPlugin = (
  finalPluginOption: FinalMonkeyOption,
): PluginOption => {
  return {
    name: 'monkey:window',
    config(_, { command }) {
      return {
        define: {
          __MONKEY_WINDOW__:
            command == 'serve' ? `document.__monkeyWindow` : `window`,
        },
      };
    },
  };
};
