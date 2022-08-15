// ==UserScript==
// @name       vite-vanilla-ts-starter
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// ==/UserScript==

// use vite-plugin-monkey@2.1.1 at 2022-08-15T17:38:20.363Z

;(({ css = "" }) => {
  const style = document.createElement("style");
  style.innerText = css;
  style.dataset.source = "vite-plugin-monkey";
  document.head.appendChild(style);
})({
  "css": ":root {\r\n  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;\r\n  font-size: 16px;\r\n  line-height: 24px;\r\n  font-weight: 400;\r\n\r\n  color-scheme: light dark;\r\n  color: rgba(255, 255, 255, 0.87);\r\n  background-color: #242424;\r\n\r\n  font-synthesis: none;\r\n  text-rendering: optimizeLegibility;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n  -webkit-text-size-adjust: 100%;\r\n}\r\n\r\na {\r\n  font-weight: 500;\r\n  color: #646cff;\r\n  text-decoration: inherit;\r\n}\r\na:hover {\r\n  color: #535bf2;\r\n}\r\n\r\nbody {\r\n  margin: 0;\r\n  display: flex;\r\n  place-items: center;\r\n  min-width: 320px;\r\n  min-height: 100vh;\r\n}\r\n\r\nh1 {\r\n  font-size: 3.2em;\r\n  line-height: 1.1;\r\n}\r\n\r\n#app {\r\n  max-width: 1280px;\r\n  margin: 0 auto;\r\n  padding: 2rem;\r\n  text-align: center;\r\n}\r\n\r\n.logo {\r\n  height: 6em;\r\n  padding: 1.5em;\r\n  will-change: filter;\r\n}\r\n.logo:hover {\r\n  filter: drop-shadow(0 0 2em #646cffaa);\r\n}\r\n.logo.vanilla:hover {\r\n  filter: drop-shadow(0 0 2em #f7df1eaa);\r\n}\r\n\r\n.card {\r\n  padding: 2em;\r\n}\r\n\r\n.read-the-docs {\r\n  color: #888;\r\n}\r\n\r\nbutton {\r\n  border-radius: 8px;\r\n  border: 1px solid transparent;\r\n  padding: 0.6em 1.2em;\r\n  font-size: 1em;\r\n  font-weight: 500;\r\n  font-family: inherit;\r\n  background-color: #1a1a1a;\r\n  cursor: pointer;\r\n  transition: border-color 0.25s;\r\n}\r\nbutton:hover {\r\n  border-color: #646cff;\r\n}\r\nbutton:focus,\r\nbutton:focus-visible {\r\n  outline: 4px auto -webkit-focus-ring-color;\r\n}\r\n\r\n@media (prefers-color-scheme: light) {\r\n  :root {\r\n    color: #213547;\r\n    background-color: #ffffff;\r\n  }\r\n  a:hover {\r\n    color: #747bff;\r\n  }\r\n  button {\r\n    background-color: #f9f9f9;\r\n  }\r\n}\r\n"
});

