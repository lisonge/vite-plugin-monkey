import { expect, test, vi } from 'vitest';
import { npmCdn, gmAutoImportPreset } from '../../src/node/index.ts';
import { registerResource } from '../../src/node/assets/resources.ts';
import { createWorkerRequests } from '../fixtures/shared/worker-requests.ts';

test('CDN resolvers use package versions, provider and optional file overrides', async () => {
  const context = {
    name: '@scope/pkg',
    version: '1.2.3',
    importName: '@scope/pkg',
    resolveName: 'dist/index.js',
  };
  expect(await npmCdn()(context)).toBe(
    'https://cdn.jsdelivr.net/npm/@scope/pkg@1.2.3/dist/index.js',
  );
  expect(await npmCdn({ provider: 'unpkg', path: 'global.js' })(context)).toBe(
    'https://unpkg.com/@scope/pkg@1.2.3/global.js',
  );
  expect(await npmCdn({ provider: 'jsdelivr-fastly' })(context)).toContain(
    'https://fastly.jsdelivr.net/npm/',
  );
});

test('auto-import presets are independent and select manager capabilities', () => {
  const common = gmAutoImportPreset();
  expect(common).toEqual({
    from: '$',
    imports: ['GM', 'unsafeWindow', 'monkeyWindow'],
  });
  common.imports.push('changed');
  expect(gmAutoImportPreset().imports).not.toContain('changed');
  expect(gmAutoImportPreset({ manager: 'tampermonkey' }).imports).toContain(
    'GM_getTabs',
  );
  expect(
    gmAutoImportPreset({ manager: 'violentmonkey' }).imports,
  ).not.toContain('GM_getTabs');
  expect(gmAutoImportPreset({ manager: 'greasemonkey' }).imports).toEqual(
    gmAutoImportPreset().imports,
  );
});

test.each(['__proto__', 'constructor', 'toString'])(
  'resource %s is an own entry and still detects conflicts',
  (name) => {
    const resources = Object.create(null);
    registerResource(resources, {}, name, 'https://example.test/a');
    expect(Object.entries(resources)).toEqual([
      [name, 'https://example.test/a'],
    ]);
    expect(Object.getPrototypeOf(resources)).toBe(null);
    expect(() =>
      registerResource(
        resources,
        Object.fromEntries([[name, 'https://example.test/other']]),
        name,
        'https://example.test/a',
      ),
    ).toThrow('Conflicting');
    registerResource(resources, {}, name, 'https://example.test/a');
    expect(() =>
      registerResource(resources, {}, name, 'https://example.test/b'),
    ).toThrow('Conflicting');
  },
);

test('concurrent Worker event waiters all settle and the next event waits again', async () => {
  const requests = createWorkerRequests();
  const first = requests.event('ready');
  const second = requests.event('ready');
  requests.resolveEvent('ready', 42);
  expect(await Promise.all([first, second])).toEqual([42, 42]);
  const next = requests.waitEvent('ready');
  expect(requests.isWaiting('ready')).toBe(true);
  const rejected = expect(next).rejects.toThrow('stopped');
  const other = expect(requests.waitEvent('ready')).rejects.toThrow('stopped');
  requests.fail(new Error('stopped'));
  await Promise.all([rejected, other]);
  expect(requests.isWaiting('ready')).toBe(false);
});

test('Worker waiters time out together, clean up and accept empty errors', async () => {
  vi.useFakeTimers();
  try {
    const requests = createWorkerRequests();
    const first = expect(requests.waitEvent('ready')).rejects.toThrow(
      'timed out',
    );
    const second = expect(requests.waitEvent('ready')).rejects.toThrow(
      'timed out',
    );
    await vi.advanceTimersByTimeAsync(8000);
    await Promise.all([first, second]);
    expect(requests.isWaiting('ready')).toBe(false);
    const next = requests.waitEvent('ready');
    requests.resolveEvent('ready', 42);
    expect(await next).toBe(42);
    const request = requests.request();
    const failed = expect(request.response).rejects.toThrow('');
    requests.receive({ id: request.id, error: '' });
    await failed;
    expect(vi.getTimerCount()).toBe(0);
  } finally {
    vi.useRealTimers();
  }
});
