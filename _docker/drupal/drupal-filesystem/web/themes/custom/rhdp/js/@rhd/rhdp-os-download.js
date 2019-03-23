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
    var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };
    var RHDPOSDownload, templateObject_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RHDPOSDownload = (function (_super) {
                __extends(RHDPOSDownload, _super);
                function RHDPOSDownload() {
                    var _this = _super.call(this) || this;
                    _this._rhelURL = "";
                    _this._macURL = "";
                    _this._winURL = "";
                    _this.stage_download_url = 'https://developers.stage.redhat.com';
                    _this.productDownloads = {
                        "cdk": { "windowsUrl": "/download-manager/file/cdk-3.5.0-1-minishift-windows-amd64.exe", "macUrl": "/download-manager/file/cdk-3.5.0-1-minishift-darwin-amd64", "rhelUrl": "/download-manager/file/cdk-3.5.0-1-minishift-linux-amd64" }
                    };
                    _this.template = function (strings, product, downloadUrl, platform, version) {
                        return "<div class=\"large-8 columns download-link\">\n                    <a class=\"button heavy-cta\" href=\"" + downloadUrl + "\">\n                        <i class=\"fa fa-download\"></i> Download</a>\n                    <div class=\"version-name\">" + product + " " + version + " " + (_this.displayOS ? "for " + platform : '') + "</div>\n                </div>\n                ";
                    };
                    _this.downloadsTemplate = function (strings, product, downloadUrl, platform, version) {
                        return "<div class=\"large-8 columns download-link\">\n                    <a class=\"button heavy-cta\" href=\"" + downloadUrl + "\">\n                        <i class=\"fa fa-download\"></i> Download</a>\n                    <div class=\"version-name\">" + product + " " + version + " " + (_this.displayOS ? "for " + platform : '') + "</div>\n                </div>\n                ";
                    };
                    return _this;
                }
                Object.defineProperty(RHDPOSDownload.prototype, "url", {
                    get: function () {
                        return this._url;
                    },
                    set: function (value) {
                        if (this._url === value)
                            return;
                        this._url = value;
                        this.setAttribute('url', this._url);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "productCode", {
                    get: function () {
                        return this._productCode;
                    },
                    set: function (value) {
                        if (this._productCode === value)
                            return;
                        this._productCode = value;
                        this.setAttribute('product-code', this._productCode);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "platformType", {
                    get: function () {
                        return this._platformType;
                    },
                    set: function (value) {
                        if (this._platformType === value)
                            return;
                        this._platformType = value;
                        this.setAttribute('platform-type', this._platformType);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "downloadURL", {
                    get: function () {
                        return this._downloadURL;
                    },
                    set: function (value) {
                        if (this._downloadURL === value)
                            return;
                        this._downloadURL = value;
                        this.setAttribute('download-url', this._downloadURL);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "rhelURL", {
                    get: function () {
                        return this._rhelURL;
                    },
                    set: function (value) {
                        if (this._rhelURL === value)
                            return;
                        this._rhelURL = value;
                        this.setAttribute('rhel-download', this._rhelURL);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "macURL", {
                    get: function () {
                        return this._macURL;
                    },
                    set: function (value) {
                        if (this._macURL === value)
                            return;
                        this._macURL = value;
                        this.setAttribute('mac-download', this._macURL);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "winURL", {
                    get: function () {
                        return this._winURL;
                    },
                    set: function (value) {
                        if (this._winURL === value)
                            return;
                        this._winURL = value;
                        this.setAttribute('windows-download', this._winURL);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "productName", {
                    get: function () {
                        return this._productName;
                    },
                    set: function (value) {
                        if (this._productName === value)
                            return;
                        this._productName = value;
                        this.setAttribute('name', this._productName);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "version", {
                    get: function () {
                        return this._version;
                    },
                    set: function (value) {
                        if (this._version === value)
                            return;
                        this._version = value;
                        this.setAttribute('version', this._version);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "displayOS", {
                    get: function () {
                        return this._displayOS;
                    },
                    set: function (value) {
                        if (this._displayOS === value)
                            return;
                        this._displayOS = value;
                        this.setAttribute('display-os', this._displayOS);
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPOSDownload.prototype.connectedCallback = function () {
                    this.platformType = this.getUserAgent();
                    this.setDownloadURLByPlatform();
                    this.innerHTML = this.template(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", "", "", "", ""], ["", "", "", "", ""])), this.productName, this.downloadURL, this.platformType, this.version);
                };
                Object.defineProperty(RHDPOSDownload, "observedAttributes", {
                    get: function () {
                        return ['product-code', 'platform-type', 'download-url', 'name'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPOSDownload.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPOSDownload.prototype.getUserAgent = function () {
                    var OSName = "Windows";
                    if (navigator.appVersion.indexOf("Mac") != -1)
                        OSName = "MacOS";
                    if (navigator.appVersion.indexOf("Linux") != -1)
                        OSName = "RHEL";
                    return OSName;
                };
                RHDPOSDownload.prototype.getDownloadOrigin = function (productUrl) {
                    if (window.location.origin.indexOf('developers.stage.redhat.com') > 0) {
                        productUrl = productUrl.replace(/http(s)?:\/\/developers.redhat.com/g, this.stage_download_url);
                    }
                    return productUrl;
                };
                RHDPOSDownload.prototype.setOSURL = function (productId) {
                    switch (productId) {
                        case 'cdk':
                            this.winURL = this.getDownloadOrigin(this.productDownloads.cdk.windowsUrl);
                            this.macURL = this.getDownloadOrigin(this.productDownloads.cdk.macUrl);
                            this.rhelURL = this.getDownloadOrigin(this.productDownloads.cdk.rhelUrl);
                            break;
                        default:
                            this.winURL = this.getDownloadOrigin(this.downloadURL);
                            this.macURL = this.getDownloadOrigin(this.downloadURL);
                            this.rhelURL = this.getDownloadOrigin(this.downloadURL);
                    }
                };
                RHDPOSDownload.prototype.setDownloadURLByPlatform = function () {
                    if (this.winURL.length <= 0 || this.macURL.length <= 0 || this.rhelURL.length <= 0) {
                        return;
                    }
                    this.displayOS = true;
                    switch (this.platformType) {
                        case "Windows":
                            this.downloadURL = this.getDownloadOrigin(this.winURL);
                            break;
                        case "MacOS":
                            this.downloadURL = this.getDownloadOrigin(this.macURL);
                            break;
                        case "RHEL":
                            this.downloadURL = this.getDownloadOrigin(this.rhelURL);
                            break;
                        default:
                            this.downloadURL = this.getDownloadOrigin(this.winURL);
                    }
                };
                return RHDPOSDownload;
            }(HTMLElement));
            exports_1("default", RHDPOSDownload);
            window.addEventListener('WebComponentsReady', function () {
                customElements.define('rhdp-os-download', RHDPOSDownload);
            });
        }
    };
});
