// ==UserScript==
// @name       vite-svelte-starter
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// @grant      GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  const d=new Set;const importCSS = async e=>{d.has(e)||(d.add(e),(t=>{typeof GM_addStyle=="function"?GM_addStyle(t):document.head.appendChild(document.createElement("style")).append(t);})(e));};

  importCSS(" .logo.svelte-11cv5lq{height:6em;padding:1.5em;will-change:filter;transition:filter .3s}.logo.svelte-11cv5lq:hover{filter:drop-shadow(0 0 2em #646cffaa)}.logo.svelte.svelte-11cv5lq:hover{filter:drop-shadow(0 0 2em #ff3e00aa)}.read-the-docs.svelte-11cv5lq{color:#888} ");

  const DEV = false;
  var is_array = Array.isArray;
  var index_of = Array.prototype.indexOf;
  var array_from = Array.from;
  var define_property = Object.defineProperty;
  var get_descriptor = Object.getOwnPropertyDescriptor;
  var get_descriptors = Object.getOwnPropertyDescriptors;
  var object_prototype = Object.prototype;
  var array_prototype = Array.prototype;
  var get_prototype_of = Object.getPrototypeOf;
  var is_extensible = Object.isExtensible;
  function deferred() {
    var resolve;
    var reject;
    var promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }
  const DERIVED = 1 << 1;
  const EFFECT = 1 << 2;
  const RENDER_EFFECT = 1 << 3;
  const BLOCK_EFFECT = 1 << 4;
  const BRANCH_EFFECT = 1 << 5;
  const ROOT_EFFECT = 1 << 6;
  const BOUNDARY_EFFECT = 1 << 7;
  const UNOWNED = 1 << 8;
  const DISCONNECTED = 1 << 9;
  const CLEAN = 1 << 10;
  const DIRTY = 1 << 11;
  const MAYBE_DIRTY = 1 << 12;
  const INERT = 1 << 13;
  const DESTROYED = 1 << 14;
  const EFFECT_RAN = 1 << 15;
  const EFFECT_TRANSPARENT = 1 << 16;
  const INSPECT_EFFECT = 1 << 17;
  const HEAD_EFFECT = 1 << 18;
  const EFFECT_PRESERVED = 1 << 19;
  const USER_EFFECT = 1 << 20;
  const REACTION_IS_UPDATING = 1 << 21;
  const ASYNC = 1 << 22;
  const ERROR_VALUE = 1 << 23;
  const STATE_SYMBOL = Symbol("$state");
  const STALE_REACTION = new class StaleReactionError extends Error {
    name = "StaleReactionError";
    message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
  }();
  function await_outside_boundary() {
    {
      throw new Error(`https://svelte.dev/e/await_outside_boundary`);
    }
  }
  function async_derived_orphan() {
    {
      throw new Error(`https://svelte.dev/e/async_derived_orphan`);
    }
  }
  function effect_update_depth_exceeded() {
    {
      throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
    }
  }
  function state_descriptors_fixed() {
    {
      throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
    }
  }
  function state_prototype_fixed() {
    {
      throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
    }
  }
  function state_unsafe_mutation() {
    {
      throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
    }
  }
  const UNINITIALIZED = Symbol();
  const NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
  function equals(value) {
    return value === this.v;
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
  }
  function safe_equals(value) {
    return !safe_not_equal(value, this.v);
  }
  let legacy_mode_flag = false;
  let tracing_mode_flag = false;
  function enable_legacy_mode_flag() {
    legacy_mode_flag = true;
  }
  let component_context = null;
  function set_component_context(context) {
    component_context = context;
  }
  function push(props, runes = false, fn) {
    component_context = {
      p: component_context,
      c: null,
      e: null,
      s: props,
      x: null,
      l: legacy_mode_flag && !runes ? { s: null, u: null, $: [] } : null
    };
  }
  function pop(component) {
    var context = (
component_context
    );
    var effects = context.e;
    if (effects !== null) {
      context.e = null;
      for (var fn of effects) {
        create_user_effect(fn);
      }
    }
    component_context = context.p;
    return (
{}
    );
  }
  function is_runes() {
    return !legacy_mode_flag || component_context !== null && component_context.l === null;
  }
  const adjustments = new WeakMap();
  function handle_error(error) {
    var effect = active_effect;
    if (effect === null) {
      active_reaction.f |= ERROR_VALUE;
      return error;
    }
    if ((effect.f & EFFECT_RAN) === 0) {
      if ((effect.f & BOUNDARY_EFFECT) === 0) {
        if (!effect.parent && error instanceof Error) {
          apply_adjustments(error);
        }
        throw error;
      }
      effect.b.error(error);
    } else {
      invoke_error_boundary(error, effect);
    }
  }
  function invoke_error_boundary(error, effect) {
    while (effect !== null) {
      if ((effect.f & BOUNDARY_EFFECT) !== 0) {
        try {
          effect.b.error(error);
          return;
        } catch (e) {
          error = e;
        }
      }
      effect = effect.parent;
    }
    if (error instanceof Error) {
      apply_adjustments(error);
    }
    throw error;
  }
  function apply_adjustments(error) {
    const adjusted = adjustments.get(error);
    if (adjusted) {
      define_property(error, "message", {
        value: adjusted.message
      });
      define_property(error, "stack", {
        value: adjusted.stack
      });
    }
  }
  function get_pending_boundary() {
    var boundary = (
active_effect.b
    );
    while (boundary !== null && !boundary.has_pending_snippet()) {
      boundary = boundary.parent;
    }
    if (boundary === null) {
      await_outside_boundary();
    }
    return boundary;
  }
function derived(fn) {
    var flags = DERIVED | DIRTY;
    var parent_derived = active_reaction !== null && (active_reaction.f & DERIVED) !== 0 ? (
active_reaction
    ) : null;
    if (active_effect === null || parent_derived !== null && (parent_derived.f & UNOWNED) !== 0) {
      flags |= UNOWNED;
    } else {
      active_effect.f |= EFFECT_PRESERVED;
    }
    const signal = {
      ctx: component_context,
      deps: null,
      effects: null,
      equals,
      f: flags,
      fn,
      reactions: null,
      rv: 0,
      v: (
UNINITIALIZED
      ),
      wv: 0,
      parent: parent_derived ?? active_effect,
      ac: null
    };
    return signal;
  }
function async_derived(fn, location) {
    let parent = (
active_effect
    );
    if (parent === null) {
      async_derived_orphan();
    }
    var boundary = (
parent.b
    );
    var promise = (

void 0
    );
    var signal = source(
UNINITIALIZED
    );
    var prev = null;
    var should_suspend = !active_reaction;
    async_effect(() => {
      try {
        var p = fn();
      } catch (error) {
        p = Promise.reject(error);
      }
      var r = () => p;
      promise = prev?.then(r, r) ?? Promise.resolve(p);
      prev = promise;
      var batch = (
current_batch
      );
      var pending = boundary.pending;
      if (should_suspend) {
        boundary.update_pending_count(1);
        if (!pending) batch.increment();
      }
      const handler = (value, error = void 0) => {
        prev = null;
        if (!pending) batch.activate();
        if (error) {
          if (error !== STALE_REACTION) {
            signal.f |= ERROR_VALUE;
            internal_set(signal, error);
          }
        } else {
          if ((signal.f & ERROR_VALUE) !== 0) {
            signal.f ^= ERROR_VALUE;
          }
          internal_set(signal, value);
        }
        if (should_suspend) {
          boundary.update_pending_count(-1);
          if (!pending) batch.decrement();
        }
        unset_context();
      };
      promise.then(handler, (e) => handler(null, e || "unknown"));
      if (batch) {
        return () => {
          queueMicrotask(() => batch.neuter());
        };
      }
    });
    return new Promise((fulfil) => {
      function next(p) {
        function go() {
          if (p === promise) {
            fulfil(signal);
          } else {
            next(promise);
          }
        }
        p.then(go, go);
      }
      next(promise);
    });
  }
