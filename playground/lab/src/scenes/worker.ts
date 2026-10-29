import ProbeWorker from '../worker.ts?worker';
import InlineProbeWorker from '../worker.ts?worker&inline';
import type { WorkerResult, WorkerSnapshot } from '../worker-state.ts';

let nextId = 0;
function request<T>(worker: Worker, value?: number) {
  const id = ++nextId;
  return new Promise<T>((resolve, reject) => {
    const cleanup = () => {
      clearTimeout(timer);
      worker.removeEventListener('message', message);
      worker.removeEventListener('error', error);
    };
    const message = (
      event: MessageEvent<{ id: number; result: T; error?: string }>,
    ) => {
      if (event.data.id !== id) return;
      cleanup();
      if (event.data.error) reject(new Error(event.data.error));
      else resolve(event.data.result);
    };
    const error = (event: ErrorEvent) => {
      cleanup();
      reject(new Error(event.message));
    };
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('Worker 在 10 秒内没有响应'));
    }, 10_000);
    worker.addEventListener('message', message);
    worker.addEventListener('error', error);
    worker.postMessage({ id, value });
  });
}

export async function run(host: HTMLElement) {
  const first = new ProbeWorker({ name: 'monkey-first' });
  const second = new ProbeWorker({ name: 'monkey-second' });
  const inline = new InlineProbeWorker({ name: 'monkey-inline' });
  const section = document.createElement('section');
  const report = (name: string, passed: boolean, detail: string) => {
    const line = document.createElement('p');
    line.textContent = `${passed ? 'PASS' : 'FAIL'} · ${name}: ${detail}`;
    section.append(line);
  };
  host.append(section);
  try {
    const before = await request<WorkerSnapshot>(first);
    report(
      'Worker 懒执行',
      before.lazyExecutions === 0,
      `导入前执行次数 ${before.lazyExecutions}`,
    );
    const a = await request<WorkerResult>(first, 21);
    const again = await request<WorkerResult>(first, 21);
    const untouched = await request<WorkerSnapshot>(second);
    const b = await request<WorkerResult>(second, 21);
    const c = await request<WorkerResult>(inline, 21);
    report(
      'Worker 动态导入 / TLA / 缓存',
      a.answer === 42 &&
        again.calls === 2 &&
        again.lazyExecutions === 1 &&
        again.sameNamespace,
      `answer=${a.answer}, calls=${again.calls}, lazy executions=${again.lazyExecutions}`,
    );
    report(
      'Worker 实例隔离',
      untouched.calls === 0 && untouched.lazyExecutions === 0 && b.calls === 1,
      `first=${again.calls}, second=${b.calls}`,
    );
    report(
      'Worker 内部 SVG / WASM',
      [a, b, c].every((result) => result.svg && result.wasm === 42),
      `SVG=${a.svg}, WASM answer()=${a.wasm}`,
    );
    report(
      'Worker ?inline',
      c.answer === 42 && c.calls === 1 && c.sameNamespace,
      `answer=${c.answer}, calls=${c.calls}`,
    );
  } finally {
    first.terminate();
    second.terminate();
    inline.terminate();
  }
}
