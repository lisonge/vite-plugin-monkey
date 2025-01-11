// bugs reproduction
// top level await
console.log(await window?.fetch(`/`));
export {};

for await (const v of [Promise.resolve(1), Promise.resolve(2)]) {
  console.log(v);
}

console.log((+(await fetch(`/`)) || (await fetch(`/`))) && (await fetch(`/`)));

import { monkeyWindow } from '$';

if (monkeyWindow.onurlchange === null) {
  monkeyWindow.addEventListener('urlchange', console.log);
}
monkeyWindow.focus();
monkeyWindow.close();
// @ts-expect-error
monkeyWindow.unsafeWindow.test = 42;
// @ts-expect-error
monkeyWindow.GM_cookie = 42;
