System.register(["../../@patternfly/pfelement/pfelement.js", "./dp-search-filter-active-item.js"], function (exports_1, context_1) {
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
    var pfelement_js_1, dp_search_filter_active_item_js_1, DPSearchActiveFilters;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pfelement_js_1_1) {
                pfelement_js_1 = pfelement_js_1_1;
            },
            function (dp_search_filter_active_item_js_1_1) {
                dp_search_filter_active_item_js_1 = dp_search_filter_active_item_js_1_1;
            }
        ],
        execute: function () {
            DPSearchActiveFilters = (function (_super) {
                __extends(DPSearchActiveFilters, _super);
                function DPSearchActiveFilters() {
                    var _this = _super.call(this, DPSearchActiveFilters, { delayRender: true }) || this;
                    _this._title = 'Active Filters:';
                    _this._toggle = false;
                    _this._clearFilters = _this._clearFilters.bind(_this);
                    _this._addFilters = _this._addFilters.bind(_this);
                    _this._checkActive = _this._checkActive.bind(_this);
                    return _this;
                }
                Object.defineProperty(DPSearchActiveFilters.prototype, "html", {
                    get: function () {
                        return "\n        <style>\n            :host {\n                display: flex;\n                flex-direction: row;\n                margin-bottom: 1em;\n            }\n\n            strong {\n                flex: 0 1 auto;\n                font-size: 1.2em;\n                font-weight: 600;\n                margin: .3em .7em 0 0;\n                order: 1;\n                white-space: nowrap;\n            }\n\n            .clearFilters {\n                color: #06c;\n                flex: 0 1 auto;\n                font-size: 14px;\n                font-weight: 100;\n                margin-top: .3em;\n                order: 3;\n                text-decoration: none;\n                white-space: nowrap;\n                cursor: pointer;\n            }\n\n            @media only screen and (max-width: 768px) {\n                strong {\n                    display: none;\n                }\n            }\n        </style>\n        <strong>" + this.title + "</strong>\n        <slot></slot>\n        <a href=\"#\" class=\"clearFilters\">Clear Filters</a>";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchActiveFilters, "tag", {
                    get: function () { return 'dp-search-active-filters'; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchActiveFilters.prototype, "title", {
                    get: function () {
                        return this._title;
                    },
                    set: function (val) {
                        if (this._title === val)
                            return;
                        this._title = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchActiveFilters.prototype, "filters", {
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
                DPSearchActiveFilters.prototype.connectedCallback = function () {
                    var _this = this;
                    _super.prototype.connectedCallback.call(this);
                    _super.prototype.render.call(this);
                    top.addEventListener('filter-item-change', this._checkActive);
                    top.addEventListener('filter-item-init', this._checkActive);
                    top.addEventListener('search-complete', this._checkActive);
                    top.addEventListener('params-ready', this._checkActive);
                    top.addEventListener('clear-filters', this._clearFilters);
                    this._addFilters();
                    this.shadowRoot.addEventListener('click', function (e) {
                        var evt = { bubbles: true, composed: true };
                        switch (e.target['className']) {
                            case 'showBtn':
                            case 'cancel':
                            case 'applyFilters':
                                e.preventDefault();
                                _this.dispatchEvent(new CustomEvent('toggle-modal', evt));
                                break;
                            case 'clearFilters':
                                e.preventDefault();
                                _this.dispatchEvent(new CustomEvent('clear-filters', evt));
                                break;
                            case 'more':
                                e.preventDefault();
                                break;
                        }
                    });
                };
                Object.defineProperty(DPSearchActiveFilters, "observedAttributes", {
                    get: function () {
                        return ['title'];
                    },
                    enumerable: true,
                    configurable: true
                });
                DPSearchActiveFilters.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                DPSearchActiveFilters.prototype._checkActive = function (e) {
                    if (e.detail) {
                        var chk = top.document.querySelectorAll('dp-search-filter-item[active]');
                        if (chk.length > 0) {
                            this.style.display = 'block';
                        }
                        else {
                            this.style.display = 'none';
                        }
                    }
                };
                DPSearchActiveFilters.prototype._initActive = function (e, group_key, item) {
                    if (e.detail && e.detail.filters) {
                        Object.keys(e.detail.filters).forEach(function (group) {
                            e.detail.filters[group].forEach(function (facet) {
                                if (group === group_key) {
                                    if (facet === item.key) {
                                        return true;
                                    }
                                }
                            });
                        });
                    }
                    return false;
                };
                DPSearchActiveFilters.prototype._addFilters = function () {
                    var groups = this.filters && this.filters.facets ? this.filters.facets : [];
                    for (var i = 0; i < groups.length; i++) {
                        var items = groups[i].items;
                        for (var j = 0; j < items.length; j++) {
                            var item = new dp_search_filter_active_item_js_1.default();
                            item.name = items[j].name;
                            item.value = items[j].value;
                            item.inline = true;
                            item.bubble = false;
                            item.key = items[j].key;
                            item.group = groups[i].key;
                            this.appendChild(item);
                        }
                    }
                };
                DPSearchActiveFilters.prototype.applyFilters = function () {
                    var evt = {
                        bubbles: true,
                        composed: true
                    };
                    this.dispatchEvent(new CustomEvent('apply-filters', evt));
                };
                DPSearchActiveFilters.prototype._clearFilters = function (e) {
                    this.style.display = 'none';
                };
                return DPSearchActiveFilters;
            }(pfelement_js_1.default));
            exports_1("default", DPSearchActiveFilters);
            pfelement_js_1.default.create(DPSearchActiveFilters);
        }
    };
});
