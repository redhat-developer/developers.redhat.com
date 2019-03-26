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
    var RHDPSearchSortPage;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RHDPSearchSortPage = (function (_super) {
                __extends(RHDPSearchSortPage, _super);
                function RHDPSearchSortPage() {
                    var _this = _super.call(this) || this;
                    _this.template = "<p>\n        <span>Sort results by</span>\n        <select>\n        <option value=\"relevance\">Relevance</option>\n        <option value=\"most-recent\">Most Recent</option>\n        </select>\n        </p>";
                    _this._sortChange = _this._sortChange.bind(_this);
                    return _this;
                }
                Object.defineProperty(RHDPSearchSortPage.prototype, "sort", {
                    get: function () {
                        return this._sort;
                    },
                    set: function (val) {
                        if (this._sort === val)
                            return;
                        this._sort = val;
                        this.setAttribute('sort', this._sort);
                        this.querySelector('select').value = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchSortPage.prototype.connectedCallback = function () {
                    this.innerHTML = this.template;
                    top.addEventListener('params-ready', this._sortChange);
                    this.querySelector('select').onchange = this._sortChange;
                };
                Object.defineProperty(RHDPSearchSortPage, "observedAttributes", {
                    get: function () {
                        return ['sort'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchSortPage.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchSortPage.prototype._sortChange = function (e) {
                    if (e.detail && e.detail.sort) {
                        this.sort = e.detail.sort;
                    }
                    else {
                        if (e.target['options'] && typeof e.target['selectedIndex'] !== 'undefined') {
                            this.sort = e.target['options'][e.target['selectedIndex']].value;
                            this.dispatchEvent(new CustomEvent('sort-change', {
                                detail: {
                                    sort: this.sort
                                },
                                bubbles: true
                            }));
                        }
                    }
                };
                return RHDPSearchSortPage;
            }(HTMLElement));
            exports_1("default", RHDPSearchSortPage);
            customElements.define('rhdp-search-sort-page', RHDPSearchSortPage);
        }
    };
});
