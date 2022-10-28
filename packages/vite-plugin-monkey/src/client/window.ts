import { MonkeyWindow } from './types';

export const monkeyWindow: MonkeyWindow = /* @__PURE__ */ (() =>
  // @ts-ignore
  document.__monkeyWindow ?? window)();
