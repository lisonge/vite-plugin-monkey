export let calls = 0;
export let lazyExecutions = 0;

export function recordLazyExecution() {
  lazyExecutions++;
}
export function recordCall() {
  calls++;
}

export interface WorkerSnapshot {
  calls: number;
  lazyExecutions: number;
}
export interface WorkerResult extends WorkerSnapshot {
  answer: number;
  wasm: number;
  svg: boolean;
  sameNamespace: boolean;
}
