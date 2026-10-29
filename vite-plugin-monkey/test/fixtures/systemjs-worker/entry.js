import { count, increment } from './counter.js';
import { observe } from './observer.js';
import { a, changeA, readB } from './cycle-a.js';
import { b, changeB, readA } from './cycle-b.js';
import { events, release, record } from './events.js';

let previousLazy;
export const snapshot = () => ({
  count,
  bindings: observe(),
  cycle: { a, b, fromA: readB(), fromB: readA() },
  events: [...events],
});
export function mutate(amount = 1) {
  increment(amount);
  return snapshot();
}
export function mutateCycle() {
  changeA();
  changeB();
  return snapshot();
}
export async function bindings() {
  const namespace = await import('./counter.js');
  increment();
  return { ...observe(), namespace: namespace.count };
}
export async function lazy() {
  const [first, second] = await Promise.all([
    import('./lazy.js'),
    import('./lazy.js'),
  ]);
  const sameAsPrevious = !previousLazy || previousLazy === first;
  previousLazy = first;
  first.increment();
  return {
    sameNamespace: first === second,
    sameAsPrevious,
    value: second.value,
    events: [...events],
  };
}
export async function loadTla() {
  const { answer } = await import('./tla-importer.js');
  record('tla:resolved');
  return answer;
}
export function releaseTla() {
  release();
}
export async function rejectTla() {
  await import('./tla-reject.js');
}
