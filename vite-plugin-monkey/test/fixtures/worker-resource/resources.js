/* global URL */
import icon from './icon.svg';
import initialize from './answer.wasm?init';
import wasmUrl from './answer.wasm?url';

export async function read() {
  const image = await globalThis.fetch(icon);
  const fromUrl = new URL('./icon.svg#symbol', import.meta.url);
  const binary = await globalThis.fetch(
    new URL('./payload.bin', import.meta.url),
  );
  const initialized = await initialize();
  const streamed = await globalThis.WebAssembly.instantiateStreaming(
    globalThis.fetch(wasmUrl),
  );
  return {
    image: await image.text(),
    mime: image.headers.get('content-type'),
    sameImage:
      (await (await globalThis.fetch(fromUrl)).text()) ===
      '<svg xmlns="http://www.w3.org/2000/svg"><symbol id="symbol"/></svg>\n',
    fragment: fromUrl.hash,
    bytes: [...new Uint8Array(await binary.arrayBuffer())],
    initialized: initialized.exports.answer(),
    streamed: streamed.instance.exports.answer(),
  };
}
