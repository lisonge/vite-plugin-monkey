// ==UserScript==
// @name       vite-preact-starter
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// @require    https://cdn.jsdelivr.net/npm/preact@10.10.2/dist/preact.min.js
// ==/UserScript==

// use vite-plugin-monkey@2.1.1 at 2022-08-15T17:35:52.434Z

;(({ css = "" }) => {
  const style = document.createElement("style");
  style.innerText = css;
  style.dataset.source = "vite-plugin-monkey";
  document.head.appendChild(style);
})({
  "css": "#app {\r\n  max-width: 1280px;\r\n  margin: 0 auto;\r\n  padding: 2rem;\r\n  text-align: center;\r\n}\r\n\r\n.logo {\r\n  height: 6em;\r\n  padding: 1.5em;\r\n}\r\n.logo:hover {\r\n  filter: drop-shadow(0 0 2em #646cffaa);\r\n}\r\n.logo.preact:hover {\r\n  filter: drop-shadow(0 0 2em #673ab8aa);\r\n}\r\n\r\n.card {\r\n  padding: 2em;\r\n}\r\n\r\n.read-the-docs {\r\n  color: #888;\r\n}\r\n:root {\r\n  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;\r\n  font-size: 16px;\r\n  line-height: 24px;\r\n  font-weight: 400;\r\n\r\n  color-scheme: light dark;\r\n  color: rgba(255, 255, 255, 0.87);\r\n  background-color: #242424;\r\n\r\n  font-synthesis: none;\r\n  text-rendering: optimizeLegibility;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n  -webkit-text-size-adjust: 100%;\r\n}\r\n\r\na {\r\n  font-weight: 500;\r\n  color: #646cff;\r\n  text-decoration: inherit;\r\n}\r\na:hover {\r\n  color: #535bf2;\r\n}\r\n\r\nbody {\r\n  margin: 0;\r\n  display: flex;\r\n  place-items: center;\r\n  min-width: 320px;\r\n  min-height: 100vh;\r\n}\r\n\r\nh1 {\r\n  font-size: 3.2em;\r\n  line-height: 1.1;\r\n}\r\n\r\nbutton {\r\n  border-radius: 8px;\r\n  border: 1px solid transparent;\r\n  padding: 0.6em 1.2em;\r\n  font-size: 1em;\r\n  font-weight: 500;\r\n  font-family: inherit;\r\n  background-color: #1a1a1a;\r\n  cursor: pointer;\r\n  transition: border-color 0.25s;\r\n}\r\nbutton:hover {\r\n  border-color: #646cff;\r\n}\r\nbutton:focus,\r\nbutton:focus-visible {\r\n  outline: 4px auto -webkit-focus-ring-color;\r\n}\r\n\r\n@media (prefers-color-scheme: light) {\r\n  :root {\r\n    color: #213547;\r\n    background-color: #ffffff;\r\n  }\r\n  a:hover {\r\n    color: #747bff;\r\n  }\r\n  button {\r\n    background-color: #f9f9f9;\r\n  }\r\n}\r\n"
});