function derived_safe_equal(fn) {
    const signal = derived(fn);
    signal.equals = safe_equals;
    return signal;
  }
  function destroy_derived_effects(derived2) {
    var effects = derived2.effects;
    if (effects !== null) {
      derived2.effects = null;
      for (var i = 0; i < effects.length; i += 1) {
        destroy_effect(
effects[i]
        );
      }
    }
  }
  function get_derived_parent_effect(derived2) {
    var parent = derived2.parent;
    while (parent !== null) {
      if ((parent.f & DERIVED) === 0) {
        return (
parent
        );
      }
      parent = parent.parent;
    }
    return null;
  }
  function execute_derived(derived2) {
    var value;
    var prev_active_effect = active_effect;
    set_active_effect(get_derived_parent_effect(derived2));
    {
      try {
        destroy_derived_effects(derived2);
        value = update_reaction(derived2);
      } finally {
        set_active_effect(prev_active_effect);
      }
    }
    return value;
  }
  function update_derived(derived2) {
    var value = execute_derived(derived2);
    if (!derived2.equals(value)) {
      derived2.v = value;
      derived2.wv = increment_write_version();
    }
    if (is_destroying_effect) {
      return;
    }
    if (batch_deriveds !== null) {
      batch_deriveds.set(derived2, derived2.v);
    } else {
      var status = (skip_reaction || (derived2.f & UNOWNED) !== 0) && derived2.deps !== null ? MAYBE_DIRTY : CLEAN;
      set_signal_status(derived2, status);
    }
  }
  function flatten(sync, async, fn) {
    const d = is_runes() ? derived : derived_safe_equal;
    if (async.length === 0) {
      fn(sync.map(d));
      return;
    }
    var batch = current_batch;
    var parent = (
active_effect
    );
    var restore = capture();
    var boundary = get_pending_boundary();
    Promise.all(async.map((expression) => async_derived(expression))).then((result) => {
      batch?.activate();
      restore();
      try {
        fn([...sync.map(d), ...result]);
      } catch (error) {
        if ((parent.f & DESTROYED) === 0) {
          invoke_error_boundary(error, parent);
        }
      }
      batch?.deactivate();
      unset_context();
    }).catch((error) => {
      boundary.error(error);
    });
  }
  function capture() {
    var previous_effect = active_effect;
    var previous_reaction = active_reaction;
    var previous_component_context = component_context;
    return function restore() {
      set_active_effect(previous_effect);
      set_active_reaction(previous_reaction);
      set_component_context(previous_component_context);
    };
  }
  function unset_context() {
    set_active_effect(null);
    set_active_reaction(null);
    set_component_context(null);
  }
  const batches = new Set();
  let current_batch = null;
  let batch_deriveds = null;
  let effect_pending_updates = new Set();
  let tasks = [];
  function dequeue() {
    const task = (
tasks.shift()
    );
    if (tasks.length > 0) {
      queueMicrotask(dequeue);
    }
    task();
  }
  let queued_root_effects = [];
  let last_scheduled_effect = null;
  let is_flushing = false;
  class Batch {
current = new Map();
#previous = new Map();
#callbacks = new Set();
#pending = 0;
#deferred = null;
#neutered = false;
#async_effects = [];
#boundary_async_effects = [];
#render_effects = [];
#effects = [];
#block_effects = [];
#dirty_effects = [];
#maybe_dirty_effects = [];
skipped_effects = new Set();
process(root_effects) {
      queued_root_effects = [];
      var current_values = null;
      if (batches.size > 1) {
        current_values = new Map();
        batch_deriveds = new Map();
        for (const [source2, current] of this.current) {
          current_values.set(source2, { v: source2.v, wv: source2.wv });
          source2.v = current;
        }
        for (const batch of batches) {
          if (batch === this) continue;
          for (const [source2, previous] of batch.#previous) {
            if (!current_values.has(source2)) {
              current_values.set(source2, { v: source2.v, wv: source2.wv });
              source2.v = previous;
            }
          }
        }
      }
      for (const root2 of root_effects) {
        this.#traverse_effect_tree(root2);
      }
      if (this.#async_effects.length === 0 && this.#pending === 0) {
        this.#commit();
        var render_effects = this.#render_effects;
        var effects = this.#effects;
        this.#render_effects = [];
        this.#effects = [];
        this.#block_effects = [];
        current_batch = null;
        flush_queued_effects(render_effects);
        flush_queued_effects(effects);
        if (current_batch === null) {
          current_batch = this;
        } else {
          batches.delete(this);
        }
        this.#deferred?.resolve();
      } else {
        this.#defer_effects(this.#render_effects);
        this.#defer_effects(this.#effects);
        this.#defer_effects(this.#block_effects);
      }
      if (current_values) {
        for (const [source2, { v, wv }] of current_values) {
          if (source2.wv <= wv) {
            source2.v = v;
          }
        }
        batch_deriveds = null;
      }
      for (const effect of this.#async_effects) {
        update_effect(effect);
      }
      for (const effect of this.#boundary_async_effects) {
        update_effect(effect);
      }
      this.#async_effects = [];
      this.#boundary_async_effects = [];
    }
#traverse_effect_tree(root2) {
      root2.f ^= CLEAN;
      var effect = root2.first;
      while (effect !== null) {
        var flags = effect.f;
        var is_branch = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
        var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;
        var skip = is_skippable_branch || (flags & INERT) !== 0 || this.skipped_effects.has(effect);
        if (!skip && effect.fn !== null) {
          if (is_branch) {
            effect.f ^= CLEAN;
          } else if ((flags & EFFECT) !== 0) {
            this.#effects.push(effect);
          } else if ((flags & CLEAN) === 0) {
            if ((flags & ASYNC) !== 0) {
              var effects = effect.b?.pending ? this.#boundary_async_effects : this.#async_effects;
              effects.push(effect);
            } else if (is_dirty(effect)) {
              if ((effect.f & BLOCK_EFFECT) !== 0) this.#block_effects.push(effect);
              update_effect(effect);
            }
          }
          var child2 = effect.first;
          if (child2 !== null) {
            effect = child2;
            continue;
          }
        }
        var parent = effect.parent;
        effect = effect.next;
        while (effect === null && parent !== null) {
          effect = parent.next;
          parent = parent.parent;
        }
      }
    }
#defer_effects(effects) {
      for (const e of effects) {
        const target = (e.f & DIRTY) !== 0 ? this.#dirty_effects : this.#maybe_dirty_effects;
        target.push(e);
        set_signal_status(e, CLEAN);
      }
      effects.length = 0;
    }
