System.register(["../pfelement/pfelement.js"], function (exports_1, context_1) {
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
    var pfelement_js_1, e;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pfelement_js_1_1) {
                pfelement_js_1 = pfelement_js_1_1;
            }
        ],
        execute: function () {
            e = (function (_super) {
                __extends(e, _super);
                function e() {
                    var _this = this;
                    _this = _super.call(this, e) || this, _this.type = _this.getAttribute("type") || "local";
                    return _this;
                }
                Object.defineProperty(e.prototype, "html", {
                    get: function () { return "<style>:host {\n  display: inline; }</style>\n<span></span>"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(e, "tag", {
                    get: function () { return "pfe-datetime"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(e.prototype, "styleUrl", {
                    get: function () { return "pfe-datetime.scss"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(e.prototype, "templateUrl", {
                    get: function () { return "pfe-datetime.html"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(e.prototype, "type", {
                    get: function () { return this._type; },
                    set: function (t) { this._type !== t && (this._type = t); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(e.prototype, "timestamp", {
                    get: function () { return this._timestamp; },
                    set: function (t) { this._timestamp !== t && (this._timestamp = t, this.setDate(new Date(1e3 * t))); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(e.prototype, "datetime", {
                    get: function () { return this._datetime; },
                    set: function (t) { Date.parse(t) && (Date.parse(t) && this._datetime === Date.parse(t) || this.setDate(Date.parse(t))); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(e, "observedAttributes", {
                    get: function () { return ["datetime", "type", "timestamp"]; },
                    enumerable: true,
                    configurable: true
                });
                e.prototype.attributeChangedCallback = function (t, e, i) { this[t] = i; };
                e.prototype.setDate = function (t) { this._datetime = t, this.shadowRoot.querySelector("span").innerText = window.Intl ? this._getTypeString() : t.toLocaleString(); };
                e.prototype._getOptions = function () { var t = { weekday: { short: "short", long: "long" }, day: { numeric: "numeric", "2-digit": "2-digit" }, month: { short: "short", long: "long" }, year: { numeric: "numeric", "2-digit": "2-digit" }, hour: { numeric: "numeric", "2-digit": "2-digit" }, minute: { numeric: "numeric", "2-digit": "2-digit" }, second: { numeric: "numeric", "2-digit": "2-digit" }, timeZoneName: { short: "short", long: "long" } }; var e = {}; for (var i in t) {
                    var s = t[i][this.getAttribute(i)];
                    s && (e[i] = s);
                } return e; };
                e.prototype._getTypeString = function () { var t = this._getOptions(), e = this.getAttribute("locale") || navigator.language; var i = ""; switch (this.type) {
                    case "local":
                        i = new Intl.DateTimeFormat(e, t).format(this._datetime);
                        break;
                    case "relative":
                        i = this._getTimeRelative(this._datetime - Date.now());
                        break;
                    default: i = this._datetime;
                } return i; };
                e.prototype._getTimeRelative = function (t) { var e = t > 0 ? "until" : "ago"; var i = "just now"; var s = Math.round(Math.abs(t) / 1e3), a = Math.round(s / 60), r = Math.round(a / 60), n = Math.round(r / 24), o = Math.round(n / 30), m = Math.round(o / 12); return o >= 18 ? i = m + " years" : o >= 12 ? i = "a year" : n >= 45 ? i = o + " months" : n >= 30 ? i = "a month" : r >= 36 ? i = n + " days" : r >= 24 ? i = "a day" : a >= 90 ? i = r + " hours" : a >= 45 ? i = "an hour" : s >= 90 ? i = a + " minutes" : s >= 45 ? i = "a minute" : s >= 10 && (i = s + " seconds"), "just now" !== i ? i + " " + e : i; };
                return e;
            }(pfelement_js_1.default));
            pfelement_js_1.default.create(e);
            exports_1("default", e);
        }
    };
});
