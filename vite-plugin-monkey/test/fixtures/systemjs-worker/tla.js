import { gate, record } from './events.js';
record('tla:waiting');
await gate;
record('tla:complete');
export const answer = 42;
