import { GM_setValue, GM_listValues } from '$';
import './b';
import { createApp, ref } from 'vue';

GM_setValue('key', 'value');
console.log(GM_listValues());
console.log({ createApp, ref });

(async () => {
  // const { reactive, watch } = await import('vue');
  // console.log({ reactive, watch });
})();
