import type { MonkeyWindow } from './types';

const key =
  `__monkeyWindow-` +
  (() => {
    try {
      return new URL(import.meta.url).origin;
    } catch {
      return location.origin;
    }
  })();

// @ts-ignore
export const monkeyWindow: MonkeyWindow = document[key] ?? window;
