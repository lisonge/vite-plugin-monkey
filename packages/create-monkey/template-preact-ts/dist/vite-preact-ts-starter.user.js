// ==UserScript==
// @name       vite-preact-ts-starter
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// @require    https://cdn.jsdelivr.net/npm/preact@10.25.3/dist/preact.min.js
// @grant      GM_addStyle
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const e=document.createElement("style");e.textContent=o,document.head.append(e)})(" #app{max-width:1280px;margin:0 auto;padding:2rem;text-align:center}.logo{height:6em;padding:1.5em}.logo:hover{filter:drop-shadow(0 0 2em #646cffaa)}.logo.preact:hover{filter:drop-shadow(0 0 2em #673ab8aa)}.card{padding:2em}.read-the-docs{color:#888}:root{font-family:Inter,Avenir,Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%}a{font-weight:500;color:#646cff;text-decoration:inherit}a:hover{color:#535bf2}body{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}h1{font-size:3.2em;line-height:1.1}button{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s}button:hover{border-color:#646cff}button:focus,button:focus-visible{outline:4px auto -webkit-focus-ring-color}@media (prefers-color-scheme: light){:root{color:#213547;background-color:#fff}a:hover{color:#747bff}button{background-color:#f9f9f9}} ");

(function (preact) {
  'use strict';

  var f$1 = 0;
  function u$1(e2, t2, n, o2, i2, u2) {
    t2 || (t2 = {});
    var a2, c2, p2 = t2;
    if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
    var l2 = { type: e2, props: p2, key: n, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f$1, __i: -1, __u: 0, __source: i2, __self: u2 };
    if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
    return preact.options.vnode && preact.options.vnode(l2), l2;
  }
  var t, r, u, i, o = 0, f = [], c = preact.options, e = c.__b, a = c.__r, v = c.diffed, l = c.__c, m = c.unmount, s = c.__;
  function d(n, t2) {
    c.__h && c.__h(r, n, o || t2), o = 0;
    var u2 = r.__H || (r.__H = { __: [], __h: [] });
    return n >= u2.__.length && u2.__.push({}), u2.__[n];
  }
  function h(n) {
    return o = 1, p(D, n);
  }
  function p(n, u2, i2) {
    var o2 = d(t++, 2);
    if (o2.t = n, !o2.__c && (o2.__ = [D(void 0, u2), function(n2) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n2);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r, !r.u)) {
      var f2 = function(n2, t2, r2) {
        if (!o2.__c.__H) return true;
        var u3 = o2.__c.__H.__.filter(function(n3) {
          return !!n3.__c;
        });
        if (u3.every(function(n3) {
          return !n3.__N;
        })) return !c2 || c2.call(this, n2, t2, r2);
        var i3 = o2.__c.props !== n2;
        return u3.forEach(function(n3) {
          if (n3.__N) {
            var t3 = n3.__[0];
            n3.__ = n3.__N, n3.__N = void 0, t3 !== n3.__[0] && (i3 = true);
          }
        }), c2 && c2.call(this, n2, t2, r2) || i3;
      };
      r.u = true;
      var c2 = r.shouldComponentUpdate, e2 = r.componentWillUpdate;
      r.componentWillUpdate = function(n2, t2, r2) {
        if (this.__e) {
          var u3 = c2;
          c2 = void 0, f2(n2, t2, r2), c2 = u3;
        }
        e2 && e2.call(this, n2, t2, r2);
      }, r.shouldComponentUpdate = f2;
    }
    return o2.__N || o2.__;
  }
  function j() {
    for (var n; n = f.shift(); ) if (n.__P && n.__H) try {
      n.__H.__h.forEach(z), n.__H.__h.forEach(B), n.__H.__h = [];
    } catch (t2) {
      n.__H.__h = [], c.__e(t2, n.__v);
    }
  }
  c.__b = function(n) {
    r = null, e && e(n);
  }, c.__ = function(n, t2) {
    n && t2.__k && t2.__k.__m && (n.__m = t2.__k.__m), s && s(n, t2);
  }, c.__r = function(n) {
    a && a(n), t = 0;
    var i2 = (r = n.__c).__H;
    i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.forEach(function(n2) {
      n2.__N && (n2.__ = n2.__N), n2.i = n2.__N = void 0;
    })) : (i2.__h.forEach(z), i2.__h.forEach(B), i2.__h = [], t = 0)), u = r;
  }, c.diffed = function(n) {
    v && v(n);
    var t2 = n.__c;
    t2 && t2.__H && (t2.__H.__h.length && (1 !== f.push(t2) && i === c.requestAnimationFrame || ((i = c.requestAnimationFrame) || w)(j)), t2.__H.__.forEach(function(n2) {
      n2.i && (n2.__H = n2.i), n2.i = void 0;
    })), u = r = null;
  }, c.__c = function(n, t2) {
    t2.some(function(n2) {
      try {
        n2.__h.forEach(z), n2.__h = n2.__h.filter(function(n3) {
          return !n3.__ || B(n3);
        });
      } catch (r2) {
        t2.some(function(n3) {
          n3.__h && (n3.__h = []);
        }), t2 = [], c.__e(r2, n2.__v);
      }
    }), l && l(n, t2);
  }, c.unmount = function(n) {
    m && m(n);
    var t2, r2 = n.__c;
    r2 && r2.__H && (r2.__H.__.forEach(function(n2) {
      try {
        z(n2);
      } catch (n3) {
        t2 = n3;
      }
    }), r2.__H = void 0, t2 && c.__e(t2, r2.__v));
  };
  var k = "function" == typeof requestAnimationFrame;
  function w(n) {
    var t2, r2 = function() {
      clearTimeout(u2), k && cancelAnimationFrame(t2), setTimeout(n);
    }, u2 = setTimeout(r2, 100);
    k && (t2 = requestAnimationFrame(r2));
  }
  function z(n) {
    var t2 = r, u2 = n.__c;
    "function" == typeof u2 && (n.__c = void 0, u2()), r = t2;
  }
  function B(n) {
    var t2 = r;
    n.__c = n.__(), r = t2;
  }
  function D(n, t2) {
    return "function" == typeof t2 ? t2(n) : t2;
  }
  const preactLogo = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='27.68'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20296'%3e%3cpath%20fill='%23673AB8'%20d='m128%200l128%2073.9v147.8l-128%2073.9L0%20221.7V73.9z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M34.865%20220.478c17.016%2021.78%2071.095%205.185%20122.15-34.704c51.055-39.888%2080.24-88.345%2063.224-110.126c-17.017-21.78-71.095-5.184-122.15%2034.704c-51.055%2039.89-80.24%2088.346-63.224%20110.126Zm7.27-5.68c-5.644-7.222-3.178-21.402%207.573-39.253c11.322-18.797%2030.541-39.548%2054.06-57.923c23.52-18.375%2048.303-32.004%2069.281-38.442c19.922-6.113%2034.277-5.075%2039.92%202.148c5.644%207.223%203.178%2021.403-7.573%2039.254c-11.322%2018.797-30.541%2039.547-54.06%2057.923c-23.52%2018.375-48.304%2032.004-69.281%2038.441c-19.922%206.114-34.277%205.076-39.92-2.147Z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M220.239%20220.478c17.017-21.78-12.169-70.237-63.224-110.126C105.96%2070.464%2051.88%2053.868%2034.865%2075.648c-17.017%2021.78%2012.169%2070.238%2063.224%20110.126c51.055%2039.889%20105.133%2056.485%20122.15%2034.704Zm-7.27-5.68c-5.643%207.224-19.998%208.262-39.92%202.148c-20.978-6.437-45.761-20.066-69.28-38.441c-23.52-18.376-42.74-39.126-54.06-57.923c-10.752-17.851-13.218-32.03-7.575-39.254c5.644-7.223%2019.999-8.261%2039.92-2.148c20.978%206.438%2045.762%2020.067%2069.281%2038.442c23.52%2018.375%2042.739%2039.126%2054.06%2057.923c10.752%2017.85%2013.218%2032.03%207.574%2039.254Z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M127.552%20167.667c10.827%200%2019.603-8.777%2019.603-19.604c0-10.826-8.776-19.603-19.603-19.603c-10.827%200-19.604%208.777-19.604%2019.603c0%2010.827%208.777%2019.604%2019.604%2019.604Z'%3e%3c/path%3e%3c/svg%3e";
  function App() {
    const [count, setCount] = h(0);
    return /* @__PURE__ */ u$1(preact.Fragment, { children: [
      /* @__PURE__ */ u$1("div", { children: [
        /* @__PURE__ */ u$1("a", { href: "https://vitejs.dev", target: "_blank", children: /* @__PURE__ */ u$1("img", { src: preactLogo, class: "logo", alt: "Vite logo" }) }),
        /* @__PURE__ */ u$1("a", { href: "https://preactjs.com", target: "_blank", children: /* @__PURE__ */ u$1("img", { src: preactLogo, class: "logo preact", alt: "Preact logo" }) })
      ] }),
      /* @__PURE__ */ u$1("h1", { children: "Vite + Preact" }),
      /* @__PURE__ */ u$1("div", { class: "card", children: [
        /* @__PURE__ */ u$1("button", { onClick: () => setCount((count2) => count2 + 1), children: [
          "count is ",
          count
        ] }),
        /* @__PURE__ */ u$1("p", { children: [
          "Edit ",
          /* @__PURE__ */ u$1("code", { children: "src/app.tsx" }),
          " and save to test HMR"
        ] })
      ] }),
      /* @__PURE__ */ u$1("p", { class: "read-the-docs", children: "Click on the Vite and Preact logos to learn more" })
    ] });
  }
  preact.render(
    /* @__PURE__ */ u$1(App, {}),
    (() => {
      const app = document.createElement("div");
      document.body.append(app);
      return app;
    })()
  );

})(preact);