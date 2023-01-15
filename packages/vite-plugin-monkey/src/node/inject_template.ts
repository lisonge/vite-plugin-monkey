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
  const style = document.createElement('style');
  document.body.append(style);
  style.innerText = /* css */ `
.App {
  margin-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.App > a {
  font-size: 32px;
  text-align: center;
}
.App > .copy {
  margin-top: 20px;
  padding: 4px;
  font-size: 15px;
  border: 2px solid;
  cursor: pointer;
  user-select: none;
}
.App > .copied {
  opacity: 0;
  margin-top: 10px;
  font-size: 12px;
  padding: 8px;
  border-radius: 5px;
  background-color: black;
  color: white;
}
.App > .copy:active + .copied {
  opacity: 1;
}
.App > .copy:not(:active) + .copied {
  transition: opacity 750ms;
}
`.trim();
  const div = document.createElement('div');
  document.body.append(div);
  div.innerHTML = /* html */ `
<div class="App">
  <a target="_blank"></a>
  <div class="copy">COPY</div>
  <div class="copied">Copied!</div>
</div>
  `.trim();
  await delay();
  const a = div.querySelector('a')!;
  a.href = location.href;
  a.text = location.href;
  const copy = document.querySelector<HTMLElement>('.copy')!;
  copy.addEventListener('click', async () => {
    await navigator.clipboard.writeText(u.href);
  });
};
