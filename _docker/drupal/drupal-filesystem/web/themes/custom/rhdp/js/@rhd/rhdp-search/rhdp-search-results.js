System.register(["@rhd/rhdp-search/rhdp-search-result"], function (exports_1, context_1) {
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
    var rhdp_search_result_1, RHDPSearchResults;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (rhdp_search_result_1_1) {
                rhdp_search_result_1 = rhdp_search_result_1_1;
            }
        ],
        execute: function () {
            RHDPSearchResults = (function (_super) {
                __extends(RHDPSearchResults, _super);
                function RHDPSearchResults() {
                    var _this = _super.call(this) || this;
                    _this._more = false;
                    _this._last = 0;
                    _this._valid = true;
                    _this.invalidMsg = document.createElement('div');
                    _this.loadMore = document.createElement('div');
                    _this.endOfResults = document.createElement('div');
                    _this.loading = document.createElement('div');
                    _this._renderResults = _this._renderResults.bind(_this);
                    _this._setLoading = _this._setLoading.bind(_this);
                    _this._checkValid = _this._checkValid.bind(_this);
                    _this._clearResults = _this._clearResults.bind(_this);
                    return _this;
                }
                Object.defineProperty(RHDPSearchResults.prototype, "results", {
                    get: function () {
                        return this._results;
                    },
                    set: function (val) {
                        if (this._results === val)
                            return;
                        this._results = val;
                        this._renderResults(false);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchResults.prototype, "more", {
                    get: function () {
                        return this._more;
                    },
                    set: function (val) {
                        if (this._more === val)
                            return;
                        this._more = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchResults.prototype, "last", {
                    get: function () {
                        return this._last;
                    },
                    set: function (val) {
                        if (this._last === val)
                            return;
                        this._last = val ? val : 0;
                        this.setAttribute('last', val.toString());
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchResults.prototype, "valid", {
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
                RHDPSearchResults.prototype.connectedCallback = function () {
                    var _this = this;
                    this.invalidMsg.className = 'invalidMsg';
                    this.invalidMsg.innerHTML = "<h4>Well, this is awkward. No search term was entered yet, so this page is a little empty right now.</h4>\n        <p>After you enter a search term in the box above, you will see the results displayed here. \n        You can also use the filters to select a content type, product or topic to see some results too. Try it out!</p>";
                    this.endOfResults.innerHTML = '<p class="end-of-results">- End of Results -</p>';
                    this.loadMore.className = 'moreBtn';
                    this.loadMore.innerHTML = '<a class="moreBtn" href="#">Load More</a>';
                    this.loading.className = 'loading';
                    this.loadMore.addEventListener('click', function (e) {
                        e.preventDefault();
                        _this.dispatchEvent(new CustomEvent('load-more', {
                            detail: {
                                from: _this.last
                            },
                            bubbles: true
                        }));
                    });
                    top.addEventListener('search-complete', this._renderResults);
                    top.addEventListener('search-start', this._setLoading);
                    top.addEventListener('params-ready', this._checkValid);
                    top.window.addEventListener('popstate', this._clearResults);
                    this.addEventListener('load-more', function (e) {
                        _this.more = true;
                    });
                };
                RHDPSearchResults.prototype.addResult = function (result) {
                    var item = new rhdp_search_result_1.default();
                    item.result = result;
                    this.appendChild(item);
                };
                RHDPSearchResults.prototype._setLoading = function (e) {
                    if (!this.more) {
                        while (this.firstChild) {
                            this.removeChild(this.firstChild);
                        }
                    }
                    else {
                        if (this.querySelector('.moreBtn')) {
                            this.removeChild(this.loadMore);
                        }
                        if (this.querySelector('.invalidMsg')) {
                            this.removeChild(this.invalidMsg);
                        }
                        this.more = false;
                    }
                    this.appendChild(this.loading);
                };
                RHDPSearchResults.prototype._renderResults = function (e) {
                    if (this.querySelector('.loading')) {
                        this.removeChild(this.loading);
                    }
                    if (e.detail && typeof e.detail.results !== 'undefined' && typeof e.detail.invalid === 'undefined') {
                        this.addResults(e.detail.results);
                    }
                    else {
                        while (this.firstChild) {
                            this.removeChild(this.firstChild);
                        }
                        this.appendChild(this.invalidMsg);
                    }
                    this.dispatchEvent(new CustomEvent('results-loaded', {
                        detail: { results: this.results },
                        bubbles: true
                    }));
                };
                RHDPSearchResults.prototype._clearResults = function (e) {
                    this.results = undefined;
                };
                RHDPSearchResults.prototype._checkValid = function (e) {
                    var obj = e.detail;
                    this.valid = Object.keys(obj.filters).length > 0 || (obj.term !== null && obj.term !== '' && typeof obj.term !== 'undefined');
                    if (!this.valid) {
                        this.appendChild(this.invalidMsg);
                    }
                    else {
                        if (this.querySelector('.invalidMsg')) {
                            this.removeChild(this.invalidMsg);
                        }
                    }
                };
                RHDPSearchResults.prototype.addResults = function (results) {
                    if (results && results.hits && results.hits.hits) {
                        var hits = results.hits.hits;
                        var l = hits.length;
                        for (var i = 0; i < l; i++) {
                            this.addResult(hits[i]);
                        }
                        this.last = this.last + l;
                        if (this.last >= results.hits.total) {
                            this.appendChild(this.endOfResults);
                        }
                        if (l > 0 && this.last < results.hits.total) {
                            if (this.querySelector('.end-of-results')) {
                                this.removeChild(this.endOfResults);
                            }
                            this.appendChild(this.loadMore);
                        }
                        else {
                            if (this.querySelector('.moreBtn')) {
                                this.removeChild(this.loadMore);
                            }
                            this.appendChild(this.endOfResults);
                        }
                    }
                };
                return RHDPSearchResults;
            }(HTMLElement));
            exports_1("default", RHDPSearchResults);
            customElements.define('rhdp-search-results', RHDPSearchResults);
        }
    };
});
