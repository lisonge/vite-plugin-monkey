// ==UserScript==
// @name       vite-svelte-starter
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// ==/UserScript==

(o=>{const e=document.createElement("style");e.dataset.source="vite-plugin-monkey",e.textContent=o,document.head.append(e)})(" :root{font-family:Inter,Avenir,Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%}a{font-weight:500;color:#646cff;text-decoration:inherit}a:hover{color:#535bf2}body{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}h1{font-size:3.2em;line-height:1.1}.card{padding:2em}#app{max-width:1280px;margin:0 auto;padding:2rem;text-align:center}button{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s}button:hover{border-color:#646cff}button:focus,button:focus-visible{outline:4px auto -webkit-focus-ring-color}@media (prefers-color-scheme: light){:root{color:#213547;background-color:#fff}a:hover{color:#747bff}button{background-color:#f9f9f9}}.logo.svelte-c9fbf7{height:6em;padding:1.5em;will-change:filter}.logo.svelte-c9fbf7:hover{filter:drop-shadow(0 0 2em #646cffaa)}.logo.svelte.svelte-c9fbf7:hover{filter:drop-shadow(0 0 2em #ff3e00aa)}.read-the-docs.svelte-c9fbf7{color:#888} ");

(function () {
  'use strict';

  function noop() {
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
  }
  let src_url_equal_anchor;
  function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
      src_url_equal_anchor = document.createElement("a");
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  function append(target, node) {
    target.appendChild(node);
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_data(text2, data) {
    data = "" + data;
    if (text2.wholeText !== data)
      text2.data = data;
  }
  let current_component;
  function set_current_component(component) {
    current_component = component;
  }
  const dirty_components = [];
  const binding_callbacks = [];
  let render_callbacks = [];
  const flush_callbacks = [];
  const resolved_promise = /* @__PURE__ */ Promise.resolve();
  let update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  const seen_callbacks = /* @__PURE__ */ new Set();
  let flushidx = 0;
  function flush() {
    if (flushidx !== 0) {
      return;
    }
    const saved_component = current_component;
    do {
      try {
        while (flushidx < dirty_components.length) {
          const component = dirty_components[flushidx];
          flushidx++;
          set_current_component(component);
          update(component.$$);
        }
      } catch (e) {
        dirty_components.length = 0;
        flushidx = 0;
        throw e;
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
  }
  const outroing = /* @__PURE__ */ new Set();
  let outros;
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach2, callback) {
    if (block && block.o) {
      if (outroing.has(block))
        return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);
        if (callback) {
          if (detach2)
            block.d(1);
          callback();
        }
      });
      block.o(local);
    } else if (callback) {
      callback();
    }
  }
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor, customElement) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
      add_render_callback(() => {
        const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
        if (component.$$.on_destroy) {
          component.$$.on_destroy.push(...new_on_destroy);
        } else {
          run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
      });
    }
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      flush_render_callbacks($$.after_update);
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance2, create_fragment2, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: [],
      // state
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      // everything else
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor, options.customElement);
      flush();
    }
    set_current_component(parent_component);
  }
  class SvelteComponent {
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      if (!is_function(callback)) {
        return noop;
      }
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  }
  const svelteLogo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1sb2dvcyIgd2lkdGg9IjI2LjYiIGhlaWdodD0iMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIHZpZXdCb3g9IjAgMCAyNTYgMzA4Ij48cGF0aCBmaWxsPSIjRkYzRTAwIiBkPSJNMjM5LjY4MiA0MC43MDdDMjExLjExMy0uMTgyIDE1NC42OS0xMi4zMDEgMTEzLjg5NSAxMy42OUw0Mi4yNDcgNTkuMzU2YTgyLjE5OCA4Mi4xOTggMCAwIDAtMzcuMTM1IDU1LjA1NmE4Ni41NjYgODYuNTY2IDAgMCAwIDguNTM2IDU1LjU3NmE4Mi40MjUgODIuNDI1IDAgMCAwLTEyLjI5NiAzMC43MTlhODcuNTk2IDg3LjU5NiAwIDAgMCAxNC45NjQgNjYuMjQ0YzI4LjU3NCA0MC44OTMgODQuOTk3IDUzLjAwNyAxMjUuNzg3IDI3LjAxNmw3MS42NDgtNDUuNjY0YTgyLjE4MiA4Mi4xODIgMCAwIDAgMzcuMTM1LTU1LjA1N2E4Ni42MDEgODYuNjAxIDAgMCAwLTguNTMtNTUuNTc3YTgyLjQwOSA4Mi40MDkgMCAwIDAgMTIuMjktMzAuNzE4YTg3LjU3MyA4Ny41NzMgMCAwIDAtMTQuOTYzLTY2LjI0NCI+PC9wYXRoPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0xMDYuODg5IDI3MC44NDFjLTIzLjEwMiA2LjAwNy00Ny40OTctMy4wMzYtNjEuMTAzLTIyLjY0OGE1Mi42ODUgNTIuNjg1IDAgMCAxLTkuMDAzLTM5Ljg1YTQ5Ljk3OCA0OS45NzggMCAwIDEgMS43MTMtNi42OTNsMS4zNS00LjExNWwzLjY3MSAyLjY5N2E5Mi40NDcgOTIuNDQ3IDAgMCAwIDI4LjAzNiAxNC4wMDdsMi42NjMuODA4bC0uMjQ1IDIuNjU5YTE2LjA2NyAxNi4wNjcgMCAwIDAgMi44OSAxMC42NTZhMTcuMTQzIDE3LjE0MyAwIDAgMCAxOC4zOTcgNi44MjhhMTUuNzg2IDE1Ljc4NiAwIDAgMCA0LjQwMy0xLjkzNWw3MS42Ny00NS42NzJhMTQuOTIyIDE0LjkyMiAwIDAgMCA2LjczNC05Ljk3N2ExNS45MjMgMTUuOTIzIDAgMCAwLTIuNzEzLTEyLjAxMWExNy4xNTYgMTcuMTU2IDAgMCAwLTE4LjQwNC02LjgzMmExNS43OCAxNS43OCAwIDAgMC00LjM5NiAxLjkzM2wtMjcuMzUgMTcuNDM0YTUyLjI5OCA1Mi4yOTggMCAwIDEtMTQuNTUzIDYuMzkxYy0yMy4xMDEgNi4wMDctNDcuNDk3LTMuMDM2LTYxLjEwMS0yMi42NDlhNTIuNjgxIDUyLjY4MSAwIDAgMS05LjAwNC0zOS44NDlhNDkuNDI4IDQ5LjQyOCAwIDAgMSAyMi4zNC0zMy4xMTRsNzEuNjY0LTQ1LjY3N2E1Mi4yMTggNTIuMjE4IDAgMCAxIDE0LjU2My02LjM5OGMyMy4xMDEtNi4wMDcgNDcuNDk3IDMuMDM2IDYxLjEwMSAyMi42NDhhNTIuNjg1IDUyLjY4NSAwIDAgMSA5LjAwNCAzOS44NWE1MC41NTkgNTAuNTU5IDAgMCAxLTEuNzEzIDYuNjkybC0xLjM1IDQuMTE2bC0zLjY3LTIuNjkzYTkyLjM3MyA5Mi4zNzMgMCAwIDAtMjguMDM3LTE0LjAxM2wtMi42NjQtLjgwOWwuMjQ2LTIuNjU4YTE2LjA5OSAxNi4wOTkgMCAwIDAtMi44OS0xMC42NTZhMTcuMTQzIDE3LjE0MyAwIDAgMC0xOC4zOTgtNi44MjhhMTUuNzg2IDE1Ljc4NiAwIDAgMC00LjQwMiAxLjkzNWwtNzEuNjcgNDUuNjc0YTE0Ljg5OCAxNC44OTggMCAwIDAtNi43MyA5Ljk3NWExNS45IDE1LjkgMCAwIDAgMi43MDkgMTIuMDEyYTE3LjE1NiAxNy4xNTYgMCAwIDAgMTguNDA0IDYuODMyYTE1Ljg0MSAxNS44NDEgMCAwIDAgNC40MDItMS45MzVsMjcuMzQ1LTE3LjQyN2E1Mi4xNDcgNTIuMTQ3IDAgMCAxIDE0LjU1Mi02LjM5N2MyMy4xMDEtNi4wMDYgNDcuNDk3IDMuMDM3IDYxLjEwMiAyMi42NWE1Mi42ODEgNTIuNjgxIDAgMCAxIDkuMDAzIDM5Ljg0OGE0OS40NTMgNDkuNDUzIDAgMCAxLTIyLjM0IDMzLjEybC03MS42NjQgNDUuNjczYTUyLjIxOCA1Mi4yMTggMCAwIDEtMTQuNTYzIDYuMzk4Ij48L3BhdGg+PC9zdmc+";
  const viteLogo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1sb2dvcyIgd2lkdGg9IjMxLjg4IiBoZWlnaHQ9IjMyIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgMjU2IDI1NyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJJY29uaWZ5SWQxODEzMDg4ZmUxZmJjMDFmYjQ2NiIgeDE9Ii0uODI4JSIgeDI9IjU3LjYzNiUiIHkxPSI3LjY1MiUiIHkyPSI3OC40MTElIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNDFEMUZGIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQkQzNEZFIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE4MTMwODhmZTFmYmMwMWZiNDY3IiB4MT0iNDMuMzc2JSIgeDI9IjUwLjMxNiUiIHkxPSIyLjI0MiUiIHkyPSI4OS4wMyUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkVBODMiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjguMzMzJSIgc3RvcC1jb2xvcj0iI0ZGREQzNSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGQTgwMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGZpbGw9InVybCgjSWNvbmlmeUlkMTgxMzA4OGZlMWZiYzAxZmI0NjYpIiBkPSJNMjU1LjE1MyAzNy45MzhMMTM0Ljg5NyAyNTIuOTc2Yy0yLjQ4MyA0LjQ0LTguODYyIDQuNDY2LTExLjM4Mi4wNDhMLjg3NSAzNy45NThjLTIuNzQ2LTQuODE0IDEuMzcxLTEwLjY0NiA2LjgyNy05LjY3bDEyMC4zODUgMjEuNTE3YTYuNTM3IDYuNTM3IDAgMCAwIDIuMzIyLS4wMDRsMTE3Ljg2Ny0yMS40ODNjNS40MzgtLjk5MSA5LjU3NCA0Ljc5NiA2Ljg3NyA5LjYyWiI+PC9wYXRoPjxwYXRoIGZpbGw9InVybCgjSWNvbmlmeUlkMTgxMzA4OGZlMWZiYzAxZmI0NjcpIiBkPSJNMTg1LjQzMi4wNjNMOTYuNDQgMTcuNTAxYTMuMjY4IDMuMjY4IDAgMCAwLTIuNjM0IDMuMDE0bC01LjQ3NCA5Mi40NTZhMy4yNjggMy4yNjggMCAwIDAgMy45OTcgMy4zNzhsMjQuNzc3LTUuNzE4YzIuMzE4LS41MzUgNC40MTMgMS41MDcgMy45MzYgMy44MzhsLTcuMzYxIDM2LjA0N2MtLjQ5NSAyLjQyNiAxLjc4MiA0LjUgNC4xNTEgMy43OGwxNS4zMDQtNC42NDljMi4zNzItLjcyIDQuNjUyIDEuMzYgNC4xNSAzLjc4OGwtMTEuNjk4IDU2LjYyMWMtLjczMiAzLjU0MiAzLjk3OSA1LjQ3MyA1Ljk0MyAyLjQzN2wxLjMxMy0yLjAyOGw3Mi41MTYtMTQ0LjcyYzEuMjE1LTIuNDIzLS44OC01LjE4Ni0zLjU0LTQuNjcybC0yNS41MDUgNC45MjJjLTIuMzk2LjQ2Mi00LjQzNS0xLjc3LTMuNzU5LTQuMTE0bDE2LjY0Ni01Ny43MDVjLjY3Ny0yLjM1LTEuMzctNC41ODMtMy43NjktNC4xMTNaIj48L3BhdGg+PC9zdmc+";
  function create_fragment$1(ctx) {
    let button;
    let t0;
    let t1;
    let mounted;
    let dispose;
    return {
      c() {
        button = element("button");
        t0 = text("count is ");
        t1 = text(
          /*count*/
          ctx[0]
        );
      },
      m(target, anchor) {
        insert(target, button, anchor);
        append(button, t0);
        append(button, t1);
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*increment*/
            ctx[1]
          );
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & /*count*/
        1)
          set_data(
            t1,
            /*count*/
            ctx2[0]
          );
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(button);
        mounted = false;
        dispose();
      }
    };
  }
  function instance($$self, $$props, $$invalidate) {
    let count = 0;
    const increment = () => {
      $$invalidate(0, count += 1);
    };
    return [count, increment];
  }
  class Counter extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance, create_fragment$1, safe_not_equal, {});
    }
  }
  function create_fragment(ctx) {
    let main;
    let div0;
    let a0;
    let img0;
    let img0_src_value;
    let t0;
    let a1;
    let img1;
    let img1_src_value;
    let t1;
    let h1;
    let t3;
    let div1;
    let counter;
    let t4;
    let p0;
    let t8;
    let p1;
    let current;
    counter = new Counter({});
    return {
      c() {
        main = element("main");
        div0 = element("div");
        a0 = element("a");
        img0 = element("img");
        t0 = space();
        a1 = element("a");
        img1 = element("img");
        t1 = space();
        h1 = element("h1");
        h1.textContent = "Vite + Svelte";
        t3 = space();
        div1 = element("div");
        create_component(counter.$$.fragment);
        t4 = space();
        p0 = element("p");
        p0.innerHTML = `Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!`;
        t8 = space();
        p1 = element("p");
        p1.textContent = "Click on the Vite and Svelte logos to learn more";
        if (!src_url_equal(img0.src, img0_src_value = viteLogo))
          attr(img0, "src", img0_src_value);
        attr(img0, "class", "logo svelte-c9fbf7");
        attr(img0, "alt", "Vite Logo");
        attr(a0, "href", "https://vitejs.dev");
        attr(a0, "target", "_blank");
        attr(a0, "rel", "noreferrer");
        if (!src_url_equal(img1.src, img1_src_value = svelteLogo))
          attr(img1, "src", img1_src_value);
        attr(img1, "class", "logo svelte svelte-c9fbf7");
        attr(img1, "alt", "Svelte Logo");
        attr(a1, "href", "https://svelte.dev");
        attr(a1, "target", "_blank");
        attr(a1, "rel", "noreferrer");
        attr(div1, "class", "card");
        attr(p1, "class", "read-the-docs svelte-c9fbf7");
      },
      m(target, anchor) {
        insert(target, main, anchor);
        append(main, div0);
        append(div0, a0);
        append(a0, img0);
        append(div0, t0);
        append(div0, a1);
        append(a1, img1);
        append(main, t1);
        append(main, h1);
        append(main, t3);
        append(main, div1);
        mount_component(counter, div1, null);
        append(main, t4);
        append(main, p0);
        append(main, t8);
        append(main, p1);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(counter.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(counter.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(main);
        destroy_component(counter);
      }
    };
  }
  class App extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment, safe_not_equal, {});
    }
  }
  new App({
    target: (() => {
      const app2 = document.createElement("div");
      document.body.append(app2);
      return app2;
    })()
  });

})();
