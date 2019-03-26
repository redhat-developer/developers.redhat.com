System.register(["../../@patternfly/pfelement/pfelement.js", "./dp-search-result.js"], function (exports_1, context_1) {
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
    var pfelement_js_1, dp_search_result_js_1, DPSearchResults;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pfelement_js_1_1) {
                pfelement_js_1 = pfelement_js_1_1;
            },
            function (dp_search_result_js_1_1) {
                dp_search_result_js_1 = dp_search_result_js_1_1;
            }
        ],
        execute: function () {
            DPSearchResults = (function (_super) {
                __extends(DPSearchResults, _super);
                function DPSearchResults() {
                    var _this = _super.call(this, DPSearchResults, { delayRender: true }) || this;
                    _this._more = false;
                    _this._last = 0;
                    _this._valid = true;
                    _this._renderResults = _this._renderResults.bind(_this);
                    _this._setLoading = _this._setLoading.bind(_this);
                    _this._checkValid = _this._checkValid.bind(_this);
                    _this._clearResults = _this._clearResults.bind(_this);
                    return _this;
                }
                Object.defineProperty(DPSearchResults.prototype, "html", {
                    get: function () {
                        return "\n        <style>\n            :host {\n                display: flex;\n                flex-direction: column;\n            }\n\n            [data-hide] {\n                display: none;\n            }\n\n            h4 { \n                font-size: 27px;\n                font-weight: 600;\n                color: #242424;\n                line-height: 1.5;\n                margin-bottom: 16px;\n                margin-top: 16px;\n            }\n\n            p {\n                font-size: 16px;\n                line-height: 1.5;\n                text-align: center;\n            }\n\n            div.moreBtn {\n                text-align: center;\n            }\n\n            a.moreBtn {\n                background-color: #fff;\n                border: 1px solid #06c;\n                color: #06c;\n                display: block;\n                font-weight: 600;\n                line-height: 1.44;\n                margin: 0 auto;\n                max-width: 165px;\n                padding: 8px 35px;\n                text-transform: uppercase;\n                cursor: pointer;\n                text-decoration: none;\n            }\n            a.moreBtn:hover {\n                background-color: #06c;\n                color: #fff;\n            }\n\n            .loading {\n                background: url(https://developers.redhat.com/images/icons/ajax-loader.gif) center 80px no-repeat;\n                min-height: 250px;\n            }\n        </style>\n        <slot></slot>\n        <div class=\"loading\" data-hide></div>\n        <div class=\"moreBtn\" data-hide><a class=\"moreBtn\" href=\"#\">Load More</a></div>\n        <p class=\"end-of-results\" data-hide>- End of Results -</p>\n        <div class=\"invalidMsg\" data-hide>\n        <h4>Well, this is awkward. No search term was entered yet, so this page is a little empty right now.</h4>\n        <p>After you enter a search term in the box above, you will see the results displayed here. \n        You can also use the filters to select a content type, product or topic to see some results too. \n        Try it out!</p>\n        </div>";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchResults, "tag", {
                    get: function () { return 'dp-search-results'; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchResults.prototype, "results", {
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
                Object.defineProperty(DPSearchResults.prototype, "more", {
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
                Object.defineProperty(DPSearchResults.prototype, "last", {
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
                Object.defineProperty(DPSearchResults.prototype, "valid", {
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
                DPSearchResults.prototype.connectedCallback = function () {
                    var _this = this;
                    _super.prototype.connectedCallback.call(this);
                    _super.prototype.render.call(this);
                    this.shadowRoot.querySelector('div.moreBtn').addEventListener('click', function (e) {
                        e.preventDefault();
                        _this.more = true;
                        var evt = {
                            detail: {
                                from: _this.last
                            },
                            bubbles: true,
                            composed: true
                        };
                        _this.dispatchEvent(new CustomEvent('load-more', evt));
                    });
                    top.addEventListener('search-complete', this._renderResults);
                    top.addEventListener('search-start', this._setLoading);
                    top.addEventListener('params-ready', this._checkValid);
                    top.window.addEventListener('popstate', this._clearResults);
                };
                DPSearchResults.prototype.addResult = function (result) {
                    var item = new dp_search_result_js_1.default();
                    item.result = result;
                    this.appendChild(item);
                };
                DPSearchResults.prototype._setLoading = function (e) {
                    this.shadowRoot.querySelector('div.moreBtn').setAttribute('data-hide', '');
                    this.shadowRoot.querySelector('.invalidMsg').setAttribute('data-hide', '');
                    if (!this.more) {
                        this.last = 0;
                        while (this.firstChild) {
                            this.removeChild(this.firstChild);
                        }
                    }
                    else {
                        this.more = false;
                    }
                    this.shadowRoot.querySelector('.loading').removeAttribute('data-hide');
                };
                DPSearchResults.prototype._renderResults = function (e) {
                    if (this.shadowRoot.querySelector('.loading')) {
                        this.shadowRoot.querySelector('.loading').setAttribute('data-hide', '');
                    }
                    if (e.detail && typeof e.detail.results !== 'undefined' && typeof e.detail.invalid === 'undefined') {
                        this.addResults(e.detail.results);
                    }
                    else {
                        while (this.firstChild) {
                            this.removeChild(this.firstChild);
                        }
                        this.shadowRoot.querySelector('.end-of-results').setAttribute('data-hide', '');
                        this.shadowRoot.querySelector('div.moreBtn').setAttribute('data-hide', '');
                        this.shadowRoot.querySelector('.invalidMsg').removeAttribute('data-hide');
                    }
                    var evt = {
                        detail: { results: this.results },
                        bubbles: true,
                        composed: true
                    };
                    this.dispatchEvent(new CustomEvent('results-loaded', evt));
                };
                DPSearchResults.prototype._clearResults = function (e) {
                    this.results = undefined;
                };
                DPSearchResults.prototype._checkValid = function (e) {
                    var obj = e.detail;
                    this.valid = Object.keys(obj.filters).length > 0 || (obj.term !== null && obj.term !== '' && typeof obj.term !== 'undefined');
                    if (!this.valid) {
                        this.shadowRoot.querySelector('.invalidMsg').removeAttribute('data-hide');
                    }
                    else {
                        if (this.shadowRoot.querySelector('.invalidMsg')) {
                            this.shadowRoot.querySelector('.invalidMsg').setAttribute('data-hide', '');
                        }
                    }
                };
                DPSearchResults.prototype.addResults = function (results) {
                    if (results && results.docs) {
                        var hits = results.docs;
                        var l = hits.length;
                        for (var i = 0; i < l; i++) {
                            this.addResult(hits[i]);
                        }
                        this.last = this.last + l;
                        if (this.last >= results.numFound) {
                            this.shadowRoot.querySelector('.end-of-results').removeAttribute('data-hide');
                        }
                        if (l > 0 && this.last < results.numFound) {
                            this.shadowRoot.querySelector('.invalidMsg').setAttribute('data-hide', '');
                            this.shadowRoot.querySelector('.end-of-results').setAttribute('data-hide', '');
                            this.shadowRoot.querySelector('div.moreBtn').removeAttribute('data-hide');
                        }
                        else {
                            this.shadowRoot.querySelector('div.moreBtn').setAttribute('data-hide', '');
                            this.shadowRoot.querySelector('.end-of-results').removeAttribute('data-hide');
                        }
                    }
                };
                return DPSearchResults;
            }(pfelement_js_1.default));
            exports_1("default", DPSearchResults);
            pfelement_js_1.default.create(DPSearchResults);
        }
    };
});
