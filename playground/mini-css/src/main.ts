import { GM, GM_getValue, GM_registerMenuCommand, GM_webRequest } from '$';
import 'uno.css';
console.log(`hello wolrd`);
import './style.css';
// console.log(monkeyWindow.close());
// @ts-ignore
import Test from './Test.vue';
console.log(Test);

console.log(Object.keys(GM));
const x = GM_registerMenuCommand('', (e) => {});

const v = GM_getValue('key', String('default'));
console.log(
  GM_webRequest([], (...args) => {
    console.log(args);
  }),
);

if (location.search.includes('test')) {
  await import('./style2.css');
  import('./style3.scss');
  import('./style3.scss');
  import('normalize.css');
  const x = await import('element-plus/dist/index.css?inline');
  console.log(x);
} else {
  import('element-plus/dist/index.css');
}
import './style4.scss';
