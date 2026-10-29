import { a } from './cycle-a.js';
export let b = 'B0';
export const readA = () => a;
export function changeB() {
  b = 'B1';
}
