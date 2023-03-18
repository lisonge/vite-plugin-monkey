import './App.scss';
import { createState } from './utils';

const cpoy = async (u: URL) => {
  await navigator.clipboard.writeText(u.href);
};

export default function App() {
  const [data, setData] = createState({ count: 0 });
  return (
    <div class="App">
      <a target="_blank" href={location.href}>
        {location.href}
      </a>
      <div
        class="copy"
        onClick={() => {
          setData((d) => {
            d.count++;
          });
          cpoy(new URL(location.href));
        }}
      >
        COPY
      </div>
      <div class="copied">Copied!</div>
      <div>{data.count}</div>
    </div>
  );
}
