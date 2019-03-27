System.register(["../../@patternfly/pfelement/pfelement.js", "./dp-search-filter-group.js", "./dp-search-filter-item.js"], function (exports_1, context_1) {
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
    var pfelement_js_1, dp_search_filter_group_js_1, dp_search_filter_item_js_1, DPSearchFilters;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pfelement_js_1_1) {
                pfelement_js_1 = pfelement_js_1_1;
            },
            function (dp_search_filter_group_js_1_1) {
                dp_search_filter_group_js_1 = dp_search_filter_group_js_1_1;
            },
            function (dp_search_filter_item_js_1_1) {
                dp_search_filter_item_js_1 = dp_search_filter_item_js_1_1;
            }
        ],
        execute: function () {
            DPSearchFilters = (function (_super) {
                __extends(DPSearchFilters, _super);
                function DPSearchFilters() {
                    var _this = _super.call(this, DPSearchFilters, { delayRender: true }) || this;
                    _this._type = '';
                    _this._title = 'Filter By';
                    _this._toggle = false;
                    _this._toggleModal = _this._toggleModal.bind(_this);
                    _this._clearFilters = _this._clearFilters.bind(_this);
                    return _this;
                }
                Object.defineProperty(DPSearchFilters.prototype, "html", {
                    get: function () {
                        return "\n        <style>\n            :host {\n                display: block;\n            }\n            .title {\n                background: #e6e7e8; \n                color: #000;\n                text-transform: uppercase;\n                padding: .5em 1em;\n                font-weight: 600;\n            }\n            .cancel { display: none; }\n            .showBtn { \n                display: none;\n                background: #ccc;\n                text-decoration: none;\n                border: 0;\n                height: 40px;\n                font-weight: 600;\n                font-size: 16px;\n                padding: 9px 40px;\n                transition: background .2s ease-in 0s;\n                line-height: 1.2em;\n                cursor: pointer;\n                position: relative;\n                text-align: center;\n                color: #333; \n                width: 100%;\n                }\n            dp-search-sort-page { display: none; }\n            .groups {\n                background-color: #f9f9f9;\n                padding-bottom: 30px;\n                padding-top: 20px;\n            }\n            .active-type {\n                display: flex;\n                flex-direction: row;\n                margin-bottom: 1em;\n                .inline {\n                    font-size: 16px;\n                    font-weight: 600;\n                }\n\n                .clearFilters {\n                    font-size: 16px;\n                }\n\n            }\n            .active-type strong {\n                flex: 0 1 auto; \n                order: 1; \n                font-weight: 600;\n                font-size: 1.2em;\n                margin: 0.3em .7em 0 0;\n                white-space: nowrap;\n            }\n            .active-type div { flex: 1 1 auto; order: 2; list-style: none; }\n            .active-type a {\n                flex: 0 1 auto;\n                order: 3;\n                text-decoration: none;\n                color: #0066CC;\n                margin-top: .3em;\n                font-weight: 100;\n                font-size: 14px;\n                white-space: nowrap;\n                &:hover, &:active, &:focus { color: #004080; }\n            }\n\n            #footer { display: none; }\n\n            @media only screen and (max-width: 768px) {\n                :host {\n                    display: flex;\n                    flex-direction: row;\n                    flex: none; \n                    align-self: flex-start; \n                    border: none;\n                    margin: 0 0 1.3em 0; \n                }\n\n                .split { flex: 1 0 auto; }\n                .split.right { text-align: right; }\n\n                dp-search-sort-page { display: inline-block; margin: 0;}\n\n                .control {\n                    display: none;\n                    flex-direction: column;\n                    width: 100%;\n                    height: 100%;\n                    padding-top: 51px;\n                    background: rgba(0,0,0,.5);\n                    border: none;\n                    z-index: 99;\n                    right: 100%;\n                    position: absolute;\n                    top: 100px;\n                }\n                .title { flex: 0 0 40px; order: 1; vertical-align: middle; }\n                .showBtn {\n                    display: block;\n                    width: 150px;\n                    height: auto;\n                    border: 1px solid #06c;\n                    line-height: 1.44;\n                    background-color: transparent;\n                    padding: 8px 0;\n                    color: #06c;\n                }\n\n                .showBtn:hover, .showBtn:focus {\n                        background-color: #06c;\n                        color: #fff;\n                }\n            }\n\n        </style>\n<div class=\"split\"><a class=\"showBtn\">Show Filters</a></div>\n<div class=\"split right\"><dp-search-sort-page></dp-search-sort-page></div>\n<div class=\"control\" id=\"control\">\n    <div class=\"title\">" + this.title + "</div>\n    <div class=\"groups\">\n    <slot></slot>\n    </div>\n</div>";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchFilters, "tag", {
                    get: function () { return 'dp-search-filters'; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchFilters.prototype, "type", {
                    get: function () {
                        return this._type;
                    },
                    set: function (val) {
                        if (this._type === val)
                            return;
                        this._type = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchFilters.prototype, "title", {
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
                Object.defineProperty(DPSearchFilters.prototype, "filters", {
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
                Object.defineProperty(DPSearchFilters.prototype, "toggle", {
                    get: function () {
                        return this._toggle;
                    },
                    set: function (val) {
                        if (this._toggle === val)
                            return;
                        this._toggle = val;
                        if (this._toggle) {
                            this.shadowRoot.querySelector('.cover').className = 'cover modal';
                            window.scrollTo(0, 0);
                            document.body.style.overflow = 'hidden';
                            this.style.height = window.innerHeight + 'px';
                        }
                        else {
                            this.shadowRoot.querySelector('.cover').className = 'cover';
                            document.body.style.overflow = 'auto';
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                DPSearchFilters.prototype.connectedCallback = function () {
                    var _this = this;
                    _super.prototype.connectedCallback.call(this);
                    _super.prototype.render.call(this);
                    this.addGroups();
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
                    top.addEventListener('toggle-modal', this._toggleModal);
                };
                Object.defineProperty(DPSearchFilters, "observedAttributes", {
                    get: function () {
                        return ['type', 'title', 'toggle'];
                    },
                    enumerable: true,
                    configurable: true
                });
                DPSearchFilters.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                DPSearchFilters.prototype.addGroups = function () {
                    var groups = this.filters && this.filters.facets ? this.filters.facets : [], len = groups.length;
                    for (var i = 0; i < len; i++) {
                        var group = new dp_search_filter_group_js_1.default(), groupInfo = groups[i], gLen = groupInfo.items.length;
                        for (var j = 0; j < gLen; j++) {
                            var item = new dp_search_filter_item_js_1.default();
                            item.name = groupInfo.items[j].name;
                            item.value = groupInfo.items[j].value;
                            item.active = groupInfo.items[j].active;
                            item.key = groupInfo.items[j].key;
                            item.group = groupInfo.key;
                            group.items.push(item);
                        }
                        group.key = groupInfo.key;
                        group.name = groupInfo.name;
                        this.shadowRoot.querySelector('.groups').appendChild(group);
                    }
                };
                DPSearchFilters.prototype._toggleModal = function (e) {
                    if (this.type === 'modal') {
                        this.toggle = !this.toggle;
                    }
                };
                DPSearchFilters.prototype.applyFilters = function () {
                    var evt = {
                        bubbles: true,
                        composed: true
                    };
                    this.dispatchEvent(new CustomEvent('apply-filters', evt));
                };
                DPSearchFilters.prototype._clearFilters = function (e) {
                    this.style.display = 'none';
                };
                return DPSearchFilters;
            }(pfelement_js_1.default));
            exports_1("default", DPSearchFilters);
            pfelement_js_1.default.create(DPSearchFilters);
        }
    };
});
