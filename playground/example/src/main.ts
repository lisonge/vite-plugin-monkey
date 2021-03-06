import './style.css';
import './test.css';
import { x } from './util';
import png from './asset/test.png';
import svg from './asset/favicon.svg';
import md5 from 'blueimp-md5';

console.log('hello world main.ts:' + x);
console.log({ png, svg });
console.log('blueimp-md5', md5('114514'));
console.log('document.readyState', document.readyState);

// console.log(import.meta);
// console.log(unsafeWindow);
// not recommend use asset source, you should use raw url or iconfont cdn

// const mockLog = console.log;
// console.log = function (...agrs: any[]) {
//   console.warn('you call console.log');
//   return mockLog.apply(this, agrs);
// };

// test config.define
if (process.env.NODE_ENV == 'production') {
  console.log('hello prod');
} else {
  console.log('hello dev');
}
