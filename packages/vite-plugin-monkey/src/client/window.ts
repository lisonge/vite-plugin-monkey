import type { MonkeyWindow } from './types/_context';

const key =
  `__monkeyWindow-` +
  (() => {
    try {
      return new URL(import.meta.url).origin;
    } catch {
      return location.origin;
    }
  })();

const api_key =
  `__monkeyApi-` +
  (() => {
    try {
      return new URL(import.meta.url).origin;
    } catch {
      return location.origin;
    }
  })();

// @ts-ignore
export const monkeyWindow: MonkeyWindow = document[key] ?? window;

// @ts-ignore
export const monkeyApi: GmApi = document[api_key] ?? Object.freeze({});
