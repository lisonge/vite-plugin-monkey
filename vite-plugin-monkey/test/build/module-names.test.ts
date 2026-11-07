import assert from 'node:assert/strict';
import vm from 'node:vm';
import { test } from '../support/fixture.ts';

test.for(
  [false, true].flatMap((split) =>
    ([false, true, 'terser'] as const).map((minify) => ({ split, minify })),
  ),
)(
  'generated names preserve user declarations and global reads: %j',
  async ({ split, minify }, { project }) => {
    if (minify === 'terser') await project.linkDependencies(['terser']);
    await project.write({
      'main.js': `import { value } from './value.js'; import { answer } from 'lib';
        const __vite_ssr_import_0__ = 7;
        const lib0 = 8;
        globalThis.result = [value, answer, __vite_ssr_import_0__,
          typeof register, typeof registry, typeof __vite_ssr_import__,
          typeof __vite_ssr_exports__, typeof __vite_ssr_exportName__,
          lib0, typeof facade, typeof linkage, typeof acquire, typeof relay,
          typeof publish, typeof provenance, typeof principal];
        globalThis.read = () => [register, registry, enroll, catalogue];`,
      'value.js': `export const value = 42;`,
    });
    const script = await project.buildScript(
      {
        dependencies: {
          lib: {
            kind: 'global',
            global: 'catalogue.library',
            urls: ['https://example.test/library.js'],
          },
        },
      },
      {
        build: {
          minify,
          rolldownOptions: { output: split ? { preserveModules: true } : {} },
        },
      },
    );
    const registry = { library: { answer: 43 } };
    const context = vm.createContext({
      register: 'global register',
      registry,
      enroll: 'global enroll',
      catalogue: registry,
    });
    vm.runInContext(script.code, context);
    assert.deepEqual(Array.from(context.result), [
      42,
      43,
      7,
      'string',
      'object',
      'undefined',
      'undefined',
      'undefined',
      8,
      ...Array(7).fill('undefined'),
    ]);
    assert.deepEqual(Array.from(context.read()), [
      'global register',
      registry,
      'global enroll',
      registry,
    ]);
  },
);
