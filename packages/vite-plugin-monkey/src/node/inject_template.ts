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

export interface ScriptOptions {
  entrySrc: string;
}
export const serverInjectFn = ({ entrySrc }: ScriptOptions) => {
  /// https://github.com/Tampermonkey/tampermonkey/issues/1567
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  window.GM; // must exist, see https://github.com/Tampermonkey/tampermonkey/issues/1567

  const key = `__monkeyWindow-` + new URL(entrySrc).origin;
  // @ts-ignore
  document[key] = window;
  console.log(`[vite-plugin-monkey] mount monkeyWindow to document`);
  // @ts-ignore
  if (typeof GM_addElement === 'function') {
    // @ts-ignore
    GM_addElement(document.head, 'script', {
      type: 'module',
      src: entrySrc,
    });
  } else {
    const script = document.createElement('script');
    script.type = 'module';
    // @ts-ignore
    if (window.trustedTypes) {
      // https://github.com/lisonge/vite-plugin-monkey/issues/205
      // @ts-ignore
      const policy = window.trustedTypes.createPolicy(key, {
        createScriptURL: (input: unknown) => input,
      });
      const trustedScriptURL = policy.createScriptURL(entrySrc);
      script.src = trustedScriptURL;
    } else {
      script.src = entrySrc;
    }
    document.head.append(script);
  }
  console.log(`[vite-plugin-monkey] mount entry module to document.head`);
};

export const mountGmApiFn = (meta: ImportMeta, apiNames: string[] = []) => {
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

  apiNames.push('GM');
  let mountedApiSize = 0;
  apiNames.forEach((apiName) => {
    // @ts-ignore
    const fn = monkeyWindow[apiName];
    if (fn) {
      // @ts-ignore
      window[apiName] = monkeyWindow[apiName];
      mountedApiSize++;
    }
  });
  console.log(
    `[vite-plugin-monkey] mount ${mountedApiSize}/${apiNames.length} GM api to unsafeWindow`,
  );
};

export const virtualHtmlTemplate = async (url: string) => {
  const delay = (n = 0) => new Promise<void>((res) => setTimeout(res, n));
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
  body {
    font-family: Arial, sans-serif;
    margin: 0;
  }
  .App {
    margin: 25px;
  }
  p {
    font-size: 1.5em;
  }
  a {
    color: blue;
    text-decoration: none;
    font-size: 1.5em;
  }
  a:hover {
    text-decoration: underline;
  }
`.trim();
  document.body.innerHTML = /* html */ `
  <div class="App">
    <h1>PREVIEW PAGE</h1>
    <p>Click the links below to install userscripts:</p>
    <a target="_blank"></a></th>
  </div>
  `.trim();
  await delay();
  const a = document.querySelector('a')!;
  a.href = location.href;
  a.text = location.href;
};

export const previewTemplate = async (urls: string[]) => {
  const delay = (n = 0) => new Promise<void>((res) => setTimeout(res, n));
  await delay();
  const style = document.createElement('style');
  document.head.append(style);
  style.innerText = /* css */ `
  body {
    font-family: Arial, sans-serif;
    margin: 0;
  }
  .App {
    margin: 25px;
  }
  p {
    font-size: 1.5em;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1.5em;
  }
  th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  a {
    color: blue;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
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
      <h1> There is no script to install </h1>
    </div>
    `.trim();
    return;
  } else {
    document.body.innerHTML = /* html */ `
    <div class="App">
      <h1>PREVIEW PAGE</h1>
      <p>Click the links below to install userscripts:</p>
      <table>
        <tr>
          <th>No.</th>
          <th>Install Link</th>
        </tr>
      </table>
    </div>
    `.trim();
    await delay();
    const table = document.querySelector<HTMLElement>(`table`)!;
    urls.sort().forEach((u, index) => {
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      const a = document.createElement('a');
      td1.innerText = `${index + 1}`;
      if (window != window.parent) {
        a.target = '_blank';
      }
      a.href = u;
      a.textContent = new URL(u, location.origin).href;
      td2.append(a);
      tr.append(td1);
      tr.append(td2);
      table.append(tr);
    });
  }
};