capture(source2, value) {
      if (!this.#previous.has(source2)) {
        this.#previous.set(source2, value);
      }
      this.current.set(source2, source2.v);
    }
    activate() {
      current_batch = this;
    }
    deactivate() {
      current_batch = null;
      for (const update of effect_pending_updates) {
        effect_pending_updates.delete(update);
        update();
        if (current_batch !== null) {
          break;
        }
      }
    }
    neuter() {
      this.#neutered = true;
    }
    flush() {
      if (queued_root_effects.length > 0) {
        flush_effects();
      } else {
        this.#commit();
      }
      if (current_batch !== this) {
        return;
      }
      if (this.#pending === 0) {
        batches.delete(this);
      }
      this.deactivate();
    }
#commit() {
      if (!this.#neutered) {
        for (const fn of this.#callbacks) {
          fn();
        }
      }
      this.#callbacks.clear();
    }
    increment() {
      this.#pending += 1;
    }
    decrement() {
      this.#pending -= 1;
      if (this.#pending === 0) {
        for (const e of this.#dirty_effects) {
          set_signal_status(e, DIRTY);
          schedule_effect(e);
        }
        for (const e of this.#maybe_dirty_effects) {
          set_signal_status(e, MAYBE_DIRTY);
          schedule_effect(e);
        }
        this.#render_effects = [];
        this.#effects = [];
        this.flush();
      } else {
        this.deactivate();
      }
    }
add_callback(fn) {
      this.#callbacks.add(fn);
    }
    settled() {
      return (this.#deferred ??= deferred()).promise;
    }
    static ensure() {
      if (current_batch === null) {
        const batch = current_batch = new Batch();
        batches.add(current_batch);
        {
          Batch.enqueue(() => {
            if (current_batch !== batch) {
              return;
            }
            batch.flush();
          });
        }
      }
      return current_batch;
    }
static enqueue(task) {
      if (tasks.length === 0) {
        queueMicrotask(dequeue);
      }
      tasks.unshift(task);
    }
  }
  function flush_effects() {
    var was_updating_effect = is_updating_effect;
    is_flushing = true;
    try {
      var flush_count = 0;
      set_is_updating_effect(true);
      while (queued_root_effects.length > 0) {
        var batch = Batch.ensure();
        if (flush_count++ > 1e3) {
          var updates, entry;
          if (DEV) ;
          infinite_loop_guard();
        }
        batch.process(queued_root_effects);
        old_values.clear();
      }
    } finally {
      is_flushing = false;
      set_is_updating_effect(was_updating_effect);
      last_scheduled_effect = null;
    }
  }
  function infinite_loop_guard() {
    try {
      effect_update_depth_exceeded();
    } catch (error) {
      invoke_error_boundary(error, last_scheduled_effect);
    }
  }
  let eager_block_effects = null;
  function flush_queued_effects(effects) {
    var length = effects.length;
    if (length === 0) return;
    var i = 0;
    while (i < length) {
      var effect = effects[i++];
      if ((effect.f & (DESTROYED | INERT)) === 0 && is_dirty(effect)) {
        eager_block_effects = [];
        update_effect(effect);
        if (effect.deps === null && effect.first === null && effect.nodes_start === null) {
          if (effect.teardown === null && effect.ac === null) {
            unlink_effect(effect);
          } else {
            effect.fn = null;
          }
        }
        if (eager_block_effects.length > 0) {
          old_values.clear();
          for (const e of eager_block_effects) {
            update_effect(e);
          }
          eager_block_effects = [];
        }
      }
    }
    eager_block_effects = null;
  }
  function schedule_effect(signal) {
    var effect = last_scheduled_effect = signal;
    while (effect.parent !== null) {
      effect = effect.parent;
      var flags = effect.f;
      if (is_flushing && effect === active_effect && (flags & BLOCK_EFFECT) !== 0) {
        return;
      }
      if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
        if ((flags & CLEAN) === 0) return;
        effect.f ^= CLEAN;
      }
    }
    queued_root_effects.push(effect);
  }
  const old_values = new Map();
  function source(v, stack) {
    var signal = {
      f: 0,
v,
      reactions: null,
      equals,
      rv: 0,
      wv: 0
    };
    return signal;
  }