(function() {
  "use strict";
  const style = "";
  const typescriptLogo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1sb2dvcyIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iIzAwN0FDQyIgZD0iTTAgMTI4djEyOGgyNTZWMEgweiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Im01Ni42MTIgMTI4Ljg1bC0uMDgxIDEwLjQ4M2gzMy4zMnY5NC42OGgyMy41Njh2LTk0LjY4aDMzLjMyMXYtMTAuMjhjMC01LjY5LS4xMjItMTAuNDQ0LS4yODQtMTAuNTY2Yy0uMTIyLS4xNjItMjAuNC0uMjQ0LTQ0Ljk4My0uMjAzbC00NC43NC4xMjJsLS4xMjEgMTAuNDQzWm0xNDkuOTU1LTEwLjc0MmM2LjUwMSAxLjYyNSAxMS40NTkgNC41MSAxNi4wMSA5LjIyNGMyLjM1NyAyLjUyIDUuODUxIDcuMTExIDYuMTM2IDguMjA4Yy4wOC4zMjUtMTEuMDUzIDcuODAyLTE3Ljc5OCAxMS45ODhjLS4yNDQuMTYyLTEuMjItLjg5NC0yLjMxNy0yLjUyYy0zLjI5MS00Ljc5NS02Ljc0NS02Ljg2Ny0xMi4wMjgtNy4yMzNjLTcuNzYtLjUyOC0xMi43NTkgMy41MzUtMTIuNzE4IDEwLjMyMWMwIDEuOTkyLjI4NCAzLjE3IDEuMDk3IDQuNzk1YzEuNzA3IDMuNTM2IDQuODc2IDUuNjQ5IDE0LjgzMiA5Ljk1NmMxOC4zMjYgNy44ODMgMjYuMTY4IDEzLjA4NCAzMS4wNDUgMjAuNDhjNS40NDUgOC4yNDkgNi42NjQgMjEuNDE1IDIuOTY2IDMxLjIwOGMtNC4wNjMgMTAuNjQ2LTE0LjE0IDE3Ljg3OS0yOC4zMjMgMjAuMjc2Yy00LjM4OC43NzItMTQuNzkuNjUtMTkuNTA0LS4yMDNjLTEwLjI4LTEuODI4LTIwLjAzMy02LjkwOC0yNi4wNDctMTMuNTcyYy0yLjM1Ny0yLjYtNi45NDktOS4zODctNi42NjQtOS44NzRjLjEyMi0uMTYzIDEuMTc4LS44MTMgMi4zNTYtMS41MDRjMS4xMzgtLjY1IDUuNDQ2LTMuMTI5IDkuNTA5LTUuNDg1bDcuMzU1LTQuMjY3bDEuNTQ0IDIuMjc2YzIuMTU0IDMuMjkgNi44NjcgNy44MDEgOS43MTIgOS4zMDVjOC4xNjcgNC4zMDcgMTkuMzgzIDMuNjk4IDI0LjkwOS0xLjI2YzIuMzU3LTIuMTUzIDMuMzMyLTQuMzg4IDMuMzMyLTcuNjhjMC0yLjk2Ni0uMzY2LTQuMjY2LTEuOTEtNi41MDFjLTEuOTktMi44NDUtNi4wNTQtNS4yNDItMTcuNTk1LTEwLjI0Yy0xMy4yMDYtNS42OS0xOC44OTUtOS4yMjQtMjQuMDk2LTE0LjgzMmMtMy4wMDctMy4yNS01Ljg1Mi04LjQ1Mi03LjAzLTEyLjhjLS45NzUtMy42MTctMS4yMi0xMi42NzgtLjQ0Ny0xNi4zMzVjMi43MjMtMTIuNzYgMTIuMzUzLTIxLjY1OSAyNi4yNS0yNC4zYzQuNTEtLjg1MyAxNC45OTQtLjUyOCAxOS40MjQuNTY5WiI+PC9wYXRoPjwvc3ZnPg==";
  const viteLogo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1sb2dvcyIgd2lkdGg9IjMxLjg4IiBoZWlnaHQ9IjMyIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgMjU2IDI1NyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJJY29uaWZ5SWQxODEzMDg4ZmUxZmJjMDFmYjQ2NiIgeDE9Ii0uODI4JSIgeDI9IjU3LjYzNiUiIHkxPSI3LjY1MiUiIHkyPSI3OC40MTElIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNDFEMUZGIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQkQzNEZFIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE4MTMwODhmZTFmYmMwMWZiNDY3IiB4MT0iNDMuMzc2JSIgeDI9IjUwLjMxNiUiIHkxPSIyLjI0MiUiIHkyPSI4OS4wMyUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkVBODMiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjguMzMzJSIgc3RvcC1jb2xvcj0iI0ZGREQzNSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGQTgwMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGZpbGw9InVybCgjSWNvbmlmeUlkMTgxMzA4OGZlMWZiYzAxZmI0NjYpIiBkPSJNMjU1LjE1MyAzNy45MzhMMTM0Ljg5NyAyNTIuOTc2Yy0yLjQ4MyA0LjQ0LTguODYyIDQuNDY2LTExLjM4Mi4wNDhMLjg3NSAzNy45NThjLTIuNzQ2LTQuODE0IDEuMzcxLTEwLjY0NiA2LjgyNy05LjY3bDEyMC4zODUgMjEuNTE3YTYuNTM3IDYuNTM3IDAgMCAwIDIuMzIyLS4wMDRsMTE3Ljg2Ny0yMS40ODNjNS40MzgtLjk5MSA5LjU3NCA0Ljc5NiA2Ljg3NyA5LjYyWiI+PC9wYXRoPjxwYXRoIGZpbGw9InVybCgjSWNvbmlmeUlkMTgxMzA4OGZlMWZiYzAxZmI0NjcpIiBkPSJNMTg1LjQzMi4wNjNMOTYuNDQgMTcuNTAxYTMuMjY4IDMuMjY4IDAgMCAwLTIuNjM0IDMuMDE0bC01LjQ3NCA5Mi40NTZhMy4yNjggMy4yNjggMCAwIDAgMy45OTcgMy4zNzhsMjQuNzc3LTUuNzE4YzIuMzE4LS41MzUgNC40MTMgMS41MDcgMy45MzYgMy44MzhsLTcuMzYxIDM2LjA0N2MtLjQ5NSAyLjQyNiAxLjc4MiA0LjUgNC4xNTEgMy43OGwxNS4zMDQtNC42NDljMi4zNzItLjcyIDQuNjUyIDEuMzYgNC4xNSAzLjc4OGwtMTEuNjk4IDU2LjYyMWMtLjczMiAzLjU0MiAzLjk3OSA1LjQ3MyA1Ljk0MyAyLjQzN2wxLjMxMy0yLjAyOGw3Mi41MTYtMTQ0LjcyYzEuMjE1LTIuNDIzLS44OC01LjE4Ni0zLjU0LTQuNjcybC0yNS41MDUgNC45MjJjLTIuMzk2LjQ2Mi00LjQzNS0xLjc3LTMuNzU5LTQuMTE0bDE2LjY0Ni01Ny43MDVjLjY3Ny0yLjM1LTEuMzctNC41ODMtMy43NjktNC4xMTNaIj48L3BhdGg+PC9zdmc+";
  function setupCounter(element) {
    let counter = 0;
    const setCounter = (count) => {
      counter = count;
      element.innerHTML = `count is ${counter}`;
    };
    element.addEventListener("click", () => setCounter(++counter));
    setCounter(0);
  }
  (() => {
    const app = document.createElement("div");
    document.body.append(app);
    return app;
  })().innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;
  setupCounter(document.querySelector("#counter"));
})();
 
