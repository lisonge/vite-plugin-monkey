export const template2string = <T extends (arg: object) => void>(
  func: T,
  arg: Parameters<T>[0],
) => {
  return `;(${func.toString()})(${JSON.stringify(arg, undefined, 2)});`;
};

export const serverInjectTemplate = ({
  entryList = [] as string[],
  mountGmApi = false,
}) => {
  // @ts-ignore
  window.GM; // must exist
  const monkeyWindow = window;
  if (mountGmApi) {
    const _unsafeWindow: Window = Reflect.get(monkeyWindow, 'unsafeWindow');
    if (_unsafeWindow) {
      Reflect.set(_unsafeWindow, 'unsafeWindow', _unsafeWindow);
      console.log(`[vite-plugin-monkey] mount unsafeWindow to unsafeWindow`);
      const mountedApiList: string[] = [];
      Object.entries(monkeyWindow)
        .filter(([k]) => k.startsWith('GM'))
        .forEach(([k, fn]) => {
          Reflect.set(_unsafeWindow, k, fn);
          mountedApiList.push(k);
        });
      console.log(
        `[vite-plugin-monkey] mount ${mountedApiList.length} GM_api to unsafeWindow`,
      );
    }
  }

  (() => {
    Object.defineProperty(document, '__monkeyWindow', {
      value: monkeyWindow,
      writable: false,
      enumerable: false,
    });
    console.log(`[vite-plugin-monkey] mount monkeyWindow to document`);
  })();

  const createScript = (src: string) => {
    const el = document.createElement('script');
    el.src = src;
    el.type = 'module';
    el.dataset.source = 'vite-plugin-monkey';
    el.dataset.entry = '';
    return el;
  };
  const { head } = document;
  entryList.reverse().forEach((s) => {
    head.insertBefore(createScript(s), head.firstChild);
  });
  console.log(
    `[vite-plugin-monkey] mount ${entryList.length} entry module to document.head`,
  );
};

export const cssInjectTemplate = ({ css = '' }) => {
  const style = document.createElement('style');
  style.innerText = css;
  style.dataset.source = 'vite-plugin-monkey';
  document.head.appendChild(style);
};

export const redirectFn = async ({ url = '' }) => {
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
