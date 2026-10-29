import { test, expect } from '../../support/browser.ts';

for (const transformer of ['postcss', 'lightningcss'] as const) {
  test(`${transformer} inlines CSS resources on external pages and refreshes them through HMR`, async ({
    project,
    page,
    userscript,
    diagnostics,
  }) => {
    const svg = (color: string) =>
      `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="${color}"/></svg>`;
    await project.write({
      'main.js': `
        import './plain.css';
        import classes from './module.module.css';
        import inline from './inline.css?inline';
        import createStyle from './shadow.css?style';
        document.body.innerHTML = '<div id="plain"></div><div id="module"></div><div id="inline"></div><div id="shadow"></div>';
        document.querySelector('#module').className = classes.panel;
        const style = document.createElement('style'); style.textContent = inline; document.head.append(style);
        const shadow = document.querySelector('#shadow').attachShadow({mode:'open'});
        shadow.innerHTML = '<div id="target"></div>'; shadow.append(createStyle());
      `,
      'plain.css': '#plain {background-image:url("./icon.svg?no-inline")}',
      'module.module.css':
        '.panel {background-image:url("./icon.svg?no-inline")}',
      'inline.css': '#inline {background-image:url("./icon.svg?no-inline")}',
      'shadow.css': '#target {background-image:url("./icon.svg?no-inline")}',
      'icon.svg': svg('red'),
    });
    const { origin } = await project.serve(
      {},
      { base: '/dev/', css: { transformer }, server: { watch: {}, hmr: true } },
    );
    await userscript.installDevelopment(
      await (
        await fetch(origin + '/dev/__vite-plugin-monkey.install.user.js')
      ).text(),
    );
    const background = (selector: string) =>
      page
        .locator(selector)
        .evaluate((element) => getComputedStyle(element).backgroundImage);
    const red = Buffer.from(svg('red')).toString('base64');
    const blue = Buffer.from(svg('blue')).toString('base64');
    for (const selector of ['#plain', '#module', '#inline', '#target'])
      await expect.poll(() => background(selector)).toContain(red);
    await project.write({ 'icon.svg': svg('blue') });
    // The manually inserted ?inline string has no consumer HMR handler.
    for (const selector of ['#plain', '#module', '#target'])
      await expect.poll(() => background(selector)).toContain(blue);
    expect(
      diagnostics.requests.filter((url) => /\/icon\.svg(?:[?#]|$)/.test(url)),
    ).toEqual([]);
    expect(diagnostics.errors).toEqual([]);
  });
}
