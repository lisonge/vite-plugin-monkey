import { useState } from 'react';
export default function App() {
  const [count, setCount] = useState(0);
  return (
    <aside className="monkey-playground">
      <h2>React Fast Refresh</h2>
      <p>修改此标题，检查计数是否保留。</p>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </aside>
  );
}
