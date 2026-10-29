import raw from 'normalize.css?raw';
import url from 'normalize.css?url';
export async function run(host: HTMLElement) {
  const section = document.createElement('section');
  section.textContent = `${raw.includes('normalize.css') ? 'PASS' : 'FAIL'} · CSS 文本 ${raw.length} 字符；资源地址 ${url.slice(0, 100)}`;
  host.append(section);
}
