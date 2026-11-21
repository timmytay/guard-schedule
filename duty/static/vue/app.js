// @__NO_SIDE_EFFECTS__
function ui(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const fe = {}, en = [], yt = () => {
}, pl = () => !1, ss = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), is = (e) => e.startsWith("onUpdate:"), ye = Object.assign, ci = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Bu = Object.prototype.hasOwnProperty, ie = (e, t) => Bu.call(e, t), z = Array.isArray, Wt = (e) => xn(e) === "[object Map]", Fr = (e) => xn(e) === "[object Set]", Yi = (e) => xn(e) === "[object Date]", G = (e) => typeof e == "function", pe = (e) => typeof e == "string", et = (e) => typeof e == "symbol", oe = (e) => e !== null && typeof e == "object", yl = (e) => (oe(e) || G(e)) && G(e.then) && G(e.catch), bl = Object.prototype.toString, xn = (e) => bl.call(e), Hu = (e) => xn(e).slice(8, -1), _l = (e) => xn(e) === "[object Object]", os = (e) => pe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Nn = /* @__PURE__ */ ui(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Wu = 1e4, ls = (e) => {
  let t = /* @__PURE__ */ Object.create(null), n = 0;
  return ((r) => {
    const s = t[r];
    return s !== void 0 ? s : (++n > Wu && (t = /* @__PURE__ */ Object.create(null), n = 1), t[r] = e(r));
  });
}, ju = /-\w/g, Me = /* @__PURE__ */ ls((e) => e.replace(ju, (t) => t.slice(1).toUpperCase())), zu = /\B([A-Z])/g, cn = /* @__PURE__ */ ls(
  (e) => e.replace(zu, "-$1").toLowerCase()
), kn = /* @__PURE__ */ ls((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ts = /* @__PURE__ */ ls((e) => e ? `on${kn(e)}` : ""), vt = (e, t) => !Object.is(e, t), Or = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Sl = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, fi = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Uu = (e) => {
  const t = pe(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Gi;
const as = () => Gi || (Gi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function xe(e) {
  if (z(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], s = pe(r) ? qu(r) : xe(r);
      if (s)
        for (const i in s)
          t[i] = s[i];
    }
    return t;
  } else if (pe(e) || oe(e))
    return e;
}
const Ku = /;(?![^(]*\))/g, Yu = /:([^]+)/, Gu = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function qu(e) {
  const t = {};
  return e.replace(Gu, (n) => n.startsWith("/*") ? "" : n).split(Ku).forEach((n) => {
    if (n) {
      const r = n.split(Yu);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function he(e) {
  let t = "";
  if (pe(e))
    t = e;
  else if (z(e))
    for (let n = 0; n < e.length; n++) {
      const r = he(e[n]);
      r && (t += r + " ");
    }
  else if (oe(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Zu = "itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", Xu = /* @__PURE__ */ ui(Zu);
function wl(e) {
  return !!e || e === "";
}
function Ju(e, t, n) {
  if (e.length !== t.length) return !1;
  let r = !0;
  for (let s = 0; r && s < e.length; s++)
    r = us(e[s], t[s], n);
  return r;
}
function qi(e, t, n) {
  if (e.size !== t.size) return !1;
  const r = Array.from(t), s = new Uint8Array(r.length);
  for (const i of e) {
    let o = -1;
    for (let l = 0; l < r.length; l++)
      if (!s[l] && us(i, r[l], n)) {
        o = l;
        break;
      }
    if (o < 0) return !1;
    s[o] = 1;
  }
  return !0;
}
function Qu(e, t, n) {
  let r = Wt(e), s = Wt(t);
  if (r || s || (r = Fr(e), s = Fr(t), r || s))
    return r && s ? qi(e, t, n) : !1;
  const i = Object.keys(e).length, o = Object.keys(t).length;
  if (i !== o)
    return !1;
  for (const l in e) {
    const a = ie(e, l), c = ie(t, l);
    if (a && !c || !a && c || !us(e[l], t[l], n))
      return !1;
  }
  return Xi(e) === Xi(t);
}
function Zi(e, t, n, r) {
  n || (n = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [s, i] = n;
  if (s.has(e) || i.has(t))
    return s.get(e) === t && i.get(t) === e;
  s.set(e, t), i.set(t, e);
  const o = r(e, t, n);
  return s.delete(e), i.delete(t), o;
}
function us(e, t, n) {
  if (e === t) return !0;
  let r = Yi(e), s = Yi(t);
  return r || s ? r && s ? e.getTime() === t.getTime() : !1 : (r = et(e), s = et(t), r || s ? e === t : (r = z(e), s = z(t), r || s ? r && s ? Zi(e, t, n, Ju) : !1 : (r = oe(e), s = oe(t), r || s ? !r || !s ? !1 : Zi(e, t, n, Qu) : String(e) === String(t))));
}
function Xi(e) {
  return Object.getPrototypeOf(e) === null && e[Symbol.toPrimitive] == null && typeof e.toString != "function" && typeof e.valueOf != "function" ? xn(e) : String(e);
}
const Cl = (e) => !!(e && e.__v_isRef === !0), se = (e) => pe(e) ? e : e == null ? "" : z(e) || oe(e) && (e.toString === bl || !G(e.toString)) ? Cl(e) ? se(e.value) : JSON.stringify(e, xl, 2) : String(e), xl = (e, t) => Cl(t) ? xl(e, t.value) : Wt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, s], i) => (n[As(r, i) + " =>"] = s, n),
    {}
  )
} : Fr(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => As(n))
} : et(t) ? As(t) : oe(t) && !z(t) && !_l(t) ? String(t) : t, As = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    et(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let Ce;
class kl {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Ce && (Ce.active ? (this.parent = Ce, this.index = (Ce.scopes || (Ce.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes) {
        const r = this.scopes.slice();
        for (t = 0, n = r.length; t < n; t++)
          r[t].pause();
      }
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes) {
        const s = this.scopes.slice();
        for (t = 0, n = s.length; t < n; t++)
          s[t].resume();
      }
      const r = this.effects.slice();
      for (t = 0, n = r.length; t < n; t++)
        r[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Ce;
      try {
        return Ce = this, t();
      } finally {
        Ce = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Ce, Ce = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Ce === this)
        Ce = this.prevScope;
      else {
        let t = Ce;
        for (; t; ) {
          if (t.prevScope === this) {
            t.prevScope = this.prevScope;
            break;
          }
          t = t.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        const s = this.scopes.slice();
        for (n = 0, r = s.length; n < r; n++)
          s[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Us(e) {
  return new kl(e);
}
function Tl() {
  return Ce;
}
function cs(e, t = !1) {
  Ce && (Ce.active ? Ce.cleanups.push(e) : e());
}
let ge;
const Es = /* @__PURE__ */ new WeakSet();
class Al {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ce && (Ce.active ? Ce.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Es.has(this) && (Es.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Dl(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ji(this), Pl(this);
    const t = ge, n = it;
    ge = this, it = !0;
    try {
      return this.fn();
    } finally {
      Il(this), ge = t, it = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        mi(t);
      this.deps = this.depsTail = void 0, Ji(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Es.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ks(this) && this.run();
  }
  get dirty() {
    return Ks(this);
  }
}
let El = 0, Vn, Bn;
function Dl(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Bn, Bn = e;
    return;
  }
  e.next = Vn, Vn = e;
}
function di() {
  El++;
}
function hi() {
  if (--El > 0)
    return;
  if (Bn) {
    let t = Bn;
    for (Bn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Vn; ) {
    let t = Vn;
    for (Vn = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (r) {
          e || (e = r);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Pl(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Il(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const s = r.prevDep;
    r.version === -1 ? (r === n && (n = s), mi(r), ec(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = s;
  }
  e.deps = t, e.depsTail = n;
}
function Ks(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ol(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ol(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Gn) || (e.globalVersion = Gn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ks(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ge, r = it;
  ge = e, it = !0;
  try {
    Pl(e);
    const s = e.fn(e._value);
    (t.version === 0 || vt(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    ge = n, it = r, Il(e), e.flags &= -3;
  }
}
function mi(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: s } = e;
  if (r && (r.nextSub = s, e.prevSub = void 0), s && (s.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      mi(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function ec(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let it = !0;
const $l = [];
function _t() {
  $l.push(it), it = !1;
}
function St() {
  const e = $l.pop();
  it = e === void 0 ? !0 : e;
}
function Ji(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ge;
    ge = void 0;
    try {
      t();
    } finally {
      ge = n;
    }
  }
}
let Gn = 0;
class tc {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class gi {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ge || !it || ge === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ge)
      n = this.activeLink = new tc(ge, this), ge.deps ? (n.prevDep = ge.depsTail, ge.depsTail.nextDep = n, ge.depsTail = n) : ge.deps = ge.depsTail = n, Ml(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = ge.depsTail, n.nextDep = void 0, ge.depsTail.nextDep = n, ge.depsTail = n, ge.deps === n && (ge.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, Gn++, this.notify(t);
  }
  notify(t) {
    di();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      hi();
    }
  }
}
function Ml(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        Ml(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Rr = /* @__PURE__ */ new WeakMap(), tn = /* @__PURE__ */ Symbol(
  ""
), Ys = /* @__PURE__ */ Symbol(
  ""
), qn = /* @__PURE__ */ Symbol(
  ""
);
function Ie(e, t, n) {
  if (it && ge) {
    let r = Rr.get(e);
    r || Rr.set(e, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || (r.set(n, s = new gi()), s.map = r, s.key = n), s.track();
  }
}
function Dt(e, t, n, r, s, i) {
  const o = Rr.get(e);
  if (!o) {
    Gn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (di(), t === "clear")
    o.forEach(l);
  else {
    const a = z(e), c = a && os(n);
    if (a && n === "length") {
      const u = Number(r);
      o.forEach((f, h) => {
        (h === "length" || h === qn || !et(h) && h >= u) && l(f);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), c && l(o.get(qn)), t) {
        case "add":
          a ? c && l(o.get("length")) : (l(o.get(tn)), Wt(e) && l(o.get(Ys)));
          break;
        case "delete":
          a || (l(o.get(tn)), Wt(e) && l(o.get(Ys)));
          break;
        case "set":
          Wt(e) && l(o.get(tn));
          break;
      }
  }
  hi();
}
function nc(e, t) {
  const n = Rr.get(e);
  return n && n.get(t);
}
function gn(e) {
  const t = /* @__PURE__ */ ne(e);
  return t === e || (Ie(t, "iterate", qn), /* @__PURE__ */ Ye(e)) ? t : /* @__PURE__ */ Ct(e) ? /* @__PURE__ */ jt(e) ? t.map((n) => Ut(tt(n))) : t.map(Ut) : t.map(tt);
}
function fs(e) {
  return Ie(e = /* @__PURE__ */ ne(e), "iterate", qn), e;
}
function ht(e, t) {
  return /* @__PURE__ */ Ct(e) ? Ut(/* @__PURE__ */ jt(e) ? tt(t) : t) : tt(t);
}
const rc = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ds(this, Symbol.iterator, (e) => ht(this, e));
  },
  concat(...e) {
    return gn(this).concat(
      ...e.map((t) => z(t) ? gn(t) : t)
    );
  },
  entries() {
    return Ds(this, "entries", (e) => (e[1] = ht(this, e[1]), e));
  },
  every(e, t) {
    return kt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return kt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => ht(this, r)),
      arguments
    );
  },
  find(e, t) {
    return kt(
      this,
      "find",
      e,
      t,
      (n) => ht(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return kt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return kt(
      this,
      "findLast",
      e,
      t,
      (n) => ht(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return kt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return kt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Ps(this, "includes", e);
  },
  indexOf(...e) {
    return Ps(this, "indexOf", e);
  },
  join(e) {
    return gn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Ps(this, "lastIndexOf", e);
  },
  map(e, t) {
    return kt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return In(this, "pop");
  },
  push(...e) {
    return In(this, "push", e);
  },
  reduce(e, ...t) {
    return eo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return eo(this, "reduceRight", e, t);
  },
  shift() {
    return In(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return kt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return In(this, "splice", e);
  },
  toReversed() {
    return gn(this).toReversed();
  },
  toSorted(e) {
    return gn(this).toSorted(e);
  },
  toSpliced(...e) {
    return gn(this).toSpliced(...e);
  },
  unshift(...e) {
    return In(this, "unshift", e);
  },
  values() {
    return Ds(this, "values", (e) => ht(this, e));
  }
};
function Ds(e, t, n) {
  const r = fs(e), s = r[t], i = s.call(r);
  if (r !== e && !/* @__PURE__ */ Ye(e)) {
    if (i[Symbol.toStringTag] === "Array Iterator") {
      const o = Object.create(Object.getPrototypeOf(i));
      return o.next = () => Qi(i.next(), n), s !== Fl[t] && Object.defineProperties(o, {
        return: {
          get() {
            const l = i.return;
            return typeof l == "function" ? l.bind(i) : l;
          }
        },
        throw: {
          get() {
            const l = i.throw;
            return typeof l == "function" ? l.bind(i) : l;
          }
        }
      }), o;
    }
    i._next = i.next, i.next = () => Qi(i._next(), n);
  }
  return i;
}
function Qi(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const Fl = Array.prototype;
function kt(e, t, n, r, s, i) {
  const o = fs(e), l = o !== e && !/* @__PURE__ */ Ye(e), a = o[t];
  if (a !== Fl[t]) {
    const f = a.apply(e, i);
    return l ? tt(f) : f;
  }
  let c = n;
  o !== e && (l ? c = function(f, h) {
    return n.call(this, ht(e, f), h, e);
  } : n.length > 2 && (c = function(f, h) {
    return n.call(this, f, h, e);
  }));
  const u = a.call(o, c, r);
  return l && s ? s(u) : u;
}
function eo(e, t, n, r) {
  const s = fs(e), i = s !== e && !/* @__PURE__ */ Ye(e);
  let o = n, l = !1;
  s !== e && (i ? (l = r.length === 0, o = function(c, u, f) {
    return l && (l = !1, c = ht(e, c)), n.call(this, c, ht(e, u), f, e);
  }) : n.length > 3 && (o = function(c, u, f) {
    return n.call(this, c, u, f, e);
  }));
  const a = s[t](o, ...r);
  return l ? ht(e, a) : a;
}
function Ps(e, t, n) {
  const r = /* @__PURE__ */ ne(e);
  Ie(r, "iterate", qn);
  const s = r[t](...n);
  return (s === -1 || s === !1) && /* @__PURE__ */ ds(n[0]) ? (n[0] = /* @__PURE__ */ ne(n[0]), r[t](...n)) : s;
}
function In(e, t, n = []) {
  _t(), di();
  const r = (/* @__PURE__ */ ne(e))[t].apply(e, n);
  return hi(), St(), r;
}
const sc = /* @__PURE__ */ ui("__proto__,__v_isRef,__isVue"), Rl = /* @__PURE__ */ new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(et)
);
function ic(e) {
  et(e) || (e = String(e));
  const t = /* @__PURE__ */ ne(this);
  return Ie(t, "has", e), t.hasOwnProperty(e);
}
class Ll {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    if (n === "__v_skip") return t.__v_skip;
    const s = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return r === (s ? i ? gc : Hl : i ? Bl : Vl).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const o = z(t);
    if (!s) {
      let a;
      if (o && (a = rc[n]))
        return a;
      if (n === "hasOwnProperty")
        return ic;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ be(t) ? t : r
    );
    if ((et(n) ? Rl.has(n) : sc(n)) || (s || Ie(t, "get", n), i))
      return l;
    if (/* @__PURE__ */ be(l)) {
      const a = o && os(n) ? l : l.value;
      return s && oe(a) ? /* @__PURE__ */ Lr(a) : a;
    }
    return oe(l) ? s ? /* @__PURE__ */ Lr(l) : /* @__PURE__ */ wt(l) : l;
  }
}
class Nl extends Ll {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let i = t[n];
    const o = z(t) && os(n);
    if (!this._isShallow) {
      const c = /* @__PURE__ */ Ct(i);
      if (!/* @__PURE__ */ Ye(r) && !/* @__PURE__ */ Ct(r) && (i = /* @__PURE__ */ ne(i), r = /* @__PURE__ */ ne(r)), !o && /* @__PURE__ */ be(i) && !/* @__PURE__ */ be(r))
        return c || (i.value = r), !0;
    }
    const l = o ? Number(n) < t.length : ie(t, n), a = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ be(t) ? t : s
    );
    return t === /* @__PURE__ */ ne(s) && a && (l ? vt(r, i) && Dt(t, "set", n, r) : Dt(t, "add", n, r)), a;
  }
  deleteProperty(t, n) {
    const r = ie(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && r && Dt(t, "delete", n, void 0), s;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!et(n) || !Rl.has(n)) && Ie(t, "has", n), r;
  }
  ownKeys(t) {
    return Ie(
      t,
      "iterate",
      z(t) ? "length" : tn
    ), Reflect.ownKeys(t);
  }
}
class oc extends Ll {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const lc = /* @__PURE__ */ new Nl(), ac = /* @__PURE__ */ new oc(), uc = /* @__PURE__ */ new Nl(!0);
const Gs = (e) => e, wr = (e) => Reflect.getPrototypeOf(e);
function cc(e, t, n) {
  return function(...r) {
    const s = this.__v_raw, i = /* @__PURE__ */ ne(s), o = Wt(i), l = e === "entries" || e === Symbol.iterator && o, a = e === "keys" && o, c = s[e](...r), u = n ? Gs : t ? Ut : tt;
    return !t && Ie(
      i,
      "iterate",
      a ? Ys : tn
    ), ye(
      // inheriting all iterator properties
      Object.create(c),
      {
        // iterator protocol
        next() {
          const { value: f, done: h } = c.next();
          return h ? { value: f, done: h } : {
            value: l ? [u(f[0]), u(f[1])] : u(f),
            done: h
          };
        }
      }
    );
  };
}
function Cr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function fc(e, t) {
  const n = {
    get(s) {
      const i = this.__v_raw, o = /* @__PURE__ */ ne(i), l = /* @__PURE__ */ ne(s);
      e || (vt(s, l) && Ie(o, "get", s), Ie(o, "get", l));
      const { has: a } = wr(o), c = t ? Gs : e ? Ut : tt;
      if (a.call(o, s))
        return c(i.get(s));
      if (a.call(o, l))
        return c(i.get(l));
      i !== o && i.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && Ie(/* @__PURE__ */ ne(s), "iterate", tn), s.size;
    },
    has(s) {
      const i = this.__v_raw, o = /* @__PURE__ */ ne(i), l = /* @__PURE__ */ ne(s);
      return e || (vt(s, l) && Ie(o, "has", s), Ie(o, "has", l)), s === l ? i.has(s) : i.has(s) || i.has(l);
    },
    forEach(s, i) {
      const o = this, l = o.__v_raw, a = /* @__PURE__ */ ne(l), c = t ? Gs : e ? Ut : tt;
      return !e && Ie(a, "iterate", tn), l.forEach((u, f) => s.call(i, c(u), c(f), o));
    }
  };
  return ye(
    n,
    e ? {
      add: Cr("add"),
      set: Cr("set"),
      delete: Cr("delete"),
      clear: Cr("clear")
    } : {
      add(s) {
        const i = /* @__PURE__ */ ne(this), o = wr(i), l = /* @__PURE__ */ ne(s), a = !t && !/* @__PURE__ */ Ye(s) && !/* @__PURE__ */ Ct(s) ? l : s;
        return o.has.call(i, a) || vt(s, a) && o.has.call(i, s) || vt(l, a) && o.has.call(i, l) || (i.add(a), Dt(i, "add", a, a)), this;
      },
      set(s, i) {
        !t && !/* @__PURE__ */ Ye(i) && !/* @__PURE__ */ Ct(i) && (i = /* @__PURE__ */ ne(i));
        const o = /* @__PURE__ */ ne(this), { has: l, get: a } = wr(o);
        let c = l.call(o, s);
        c || (s = /* @__PURE__ */ ne(s), c = l.call(o, s));
        const u = a.call(o, s);
        return o.set(s, i), c ? vt(i, u) && Dt(o, "set", s, i) : Dt(o, "add", s, i), this;
      },
      delete(s) {
        const i = /* @__PURE__ */ ne(this), { has: o, get: l } = wr(i);
        let a = o.call(i, s);
        a || (s = /* @__PURE__ */ ne(s), a = o.call(i, s)), l && l.call(i, s);
        const c = i.delete(s);
        return a && Dt(i, "delete", s, void 0), c;
      },
      clear() {
        const s = /* @__PURE__ */ ne(this), i = s.size !== 0, o = s.clear();
        return i && Dt(
          s,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    n[s] = cc(s, e, t);
  }), n;
}
function vi(e, t) {
  const n = fc(e, t);
  return (r, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_isShallow" ? t : s === "__v_raw" ? r : Reflect.get(
    ie(n, s) && s in r ? n : r,
    s,
    i
  );
}
const dc = {
  get: /* @__PURE__ */ vi(!1, !1)
}, hc = {
  get: /* @__PURE__ */ vi(!1, !0)
}, mc = {
  get: /* @__PURE__ */ vi(!0, !1)
};
const Vl = /* @__PURE__ */ new WeakMap(), Bl = /* @__PURE__ */ new WeakMap(), Hl = /* @__PURE__ */ new WeakMap(), gc = /* @__PURE__ */ new WeakMap();
function vc(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function wt(e) {
  return /* @__PURE__ */ Ct(e) ? e : pi(
    e,
    !1,
    lc,
    dc,
    Vl
  );
}
// @__NO_SIDE_EFFECTS__
function pc(e) {
  return pi(
    e,
    !1,
    uc,
    hc,
    Bl
  );
}
// @__NO_SIDE_EFFECTS__
function Lr(e) {
  return pi(
    e,
    !0,
    ac,
    mc,
    Hl
  );
}
function pi(e, t, n, r, s) {
  if (!oe(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const i = s.get(e);
  if (i)
    return i;
  const o = vc(Hu(e));
  if (o === 0)
    return e;
  const l = new Proxy(
    e,
    o === 2 ? r : n
  );
  return s.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function jt(e) {
  return /* @__PURE__ */ Ct(e) ? /* @__PURE__ */ jt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Ct(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ye(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function ds(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ne(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ne(t) : e;
}
function yc(e) {
  return !ie(e, "__v_skip") && Object.isExtensible(e) && Sl(e, "__v_skip", !0), e;
}
const tt = (e) => oe(e) ? /* @__PURE__ */ wt(e) : e, Ut = (e) => oe(e) ? /* @__PURE__ */ Lr(e) : e;
// @__NO_SIDE_EFFECTS__
function be(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function de(e) {
  return Wl(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Fe(e) {
  return Wl(e, !0);
}
function Wl(e, t) {
  return /* @__PURE__ */ be(e) ? e : new bc(e, t);
}
class bc {
  constructor(t, n) {
    this.dep = new gi(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ ne(t), this._value = n ? t : tt(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Ye(t) || /* @__PURE__ */ Ct(t);
    t = r ? t : /* @__PURE__ */ ne(t), vt(t, n) && (this._rawValue = t, this._value = r ? t : tt(t), this.dep.trigger());
  }
}
function It(e) {
  return /* @__PURE__ */ be(e) ? e.value : e;
}
function Kt(e) {
  return G(e) ? e() : It(e);
}
const _c = {
  get: (e, t, n) => t === "__v_raw" ? e : It(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return /* @__PURE__ */ be(s) && !/* @__PURE__ */ be(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function jl(e) {
  return /* @__PURE__ */ jt(e) ? e : new Proxy(e, _c);
}
// @__NO_SIDE_EFFECTS__
function zl(e) {
  const t = z(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = Ul(e, n);
  return t;
}
class Sc {
  constructor(t, n, r) {
    this._object = t, this._defaultValue = r, this.__v_isRef = !0, this._value = void 0, this._key = et(n) ? n : String(n), this._raw = /* @__PURE__ */ ne(t);
    let s = !0, i = t;
    if (!z(t) || et(this._key) || !os(this._key))
      do
        s = !/* @__PURE__ */ ds(i) || /* @__PURE__ */ Ye(i);
      while (s && (i = i.__v_raw));
    this._shallow = s;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = It(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ be(this._raw[this._key])) {
      const n = this._object[this._key];
      if (/* @__PURE__ */ be(n)) {
        n.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return nc(this._raw, this._key);
  }
}
class wc {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function N(e, t, n) {
  return /* @__PURE__ */ be(e) ? e : G(e) ? new wc(e) : oe(e) && arguments.length > 1 ? Ul(e, t, n) : /* @__PURE__ */ de(e);
}
function Ul(e, t, n) {
  return new Sc(e, t, n);
}
class Cc {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new gi(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Gn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ge !== this)
      return Dl(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Ol(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function xc(e, t, n = !1) {
  let r, s;
  return G(e) ? r = e : (r = e.get, s = e.set), new Cc(r, s, n);
}
const xr = {}, Nr = /* @__PURE__ */ new WeakMap();
let Jt;
function kc(e, t = !1, n = Jt) {
  if (n) {
    let r = Nr.get(n);
    r || Nr.set(n, r = []), r.push(e);
  }
}
function Tc(e, t, n = fe) {
  const { immediate: r, deep: s, once: i, scheduler: o, augmentJob: l, call: a } = n, c = (w) => s ? w : /* @__PURE__ */ Ye(w) || s === !1 || s === 0 ? Pt(w, 1) : Pt(w);
  let u, f, h, g, T = !1, b = !1;
  if (/* @__PURE__ */ be(e) ? (f = () => e.value, T = /* @__PURE__ */ Ye(e)) : /* @__PURE__ */ jt(e) ? (f = () => c(e), T = !0) : z(e) ? (b = !0, T = e.some((w) => /* @__PURE__ */ jt(w) || /* @__PURE__ */ Ye(w)), f = () => e.map((w) => {
    if (/* @__PURE__ */ be(w))
      return w.value;
    if (/* @__PURE__ */ jt(w))
      return c(w);
    if (G(w))
      return a ? a(w, 2) : w();
  })) : G(e) ? t ? f = a ? () => a(e, 2) : e : f = () => {
    if (h) {
      _t();
      try {
        h();
      } finally {
        St();
      }
    }
    const w = Jt;
    Jt = u;
    try {
      return a ? a(e, 3, [g]) : e(g);
    } finally {
      Jt = w;
    }
  } : f = yt, t && s) {
    const w = f, F = s === !0 ? 1 / 0 : s;
    f = () => Pt(w(), F);
  }
  const p = Tl(), A = () => {
    u.stop(), p && p.active && ci(p.effects, u);
  };
  if (i && t) {
    const w = t;
    t = (...F) => {
      try {
        return w(...F);
      } finally {
        A();
      }
    };
  }
  let S = b ? new Array(e.length).fill(xr) : xr;
  const _ = (w) => {
    if (!(!(u.flags & 1) || !u.dirty && !w))
      if (t) {
        const F = u.run();
        if (w || s || T || (b ? F.some((B, I) => vt(B, S[I])) : vt(F, S))) {
          const B = Jt;
          _t();
          try {
            h && h(), Jt = u;
            const I = [
              F,
              // pass undefined as the old value when it's changed for the first time
              S === xr ? void 0 : b && S[0] === xr ? [] : S,
              g
            ];
            S = F, a ? a(t, 3, I) : (
              // @ts-expect-error
              t(...I)
            );
          } finally {
            Jt = B, St();
          }
        }
      } else
        u.run();
  };
  return l && l(_), u = new Al(f), u.scheduler = o ? () => o(_, !1) : _, g = (w) => kc(w, !1, u), h = u.onStop = () => {
    const w = Nr.get(u);
    if (w) {
      if (a)
        a(w, 4);
      else
        for (const F of w) F();
      Nr.delete(u);
    }
  }, t ? r ? _(!0) : S = u.run() : o ? o(_.bind(null, !0), !0) : u.run(), A.pause = u.pause.bind(u), A.resume = u.resume.bind(u), A.stop = A, A;
}
function Pt(e, t = 1 / 0, n) {
  if (t <= 0 || !oe(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ be(e))
    Pt(e.value, t, n);
  else if (z(e))
    for (let r = 0; r < e.length; r++)
      Pt(e[r], t, n);
  else if (Fr(e) || Wt(e))
    e.forEach((r) => {
      Pt(r, t, n);
    });
  else if (_l(e)) {
    for (const r in e)
      Pt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && Pt(e[r], t, n);
  }
  return e;
}
function fr(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (s) {
    hs(s, t, n);
  }
}
function nt(e, t, n, r) {
  if (G(e)) {
    const s = fr(e, t, n, r);
    return s && yl(s) && s.catch((i) => {
      hs(i, t, n, void 0, !0);
    }), s;
  }
  if (z(e)) {
    const s = [];
    for (let i = 0; i < e.length; i++)
      s.push(nt(e[i], t, n, r));
    return s;
  }
}
function hs(e, t, n, r = !0, s = !1) {
  const i = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: l } = t && t.appContext.config || fe;
  if (t) {
    let a = t.parent;
    const c = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const f = a.ec;
      if (f && !a.isUnmounted && // Async failures may outlive stopped scopes whose unmount effects
      // are deferred or discarded by Suspense.
      (!s || a.scope.active)) {
        for (let h = 0; h < f.length; h++)
          if (f[h](e, c, u) === !1)
            return;
      }
      a = a.parent;
    }
    if (o) {
      _t(), fr(o, null, 10, [
        e,
        c,
        u
      ]), St();
      return;
    }
  }
  Ac(e, n, i, r, l);
}
function Ac(e, t, n, r = !0, s = !1) {
  if (s)
    throw e;
  console.error(e);
}
const Ne = [];
let st = -1;
const mt = [];
let Bt = null, yn = 0;
const Kl = /* @__PURE__ */ Promise.resolve();
let Vr = null;
function zt(e) {
  const t = Vr || Kl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ec(e) {
  let t = st + 1, n = Ne.length;
  for (; t < n; ) {
    const r = t + n >>> 1, s = Ne[r], i = Zn(s);
    i < e || i === e && s.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function ms(e) {
  if (!(e.flags & 1)) {
    const t = Zn(e), n = Ne[Ne.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Zn(n) ? Ne.push(e) : Ne.splice(Ec(t), 0, e), e.flags |= 1, Yl();
  }
}
function Yl() {
  Vr || (Vr = Kl.then(Zl));
}
function Dc(e) {
  if (!z(e))
    Bt && e.id === -1 ? Bt.splice(yn + 1, 0, e) : e.flags & 1 || (mt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      mt.push(e[t]);
  Yl();
}
function Gl(e, t, n, r = st + 1) {
  for (; r < Ne.length; r++) {
    const s = Ne[r];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid || t !== void 0 && !(s.id >= t))
        continue;
      Ne.splice(r, 1), r = e ? r - 1 : st, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function ql(e, t, n = 0) {
  if (mt.length) {
    let r = mt, s = 0;
    if (t) {
      r = [];
      for (let o = 0; o < mt.length; o++) {
        const l = mt[o];
        (l.i !== void 0 ? !l.i || l.i.uid < n : t.has(l)) ? mt[s++] = l : r.push(l);
      }
    }
    const i = [...new Set(r)].sort((o, l) => Zn(o) - Zn(l));
    if (mt.length = s, Bt) {
      for (let o = 0; o < i.length; o++)
        Bt.push(i[o]);
      return;
    }
    for (Bt = i, yn = 0; yn < Bt.length; yn++) {
      const o = Bt[yn];
      o.flags & 4 && (o.flags &= -2), o.flags & 8 || o(), o.flags &= -2;
    }
    Bt = null, yn = 0;
  }
}
let Is = !1;
function Pc(e, t) {
  if (Is) {
    e();
    return;
  }
  const n = t === void 0 ? void 0 : new Set(mt);
  e(), Is = !0;
  try {
    Gl(void 0, t), ql(void 0, n, t);
  } finally {
    Is = !1;
  }
}
const Zn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Zl(e) {
  try {
    for (st = 0; st < Ne.length; st++) {
      const t = Ne[st];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), fr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; st < Ne.length; st++) {
      const t = Ne[st];
      t && (t.flags &= -2);
    }
    st = -1, Ne.length = 0, ql(), Vr = null, (Ne.length || mt.length) && Zl();
  }
}
let ze = null, Xl = null;
function Br(e) {
  const t = ze;
  return ze = e, Xl = e && e.type.__scopeId || null, t;
}
function At(e, t = ze, n) {
  if (!t || e._n)
    return e;
  const r = (...s) => {
    r._d && Ur(-1);
    const i = Br(t), o = rn.length;
    let l;
    try {
      l = e(...s);
    } finally {
      for (let a = rn.length; a > o; a--) ka();
      Br(i), r._d && Ur(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function dr(e, t) {
  if (ze === null)
    return e;
  const n = ys(ze), r = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, o, l, a = fe] = t[s];
    i && (G(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Pt(o), r.push({
      dir: i,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return e;
}
function Gt(e, t, n, r) {
  let s = e;
  if (r === "beforeMount")
    e._mount = e;
  else if (r === "beforeUpdate") {
    const l = t && t._mount;
    l && (l._latest = e, e._mount = l);
  } else if (r === "mounted") {
    const l = e._latest;
    e._mount = e._latest = void 0, l && (s = l, l._mount = void 0);
  }
  const i = s.dirs, o = t && t.dirs;
  for (let l = 0; l < i.length; l++) {
    let a = i[l];
    o ? a.oldValue = o[l].value : r === "mounted" && a.oldValue !== void 0 && (a = ye({}, a, { oldValue: void 0 }));
    let c = a.dir[r];
    c && (_t(), nt(c, n, 8, [
      e.el,
      a,
      s,
      t
    ]), St());
  }
}
function Tn(e, t) {
  if (Oe) {
    let n = Oe.provides;
    const r = Oe.parent && Oe.parent.provides;
    r === n && (n = Oe.provides = Object.create(r)), n[e] = t;
  }
}
function Ge(e, t, n = !1) {
  const r = vr();
  if (r || _n) {
    let s = _n ? _n._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && G(t) ? t.call(r && r.proxy) : t;
  }
}
const Ic = /* @__PURE__ */ Symbol.for("v-scx"), Oc = () => Ge(Ic);
function an(e, t) {
  return yi(e, null, t);
}
function Pe(e, t, n) {
  return yi(e, t, n);
}
function yi(e, t, n = fe) {
  const { immediate: r, deep: s, flush: i, once: o } = n, l = ye({}, n), a = t && r || !t && i !== "post";
  let c;
  if (rr) {
    if (i === "sync") {
      const g = Oc();
      c = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!a) {
      const g = () => {
      };
      return g.stop = yt, g.resume = yt, g.pause = yt, g;
    }
  }
  const u = Oe;
  l.call = (g, T, b) => nt(g, u, T, b);
  let f = !1;
  i === "post" ? l.scheduler = (g) => {
    g.i = u, Le(g, u && u.suspense);
  } : i !== "sync" && (f = !0, l.scheduler = (g, T) => {
    T ? g() : ms(g);
  }), l.augmentJob = (g) => {
    t && (g.flags |= 4), f && (g.flags |= 2, u && (g.id = u.uid, g.i = u));
  };
  const h = Tc(e, t, l);
  return rr && (c ? c.push(h) : a && h()), h;
}
function $c(e, t, n) {
  const r = this.proxy, s = pe(e) ? e.includes(".") ? Jl(r, e) : () => r[e] : e.bind(r, r);
  let i;
  G(t) ? i = t : (i = t.handler, n = t);
  const o = pr(this), l = yi(s, i.bind(r), n);
  return o(), l;
}
function Jl(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
const Mc = /* @__PURE__ */ Symbol("_vte"), gs = (e) => e.__isTeleport, We = /* @__PURE__ */ Symbol("_leaveCb"), On = /* @__PURE__ */ Symbol("_enterCb");
function Ql() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return mr(() => {
    e.isMounted = !0;
  }), An(() => {
    e.isUnmounting = !0;
  }), e;
}
const Je = [Function, Array], ea = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Je,
  onEnter: Je,
  onAfterEnter: Je,
  onEnterCancelled: Je,
  // leave
  onBeforeLeave: Je,
  onLeave: Je,
  onAfterLeave: Je,
  onLeaveCancelled: Je,
  // appear
  onBeforeAppear: Je,
  onAppear: Je,
  onAfterAppear: Je,
  onAppearCancelled: Je
}, Fc = {
  name: "BaseTransition",
  props: ea,
  setup(e, { slots: t }) {
    const n = vr(), r = Ql();
    return () => {
      const s = t.default && bi(t.default(), !0), i = s && s.length ? ta(s) : (
        // Keep explicit default-slot conditionals on the same transition path
        // as regular v-if branches, which render a comment placeholder.
        n.subTree ? Qe() : void 0
      );
      if (!i)
        return;
      const o = /* @__PURE__ */ ne(e), { mode: l } = o;
      if (r.isLeaving)
        return Os(i);
      const a = Hr(i);
      if (!a)
        return Os(i);
      const c = Xn(
        a,
        o,
        r,
        n
      );
      a.type !== $e && Ot(a, c);
      let u = n.subTree && Hr(n.subTree);
      if (u && u.type !== $e && !Qt(u, a) && Jn(n.subTree)) {
        let f = Xn(
          u,
          o,
          r,
          n
        );
        if (Ot(u, f), l === "out-in" && a.type !== $e)
          return r.isLeaving = !0, f.afterLeave = () => {
            if (r.isLeaving = !1, !(n.job.flags & 8))
              if (n.effect.flags & 2) {
                const h = () => {
                  n.job.flags & 8 || n.update();
                };
                h.i = n, ms(h);
              } else
                n.update();
            delete f.afterLeave, u = void 0;
          }, Os(i);
        l === "in-out" && a.type !== $e ? f.delayLeave = (h, g, T) => {
          const b = na(
            r,
            u
          );
          b[String(u.key)] = u, h[We] = () => {
            g(), h[We] = void 0, delete c.delayedLeave, u = void 0;
          }, c.delayedLeave = () => {
            T(), delete c.delayedLeave, u = void 0;
          };
        } : u = void 0;
      } else u && (u = void 0);
      return i;
    };
  }
};
function ta(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== $e) {
        t = n;
        break;
      }
  }
  return t;
}
const Rc = Fc;
function na(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Xn(e, t, n, r) {
  const {
    appear: s,
    mode: i,
    persisted: o = !1,
    onBeforeEnter: l,
    onEnter: a,
    onAfterEnter: c,
    onEnterCancelled: u,
    onBeforeLeave: f,
    onLeave: h,
    onAfterLeave: g,
    onLeaveCancelled: T,
    onBeforeAppear: b,
    onAppear: p,
    onAfterAppear: A,
    onAppearCancelled: S
  } = t, _ = String(e.key), w = na(n, e), F = (M, L) => {
    M && nt(
      M,
      r,
      9,
      L
    );
  }, B = (M, L) => {
    const K = L[1];
    F(M, L), z(M) ? M.every((U) => U.length <= 1) && K() : M.length <= 1 && K();
  }, I = {
    mode: i,
    persisted: o,
    beforeEnter(M) {
      let L = l;
      if (!n.isMounted)
        if (s)
          L = b || l;
        else
          return;
      M[We] && M[We](
        !0
        /* cancelled */
      );
      const K = w[_];
      if (K && Qt(e, K)) {
        let U = K.el[We];
        if (!U) {
          const D = Jn(K);
          U = D && D.el[We];
        }
        U && U();
      }
      F(L, [M]);
    },
    enter(M) {
      if (M[We]) {
        I.delayedLeave && I.delayedLeave();
        return;
      }
      let L = a, K = c, U = u;
      if (!n.isMounted)
        if (s)
          L = p || a, K = A || c, U = S || u;
        else
          return;
      let D = !1;
      M[On] = (ee) => {
        D || (D = !0, ee ? F(U, [M]) : F(K, [M]), I.delayedLeave && I.delayedLeave(), M[On] = void 0);
      };
      const X = M[On].bind(null, !1);
      L ? B(L, [M, X]) : X();
    },
    leave(M, L) {
      const K = String(e.key);
      if (M[On] && M[On](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return L();
      F(f, [M]);
      let U = !1;
      M[We] = (X) => {
        U || (U = !0, L(), X ? F(T, [M]) : F(g, [M]), M[We] = void 0, w[K] === e && delete w[K]);
      };
      const D = M[We].bind(null, !1);
      w[K] = e, h ? B(h, [M, D]) : D();
    },
    clone(M) {
      const L = Xn(M, t, n, r);
      return L.afterLeave = () => {
        I.afterLeave && I.afterLeave();
      }, L.delayLeave = (K, U, D) => {
        I.delayLeave ? I.delayLeave(K, U, D) : D();
      }, L.delayedLeave = () => {
        I.delayedLeave && I.delayedLeave();
      }, L;
    }
  };
  return I;
}
function Os(e) {
  if (vs(e))
    return e = $t(e), e.children = null, e;
}
function Hr(e) {
  if (!vs(e))
    return gs(e.type) && e.children ? ta(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && G(n.default))
      return n.default();
  }
}
function Ot(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Ot(
      gs(n.type) && Hr(n) || n,
      t
    );
  } else if (e.shapeFlag & 128) {
    const n = e.suspense;
    if (n) {
      const r = n.isHydrating ? n.pendingBranch : n.activeBranch;
      r && Ot(r, t.clone(r));
    } else
      e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  } else if (e.transition = t, e.type === le && z(e.children)) {
    const n = da(e.children, !1);
    n && Ot(n, t);
  }
}
function bi(e, t = !1, n) {
  let r = [], s = 0;
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
    o.type === le ? (o.patchFlag & 128 && s++, r = r.concat(
      bi(o.children, t, l)
    )) : (t || o.type !== $e) && r.push(l != null ? $t(o, { key: l }) : o);
  }
  if (s > 1)
    for (let i = 0; i < r.length; i++)
      r[i].patchFlag = -2;
  return r;
}
function Jn(e) {
  if (e.component)
    return Jn(e.component.subTree);
  if (e.type === le) {
    const t = z(e.children) && da(e.children, !1);
    return t ? Jn(t) : void 0;
  }
  if (e.type !== $e)
    return e;
}
// @__NO_SIDE_EFFECTS__
function Lc(e, t) {
  return G(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ye({ name: e.name }, t, { setup: e })
  ) : e;
}
function hr() {
  const e = vr();
  return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : "";
}
function ra(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function to(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Wr = /* @__PURE__ */ new WeakMap();
function Hn(e, t, n, r, s = !1) {
  if (z(e)) {
    e.forEach(
      (b, p) => Hn(
        b,
        t && (z(t) ? t[p] : t),
        n,
        r,
        s
      )
    );
    return;
  }
  if (Wn(r) && !s) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Hn(e, t, n, r.component.subTree);
    return;
  }
  const i = r.shapeFlag & 4 ? ys(r.component) : r.el, o = s ? null : i, { i: l, r: a } = e, c = t && t.r, u = l.refs === fe ? l.refs = {} : l.refs, f = l.setupState, h = /* @__PURE__ */ ne(f), g = f === fe ? pl : (b) => to(u, b) ? !1 : ie(h, b), T = (b, p) => !(p && to(u, p));
  if (c != null && c !== a) {
    if (no(t), pe(c))
      u[c] = null, g(c) && (f[c] = null);
    else if (/* @__PURE__ */ be(c)) {
      const b = t;
      T(c, b.k) && (c.value = null), b.k && (u[b.k] = null);
    }
  }
  if (G(a))
    fr(a, l, 12, [o, u]);
  else {
    const b = pe(a), p = /* @__PURE__ */ be(a);
    if (b || p) {
      const A = () => {
        if (e.f) {
          const S = b ? g(a) ? f[a] : u[a] : T() || !e.k ? a.value : u[e.k];
          if (s)
            z(S) && ci(S, i);
          else if (z(S))
            S.includes(i) || S.push(i);
          else if (b)
            u[a] = [i], g(a) && (f[a] = u[a]);
          else {
            const _ = [i];
            T(a, e.k) && (a.value = _), e.k && (u[e.k] = _);
          }
        } else b ? (u[a] = o, g(a) && (f[a] = o)) : p && (T(a, e.k) && (a.value = o), e.k && (u[e.k] = o));
      };
      if (o) {
        const S = () => {
          A(), Wr.delete(e);
        };
        S.id = -1, Wr.set(e, S), Le(S, n);
      } else
        no(e), A();
    }
  }
}
function no(e) {
  const t = Wr.get(e);
  t && (t.flags |= 8, Wr.delete(e));
}
as().requestIdleCallback;
as().cancelIdleCallback;
const Wn = (e) => !!e.type.__asyncLoader, vs = (e) => e.type.__isKeepAlive;
function Nc(e, t) {
  sa(e, "a", t);
}
function Vc(e, t) {
  sa(e, "da", t);
}
function sa(e, t, n = Oe) {
  const r = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Qn(t, r, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      vs(s.parent.vnode) && Bc(r, t, n, s), s = s.parent;
  }
}
function Bc(e, t, n, r) {
  const s = Qn(
    t,
    e,
    r,
    !0
    /* prepend */
  ), i = Qn(
    "um",
    () => ci(r[t], s),
    n
  );
  i.flags = 16;
}
function Qn(e, t, n = Oe, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      _t();
      const l = pr(n), a = nt(t, n, e, o);
      return l(), St(), a;
    });
    return r ? s.unshift(i) : s.push(i), i;
  }
}
const Mt = (e) => (t, n = Oe) => {
  (!rr || e === "sp") && Qn(e, (...r) => t(...r), n);
}, ia = Mt("bm"), mr = Mt("m"), Hc = Mt(
  "bu"
), _i = Mt("u"), An = Mt(
  "bum"
), Wc = Mt("um"), jc = Mt(
  "sp"
), zc = Mt("rtg"), Uc = Mt("rtc");
function Kc(e, t = Oe) {
  Qn("ec", e, t);
}
const oa = "components";
function jr(e, t) {
  return la(oa, e, !0, t) || e;
}
const Yc = /* @__PURE__ */ Symbol.for("v-ndc");
function Gc(e) {
  return pe(e) && la(oa, e, !1) || e;
}
function la(e, t, n = !0, r = !1) {
  const s = ze || Oe;
  if (s) {
    const i = s.type;
    {
      const l = Of(
        i,
        !1
      );
      if (l && (l === t || l === Me(t) || l === kn(Me(t))))
        return i;
    }
    const o = (
      // local registration
      // check instance[type] first which is resolved for options API
      ro(s[e] || i[e], t) || // global registration
      ro(s.appContext[e], t)
    );
    return !o && r ? i : o;
  }
}
function ro(e, t) {
  return e && (e[t] || e[Me(t)] || e[kn(Me(t))]);
}
function nn(e, t, n, r) {
  let s;
  const i = n, o = z(e);
  if (o || pe(e)) {
    const l = o && /* @__PURE__ */ jt(e);
    let a = !1, c = !1;
    l && (a = !/* @__PURE__ */ Ye(e), c = /* @__PURE__ */ Ct(e), e = fs(e)), s = new Array(e.length);
    for (let u = 0, f = e.length; u < f; u++)
      s[u] = t(
        a ? c ? Ut(tt(e[u])) : tt(e[u]) : e[u],
        u,
        void 0,
        i
      );
  } else if (typeof e == "number")
    if (!Number.isInteger(e) || e < 0)
      s = [];
    else {
      s = new Array(e);
      for (let l = 0; l < e; l++)
        s[l] = t(l + 1, l, void 0, i);
    }
  else if (oe(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (l, a) => t(l, a, void 0, i)
      );
    else {
      const l = Object.keys(e);
      s = new Array(l.length);
      for (let a = 0, c = l.length; a < c; a++) {
        const u = l[a];
        s[a] = t(e[u], u, a, i);
      }
    }
  else
    s = [];
  return s;
}
const qs = (e) => e ? Pa(e) ? ys(e) : qs(e.parent) : null, jn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ye(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => qs(e.parent),
    $root: (e) => qs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ua(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ms(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = zt.bind(e.proxy)),
    $watch: (e) => $c.bind(e)
  })
), $s = (e, t) => e !== fe && !e.__isScriptSetup && ie(e, t), qc = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: s, props: i, accessCache: o, type: l, appContext: a } = e;
    if (t[0] !== "$") {
      const h = o[t];
      if (h !== void 0)
        switch (h) {
          case 1:
            return r[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if ($s(r, t))
          return o[t] = 1, r[t];
        if (s !== fe && ie(s, t))
          return o[t] = 2, s[t];
        if (ie(i, t))
          return o[t] = 3, i[t];
        if (n !== fe && ie(n, t))
          return o[t] = 4, n[t];
        Zs && (o[t] = 0);
      }
    }
    const c = jn[t];
    let u, f;
    if (c)
      return t === "$attrs" && Ie(e.attrs, "get", ""), c(e);
    if (
      // css module (injected by vue-loader)
      (u = l.__cssModules) && (u = u[t])
    )
      return u;
    if (n !== fe && ie(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      f = a.config.globalProperties, ie(f, t)
    )
      return f[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: s, ctx: i } = e;
    return $s(s, t) ? (s[t] = n, !0) : r !== fe && ie(r, t) ? (r[t] = n, !0) : ie(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, props: i, type: o }
  }, l) {
    let a;
    return !!(n[l] || e !== fe && l[0] !== "$" && ie(e, l) || $s(t, l) || ie(i, l) || ie(r, l) || ie(jn, l) || ie(s.config.globalProperties, l) || (a = o.__cssModules) && a[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ie(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function so(e) {
  return z(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Zs = !0;
function Zc(e) {
  const t = ua(e), n = e.proxy, r = e.ctx;
  Zs = !1, t.beforeCreate && io(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: i,
    methods: o,
    watch: l,
    provide: a,
    inject: c,
    // lifecycle
    created: u,
    beforeMount: f,
    mounted: h,
    beforeUpdate: g,
    updated: T,
    activated: b,
    deactivated: p,
    beforeDestroy: A,
    beforeUnmount: S,
    destroyed: _,
    unmounted: w,
    render: F,
    renderTracked: B,
    renderTriggered: I,
    errorCaptured: M,
    serverPrefetch: L,
    // public API
    expose: K,
    inheritAttrs: U,
    // assets
    components: D,
    directives: X,
    filters: ee
  } = t;
  if (c && Xc(c, r, null), o)
    for (const J in o) {
      const q = o[J];
      G(q) && (r[J] = q.bind(n));
    }
  if (s) {
    const J = s.call(n, n);
    oe(J) && (e.data = /* @__PURE__ */ wt(J));
  }
  if (Zs = !0, i)
    for (const J in i) {
      const q = i[J], Se = G(q) ? q.bind(n, n) : G(q.get) ? q.get.bind(n, n) : yt, Ae = !G(q) && G(q.set) ? q.set.bind(n) : yt, ke = H({
        get: Se,
        set: Ae
      });
      Object.defineProperty(r, J, {
        enumerable: !0,
        configurable: !0,
        get: () => ke.value,
        set: (me) => ke.value = me
      });
    }
  if (l)
    for (const J in l)
      aa(l[J], r, n, J);
  if (a) {
    const J = G(a) ? a.call(n) : a;
    Reflect.ownKeys(J).forEach((q) => {
      Tn(q, J[q]);
    });
  }
  u && io(u, e, "c");
  function ae(J, q) {
    z(q) ? q.forEach((Se) => J(Se.bind(n))) : q && J(q.bind(n));
  }
  if (ae(ia, f), ae(mr, h), ae(Hc, g), ae(_i, T), ae(Nc, b), ae(Vc, p), ae(Kc, M), ae(Uc, B), ae(zc, I), ae(An, S), ae(Wc, w), ae(jc, L), z(K))
    if (K.length) {
      const J = e.exposed || (e.exposed = {});
      K.forEach((q) => {
        Object.defineProperty(J, q, {
          get: () => n[q],
          set: (Se) => n[q] = Se,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  F && e.render === yt && (e.render = F), U != null && (e.inheritAttrs = U), D && (e.components = D), X && (e.directives = X), L && ra(e);
}
function Xc(e, t, n = yt) {
  z(e) && (e = Xs(e));
  for (const r in e) {
    const s = e[r];
    let i;
    oe(s) ? "default" in s ? i = Ge(
      s.from || r,
      s.default,
      !0
    ) : i = Ge(s.from || r) : i = Ge(s), /* @__PURE__ */ be(i) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[r] = i;
  }
}
function io(e, t, n) {
  nt(
    z(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function aa(e, t, n, r) {
  let s = r.includes(".") ? Jl(n, r) : () => n[r];
  if (pe(e)) {
    const i = t[e];
    G(i) && Pe(s, i);
  } else if (G(e))
    Pe(s, e.bind(n));
  else if (oe(e))
    if (z(e))
      e.forEach((i) => aa(i, t, n, r));
    else {
      const i = G(e.handler) ? e.handler.bind(n) : t[e.handler];
      G(i) && Pe(s, i, e);
    }
}
function ua(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: s,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = i.get(t);
  let a;
  return l ? a = l : !s.length && !n && !r ? a = t : (a = {}, s.length && s.forEach(
    (c) => zr(a, c, o, !0)
  ), zr(a, t, o)), oe(t) && i.set(t, a), a;
}
function zr(e, t, n, r = !1) {
  const { mixins: s, extends: i } = t;
  i && zr(e, i, n, !0), s && s.forEach(
    (o) => zr(e, o, n, !0)
  );
  for (const o in t)
    if (!(r && o === "expose")) {
      const l = Jc[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const Jc = {
  data: oo,
  props: lo,
  emits: lo,
  // objects
  methods: Fn,
  computed: Fn,
  // lifecycle
  beforeCreate: Re,
  created: Re,
  beforeMount: Re,
  mounted: Re,
  beforeUpdate: Re,
  updated: Re,
  beforeDestroy: Re,
  beforeUnmount: Re,
  destroyed: Re,
  unmounted: Re,
  activated: Re,
  deactivated: Re,
  errorCaptured: Re,
  serverPrefetch: Re,
  // assets
  components: Fn,
  directives: Fn,
  // watch
  watch: ef,
  // provide / inject
  provide: oo,
  inject: Qc
};
function oo(e, t) {
  return t ? e ? function() {
    return ye(
      G(e) ? e.call(this, this) : e,
      G(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Qc(e, t) {
  return Fn(Xs(e), Xs(t));
}
function Xs(e) {
  if (z(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Re(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Fn(e, t) {
  return e ? ye(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function lo(e, t) {
  return e ? z(e) && z(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ye(
    /* @__PURE__ */ Object.create(null),
    so(e),
    so(t ?? {})
  ) : t;
}
function ef(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ye(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Re(e[r], t[r]);
  return n;
}
function ca() {
  return {
    app: null,
    config: {
      isNativeTag: pl,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let tf = 0;
function nf(e, t) {
  return function(r, s = null) {
    G(r) || (r = ye({}, r)), s != null && !oe(s) && (s = null);
    const i = ca(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const c = i.app = {
      _uid: tf++,
      _component: r,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: Mf,
      get config() {
        return i.config;
      },
      set config(u) {
      },
      use(u, ...f) {
        return o.has(u) || (u && G(u.install) ? (o.add(u), u.install(c, ...f)) : G(u) && (o.add(u), u(c, ...f))), c;
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), c;
      },
      component(u, f) {
        return f ? (i.components[u] = f, c) : i.components[u];
      },
      directive(u, f) {
        return f ? (i.directives[u] = f, c) : i.directives[u];
      },
      mount(u, f, h) {
        if (!a) {
          const g = c._ceVNode || V(r, s);
          return g.appContext = i, h === !0 ? h = "svg" : h === !1 && (h = void 0), e(g, u, h), a = !0, c._container = u, u.__vue_app__ = c, ys(g.component);
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        a && (nt(
          l,
          c._instance,
          16
        ), e(null, c._container), delete c._container.__vue_app__);
      },
      provide(u, f) {
        return i.provides[u] = f, c;
      },
      runWithContext(u) {
        const f = _n;
        _n = c;
        try {
          return u();
        } finally {
          _n = f;
        }
      }
    };
    return c;
  };
}
let _n = null;
const rf = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Me(t)}Modifiers`] || e[`${cn(t)}Modifiers`];
function sf(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || fe;
  let s = n;
  const i = t.startsWith("update:"), o = i && rf(r, t.slice(7));
  o && (o.trim && (s = n.map((u) => pe(u) ? u.trim() : u)), o.number && (s = s.map(fi)));
  let l, a = r[l = Ts(t)] || // also try camelCase event handler (#2249)
  r[l = Ts(Me(t))];
  !a && i && (a = r[l = Ts(cn(t))]), a && nt(
    a,
    e,
    6,
    s
  );
  const c = r[l + "Once"];
  if (c) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, nt(
      c,
      e,
      6,
      s
    );
  }
}
const of = /* @__PURE__ */ new WeakMap();
function fa(e, t, n = !1) {
  const r = n ? of : t.emitsCache, s = r.get(e);
  if (s !== void 0)
    return s;
  const i = e.emits;
  let o = {}, l = !1;
  if (!G(e)) {
    const a = (c) => {
      const u = fa(c, t, !0);
      u && (l = !0, ye(o, u));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !l ? (oe(e) && r.set(e, null), null) : (z(i) ? i.forEach((a) => o[a] = null) : ye(o, i), oe(e) && r.set(e, o), o);
}
function ps(e, t) {
  return !e || !ss(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ie(e, t[0].toLowerCase() + t.slice(1)) || ie(e, cn(t)) || ie(e, t));
}
function ao(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    propsOptions: [i],
    slots: o,
    attrs: l,
    emit: a,
    render: c,
    renderCache: u,
    props: f,
    data: h,
    setupState: g,
    ctx: T,
    inheritAttrs: b
  } = e, p = Br(e);
  let A, S;
  try {
    if (n.shapeFlag & 4) {
      const w = s || r, F = w;
      A = gt(
        c.call(
          F,
          w,
          u,
          f,
          g,
          h,
          T
        )
      ), S = l;
    } else {
      const w = t;
      A = gt(
        w.length > 1 ? w(
          f,
          { attrs: l, slots: o, emit: a }
        ) : w(
          f,
          null
        )
      ), S = t.props ? l : lf(l);
    }
  } catch (w) {
    rn.length = 0, hs(w, e, 1), A = V($e);
  }
  let _ = A;
  if (S && b !== !1) {
    const w = Object.keys(S), { shapeFlag: F } = _;
    w.length && F & 7 && (i && w.some(is) && (S = af(
      S,
      i
    )), _ = $t(_, S, !1, !0));
  }
  if (n.dirs && (_ = $t(_, null, !1, !0), _.dirs = _.dirs ? _.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const w = gs(_.type) && Hr(_) || _;
    Ot(w, n.transition);
  }
  return A = _, Br(p), A;
}
function da(e, t = !0) {
  let n;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (tr(s)) {
      if (s.type !== $e || s.children === "v-if") {
        if (n)
          return;
        n = s;
      }
    } else
      return;
  }
  return n;
}
const lf = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || ss(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, af = (e, t) => {
  const n = {};
  for (const r in e)
    (!is(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function uf(e, t, n) {
  const { props: r, children: s, component: i } = e, { props: o, children: l, patchFlag: a } = t, c = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return r ? uo(r, o, c) : !!o;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const h = u[f];
        if (ha(o, r, h) && !ps(c, h))
          return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : r === o ? !1 : r ? o ? uo(r, o, c) : !0 : !!o;
  return !1;
}
function uo(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < r.length; s++) {
    const i = r[s];
    if (!ie(e, i) || ha(t, e, i) && !ps(n, i))
      return !0;
  }
  return !1;
}
function ha(e, t, n) {
  const r = e[n], s = t[n];
  return n === "style" && oe(r) && oe(s) ? !us(r, s) : r !== s;
}
function cf({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.suspense.vnode.el = s.el = r, e = s), s === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const ma = {}, ga = () => Object.create(ma), va = (e) => Object.getPrototypeOf(e) === ma;
function ff(e, t, n, r = !1) {
  const s = {}, i = ga();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), pa(e, t, s, i);
  for (const o in e.propsOptions[0])
    o in s || (s[o] = void 0);
  n ? e.props = r ? s : /* @__PURE__ */ pc(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i;
}
function df(e, t, n, r) {
  const {
    props: s,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, l = /* @__PURE__ */ ne(s), [a] = e.propsOptions;
  let c = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const u = e.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let h = u[f];
        if (ps(e.emitsOptions, h))
          continue;
        const g = t[h];
        if (a)
          if (ie(i, h))
            g !== i[h] && (i[h] = g, c = !0);
          else {
            const T = Me(h);
            s[T] = Js(
              a,
              l,
              T,
              g,
              e,
              !1
            );
          }
        else
          g !== i[h] && (i[h] = g, c = !0);
      }
    }
  } else {
    pa(e, t, s, i) && (c = !0);
    let u;
    for (const f in l)
      (!t || // for camelCase
      !ie(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = cn(f)) === f || !ie(t, u))) && (a ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[u] !== void 0) && (s[f] = Js(
        a,
        l,
        f,
        void 0,
        e,
        !0
      )) : delete s[f]);
    if (i !== l)
      for (const f in i)
        (!t || !ie(t, f)) && (delete i[f], c = !0);
  }
  c && Dt(e.attrs, "set", "");
}
function pa(e, t, n, r) {
  const [s, i] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let a in t) {
      if (Nn(a))
        continue;
      const c = t[a];
      let u;
      s && ie(s, u = Me(a)) ? !i || !i.includes(u) ? n[u] = c : (l || (l = {}))[u] = c : ps(e.emitsOptions, a) || (!(a in r) || c !== r[a]) && (r[a] = c, o = !0);
    }
  if (i) {
    const a = /* @__PURE__ */ ne(n), c = l || fe;
    for (let u = 0; u < i.length; u++) {
      const f = i[u];
      n[f] = Js(
        s,
        a,
        f,
        c[f],
        e,
        !ie(c, f)
      );
    }
  }
  return o;
}
function Js(e, t, n, r, s, i) {
  const o = e[n];
  if (o != null) {
    const l = ie(o, "default");
    if (l && r === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && G(a)) {
        const { propsDefaults: c } = s;
        if (n in c)
          r = c[n];
        else {
          const u = pr(s);
          r = c[n] = a.call(
            null,
            t
          ), u();
        }
      } else
        r = a;
      s.ce && s.ce._setProp(n, r);
    }
    o[
      0
      /* shouldCast */
    ] && (i && !l ? r = !1 : o[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === cn(n)) && (r = !0));
  }
  return r;
}
const hf = /* @__PURE__ */ new WeakMap();
function ya(e, t, n = !1) {
  const r = n ? hf : t.propsCache, s = r.get(e);
  if (s)
    return s;
  const i = e.props, o = {}, l = [];
  let a = !1;
  if (!G(e)) {
    const u = (f) => {
      a = !0;
      const [h, g] = ya(f, t, !0);
      ye(o, h), g && l.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!i && !a)
    return oe(e) && r.set(e, en), en;
  if (z(i))
    for (let u = 0; u < i.length; u++) {
      const f = Me(i[u]);
      co(f) && (o[f] = fe);
    }
  else if (i)
    for (const u in i) {
      const f = Me(u);
      if (co(f)) {
        const h = i[u], g = o[f] = z(h) || G(h) ? { type: h } : ye({}, h), T = g.type;
        let b = !1, p = !0;
        if (z(T))
          for (let A = 0; A < T.length; ++A) {
            const S = T[A], _ = G(S) && S.name;
            if (_ === "Boolean") {
              b = !0;
              break;
            } else _ === "String" && (p = !1);
          }
        else
          b = G(T) && T.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = b, g[
          1
          /* shouldCastTrue */
        ] = p, (b || ie(g, "default")) && l.push(f);
      }
    }
  const c = [o, l];
  return oe(e) && r.set(e, c), c;
}
function co(e) {
  return e[0] !== "$" && !Nn(e);
}
const Si = (e) => e === "_" || e === "_ctx" || e === "$stable", wi = (e) => z(e) ? e.map(gt) : [gt(e)], mf = (e, t, n) => {
  if (t._n)
    return t;
  const r = At((...s) => wi(t(...s)), n);
  return r._c = !1, r;
}, ba = (e, t, n) => {
  const r = e._ctx;
  for (const s in e) {
    if (Si(s)) continue;
    const i = e[s];
    if (G(i))
      t[s] = mf(s, i, r);
    else if (i != null) {
      const o = wi(i);
      t[s] = () => o;
    }
  }
}, _a = (e, t) => {
  const n = wi(t);
  e.slots.default = () => n;
}, Sa = (e, t, n) => {
  for (const r in t)
    (n || !Si(r)) && (e[r] = t[r]);
}, gf = (e, t, n) => {
  const r = e.slots = ga();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Sa(r, t, n), n && Sl(r, "_", s, !0)) : ba(t, r);
  } else t && _a(e, t);
}, vf = (e, t, n) => {
  const { vnode: r, slots: s } = e;
  let i = !0, o = fe;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? i = !1 : Sa(s, t, n) : (i = !t.$stable, ba(t, s)), o = t;
  } else t && (_a(e, t), o = { default: 1 });
  if (i)
    for (const l in s)
      !Si(l) && o[l] == null && delete s[l];
}, Le = wf;
function pf(e) {
  return yf(e);
}
function yf(e, t) {
  const n = as();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: s,
    patchProp: i,
    createElement: o,
    createText: l,
    createComment: a,
    setText: c,
    setElementText: u,
    parentNode: f,
    nextSibling: h,
    setScopeId: g = yt,
    insertStaticContent: T
  } = e, b = (d, m, y, E = null, C = null, k = null, $ = void 0, O = null, P = !!m.dynamicChildren) => {
    if (d === m)
      return;
    d && !Qt(d, m) && (E = Lt(d), me(d, C, k, !0), d = null), m.patchFlag === -2 && (P = !1, m.dynamicChildren = null), m.dynamicChildren && d && d.dynamicChildren && d.dynamicChildren.hasOnce && (m.dynamicChildren === en && (m.dynamicChildren = []), m.dynamicChildren.hasOnce = !0);
    const { type: x, ref: W, shapeFlag: R } = m;
    switch (x) {
      case gr:
        p(d, m, y, E);
        break;
      case $e:
        A(d, m, y, E);
        break;
      case Fs:
        d == null && S(m, y, E, $);
        break;
      case le:
        D(
          d,
          m,
          y,
          E,
          C,
          k,
          $,
          O,
          P
        );
        break;
      default:
        R & 1 ? F(
          d,
          m,
          y,
          E,
          C,
          k,
          $,
          O,
          P
        ) : R & 6 ? X(
          d,
          m,
          y,
          E,
          C,
          k,
          $,
          O,
          P
        ) : (R & 64 || R & 128) && x.process(
          d,
          m,
          y,
          E,
          C,
          k,
          $,
          O,
          P,
          Yt
        );
    }
    W != null && C ? Hn(W, d && d.ref, k, m || d, !m) : W == null && d && d.ref != null && Hn(d.ref, null, k, d, !0);
  }, p = (d, m, y, E) => {
    if (d == null)
      r(
        m.el = l(m.children),
        y,
        E
      );
    else {
      const C = m.el = d.el;
      m.children !== d.children && c(C, m.children);
    }
  }, A = (d, m, y, E) => {
    d == null ? r(
      m.el = a(m.children || ""),
      y,
      E
    ) : m.el = d.el;
  }, S = (d, m, y, E) => {
    [d.el, d.anchor] = T(
      d.children,
      m,
      y,
      E,
      d.el,
      d.anchor
    );
  }, _ = ({ el: d, anchor: m }, y, E) => {
    let C;
    for (; d && d !== m; )
      C = h(d), r(d, y, E), d = C;
    r(m, y, E);
  }, w = ({ el: d, anchor: m }) => {
    let y;
    for (; d && d !== m; )
      y = h(d), s(d), d = y;
    s(m);
  }, F = (d, m, y, E, C, k, $, O, P) => {
    if (m.type === "svg" ? $ = "svg" : m.type === "math" && ($ = "mathml"), d == null)
      B(
        m,
        y,
        E,
        C,
        k,
        $,
        O,
        P
      );
    else {
      const x = d.el && d.el._isVueCE ? d.el : null;
      try {
        x && x._beginPatch(), L(
          d,
          m,
          C,
          k,
          $,
          O,
          P
        );
      } finally {
        x && x._endPatch();
      }
    }
  }, B = (d, m, y, E, C, k, $, O) => {
    let P, x;
    const { props: W, shapeFlag: R, transition: j, dirs: Y } = d;
    if (P = d.el = o(
      d.type,
      k,
      W && W.is,
      W
    ), R & 8 ? u(P, d.children) : R & 16 && M(
      d.children,
      P,
      null,
      E,
      C,
      Ms(d, k),
      $,
      O
    ), Y && Gt(d, null, E, "created"), I(P, d, d.scopeId, $, E), W) {
      for (const ce in W)
        ce !== "value" && !Nn(ce) && i(P, ce, null, W[ce], k, E);
      "value" in W && i(P, "value", null, W.value, k), (x = W.onVnodeBeforeMount) && ft(x, E, d);
    }
    Y && Gt(d, null, E, "beforeMount");
    const re = bf(C, j);
    re ? j.beforeEnter(P) : j && !j.persisted && (P[Sf] = !0), r(P, m, y), ((x = W && W.onVnodeMounted) || re || Y) && Le(() => {
      x && ft(x, E, d), re && j.enter(P), Y && Gt(d, null, E, "mounted");
    }, C);
  }, I = (d, m, y, E, C) => {
    if (y && g(d, y), E)
      for (let k = 0; k < E.length; k++)
        g(d, E[k]);
    if (C) {
      let k = C.subTree;
      if (m === k || xa(k.type) && (k.ssContent === m || k.ssFallback === m)) {
        const $ = C.vnode;
        I(
          d,
          $,
          $.scopeId,
          $.slotScopeIds,
          C.parent
        );
      }
    }
  }, M = (d, m, y, E, C, k, $, O, P = 0) => {
    for (let x = P; x < d.length; x++) {
      const W = d[x] = O ? Et(d[x]) : gt(d[x]);
      b(
        null,
        W,
        m,
        y,
        E,
        C,
        k,
        $,
        O
      );
    }
  }, L = (d, m, y, E, C, k, $) => {
    const O = m.el = d.el;
    let { patchFlag: P, dynamicChildren: x, dirs: W } = m;
    P |= d.patchFlag & 16;
    const R = d.props || fe, j = m.props || fe;
    let Y;
    if (y && qt(y, !1), (Y = j.onVnodeBeforeUpdate) && ft(Y, y, m, d), W && Gt(m, d, y, "beforeUpdate"), y && qt(y, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    x && (!d.dynamicChildren || d.dynamicChildren.length !== x.length) && (P = 0, $ = !1, x = null), (R.innerHTML && j.innerHTML == null || R.textContent && j.textContent == null) && u(O, ""), x ? K(
      d.dynamicChildren,
      x,
      O,
      y,
      E,
      Ms(m, C),
      k
    ) : $ || q(
      d,
      m,
      O,
      null,
      y,
      E,
      Ms(m, C),
      k,
      !1
    ), P > 0) {
      if (P & 16)
        U(O, R, j, y, C);
      else if (P & 2 && R.class !== j.class && i(O, "class", null, j.class, C), P & 4 && i(O, "style", R.style, j.style, C), P & 8) {
        const re = m.dynamicProps;
        for (let ce = 0; ce < re.length; ce++) {
          const ue = re[ce], we = R[ue], Ee = j[ue];
          (Ee !== we || ue === "value") && i(O, ue, we, Ee, C, y);
        }
      }
      P & 1 && d.children !== m.children && u(O, m.children);
    } else !$ && x == null && U(O, R, j, y, C);
    ((Y = j.onVnodeUpdated) || W) && Le(() => {
      Y && ft(Y, y, m, d), W && Gt(m, d, y, "updated");
    }, E);
  }, K = (d, m, y, E, C, k, $) => {
    for (let O = 0; O < m.length; O++) {
      const P = d[O], x = m[O], W = P.el || zn(P), R = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        W && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (P.type === le || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Qt(P, x) || // - In the case of a component, it could contain anything.
        P.shapeFlag & 198) ? f(W) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          y
        )
      );
      b(
        P,
        x,
        R,
        null,
        E,
        C,
        k,
        $,
        !0
      );
    }
  }, U = (d, m, y, E, C) => {
    if (m !== y) {
      if (m !== fe)
        for (const k in m)
          !Nn(k) && !(k in y) && i(
            d,
            k,
            m[k],
            null,
            C,
            E
          );
      for (const k in y) {
        if (Nn(k)) continue;
        const $ = y[k], O = m[k];
        $ !== O && k !== "value" && i(d, k, O, $, C, E);
      }
      "value" in y && i(d, "value", m.value, y.value, C);
    }
  }, D = (d, m, y, E, C, k, $, O, P) => {
    const x = m.el = d ? d.el : l(""), W = m.anchor = d ? d.anchor : l("");
    let { patchFlag: R, dynamicChildren: j, slotScopeIds: Y } = m;
    Y && (O = O ? O.concat(Y) : Y), d == null ? (r(x, y, E), r(W, y, E), M(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      y,
      W,
      C,
      k,
      $,
      O,
      P
    )) : R > 0 && R & 64 && j && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren && d.dynamicChildren.length === j.length ? (K(
      d.dynamicChildren,
      j,
      y,
      C,
      k,
      $,
      O
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (m.key != null || C && m === C.subTree) && wa(
      d,
      m,
      !0
      /* shallow */
    )) : q(
      d,
      m,
      y,
      W,
      C,
      k,
      $,
      O,
      P
    );
  }, X = (d, m, y, E, C, k, $, O, P) => {
    m.slotScopeIds = O, d == null ? m.shapeFlag & 512 ? C.ctx.activate(
      m,
      y,
      E,
      $,
      P
    ) : ee(
      m,
      y,
      E,
      C,
      k,
      $,
      P
    ) : _e(d, m, P);
  }, ee = (d, m, y, E, C, k, $) => {
    const O = d.component = Af(
      d,
      E,
      C
    );
    if (vs(d) && (O.ctx.renderer = Yt), Ef(O, !1, $), O.asyncDep) {
      if (C && C.registerDep(
        O,
        ae,
        $,
        k
      ), !d.el) {
        const P = O.subTree = V($e);
        A(null, P, m, y), d.placeholder = P.el;
      }
    } else
      ae(
        O,
        d,
        m,
        y,
        C,
        k,
        $
      );
  }, _e = (d, m, y) => {
    const E = m.component = d.component;
    if (uf(d, m, y))
      if (E.asyncDep && !E.asyncResolved) {
        m.el = d.el, m.placeholder = d.placeholder, J(E, m, y);
        return;
      } else
        E.next = m, E.update();
    else
      m.el = d.el, m.placeholder = d.placeholder, E.vnode = m;
  }, ae = (d, m, y, E, C, k, $) => {
    const O = () => {
      if (d.isMounted) {
        let { next: R, bu: j, u: Y, parent: re, vnode: ce } = d;
        {
          const ut = Ca(d);
          if (ut) {
            R && (R.el = ce.el, J(d, R, $)), ut.asyncDep.then(() => {
              const xt = () => {
                d.job.flags & 8 || (C && C.pendingBranch ? Le(xt, C) : x());
              };
              xt.flags = 48, Le(xt, C);
            });
            return;
          }
        }
        let ue = R, we;
        qt(d, !1), R ? (R.el = ce.el, J(d, R, $)) : R = ce, j && Or(j), (we = R.props && R.props.onVnodeBeforeUpdate) && ft(we, re, R, ce), qt(d, !0);
        const Ee = ao(d), rt = d.subTree;
        d.subTree = Ee, b(
          rt,
          Ee,
          // parent may have changed if it's in a teleport. a root that is a
          // pending async component only has its placeholder comment
          f(
            rt.el || zn(rt)
          ),
          // anchor may have changed if it's in a fragment
          Lt(rt),
          d,
          C,
          k
        ), R.el = Ee.el, ue === null && cf(d, Ee.el), Y && Le(Y, C), (we = R.props && R.props.onVnodeUpdated) && Le(
          () => ft(we, re, R, ce),
          C
        );
      } else {
        let R;
        const { el: j, props: Y } = m, { bm: re, m: ce, parent: ue, root: we, type: Ee } = d, rt = Wn(m);
        qt(d, !1), re && Or(re), !rt && (R = Y && Y.onVnodeBeforeMount) && ft(R, ue, m), qt(d, !0);
        {
          we.ce && we.ce._hasShadowRoot() && we.ce._injectChildStyle(
            Ee,
            d.parent ? d.parent.type : void 0
          );
          const ut = d.subTree = ao(d);
          b(
            null,
            ut,
            y,
            E,
            d,
            C,
            k
          ), m.el = ut.el;
        }
        if (ce && Le(ce, C), !rt && (R = Y && Y.onVnodeMounted)) {
          const ut = m;
          Le(
            () => ft(R, ue, ut),
            C
          );
        }
        (m.shapeFlag & 256 || ue && Wn(ue.vnode) && ue.vnode.shapeFlag & 256) && d.a && Le(d.a, C), d.isMounted = !0, m = y = E = null;
      }
    };
    d.scope.on();
    const P = d.effect = new Al(O);
    d.scope.off();
    const x = d.update = P.run.bind(P), W = d.job = P.runIfDirty.bind(P);
    W.i = d, W.id = d.uid, P.scheduler = () => ms(W), qt(d, !0), x();
  }, J = (d, m, y) => {
    m.component = d;
    const E = d.vnode.props;
    d.vnode = m, d.next = null, df(d, m.props, E, y), vf(d, m.children, y), _t(), Gl(d), St();
  }, q = (d, m, y, E, C, k, $, O, P = !1) => {
    const x = d && d.children, W = d ? d.shapeFlag : 0, R = m.children, { patchFlag: j, shapeFlag: Y } = m;
    if (j > 0) {
      if (j & 128) {
        Ae(
          x,
          R,
          y,
          E,
          C,
          k,
          $,
          O,
          P
        );
        return;
      } else if (j & 256) {
        Se(
          x,
          R,
          y,
          E,
          C,
          k,
          $,
          O,
          P
        );
        return;
      }
    }
    Y & 8 ? (W & 16 && at(x, C, k), R !== x && u(y, R)) : W & 16 ? Y & 16 ? Ae(
      x,
      R,
      y,
      E,
      C,
      k,
      $,
      O,
      P
    ) : at(x, C, k, !0) : (W & 8 && u(y, ""), Y & 16 && M(
      R,
      y,
      E,
      C,
      k,
      $,
      O,
      P
    ));
  }, Se = (d, m, y, E, C, k, $, O, P) => {
    d = d || en, m = m || en;
    const x = d.length, W = m.length, R = Math.min(x, W);
    let j;
    for (j = 0; j < R; j++) {
      const Y = m[j] = P ? Et(m[j]) : gt(m[j]);
      b(
        d[j],
        Y,
        y,
        null,
        C,
        k,
        $,
        O,
        P
      );
    }
    x > W ? at(
      d,
      C,
      k,
      !0,
      !1,
      R
    ) : M(
      m,
      y,
      E,
      C,
      k,
      $,
      O,
      P,
      R
    );
  }, Ae = (d, m, y, E, C, k, $, O, P) => {
    let x = 0;
    const W = m.length;
    let R = d.length - 1, j = W - 1;
    for (; x <= R && x <= j; ) {
      const Y = d[x], re = m[x] = P ? Et(m[x]) : gt(m[x]);
      if (Qt(Y, re))
        b(
          Y,
          re,
          y,
          null,
          C,
          k,
          $,
          O,
          P
        );
      else
        break;
      x++;
    }
    for (; x <= R && x <= j; ) {
      const Y = d[R], re = m[j] = P ? Et(m[j]) : gt(m[j]);
      if (Qt(Y, re))
        b(
          Y,
          re,
          y,
          null,
          C,
          k,
          $,
          O,
          P
        );
      else
        break;
      R--, j--;
    }
    if (x > R) {
      if (x <= j) {
        const Y = j + 1, re = Y < W ? m[Y].el : E;
        for (; x <= j; )
          b(
            null,
            m[x] = P ? Et(m[x]) : gt(m[x]),
            y,
            re,
            C,
            k,
            $,
            O,
            P
          ), x++;
      }
    } else if (x > j)
      for (; x <= R; )
        me(d[x], C, k, !0), x++;
    else {
      const Y = x, re = x, ce = /* @__PURE__ */ new Map();
      for (x = re; x <= j; x++) {
        const Be = m[x] = P ? Et(m[x]) : gt(m[x]);
        Be.key != null && ce.set(Be.key, x);
      }
      let ue, we = 0;
      const Ee = j - re + 1;
      let rt = !1, ut = 0;
      const xt = new Array(Ee);
      for (x = 0; x < Ee; x++) xt[x] = 0;
      for (x = Y; x <= R; x++) {
        const Be = d[x];
        if (we >= Ee) {
          me(Be, C, k, !0);
          continue;
        }
        let ct;
        if (Be.key != null)
          ct = ce.get(Be.key);
        else
          for (ue = re; ue <= j; ue++)
            if (xt[ue - re] === 0 && Qt(Be, m[ue])) {
              ct = ue;
              break;
            }
        ct === void 0 ? me(Be, C, k, !0) : (xt[ct - re] = x + 1, ct >= ut ? ut = ct : rt = !0, b(
          Be,
          m[ct],
          y,
          null,
          C,
          k,
          $,
          O,
          P
        ), we++);
      }
      const zi = rt ? _f(xt) : en;
      for (ue = zi.length - 1, x = Ee - 1; x >= 0; x--) {
        const Be = re + x, ct = m[Be], Ui = m[Be + 1], Ki = Be + 1 < W ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Ui.el || zn(Ui)
        ) : E;
        xt[x] === 0 ? b(
          null,
          ct,
          y,
          Ki,
          C,
          k,
          $,
          O,
          P
        ) : rt && (ue < 0 || x !== zi[ue] ? ke(ct, y, Ki, 2) : ue--);
      }
    }
  }, ke = (d, m, y, E, C = null) => {
    const { el: k, type: $, transition: O, children: P, shapeFlag: x } = d;
    if (x & 6) {
      ke(d.component.subTree, m, y, E);
      return;
    }
    if (x & 128) {
      d.suspense.move(m, y, E);
      return;
    }
    if (x & 64) {
      $.move(d, m, y, Yt);
      return;
    }
    if ($ === le) {
      r(k, m, y);
      for (let R = 0; R < P.length; R++)
        ke(P[R], m, y, E);
      r(d.anchor, m, y);
      return;
    }
    if ($ === Fs) {
      _(d, m, y);
      return;
    }
    if (E !== 2 && x & 1 && O)
      if (E === 0)
        O.persisted && !k[We] ? r(k, m, y) : (O.beforeEnter(k), r(k, m, y), Le(() => O.enter(k), C));
      else {
        const { leave: R, delayLeave: j, afterLeave: Y } = O, re = () => {
          d.ctx.isUnmounted ? s(k) : r(k, m, y);
        }, ce = () => {
          const ue = k._isLeaving || !!k[We];
          k._isLeaving && k[We](
            !0
            /* cancelled */
          ), O.persisted && !ue ? re() : R(k, () => {
            re(), Y && Y();
          });
        };
        j ? j(k, re, ce) : ce();
      }
    else
      r(k, m, y);
  }, me = (d, m, y, E = !1, C = !1) => {
    const {
      type: k,
      props: $,
      ref: O,
      children: P,
      dynamicChildren: x,
      shapeFlag: W,
      patchFlag: R,
      dirs: j,
      cacheIndex: Y,
      memo: re
    } = d;
    if ((R === -2 || x && x.hasOnce) && (C = !1), O != null && (_t(), Hn(O, null, y, d, !0), St()), Y != null && (!d.ctx || d.ctx === m) && (m.renderCache[Y] = void 0), W & 256 && m.ctx.deactivate(d))
      return;
    const ce = W & 1 && j, ue = !Wn(d);
    let we;
    if (ue && (we = $ && $.onVnodeBeforeUnmount) && ft(we, m, d), W & 6)
      mn(d.component, y, E);
    else {
      if (W & 128) {
        d.suspense.unmount(y, E);
        return;
      }
      ce && Gt(d, null, m, "beforeUnmount"), W & 64 ? d.type.remove(
        d,
        m,
        y,
        Yt,
        E
      ) : x && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !x.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (k !== le || R > 0 && R & 64) ? at(
        x,
        m,
        y,
        !1,
        !0
      ) : (k === le && R & 384 || !C && W & 16) && at(P, m, y), E && lt(d);
    }
    const Ee = re != null && Y == null;
    (ue && (we = $ && $.onVnodeUnmounted) || ce || Ee) && Le(() => {
      we && ft(we, m, d), ce && Gt(d, null, m, "unmounted"), Ee && (d.el = null);
    }, y);
  }, lt = (d) => {
    const { type: m, el: y, anchor: E, transition: C } = d, k = m === le;
    if (k && !C) {
      hn(y, E);
      return;
    }
    if (m === Fs) {
      w(d), C && !C.persisted && C.afterLeave && C.afterLeave();
      return;
    }
    const $ = k ? Jn(d) : d, O = () => {
      k ? f(y) && hn(y, E) : s(y), C && !C.persisted && C.afterLeave && C.afterLeave();
    };
    if ($ && $.shapeFlag & 1 && C && !C.persisted) {
      const { leave: P, delayLeave: x } = C, W = $.el, R = () => P(W, O);
      x ? x(W, O, R) : R();
    } else
      O();
  }, hn = (d, m) => {
    let y;
    for (; d !== m; )
      y = h(d), s(d), d = y;
    s(m);
  }, mn = (d, m, y) => {
    const { bum: E, scope: C, job: k, subTree: $, um: O, m: P, a: x } = d;
    fo(P), fo(x), E && Or(E), C.stop(), k ? (k.flags |= 8, me($, d, m, y)) : $ && ($.transition = d.vnode.transition, me($, d, m, y)), O && Le(O, m);
    const W = () => {
      d.isUnmounted = !0;
    };
    W.flags = 16, Le(W, m);
  }, at = (d, m, y, E = !1, C = !1, k = 0) => {
    for (let $ = k; $ < d.length; $++)
      me(d[$], m, y, E, C);
  }, Lt = (d) => {
    if (d.shapeFlag & 6)
      return Lt(d.component.subTree);
    if (d.shapeFlag & 128)
      return d.suspense.next();
    const m = h(d.anchor || d.el), y = m && m[Mc];
    return y ? h(y) : m;
  }, Pn = (d, m, y) => {
    const E = d && m._vnode ? void 0 : d && d.component ? d.component.uid : Tf();
    Pc(() => {
      d == null ? m._vnode && me(m._vnode, null, null, !0) : b(
        m._vnode || null,
        d,
        m,
        null,
        null,
        null,
        y
      ), m._vnode = d;
    }, E);
  }, Yt = {
    p: b,
    um: me,
    m: ke,
    r: lt,
    mt: ee,
    mc: M,
    pc: q,
    pbc: K,
    n: Lt,
    o: e
  };
  return {
    render: Pn,
    hydrate: void 0,
    createApp: nf(Pn)
  };
}
function Ms({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function qt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function bf(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function wa(e, t, n = !1) {
  const r = e.children, s = t.children;
  if (z(r) && z(s))
    for (let i = 0; i < r.length; i++) {
      const o = r[i];
      let l = s[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[i] = Et(s[i]), l.el = o.el), !n && l.patchFlag !== -2 && wa(o, l)), l.type === gr && (l.patchFlag === -1 && (l = s[i] = Et(l)), l.el = o.el), l.type === $e && !l.el && (l.el = o.el);
    }
}
function _f(e) {
  const t = e.slice(), n = [0];
  let r, s, i, o, l;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const c = e[r];
    if (c !== 0) {
      if (s = n[n.length - 1], e[s] < c) {
        t[r] = s, n.push(r);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        l = i + o >> 1, e[n[l]] < c ? i = l + 1 : o = l;
      c < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = t[o];
  return n;
}
function Ca(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ca(t);
}
function fo(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function zn(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  if (t)
    return zn(t.subTree);
  const n = e.suspense;
  return n && n.activeBranch ? zn(n.activeBranch) : null;
}
const xa = (e) => e.__isSuspense, Sf = /* @__PURE__ */ Symbol("_deferredEnter");
function wf(e, t) {
  t && t.pendingBranch ? z(e) ? t.effects.push(...e) : t.effects.push(e) : Dc(e);
}
const le = /* @__PURE__ */ Symbol.for("v-fgt"), gr = /* @__PURE__ */ Symbol.for("v-txt"), $e = /* @__PURE__ */ Symbol.for("v-cmt"), Fs = /* @__PURE__ */ Symbol.for("v-stc"), rn = [];
let Ue = null;
function Q(e = !1) {
  rn.push(Ue = e ? null : []);
}
function ka() {
  rn.pop(), Ue = rn[rn.length - 1] || null;
}
let er = 1;
function Ur(e, t = !1) {
  er += e, e < 0 && Ue && t && (Ue.hasOnce = !0);
}
function Ta(e) {
  return e.dynamicChildren = er > 0 ? Ue || en : null, ka(), er > 0 && Ue && Ue.push(e), e;
}
function te(e, t, n, r, s, i) {
  return Ta(
    v(
      e,
      t,
      n,
      r,
      s,
      i,
      !0
    )
  );
}
function Aa(e, t, n, r, s) {
  return Ta(
    V(
      e,
      t,
      n,
      r,
      s,
      !0
    )
  );
}
function tr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Qt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ea = ({ key: e }) => e ?? null, $r = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? pe(e) || /* @__PURE__ */ be(e) || G(e) ? { i: ze, r: e, k: t, f: !!n } : e : null);
function v(e, t = null, n = null, r = 0, s = null, i = e === le ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ea(t),
    ref: t && $r(t),
    scopeId: Xl,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: ze
  };
  return l ? (Kr(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= pe(n) ? 8 : 16), er > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Ue && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Ue.push(a), a;
}
const V = Cf;
function Cf(e, t = null, n = null, r = 0, s = null, i = !1) {
  if ((!e || e === Yc) && (e = $e), tr(e)) {
    const l = $t(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Kr(l, n), er > 0 && !i && Ue && (l.shapeFlag & 6 ? Ue[Ue.indexOf(e)] = l : Ue.push(l)), l.patchFlag = -2, l;
  }
  if ($f(e) && (e = e.__vccOpts), t) {
    t = xf(t);
    let { class: l, style: a } = t;
    l && !pe(l) && (t.class = he(l)), oe(a) && (/* @__PURE__ */ ds(a) && !z(a) && (a = ye({}, a)), t.style = xe(a));
  }
  const o = pe(e) ? 1 : xa(e) ? 128 : gs(e) ? 64 : oe(e) ? 4 : G(e) ? 2 : 0;
  return v(
    e,
    t,
    n,
    r,
    s,
    o,
    i,
    !0
  );
}
function xf(e) {
  return e ? /* @__PURE__ */ ds(e) ? ye({}, e) : va(e) ? ye({}, e[Oa] || e) : e : null;
}
function $t(e, t, n = !1, r = !1) {
  const { props: s, ref: i, patchFlag: o, children: l, transition: a } = e, c = t ? De(s || {}, t) : s, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Ea(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? z(i) ? i.concat($r(t)) : [i, $r(t)] : $r(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== le ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && $t(e.ssContent),
    ssFallback: e.ssFallback && $t(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return a && r && Ot(
    u,
    a.clone(u)
  ), u;
}
function He(e = " ", t = 0) {
  return V(gr, null, e, t);
}
function Qe(e = "", t = !1) {
  return t ? (Q(), Aa($e, null, e)) : V($e, null, e);
}
function gt(e) {
  return e == null || typeof e == "boolean" ? V($e) : z(e) ? V(
    le,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : tr(e) ? Et(e) : V(gr, null, String(e));
}
function Et(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : $t(e);
}
function Kr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (z(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Kr(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !va(t) ? t._ctx = ze : s === 3 && ze && (ze.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (G(t)) {
    if (r & 65) {
      Kr(e, { default: t });
      return;
    }
    t = { default: t, _ctx: ze }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [He(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function De(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = he([t.class, r.class]));
      else if (s === "style")
        t.style = xe([t.style, r.style]);
      else if (ss(s)) {
        const i = t[s], o = r[s];
        o && i !== o && !(z(i) && i.includes(o)) ? t[s] = i ? [].concat(i, o) : o : o == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !is(s) && (t[s] = o);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
function ft(e, t, n, r = null) {
  nt(e, t, 7, [
    n,
    r
  ]);
}
const kf = /* @__PURE__ */ ca();
let Da = 0;
function Tf() {
  return Da;
}
function Af(e, t, n) {
  const r = e.type, s = (t ? t.appContext : e.appContext) || kf, i = {
    uid: Da++,
    vnode: e,
    type: r,
    parent: t,
    appContext: s,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new kl(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: ya(r, s),
    emitsOptions: fa(r, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: fe,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: fe,
    data: fe,
    props: fe,
    attrs: fe,
    slots: fe,
    refs: fe,
    setupState: fe,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = sf.bind(null, i), e.ce && e.ce(i), i;
}
let Oe = null;
const vr = () => Oe || ze;
let Yr, nr;
{
  const e = as(), t = (n, r) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(r), (i) => {
      s.length > 1 ? s.forEach((o) => o(i)) : s[0](i);
    };
  };
  Yr = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Oe = n
  ), nr = t(
    "__VUE_SSR_SETTERS__",
    (n) => rr = n
  );
}
const pr = (e) => {
  const t = Oe;
  return Yr(e), e.scope.on(), () => {
    e.scope.off(), Yr(t);
  };
}, ho = () => {
  Oe && Oe.scope.off(), Yr(null);
};
function Pa(e) {
  return e.vnode.shapeFlag & 4;
}
let rr = !1;
function Ef(e, t = !1, n = !1) {
  t && nr(t);
  const { props: r, children: s } = e.vnode, i = Pa(e);
  ff(e, r, i, t), gf(e, s, n || t);
  const o = i ? Df(e, t) : void 0;
  return t && nr(!1), o;
}
function Df(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, qc);
  const { setup: r } = n;
  if (r) {
    _t();
    const s = e.setupContext = r.length > 1 ? If(e) : null, i = pr(e), o = fr(
      r,
      e,
      0,
      [
        e.props,
        s
      ]
    ), l = yl(o);
    if (St(), i(), (l || e.sp) && !Wn(e) && ra(e), l) {
      if (o.then(ho, ho), t)
        return o.then((a) => {
          nr(!0);
          try {
            mo(e, a, t);
          } finally {
            nr(!1);
          }
        }).catch((a) => {
          hs(a, e, 0, void 0, !0), e.ssrRender = (c, u) => u("<!---->");
        });
      e.asyncDep = o;
    } else
      mo(e, o);
  } else
    Ia(e);
}
function mo(e, t, n) {
  G(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : oe(t) && (e.setupState = jl(t)), Ia(e);
}
function Ia(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || yt);
  {
    const s = pr(e);
    _t();
    try {
      Zc(e);
    } finally {
      St(), s();
    }
  }
}
const Oa = /* @__PURE__ */ Symbol(), Pf = {
  get(e, t) {
    return Ie(e, "get", ""), t === Oa ? e : e[t];
  }
};
function If(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Pf),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function ys(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(jl(yc(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in jn)
        return jn[n](e);
    },
    has(t, n) {
      return n in t || n in jn;
    }
  })) : e.proxy;
}
function Of(e, t = !0) {
  return G(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function $f(e) {
  return G(e) && "__vccOpts" in e;
}
const H = (e, t) => /* @__PURE__ */ xc(e, t, rr);
function En(e, t, n) {
  try {
    Ur(-1);
    const r = arguments.length;
    return r === 2 ? oe(t) && !z(t) ? tr(t) ? V(e, null, [t]) : V(e, t) : V(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && tr(n) && (n = [n]), V(e, t, n));
  } finally {
    Ur(1);
  }
}
const Mf = "3.5.46";
let Qs;
const go = typeof window < "u" && window.trustedTypes;
if (go)
  try {
    Qs = /* @__PURE__ */ go.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const $a = Qs ? (e) => Qs.createHTML(e) : (e) => e, Ff = "http://www.w3.org/2000/svg", Rf = "http://www.w3.org/1998/Math/MathML", Tt = typeof document < "u" ? document : null, vo = Tt && /* @__PURE__ */ Tt.createElement("template"), Lf = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const s = t === "svg" ? Tt.createElementNS(Ff, e) : t === "mathml" ? Tt.createElementNS(Rf, e) : n ? Tt.createElement(e, { is: n }) : Tt.createElement(e);
    return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s;
  },
  createText: (e) => Tt.createTextNode(e),
  createComment: (e) => Tt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Tt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, r, s, i) {
    const o = n ? n.previousSibling : t.lastChild;
    if (s && (s === i || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)); )
        ;
    else {
      vo.innerHTML = $a(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const l = vo.content;
      if (r === "svg" || r === "mathml") {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Nt = "transition", $n = "animation", wn = /* @__PURE__ */ Symbol("_vtc"), Ma = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, Fa = /* @__PURE__ */ ye(
  {},
  ea,
  Ma
), Nf = (e) => (e.displayName = "Transition", e.props = Fa, e), bs = /* @__PURE__ */ Nf(
  (e, { slots: t }) => En(Rc, Ra(e), t)
), Zt = (e, t = []) => {
  z(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, po = (e) => e ? z(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Ra(e) {
  const t = {};
  for (const D in e)
    D in Ma || (t[D] = e[D]);
  if (e.css === !1)
    return t;
  const {
    name: n = "v",
    type: r,
    duration: s,
    enterFromClass: i = `${n}-enter-from`,
    enterActiveClass: o = `${n}-enter-active`,
    enterToClass: l = `${n}-enter-to`,
    appearFromClass: a = i,
    appearActiveClass: c = o,
    appearToClass: u = l,
    leaveFromClass: f = `${n}-leave-from`,
    leaveActiveClass: h = `${n}-leave-active`,
    leaveToClass: g = `${n}-leave-to`
  } = e, T = Vf(s), b = T && T[0], p = T && T[1], {
    onBeforeEnter: A,
    onEnter: S,
    onEnterCancelled: _,
    onLeave: w,
    onLeaveCancelled: F,
    onBeforeAppear: B = A,
    onAppear: I = S,
    onAppearCancelled: M = _
  } = t, L = (D, X, ee, _e) => {
    D._enterResolve = void 0, D._enterCancelled = _e, Vt(D, X ? u : l), Vt(D, X ? c : o), ee && ee();
  }, K = (D, X) => {
    D._leaveResolve = void 0, D._isLeaving = !1, Vt(D, f), Vt(D, g), Vt(D, h), X && X();
  }, U = (D) => (X, ee) => {
    const _e = D ? I : S, ae = () => {
      X._enterResolve === ae && L(X, D, ee);
    };
    X._enterResolve = ae, Zt(_e, [X, ae]), yo(() => {
      Vt(X, D ? a : i), X._enterResolve === ae && (dt(X, D ? u : l), po(_e) || bo(X, r, b, ae));
    });
  };
  return ye(t, {
    onBeforeEnter(D) {
      Zt(A, [D]), dt(D, i), dt(D, o);
    },
    onBeforeAppear(D) {
      Zt(B, [D]), dt(D, a), dt(D, c);
    },
    onEnter: U(!1),
    onAppear: U(!0),
    onLeave(D, X) {
      D._isLeaving = !0;
      const ee = () => {
        D._leaveResolve === ee && K(D, X);
      };
      D._leaveResolve = ee, dt(D, f), D._enterCancelled ? (dt(D, h), ei(D)) : (ei(D), dt(D, h)), yo(() => {
        D._leaveResolve === ee && (Vt(D, f), dt(D, g), po(w) || bo(D, r, p, ee));
      }), Zt(w, [D, ee]);
    },
    onEnterCancelled(D) {
      L(D, !1, void 0, !0), Zt(_, [D]);
    },
    onAppearCancelled(D) {
      L(D, !0, void 0, !0), Zt(M, [D]);
    },
    onLeaveCancelled(D) {
      K(D), Zt(F, [D]);
    }
  });
}
function Vf(e) {
  if (e == null)
    return null;
  if (oe(e))
    return [Rs(e.enter), Rs(e.leave)];
  {
    const t = Rs(e);
    return [t, t];
  }
}
function Rs(e) {
  return Uu(e);
}
function dt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[wn] || (e[wn] = /* @__PURE__ */ new Set())).add(t);
}
function Vt(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const n = e[wn];
  n && (n.delete(t), n.size || (e[wn] = void 0));
}
function yo(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Bf = 0;
function bo(e, t, n, r) {
  const s = e._endId = ++Bf, i = () => {
    s === e._endId && r();
  };
  if (n != null)
    return setTimeout(i, n);
  const { type: o, timeout: l, propCount: a } = La(e, t);
  if (!o)
    return r();
  const c = o + "end";
  let u = 0;
  const f = () => {
    e.removeEventListener(c, h), i();
  }, h = (g) => {
    g.target === e && ++u >= a && f();
  };
  setTimeout(() => {
    u < a && f();
  }, l + 1), e.addEventListener(c, h);
}
function La(e, t) {
  const n = window.getComputedStyle(e), r = (T) => (n[T] || "").split(", "), s = r(`${Nt}Delay`), i = r(`${Nt}Duration`), o = _o(s, i), l = r(`${$n}Delay`), a = r(`${$n}Duration`), c = _o(l, a);
  let u = null, f = 0, h = 0;
  t === Nt ? o > 0 && (u = Nt, f = o, h = i.length) : t === $n ? c > 0 && (u = $n, f = c, h = a.length) : (f = Math.max(o, c), u = f > 0 ? o > c ? Nt : $n : null, h = u ? u === Nt ? i.length : a.length : 0);
  const g = u === Nt && /\b(?:transform|all)(?:,|$)/.test(
    r(`${Nt}Property`).toString()
  );
  return {
    type: u,
    timeout: f,
    propCount: h,
    hasTransform: g
  };
}
function _o(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, r) => So(n) + So(e[r])));
}
function So(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function ei(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Hf(e, t, n) {
  const r = e[wn];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Gr = /* @__PURE__ */ Symbol("_vod"), Ci = /* @__PURE__ */ Symbol("_vsh"), Na = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[Gr] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Mn(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: r }) {
    !t != !n && (r ? t ? (r.beforeEnter(e), Mn(e, !0), r.enter(e)) : r.leave(e, () => {
      Mn(e, !1);
    }) : Mn(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Mn(e, t);
  }
};
function Mn(e, t) {
  e.style.display = t ? e[Gr] : "none", e[Ci] = !t;
}
const Wf = /* @__PURE__ */ Symbol(""), jf = /(?:^|;)\s*display\s*:/;
function zf(e, t, n) {
  const r = e.style, s = pe(n);
  let i = !1;
  if (n && !s) {
    if (t)
      if (pe(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && Rn(r, l, "");
        }
      else
        for (const o in t)
          n[o] == null && Rn(r, o, "");
    for (const o in n) {
      o === "display" && (i = !0);
      const l = n[o];
      l != null ? Kf(
        e,
        o,
        !pe(t) && t ? t[o] : void 0,
        l
      ) || Rn(r, o, l) : Rn(r, o, "");
    }
  } else if (s) {
    if (t !== n) {
      const o = r[Wf];
      o && (n += ";" + o), r.cssText = n, i = jf.test(n);
    }
  } else t && e.removeAttribute("style");
  Gr in e && ((!s || t !== n) && (e[Gr] = i ? r.display : ""), e[Ci] && (r.display = "none"));
}
const kr = /\s*!important$/;
function Rn(e, t, n) {
  if (z(n))
    n.forEach((r) => Rn(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    kr.test(n) ? e.setProperty(t, n.replace(kr, ""), "important") : e.setProperty(t, n);
  else {
    const r = Uf(e, t);
    kr.test(n) ? e.setProperty(
      cn(r),
      n.replace(kr, ""),
      "important"
    ) : e[r] = n;
  }
}
const wo = ["Webkit", "Moz", "ms"], Ls = {};
function Uf(e, t) {
  const n = Ls[t];
  if (n)
    return n;
  let r = Me(t);
  if (r !== "filter" && r in e)
    return Ls[t] = r;
  r = kn(r);
  for (let s = 0; s < wo.length; s++) {
    const i = wo[s] + r;
    if (i in e)
      return Ls[t] = i;
  }
  return t;
}
function Kf(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && pe(r) && n === r;
}
const Co = "http://www.w3.org/1999/xlink";
function xo(e, t, n, r, s, i = Xu(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Co, t.slice(6, t.length)) : e.setAttributeNS(Co, t, n) : n == null || i && !wl(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : et(n) ? String(n) : n
  );
}
function ko(e, t, n, r, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? $a(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = wl(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(s || t);
}
function bn(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Yf(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const To = /* @__PURE__ */ Symbol("_vei");
function Gf(e, t, n, r, s = null) {
  const i = e[To] || (e[To] = {}), o = i[t];
  if (r && o)
    o.value = r;
  else {
    const [l, a] = Xf(t);
    if (r) {
      const c = i[t] = ed(
        r,
        s
      );
      bn(e, l, c, a);
    } else o && (Yf(e, l, o, a), i[t] = void 0);
  }
}
const qf = /(Once|Passive|Capture)$/, Zf = /^on:?(?:Once|Passive|Capture)$/;
function Xf(e) {
  let t, n;
  for (; (n = e.match(qf)) && !Zf.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : cn(e.slice(2)), t];
}
let Ns = 0;
const Jf = /* @__PURE__ */ Promise.resolve(), Qf = () => Ns || (Jf.then(() => Ns = 0), Ns = Date.now());
function ed(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    const s = n.value;
    if (z(s)) {
      const i = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        i.call(r), r._stopped = !0;
      };
      const o = s.slice(), l = [r];
      for (let a = 0; a < o.length && !r._stopped; a++) {
        const c = o[a];
        c && nt(
          c,
          t,
          5,
          l
        );
      }
    } else
      nt(
        s,
        t,
        5,
        [r]
      );
  };
  return n.value = e, n.attached = Qf(), n;
}
const Ao = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, td = (e, t, n, r, s, i) => {
  const o = s === "svg";
  t === "class" ? Hf(e, r, o) : t === "style" ? zf(e, n, r) : ss(t) ? is(t) || Gf(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : nd(e, t, r, o)) ? (ko(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && xo(e, t, r, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (rd(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !pe(r))) ? ko(e, Me(t), r, i, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), xo(e, t, r, o));
};
function nd(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ao(t) && G(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return Ao(t) && pe(n) ? !1 : t in e;
}
function rd(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = Me(t);
  return Array.isArray(n) ? n.some((s) => Me(s) === r) : Object.keys(n).some((s) => Me(s) === r);
}
const Va = /* @__PURE__ */ new WeakMap(), Ba = /* @__PURE__ */ new WeakMap(), qr = /* @__PURE__ */ Symbol("_moveCb"), Eo = /* @__PURE__ */ Symbol("_enterCb"), ti = /* @__PURE__ */ new WeakMap(), sd = (e) => (delete e.props.mode, e), id = /* @__PURE__ */ sd({
  name: "TransitionGroup",
  props: /* @__PURE__ */ ye({}, Fa, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = vr(), r = Ql();
    let s, i, o, l;
    const a = () => (l === void 0 && (l = s.length > 0 && dd(
      s[0].el,
      n.vnode.el,
      Do(e)
    )), l);
    return _i(() => {
      if (ti.delete(n), !a()) {
        s = [], o = void 0;
        return;
      }
      const c = Do(e);
      s.forEach(od);
      const u = o && fd(o, n.vnode.el);
      o = void 0, s.forEach((h) => ld(h, u));
      const f = s.filter(ad);
      ei(n.vnode.el), f.forEach((h) => {
        const g = h.el, T = g.style;
        dt(g, c), T.transform = T.webkitTransform = T.transitionDuration = "";
        const b = g[qr] = (p) => {
          p && p.target !== g || (!p || p.propertyName.endsWith("transform")) && (g.removeEventListener("transitionend", b), g[qr] = null, Vt(g, c));
        };
        g.addEventListener("transitionend", b);
      }), s = [];
    }), () => {
      const c = /* @__PURE__ */ ne(e), u = Ra(c);
      let f = c.tag || le;
      if (s = [], l = void 0, i)
        for (let h = 0; h < i.length; h++) {
          const g = i[h];
          g.el && g.el instanceof Element && // Hidden v-show nodes have no previous layout box to animate from.
          !g.el[Ci] && (s.push(g), Ot(
            g,
            Xn(
              g,
              u,
              r,
              n
            )
          ), Va.set(g, _s(g.el)));
        }
      i = t.default ? bi(t.default()) : [];
      for (let h = 0; h < i.length; h++) {
        const g = i[h];
        g.key != null && Ot(
          g,
          Xn(g, u, r, n)
        );
      }
      return s.length && (o = ud(n), ti.set(n, a)), V(f, null, i);
    };
  }
}), xi = id;
function od(e) {
  const t = e.el;
  t[qr] && t[qr](), t[Eo] && t[Eo]();
}
function Do(e) {
  return e.moveClass || `${e.name || "v"}-move`;
}
function ld(e, t) {
  Ba.set(e, _s(e.el, t));
}
function ad(e) {
  const t = Va.get(e), n = Ba.get(e), r = t.left - n.left, s = t.top - n.top;
  if (r || s) {
    const i = e.el, o = i.style, l = i.getBoundingClientRect();
    let a = 1, c = 1;
    return i.offsetWidth && (a = l.width / i.offsetWidth), i.offsetHeight && (c = l.height / i.offsetHeight), (!Number.isFinite(a) || a === 0) && (a = 1), (!Number.isFinite(c) || c === 0) && (c = 1), Math.abs(a - 1) < 0.01 && (a = 1), Math.abs(c - 1) < 0.01 && (c = 1), o.transform = o.webkitTransform = `translate(${r / a}px,${s / c}px)`, o.transitionDuration = "0s", e;
  }
}
function _s(e, t) {
  const n = e.getBoundingClientRect();
  return {
    left: n.left - (t ? t.left : 0),
    top: n.top - (t ? t.top : 0)
  };
}
function ud(e) {
  let t;
  for (let n = e.parent; n; n = n.parent) {
    const r = ti.get(n);
    if (r) {
      const s = cd(n.vnode.el, e.vnode.el);
      s && (t || (t = [])).push(
        ye(_s(s), { item: s, willMove: r })
      );
    }
  }
  return t;
}
function cd(e, t) {
  const n = e.nodeType === 1 ? e : e.parentNode;
  for (; t && t.parentNode !== n; )
    t = t.parentNode;
  if (t && t.nodeType === 1)
    return t;
}
function fd(e, t) {
  const n = e.find((r) => r.willMove() && r.item.contains(t));
  return n && _s(n.item, n);
}
function dd(e, t, n) {
  const r = e.cloneNode(), s = e[wn];
  s && s.forEach((l) => {
    l.split(/\s+/).forEach((a) => a && r.classList.remove(a));
  }), n.split(/\s+/).forEach((l) => l && r.classList.add(l)), r.style.display = "none";
  const i = t.nodeType === 1 ? t : t.parentNode;
  i.appendChild(r);
  const { hasTransform: o } = La(r);
  return i.removeChild(r), o;
}
const Po = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return z(t) ? (n) => Or(t, n) : t;
};
function hd(e) {
  e.target.composing = !0;
}
function Io(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Tr = /* @__PURE__ */ Symbol("_assign"), Ar = /* @__PURE__ */ Symbol("_initialValue");
function Vs(e, t, n) {
  return t && (e = e.trim()), n && (e = fi(e)), e;
}
const md = {
  created(e, { modifiers: { lazy: t, trim: n, number: r } }, s) {
    e.parentNode && (e.type === "text" ? e[Ar] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[Ar] = e.defaultValue.replace(/\r\n?/g, `
`))), e[Tr] = Po(s);
    const i = r || s.props && s.props.type === "number";
    bn(e, t ? "change" : "input", (o) => {
      o.target.composing || e[Tr](Vs(e.value, n, i));
    }), (n || i) && bn(e, "change", () => {
      e.value = Vs(e.value, n, i);
    }), t || (bn(e, "compositionstart", hd), bn(e, "compositionend", Io), bn(e, "change", Io));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: n, number: r } }) {
    const s = t ?? "", i = e[Ar];
    delete e[Ar], i !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== i ? e[Tr](Vs(e.value, n, r)) : e.value = s;
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: s, number: i } }, o) {
    if (e[Tr] = Po(o), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? fi(e.value) : e.value, a = t ?? "";
    if (l === a)
      return;
    const c = e.getRootNode();
    (c instanceof Document || c instanceof ShadowRoot) && c.activeElement === e && e.type !== "range" && (r && t === n || s && e.value.trim() === a) || (e.value = a);
  }
}, gd = ["ctrl", "shift", "alt", "meta"], vd = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => gd.some((n) => e[`${n}Key`] && !t.includes(n))
}, Oo = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = ((s, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const l = vd[t[o]];
      if (l && l(s, t)) return;
    }
    return e(s, ...i);
  }));
}, pd = /* @__PURE__ */ ye({ patchProp: td }, Lf);
let $o;
function yd() {
  return $o || ($o = pf(pd));
}
const bd = ((...e) => {
  const t = yd().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const s = Sd(r);
    if (!s) return;
    const i = t._component;
    !G(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const o = n(s, !1, _d(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o;
  }, t;
});
function _d(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Sd(e) {
  return pe(e) ? document.querySelector(e) : e;
}
function wd(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`;
}
const Ve = typeof window < "u", Ha = Ve && "IntersectionObserver" in window, Cd = Ve && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0), Wa = Ve && "matchMedia" in window && typeof window.matchMedia == "function", ki = () => Wa && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
Ve && CSS?.supports?.("-webkit-backdrop-filter", "none");
function xd(e, t, n) {
  const r = t.length - 1;
  if (r < 0) return e === void 0 ? n : e;
  for (let s = 0; s < r; s++) {
    if (e == null)
      return n;
    e = e[t[s]];
  }
  return e == null || e[t[r]] === void 0 ? n : e[t[r]];
}
function Mo(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), xd(e, t.split("."), n));
}
function ja(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length: e
  }, (n, r) => t + r);
}
function ve(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (e == null || e === "")
    return;
  const n = Number(e);
  return isNaN(n) ? String(e) : isFinite(n) ? `${n}${t}` : void 0;
}
function ni(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Fo(e) {
  let t;
  return e !== null && typeof e == "object" && ((t = Object.getPrototypeOf(e)) === Object.prototype || t === null);
}
function kd(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return t?.nodeType === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
function Bs(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function za(e, t) {
  const n = {};
  for (const r of t)
    Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
  return n;
}
function Ro(e, t, n) {
  const r = /* @__PURE__ */ Object.create(null), s = /* @__PURE__ */ Object.create(null);
  for (const i in e)
    t.some((o) => o instanceof RegExp ? o.test(i) : o === i) ? r[i] = e[i] : s[i] = e[i];
  return [r, s];
}
function Ti(e, t) {
  const n = {
    ...e
  };
  return t.forEach((r) => delete n[r]), n;
}
const Td = /^on[^a-z]/, Ad = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function Ed(e) {
  const [t, n] = Ro(e, [Td]), r = Ti(t, Ad), [s, i] = Ro(n, ["class", "style", "id", "inert", /^data-/]);
  return Object.assign(s, t), Object.assign(i, r), [s, i];
}
function Un(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function sr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function Lo(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function No(e, t) {
  return (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0").repeat(Math.max(0, t - e.length)) + e;
}
function Dd(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let r = 0;
  for (; r < e.length; )
    n.push(e.substr(r, t)), r += t;
  return n;
}
function Ke() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const r = {};
  for (const s in e)
    r[s] = e[s];
  for (const s in t) {
    const i = e[s], o = t[s];
    if (Fo(i) && Fo(o)) {
      r[s] = Ke(i, o, n);
      continue;
    }
    if (n && Array.isArray(i) && Array.isArray(o)) {
      r[s] = n(i, o);
      continue;
    }
    r[s] = o;
  }
  return r;
}
function Ua(e) {
  return e.map((t) => t.type === le ? Ua(t.children) : t).flat();
}
function sn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (sn.cache.has(e)) return sn.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return sn.cache.set(e, t), t;
}
sn.cache = /* @__PURE__ */ new Map();
function Ln(e, t) {
  if (!t || typeof t != "object") return [];
  if (Array.isArray(t))
    return t.map((n) => Ln(e, n)).flat(1);
  if (t.suspense)
    return Ln(e, t.ssContent);
  if (Array.isArray(t.children))
    return t.children.map((n) => Ln(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertyDescriptor(t.component.provides, e))
      return [t.component];
    if (t.component.subTree)
      return Ln(e, t.component.subTree).flat(1);
  }
  return [];
}
function Ka(e) {
  const t = /* @__PURE__ */ wt({});
  an(() => {
    const r = e();
    for (const s in r)
      t[s] = r[s];
  }, {
    flush: "sync"
  });
  const n = {};
  for (const r in t)
    n[r] = /* @__PURE__ */ N(() => t[r]);
  return n;
}
function ri(e, t) {
  return e.includes(t);
}
const on = () => [Function, Array];
function Vo(e, t) {
  return t = "on" + kn(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function Ya(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  if (Array.isArray(e))
    for (const s of e)
      s(...n);
  else typeof e == "function" && e(...n);
}
function Ga() {
  let e = document.activeElement;
  for (; e?.shadowRoot?.activeElement; )
    e = e.shadowRoot.activeElement;
  return e;
}
function Pd() {
  const e = /* @__PURE__ */ Fe(), t = (n) => {
    e.value = n;
  };
  return Object.defineProperty(t, "value", {
    enumerable: !0,
    get: () => e.value,
    set: (n) => e.value = n
  }), Object.defineProperty(t, "el", {
    enumerable: !0,
    get: () => kd(e.value)
  }), t;
}
function Zr(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "bigint";
}
function Id(e) {
  const t = ["checked", "disabled"];
  return Object.fromEntries(Object.entries(e).filter((n) => {
    let [r, s] = n;
    return t.includes(r) ? !!s : s !== void 0;
  }));
}
const Od = ["top", "bottom"], $d = ["start", "end", "left", "right"];
function Md(e, t) {
  let [n, r] = e.split(" ");
  return r || (r = ri(Od, n) ? "start" : ri($d, n) ? "top" : "center"), {
    side: Bo(n, t),
    align: Bo(r, t)
  };
}
function Bo(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
class Ht {
  constructor(t) {
    const n = document.body.currentCSSZoom ?? 1, r = t instanceof Element, s = r ? 1 + (1 - n) / n : 1, {
      x: i,
      y: o,
      width: l,
      height: a
    } = r ? t.getBoundingClientRect() : t;
    this.x = i * s, this.y = o * s, this.width = l * s, this.height = a * s;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}
function Fd(e) {
  if (Array.isArray(e)) {
    const t = document.body.currentCSSZoom ?? 1, n = 1 + (1 - t) / t;
    return new Ht({
      x: e[0] * n,
      y: e[1] * n,
      width: 0 * n,
      height: 0 * n
    });
  } else
    return new Ht(e);
}
function Rd(e) {
  const t = new Ht(e), n = getComputedStyle(e), r = n.transform;
  if (r) {
    let s, i, o, l, a;
    if (r.startsWith("matrix3d("))
      s = r.slice(9, -1).split(/, /), i = Number(s[0]), o = Number(s[5]), l = Number(s[12]), a = Number(s[13]);
    else if (r.startsWith("matrix("))
      s = r.slice(7, -1).split(/, /), i = Number(s[0]), o = Number(s[3]), l = Number(s[4]), a = Number(s[5]);
    else
      return new Ht(t);
    const c = n.transformOrigin, u = t.x - l - (1 - i) * parseFloat(c), f = t.y - a - (1 - o) * parseFloat(c.slice(c.indexOf(" ") + 1)), h = i ? t.width / i : e.offsetWidth + 1, g = o ? t.height / o : e.offsetHeight + 1;
    return new Ht({
      x: u,
      y: f,
      width: h,
      height: g
    });
  } else
    return new Ht(t);
}
function Ld(e, t, n) {
  if (typeof e.animate > "u") return {
    finished: Promise.resolve()
  };
  let r;
  try {
    r = e.animate(t, n);
  } catch {
    return {
      finished: Promise.resolve()
    };
  }
  return typeof r.finished > "u" && (r.finished = new Promise((s) => {
    r.onfinish = () => {
      s(r);
    };
  })), r;
}
const vn = 2.4, Ho = 0.2126729, Wo = 0.7151522, jo = 0.072175, Nd = 0.55, Vd = 0.58, Bd = 0.57, Hd = 0.62, Er = 0.03, zo = 1.45, Wd = 5e-4, jd = 1.25, zd = 1.25, Uo = 0.078, Ko = 12.82051282051282, Dr = 0.06, Yo = 1e-3;
function Go(e, t) {
  const n = (e.r / 255) ** vn, r = (e.g / 255) ** vn, s = (e.b / 255) ** vn, i = (t.r / 255) ** vn, o = (t.g / 255) ** vn, l = (t.b / 255) ** vn;
  let a = n * Ho + r * Wo + s * jo, c = i * Ho + o * Wo + l * jo;
  if (a <= Er && (a += (Er - a) ** zo), c <= Er && (c += (Er - c) ** zo), Math.abs(c - a) < Wd) return 0;
  let u;
  if (c > a) {
    const f = (c ** Nd - a ** Vd) * jd;
    u = f < Yo ? 0 : f < Uo ? f - f * Ko * Dr : f - Dr;
  } else {
    const f = (c ** Hd - a ** Bd) * zd;
    u = f > -Yo ? 0 : f > -Uo ? f - f * Ko * Dr : f + Dr;
  }
  return u * 100;
}
const Xr = 0.20689655172413793, Ud = (e) => e > Xr ** 3 ? Math.cbrt(e) : e / (3 * Xr ** 2) + 4 / 29, Kd = (e) => e > Xr ? e ** 3 : 3 * Xr ** 2 * (e - 4 / 29);
function qa(e) {
  const t = Ud, n = t(e[1]);
  return [116 * n - 16, 500 * (t(e[0] / 0.95047) - n), 200 * (n - t(e[2] / 1.08883))];
}
function Za(e) {
  const t = Kd, n = (e[0] + 16) / 116;
  return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
const Yd = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]], Gd = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055, qd = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], Zd = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
function Xa(e) {
  const t = Array(3), n = Gd, r = Yd;
  for (let s = 0; s < 3; ++s)
    t[s] = Math.round(sr(n(r[s][0] * e[0] + r[s][1] * e[1] + r[s][2] * e[2])) * 255);
  return {
    r: t[0],
    g: t[1],
    b: t[2]
  };
}
function Ai(e) {
  let {
    r: t,
    g: n,
    b: r
  } = e;
  const s = [0, 0, 0], i = Zd, o = qd;
  t = i(t / 255), n = i(n / 255), r = i(r / 255);
  for (let l = 0; l < 3; ++l)
    s[l] = o[l][0] * t + o[l][1] * n + o[l][2] * r;
  return s;
}
function si(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function Xd(e) {
  return si(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const qo = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, Jd = {
  rgb: (e, t, n, r) => ({
    r: e,
    g: t,
    b: n,
    a: r
  }),
  rgba: (e, t, n, r) => ({
    r: e,
    g: t,
    b: n,
    a: r
  }),
  hsl: (e, t, n, r) => Zo({
    h: e,
    s: t,
    l: n,
    a: r
  }),
  hsla: (e, t, n, r) => Zo({
    h: e,
    s: t,
    l: n,
    a: r
  }),
  hsv: (e, t, n, r) => ir({
    h: e,
    s: t,
    v: n,
    a: r
  }),
  hsva: (e, t, n, r) => ir({
    h: e,
    s: t,
    v: n,
    a: r
  })
};
function pt(e) {
  if (typeof e == "number")
    return {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && qo.test(e)) {
    const {
      groups: t
    } = e.match(qo), {
      fn: n,
      values: r
    } = t, s = r.split(/,\s*|\s*\/\s*|\s+/).map((i, o) => i.endsWith("%") || // unitless slv are %
    o > 0 && o < 3 && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(i) / 100 : parseFloat(i));
    return Jd[n](...s);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    return [3, 4].includes(t.length) ? t = t.split("").map((n) => n + n).join("") : [6, 8].includes(t.length), eh(t);
  } else if (typeof e == "object") {
    if (Bs(e, ["r", "g", "b"]))
      return e;
    if (Bs(e, ["h", "s", "l"]))
      return ir(Ja(e));
    if (Bs(e, ["h", "s", "v"]))
      return ir(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function ir(e) {
  const {
    h: t,
    s: n,
    v: r,
    a: s
  } = e, i = (l) => {
    const a = (l + t / 60) % 6;
    return r - r * n * Math.max(Math.min(a, 4 - a, 1), 0);
  }, o = [i(5), i(3), i(1)].map((l) => Math.round(l * 255));
  return {
    r: o[0],
    g: o[1],
    b: o[2],
    a: s
  };
}
function Zo(e) {
  return ir(Ja(e));
}
function Ja(e) {
  const {
    h: t,
    s: n,
    l: r,
    a: s
  } = e, i = r + n * Math.min(r, 1 - r), o = i === 0 ? 0 : 2 - 2 * r / i;
  return {
    h: t,
    s: o,
    v: i,
    a: s
  };
}
function Pr(e) {
  const t = Math.round(e).toString(16);
  return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function Qd(e) {
  let {
    r: t,
    g: n,
    b: r,
    a: s
  } = e;
  return `#${[Pr(t), Pr(n), Pr(r), s !== void 0 ? Pr(Math.round(s * 255)) : ""].join("")}`;
}
function eh(e) {
  e = th(e);
  let [t, n, r, s] = Dd(e, 2).map((i) => parseInt(i, 16));
  return s = s === void 0 ? s : s / 255, {
    r: t,
    g: n,
    b: r,
    a: s
  };
}
function th(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = Lo(Lo(e, 6), 8, "F")), e;
}
function nh(e, t) {
  const n = qa(Ai(e));
  return n[0] = n[0] + t * 10, Xa(Za(n));
}
function rh(e, t) {
  const n = qa(Ai(e));
  return n[0] = n[0] - t * 10, Xa(Za(n));
}
function sh(e) {
  const t = pt(e);
  return Ai(t)[1];
}
function Qa(e) {
  const t = Math.abs(Go(pt(0), pt(e)));
  return Math.abs(Go(pt(16777215), pt(e))) > Math.min(t, 50) ? "#fff" : "#000";
}
function Z(e, t) {
  return (n) => Object.keys(e).reduce((r, s) => {
    const o = typeof e[s] == "object" && e[s] != null && !Array.isArray(e[s]) ? e[s] : {
      type: e[s]
    };
    return n && s in n ? r[s] = {
      ...o,
      default: n[s]
    } : r[s] = o, t && !r[s].source && (r[s].source = t), r;
  }, {});
}
const qe = Z({
  class: [String, Array, Object],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component");
function ot(e, t) {
  const n = vr();
  if (!n)
    throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);
  return n;
}
function Ft() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = ot(e).type;
  return sn(t?.aliasName || t?.name);
}
function ih(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ot("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
const Cn = /* @__PURE__ */ Symbol.for("vuetify:defaults");
function oh(e) {
  return /* @__PURE__ */ de(e);
}
function Ei() {
  const e = Ge(Cn);
  if (!e) throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function eu(e, t) {
  const n = Ei(), r = /* @__PURE__ */ de(e), s = H(() => {
    if (It(t?.disabled)) return n.value;
    const o = It(t?.scoped), l = It(t?.reset), a = It(t?.root);
    if (r.value == null && !(o || l || a)) return n.value;
    let c = Ke(r.value, {
      prev: n.value
    });
    if (o) return c;
    if (l || a) {
      const u = Number(l || 1 / 0);
      for (let f = 0; f <= u && !(!c || !("prev" in c)); f++)
        c = c.prev;
      return c && typeof a == "string" && a in c && (c = Ke(Ke(c, {
        prev: c
      }), c[a])), c;
    }
    return c.prev ? Ke(c.prev, c) : c;
  });
  return Tn(Cn, s), s;
}
function lh(e, t) {
  return e.props && (typeof e.props[t] < "u" || typeof e.props[sn(t)] < "u");
}
function ah() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Ei();
  const r = ot("useDefaults");
  if (t = t ?? r.type.name ?? r.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const s = H(() => n.value?.[e._as ?? t]), i = new Proxy(e, {
    get(a, c) {
      const u = Reflect.get(a, c);
      if (c === "class" || c === "style")
        return [s.value?.[c], u].filter((g) => g != null);
      if (lh(r.vnode, c)) return u;
      const f = s.value?.[c];
      if (f !== void 0) return f;
      const h = n.value?.global?.[c];
      return h !== void 0 ? h : u;
    }
  }), o = /* @__PURE__ */ Fe();
  an(() => {
    if (s.value) {
      const a = Object.entries(s.value).filter((c) => {
        let [u] = c;
        return u.startsWith(u[0].toUpperCase());
      });
      o.value = a.length ? Object.fromEntries(a) : void 0;
    } else
      o.value = void 0;
  });
  function l() {
    const a = ih(Cn, r);
    Tn(Cn, H(() => o.value ? Ke(a?.value ?? {}, o.value) : a?.value));
  }
  return {
    props: i,
    provideSubDefaults: l
  };
}
function yr(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return e;
  if (e._setup) {
    e.props = Z(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(r) {
      return za(r, t);
    }, e.props._as = String, e.setup = function(r, s) {
      const i = Ei();
      if (!i.value) return e._setup(r, s);
      const {
        props: o,
        provideSubDefaults: l
      } = ah(r, r._as ?? e.name, i), a = e._setup(o, s);
      return l(), a;
    };
  }
  return e;
}
function Te() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? yr : Lc)(t);
}
function uh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return Te()({
    name: n ?? kn(Me(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...qe()
    },
    setup(r, s) {
      let {
        slots: i
      } = s;
      return () => En(r.tag, {
        class: [e, r.class],
        style: r.style
      }, i.default?.());
    }
  });
}
function ch(e, t, n, r) {
  if (!n || Zr(e) || Zr(t)) return;
  const s = n.get(e);
  if (s)
    s.set(t, r);
  else {
    const i = /* @__PURE__ */ new WeakMap();
    i.set(t, r), n.set(e, i);
  }
}
function fh(e, t, n) {
  if (!n || Zr(e) || Zr(t)) return null;
  const r = n.get(e)?.get(t);
  if (typeof r == "boolean") return r;
  const s = n.get(t)?.get(e);
  return typeof s == "boolean" ? s : null;
}
function Di(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : /* @__PURE__ */ new WeakMap();
  if (e === t) return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const r = Object.keys(e);
  if (r.length !== Object.keys(t).length)
    return !1;
  const s = fh(e, t, n);
  return s || (ch(e, t, n, !0), r.every((i) => Di(e[i], t[i], n)));
}
const dh = "cubic-bezier(0.4, 0, 0.2, 1)", hh = {
  linear: (e) => e,
  easeInQuad: (e) => e ** 2,
  easeOutQuad: (e) => e * (2 - e),
  easeInOutQuad: (e) => e < 0.5 ? 2 * e ** 2 : -1 + (4 - 2 * e) * e,
  easeInCubic: (e) => e ** 3,
  easeOutCubic: (e) => --e ** 3 + 1,
  easeInOutCubic: (e) => e < 0.5 ? 4 * e ** 3 : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
  easeInQuart: (e) => e ** 4,
  easeOutQuart: (e) => 1 - --e ** 4,
  easeInOutQuart: (e) => e < 0.5 ? 8 * e ** 4 : 1 - 8 * --e ** 4,
  easeInQuint: (e) => e ** 5,
  easeOutQuint: (e) => 1 + --e ** 5,
  easeInOutQuint: (e) => e < 0.5 ? 16 * e ** 5 : 1 + 16 * --e ** 5,
  instant: (e) => 1
};
function Ze(e) {
  const t = ot("useRender");
  t.render = e;
}
const bt = [String, Function, Object, Array], ii = /* @__PURE__ */ Symbol.for("vuetify:icons"), Ss = Z({
  icon: {
    type: bt
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: [String, Object, Function],
    required: !0
  }
}, "icon"), Xo = Te()({
  name: "VComponentIcon",
  props: Ss(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return () => {
      const r = e.icon;
      return V(e.tag, null, {
        default: () => [e.icon ? V(r, null, null) : n.default?.()]
      });
    };
  }
}), tu = yr({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: Ss(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    return () => V(e.tag, De(n, {
      style: null
    }), {
      default: () => [v("svg", {
        class: "v-icon__svg",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-hidden": "true"
      }, [Array.isArray(e.icon) ? e.icon.map((r) => Array.isArray(r) ? v("path", {
        d: r[0],
        "fill-opacity": r[1]
      }, null) : v("path", {
        d: r
      }, null)) : v("path", {
        d: e.icon
      }, null)])]
    });
  }
});
yr({
  name: "VLigatureIcon",
  props: Ss(),
  setup(e) {
    return () => V(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
const nu = yr({
  name: "VClassIcon",
  props: Ss(),
  setup(e) {
    return () => V(e.tag, {
      class: he(e.icon)
    }, null);
  }
}), mh = (e) => {
  const t = Ge(ii);
  if (!t) throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: H(() => {
      const r = Kt(e);
      if (!r) return {
        component: Xo
      };
      let s = r;
      if (typeof s == "string" && (s = s.trim(), s.startsWith("$") && (s = t.aliases?.[s.slice(1)])), Array.isArray(s))
        return {
          component: tu,
          icon: s
        };
      if (typeof s != "string")
        return {
          component: Xo,
          icon: s
        };
      const i = Object.keys(t.sets).find((a) => typeof s == "string" && s.startsWith(`${a}:`)), o = i ? s.slice(i.length + 1) : s;
      return {
        component: t.sets[i ?? t.defaultSet].component,
        icon: o
      };
    })
  };
}, gh = {
  collapse: "mdi-chevron-up",
  complete: "mdi-check",
  cancel: "mdi-close-circle",
  close: "mdi-close",
  delete: "mdi-close-circle",
  // delete (e.g. v-chip close)
  clear: "mdi-close-circle",
  success: "mdi-check-circle",
  info: "mdi-information",
  warning: "mdi-alert-circle",
  error: "mdi-close-circle",
  prev: "mdi-chevron-left",
  next: "mdi-chevron-right",
  checkboxOn: "mdi-checkbox-marked",
  checkboxOff: "mdi-checkbox-blank-outline",
  checkboxIndeterminate: "mdi-minus-box",
  delimiter: "mdi-circle",
  // for carousel
  sortAsc: "mdi-arrow-up",
  sortDesc: "mdi-arrow-down",
  expand: "mdi-chevron-down",
  menu: "mdi-menu",
  subgroup: "mdi-menu-down",
  dropdown: "mdi-menu-down",
  radioOn: "mdi-radiobox-marked",
  radioOff: "mdi-radiobox-blank",
  edit: "mdi-pencil",
  ratingEmpty: "mdi-star-outline",
  ratingFull: "mdi-star",
  ratingHalf: "mdi-star-half-full",
  loading: "mdi-cached",
  first: "mdi-page-first",
  last: "mdi-page-last",
  unfold: "mdi-unfold-more-horizontal",
  file: "mdi-paperclip",
  plus: "mdi-plus",
  minus: "mdi-minus",
  calendar: "mdi-calendar",
  treeviewCollapse: "mdi-menu-down",
  treeviewExpand: "mdi-menu-right",
  tableGroupCollapse: "mdi-chevron-down",
  tableGroupExpand: "mdi-chevron-right",
  eyeDropper: "mdi-eyedropper",
  upload: "mdi-cloud-upload",
  color: "mdi-palette",
  command: "mdi-apple-keyboard-command",
  ctrl: "mdi-apple-keyboard-control",
  space: "mdi-keyboard-space",
  shift: "mdi-apple-keyboard-shift",
  alt: "mdi-apple-keyboard-option",
  enter: "mdi-keyboard-return",
  arrowup: "mdi-arrow-up",
  arrowdown: "mdi-arrow-down",
  arrowleft: "mdi-arrow-left",
  arrowright: "mdi-arrow-right",
  backspace: "mdi-backspace",
  play: "mdi-play",
  pause: "mdi-pause",
  fullscreen: "mdi-fullscreen",
  fullscreenExit: "mdi-fullscreen-exit",
  volumeHigh: "mdi-volume-high",
  volumeMedium: "mdi-volume-medium",
  volumeLow: "mdi-volume-low",
  volumeOff: "mdi-volume-variant-off",
  search: "mdi-magnify"
}, vh = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (e) => En(nu, {
    ...e,
    class: "mdi"
  })
};
function ph() {
  return {
    svg: {
      component: tu
    },
    class: {
      component: nu
    }
  };
}
function yh(e) {
  const t = ph(), n = e?.defaultSet ?? "mdi";
  return n === "mdi" && !t.mdi && (t.mdi = vh), Ke({
    defaultSet: n,
    sets: t,
    aliases: {
      ...gh,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z",
      "vuetify-play": ["m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z", ["M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z", 0.6]]
      /* eslint-enable max-len */
    }
  }, e);
}
function Jr(e, t) {
  let n;
  function r() {
    n = Us(), n.run(() => t.length ? t(() => {
      n?.stop(), r();
    }) : t());
  }
  Pe(e, (s) => {
    s && !n ? r() : s || (n?.stop(), n = void 0);
  }, {
    immediate: !0
  }), cs(() => {
    n?.stop();
  });
}
function fn(e, t, n) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (f) => f, s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (f) => f;
  const i = ot("useProxiedModel"), o = /* @__PURE__ */ de(e[t] !== void 0 ? e[t] : n), l = sn(t), c = H(l !== t ? () => (e[t], !!((i.vnode.props?.hasOwnProperty(t) || i.vnode.props?.hasOwnProperty(l)) && (i.vnode.props?.hasOwnProperty(`onUpdate:${t}`) || i.vnode.props?.hasOwnProperty(`onUpdate:${l}`)))) : () => (e[t], !!(i.vnode.props?.hasOwnProperty(t) && i.vnode.props?.hasOwnProperty(`onUpdate:${t}`))));
  Jr(() => !c.value, () => {
    Pe(() => e[t], (f) => {
      o.value = f;
    });
  });
  const u = H({
    get() {
      const f = e[t];
      return r(c.value ? f : o.value);
    },
    set(f) {
      const h = s(f), g = /* @__PURE__ */ ne(c.value ? e[t] : o.value);
      g === h || r(g) === f || (o.value = h, i?.emit(`update:${t}`, h));
    }
  });
  return Object.defineProperty(u, "externalValue", {
    get: () => c.value ? e[t] : o.value
  }), u;
}
const bh = {
  badge: "Badge",
  open: "Open",
  close: "Close",
  dismiss: "Dismiss",
  confirmEdit: {
    ok: "OK",
    cancel: "Cancel"
  },
  dataIterator: {
    noResultsText: "No matching records found",
    loadingText: "Loading items..."
  },
  dataTable: {
    itemsPerPageText: "Rows per page:",
    ariaLabel: {
      sortDescending: "Sorted descending.",
      sortAscending: "Sorted ascending.",
      sortNone: "Not sorted.",
      activateNone: "Activate to remove sorting.",
      activateDescending: "Activate to sort descending.",
      activateAscending: "Activate to sort ascending.",
      selectRow: "Select row",
      selectAll: "Select all",
      selectGroup: "Select group"
    },
    sortBy: "Sort by"
  },
  dataFooter: {
    itemsPerPageText: "Items per page:",
    itemsPerPageAll: "All",
    nextPage: "Next page",
    prevPage: "Previous page",
    firstPage: "First page",
    lastPage: "Last page",
    pageText: "{0}-{1} of {2}"
  },
  dateRangeInput: {
    divider: "to"
  },
  datePicker: {
    itemsSelected: "{0} selected",
    range: {
      title: "Select dates",
      header: "Enter dates"
    },
    title: "Select date",
    header: "Enter date",
    input: {
      placeholder: "Enter date"
    },
    ariaLabel: {
      previousMonth: "Previous month",
      nextMonth: "Next month",
      selectYear: "Select year",
      previousYear: "Previous year",
      nextYear: "Next year",
      selectMonth: "Select month",
      selectDate: "{0}",
      // Full date format
      currentDate: "Today, {0}"
    }
  },
  noDataText: "No data available",
  carousel: {
    prev: "Previous visual",
    next: "Next visual",
    ariaLabel: {
      delimiter: "Carousel slide {0} of {1}"
    }
  },
  calendar: {
    moreEvents: "{0} more",
    today: "Today"
  },
  input: {
    clear: "Clear {0}",
    prependAction: "{0} prepended action",
    appendAction: "{0} appended action",
    otp: "Please enter OTP character {0}"
  },
  fileInput: {
    counter: "{0} files",
    counterSize: "{0} files ({1} in total)"
  },
  fileUpload: {
    title: "Drag and drop files here",
    divider: "or",
    browse: "Browse Files"
  },
  timePicker: {
    am: "AM",
    pm: "PM",
    title: "Select Time",
    hour: "Hour",
    minute: "Minute",
    second: "Second",
    notAllowed: "Value is not allowed"
  },
  pagination: {
    ariaLabel: {
      root: "Pagination Navigation",
      next: "Next page",
      previous: "Previous page",
      page: "Go to page {0}",
      currentPage: "Page {0}, Current page",
      first: "First page",
      last: "Last page"
    }
  },
  stepper: {
    next: "Next",
    prev: "Previous"
  },
  rating: {
    ariaLabel: {
      item: "Rating {0} of {1}"
    }
  },
  loading: "Loading...",
  infiniteScroll: {
    loadMore: "Load more",
    empty: "No more"
  },
  rules: {
    required: "This field is required",
    email: "Please enter a valid email",
    number: "This field can only contain numbers",
    integer: "This field can only contain integer values",
    capital: "This field can only contain uppercase letters",
    maxLength: "You must enter a maximum of {0} characters",
    minLength: "You must enter a minimum of {0} characters",
    strictLength: "The length of the entered field is invalid",
    exclude: "The {0} character is not allowed",
    notEmpty: "Please choose at least one value",
    pattern: "Invalid format"
  },
  command: {
    search: "Type a command or search..."
  },
  hotkey: {
    then: "then",
    ctrl: "Ctrl",
    command: "Command",
    space: "Space",
    shift: "Shift",
    alt: "Alt",
    enter: "Enter",
    escape: "Escape",
    upArrow: "Up Arrow",
    downArrow: "Down Arrow",
    leftArrow: "Left Arrow",
    rightArrow: "Right Arrow",
    backspace: "Backspace",
    option: "Option",
    plus: "plus",
    shortcut: "Keyboard shortcut: {0}",
    or: "or"
  },
  video: {
    play: "Play",
    pause: "Pause",
    seek: "Seek",
    volume: "Volume",
    showVolume: "Show volume control",
    mute: "Mute",
    unmute: "Unmute",
    enterFullscreen: "Full screen",
    exitFullscreen: "Exit full screen"
  },
  colorPicker: {
    ariaLabel: {
      eyedropper: "Select color with eyedropper",
      hueSlider: "Hue",
      alphaSlider: "Alpha",
      redInput: "Red value",
      greenInput: "Green value",
      blueInput: "Blue value",
      alphaInput: "Alpha value",
      hueInput: "Hue value",
      saturationInput: "Saturation value",
      lightnessInput: "Lightness value",
      hexInput: "HEX value",
      hexaInput: "HEX with alpha value",
      changeFormat: "Change color format"
    }
  }
}, Jo = "$vuetify.", Qo = (e, t) => e.replace(/\{(\d+)\}/g, (n, r) => String(t[Number(r)])), ru = (e, t, n) => function(r) {
  for (var s = arguments.length, i = new Array(s > 1 ? s - 1 : 0), o = 1; o < s; o++)
    i[o - 1] = arguments[o];
  if (!r.startsWith(Jo))
    return Qo(r, i);
  const l = r.replace(Jo, ""), a = e.value && n.value[e.value], c = t.value && n.value[t.value];
  let u = Mo(a, l, null);
  return u || (`${r}${e.value}`, u = Mo(c, l, null)), u || (u = r), typeof u != "string" && (u = r), Qo(u, i);
};
function Pi(e, t) {
  return (n, r) => new Intl.NumberFormat([e.value, t.value], r).format(n);
}
function su(e, t) {
  return Pi(e, t)(0.1).includes(",") ? "," : ".";
}
function Hs(e, t, n) {
  const r = fn(e, t, e[t] ?? n.value);
  return r.value = e[t] ?? n.value, Pe(n, (s) => {
    e[t] == null && (r.value = n.value);
  }), r;
}
function iu(e) {
  return (t) => {
    const n = Hs(t, "locale", e.current), r = Hs(t, "fallback", e.fallback), s = Hs(t, "messages", e.messages);
    return {
      name: "vuetify",
      current: n,
      fallback: r,
      messages: s,
      decimalSeparator: /* @__PURE__ */ N(() => su(n, r)),
      t: ru(n, r, s),
      n: Pi(n, r),
      provide: iu({
        current: n,
        fallback: r,
        messages: s
      })
    };
  };
}
function _h(e) {
  const t = /* @__PURE__ */ Fe(e?.locale ?? "en"), n = /* @__PURE__ */ Fe(e?.fallback ?? "en"), r = /* @__PURE__ */ de({
    en: bh,
    ...e?.messages
  });
  return {
    name: "vuetify",
    current: t,
    fallback: n,
    messages: r,
    decimalSeparator: /* @__PURE__ */ N(() => e?.decimalSeparator ?? su(t, n)),
    t: ru(t, n, r),
    n: Pi(t, n),
    provide: iu({
      current: t,
      fallback: n,
      messages: r
    })
  };
}
const Qr = /* @__PURE__ */ Symbol.for("vuetify:locale");
function Sh(e) {
  return e.name != null;
}
function wh(e) {
  const t = e?.adapter && Sh(e?.adapter) ? e?.adapter : _h(e), n = xh(t, e);
  return {
    ...t,
    ...n
  };
}
function ou() {
  const e = Ge(Qr);
  if (!e) throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function Ch() {
  return {
    af: !1,
    ar: !0,
    bg: !1,
    ca: !1,
    ckb: !1,
    cs: !1,
    de: !1,
    el: !1,
    en: !1,
    es: !1,
    et: !1,
    fa: !0,
    fi: !1,
    fr: !1,
    hr: !1,
    hu: !1,
    he: !0,
    id: !1,
    it: !1,
    ja: !1,
    km: !1,
    ko: !1,
    lv: !1,
    lt: !1,
    nl: !1,
    no: !1,
    pl: !1,
    pt: !1,
    ro: !1,
    ru: !1,
    sk: !1,
    sl: !1,
    srCyrl: !1,
    srLatn: !1,
    sv: !1,
    th: !1,
    tr: !1,
    az: !1,
    uk: !1,
    vi: !1,
    zhHans: !1,
    zhHant: !1
  };
}
function xh(e, t) {
  const n = /* @__PURE__ */ de(t?.rtl ?? Ch()), r = H(() => n.value[e.current.value] ?? !1);
  return {
    isRtl: r,
    rtl: n,
    rtlClasses: /* @__PURE__ */ N(() => `v-locale--is-${r.value ? "rtl" : "ltr"}`)
  };
}
function ws() {
  const e = Ge(Qr);
  if (!e) throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
function br(e) {
  const t = e.slice(-2).toUpperCase();
  switch (!0) {
    case e === "GB-alt-variant":
      return {
        firstDay: 0,
        firstWeekSize: 4
      };
    case e === "001":
      return {
        firstDay: 1,
        firstWeekSize: 1
      };
    case `AG AS BD BR BS BT BW BZ CA CO DM DO ET GT GU HK HN ID IL IN JM JP KE
    KH KR LA MH MM MO MT MX MZ NI NP PA PE PH PK PR PY SA SG SV TH TT TW UM US
    VE VI WS YE ZA ZW`.includes(t):
      return {
        firstDay: 0,
        firstWeekSize: 1
      };
    case `AI AL AM AR AU AZ BA BM BN BY CL CM CN CR CY EC GE HR KG KZ LB LK LV
    MD ME MK MN MY NZ RO RS SI TJ TM TR UA UY UZ VN XK`.includes(t):
      return {
        firstDay: 1,
        firstWeekSize: 1
      };
    case `AD AN AT AX BE BG CH CZ DE DK EE ES FI FJ FO FR GB GF GP GR HU IE IS
    IT LI LT LU MC MQ NL NO PL RE RU SE SK SM VA`.includes(t):
      return {
        firstDay: 1,
        firstWeekSize: 4
      };
    case "AE AF BH DJ DZ EG IQ IR JO KW LY OM QA SD SY".includes(t):
      return {
        firstDay: 6,
        firstWeekSize: 1
      };
    case t === "MV":
      return {
        firstDay: 5,
        firstWeekSize: 1
      };
    case t === "PT":
      return {
        firstDay: 0,
        firstWeekSize: 4
      };
    default:
      return null;
  }
}
function kh(e, t, n) {
  const r = [];
  let s = [];
  const i = lu(e), o = au(e), l = n ?? br(t)?.firstDay ?? 0, a = (i.getDay() - l + 7) % 7, c = (o.getDay() - l + 7) % 7;
  for (let u = 0; u < a; u++) {
    const f = new Date(i);
    f.setDate(f.getDate() - (a - u)), s.push(f);
  }
  for (let u = 1; u <= o.getDate(); u++) {
    const f = new Date(e.getFullYear(), e.getMonth(), u);
    s.push(f), s.length === 7 && (r.push(s), s = []);
  }
  for (let u = 1; u < 7 - c; u++) {
    const f = new Date(o);
    f.setDate(f.getDate() + u), s.push(f);
  }
  return s.length > 0 && r.push(s), r;
}
function Kn(e, t, n) {
  let r = (n ?? br(t)?.firstDay ?? 0) % 7;
  [0, 1, 2, 3, 4, 5, 6].includes(r) || (r = 0);
  const s = new Date(e);
  for (; s.getDay() !== r; )
    s.setDate(s.getDate() - 1);
  return s;
}
function Th(e, t) {
  const n = new Date(e), r = ((br(t)?.firstDay ?? 0) + 6) % 7;
  for (; n.getDay() !== r; )
    n.setDate(n.getDate() + 1);
  return n;
}
function lu(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function au(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function Ah(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const Eh = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function uu(e) {
  if (e == null) return /* @__PURE__ */ new Date();
  if (e instanceof Date) return e;
  if (typeof e == "string") {
    let t;
    if (Eh.test(e))
      return Ah(e);
    if (t = Date.parse(e), !isNaN(t)) return new Date(t);
  }
  return null;
}
const el = new Date(2e3, 0, 2);
function Dh(e, t, n) {
  const r = t ?? br(e)?.firstDay ?? 0;
  return ja(7).map((s) => {
    const i = new Date(el);
    return i.setDate(el.getDate() + r + s), new Intl.DateTimeFormat(e, {
      weekday: n ?? "narrow"
    }).format(i);
  });
}
function Ph(e, t, n, r) {
  const s = uu(e) ?? /* @__PURE__ */ new Date(), i = r?.[t];
  if (typeof i == "function")
    return i(s, t, n);
  let o = {};
  switch (t) {
    case "fullDate":
      o = {
        year: "numeric",
        month: "short",
        day: "numeric"
      };
      break;
    case "fullDateWithWeekday":
      o = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      break;
    case "normalDate":
      const l = s.getDate(), a = new Intl.DateTimeFormat(n, {
        month: "long"
      }).format(s);
      return `${l} ${a}`;
    case "normalDateWithWeekday":
      o = {
        weekday: "short",
        day: "numeric",
        month: "short"
      };
      break;
    case "shortDate":
      o = {
        month: "short",
        day: "numeric"
      };
      break;
    case "year":
      o = {
        year: "numeric"
      };
      break;
    case "month":
      o = {
        month: "long"
      };
      break;
    case "monthShort":
      o = {
        month: "short"
      };
      break;
    case "monthAndYear":
      o = {
        month: "long",
        year: "numeric"
      };
      break;
    case "monthAndDate":
      o = {
        month: "long",
        day: "numeric"
      };
      break;
    case "weekday":
      o = {
        weekday: "long"
      };
      break;
    case "weekdayShort":
      o = {
        weekday: "short"
      };
      break;
    case "dayOfMonth":
      return new Intl.NumberFormat(n).format(s.getDate());
    case "hours12h":
      o = {
        hour: "numeric",
        hour12: !0
      };
      break;
    case "hours24h":
      o = {
        hour: "numeric",
        hour12: !1
      };
      break;
    case "minutes":
      o = {
        minute: "numeric"
      };
      break;
    case "seconds":
      o = {
        second: "numeric"
      };
      break;
    case "fullTime":
      o = {
        hour: "numeric",
        minute: "numeric"
      };
      break;
    case "fullTime12h":
      o = {
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      };
      break;
    case "fullTime24h":
      o = {
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      };
      break;
    case "fullDateTime":
      o = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      };
      break;
    case "fullDateTime12h":
      o = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      };
      break;
    case "fullDateTime24h":
      o = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      };
      break;
    case "keyboardDate":
      o = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      };
      break;
    case "keyboardDateTime":
      return o = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric"
      }, new Intl.DateTimeFormat(n, o).format(s).replace(/, /g, " ");
    case "keyboardDateTime12h":
      return o = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      }, new Intl.DateTimeFormat(n, o).format(s).replace(/, /g, " ");
    case "keyboardDateTime24h":
      return o = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      }, new Intl.DateTimeFormat(n, o).format(s).replace(/, /g, " ");
    default:
      o = i ?? {
        timeZone: "UTC",
        timeZoneName: "short"
      };
  }
  return new Intl.DateTimeFormat(n, o).format(s);
}
function Ih(e, t) {
  const n = e.toJsDate(t), r = n.getFullYear(), s = No(String(n.getMonth() + 1), 2, "0"), i = No(String(n.getDate()), 2, "0");
  return `${r}-${s}-${i}`;
}
function Oh(e) {
  const [t, n, r] = e.split("-").map(Number);
  return new Date(t, n - 1, r);
}
function $h(e, t) {
  const n = new Date(e);
  return n.setMinutes(n.getMinutes() + t), n;
}
function Mh(e, t) {
  const n = new Date(e);
  return n.setHours(n.getHours() + t), n;
}
function ln(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t), n;
}
function Fh(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t * 7), n;
}
function Rh(e, t) {
  const n = new Date(e);
  return n.setDate(1), n.setMonth(n.getMonth() + t), n;
}
function or(e) {
  return e.getFullYear();
}
function Lh(e) {
  return e.getMonth();
}
function Nh(e, t, n, r) {
  const s = br(t), i = n ?? s?.firstDay ?? 0, o = s?.firstWeekSize ?? 1;
  return r !== void 0 ? Vh(e, t, i, r) : Bh(e, t, i, o);
}
function Vh(e, t, n, r) {
  const s = (7 + r - n) % 7, i = Kn(e, t, n), o = ln(i, 6);
  function l(h) {
    return (7 + new Date(h, 0, 1).getDay() - n) % 7;
  }
  let a = or(i);
  a < or(o) && l(a + 1) <= s && a++;
  const c = new Date(a, 0, 1), u = l(a), f = u <= s ? ln(c, -u) : ln(c, 7 - u);
  return 1 + ts(Ii(i), lr(f), "weeks");
}
function Bh(e, t, n, r) {
  const s = Kn(e, t, n), i = ln(Kn(e, t, n), 6);
  function o(f) {
    const h = new Date(f, 0, 1);
    return 7 - ts(h, Kn(h, t, n), "days");
  }
  let l = or(s);
  l < or(i) && o(l + 1) >= r && l++;
  const a = new Date(l, 0, 1), c = o(l), u = c >= r ? ln(a, c - 7) : ln(a, c);
  return 1 + ts(Ii(s), lr(u), "weeks");
}
function Hh(e) {
  return e.getDate();
}
function Wh(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function jh(e) {
  return new Date(e.getFullYear(), e.getMonth() - 1, 1);
}
function zh(e) {
  return e.getHours();
}
function Uh(e) {
  return e.getMinutes();
}
function Kh(e) {
  return new Date(e.getFullYear(), 0, 1);
}
function Yh(e) {
  return new Date(e.getFullYear(), 11, 31);
}
function Gh(e, t) {
  return es(e, t[0]) && Xh(e, t[1]);
}
function qh(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime());
}
function es(e, t) {
  return e.getTime() > t.getTime();
}
function Zh(e, t) {
  return es(lr(e), lr(t));
}
function Xh(e, t) {
  return e.getTime() < t.getTime();
}
function tl(e, t) {
  return e.getTime() === t.getTime();
}
function Jh(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function Qh(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function em(e, t) {
  return e.getFullYear() === t.getFullYear();
}
function ts(e, t, n) {
  const r = new Date(e), s = new Date(t);
  switch (n) {
    case "years":
      return r.getFullYear() - s.getFullYear();
    case "quarters":
      return Math.floor((r.getMonth() - s.getMonth() + (r.getFullYear() - s.getFullYear()) * 12) / 4);
    case "months":
      return r.getMonth() - s.getMonth() + (r.getFullYear() - s.getFullYear()) * 12;
    case "weeks":
      return Math.floor((r.getTime() - s.getTime()) / (1e3 * 60 * 60 * 24 * 7));
    case "days":
      return Math.floor((r.getTime() - s.getTime()) / (1e3 * 60 * 60 * 24));
    case "hours":
      return Math.floor((r.getTime() - s.getTime()) / (1e3 * 60 * 60));
    case "minutes":
      return Math.floor((r.getTime() - s.getTime()) / (1e3 * 60));
    case "seconds":
      return Math.floor((r.getTime() - s.getTime()) / 1e3);
    default:
      return r.getTime() - s.getTime();
  }
}
function tm(e, t) {
  const n = new Date(e);
  return n.setHours(t), n;
}
function nm(e, t) {
  const n = new Date(e);
  return n.setMinutes(t), n;
}
function rm(e, t) {
  const n = new Date(e);
  return n.setMonth(t), n;
}
function sm(e, t) {
  const n = new Date(e);
  return n.setDate(t), n;
}
function im(e, t) {
  const n = new Date(e);
  return n.setFullYear(t), n;
}
function lr(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0, 0);
}
function Ii(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
class om {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats;
  }
  date(t) {
    return uu(t);
  }
  toJsDate(t) {
    return t;
  }
  toISO(t) {
    return Ih(this, t);
  }
  parseISO(t) {
    return Oh(t);
  }
  addMinutes(t, n) {
    return $h(t, n);
  }
  addHours(t, n) {
    return Mh(t, n);
  }
  addDays(t, n) {
    return ln(t, n);
  }
  addWeeks(t, n) {
    return Fh(t, n);
  }
  addMonths(t, n) {
    return Rh(t, n);
  }
  getWeekArray(t, n) {
    const r = n !== void 0 ? Number(n) : void 0;
    return kh(t, this.locale, r);
  }
  startOfWeek(t, n) {
    const r = n !== void 0 ? Number(n) : void 0;
    return Kn(t, this.locale, r);
  }
  endOfWeek(t) {
    return Th(t, this.locale);
  }
  startOfMonth(t) {
    return lu(t);
  }
  endOfMonth(t) {
    return au(t);
  }
  format(t, n) {
    return Ph(t, n, this.locale, this.formats);
  }
  isEqual(t, n) {
    return tl(t, n);
  }
  isValid(t) {
    return qh(t);
  }
  isWithinRange(t, n) {
    return Gh(t, n);
  }
  isAfter(t, n) {
    return es(t, n);
  }
  isAfterDay(t, n) {
    return Zh(t, n);
  }
  isBefore(t, n) {
    return !es(t, n) && !tl(t, n);
  }
  isSameDay(t, n) {
    return Jh(t, n);
  }
  isSameMonth(t, n) {
    return Qh(t, n);
  }
  isSameYear(t, n) {
    return em(t, n);
  }
  setMinutes(t, n) {
    return nm(t, n);
  }
  setHours(t, n) {
    return tm(t, n);
  }
  setMonth(t, n) {
    return rm(t, n);
  }
  setDate(t, n) {
    return sm(t, n);
  }
  setYear(t, n) {
    return im(t, n);
  }
  getDiff(t, n, r) {
    return ts(t, n, r);
  }
  getWeekdays(t, n) {
    const r = t !== void 0 ? Number(t) : void 0;
    return Dh(this.locale, r, n);
  }
  getYear(t) {
    return or(t);
  }
  getMonth(t) {
    return Lh(t);
  }
  getWeek(t, n, r) {
    const s = n !== void 0 ? Number(n) : void 0, i = r !== void 0 ? Number(r) : void 0;
    return Nh(t, this.locale, s, i);
  }
  getDate(t) {
    return Hh(t);
  }
  getNextMonth(t) {
    return Wh(t);
  }
  getPreviousMonth(t) {
    return jh(t);
  }
  getHours(t) {
    return zh(t);
  }
  getMinutes(t) {
    return Uh(t);
  }
  startOfDay(t) {
    return lr(t);
  }
  endOfDay(t) {
    return Ii(t);
  }
  startOfYear(t) {
    return Kh(t);
  }
  endOfYear(t) {
    return Yh(t);
  }
}
const lm = /* @__PURE__ */ Symbol.for("vuetify:date-options"), nl = /* @__PURE__ */ Symbol.for("vuetify:date-adapter");
function am(e, t) {
  const n = Ke({
    adapter: om,
    locale: {
      af: "af-ZA",
      // ar: '', # not the same value for all variants
      bg: "bg-BG",
      ca: "ca-ES",
      ckb: "",
      cs: "cs-CZ",
      de: "de-DE",
      el: "el-GR",
      en: "en-US",
      // es: '', # not the same value for all variants
      et: "et-EE",
      fa: "fa-IR",
      fi: "fi-FI",
      // fr: '', #not the same value for all variants
      hr: "hr-HR",
      hu: "hu-HU",
      he: "he-IL",
      id: "id-ID",
      it: "it-IT",
      ja: "ja-JP",
      ko: "ko-KR",
      lv: "lv-LV",
      lt: "lt-LT",
      nl: "nl-NL",
      no: "no-NO",
      pl: "pl-PL",
      pt: "pt-PT",
      ro: "ro-RO",
      ru: "ru-RU",
      sk: "sk-SK",
      sl: "sl-SI",
      srCyrl: "sr-SP",
      srLatn: "sr-SP",
      sv: "sv-SE",
      th: "th-TH",
      tr: "tr-TR",
      az: "az-AZ",
      uk: "uk-UA",
      vi: "vi-VN",
      zhHans: "zh-CN",
      zhHant: "zh-TW"
    }
  }, e);
  return {
    options: n,
    instance: um(n, t)
  };
}
function um(e, t) {
  const n = /* @__PURE__ */ wt(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return Pe(t.current, (r) => {
    n.locale = e.locale[r] ?? r ?? n.locale;
  }), n;
}
const rl = /* @__PURE__ */ Symbol.for("vuetify:display"), sl = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
}, cm = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : sl;
  return Ke(sl, e);
};
function il(e) {
  return Ve && !e ? window.innerWidth : typeof e == "object" && e.clientWidth || 0;
}
function ol(e) {
  return Ve && !e ? window.innerHeight : typeof e == "object" && e.clientHeight || 0;
}
function ll(e) {
  const t = Ve && !e ? window.navigator.userAgent : "ssr";
  function n(T) {
    return !!t.match(T);
  }
  const r = n(/android/i), s = n(/iphone|ipad|ipod/i), i = n(/cordova/i), o = n(/electron/i), l = n(/chrome/i), a = n(/edge/i), c = n(/firefox/i), u = n(/opera/i), f = n(/win/i), h = n(/mac/i), g = n(/linux/i);
  return {
    android: r,
    ios: s,
    cordova: i,
    electron: o,
    chrome: l,
    edge: a,
    firefox: c,
    opera: u,
    win: f,
    mac: h,
    linux: g,
    touch: Cd,
    ssr: t === "ssr"
  };
}
function fm(e, t) {
  const {
    thresholds: n,
    mobileBreakpoint: r
  } = cm(e), s = /* @__PURE__ */ Fe(ol(t)), i = /* @__PURE__ */ Fe(ll(t)), o = /* @__PURE__ */ wt({}), l = /* @__PURE__ */ Fe(il(t));
  function a() {
    s.value = ol(), l.value = il();
  }
  function c() {
    a(), i.value = ll();
  }
  return an(() => {
    const u = l.value < n.sm, f = l.value < n.md && !u, h = l.value < n.lg && !(f || u), g = l.value < n.xl && !(h || f || u), T = l.value < n.xxl && !(g || h || f || u), b = l.value >= n.xxl, p = u ? "xs" : f ? "sm" : h ? "md" : g ? "lg" : T ? "xl" : "xxl", A = typeof r == "number" ? r : n[r], S = l.value < A;
    o.xs = u, o.sm = f, o.md = h, o.lg = g, o.xl = T, o.xxl = b, o.smAndUp = !u, o.mdAndUp = !(u || f), o.lgAndUp = !(u || f || h), o.xlAndUp = !(u || f || h || g), o.smAndDown = !(h || g || T || b), o.mdAndDown = !(g || T || b), o.lgAndDown = !(T || b), o.xlAndDown = !b, o.name = p, o.height = s.value, o.width = l.value, o.mobile = S, o.mobileBreakpoint = r, o.platform = i.value, o.thresholds = n;
  }), Ve && (window.addEventListener("resize", a, {
    passive: !0
  }), cs(() => {
    window.removeEventListener("resize", a);
  }, !0)), {
    .../* @__PURE__ */ zl(o),
    update: c,
    ssr: !!t
  };
}
const dm = /* @__PURE__ */ Symbol.for("vuetify:goto");
function hm() {
  return {
    container: void 0,
    duration: 300,
    layout: !1,
    offset: 0,
    easing: "easeInOutCubic",
    patterns: hh
  };
}
function mm(e, t) {
  return {
    rtl: t.isRtl,
    options: Ke(hm(), e)
  };
}
const ar = /* @__PURE__ */ Symbol.for("vuetify:theme"), Rt = Z({
  theme: String
}, "theme");
function al() {
  return {
    defaultTheme: "light",
    prefix: "v-",
    variations: {
      colors: [],
      lighten: 0,
      darken: 0
    },
    themes: {
      light: {
        dark: !1,
        colors: {
          background: "#FFFFFF",
          surface: "#FFFFFF",
          "surface-bright": "#FFFFFF",
          "surface-light": "#EEEEEE",
          "surface-variant": "#424242",
          "on-surface-variant": "#EEEEEE",
          primary: "#1867C0",
          "primary-darken-1": "#1F5592",
          secondary: "#48A9A6",
          "secondary-darken-1": "#018786",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#000000",
          "border-opacity": 0.12,
          "high-emphasis-opacity": 0.87,
          "medium-emphasis-opacity": 0.6,
          "disabled-opacity": 0.38,
          "idle-opacity": 0.04,
          "hover-opacity": 0.04,
          "focus-opacity": 0.12,
          "selected-opacity": 0.08,
          "activated-opacity": 0.12,
          "pressed-opacity": 0.12,
          "dragged-opacity": 0.08,
          "theme-kbd": "#EEEEEE",
          "theme-on-kbd": "#000000",
          "theme-code": "#F5F5F5",
          "theme-on-code": "#000000"
        }
      },
      dark: {
        dark: !0,
        colors: {
          background: "#121212",
          surface: "#212121",
          "surface-bright": "#ccbfd6",
          "surface-light": "#424242",
          "surface-variant": "#c8c8c8",
          "on-surface-variant": "#000000",
          primary: "#2196F3",
          "primary-darken-1": "#277CC1",
          secondary: "#54B6B2",
          "secondary-darken-1": "#48A9A6",
          error: "#CF6679",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#FFFFFF",
          "border-opacity": 0.12,
          "high-emphasis-opacity": 1,
          "medium-emphasis-opacity": 0.7,
          "disabled-opacity": 0.5,
          "idle-opacity": 0.1,
          "hover-opacity": 0.04,
          "focus-opacity": 0.12,
          "selected-opacity": 0.08,
          "activated-opacity": 0.12,
          "pressed-opacity": 0.16,
          "dragged-opacity": 0.08,
          "theme-kbd": "#424242",
          "theme-on-kbd": "#FFFFFF",
          "theme-code": "#343434",
          "theme-on-code": "#CCCCCC"
        }
      }
    },
    stylesheetId: "vuetify-theme-stylesheet",
    scoped: !1,
    unimportant: !1,
    utilities: !0
  };
}
function gm() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : al();
  const t = al();
  if (!e) return {
    ...t,
    isDisabled: !0
  };
  const n = {};
  for (const [r, s] of Object.entries(e.themes ?? {})) {
    const i = s.dark || r === "dark" ? t.themes?.dark : t.themes?.light;
    n[r] = Ke(i, s);
  }
  return Ke(t, {
    ...e,
    themes: n
  });
}
function Xt(e, t, n, r) {
  e.push(`${bm(t, r)} {
`, ...n.map((s) => `  ${s};
`), `}
`);
}
function ul(e, t) {
  const n = e.dark ? 2 : 1, r = e.dark ? 1 : 2, s = [];
  for (const [i, o] of Object.entries(e.colors)) {
    const l = pt(o);
    s.push(`--${t}theme-${i}: ${l.r},${l.g},${l.b}`), i.startsWith("on-") || s.push(`--${t}theme-${i}-overlay-multiplier: ${sh(o) > 0.18 ? n : r}`);
  }
  for (const [i, o] of Object.entries(e.variables)) {
    const l = typeof o == "string" && o.startsWith("#") ? pt(o) : void 0, a = l ? `${l.r}, ${l.g}, ${l.b}` : void 0;
    s.push(`--${t}${i}: ${a ?? o}`);
  }
  return s;
}
function vm(e, t, n) {
  const r = {};
  if (n)
    for (const s of ["lighten", "darken"]) {
      const i = s === "lighten" ? nh : rh;
      for (const o of ja(n[s], 1))
        r[`${e}-${s}-${o}`] = Qd(i(pt(t), o));
    }
  return r;
}
function pm(e, t) {
  if (!t) return {};
  let n = {};
  for (const r of t.colors) {
    const s = e[r];
    s && (n = {
      ...n,
      ...vm(r, s, t)
    });
  }
  return n;
}
function ym(e) {
  const t = {};
  for (const n of Object.keys(e)) {
    if (n.startsWith("on-") || e[`on-${n}`]) continue;
    const r = `on-${n}`, s = pt(e[n]);
    t[r] = Qa(s);
  }
  return t;
}
function bm(e, t) {
  if (!t) return e;
  const n = `:where(${t})`;
  return e === ":root" ? n : `${n} ${e}`;
}
function _m(e, t, n) {
  const r = Sm(e, t);
  r && (r.innerHTML = n);
}
function Sm(e, t) {
  if (!Ve) return null;
  let n = document.getElementById(e);
  return n || (n = document.createElement("style"), n.id = e, n.type = "text/css", t && n.setAttribute("nonce", t), document.head.appendChild(n)), n;
}
function wm(e) {
  const t = gm(e), n = /* @__PURE__ */ Fe(t.defaultTheme), r = /* @__PURE__ */ de(t.themes), s = /* @__PURE__ */ Fe("light"), i = H({
    get() {
      return n.value === "system" ? s.value : n.value;
    },
    set(S) {
      n.value = S;
    }
  }), o = H(() => {
    const S = {};
    for (const [_, w] of Object.entries(r.value)) {
      const F = {
        ...w.colors,
        ...pm(w.colors, t.variations)
      };
      S[_] = {
        ...w,
        colors: {
          ...F,
          ...ym(F)
        }
      };
    }
    return S;
  }), l = /* @__PURE__ */ N(() => o.value[i.value]), a = /* @__PURE__ */ N(() => n.value === "system"), c = H(() => {
    const S = [], _ = t.unimportant ? "" : " !important", w = t.scoped ? t.prefix : "";
    l.value?.dark && Xt(S, ":root", ["color-scheme: dark"], t.scope), Xt(S, ":root", ul(l.value, t.prefix), t.scope);
    for (const [B, I] of Object.entries(o.value))
      Xt(S, `.${t.prefix}theme--${B}`, [`color-scheme: ${I.dark ? "dark" : "normal"}`, ...ul(I, t.prefix)], t.scope);
    if (t.utilities) {
      const B = [], I = [], M = new Set(Object.values(o.value).flatMap((L) => Object.keys(L.colors)));
      for (const L of M)
        L.startsWith("on-") ? Xt(I, `.${L}`, [`color: rgb(var(--${t.prefix}theme-${L}))${_}`], t.scope) : (Xt(B, `.${w}bg-${L}`, [`--${t.prefix}theme-overlay-multiplier: var(--${t.prefix}theme-${L}-overlay-multiplier)`, `background-color: rgb(var(--${t.prefix}theme-${L}))${_}`, `color: rgb(var(--${t.prefix}theme-on-${L}))${_}`], t.scope), Xt(I, `.${w}text-${L}`, [`color: rgb(var(--${t.prefix}theme-${L}))${_}`], t.scope), Xt(I, `.${w}border-${L}`, [`--${t.prefix}border-color: var(--${t.prefix}theme-${L})`], t.scope));
      t.layers ? S.push(`@layer background {
`, ...B.map((L) => `  ${L}`), `}
`, `@layer foreground {
`, ...I.map((L) => `  ${L}`), `}
`) : S.push(...B, ...I);
    }
    let F = S.map((B, I) => I === 0 ? B : `    ${B}`).join("");
    return t.layers && (F = `@layer vuetify.theme {
` + S.map((B) => `  ${B}`).join("") + `
}`), F;
  }), u = /* @__PURE__ */ N(() => t.isDisabled ? void 0 : `${t.prefix}theme--${i.value}`), f = /* @__PURE__ */ N(() => Object.keys(o.value));
  if (Wa) {
    let _ = function() {
      s.value = S.matches ? "dark" : "light";
    };
    var A = _;
    const S = window.matchMedia("(prefers-color-scheme: dark)");
    _(), S.addEventListener("change", _, {
      passive: !0
    }), Tl() && cs(() => {
      S.removeEventListener("change", _);
    });
  }
  function h(S) {
    if (t.isDisabled) return;
    const _ = S._context.provides.usehead;
    if (_) {
      let B = function() {
        return {
          style: [{
            textContent: c.value,
            id: t.stylesheetId,
            nonce: t.cspNonce || !1
          }]
        };
      };
      var w = B;
      if (_.push) {
        const I = _.push(B);
        Ve && Pe(c, () => {
          I.patch(B);
        });
      } else
        Ve ? (_.addHeadObjs(/* @__PURE__ */ N(B)), an(() => _.updateDOM())) : _.addHeadObjs(B());
    } else {
      let B = function() {
        _m(t.stylesheetId, t.cspNonce, c.value);
      };
      var F = B;
      Ve ? Pe(c, B, {
        immediate: !0
      }) : B();
    }
  }
  function g(S) {
    S !== "system" && !f.value.includes(S) || (i.value = S);
  }
  function T() {
    let S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : f.value;
    const _ = S.indexOf(i.value), w = _ === -1 ? 0 : (_ + 1) % S.length;
    g(S[w]);
  }
  function b() {
    let S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["light", "dark"];
    T(S);
  }
  const p = new Proxy(i, {
    get(S, _) {
      return Reflect.get(S, _);
    },
    set(S, _, w) {
      return _ === "value" && wd(`theme.global.name.value = ${w}`, `theme.change('${w}')`), Reflect.set(S, _, w);
    }
  });
  return {
    install: h,
    change: g,
    cycle: T,
    toggle: b,
    isDisabled: t.isDisabled,
    isSystem: a,
    name: i,
    themes: r,
    current: l,
    computedThemes: o,
    prefix: t.prefix,
    themeClasses: u,
    styles: c,
    global: {
      name: p,
      current: l
    }
  };
}
function dn(e) {
  ot("provideTheme");
  const t = Ge(ar, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  const n = /* @__PURE__ */ N(() => e.theme ?? t.name.value), i = {
    ...t,
    name: n,
    current: /* @__PURE__ */ N(() => t.themes.value[n.value]),
    themeClasses: /* @__PURE__ */ N(() => t.isDisabled ? void 0 : `${t.prefix}theme--${n.value}`)
  };
  return Tn(ar, i), i;
}
function Cm() {
  ot("useTheme");
  const e = Ge(ar, null);
  if (!e) throw new Error("Could not find Vuetify theme injection");
  return e;
}
function cu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = Pd(), r = /* @__PURE__ */ de();
  if (Ve) {
    const s = new ResizeObserver((i) => {
      e?.(i, s), i.length && (t === "content" ? r.value = i[0].contentRect : r.value = i[0].target.getBoundingClientRect());
    });
    An(() => {
      s.disconnect();
    }), Pe(() => n.el, (i, o) => {
      o && (s.unobserve(o), r.value = void 0), i && s.observe(i);
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: /* @__PURE__ */ Lr(r)
  };
}
function fu() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...n
  } = e, r = Ke(t, n), {
    aliases: s = {},
    components: i = {},
    directives: o = {}
  } = r, l = Us();
  return l.run(() => {
    const a = oh(r.defaults), c = fm(r.display, r.ssr), u = wm(r.theme), f = yh(r.icons), h = wh(r.locale), g = am(r.date, h), T = mm(r.goTo, h);
    function b(A) {
      for (const _ in o)
        A.directive(_, o[_]);
      for (const _ in i)
        A.component(_, i[_]);
      for (const _ in s)
        A.component(_, yr({
          ...s[_],
          name: _,
          aliasName: s[_].name
        }));
      const S = Us();
      if (S.run(() => {
        u.install(A);
      }), A.onUnmount(() => S.stop()), A.provide(Cn, a), A.provide(rl, c), A.provide(ar, u), A.provide(ii, f), A.provide(Qr, h), A.provide(lm, g.options), A.provide(nl, g.instance), A.provide(dm, T), Ve && r.ssr)
        if (A.$nuxt)
          A.$nuxt.hook("app:suspense:resolve", () => {
            c.update();
          });
        else {
          const {
            mount: _
          } = A;
          A.mount = function() {
            const w = _(...arguments);
            return zt(() => c.update()), A.mount = _, w;
          };
        }
      A.mixin({
        computed: {
          $vuetify() {
            return /* @__PURE__ */ wt({
              defaults: pn.call(this, Cn),
              display: pn.call(this, rl),
              theme: pn.call(this, ar),
              icons: pn.call(this, ii),
              locale: pn.call(this, Qr),
              date: pn.call(this, nl)
            });
          }
        }
      });
    }
    function p() {
      l.stop();
    }
    return {
      install: b,
      unmount: p,
      defaults: a,
      display: c,
      theme: u,
      icons: f,
      locale: h,
      date: g,
      goTo: T
    };
  });
}
const xm = "3.13.8";
fu.version = xm;
function pn(e) {
  const t = this.$, n = t.parent?.provides ?? t.vnode.appContext?.provides;
  if (n && e in n)
    return n[e];
}
const Dn = Z({
  tag: {
    type: [String, Object, Function],
    default: "div"
  }
}, "tag"), km = Z({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function Xe(e, t, n) {
  return Te()({
    name: e,
    props: km({
      mode: n,
      origin: t
    }),
    setup(r, s) {
      let {
        slots: i
      } = s;
      const o = {
        onBeforeEnter(l) {
          r.origin && (l.style.transformOrigin = r.origin);
        },
        onLeave(l) {
          if (r.leaveAbsolute) {
            const {
              offsetTop: a,
              offsetLeft: c,
              offsetWidth: u,
              offsetHeight: f
            } = l;
            l._transitionInitialStyles = {
              position: l.style.position,
              top: l.style.top,
              left: l.style.left,
              width: l.style.width,
              height: l.style.height
            }, l.style.position = "absolute", l.style.top = `${a}px`, l.style.left = `${c}px`, l.style.width = `${u}px`, l.style.height = `${f}px`;
          }
          r.hideOnLeave && l.style.setProperty("display", "none", "important");
        },
        onAfterLeave(l) {
          if (r.leaveAbsolute && l?._transitionInitialStyles) {
            const {
              position: a,
              top: c,
              left: u,
              width: f,
              height: h
            } = l._transitionInitialStyles;
            delete l._transitionInitialStyles, l.style.position = a || "", l.style.top = c || "", l.style.left = u || "", l.style.width = f || "", l.style.height = h || "";
          }
        }
      };
      return () => {
        const l = r.group ? xi : bs;
        return En(l, {
          name: r.disabled ? "" : e,
          css: !r.disabled,
          ...r.group ? void 0 : {
            mode: r.mode
          },
          ...r.disabled ? {} : o
        }, i.default);
      };
    }
  });
}
function Oi(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return Te()({
    name: e,
    props: {
      mode: {
        type: String,
        default: n
      },
      disabled: {
        type: Boolean,
        default: ki()
      },
      group: Boolean,
      hideOnLeave: Boolean
    },
    setup(r, s) {
      let {
        slots: i
      } = s;
      const o = r.group ? xi : bs;
      return () => En(o, {
        name: r.disabled ? "" : e,
        css: !r.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...r.disabled ? {} : {
          ...t,
          onLeave: (l) => {
            r.hideOnLeave ? l.style.setProperty("display", "none", "important") : t.onLeave?.(l);
          }
        }
      }, i.default);
    }
  });
}
function $i() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "y";
  return {
    onBeforeEnter(s) {
      s._parent = s.parentNode, s._initialStyle = {
        transition: s.style.transition,
        overflow: s.style.overflow,
        width: s.style.width,
        height: s.style.height
      };
    },
    onEnter(s) {
      const i = s._initialStyle;
      if (!i) return;
      s.style.setProperty("transition", "none", "important"), s.style.overflow = "hidden";
      const o = `${s.offsetWidth}px`, l = `${s.offsetHeight}px`;
      ["x", "both"].includes(t) && (s.style.width = "0"), ["y", "both"].includes(t) && (s.style.height = "0"), s.offsetHeight, s.style.transition = i.transition, e && s._parent && s._parent.classList.add(e), requestAnimationFrame(() => {
        ["x", "both"].includes(t) && (s.style.width = o), ["y", "both"].includes(t) && (s.style.height = l);
      });
    },
    onAfterEnter: r,
    onEnterCancelled: r,
    onLeave(s) {
      s._initialStyle = {
        transition: "",
        overflow: s.style.overflow,
        width: s.style.width,
        height: s.style.height
      }, s.style.overflow = "hidden", ["x", "both"].includes(t) && (s.style.width = `${s.offsetWidth}px`), ["y", "both"].includes(t) && (s.style.height = `${s.offsetHeight}px`), s.offsetHeight, requestAnimationFrame(() => {
        ["x", "both"].includes(t) && (s.style.width = "0"), ["y", "both"].includes(t) && (s.style.height = "0");
      });
    },
    onAfterLeave: n,
    onLeaveCancelled: n
  };
  function n(s) {
    e && s._parent && s._parent.classList.remove(e), r(s);
  }
  function r(s) {
    if (!s._initialStyle) return;
    const {
      width: i,
      height: o
    } = s._initialStyle;
    s.style.overflow = s._initialStyle.overflow, i != null && ["x", "both"].includes(t) && (s.style.width = i), o != null && ["y", "both"].includes(t) && (s.style.height = o), delete s._initialStyle;
  }
}
Xe("fab-transition", "center center", "out-in");
Xe("dialog-bottom-transition");
Xe("dialog-top-transition");
Xe("fade-transition");
Xe("scale-transition");
Xe("scroll-x-transition");
Xe("scroll-x-reverse-transition");
Xe("scroll-y-transition");
Xe("scroll-y-reverse-transition");
Xe("slide-x-transition");
Xe("slide-x-reverse-transition");
const du = Xe("slide-y-transition");
Xe("slide-y-reverse-transition");
Oi("expand-transition", $i());
const Tm = Oi("expand-x-transition", $i("", "x"));
Oi("expand-both-transition", $i("", "both"));
const Am = Z({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), Sn = Te(!1)({
  name: "VDefaultsProvider",
  props: Am(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      defaults: r,
      disabled: s,
      reset: i,
      root: o,
      scoped: l
    } = /* @__PURE__ */ zl(e);
    return eu(r, {
      reset: i,
      root: o,
      scoped: l,
      disabled: s
    }), () => n.default?.();
  }
}), Mi = Z({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function Fi(e) {
  return {
    dimensionStyles: H(() => {
      const n = {}, r = ve(e.height), s = ve(e.maxHeight), i = ve(e.maxWidth), o = ve(e.minHeight), l = ve(e.minWidth), a = ve(e.width);
      return r != null && (n.height = r), s != null && (n.maxHeight = s), i != null && (n.maxWidth = i), o != null && (n.minHeight = o), l != null && (n.minWidth = l), a != null && (n.width = a), n;
    })
  };
}
function Ri(e) {
  return Ka(() => {
    const {
      class: t,
      style: n
    } = Dm(e);
    return {
      colorClasses: t,
      colorStyles: n
    };
  });
}
function un(e) {
  const {
    colorClasses: t,
    colorStyles: n
  } = Ri(() => ({
    text: Kt(e)
  }));
  return {
    textColorClasses: t,
    textColorStyles: n
  };
}
function Mr(e) {
  const {
    colorClasses: t,
    colorStyles: n
  } = Ri(() => ({
    background: Kt(e)
  }));
  return {
    backgroundColorClasses: t,
    backgroundColorStyles: n
  };
}
function Em(e) {
  return {
    text: typeof e.text == "string" ? e.text.replace(/^text-/, "") : e.text,
    background: typeof e.background == "string" ? e.background.replace(/^bg-/, "") : e.background
  };
}
function Dm(e) {
  const t = Em(Kt(e)), n = [], r = {};
  if (t.background)
    if (si(t.background)) {
      if (r.backgroundColor = t.background, !t.text && Xd(t.background)) {
        const s = pt(t.background);
        if (s.a == null || s.a === 1) {
          const i = Qa(s);
          r.color = i, r.caretColor = i;
        }
      }
    } else
      n.push(`bg-${t.background}`);
  return t.text && (si(t.text) ? (r.color = t.text, r.caretColor = t.text) : n.push(`text-${t.text}`)), {
    class: n,
    style: r
  };
}
const _r = Z({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function Sr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ft();
  return {
    roundedClasses: H(() => {
      const r = /* @__PURE__ */ be(e) ? e.value : e.rounded, s = /* @__PURE__ */ be(e) ? !1 : e.tile, i = [];
      if (s || r === !1)
        i.push("rounded-0");
      else if (r === !0 || r === "")
        i.push(`${t}--rounded`);
      else if (typeof r == "string" || r === 0)
        for (const o of String(r).split(" "))
          i.push(`rounded-${o}`);
      return i;
    })
  };
}
const hu = Z({
  transition: {
    type: null,
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), mu = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: r,
    disabled: s,
    group: i,
    target: o,
    ...l
  } = e, {
    component: a = i ? xi : bs,
    ...c
  } = ni(r) ? r : {};
  let u;
  return ni(r) ? u = De(c, Id({
    disabled: s,
    group: i,
    target: o
  }), l) : u = De({
    name: s || !r ? "" : r
  }, l), En(a, u, n);
};
function cl(e, t) {
  if (!Ha) return;
  const n = t.modifiers || {}, r = t.value, {
    handler: s,
    options: i
  } = typeof r == "object" ? r : {
    handler: r,
    options: {}
  }, o = new IntersectionObserver(function() {
    let l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], a = arguments.length > 1 ? arguments[1] : void 0;
    const c = e._observe?.[t.instance.$.uid];
    if (!c) return;
    const u = l.some((f) => f.isIntersecting);
    s && (!n.quiet || c.init) && (!n.once || u || c.init) && s(u, l, a), u && n.once ? oi(e, t) : c.init = !0;
  }, i);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: o
  }, o.observe(e);
}
function oi(e, t) {
  const n = e._observe?.[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const fl = {
  mounted: cl,
  unmounted: oi,
  updated: (e, t) => {
    e._observe?.[t.instance.$.uid] && (oi(e, t), cl(e, t));
  }
}, gu = Z({
  border: [Boolean, Number, String]
}, "border");
function vu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ft();
  return {
    borderClasses: H(() => {
      const r = e.border;
      return r === !0 || r === "" ? `${t}--border` : typeof r == "string" || r === 0 ? String(r).split(" ").map((s) => `border-${s}`) : [];
    })
  };
}
const Li = Z({
  elevation: {
    type: [Number, String],
    validator(e) {
      const t = parseInt(e);
      return !isNaN(t) && t >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      t <= 24;
    }
  }
}, "elevation");
function Ni(e) {
  return {
    elevationClasses: /* @__PURE__ */ N(() => {
      const n = /* @__PURE__ */ be(e) ? e.value : e.elevation;
      return n == null ? [] : [`elevation-${n}`];
    })
  };
}
const dl = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Vi = Z({
  location: String
}, "location");
function Bi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: r
  } = ws();
  return {
    locationStyles: H(() => {
      if (!e.location) return {};
      const {
        side: i,
        align: o
      } = Md(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, r.value);
      function l(c) {
        return n ? n(c) : 0;
      }
      const a = {};
      return i !== "center" && (t ? a[dl[i]] = `calc(100% - ${l(i)}px)` : a[i] = 0), o !== "center" ? t ? a[dl[o]] = `calc(100% - ${l(o)}px)` : a[o] = 0 : (i === "center" ? a.top = a.left = "50%" : a[{
        top: "left",
        bottom: "left",
        left: "top",
        right: "top"
      }[i]] = "50%", a.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[i]), a;
    })
  };
}
const Pm = [null, "default", "comfortable", "compact"], Cs = Z({
  density: {
    type: String,
    default: "default",
    validator: (e) => Pm.includes(e)
  }
}, "density");
function xs(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ft();
  return {
    densityClasses: /* @__PURE__ */ N(() => `${t}--density-${e.density}`)
  };
}
const Im = ["x-small", "small", "default", "large", "x-large"], ks = Z({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function Hi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ft();
  return Ka(() => {
    const n = e.size;
    let r, s;
    return ri(Im, n) ? r = `${t}--size-${n}` : n && (s = {
      width: ve(n),
      height: ve(n)
    }), {
      sizeClasses: r,
      sizeStyles: s
    };
  });
}
const Om = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function pu(e, t) {
  return v(le, null, [e && v("span", {
    key: "overlay",
    class: he(`${t}__overlay`)
  }, null), v("span", {
    key: "underlay",
    class: he(`${t}__underlay`)
  }, null)]);
}
const Wi = Z({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => Om.includes(e)
  }
}, "variant");
function yu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ft();
  const n = /* @__PURE__ */ N(() => {
    const {
      variant: i
    } = Kt(e);
    return `${t}--variant-${i}`;
  }), {
    colorClasses: r,
    colorStyles: s
  } = Ri(() => {
    const {
      variant: i,
      color: o
    } = Kt(e);
    return {
      [["elevated", "flat"].includes(i) ? "background" : "text"]: o
    };
  });
  return {
    colorClasses: r,
    colorStyles: s,
    variantClasses: n
  };
}
const bu = Z({
  baseColor: String,
  divided: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...gu(),
  ...qe(),
  ...Cs(),
  ...Li(),
  ..._r(),
  ...ks({
    size: void 0
  }),
  ...Dn(),
  ...Rt(),
  ...Wi()
}, "VBtnGroup"), hl = Te()({
  name: "VBtnGroup",
  props: bu(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: r
    } = dn(e), {
      densityClasses: s
    } = xs(e), {
      borderClasses: i
    } = vu(e), {
      elevationClasses: o
    } = Ni(e), {
      roundedClasses: l
    } = Sr(e);
    eu({
      VBtn: {
        height: /* @__PURE__ */ N(() => e.direction === "horizontal" && e.size == null ? "auto" : null),
        baseColor: /* @__PURE__ */ N(() => e.baseColor),
        color: /* @__PURE__ */ N(() => e.color),
        density: /* @__PURE__ */ N(() => e.density),
        flat: !0,
        size: /* @__PURE__ */ N(() => e.size),
        variant: /* @__PURE__ */ N(() => e.variant)
      }
    }), Ze(() => V(e.tag, {
      class: he(["v-btn-group", `v-btn-group--${e.direction}`, {
        "v-btn-group--divided": e.divided,
        "v-btn-group--has-size": e.size != null
      }, r.value, i.value, s.value, o.value, l.value, e.class]),
      style: xe(e.style)
    }, n));
  }
}), $m = Z({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), Mm = Z({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function Fm(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const r = ot("useGroupItem");
  if (!r)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const s = hr();
  Tn(/* @__PURE__ */ Symbol.for(`${t.description}:id`), s);
  const i = Ge(t, null);
  if (!i) {
    if (!n) return i;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const o = /* @__PURE__ */ N(() => e.value), l = H(() => !!(i.disabled.value || e.disabled));
  function a() {
    i?.register({
      id: s,
      value: o,
      disabled: l
    }, r);
  }
  function c() {
    i?.unregister(s);
  }
  a(), An(() => c());
  const u = H(() => i.isSelected(s)), f = H(() => i.items.value[0].id === s), h = H(() => i.items.value[i.items.value.length - 1].id === s), g = H(() => u.value && [i.selectedClass.value, e.selectedClass]);
  return Pe(u, (T) => {
    r.emit("group:selected", {
      value: T
    });
  }, {
    flush: "sync"
  }), {
    id: s,
    isSelected: u,
    isFirst: f,
    isLast: h,
    toggle: () => i.select(s, !u.value),
    select: (T) => i.select(s, T),
    selectedClass: g,
    value: o,
    disabled: l,
    group: i,
    register: a,
    unregister: c
  };
}
function Rm(e, t) {
  let n = !1;
  const r = /* @__PURE__ */ wt([]), s = fn(e, "modelValue", [], (h) => h === void 0 ? [] : _u(r, h === null ? [null] : Un(h)), (h) => {
    const g = Nm(r, h);
    return e.multiple ? g : g[0];
  }), i = ot("useGroup");
  function o(h, g) {
    const T = h, b = /* @__PURE__ */ Symbol.for(`${t.description}:id`), A = Ln(b, i?.vnode).indexOf(g);
    It(T.value) === void 0 && (T.value = A, T.useIndexAsValue = !0), A > -1 ? r.splice(A, 0, T) : r.push(T);
  }
  function l(h) {
    if (n) return;
    a();
    const g = r.findIndex((T) => T.id === h);
    r.splice(g, 1);
  }
  function a() {
    const h = r.find((g) => !g.disabled);
    h && e.mandatory === "force" && !s.value.length && (s.value = [h.id]);
  }
  mr(() => {
    a();
  }), An(() => {
    n = !0;
  }), _i(() => {
    for (let h = 0; h < r.length; h++)
      r[h].useIndexAsValue && (r[h].value = h);
  });
  function c(h, g) {
    const T = r.find((b) => b.id === h);
    if (!(g && T?.disabled))
      if (e.multiple) {
        const b = s.value.slice(), p = b.findIndex((S) => S === h), A = ~p;
        if (g = g ?? !A, A && e.mandatory && b.length <= 1 || !A && e.max != null && b.length + 1 > e.max) return;
        p < 0 && g ? b.push(h) : p >= 0 && !g && b.splice(p, 1), s.value = b;
      } else {
        const b = s.value.includes(h);
        if (e.mandatory && b || !b && !g) return;
        s.value = g ?? !b ? [h] : [];
      }
  }
  function u(h) {
    if (e.multiple, s.value.length) {
      const g = s.value[0], T = r.findIndex((A) => A.id === g);
      let b = (T + h) % r.length, p = r[b];
      for (; p.disabled && b !== T; )
        b = (b + h) % r.length, p = r[b];
      if (p.disabled) return;
      s.value = [r[b].id];
    } else {
      const g = r.find((T) => !T.disabled);
      g && (s.value = [g.id]);
    }
  }
  const f = {
    register: o,
    unregister: l,
    selected: s,
    select: c,
    disabled: /* @__PURE__ */ N(() => e.disabled),
    prev: () => u(r.length - 1),
    next: () => u(1),
    isSelected: (h) => s.value.includes(h),
    selectedClass: /* @__PURE__ */ N(() => e.selectedClass),
    items: /* @__PURE__ */ N(() => r),
    getItemIndex: (h) => Lm(r, h)
  };
  return Tn(t, f), f;
}
function Lm(e, t) {
  const n = _u(e, [t]);
  return n.length ? e.findIndex((r) => r.id === n[0]) : -1;
}
function _u(e, t) {
  const n = [];
  return t.forEach((r) => {
    const s = e.find((o) => Di(r, o.value)), i = e[r];
    s?.value !== void 0 ? n.push(s.id) : i?.useIndexAsValue && n.push(i.id);
  }), n;
}
function Nm(e, t) {
  const n = [];
  return t.forEach((r) => {
    const s = e.findIndex((i) => i.id === r);
    if (~s) {
      const i = e[s];
      n.push(i.value !== void 0 ? i.value : s);
    }
  }), n;
}
const Su = /* @__PURE__ */ Symbol.for("vuetify:v-btn-toggle"), Vm = Z({
  ...bu(),
  ...$m()
}, "VBtnToggle");
Te()({
  name: "VBtnToggle",
  props: Vm(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isSelected: r,
      next: s,
      prev: i,
      select: o,
      selected: l
    } = Rm(e, Su);
    return Ze(() => {
      const a = hl.filterProps(e);
      return V(hl, De({
        class: ["v-btn-toggle", e.class]
      }, a, {
        style: e.style
      }), {
        default: () => [n.default?.({
          isSelected: r,
          next: s,
          prev: i,
          select: o,
          selected: l
        })]
      });
    }), {
      next: s,
      prev: i,
      select: o
    };
  }
});
const Bm = Z({
  color: String,
  disabled: Boolean,
  start: Boolean,
  end: Boolean,
  icon: bt,
  opacity: [String, Number],
  ...qe(),
  ...ks(),
  ...Dn({
    tag: "i"
  }),
  ...Rt()
}, "VIcon"), Yn = Te()({
  name: "VIcon",
  props: Bm(),
  setup(e, t) {
    let {
      attrs: n,
      slots: r
    } = t;
    const s = /* @__PURE__ */ Fe(), {
      themeClasses: i
    } = Cm(), {
      iconData: o
    } = mh(() => s.value || e.icon), {
      sizeClasses: l
    } = Hi(e), {
      textColorClasses: a,
      textColorStyles: c
    } = un(() => e.color);
    return Ze(() => {
      const u = r.default?.();
      u && (s.value = Ua(u).filter((h) => h.type === gr && h.children && typeof h.children == "string")[0]?.children);
      const f = !!(n.onClick || n.onClickOnce);
      return V(o.value.component, {
        tag: e.tag,
        icon: o.value.icon,
        class: he(["v-icon", "notranslate", i.value, l.value, a.value, {
          "v-icon--clickable": f,
          "v-icon--disabled": e.disabled,
          "v-icon--start": e.start,
          "v-icon--end": e.end
        }, e.class]),
        style: xe([{
          "--v-icon-opacity": e.opacity
        }, l.value ? void 0 : {
          fontSize: ve(e.size),
          height: ve(e.size),
          width: ve(e.size)
        }, c.value, e.style]),
        role: f ? "button" : void 0,
        "aria-hidden": !f,
        tabindex: f ? e.disabled ? -1 : 0 : void 0
      }, {
        default: () => [u]
      });
    }), {};
  }
});
function wu(e, t) {
  const n = /* @__PURE__ */ de(), r = /* @__PURE__ */ Fe(!1);
  if (Ha) {
    const s = new IntersectionObserver((i) => {
      r.value = !!i.find((o) => o.isIntersecting);
    }, t);
    cs(() => {
      s.disconnect();
    }), Pe(n, (i, o) => {
      o && (s.unobserve(o), r.value = !1), i && s.observe(i);
    }, {
      flush: "post"
    });
  }
  return {
    intersectionRef: n,
    isIntersecting: r
  };
}
const Hm = Z({
  reveal: {
    type: [Boolean, Object],
    default: !1
  }
}, "reveal");
function Wm(e) {
  const n = /* @__PURE__ */ N(() => typeof e.reveal == "object" ? Math.max(0, Number(e.reveal.duration ?? 900)) : 900), r = /* @__PURE__ */ Fe(e.reveal ? "initial" : "disabled");
  return mr(async () => {
    e.reveal && (r.value = "initial", await new Promise((s) => requestAnimationFrame(s)), r.value = "pending", await new Promise((s) => setTimeout(s, n.value)), r.value = "done");
  }), {
    duration: n,
    state: r
  };
}
const jm = Z({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String],
  rounded: Boolean,
  modelValue: {
    type: [Number, String],
    default: 0
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  width: {
    type: [Number, String],
    default: 4
  },
  ...qe(),
  ...Hm(),
  ...ks(),
  ...Dn({
    tag: "div"
  }),
  ...Rt()
}, "VProgressCircular"), zm = Te()({
  name: "VProgressCircular",
  props: jm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = 20, s = 2 * Math.PI * r, i = /* @__PURE__ */ de(), {
      themeClasses: o
    } = dn(e), {
      sizeClasses: l,
      sizeStyles: a
    } = Hi(e), {
      textColorClasses: c,
      textColorStyles: u
    } = un(() => e.color), {
      textColorClasses: f,
      textColorStyles: h
    } = un(() => e.bgColor), {
      intersectionRef: g,
      isIntersecting: T
    } = wu(), {
      resizeRef: b,
      contentRect: p
    } = cu(), {
      state: A,
      duration: S
    } = Wm(e), _ = /* @__PURE__ */ N(() => A.value === "initial" ? 0 : sr(parseFloat(e.modelValue), 0, 100)), w = /* @__PURE__ */ N(() => Number(e.width)), F = /* @__PURE__ */ N(() => a.value ? Number(e.size) : p.value ? p.value.width : Math.max(w.value, 32)), B = /* @__PURE__ */ N(() => r / (1 - w.value / F.value) * 2), I = /* @__PURE__ */ N(() => w.value / F.value * B.value), M = /* @__PURE__ */ N(() => {
      const K = (100 - _.value) / 100 * s;
      return e.rounded && _.value > 0 && _.value < 100 ? ve(Math.min(s - 0.01, K + I.value)) : ve(K);
    }), L = H(() => {
      const K = Number(e.rotate);
      return e.rounded ? K + I.value / 2 / s * 360 : K;
    });
    return an(() => {
      g.value = i.value, b.value = i.value;
    }), Ze(() => V(e.tag, {
      ref: i,
      class: he(["v-progress-circular", {
        "v-progress-circular--indeterminate": !!e.indeterminate,
        "v-progress-circular--visible": T.value,
        "v-progress-circular--disable-shrink": e.indeterminate && (e.indeterminate === "disable-shrink" || ki()),
        "v-progress-circular--revealing": ["initial", "pending"].includes(A.value)
      }, o.value, l.value, c.value, e.class]),
      style: xe([a.value, u.value, {
        "--progress-reveal-duration": `${S.value}ms`
      }, e.style]),
      role: "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": e.indeterminate ? void 0 : _.value
    }, {
      default: () => [v("svg", {
        style: {
          transform: `rotate(calc(-90deg + ${L.value}deg))`
        },
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${B.value} ${B.value}`
      }, [v("circle", {
        class: he(["v-progress-circular__underlay", f.value]),
        style: xe(h.value),
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r,
        "stroke-width": I.value,
        "stroke-dasharray": s,
        "stroke-dashoffset": 0
      }, null), v("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r,
        "stroke-width": I.value,
        "stroke-dasharray": s,
        "stroke-dashoffset": M.value,
        "stroke-linecap": e.rounded ? "round" : void 0
      }, null)]), n.default && v("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: _.value
      })])]
    })), {};
  }
}), Um = Z({
  chunkCount: {
    type: [Number, String],
    default: null
  },
  chunkWidth: {
    type: [Number, String],
    default: null
  },
  chunkGap: {
    type: [Number, String],
    default: 4
  }
}, "chunks");
function Km(e, t) {
  const n = /* @__PURE__ */ N(() => !!e.chunkCount || !!e.chunkWidth), r = H(() => {
    const l = Kt(t);
    if (!l)
      return 0;
    if (!e.chunkCount)
      return Number(e.chunkWidth);
    const a = Number(e.chunkCount);
    return (l - Number(e.chunkGap) * (a - 1)) / a;
  }), s = /* @__PURE__ */ N(() => Number(e.chunkGap)), i = H(() => {
    if (!n.value)
      return {};
    const l = ve(s.value), a = ve(r.value);
    return {
      maskRepeat: "repeat-x",
      maskImage: `linear-gradient(90deg, #000, #000 ${a}, transparent ${a}, transparent)`,
      maskSize: `calc(${a} + ${l}) 100%`
    };
  });
  function o(l) {
    const a = Kt(t);
    if (!a)
      return l;
    const c = 100 * s.value / a, u = 100 * (r.value + s.value) / a, f = Math.floor((l + c) / u + 1e-9);
    return sr(f * u - c / 2, 0, 100);
  }
  return {
    hasChunks: n,
    chunksMaskStyles: i,
    snapValueToChunk: o
  };
}
const Ym = Z({
  absolute: Boolean,
  active: {
    type: Boolean,
    default: !0
  },
  bgColor: String,
  bgOpacity: [Number, String],
  bufferValue: {
    type: [Number, String],
    default: 0
  },
  bufferColor: String,
  bufferOpacity: [Number, String],
  clickable: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 4
  },
  indeterminate: Boolean,
  max: {
    type: [Number, String],
    default: 100
  },
  modelValue: {
    type: [Number, String],
    default: 0
  },
  opacity: [Number, String],
  reverse: Boolean,
  stream: Boolean,
  striped: Boolean,
  roundedBar: Boolean,
  ...Um(),
  ...qe(),
  ...Vi({
    location: "top"
  }),
  ..._r(),
  ...Dn(),
  ...Rt()
}, "VProgressLinear"), Gm = Te()({
  name: "VProgressLinear",
  props: Ym(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = /* @__PURE__ */ de(), s = fn(e, "modelValue"), {
      isRtl: i,
      rtlClasses: o
    } = ws(), {
      themeClasses: l
    } = dn(e), {
      locationStyles: a
    } = Bi(e), {
      textColorClasses: c,
      textColorStyles: u
    } = un(() => e.color), {
      backgroundColorClasses: f,
      backgroundColorStyles: h
    } = Mr(() => e.bgColor || e.color), {
      backgroundColorClasses: g,
      backgroundColorStyles: T
    } = Mr(() => e.bufferColor || e.bgColor || e.color), {
      backgroundColorClasses: b,
      backgroundColorStyles: p
    } = Mr(() => e.color), {
      roundedClasses: A
    } = Sr(e), {
      intersectionRef: S,
      isIntersecting: _
    } = wu(), w = H(() => parseFloat(e.max)), F = H(() => parseFloat(e.height)), B = H(() => sr(parseFloat(e.bufferValue) / w.value * 100, 0, 100)), I = H(() => sr(parseFloat(s.value) / w.value * 100, 0, 100)), M = H(() => i.value !== e.reverse), L = H(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), K = /* @__PURE__ */ Fe(0), {
      hasChunks: U,
      chunksMaskStyles: D,
      snapValueToChunk: X
    } = Km(e, K);
    Jr(U, () => {
      const {
        resizeRef: J
      } = cu((q) => K.value = q[0].contentRect.width);
      an(() => J.value = r.value);
    });
    const ee = H(() => U.value ? X(B.value) : B.value), _e = H(() => U.value ? X(I.value) : I.value);
    function ae(J) {
      if (!S.value) return;
      const {
        left: q,
        right: Se,
        width: Ae
      } = S.value.getBoundingClientRect(), ke = M.value ? Ae - J.clientX + (Se - Ae) : J.clientX - q;
      s.value = Math.round(ke / Ae * w.value);
    }
    return an(() => {
      S.value = r.value;
    }), Ze(() => V(e.tag, {
      ref: r,
      class: he(["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && _.value,
        "v-progress-linear--reverse": M.value,
        "v-progress-linear--rounded": e.rounded,
        "v-progress-linear--rounded-bar": e.roundedBar,
        "v-progress-linear--striped": e.striped,
        "v-progress-linear--clickable": e.clickable
      }, A.value, l.value, o.value, e.class]),
      style: xe([{
        bottom: e.location === "bottom" ? 0 : void 0,
        top: e.location === "top" ? 0 : void 0,
        height: e.active ? ve(F.value) : 0,
        "--v-progress-linear-height": ve(F.value),
        ...e.absolute ? a.value : {}
      }, D.value, e.style]),
      role: "progressbar",
      "aria-hidden": e.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": e.max,
      "aria-valuenow": e.indeterminate ? void 0 : Math.min(parseFloat(s.value), w.value),
      onClick: e.clickable && ae
    }, {
      default: () => [e.stream && v("div", {
        key: "stream",
        class: he(["v-progress-linear__stream", c.value]),
        style: {
          ...u.value,
          [M.value ? "left" : "right"]: ve(-F.value),
          borderTop: `${ve(F.value / 2)} dotted`,
          opacity: e.bufferOpacity != null ? parseFloat(e.bufferOpacity) : void 0,
          top: `calc(50% - ${ve(F.value / 4)})`,
          width: ve(100 - B.value, "%"),
          "--v-progress-linear-stream-to": ve(F.value * (M.value ? 1 : -1))
        }
      }, null), v("div", {
        class: he(["v-progress-linear__background", f.value]),
        style: xe([h.value, {
          opacity: e.bgOpacity != null ? parseFloat(e.bgOpacity) : void 0,
          width: e.stream ? 0 : void 0
        }])
      }, null), v("div", {
        class: he(["v-progress-linear__buffer", g.value]),
        style: xe([T.value, {
          opacity: e.bufferOpacity != null ? parseFloat(e.bufferOpacity) : void 0,
          width: ve(ee.value, "%")
        }])
      }, null), V(bs, {
        name: L.value
      }, {
        default: () => [e.indeterminate ? v("div", {
          class: "v-progress-linear__indeterminate"
        }, [["long", "short"].map((J) => v("div", {
          key: J,
          class: he(["v-progress-linear__indeterminate", J, b.value]),
          style: xe(p.value)
        }, null))]) : v("div", {
          class: he(["v-progress-linear__determinate", b.value]),
          style: xe([p.value, {
            width: ve(_e.value, "%")
          }])
        }, null)]
      }), n.default && v("div", {
        class: "v-progress-linear__content"
      }, [n.default({
        value: I.value,
        buffer: B.value
      })])]
    })), {};
  }
}), Cu = Z({
  loading: [Boolean, String]
}, "loader");
function xu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ft();
  return {
    loaderClasses: /* @__PURE__ */ N(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function qm(e, t) {
  let {
    slots: n
  } = t;
  return v("div", {
    class: he(`${e.name}__loader`)
  }, [n.default?.({
    color: e.color,
    isActive: e.active
  }) || V(Gm, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const Zm = ["static", "relative", "fixed", "absolute", "sticky"], ku = Z({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => Zm.includes(e)
    )
  }
}, "position");
function Tu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ft();
  return {
    positionClasses: /* @__PURE__ */ N(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function Xm() {
  const e = ot("useRoute");
  return H(() => e?.proxy?.$route);
}
function Jm(e, t) {
  const n = Gc("RouterLink"), r = /* @__PURE__ */ N(() => !!(e.href || e.to)), s = H(() => r?.value || Vo(t, "click") || Vo(e, "click"));
  if (typeof n == "string" || !("useLink" in n)) {
    const f = /* @__PURE__ */ N(() => e.href);
    return {
      isLink: r,
      isRouterLink: /* @__PURE__ */ N(() => !1),
      isClickable: s,
      href: f,
      linkProps: /* @__PURE__ */ wt({
        href: f
      }),
      route: /* @__PURE__ */ N(() => {
      }),
      navigate: /* @__PURE__ */ N(() => {
      })
    };
  }
  const i = n.useLink({
    to: /* @__PURE__ */ N(() => e.to || ""),
    replace: /* @__PURE__ */ N(() => e.replace)
  }), o = H(() => e.to ? i : void 0), l = Xm(), a = H(() => o.value ? e.exact ? l.value ? o.value.isExactActive?.value && Di(o.value.route.value.query, l.value.query) : o.value.isExactActive?.value ?? !1 : o.value.isActive?.value ?? !1 : !1), c = H(() => e.to ? o.value?.route.value.href : e.href);
  return {
    isLink: r,
    isRouterLink: /* @__PURE__ */ N(() => !!e.to),
    isClickable: s,
    isActive: a,
    route: /* @__PURE__ */ N(() => o.value?.route.value),
    navigate: /* @__PURE__ */ N(() => o.value?.navigate),
    href: c,
    linkProps: /* @__PURE__ */ wt({
      href: c,
      "aria-current": /* @__PURE__ */ N(() => a.value ? "page" : void 0),
      "aria-disabled": /* @__PURE__ */ N(() => e.disabled && r.value ? "true" : void 0),
      tabindex: /* @__PURE__ */ N(() => e.disabled && r.value ? "-1" : void 0)
    })
  };
}
const Qm = Z({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
function eg(e, t) {
  Pe(() => e.isActive?.value, (n) => {
    e.isLink.value && n != null && t && zt(() => {
      t(n);
    });
  }, {
    immediate: !0
  });
}
const li = /* @__PURE__ */ Symbol("rippleStop"), tg = 80;
function ml(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function ai(e) {
  return e.constructor.name === "TouchEvent";
}
function Au(e) {
  return e.constructor.name === "KeyboardEvent";
}
const ng = function(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = 0, s = 0;
  if (!Au(e)) {
    const f = new Ht(t), h = ai(e) ? e.touches[e.touches.length - 1] : e, g = Fd([h.clientX, h.clientY]);
    r = g.x - f.left, s = g.y - f.top;
  }
  let i = 0, o = 0.3;
  t._ripple?.circle ? (o = 0.15, i = t.clientWidth / 2, i = n.center ? i : i + Math.sqrt((r - i) ** 2 + (s - i) ** 2) / 4) : i = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2;
  const l = `${(t.clientWidth - i * 2) / 2}px`, a = `${(t.clientHeight - i * 2) / 2}px`, c = n.center ? l : `${r - i}px`, u = n.center ? a : `${s - i}px`;
  return {
    radius: i,
    scale: o,
    x: c,
    y: u,
    centerX: l,
    centerY: a
  };
}, ns = {
  /* eslint-disable max-statements */
  show(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!t?._ripple?.enabled)
      return;
    const r = document.createElement("span"), s = document.createElement("span");
    r.appendChild(s), r.className = "v-ripple__container", n.class && (r.className += ` ${n.class}`);
    const {
      radius: i,
      scale: o,
      x: l,
      y: a,
      centerX: c,
      centerY: u
    } = ng(e, t, n), f = `${i * 2}px`;
    s.className = "v-ripple__animation", s.style.width = f, s.style.height = f, t.appendChild(r);
    const h = window.getComputedStyle(t);
    h && h.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), s.classList.add("v-ripple__animation--enter"), s.classList.add("v-ripple__animation--visible"), ml(s, `translate(${l}, ${a}) scale3d(${o},${o},${o})`), s.dataset.activated = String(performance.now()), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        s.classList.remove("v-ripple__animation--enter"), s.classList.add("v-ripple__animation--in"), ml(s, `translate(${c}, ${u}) scale3d(1,1,1)`);
      });
    });
  },
  hide(e) {
    if (!e?._ripple?.enabled) return;
    const t = e.getElementsByClassName("v-ripple__animation");
    if (t.length === 0) return;
    const n = Array.from(t).findLast((i) => !i.dataset.isHiding);
    if (n) n.dataset.isHiding = "true";
    else return;
    const r = performance.now() - Number(n.dataset.activated), s = Math.max(250 - r, 0);
    setTimeout(() => {
      n.classList.remove("v-ripple__animation--in"), n.classList.add("v-ripple__animation--out"), setTimeout(() => {
        e.getElementsByClassName("v-ripple__animation").length === 1 && e.dataset.previousPosition && (e.style.position = e.dataset.previousPosition, delete e.dataset.previousPosition), n.parentNode?.parentNode === e && e.removeChild(n.parentNode);
      }, 300);
    }, s);
  }
};
function Eu(e) {
  return typeof e > "u" || !!e;
}
function ur(e) {
  const t = {}, n = e.currentTarget;
  if (!(!n?._ripple || n._ripple.touched || e[li])) {
    if (e[li] = !0, ai(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch) return;
    if (t.center = n._ripple.centered || Au(e), n._ripple.class && (t.class = n._ripple.class), ai(e)) {
      if (n._ripple.showTimerCommit) return;
      n._ripple.showTimerCommit = () => {
        ns.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        n?._ripple?.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, tg);
    } else
      ns.show(e, n, t);
  }
}
function rs(e) {
  e[li] = !0;
}
function je(e) {
  const t = e.currentTarget;
  if (t?._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        je(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), ns.hide(t);
  }
}
function Du(e) {
  const t = e.currentTarget;
  t?._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let cr = !1;
function rg(e, t) {
  !cr && t.includes(e.key) && (cr = !0, ur(e));
}
function Pu(e) {
  cr = !1, je(e);
}
function Iu(e) {
  cr && (cr = !1, je(e));
}
function Ou(e, t, n) {
  const {
    value: r,
    modifiers: s
  } = t, i = Eu(r);
  i || ns.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = i, e._ripple.centered = s.center, e._ripple.circle = s.circle;
  const o = ni(r) ? r : {};
  o.class && (e._ripple.class = o.class);
  const l = o.keys ?? ["Enter", "Space"];
  if (e._ripple.keyDownHandler = (a) => rg(a, l), i && !n) {
    if (s.stop) {
      e.addEventListener("touchstart", rs, {
        passive: !0
      }), e.addEventListener("mousedown", rs);
      return;
    }
    e.addEventListener("touchstart", ur, {
      passive: !0
    }), e.addEventListener("touchend", je, {
      passive: !0
    }), e.addEventListener("touchmove", Du, {
      passive: !0
    }), e.addEventListener("touchcancel", je), e.addEventListener("mousedown", ur), e.addEventListener("mouseup", je), e.addEventListener("mouseleave", je), e.addEventListener("keydown", e._ripple.keyDownHandler), e.addEventListener("keyup", Pu), e.addEventListener("blur", Iu), e.addEventListener("dragstart", je, {
      passive: !0
    });
  } else !i && n && $u(e);
}
function $u(e) {
  e.removeEventListener("touchstart", rs), e.removeEventListener("mousedown", rs), e.removeEventListener("touchstart", ur), e.removeEventListener("touchend", je), e.removeEventListener("touchmove", Du), e.removeEventListener("touchcancel", je), e.removeEventListener("mousedown", ur), e.removeEventListener("mouseup", je), e.removeEventListener("mouseleave", je), e._ripple?.keyDownHandler && e.removeEventListener("keydown", e._ripple.keyDownHandler), e.removeEventListener("keyup", Pu), e.removeEventListener("blur", Iu), e.removeEventListener("dragstart", je);
}
function sg(e, t) {
  Ou(e, t, !1);
}
function ig(e) {
  $u(e), delete e._ripple;
}
function og(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = Eu(t.oldValue);
  Ou(e, t, n);
}
const lg = {
  mounted: sg,
  unmounted: ig,
  updated: og
}, ag = Z({
  active: {
    type: Boolean,
    default: void 0
  },
  activeColor: String,
  baseColor: String,
  symbol: {
    type: null,
    default: Su
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: bt,
  appendIcon: bt,
  block: Boolean,
  readonly: Boolean,
  slim: Boolean,
  stacked: Boolean,
  spaced: String,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...gu(),
  ...qe(),
  ...Cs(),
  ...Mi(),
  ...Li(),
  ...Mm(),
  ...Cu(),
  ...Vi(),
  ...ku(),
  ..._r(),
  ...Qm(),
  ...ks(),
  ...Dn({
    tag: "button"
  }),
  ...Rt(),
  ...Wi({
    variant: "elevated"
  })
}, "VBtn"), Mu = Te()({
  name: "VBtn",
  props: ag(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: r
    } = t;
    const {
      themeClasses: s
    } = dn(e), {
      borderClasses: i
    } = vu(e), {
      densityClasses: o
    } = xs(e), {
      dimensionStyles: l
    } = Fi(e), {
      elevationClasses: a
    } = Ni(e), {
      loaderClasses: c
    } = xu(e), {
      locationStyles: u
    } = Bi(e), {
      positionClasses: f
    } = Tu(e), {
      roundedClasses: h
    } = Sr(e), {
      sizeClasses: g,
      sizeStyles: T
    } = Hi(e), b = Fm(e, e.symbol, !1), p = Jm(e, n), A = H(() => e.active !== void 0 ? e.active : p.isRouterLink.value ? p.isActive?.value : b?.isSelected.value), S = /* @__PURE__ */ N(() => A.value ? e.activeColor ?? e.color : e.color), _ = H(() => ({
      color: b?.isSelected.value && (!p.isLink.value || p.isActive?.value) || !b || p.isActive?.value ? S.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    })), {
      colorClasses: w,
      colorStyles: F,
      variantClasses: B
    } = yu(_), I = H(() => b?.disabled.value || e.disabled), M = /* @__PURE__ */ N(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), L = H(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function K(U) {
      I.value || p.isLink.value && (U.metaKey || U.ctrlKey || U.shiftKey || U.button !== 0 || n.target === "_blank") || (p.isRouterLink.value ? p.navigate.value?.(U) : b?.toggle());
    }
    return eg(p, b?.select), Ze(() => {
      const U = p.isLink.value ? "a" : e.tag, D = !!(e.prependIcon || r.prepend), X = !!(e.appendIcon || r.append), ee = !!(e.icon && e.icon !== !0);
      return dr(V(U, De(p.linkProps, {
        type: U === "a" ? void 0 : "button",
        class: ["v-btn", b?.selectedClass.value, {
          "v-btn--active": A.value,
          "v-btn--block": e.block,
          "v-btn--disabled": I.value,
          "v-btn--elevated": M.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--readonly": e.readonly,
          "v-btn--slim": e.slim,
          "v-btn--stacked": e.stacked
        }, e.spaced ? ["v-btn--spaced", `v-btn--spaced-${e.spaced}`] : [], s.value, i.value, w.value, o.value, a.value, c.value, f.value, h.value, g.value, B.value, e.class],
        style: [F.value, l.value, u.value, T.value, e.style],
        "aria-busy": e.loading ? !0 : void 0,
        disabled: I.value && U !== "a" || void 0,
        tabindex: e.loading || e.readonly ? -1 : void 0,
        onClick: K,
        value: L.value
      }), {
        default: () => [pu(!0, "v-btn"), !e.icon && D && v("span", {
          key: "prepend",
          class: "v-btn__prepend"
        }, [r.prepend ? V(Sn, {
          key: "prepend-defaults",
          disabled: !e.prependIcon,
          defaults: {
            VIcon: {
              icon: e.prependIcon
            }
          }
        }, r.prepend) : V(Yn, {
          key: "prepend-icon",
          icon: e.prependIcon
        }, null)]), v("span", {
          class: "v-btn__content",
          "data-no-activator": ""
        }, [!r.default && ee ? V(Yn, {
          key: "content-icon",
          icon: e.icon
        }, null) : V(Sn, {
          key: "content-defaults",
          disabled: !ee,
          defaults: {
            VIcon: {
              icon: e.icon
            }
          }
        }, {
          default: () => [r.default?.() ?? se(e.text)]
        })]), !e.icon && X && v("span", {
          key: "append",
          class: "v-btn__append"
        }, [r.append ? V(Sn, {
          key: "append-defaults",
          disabled: !e.appendIcon,
          defaults: {
            VIcon: {
              icon: e.appendIcon
            }
          }
        }, r.append) : V(Yn, {
          key: "append-icon",
          icon: e.appendIcon
        }, null)]), !!e.loading && v("span", {
          key: "loader",
          class: "v-btn__loader"
        }, [r.loader?.() ?? V(zm, {
          color: typeof e.loading == "boolean" ? void 0 : e.loading,
          indeterminate: !0,
          width: "2"
        }, null)])]
      }), [[lg, !I.value && e.ripple, "", {
        center: !!e.icon
      }]]);
    }), {
      group: b
    };
  }
}), ug = uh("v-alert-title"), cg = Z({
  iconSize: [Number, String],
  iconSizes: {
    type: Array,
    default: () => [["x-small", 10], ["small", 16], ["default", 24], ["large", 28], ["x-large", 32]]
  }
}, "iconSize");
function fg(e, t) {
  return {
    iconSize: H(() => {
      const r = new Map(e.iconSizes), s = e.iconSize ?? t() ?? "default";
      return r.has(s) ? r.get(s) : s;
    })
  };
}
const dg = ["success", "info", "warning", "error"], hg = Z({
  border: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["top", "end", "bottom", "start"].includes(e)
  },
  borderColor: String,
  closable: Boolean,
  closeIcon: {
    type: bt,
    default: "$close"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  icon: {
    type: [Boolean, String, Function, Object],
    default: null
  },
  modelValue: {
    type: Boolean,
    default: !0
  },
  prominent: Boolean,
  title: String,
  text: String,
  type: {
    type: String,
    validator: (e) => dg.includes(e)
  },
  ...qe(),
  ...Cs(),
  ...Mi(),
  ...Li(),
  ...cg(),
  ...Vi(),
  ...ku(),
  ..._r(),
  ...Dn(),
  ...Rt(),
  ...Wi({
    variant: "flat"
  })
}, "VAlert"), mg = Te()({
  name: "VAlert",
  props: hg(),
  emits: {
    "click:close": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n,
      slots: r
    } = t;
    const s = fn(e, "modelValue"), i = /* @__PURE__ */ N(() => {
      if (e.icon !== !1)
        return e.type ? e.icon ?? `$${e.type}` : e.icon;
    }), {
      iconSize: o
    } = fg(e, () => e.prominent ? 44 : void 0), {
      themeClasses: l
    } = dn(e), {
      colorClasses: a,
      colorStyles: c,
      variantClasses: u
    } = yu(() => ({
      color: e.color ?? e.type,
      variant: e.variant
    })), {
      densityClasses: f
    } = xs(e), {
      dimensionStyles: h
    } = Fi(e), {
      elevationClasses: g
    } = Ni(e), {
      locationStyles: T
    } = Bi(e), {
      positionClasses: b
    } = Tu(e), {
      roundedClasses: p
    } = Sr(e), {
      textColorClasses: A,
      textColorStyles: S
    } = un(() => e.borderColor), {
      t: _
    } = ou(), w = /* @__PURE__ */ N(() => ({
      "aria-label": _(e.closeLabel),
      onClick(F) {
        s.value = !1, n("click:close", F);
      }
    }));
    return () => {
      const F = !!(r.prepend || i.value), B = !!(r.title || e.title), I = !!(r.close || e.closable), M = {
        density: e.density,
        icon: i.value,
        size: e.iconSize || e.prominent ? o.value : void 0
      };
      return s.value && V(e.tag, {
        class: he(["v-alert", e.border && {
          "v-alert--border": !!e.border,
          [`v-alert--border-${e.border === !0 ? "start" : e.border}`]: !0
        }, {
          "v-alert--prominent": e.prominent
        }, l.value, a.value, f.value, g.value, b.value, p.value, u.value, e.class]),
        style: xe([c.value, h.value, T.value, e.style]),
        role: "alert"
      }, {
        default: () => [pu(!1, "v-alert"), e.border && v("div", {
          key: "border",
          class: he(["v-alert__border", A.value]),
          style: xe(S.value)
        }, null), F && v("div", {
          key: "prepend",
          class: "v-alert__prepend"
        }, [r.prepend ? V(Sn, {
          key: "prepend-defaults",
          disabled: !i.value,
          defaults: {
            VIcon: {
              ...M
            }
          }
        }, r.prepend) : V(Yn, De({
          key: "prepend-icon"
        }, M), null)]), v("div", {
          class: "v-alert__content"
        }, [B && V(ug, {
          key: "title"
        }, {
          default: () => [r.title?.() ?? e.title]
        }), r.text?.() ?? e.text, r.default?.()]), r.append && v("div", {
          key: "append",
          class: "v-alert__append"
        }, [r.append()]), I && v("div", {
          key: "close",
          class: "v-alert__close"
        }, [r.close ? V(Sn, {
          key: "close-defaults",
          defaults: {
            VBtn: {
              icon: e.closeIcon,
              size: "x-small",
              variant: "text"
            }
          }
        }, {
          default: () => [r.close?.({
            props: w.value
          })]
        }) : V(Mu, De({
          key: "close-btn",
          icon: e.closeIcon,
          size: "x-small",
          variant: "text"
        }, w.value), null)])]
      });
    };
  }
}), gg = Z({
  text: String,
  onClick: on(),
  ...qe(),
  ...Rt()
}, "VLabel"), vg = Te()({
  name: "VLabel",
  props: gg(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Ze(() => v("label", {
      class: he(["v-label", {
        "v-label--clickable": !!e.onClick
      }, e.class]),
      style: xe(e.style),
      onClick: e.onClick
    }, [e.text, n.default?.()])), {};
  }
});
function Fu(e) {
  const {
    t
  } = ou();
  function n(r) {
    let {
      name: s,
      color: i,
      ...o
    } = r;
    const l = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[s], a = e[`onClick:${s}`];
    function c(f) {
      f.key !== "Enter" && f.key !== " " || (f.preventDefault(), f.stopPropagation(), Ya(a, new PointerEvent("click", f)));
    }
    const u = a && l ? t(`$vuetify.input.${l}`, e.label ?? "") : void 0;
    return V(Yn, De({
      icon: e[`${s}Icon`],
      "aria-label": u,
      onClick: a,
      onKeydown: c,
      color: i
    }, o), null);
  }
  return {
    InputIcon: n
  };
}
const pg = Z({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...qe(),
  ...hu({
    transition: {
      component: du,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), yg = Te()({
  name: "VMessages",
  props: pg(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = H(() => Un(e.messages)), {
      textColorClasses: s,
      textColorStyles: i
    } = un(() => e.color);
    return Ze(() => V(mu, {
      transition: e.transition,
      tag: "div",
      class: he(["v-messages", s.value, e.class]),
      style: xe([i.value, e.style])
    }, {
      default: () => [e.active && r.value.map((o, l) => v("div", {
        class: "v-messages__message",
        key: `${l}-${r.value}`
      }, [n.message ? n.message({
        message: o
      }) : o]))]
    })), {};
  }
}), Ru = Z({
  focused: Boolean,
  "onUpdate:focused": on()
}, "focus");
function Lu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ft();
  const n = fn(e, "focused"), r = /* @__PURE__ */ N(() => ({
    [`${t}--focused`]: n.value
  }));
  function s() {
    n.value = !0;
  }
  function i() {
    n.value = !1;
  }
  return {
    focusClasses: r,
    isFocused: n,
    focus: s,
    blur: i
  };
}
const bg = /* @__PURE__ */ Symbol.for("vuetify:form");
function _g(e) {
  const t = Ge(bg, null);
  return {
    ...t,
    isReadonly: H(() => !!(e?.readonly ?? t?.isReadonly.value)),
    isDisabled: H(() => !!(e?.disabled ?? t?.isDisabled.value))
  };
}
const Sg = /* @__PURE__ */ Symbol.for("vuetify:rules");
function wg(e) {
  const t = Ge(Sg, null);
  if (!e) {
    if (!t)
      throw new Error("Could not find Vuetify rules injection");
    return t.aliases;
  }
  return t?.resolve(e) ?? /* @__PURE__ */ N(e);
}
const Cg = Z({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  errorMessages: {
    type: [Array, String],
    default: () => []
  },
  maxErrors: {
    type: [Number, String],
    default: 1
  },
  name: String,
  label: String,
  readonly: {
    type: Boolean,
    default: null
  },
  rules: {
    type: Array,
    default: () => []
  },
  modelValue: null,
  validateOn: String,
  validationValue: null,
  ...Ru()
}, "validation");
function xg(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ft(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : hr();
  const r = fn(e, "modelValue"), s = H(() => e.validationValue === void 0 ? r.value : e.validationValue), i = _g(e), o = wg(() => e.rules), l = /* @__PURE__ */ de([]), a = /* @__PURE__ */ Fe(!0), c = H(() => !!(Un(r.value === "" ? null : r.value).length || Un(s.value === "" ? null : s.value).length)), u = H(() => e.errorMessages?.length ? Un(e.errorMessages).concat(l.value).slice(0, Math.max(0, Number(e.maxErrors))) : l.value), f = H(() => {
    let F = (e.validateOn ?? i.validateOn?.value) || "input";
    F === "lazy" && (F = "input lazy"), F === "eager" && (F = "input eager");
    const B = new Set(F?.split(" ") ?? []);
    return {
      input: B.has("input"),
      blur: B.has("blur") || B.has("input") || B.has("invalid-input"),
      invalidInput: B.has("invalid-input"),
      lazy: B.has("lazy"),
      eager: B.has("eager")
    };
  }), h = H(() => e.error || e.errorMessages?.length ? !1 : e.rules.length ? a.value ? l.value.length || f.value.lazy ? null : !0 : !l.value.length : !0), g = /* @__PURE__ */ Fe(!1);
  let T = !1;
  const b = H(() => ({
    [`${t}--error`]: h.value === !1,
    [`${t}--dirty`]: c.value,
    [`${t}--disabled`]: i.isDisabled.value,
    [`${t}--readonly`]: i.isReadonly.value
  })), p = ot("validation"), A = H(() => e.name ?? It(n));
  ia(() => {
    i.register?.({
      id: A.value,
      vm: p,
      validate: w,
      reset: S,
      resetValidation: _
    });
  }), An(() => {
    i.unregister?.(A.value);
  }), mr(async () => {
    f.value.lazy || await w(!f.value.eager), i.update?.(A.value, h.value, u.value);
  }), Jr(() => f.value.input || f.value.invalidInput && h.value === !1, () => {
    Pe(s, () => {
      T || w();
    });
  }), Jr(() => f.value.blur, () => {
    Pe(() => e.focused, (F) => {
      F || w();
    });
  }), Pe([h, u], () => {
    i.update?.(A.value, h.value, u.value);
  });
  async function S() {
    T = !0, r.value = null, await zt(), T = !1, await _();
  }
  async function _() {
    a.value = !0, f.value.lazy ? l.value = [] : await w(!f.value.eager);
  }
  async function w() {
    let F = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const B = [];
    g.value = !0;
    for (const I of o.value) {
      if (B.length >= Number(e.maxErrors ?? 1))
        break;
      const L = await (typeof I == "function" ? I : () => I)(s.value);
      if (L !== !0) {
        if (L !== !1 && typeof L != "string") {
          console.warn(`${L} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        B.push(L || "");
      }
    }
    return l.value = B, g.value = !1, a.value = F, l.value;
  }
  return {
    errorMessages: u,
    isDirty: c,
    isDisabled: i.isDisabled,
    isReadonly: i.isReadonly,
    isPristine: a,
    isValid: h,
    isValidating: g,
    reset: S,
    resetValidation: _,
    validate: w,
    validationClasses: b
  };
}
const Nu = Z({
  id: String,
  appendIcon: bt,
  baseColor: String,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  color: String,
  glow: Boolean,
  iconColor: [Boolean, String],
  prependIcon: bt,
  hideDetails: [Boolean, String],
  hideSpinButtons: Boolean,
  hint: String,
  persistentHint: Boolean,
  messages: {
    type: [Array, String],
    default: () => []
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (e) => ["horizontal", "vertical"].includes(e)
  },
  "onClick:prepend": on(),
  "onClick:append": on(),
  ...qe(),
  ...Cs(),
  ...za(Mi(), ["maxWidth", "minWidth", "width"]),
  ...Rt(),
  ...Cg()
}, "VInput"), gl = Te()({
  name: "VInput",
  props: {
    ...Nu()
  },
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: r,
      emit: s
    } = t;
    const {
      densityClasses: i
    } = xs(e), {
      dimensionStyles: o
    } = Fi(e), {
      themeClasses: l
    } = dn(e), {
      rtlClasses: a
    } = ws(), {
      InputIcon: c
    } = Fu(e), u = hr(), f = H(() => e.id || `input-${u}`), {
      errorMessages: h,
      isDirty: g,
      isDisabled: T,
      isReadonly: b,
      isPristine: p,
      isValid: A,
      isValidating: S,
      reset: _,
      resetValidation: w,
      validate: F,
      validationClasses: B
    } = xg(e, "v-input", f), I = H(() => e.errorMessages?.length || !p.value && h.value.length ? h.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages), M = /* @__PURE__ */ N(() => I.value.length > 0), L = /* @__PURE__ */ N(() => !e.hideDetails || e.hideDetails === "auto" && (M.value || !!r.details)), K = H(() => L.value ? `${f.value}-messages` : void 0), U = H(() => ({
      id: f,
      messagesId: K,
      isDirty: g,
      isDisabled: T,
      isReadonly: b,
      isPristine: p,
      isValid: A,
      isValidating: S,
      hasDetails: L,
      reset: _,
      resetValidation: w,
      validate: F
    })), D = /* @__PURE__ */ N(() => e.error || e.disabled ? void 0 : e.focused ? e.color : e.baseColor), X = /* @__PURE__ */ N(() => {
      if (e.iconColor)
        return e.iconColor === !0 ? D.value : e.iconColor;
    });
    return Ze(() => {
      const ee = !!(r.prepend || e.prependIcon), _e = !!(r.append || e.appendIcon);
      return v("div", {
        class: he(["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--focused": e.focused,
          "v-input--glow": e.glow,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, i.value, l.value, a.value, B.value, e.class]),
        style: xe([o.value, e.style])
      }, [ee && v("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [r.prepend ? r.prepend(U.value) : e.prependIcon && V(c, {
        key: "prepend-icon",
        name: "prepend",
        color: X.value
      }, null)]), r.default && v("div", {
        class: "v-input__control"
      }, [r.default?.(U.value)]), _e && v("div", {
        key: "append",
        class: "v-input__append"
      }, [r.append ? r.append(U.value) : e.appendIcon && V(c, {
        key: "append-icon",
        name: "append",
        color: X.value
      }, null)]), L.value && v("div", {
        id: K.value,
        class: "v-input__details",
        role: "alert",
        "aria-live": "polite"
      }, [V(yg, {
        active: M.value,
        messages: I.value
      }, {
        message: r.message
      }), r.details?.(U.value)])]);
    }), {
      reset: _,
      resetValidation: w,
      validate: F,
      isValid: A,
      errorMessages: h
    };
  }
}), Ws = /* @__PURE__ */ Symbol("Forwarded refs");
function js(e, t) {
  let n = e;
  for (; n; ) {
    const r = Reflect.getOwnPropertyDescriptor(n, t);
    if (r) return r;
    n = Object.getPrototypeOf(n);
  }
}
function kg(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  return e[Ws] = n, new Proxy(e, {
    get(s, i) {
      if (Reflect.has(s, i))
        return Reflect.get(s, i);
      if (!(typeof i == "symbol" || i.startsWith("$") || i.startsWith("__"))) {
        for (const o of n)
          if (o.value && Reflect.has(o.value, i)) {
            const l = Reflect.get(o.value, i);
            return typeof l == "function" ? l.bind(o.value) : l;
          }
      }
    },
    has(s, i) {
      if (Reflect.has(s, i))
        return !0;
      if (typeof i == "symbol" || i.startsWith("$") || i.startsWith("__")) return !1;
      for (const o of n)
        if (o.value && Reflect.has(o.value, i))
          return !0;
      return !1;
    },
    set(s, i, o) {
      if (Reflect.has(s, i))
        return Reflect.set(s, i, o);
      if (typeof i == "symbol" || i.startsWith("$") || i.startsWith("__")) return !1;
      for (const l of n)
        if (l.value && Reflect.has(l.value, i))
          return Reflect.set(l.value, i, o);
      return !1;
    },
    getOwnPropertyDescriptor(s, i) {
      const o = Reflect.getOwnPropertyDescriptor(s, i);
      if (o) return o;
      if (!(typeof i == "symbol" || i.startsWith("$") || i.startsWith("__"))) {
        for (const l of n) {
          if (!l.value) continue;
          const a = js(l.value, i) ?? ("_" in l.value ? js(l.value._?.setupState, i) : void 0);
          if (a) return a;
        }
        for (const l of n) {
          const a = l.value && l.value[Ws];
          if (!a) continue;
          const c = a.slice();
          for (; c.length; ) {
            const u = c.shift(), f = js(u.value, i);
            if (f) return f;
            const h = u.value && u.value[Ws];
            h && c.push(...h);
          }
        }
      }
    }
  });
}
const Tg = Z({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...qe(),
  ...hu({
    transition: {
      component: du
    }
  })
}, "VCounter"), Ag = Te()({
  name: "VCounter",
  functional: !0,
  props: Tg(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = /* @__PURE__ */ N(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return Ze(() => V(mu, {
      transition: e.transition
    }, {
      default: () => [dr(v("div", {
        class: he(["v-counter", {
          "text-error": e.max && !e.disabled && parseFloat(e.value) > parseFloat(e.max)
        }, e.class]),
        style: xe(e.style)
      }, [n.default ? n.default({
        counter: r.value,
        max: e.max,
        value: e.value
      }) : r.value]), [[Na, e.active]])]
    })), {};
  }
}), Eg = Z({
  floating: Boolean,
  ...qe()
}, "VFieldLabel"), Ir = Te()({
  name: "VFieldLabel",
  props: Eg(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Ze(() => V(vg, {
      class: he(["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class]),
      style: xe(e.style)
    }, n)), {};
  }
}), Dg = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], Vu = Z({
  appendInnerIcon: bt,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: bt,
    default: "$clear"
  },
  active: Boolean,
  centerAffix: {
    type: Boolean,
    default: void 0
  },
  color: String,
  baseColor: String,
  dirty: Boolean,
  disabled: {
    type: Boolean,
    default: null
  },
  glow: Boolean,
  error: Boolean,
  flat: Boolean,
  iconColor: [Boolean, String],
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: bt,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => Dg.includes(e)
  },
  "onClick:clear": on(),
  "onClick:appendInner": on(),
  "onClick:prependInner": on(),
  ...qe(),
  ...Cu(),
  ..._r(),
  ...Rt()
}, "VField"), vl = Te()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    details: Boolean,
    labelId: String,
    ...Ru(),
    ...Vu()
  },
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: r,
      slots: s
    } = t;
    const {
      themeClasses: i
    } = dn(e), {
      loaderClasses: o
    } = xu(e), {
      focusClasses: l,
      isFocused: a,
      focus: c,
      blur: u
    } = Lu(e), {
      InputIcon: f
    } = Fu(e), {
      roundedClasses: h
    } = Sr(e), {
      rtlClasses: g
    } = ws(), T = /* @__PURE__ */ N(() => e.dirty || e.active), b = /* @__PURE__ */ N(() => !!(e.label || s.label)), p = /* @__PURE__ */ N(() => !e.singleLine && b.value), A = hr(), S = H(() => e.id || `input-${A}`), _ = /* @__PURE__ */ N(() => e.details ? `${S.value}-messages` : void 0), w = /* @__PURE__ */ de(), F = /* @__PURE__ */ de(), B = /* @__PURE__ */ de(), I = H(() => ["plain", "underlined"].includes(e.variant)), M = H(() => e.error || e.disabled ? void 0 : T.value && a.value ? e.color : e.baseColor), L = H(() => {
      if (!(!e.iconColor || e.glow && !a.value))
        return e.iconColor === !0 ? M.value : e.iconColor;
    }), {
      backgroundColorClasses: K,
      backgroundColorStyles: U
    } = Mr(() => e.bgColor), {
      textColorClasses: D,
      textColorStyles: X
    } = un(M);
    Pe(T, (q) => {
      if (p.value && !ki()) {
        const Se = w.value.$el, Ae = F.value.$el;
        requestAnimationFrame(() => {
          const ke = Rd(Se), me = new Ht(Ae), lt = me.x - ke.x, hn = me.y - ke.y - (ke.height / 2 - me.height / 2), mn = me.width / 0.75, at = Math.abs(mn - ke.width) > 1 ? {
            maxWidth: ve(mn)
          } : void 0, Lt = getComputedStyle(Se), Pn = getComputedStyle(Ae), Yt = parseFloat(Lt.transitionDuration) * 1e3 || 150, ji = parseFloat(Pn.getPropertyValue("--v-field-label-scale")), d = Pn.getPropertyValue("color");
          Se.style.visibility = "visible", Ae.style.visibility = "hidden", Ld(Se, {
            transform: `translate(${lt}px, ${hn}px) scale(${ji})`,
            color: d,
            ...at
          }, {
            duration: Yt,
            easing: dh,
            direction: q ? "normal" : "reverse"
          }).finished.then(() => {
            Se.style.removeProperty("visibility"), Ae.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const ee = H(() => ({
      isActive: T,
      isFocused: a,
      controlRef: B,
      iconColor: L,
      blur: u,
      focus: c
    })), _e = /* @__PURE__ */ N(() => {
      const q = !T.value;
      return {
        "aria-hidden": q,
        for: q ? void 0 : S.value
      };
    }), ae = /* @__PURE__ */ N(() => {
      const q = p.value && T.value;
      return {
        "aria-hidden": q,
        for: q ? void 0 : S.value
      };
    });
    function J(q) {
      q.target !== Ga() && q.preventDefault();
    }
    return Ze(() => {
      const q = e.variant === "outlined", Se = !!(s["prepend-inner"] || e.prependInnerIcon), Ae = !!(e.clearable || s.clear) && !e.disabled, ke = !!(s["append-inner"] || e.appendInnerIcon || Ae), me = () => s.label ? s.label({
        ...ee.value,
        label: e.label,
        props: {
          for: S.value
        }
      }) : e.label;
      return v("div", De({
        class: ["v-field", {
          "v-field--active": T.value,
          "v-field--appended": ke,
          "v-field--center-affix": e.centerAffix ?? !I.value,
          "v-field--disabled": e.disabled,
          "v-field--dirty": e.dirty,
          "v-field--error": e.error,
          "v-field--glow": e.glow,
          "v-field--flat": e.flat,
          "v-field--has-background": !!e.bgColor,
          "v-field--persistent-clear": e.persistentClear,
          "v-field--prepended": Se,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !me(),
          [`v-field--variant-${e.variant}`]: !0
        }, i.value, K.value, l.value, o.value, h.value, g.value, e.class],
        style: [U.value, e.style],
        onClick: J
      }, n), [v("div", {
        class: "v-field__overlay"
      }, null), V(qm, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: s.loader
      }), Se && v("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [s["prepend-inner"] ? s["prepend-inner"](ee.value) : e.prependInnerIcon && V(f, {
        key: "prepend-icon",
        name: "prependInner",
        color: L.value
      }, null)]), v("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && p.value && V(Ir, De({
        key: "floating-label",
        ref: F,
        class: [D.value],
        floating: !0
      }, _e.value, {
        style: X.value
      }), {
        default: () => [me()]
      }), b.value && V(Ir, De({
        key: "label",
        ref: w,
        id: e.labelId
      }, ae.value), {
        default: () => [me()]
      }), s.default?.({
        ...ee.value,
        props: {
          id: S.value,
          class: "v-field__input",
          "aria-describedby": _.value
        },
        focus: c,
        blur: u
      }) ?? v("div", {
        id: S.value,
        class: "v-field__input",
        "aria-describedby": _.value
      }, null)]), Ae && V(Tm, {
        key: "clear"
      }, {
        default: () => [dr(v("div", {
          class: "v-field__clearable",
          onMousedown: (lt) => {
            lt.preventDefault(), lt.stopPropagation();
          }
        }, [V(Sn, {
          defaults: {
            VIcon: {
              icon: e.clearIcon
            }
          }
        }, {
          default: () => [s.clear ? s.clear({
            ...ee.value,
            props: {
              onFocus: c,
              onBlur: u,
              onClick: e["onClick:clear"],
              tabindex: -1
            }
          }) : V(f, {
            name: "clear",
            onFocus: c,
            onBlur: u,
            tabindex: -1
          }, null)]
        })]), [[Na, e.dirty]])]
      }), ke && v("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [s["append-inner"] ? s["append-inner"](ee.value) : e.appendInnerIcon && V(f, {
        key: "append-icon",
        name: "appendInner",
        color: L.value
      }, null)]), v("div", {
        class: he(["v-field__outline", D.value]),
        style: xe(X.value)
      }, [q && v(le, null, [v("div", {
        class: "v-field__outline__start"
      }, null), p.value && v("div", {
        class: "v-field__outline__notch"
      }, [V(Ir, De({
        ref: F,
        floating: !0
      }, _e.value), {
        default: () => [me()]
      })]), v("div", {
        class: "v-field__outline__end"
      }, null)]), I.value && p.value && V(Ir, De({
        ref: F,
        floating: !0
      }, _e.value), {
        default: () => [me()]
      })])]);
    }), {
      controlRef: B,
      fieldIconColor: L
    };
  }
}), Pg = Z({
  autocomplete: String
}, "autocomplete");
function Ig(e) {
  const t = hr(), n = /* @__PURE__ */ Fe(0), r = /* @__PURE__ */ N(() => e.autocomplete === "suppress");
  return {
    isSuppressing: r,
    fieldAutocomplete: /* @__PURE__ */ N(() => r.value ? "off" : e.autocomplete),
    fieldName: /* @__PURE__ */ N(() => {
      if (e.name)
        return r.value ? `${e.name}-${t}-${n.value}` : e.name;
    }),
    update: () => n.value = (/* @__PURE__ */ new Date()).getTime()
  };
}
function Og(e) {
  function t(n, r) {
    if (!e.autofocus || !n) return;
    const s = r[0].target;
    (s.matches("input,textarea") ? s : s.querySelector("input,textarea"))?.focus();
  }
  return {
    onIntersect: t
  };
}
const $g = ["color", "file", "time", "date", "datetime-local", "week", "month"], Mg = Z({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: [Number, Function],
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  role: String,
  type: {
    type: String,
    default: "text"
  },
  modelModifiers: Object,
  ...Pg(),
  ...Ti(Nu(), ["direction"]),
  ...Vu()
}, "VTextField"), Fg = Te()({
  name: "VTextField",
  directives: {
    vIntersect: fl
  },
  inheritAttrs: !1,
  props: Mg(),
  emits: {
    "click:control": (e) => !0,
    "mousedown:control": (e) => !0,
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: r,
      slots: s
    } = t;
    const i = fn(e, "modelValue", void 0, (I) => Object.is(I, -0) ? "-0" : I), {
      isFocused: o,
      focus: l,
      blur: a
    } = Lu(e), {
      onIntersect: c
    } = Og(e), u = H(() => typeof e.counterValue == "function" ? e.counterValue(i.value) : typeof e.counterValue == "number" ? e.counterValue : (i.value ?? "").toString().length), f = H(() => {
      if (n.maxlength) return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), h = H(() => ["plain", "underlined"].includes(e.variant)), g = /* @__PURE__ */ de(), T = /* @__PURE__ */ de(), b = /* @__PURE__ */ de(), p = Ig(e), A = H(() => $g.includes(e.type) || e.persistentPlaceholder || o.value || e.active);
    function S() {
      p.isSuppressing.value && p.update(), o.value || l(), zt(() => {
        b.value !== Ga() && b.value?.focus();
      });
    }
    function _(I) {
      r("mousedown:control", I), I.target !== b.value && (S(), I.preventDefault());
    }
    function w(I) {
      r("click:control", I);
    }
    function F(I, M) {
      I.stopPropagation(), S(), zt(() => {
        M(), Ya(e["onClick:clear"], I);
      });
    }
    function B(I) {
      const M = I.target;
      if (!(e.modelModifiers?.trim && ["text", "search", "password", "tel", "url"].includes(e.type))) {
        i.value = M.value;
        return;
      }
      const L = M.value, K = M.selectionStart, U = M.selectionEnd;
      i.value = L, zt(() => {
        let D = 0;
        L.trimStart().length === M.value.length && (D = L.length - M.value.length), K != null && (M.selectionStart = K - D), U != null && (M.selectionEnd = U - D);
      });
    }
    return Ze(() => {
      const I = !!(s.counter || e.counter !== !1 && e.counter != null), M = e.hideDetails !== !0 && !!(s.details || I && (e.persistentCounter || e.hideDetails === !1 || o.value)), [L, K] = Ed(n), {
        modelValue: U,
        ...D
      } = gl.filterProps(e), X = vl.filterProps(e);
      return V(gl, De({
        ref: g,
        modelValue: i.value,
        "onUpdate:modelValue": (ee) => i.value = ee,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": h.value
        }, e.class],
        style: e.style
      }, L, D, {
        centerAffix: !h.value,
        focused: o.value
      }), {
        ...s,
        default: (ee) => {
          let {
            id: _e,
            isDisabled: ae,
            isDirty: J,
            isReadonly: q,
            isValid: Se,
            hasDetails: Ae,
            reset: ke
          } = ee;
          return V(vl, De({
            ref: T,
            onMousedown: _,
            onClick: w,
            "onClick:clear": (me) => F(me, ke),
            role: e.role
          }, Ti(X, ["onClick:clear"]), {
            id: _e.value,
            labelId: `${_e.value}-label`,
            active: A.value || J.value,
            dirty: J.value || e.dirty,
            disabled: ae.value,
            focused: o.value,
            details: Ae.value,
            error: Se.value === !1
          }), {
            ...s,
            default: (me) => {
              let {
                props: {
                  class: lt,
                  ...hn
                },
                controlRef: mn
              } = me;
              const at = v("input", De({
                ref: (Lt) => b.value = mn.value = Lt,
                value: i.value,
                onInput: B,
                autofocus: e.autofocus,
                readonly: q.value,
                disabled: ae.value,
                name: p.fieldName.value,
                autocomplete: p.fieldAutocomplete.value,
                placeholder: e.placeholder,
                size: 1,
                role: e.role,
                type: e.type,
                onFocus: l,
                onBlur: a,
                "aria-labelledby": `${_e.value}-label`
              }, hn, K), null);
              return v(le, null, [e.prefix && v("span", {
                class: "v-text-field__prefix"
              }, [v("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), dr(s.default ? v("div", {
                class: he(lt),
                "data-no-activator": ""
              }, [s.default({
                id: _e
              }), at]) : $t(at, {
                class: lt
              }), [[fl, c, null, {
                once: !0
              }]]), e.suffix && v("span", {
                class: "v-text-field__suffix"
              }, [v("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: M ? (ee) => v(le, null, [s.details?.(ee), I && v(le, null, [v("span", null, null), V(Ag, {
          active: e.persistentCounter || o.value,
          value: u.value,
          max: f.value,
          disabled: e.disabled
        }, s.counter)])]) : void 0
      });
    }), kg({}, g, T, b);
  }
}), Rg = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, s] of t)
    n[r] = s;
  return n;
}, Lg = {
  class: "auth",
  "aria-labelledby": "auth-title"
}, Ng = {
  key: 0,
  class: "auth-errors",
  role: "alert"
}, Vg = {
  method: "post",
  class: "auth-form"
}, Bg = ["value"], Hg = ["value"], Wg = { class: "auth-field" }, jg = ["value"], zg = { class: "auth-field" }, Ug = { class: "auth-password" }, Kg = ["type"], Yg = {
  __name: "Login",
  props: {
    csrf: { type: String, required: !0 },
    next: { type: String, default: "" },
    errors: { type: Array, default: () => [] },
    username: { type: String, default: "" }
  },
  setup(e) {
    const t = /* @__PURE__ */ de(!1);
    return (n, r) => (Q(), te("section", Lg, [
      r[4] || (r[4] = v("div", { class: "auth-brand" }, [
        v("span", { "aria-hidden": "true" }, "ГО"),
        He("График охраны")
      ], -1)),
      r[5] || (r[5] = v("header", { class: "auth-header" }, [
        v("h1", { id: "auth-title" }, "Авторизация"),
        v("p", null, "Вход для диспетчеров и охранников")
      ], -1)),
      e.errors.length ? (Q(), te("ul", Ng, [
        (Q(!0), te(le, null, nn(e.errors, (s, i) => (Q(), te("li", { key: i }, se(s), 1))), 128))
      ])) : Qe("", !0),
      v("form", Vg, [
        v("input", {
          type: "hidden",
          name: "csrfmiddlewaretoken",
          value: e.csrf
        }, null, 8, Bg),
        e.next ? (Q(), te("input", {
          key: 0,
          type: "hidden",
          name: "next",
          value: e.next
        }, null, 8, Hg)) : Qe("", !0),
        v("div", Wg, [
          r[1] || (r[1] = v("label", { for: "auth-username" }, "Логин", -1)),
          v("input", {
            id: "auth-username",
            name: "username",
            autocomplete: "username",
            value: e.username,
            required: ""
          }, null, 8, jg)
        ]),
        v("div", zg, [
          r[2] || (r[2] = v("label", { for: "auth-password" }, "Пароль", -1)),
          v("div", Ug, [
            v("input", {
              id: "auth-password",
              name: "password",
              type: t.value ? "text" : "password",
              autocomplete: "current-password",
              required: ""
            }, null, 8, Kg),
            v("button", {
              type: "button",
              "aria-controls": "auth-password",
              onClick: r[0] || (r[0] = (s) => t.value = !t.value)
            }, se(t.value ? "Скрыть" : "Показать"), 1)
          ])
        ]),
        r[3] || (r[3] = v("button", {
          type: "submit",
          class: "auth-submit"
        }, "Войти", -1))
      ])
    ]));
  }
}, Gg = /* @__PURE__ */ Rg(Yg, [["__scopeId", "data-v-bb6596e1"]]), qg = { class: "toolbar" }, Zg = {
  method: "get",
  class: "inline"
}, Xg = ["value"], Jg = { class: "metrics" }, Qg = { class: "panel metric" }, ev = { class: "panel metric" }, tv = { class: "panel metric" }, nv = { class: "panel metric" }, rv = { class: "panel" }, sv = { class: "section-head" }, iv = { class: "actions" }, ov = ["action"], lv = ["value"], av = { class: "day-label" }, uv = { class: "slot-grid" }, cv = ["href", "onClick"], fv = { class: "section-head" }, dv = {
  key: 0,
  role: "alert"
}, hv = ["href"], mv = { key: 1 }, gv = ["innerHTML"], vv = {
  key: 2,
  class: "panel"
}, pv = { class: "chip" }, yv = ["href"], bv = { key: 0 }, _v = {
  key: 3,
  class: "panel empty"
}, Sv = {
  __name: "Schedule",
  props: {
    month: String,
    dispatcher: Boolean,
    csrf: String,
    approved: Boolean,
    exists: Boolean,
    days: Array,
    assignments: Array,
    total: Number,
    vacant: Number,
    pdf: String,
    approve: String,
    generateUrl: String
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ de(""), r = /* @__PURE__ */ de(!1), s = /* @__PURE__ */ de(""), i = /* @__PURE__ */ de(null), o = /* @__PURE__ */ de(""), l = /* @__PURE__ */ de(""), a = /* @__PURE__ */ de(""), c = /* @__PURE__ */ de(!1);
    let u = 0;
    async function f() {
      r.value = !0, s.value = "";
      const [b, p] = n.value.split("-").map(Number);
      try {
        const A = await fetch(t.generateUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-CSRFToken": t.csrf },
          body: JSON.stringify({ year: b, month: p })
        }), S = await A.json();
        if (A.status === 201) {
          window.location.assign(S.url);
          return;
        }
        s.value = A.status === 409 ? `Недостаточно сотрудников на даты: ${S.dates.join(", ")}.` : S.detail || "Проверьте указанный период.";
      } catch {
        s.value = "Не удалось получить ответ сервера.";
      } finally {
        r.value = !1;
      }
    }
    async function h(b, p) {
      if (b.ctrlKey || b.metaKey || b.shiftKey || b.altKey) return;
      b.preventDefault();
      const A = ++u;
      o.value = "", l.value = "", a.value = p, i.value.showModal();
      try {
        const S = await fetch(p + "?modal=1");
        if (!S.ok || S.redirected) throw new Error();
        const _ = await S.text();
        A === u && (o.value = _);
      } catch {
        A === u && (l.value = "Не удалось загрузить форму.");
      }
    }
    async function g(b) {
      const p = b.target;
      if (!(p instanceof HTMLFormElement) || c.value) return;
      c.value = !0, l.value = "";
      const A = p.querySelector("button");
      A && (A.disabled = !0);
      try {
        const S = await fetch(p.action, { method: "POST", body: new FormData(p) });
        if (S.redirected) {
          window.location.assign(S.url);
          return;
        }
        if (!S.ok) throw new Error();
        o.value = await S.text(), await zt();
      } catch {
        l.value = "Сервер не подтвердил сохранение. Проверьте расписание перед повтором.";
      } finally {
        A && (A.disabled = !1), c.value = !1;
      }
    }
    function T(b) {
      window.confirm("Руководитель подписал график?") || b.preventDefault();
    }
    return (b, p) => {
      const A = jr("v-btn"), S = jr("v-alert");
      return Q(), te(le, null, [
        v("div", qg, [
          v("form", Zg, [
            v("label", null, [
              p[3] || (p[3] = He("Период ", -1)),
              v("input", {
                type: "month",
                name: "month",
                value: e.month,
                required: ""
              }, null, 8, Xg)
            ]),
            V(A, {
              type: "submit",
              variant: "outlined"
            }, {
              default: At(() => [...p[4] || (p[4] = [
                He("Показать", -1)
              ])]),
              _: 1
            })
          ]),
          e.dispatcher ? (Q(), te("form", {
            key: 0,
            class: "inline",
            onSubmit: Oo(f, ["prevent"])
          }, [
            v("label", null, [
              p[5] || (p[5] = He("Новый график ", -1)),
              dr(v("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (_) => n.value = _),
                type: "month",
                required: ""
              }, null, 512), [
                [md, n.value]
              ])
            ]),
            V(A, {
              type: "submit",
              color: "primary",
              loading: r.value
            }, {
              default: At(() => [...p[6] || (p[6] = [
                He("Сформировать", -1)
              ])]),
              _: 1
            }, 8, ["loading"])
          ], 32)) : Qe("", !0)
        ]),
        s.value ? (Q(), Aa(S, {
          key: 0,
          type: "error"
        }, {
          default: At(() => [
            He(se(s.value), 1)
          ]),
          _: 1
        })) : Qe("", !0),
        e.exists && e.dispatcher ? (Q(), te(le, { key: 1 }, [
          v("div", Jg, [
            v("div", Qg, [
              p[7] || (p[7] = v("span", null, "Период", -1)),
              v("strong", null, se(e.month), 1)
            ]),
            v("div", ev, [
              p[8] || (p[8] = v("span", null, "Позиций в графике", -1)),
              v("strong", null, se(e.total), 1)
            ]),
            v("div", tv, [
              p[9] || (p[9] = v("span", null, "Требуют назначения", -1)),
              v("strong", null, se(e.vacant), 1)
            ]),
            v("div", nv, [
              p[10] || (p[10] = v("span", null, "Статус графика", -1)),
              v("strong", null, se(e.approved ? "Утверждён" : "Черновик"), 1)
            ])
          ]),
          v("section", rv, [
            v("div", sv, [
              p[13] || (p[13] = v("div", null, [
                v("h2", null, "Смены по дням"),
                v("p", { class: "muted" }, "08:00–08:00 следующего дня")
              ], -1)),
              v("div", iv, [
                V(A, {
                  href: e.pdf,
                  variant: "outlined"
                }, {
                  default: At(() => [...p[11] || (p[11] = [
                    He("Скачать PDF", -1)
                  ])]),
                  _: 1
                }, 8, ["href"]),
                e.approved ? Qe("", !0) : (Q(), te("form", {
                  key: 0,
                  method: "post",
                  action: e.approve,
                  onSubmit: T
                }, [
                  v("input", {
                    type: "hidden",
                    name: "csrfmiddlewaretoken",
                    value: e.csrf
                  }, null, 8, lv),
                  V(A, {
                    type: "submit",
                    color: "primary"
                  }, {
                    default: At(() => [...p[12] || (p[12] = [
                      He("Утвердить", -1)
                    ])]),
                    _: 1
                  })
                ], 40, ov))
              ])
            ]),
            (Q(!0), te(le, null, nn(e.days, (_) => (Q(), te("div", {
              key: _.label,
              class: "day"
            }, [
              v("div", av, [
                v("strong", null, se(_.label), 1),
                v("small", null, se(_.weekday), 1)
              ]),
              v("div", uv, [
                (Q(!0), te(le, null, nn(_.slots, (w) => (Q(), te("a", {
                  key: w.href,
                  href: w.href,
                  "data-slot-editor": "",
                  class: he(["slot", { vacant: !w.guard }]),
                  onClick: (F) => h(F, w.href)
                }, [
                  v("small", null, se(w.site) + " · Пост " + se(w.number), 1),
                  v("span", null, se(w.guard || "Свободная позиция"), 1)
                ], 10, cv))), 128))
              ])
            ]))), 128))
          ]),
          v("dialog", {
            ref_key: "editor",
            ref: i,
            class: "slot-dialog",
            id: "slot-editor",
            "aria-labelledby": "slot-editor-title",
            onCancel: p[2] || (p[2] = (_) => c.value && _.preventDefault())
          }, [
            v("div", fv, [
              p[15] || (p[15] = v("h2", { id: "slot-editor-title" }, "Подбор замены", -1)),
              V(A, {
                variant: "outlined",
                disabled: c.value,
                onClick: p[1] || (p[1] = (_) => i.value.close())
              }, {
                default: At(() => [...p[14] || (p[14] = [
                  He("Отмена", -1)
                ])]),
                _: 1
              }, 8, ["disabled"])
            ]),
            l.value ? (Q(), te("p", dv, [
              He(se(l.value) + " ", 1),
              v("a", { href: a.value }, "Открыть позицию отдельно", 8, hv)
            ])) : o.value ? Qe("", !0) : (Q(), te("p", mv, "Загрузка…")),
            v("div", {
              onSubmit: Oo(g, ["prevent"]),
              innerHTML: o.value
            }, null, 40, gv)
          ], 544)
        ], 64)) : e.exists ? (Q(), te("section", vv, [
          p[16] || (p[16] = v("h2", null, "Мои дежурства", -1)),
          (Q(!0), te(le, null, nn(e.assignments, (_) => (Q(), te("div", {
            key: _.id,
            class: "row"
          }, [
            v("div", null, [
              v("strong", null, se(_.day), 1),
              v("small", null, se(_.site) + " · Пост " + se(_.number), 1)
            ]),
            v("span", pv, se(_.state), 1),
            _.report ? (Q(), te("a", {
              key: 0,
              href: _.report
            }, "Открыть отчёт", 8, yv)) : Qe("", !0)
          ]))), 128)),
          e.assignments.length ? Qe("", !0) : (Q(), te("p", bv, "У вас нет назначений за выбранный месяц."))
        ])) : (Q(), te("section", _v, [...p[17] || (p[17] = [
          v("h2", null, "График за этот месяц отсутствует", -1)
        ])]))
      ], 64);
    };
  }
}, wv = { class: "home-hero" }, Cv = {
  key: 0,
  "aria-label": "Статистика",
  class: "metrics home-metrics"
}, xv = {
  class: "panel metric",
  href: "/directory/guards/"
}, kv = ["href"], Tv = {
  class: "panel metric",
  href: "/reports/?state=review"
}, Av = {
  class: "panel metric",
  href: "/absences/"
}, Ev = {
  key: 1,
  class: "panel"
}, Dv = {
  key: 0,
  class: "muted"
}, Pv = {
  __name: "Home",
  props: {
    dispatcher: Boolean,
    guards: Number,
    shifts: Number,
    pending: Number,
    absences: Number,
    currentSchedule: String,
    upcoming: { type: Array, default: () => [] }
  },
  setup(e) {
    return (t, n) => {
      const r = jr("v-btn");
      return Q(), te(le, null, [
        v("section", wv, [
          v("div", null, [
            v("h2", null, se(e.dispatcher ? "Управление дежурствами" : "Мои дежурства"), 1),
            v("p", null, se(e.dispatcher ? "Проверьте график и задачи, требующие внимания." : "График работы и уведомления по вашим сменам."), 1)
          ]),
          V(r, {
            href: "/",
            color: "white",
            variant: "flat"
          }, {
            default: At(() => [...n[0] || (n[0] = [
              He("Открыть расписание", -1)
            ])]),
            _: 1
          })
        ]),
        e.dispatcher ? (Q(), te("section", Cv, [
          v("a", xv, [
            n[1] || (n[1] = v("span", null, "Активные сотрудники", -1)),
            v("strong", null, se(e.guards), 1)
          ]),
          v("a", {
            class: "panel metric",
            href: e.currentSchedule
          }, [
            n[2] || (n[2] = v("span", null, "Смены в текущем месяце", -1)),
            v("strong", null, se(e.shifts), 1)
          ], 8, kv),
          v("a", Tv, [
            n[3] || (n[3] = v("span", null, "Отчеты на проверке", -1)),
            v("strong", null, se(e.pending), 1)
          ]),
          v("a", Av, [
            n[4] || (n[4] = v("span", null, "Предстоящие отсутствия", -1)),
            v("strong", null, se(e.absences), 1)
          ])
        ])) : (Q(), te("section", Ev, [
          n[5] || (n[5] = v("div", { class: "section-head" }, [
            v("h2", null, "Ближайшие смены"),
            v("a", { href: "/notifications/" }, "Уведомления")
          ], -1)),
          (Q(!0), te(le, null, nn(e.upcoming, (s) => (Q(), te("div", {
            key: s.id,
            class: "row"
          }, [
            v("strong", null, se(s.day) + " · 08:00", 1),
            v("span", null, se(s.site) + " · Пост " + se(s.number), 1)
          ]))), 128)),
          e.upcoming.length ? Qe("", !0) : (Q(), te("p", Dv, "Предстоящих смен пока нет."))
        ]))
      ], 64);
    };
  }
}, Iv = { class: "toolbar" }, Ov = { class: "panel" }, $v = { key: 0 }, Mv = { key: 0 }, Fv = {
  __name: "Audit",
  props: { exportUrl: String, rows: Array },
  setup(e) {
    return (t, n) => {
      const r = jr("v-btn");
      return Q(), te(le, null, [
        v("div", Iv, [
          V(r, {
            href: e.exportUrl,
            variant: "outlined"
          }, {
            default: At(() => [...n[0] || (n[0] = [
              He("Экспорт в Excel", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ]),
        v("section", Ov, [
          (Q(!0), te(le, null, nn(e.rows, (s) => (Q(), te("article", {
            key: s.id,
            class: "record"
          }, [
            v("strong", null, se(s.event), 1),
            v("small", null, se(s.date) + " · " + se(s.author), 1),
            Object.keys(s.details).length ? (Q(), te("dl", $v, [
              (Q(!0), te(le, null, nn(s.details, (i, o) => (Q(), te("div", { key: o }, [
                v("dt", null, se(o), 1),
                v("dd", null, se(i), 1)
              ]))), 128))
            ])) : Qe("", !0)
          ]))), 128)),
          e.rows.length ? Qe("", !0) : (Q(), te("p", Mv, "В журнале пока нет записей."))
        ])
      ], 64);
    };
  }
}, Rv = { login: Gg, schedule: Sv, home: Pv, audit: Fv }, zs = document.querySelector("[data-vue-page]");
if (zs) {
  const e = JSON.parse(document.querySelector("#vue-page-data").textContent);
  bd(Rv[zs.dataset.vuePage], e).use(fu({ components: { VBtn: Mu, VAlert: mg, VTextField: Fg } })).mount(zs);
}