function state(v, stack) {
    const s = source(v);
    push_reaction_value(s);
    return s;
  }
  function set(source2, value, should_proxy = false) {
    if (active_reaction !== null &&

(!untracking || (active_reaction.f & INSPECT_EFFECT) !== 0) && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | INSPECT_EFFECT)) !== 0 && !current_sources?.includes(source2)) {
      state_unsafe_mutation();
    }
    let new_value = should_proxy ? proxy(value) : value;
    return internal_set(source2, new_value);
  }
  function internal_set(source2, value) {
    if (!source2.equals(value)) {
      var old_value = source2.v;
      if (is_destroying_effect) {
        old_values.set(source2, value);
      } else {
        old_values.set(source2, old_value);
      }
      source2.v = value;
      var batch = Batch.ensure();
      batch.capture(source2, old_value);
      if ((source2.f & DERIVED) !== 0) {
        if ((source2.f & DIRTY) !== 0) {
          execute_derived(
source2
          );
        }
        set_signal_status(source2, (source2.f & UNOWNED) === 0 ? CLEAN : MAYBE_DIRTY);
      }
      source2.wv = increment_write_version();
      mark_reactions(source2, DIRTY);
      if (is_runes() && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
        if (untracked_writes === null) {
          set_untracked_writes([source2]);
        } else {
          untracked_writes.push(source2);
        }
      }
    }
    return value;
  }
  function increment$1(source2) {
    set(source2, source2.v + 1);
  }
  function mark_reactions(signal, status) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    var runes = is_runes();
    var length = reactions.length;
    for (var i = 0; i < length; i++) {
      var reaction = reactions[i];
      var flags = reaction.f;
      if (!runes && reaction === active_effect) continue;
      var not_dirty = (flags & DIRTY) === 0;
      if (not_dirty) {
        set_signal_status(reaction, status);
      }
      if ((flags & DERIVED) !== 0) {
        mark_reactions(
reaction,
          MAYBE_DIRTY
        );
      } else if (not_dirty) {
        if ((flags & BLOCK_EFFECT) !== 0) {
          if (eager_block_effects !== null) {
            eager_block_effects.push(
reaction
            );
          }
        }
        schedule_effect(
reaction
        );
      }
    }
  }
  function proxy(value) {
    if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
      return value;
    }
    const prototype = get_prototype_of(value);
    if (prototype !== object_prototype && prototype !== array_prototype) {
      return value;
    }
    var sources = new Map();
    var is_proxied_array = is_array(value);
    var version = state(0);
    var parent_version = update_version;
    var with_parent = (fn) => {
      if (update_version === parent_version) {
        return fn();
      }
      var reaction = active_reaction;
      var version2 = update_version;
      set_active_reaction(null);
      set_update_version(parent_version);
      var result = fn();
      set_active_reaction(reaction);
      set_update_version(version2);
      return result;
    };
    if (is_proxied_array) {
      sources.set("length", state(
value.length
      ));
    }
    return new Proxy(
value,
      {
        defineProperty(_, prop, descriptor) {
          if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
            state_descriptors_fixed();
          }
          var s = sources.get(prop);
          if (s === void 0) {
            s = with_parent(() => {
              var s2 = state(descriptor.value);
              sources.set(prop, s2);
              return s2;
            });
          } else {
            set(s, descriptor.value, true);
          }
          return true;
        },
        deleteProperty(target, prop) {
          var s = sources.get(prop);
          if (s === void 0) {
            if (prop in target) {
              const s2 = with_parent(() => state(UNINITIALIZED));
              sources.set(prop, s2);
              increment$1(version);
            }
          } else {
            set(s, UNINITIALIZED);
            increment$1(version);
          }
          return true;
        },
        get(target, prop, receiver) {
          if (prop === STATE_SYMBOL) {
            return value;
          }
          var s = sources.get(prop);
          var exists = prop in target;
          if (s === void 0 && (!exists || get_descriptor(target, prop)?.writable)) {
            s = with_parent(() => {
              var p = proxy(exists ? target[prop] : UNINITIALIZED);
              var s2 = state(p);
              return s2;
            });
            sources.set(prop, s);
          }
          if (s !== void 0) {
            var v = get(s);
            return v === UNINITIALIZED ? void 0 : v;
          }
          return Reflect.get(target, prop, receiver);
        },
        getOwnPropertyDescriptor(target, prop) {
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
          if (descriptor && "value" in descriptor) {
            var s = sources.get(prop);
            if (s) descriptor.value = get(s);
          } else if (descriptor === void 0) {
            var source2 = sources.get(prop);
            var value2 = source2?.v;
            if (source2 !== void 0 && value2 !== UNINITIALIZED) {
              return {
                enumerable: true,
                configurable: true,
                value: value2,
                writable: true
              };
            }
          }
          return descriptor;
        },
        has(target, prop) {
          if (prop === STATE_SYMBOL) {
            return true;
          }
          var s = sources.get(prop);
          var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop);
          if (s !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop)?.writable)) {
            if (s === void 0) {
              s = with_parent(() => {
                var p = has ? proxy(target[prop]) : UNINITIALIZED;
                var s2 = state(p);
                return s2;
              });
              sources.set(prop, s);
            }
            var value2 = get(s);
            if (value2 === UNINITIALIZED) {
              return false;
            }
          }
          return has;
        },
        set(target, prop, value2, receiver) {
          var s = sources.get(prop);
          var has = prop in target;
          if (is_proxied_array && prop === "length") {
            for (var i = value2; i <
s.v; i += 1) {
              var other_s = sources.get(i + "");
              if (other_s !== void 0) {
                set(other_s, UNINITIALIZED);
              } else if (i in target) {
                other_s = with_parent(() => state(UNINITIALIZED));
                sources.set(i + "", other_s);
              }
            }
          }
          if (s === void 0) {
            if (!has || get_descriptor(target, prop)?.writable) {
              s = with_parent(() => state(void 0));
              set(s, proxy(value2));
              sources.set(prop, s);
            }
          } else {
            has = s.v !== UNINITIALIZED;
            var p = with_parent(() => proxy(value2));
            set(s, p);
          }
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
          if (descriptor?.set) {
            descriptor.set.call(receiver, value2);
          }
          if (!has) {
            if (is_proxied_array && typeof prop === "string") {
              var ls = (
sources.get("length")
              );
              var n = Number(prop);
              if (Number.isInteger(n) && n >= ls.v) {
                set(ls, n + 1);
              }
            }
            increment$1(version);
          }
          return true;
        },
        ownKeys(target) {
          get(version);
          var own_keys = Reflect.ownKeys(target).filter((key2) => {
            var source3 = sources.get(key2);
            return source3 === void 0 || source3.v !== UNINITIALIZED;
          });
          for (var [key, source2] of sources) {
            if (source2.v !== UNINITIALIZED && !(key in target)) {
              own_keys.push(key);
            }
          }
          return own_keys;
        },
        setPrototypeOf() {
          state_prototype_fixed();
        }
      }
    );
  }
  var $window;
  var is_firefox;
  var first_child_getter;
  var next_sibling_getter;
  function init_operations() {
    if ($window !== void 0) {
      return;
    }
    $window = window;
    is_firefox = /Firefox/.test(navigator.userAgent);
    var element_prototype = Element.prototype;
    var node_prototype = Node.prototype;
    var text_prototype = Text.prototype;
    first_child_getter = get_descriptor(node_prototype, "firstChild").get;
    next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
    if (is_extensible(element_prototype)) {
      element_prototype.__click = void 0;
      element_prototype.__className = void 0;
      element_prototype.__attributes = null;
      element_prototype.__style = void 0;
      element_prototype.__e = void 0;
    }
    if (is_extensible(text_prototype)) {
      text_prototype.__t = void 0;
    }
  }
  function create_text(value = "") {
    return document.createTextNode(value);
  }
function get_first_child(node) {
    return first_child_getter.call(node);
  }
