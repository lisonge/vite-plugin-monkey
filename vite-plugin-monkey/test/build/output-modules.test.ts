import assert from 'node:assert/strict';
import vm from 'node:vm';
import { test } from '../support/fixture.ts';

for (const nested of [false, true]) {
  test(`resolves chunks with overlapping filenames exactly (nested=${nested})`, async ({
    project,
  }) => {
    await project.write({
      'main.js': `Promise.all([import('./a.js'), import('./ba.js')]).then(modules => globalThis.done(modules.map(module => module.default)));`,
      'a.js': `import { tag } from './shared.js'; export default tag('A');`,
      'ba.js': `import { tag } from './shared.js'; export default tag('BA');`,
      'shared.js': `export const tag = value => value;`,
    });
    const script = await project.buildScript(
      {},
      {
        build: {
          rolldownOptions: {
            output: {
              entryFileNames: nested ? 'entry/start.js' : '__monkey.entry.js',
              chunkFileNames: nested ? 'chunks/[name].js' : '[name].js',
            },
          },
        },
      },
    );
    const completed = Promise.withResolvers<string[]>();
    const context = vm.createContext({
      console,
      setTimeout,
      done: completed.resolve,
    });
    context.self = context;
    vm.runInContext(script.code, context);
    assert.deepEqual(Array.from(await completed.promise), ['A', 'BA']);
  });
}
