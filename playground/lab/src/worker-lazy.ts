import initWasm from './assets/answer.wasm?init';
import {
  calls,
  lazyExecutions,
  recordCall,
  recordLazyExecution,
} from './worker-state.ts';

recordLazyExecution();
const instance = await initWasm();
const answer = instance.exports.answer as () => number;
const response = await fetch(new URL('./assets/badge.svg', import.meta.url));
if (!response.ok) throw new Error(`Worker SVG: HTTP ${response.status}`);
const svg = (await response.text()).includes('<svg');

export function run(value: number) {
  recordCall();
  return { answer: value * 2, wasm: answer(), svg, calls, lazyExecutions };
}
