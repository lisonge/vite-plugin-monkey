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

  // GM api is undefined in Via|X browser
  // Via|X browser GM Api is local variable
  // so need register api in window
  // @ts-ignore
  if (typeof unsafeWindow !== 'undefined' && unsafeWindow == window) {
    // @ts-ignore
    if (window.GM == null && typeof GM === 'object') {
      // @ts-ignore
      window.GM = GM;
    }
    // @ts-ignore
    if (typeof GM_addElement !== 'undefined' && window.GM_addElement == null) {
      // @ts-ignore
      window.GM_addElement = GM_addElement;
    }
    // @ts-ignore
    if (typeof GM_addStyle !== 'undefined' && window.GM_addStyle == null) {
      // @ts-ignore
      window.GM_addStyle = GM_addStyle;
    }
    if (
      // @ts-ignore
      typeof GM_addValueChangeListener !== 'undefined' &&
      // @ts-ignore
      window.GM_addValueChangeListener == null
    ) {
      // @ts-ignore
      window.GM_addValueChangeListener = GM_addValueChangeListener;
    }
    // @ts-ignore
    if (typeof GM_cookie !== 'undefined' && window.GM_cookie == null) {
      // @ts-ignore
      window.GM_cookie = GM_cookie;
    }
    if (
      // @ts-ignore
      typeof GM_deleteValue !== 'undefined' &&
      // @ts-ignore
      window.GM_deleteValue == null
    ) {
      // @ts-ignore
      window.GM_deleteValue = GM_deleteValue;
    }
    // @ts-ignore
    if (typeof GM_download !== 'undefined' && window.GM_download == null) {
      // @ts-ignore
      window.GM_download = GM_download;
    }
    if (
      // @ts-ignore
      typeof GM_getResourceText !== 'undefined' &&
      // @ts-ignore
      window.GM_getResourceText == null
    ) {
      // @ts-ignore
      window.GM_getResourceText = GM_getResourceText;
    }
    if (
      // @ts-ignore
      typeof GM_getResourceURL !== 'undefined' &&
      // @ts-ignore
      window.GM_getResourceURL == null
    ) {
      // @ts-ignore
      window.GM_getResourceURL = GM_getResourceURL;
    }
    // @ts-ignore
    if (typeof GM_getTab !== 'undefined' && window.GM_getTab == null) {
      // @ts-ignore
      window.GM_getTab = GM_getTab;
    }
    // @ts-ignore
    if (typeof GM_getTabs !== 'undefined' && window.GM_getTabs == null) {
      // @ts-ignore
      window.GM_getTabs = GM_getTabs;
    }
    // @ts-ignore
    if (typeof GM_getValue !== 'undefined' && window.GM_getValue == null) {
      // @ts-ignore
      window.GM_getValue = GM_getValue;
    }
    // @ts-ignore
    if (typeof GM_info !== 'undefined' && window.GM_info == null) {
      // @ts-ignore
      window.GM_info = GM_info;
    }
    // @ts-ignore
    if (typeof GM_listValues !== 'undefined' && window.GM_listValues == null) {
      // @ts-ignore
      window.GM_listValues = GM_listValues;
    }
    // @ts-ignore
    if (typeof GM_log !== 'undefined' && window.GM_log == null) {
      // @ts-ignore
      window.GM_log = GM_log;
    }
    if (
      // @ts-ignore
      typeof GM_notification !== 'undefined' &&
      // @ts-ignore
      window.GM_notification == null
    ) {
      // @ts-ignore
      window.GM_notification = GM_notification;
    }
    // @ts-ignore
    if (typeof GM_openInTab !== 'undefined' && window.GM_openInTab == null) {
      // @ts-ignore
      window.GM_openInTab = GM_openInTab;
    }
    if (
      // @ts-ignore
      typeof GM_registerMenuCommand !== 'undefined' &&
      // @ts-ignore
      window.GM_registerMenuCommand == null
    ) {
      // @ts-ignore
      window.GM_registerMenuCommand = GM_registerMenuCommand;
    }
    if (
      // @ts-ignore
      typeof GM_removeValueChangeListener !== 'undefined' &&
      // @ts-ignore
      window.GM_removeValueChangeListener == null
    ) {
      // @ts-ignore
      window.GM_removeValueChangeListener = GM_removeValueChangeListener;
    }
    // @ts-ignore
    if (typeof GM_saveTab !== 'undefined' && window.GM_saveTab == null) {
      // @ts-ignore
      window.GM_saveTab = GM_saveTab;
    }
    if (
      // @ts-ignore
      typeof GM_setClipboard !== 'undefined' &&
      // @ts-ignore
      window.GM_setClipboard == null
    ) {
      // @ts-ignore
      window.GM_setClipboard = GM_setClipboard;
    }
    // @ts-ignore
    if (typeof GM_setValue !== 'undefined' && window.GM_setValue == null) {
      // @ts-ignore
      window.GM_setValue = GM_setValue;
    }
    if (
      // @ts-ignore
      typeof GM_unregisterMenuCommand !== 'undefined' &&
      // @ts-ignore
      window.GM_unregisterMenuCommand == null
    ) {
      // @ts-ignore
      window.GM_unregisterMenuCommand = GM_unregisterMenuCommand;
    }
    // @ts-ignore
    if (typeof GM_webRequest !== 'undefined' && window.GM_webRequest == null) {
      // @ts-ignore
      window.GM_webRequest = GM_webRequest;
    }
    if (
      // @ts-ignore
      typeof GM_xmlhttpRequest !== 'undefined' &&
      // @ts-ignore
      window.GM_xmlhttpRequest == null
    ) {
      // @ts-ignore
      window.GM_xmlhttpRequest = GM_xmlhttpRequest;
    }
  }
  const entryScript = document.createElement('script');
  entryScript.type = 'module';
  entryScript.src = entrySrc;
  let mountPosition = '';
  if (document.head) {
    if (document.head.firstChild) {
      document.head.insertBefore(entryScript, document.head.firstChild);
      mountPosition = 'document.head first';
    } else {
      document.head.appendChild(entryScript);
      mountPosition = 'document.head last';
    }
  } else {
    if (document.documentElement.firstChild) {
      document.documentElement.insertBefore(
        entryScript,
        document.documentElement.firstChild,
      );
      mountPosition = 'document.documentElement first';
    } else {
      document.documentElement.appendChild(entryScript);
      mountPosition = 'document.documentElement last';
    }
  }
  console.log(`[vite-plugin-monkey] mount entry module to ` + mountPosition);
};

export const cssInjectFn = (css: string) => {
  const style = document.createElement('style');
  style.dataset.source = 'vite-plugin-monkey';
  style.textContent = css;
  if (document.head) {
    document.head.appendChild(style);
  } else if (document.documentElement.childNodes.length === 0) {
    document.documentElement.appendChild(style);
  } else {
    document.documentElement.insertBefore(
      style,
      document.documentElement.childNodes[0],
    );
  }
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
    `[vite-plugin-monkey] mount ${mountedApiSize}/${apiNames.length} GM_api to unsafeWindow`,
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
