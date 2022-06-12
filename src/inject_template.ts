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
    console.log(`[vite-plugin-monkey] inject GM_*${sum} to unsafeWindow`);
  }

  const createScript = (src: string) => {
    const el = document.createElement('script');
    el.src = src;
    el.type = 'module';
    el.dataset.source = 'vite-plugin-monkey';
    return el;
  };
  const { head } = document;
  [`${origin}/@vite/client`, `${origin}/${entry}`].reverse().forEach((s) => {
    head.insertBefore(createScript(s), head.firstChild);
  });
  console.log('[vite-plugin-monkey] inject module to document.head');
};

export const cssInjectTemplate = ({ cssTextList = [] as string[] }) => {
  cssTextList.forEach((s) => {
    const style = document.createElement('style');
    style.innerText = s;
    style.dataset.source = 'vite-plugin-monkey';
    document.head.appendChild(style);
  });
};
