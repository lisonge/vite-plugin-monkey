import './style.css';
// import pngUrl from './asset/test.png';
// import svgUrl from './asset/favicon.svg';
import md5 from 'blueimp-md5';

console.log(`md5('114514')=${md5('114514')}`); //c4d038b4bed09fdb1471ef51ec3a32cd
console.log('document.readyState', document.readyState); // interactive

import { GM_cookie, unsafeWindow, monkeyWindow, GM_addElement } from '$';

console.log(monkeyWindow);
GM_addElement('div', { innerHTML: 'hello' });

if (unsafeWindow == window) {
  console.log('scope->host');
} else {
  console.log('scope->monkey');
}
GM_cookie.list({}, (cookies, error) => {
  if (error) {
    console.log(error);
  } else {
    const [cookie] = cookies;
    if (cookie) {
      console.log(cookie);
      // {
      //   "domain": "i.songe.li",
      //   "httpOnly": false,
      //   "secure": false,
      //   "name": "k",
      //   "path": "/",
      //   "sameSite": "unspecified",
      //   "value": "v",
      //   "session": true,
      //   "hostOnly": true
      // }
    }
  }
});
