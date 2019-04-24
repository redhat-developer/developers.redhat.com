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
    var pfelement_js_1, DPSearchQuery;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pfelement_js_1_1) {
                pfelement_js_1 = pfelement_js_1_1;
            }
        ],
        execute: function () {
            DPSearchQuery = (function (_super) {
                __extends(DPSearchQuery, _super);
                function DPSearchQuery() {
                    var _this = _super.call(this, DPSearchQuery) || this;
                    _this._filters = { term: '', facets: {} };
                    _this._activeFilters = new Map();
                    _this._limit = 10;
                    _this._from = 0;
                    _this._sort = 'relevance';
                    _this._valid = true;
                    _this.urlTemplate = function (strings, url, term, from, limit, sort, types, tags, sys_types) {
                        var order = '';
                        if (sort === 'most-recent') {
                            order = '&newFirst=true';
                        }
                        return url + "?start=" + from + "&q=" + term + "&hl=true&hl.fl=description&rows=" + limit + "&" + types + "&" + tags + "&" + sys_types;
                    };
                    _this._changeAttr = _this._changeAttr.bind(_this);
                    return _this;
                }
                Object.defineProperty(DPSearchQuery.prototype, "html", {
                    get: function () { return ''; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchQuery, "tag", {
                    get: function () { return 'dp-search-query'; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchQuery.prototype, "filters", {
                    get: function () {
                        return this._filters;
                    },
                    set: function (val) {
                        if (this._filters === val)
                            return;
                        this._filters = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchQuery.prototype, "activeFilters", {
                    get: function () {
                        return this._activeFilters;
                    },
                    set: function (val) {
                        if (this._activeFilters === val)
                            return;
                        this._activeFilters = val;
                        this.filters.facets = this._activeFilters;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchQuery.prototype, "from", {
                    get: function () {
                        return this._from;
                    },
                    set: function (val) {
                        if (this._from === val)
                            return;
                        this._from = val;
                        this.setAttribute('from', val.toString());
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchQuery.prototype, "limit", {
                    get: function () {
                        return this._limit;
                    },
                    set: function (val) {
                        if (this._limit === val)
                            return;
                        this._limit = val;
                        this.setAttribute('limit', val.toString());
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchQuery.prototype, "sort", {
                    get: function () {
                        return this._sort;
                    },
                    set: function (val) {
                        if (this._sort === val)
                            return;
                        this._sort = val;
                        this.setAttribute('sort', val);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchQuery.prototype, "results", {
                    get: function () {
                        return this._results;
                    },
                    set: function (val) {
                        if (this._results === val)
                            return;
                        this._results = val;
                        this.from = this.results && this.results.response && typeof this.results.response.docs !== 'undefined' ? this.from + this.results.response.docs.length : 0;
                        var evt = {
                            detail: {
                                term: this.term,
                                filters: this.activeFilters,
                                facets: this.results.facet_counts || {},
                                sort: this.sort,
                                limit: this.limit,
                                from: this.from,
                                results: this.results.response,
                            },
                            bubbles: true,
                            composed: true
                        };
                        this.dispatchEvent(new CustomEvent('search-complete', evt));
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchQuery.prototype, "term", {
                    get: function () {
                        return this._term;
                    },
                    set: function (val) {
                        if (this._term === val)
                            return;
                        this._term = val;
                        this.filters.term = this._term;
                        this.setAttribute('term', val.toString());
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchQuery.prototype, "url", {
                    get: function () {
                        return this._url;
                    },
                    set: function (val) {
                        if (this._url === val)
                            return;
                        this._url = val;
                        this.setAttribute('url', val.toString());
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchQuery.prototype, "valid", {
                    get: function () {
                        return this._valid;
                    },
                    set: function (val) {
                        if (this._valid === val)
                            return;
                        this._valid = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                DPSearchQuery.prototype.filterString = function (facets) {
                    var len = facets.length, filterArr = [];
                    for (var i = 0; i < len; i++) {
                        for (var j = 0; j < facets[i].items.length; j++) {
                            if (facets[i].items[j].active) {
                                var idx = 0;
                                while (idx < facets[i].items[j].value.length) {
                                    filterArr.push(facets[i].items[j].value[idx]);
                                    idx = idx + 1;
                                }
                            }
                        }
                    }
                    return filterArr.join(', ');
                };
                DPSearchQuery.prototype.connectedCallback = function () {
                    _super.prototype.connectedCallback.call(this);
                    top.addEventListener('params-ready', this._changeAttr);
                    top.addEventListener('term-change', this._changeAttr);
                    top.addEventListener('filter-item-change', this._changeAttr);
                    top.addEventListener('sort-change', this._changeAttr);
                    top.addEventListener('clear-filters', this._changeAttr);
                    top.addEventListener('load-more', this._changeAttr);
                };
                Object.defineProperty(DPSearchQuery, "observedAttributes", {
                    get: function () {
                        return ['term', 'sort', 'limit', 'results', 'url'];
                    },
                    enumerable: true,
                    configurable: true
                });
                DPSearchQuery.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                DPSearchQuery.prototype._setFilters = function (item) {
                    var add = item.active;
                    if (add) {
                        if (this.activeFilters.has(item.group)) {
                            this.activeFilters.get(item.group).add(item.key);
                        }
                        else {
                            this.activeFilters.set(item.group, new Set([item.key]));
                        }
                    }
                    else {
                        if (this.activeFilters.has(item.group)) {
                            this.activeFilters.get(item.group).delete(item.key);
                            if (this.activeFilters.get(item.group).size === 0) {
                                this.activeFilters.delete(item.group);
                            }
                        }
                    }
                };
                DPSearchQuery.prototype._changeAttr = function (e) {
                    switch (e.type) {
                        case 'term-change':
                            if (e.detail && e.detail.term && e.detail.term.length > 0) {
                                this.term = e.detail.term;
                            }
                            else {
                                this.term = '';
                            }
                            this.from = 0;
                            this.search();
                            break;
                        case 'filter-item-change':
                            if (e.detail && e.detail.facet) {
                                this._setFilters(e.detail.facet);
                            }
                            this.from = 0;
                            this.search();
                            break;
                        case 'sort-change':
                            if (e.detail && e.detail.sort) {
                                this.sort = e.detail.sort;
                            }
                            this.from = 0;
                            this.search();
                            break;
                        case 'load-more':
                            this.search();
                            break;
                        case 'clear-filters':
                            this.activeFilters.clear();
                            this.search();
                            break;
                        case 'params-ready':
                            if (e.detail && e.detail.term) {
                                this.term = e.detail.term;
                            }
                            if (e.detail && e.detail.sort) {
                                this.sort = e.detail.sort;
                            }
                            if (e.detail && e.detail.filters) {
                                this.activeFilters = e.detail.filters;
                            }
                            this.from = 0;
                            if (this.activeFilters.size > 0 || e.detail.term !== null || e.detail.sort !== null || e.detail.qty !== null) {
                                this.search();
                            }
                            break;
                    }
                };
                DPSearchQuery.prototype.search = function () {
                    var _this = this;
                    var evt = { bubbles: true, composed: true };
                    this.dispatchEvent(new CustomEvent('search-start', evt));
                    if (this.url && ((this.activeFilters && this.activeFilters.size > 0) || (this.term !== null && this.term !== '' && typeof this.term !== 'undefined'))) {
                        var qURL_1 = new URL(this.url);
                        qURL_1.searchParams.set('start', this.from.toString());
                        qURL_1.searchParams.set('q', this.term || '');
                        qURL_1.searchParams.set('hl', 'true');
                        qURL_1.searchParams.set('hl.fl', 'description');
                        qURL_1.searchParams.set('rows', this.limit.toString());
                        this.activeFilters.forEach(function (filters, group) {
                            qURL_1.searchParams.set(group, Array.from(filters).join(','));
                        });
                        fetch(qURL_1.toString())
                            .then(function (resp) { return resp.json(); })
                            .then(function (data) {
                            _this.results = data;
                        });
                    }
                    else {
                        var evt_1 = { detail: { invalid: true }, bubbles: true, composed: true };
                        this.dispatchEvent(new CustomEvent('search-complete', evt_1));
                    }
                };
                return DPSearchQuery;
            }(pfelement_js_1.default));
            exports_1("default", DPSearchQuery);
            pfelement_js_1.default.create(DPSearchQuery);
        }
    };
});
