import { GM_fetch } from 'vite-plugin-monkey/dist/client';

(async () => {
  console.time('x');
  const resp = await GM_fetch(`https://baidu.com/`, {
    method: 'POST',
    body: JSON.stringify({
      key: 114514,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
  console.log(resp);
  console.log(resp.type);
  console.timeLog('x');
})();
