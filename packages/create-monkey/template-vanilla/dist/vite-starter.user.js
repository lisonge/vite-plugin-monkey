// ==UserScript==
// @name       vite-starter
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// ==/UserScript==

// use vite-plugin-monkey@1.1.2 at 2022-07-20T09:15:22.481Z

;(({ cssText = "" }) => {
  const style = document.createElement("style");
  style.innerText = cssText;
  style.dataset.source = "vite-plugin-monkey";
  document.head.appendChild(style);
})({
  "cssText": ":root {\n  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;\n  font-size: 16px;\n  line-height: 24px;\n  font-weight: 400;\n\n  color-scheme: light dark;\n  color: rgba(255, 255, 255, 0.87);\n  background-color: #242424;\n\n  font-synthesis: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-text-size-adjust: 100%;\n}\n\na {\n  font-weight: 500;\n  color: #646cff;\n  text-decoration: inherit;\n}\na:hover {\n  color: #535bf2;\n}\n\nbody {\n  margin: 0;\n  display: flex;\n  place-items: center;\n  min-width: 320px;\n  min-height: 100vh;\n}\n\nh1 {\n  font-size: 3.2em;\n  line-height: 1.1;\n}\n\n#app {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 2rem;\n  text-align: center;\n}\n\n.logo {\n  height: 6em;\n  padding: 1.5em;\n  will-change: filter;\n}\n.logo:hover {\n  filter: drop-shadow(0 0 2em #646cffaa);\n}\n.logo.vanilla:hover {\n  filter: drop-shadow(0 0 2em #f7df1eaa);\n}\n\n.card {\n  padding: 2em;\n}\n\n.read-the-docs {\n  color: #888;\n}\n\nbutton {\n  border-radius: 8px;\n  border: 1px solid transparent;\n  padding: 0.6em 1.2em;\n  font-size: 1em;\n  font-weight: 500;\n  font-family: inherit;\n  background-color: #1a1a1a;\n  cursor: pointer;\n  transition: border-color 0.25s;\n}\nbutton:hover {\n  border-color: #646cff;\n}\nbutton:focus,\nbutton:focus-visible {\n  outline: 4px auto -webkit-focus-ring-color;\n}\n\n@media (prefers-color-scheme: light) {\n  :root {\n    color: #213547;\n    background-color: #ffffff;\n  }\n  a:hover {\n    color: #747bff;\n  }\n  button {\n    background-color: #f9f9f9;\n  }\n}\n"
});

(function() {
  "use strict";
  const style = "";
  const javascriptLogo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1sb2dvcyIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iI0Y3REYxRSIgZD0iTTAgMGgyNTZ2MjU2SDBWMFoiPjwvcGF0aD48cGF0aCBkPSJtNjcuMzEyIDIxMy45MzJsMTkuNTktMTEuODU2YzMuNzggNi43MDEgNy4yMTggMTIuMzcxIDE1LjQ2NSAxMi4zNzFjNy45MDUgMCAxMi44OS0zLjA5MiAxMi44OS0xNS4xMnYtODEuNzk4aDI0LjA1N3Y4Mi4xMzhjMCAyNC45MTctMTQuNjA2IDM2LjI1OS0zNS45MTYgMzYuMjU5Yy0xOS4yNDUgMC0zMC40MTYtOS45NjctMzYuMDg3LTIxLjk5Nm04NS4wNy0yLjU3NmwxOS41ODgtMTEuMzQxYzUuMTU3IDguNDIxIDExLjg1OSAxNC42MDcgMjMuNzE1IDE0LjYwN2M5Ljk2OSAwIDE2LjMyNS00Ljk4NCAxNi4zMjUtMTEuODU4YzAtOC4yNDgtNi41My0xMS4xNy0xNy41MjgtMTUuOThsLTYuMDEzLTIuNThjLTE3LjM1Ny03LjM4Ny0yOC44Ny0xNi42NjctMjguODctMzYuMjU3YzAtMTguMDQ0IDEzLjc0Ny0zMS43OTIgMzUuMjI4LTMxLjc5MmMxNS4yOTQgMCAyNi4yOTIgNS4zMjggMzQuMTk2IDE5LjI0N2wtMTguNzMyIDEyLjAzYy00LjEyNS03LjM4OS04LjU5MS0xMC4zMS0xNS40NjUtMTAuMzFjLTcuMDQ2IDAtMTEuNTE0IDQuNDY4LTExLjUxNCAxMC4zMWMwIDcuMjE3IDQuNDY4IDEwLjE0IDE0Ljc3OCAxNC42MDhsNi4wMTQgMi41NzdjMjAuNDUgOC43NjUgMzEuOTYzIDE3LjcgMzEuOTYzIDM3LjgwNGMwIDIxLjY1NC0xNy4wMTIgMzMuNTEtMzkuODY3IDMzLjUxYy0yMi4zMzkgMC0zNi43NzQtMTAuNjU0LTQzLjgxOS0yNC41NzQiPjwvcGF0aD48L3N2Zz4=";
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
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;
  setupCounter(document.querySelector("#counter"));
})();
 
