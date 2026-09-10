import type { MonkeyWindow } from './types/_context.ts';

export const monkeyWindow: MonkeyWindow = (() => {
  // @ts-ignore
  return document[__MONKEY_WINDOW_KEY__] ?? window;
})();
