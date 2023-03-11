import { MonkeyWindow } from './types';

// @ts-ignore
export const monkeyWindow: MonkeyWindow = document.__monkeyWindow ?? window;
