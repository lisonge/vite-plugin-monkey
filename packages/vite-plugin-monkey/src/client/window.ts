import { MonkeyWindow } from './types';

const key =
  `__monkeyWindow-` + new URL(import.meta.url || location.href).origin;

// @ts-ignore
export const monkeyWindow: MonkeyWindow = document[key] ?? window;
