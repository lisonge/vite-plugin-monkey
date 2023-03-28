import { monkeyWindow } from '$';
import './b';

await fetch(`/`);

export default await fetch(`/`);

console.log(monkeyWindow.onurlchange);

for await (const x of [1, 2, 3, 4, 5]) {
  await fetch(`/` + x);
}

const fn = async () => {
  const r = await fetch(`/`);
  console.log(r);
};

await fn();
