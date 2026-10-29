import type { GmType, GmInfoType } from '$';
import { expectTypeOf } from './assert.ts';

expectTypeOf(GM).toEqualTypeOf<GmType>();
expectTypeOf(window.GM).toEqualTypeOf<GmType>();
expectTypeOf(GM_info).toEqualTypeOf<GmInfoType>();
expectTypeOf(window.GM_info).toEqualTypeOf<GmInfoType>();
expectTypeOf(GM_getValue).toEqualTypeOf<typeof import('$').GM_getValue>();
expectTypeOf(window.GM_audio).toEqualTypeOf<typeof import('$').GM_audio>();
GM_setValue('key', 42);
window.GM_getValue<number>('key');
window.GM_audio.setMute({ isMuted: true });
GM.audio.addStateChangeListener(() => {});
GM_download({ url: new Blob(), name: 'data.txt' });
window.GM.download({ url: new Blob(), name: 'data.txt' });
