import { calls, lazyExecutions } from './worker-state.ts';

let previous: typeof import('./worker-lazy.ts') | undefined;
self.onmessage = async (
  event: MessageEvent<{ id: number; value?: number }>,
) => {
  const { id, value } = event.data;
  try {
    if (value === undefined) {
      self.postMessage({ id, result: { calls, lazyExecutions } });
      return;
    }
    const [first, second] = await Promise.all([
      import('./worker-lazy.ts'),
      import('./worker-lazy.ts'),
    ]);
    const sameNamespace = first === second && (!previous || previous === first);
    previous = first;
    self.postMessage({ id, result: { ...first.run(value), sameNamespace } });
  } catch (error) {
    self.postMessage({ id, error: String(error) });
  }
};
