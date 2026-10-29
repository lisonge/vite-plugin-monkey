import { b } from './cycle-b.js';
export let a = 'A0';
export const readB = () => b;
export function changeA() {
  a = 'A1';
}
