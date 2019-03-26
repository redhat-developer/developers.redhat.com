System.register(["../../@patternfly/pfelement/pfelement.js", "./dp-search-url.js", "./dp-search-modal-filters.js"], function (exports_1, context_1) {
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
    var pfelement_js_1, dp_search_url_js_1, dp_search_modal_filters_js_1, DPSearchApp;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pfelement_js_1_1) {
                pfelement_js_1 = pfelement_js_1_1;
            },
            function (dp_search_url_js_1_1) {
                dp_search_url_js_1 = dp_search_url_js_1_1;
            },
            function (dp_search_modal_filters_js_1_1) {
                dp_search_modal_filters_js_1 = dp_search_modal_filters_js_1_1;
            }
        ],
        execute: function () {
            DPSearchApp = (function (_super) {
                __extends(DPSearchApp, _super);
                function DPSearchApp() {
                    var _this = _super.call(this, DPSearchApp, { delayRender: true }) || this;
                    _this._name = 'Search';
                    _this.urlEle = new dp_search_url_js_1.default();
                    _this.modal = new dp_search_modal_filters_js_1.default();
                    return _this;
                }
                Object.defineProperty(DPSearchApp.prototype, "html", {
                    get: function () {
                        return "\n        <style>\n\n    :host { \n        display: flex;\n        flex-flow: column;\n        font-family: \"Overpass\", \"Open Sans\", Arial, Helvetica, sans-serif;\n        margin-bottom: 30px;\n    }\n\n    .query { flex: 0 0 auto; }\n    .content { flex: 1 1 auto; display: flex; flex-flow: row; position: relative;}\n    .filters { flex: 0 0 28%; margin-right: 32px; }\n    .results { flex: 1 1 auto; display: flex; flex-flow: column; }\n\n    .hide { display: none; }\n    \n    .show { display: block; }\n    \n    .mobile { display: none; }\n\n    h2 { \n        flex: 0 0 auto; \n        margin-top: 30px;\n        font-size: 38px;\n        line-height: 1.24;\n        color: #242424;\n        font-weight: 500;\n        margin-bottom: 16px;\n    }\n\n    .loading {\n        background:url(\"https://developers.redhat.com/images/icons/ajax-loader.gif\") center 80px no-repeat;\n        min-height:250px;\n    }\n\n    @media only screen and (max-width: 768px) {\n        .content {\n            flex-flow: column;\n        }\n        .filters { flex: 0 0 auto; margin-right: 0; }\n    }\n        </style>\n    <h2>" + this.name + "</h2>\n    <section class=\"query\"><slot name=\"query\"></slot></section>\n    <section class=\"content\">\n        <section class=\"filters\"><slot name=\"filters\"></slot></section>\n        <section class=\"results\">\n            <slot></slot>\n        </section>\n    </section>\n    ";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchApp, "tag", {
                    get: function () {
                        return 'dp-search-app';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchApp.prototype, "name", {
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
                Object.defineProperty(DPSearchApp.prototype, "url", {
                    get: function () {
                        return this._url;
                    },
                    set: function (val) {
                        if (this._url === val)
                            return;
                        this._url = val;
                        this.setAttribute('url', this.url);
                    },
                    enumerable: true,
                    configurable: true
                });
                DPSearchApp.prototype.connectedCallback = function () {
                    var _this = this;
                    _super.prototype.connectedCallback.call(this);
                    _super.prototype.render.call(this);
                    top.document.body.appendChild(this.modal);
                    setTimeout(function () { top.document.body.appendChild(_this.urlEle); }, 1000);
                };
                Object.defineProperty(DPSearchApp, "observedAttributes", {
                    get: function () {
                        return ['url', 'name'];
                    },
                    enumerable: true,
                    configurable: true
                });
                DPSearchApp.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                DPSearchApp.prototype.toggleModal = function (e) {
                    this.modal.toggle = e.detail.toggle;
                };
                return DPSearchApp;
            }(pfelement_js_1.default));
            exports_1("default", DPSearchApp);
            pfelement_js_1.default.create(DPSearchApp);
        }
    };
});
