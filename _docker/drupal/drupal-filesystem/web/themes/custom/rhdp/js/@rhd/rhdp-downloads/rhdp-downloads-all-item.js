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
    var rhdp_os_download_1, RHDPDownloadsAllItem, templateObject_1, templateObject_2;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (rhdp_os_download_1_1) {
                rhdp_os_download_1 = rhdp_os_download_1_1;
            }
        ],
        execute: function () {
            RHDPDownloadsAllItem = (function (_super) {
                __extends(RHDPDownloadsAllItem, _super);
                function RHDPDownloadsAllItem() {
                    var _this = _super.call(this) || this;
                    _this.template = function (strings, name, productId, dataFallbackUrl, downloadUrl, learnMore, description, version, platform) {
                        return "\n            <div class=\"row\">\n                <hr>\n                <div class=\"large-24 column\">\n                    <h5>" + name + "</h5>\n                </div>\n            \n                <div class=\"large-10 columns\">\n                    <p></p>\n            \n                    <div class=\"paragraph\">\n                        <p>" + description + "</p>\n                    </div>\n                    <a href=\"" + learnMore + "\">Learn More</a></div>\n            \n                <div class=\"large-9 center columns\">\n                \n                  " + (version ? "<p data-download-id-version=\"" + productId + "\">Version: " + version + " " + (_this.platform ? "for " + platform : '') + "</p>" : "<p data-download-id-version=\"" + productId + "\">&nbsp;</p>") + "  \n                </div>\n            \n                <div class=\"large-5 columns\"><a class=\"button medium-cta blue\" data-download-id=\"" + productId + "\"\n                                                data-fallback-url=\"" + dataFallbackUrl + "\"\n                                                href=\"" + downloadUrl + "\">Download</a></div>\n            </div>\n";
                    };
                    return _this;
                }
                Object.defineProperty(RHDPDownloadsAllItem.prototype, "name", {
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
                Object.defineProperty(RHDPDownloadsAllItem.prototype, "productId", {
                    get: function () {
                        return this._productId;
                    },
                    set: function (value) {
                        if (this.productId === value)
                            return;
                        this._productId = value;
                        this.setAttribute('productid', this._productId);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsAllItem.prototype, "dataFallbackUrl", {
                    get: function () {
                        return this._dataFallbackUrl;
                    },
                    set: function (value) {
                        if (this.dataFallbackUrl === value)
                            return;
                        this._dataFallbackUrl = value;
                        this.setAttribute('datafallbackurl', this._dataFallbackUrl);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsAllItem.prototype, "downloadUrl", {
                    get: function () {
                        return this._downloadUrl;
                    },
                    set: function (value) {
                        if (this.downloadUrl === value)
                            return;
                        this._downloadUrl = value;
                        this.setAttribute('downloadurl', this._downloadUrl);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsAllItem.prototype, "description", {
                    get: function () {
                        return this._description;
                    },
                    set: function (value) {
                        this._description = value;
                        this.setAttribute('description', this._description);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsAllItem.prototype, "learnMore", {
                    get: function () {
                        return this._learnMore;
                    },
                    set: function (value) {
                        this._learnMore = value;
                        this.setAttribute('learnmore', this._learnMore);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsAllItem.prototype, "version", {
                    get: function () {
                        return this._version;
                    },
                    set: function (value) {
                        this._version = value;
                        this.setAttribute('version', this._version);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsAllItem.prototype, "platform", {
                    get: function () {
                        return this._platform;
                    },
                    set: function (value) {
                        this._platform = value;
                        this.setAttribute('platform', this._platform);
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPDownloadsAllItem.prototype.connectedCallback = function () {
                    if (this.productId === 'cdk') {
                        this.osVersionExtract(this.productId);
                        this.innerHTML = this.template(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""])), this.name, this.productId, this.dataFallbackUrl, this.downloadUrl, this.learnMore, this.description, this.version, this.platform);
                    }
                    else {
                        this.innerHTML = this.template(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""])), this.name, this.productId, this.dataFallbackUrl, this.downloadUrl, this.learnMore, this.description, this.version, null);
                    }
                };
                RHDPDownloadsAllItem.prototype.osVersionExtract = function (productId) {
                    var osPlatform = new rhdp_os_download_1.default();
                    osPlatform.platformType = osPlatform.getUserAgent();
                    osPlatform.downloadURL = this.downloadUrl;
                    osPlatform.setOSURL(productId);
                    osPlatform.setDownloadURLByPlatform();
                    this.downloadUrl = osPlatform.downloadURL;
                    this.platform = osPlatform.platformType;
                };
                Object.defineProperty(RHDPDownloadsAllItem, "observedAttributes", {
                    get: function () {
                        return ['name'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPDownloadsAllItem.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                return RHDPDownloadsAllItem;
            }(HTMLElement));
            exports_1("default", RHDPDownloadsAllItem);
            window.customElements.define('rhdp-downloads-all-item', RHDPDownloadsAllItem);
        }
    };
});
