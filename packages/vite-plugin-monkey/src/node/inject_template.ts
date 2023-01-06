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
  entryScript.dataset.source = 'vite-plugin-monkey';
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
  window.location.href = url;
  await delay(500);
  window.close();
};
