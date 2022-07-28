// ==UserScript==
// @name       vite-preact-ts-starter
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// @require    https://cdn.jsdelivr.net/npm/preact@10.10.0/dist/preact.min.js
// ==/UserScript==

// use vite-plugin-monkey@1.1.2 at 2022-07-20T09:14:08.841Z

;(({ cssText = "" }) => {
  const style = document.createElement("style");
  style.innerText = cssText;
  style.dataset.source = "vite-plugin-monkey";
  document.head.appendChild(style);
})({
  "cssText": "#app {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 2rem;\n  text-align: center;\n}\n\n.logo {\n  height: 6em;\n  padding: 1.5em;\n}\n.logo:hover {\n  filter: drop-shadow(0 0 2em #646cffaa);\n}\n.logo.preact:hover {\n  filter: drop-shadow(0 0 2em #673ab8aa);\n}\n\n.card {\n  padding: 2em;\n}\n\n.read-the-docs {\n  color: #888;\n}\n:root {\n  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;\n  font-size: 16px;\n  line-height: 24px;\n  font-weight: 400;\n\n  color-scheme: light dark;\n  color: rgba(255, 255, 255, 0.87);\n  background-color: #242424;\n\n  font-synthesis: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-text-size-adjust: 100%;\n}\n\na {\n  font-weight: 500;\n  color: #646cff;\n  text-decoration: inherit;\n}\na:hover {\n  color: #535bf2;\n}\n\nbody {\n  margin: 0;\n  display: flex;\n  place-items: center;\n  min-width: 320px;\n  min-height: 100vh;\n}\n\nh1 {\n  font-size: 3.2em;\n  line-height: 1.1;\n}\n\nbutton {\n  border-radius: 8px;\n  border: 1px solid transparent;\n  padding: 0.6em 1.2em;\n  font-size: 1em;\n  font-weight: 500;\n  font-family: inherit;\n  background-color: #1a1a1a;\n  cursor: pointer;\n  transition: border-color 0.25s;\n}\nbutton:hover {\n  border-color: #646cff;\n}\nbutton:focus,\nbutton:focus-visible {\n  outline: 4px auto -webkit-focus-ring-color;\n}\n\n@media (prefers-color-scheme: light) {\n  :root {\n    color: #213547;\n    background-color: #ffffff;\n  }\n  a:hover {\n    color: #747bff;\n  }\n  button {\n    background-color: #f9f9f9;\n  }\n}\n"
});

