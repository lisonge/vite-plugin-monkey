// ==UserScript==
// @name               example
// @name:ja            hentai
// @name:zh            测试_
// @namespace          https://github.com/lisonge
// @version            1.0.1
// @author             lisonge
// @description        default description zh
// @description:zh     描述
// @description:en     description
// @description:ja     説明z
// @description:zh-CN  描述
// @license            MIT
// @icon               https://vitejs.dev/logo.svg
// @homepage           https://github.com/lisonge/vite-plugin-monkey#readme
// @homepageURL        https://github.com/lisonge/vite-plugin-monkey#readme
// @source             https://github.com/lisonge/vite-plugin-monkey.git
// @supportURL         https://github.com/lisonge/vite-plugin-monkey/issues
// @include            /^https:\/\/i\.songe\.li\/.*/
// @match              https://i.songe.li/
// @require            https://cdn.jsdelivr.net/npm/blueimp-md5@2.19.0
// @require            https://cdn.jsdelivr.net/npm/prettier@2.7.1/standalone.js
// @require            https://cdn.jsdelivr.net/npm/prettier@2.7.1/parser-babel.js
// @resource           element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.2.17/dist/index.css
// @grant              GM_addElement
// @grant              GM_cookie
// @grant              GM_getResourceText
// @grant              unsafeWindow
// ==/UserScript==

(e=>{const o=document.createElement("style");o.dataset.source="vite-plugin-monkey",o.innerText=e,document.head.appendChild(o)})(":root{font-family:Inter,Avenir,Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%}a{font-weight:500;color:#646cff;text-decoration:inherit}a:hover{color:#535bf2}body{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}h1{font-size:3.2em;line-height:1.1}button{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s}button:hover{border-color:#646cff}button:focus,button:focus-visible{outline:4px auto -webkit-focus-ring-color}.card{padding:2em}#app{max-width:1280px;margin:0 auto;padding:2rem;text-align:center}@media (prefers-color-scheme: light){:root{color:#213547;background-color:#fff}a:hover{color:#747bff}button{background-color:#f9f9f9}}");

