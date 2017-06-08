var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
window.addEventListener('WebComponentsReady', function () {
    System.import('rhdp-search-app');
});
System.register("rhdp-search-query", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RHDPSearchQuery;
    return {
        setters: [],
        execute: function () {
            RHDPSearchQuery = (function (_super) {
                __extends(RHDPSearchQuery, _super);
                function RHDPSearchQuery() {
                    var _this = _super.call(this) || this;
                    _this._limit = 10;
                    _this._sort = 'relevance';
                    _this._term = '';
                    _this._url = 'http://dcp.stage.jboss.org/v2/rest/search/developer_materials';
                    _this.urlTemplate = function (strings, url, term, limit, sort, types, tags, sys_types) {
                        var order = '';
                        if (sort === 'most-recent') {
                            order = '&newFirst=true';
                        }
                        return url + "?tags_or_logic=true&filter_out_excluded=true&from=0" + order + "&project=&query=" + term + "&query_highlight=true&size" + limit + "=true" + types + tags + sys_types;
                    };
                    return _this;
                }
                Object.defineProperty(RHDPSearchQuery.prototype, "filters", {
                    get: function () {
                        return this._filters;
                    },
                    set: function (val) {
                        if (this._filters === val)
                            return;
                        this._filters = val;
                        this.setFilters();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchQuery.prototype, "limit", {
                    get: function () {
                        return this._limit;
                    },
                    set: function (val) {
                        if (this._limit === val)
                            return;
                        this._limit = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchQuery.prototype, "sort", {
                    get: function () {
                        return this._sort;
                    },
                    set: function (val) {
                        if (this._sort === val)
                            return;
                        this._sort = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchQuery.prototype, "results", {
                    get: function () {
                        return this._results;
                    },
                    set: function (val) {
                        if (this._results === val)
                            return;
                        this._results = val;
                        this.dispatchEvent(new CustomEvent('search-complete', {
                            detail: {
                                results: this.results,
                                term: this.term,
                                filters: this.filters
                            },
                            bubbles: true
                        }));
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchQuery.prototype, "term", {
                    get: function () {
                        return this._term;
                    },
                    set: function (val) {
                        if (this._term === val)
                            return;
                        this._term = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchQuery.prototype, "url", {
                    get: function () {
                        return this._url;
                    },
                    set: function (val) {
                        if (this._results === val)
                            return;
                        this._url = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchQuery.prototype, "typeString", {
                    get: function () {
                        return this.valStrings('tag', this.filters.facets[1].items);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchQuery.prototype, "tagString", {
                    get: function () {
                        return this.valStrings('tag', this.filters.facets[2].items);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchQuery.prototype, "sysTypeString", {
                    get: function () {
                        return this.valStrings('sys_type', this.filters.facets[0].items);
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchQuery.prototype.valStrings = function (txt, items) {
                    var len = items.length, typeString = '';
                    for (var i = 0; i < len; i++) {
                        var t = (items[i].value.join("&" + txt + "=")).toLowerCase().replace(' ', '+');
                        typeString += items[i].active ? "&" + txt + "=" + t : '';
                    }
                    return typeString;
                };
                RHDPSearchQuery.prototype.connectedCallback = function () {
                };
                Object.defineProperty(RHDPSearchQuery, "observedAttributes", {
                    get: function () {
                        return ['term', 'sort', 'limit', 'results', 'filters', 'url'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchQuery.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchQuery.prototype.search = function (term) {
                    var _this = this;
                    if (term && term !== '') {
                        this.term = term;
                    }
                    fetch((_a = ["", "", "", "", "", "", "", ""], _a.raw = ["", "", "", "", "", "", "", ""], this.urlTemplate(_a, this.url, this.term, this.limit, this.sort, this.typeString, this.tagString, this.sysTypeString)))
                        .then(function (resp) { return resp.json(); })
                        .then(function (data) { _this.results = data; });
                    var _a;
                };
                RHDPSearchQuery.prototype.setFilters = function () {
                    return;
                };
                return RHDPSearchQuery;
            }(HTMLElement));
            exports_1("RHDPSearchQuery", RHDPSearchQuery);
            customElements.define('rhdp-search-query', RHDPSearchQuery);
        }
    };
});
System.register("rhdp-search-box", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var RHDPSearchBox;
    return {
        setters: [],
        execute: function () {
            RHDPSearchBox = (function (_super) {
                __extends(RHDPSearchBox, _super);
                function RHDPSearchBox() {
                    var _this = _super.call(this) || this;
                    _this._term = '';
                    _this.name = 'Search Box';
                    _this.template = function (strings, name, term) {
                        return "<form class=\"search-bar\" role=\"search\">\n        <div class=\"input-cont\">\n            <input value=\"" + term + "\" class=\"user-success user-search\" type=\"search\" id=\"query\" placeholder=\"Enter your search term\">\n        </div>\n        <button id=\"search-btn\">SEARCH</button>\n        </form>";
                    };
                    _this.innerHTML = (_a = ["", "", ""], _a.raw = ["", "", ""], _this.template(_a, _this.name, _this.term));
                    _this.addEventListener('keyup', function (e) {
                        if (e.target['id'] === 'query') {
                            if (e.key == 'Enter') {
                                _this.doSearch();
                            }
                            else {
                                _this.term = e.target['value'];
                            }
                        }
                    });
                    _this.addEventListener('submit', function (e) {
                        e.preventDefault();
                        return false;
                    });
                    _this.addEventListener('click', function (e) {
                        if (e.target['id'] === 'search-btn') {
                            _this.doSearch();
                        }
                    });
                    return _this;
                    var _a;
                }
                Object.defineProperty(RHDPSearchBox.prototype, "term", {
                    get: function () {
                        return this._term;
                    },
                    set: function (val) {
                        if (this._term === val)
                            return;
                        this._term = val;
                        this.querySelector('input').setAttribute('value', val);
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchBox.prototype.connectedCallback = function () {
                };
                Object.defineProperty(RHDPSearchBox, "observedAttributes", {
                    get: function () {
                        return ['term'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchBox.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchBox.prototype.doSearch = function () {
                    history.pushState({}, "Red Hat Developer Program Search: " + this.term, "?q=" + this.term);
                    this.dispatchEvent(new CustomEvent('do-search', {
                        detail: {
                            term: this.term
                        },
                        bubbles: true
                    }));
                };
                return RHDPSearchBox;
            }(HTMLElement));
            exports_2("RHDPSearchBox", RHDPSearchBox);
            customElements.define('rhdp-search-box', RHDPSearchBox);
        }
    };
});
System.register("rhdp-search-filter-item", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var RHDPSearchFilterItem;
    return {
        setters: [],
        execute: function () {
            RHDPSearchFilterItem = (function (_super) {
                __extends(RHDPSearchFilterItem, _super);
                function RHDPSearchFilterItem() {
                    var _this = _super.call(this) || this;
                    _this._active = false;
                    _this._inline = false;
                    _this.template = function (strings, name) {
                        return "<div class=\"list\"><input type=\"checkbox\">" + name + "<input type=\"checkbox\"></div>";
                    };
                    _this.inlineTemplate = function (strings, name) {
                        return "<div class=\"inline\">" + name + " <span class=\"clearItem\">X</span></div>";
                    };
                    return _this;
                }
                Object.defineProperty(RHDPSearchFilterItem.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (val) {
                        if (this._name === val)
                            return;
                        this._name = val;
                        this.setAttribute('name', this.name);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterItem.prototype, "key", {
                    get: function () {
                        return this._key;
                    },
                    set: function (val) {
                        if (this._key === val)
                            return;
                        this._key = val;
                        this.className = "filter-item-" + this.key;
                        this.setAttribute('key', this.key);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterItem.prototype, "active", {
                    get: function () {
                        return this._active;
                    },
                    set: function (val) {
                        if (this._active === val)
                            return;
                        this._active = val;
                        this.setChecked();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterItem.prototype, "value", {
                    get: function () {
                        return this._value;
                    },
                    set: function (val) {
                        if (this._value === val)
                            return;
                        this._value = val;
                        this.setAttribute('value', this.value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterItem.prototype, "inline", {
                    get: function () {
                        return this._inline;
                    },
                    set: function (val) {
                        if (this._inline === val)
                            return;
                        this._inline = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchFilterItem.prototype.connectedCallback = function () {
                    var _this = this;
                    if (this.inline) {
                        this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.inlineTemplate(_a, this.name));
                    }
                    else {
                        this.innerHTML = (_b = ["", ""], _b.raw = ["", ""], this.template(_b, this.name));
                    }
                    this.addEventListener('click', function (e) {
                        _this.active = !_this.active;
                        _this.dispatchEvent(new CustomEvent('facetChange', { detail: { facet: _this }, bubbles: true }));
                    });
                    this.setChecked();
                    var _a, _b;
                };
                Object.defineProperty(RHDPSearchFilterItem, "observedAttributes", {
                    get: function () {
                        return ['name', 'active', 'value', 'inline', 'key'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchFilterItem.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchFilterItem.prototype.setChecked = function () {
                    var inputList = this.querySelectorAll('input');
                    for (var i = 0; i < inputList.length; i++) {
                        if (this.active) {
                            inputList[i].setAttribute('checked', 'checked');
                        }
                        else {
                            inputList[i].removeAttribute('checked');
                        }
                    }
                };
                return RHDPSearchFilterItem;
            }(HTMLElement));
            exports_3("RHDPSearchFilterItem", RHDPSearchFilterItem);
            customElements.define('rhdp-search-filter-item', RHDPSearchFilterItem);
        }
    };
});
System.register("rhdp-search-filter-group", ["rhdp-search-filter-item"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var rhdp_search_filter_item_1, RHDPSearchFilterGroup;
    return {
        setters: [
            function (rhdp_search_filter_item_1_1) {
                rhdp_search_filter_item_1 = rhdp_search_filter_item_1_1;
            }
        ],
        execute: function () {
            RHDPSearchFilterGroup = (function (_super) {
                __extends(RHDPSearchFilterGroup, _super);
                function RHDPSearchFilterGroup() {
                    var _this = _super.call(this) || this;
                    _this._toggle = false;
                    _this._more = false;
                    _this.template = function (strings, name) {
                        return "<h4 id=\"heading\" class=\"showFilters\">" + name + "<span class=\"toggle\">&gt;</span></h4>\n        <div class=\"group hide\">\n            <div class=\"primary\"></div>\n            <div class=\"secondary hide\"></div>\n            <a href=\"#\" class=\"more\">Show More</a>\n        </div>";
                    };
                    return _this;
                }
                Object.defineProperty(RHDPSearchFilterGroup.prototype, "key", {
                    get: function () {
                        return this._key;
                    },
                    set: function (val) {
                        if (this._key === val)
                            return;
                        this._key = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterGroup.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (val) {
                        if (this._name === val)
                            return;
                        this._name = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterGroup.prototype, "items", {
                    get: function () {
                        return this._items;
                    },
                    set: function (val) {
                        if (this._items === val)
                            return;
                        this._items = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterGroup.prototype, "toggle", {
                    get: function () {
                        return this._toggle;
                    },
                    set: function (val) {
                        if (this._toggle === val)
                            return;
                        this._toggle = val;
                        this.querySelector('.group').className = this.toggle ? 'group' : 'group hide';
                        this.querySelector('.toggle').className = this.toggle ? 'toggle expand' : 'toggle';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterGroup.prototype, "more", {
                    get: function () {
                        return this._more;
                    },
                    set: function (val) {
                        if (this._more === val)
                            return;
                        this._more = val;
                        this.querySelector('.more').innerHTML = this.more ? 'Show Less' : 'Show More';
                        this.querySelector('.secondary').className = this.more ? 'secondary' : 'secondary hide';
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchFilterGroup.prototype.connectedCallback = function () {
                    var _this = this;
                    this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this.name));
                    this.renderItems();
                    this.addEventListener('click', function (e) {
                        e.preventDefault();
                        if (e.target['nodeName'] == 'H4') {
                            _this.toggle = !_this.toggle;
                        }
                        else if (e.target['className'] === 'more') {
                            _this.more = !_this.more;
                        }
                    });
                    var _a;
                };
                Object.defineProperty(RHDPSearchFilterGroup, "observedAttributes", {
                    get: function () {
                        return ['name', 'key', 'toggle', 'items', 'more'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchFilterGroup.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchFilterGroup.prototype.renderItems = function () {
                    var groupNode = this.querySelector('.group');
                    var primaryFilters = this.querySelector('.primary');
                    var secondaryFilters = this.querySelector('.secondary');
                    var len = this.items.length;
                    if (len <= 5) {
                        groupNode.removeChild(groupNode.lastChild);
                    }
                    for (var i = 0; i < len; i++) {
                        var item = new rhdp_search_filter_item_1.RHDPSearchFilterItem();
                        item.name = this.items[i].name;
                        item.value = this.items[i].value;
                        item.active = this.items[i].active;
                        item.key = this.items[i].key;
                        if (i < 5) {
                            primaryFilters.appendChild(item);
                        }
                        else {
                            secondaryFilters.appendChild(item);
                        }
                    }
                };
                return RHDPSearchFilterGroup;
            }(HTMLElement));
            exports_4("RHDPSearchFilterGroup", RHDPSearchFilterGroup);
            customElements.define('rhdp-search-filter-group', RHDPSearchFilterGroup);
        }
    };
});
System.register("rhdp-search-filters", ["rhdp-search-filter-group", "rhdp-search-filter-item"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var rhdp_search_filter_group_1, rhdp_search_filter_item_2, RHDPSearchFilters;
    return {
        setters: [
            function (rhdp_search_filter_group_1_1) {
                rhdp_search_filter_group_1 = rhdp_search_filter_group_1_1;
            },
            function (rhdp_search_filter_item_2_1) {
                rhdp_search_filter_item_2 = rhdp_search_filter_item_2_1;
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
                        return "<div class=\"cover\" id=\"cover\">\n            <div class=\"title\">" + title + " <a href=\"#\" class=\"cancel\" id=\"cancel\">Cancel</a></div>\n            <div class=\"groups\">\n            </div>\n            <div id=\"footer\">\n            <a href=\"#\" class=\"clearFilters\">Clear All</a> \n            | <a href=\"#\" class=\"applyFilters\">Apply</a>\n            </div>\n        </div>";
                    };
                    _this.activeTemplate = function (strings, title) {
                        return "<div class=\"active-type\">\n        <strong>" + title + "</strong>\n        <div class=\"activeFilters\">\n        </div>\n        <a href=\"#\" class=\"clearFilters\">Clear Filters</a>\n      </div>";
                    };
                    _this.template = function (strings, title) {
                        return "<a class=\"showBtn\">Show Filters</a>\n        <div class=\"control\" id=\"control\">\n            <div class=\"title\">" + title + "</div>\n            <div class=\"groups\">\n            </div>\n        </div>";
                    };
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
                        }
                        else {
                            this.querySelector('.cover').className = 'cover';
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchFilters.prototype.connectedCallback = function () {
                    var _this = this;
                    if (this.type === 'active') {
                        this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.activeTemplate(_a, this.title));
                        this.addAllActive();
                    }
                    else if (this.type === 'modal') {
                        this.innerHTML = (_b = ["", ""], _b.raw = ["", ""], this.modalTemplate(_b, this.title));
                        this.addGroups();
                    }
                    else {
                        this.innerHTML = (_c = ["", ""], _c.raw = ["", ""], this.template(_c, this.title));
                        this.addGroups();
                    }
                    this.addEventListener('click', function (e) {
                        e.preventDefault();
                        if (e.target['className'] === 'showBtn') {
                            _this.toggleModal(true);
                        }
                        else if (e.target['className'] === 'cancel') {
                            _this.toggleModal(false);
                        }
                        else if (e.target['className'] === 'clearFilters') {
                            _this.clearFilters();
                        }
                    });
                    var _a, _b, _c;
                };
                Object.defineProperty(RHDPSearchFilters, "observedAttributes", {
                    get: function () {
                        return ['type', 'title', 'filters', 'toggle'];
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
                        var group = new rhdp_search_filter_group_1.RHDPSearchFilterGroup(), groupInfo = groups[i];
                        group.key = groupInfo.key;
                        group.name = groupInfo.name;
                        group.items = groupInfo.items;
                        this.querySelector('.groups').appendChild(group);
                    }
                };
                RHDPSearchFilters.prototype.addActive = function (item) {
                    this.querySelector('.activeFilters').appendChild(item);
                };
                RHDPSearchFilters.prototype.addAllActive = function () {
                    var groups = this.filters.facets;
                    for (var i = 0; i < groups.length; i++) {
                        var items = groups[i].items;
                        for (var j = 0; j < items.length; j++) {
                            var item = new rhdp_search_filter_item_2.RHDPSearchFilterItem();
                            item.name = items[j].name;
                            item.value = items[j].value;
                            item.inline = true;
                            item.active = items[j].active;
                            item.key = items[j].key;
                            if (item.active) {
                                this.addActive(item);
                            }
                        }
                    }
                };
                RHDPSearchFilters.prototype.removeItem = function (item) {
                    this.querySelector(".filter-item-" + item.key).remove();
                };
                RHDPSearchFilters.prototype.setActive = function (item) {
                    this.querySelector(".filter-item-" + item.key)['active'] = item.active;
                };
                RHDPSearchFilters.prototype.toggleModal = function (val) {
                    this.dispatchEvent(new CustomEvent('toggle-modal', {
                        detail: {
                            toggle: val
                        },
                        bubbles: true
                    }));
                };
                RHDPSearchFilters.prototype.applyFilters = function () {
                    this.dispatchEvent(new CustomEvent('apply-filters', {
                        bubbles: true
                    }));
                };
                RHDPSearchFilters.prototype.clearFilters = function () {
                    var items = this.querySelectorAll('rhdp-search-filter-item'), len = items.length;
                    for (var i = 0; i < len; i++) {
                        items[i].dispatchEvent(new Event('click'));
                    }
                };
                return RHDPSearchFilters;
            }(HTMLElement));
            exports_5("RHDPSearchFilters", RHDPSearchFilters);
            customElements.define('rhdp-search-filters', RHDPSearchFilters);
        }
    };
});
System.register("rhdp-search-result", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var RHDPSearchResult;
    return {
        setters: [],
        execute: function () {
            RHDPSearchResult = (function (_super) {
                __extends(RHDPSearchResult, _super);
                function RHDPSearchResult() {
                    var _this = _super.call(this) || this;
                    _this.template = function (strings, title, kind, created, description) {
                        return "<div class=\"result result-search\" >\n        <h4>" + title + "</h4>\n        <p class=\"result-info\">\n            <span class=\"caps\">" + kind + "</span>\n            <span>" + created + "</span>\n        </p>\n        <p class=\"result-description\">" + description + "</p>\n    </div>";
                    };
                    return _this;
                }
                Object.defineProperty(RHDPSearchResult.prototype, "title", {
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
                Object.defineProperty(RHDPSearchResult.prototype, "kind", {
                    get: function () {
                        return this._kind;
                    },
                    set: function (val) {
                        if (this._kind === val)
                            return;
                        this._kind = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchResult.prototype, "created", {
                    get: function () {
                        return this._created;
                    },
                    set: function (val) {
                        if (this._created === val)
                            return;
                        this._created = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchResult.prototype, "description", {
                    get: function () {
                        return this._description;
                    },
                    set: function (val) {
                        if (this._description === val)
                            return;
                        this._description = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchResult.prototype, "result", {
                    get: function () {
                        return this._result;
                    },
                    set: function (val) {
                        if (this._result === val)
                            return;
                        this._result = val;
                        this.computeTitle(val);
                        this.computeKind(val);
                        this.computeCreated(val);
                        this.computeDescription(val);
                        this.renderResult();
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchResult.prototype.connectedCallback = function () {
                };
                Object.defineProperty(RHDPSearchResult, "observedAttributes", {
                    get: function () {
                        return ['result'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchResult.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchResult.prototype.renderResult = function () {
                    this.innerHTML = (_a = ["", "", "", "", ""], _a.raw = ["", "", "", "", ""], this.template(_a, this.title, this.kind, this.created, this.description));
                    var _a;
                };
                RHDPSearchResult.prototype.computeTitle = function (result) {
                    var title = '';
                    if (result.highlight && result.highlight.sys_title) {
                        title = result.highlight.sys_title[0];
                    }
                    else {
                        title = result.fields.sys_title[0];
                    }
                    this.title = title;
                };
                RHDPSearchResult.prototype.computeKind = function (result) {
                    var kind = result.fields.sys_type || "webpage", map = {
                        video: 'Video',
                        blogpost: 'Blog Post',
                        book: 'Book',
                        article: 'Article',
                        solution: 'Article',
                        demo: 'Demo',
                        event: 'Event',
                        quickstart: 'Quickstart',
                        quickstart_early_access: 'Demo',
                        forumthread: 'Forum Thread',
                        stackoverflow_thread: 'Stack Overflow',
                        webpage: 'Webpage',
                        jbossdeveloper_quickstart: 'Quickstart',
                        jbossdeveloper_demo: 'Demo',
                        jbossdeveloper_bom: 'Bom',
                        jbossdeveloper_archetype: 'Archetype',
                        jbossdeveloper_example: 'Demo',
                        jbossdeveloper_vimeo: 'Video',
                        jbossdeveloper_youtube: 'Video',
                        jbossdeveloper_book: 'Book',
                        jbossdeveloper_event: 'Event',
                        rht_knowledgebase_article: 'Article',
                        rht_knowledgebase_solution: 'Article',
                        stackoverflow_question: 'Stack Overflow',
                        jbossorg_sbs_forum: 'Forum Thread',
                        jbossorg_blog: 'Blog Post',
                        rht_website: 'Website',
                        rht_apidocs: 'Docs & APIs'
                    };
                    this.kind = map[kind];
                };
                RHDPSearchResult.prototype.computeCreated = function (result) {
                    var options = { month: 'long', day: 'numeric', year: 'numeric' };
                    var created = result.fields.sys_created ? '| ' + new Intl.DateTimeFormat('en-US', options).format(new Date(result.fields.sys_created[0])) : "";
                    this.created = created;
                };
                RHDPSearchResult.prototype.computeDescription = function (result) {
                    var description = '';
                    if (result.highlight && result.highlight.sys_description) {
                        description = result.highlight.sys_description[0];
                    }
                    else if (result.highlight && result.highlight.sys_content_plaintext) {
                        description = result.highlight.sys_content_plaintext[0];
                    }
                    else if (result.fields && result.fields.sys_description) {
                        description = result.fields.sys_description[0];
                    }
                    else {
                        description = result.fields.sys_content_plaintext[0];
                    }
                    this.description = description;
                };
                return RHDPSearchResult;
            }(HTMLElement));
            exports_6("RHDPSearchResult", RHDPSearchResult);
            customElements.define('rhdp-search-result', RHDPSearchResult);
        }
    };
});
System.register("rhdp-search-results", ["rhdp-search-result"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var rhdp_search_result_1, RHDPSearchResults;
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
                    return _super.call(this) || this;
                }
                Object.defineProperty(RHDPSearchResults.prototype, "results", {
                    get: function () {
                        return this._results;
                    },
                    set: function (val) {
                        if (this._results === val)
                            return;
                        this._results = val;
                        this.renderResults();
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchResults.prototype.connectedCallback = function () {
                };
                Object.defineProperty(RHDPSearchResults, "observedAttributes", {
                    get: function () {
                        return ['results'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchResults.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchResults.prototype.addResult = function (result) {
                    var item = new rhdp_search_result_1.RHDPSearchResult();
                    item.result = result;
                    this.appendChild(item);
                };
                RHDPSearchResults.prototype.renderResults = function () {
                    while (this.hasChildNodes()) {
                        this.removeChild(this.lastChild);
                    }
                    if (this.results && this.results.hits && this.results.hits.hits) {
                        var hits = this.results.hits.hits;
                        var l = hits.length;
                        for (var i = 0; i < l; i++) {
                            this.addResult(hits[i]);
                        }
                    }
                };
                return RHDPSearchResults;
            }(HTMLElement));
            exports_7("RHDPSearchResults", RHDPSearchResults);
            customElements.define('rhdp-search-results', RHDPSearchResults);
        }
    };
});
System.register("rhdp-search-result-count", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var RHDPSearchResultCount;
    return {
        setters: [],
        execute: function () {
            RHDPSearchResultCount = (function (_super) {
                __extends(RHDPSearchResultCount, _super);
                function RHDPSearchResultCount() {
                    var _this = _super.call(this) || this;
                    _this._count = 0;
                    _this._term = '';
                    _this.template = function (strings, count, term) {
                        return count + " results found for " + term;
                    };
                    return _this;
                }
                Object.defineProperty(RHDPSearchResultCount.prototype, "count", {
                    get: function () {
                        return this._count;
                    },
                    set: function (val) {
                        if (this._count === val)
                            return;
                        this._count = val;
                        this.setAttribute('count', val.toString());
                        this.setText();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchResultCount.prototype, "term", {
                    get: function () {
                        return this._term;
                    },
                    set: function (val) {
                        if (this._term === val)
                            return;
                        this._term = val;
                        this.setAttribute('term', val);
                        this.setText();
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchResultCount.prototype.connectedCallback = function () {
                };
                Object.defineProperty(RHDPSearchResultCount, "observedAttributes", {
                    get: function () {
                        return ['count', 'term'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchResultCount.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchResultCount.prototype.setText = function () {
                    if (this._term.length > 0) {
                        this.innerHTML = (_a = ["", "", ""], _a.raw = ["", "", ""], this.template(_a, this._count, this._term));
                    }
                    var _a;
                };
                return RHDPSearchResultCount;
            }(HTMLElement));
            exports_8("RHDPSearchResultCount", RHDPSearchResultCount);
            customElements.define('rhdp-search-result-count', RHDPSearchResultCount);
        }
    };
});
System.register("rhdp-search-sort-page", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var RHDPSearchSortPage;
    return {
        setters: [],
        execute: function () {
            RHDPSearchSortPage = (function (_super) {
                __extends(RHDPSearchSortPage, _super);
                function RHDPSearchSortPage() {
                    var _this = _super.call(this) || this;
                    _this.template = "<p>\n        <span>Sort results by</span>\n        <select>\n        <option value=\"relevance\">Relevance</option>\n        <option value=\"most-recent\">Most Recent</option>\n        </select>\n        </p>";
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
                        this.querySelector('select').value = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchSortPage.prototype.connectedCallback = function () {
                    var _this = this;
                    this.innerHTML = this.template;
                    this.addEventListener('change', function (e) {
                        _this.sort = e.target['options'][e.target['selectedIndex']].value;
                        _this.setSort();
                    });
                };
                Object.defineProperty(RHDPSearchSortPage, "observedAttributes", {
                    get: function () {
                        return ['name'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchSortPage.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchSortPage.prototype.setSort = function () {
                    this.dispatchEvent(new CustomEvent('sort-change', {
                        detail: {
                            sort: this.sort
                        },
                        bubbles: true
                    }));
                };
                return RHDPSearchSortPage;
            }(HTMLElement));
            exports_9("RHDPSearchSortPage", RHDPSearchSortPage);
            customElements.define('rhdp-search-sort-page', RHDPSearchSortPage);
        }
    };
});
System.register("rhdp-search-app", ["rhdp-search-query", "rhdp-search-box", "rhdp-search-filters", "rhdp-search-results", "rhdp-search-result-count", "rhdp-search-sort-page"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var rhdp_search_query_1, rhdp_search_box_1, rhdp_search_filters_1, rhdp_search_results_1, rhdp_search_result_count_1, rhdp_search_sort_page_1, RHDPSearchApp;
    return {
        setters: [
            function (rhdp_search_query_1_1) {
                rhdp_search_query_1 = rhdp_search_query_1_1;
            },
            function (rhdp_search_box_1_1) {
                rhdp_search_box_1 = rhdp_search_box_1_1;
            },
            function (rhdp_search_filters_1_1) {
                rhdp_search_filters_1 = rhdp_search_filters_1_1;
            },
            function (rhdp_search_results_1_1) {
                rhdp_search_results_1 = rhdp_search_results_1_1;
            },
            function (rhdp_search_result_count_1_1) {
                rhdp_search_result_count_1 = rhdp_search_result_count_1_1;
            },
            function (rhdp_search_sort_page_1_1) {
                rhdp_search_sort_page_1 = rhdp_search_sort_page_1_1;
            }
        ],
        execute: function () {
            RHDPSearchApp = (function (_super) {
                __extends(RHDPSearchApp, _super);
                function RHDPSearchApp() {
                    var _this = _super.call(this) || this;
                    _this.name = 'Search';
                    _this.template = "<div class=\"row\">\n    <div class=\"large-24 medium-24 small-24 columns searchpage-middle\">\n        <div class=\"row\">\n            <div class=\"large-24 medium-24 small-24 columns\">\n                <h1>" + _this.name + "</h1>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"large-6 medium-8 small-24 columns\"></div>\n            <div class=\"large-18 medium-16 small-24 columns\"</div>\n        </div>\n    </div></div>";
                    _this.query = new rhdp_search_query_1.RHDPSearchQuery();
                    _this.box = new rhdp_search_box_1.RHDPSearchBox();
                    _this.count = new rhdp_search_result_count_1.RHDPSearchResultCount();
                    _this.filters = new rhdp_search_filters_1.RHDPSearchFilters();
                    _this.active = new rhdp_search_filters_1.RHDPSearchFilters();
                    _this.modal = new rhdp_search_filters_1.RHDPSearchFilters();
                    _this.results = new rhdp_search_results_1.RHDPSearchResults();
                    _this.sort = new rhdp_search_sort_page_1.RHDPSearchSortPage();
                    _this.filterObj = {
                        term: '',
                        facets: [
                            { name: 'CONTENT TYPE', key: 'sys_type', items: [
                                    { key: 'blogpost', name: "Blog Posts", value: ['blogpost'] },
                                    { key: 'book', name: "Book", value: ["jbossdeveloper_book", "book"] },
                                    { key: 'code', name: "Code Artifact", value: ["demo", "jbossdeveloper_archetype", "jbossdeveloper_bom"] },
                                    { key: 'quickstart', name: "Quickstart", value: ['quickstart', 'quickstart_early_access'] },
                                    { key: 'get-started', name: "Get Started", value: ["jbossdeveloper_example"] },
                                    { key: 'article-solution', name: "Knowledgebase Article / Solution", value: ["solution", "article"] },
                                    { key: 'video', name: "Video", value: ["video"] }
                                ]
                            },
                            {
                                name: 'PRODUCT',
                                key: 'type',
                                items: [
                                    { key: 'eap', name: 'JBoss Enterprise Application Platform', value: ['eap'], active: true },
                                    { key: 'webserver', name: 'JBoss Web Server', value: ['webserver'] },
                                    { key: 'datagrid', name: 'JBoss Data Grid', value: ['datagrid'] },
                                    { key: 'datavirt', name: 'JBoss Data Virtualization', value: ['datavirt'] },
                                    { key: 'fuse', name: 'JBoss Fuse', value: ['fuse'], active: true },
                                    { key: 'amq', name: 'JBoss A-MQ', value: ['amq'] },
                                    { key: 'brms', name: 'JBoss BRMS', value: ['brms'] },
                                    { key: 'bpmsuite', name: 'JBoss BPM Suite', value: ['bpmsuite'] },
                                    { key: 'devstudio', name: 'JBoss Developer Studio', value: ['devstudio'] },
                                    { key: 'cdk', name: 'Red Hat Container Development Kit', value: ['cdk'] },
                                    { key: 'developertoolset', name: 'Red Hat Developer Toolset', value: ['developertoolset'] },
                                    { key: 'rhel', name: 'Red Hat Enterprise Linux', value: ['rhel'], active: true },
                                    { key: 'softwarecollections', name: 'Red Hat Software Collections', value: ['softwarecollections'] },
                                    { key: 'mobileplatform', name: 'Red Hat Mobile Application Platform', value: ['mobileplatform'] },
                                    { key: 'openshift', name: 'Red Hat OpenShift Container Platform', value: ['openshift'] }
                                ]
                            },
                            { name: 'TOPIC', key: 'tag', items: [
                                    { key: 'containers', name: 'Containers', value: ['atomic', 'cdk', 'containers'] },
                                    { key: 'devops', name: 'DevOps', value: ['DevOps', 'CI', 'CD', 'Continuous Delivery'] },
                                    { key: 'enterprise-java', name: 'Enterprise Java', value: ['ActiveMQ', 'AMQP', 'apache camel', 'Arquillian', 'Camel', 'CDI', 'CEP', 'CXF', 'datagrid', 'devstudio', 'Drools', 'Eclipse', 'fabric8', 'Forge', 'fuse', 'Hawkular', 'Hawtio', 'Hibernate', 'Hibernate ORM', 'Infinispan', 'iPaas', 'java ee', 'JavaEE', 'JBDS', 'JBoss', 'JBoss BPM Suite', 'JBoss BRMS', 'JBoss Data Grid', 'jboss eap', 'JBoss EAP', ''] },
                                    { key: 'iot', name: 'Internet of Things', value: ['IoT', 'Internet of Things'] },
                                    { key: 'microservices', name: 'Microservices', value: ['Microservices', ' WildFly Swarm'] },
                                    { key: 'mobile', name: 'Mobile', value: ['Mobile', 'Red Hat Mobile', 'RHMAP', 'Cordova', 'FeedHenry'] },
                                    { key: 'web-and-api-development', name: 'Web and API Development', value: ['Web', 'API', 'HTML5', 'REST', 'Camel', 'Node.js', 'RESTEasy', 'JAX-RS', 'Tomcat', 'nginx', 'Rails', 'Drupal', 'PHP', 'Bottle', 'Flask', 'Laravel', 'Dancer', 'Zope', 'TurboGears', 'Sinatra', 'httpd', 'Passenger'] },
                                    { key: 'dotnet', name: '.NET', value: ['dotnet', '.net', 'visual studio', 'c#'] }
                                ]
                            }
                        ]
                    };
                    _this.addEventListener('do-search', _this.doSearch);
                    _this.addEventListener('search-complete', _this.setResults);
                    _this.addEventListener('toggle-modal', function (e) { return _this.toggleModal; });
                    _this.addEventListener('sort-change', _this.updateSort);
                    _this.addEventListener('facetChange', _this.updateFacets);
                    return _this;
                }
                RHDPSearchApp.prototype.connectedCallback = function () {
                    this.innerHTML = this.template;
                    this.active.setAttribute('type', 'active');
                    this.active.title = 'Active Filters:';
                    this.modal.setAttribute('type', 'modal');
                    this.modal.filters = this.filterObj;
                    this.active.filters = this.filterObj;
                    this.filters.filters = this.filterObj;
                    this.query.filters = this.filterObj;
                    document.querySelector('.wrapper').appendChild(this.modal);
                    this.querySelector('.row .large-24 .row .large-24').appendChild(this.query);
                    this.querySelector('.row .large-24 .row .large-24').appendChild(this.box);
                    this.querySelector('.large-6').appendChild(this.filters);
                    this.querySelector('.large-18').appendChild(this.active);
                    this.querySelector('.large-18').appendChild(this.count);
                    this.querySelector('.large-18').appendChild(this.sort);
                    this.querySelector('.large-18').appendChild(this.results);
                    /* To Do
                      Set text and term from querystring "q" value if present
                    */
                    var loc = window.location.href.split('?'), term = loc.length > 1 ? loc[1].split('=')[1] : '';
                    if (term.length > 0) {
                        this.box.term = term;
                        this.query.search(term);
                    }
                };
                RHDPSearchApp.prototype.doSearch = function (e) {
                    this.query.search(e.detail.term);
                };
                RHDPSearchApp.prototype.setResults = function (e) {
                    this.count.term = e.detail.term;
                    this.results.results = e.detail.results;
                    this.count.count = e.detail.results.hits.total;
                };
                RHDPSearchApp.prototype.toggleModal = function (e) {
                    this.modal.toggle = e.detail.toggle;
                };
                RHDPSearchApp.prototype.updateSort = function (e) {
                    this.query.sort = e.detail.sort;
                    this.query.search(this.box.term);
                };
                RHDPSearchApp.prototype.updateFacets = function (e) {
                    var facet = e.detail.facet.cloneNode(true), len = this.filterObj.facets.length;
                    facet.active = e.detail.facet.active;
                    this.modal.setActive(facet);
                    this.filters.setActive(facet);
                    if (facet.active) {
                        facet.inline = true;
                        this.active.addActive(facet);
                    }
                    else {
                        this.active.removeItem(facet);
                    }
                    for (var i = 0; i < len; i++) {
                        var itemLen = this.filterObj.facets[i].items.length;
                        for (var j = 0; j < itemLen; j++) {
                            if (this.filterObj.facets[i].items[j].key === facet.key) {
                                this.filterObj.facets[i].items[j]['active'] = facet.active;
                            }
                        }
                    }
                    this.query.filters = this.filterObj;
                    this.query.search(this.box.term);
                };
                return RHDPSearchApp;
            }(HTMLElement));
            exports_10("RHDPSearchApp", RHDPSearchApp);
            customElements.define('rhdp-search-app', RHDPSearchApp);
        }
    };
});
