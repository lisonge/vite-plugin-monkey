export const fn2string = <T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
) => {
  return `;(${fn})(...${JSON.stringify(args, undefined, 2)});`;
};

export const serverInjectFn = ({ entrySrc = `` }) => {
  // @ts-ignore
  window.GM; // must exist, see https://github.com/Tampermonkey/tampermonkey/issues/1567

  // @ts-ignore
  document.__monkeyWindow = window;
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
  style.innerText = css;
  document.head.appendChild(style);
};

export const mountGmApiFn = () => {
  // @ts-ignore
  const monkeyWindow: Window = document.__monkeyWindow;
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

export const redirectFn = async (url: string) => {
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
  const div = document.createElement('div');
  div.style.minHeight = '75vh';
  div.style.display = 'flex';
  div.style.flexDirection = 'column';
  div.style.justifyContent = 'center';
  div.style.alignItems = 'center';
  document.body.append(div);
  const a = document.createElement('a');
  a.href = u.href;
  a.text = u.href;
  a.style.fontSize = '20px';
  div.append(a);
};
