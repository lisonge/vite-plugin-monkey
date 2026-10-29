import { expect, test } from '../../support/browser.ts';

for (const iframe of [false, true]) {
  test(`development installation ${iframe ? 'links from an iframe' : 'redirects'} directly to the userscript with its origin`, async ({
    project,
    page,
    host,
    diagnostics,
  }) => {
    await project.write({ 'main.js': '' });
    const { origin } = await project.serve({}, { base: '/dev/' });
    const target = new URL('/dev/__vite-plugin-monkey.install.user.js', origin);
    target.searchParams.set('origin', origin);
    await page.context().route(origin + '/dev/*.user.js?*', (route) =>
      route.fulfill({
        contentType: 'text/html',
        body: '<h1>Development userscript target</h1>',
      }),
    );
    if (iframe) {
      await page.evaluate((origin) => {
        const frame = document.createElement('iframe');
        frame.src = origin + '/dev/';
        document.body.append(frame);
      }, origin);
      const link = page.frameLocator('iframe').getByRole('link');
      await expect(link).toHaveAttribute('href', target.href);
      await expect(link).toHaveAttribute('target', '_blank');
      const popupPromise = page.waitForEvent('popup');
      await link.click();
      const popup = await popupPromise;
      await expect(popup).toHaveURL(target.href);
      await expect(popup.getByRole('heading')).toHaveText(
        'Development userscript target',
      );
      await expect(page).toHaveURL(host + '/');
    } else {
      await page.goto(origin + '/dev/', { waitUntil: 'commit' });
      await expect(page).toHaveURL(target.href);
      await expect(page.getByRole('heading')).toHaveText(
        'Development userscript target',
      );
    }
    expect(diagnostics.errors).toEqual([]);
  });
}
