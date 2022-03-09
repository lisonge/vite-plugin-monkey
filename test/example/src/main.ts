import './style.css';
import './test.css';
import { x } from './util';
import png from './asset/test.png';
import svg from './asset/favicon.svg';
import md5 from 'blueimp-md5';

console.log('hello world main.ts:' + x);
console.log({ png, svg });
console.log('blueimp-md5', md5('114514'));

// console.log(import.meta);
// console.log(unsafeWindow);
// not recommend use asset source, you should use raw url or iconfont cdn
