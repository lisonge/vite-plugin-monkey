// declare global {
//   interface Window {
//     unsafeWindow?: Window;
//   }
// }

export const template2string = <T extends (arg: object) => void>(
  func: T,
  arg: Parameters<T>[0],
) => {
  return `;(${func.toString()})(${JSON.stringify(arg, undefined, 2)});`;
};

export const serverInjectTemplate = ({
  entryList = [] as string[],
  apiList = [] as string[],
}) => {
  // 所有的 GM api 都是不可枚举的，必须显式提供注入列表
  // @ts-ignore
  const _unsafeWindow: Window | undefined = window.unsafeWindow;
  if (_unsafeWindow) {
    Reflect.set(_unsafeWindow, 'unsafeWindow', _unsafeWindow);

    const mountedApiList: string[] = [];
    const unMountedApiList: string[] = [];
    apiList.forEach((s) => {
      const fn = Reflect.get(window, s);
      if (fn) {
        Reflect.set(_unsafeWindow, s, fn);
        mountedApiList.push(s);
      } else {
        unMountedApiList.push(s);
      }
    });
    console.log(
      `[vite-plugin-monkey] mount ${mountedApiList.length}/${apiList.length} GM_api to unsafeWindow`,
    );
    Reflect.set(_unsafeWindow, '__vite_plugin_monkey', {
      mountedApiList,
      unMountedApiList,
    });
    // TODO 目前暂不处理 onurlchange, window.close window.focus
    // if (Reflect.get(window, 'onurlchange') === null) {
    //   const mockAddEventListener = unsafeWindow.addEventListener;
    //   // @ts-ignore
    //   unsafeWindow.addEventListener = function (...args) {
    //     if (args[0] === 'onurlchange') {
    //       // @ts-ignore
    //       return window.addEventListener(...args);
    //     }
    //     // @ts-ignore
    //     return mockAddEventListener.apply(this, args);
    //   };
    // }
  }

  const createScript = (src: string) => {
    const el = document.createElement('script');
    el.src = src;
    el.type = 'module';
    el.dataset.source = 'vite-plugin-monkey';
    return el;
  };
  const { head } = document;
  entryList.reverse().forEach((s) => {
    head.insertBefore(createScript(s), head.firstChild);
  });
  console.log(
    `[vite-plugin-monkey] mount ${entryList.length} module to document.head`,
  );
};

export const cssInjectTemplate = ({ cssText = '' }) => {
  const style = document.createElement('style');
  style.innerText = cssText;
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
