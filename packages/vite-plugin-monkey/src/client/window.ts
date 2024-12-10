import type { MonkeyWindow } from './types/_context';
import type { GmContextType } from '../client/index';

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

export const monkeyWindow: MonkeyWindow = (document as any)[key] ?? window;

export const monkeyApi: GmContextType =
  (document as any)[api_key] ?? Object.freeze({});
