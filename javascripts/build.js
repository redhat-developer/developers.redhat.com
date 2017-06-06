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
                    _this.urlTemplate = function (strings, url, term, limit, sort) {
                        var order = '';
                        if (sort === 'most recent') {
                            order = '&newFirst=true';
                        }
                        return url + "?filter_out_excluded=true&from=0" + order + "&project=&query=" + term + "&query_highlight=true&size" + limit + "=true&type=rht_website&type=jbossdeveloper_quickstart&type=jbossdeveloper_demo&type=jbossdeveloper_bom&type=jbossdeveloper_archetype&type=jbossdeveloper_example&type=jbossdeveloper_vimeo&type=jbossdeveloper_youtube&type=jbossdeveloper_book&type=jbossdeveloper_event&type=rht_knowledgebase_article&type=rht_knowledgebase_solution&type=stackoverflow_question&type=jbossorg_sbs_forum&type=jbossorg_blog&type=rht_apidocs";
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
                    fetch((_a = ["", "", "", "", ""], _a.raw = ["", "", "", "", ""], this.urlTemplate(_a, this.url, this.term, this.limit, this.sort)))
                        .then(function (resp) { return resp.json(); })
                        .then(function (data) { _this.results = data; });
                    var _a;
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
System.register("rhdp-search-filters", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var RHDPSearchFilters;
    return {
        setters: [],
        execute: function () {
            RHDPSearchFilters = (function (_super) {
                __extends(RHDPSearchFilters, _super);
                function RHDPSearchFilters() {
                    var _this = _super.call(this) || this;
                    _this._type = '';
                    _this.name = 'Search Filters';
                    _this.template = function (strings, name, type) {
                        return "<div><strong>RHDP " + type + " " + name + "</strong></div>";
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
                RHDPSearchFilters.prototype.connectedCallback = function () {
                    this.innerHTML = (_a = ["", "", ""], _a.raw = ["", "", ""], this.template(_a, this.name, this.type));
                    var _a;
                };
                Object.defineProperty(RHDPSearchFilters, "observedAttributes", {
                    get: function () {
                        return ['name'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchFilters.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this.innerHTML = (_a = ["", "", ""], _a.raw = ["", "", ""], this.template(_a, this.name, this.type));
                    var _a;
                };
                return RHDPSearchFilters;
            }(HTMLElement));
            exports_3("RHDPSearchFilters", RHDPSearchFilters);
            customElements.define('rhdp-search-filters', RHDPSearchFilters);
        }
    };
});
System.register("rhdp-search-filter-group", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var RHDPSearchFilterGroup;
    return {
        setters: [],
        execute: function () {
            RHDPSearchFilterGroup = (function (_super) {
                __extends(RHDPSearchFilterGroup, _super);
                function RHDPSearchFilterGroup() {
                    var _this = _super.call(this) || this;
                    _this.name = 'Search Filter Group';
                    _this.template = function (strings, name) {
                        return "<div><strong>RHDP " + name + "</strong></div>";
                    };
                    return _this;
                }
                RHDPSearchFilterGroup.prototype.connectedCallback = function () {
                    this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this.name));
                    var _a;
                };
                Object.defineProperty(RHDPSearchFilterGroup, "observedAttributes", {
                    get: function () {
                        return ['name'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchFilterGroup.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this.name));
                    var _a;
                };
                return RHDPSearchFilterGroup;
            }(HTMLElement));
            exports_4("RHDPSearchFilterGroup", RHDPSearchFilterGroup);
            customElements.define('rhdp-search-filter-group', RHDPSearchFilterGroup);
        }
    };
});
System.register("rhdp-search-filter-item", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var RHDPSearchFilterItem;
    return {
        setters: [],
        execute: function () {
            RHDPSearchFilterItem = (function (_super) {
                __extends(RHDPSearchFilterItem, _super);
                function RHDPSearchFilterItem() {
                    var _this = _super.call(this) || this;
                    _this.name = 'Search Filter Item';
                    _this.template = function (strings, name) {
                        return "<div><strong>RHDP " + name + "</strong></div>";
                    };
                    return _this;
                }
                RHDPSearchFilterItem.prototype.connectedCallback = function () {
                    this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this.name));
                    var _a;
                };
                Object.defineProperty(RHDPSearchFilterItem, "observedAttributes", {
                    get: function () {
                        return ['name'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchFilterItem.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this.name));
                    var _a;
                };
                return RHDPSearchFilterItem;
            }(HTMLElement));
            exports_5("RHDPSearchFilterItem", RHDPSearchFilterItem);
            customElements.define('rhdp-search-filter-item', RHDPSearchFilterItem);
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
                    else {
                        description = result.fields.sys_description[0];
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
                    _this.name = 'Search Sort';
                    _this.template = function (strings, name) {
                        return "<div><strong>RHDP " + name + "</strong></div>";
                    };
                    return _this;
                }
                RHDPSearchSortPage.prototype.connectedCallback = function () {
                    this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this.name));
                    var _a;
                };
                Object.defineProperty(RHDPSearchSortPage, "observedAttributes", {
                    get: function () {
                        return ['name'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchSortPage.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this.name));
                    var _a;
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
                    _this.template = "<h1>" + _this.name + "</h1>";
                    _this.query = new rhdp_search_query_1.RHDPSearchQuery();
                    _this.box = new rhdp_search_box_1.RHDPSearchBox();
                    _this.count = new rhdp_search_result_count_1.RHDPSearchResultCount();
                    _this.filters = new rhdp_search_filters_1.RHDPSearchFilters();
                    _this.active = new rhdp_search_filters_1.RHDPSearchFilters();
                    _this.results = new rhdp_search_results_1.RHDPSearchResults();
                    _this.sort = new rhdp_search_sort_page_1.RHDPSearchSortPage();
                    _this.addEventListener('do-search', _this.doSearch);
                    _this.addEventListener('search-complete', _this.setResults);
                    return _this;
                }
                RHDPSearchApp.prototype.connectedCallback = function () {
                    this.innerHTML = this.template;
                    this.active.type = 'active';
                    this.appendChild(this.query);
                    this.appendChild(this.box);
                    this.appendChild(this.filters);
                    this.appendChild(this.active);
                    this.appendChild(this.count);
                    this.appendChild(this.sort);
                    this.appendChild(this.results);
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
                return RHDPSearchApp;
            }(HTMLElement));
            exports_10("RHDPSearchApp", RHDPSearchApp);
            customElements.define('rhdp-search-app', RHDPSearchApp);
        }
    };
});
