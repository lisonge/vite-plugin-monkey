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

/**
 * 根据meta信息生成处理@grant 注入到window
 * 可修复GM_xxx is undefined
 * @param metaData // ==UserScript== 信息
 */
export const serverInjectGMApiFn = (metaData: string) => {
  let metaDataSplit = metaData.split('\n');
  /** 每一项都是@grant的兼容处理函数字符串 */
  let grantCompatibilityProcessing: string[] = [];
  /** 是否已添加GM.的处理 */
  let isAddGMList = false;
  for (let index = 0; index < metaDataSplit.length; index++) {
    let metaDataItem = metaDataSplit[index];
    let metaGrantValueMatch = metaDataItem.match(
      /[\s]*\/\/[\s]*@grant[\s]+([\S]+)/i,
    );
    if (metaGrantValueMatch) {
      let metaGrantValue =
        metaGrantValueMatch[metaGrantValueMatch.length - 1].trim();
      if (metaGrantValue.startsWith('GM.') && !isAddGMList) {
        isAddGMList = true;
        grantCompatibilityProcessing.push(`        // @ts-ignore
        if (window.GM == null && typeof GM === "object") {
          // @ts-ignore
          window.GM = GM;
        }`);
      } else if (
        metaGrantValue.startsWith('window.') ||
        metaGrantValue === 'unsafeWindow'
      ) {
        // ↓不做处理
        // window.close
        // window.focus
        // window.onurlchange
        // unsafeWindow
      } else {
        grantCompatibilityProcessing.push(`        // @ts-ignore
        if (typeof ${metaGrantValue} !== "undefined" && ${metaGrantValue} != null && window.${metaGrantValue} == null) {
          // @ts-ignore
          window.${metaGrantValue} = ${metaGrantValue};
        }`);
      }
    }
  }

  return `
  ;(()=>{
    if (typeof unsafeWindow !== "undefined" && unsafeWindow == window) {
${grantCompatibilityProcessing.join('\n')}
    }
})();
  `;
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

  /** @type {string[]} */
  let mountedApiNameList = [];
  /** @type {string[]} */
  // @ts-ignore
  let unmountedApiNameList = [];
  apiNames.forEach((apiName) => {
    // @ts-ignore
    const fn = monkeyWindow[apiName];
    if (fn) {
      // @ts-ignore
      window[apiName] = monkeyWindow[apiName];
      mountedApiNameList.push(apiName);
    } else {
      unmountedApiNameList.push(apiName);
    }
  });
  console.log(
    `[vite-plugin-monkey] mount ${mountedApiNameList.length}/${apiNames.length} GM_api to unsafeWindow`,
  );
  console.log(
    // @ts-ignore
    `[vite-plugin-monkey] unmount ${unmountedApiNameList.join('、')}`,
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