(function(md52, client, prettier2, parserBabel) {
  var _a;
  "use strict";
  const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
  const md5__default = /* @__PURE__ */ _interopDefaultLegacy(md52);
  const prettier__default = /* @__PURE__ */ _interopDefaultLegacy(prettier2);
  const parserBabel__default = /* @__PURE__ */ _interopDefaultLegacy(parserBabel);
  const style = "";
  const cssLoader = (e) => {
    const t = GM_getResourceText(e), o = document.createElement("style");
    return o.innerText = t, document.head.append(o), t;
  };
  cssLoader("element-plus/dist/index.css");
  const plugins = [parserBabel__default.default];
  const lang2parser = {
    js: "babel",
    jsx: "babel",
    ts: "babel-ts",
    tsx: "babel-ts",
    json: "json",
    json5: "json5"
  };
  Object.assign(lang2parser, {
    java: "java"
  });
  const formatCode = (code, lang) => {
    if (lang2parser[lang]) {
      try {
        return prettier__default.default.format(code, {
          parser: lang2parser[lang],
          plugins
        });
      } catch {
      }
    }
    return code;
  };
  console.log(`md5('114514')=${md5__default.default("114514")}`);
  console.log("document.readyState", document.readyState);
  console.log(client.monkeyWindow);
  client.GM_addElement && client.GM_addElement("div", { innerHTML: "hello" });
  if (client.unsafeWindow == window) {
    console.log("scope->host");
  } else {
    console.log("scope->monkey");
  }
  (_a = client.GM_cookie) == null ? void 0 : _a.list({}, (cookies, error) => {
    if (error) {
      console.log(error);
    } else {
      const [cookie] = cookies;
      if (cookie) {
        console.log(cookie);
      }
    }
  });
  console.log("format tsx code");
  const tsxCode = `const App=()=>{return(<div class={styles.App}>
<header class={styles.header}>
<img src={logo} class={styles.logo} alt="logo" />
<p>
Edit <code>src/App.tsx</code> and save to reload.
</p>
<a
class={styles.link}
href="https://github.com/solidjs/solid"
target="_blank"
rel="noopener noreferrer"
>
Learn Solid
</a>
</header>
</div>
);
};`;
  console.log(formatCode(tsxCode, "tsx"));
})(md5, (window.monkeyWindow = window, window), prettier, prettierPlugins.babel);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS51c2VyLmpzIiwic291cmNlcyI6WyJzcmMvZm9ybWF0LnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByZXR0aWVyIGZyb20gJ3ByZXR0aWVyJztcbmltcG9ydCBwYXJzZXJCYWJlbCBmcm9tICdwcmV0dGllci9wYXJzZXItYmFiZWwnO1xuaW1wb3J0IHR5cGUgeyBCdWlsdEluUGFyc2VyTmFtZSwgUGx1Z2luIH0gZnJvbSAncHJldHRpZXInO1xuXG4vLyBjb25zb2xlLmxvZyhwcmV0dGllci5nZXRTdXBwb3J0SW5mbygpLmxhbmd1YWdlcyk7XG5cbmNvbnN0IHBsdWdpbnM6IFBsdWdpbltdID0gW3BhcnNlckJhYmVsXTtcblxuY29uc3QgbGFuZzJwYXJzZXI6IFJlY29yZDxzdHJpbmcsIEJ1aWx0SW5QYXJzZXJOYW1lPiA9IHtcbiAganM6ICdiYWJlbCcsXG4gIGpzeDogJ2JhYmVsJyxcbiAgdHM6ICdiYWJlbC10cycsXG4gIHRzeDogJ2JhYmVsLXRzJyxcbiAganNvbjogJ2pzb24nLFxuICBqc29uNTogJ2pzb241Jyxcbn07XG5PYmplY3QuYXNzaWduKGxhbmcycGFyc2VyLCB7XG4gIGphdmE6ICdqYXZhJyxcbn0pO1xuXG5leHBvcnQgY29uc3QgZm9ybWF0Q29kZSA9IChjb2RlOiBzdHJpbmcsIGxhbmc6IHN0cmluZykgPT4ge1xuICBpZiAobGFuZzJwYXJzZXJbbGFuZ10pIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHByZXR0aWVyLmZvcm1hdChjb2RlLCB7XG4gICAgICAgIHBhcnNlcjogbGFuZzJwYXJzZXJbbGFuZ10sXG4gICAgICAgIHBsdWdpbnMsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIHt9XG4gIH1cbiAgcmV0dXJuIGNvZGU7XG59O1xuIiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG4vLyBpbXBvcnQgcG5nVXJsIGZyb20gJy4vYXNzZXQvdGVzdC5wbmcnO1xuLy8gaW1wb3J0IHN2Z1VybCBmcm9tICcuL2Fzc2V0L2Zhdmljb24uc3ZnJztcbmltcG9ydCBtZDUgZnJvbSAnYmx1ZWltcC1tZDUnO1xuLy8gaW1wb3J0ICdlbGVtZW50LXBsdXMvZGlzdC9pbmRleC5jc3MnO1xuaW1wb3J0ICdlbGVtZW50LXBsdXMvZGlzdC9pbmRleC5jc3MnO1xuXG4vLyBjb25zb2xlLmxvZyh7IGNzcyB9KTtcblxuY29uc29sZS5sb2coYG1kNSgnMTE0NTE0Jyk9JHttZDUoJzExNDUxNCcpfWApOyAvL2M0ZDAzOGI0YmVkMDlmZGIxNDcxZWY1MWVjM2EzMmNkXG5jb25zb2xlLmxvZygnZG9jdW1lbnQucmVhZHlTdGF0ZScsIGRvY3VtZW50LnJlYWR5U3RhdGUpOyAvLyBpbnRlcmFjdGl2ZVxuXG5pbXBvcnQge1xuICBHTV9jb29raWUsXG4gIHVuc2FmZVdpbmRvdyxcbiAgbW9ua2V5V2luZG93LFxuICBHTV9hZGRFbGVtZW50LFxuICBHTV9pbmZvLFxufSBmcm9tICckJztcblxuY29uc29sZS5sb2cobW9ua2V5V2luZG93KTtcblxuLy8gdGFtcGVybW9ua2V5IG9ubHlcbkdNX2FkZEVsZW1lbnQgJiYgR01fYWRkRWxlbWVudCgnZGl2JywgeyBpbm5lckhUTUw6ICdoZWxsbycgfSk7XG5cbmlmICh1bnNhZmVXaW5kb3cgPT0gd2luZG93KSB7XG4gIGNvbnNvbGUubG9nKCdzY29wZS0+aG9zdCcpO1xufSBlbHNlIHtcbiAgY29uc29sZS5sb2coJ3Njb3BlLT5tb25rZXknKTtcbn1cblxuLy8gdGFtcGVybW9ua2V5IG9ubHlcbkdNX2Nvb2tpZT8ubGlzdCh7fSwgKGNvb2tpZXMsIGVycm9yKSA9PiB7XG4gIGlmIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBbY29va2llXSA9IGNvb2tpZXM7XG4gICAgaWYgKGNvb2tpZSkge1xuICAgICAgY29uc29sZS5sb2coY29va2llKTtcbiAgICAgIC8vIHtcbiAgICAgIC8vICAgXCJkb21haW5cIjogXCJpLnNvbmdlLmxpXCIsXG4gICAgICAvLyAgIFwiaHR0cE9ubHlcIjogZmFsc2UsXG4gICAgICAvLyAgIFwic2VjdXJlXCI6IGZhbHNlLFxuICAgICAgLy8gICBcIm5hbWVcIjogXCJrXCIsXG4gICAgICAvLyAgIFwicGF0aFwiOiBcIi9cIixcbiAgICAgIC8vICAgXCJzYW1lU2l0ZVwiOiBcInVuc3BlY2lmaWVkXCIsXG4gICAgICAvLyAgIFwidmFsdWVcIjogXCJ2XCIsXG4gICAgICAvLyAgIFwic2Vzc2lvblwiOiB0cnVlLFxuICAgICAgLy8gICBcImhvc3RPbmx5XCI6IHRydWVcbiAgICAgIC8vIH1cbiAgICB9XG4gIH1cbn0pO1xuXG4vLy0tLS0tLS0tLXRlc3QgY29kZSBmb3JtYXQtLS0tLS0tLVxuaW1wb3J0IHsgZm9ybWF0Q29kZSB9IGZyb20gJy4vZm9ybWF0JztcbmNvbnNvbGUubG9nKCdmb3JtYXQgdHN4IGNvZGUnKTtcbmNvbnN0IHRzeENvZGUgPSBgY29uc3QgQXBwPSgpPT57cmV0dXJuKDxkaXYgY2xhc3M9e3N0eWxlcy5BcHB9PlxuPGhlYWRlciBjbGFzcz17c3R5bGVzLmhlYWRlcn0+XG48aW1nIHNyYz17bG9nb30gY2xhc3M9e3N0eWxlcy5sb2dvfSBhbHQ9XCJsb2dvXCIgLz5cbjxwPlxuRWRpdCA8Y29kZT5zcmMvQXBwLnRzeDwvY29kZT4gYW5kIHNhdmUgdG8gcmVsb2FkLlxuPC9wPlxuPGFcbmNsYXNzPXtzdHlsZXMubGlua31cbmhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vc29saWRqcy9zb2xpZFwiXG50YXJnZXQ9XCJfYmxhbmtcIlxucmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXG4+XG5MZWFybiBTb2xpZFxuPC9hPlxuPC9oZWFkZXI+XG48L2Rpdj5cbik7XG59O2A7XG5jb25zb2xlLmxvZyhmb3JtYXRDb2RlKHRzeENvZGUsICd0c3gnKSk7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiJdLCJuYW1lcyI6WyJwYXJzZXJCYWJlbCIsInByZXR0aWVyIiwibWQ1IiwibW9ua2V5V2luZG93IiwiR01fYWRkRWxlbWVudCIsInVuc2FmZVdpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQSxRQUFNLFVBQW9CLENBQUNBLHFCQUFBQSxPQUFXO0FBRXRDLFFBQU0sY0FBaUQ7QUFBQSxJQUNyRCxJQUFJO0FBQUEsSUFDSixLQUFLO0FBQUEsSUFDTCxJQUFJO0FBQUEsSUFDSixLQUFLO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsRUFDVDtBQUNBLFNBQU8sT0FBTyxhQUFhO0FBQUEsSUFDekIsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVZLFFBQUEsYUFBYSxDQUFDLE1BQWMsU0FBaUI7QUFDeEQsUUFBSSxZQUFZLE9BQU87QUFDakIsVUFBQTtBQUNLLGVBQUFDLGtCQUFBLFFBQVMsT0FBTyxNQUFNO0FBQUEsVUFDM0IsUUFBUSxZQUFZO0FBQUEsVUFDcEI7QUFBQSxRQUFBLENBQ0Q7QUFBQSxNQUFBLFFBQ0Q7QUFBQSxNQUFPO0FBQUEsSUFDWDtBQUNPLFdBQUE7QUFBQSxFQUNUO0FDckJBLFVBQVEsSUFBSSxpQkFBaUJDLGFBQUksUUFBQSxRQUFRLEdBQUc7QUFDNUMsVUFBUSxJQUFJLHVCQUF1QixTQUFTLFVBQVU7QUFVdEQsVUFBUSxJQUFJQyxPQUFBQSxZQUFZO0FBR3hCLFNBQUEsaUJBQWlCQyxPQUFjLGNBQUEsT0FBTyxFQUFFLFdBQVcsUUFBUyxDQUFBO0FBRTVELE1BQUlDLE9BQUFBLGdCQUFnQixRQUFRO0FBQzFCLFlBQVEsSUFBSSxhQUFhO0FBQUEsRUFDM0IsT0FBTztBQUNMLFlBQVEsSUFBSSxlQUFlO0FBQUEsRUFDN0I7QUFHQSxlQUFBLGNBQUEsbUJBQVcsS0FBSyxDQUFBLEdBQUksQ0FBQyxTQUFTLFVBQVU7QUFDdEMsUUFBSSxPQUFPO0FBQ1QsY0FBUSxJQUFJLEtBQUs7QUFBQSxJQUFBLE9BQ1o7QUFDQyxZQUFBLENBQUMsTUFBTSxJQUFJO0FBQ2pCLFVBQUksUUFBUTtBQUNWLGdCQUFRLElBQUksTUFBTTtBQUFBLE1BWXBCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFJQSxVQUFRLElBQUksaUJBQWlCO0FBQzdCLFFBQU0sVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFrQmhCLFVBQVEsSUFBSSxXQUFXLFNBQVMsS0FBSyxDQUFDOzsiLCJzb3VyY2VSb290IjoiL2h0dHBzOi8vZ2l0aHViLmNvbS9saXNvbmdlL2V4YW1wbGUvIn0=
