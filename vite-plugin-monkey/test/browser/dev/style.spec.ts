import { test, expect } from '../../support/browser.ts';

test('style factories create independent Shadow DOM styles and share current HMR text', async ({
  project,
  page,
  userscript,
  diagnostics,
}) => {
  await project.write({
    'main.js': `
      import createStyle from './panel.css?style';
      let count = 0;
      function add() {
        const host = document.createElement('div');
        host.id = 'panel-' + ++count;
        document.body.append(host);
        const root = host.attachShadow({mode:'open'});
        const span = document.createElement('span');
        span.textContent = 'panel';
        root.append(createStyle(), span);
      }
      add(); add();
      const button = document.createElement('button');
      button.textContent = 'Add panel'; button.onclick = add;
      document.body.append(button);
    `,
    'panel.css': 'span { color: rgb(255, 0, 0); }',
  });
  const { origin } = await project.serve(
    {},
    { server: { watch: {}, hmr: true } },
  );
  await userscript.installDevelopment(
    await (
      await fetch(`${origin}/__vite-plugin-monkey.install.user.js`)
    ).text(),
  );
  for (const id of [1, 2])
    await expect(page.locator(`#panel-${id} span`)).toHaveCSS(
      'color',
      'rgb(255, 0, 0)',
    );
  expect(
    await page.evaluate(() => {
      const first = document
        .querySelector('#panel-1')!
        .shadowRoot!.querySelector('style')!;
      const second = document
        .querySelector('#panel-2')!
        .shadowRoot!.querySelector('style')!;
      return first !== second && first.cloneNode === Node.prototype.cloneNode;
    }),
  ).toBe(true);
  await project.write({ 'panel.css': 'span { color: rgb(0, 0, 255); }' });
  for (const id of [1, 2])
    await expect(page.locator(`#panel-${id} span`)).toHaveCSS(
      'color',
      'rgb(0, 0, 255)',
    );
  await page.getByRole('button', { name: 'Add panel' }).click();
  await expect(page.locator('#panel-3 span')).toHaveCSS(
    'color',
    'rgb(0, 0, 255)',
  );
  await project.write({ 'panel.css': '' });
  await expect
    .poll(() =>
      page.evaluate(() =>
        [1, 2, 3].map(
          (id) =>
            document
              .querySelector(`#panel-${id}`)!
              .shadowRoot!.querySelector('style')!.textContent,
        ),
      ),
    )
    .toEqual(['', '', '']);
  expect(diagnostics.errors).toEqual([]);
});
