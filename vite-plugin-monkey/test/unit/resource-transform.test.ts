import assert from 'node:assert/strict';
import vm from 'node:vm';
import { test } from 'vitest';
import { parseSync } from 'vite';
import type { Rolldown } from 'vite';
import {
  createAssetMarker,
  rewriteAssetMarkers,
} from '../../src/node/assets/markers.ts';
import { registerResource } from '../../src/node/assets/resources.ts';

const context = {
  parse: (code: string) => parseSync('fixture.js', code).program,
} as Rolldown.PluginContext;

test.for(['ASSET', 'WORKER_ASSET'])(
  'preserves strings, interpolation and resource suffixes for %s',
  (kind) => {
    const marker = createAssetMarker(kind);
    const first = marker.encode('images/图#标.svg') + '?color=red#icon';
    const second = marker.encode('fonts/a.woff2') + '#font';
    const literal = 'url("' + first + '")\\n' + second;
    const code =
      'globalThis.result = [' +
      JSON.stringify(literal) +
      ', `before ${' +
      JSON.stringify(first) +
      '} / ' +
      second +
      ' / ${2 + 3}`];';
    const names: string[] = [];
    const transformed = rewriteAssetMarkers(context, code, {
      marker,
      resolve(name) {
        names.push(name);
        return JSON.stringify('blob:' + name);
      },
    });
    const sandbox = vm.createContext({});
    vm.runInContext(transformed, sandbox);
    assert.deepEqual(Array.from(sandbox.result), [
      'url("blob:images/图#标.svg?color=red#icon")\\nblob:fonts/a.woff2#font',
      'before blob:images/图#标.svg?color=red#icon / blob:fonts/a.woff2#font / 5',
    ]);
    assert.deepEqual(
      new Set(names),
      new Set(['images/图#标.svg', 'fonts/a.woff2']),
    );
  },
);

test('resource registration rejects conflicts against both emitted and declared URLs', () => {
  const collected: Record<string, string> = Object.create(null);
  registerResource(
    collected,
    { image: 'https://example.test/image' },
    'image',
    'https://example.test/image',
  );
  registerResource(
    collected,
    { image: 'https://example.test/image' },
    'image',
    'https://example.test/image',
  );
  assert.throws(
    () =>
      registerResource(
        collected,
        undefined,
        'image',
        'https://example.test/other',
      ),
    /Conflicting resource/,
  );
  assert.throws(
    () =>
      registerResource(
        collected,
        { image: 'https://example.test/other' },
        'image',
        'https://example.test/image',
      ),
    /Conflicting resource/,
  );
  assert.deepEqual({ ...collected }, { image: 'https://example.test/image' });
});
