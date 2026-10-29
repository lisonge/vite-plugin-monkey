import assert from 'node:assert/strict';
import { preview } from 'vite';
import monkey from '../../../src/node/index.ts';
import { expect, test } from '../../support/browser.ts';

const cases = [
  { name: 'shows the empty state', scripts: [], iframe: false },
  {
    name: 'opens a single userscript',
    scripts: ['only.user.js'],
    iframe: false,
  },
  {
    name: 'lists multiple userscripts',
    scripts: ['z.user.js', 'a.user.js'],
    iframe: false,
  },
  {
    name: 'links directly to a userscript in an iframe',
    scripts: ['only.user.js'],
    iframe: true,
  },
];

for (const base of ['/', '/dev/'])
  for (const { name, scripts, iframe } of cases) {
    test(`preview installation page ${name} base=${base}`, async ({
      project,
      page,
      host,
      disposables,
      diagnostics,
    }) => {
      await project.write({
        'main.js': '',
        'dist/.keep': '',
        ...Object.fromEntries(
          scripts.map((file) => ['dist/' + file, '// userscript']),
        ),
      });
      const server = await preview({
        root: project.root,
        base,
        configFile: false,
        logLevel: 'silent',
        preview: { host: '127.0.0.1', port: 0, open: false },
        plugins: [monkey({ entry: 'main.js' })],
      });
      disposables.defer(() => server.close());
      const address = server.httpServer.address();
      assert.ok(address && typeof address !== 'string');
      const origin = 'http://127.0.0.1:' + address.port + base.slice(0, -1);
      await page.context().route(origin + '/*.user.js', (route) =>
        route.fulfill({
          contentType: 'text/html',
          body: '<h1>Userscript target</h1>',
        }),
      );

      if (iframe) {
        await page.evaluate((origin) => {
          const frame = document.createElement('iframe');
          frame.src = origin + '/';
          document.body.append(frame);
        }, origin);
        const link = page.frameLocator('iframe').getByRole('link');
        await expect(link).toHaveAttribute('href', origin + '/only.user.js');
        await expect(link).toHaveAttribute('target', '_blank');
        const popupPromise = page.waitForEvent('popup');
        await link.click();
        const popup = await popupPromise;
        await expect(popup).toHaveURL(origin + '/only.user.js');
        await expect(popup.getByRole('heading')).toHaveText(
          'Userscript target',
        );
        await expect(page).toHaveURL(host + '/');
      } else {
        await page.goto(origin + '/', { waitUntil: 'commit' });
        if (scripts.length === 0) {
          await expect(page.getByRole('heading')).toHaveText(
            'There is no script to install',
          );
          await expect(page.getByRole('link')).toHaveCount(0);
        } else if (scripts.length === 1) {
          await expect(page).toHaveURL(origin + '/only.user.js');
          await expect(page.getByRole('heading')).toHaveText(
            'Userscript target',
          );
        } else {
          const links = page.getByRole('link');
          await expect(links).toHaveText([
            origin + '/a.user.js',
            origin + '/z.user.js',
          ]);
          await expect(links.nth(0)).toHaveAttribute(
            'href',
            origin + '/a.user.js',
          );
          await expect(links.nth(1)).toHaveAttribute(
            'href',
            origin + '/z.user.js',
          );
          await expect(page).toHaveURL(origin + '/');
        }
      }
      expect(diagnostics.errors).toEqual([]);
    });
  }
