System.register(["@rhd/rhdp-search/rhdp-search-url", "@rhd/rhdp-search/rhdp-search-query", "@rhd/rhdp-search/rhdp-search-box", "@rhd/rhdp-search/rhdp-search-result-count", "@rhd/rhdp-search/rhdp-search-filters", "@rhd/rhdp-search/rhdp-search-onebox", "./rhdp-search-results", "@rhd/rhdp-search/rhdp-search-sort-page"], function (exports_1, context_1) {
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
    var rhdp_search_url_1, rhdp_search_query_1, rhdp_search_box_1, rhdp_search_result_count_1, rhdp_search_filters_1, rhdp_search_onebox_1, rhdp_search_results_1, rhdp_search_sort_page_1, RHDPSearchApp;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (rhdp_search_url_1_1) {
                rhdp_search_url_1 = rhdp_search_url_1_1;
            },
            function (rhdp_search_query_1_1) {
                rhdp_search_query_1 = rhdp_search_query_1_1;
            },
            function (rhdp_search_box_1_1) {
                rhdp_search_box_1 = rhdp_search_box_1_1;
            },
            function (rhdp_search_result_count_1_1) {
                rhdp_search_result_count_1 = rhdp_search_result_count_1_1;
            },
            function (rhdp_search_filters_1_1) {
                rhdp_search_filters_1 = rhdp_search_filters_1_1;
            },
            function (rhdp_search_onebox_1_1) {
                rhdp_search_onebox_1 = rhdp_search_onebox_1_1;
            },
            function (rhdp_search_results_1_1) {
                rhdp_search_results_1 = rhdp_search_results_1_1;
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
                    _this._name = 'Search';
                    _this._oburl = '../rhdp-apps/onebox/onebox.json';
                    _this.template = "<div class=\"row\">\n    <span class=\"search-outage-msg\"></span>\n    <div class=\"large-24 medium-24 small-24 columns searchpage-middle\">\n        <div class=\"row\">\n            <div class=\"large-24 medium-24 small-24 columns\">\n                <h2>" + _this.name + "</h2>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"large-6 medium-8 small-24 columns\"></div>\n            <div class=\"large-18 medium-16 small-24 columns\"></div>\n        </div>\n    </div></div>";
                    _this.urlEle = new rhdp_search_url_1.default();
                    _this.query = new rhdp_search_query_1.default();
                    _this.box = new rhdp_search_box_1.default();
                    _this.count = new rhdp_search_result_count_1.default();
                    _this.filters = new rhdp_search_filters_1.default();
                    _this.active = new rhdp_search_filters_1.default();
                    _this.modal = new rhdp_search_filters_1.default();
                    _this.onebox = new rhdp_search_onebox_1.default();
                    _this.results = new rhdp_search_results_1.default();
                    _this.sort = new rhdp_search_sort_page_1.default();
                    _this.filterObj = {
                        term: '',
                        facets: [
                            { name: 'CONTENT TYPE', key: 'type', items: [
                                    { key: 'apidocs', name: 'APIs and Docs', value: ['rht_website', 'rht_apidocs'], type: ['apidocs'] },
                                    { key: 'archetype', name: 'Archetype', value: ['jbossdeveloper_archetype'], type: ['jbossdeveloper_archetype'] },
                                    { key: 'article', name: 'Article', value: ['rht_knowledgebase_article', 'rht_knowledgebase_solution'], type: ['rht_knowledgebase_article', 'rht_knowledgebase_solution'] },
                                    { key: 'blogpost', name: "Blog Posts", value: ['jbossorg_blog'], type: ['jbossorg_blog'] },
                                    { key: 'book', name: "Book", value: ["jbossdeveloper_book"], type: ["jbossdeveloper_book"] },
                                    { key: 'bom', name: "BOM", value: ["jbossdeveloper_bom"], type: ['jbossdeveloper_bom'] },
                                    { key: 'cheatsheet', name: "Cheat Sheet", value: ['jbossdeveloper_cheatsheet'], type: ['jbossdeveloper_cheatsheet'] },
                                    { key: 'demo', name: 'Demo', value: ['jbossdeveloper_demo'], type: ['jbossdeveloper_demo'] },
                                    { key: 'event', name: 'Event', value: ['jbossdeveloper_event'], type: ['jbossdeveloper_event'] },
                                    { key: 'forum', name: 'Forum', value: ['jbossorg_sbs_forum'], type: ['jbossorg_sbs_forum'] },
                                    { key: 'get-started', name: "Get Started", value: ["jbossdeveloper_example"], type: ['jbossdeveloper_example'] },
                                    { key: 'quickstart', name: "Quickstart", value: ['jbossdeveloper_quickstart'], type: ['jbossdeveloper_quickstart'] },
                                    { key: 'stackoverflow', name: 'Stack Overflow', value: ['stackoverflow_question'], type: ['stackoverflow_question'] },
                                    { key: 'video', name: "Video", value: ['jbossdeveloper_vimeo', 'jbossdeveloper_youtube'], type: ['jbossdeveloper_vimeo', 'jbossdeveloper_youtube'] },
                                    { key: 'webpage', name: "Web Page", value: ['rht_website'], type: ['rht_website'] }
                                ]
                            },
                            {
                                name: 'PRODUCT',
                                key: 'project',
                                items: [
                                    { key: 'dotnet', name: '.NET Runtime for Red Hat Enterprise Linux', value: ['dotnet'] },
                                    { key: 'amq', name: 'JBoss A-MQ', value: ['amq'] },
                                    { key: 'rhpam', name: 'Red Hat Process Automation Manager', value: ['rhpam', 'bpmsuite'] },
                                    { key: 'brms', name: 'Red Hat Decision Manager', value: ['brms'] },
                                    { key: 'datagrid', name: 'JBoss Data Grid', value: ['datagrid'] },
                                    { key: 'datavirt', name: 'JBoss Data Virtualization', value: ['datavirt'] },
                                    { key: 'devstudio', name: 'JBoss Developer Studio', value: ['devstudio'] },
                                    { key: 'eap', name: 'JBoss Enterprise Application Platform', value: ['eap'] },
                                    { key: 'fuse', name: 'JBoss Fuse', value: ['fuse'] },
                                    { key: 'webserver', name: 'JBoss Web Server', value: ['webserver'] },
                                    { key: 'openjdk', name: 'OpenJDK', value: ['openjdk'] },
                                    { key: 'rhamt', name: 'Red Hat Application Migration Toolkit', value: ['rhamt'] },
                                    { key: 'cdk', name: 'Red Hat Container Development Kit', value: ['cdk'] },
                                    { key: 'developertoolset', name: 'Red Hat Developer Toolset', value: ['developertoolset'] },
                                    { key: 'devsuite', name: 'Red Hat Development Suite', value: ['devsuite'] },
                                    { key: 'rhel', name: 'Red Hat Enterprise Linux', value: ['rhel'] },
                                    { key: 'mobileplatform', name: 'Red Hat Mobile Application Platform', value: ['mobileplatform'] },
                                    { key: 'openshift', name: 'Red Hat OpenShift Container Platform', value: ['openshift'] },
                                    { key: 'softwarecollections', name: 'Red Hat Software Collections', value: ['softwarecollections'] }
                                ]
                            },
                            { name: 'TOPIC', key: 'tag', items: [
                                    { key: 'dotnet', name: '.NET', value: ['dotnet', '.net', 'visual studio', 'c#'] },
                                    { key: 'containers', name: 'Containers', value: ['atomic', 'cdk', 'containers'] },
                                    { key: 'devops', name: 'DevOps', value: ['devops', 'CI', 'CD', 'Continuous Delivery'] },
                                    { key: 'enterprise-java', name: 'Enterprise Java', value: ['ActiveMQ', 'AMQP', 'apache camel', 'Arquillian', 'Camel', 'CDI', 'CEP', 'CXF', 'datagrid', 'devstudio', 'Drools', 'Eclipse', 'fabric8', 'Forge', 'fuse', 'Hawkular', 'Hawtio', 'Hibernate', 'Hibernate ORM', 'Infinispan', 'iPaas', 'java ee', 'JavaEE', 'JBDS', 'JBoss', 'JBoss BPM Suite', 'Red Hat Decision Manager', 'JBoss Data Grid', 'jboss eap', 'JBoss EAP', ''] },
                                    { key: 'iot', name: 'Internet of Things', value: ['iot', 'Internet of Things'] },
                                    { key: 'microservices', name: 'Microservices', value: ['microservices', ' WildFly Swarm'] },
                                    { key: 'mobile', name: 'Mobile', value: ['mobile', 'Red Hat Mobile', 'RHMAP', 'Cordova', 'FeedHenry'] },
                                    { key: 'web-and-api-development', name: 'Web and API Development', value: ['Web', 'API', 'HTML5', 'REST', 'Camel', 'Node.js', 'RESTEasy', 'JAX-RS', 'Tomcat', 'nginx', 'Rails', 'Drupal', 'PHP', 'Bottle', 'Flask', 'Laravel', 'Dancer', 'Zope', 'TurboGears', 'Sinatra', 'httpd', 'Passenger'] },
                                ]
                            }
                        ]
                    };
                    return _this;
                }
                Object.defineProperty(RHDPSearchApp.prototype, "name", {
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
                Object.defineProperty(RHDPSearchApp.prototype, "url", {
                    get: function () {
                        return this._url;
                    },
                    set: function (val) {
                        if (this._url === val)
                            return;
                        this._url = val;
                        this.query.url = this.url;
                        this.setAttribute('url', this.url);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchApp.prototype, "oburl", {
                    get: function () {
                        return this._oburl;
                    },
                    set: function (val) {
                        if (this._oburl === val)
                            return;
                        this._oburl = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchApp.prototype.connectedCallback = function () {
                    this.innerHTML = this.template;
                    this.active.setAttribute('type', 'active');
                    this.active.title = 'Active Filters:';
                    this.modal.setAttribute('type', 'modal');
                    this.modal.filters = this.filterObj;
                    this.active.filters = this.filterObj;
                    this.filters.filters = this.filterObj;
                    this.query.filters = this.filterObj;
                    this.onebox.url = this.oburl;
                    document.body.appendChild(this.modal);
                    this.querySelector('.row .large-24 .row .large-24').appendChild(this.query);
                    this.querySelector('.row .large-24 .row .large-24').appendChild(this.box);
                    this.querySelector('.large-6').appendChild(this.filters);
                    this.querySelector('.large-18').appendChild(this.active);
                    this.querySelector('.large-18').appendChild(this.count);
                    this.querySelector('.large-18').appendChild(this.sort);
                    this.querySelector('.large-18').appendChild(this.onebox);
                    this.querySelector('.large-18').appendChild(this.results);
                    document.body.appendChild(this.urlEle);
                };
                Object.defineProperty(RHDPSearchApp, "observedAttributes", {
                    get: function () {
                        return ['url', 'name', 'oburl'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchApp.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchApp.prototype.toggleModal = function (e) {
                    this.modal.toggle = e.detail.toggle;
                };
                RHDPSearchApp.prototype.updateSort = function (e) {
                    this.query.sort = e.detail.sort;
                    this.query.from = 0;
                    this.results.last = 0;
                    this.count.term = this.box.term;
                };
                return RHDPSearchApp;
            }(HTMLElement));
            exports_1("default", RHDPSearchApp);
            customElements.define('rhdp-search-app', RHDPSearchApp);
        }
    };
});
