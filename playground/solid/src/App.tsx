import { createSignal } from 'solid-js';
export default function App() {
  const [count, setCount] = createSignal(0);
  return (
    <aside class="monkey-playground">
      <h2>Solid HMR</h2>
      <p>修改此标题，检查更新后按钮仍可使用。</p>
      <button onClick={() => setCount(count() + 1)}>Count: {count()}</button>
    </aside>
  );
}
