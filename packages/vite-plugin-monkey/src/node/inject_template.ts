export const fn2string = <T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
) => {
  return `;(${fn})(...${JSON.stringify(args, undefined, 2)});`;
};

const htmlText = /* html */ `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="https://vitejs.dev/logo.svg" />
    <title>Vite</title>
  </head>
  <script type="module" data-source="vite-plugin-monkey">
  __CODE__
  </script>
</html>
`.trimStart();

export const fcToHtml = <T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
) => {
  return htmlText.replace(
    `__CODE__`,
    `;(${fn})(...${JSON.stringify(args, void 0, 2)});`,
  );
};

export const serverInjectFn = ({ entrySrc = `` }) => {
  // @ts-ignore
  window.GM; // must exist, see https://github.com/Tampermonkey/tampermonkey/issues/1567

  const key = `__monkeyWindow-` + new URL(entrySrc).origin;
  // @ts-ignore
  document[key] = window;
  console.log(`[vite-plugin-monkey] mount monkeyWindow to document`);

  const entryScript = document.createElement('script');
  entryScript.type = 'module';
  entryScript.src = entrySrc;
  document.head.insertBefore(entryScript, document.head.firstChild);
  console.log(`[vite-plugin-monkey] mount entry module to document.head`);
};

export const cssInjectFn = (css: string) => {
  const style = document.createElement('style');
  style.dataset.source = 'vite-plugin-monkey';
  style.textContent = css;
  document.head.append(style);
};

export const mountGmApiFn = (meta: ImportMeta) => {
  const key = `__monkeyWindow-` + new URL(meta.url).origin;
  // @ts-ignore
  const monkeyWindow: Window = document[key];
  if (!monkeyWindow) {
    console.log(`[vite-plugin-monkey] not found monkeyWindow`);
    return;
  }

  // @ts-ignore
  window.unsafeWindow = window;
  console.log(`[vite-plugin-monkey] mount unsafeWindow to unsafeWindow`);

  const mountedApiList: string[] = [];
  Object.entries(monkeyWindow)
    .filter(([k]) => k.startsWith('GM'))
    .forEach(([k, fn]) => {
      // @ts-ignore
      window[k] = fn;
      mountedApiList.push(k);
    });
  console.log(
    `[vite-plugin-monkey] mount ${mountedApiList.length} GM_api to unsafeWindow`,
  );
};

export const virtualHtmlTemplate = async (url: string) => {
  const delay = async (n = 0) => {
    await new Promise<void>((res) => {
      setTimeout(res, n);
    });
  };
  await delay();
  const u = new URL(url, location.origin);
  u.searchParams.set('origin', u.origin);
  if (window == window.parent) {
    location.href = u.href;
    await delay(500);
    window.close();
    return;
  }
  // if in iframe, like codesandbox
  const style = document.createElement('style');
  document.head.append(style);
  style.innerText = /* css */ `
  .App {
    margin-top: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .App > .title {
    padding: 4px;
    font-size: 15px;
  }
  .App > a {
    font-size: 32px;
    text-align: center;
  }
`.trim();
  document.body.innerHTML = /* html */ `
  <div class="App">
    <div class="title"> please click the link below to install userscipt </div>
    <a target="_blank"></a>
  </div>
  `.trim();
  await delay();
  const a = document.querySelector('a')!;
  a.href = location.href;
  a.text = location.href;
};

export const previewTemplate = async (urls: string[]) => {
  const delay = async (n = 0) => {
    await new Promise<void>((res) => {
      setTimeout(res, n);
    });
  };
  await delay();
  const style = document.createElement('style');
  document.head.append(style);
  style.innerText = /* css */ `
  .App {
    margin-top: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .App > .title {
    padding: 4px;
    font-size: 15px;
  }
  .App > a {
    font-size: 32px;
    text-align: center;
  }
`.trim();
  if (window == window.parent && urls.length == 1) {
    const u = new URL(urls[0], location.origin);
    location.href = u.href;
    await delay(500);
    window.close();
    return;
  } else if (urls.length == 0) {
    document.body.innerHTML = /* html */ `
    <div class="App">
      <div class="title"> There is no script to install </div>
    </div>
    `.trim();
    return;
  } else {
    document.body.innerHTML = /* html */ `
    <div class="App">
      <div class="title"> please click the link below to install userscipt </div>
    </div>
    `.trim();
    await delay();
    const div = document.querySelector<HTMLElement>(`.App`)!;
    urls.forEach((u) => {
      const a = document.createElement('a');
      if (window != window.parent) {
        a.target = '_blank';
      }
      a.href = u;
      a.textContent = new URL(u, location.origin).href;
      div.append(a);
    });
  }
};
