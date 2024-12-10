import './style.css';
import 'element-plus/dist/index.css';

// console.log({ css });

console.log('document.readyState', document.readyState); // interactive

import {
  GM_cookie,
  unsafeWindow,
  monkeyWindow,
  GM_addElement,
  GM_info,
} from '$';

console.log(monkeyWindow);

// tampermonkey only
GM_addElement && GM_addElement('div', { innerHTML: 'hello' });

if (unsafeWindow == window) {
  console.log('scope->host');
} else {
  console.log('scope->monkey');
}

// tampermonkey only
GM_cookie?.list({}, (cookies, error) => {
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

//---------test code format--------
import { formatCode } from './format';
console.log('format tsx code');
const tsxCode = `const App=()=>{return(<div class={styles.App}>
<header class={styles.header}>
<img src={logo} class={styles.logo} alt="logo" />
<p>
Edit <code>src/App.tsx</code> and save to reload.
</p>
<a
class={styles.link}
href="https://github.com/solidjs/solid"
target="_blank"
rel="noopener noreferrer"
>
Learn Solid
</a>
</header>
</div>
);
};`;
console.log(await formatCode(tsxCode, 'tsx'));
//-------------------------
