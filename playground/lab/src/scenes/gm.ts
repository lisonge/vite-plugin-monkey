import { GM_getValue, GM_setValue, GM_info, unsafeWindow } from '$';
export async function run(host: HTMLElement) {
  const previous = GM_getValue<number>('monkey-playground-count', 0);
  GM_setValue('monkey-playground-count', previous + 1);
  const section = document.createElement('section');
  section.textContent = `GM API · ${GM_info.scriptHandler} · 持久化计数 ${previous + 1} · 页面地址 ${unsafeWindow.location.href}`;
  host.append(section);
}
