import { GM_fetch, asyncQuerySelector } from 'monkey-extra';

(async () => {
  const resp = await GM_fetch(
    `https://i.pximg.net/img-original/img/2017/05/16/00/20/10/62921231_p0.png`,
    {
      headers: {
        referer: 'https://www.pixiv.net/',
      },
    },
  );
  const imgBlob = await resp.blob();
  const imgUrl = URL.createObjectURL(imgBlob);
  const img = new Image();
  img.src = imgUrl;
  document.body.append(img);
})();

(async () => {
  const randomKey = `_` + Math.random().toString(16).substring(2);
  window.setTimeout(() => {
    const div = document.createElement('div');
    div.classList.add(randomKey);
    document.body.append(div);
  }, 1000);
  const div = await asyncQuerySelector(document.body, `.` + randomKey, 1500);
  if (div) {
    div.textContent = randomKey;
  }
})();

// ![image](https://user-images.githubusercontent.com/38517192/202778567-6b211a71-c5e4-4262-b9d6-4fefada2369d.png)
