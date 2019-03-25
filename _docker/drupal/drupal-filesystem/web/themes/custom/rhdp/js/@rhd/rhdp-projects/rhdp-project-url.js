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
    var RHDPProjectURL;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RHDPProjectURL = (function (_super) {
                __extends(RHDPProjectURL, _super);
                function RHDPProjectURL() {
                    var _this = _super.call(this) || this;
                    _this._uri = new URL(window.location.href);
                    _this._updateURI = _this._updateURI.bind(_this);
                    return _this;
                }
                Object.defineProperty(RHDPProjectURL.prototype, "uri", {
                    get: function () {
                        return this._uri;
                    },
                    set: function (value) {
                        this._uri = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectURL.prototype, "term", {
                    get: function () {
                        return this._term;
                    },
                    set: function (value) {
                        if (value.length > 0) {
                            this.uri.searchParams.set('filter-text', value);
                        }
                        else {
                            this.uri.searchParams.delete('filter-text');
                        }
                        this._term = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectURL.prototype, "filters", {
                    get: function () {
                        return this._filters;
                    },
                    set: function (value) {
                        if (value.length > 0) {
                            this.uri.searchParams.set('filter-product', value);
                        }
                        else {
                            this.uri.searchParams.delete('filter-product');
                        }
                        this._filters = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPProjectURL.prototype.connectedCallback = function () {
                    top.addEventListener('data-results-complete', this._updateURI);
                };
                RHDPProjectURL.prototype._updateURI = function (e) {
                    if (e.detail) {
                        this.term = e.detail.term ? e.detail.term : '';
                        this.filters = e.detail.filter ? e.detail.filter : '';
                        history.pushState({}, 'RHDP Projects:', "" + this.uri.pathname + (this.uri.searchParams ? "#!" + this.uri.searchParams : ''));
                    }
                };
                Object.defineProperty(RHDPProjectURL, "observedAttributes", {
                    get: function () {
                        return ['loading'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPProjectURL.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                return RHDPProjectURL;
            }(HTMLElement));
            exports_1("default", RHDPProjectURL);
            window.customElements.define('rhdp-project-url', RHDPProjectURL);
        }
    };
});
