import assert from 'node:assert/strict';
import vm from 'node:vm';
import { test } from 'vitest';
import { serverInjectFn } from '../../src/node/runtime/templates.ts';
import { stringifyFunction } from '../../src/node/utils/others.ts';

test.each([false, true])(
  'serialized sandbox injection retains GM access and Trusted Types=%s',
  (trusted) => {
    let reads = 0;
    const entry = 'http://localhost:4567/entry.js';
    const script = { type: '', src: undefined as unknown };
    const trustedUrl = { toString: () => entry };
    const window = {
      get GM() {
        reads++;
        return {};
      },
      trustedTypes: trusted
        ? {
            createPolicy(
              name: string,
              rules: { createScriptURL(input: string): string },
            ) {
              assert.equal(name, 'bridge');
              assert.equal(rules.createScriptURL(entry), entry);
              return { createScriptURL: () => trustedUrl };
            },
          }
        : undefined,
    };
    const appended: unknown[] = [];
    const document = {
      head: null,
      documentElement: { append: (value: unknown) => appended.push(value) },
      createElement: (name: string) => {
        assert.equal(name, 'script');
        return script;
      },
      bridge: undefined as unknown,
    };
    vm.runInNewContext(
      stringifyFunction(serverInjectFn, entry, 'bridge', 1, 'project'),
      { window, document },
    );
    assert.equal(reads, 1);
    const bridge = document.bridge as {
      sandbox: unknown;
      project: string;
      version: number;
    };
    assert.equal(bridge.sandbox, window);
    assert.equal(bridge.project, 'project');
    assert.equal(bridge.version, 1);
    assert.equal(script.src, trusted ? trustedUrl : entry);
    assert.equal(script.type, 'module');
    assert.deepEqual(appended, [script]);
  },
);
