import * as Vue from 'vue';
import { ElDatePicker, ElButton } from 'element-plus';
import 'element-plus/dist/index.css';
// import ElementPlusCss from 'element-plus/dist/index.css?raw';
import ElementPlusPkg from 'element-plus/package.json';
import 'animate.css';
// import './style.scss';
import { unsafeWindow } from '$';
import carSvgUrl from 'base64-img/test/img/car.svg';
import tUrl from 'base64-img/test/img/car.svg?url';
import tRaw from 'base64-img/test/img/car.svg?raw';

console.log({
  Vue,
  ElDatePicker,
  ElButton,
  ElementPlusPkg,
  unsafeWindow,
  carSvgUrl,
  tUrl,
  tRaw,
});

document.body.append(
  (() => {
    const img = document.createElement('img');
    img.src = carSvgUrl;
    return img;
  })(),
);
