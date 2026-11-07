import { record } from './events.js';
record('lazy:execute');
export let value = 10;
export function increment() {
  value++;
}