function get_next_sibling(node) {
    return next_sibling_getter.call(node);
  }
  function child(node, is_text) {
    {
      return get_first_child(node);
    }
  }
  function sibling(node, count = 1, is_text = false) {
    let next_sibling = node;
    while (count--) {
      next_sibling =

get_next_sibling(next_sibling);
    }
    {
      return next_sibling;
    }
  }
  function without_reactive_context(fn) {
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      return fn();
    } finally {
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  function push_effect(effect, parent_effect) {
    var parent_last = parent_effect.last;
    if (parent_last === null) {
      parent_effect.last = parent_effect.first = effect;
    } else {
      parent_last.next = effect;
      effect.prev = parent_last;
      parent_effect.last = effect;
    }
  }
  function create_effect(type, fn, sync, push2 = true) {
    var parent = active_effect;
    if (parent !== null && (parent.f & INERT) !== 0) {
      type |= INERT;
    }
    var effect = {
      ctx: component_context,
      deps: null,
      nodes_start: null,
      nodes_end: null,
      f: type | DIRTY,
      first: null,
      fn,
      last: null,
      next: null,
      parent,
      b: parent && parent.b,
      prev: null,
      teardown: null,
      transitions: null,
      wv: 0,
      ac: null
    };
    if (sync) {
      try {
        update_effect(effect);
        effect.f |= EFFECT_RAN;
      } catch (e) {
        destroy_effect(effect);
        throw e;
      }
    } else if (fn !== null) {
      schedule_effect(effect);
    }
    var inert = sync && effect.deps === null && effect.first === null && effect.nodes_start === null && effect.teardown === null && (effect.f & EFFECT_PRESERVED) === 0;
    if (!inert && push2) {
      if (parent !== null) {
        push_effect(effect, parent);
      }
      if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0 && (type & ROOT_EFFECT) === 0) {
        var derived2 = (
active_reaction
        );
        (derived2.effects ??= []).push(effect);
      }
    }
    return effect;
  }
  function create_user_effect(fn) {
    return create_effect(EFFECT | USER_EFFECT, fn, false);
  }
  function component_root(fn) {
    Batch.ensure();
    const effect = create_effect(ROOT_EFFECT, fn, true);
    return (options = {}) => {
      return new Promise((fulfil) => {
        if (options.outro) {
          pause_effect(effect, () => {
            destroy_effect(effect);
            fulfil(void 0);
          });
        } else {
          destroy_effect(effect);
          fulfil(void 0);
        }
      });
    };
  }
  function async_effect(fn) {
    return create_effect(ASYNC | EFFECT_PRESERVED, fn, true);
  }
  function template_effect(fn, sync = [], async = []) {
    flatten(sync, async, (values) => {
      create_effect(RENDER_EFFECT, () => fn(...values.map(get)), true);
    });
  }
  function branch(fn, push2 = true) {
    return create_effect(BRANCH_EFFECT, fn, true, push2);
  }
  function execute_effect_teardown(effect) {
    var teardown = effect.teardown;
    if (teardown !== null) {
      const previously_destroying_effect = is_destroying_effect;
      const previous_reaction = active_reaction;
      set_is_destroying_effect(true);
      set_active_reaction(null);
      try {
        teardown.call(null);
      } finally {
        set_is_destroying_effect(previously_destroying_effect);
        set_active_reaction(previous_reaction);
      }
    }
  }
  function destroy_effect_children(signal, remove_dom = false) {
    var effect = signal.first;
    signal.first = signal.last = null;
    while (effect !== null) {
      const controller = effect.ac;
      if (controller !== null) {
        without_reactive_context(() => {
          controller.abort(STALE_REACTION);
        });
      }
      var next = effect.next;
      if ((effect.f & ROOT_EFFECT) !== 0) {
        effect.parent = null;
      } else {
        destroy_effect(effect, remove_dom);
      }
      effect = next;
    }
  }
  function destroy_block_effect_children(signal) {
    var effect = signal.first;
    while (effect !== null) {
      var next = effect.next;
      if ((effect.f & BRANCH_EFFECT) === 0) {
        destroy_effect(effect);
      }
      effect = next;
    }
  }
  function destroy_effect(effect, remove_dom = true) {
    var removed = false;
    if ((remove_dom || (effect.f & HEAD_EFFECT) !== 0) && effect.nodes_start !== null && effect.nodes_end !== null) {
      remove_effect_dom(
        effect.nodes_start,
effect.nodes_end
      );
      removed = true;
    }
    destroy_effect_children(effect, remove_dom && !removed);
    remove_reactions(effect, 0);
    set_signal_status(effect, DESTROYED);
    var transitions = effect.transitions;
    if (transitions !== null) {
      for (const transition of transitions) {
        transition.stop();
      }
    }
    execute_effect_teardown(effect);
    var parent = effect.parent;
    if (parent !== null && parent.first !== null) {
      unlink_effect(effect);
    }
    effect.next = effect.prev = effect.teardown = effect.ctx = effect.deps = effect.fn = effect.nodes_start = effect.nodes_end = effect.ac = null;
  }
  function remove_effect_dom(node, end) {
    while (node !== null) {
      var next = node === end ? null : (

get_next_sibling(node)
      );
      node.remove();
      node = next;
    }
  }
  function unlink_effect(effect) {
    var parent = effect.parent;
    var prev = effect.prev;
    var next = effect.next;
    if (prev !== null) prev.next = next;
    if (next !== null) next.prev = prev;
    if (parent !== null) {
      if (parent.first === effect) parent.first = next;
      if (parent.last === effect) parent.last = prev;
    }
  }
  function pause_effect(effect, callback) {
    var transitions = [];
    pause_children(effect, transitions, true);
    run_out_transitions(transitions, () => {
      destroy_effect(effect);
      if (callback) callback();
    });
  }
  function run_out_transitions(transitions, fn) {
    var remaining = transitions.length;
    if (remaining > 0) {
      var check = () => --remaining || fn();
      for (var transition of transitions) {
        transition.out(check);
      }
    } else {
      fn();
    }
  }
  function pause_children(effect, transitions, local) {
    if ((effect.f & INERT) !== 0) return;
    effect.f ^= INERT;
    if (effect.transitions !== null) {
      for (const transition of effect.transitions) {
        if (transition.is_global || local) {
          transitions.push(transition);
        }
      }
    }
    var child2 = effect.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      pause_children(child2, transitions, transparent ? local : false);
      child2 = sibling2;
    }
  }
  let is_updating_effect = false;
  function set_is_updating_effect(value) {
    is_updating_effect = value;
  }
  let is_destroying_effect = false;
  function set_is_destroying_effect(value) {
    is_destroying_effect = value;
  }
  let active_reaction = null;
  let untracking = false;
  function set_active_reaction(reaction) {
    active_reaction = reaction;
  }
  let active_effect = null;
  function set_active_effect(effect) {
    active_effect = effect;
  }
  let current_sources = null;
  function push_reaction_value(value) {
    if (active_reaction !== null && true) {
      if (current_sources === null) {
        current_sources = [value];
      } else {
        current_sources.push(value);
      }
    }
  }
  let new_deps = null;
  let skipped_deps = 0;
  let untracked_writes = null;
  function set_untracked_writes(value) {
    untracked_writes = value;
  }
  let write_version = 1;
  let read_version = 0;
  let update_version = read_version;
  function set_update_version(value) {
    update_version = value;
  }
  let skip_reaction = false;
  function increment_write_version() {
    return ++write_version;
  }
  function is_dirty(reaction) {
    var flags = reaction.f;
    if ((flags & DIRTY) !== 0) {
      return true;
    }
    if ((flags & MAYBE_DIRTY) !== 0) {
      var dependencies = reaction.deps;
      var is_unowned = (flags & UNOWNED) !== 0;
      if (dependencies !== null) {
        var i;
        var dependency;
        var is_disconnected = (flags & DISCONNECTED) !== 0;
        var is_unowned_connected = is_unowned && active_effect !== null && !skip_reaction;
        var length = dependencies.length;
        if ((is_disconnected || is_unowned_connected) && (active_effect === null || (active_effect.f & DESTROYED) === 0)) {
          var derived2 = (
reaction
          );
          var parent = derived2.parent;
          for (i = 0; i < length; i++) {
            dependency = dependencies[i];
            if (is_disconnected || !dependency?.reactions?.includes(derived2)) {
              (dependency.reactions ??= []).push(derived2);
            }
          }
          if (is_disconnected) {
            derived2.f ^= DISCONNECTED;
          }
          if (is_unowned_connected && parent !== null && (parent.f & UNOWNED) === 0) {
            derived2.f ^= UNOWNED;
          }
        }
        for (i = 0; i < length; i++) {
          dependency = dependencies[i];
          if (is_dirty(
dependency
          )) {
            update_derived(
dependency
            );
          }
          if (dependency.wv > reaction.wv) {
            return true;
          }
        }
      }
      if (!is_unowned || active_effect !== null && !skip_reaction) {
        set_signal_status(reaction, CLEAN);
      }
    }
    return false;
  }
  function schedule_possible_effect_self_invalidation(signal, effect, root2 = true) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    if (current_sources?.includes(signal)) {
      return;
    }
    for (var i = 0; i < reactions.length; i++) {
      var reaction = reactions[i];
      if ((reaction.f & DERIVED) !== 0) {
        schedule_possible_effect_self_invalidation(
reaction,
          effect,
          false
        );
      } else if (effect === reaction) {
        if (root2) {
          set_signal_status(reaction, DIRTY);
        } else if ((reaction.f & CLEAN) !== 0) {
          set_signal_status(reaction, MAYBE_DIRTY);
        }
        schedule_effect(
reaction
        );
      }
    }
  }
  function update_reaction(reaction) {
    var previous_deps = new_deps;
    var previous_skipped_deps = skipped_deps;
    var previous_untracked_writes = untracked_writes;
    var previous_reaction = active_reaction;
    var previous_skip_reaction = skip_reaction;
    var previous_sources = current_sources;
    var previous_component_context = component_context;
    var previous_untracking = untracking;
    var previous_update_version = update_version;
    var flags = reaction.f;
    new_deps =
null;
    skipped_deps = 0;
    untracked_writes = null;
    skip_reaction = (flags & UNOWNED) !== 0 && (untracking || !is_updating_effect || active_reaction === null);
    active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
    current_sources = null;
    set_component_context(reaction.ctx);
    untracking = false;
    update_version = ++read_version;
    if (reaction.ac !== null) {
      without_reactive_context(() => {
        reaction.ac.abort(STALE_REACTION);
      });
      reaction.ac = null;
    }
    try {
      reaction.f |= REACTION_IS_UPDATING;
      var fn = (
reaction.fn
      );
      var result = fn();
      var deps = reaction.deps;
      if (new_deps !== null) {
        var i;
        remove_reactions(reaction, skipped_deps);
        if (deps !== null && skipped_deps > 0) {
          deps.length = skipped_deps + new_deps.length;
          for (i = 0; i < new_deps.length; i++) {
            deps[skipped_deps + i] = new_deps[i];
          }
        } else {
          reaction.deps = deps = new_deps;
        }
        if (!skip_reaction ||
(flags & DERIVED) !== 0 &&
reaction.reactions !== null) {
          for (i = skipped_deps; i < deps.length; i++) {
            (deps[i].reactions ??= []).push(reaction);
          }
        }
      } else if (deps !== null && skipped_deps < deps.length) {
        remove_reactions(reaction, skipped_deps);
        deps.length = skipped_deps;
      }
      if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
        for (i = 0; i <
untracked_writes.length; i++) {
          schedule_possible_effect_self_invalidation(
            untracked_writes[i],
reaction
          );
        }
      }
      if (previous_reaction !== null && previous_reaction !== reaction) {
        read_version++;
        if (untracked_writes !== null) {
          if (previous_untracked_writes === null) {
            previous_untracked_writes = untracked_writes;
          } else {
            previous_untracked_writes.push(...
untracked_writes);
          }
        }
      }
      if ((reaction.f & ERROR_VALUE) !== 0) {
        reaction.f ^= ERROR_VALUE;
      }
      return result;
    } catch (error) {
      return handle_error(error);
    } finally {
      reaction.f ^= REACTION_IS_UPDATING;
      new_deps = previous_deps;
      skipped_deps = previous_skipped_deps;
      untracked_writes = previous_untracked_writes;
      active_reaction = previous_reaction;
      skip_reaction = previous_skip_reaction;
      current_sources = previous_sources;
      set_component_context(previous_component_context);
      untracking = previous_untracking;
      update_version = previous_update_version;
    }
  }
  function remove_reaction(signal, dependency) {
    let reactions = dependency.reactions;
    if (reactions !== null) {
      var index = index_of.call(reactions, signal);
      if (index !== -1) {
        var new_length = reactions.length - 1;
        if (new_length === 0) {
          reactions = dependency.reactions = null;
        } else {
          reactions[index] = reactions[new_length];
          reactions.pop();
        }
      }
    }
    if (reactions === null && (dependency.f & DERIVED) !== 0 &&


(new_deps === null || !new_deps.includes(dependency))) {
      set_signal_status(dependency, MAYBE_DIRTY);
      if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
        dependency.f ^= DISCONNECTED;
      }
      destroy_derived_effects(
dependency
      );
      remove_reactions(
dependency,
        0
      );
    }
  }
  function remove_reactions(signal, start_index) {
    var dependencies = signal.deps;
    if (dependencies === null) return;
    for (var i = start_index; i < dependencies.length; i++) {
      remove_reaction(signal, dependencies[i]);
    }
  }
  function update_effect(effect) {
    var flags = effect.f;
    if ((flags & DESTROYED) !== 0) {
      return;
    }
    set_signal_status(effect, CLEAN);
    var previous_effect = active_effect;
    var was_updating_effect = is_updating_effect;
    active_effect = effect;
    is_updating_effect = true;
    try {
      if ((flags & BLOCK_EFFECT) !== 0) {
        destroy_block_effect_children(effect);
      } else {
        destroy_effect_children(effect);
      }
      execute_effect_teardown(effect);
      var teardown = update_reaction(effect);
      effect.teardown = typeof teardown === "function" ? teardown : null;
      effect.wv = write_version;
      var dep;
      if (DEV && tracing_mode_flag && (effect.f & DIRTY) !== 0 && effect.deps !== null) ;
    } finally {
      is_updating_effect = was_updating_effect;
      active_effect = previous_effect;
    }
  }
  function get(signal) {
    var flags = signal.f;
    var is_derived = (flags & DERIVED) !== 0;
    if (active_reaction !== null && !untracking) {
      var destroyed = active_effect !== null && (active_effect.f & DESTROYED) !== 0;
      if (!destroyed && !current_sources?.includes(signal)) {
        var deps = active_reaction.deps;
        if ((active_reaction.f & REACTION_IS_UPDATING) !== 0) {
          if (signal.rv < read_version) {
            signal.rv = read_version;
            if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
              skipped_deps++;
            } else if (new_deps === null) {
              new_deps = [signal];
            } else if (!skip_reaction || !new_deps.includes(signal)) {
              new_deps.push(signal);
            }
          }
        } else {
          (active_reaction.deps ??= []).push(signal);
          var reactions = signal.reactions;
          if (reactions === null) {
            signal.reactions = [active_reaction];
          } else if (!reactions.includes(active_reaction)) {
            reactions.push(active_reaction);
          }
        }
      }
    } else if (is_derived &&
signal.deps === null &&
signal.effects === null) {
      var derived2 = (
signal
      );
      var parent = derived2.parent;
      if (parent !== null && (parent.f & UNOWNED) === 0) {
        derived2.f ^= UNOWNED;
      }
    }
    if (is_destroying_effect) {
      if (old_values.has(signal)) {
        return old_values.get(signal);
      }
      if (is_derived) {
        derived2 =
signal;
        var value = derived2.v;
        if ((derived2.f & CLEAN) === 0 && derived2.reactions !== null || depends_on_old_values(derived2)) {
          value = execute_derived(derived2);
        }
        old_values.set(derived2, value);
        return value;
      }
    } else if (is_derived) {
      derived2 =
signal;
      if (batch_deriveds?.has(derived2)) {
        return batch_deriveds.get(derived2);
      }
      if (is_dirty(derived2)) {
        update_derived(derived2);
      }
    }
    if ((signal.f & ERROR_VALUE) !== 0) {
      throw signal.v;
    }
    return signal.v;
  }
  function depends_on_old_values(derived2) {
    if (derived2.v === UNINITIALIZED) return true;
    if (derived2.deps === null) return false;
    for (const dep of derived2.deps) {
      if (old_values.has(dep)) {
        return true;
      }
      if ((dep.f & DERIVED) !== 0 && depends_on_old_values(
dep
      )) {
        return true;
      }
    }
    return false;
  }
  const STATUS_MASK = -7169;
  function set_signal_status(signal, status) {
    signal.f = signal.f & STATUS_MASK | status;
  }
  const PASSIVE_EVENTS = ["touchstart", "touchmove"];
  function is_passive_event(name) {
    return PASSIVE_EVENTS.includes(name);
  }
  const all_registered_events = new Set();
  const root_event_handles = new Set();
  function delegate(events) {
    for (var i = 0; i < events.length; i++) {
      all_registered_events.add(events[i]);
    }
    for (var fn of root_event_handles) {
      fn(events);
    }
  }
  let last_propagated_event = null;
  function handle_event_propagation(event) {
    var handler_element = this;
    var owner_document = (
handler_element.ownerDocument
    );
    var event_name = event.type;
    var path = event.composedPath?.() || [];
    var current_target = (
path[0] || event.target
    );
    last_propagated_event = event;
    var path_idx = 0;
    var handled_at = last_propagated_event === event && event.__root;
    if (handled_at) {
      var at_idx = path.indexOf(handled_at);
      if (at_idx !== -1 && (handler_element === document || handler_element ===
window)) {
        event.__root = handler_element;
        return;
      }
      var handler_idx = path.indexOf(handler_element);
      if (handler_idx === -1) {
        return;
      }
      if (at_idx <= handler_idx) {
        path_idx = at_idx;
      }
    }
    current_target =
path[path_idx] || event.target;
    if (current_target === handler_element) return;
    define_property(event, "currentTarget", {
      configurable: true,
      get() {
        return current_target || owner_document;
      }
    });
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      var throw_error;
      var other_errors = [];
      while (current_target !== null) {
        var parent_element = current_target.assignedSlot || current_target.parentNode ||
current_target.host || null;
        try {
          var delegated = current_target["__" + event_name];
          if (delegated != null && (!
current_target.disabled ||

event.target === current_target)) {
            if (is_array(delegated)) {
              var [fn, ...data] = delegated;
              fn.apply(current_target, [event, ...data]);
            } else {
              delegated.call(current_target, event);
            }
          }
        } catch (error) {
          if (throw_error) {
            other_errors.push(error);
          } else {
            throw_error = error;
          }
        }
        if (event.cancelBubble || parent_element === handler_element || parent_element === null) {
          break;
        }
        current_target = parent_element;
      }
      if (throw_error) {
        for (let error of other_errors) {
          queueMicrotask(() => {
            throw error;
          });
        }
        throw throw_error;
      }
    } finally {
      event.__root = handler_element;
      delete event.currentTarget;
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  function create_fragment_from_html(html) {
    var elem = document.createElement("template");
    elem.innerHTML = html.replaceAll("<!>", "<!---->");
    return elem.content;
  }
  function assign_nodes(start, end) {
    var effect = (
active_effect
    );
    if (effect.nodes_start === null) {
      effect.nodes_start = start;
      effect.nodes_end = end;
    }
  }
function from_html(content, flags) {
    var node;
    var has_start = !content.startsWith("<!>");
    return () => {
      if (node === void 0) {
        node = create_fragment_from_html(has_start ? content : "<!>" + content);
        node =

get_first_child(node);
      }
      var clone = (
is_firefox ? document.importNode(node, true) : node.cloneNode(true)
      );
      {
        assign_nodes(clone, clone);
      }
      return clone;
    };
  }
  function append(anchor, dom) {
    if (anchor === null) {
      return;
    }
    anchor.before(
dom
    );
  }
  function set_text(text, value) {
    var str = value == null ? "" : typeof value === "object" ? value + "" : value;
    if (str !== (text.__t ??= text.nodeValue)) {
      text.__t = str;
      text.nodeValue = str + "";
    }
  }
  function mount(component, options) {
    return _mount(component, options);
  }
  const document_listeners = new Map();
  function _mount(Component, { target, anchor, props = {}, events, context, intro = true }) {
    init_operations();
    var registered_events = new Set();
    var event_handle = (events2) => {
      for (var i = 0; i < events2.length; i++) {
        var event_name = events2[i];
        if (registered_events.has(event_name)) continue;
        registered_events.add(event_name);
        var passive = is_passive_event(event_name);
        target.addEventListener(event_name, handle_event_propagation, { passive });
        var n = document_listeners.get(event_name);
        if (n === void 0) {
          document.addEventListener(event_name, handle_event_propagation, { passive });
          document_listeners.set(event_name, 1);
        } else {
          document_listeners.set(event_name, n + 1);
        }
      }
    };
    event_handle(array_from(all_registered_events));
    root_event_handles.add(event_handle);
    var component = void 0;
    var unmount = component_root(() => {
      var anchor_node = anchor ?? target.appendChild(create_text());
      branch(() => {
        if (context) {
          push({});
          var ctx = (
component_context
          );
          ctx.c = context;
        }
        if (events) {
          props.$$events = events;
        }
        component = Component(anchor_node, props) || {};
        if (context) {
          pop();
        }
      });
      return () => {
        for (var event_name of registered_events) {
          target.removeEventListener(event_name, handle_event_propagation);
          var n = (
document_listeners.get(event_name)
          );
          if (--n === 0) {
            document.removeEventListener(event_name, handle_event_propagation);
            document_listeners.delete(event_name);
          } else {
            document_listeners.set(event_name, n);
          }
        }
        root_event_handles.delete(event_handle);
        if (anchor_node !== anchor) {
          anchor_node.parentNode?.removeChild(anchor_node);
        }
      };
    });
    mounted_components.set(component, unmount);
    return component;
  }
  let mounted_components = new WeakMap();
  const IS_CUSTOM_ELEMENT = Symbol("is custom element");
  const IS_HTML = Symbol("is html");
  function set_attribute(element, attribute, value, skip_warning) {
    var attributes = get_attributes(element);
    if (attributes[attribute] === (attributes[attribute] = value)) return;
    if (value == null) {
      element.removeAttribute(attribute);
    } else if (typeof value !== "string" && get_setters(element).includes(attribute)) {
      element[attribute] = value;
    } else {
      element.setAttribute(attribute, value);
    }
  }
  function get_attributes(element) {
    return (

element.__attributes ??= {
        [IS_CUSTOM_ELEMENT]: element.nodeName.includes("-"),
        [IS_HTML]: element.namespaceURI === NAMESPACE_HTML
      }
    );
  }
  var setters_cache = new Map();
  function get_setters(element) {
    var setters = setters_cache.get(element.nodeName);
    if (setters) return setters;
    setters_cache.set(element.nodeName, setters = []);
    var descriptors;
    var proto = element;
    var element_proto = Element.prototype;
    while (element_proto !== proto) {
      descriptors = get_descriptors(proto);
      for (var key in descriptors) {
        if (descriptors[key].set) {
          setters.push(key);
        }
      }
      proto = get_prototype_of(proto);
    }
    return setters;
  }
  const appCss = ":root{font-family:Inter,Avenir,Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%}a{font-weight:500;color:#646cff;text-decoration:inherit}a:hover{color:#535bf2}body{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}h1{font-size:3.2em;line-height:1.1}.card{padding:2em}#app{max-width:1280px;margin:0 auto;padding:2rem;text-align:center}button{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s}button:hover{border-color:#646cff}button:focus,button:focus-visible{outline:4px auto -webkit-focus-ring-color}@media (prefers-color-scheme: light){:root{color:#213547;background-color:#fff}a:hover{color:#747bff}button{background-color:#f9f9f9}}";
  importCSS(appCss);
  const PUBLIC_VERSION = "5";
  if (typeof window !== "undefined") {
    ((window.__svelte ??= {}).v ??= new Set()).add(PUBLIC_VERSION);
  }
  enable_legacy_mode_flag();
  const svelteLogo = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='26.6'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20308'%3e%3cpath%20fill='%23FF3E00'%20d='M239.682%2040.707C211.113-.182%20154.69-12.301%20113.895%2013.69L42.247%2059.356a82.198%2082.198%200%200%200-37.135%2055.056a86.566%2086.566%200%200%200%208.536%2055.576a82.425%2082.425%200%200%200-12.296%2030.719a87.596%2087.596%200%200%200%2014.964%2066.244c28.574%2040.893%2084.997%2053.007%20125.787%2027.016l71.648-45.664a82.182%2082.182%200%200%200%2037.135-55.057a86.601%2086.601%200%200%200-8.53-55.577a82.409%2082.409%200%200%200%2012.29-30.718a87.573%2087.573%200%200%200-14.963-66.244'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M106.889%20270.841c-23.102%206.007-47.497-3.036-61.103-22.648a52.685%2052.685%200%200%201-9.003-39.85a49.978%2049.978%200%200%201%201.713-6.693l1.35-4.115l3.671%202.697a92.447%2092.447%200%200%200%2028.036%2014.007l2.663.808l-.245%202.659a16.067%2016.067%200%200%200%202.89%2010.656a17.143%2017.143%200%200%200%2018.397%206.828a15.786%2015.786%200%200%200%204.403-1.935l71.67-45.672a14.922%2014.922%200%200%200%206.734-9.977a15.923%2015.923%200%200%200-2.713-12.011a17.156%2017.156%200%200%200-18.404-6.832a15.78%2015.78%200%200%200-4.396%201.933l-27.35%2017.434a52.298%2052.298%200%200%201-14.553%206.391c-23.101%206.007-47.497-3.036-61.101-22.649a52.681%2052.681%200%200%201-9.004-39.849a49.428%2049.428%200%200%201%2022.34-33.114l71.664-45.677a52.218%2052.218%200%200%201%2014.563-6.398c23.101-6.007%2047.497%203.036%2061.101%2022.648a52.685%2052.685%200%200%201%209.004%2039.85a50.559%2050.559%200%200%201-1.713%206.692l-1.35%204.116l-3.67-2.693a92.373%2092.373%200%200%200-28.037-14.013l-2.664-.809l.246-2.658a16.099%2016.099%200%200%200-2.89-10.656a17.143%2017.143%200%200%200-18.398-6.828a15.786%2015.786%200%200%200-4.402%201.935l-71.67%2045.674a14.898%2014.898%200%200%200-6.73%209.975a15.9%2015.9%200%200%200%202.709%2012.012a17.156%2017.156%200%200%200%2018.404%206.832a15.841%2015.841%200%200%200%204.402-1.935l27.345-17.427a52.147%2052.147%200%200%201%2014.552-6.397c23.101-6.006%2047.497%203.037%2061.102%2022.65a52.681%2052.681%200%200%201%209.003%2039.848a49.453%2049.453%200%200%201-22.34%2033.12l-71.664%2045.673a52.218%2052.218%200%200%201-14.563%206.398'%3e%3c/path%3e%3c/svg%3e";
  const viteLogo = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='31.88'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20257'%3e%3cdefs%3e%3clinearGradient%20id='IconifyId1813088fe1fbc01fb466'%20x1='-.828%25'%20x2='57.636%25'%20y1='7.652%25'%20y2='78.411%25'%3e%3cstop%20offset='0%25'%20stop-color='%2341D1FF'%3e%3c/stop%3e%3cstop%20offset='100%25'%20stop-color='%23BD34FE'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient%20id='IconifyId1813088fe1fbc01fb467'%20x1='43.376%25'%20x2='50.316%25'%20y1='2.242%25'%20y2='89.03%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFEA83'%3e%3c/stop%3e%3cstop%20offset='8.333%25'%20stop-color='%23FFDD35'%3e%3c/stop%3e%3cstop%20offset='100%25'%20stop-color='%23FFA800'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23IconifyId1813088fe1fbc01fb466)'%20d='M255.153%2037.938L134.897%20252.976c-2.483%204.44-8.862%204.466-11.382.048L.875%2037.958c-2.746-4.814%201.371-10.646%206.827-9.67l120.385%2021.517a6.537%206.537%200%200%200%202.322-.004l117.867-21.483c5.438-.991%209.574%204.796%206.877%209.62Z'%3e%3c/path%3e%3cpath%20fill='url(%23IconifyId1813088fe1fbc01fb467)'%20d='M185.432.063L96.44%2017.501a3.268%203.268%200%200%200-2.634%203.014l-5.474%2092.456a3.268%203.268%200%200%200%203.997%203.378l24.777-5.718c2.318-.535%204.413%201.507%203.936%203.838l-7.361%2036.047c-.495%202.426%201.782%204.5%204.151%203.78l15.304-4.649c2.372-.72%204.652%201.36%204.15%203.788l-11.698%2056.621c-.732%203.542%203.979%205.473%205.943%202.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505%204.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z'%3e%3c/path%3e%3c/svg%3e";
  const increment = (_, count) => {
    set(count, get(count) + 1);
  };
  var root$1 = from_html(`<button> </button>`);
  function Counter($$anchor) {
    let count = state(0);
    var button = root$1();
    button.__click = [increment, count];
    var text = child(button);
    template_effect(() => set_text(text, `count is ${get(count) ?? ""}`));
    append($$anchor, button);
  }
  delegate(["click"]);
  var root = from_html(`<main><div><a href="https://vite.dev" target="_blank" rel="noreferrer"><img class="logo svelte-11cv5lq" alt="Vite Logo"/></a> <a href="https://svelte.dev" target="_blank" rel="noreferrer"><img class="logo svelte svelte-11cv5lq" alt="Svelte Logo"/></a></div> <h1>Vite + Svelte</h1> <div class="card"><!></div> <p>Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!</p> <p class="read-the-docs svelte-11cv5lq">Click on the Vite and Svelte logos to learn more</p></main>`);
  function App($$anchor) {
    var main = root();
    var div = child(main);
    var a = child(div);
    var img = child(a);
    var a_1 = sibling(a, 2);
    var img_1 = child(a_1);
    var div_1 = sibling(div, 4);
    var node = child(div_1);
    Counter(node);
    template_effect(() => {
      set_attribute(img, "src", viteLogo);
      set_attribute(img_1, "src", svelteLogo);
    });
    append($$anchor, main);
  }
  mount(App, {
    target: (() => {
      const app = document.createElement("div");
      document.body.append(app);
      return app;
    })()
  });

})();