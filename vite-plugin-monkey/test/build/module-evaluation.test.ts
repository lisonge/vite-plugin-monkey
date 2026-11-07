import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';
import { compileModules } from '../../src/node/modules/compile.ts';
import { createModuleRegistry } from '../../src/node/modules/runtime.ts';
import { test } from '../support/fixture.ts';
import { buildOutput } from '../support/project.ts';
import type { TestProject } from '../support/project.ts';

const execute = promisify(execFile);

test.for(
  ['none', 'sync', 'async'].flatMap((cycle) =>
    [false, true].map((failure) => ({ cycle, failure })),
  ),
)('shared async chunks match native ESM evaluation: %j', compareEvaluation);

// Existing limitation: importing a completed member of an asynchronous cycle
// must wait for the cycle root. That requires cycle-group scheduling.
test.fails.for(
  [false, true].map((failure) => ({ cycle: 'external', failure })),
)(
  'TODO: external import waits for the whole async cycle: %j',
  compareEvaluation,
);

async function compareEvaluation(
  { cycle, failure }: { cycle: string; failure: boolean },
  { project }: { project: TestProject },
) {
  await project.write({
    'package.json': '{"type":"module"}',
    'entry.js': `import './a.js'; import './b.js'; import './independent.js'; emit('entry');`,
    'a.js': `import { ready } from './shared.js'; ${cycle !== 'none' ? "import './cycle.js';" : ''} emit('a:' + ready);`,
    'b.js':
      cycle === 'external'
        ? `import './cycle.js'; emit('b:true');`
        : `import { ready } from './shared.js'; emit('b:' + ready);`,
    'cycle.js': `import './a.js'; ${cycle === 'async' ? "emit('cycle:start'); await gate;" : ''} emit('cycle');`,
    'independent.js': `emit('independent');`,
    'shared.js': `export let ready = false; emit('shared:start'); await gate; ready = true; emit('shared:end');`,
  });
  const output = buildOutput(
    await project.build({
      build: {
        target: 'esnext',
        minify: false,
        rolldownOptions: {
          input: path.join(project.root, 'entry.js'),
          preserveEntrySignatures: 'strict',
          output: {
            format: 'es',
            preserveModules: true,
            entryFileNames: '[name].js',
          },
        },
      },
    }),
  );
  const chunks = new Map(
    output.flatMap((item) =>
      item.type === 'chunk' ? [[item.fileName, item.code] as const] : [],
    ),
  );
  assert.ok(chunks.size >= 5);
  await project.write(
    Object.fromEntries(
      [...chunks].map(([name, code]) => ['native/' + name, code]),
    ),
  );
  const compiled = await compileModules(chunks);
  // A fresh Node process uses native ESM, bypassing Vitest's module runner.
  // All three modes execute the same emitted chunk graph.
  await project.write({
    'compare.mjs': `
        import vm from 'node:vm';
        import { setImmediate } from 'node:timers/promises';
        const mode = process.argv[2];
        const sources = ${JSON.stringify(compiled)};
        const events = [];
        const waiting = Promise.withResolvers();
        const independent = Promise.withResolvers();
        const gate = Promise.withResolvers();
        const failure = new Error('shared failed');
        globalThis.gate = gate.promise;
        globalThis.emit = (event) => {
          events.push(event);
          if (event === 'shared:start') waiting.resolve();
          if (event === 'independent') independent.resolve();
        };
        const registry = (${createModuleRegistry.toString()})(mode === 'worker' ? async (id) => {
          await Promise.resolve();
          vm.runInThisContext(sources[id.slice(2)]);
        } : undefined);
        globalThis.__monkeyRegister = registry.register;
        if (mode === 'inline') Object.values(sources).forEach(code => vm.runInThisContext(code));
        const acquire = mode === 'native' ? id => import('./native/' + id.slice(2)) : registry.importModule;
        const settle = promise => promise.then(value => ({ value }), error => ({ error }));
        const first = settle(acquire('./entry.js'));
        await Promise.all([waiting.promise, independent.promise]);
        const concurrent = settle(acquire('./b.js'));
        await setImmediate();
        const paused = [...events];
        ${failure ? 'gate.reject(failure);' : 'gate.resolve();'}
        const result = await first;
        const sibling = await concurrent;
        const repeated = await settle(acquire('./entry.js'));
        console.log(JSON.stringify({
          paused, events,
          failed: result.error === failure,
          siblingFailed: sibling.error === failure,
          cached: result.error ? repeated.error === result.error : repeated.value === result.value,
        }));
      `,
  });
  const results = await Promise.all(
    ['native', 'inline', 'worker'].map(async (mode) => {
      const { stdout } = await execute(
        process.execPath,
        [path.join(project.root, 'compare.mjs'), mode],
        { timeout: 10_000 },
      );
      return JSON.parse(stdout);
    }),
  );
  const paused = [
    'shared:start',
    ...(cycle === 'none' ? [] : [cycle === 'async' ? 'cycle:start' : 'cycle']),
    'independent',
  ];
  assert.deepEqual(results[0], {
    paused,
    events: failure
      ? paused
      : [
          ...paused,
          'shared:end',
          ...(cycle === 'async'
            ? ['cycle', 'b:true', 'a:true']
            : ['a:true', 'b:true']),
          'entry',
        ],
    failed: failure,
    siblingFailed: failure,
    cached: true,
  });
  assert.deepEqual(
    results[1],
    results[0],
    'inline registry differs from native ESM',
  );
  assert.deepEqual(
    results[2],
    results[0],
    'Worker loader differs from native ESM',
  );
}
