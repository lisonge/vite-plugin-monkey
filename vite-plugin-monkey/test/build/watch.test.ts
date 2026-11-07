import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { test } from '../support/fixture.ts';
import { nextBuild } from '../support/project.ts';
import monkey from '../../src/node/index.ts';

test(
  'watch retains cached dependency metadata and drops it when imports disappear',
  { timeout: 15000 },
  async ({ project }) => {
    const entry = path.join(project.root, 'main.js');
    await project.write({
      'main.js': `import './consumer.js';`,
      'consumer.js': `import text from 'remote-data'; import { value } from 'remote-library'; globalThis.result = [text, value];`,
    });
    const watcher = await project.build({
      build: { watch: {}, write: true },
      plugins: [
        monkey({
          entry: 'main.js',
          output: { script: 'test.user.js' },
          dependencies: {
            'remote-data': {
              kind: 'resource',
              url: 'https://example.test/data.txt',
              loader: 'raw',
            },
            'remote-library': {
              kind: 'global',
              global: 'RemoteLibrary',
              urls: ['https://example.test/library.js'],
            },
          },
        }),
      ],
    });
    const script = () =>
      fs.readFile(path.join(project.root, 'dist/test.user.js'), 'utf8');
    const checkDependencies = (code: string) => {
      assert.match(code, /@require\s+https:\/\/example.test\/library.js/);
      assert.match(
        code,
        /@resource\s+remote-data\s+https:\/\/example.test\/data.txt/,
      );
      assert.match(code, /@grant\s+GM_getResourceText/);
    };
    await nextBuild(watcher);
    checkDependencies(await script());
    for (const source of [
      `import './consumer.js'; console.log('cached consumer');`,
      `console.log('no dependencies');`,
      `import './consumer.js'; console.log('restored consumer');`,
    ]) {
      const rebuilt = nextBuild(watcher);
      await fs.writeFile(entry, source);
      await rebuilt;
      const code = await script();
      if (source.includes('import')) checkDependencies(code);
      else assert.doesNotMatch(code, /@require|@resource|GM_getResourceText/);
    }
  },
);
test(
  'watch rebuild drops removed resource declarations',
  { timeout: 15000 },
  async ({ project }) => {
    const { root } = project;
    await fs.writeFile(path.join(root, 'a.png'), 'image');
    const entry = path.join(root, 'main.js');
    await fs.writeFile(entry, `import a from './a.png'; console.log(a);`);
    const watcher = await project.build({
      build: { watch: {}, write: true },
      plugins: [
        monkey({
          entry: 'main.js',
          userscript: { name: 'Watch fixture' },
          output: { script: 'test.user.js' },
          assets: {
            publicPath: 'https://example.com/',
          },
        }),
      ],
    });

    await nextBuild(watcher);
    assert.match(
      await fs.readFile(path.join(root, 'dist/test.user.js'), 'utf8'),
      /@resource/,
    );
    const rebuilt = nextBuild(watcher);
    await fs.writeFile(entry, `console.log('no assets');`);
    await rebuilt;
    assert.match(
      await fs.readFile(path.join(root, 'dist/test.user.js'), 'utf8'),
      /@name\s+Watch fixture/,
    );
    assert.doesNotMatch(
      await fs.readFile(path.join(root, 'dist/test.user.js'), 'utf8'),
      /@resource|GM_getResourceURL/,
    );
  },
);
