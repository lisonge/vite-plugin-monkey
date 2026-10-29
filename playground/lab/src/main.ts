import '../../shared.css';
const panel = document.createElement('aside');
panel.className = 'monkey-playground';
panel.innerHTML =
  '<h2>Monkey 功能联调</h2><p>逐项运行；修改源码后观察更新。每次刷新重新执行所有场景。</p><nav></nav><div></div>';
(document.body || document.documentElement).append(panel);
const output = panel.querySelector('div')!;
const scenes = {
  'GM API': () => import('./scenes/gm.ts'),
  '图片 / CSS / WASM': () => import('./scenes/assets.ts'),
  Worker: () => import('./scenes/worker.ts'),
  '动态导入 / TLA': () => import('./scenes/async.ts'),
  外部资源: () => import('./scenes/resources.ts'),
};
for (const [name, load] of Object.entries(scenes)) {
  const button = document.createElement('button');
  button.textContent = name;
  button.onclick = async () => {
    button.disabled = true;
    try {
      await (await load()).run(output);
    } catch (error) {
      const message = document.createElement('p');
      message.textContent = `FAIL · ${name}: ${String(error)}`;
      output.append(message);
    }
  };
  panel.querySelector('nav')!.append(button);
}
if (import.meta.hot) import.meta.hot.dispose(() => panel.remove());
