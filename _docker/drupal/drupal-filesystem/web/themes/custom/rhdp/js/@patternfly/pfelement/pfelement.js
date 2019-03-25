System.register([], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var t, s, o;
    var __moduleName = context_1 && context_1.id;
    function e() { t("[reveal] web components ready"), t("[reveal] elements ready, revealing the body"), window.document.body.removeAttribute("unresolved"); }
    return {
        setters: [],
        execute: function () {
            t = function () { return null; };
            s = "pfe-";
            o = (function (_super) {
                __extends(o, _super);
                function o(t, _a) {
                    var _b = _a === void 0 ? {} : _a, _c = _b.type, e = _c === void 0 ? null : _c, _d = _b.delayRender, s = _d === void 0 ? !1 : _d;
                    var _this = this;
                    _this = _super.call(this) || this, _this.connected = !1, _this._pfeClass = t, _this.tag = t.tag, _this.props = t.properties, _this._queue = [], _this.template = document.createElement("template"), _this.attachShadow({ mode: "open" }), e && _this._queueAction({ type: "setProperty", data: { name: "pfeType", value: e } }), s || _this.render();
                    return _this;
                }
                o.create = function (t) { window.customElements.define(t.tag, t); };
                o.debugLog = function (t) {
                    if (t === void 0) { t = null; }
                    return null !== t && (o._debugLog = !!t), o._debugLog;
                };
                o.log = function () {
                    var t = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        t[_i] = arguments[_i];
                    }
                    o.debugLog() && console.log.apply(console, t);
                };
                Object.defineProperty(o, "PfeTypes", {
                    get: function () { return { Container: "container", Content: "content", Combo: "combo" }; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(o.prototype, "pfeType", {
                    get: function () { return this.getAttribute(s + "type"); },
                    set: function (t) { this.setAttribute(s + "type", t); },
                    enumerable: true,
                    configurable: true
                });
                o.prototype.has_slot = function (t) { return this.querySelector("[slot='" + t + "']"); };
                o.prototype.has_slot = function (t) { return this.querySelector("[slot='" + t + "']"); };
                o.prototype.connectedCallback = function () { this.connected = !0, window.ShadyCSS && window.ShadyCSS.styleElement(this), this.classList.add("PFElement"), "object" == typeof this.props && this._mapSchemaToProperties(this.tag, this.props), this._queue.length && this._processQueue(); };
                o.prototype.disconnectedCallback = function () { this.connected = !1; };
                o.prototype.attributeChangedCallback = function (t, e, s) { if (!this._pfeClass.cascadingAttributes)
                    return; var o = this._pfeClass.cascadingAttributes[t]; o && this._copyAttribute(t, o); };
                o.prototype._copyAttribute = function (t, e) { var s = this.querySelectorAll(e).concat(this.shadowRoot.querySelectorAll(e)), o = this.getAttribute(t), i = null == o ? "removeAttribute" : "setAttribute"; for (var _i = 0, s_1 = s; _i < s_1.length; _i++) {
                    var e_1 = s_1[_i];
                    e_1[i](t, o);
                } };
                o.prototype._mapSchemaToProperties = function (t, e) {
                    var _this = this;
                    Object.keys(e).forEach(function (o) { var i = e[o]; if (_this[o] = i, _this[o].value = null, _this.hasAttribute("" + s + o))
                        _this[o].value = _this.getAttribute("" + s + o);
                    else if (i.default) {
                        var e_2 = _this._hasDependency(t, i.options), n = !i.options || i.options && !i.options.dependencies.length;
                        (e_2 || n) && (_this.setAttribute("" + s + o, i.default), _this[o].value = i.default);
                    } });
                };
                o.prototype._hasDependency = function (t, e) { var o = e ? e.dependencies : [], i = !1; for (var e_3 = 0; e_3 < o.length; e_3 += 1) {
                    var n = "slot" === o[e_3].type && this.has_slot(t + "--" + o[e_3].id), r = "attribute" === o[e_3].type && this.getAttribute("" + s + o[e_3].id);
                    if (n || r) {
                        i = !0;
                        break;
                    }
                } return i; };
                o.prototype._queueAction = function (t) { this._queue.push(t); };
                o.prototype._processQueue = function () {
                    var _this = this;
                    this._queue.forEach(function (t) { _this["_" + t.type](t.data); }), this._queue = [];
                };
                o.prototype._setProperty = function (_a) {
                    var t = _a.name, e = _a.value;
                    this[t] = e;
                };
                o.var = function (t, e) {
                    if (e === void 0) { e = document.body; }
                    return window.getComputedStyle(e).getPropertyValue(t).trim();
                };
                o.prototype.var = function (t) { return o.var(t, this); };
                o.prototype.render = function () { this.shadowRoot.innerHTML = "", this.template.innerHTML = this.html, window.ShadyCSS && window.ShadyCSS.prepareTemplate(this.template, this.tag), this.shadowRoot.appendChild(this.template.content.cloneNode(!0)); };
                o.prototype.log = function () {
                    var t = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        t[_i] = arguments[_i];
                    }
                    o.log.apply(o, ["[" + this.tag + "]"].concat(t));
                };
                return o;
            }(HTMLElement));
            !function (s) { t = s; var o = window.WebComponents, i = o && window.WebComponents.ready; !o || i ? e() : window.addEventListener("WebComponentsReady", e); }(o.log);
            exports_1("default", o);
        }
    };
});
