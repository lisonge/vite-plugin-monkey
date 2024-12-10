import * as Vue from 'vue';
import { ElDatePicker, ElButton } from 'element-plus';
import 'element-plus/dist/index.css';
// import ElementPlusCss from 'element-plus/dist/index.css?raw';
import ElementPlusPkg from 'element-plus/package.json';

// import './style.scss';
import { unsafeWindow } from '$';

import cssRaw from 'element-plus/dist/index.css?raw';

console.log({
  Vue,
  ElDatePicker,
  ElButton,
  ElementPlusPkg,
  unsafeWindow,
  // tInline,
  cssRaw,
  // cssUrl,
  // cssInline,
});
