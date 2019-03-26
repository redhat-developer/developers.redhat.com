System.register(["@rhd/rhdp-search/rhdp-search-filter-group", "@rhd/rhdp-search/rhdp-search-filter-item"], function (exports_1, context_1) {
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
    var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };
    var rhdp_search_filter_group_1, rhdp_search_filter_item_1, RHDPSearchFilters, templateObject_1, templateObject_2, templateObject_3;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (rhdp_search_filter_group_1_1) {
                rhdp_search_filter_group_1 = rhdp_search_filter_group_1_1;
            },
            function (rhdp_search_filter_item_1_1) {
                rhdp_search_filter_item_1 = rhdp_search_filter_item_1_1;
            }
        ],
        execute: function () {
            RHDPSearchFilters = (function (_super) {
                __extends(RHDPSearchFilters, _super);
                function RHDPSearchFilters() {
                    var _this = _super.call(this) || this;
                    _this._type = '';
                    _this._title = 'Filter By';
                    _this._toggle = false;
                    _this.modalTemplate = function (string, title) {
                        return "<div class=\"cover\" id=\"cover\">\n            <div class=\"title\">" + title + " <a href=\"#\" class=\"cancel\" id=\"cancel\">Close</a></div>\n            <div class=\"groups\">\n            </div>\n            <div class=\"footer\">\n            <a href=\"#\" class=\"clearFilters\">Clear Filters</a> \n            <a href=\"#\" class=\"applyFilters\">Apply</a>\n            </div>\n        </div>";
                    };
                    _this.activeTemplate = function (strings, title) {
                        return "<div class=\"active-type\">\n        <strong>" + title + "</strong>\n        <div class=\"activeFilters\"></div>\n        <a href=\"#\" class=\"clearFilters\">Clear Filters</a>\n      </div>";
                    };
                    _this.template = function (strings, title) {
                        return "<a class=\"showBtn\">Show Filters</a>\n        <div class=\"control\" id=\"control\">\n            <div class=\"title\">" + title + "</div>\n            <div class=\"groups\">\n            </div>\n        </div>";
                    };
                    _this._toggleModal = _this._toggleModal.bind(_this);
                    _this._clearFilters = _this._clearFilters.bind(_this);
                    _this._addFilters = _this._addFilters.bind(_this);
                    _this._checkActive = _this._checkActive.bind(_this);
                    return _this;
                }
                Object.defineProperty(RHDPSearchFilters.prototype, "type", {
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
                Object.defineProperty(RHDPSearchFilters.prototype, "title", {
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
                Object.defineProperty(RHDPSearchFilters.prototype, "filters", {
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
                Object.defineProperty(RHDPSearchFilters.prototype, "toggle", {
                    get: function () {
                        return this._toggle;
                    },
                    set: function (val) {
                        if (this._toggle === val)
                            return;
                        this._toggle = val;
                        if (this._toggle) {
                            this.querySelector('.cover').className = 'cover modal';
                            window.scrollTo(0, 0);
                            document.body.style.overflow = 'hidden';
                            this.style.height = window.innerHeight + 'px';
                        }
                        else {
                            this.querySelector('.cover').className = 'cover';
                            document.body.style.overflow = 'auto';
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchFilters.prototype.connectedCallback = function () {
                    var _this = this;
                    if (this.type === 'active') {
                        this.innerHTML = this.activeTemplate(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), this.title);
                        top.addEventListener('filter-item-change', this._checkActive);
                        top.addEventListener('filter-item-init', this._checkActive);
                        top.addEventListener('search-complete', this._checkActive);
                        top.addEventListener('params-ready', this._checkActive);
                        top.addEventListener('clear-filters', this._clearFilters);
                        this._addFilters();
                    }
                    else if (this.type === 'modal') {
                        this.innerHTML = this.modalTemplate(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", ""], ["", ""])), this.title);
                        this.addGroups();
                    }
                    else {
                        this.innerHTML = this.template(templateObject_3 || (templateObject_3 = __makeTemplateObject(["", ""], ["", ""])), this.title);
                        this.addGroups();
                    }
                    this.addEventListener('click', function (e) {
                        switch (e.target['className']) {
                            case 'showBtn':
                            case 'cancel':
                            case 'applyFilters':
                                e.preventDefault();
                                _this.dispatchEvent(new CustomEvent('toggle-modal', {
                                    bubbles: true
                                }));
                                break;
                            case 'clearFilters':
                                e.preventDefault();
                                _this.dispatchEvent(new CustomEvent('clear-filters', {
                                    bubbles: true
                                }));
                                break;
                            case 'more':
                                e.preventDefault();
                                break;
                        }
                    });
                    top.addEventListener('toggle-modal', this._toggleModal);
                };
                Object.defineProperty(RHDPSearchFilters, "observedAttributes", {
                    get: function () {
                        return ['type', 'title', 'toggle'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchFilters.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchFilters.prototype.addGroups = function () {
                    var groups = this.filters.facets, len = groups.length;
                    for (var i = 0; i < len; i++) {
                        var group = new rhdp_search_filter_group_1.default(), groupInfo = groups[i], groupNode = group.querySelector('.group'), primaryFilters = group.querySelector('.primary'), secondaryFilters = group.querySelector('.secondary'), len_1 = groupInfo.items ? groupInfo.items.length : 0;
                        if (len_1 <= 5) {
                            groupNode.removeChild(groupNode.lastChild);
                        }
                        for (var j = 0; j < len_1; j++) {
                            var item = new rhdp_search_filter_item_1.default();
                            item.name = groupInfo.items[j].name;
                            item.value = groupInfo.items[j].value;
                            item.active = groupInfo.items[j].active;
                            item.key = groupInfo.items[j].key;
                            item.group = groupInfo.key;
                            if (j < 5) {
                                primaryFilters.appendChild(item);
                            }
                            else {
                                secondaryFilters.appendChild(item);
                            }
                        }
                        group.key = groupInfo.key;
                        group.name = groupInfo.name;
                        this.querySelector('.groups').appendChild(group);
                    }
                };
                RHDPSearchFilters.prototype._checkActive = function (e) {
                    if (e.detail) {
                        if (e.detail.facet) {
                            this.style.display = e.detail.facet.active ? 'block' : this.style.display;
                        }
                        else {
                            var chk = this.querySelectorAll('rhdp-search-filter-item[active]');
                            if (chk.length > 0) {
                                this.style.display = 'block';
                            }
                            else {
                                this.style.display = 'none';
                            }
                        }
                    }
                };
                RHDPSearchFilters.prototype._initActive = function (e, group_key, item) {
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
                RHDPSearchFilters.prototype._addFilters = function () {
                    var groups = this.filters.facets;
                    for (var i = 0; i < groups.length; i++) {
                        var items = groups[i].items;
                        for (var j = 0; j < items.length; j++) {
                            var item = new rhdp_search_filter_item_1.default();
                            item.name = items[j].name;
                            item.value = items[j].value;
                            item.inline = true;
                            item.bubble = false;
                            item.key = items[j].key;
                            item.group = groups[i].key;
                            this.querySelector('.activeFilters').appendChild(item);
                        }
                    }
                };
                RHDPSearchFilters.prototype._toggleModal = function (e) {
                    if (this.type === 'modal') {
                        this.toggle = !this.toggle;
                    }
                };
                RHDPSearchFilters.prototype.applyFilters = function () {
                    this.dispatchEvent(new CustomEvent('apply-filters', {
                        bubbles: true
                    }));
                };
                RHDPSearchFilters.prototype._clearFilters = function (e) {
                    this.style.display = 'none';
                };
                return RHDPSearchFilters;
            }(HTMLElement));
            exports_1("default", RHDPSearchFilters);
            customElements.define('rhdp-search-filters', RHDPSearchFilters);
        }
    };
});
