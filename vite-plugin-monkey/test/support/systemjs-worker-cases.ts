import { test as base, expect } from './browser.ts';
import {
  buildSystemWorker,
  createWorkerLab,
  type WorkerTransport,
} from './systemjs-worker.ts';

const settle = (promise: Promise<unknown>) =>
  promise.then(
    (value) => ({ value }),
    (error: unknown) => ({ error: String(error) }),
  );

export function registerSystemWorkerTests(mode: WorkerTransport) {
  const test = base.extend<{
    workerLab: Awaited<ReturnType<typeof createWorkerLab>>;
  }>({
    workerLab: async (
      { project, page, host, diagnostics, disposables },
      use,
    ) => {
      void host;
      const source = await buildSystemWorker(project, mode);
      project.artifacts.set('systemjs-worker.js', source);
      await use(
        await createWorkerLab({ page, diagnostics, disposables }, source),
      );
    },
  });

  test.describe(`Worker + SystemJS contract (${mode})`, () => {
    test('defers dynamic execution and caches concurrent/repeated imports', async ({
      workerLab: lab,
    }) => {
      const worker = await lab.create();
      expect(await worker.call('snapshot')).toMatchObject({ events: [] });
      expect(await worker.call('loaded')).not.toContain('lazy.js');
      expect(await worker.call('lazy')).toEqual({
        sameNamespace: true,
        sameAsPrevious: true,
        value: 11,
        events: ['lazy:execute'],
      });
      expect(await worker.call('lazy')).toEqual({
        sameNamespace: true,
        sameAsPrevious: true,
        value: 12,
        events: ['lazy:execute'],
      });
      const loaded = await worker.call('loaded');
      expect(loaded).toEqual(expect.arrayContaining(['lazy.js']));
      expect(
        (loaded as string[]).filter((name) => name === 'lazy.js'),
      ).toHaveLength(1);
      expect(
        lab.requests.filter((url) => url.startsWith('https://monkey.invalid/')),
      ).toEqual([]);
    });

    test('links a preserved cross-module cycle in both directions', async ({
      workerLab,
    }) => {
      const worker = await workerLab.create();
      expect(await worker.call('snapshot')).toMatchObject({
        cycle: { a: 'A0', b: 'B0', fromA: 'B0', fromB: 'A0' },
      });
      expect(await worker.call('mutateCycle')).toMatchObject({
        cycle: { a: 'A1', b: 'B1', fromA: 'B1', fromB: 'A1' },
      });
    });

    test('updates direct, re-exported and namespace live bindings', async ({
      workerLab,
    }) => {
      const worker = await workerLab.create();
      expect(await worker.call('snapshot')).toMatchObject({
        count: 0,
        bindings: { direct: 0, reexported: 0 },
      });
      expect(await worker.call('mutate', 4)).toMatchObject({
        count: 4,
        bindings: { direct: 4, reexported: 4 },
      });
      expect(await worker.call('bindings')).toEqual({
        direct: 5,
        reexported: 5,
        namespace: 5,
      });
      expect(await worker.call('bindings')).toEqual({
        direct: 6,
        reexported: 6,
        namespace: 6,
      });
    });

    test('waits for top-level await before executing its static importer', async ({
      workerLab,
    }) => {
      const worker = await workerLab.create();
      const result = settle(worker.call('loadTla'));
      await worker.event('tla:waiting');
      expect(await worker.call('snapshot')).toMatchObject({
        events: ['tla:waiting'],
      });
      await worker.call('releaseTla');
      expect(await result).toEqual({ value: 42 });
      expect(await worker.call('snapshot')).toMatchObject({
        events: ['tla:waiting', 'tla:complete', 'tla:importer', 'tla:resolved'],
      });
    });

    test('propagates rejected top-level await to the dynamic import caller', async ({
      workerLab,
    }) => {
      const worker = await workerLab.create();
      await expect(worker.call('rejectTla')).rejects.toThrow('TLA rejected');
      await expect(worker.call('rejectTla')).rejects.toThrow('TLA rejected');
      expect(await worker.call('snapshot')).toMatchObject({ count: 0 });
    });

    test('isolates module state, lazy execution and TLA gates across Workers', async ({
      workerLab: lab,
    }) => {
      const a = await lab.create();
      const b = await lab.create();
      await a.call('mutate', 7);
      await a.call('mutateCycle');
      await a.call('lazy');
      expect(await b.call('snapshot')).toMatchObject({
        count: 0,
        bindings: { direct: 0, reexported: 0 },
        cycle: { a: 'A0', b: 'B0', fromA: 'B0', fromB: 'A0' },
        events: [],
      });
      expect(await b.call('loaded')).not.toContain('lazy.js');
      await b.call('mutate', 2);
      expect(await a.call('snapshot')).toMatchObject({ count: 7 });
      expect(await b.call('lazy')).toMatchObject({
        value: 11,
        events: ['lazy:execute'],
      });
      expect(await a.call('lazy')).toMatchObject({
        value: 12,
        events: ['lazy:execute'],
      });

      const resultA = settle(a.call('loadTla'));
      const resultB = settle(b.call('loadTla'));
      await Promise.all([a.event('tla:waiting'), b.event('tla:waiting')]);
      await a.call('releaseTla');
      expect(await resultA).toEqual({ value: 42 });
      expect(await b.call('snapshot')).toMatchObject({
        events: ['lazy:execute', 'tla:waiting'],
      });
      await b.call('releaseTla');
      expect(await resultB).toEqual({ value: 42 });
      expect(await b.call('snapshot')).toMatchObject({
        count: 2,
        events: [
          'lazy:execute',
          'tla:waiting',
          'tla:complete',
          'tla:importer',
          'tla:resolved',
        ],
      });
    });
  });
}
