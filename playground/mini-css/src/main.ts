import { GM, GM_getValue, GM_registerMenuCommand, GM_webRequest } from '$';
import './style.css';
console.log(`hello wolrd`);
// console.log(monkeyWindow.close());

console.log(Object.keys(GM));
const x = GM_registerMenuCommand('', (e) => {});

const v = GM_getValue('key', String('default'));
console.log(
  GM_webRequest([], (...args) => {
    console.log(args);
  }),
);
