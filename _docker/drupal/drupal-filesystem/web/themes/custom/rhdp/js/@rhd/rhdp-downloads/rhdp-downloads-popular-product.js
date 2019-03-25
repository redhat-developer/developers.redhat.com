System.register(["@rhd/rhdp-os-download"], function (exports_1, context_1) {
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
    var rhdp_os_download_1, RHDPDownloadsPopularProduct, templateObject_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (rhdp_os_download_1_1) {
                rhdp_os_download_1 = rhdp_os_download_1_1;
            }
        ],
        execute: function () {
            RHDPDownloadsPopularProduct = (function (_super) {
                __extends(RHDPDownloadsPopularProduct, _super);
                function RHDPDownloadsPopularProduct() {
                    var _this = _super.call(this) || this;
                    _this.template = function (strings, name, id, dataFallbackUrl, url) {
                        return "\n        <div class=\"large-6 column\">\n            <div class=\"popular-download-box\">\n                <h4>" + name + "</h4>\n                <a class=\"button heavy-cta\" data-download-id=\"" + id + "\" data-fallback-url=\"" + dataFallbackUrl + "\" href=\"" + url + "\"><i class=\"fa fa-download\"></i> Download</a>\n            </div>\n        </div>";
                    };
                    return _this;
                }
                Object.defineProperty(RHDPDownloadsPopularProduct.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        if (this._name === value)
                            return;
                        this._name = value;
                        this.setAttribute('name', this.name);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsPopularProduct.prototype, "productId", {
                    get: function () {
                        return this._productId;
                    },
                    set: function (value) {
                        if (this.productId === value)
                            return;
                        this._productId = value;
                        this.setAttribute('productid', this.productId);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsPopularProduct.prototype, "dataFallbackUrl", {
                    get: function () {
                        return this._dataFallbackUrl;
                    },
                    set: function (value) {
                        if (this.dataFallbackUrl === value)
                            return;
                        this._dataFallbackUrl = value;
                        this.setAttribute('datafallbackurl', this.dataFallbackUrl);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsPopularProduct.prototype, "downloadUrl", {
                    get: function () {
                        return this._downloadUrl;
                    },
                    set: function (value) {
                        if (this.downloadUrl === value)
                            return;
                        this._downloadUrl = value;
                        this.setAttribute('downloadurl', this.downloadUrl);
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPDownloadsPopularProduct.prototype.osVersionExtract = function (productId) {
                    var osPlatform = new rhdp_os_download_1.default();
                    osPlatform.platformType = osPlatform.getUserAgent();
                    osPlatform.downloadURL = this.downloadUrl;
                    osPlatform.setOSURL(productId);
                    osPlatform.setDownloadURLByPlatform();
                    this.downloadUrl = osPlatform.downloadURL;
                };
                RHDPDownloadsPopularProduct.prototype.connectedCallback = function () {
                    this.osVersionExtract(this.productId);
                    this.innerHTML = this.template(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", "", "", "", ""], ["", "", "", "", ""])), this.name, this.productId, this.dataFallbackUrl, this.downloadUrl);
                };
                Object.defineProperty(RHDPDownloadsPopularProduct, "observedAttributes", {
                    get: function () {
                        return ['name', 'productid', 'downloadurl', 'datafallbackurl'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPDownloadsPopularProduct.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                return RHDPDownloadsPopularProduct;
            }(HTMLElement));
            exports_1("default", RHDPDownloadsPopularProduct);
            window.customElements.define('rhdp-downloads-popular-product', RHDPDownloadsPopularProduct);
        }
    };
});
