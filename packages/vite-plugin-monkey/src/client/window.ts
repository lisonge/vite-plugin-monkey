import type { MonkeyWindow } from './types/_context';

export const monkeyWindow: MonkeyWindow = (() => {
  // @ts-ignore
  return document[__MONKEY_WINDOW_KEY__] ?? window;
})();
