System.register(["../../@patternfly/pfelement/pfelement.js"], function (exports_1, context_1) {
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
    var pfelement_js_1, DPSearchURL;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pfelement_js_1_1) {
                pfelement_js_1 = pfelement_js_1_1;
            }
        ],
        execute: function () {
            DPSearchURL = (function (_super) {
                __extends(DPSearchURL, _super);
                function DPSearchURL() {
                    var _this = _super.call(this, DPSearchURL) || this;
                    _this._uri = new URL(window.location.href);
                    _this._term = _this.uri.searchParams.get('t');
                    _this._filters = _this._setFilters(_this.uri.searchParams.getAll('f'));
                    _this._sort = _this.uri.searchParams.get('s') || 'relevance';
                    _this._qty = _this.uri.searchParams.get('r');
                    _this._init = true;
                    _this._changeAttr = _this._changeAttr.bind(_this);
                    _this._popState = _this._popState.bind(_this);
                    return _this;
                }
                Object.defineProperty(DPSearchURL.prototype, "html", {
                    get: function () { return ''; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchURL, "tag", {
                    get: function () { return 'dp-search-url'; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchURL.prototype, "uri", {
                    get: function () {
                        return this._uri;
                    },
                    set: function (val) {
                        if (this._uri === val)
                            return;
                        this._uri = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchURL.prototype, "term", {
                    get: function () {
                        return this._term;
                    },
                    set: function (val) {
                        if (this._term === val)
                            return;
                        this._term = val;
                        this.uri.searchParams.set('t', this._term);
                        this.setAttribute('term', this.term);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchURL.prototype, "filters", {
                    get: function () {
                        return this._filters;
                    },
                    set: function (val) {
                        var _this = this;
                        this._filters = val;
                        this.uri.searchParams.delete('f');
                        this._filters.forEach(function (val, key) {
                            _this.uri.searchParams.append('f', key + "~" + Array.from(val).reduce(function (acc, curr) { return acc + ' ' + curr; }));
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchURL.prototype, "sort", {
                    get: function () {
                        return this._sort;
                    },
                    set: function (val) {
                        if (this._sort === val)
                            return;
                        this._sort = val;
                        this.uri.searchParams.set('s', this._sort);
                        this.setAttribute('sort', this._sort);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchURL.prototype, "qty", {
                    get: function () {
                        return this._qty;
                    },
                    set: function (val) {
                        if (this._qty === val)
                            return;
                        this._qty = val;
                        this.setAttribute('qty', this._sort);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchURL.prototype, "init", {
                    get: function () {
                        return this._init;
                    },
                    set: function (val) {
                        if (this._init === val)
                            return;
                        this._init = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                DPSearchURL.prototype.connectedCallback = function () {
                    _super.prototype.connectedCallback.call(this);
                    top.addEventListener('search-complete', this._changeAttr);
                    top.addEventListener('clear-filters', this._changeAttr);
                    top.window.addEventListener('popstate', this._popState);
                    this._paramsReady();
                };
                Object.defineProperty(DPSearchURL, "observedAttributes", {
                    get: function () {
                        return ['sort', 'term', 'qty'];
                    },
                    enumerable: true,
                    configurable: true
                });
                DPSearchURL.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                DPSearchURL.prototype._getValueArray = function (vals) {
                    var str = '';
                };
                DPSearchURL.prototype._popState = function (e) {
                    this.uri = new URL(document.location.href);
                    this.term = this.uri.searchParams.get('t') || null;
                    this.filters = this._setFilters(this.uri.searchParams.getAll('f'));
                    this.sort = this.uri.searchParams.get('s');
                    this.qty = this.uri.searchParams.get('r');
                    this._paramsReady();
                };
                DPSearchURL.prototype._paramsReady = function () {
                    var evt = {
                        detail: {
                            term: this.term,
                            filters: this.filters,
                            sort: this.sort,
                            qty: this.qty
                        },
                        bubbles: true,
                        composed: true
                    };
                    this.dispatchEvent(new CustomEvent('params-ready', evt));
                };
                DPSearchURL.prototype._setFilters = function (filtersQS) {
                    return new Map(filtersQS.map(function (o) { return [o.split('~')[0], new Set(o.split('~')[1].split(' '))]; }));
                };
                DPSearchURL.prototype._changeAttr = function (e) {
                    switch (e.type) {
                        case 'clear-filters':
                            this.uri.searchParams.delete('f');
                            this.filters.clear();
                            break;
                        case 'load-more':
                            break;
                        case 'search-complete':
                            if (e.detail && typeof e.detail.term !== 'undefined' && e.detail.term.length > 0) {
                                this.term = e.detail.term;
                            }
                            else {
                                this.term = '';
                                this.uri.searchParams.delete('t');
                            }
                            if (e.detail && e.detail.filters) {
                                this.filters = e.detail.filters;
                            }
                            if (e.detail && typeof e.detail.sort !== 'undefined') {
                                this.sort = e.detail.sort;
                            }
                    }
                    if (e.detail && typeof e.detail.invalid === 'undefined') {
                        history.pushState({}, "RHD Search: " + (this.term ? this.term : ''), "" + this.uri.pathname + this.uri.search);
                    }
                    else {
                        this.term = '';
                        this.filters.clear();
                        this.sort = 'relevance';
                        this.uri.searchParams.delete('t');
                        this.uri.searchParams.delete('f');
                        this.uri.searchParams.delete('s');
                        history.replaceState({}, 'RHD Search Error', "" + this.uri.pathname + this.uri.search);
                    }
                };
                return DPSearchURL;
            }(pfelement_js_1.default));
            exports_1("default", DPSearchURL);
            pfelement_js_1.default.create(DPSearchURL);
        }
    };
});