(function(preact2) {
  "use strict";
  var t, u, r, o$1, i = 0, c = [], f = [], e$1 = preact2.options.__b, a = preact2.options.__r, v = preact2.options.diffed, l = preact2.options.__c, m = preact2.options.unmount;
  function p(t2, r2) {
    preact2.options.__h && preact2.options.__h(u, t2, i || r2), i = 0;
    var o2 = u.__H || (u.__H = { __: [], __h: [] });
    return t2 >= o2.__.length && o2.__.push({ __V: f }), o2.__[t2];
  }
  function y(n) {
    return i = 1, d(z, n);
  }
  function d(n, r2, o2) {
    var i2 = p(t++, 2);
    return i2.t = n, i2.__c || (i2.__ = [o2 ? o2(r2) : z(void 0, r2), function(n2) {
      var t2 = i2.t(i2.__[0], n2);
      i2.__[0] !== t2 && (i2.__ = [t2, i2.__[1]], i2.__c.setState({}));
    }], i2.__c = u), i2.__;
  }
  function b() {
    for (var t2; t2 = c.shift(); )
      if (t2.__P)
        try {
          t2.__H.__h.forEach(j), t2.__H.__h.forEach(k), t2.__H.__h = [];
        } catch (u2) {
          t2.__H.__h = [], preact2.options.__e(u2, t2.__v);
        }
  }
  preact2.options.__b = function(n) {
    u = null, e$1 && e$1(n);
  }, preact2.options.__r = function(n) {
    a && a(n), t = 0;
    var o2 = (u = n.__c).__H;
    o2 && (r === u ? (o2.__h = [], u.__h = [], o2.__.forEach(function(n2) {
      n2.__V = f, n2.u = void 0;
    })) : (o2.__h.forEach(j), o2.__h.forEach(k), o2.__h = [])), r = u;
  }, preact2.options.diffed = function(t2) {
    v && v(t2);
    var i2 = t2.__c;
    i2 && i2.__H && (i2.__H.__h.length && (1 !== c.push(i2) && o$1 === preact2.options.requestAnimationFrame || ((o$1 = preact2.options.requestAnimationFrame) || function(n) {
      var t3, u2 = function() {
        clearTimeout(r2), g && cancelAnimationFrame(t3), setTimeout(n);
      }, r2 = setTimeout(u2, 100);
      g && (t3 = requestAnimationFrame(u2));
    })(b)), i2.__H.__.forEach(function(n) {
      n.u && (n.__H = n.u), n.__V !== f && (n.__ = n.__V), n.u = void 0, n.__V = f;
    })), r = u = null;
  }, preact2.options.__c = function(t2, u2) {
    u2.some(function(t3) {
      try {
        t3.__h.forEach(j), t3.__h = t3.__h.filter(function(n) {
          return !n.__ || k(n);
        });
      } catch (r2) {
        u2.some(function(n) {
          n.__h && (n.__h = []);
        }), u2 = [], preact2.options.__e(r2, t3.__v);
      }
    }), l && l(t2, u2);
  }, preact2.options.unmount = function(t2) {
    m && m(t2);
    var u2, r2 = t2.__c;
    r2 && r2.__H && (r2.__H.__.forEach(function(n) {
      try {
        j(n);
      } catch (n2) {
        u2 = n2;
      }
    }), u2 && preact2.options.__e(u2, r2.__v));
  };
  var g = "function" == typeof requestAnimationFrame;
  function j(n) {
    var t2 = u, r2 = n.__c;
    "function" == typeof r2 && (n.__c = void 0, r2()), u = t2;
  }
  function k(n) {
    var t2 = u;
    n.__c = n.__(), u = t2;
  }
  function z(n, t2) {
    return "function" == typeof t2 ? t2(n) : t2;
  }
  const preactLogo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1sb2dvcyIgd2lkdGg9IjI3LjY4IiBoZWlnaHQ9IjMyIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgMjU2IDI5NiI+PHBhdGggZmlsbD0iIzY3M0FCOCIgZD0ibTEyOCAwbDEyOCA3My45djE0Ny44bC0xMjggNzMuOUwwIDIyMS43VjczLjl6Ij48L3BhdGg+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTM0Ljg2NSAyMjAuNDc4YzE3LjAxNiAyMS43OCA3MS4wOTUgNS4xODUgMTIyLjE1LTM0LjcwNGM1MS4wNTUtMzkuODg4IDgwLjI0LTg4LjM0NSA2My4yMjQtMTEwLjEyNmMtMTcuMDE3LTIxLjc4LTcxLjA5NS01LjE4NC0xMjIuMTUgMzQuNzA0Yy01MS4wNTUgMzkuODktODAuMjQgODguMzQ2LTYzLjIyNCAxMTAuMTI2Wm03LjI3LTUuNjhjLTUuNjQ0LTcuMjIyLTMuMTc4LTIxLjQwMiA3LjU3My0zOS4yNTNjMTEuMzIyLTE4Ljc5NyAzMC41NDEtMzkuNTQ4IDU0LjA2LTU3LjkyM2MyMy41Mi0xOC4zNzUgNDguMzAzLTMyLjAwNCA2OS4yODEtMzguNDQyYzE5LjkyMi02LjExMyAzNC4yNzctNS4wNzUgMzkuOTIgMi4xNDhjNS42NDQgNy4yMjMgMy4xNzggMjEuNDAzLTcuNTczIDM5LjI1NGMtMTEuMzIyIDE4Ljc5Ny0zMC41NDEgMzkuNTQ3LTU0LjA2IDU3LjkyM2MtMjMuNTIgMTguMzc1LTQ4LjMwNCAzMi4wMDQtNjkuMjgxIDM4LjQ0MWMtMTkuOTIyIDYuMTE0LTM0LjI3NyA1LjA3Ni0zOS45Mi0yLjE0N1oiPjwvcGF0aD48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMjIwLjIzOSAyMjAuNDc4YzE3LjAxNy0yMS43OC0xMi4xNjktNzAuMjM3LTYzLjIyNC0xMTAuMTI2QzEwNS45NiA3MC40NjQgNTEuODggNTMuODY4IDM0Ljg2NSA3NS42NDhjLTE3LjAxNyAyMS43OCAxMi4xNjkgNzAuMjM4IDYzLjIyNCAxMTAuMTI2YzUxLjA1NSAzOS44ODkgMTA1LjEzMyA1Ni40ODUgMTIyLjE1IDM0LjcwNFptLTcuMjctNS42OGMtNS42NDMgNy4yMjQtMTkuOTk4IDguMjYyLTM5LjkyIDIuMTQ4Yy0yMC45NzgtNi40MzctNDUuNzYxLTIwLjA2Ni02OS4yOC0zOC40NDFjLTIzLjUyLTE4LjM3Ni00Mi43NC0zOS4xMjYtNTQuMDYtNTcuOTIzYy0xMC43NTItMTcuODUxLTEzLjIxOC0zMi4wMy03LjU3NS0zOS4yNTRjNS42NDQtNy4yMjMgMTkuOTk5LTguMjYxIDM5LjkyLTIuMTQ4YzIwLjk3OCA2LjQzOCA0NS43NjIgMjAuMDY3IDY5LjI4MSAzOC40NDJjMjMuNTIgMTguMzc1IDQyLjczOSAzOS4xMjYgNTQuMDYgNTcuOTIzYzEwLjc1MiAxNy44NSAxMy4yMTggMzIuMDMgNy41NzQgMzkuMjU0WiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0xMjcuNTUyIDE2Ny42NjdjMTAuODI3IDAgMTkuNjAzLTguNzc3IDE5LjYwMy0xOS42MDRjMC0xMC44MjYtOC43NzYtMTkuNjAzLTE5LjYwMy0xOS42MDNjLTEwLjgyNyAwLTE5LjYwNCA4Ljc3Ny0xOS42MDQgMTkuNjAzYzAgMTAuODI3IDguNzc3IDE5LjYwNCAxOS42MDQgMTkuNjA0WiI+PC9wYXRoPjwvc3ZnPg==";
  const app = "";
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
    const [count, setCount] = y(0);
    return e(preact2.Fragment, {
      children: [e("div", {
        children: [e("a", {
          href: "https://vitejs.dev",
          target: "_blank",
          children: e("img", {
            src: preactLogo,
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
            children: "src/app.tsx"
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
 
