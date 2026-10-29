import { createSignal } from 'solid-js';

// Solid preserves unchanged modules; component-local signals reset on HMR.
export const [count, setCount] = createSignal(0);