(function(preact2) {
  "use strict";
  var t, r, u, i, o$1 = 0, c = [], f = [], e$1 = preact2.options.__b, a = preact2.options.__r, v = preact2.options.diffed, l = preact2.options.__c, m = preact2.options.unmount;
  function d(t2, u2) {
    preact2.options.__h && preact2.options.__h(r, t2, o$1 || u2), o$1 = 0;
    var i2 = r.__H || (r.__H = { __: [], __h: [] });
    return t2 >= i2.__.length && i2.__.push({ __V: f }), i2.__[t2];
  }
  function p(n) {
    return o$1 = 1, y(z, n);
  }
  function y(n, u2, i2) {
    var o2 = d(t++, 2);
    if (o2.t = n, !o2.__c && (o2.__ = [i2 ? i2(u2) : z(void 0, u2), function(n2) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n2);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r, !o2.__c.u)) {
      o2.__c.__H.u = true;
      var c2 = o2.__c.shouldComponentUpdate;
      o2.__c.shouldComponentUpdate = function(n2, t2, r2) {
        if (!o2.__c.__H)
          return true;
        var u3 = o2.__c.__H.__.filter(function(n3) {
          return n3.__c;
        });
        return u3.every(function(n3) {
          return !n3.__N;
        }) ? !c2 || c2(n2, t2, r2) : !u3.every(function(n3) {
          if (!n3.__N)
            return true;
          var t3 = n3.__[0];
          return n3.__ = n3.__N, n3.__N = void 0, t3 === n3.__[0];
        }) && (!c2 || c2(n2, t2, r2));
      };
    }
    return o2.__N || o2.__;
  }
  function b() {
    for (var t2; t2 = c.shift(); )
      if (t2.__P && t2.__H)
        try {
          t2.__H.__h.forEach(j), t2.__H.__h.forEach(k), t2.__H.__h = [];
        } catch (r2) {
          t2.__H.__h = [], preact2.options.__e(r2, t2.__v);
        }
  }
  preact2.options.__b = function(n) {
    r = null, e$1 && e$1(n);
  }, preact2.options.__r = function(n) {
    a && a(n), t = 0;
    var i2 = (r = n.__c).__H;
    i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.forEach(function(n2) {
      n2.__N && (n2.__ = n2.__N), n2.__V = f, n2.__N = n2.i = void 0;
    })) : (i2.__h.forEach(j), i2.__h.forEach(k), i2.__h = [])), u = r;
  }, preact2.options.diffed = function(t2) {
    v && v(t2);
    var o2 = t2.__c;
    o2 && o2.__H && (o2.__H.__h.length && (1 !== c.push(o2) && i === preact2.options.requestAnimationFrame || ((i = preact2.options.requestAnimationFrame) || function(n) {
      var t3, r2 = function() {
        clearTimeout(u2), g && cancelAnimationFrame(t3), setTimeout(n);
      }, u2 = setTimeout(r2, 100);
      g && (t3 = requestAnimationFrame(r2));
    })(b)), o2.__H.__.forEach(function(n) {
      n.i && (n.__H = n.i), n.__V !== f && (n.__ = n.__V), n.i = void 0, n.__V = f;
    })), u = r = null;
  }, preact2.options.__c = function(t2, r2) {
    r2.some(function(t3) {
      try {
        t3.__h.forEach(j), t3.__h = t3.__h.filter(function(n) {
          return !n.__ || k(n);
        });
      } catch (u2) {
        r2.some(function(n) {
          n.__h && (n.__h = []);
        }), r2 = [], preact2.options.__e(u2, t3.__v);
      }
    }), l && l(t2, r2);
  }, preact2.options.unmount = function(t2) {
    m && m(t2);
    var r2, u2 = t2.__c;
    u2 && u2.__H && (u2.__H.__.forEach(function(n) {
      try {
        j(n);
      } catch (n2) {
        r2 = n2;
      }
    }), r2 && preact2.options.__e(r2, u2.__v));
  };
  var g = "function" == typeof requestAnimationFrame;
  function j(n) {
    var t2 = r, u2 = n.__c;
    "function" == typeof u2 && (n.__c = void 0, u2()), r = t2;
  }
  function k(n) {
    var t2 = r;
    n.__c = n.__(), r = t2;
  }
  function z(n, t2) {
    return "function" == typeof t2 ? t2(n) : t2;
  }
  const preactLogo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1sb2dvcyIgd2lkdGg9IjI3LjY4IiBoZWlnaHQ9IjMyIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgMjU2IDI5NiI+PHBhdGggZmlsbD0iIzY3M0FCOCIgZD0ibTEyOCAwbDEyOCA3My45djE0Ny44bC0xMjggNzMuOUwwIDIyMS43VjczLjl6Ij48L3BhdGg+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTM0Ljg2NSAyMjAuNDc4YzE3LjAxNiAyMS43OCA3MS4wOTUgNS4xODUgMTIyLjE1LTM0LjcwNGM1MS4wNTUtMzkuODg4IDgwLjI0LTg4LjM0NSA2My4yMjQtMTEwLjEyNmMtMTcuMDE3LTIxLjc4LTcxLjA5NS01LjE4NC0xMjIuMTUgMzQuNzA0Yy01MS4wNTUgMzkuODktODAuMjQgODguMzQ2LTYzLjIyNCAxMTAuMTI2Wm03LjI3LTUuNjhjLTUuNjQ0LTcuMjIyLTMuMTc4LTIxLjQwMiA3LjU3My0zOS4yNTNjMTEuMzIyLTE4Ljc5NyAzMC41NDEtMzkuNTQ4IDU0LjA2LTU3LjkyM2MyMy41Mi0xOC4zNzUgNDguMzAzLTMyLjAwNCA2OS4yODEtMzguNDQyYzE5LjkyMi02LjExMyAzNC4yNzctNS4wNzUgMzkuOTIgMi4xNDhjNS42NDQgNy4yMjMgMy4xNzggMjEuNDAzLTcuNTczIDM5LjI1NGMtMTEuMzIyIDE4Ljc5Ny0zMC41NDEgMzkuNTQ3LTU0LjA2IDU3LjkyM2MtMjMuNTIgMTguMzc1LTQ4LjMwNCAzMi4wMDQtNjkuMjgxIDM4LjQ0MWMtMTkuOTIyIDYuMTE0LTM0LjI3NyA1LjA3Ni0zOS45Mi0yLjE0N1oiPjwvcGF0aD48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMjIwLjIzOSAyMjAuNDc4YzE3LjAxNy0yMS43OC0xMi4xNjktNzAuMjM3LTYzLjIyNC0xMTAuMTI2QzEwNS45NiA3MC40NjQgNTEuODggNTMuODY4IDM0Ljg2NSA3NS42NDhjLTE3LjAxNyAyMS43OCAxMi4xNjkgNzAuMjM4IDYzLjIyNCAxMTAuMTI2YzUxLjA1NSAzOS44ODkgMTA1LjEzMyA1Ni40ODUgMTIyLjE1IDM0LjcwNFptLTcuMjctNS42OGMtNS42NDMgNy4yMjQtMTkuOTk4IDguMjYyLTM5LjkyIDIuMTQ4Yy0yMC45NzgtNi40MzctNDUuNzYxLTIwLjA2Ni02OS4yOC0zOC40NDFjLTIzLjUyLTE4LjM3Ni00Mi43NC0zOS4xMjYtNTQuMDYtNTcuOTIzYy0xMC43NTItMTcuODUxLTEzLjIxOC0zMi4wMy03LjU3NS0zOS4yNTRjNS42NDQtNy4yMjMgMTkuOTk5LTguMjYxIDM5LjkyLTIuMTQ4YzIwLjk3OCA2LjQzOCA0NS43NjIgMjAuMDY3IDY5LjI4MSAzOC40NDJjMjMuNTIgMTguMzc1IDQyLjczOSAzOS4xMjYgNTQuMDYgNTcuOTIzYzEwLjc1MiAxNy44NSAxMy4yMTggMzIuMDMgNy41NzQgMzkuMjU0WiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0xMjcuNTUyIDE2Ny42NjdjMTAuODI3IDAgMTkuNjAzLTguNzc3IDE5LjYwMy0xOS42MDRjMC0xMC44MjYtOC43NzYtMTkuNjAzLTE5LjYwMy0xOS42MDNjLTEwLjgyNyAwLTE5LjYwNCA4Ljc3Ny0xOS42MDQgMTkuNjAzYzAgMTAuODI3IDguNzc3IDE5LjYwNCAxOS42MDQgMTkuNjA0WiI+PC9wYXRoPjwvc3ZnPg==";
  const app = "";
  const viteLogo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1sb2dvcyIgd2lkdGg9IjMxLjg4IiBoZWlnaHQ9IjMyIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgMjU2IDI1NyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJJY29uaWZ5SWQxODEzMDg4ZmUxZmJjMDFmYjQ2NiIgeDE9Ii0uODI4JSIgeDI9IjU3LjYzNiUiIHkxPSI3LjY1MiUiIHkyPSI3OC40MTElIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNDFEMUZGIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQkQzNEZFIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE4MTMwODhmZTFmYmMwMWZiNDY3IiB4MT0iNDMuMzc2JSIgeDI9IjUwLjMxNiUiIHkxPSIyLjI0MiUiIHkyPSI4OS4wMyUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkVBODMiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjguMzMzJSIgc3RvcC1jb2xvcj0iI0ZGREQzNSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGQTgwMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGZpbGw9InVybCgjSWNvbmlmeUlkMTgxMzA4OGZlMWZiYzAxZmI0NjYpIiBkPSJNMjU1LjE1MyAzNy45MzhMMTM0Ljg5NyAyNTIuOTc2Yy0yLjQ4MyA0LjQ0LTguODYyIDQuNDY2LTExLjM4Mi4wNDhMLjg3NSAzNy45NThjLTIuNzQ2LTQuODE0IDEuMzcxLTEwLjY0NiA2LjgyNy05LjY3bDEyMC4zODUgMjEuNTE3YTYuNTM3IDYuNTM3IDAgMCAwIDIuMzIyLS4wMDRsMTE3Ljg2Ny0yMS40ODNjNS40MzgtLjk5MSA5LjU3NCA0Ljc5NiA2Ljg3NyA5LjYyWiI+PC9wYXRoPjxwYXRoIGZpbGw9InVybCgjSWNvbmlmeUlkMTgxMzA4OGZlMWZiYzAxZmI0NjcpIiBkPSJNMTg1LjQzMi4wNjNMOTYuNDQgMTcuNTAxYTMuMjY4IDMuMjY4IDAgMCAwLTIuNjM0IDMuMDE0bC01LjQ3NCA5Mi40NTZhMy4yNjggMy4yNjggMCAwIDAgMy45OTcgMy4zNzhsMjQuNzc3LTUuNzE4YzIuMzE4LS41MzUgNC40MTMgMS41MDcgMy45MzYgMy44MzhsLTcuMzYxIDM2LjA0N2MtLjQ5NSAyLjQyNiAxLjc4MiA0LjUgNC4xNTEgMy43OGwxNS4zMDQtNC42NDljMi4zNzItLjcyIDQuNjUyIDEuMzYgNC4xNSAzLjc4OGwtMTEuNjk4IDU2LjYyMWMtLjczMiAzLjU0MiAzLjk3OSA1LjQ3MyA1Ljk0MyAyLjQzN2wxLjMxMy0yLjAyOGw3Mi41MTYtMTQ0LjcyYzEuMjE1LTIuNDIzLS44OC01LjE4Ni0zLjU0LTQuNjcybC0yNS41MDUgNC45MjJjLTIuMzk2LjQ2Mi00LjQzNS0xLjc3LTMuNzU5LTQuMTE0bDE2LjY0Ni01Ny43MDVjLjY3Ny0yLjM1LTEuMzctNC41ODMtMy43NjktNC4xMTNaIj48L3BhdGg+PC9zdmc+";
  var o = 0;
  function e(_, e2, n, t2, f2) {
    var l2, s, u2 = {};
    for (s in e2)
      "ref" == s ? l2 = e2[s] : u2[s] = e2[s];
    var a2 = { type: _, props: u2, key: n, ref: l2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --o, __source: f2, __self: t2 };
    if ("function" == typeof _ && (l2 = _.defaultProps))
      for (s in l2)
        void 0 === u2[s] && (u2[s] = l2[s]);
    return preact2.options.vnode && preact2.options.vnode(a2), a2;
  }
  function App() {
    const [count, setCount] = p(0);
    return e(preact2.Fragment, {
      children: [e("div", {
        children: [e("a", {
          href: "https://vitejs.dev",
          target: "_blank",
          children: e("img", {
            src: viteLogo,
            class: "logo",
            alt: "Vite logo"
          })
        }), e("a", {
          href: "https://preactjs.com",
          target: "_blank",
          children: e("img", {
            src: preactLogo,
            class: "logo preact",
            alt: "Preact logo"
          })
        })]
      }), e("h1", {
        children: "Vite + Preact"
      }), e("div", {
        class: "card",
        children: [e("button", {
          onClick: () => setCount((count2) => count2 + 1),
          children: ["count is ", count]
        }), e("p", {
          children: ["Edit ", e("code", {
            children: "src/app.jsx"
          }), " and save to test HMR"]
        })]
      }), e("p", {
        class: "read-the-docs",
        children: "Click on the Vite and Preact logos to learn more"
      })]
    });
  }
  const index = "";
  preact2.render(e(App, {}), (() => {
    const app2 = document.createElement("div");
    document.body.append(app2);
    return app2;
  })());
})(preact);
 
