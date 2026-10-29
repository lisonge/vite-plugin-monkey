interface Waiter {
  promise: Promise<unknown>;
  resolve(value: unknown): void;
  reject(error: Error): void;
}
interface ProbeMessage {
  id?: number;
  event?: string;
  error?: string;
  value?: unknown;
}

// Test-only protocol bookkeeping, independent of the plugin's Worker bridge.
// Keep this function self-contained so the standalone prototype can serialize it.
export function createWorkerRequests(label = 'Worker') {
  let sequence = 0;
  let failure: Error | undefined;
  const pending = new Map<number, Waiter>();
  const eventWaiters = new Map<string, Waiter>();
  const events = new Set<string>();
  function wait<K>(map: Map<K, Waiter>, key: K) {
    if (failure) return Promise.reject(failure);
    const existing = map.get(key);
    if (existing) return existing.promise;
    const { promise, resolve, reject } = Promise.withResolvers<unknown>();
    const timer = globalThis.setTimeout(() => {
      map.delete(key);
      reject(new Error(`${label} timed out waiting for ${key}`));
    }, 8000);
    map.set(key, {
      promise,
      resolve(value) {
        globalThis.clearTimeout(timer);
        map.delete(key);
        resolve(value);
      },
      reject(error) {
        globalThis.clearTimeout(timer);
        map.delete(key);
        reject(error);
      },
    });
    return promise;
  }
  function resolveEvent(name: string, value?: unknown) {
    events.add(name);
    eventWaiters.get(name)?.resolve(value);
  }
  return {
    request() {
      const id = ++sequence;
      return { id, response: wait(pending, id) };
    },
    receive(data: ProbeMessage) {
      if (data.event) {
        resolveEvent(data.event);
        return true;
      }
      const waiter = data.id === undefined ? undefined : pending.get(data.id);
      if (!waiter) return false;
      if ('error' in data) waiter.reject(new Error(data.error));
      else waiter.resolve(data.value);
      return true;
    },
    event: (name: string) =>
      events.has(name) ? Promise.resolve() : wait(eventWaiters, name),
    isWaiting: (name: string) => eventWaiters.has(name),
    waitEvent: (name: string) => wait(eventWaiters, name),
    resolveEvent,
    fail(error: Error) {
      failure = error;
      for (const waiter of [...pending.values(), ...eventWaiters.values()])
        waiter.reject(error);
    },
  };
}
