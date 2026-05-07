// ==UserScript==
// @name       vite-solid-starter
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @icon       https://vitejs.dev/logo.svg
// @match      https://www.google.com/
// @grant      GM_addStyle
// ==/UserScript==

(function() {
  'use strict';
	var s = new Set();
	var _css = async (t) => {
		if (s.has(t)) return;
		s.add(t);
		((c) => {
			if (typeof GM_addStyle === "function") GM_addStyle(c);
			else (document.head || document.documentElement).appendChild(document.createElement("style")).append(c);
		})(t);
	};
	_css(" ._App_9g4xh_1{text-align:center}._logo_9g4xh_5{pointer-events:none;height:40vmin;animation:20s linear infinite _logo-spin_9g4xh_1}._header_9g4xh_11{color:#fff;background-color:#282c34;flex-direction:column;justify-content:center;align-items:center;min-height:100vh;font-size:calc(10px + 2vmin);display:flex}._link_9g4xh_22{color:#b318f0}@keyframes _logo-spin_9g4xh_1{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n/*$vite$:1*/ ");
	var sharedConfig = {
		context: void 0,
		registry: void 0,
		effects: void 0,
		done: false,
		getContextId() {
			return getContextId(this.context.count);
		},
		getNextContextId() {
			return getContextId(this.context.count++);
		}
	};
	function getContextId(count) {
		const num = String(count), len = num.length - 1;
		return sharedConfig.context.id + (len ? String.fromCharCode(96 + len) : "") + num;
	}
	function setHydrateContext(context) {
		sharedConfig.context = context;
	}
	function nextHydrateContext() {
		return {
			...sharedConfig.context,
			id: sharedConfig.getNextContextId(),
			count: 0
		};
	}
	var equalFn = (a, b) => a === b;
	var signalOptions = { equals: equalFn };
	var ERROR = null;
	var runEffects = runQueue;
	var STALE = 1;
	var PENDING = 2;
	var UNOWNED = {
		owned: null,
		cleanups: null,
		context: null,
		owner: null
	};
	var Owner = null;
	var Transition = null;
	var Scheduler = null;
	var ExternalSourceConfig = null;
	var Listener = null;
	var Updates = null;
	var Effects = null;
	var ExecCount = 0;
	function createRoot(fn, detachedOwner) {
		const listener = Listener, owner = Owner, unowned = fn.length === 0, current = detachedOwner === void 0 ? owner : detachedOwner, root = unowned ? UNOWNED : {
			owned: null,
			cleanups: null,
			context: current ? current.context : null,
			owner: current
		}, updateFn = unowned ? fn : () => fn(() => untrack(() => cleanNode(root)));
		Owner = root;
		Listener = null;
		try {
			return runUpdates(updateFn, true);
		} finally {
			Listener = listener;
			Owner = owner;
		}
	}
	function createSignal(value, options) {
		options = options ? Object.assign({}, signalOptions, options) : signalOptions;
		const s = {
			value,
			observers: null,
			observerSlots: null,
			comparator: options.equals || void 0
		};
		const setter = (value) => {
			if (typeof value === "function") if (Transition && Transition.running && Transition.sources.has(s)) value = value(s.tValue);
			else value = value(s.value);
			return writeSignal(s, value);
		};
		return [readSignal.bind(s), setter];
	}
	function createRenderEffect(fn, value, options) {
		const c = createComputation(fn, value, false, STALE);
		if (Scheduler && Transition && Transition.running) Updates.push(c);
		else updateComputation(c);
	}
	function untrack(fn) {
		if (!ExternalSourceConfig && Listener === null) return fn();
		const listener = Listener;
		Listener = null;
		try {
			if (ExternalSourceConfig) return ExternalSourceConfig.untrack(fn);
			return fn();
		} finally {
			Listener = listener;
		}
	}
	function onCleanup(fn) {
		if (Owner === null);
		else if (Owner.cleanups === null) Owner.cleanups = [fn];
		else Owner.cleanups.push(fn);
		return fn;
	}
	function startTransition(fn) {
		if (Transition && Transition.running) {
			fn();
			return Transition.done;
		}
		const l = Listener;
		const o = Owner;
		return Promise.resolve().then(() => {
			Listener = l;
			Owner = o;
			let t;
			if (Scheduler || SuspenseContext) {
				t = Transition || (Transition = {
					sources: new Set(),
					effects: [],
					promises: new Set(),
					disposed: new Set(),
					queue: new Set(),
					running: true
				});
				t.done || (t.done = new Promise((res) => t.resolve = res));
				t.running = true;
			}
			runUpdates(fn, false);
			Listener = Owner = null;
			return t ? t.done : void 0;
		});
	}
	var [transPending, setTransPending] = createSignal(false);
	var SuspenseContext;
	function readSignal() {
		const runningTransition = Transition && Transition.running;
		if (this.sources && (runningTransition ? this.tState : this.state)) if ((runningTransition ? this.tState : this.state) === STALE) updateComputation(this);
		else {
			const updates = Updates;
			Updates = null;
			runUpdates(() => lookUpstream(this), false);
			Updates = updates;
		}
		if (Listener) {
			const sSlot = this.observers ? this.observers.length : 0;
			if (!Listener.sources) {
				Listener.sources = [this];
				Listener.sourceSlots = [sSlot];
			} else {
				Listener.sources.push(this);
				Listener.sourceSlots.push(sSlot);
			}
			if (!this.observers) {
				this.observers = [Listener];
				this.observerSlots = [Listener.sources.length - 1];
			} else {
				this.observers.push(Listener);
				this.observerSlots.push(Listener.sources.length - 1);
			}
		}
		if (runningTransition && Transition.sources.has(this)) return this.tValue;
		return this.value;
	}
	function writeSignal(node, value, isComp) {
		let current = Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value;
		if (!node.comparator || !node.comparator(current, value)) {
			if (Transition) {
				const TransitionRunning = Transition.running;
				if (TransitionRunning || !isComp && Transition.sources.has(node)) {
					Transition.sources.add(node);
					node.tValue = value;
				}
				if (!TransitionRunning) node.value = value;
			} else node.value = value;
			if (node.observers && node.observers.length) runUpdates(() => {
				for (let i = 0; i < node.observers.length; i += 1) {
					const o = node.observers[i];
					const TransitionRunning = Transition && Transition.running;
					if (TransitionRunning && Transition.disposed.has(o)) continue;
					if (TransitionRunning ? !o.tState : !o.state) {
						if (o.pure) Updates.push(o);
						else Effects.push(o);
						if (o.observers) markDownstream(o);
					}
					if (!TransitionRunning) o.state = STALE;
					else o.tState = STALE;
				}
				if (Updates.length > 1e6) {
					Updates = [];
					throw new Error();
				}
			}, false);
		}
		return value;
	}
	function updateComputation(node) {
		if (!node.fn) return;
		cleanNode(node);
		const time = ExecCount;
		runComputation(node, Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value, time);
		if (Transition && !Transition.running && Transition.sources.has(node)) queueMicrotask(() => {
			runUpdates(() => {
				Transition && (Transition.running = true);
				Listener = Owner = node;
				runComputation(node, node.tValue, time);
				Listener = Owner = null;
			}, false);
		});
	}
	function runComputation(node, value, time) {
		let nextValue;
		const owner = Owner, listener = Listener;
		Listener = Owner = node;
		try {
			nextValue = node.fn(value);
		} catch (err) {
			if (node.pure) if (Transition && Transition.running) {
				node.tState = STALE;
				node.tOwned && node.tOwned.forEach(cleanNode);
				node.tOwned = void 0;
			} else {
				node.state = STALE;
				node.owned && node.owned.forEach(cleanNode);
				node.owned = null;
			}
			node.updatedAt = time + 1;
			return handleError(err);
		} finally {
			Listener = listener;
			Owner = owner;
		}
		if (!node.updatedAt || node.updatedAt <= time) {
			if (node.updatedAt != null && "observers" in node) writeSignal(node, nextValue, true);
			else if (Transition && Transition.running && node.pure) {
				if (!Transition.sources.has(node)) node.value = nextValue;
				Transition.sources.add(node);
				node.tValue = nextValue;
			} else node.value = nextValue;
			node.updatedAt = time;
		}
	}
	function createComputation(fn, init, pure, state = STALE, options) {
		const c = {
			fn,
			state,
			updatedAt: null,
			owned: null,
			sources: null,
			sourceSlots: null,
			cleanups: null,
			value: init,
			owner: Owner,
			context: Owner ? Owner.context : null,
			pure
		};
		if (Transition && Transition.running) {
			c.state = 0;
			c.tState = state;
		}
		if (Owner === null);
		else if (Owner !== UNOWNED) if (Transition && Transition.running && Owner.pure) if (!Owner.tOwned) Owner.tOwned = [c];
		else Owner.tOwned.push(c);
		else if (!Owner.owned) Owner.owned = [c];
		else Owner.owned.push(c);
		if (ExternalSourceConfig && c.fn) {
			const sourceFn = c.fn;
			const [track, trigger] = createSignal(void 0, { equals: false });
			const ordinary = ExternalSourceConfig.factory(sourceFn, trigger);
			onCleanup(() => ordinary.dispose());
			let inTransition;
			const triggerInTransition = () => startTransition(trigger).then(() => {
				if (inTransition) {
					inTransition.dispose();
					inTransition = void 0;
				}
			});
			c.fn = (x) => {
				track();
				if (Transition && Transition.running) {
					if (!inTransition) inTransition = ExternalSourceConfig.factory(sourceFn, triggerInTransition);
					return inTransition.track(x);
				}
				return ordinary.track(x);
			};
		}
		return c;
	}
	function runTop(node) {
		const runningTransition = Transition && Transition.running;
		if ((runningTransition ? node.tState : node.state) === 0) return;
		if ((runningTransition ? node.tState : node.state) === PENDING) return lookUpstream(node);
		if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
		const ancestors = [node];
		while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
			if (runningTransition && Transition.disposed.has(node)) return;
			if (runningTransition ? node.tState : node.state) ancestors.push(node);
		}
		for (let i = ancestors.length - 1; i >= 0; i--) {
			node = ancestors[i];
			if (runningTransition) {
				let top = node, prev = ancestors[i + 1];
				while ((top = top.owner) && top !== prev) if (Transition.disposed.has(top)) return;
			}
			if ((runningTransition ? node.tState : node.state) === STALE) updateComputation(node);
			else if ((runningTransition ? node.tState : node.state) === PENDING) {
				const updates = Updates;
				Updates = null;
				runUpdates(() => lookUpstream(node, ancestors[0]), false);
				Updates = updates;
			}
		}
	}
	function runUpdates(fn, init) {
		if (Updates) return fn();
		let wait = false;
		if (!init) Updates = [];
		if (Effects) wait = true;
		else Effects = [];
		ExecCount++;
		try {
			const res = fn();
			completeUpdates(wait);
			return res;
		} catch (err) {
			if (!wait) Effects = null;
			Updates = null;
			handleError(err);
		}
	}
	function completeUpdates(wait) {
		if (Updates) {
			if (Scheduler && Transition && Transition.running) scheduleQueue(Updates);
			else runQueue(Updates);
			Updates = null;
		}
		if (wait) return;
		let res;
		if (Transition) {
			if (!Transition.promises.size && !Transition.queue.size) {
				const sources = Transition.sources;
				const disposed = Transition.disposed;
				Effects.push.apply(Effects, Transition.effects);
				res = Transition.resolve;
				for (const e of Effects) {
					"tState" in e && (e.state = e.tState);
					delete e.tState;
				}
				Transition = null;
				runUpdates(() => {
					for (const d of disposed) cleanNode(d);
					for (const v of sources) {
						v.value = v.tValue;
						if (v.owned) for (let i = 0, len = v.owned.length; i < len; i++) cleanNode(v.owned[i]);
						if (v.tOwned) v.owned = v.tOwned;
						delete v.tValue;
						delete v.tOwned;
						v.tState = 0;
					}
					setTransPending(false);
				}, false);
			} else if (Transition.running) {
				Transition.running = false;
				Transition.effects.push.apply(Transition.effects, Effects);
				Effects = null;
				setTransPending(true);
				return;
			}
		}
		const e = Effects;
		Effects = null;
		if (e.length) runUpdates(() => runEffects(e), false);
		if (res) res();
	}
	function runQueue(queue) {
		for (let i = 0; i < queue.length; i++) runTop(queue[i]);
	}
	function scheduleQueue(queue) {
		for (let i = 0; i < queue.length; i++) {
			const item = queue[i];
			const tasks = Transition.queue;
			if (!tasks.has(item)) {
				tasks.add(item);
				Scheduler(() => {
					tasks.delete(item);
					runUpdates(() => {
						Transition.running = true;
						runTop(item);
					}, false);
					Transition && (Transition.running = false);
				});
			}
		}
	}
	function lookUpstream(node, ignore) {
		const runningTransition = Transition && Transition.running;
		if (runningTransition) node.tState = 0;
		else node.state = 0;
		for (let i = 0; i < node.sources.length; i += 1) {
			const source = node.sources[i];
			if (source.sources) {
				const state = runningTransition ? source.tState : source.state;
				if (state === STALE) {
					if (source !== ignore && (!source.updatedAt || source.updatedAt < ExecCount)) runTop(source);
				} else if (state === PENDING) lookUpstream(source, ignore);
			}
		}
	}
	function markDownstream(node) {
		const runningTransition = Transition && Transition.running;
		for (let i = 0; i < node.observers.length; i += 1) {
			const o = node.observers[i];
			if (runningTransition ? !o.tState : !o.state) {
				if (runningTransition) o.tState = PENDING;
				else o.state = PENDING;
				if (o.pure) Updates.push(o);
				else Effects.push(o);
				o.observers && markDownstream(o);
			}
		}
	}
	function cleanNode(node) {
		let i;
		if (node.sources) while (node.sources.length) {
			const source = node.sources.pop(), index = node.sourceSlots.pop(), obs = source.observers;
			if (obs && obs.length) {
				const n = obs.pop(), s = source.observerSlots.pop();
				if (index < obs.length) {
					n.sourceSlots[s] = index;
					obs[index] = n;
					source.observerSlots[index] = s;
				}
			}
		}
		if (node.tOwned) {
			for (i = node.tOwned.length - 1; i >= 0; i--) cleanNode(node.tOwned[i]);
			delete node.tOwned;
		}
		if (Transition && Transition.running && node.pure) reset(node, true);
		else if (node.owned) {
			for (i = node.owned.length - 1; i >= 0; i--) cleanNode(node.owned[i]);
			node.owned = null;
		}
		if (node.cleanups) {
			for (i = node.cleanups.length - 1; i >= 0; i--) node.cleanups[i]();
			node.cleanups = null;
		}
		if (Transition && Transition.running) node.tState = 0;
		else node.state = 0;
	}
	function reset(node, top) {
		if (!top) {
			node.tState = 0;
			Transition.disposed.add(node);
		}
		if (node.owned) for (let i = 0; i < node.owned.length; i++) reset(node.owned[i]);
	}
	function castError(err) {
		if (err instanceof Error) return err;
		return new Error(typeof err === "string" ? err : "Unknown error", { cause: err });
	}
	function runErrors(err, fns, owner) {
		try {
			for (const f of fns) f(err);
		} catch (e) {
			handleError(e, owner && owner.owner || null);
		}
	}
	function handleError(err, owner = Owner) {
		const fns = ERROR && owner && owner.context && owner.context[ERROR];
		const error = castError(err);
		if (!fns) throw error;
		if (Effects) Effects.push({
			fn() {
				runErrors(error, fns, owner);
			},
			state: STALE
		});
		else runErrors(error, fns, owner);
	}
	var hydrationEnabled = false;
	function createComponent(Comp, props) {
		if (hydrationEnabled) {
			if (sharedConfig.context) {
				const c = sharedConfig.context;
				setHydrateContext(nextHydrateContext());
				const r = untrack(() => Comp(props || {}));
				setHydrateContext(c);
				return r;
			}
		}
		return untrack(() => Comp(props || {}));
	}
	function reconcileArrays(parentNode, a, b) {
		let bLength = b.length, aEnd = a.length, bEnd = bLength, aStart = 0, bStart = 0, after = a[aEnd - 1].nextSibling, map = null;
		while (aStart < aEnd || bStart < bEnd) {
			if (a[aStart] === b[bStart]) {
				aStart++;
				bStart++;
				continue;
			}
			while (a[aEnd - 1] === b[bEnd - 1]) {
				aEnd--;
				bEnd--;
			}
			if (aEnd === aStart) {
				const node = bEnd < bLength ? bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart] : after;
				while (bStart < bEnd) parentNode.insertBefore(b[bStart++], node);
			} else if (bEnd === bStart) while (aStart < aEnd) {
				if (!map || !map.has(a[aStart])) a[aStart].remove();
				aStart++;
			}
			else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
				const node = a[--aEnd].nextSibling;
				parentNode.insertBefore(b[bStart++], a[aStart++].nextSibling);
				parentNode.insertBefore(b[--bEnd], node);
				a[aEnd] = b[bEnd];
			} else {
				if (!map) {
					map = new Map();
					let i = bStart;
					while (i < bEnd) map.set(b[i], i++);
				}
				const index = map.get(a[aStart]);
				if (index != null) if (bStart < index && index < bEnd) {
					let i = aStart, sequence = 1, t;
					while (++i < aEnd && i < bEnd) {
						if ((t = map.get(a[i])) == null || t !== index + sequence) break;
						sequence++;
					}
					if (sequence > index - bStart) {
						const node = a[aStart];
						while (bStart < index) parentNode.insertBefore(b[bStart++], node);
					} else parentNode.replaceChild(b[bStart++], a[aStart++]);
				} else aStart++;
				else a[aStart++].remove();
			}
		}
	}
	function render(code, element, init, options = {}) {
		let disposer;
		createRoot((dispose) => {
			disposer = dispose;
			element === document ? code() : insert(element, code(), element.firstChild ? null : void 0, init);
		}, options.owner);
		return () => {
			disposer();
			element.textContent = "";
		};
	}
	function template(html, isImportNode, isSVG, isMathML) {
		let node;
		const create = () => {
			const t = isMathML ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
			t.innerHTML = html;
			return isSVG ? t.content.firstChild.firstChild : isMathML ? t.firstChild : t.content.firstChild;
		};
		const fn = isImportNode ? () => untrack(() => document.importNode(node || (node = create()), true)) : () => (node || (node = create())).cloneNode(true);
		fn.cloneNode = fn;
		return fn;
	}
	function setAttribute(node, name, value) {
		if (isHydrating(node)) return;
		if (value == null) node.removeAttribute(name);
		else node.setAttribute(name, value);
	}
	function className(node, value) {
		if (isHydrating(node)) return;
		if (value == null) node.removeAttribute("class");
		else node.className = value;
	}
	function insert(parent, accessor, marker, initial) {
		if (marker !== void 0 && !initial) initial = [];
		if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
		createRenderEffect((current) => insertExpression(parent, accessor(), current, marker), initial);
	}
	function isHydrating(node) {
		return !!sharedConfig.context && !sharedConfig.done && (!node || node.isConnected);
	}
	function insertExpression(parent, value, current, marker, unwrapArray) {
		const hydrating = isHydrating(parent);
		if (hydrating) {
			!current && (current = [...parent.childNodes]);
			let cleaned = [];
			for (let i = 0; i < current.length; i++) {
				const node = current[i];
				if (node.nodeType === 8 && node.data.slice(0, 2) === "!$") node.remove();
				else cleaned.push(node);
			}
			current = cleaned;
		}
		while (typeof current === "function") current = current();
		if (value === current) return current;
		const t = typeof value, multi = marker !== void 0;
		parent = multi && current[0] && current[0].parentNode || parent;
		if (t === "string" || t === "number") {
			if (hydrating) return current;
			if (t === "number") {
				value = value.toString();
				if (value === current) return current;
			}
			if (multi) {
				let node = current[0];
				if (node && node.nodeType === 3) node.data !== value && (node.data = value);
				else node = document.createTextNode(value);
				current = cleanChildren(parent, current, marker, node);
			} else if (current !== "" && typeof current === "string") current = parent.firstChild.data = value;
			else current = parent.textContent = value;
		} else if (value == null || t === "boolean") {
			if (hydrating) return current;
			current = cleanChildren(parent, current, marker);
		} else if (t === "function") {
			createRenderEffect(() => {
				let v = value();
				while (typeof v === "function") v = v();
				current = insertExpression(parent, v, current, marker);
			});
			return () => current;
		} else if (Array.isArray(value)) {
			const array = [];
			const currentArray = current && Array.isArray(current);
			if (normalizeIncomingArray(array, value, current, unwrapArray)) {
				createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
				return () => current;
			}
			if (hydrating) {
				if (!array.length) return current;
				if (marker === void 0) return current = [...parent.childNodes];
				let node = array[0];
				if (node.parentNode !== parent) return current;
				const nodes = [node];
				while ((node = node.nextSibling) !== marker) nodes.push(node);
				return current = nodes;
			}
			if (array.length === 0) {
				current = cleanChildren(parent, current, marker);
				if (multi) return current;
			} else if (currentArray) if (current.length === 0) appendNodes(parent, array, marker);
			else reconcileArrays(parent, current, array);
			else {
				current && cleanChildren(parent);
				appendNodes(parent, array);
			}
			current = array;
		} else if (value.nodeType) {
			if (hydrating && value.parentNode) return current = multi ? [value] : value;
			if (Array.isArray(current)) {
				if (multi) return current = cleanChildren(parent, current, marker, value);
				cleanChildren(parent, current, null, value);
			} else if (current == null || current === "" || !parent.firstChild) parent.appendChild(value);
			else parent.replaceChild(value, parent.firstChild);
			current = value;
		}
		return current;
	}
	function normalizeIncomingArray(normalized, array, current, unwrap) {
		let dynamic = false;
		for (let i = 0, len = array.length; i < len; i++) {
			let item = array[i], prev = current && current[normalized.length], t;
			if (item == null || item === true || item === false);
			else if ((t = typeof item) === "object" && item.nodeType) normalized.push(item);
			else if (Array.isArray(item)) dynamic = normalizeIncomingArray(normalized, item, prev) || dynamic;
			else if (t === "function") if (unwrap) {
				while (typeof item === "function") item = item();
				dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item], Array.isArray(prev) ? prev : [prev]) || dynamic;
			} else {
				normalized.push(item);
				dynamic = true;
			}
			else {
				const value = String(item);
				if (prev && prev.nodeType === 3 && prev.data === value) normalized.push(prev);
				else normalized.push(document.createTextNode(value));
			}
		}
		return dynamic;
	}
	function appendNodes(parent, array, marker = null) {
		for (let i = 0, len = array.length; i < len; i++) parent.insertBefore(array[i], marker);
	}
	function cleanChildren(parent, current, marker, replacement) {
		if (marker === void 0) return parent.textContent = "";
		const node = replacement || document.createTextNode("");
		if (current.length) {
			let inserted = false;
			for (let i = current.length - 1; i >= 0; i--) {
				const el = current[i];
				if (node !== el) {
					const isParent = el.parentNode === parent;
					if (!inserted && !i) isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);
					else isParent && el.remove();
				} else inserted = true;
			}
		} else parent.insertBefore(node, marker);
		return [node];
	}
	_css("body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;display:flex}code{font-family:source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace}");
	var logo_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20166%20155.3'%3e%3cpath%20d='M163%2035S110-4%2069%205l-3%201c-6%202-11%205-14%209l-2%203-15%2026%2026%205c11%207%2025%2010%2038%207l46%209%2018-30z'%20fill='%2376b3e1'/%3e%3clinearGradient%20id='a'%20gradientUnits='userSpaceOnUse'%20x1='27.5'%20y1='3'%20x2='152'%20y2='63.5'%3e%3cstop%20offset='.1'%20stop-color='%2376b3e1'/%3e%3cstop%20offset='.3'%20stop-color='%23dcf2fd'/%3e%3cstop%20offset='1'%20stop-color='%2376b3e1'/%3e%3c/linearGradient%3e%3cpath%20d='M163%2035S110-4%2069%205l-3%201c-6%202-11%205-14%209l-2%203-15%2026%2026%205c11%207%2025%2010%2038%207l46%209%2018-30z'%20opacity='.3'%20fill='url(%23a)'/%3e%3cpath%20d='M52%2035l-4%201c-17%205-22%2021-13%2035%2010%2013%2031%2020%2048%2015l62-21S92%2026%2052%2035z'%20fill='%23518ac8'/%3e%3clinearGradient%20id='b'%20gradientUnits='userSpaceOnUse'%20x1='95.8'%20y1='32.6'%20x2='74'%20y2='105.2'%3e%3cstop%20offset='0'%20stop-color='%2376b3e1'/%3e%3cstop%20offset='.5'%20stop-color='%234377bb'/%3e%3cstop%20offset='1'%20stop-color='%231f3b77'/%3e%3c/linearGradient%3e%3cpath%20d='M52%2035l-4%201c-17%205-22%2021-13%2035%2010%2013%2031%2020%2048%2015l62-21S92%2026%2052%2035z'%20opacity='.3'%20fill='url(%23b)'/%3e%3clinearGradient%20id='c'%20gradientUnits='userSpaceOnUse'%20x1='18.4'%20y1='64.2'%20x2='144.3'%20y2='149.8'%3e%3cstop%20offset='0'%20stop-color='%23315aa9'/%3e%3cstop%20offset='.5'%20stop-color='%23518ac8'/%3e%3cstop%20offset='1'%20stop-color='%23315aa9'/%3e%3c/linearGradient%3e%3cpath%20d='M134%2080a45%2045%200%2000-48-15L24%2085%204%20120l112%2019%2020-36c4-7%203-15-2-23z'%20fill='url(%23c)'/%3e%3clinearGradient%20id='d'%20gradientUnits='userSpaceOnUse'%20x1='75.2'%20y1='74.5'%20x2='24.4'%20y2='260.8'%3e%3cstop%20offset='0'%20stop-color='%234377bb'/%3e%3cstop%20offset='.5'%20stop-color='%231a336b'/%3e%3cstop%20offset='1'%20stop-color='%231a336b'/%3e%3c/linearGradient%3e%3cpath%20d='M114%20115a45%2045%200%2000-48-15L4%20120s53%2040%2094%2030l3-1c17-5%2023-21%2013-34z'%20fill='url(%23d)'/%3e%3c/svg%3e";
	var App_module_default = {
		App: "_App_9g4xh_1",
		logo: "_logo_9g4xh_5",
		"logo-spin": "_logo-spin_9g4xh_1",
		header: "_header_9g4xh_11",
		link: "_link_9g4xh_22"
	};
	var _tmpl$ = template(`<div><header><img alt=logo><p>Edit <code>src/App.jsx</code> and save to reload.</p><a href=https://github.com/solidjs/solid target=_blank rel="noopener noreferrer">Learn Solid`);
	function App() {
		return (() => {
			var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$5 = _el$3.nextSibling.nextSibling;
			setAttribute(_el$3, "src", logo_default);
			createRenderEffect((_p$) => {
				var _v$ = App_module_default.App, _v$2 = App_module_default.header, _v$3 = App_module_default.logo, _v$4 = App_module_default.link;
				_v$ !== _p$.e && className(_el$, _p$.e = _v$);
				_v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
				_v$3 !== _p$.a && className(_el$3, _p$.a = _v$3);
				_v$4 !== _p$.o && className(_el$5, _p$.o = _v$4);
				return _p$;
			}, {
				e: void 0,
				t: void 0,
				a: void 0,
				o: void 0
			});
			return _el$;
		})();
	}
	render(() => createComponent(App, {}), (() => {
		const app = document.createElement("div");
		app.style.flex = "1";
		document.body.append(app);
		return app;
	})());
})();
