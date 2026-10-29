import { count, setCount } from './state.ts';

export default function App() {
  return (
    <aside>
      <h2>Before update</h2>
      <button onClick={() => setCount(count() + 1)}>Count: {count()}</button>
    </aside>
  );
}
