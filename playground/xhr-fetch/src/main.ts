import { GM_fetch } from './fetch';

console.time('x');
const resp = await GM_fetch(
  `https://i.pximg.net/img-original/img/2017/05/16/00/20/10/62921231_p0.png`,
  {
    headers: {
      referer: 'https://www.pixiv.net/',
    },
  },
);
console.log(resp);
console.timeLog('x');
const imgBlob = await resp.blob();
console.log(imgBlob.size);
const imgUrl = URL.createObjectURL(imgBlob);
const img = new Image();
img.src = imgUrl;
document.body.append(img);

// ![image](https://user-images.githubusercontent.com/38517192/198955924-25f425e3-6ff4-466c-a805-04f44a6c3fcf.png)
