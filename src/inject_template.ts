declare global {
  interface Window {
    unsafeWindow?: Window;
    [key: string]: unknown;
  }
}

export const template2string = <T extends (args: any) => any>(
  func: T,
  arg: Parameters<T>[0]
) => {
  return `;(${func.toString()})(${JSON.stringify(arg, undefined, 2)});`;
};

export const serverInjectTemplate = ({
  origin = 'http://127.0.0.1:3000',
  entry = 'src/main.ts',
}) => {
  if (window.unsafeWindow) {
    const injectWindow = window.unsafeWindow;
    let sum = 0;
    [
      // 'GM.addElement',
      // 'GM.addStyle',
      // 'GM.deleteValue',
      // 'GM.getResourceUrl',
      // 'GM.getValue',
      // 'GM.info',
      // 'GM.listValues',
      // 'GM.notification',
      // 'GM.openInTab',
      // 'GM.registerMenuCommand',
      // 'GM.setClipboard',
      // 'GM.setValue',
      // 'GM.xmlHttpRequest',
      'GM',
      'GM_addElement',
      'GM_addStyle',
      'GM_addValueChangeListener',
      'GM_deleteValue',
      'GM_download',
      'GM_getResourceText',
      'GM_getResourceURL',
      'GM_getTab',
      'GM_getTabs',
      'GM_getValue',
      'GM_info',
      'GM_listValues',
      'GM_log',
      'GM_notification',
      'GM_openInTab',
      'GM_registerMenuCommand',
      'GM_removeValueChangeListener',
      'GM_saveTab',
      'GM_setClipboard',
      'GM_setValue',
      'GM_unregisterMenuCommand',
      'GM_xmlhttpRequest',
      // 'unsafeWindow',
      // 'window.close',
      // 'window.focus',
      // 'window.onurlchange',
    ].forEach((s) => {
      if (window[s]) {
        injectWindow[s] = window[s];
        sum++;
      }
    });
    console.log(`vite-plugin-monkey: inject GM_*${sum} to unsafeWindow`);
  }

  // /__vite_ping
  // server connection lost. polling for restart...
  // const fetchBackup = unsafeWindow.fetch;
  // unsafeWindow.fetch = function (input, init?) {
  //   if (typeof input == 'string' && input.startsWith('/__vite')) {
  //     input = origin + input;
  //   }
  //   return fetchBackup.call(this, input, init);
  // };
  // console.log(`vite-plugin-monkey: redirect /__vite to ${origin}/__vite`);

  const createScript = (src: string) => {
    const el = document.createElement('script');
    el.src = src;
    el.type = 'module';
    el.dataset.source = 'vite-plugin-monkey';
    return el;
  };
  [`${origin}/@vite/client`, `${origin}/${entry}`].forEach((s) => {
    document.head.appendChild(createScript(s));
  });
  console.log('vite-plugin-monkey: inject module to document.head');
};

export const cssInjectTemplate = ({ cssTextList = [] as string[] }) => {
  cssTextList.forEach((s) => {
    const style = document.createElement('style');
    style.innerText = s;
    style.dataset.source = 'vite-plugin-monkey';
    document.head.appendChild(style);
  });
};

// export const clientHmrInjectTemplate = ()=>{
//   // @ts-ignore
//   const u = new URL(import.meta.url, location.origin)
//   return u.protocol
// }
