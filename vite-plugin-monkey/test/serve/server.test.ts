import monkey from '../../src/node/index.ts';
import assert from 'node:assert/strict';
import path from 'node:path';
import { test } from '../support/fixture.ts';
test.for(['/', '/dev/'])(
  'installation and entry endpoints work with base=%s',
  async (base, { project }) => {
    await project.write({ 'main.js': 'globalThis.answer = 42;' });
    const { origin } = await project.serve(
      { userscript: { name: 'Fixture', match: 'https://example.test/*' } },
      { base },
    );
    const install = await fetch(
      `${origin}/__vite-plugin-monkey.install.user.js?origin=${encodeURIComponent(origin)}`,
    );
    assert.equal(install.status, 200);
    assert.match(install.headers.get('content-type')!, /javascript/);
    assert.equal(install.headers.get('access-control-allow-origin'), '*');
    assert.equal(
      install.headers.get('access-control-allow-private-network'),
      'true',
    );
    const code = await install.text();
    assert.match(code, /==UserScript==/);
    assert.match(code, /Fixture/);
    assert.ok(code.includes(`${origin}${base}__vite-plugin-monkey.entry.js`));
    const entry = await fetch(`${origin}/__vite-plugin-monkey.entry.js`);
    assert.equal(entry.status, 200);
    assert.match(await entry.text(), /main\.js/);
    const module = await fetch(`${origin}${base}main.js`);
    assert.equal(module.status, 200);
    assert.match(await module.text(), /answer = 42/);
  },
);

for (const outsideRoot of [false, true]) {
  test.for(['/', '/dev/'])(
    `entry files ${outsideRoot ? 'outside' : 'inside'} root preserve spaces, Unicode and % with base=%s`,
    async (base, { project }) => {
      const file = 'main 100% 入口.ts';
      const directory = outsideRoot ? 'shared' : 'app/src';
      await project.write({
        'app/package.json': '{"name":"entry-url-test"}',
        [`${directory}/${file}`]:
          'const answer: number = 42; export { answer };',
      });
      const { origin } = await project.serve(
        { entry: `${outsideRoot ? '../shared' : 'src'}/${file}` },
        { root: path.join(project.root, 'app'), base },
      );
      const response = await fetch(
        `${origin}${base}__vite-plugin-monkey.entry.js`,
      );
      assert.equal(response.status, 200);
      const imports = [
        ...(await response.text()).matchAll(
          /await import\(new URL\(("(?:\\.|[^"\\])*"), import\.meta\.url\)\.href\);/g,
        ),
      ];
      const entryUrl = new URL(JSON.parse(imports.at(-1)![1]), response.url);
      assert.equal(entryUrl.hash, '');
      assert.equal(entryUrl.search, '');
      assert.ok(entryUrl.pathname.endsWith('/' + encodeURIComponent(file)));
      if (outsideRoot) assert.ok(entryUrl.pathname.startsWith(base + '@fs/'));
      else
        assert.equal(
          entryUrl.pathname,
          base + 'src/' + encodeURIComponent(file),
        );
      const module = await fetch(entryUrl);
      assert.equal(module.status, 200);
      assert.match(module.headers.get('content-type')!, /javascript/);
      const code = await module.text();
      const { answer } = await import(
        'data:text/javascript;base64,' + Buffer.from(code).toString('base64')
      );
      assert.equal(answer, 42);
    },
  );
}

test('entry bootstrap encodes # as a filename character rather than a URL fragment', async ({
  project,
}) => {
  await project.write({ 'main#entry.ts': 'export const answer = 42;' });
  const { origin } = await project.serve(
    { entry: 'main#entry.ts' },
    { base: '/dev/' },
  );
  const response = await fetch(origin + '/dev/__vite-plugin-monkey.entry.js');
  assert.equal(response.status, 200);
  const code = await response.text();
  const imports = [
    ...code.matchAll(
      /await import\(new URL\(("(?:\\.|[^"\\])*"), import\.meta\.url\)\.href\);/g,
    ),
  ];
  const entryUrl = new URL(JSON.parse(imports.at(-1)![1]), response.url);
  assert.equal(entryUrl.pathname, '/dev/main%23entry.ts');
  assert.equal(entryUrl.hash, '');
  assert.equal(decodeURIComponent(entryUrl.pathname), '/dev/main#entry.ts');
  // This checks bootstrap encoding only: Vite's module loader does not support
  // # in source filenames, so this is not an executable-entry regression.
});
test('client bridge does not mount APIs on the page window', async ({
  project,
}) => {
  await project.write({ 'main.js': '' });
  const { origin } = await project.serve();
  const response = await fetch(`${origin}/__vite-plugin-monkey.gm.api.js`);
  assert.equal(response.status, 404);
  const entry = await fetch(`${origin}/__vite-plugin-monkey.entry.js`);
  assert.doesNotMatch(await entry.text(), /gm\.api\.js/);
});

test.for([undefined, false, true, '/install'])(
  'Vite owns server.open=%s',
  async (open, { project }) => {
    await project.write({ 'main.js': '' });
    const server = await project.createServer({
      server: { open },
      plugins: [monkey({ entry: 'main.js' })],
    });
    assert.equal(server.config.server.open, open ?? false);
  },
);
