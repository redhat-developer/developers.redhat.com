System.register(["@rhd/rhdp-downloads/rhdp-downloads-popular-products", "@rhd/rhdp-downloads/rhdp-downloads-products", "@rhd/rhdp-downloads/rhdp-downloads-all"], function (exports_1, context_1) {
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
    var rhdp_downloads_popular_products_1, rhdp_downloads_products_1, rhdp_downloads_all_1, RHDPDownloadsApp;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (rhdp_downloads_popular_products_1_1) {
                rhdp_downloads_popular_products_1 = rhdp_downloads_popular_products_1_1;
            },
            function (rhdp_downloads_products_1_1) {
                rhdp_downloads_products_1 = rhdp_downloads_products_1_1;
            },
            function (rhdp_downloads_all_1_1) {
                rhdp_downloads_all_1 = rhdp_downloads_all_1_1;
            }
        ],
        execute: function () {
            RHDPDownloadsApp = (function (_super) {
                __extends(RHDPDownloadsApp, _super);
                function RHDPDownloadsApp() {
                    var _this = _super.call(this) || this;
                    _this.stage_download_url = 'https://developers.stage.redhat.com';
                    _this.popularProduct = new rhdp_downloads_popular_products_1.default();
                    _this.products = new rhdp_downloads_products_1.default();
                    _this.template = "<div class=\"hero hero-wide hero-downloads\">\n                    <div class=\"row\">\n                        <div class=\"large-12 medium-24 columns\" id=\"downloads\">\n                            <h2>Downloads</h2>\n                        </div>\n                    </div>\n                </div>\n                <span class=\"dl-outage-msg\"></span>\n                <div class=\"most-popular-downloads\">\n                    <div class=\"row\">\n                        <div class=\"large-24 column\">\n                            <h3>Most Popular</h3>\n                        </div>\n                    </div>\n                \n                    <div class=\"row\">\n                    </div>\n                </div>\n                <div class=\"row\" id=\"downloads\">\n                    <div class=\"large-24 columns\">\n                        <h3 class=\"downloads-header\">All Downloads</h3>\n                    </div>\n                </div>";
                    return _this;
                }
                Object.defineProperty(RHDPDownloadsApp.prototype, "url", {
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
                RHDPDownloadsApp.prototype.connectedCallback = function () {
                    this.innerHTML = this.template;
                    this.setProductsDownloadData(this.url);
                };
                RHDPDownloadsApp.prototype.addGroups = function (productList) {
                    this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('accelerated_development_and_management', 'ACCELERATED DEVELOPMENT AND MANAGEMENT', productList));
                    this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('developer_tools', 'DEVELOPER TOOLS', productList));
                    this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('infrastructure', 'INFRASTRUCTURE', productList));
                    this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('integration_and_automation', 'INTEGRATION AND AUTOMATION', productList));
                    this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('mobile', 'MOBILE', productList));
                    this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('cloud', 'CLOUD', productList));
                    this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('runtimes', 'LANGUAGES AND COMPILERS', productList));
                };
                RHDPDownloadsApp.prototype.setPopularProducts = function (productList) {
                    this.popularProduct.productList = productList.products;
                    this.querySelector('.most-popular-downloads .row').appendChild(this.popularProduct);
                };
                RHDPDownloadsApp.prototype.downloadsAllFactory = function (id, heading, productList) {
                    var downloads = new rhdp_downloads_all_1.default();
                    downloads.id = id;
                    downloads.heading = heading;
                    downloads.products = productList;
                    return downloads;
                };
                RHDPDownloadsApp.prototype.setProductsDownloadData = function (url) {
                    var _this = this;
                    if (window.location.origin.indexOf('developers.stage.redhat.com') > 0) {
                        url = url.replace(/http(s)?:\/\/developers.redhat.com/g, this.stage_download_url);
                    }
                    var fInit = {
                        method: 'GET',
                        headers: new Headers(),
                        mode: 'cors',
                        cache: 'default'
                    };
                    fetch(url, fInit)
                        .then(function (resp) { return resp.json(); })
                        .then(function (data) {
                        _this.products.data = data;
                        _this.setPopularProducts(_this.products);
                        _this.addGroups(_this.products);
                    });
                };
                Object.defineProperty(RHDPDownloadsApp, "observedAttributes", {
                    get: function () {
                        return ['url'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPDownloadsApp.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                return RHDPDownloadsApp;
            }(HTMLElement));
            exports_1("default", RHDPDownloadsApp);
            window.customElements.define('rhdp-downloads-app', RHDPDownloadsApp);
        }
    };
});
