import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <aside>
      <h2>Before update</h2>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </aside>
  );
}
