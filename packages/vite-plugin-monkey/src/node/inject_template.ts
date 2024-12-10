import type { GmApi } from '../client/types';

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
 * @package entrySrc 脚本入口地址
 * @param metaData // ==UserScript== 信息
 */
export const serverInjectGMApiFn = (entrySrc: string, metaData: string) => {
  const api_key = `__monkeyApi-` + new URL(entrySrc).origin;

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
      if (metaGrantValue.startsWith('GM.')) {
        // GM.addElement
        // GM.addStyle
        // ...
        if (isAddGMList) {
          continue;
        }
        isAddGMList = true;
        grantCompatibilityProcessing.push(`
        if (window.GM == null && typeof GM === "object") {
          Reflect.set(GM_Api, "GM", GM);
          GM_repair_count++;
        }`);
      } else if (metaGrantValue.startsWith('window.')) {
        // ↓不做处理
        // window.close
        // window.focus
        // window.onurlchange
      } else {
        grantCompatibilityProcessing.push(`
        if (typeof ${metaGrantValue} !== "undefined" && ${metaGrantValue} != null && window.${metaGrantValue} == null) {
          Reflect.set(GM_Api, "${metaGrantValue}", ${metaGrantValue});
          GM_repair_count++;
        }`);
      }
    }
  }

  return `
  ;(()=>{
    const GM_Api = {};
    let GM_repair_count = 0;
    if (typeof unsafeWindow !== "undefined" && unsafeWindow == window) {
      console.log("[vite-plugin-monkey] window == unsafeWindow repair GM api");
${grantCompatibilityProcessing.join('\n')}
    }
    Object.freeze(GM_Api);
    document["${api_key}"] = GM_Api;
    if(GM_repair_count > 0){
      console.log("[vite-plugin-monkey] repair GM api count: " + GM_repair_count);
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

  let injectFn = function () {
    let mountPositionStr = '';
    if (document.head) {
      if (document.head.firstChild) {
        document.head.insertBefore(entryScript, document.head.firstChild);
        mountPositionStr = 'document.head first';
      } else {
        document.head.appendChild(entryScript);
        mountPositionStr = 'document.head last';
      }
    } else {
      if (document.documentElement) {
        if (document.documentElement.firstChild) {
          document.documentElement.insertBefore(
            entryScript,
            document.documentElement.firstChild,
          );
          mountPositionStr = 'document.documentElement first';
        } else {
          document.documentElement.appendChild(entryScript);
          mountPositionStr = 'document.documentElement last';
        }
      } else {
        // 部分情况下documentElement未加载出来
      }
    }
    return mountPositionStr == '' ? null : mountPositionStr;
  };

  let mountPosition = injectFn();
  if (mountPosition == null) {
    let intervalId = setInterval(() => {
      let mountPosition = injectFn();
      if (mountPosition != null) {
        clearInterval(intervalId);
        console.log(
          `[vite-plugin-monkey] interval check mount entry module to ` +
            mountPosition,
        );
      }
    }, 5);
  } else {
    console.log(`[vite-plugin-monkey] mount entry module to ` + mountPosition);
  }
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
  const api_key = `__monkeyApi-` + new URL(meta.url).origin;
  // @ts-ignore
  const monkeyWindow: Window = document[key];
  // @ts-ignore
  const monkeyApi: Partial<GmApi> = document[api_key] ?? {};
  if (!monkeyWindow) {
    console.log(`[vite-plugin-monkey] not found monkeyWindow`);
    return;
  }

  // @ts-ignore
  window.unsafeWindow = monkeyApi?.unsafeWindow ?? window;
  console.log(`[vite-plugin-monkey] mount unsafeWindow to unsafeWindow`);

  /** @type {string[]} */
  let mountedApiNameList = [];
  /** @type {string[]} */
  // @ts-ignore
  let unmountedApiNameList = [];
  apiNames.forEach((apiName) => {
    // @ts-ignore
    const fn = monkeyApi?.[apiName] ?? monkeyWindow[apiName];
    if (fn) {
      // @ts-ignore
      window[apiName] = fn;
      mountedApiNameList.push(apiName);
    } else {
      unmountedApiNameList.push(apiName);
    }
  });
  console.log(
    `[vite-plugin-monkey] mount ${mountedApiNameList.length}/${apiNames.length} GM_api to unsafeWindow`,
  );
  if (unmountedApiNameList.length) {
    console.log(
      // @ts-ignore
      `[vite-plugin-monkey] unmount ${unmountedApiNameList.join('、')}`,
    );
  }
};

export const virtualHtmlTemplate = async (url: string) => {
  const delay = (n = 0) => new Promise<void>((res) => setTimeout(res, n));
  await delay();
  const u = new URL(url, location.origin);
  u.searchParams.set('origin', u.origin);
  if (window == window.parent) {
    location.href = u.href;
    await delay(3500);
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
    await delay(3500);
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
