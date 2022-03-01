export const template2string = <T extends (...args: any) => any>(
  func: T,
  arg: Parameters<T>[0]
) => {
  return `(${func.toString()})(${JSON.stringify(arg, undefined, 2)});`;
};

export const serverInjectTemplate = ({
  origin = 'http://127.0.0.1:3000',
  entry = 'src/main.ts',
}) => {
  let apiInjectSuccessFul = true;
  [
    'GM_addStyle',
    'GM_addElement',
    'GM_deleteValue',
    'GM_listValues',
    'GM_addValueChangeListener',
    'GM_removeValueChangeListener',
    'GM_setValue',
    'GM_getValue',
    'GM_log',
    'GM_getResourceText',
    'GM_getResourceURL',
    'GM_registerMenuCommand',
    'GM_unregisterMenuCommand',
    'GM_openInTab',
    'GM_xmlhttpRequest',
    'GM_download',
    'GM_getTab',
    'GM_saveTab',
    'GM_getTabs',
    'GM_notification',
    'GM_setClipboard',
    'GM_info',
  ].forEach((s) => {
    try {
      // @ts-ignore
      unsafeWindow[s] = window[s];
    } catch (e) {
      apiInjectSuccessFul = false;
    }
  });
  if (apiInjectSuccessFul) {
    console.log('vite-plugin-tampermonkey-plus: inject GM_* to unsafeWindow');
  }

  // /__vite_ping
  // server connection lost. polling for restart...
  const fetchBackup = unsafeWindow.fetch;
  unsafeWindow.fetch = function (input, init?) {
    if (typeof input == 'string' && input.startsWith('/__vite')) {
      input = origin + input;
    }
    return fetchBackup.call(this, input, init);
  };
  console.log(
    `vite-plugin-tampermonkey-plus: redirect /__vite to ${origin}/__vite`
  );

  const createScript = (src: string) => {
    const el = document.createElement('script');
    el.src = src;
    el.type = 'module';
    el.dataset.source = 'vite-plugin-tampermonkey-plus';
    return el;
  };
  [`${origin}/@vite/client`, `${origin}/${entry}`].forEach((s) => {
    document.head.appendChild(createScript(s));
  });
  console.log('vite-plugin-tampermonkey-plus: inject module to document.head');
};

export const cssInjectTemplate = ({ cssTextList = [] as string[] }) => {
  cssTextList.forEach((s) => {
    const style = document.createElement('style');
    style.innerText = s;
    style.dataset.source = 'vite-plugin-tampermonkey-plus';
    document.head.appendChild(style);
  });
};
