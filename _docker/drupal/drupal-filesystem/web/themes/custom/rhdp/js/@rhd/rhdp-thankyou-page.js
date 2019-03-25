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
    var RHDPThankyou, templateObject_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RHDPThankyou = (function (_super) {
                __extends(RHDPThankyou, _super);
                function RHDPThankyou() {
                    var _this = _super.call(this) || this;
                    _this.template = function (strings, name, directLink, recentDownload) {
                        return "<div class=\"row\">\n                    <div class=\"large-24 medium-24 small-24 columns\">\n                        <div class=\"alert-box alert-info\">\n                            <div class=\"icon\"></div>\n                            <div class=\"alert-content\">\n                                <strong>Your download should start automatically.</strong>\n                                <p>If you have any problems with the download, please use the <a id=\"download-link\" href=\"" + directLink + "\">direct link.</a></p>\n                            </div>\n                        </div>\n                \n                        <div class=\"large-24 medium-16 small-24 columns thankyou\">\n                                <h2>Thank you for downloading the:</h2>\n                                <h2>" + name + "</h2>\n                            " + (recentDownload ? '' : "<iframe src=\"" + directLink + "\"></iframe>") + "\n                        </div>\n                        <div class=\"large-24 medium-16 small-24 columns\">\n                            <div class=\"thankyou-button\">\n                                <a href=\"/\" class=\"button heavy-cta\">Continue\n                                    to Homepage</a>\n                            </div>\n                        </div>\n                \n                    </div>\n                </div>";
                    };
                    return _this;
                }
                Object.defineProperty(RHDPThankyou.prototype, "url", {
                    get: function () {
                        return this._url;
                    },
                    set: function (value) {
                        if (this._url === value)
                            return;
                        this._url = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPThankyou.prototype, "mediaName", {
                    get: function () {
                        return this._mediaName;
                    },
                    set: function (value) {
                        if (this._mediaName === value)
                            return;
                        this._mediaName = value;
                        this.setAttribute('media-name', this._mediaName);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPThankyou.prototype, "directLink", {
                    get: function () {
                        return this._directLink;
                    },
                    set: function (value) {
                        if (this._directLink === value)
                            return;
                        this._directLink = value;
                        this.setAttribute('direct-download', this._directLink);
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPThankyou.prototype.connectedCallback = function () {
                    this._recentDownload = this.checkRecentDownload();
                    this.mediaName = this.mediaName ? this.mediaName : this.stripLabelFromMedia(this.getParameterByName('p'));
                    this.directLink = this.directLink ? this.directLink : this.getParameterByName('tcDownloadURL');
                    this.innerHTML = this.template(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), this.mediaName, this.directLink, this._recentDownload);
                };
                Object.defineProperty(RHDPThankyou, "observedAttributes", {
                    get: function () {
                        return ['media-name', 'direct-link'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPThankyou.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPThankyou.prototype.stripLabelFromMedia = function (name) {
                    if (name) {
                        name = name.replace(/Media:[\s]/g, "");
                    }
                    return name;
                };
                RHDPThankyou.prototype.getParameterByName = function (urlName) {
                    this.url = this.url ? this.url : window.location.href;
                    urlName = urlName.replace(/[\[\]]/g, "\\$&");
                    var regex = new RegExp("[?&]" + urlName + "(=([^&#]*)|&|#|$)"), results = regex.exec(this.url);
                    if (!results)
                        return null;
                    if (!results[2])
                        return '';
                    return decodeURIComponent(results[2].replace(/\+/g, " "));
                };
                RHDPThankyou.prototype.checkRecentDownload = function () {
                    var storageExpiration = 30000, storageName = 'media-download-url';
                    if (window.location.href.indexOf('media-download-confirmation') > 0) {
                        if (window.localStorage.getItem(storageName)) {
                            var recentDownload, timeOfRefer, currentTime;
                            recentDownload = JSON.parse(window.localStorage.getItem(storageName));
                            timeOfRefer = recentDownload.hasOwnProperty('timestamp') ? recentDownload['timestamp'] : 0;
                            currentTime = new Date().getTime();
                            if (currentTime - timeOfRefer > storageExpiration) {
                                window.localStorage.removeItem(storageName);
                                return false;
                            }
                            return true;
                        }
                        else {
                            var referrerDownload = { value: window.location.href, timestamp: new Date().getTime() };
                            localStorage.setItem(storageName, JSON.stringify(referrerDownload));
                            return false;
                        }
                    }
                };
                return RHDPThankyou;
            }(HTMLElement));
            exports_1("default", RHDPThankyou);
            window.addEventListener('WebComponentsReady', function () {
                customElements.define('rhdp-thankyou', RHDPThankyou);
            });
        }
    };
});
