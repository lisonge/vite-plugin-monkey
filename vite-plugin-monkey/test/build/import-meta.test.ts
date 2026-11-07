import assert from 'node:assert/strict';
import vm from 'node:vm';
import { test } from '../support/fixture.ts';

test.for(
  ['main', 'split', 'worker'].flatMap((mode) =>
    [
      'import.meta.url',
      'import.meta["url"]',
      'import.meta',
      'new URL(globalThis.assetPath, import.meta.url)',
    ].map((expression) => ({ mode, expression })),
  ),
)(
  'reports unresolved module metadata instead of inventing a URL: %j',
  async ({ mode, expression }, { project }) => {
    await project.write({
      'main.js':
        mode === 'worker'
          ? `import W from './worker.js?worker'; new W();`
          : `import './effect.js'; console.log(${expression});`,
      'effect.js': `console.log('effect');`,
      'worker.js': `console.log(${expression});`,
    });
    await assert.rejects(
      project.buildScript(
        {},
        {
          build: {
            rolldownOptions: {
              output: mode === 'split' ? { preserveModules: true } : {},
            },
          },
        },
      ),
      /Unresolved import\.meta.*no stable module URL/,
    );
  },
);

test.for(
  [false, true].flatMap((split) =>
    [false, true].map((resource) => ({ split, resource })),
  ),
)(
  'resolved assets need no module URL, and environment flags still work: %j',
  async ({ split, resource }, { project }) => {
    await project.write({
      'main.js': `import './effect.js';
        globalThis.direct = new URL('data:text/plain,answer', import.meta.url).href;
        globalThis.inline = new URL('./icon.svg', import.meta.url).href;
        globalThis.result = [new URL('./icon.svg#symbol', import.meta.url).href, import.meta.env.DEV, import.meta.env.PROD];`,
      'effect.js': `console.log('effect');`,
      'icon.svg': '<svg xmlns="http://www.w3.org/2000/svg"/>',
    });
    const script = await project.buildScript(
      {
        assets: resource ? { publicPath: 'https://example.test/assets/' } : {},
      },
      {
        build: {
          rolldownOptions: { output: split ? { preserveModules: true } : {} },
        },
      },
    );
    assert.doesNotMatch(
      script.code,
      /vite-plugin-monkey\.invalid|provenance|import\.meta/,
    );
    if (!split) assert.doesNotMatch(script.code, /Missing module registration/);
    const context = vm.createContext({
      URL,
      console: { log() {} },
      GM_getResourceURL: () => 'blob:https://example.test/asset',
    });
    vm.runInContext(script.code, context);
    assert.equal(context.direct, 'data:text/plain,answer');
    assert.match(context.inline, resource ? /^blob:/ : /^data:image\/svg\+xml/);
    assert.match(
      context.result[0],
      resource ? /^blob:.*#symbol$/ : /^data:image\/svg\+xml;base64,.*#symbol$/,
    );
    if (!resource)
      assert.equal(
        await (await fetch(context.result[0])).text(),
        '<svg xmlns="http://www.w3.org/2000/svg"/>',
      );
    assert.deepEqual(Array.from(context.result).slice(1), [false, true]);
  },
);
