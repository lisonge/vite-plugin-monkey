import { expectTypeOf } from './assert.ts';
import {
  GM,
  GM_audio,
  GM_download,
  GM_info,
  GM_notification,
  GM_registerMenuCommand,
  GM_xmlhttpRequest,
  GM_getResourceURL,
  GM_openInTab,
  GM_setClipboard,
  monkeyWindow,
} from '$';
import type {
  GmAudioMuteState,
  GmAudioStateChangeListener,
  GmType,
  GmInfoType,
  MonkeyWindow,
  GmAsyncXmlhttpRequestReturnType,
} from '$';

expectTypeOf(GM).toEqualTypeOf<GmType>();
expectTypeOf(GM_info).toEqualTypeOf<GmInfoType>();
expectTypeOf(monkeyWindow).toEqualTypeOf<MonkeyWindow>();
expectTypeOf(monkeyWindow.GM_audio).toEqualTypeOf<typeof GM_audio>();

GM_registerMenuCommand('Menu', () => {}, { clickedFrame: true });
GM.registerMenuCommand('Menu', () => {}, { accessKey: 'm' });
GM_download({ url: new Blob(), name: 'data.txt', anonymous: true });
GM.download({
  url: new File([], 'data.txt'),
  name: 'data.txt',
  anonymous: true,
});
for (const url of [
  'https://example.test',
  new URL('https://example.test'),
  new Blob(),
  new File([], 'data.txt'),
]) {
  GM_xmlhttpRequest({
    url,
    data: { answer: 42 },
    proxy: { type: 'socks', host: 'localhost', port: 1080, proxyDNS: true },
  });
  GM.xmlHttpRequest({ url, data: [1, 2], responseType: 'json' });
}
const listener: GmAudioStateChangeListener = (event) => {
  expectTypeOf(event.muted).toEqualTypeOf<string | false | undefined>();
  expectTypeOf(event.audible).toEqualTypeOf<boolean | undefined>();
};
listener({});
listener({ muted: false });
const state: GmAudioMuteState = {};
GM_audio.addStateChangeListener(listener);
GM_audio.removeStateChangeListener(listener);
GM_audio.setMute({ isMuted: true }, (error) => {
  expectTypeOf(error).toEqualTypeOf<string | undefined>();
});
GM.audio.addStateChangeListener(listener);
GM.audio.removeStateChangeListener(listener);
expectTypeOf(state.isMuted).toEqualTypeOf<boolean | undefined>();
GM_notification({ highlight: true });
GM.notification({ text: 'Message', highlight: false });
// @ts-expect-error a notification needs text or highlighting
GM_notification({ title: 'Empty' });
// @ts-expect-error highlighting must be enabled without text
GM_notification({ highlight: false });
// @ts-expect-error clickedFrame is a boolean
GM_registerMenuCommand('Menu', () => {}, { clickedFrame: 'yes' });
GM_xmlhttpRequest({
  url: '/',
  // @ts-expect-error proxy type must be supported
  proxy: { type: 'invalid', host: 'localhost', port: 80 },
});
// @ts-expect-error a Tampermonkey-only container is not guaranteed
void GM_info.container.id;
// @ts-expect-error a Violentmonkey-only platform is not guaranteed
void GM_info.platform.arch;

GM_registerMenuCommand('Menu', () => {}, {
  icon: 'https://example.test/icon.png',
});
GM_getResourceURL('image', false);
GM.getResourceUrl('image', true);
GM_openInTab('https://example.test', { container: 42, pinned: true });
GM_setClipboard('text');
GM.setClipboard('text');
GM.notification('message', 'title', undefined, () => {});
GM_xmlhttpRequest({
  url: '/',
  withCredentials: true,
  context: { id: 1 },
  upload: {
    onprogress(event) {
      expectTypeOf(event.loaded).toEqualTypeOf<number>();
      expectTypeOf(event.context.id).toEqualTypeOf<number>();
    },
    onabort(event) {
      expectTypeOf(event.status).toEqualTypeOf<number>();
    },
    onloadend(event) {
      expectTypeOf(event.context.id).toEqualTypeOf<number>();
    },
  },
});
expectTypeOf(
  GM.xmlHttpRequest({ url: '/' }),
).toEqualTypeOf<GmAsyncXmlhttpRequestReturnType<'text', undefined> | void>();
const request = GM.xmlHttpRequest({ url: '/' });
if (request) request.abort();
// @ts-expect-error container ID must be numeric
GM_openInTab('/', { container: 'container-1' });
// @ts-expect-error upload callbacks must be functions
GM_xmlhttpRequest({ url: '/', upload: { onprogress: true } });

GM_xmlhttpRequest({
  url: '/',
  responseType: 'json',
  onload(event) {
    expectTypeOf(event.response).toEqualTypeOf<unknown>();
    expectTypeOf(event.context).toEqualTypeOf<undefined>();
    // @ts-expect-error JSON must be narrowed or typed explicitly
    void event.response.answer;
  },
});
GM_xmlhttpRequest<'json', { id: number }, { answer: number }>({
  url: '/',
  responseType: 'json',
  context: { id: 1 },
  onload(event) {
    expectTypeOf(event.response.answer).toEqualTypeOf<number>();
    expectTypeOf(event.context.id).toEqualTypeOf<number>();
    expectTypeOf(this.response.answer).toEqualTypeOf<number>();
  },
  onerror(event) {
    expectTypeOf(event.response.answer).toEqualTypeOf<number>();
  },
  onprogress(event) {
    expectTypeOf(event.response.answer).toEqualTypeOf<number>();
  },
  upload: {
    onload(event) {
      expectTypeOf(event.response.answer).toEqualTypeOf<number>();
    },
  },
});
GM_xmlhttpRequest({
  url: '/',
  responseType: 'arraybuffer',
  context: { id: 1 },
  onload(event) {
    expectTypeOf(event.response).toEqualTypeOf<ArrayBuffer>();
    expectTypeOf(event.context.id).toEqualTypeOf<number>();
  },
});
const urlListener: import('$').GmUrlChangeListener = ({ url }) => {
  url.toUpperCase();
};
monkeyWindow.addEventListener('urlchange', urlListener);
monkeyWindow.removeEventListener('urlchange', urlListener);
declare const typedCallback: import('$').GmAnyFuntion<[number], string>;
expectTypeOf(typedCallback(1)).toEqualTypeOf<string>();

declare const tampermonkey: import('$').TampermonkeyGM;
const jsonRequest = tampermonkey.xmlHttpRequest<
  'json',
  undefined,
  { answer: number }
>({ url: '/', responseType: 'json' });
jsonRequest.abort();
jsonRequest.then((event) => {
  expectTypeOf(event.response.answer).toEqualTypeOf<number>();
});
monkeyWindow.GM_cookie.list({}, (_cookies, error) => {
  expectTypeOf(error).toEqualTypeOf<unknown>();
});
GM.cookie.set({ name: 'test', value: 'value' });
declare const attributes: import('$').GmAddElementAttributes;
expectTypeOf(attributes.custom).toEqualTypeOf<unknown>();
