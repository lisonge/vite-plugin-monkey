import { expectTypeOf } from './assert.ts';
import type {
  CommonGM,
  CommonWindow,
  TampermonkeyGM,
  TampermonkeyInfo,
  TampermonkeyWindow,
  ViolentmonkeyGM,
  ViolentmonkeyInfo,
  ViolentmonkeyWindow,
  GreasemonkeyGM,
  GreasemonkeyInfo,
  GreasemonkeyWindow,
  GmAsyncXmlhttpRequestReturnType,
} from '$';

declare const commonWindow: CommonWindow;
expectTypeOf(commonWindow.GM).toEqualTypeOf<CommonGM>();
expectTypeOf(commonWindow.close).toEqualTypeOf<Window['close']>();
expectTypeOf(commonWindow.document).toEqualTypeOf<Document>();
// @ts-expect-error CommonWindow has no synchronous API
void commonWindow.GM_getValue;
// @ts-expect-error CommonWindow does not guarantee the audio API
void commonWindow.GM.audio;

declare const tampermonkey: TampermonkeyGM;
declare const tampermonkeyWindow: TampermonkeyWindow;
expectTypeOf(tampermonkey.info).toEqualTypeOf<TampermonkeyInfo>();
expectTypeOf(tampermonkeyWindow.GM_info).toEqualTypeOf<TampermonkeyInfo>();
expectTypeOf(tampermonkey.info.container).toEqualTypeOf<
  { id: string; name?: string } | undefined
>();
expectTypeOf(tampermonkey.info.scriptMetaStr).toEqualTypeOf<string | null>();
expectTypeOf(tampermonkey.info.script.author).toEqualTypeOf<string | null>();
expectTypeOf(tampermonkey.info.script.resources[0].content).toEqualTypeOf<
  string | undefined
>();
expectTypeOf(tampermonkey.xmlHttpRequest({ url: '/' })).toEqualTypeOf<
  GmAsyncXmlhttpRequestReturnType<'text', undefined>
>();
tampermonkey.audio.addStateChangeListener(() => {});
tampermonkeyWindow.GM_audio.setMute({ isMuted: true });

declare const violentmonkey: ViolentmonkeyGM;
declare const violentmonkeyWindow: ViolentmonkeyWindow;
expectTypeOf(violentmonkey.info).toEqualTypeOf<ViolentmonkeyInfo>();
expectTypeOf(violentmonkeyWindow.GM_info).toEqualTypeOf<ViolentmonkeyInfo>();
expectTypeOf(violentmonkey.info.scriptWillUpdate).toEqualTypeOf<boolean>();
expectTypeOf(violentmonkey.info.userAgent).toEqualTypeOf<string>();
expectTypeOf(violentmonkey.info.script.options.tags).toEqualTypeOf<string[]>();
expectTypeOf(violentmonkey.xmlHttpRequest({ url: '/' })).toEqualTypeOf<
  GmAsyncXmlhttpRequestReturnType<'text', undefined>
>();
// @ts-expect-error Violentmonkey has no audio API
void violentmonkey.audio;
// @ts-expect-error Violentmonkey has no synchronous audio API
void violentmonkeyWindow.GM_audio;

declare const greasemonkey: GreasemonkeyGM;
declare const greasemonkeyWindow: GreasemonkeyWindow;
expectTypeOf(greasemonkeyWindow.GM).toEqualTypeOf<GreasemonkeyGM>();
expectTypeOf(greasemonkeyWindow.close).toEqualTypeOf<Window['close']>();
expectTypeOf(greasemonkey.info).toEqualTypeOf<GreasemonkeyInfo>();
expectTypeOf(
  greasemonkey.info.script.resources.logo.mimetype,
).toEqualTypeOf<string>();
expectTypeOf(greasemonkey.info.script.uuid).toEqualTypeOf<string>();
expectTypeOf(greasemonkey.getValue<number>('key')).toEqualTypeOf<
  Promise<number>
>();
expectTypeOf(greasemonkey.xmlHttpRequest({ url: '/' })).toEqualTypeOf<void>();
// @ts-expect-error Greasemonkey has no synchronous API
void greasemonkeyWindow.GM_getValue;
// @ts-expect-error Greasemonkey has no audio API
void greasemonkeyWindow.GM.audio;
// @ts-expect-error Greasemonkey has no download method
void greasemonkey.download;
