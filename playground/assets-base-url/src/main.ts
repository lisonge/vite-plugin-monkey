import badgeUrl from './assets/badge.svg';
import inlineBadge from './assets/badge.svg?inline';
import rawBadge from './assets/badge.svg?raw';
import wasmUrl from './assets/answer.wasm?url';
import initWasm from './assets/answer.wasm?init';
import { answer } from './assets/answer.wasm';
import './style.css';

const panel = document.createElement('section');
panel.id = 'monkey-assets-playground';
panel.innerHTML = `
  <h2>assetsBaseUrl</h2>
  <p>图片、CSS 背景和 WASM 使用外置资源；inline/raw 保持原语义。</p>
  <div class="asset-images"><img alt="外置 SVG" width="80" height="80"><div class="asset-background" title="CSS 外置背景"></div></div>
  <ul></ul>
`;
(document.body || document.documentElement).append(panel);
const list = panel.querySelector('ul')!;
const report = (name: string, passed: boolean, detail: string) => {
  const item = document.createElement('li');
  item.textContent = `${passed ? 'PASS' : 'FAIL'} · ${name}: ${detail}`;
  list.append(item);
};

const image = panel.querySelector('img')!;
image.onload = () => report('SVG 默认导入', true, badgeUrl.slice(0, 100));
image.onerror = () => report('SVG 默认导入', false, badgeUrl.slice(0, 100));
image.src = badgeUrl;
report('?inline', inlineBadge.startsWith('data:'), inlineBadge.slice(0, 60));
report('?raw', rawBadge.includes('<svg'), `${rawBadge.length} characters`);

const checkWasm = async (name: string, url: string | URL) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const mime = response.headers.get('content-type');
    const { instance } = await WebAssembly.instantiateStreaming(response);
    const answer = instance.exports.answer as () => number;
    report(name, answer() === 42, `answer() = ${answer()}, MIME = ${mime}`);
  } catch (error) {
    report(name, false, String(error));
  }
};

const wasmAnswer = answer();
report('WASM 具名导入', wasmAnswer === 42, `answer() = ${wasmAnswer}`);
void checkWasm('WASM ?url', wasmUrl);
void initWasm().then(
  (instance) => {
    const answer = instance.exports.answer as () => number;
    report('WASM ?init', answer() === 42, `answer() = ${answer()}`);
  },
  (error) => report('WASM ?init', false, String(error)),
);
void checkWasm(
  'WASM new URL',
  new URL('./assets/answer.wasm', import.meta.url),
);

// CSS URLs are strings, so check that the resolved background also loads.
const background = panel.querySelector('.asset-background')!;
const backgroundUrl = getComputedStyle(background).backgroundImage.match(
  /^url\(["']?(.*?)["']?\)$/,
)?.[1];
if (backgroundUrl) {
  const probe = new Image();
  probe.onload = () => report('CSS url()', true, backgroundUrl.slice(0, 100));
  probe.onerror = () => report('CSS url()', false, backgroundUrl.slice(0, 100));
  probe.src = backgroundUrl;
} else {
  report('CSS url()', false, 'background URL missing');
}
