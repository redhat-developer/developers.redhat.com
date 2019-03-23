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
    var RHDPProjectQuery;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RHDPProjectQuery = (function (_super) {
                __extends(RHDPProjectQuery, _super);
                function RHDPProjectQuery() {
                    var _this = _super.call(this) || this;
                    _this._dcpUrl = 'https://dcp2.jboss.org/v2/rest/search/suggest_project_name_ngram_more_fields?sort=sys_title&query=';
                    _this._term = '';
                    _this._mockData = false;
                    _this.productData = {
                        "amq": { "upstream": ["activemq", "fabric8"] },
                        "rhpam": { "upstream": ["drools", "guvnor", "optaplanner", "jbpm"] },
                        "brms": { "upstream": ["optaplanner", "drools", "guvnor"] },
                        "datagrid": { "upstream": ["infinispan", "jgroups", "hibernate_subprojects_search"] },
                        "datavirt": { "upstream": ["teiid", "teiiddesigner", "modeshape"] },
                        "devstudio": { "upstream": ["jbosstools"] },
                        "eap": { "upstream": ["wildfly", "jgroups", "hibernate", "hornetq", "jbossclustering", "jbossmc", "narayana", "jbossweb", "jbossws", "ironjacamar", "jgroups", "mod_cluster", "jbossas_osgi", "jbosssso", "picketlink", "resteasy", "weld", "wise", "xnio"] },
                        "fuse": { "upstream": ["camel", "karaf", "wildfly-camel", "cxf", "syndesis", "apicurio", "hawtio"] },
                        "rhel": { "upstream": ["fedora"] },
                        "webserver": { "upstream": ["tomcat", "httpd", "mod_cluster"] },
                    };
                    _this._filterChange = _this._filterChange.bind(_this);
                    return _this;
                }
                Object.defineProperty(RHDPProjectQuery.prototype, "mockData", {
                    get: function () {
                        return this._mockData;
                    },
                    set: function (value) {
                        this._mockData = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectQuery.prototype, "term", {
                    get: function () {
                        return this._term;
                    },
                    set: function (value) {
                        this._term = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectQuery.prototype, "filter", {
                    get: function () {
                        return this._filter;
                    },
                    set: function (value) {
                        this._filter = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectQuery.prototype, "dcpUrl", {
                    get: function () {
                        return this._dcpUrl;
                    },
                    set: function (value) {
                        this._dcpUrl = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectQuery.prototype, "data", {
                    get: function () {
                        return this._data;
                    },
                    set: function (value) {
                        this._data = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPProjectQuery.prototype.connectedCallback = function () {
                    top.addEventListener('project-filter-change', this._filterChange);
                    this.doSearch();
                };
                RHDPProjectQuery.prototype.doSearch = function () {
                    var _this = this;
                    var qUrl = new URL(this.dcpUrl);
                    qUrl.searchParams.set('sort', 'sys_title');
                    qUrl.searchParams.set('query', this.term);
                    if (this.filter) {
                        var upstreamProjects = this.productData[this.filter]['upstream'];
                        for (var i = 0; i < upstreamProjects.length; i++) {
                            qUrl.searchParams.append('project', upstreamProjects[i]);
                        }
                    }
                    if (!this.mockData) {
                        fetch(qUrl.toString())
                            .then(function (resp) { return resp.json(); })
                            .then(function (data) {
                            _this.data = data;
                            _this.dispatchEvent(new CustomEvent('data-results-complete', {
                                detail: {
                                    data: _this.data,
                                    term: _this.term,
                                    filter: _this.filter
                                },
                                bubbles: true
                            }));
                        });
                    }
                };
                RHDPProjectQuery.prototype._filterChange = function (e) {
                    if (e.detail) {
                        this.filter = e.detail.filter ? e.detail.filter : '';
                        this.term = e.detail.term ? e.detail.term : '';
                    }
                    this.doSearch();
                };
                Object.defineProperty(RHDPProjectQuery, "observedAttributes", {
                    get: function () {
                        return ['loading'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPProjectQuery.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                return RHDPProjectQuery;
            }(HTMLElement));
            exports_1("default", RHDPProjectQuery);
            window.customElements.define('rhdp-project-query', RHDPProjectQuery);
        }
    };
});
