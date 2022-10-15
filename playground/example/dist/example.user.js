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
// @resource           element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.2.17/dist/index.css
// @grant              GM_addElement
// @grant              GM_cookie
// @grant              GM_getResourceText
// @grant              unsafeWindow
// ==/UserScript==

(e=>{const o=document.createElement("style");o.dataset.source="vite-plugin-monkey",o.innerText=e,document.head.appendChild(o)})(":root{font-family:Inter,Avenir,Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%}a{font-weight:500;color:#646cff;text-decoration:inherit}a:hover{color:#535bf2}body{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}h1{font-size:3.2em;line-height:1.1}button{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s}button:hover{border-color:#646cff}button:focus,button:focus-visible{outline:4px auto -webkit-focus-ring-color}.card{padding:2em}#app{max-width:1280px;margin:0 auto;padding:2rem;text-align:center}@media (prefers-color-scheme: light){:root{color:#213547;background-color:#fff}a:hover{color:#747bff}button{background-color:#f9f9f9}}");

(function(md52, client) {
  var _a;
  "use strict";
  const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
  const md5__default = /* @__PURE__ */ _interopDefaultLegacy(md52);
  const style = "";
  const cssLoader = (e) => {
    const t = GM_getResourceText(e), o = document.createElement("style");
    return o.innerText = t, document.head.append(o), t;
  };
  cssLoader("element-plus/dist/index.css");
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
})(md5, (window.monkeyWindow = window, window));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS51c2VyLmpzIiwic291cmNlcyI6WyJzcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbi8vIGltcG9ydCBwbmdVcmwgZnJvbSAnLi9hc3NldC90ZXN0LnBuZyc7XG4vLyBpbXBvcnQgc3ZnVXJsIGZyb20gJy4vYXNzZXQvZmF2aWNvbi5zdmcnO1xuaW1wb3J0IG1kNSBmcm9tICdibHVlaW1wLW1kNSc7XG4vLyBpbXBvcnQgJ2VsZW1lbnQtcGx1cy9kaXN0L2luZGV4LmNzcyc7XG5pbXBvcnQgJ2VsZW1lbnQtcGx1cy9kaXN0L2luZGV4LmNzcyc7XG5cbi8vIGNvbnNvbGUubG9nKHsgY3NzIH0pO1xuXG5jb25zb2xlLmxvZyhgbWQ1KCcxMTQ1MTQnKT0ke21kNSgnMTE0NTE0Jyl9YCk7IC8vYzRkMDM4YjRiZWQwOWZkYjE0NzFlZjUxZWMzYTMyY2RcbmNvbnNvbGUubG9nKCdkb2N1bWVudC5yZWFkeVN0YXRlJywgZG9jdW1lbnQucmVhZHlTdGF0ZSk7IC8vIGludGVyYWN0aXZlXG5cbmltcG9ydCB7XG4gIEdNX2Nvb2tpZSxcbiAgdW5zYWZlV2luZG93LFxuICBtb25rZXlXaW5kb3csXG4gIEdNX2FkZEVsZW1lbnQsXG4gIEdNX2luZm8sXG59IGZyb20gJyQnO1xuXG5jb25zb2xlLmxvZyhtb25rZXlXaW5kb3cpO1xuXG4vLyB0YW1wZXJtb25rZXkgb25seVxuR01fYWRkRWxlbWVudCAmJiBHTV9hZGRFbGVtZW50KCdkaXYnLCB7IGlubmVySFRNTDogJ2hlbGxvJyB9KTtcblxuaWYgKHVuc2FmZVdpbmRvdyA9PSB3aW5kb3cpIHtcbiAgY29uc29sZS5sb2coJ3Njb3BlLT5ob3N0Jyk7XG59IGVsc2Uge1xuICBjb25zb2xlLmxvZygnc2NvcGUtPm1vbmtleScpO1xufVxuXG4vLyB0YW1wZXJtb25rZXkgb25seVxuR01fY29va2llPy5saXN0KHt9LCAoY29va2llcywgZXJyb3IpID0+IHtcbiAgaWYgKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IFtjb29raWVdID0gY29va2llcztcbiAgICBpZiAoY29va2llKSB7XG4gICAgICBjb25zb2xlLmxvZyhjb29raWUpO1xuICAgICAgLy8ge1xuICAgICAgLy8gICBcImRvbWFpblwiOiBcImkuc29uZ2UubGlcIixcbiAgICAgIC8vICAgXCJodHRwT25seVwiOiBmYWxzZSxcbiAgICAgIC8vICAgXCJzZWN1cmVcIjogZmFsc2UsXG4gICAgICAvLyAgIFwibmFtZVwiOiBcImtcIixcbiAgICAgIC8vICAgXCJwYXRoXCI6IFwiL1wiLFxuICAgICAgLy8gICBcInNhbWVTaXRlXCI6IFwidW5zcGVjaWZpZWRcIixcbiAgICAgIC8vICAgXCJ2YWx1ZVwiOiBcInZcIixcbiAgICAgIC8vICAgXCJzZXNzaW9uXCI6IHRydWUsXG4gICAgICAvLyAgIFwiaG9zdE9ubHlcIjogdHJ1ZVxuICAgICAgLy8gfVxuICAgIH1cbiAgfVxufSk7XG5cbi8vLS0tLS0tLS0tdGVzdCBjb2RlIGZvcm1hdC0tLS0tLS0tXG4vLyBpbXBvcnQgeyBmb3JtYXRDb2RlIH0gZnJvbSAnLi9mb3JtYXQnO1xuLy8gY29uc29sZS5sb2coJ2Zvcm1hdCB0c3ggY29kZScpO1xuLy8gY29uc3QgdHN4Q29kZSA9IGBjb25zdCBBcHA9KCk9PntyZXR1cm4oPGRpdiBjbGFzcz17c3R5bGVzLkFwcH0+XG4vLyA8aGVhZGVyIGNsYXNzPXtzdHlsZXMuaGVhZGVyfT5cbi8vIDxpbWcgc3JjPXtsb2dvfSBjbGFzcz17c3R5bGVzLmxvZ299IGFsdD1cImxvZ29cIiAvPlxuLy8gPHA+XG4vLyBFZGl0IDxjb2RlPnNyYy9BcHAudHN4PC9jb2RlPiBhbmQgc2F2ZSB0byByZWxvYWQuXG4vLyA8L3A+XG4vLyA8YVxuLy8gY2xhc3M9e3N0eWxlcy5saW5rfVxuLy8gaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zb2xpZGpzL3NvbGlkXCJcbi8vIHRhcmdldD1cIl9ibGFua1wiXG4vLyByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCJcbi8vID5cbi8vIExlYXJuIFNvbGlkXG4vLyA8L2E+XG4vLyA8L2hlYWRlcj5cbi8vIDwvZGl2PlxuLy8gKTtcbi8vIH07YDtcbi8vIGNvbnNvbGUubG9nKGZvcm1hdENvZGUodHN4Q29kZSwgJ3RzeCcpKTtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIl0sIm5hbWVzIjpbIm1kNSIsIm1vbmtleVdpbmRvdyIsIkdNX2FkZEVsZW1lbnQiLCJ1bnNhZmVXaW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU0EsVUFBUSxJQUFJLGlCQUFpQkEsYUFBSSxRQUFBLFFBQVEsR0FBRztBQUM1QyxVQUFRLElBQUksdUJBQXVCLFNBQVMsVUFBVTtBQVV0RCxVQUFRLElBQUlDLE9BQUFBLFlBQVk7QUFHeEIsU0FBQSxpQkFBaUJDLE9BQWMsY0FBQSxPQUFPLEVBQUUsV0FBVyxRQUFTLENBQUE7QUFFNUQsTUFBSUMsT0FBQUEsZ0JBQWdCLFFBQVE7QUFDMUIsWUFBUSxJQUFJLGFBQWE7QUFBQSxFQUMzQixPQUFPO0FBQ0wsWUFBUSxJQUFJLGVBQWU7QUFBQSxFQUM3QjtBQUdBLGVBQUEsY0FBQSxtQkFBVyxLQUFLLENBQUEsR0FBSSxDQUFDLFNBQVMsVUFBVTtBQUN0QyxRQUFJLE9BQU87QUFDVCxjQUFRLElBQUksS0FBSztBQUFBLElBQUEsT0FDWjtBQUNDLFlBQUEsQ0FBQyxNQUFNLElBQUk7QUFDakIsVUFBSSxRQUFRO0FBQ1YsZ0JBQVEsSUFBSSxNQUFNO0FBQUEsTUFZcEI7QUFBQSxJQUNGO0FBQUEsRUFDRjs7Iiwic291cmNlUm9vdCI6Ii9odHRwczovL2dpdGh1Yi5jb20vbGlzb25nZS9leGFtcGxlLyJ9
