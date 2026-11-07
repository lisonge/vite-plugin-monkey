import { count } from './counter.js';
import { count as reexported } from './reexport.js';

export function observe() {
  return { direct: count, reexported };
}
