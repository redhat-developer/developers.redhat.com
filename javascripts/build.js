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
var RHDPAlert = (function (_super) {
    __extends(RHDPAlert, _super);
    function RHDPAlert() {
        var _this = _super.call(this) || this;
        _this._type = 'info';
        _this._icon = true;
        _this.template = function (strings, alert) {
            return "\n        <div class=\"alert-box alert-" + alert.type + " " + (alert.size ? "alert-" + alert.size : '') + "\">\n            " + (alert.size === 'xl' ? '<div class="row">' : '') + "\n                <div class=\"icon\"></div>\n                <div class=\"alert-content\">\n                " + (alert.size === 'xl' ? '<h3>' : '<strong>') + "\n                " + (alert.heading ? alert.heading : '') + "\n                " + (alert.size === 'xl' ? '</h3>' : '</strong>') + "\n                    <p>" + alert.text + "</p>\n                </div>\n            " + (alert.size === 'xl' ? '<a class="close"></a></div>' : '') + "\n        </div>";
        };
        _this.text = _this.innerHTML;
        return _this;
    }
    Object.defineProperty(RHDPAlert.prototype, "type", {
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
    Object.defineProperty(RHDPAlert.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (val) {
            if (this._size === val)
                return;
            this._size = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPAlert.prototype, "heading", {
        get: function () {
            return this._heading;
        },
        set: function (val) {
            if (this._heading === val)
                return;
            this._heading = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPAlert.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (val) {
            if (this._text === val)
                return;
            this._text = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPAlert.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        set: function (val) {
            if (this._icon === val)
                return;
            this._icon = val;
        },
        enumerable: true,
        configurable: true
    });
    RHDPAlert.prototype.connectedCallback = function () {
        var _this = this;
        this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this));
        this.addEventListener('click', function (e) {
            if (e.target && e.target['className'] === 'close') {
                _this.innerHTML = '';
            }
        });
        var _a;
    };
    Object.defineProperty(RHDPAlert, "observedAttributes", {
        get: function () {
            return ['type', 'size', 'heading', 'text'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPAlert.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
        this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this));
        var _a;
    };
    return RHDPAlert;
}(HTMLElement));
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-alert', RHDPAlert);
});
var RHDPOSDownload = (function (_super) {
    __extends(RHDPOSDownload, _super);
    function RHDPOSDownload() {
        var _this = _super.call(this) || this;
        _this._rhelURL = "";
        _this._macURL = "";
        _this._winURL = "";
        _this.stage_download_url = 'https://developers.stage.redhat.com';
        _this.productDownloads = {
            "devsuite": { "windowsUrl": "https://developers.redhat.com/download-manager/file/devsuite-2.2.0-GA-installer.exe", "macUrl": "https://developers.redhat.com/download-manager/file/devsuite-2.2.0-GA-bundle-installer-mac.zip", "rhelUrl": "https://developers.redhat.com/products/devsuite/hello-world/#fndtn-rhel" },
            "cdk": { "windowsUrl": "https://developers.redhat.com/download-manager/file/devsuite-2.2.0-GA-bundle-installer.exe", "macUrl": "https://developers.redhat.com/download-manager/file/devsuite-2.2.0-GA-bundle-installer-mac.zip", "rhelUrl": "https://developers.redhat.com/products/cdk/hello-world/#fndtn-rhel" }
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
        this.innerHTML = (_a = ["", "", "", "", ""], _a.raw = ["", "", "", "", ""], this.template(_a, this.productName, this.downloadURL, this.platformType, this.version));
        var _a;
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
            case 'devsuite':
                this.winURL = this.getDownloadOrigin(this.productDownloads.devsuite.windowsUrl);
                this.macURL = this.getDownloadOrigin(this.productDownloads.devsuite.macUrl);
                this.rhelURL = this.getDownloadOrigin(this.productDownloads.devsuite.rhelUrl);
                break;
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
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-os-download', RHDPOSDownload);
});
var RHDPThankyou = (function (_super) {
    __extends(RHDPThankyou, _super);
    function RHDPThankyou() {
        var _this = _super.call(this) || this;
        _this.template = function (strings, name, directLink) {
            return "<div class=\"row\">\n                    <div class=\"large-24 medium-24 small-24 columns\">\n                        <div class=\"alert-box alert-info\">\n                            <div class=\"icon\"></div>\n                            <div class=\"alert-content\">\n                                <strong>Your download should start automatically.</strong>\n                                <p>If you have any problems with the download, please use the <a id=\"download-link\" href=\"" + directLink + "\">direct link.</a></p>\n                            </div>\n                        </div>\n                \n                        <div class=\"large-24 medium-16 small-24 columns thankyou\">\n                                <h2>Thank you for downloading the:</h2>\n                                <h2>" + name + "</h2>\n                            <iframe src=\"" + directLink + "\"></iframe>\n                        </div>\n                        <div class=\"large-24 medium-16 small-24 columns\">\n                            <div class=\"thankyou-button\">\n                                <a href=\"/\" class=\"button heavy-cta\">Continue\n                                    to Homepage</a>\n                            </div>\n                        </div>\n                \n                    </div>\n                </div>";
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
        this.mediaName = this.mediaName ? this.mediaName : this.stripLabelFromMedia(this.getParameterByName('p'));
        this.directLink = this.directLink ? this.directLink : this.getParameterByName('tcDownloadURL');
        this.innerHTML = (_a = ["", "", ""], _a.raw = ["", "", ""], this.template(_a, this.mediaName, this.directLink));
        var _a;
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
    return RHDPThankyou;
}(HTMLElement));
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-thankyou', RHDPThankyou);
});
var RHDPTryItNow = (function (_super) {
    __extends(RHDPTryItNow, _super);
    function RHDPTryItNow() {
        var _this = _super.call(this) || this;
        _this._title = '';
        _this._subtitle = '';
        _this._buttonID = '';
        _this._buttonText = '';
        _this._buttonLink = '';
        _this._icon = '';
        _this.template = function (strings, title, subtitle, buttonLink, icon, buttonText, buttonID) {
            return "<section> \n                    <div class=\"row\"> \n                        " + (icon ? "<img src=\"" + icon + "\"> " : '') + "\n                        <div class=\"tryitnow-titles\">\n                            " + (title ? "<h4>" + title + "</h4>" : '') + "\n                            " + (subtitle ? "<h5>" + subtitle + "</h5>" : '') + "\n                        </div>\n                        <a " + (buttonID ? "id=\"" + buttonID + "\" " : '') + " href=\"" + buttonLink + "\" class=\"button medium-cta white\">" + buttonText + "</a>\n                    </div>\n                </section>";
        };
        return _this;
    }
    Object.defineProperty(RHDPTryItNow.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            if (this._title === value)
                return;
            this._title = value;
            this.setAttribute('title', this._title);
            this.querySelector('h4') ? this.querySelector('h4').innerHTML = this._title : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPTryItNow.prototype, "subtitle", {
        get: function () {
            return this._subtitle;
        },
        set: function (value) {
            if (this._subtitle === value)
                return;
            this._subtitle = value;
            this.setAttribute('subtitle', this._subtitle);
            this.querySelector('h5') ? this.querySelector('h5').innerHTML = this._subtitle : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPTryItNow.prototype, "buttonid", {
        get: function () {
            return this._buttonID;
        },
        set: function (value) {
            if (this._buttonID === value)
                return;
            this._buttonID = value;
            this.setAttribute('buttonid', this._buttonID);
            this.querySelector('a') ? this.querySelector('a').id = this._buttonID : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPTryItNow.prototype, "buttonlink", {
        get: function () {
            return this._buttonLink;
        },
        set: function (value) {
            if (this._buttonLink === value)
                return;
            this._buttonLink = value;
            this.setAttribute('buttonlink', this._buttonLink);
            this.querySelector('a') ? this.querySelector('a').href = this._buttonLink : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPTryItNow.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        set: function (value) {
            if (this._icon === value)
                return;
            this._icon = value;
            this.setAttribute('icon', this._icon);
            this.querySelector('img') ? this.querySelector('img').src = this._icon : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPTryItNow.prototype, "buttontext", {
        get: function () {
            return this._buttonText;
        },
        set: function (value) {
            if (this._buttonText === value)
                return;
            this._buttonText = value;
            this.setAttribute('buttontext', this._buttonText);
            this.querySelector('a') ? this.querySelector('a').innerHTML = this._buttonText : '';
        },
        enumerable: true,
        configurable: true
    });
    RHDPTryItNow.prototype.connectedCallback = function () {
        this.innerHTML = (_a = ["", "", "", "", "", "", ""], _a.raw = ["", "", "", "", "", "", ""], this.template(_a, this.title, this.subtitle, this.buttonlink, this.icon, this.buttontext, this.buttonid));
        var _a;
    };
    ;
    Object.defineProperty(RHDPTryItNow, "observedAttributes", {
        get: function () {
            return ['buttontext', 'icon', 'buttonlink', 'buttonid', 'subtitle', 'title'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPTryItNow.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    return RHDPTryItNow;
}(HTMLElement));
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-tryitnow', RHDPTryItNow);
});
var DevNationLiveSession = (function () {
    function DevNationLiveSession(obj) {
        var _this = this;
        this._title = '';
        this._date = '';
        this._youtube_id = '';
        this._speakers = [];
        this._abstract = '';
        this._confirmed = false;
        this._register = true;
        this._upcoming = false;
        this._inxpo = '';
        Object.keys(obj).map(function (key) {
            _this[key] = obj[key];
        });
        var dt = Date.parse(this.date);
        if (dt && (dt > Date.now() || dt > Date.now() - 259200000)) {
            this.upcoming = true;
        }
    }
    Object.defineProperty(DevNationLiveSession.prototype, "title", {
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
    Object.defineProperty(DevNationLiveSession.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (val) {
            if (this._date === val)
                return;
            this._date = val;
            // try {
            //     var timeStamp = new Date(val);
            //     var timeString = timeStamp.toString();
            //     var x = timeString.split(' ', 4).join(' ');
            //     var t = timeStamp.toLocaleTimeString();
            //     var timezone = (String(String(timeStamp).split("(")[1]).split(")")[0]);
            //     this._date = x + " " + t + " " + timezone;
            // } catch(e) {
            //     this._date = 'Date TBD';
            // }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "youtube_id", {
        get: function () {
            return this._youtube_id;
        },
        set: function (val) {
            if (this._youtube_id === val)
                return;
            this._youtube_id = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "speakers", {
        get: function () {
            return this._speakers;
        },
        set: function (val) {
            if (this._speakers === val)
                return;
            this._speakers = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "abstract", {
        get: function () {
            return this._abstract;
        },
        set: function (val) {
            if (this._abstract === val)
                return;
            this._abstract = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "register", {
        get: function () {
            return this._register;
        },
        set: function (val) {
            if (this._register === val)
                return;
            this._register = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "confirmed", {
        get: function () {
            return this._confirmed;
        },
        set: function (val) {
            if (this._confirmed === val)
                return;
            this._confirmed = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "inxpo", {
        get: function () {
            return this._inxpo;
        },
        set: function (val) {
            if (this._inxpo === val)
                return;
            this._inxpo = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "upcoming", {
        get: function () {
            return this._upcoming;
        },
        set: function (val) {
            this._upcoming = val;
        },
        enumerable: true,
        configurable: true
    });
    return DevNationLiveSession;
}());
var DevNationLiveSpeaker = (function () {
    function DevNationLiveSpeaker(obj) {
        var _this = this;
        this._name = '';
        this._intro = '';
        this._twitter = '';
        this._image = '';
        Object.keys(obj).map(function (key) {
            _this[key] = obj[key];
        });
    }
    Object.defineProperty(DevNationLiveSpeaker.prototype, "name", {
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
    Object.defineProperty(DevNationLiveSpeaker.prototype, "intro", {
        get: function () {
            return this._intro;
        },
        set: function (val) {
            if (this._intro === val)
                return;
            this._intro = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSpeaker.prototype, "twitter", {
        get: function () {
            return this._twitter;
        },
        set: function (val) {
            if (this._twitter === val)
                return;
            this._twitter = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSpeaker.prototype, "image", {
        get: function () {
            return this._image;
        },
        set: function (val) {
            if (this._image === val)
                return;
            this._image = val;
        },
        enumerable: true,
        configurable: true
    });
    return DevNationLiveSpeaker;
}());
var DevNationLiveApp = (function (_super) {
    __extends(DevNationLiveApp, _super);
    function DevNationLiveApp() {
        var _this = _super.call(this) || this;
        _this._src = '../rhdp-apps/devnationlive/devnationlive.json';
        _this._form = '../rhdp-apps/devnationlive/';
        _this._upcoming = [];
        _this._past = [];
        _this._mode = 'cors';
        _this.speakerLongTemplate = function (strings, speaker) {
            return " <strong>" + speaker.name + "</strong>\n            " + (speaker.twitter ? "(<a href=\"https://twitter.com/" + speaker.twitter + "\" target=\"_blank\" class=\"external-link\">@" + speaker.twitter + "</a>)" : '') + "\n            " + (speaker.intro ? "<p>" + speaker.intro + "</p>" : '');
        };
        _this.speakerShortTemplate = function (strings, speaker) {
            return " <strong>" + speaker.name + "</strong>\n            " + (speaker.twitter ? "(<a href=\"https://twitter.com/" + speaker.twitter + "\" target=\"_blank\" class=\"external-link\">@" + speaker.twitter + "</a>)" : '');
        };
        _this.template = function (strings, next, upcoming, past, speakers) {
            return "<div class=\"wide wide-hero devnation-live\">\n        <div class=\"row\">\n            <div class=\"large-24 columns\">\n                <img class=\"show-for-large-up\" src=\"https://design.jboss.org/redhatdeveloper/website/redhatdeveloper_2_0/microsite_graphics/images/devnationlive_microsite_banner_desktop_logo_r4v1.png\" alt=\"DevNation Live logo\">\n                <img class=\"hide-for-large-up\" src=\"https://design.jboss.org/redhatdeveloper/website/redhatdeveloper_2_0/microsite_graphics/images/devnationlive_microsite_banner_mobile_logo_r4v1.png\" alt=\"DevNation Live logo\">\n            </div>\n        </div>\n    </div>\n    <div id=\"devnationLive-microsite\">\n        " + (next ? "<section class=\"next-session\">\n            <div class=\"row\">\n                <div class=\"large-24 columns\">\n                    <h5 class=\"caps session-label\">Next Live Session</h5>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"large-24 columns\">\n                    <div class=\"session-date right\"><i class=\"fa fa-calendar fa-2x\"></i> " + next.date + "</div>\n                    <h4 class=\"caps\">" + next.title + "</h4>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"large-14 small-24 columns\">\n                    <h5 class=\"caps session-label\">Session:</h5>\n                    <p class=\"abstract\">" + next.abstract + "</p>\n                    <a href=\"" + next.inxpo + "\" target=\"_blank\" class=\"button heavy-cta\">REGISTER</a>\n                </div>\n                <div class=\"large-10 columns\">\n                    <h5 class=\"caps session-label\">Speaker(s):</h5>\n                    " + next.speakers.map(function (speaker) {
                return (_a = ["", ""], _a.raw = ["", ""], _this.speakerLongTemplate(_a, speakers[speaker]));
                var _a;
            }).join('') + "  \n                </div>\n            </div>\n        </section>" : '') + "\n        <section class=\"session-list\">\n            <div class=\"row\">\n                " + (upcoming.length > 0 ? "\n                " + (past.length > 0 ? "<div class=\"large-12 columns\">" : "<div class=\"large-24 columns\">") + "\n                    <h5 class=\"caps\">Upcoming Sessions</h5>\n                    <br>\n                    <ul class=\"events-list\">\n                    " + upcoming.map(function (sess) { return "" + (sess.confirmed ? "\n                        <li class=\"single-event\">\n                            <div class=\"row\">\n                                <div class=\"large-24 columns\">\n                                    <h4 class=\"caps\">" + sess.title + "</h4>\n                                    <p>Speaker(s): " + sess.speakers.map(function (speaker) {
                return (_a = ["", ""], _a.raw = ["", ""], _this.speakerShortTemplate(_a, speakers[speaker]));
                var _a;
            }).join('') + " </p>\n                                    <p>" + sess.date + "</p>\n                                    <p>" + sess.abstract + "</p>\n                                    " + (sess.register ? "\n                                    <a href=\"" + sess.inxpo + "\" target=\"_blank\" class=\"button heavy-cta\">REGISTER</a>" : '') + "\n                                </div>\n                            </div>\n                        </li>"
                : ''); }).join('') + "\n                    </ul>\n                </div>" : '') + "\n                " + (past.length > 0 ? "\n                " + (upcoming.length > 0 ? "<div class=\"large-12 columns\">" : "<div class=\"large-24 columns\">") + "\n                    <h5 class=\"caps\">Past Sessions</h5>\n                        <br>\n                        <ul class=\"events-list\">\n                        " + past.map(function (sess) { return "" + (sess.confirmed ? "\n                            <li class=\"single-event\">\n                                <div class=\"row\">\n                                    <div class=\"large-24 columns\">\n                                        <h4 class=\"caps\">" + sess.title + "</h4>\n                                        <p>Speaker(s): " + sess.speakers.map(function (speaker) {
                return (_a = ["", ""], _a.raw = ["", ""], _this.speakerShortTemplate(_a, speakers[speaker]));
                var _a;
            }).join('') + " </p>\n                                        <p>" + sess.date + "</p>\n                                        <p>" + sess.abstract + "</p>\n                                        <a href=\"https://developers.redhat.com/video/youtube/" + sess.youtube_id + "\" class=\"button external-link\">VIDEO</a>\n                                    </div>\n                                </div>\n                            </li>"
                : ''); }).join('') + "\n                        </ul>\n                    </div>"
                : '') + "\n            </div>\n        </section>\n    </div>";
        };
        return _this;
    }
    Object.defineProperty(DevNationLiveApp.prototype, "sessions", {
        get: function () {
            return this._sessions;
        },
        set: function (val) {
            if (this._sessions === val)
                return;
            this._sessions = val;
            var next = false;
            for (var i = 0; i < this.sessions.length; i++) {
                var sess = new DevNationLiveSession(this.sessions[i]);
                if (sess.confirmed) {
                    if (sess.upcoming) {
                        if (next) {
                            if (sess.inxpo.length > 0) {
                                this.upcoming.push(sess);
                            }
                        }
                        else {
                            if (sess.inxpo.length > 0) {
                                this.next = sess;
                                next = true;
                            }
                        }
                    }
                    else {
                        this.past.push(sess);
                    }
                }
            }
            this.past.sort(this.sortPastSessions);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "speakers", {
        get: function () {
            return this._speakers;
        },
        set: function (val) {
            if (this._speakers === val)
                return;
            this._speakers = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "next", {
        get: function () {
            return this._next;
        },
        set: function (val) {
            if (this._next === val)
                return;
            this._next = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "past", {
        get: function () {
            return this._past;
        },
        set: function (val) {
            if (this._past === val)
                return;
            this._past = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (val) {
            if (this._src === val)
                return;
            this._src = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (val) {
            if (this._mode === val)
                return;
            this._mode = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "form", {
        get: function () {
            return this._form;
        },
        set: function (val) {
            if (this._form === val)
                return;
            this._form = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "upcoming", {
        get: function () {
            return this._upcoming;
        },
        set: function (val) {
            if (this._upcoming === val)
                return;
            this._upcoming = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (val) {
            if (this._data === val)
                return;
            this._data = val;
            this.sessions = this._data['sessions'] ? this._data['sessions'].sort(this.sortSessions) : [];
            this.speakers = this._data['speakers'] ? this._data['speakers'] : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp, "observedAttributes", {
        get: function () {
            return ['src', 'form', 'mode'];
        },
        enumerable: true,
        configurable: true
    });
    DevNationLiveApp.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    DevNationLiveApp.prototype.connectedCallback = function () {
        var _this = this;
        var fHead = new Headers();
        var fInit = {
            method: 'GET',
            headers: fHead,
            mode: this.mode,
            cache: 'default'
        };
        fetch(this.src, fInit)
            .then(function (resp) { return resp.json(); })
            .then(function (data) {
            _this.data = data;
            _this.innerHTML = (_a = ["", "", "", "", ""], _a.raw = ["", "", "", "", ""], _this.template(_a, _this.next, _this.upcoming, _this.past, _this.speakers));
            var _a;
        });
    };
    DevNationLiveApp.prototype.getCookie = function (name) {
        var re = new RegExp('(?:(?:^|.*;\\s*)' + name + '\\s*\\=\\s*([^;]*).*$)|^.*$');
        return document.cookie.replace(re, "$1");
    };
    DevNationLiveApp.prototype.sortSessions = function (a, b) {
        var da = (Date.parse(a.date) ? Date.parse(a.date) : new Date(9999999999999)).valueOf(), db = (Date.parse(b.date) ? Date.parse(b.date) : new Date(9999999999999)).valueOf();
        return da - db;
    };
    DevNationLiveApp.prototype.sortPastSessions = function (a, b) {
        var da = (Date.parse(a.date) ? Date.parse(a.date) : new Date(9999999999999)).valueOf(), db = (Date.parse(b.date) ? Date.parse(b.date) : new Date(9999999999999)).valueOf();
        return db - da;
    };
    return DevNationLiveApp;
}(HTMLElement));
customElements.define('devnation-live-app', DevNationLiveApp);
var RHDPDownloadsAllItem = (function (_super) {
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
        if (this.productId === 'devsuite' || this.productId === 'cdk') {
            this.osVersionExtract(this.productId);
            this.innerHTML = (_a = ["", "", "", "", "", "", "", "", ""], _a.raw = ["", "", "", "", "", "", "", "", ""], this.template(_a, this.name, this.productId, this.dataFallbackUrl, this.downloadUrl, this.learnMore, this.description, this.version, this.platform));
        }
        else {
            this.innerHTML = (_b = ["", "", "", "", "", "", "", "", ""], _b.raw = ["", "", "", "", "", "", "", "", ""], this.template(_b, this.name, this.productId, this.dataFallbackUrl, this.downloadUrl, this.learnMore, this.description, this.version, null));
        }
        var _a, _b;
    };
    RHDPDownloadsAllItem.prototype.osVersionExtract = function (productId) {
        var osPlatform = new RHDPOSDownload();
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
var RHDPDownloadsAll = (function (_super) {
    __extends(RHDPDownloadsAll, _super);
    function RHDPDownloadsAll() {
        var _this = _super.call(this) || this;
        _this.template = function (strings, id, heading) {
            return "<div class=\"download-list\">\n                    <div class=\"large-24 category-label\" id=\"" + id + "\">\n                        <h4>" + heading + "</h4>\n                    </div>\n                </div>\n                ";
        };
        return _this;
    }
    Object.defineProperty(RHDPDownloadsAll.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            if (this.id === value)
                return;
            this._id = value;
            this.setAttribute('id', this._id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPDownloadsAll.prototype, "heading", {
        get: function () {
            return this._heading;
        },
        set: function (value) {
            if (this.heading === value)
                return;
            this._heading = value;
            this.setAttribute('heading', this._heading);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPDownloadsAll.prototype, "products", {
        get: function () {
            return this._products;
        },
        set: function (value) {
            if (this.products === value)
                return;
            this._products = value;
        },
        enumerable: true,
        configurable: true
    });
    RHDPDownloadsAll.prototype.connectedCallback = function () {
        this.innerHTML = (_a = ["", "", ""], _a.raw = ["", "", ""], this.template(_a, this.id, this.heading));
        this.getProductsWithTargetHeading(this.products);
        var _a;
    };
    RHDPDownloadsAll.prototype.getProductsWithTargetHeading = function (productList) {
        if (productList.products) {
            var products = productList.products.products;
            var len = products.length;
            for (var i = 0; i < len; i++) {
                if (products[i].groupHeading === this.heading) {
                    var item = new RHDPDownloadsAllItem();
                    item.name = products[i].productName;
                    item.productId = products[i].productCode ? products[i].productCode : "";
                    item.dataFallbackUrl = products[i].dataFallbackUrl ? products[i].dataFallbackUrl : "";
                    item.downloadUrl = products[i].downloadLink ? products[i].downloadLink : "";
                    item.description = products[i].description ? products[i].description : "";
                    item.learnMore = products[i].learnMoreLink ? products[i].learnMoreLink : "";
                    item.version = products[i].version ? products[i].version : "";
                    this.querySelector('.download-list').appendChild(item);
                }
            }
        }
    };
    Object.defineProperty(RHDPDownloadsAll, "observedAttributes", {
        get: function () {
            return ['id', 'heading'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPDownloadsAll.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    return RHDPDownloadsAll;
}(HTMLElement));
var RHDPDownloadsApp = (function (_super) {
    __extends(RHDPDownloadsApp, _super);
    function RHDPDownloadsApp() {
        var _this = _super.call(this) || this;
        _this.stage_download_url = 'https://developers.stage.redhat.com';
        _this.popularProduct = new RHDPDownloadsPopularProducts();
        _this.products = new RHDPDownloadsProducts();
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
        var downloads = new RHDPDownloadsAll();
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
var RHDPDownloadsPopularProduct = (function (_super) {
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
        var osPlatform = new RHDPOSDownload();
        osPlatform.platformType = osPlatform.getUserAgent();
        osPlatform.downloadURL = this.downloadUrl;
        osPlatform.setOSURL(productId);
        osPlatform.setDownloadURLByPlatform();
        this.downloadUrl = osPlatform.downloadURL;
    };
    RHDPDownloadsPopularProduct.prototype.connectedCallback = function () {
        this.osVersionExtract(this.productId);
        this.innerHTML = (_a = ["", "", "", "", ""], _a.raw = ["", "", "", "", ""], this.template(_a, this.name, this.productId, this.dataFallbackUrl, this.downloadUrl));
        var _a;
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
var RHDPDownloadsPopularProducts = (function (_super) {
    __extends(RHDPDownloadsPopularProducts, _super);
    function RHDPDownloadsPopularProducts() {
        return _super.call(this) || this;
    }
    Object.defineProperty(RHDPDownloadsPopularProducts.prototype, "productList", {
        get: function () {
            return this._productList;
        },
        set: function (value) {
            if (this._productList === value)
                return;
            this._productList = value;
        },
        enumerable: true,
        configurable: true
    });
    RHDPDownloadsPopularProducts.prototype.addProduct = function (product) {
        var productNode = new RHDPDownloadsPopularProduct();
        productNode.name = product.productName;
        productNode.productId = product.productCode;
        productNode.dataFallbackUrl = product.dataFallbackUrl;
        productNode.downloadUrl = product.downloadLink;
        this.appendChild(productNode);
    };
    RHDPDownloadsPopularProducts.prototype.renderProductList = function () {
        // Set instance variable productList to the overall productList returned from download-manager
        // If the product is popular, append it, else: forget about it.
        if (this.productList.products) {
            var products = this.productList.products;
            var len = products.length;
            for (var i = 0; i < len; i++) {
                if (products[i].featured) {
                    this.addProduct(products[i]);
                }
            }
        }
    };
    RHDPDownloadsPopularProducts.prototype.connectedCallback = function () {
        this.renderProductList();
    };
    RHDPDownloadsPopularProducts.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    return RHDPDownloadsPopularProducts;
}(HTMLElement));
var RHDPDownloadsProducts = (function (_super) {
    __extends(RHDPDownloadsProducts, _super);
    function RHDPDownloadsProducts() {
        var _this = _super.call(this) || this;
        _this._products = {
            "products": [{
                    "productName": "Red Hat JBoss Data Grid",
                    "groupHeading": "ACCELERATED DEVELOPMENT AND MANAGEMENT",
                    "productCode": "datagrid",
                    "featured": false,
                    "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=data.grid&downloadType=distributions",
                    "downloadLink": "",
                    "description": "An in-memory data grid to accelerate performance that is fast, distributed, scalable, and independent from the data tier.",
                    "version": "",
                    "learnMoreLink": "/products/datagrid/overview/"
                }, {
                    "productName": "Red Hat JBoss Enterprise Application Platform",
                    "groupHeading": "ACCELERATED DEVELOPMENT AND MANAGEMENT",
                    "productCode": "eap",
                    "featured": false,
                    "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=appplatform&downloadType=distributions",
                    "downloadLink": "",
                    "description": "An innovative, modular, cloud-ready application platform that addresses management, automation and developer productivity.",
                    "version": "",
                    "learnMoreLink": "/products/eap/overview/"
                }, {
                    "productName": "Red Hat JBoss Web Server",
                    "groupHeading": "ACCELERATED DEVELOPMENT AND MANAGEMENT",
                    "featured": false,
                    "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?downloadType=distributions&product=webserver&productChanged=yes",
                    "downloadLink": "/products/webserver/download/",
                    "description": "Apache httpd, Tomcat, etc. to provide a single solution for large-scale websites and light-weight Java web applications.",
                    "version": "",
                    "learnMoreLink": "/products/webserver/overview/"
                }, {
                    "productName": "Red Hat Application Migration Toolkit",
                    "groupHeading": "DEVELOPER TOOLS",
                    "productCode": "migrationtoolkit",
                    "featured": false,
                    "dataFallbackUrl": "https://access.redhat.com/downloads",
                    "downloadLink": "",
                    "description": "Red Hat Application Migration Toolkit is an assembly of open source tools that enables large-scale application migrations and modernizations. The tooling consists of multiple individual components that provide support for each phase of a migration process.",
                    "version": "",
                    "learnMoreLink": "/products/rhamt/overview/"
                }, {
                    "productName": "Red Hat Container Development Kit",
                    "groupHeading": "DEVELOPER TOOLS",
                    "productCode": "cdk",
                    "featured": false,
                    "dataFallbackUrl": "https://access.redhat.com/downloads/content/293/",
                    "downloadLink": "",
                    "description": "For container development, includes RHEL and OpenShift 3.",
                    "version": "",
                    "learnMoreLink": "/products/cdk/overview/"
                }, {
                    "productName": "Red Hat Development Suite",
                    "groupHeading": "DEVELOPER TOOLS",
                    "productCode": "devsuite",
                    "featured": true,
                    "dataFallbackUrl": "https://access.redhat.com/downloads",
                    "downloadLink": "",
                    "description": "A fully integrated development environment for modern enterprise development.",
                    "version": "",
                    "learnMoreLink": "/products/devsuite/overview/"
                }, {
                    "productName": "Red Hat JBoss Developer Studio",
                    "groupHeading": "DEVELOPER TOOLS",
                    "productCode": "devstudio",
                    "featured": false,
                    "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=jbossdeveloperstudio&downloadType=distributions",
                    "downloadLink": "",
                    "description": "An Eclipse-based IDE to create apps for web, mobile, transactional enterprise, and SOA-based integration apps/services.",
                    "version": "",
                    "learnMoreLink": "/products/devstudio/overview/"
                }, {
                    "productName": "Red Hat Enterprise Linux",
                    "groupHeading": "INFRASTRUCTURE",
                    "productCode": "rhel",
                    "featured": true,
                    "dataFallbackUrl": "https://access.redhat.com/downloads/content/69/",
                    "downloadLink": "",
                    "description": "For traditional development, includes Software Collections and Developer Toolset.",
                    "version": "",
                    "learnMoreLink": "/products/rhel/overview/"
                }, {
                    "productName": "Red Hat JBoss AMQ",
                    "groupHeading": "INTEGRATION AND AUTOMATION",
                    "productCode": "amq",
                    "featured": false,
                    "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=jboss.amq&downloadType=distributions",
                    "downloadLink": "",
                    "description": "A small-footprint, performant, robust messaging platform that enables real-time app, device, and service integration.",
                    "version": "",
                    "learnMoreLink": "/products/amq/overview/"
                }, {
                    "productName": "Red Hat Decision Manager",
                    "groupHeading": "INTEGRATION AND AUTOMATION",
                    "productCode": "brms",
                    "featured": false,
                    "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=brms&downloadType=distributions",
                    "downloadLink": "",
                    "description": "A programming platform to easily capture and maintain rules for business changes, without impacting static applications.",
                    "version": "",
                    "learnMoreLink": "/products/red-hat-decision-manager/overview/"
                }, {
                    "productName": "Red Hat JBoss BPM Suite",
                    "groupHeading": "INTEGRATION AND AUTOMATION",
                    "productCode": "bpmsuite",
                    "featured": false,
                    "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?downloadType=distributions&product=bpm.suite&productChanged=yes",
                    "downloadLink": "",
                    "description": "A platform that combines business rules and process management (BPM), and complex event processing.",
                    "version": "",
                    "learnMoreLink": "/products/bpmsuite/overview/"
                }, {
                    "productName": "Red Hat JBoss Data Virtualization",
                    "groupHeading": "INTEGRATION AND AUTOMATION",
                    "productCode": "datavirt",
                    "featured": false,
                    "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=data.services.platform&downloadType=distributions",
                    "downloadLink": "",
                    "description": "A tool that brings operational and analytical insight from data dispersed in various business units, apps, and technologies.",
                    "version": "",
                    "learnMoreLink": "/products/datavirt/overview/"
                }, {
                    "productName": "Red Hat JBoss Fuse",
                    "groupHeading": "INTEGRATION AND AUTOMATION",
                    "productCode": "fuse",
                    "featured": true,
                    "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=jboss.fuse&downloadType=distributions",
                    "downloadLink": "",
                    "description": "A small-footprint enterprise service bus (ESB) that lets you build, deploy and integrate applications and services.",
                    "version": "",
                    "learnMoreLink": "/products/fuse/overview/"
                }, {
                    "productName": "Red Hat Mobile Application Platform",
                    "groupHeading": "MOBILE",
                    "featured": true,
                    "dataFallbackUrl": "https://access.redhat.com/downloads/content/316/",
                    "downloadLink": "/products/mobileplatform/download/",
                    "description": "Develop and deploy mobile apps in an agile and flexible manner.",
                    "version": "",
                    "learnMoreLink": "/products/mobileplatform/overview/"
                }, {
                    "productName": "Red Hat OpenShift Container Platform",
                    "groupHeading": "CLOUD",
                    "productCode": "openshift",
                    "featured": false,
                    "dataFallbackUrl": "https://access.redhat.com/downloads/content/290/",
                    "downloadLink": "",
                    "description": "An open, hybrid Platform-as-a-Service (PaaS) to quickly develop, host, scale, and deliver apps in the cloud.",
                    "version": "",
                    "learnMoreLink": "/products/openshift/overview/"
                }, {
                    "productName": "OpenJDK",
                    "groupHeading": "LANGUAGES AND COMPILERS",
                    "productCode": "openjdk",
                    "featured": false,
                    "dataFallbackUrl": "/products/openjdk/overview/",
                    "downloadLink": "",
                    "description": "A Tried, Tested and Trusted open source implementation of the Java platform",
                    "version": "",
                    "learnMoreLink": "/products/openjdk/overview/"
                }]
        };
        return _this;
    }
    Object.defineProperty(RHDPDownloadsProducts.prototype, "category", {
        get: function () {
            return this._category;
        },
        set: function (value) {
            if (this._category === value)
                return;
            this._category = value;
            this.setAttribute('category', this._category);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPDownloadsProducts.prototype, "products", {
        get: function () {
            return this._products;
        },
        set: function (value) {
            if (this._products === value)
                return;
            this._products = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPDownloadsProducts.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            if (this._data === value)
                return;
            this._data = value;
            this.setAttribute('data', this._data);
            this._createProductList();
        },
        enumerable: true,
        configurable: true
    });
    RHDPDownloadsProducts.prototype._createProductList = function () {
        var tempProductList = { "products": [] };
        if (this._data) {
            var productLen = this.products.products.length;
            var dataLen = this.data.length;
            for (var i = 0; i < productLen; i++) {
                var product = this.products.products[i];
                for (var j = 0; j < dataLen; j++) {
                    var data = this.data[j];
                    if (data['productCode'] == product['productCode']) {
                        this.products.products[i]['downloadLink'] = data['featuredArtifact']['url'];
                        this.products.products[i]['version'] = data['featuredArtifact']['versionName'];
                    }
                }
                tempProductList['products'].push(product);
            }
        }
        this.products = tempProductList;
    };
    return RHDPDownloadsProducts;
}(HTMLElement));
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-downloads-all-item', RHDPDownloadsAllItem);
    customElements.define('rhdp-downloads-all', RHDPDownloadsAll);
    customElements.define('rhdp-downloads-popular-product', RHDPDownloadsPopularProduct);
    customElements.define('rhdp-downloads-popular-products', RHDPDownloadsPopularProducts);
    customElements.define('rhdp-downloads-products', RHDPDownloadsProducts);
    customElements.define('rhdp-downloads-app', RHDPDownloadsApp);
});
var RHDPProjectFilterBox = (function (_super) {
    __extends(RHDPProjectFilterBox, _super);
    function RHDPProjectFilterBox() {
        var _this = _super.call(this) || this;
        _this._term = '';
        _this._filter = '';
        _this.template = function (strings, project) {
            return "\n        <form action=\"\" class=\"project-filters\" method=\"GET\" data-drupal-form-fields=\"\">\n            <h4>Filters<a class=\"project-filters-clear\" href=\"#\">Clear All Filters</a></h4>\n            <input name=\"filter-text\" placeholder=\"Filter by keyword\" type=\"text\" value=\"" + project.term + "\">\n            <div class=\"filter-block\">\n                <h5>Included In</h5>\n        \n                <div class=\"styled-select\" ><select name=\"filter-products\" id=\"upstream-project-selection\">\n                    <option value=\"\">Select Product...</option>\n                    <option value=\"amq\">Red Hat JBoss AMQ</option>\n                    <option value=\"bpmsuite\">Red Hat JBoss BPM Suite</option>\n                    <option value=\"brms\">Red Hat Decision Manager</option>\n                    <option value=\"datagrid\">Red Hat JBoss Data Grid</option>\n                    <option value=\"datavirt\">Red Hat JBoss Data Virtualization</option>\n                    <option value=\"devstudio\">Red Hat JBoss Developer Studio</option>\n                    <option value=\"eap\">Red Hat JBoss Enterprise Application Platform</option>\n                    <option value=\"fuse\">Red Hat JBoss Fuse</option>\n                    <option value=\"rhel\">Red Hat Enterprise Linux</option>\n                    <option value=\"webserver\">Red Hat JBoss Web Server</option>\n                </select></div>\n            </div>\n        </form>\n";
        };
        return _this;
    }
    Object.defineProperty(RHDPProjectFilterBox.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        set: function (value) {
            this._filter = decodeURI(value);
            var filterAttrib = this.querySelector('select[name="filter-products"]');
            if (value === "") {
                filterAttrib.selectedIndex = 0;
            }
            else {
                filterAttrib.setAttribute('value', this.filter);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectFilterBox.prototype, "term", {
        get: function () {
            return this._term;
        },
        set: function (value) {
            this._term = decodeURI(value);
            this.querySelector('input').value = this.term;
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjectFilterBox.prototype.connectedCallback = function () {
        var _this = this;
        this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this));
        this.addEventListener('submit', function (e) {
            e.preventDefault();
            _this._filterChange(e);
        });
        this.querySelector('select[name="filter-products"]').addEventListener('change', function (e) {
            e.preventDefault();
            _this._filterChange(e);
        });
        this.querySelector('.project-filters-clear').addEventListener('click', function (e) {
            e.preventDefault();
            _this._clearFilters(e);
        });
        var _a;
    };
    RHDPProjectFilterBox.prototype._clearFilters = function (e) {
        e.preventDefault();
        this.filter = "";
        this.term = "";
        this._updateProjectFilters();
    };
    RHDPProjectFilterBox.prototype._filterChange = function (e) {
        if (e.currentTarget.id == "upstream-project-selection") {
            this.filter = e.currentTarget.value;
        }
        this.term = this.querySelector('input').value;
        this._updateProjectFilters();
    };
    RHDPProjectFilterBox.prototype._updateProjectFilters = function () {
        this.dispatchEvent(new CustomEvent('project-filter-change', {
            detail: {
                filter: this.filter,
                term: this.term
            },
            bubbles: true
        }));
    };
    Object.defineProperty(RHDPProjectFilterBox, "observedAttributes", {
        get: function () {
            return ['loading'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjectFilterBox.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    return RHDPProjectFilterBox;
}(HTMLElement));
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-project-filter-box', RHDPProjectFilterBox);
});
var RHDPProjectItem = (function (_super) {
    __extends(RHDPProjectItem, _super);
    function RHDPProjectItem() {
        var _this = _super.call(this) || this;
        _this.template = function (strings, project) {
            return "\n        \n            <div class=\"defaultprojectimage\">\n                <p class=\"image-link\"><img src=\"" + project.imageUrl + "\" alt=\"" + project.projectName + "\"></p></div>\n            <h5 class=\"solution-name\">\n                <p class=\"solution-name-link\">" + project.projectName + "</p>\n            </h5>\n            <p>\n        \n            </p>\n            <a class=\"solution-overlay-learn link-sm\">Learn more</a> " + (project.downloadsLink ? "| <a href=\"" + project.downloadsLink + "\" class=\"link-sm\">Download</a>" : '') + "\n            <div class=\"project-content row\">\n                <div class=\"large-6 project-content-left columns\"><img\n                        src=\"" + project.imageUrl + "\" alt=\"" + project.projectName + "\">\n                    <p><a class=\"upstream-download\" href=\"" + project.downloadsLink + "\"><i class=\"fa fa-download\"></i> Download</a></p>\n                    <p>\n                        " + (project.sys_url_view ? "<a href=\"" + project.sys_url_view + "\">Visit home page</a>" : '') + "\n                    </p>\n                    <ul class=\"project-social\"> \n                        " + (project.twitterLink ? "<li><a href=\"" + project.twitterLink + "\"><i class=\"fa fa-twitter\"></i></a></li>" : '') + "\n                    </ul>\n                </div>\n                <div class=\"large-18 project-content-right columns\"><h3><a href=\"" + project.sys_url_view + "\">" + project.projectName + "</a>\n                </h3>\n                    <p>" + project.descriptions + "</p>\n                    <div class=\"upstream-more-content\">\n                        <ul class=\"project-details-list\">\n                            " + (project.docsLink ? "<li>Docs: <a href=\"" + project.docsLink + "\">Documentation</a></li>" : '') + "\n                            " + (project.communityLink ? "<li>Community: <a href=\"" + project.communityLink + "\">" + project.generateViewLink(project.communityLink) + "</a></li>" : '') + "\n                            " + (project.mailingListLink ? "<li>Mailing List: <a href=\"" + project.mailingListLink + "\">" + project.generateViewLink(project.mailingListLink) + "</a></li>" : '') + "\n                            " + (project.chatLink ? "<li>Chat: <a href=\"" + project.chatLink + "\">" + project.generateViewLink(project.chatLink) + "</a></li>" : '') + "\n                            " + (project.jiraLink ? "<li>JIRA: <a href=\"" + project.jiraLink + "\">" + project.generateViewLink(project.jiraLink) + "</a></li>" : '') + "\n                            " + (project.srcLink ? "<li>Source: <a href=\"" + project.srcLink + "\">" + project.generateViewLink(project.srcLink) + "</a></li>" : '') + "\n                            " + (project.githubLink ? "<li>Github: <a href=\"" + project.githubLink + "\">" + project.generateViewLink(project.githubLink) + "</a></li>" : '') + "\n                            " + (project.buildLink ? "<li>Build: <a href=\"" + project.buildLink + "\">" + project.generateViewLink(project.buildLink) + "</a></li>" : '') + "\n                            " + (project.issueTracker ? "<li>Issue: <a href=\"" + project.issueTracker + "\">" + project.generateViewLink(project.issueTracker) + "</a></li>" : '') + "\n                            " + (project.userForumLink ? "<li>User Forum: <a href=\"" + project.userForumLink + "\">" + project.generateViewLink(project.userForumLink) + "</a></li>" : '') + "  \n                            " + (project.devForumLink ? "<li>Dev Forum: <a href=\"" + project.devForumLink + "\">" + project.generateViewLink(project.devForumLink) + "</a></li>" : '') + "  \n                            " + (project.knowledgebaseLink ? "<li>KnowledgeBase: <a href=\"" + project.knowledgebaseLink + "\">" + project.generateViewLink(project.knowledgebaseLink) + "</a></li>" : '') + " \n                            " + (project.blogLink ? "<li>Blog: <a href=\"" + project.blogLink + "\">" + project.generateViewLink(project.blogLink) + "</a></li>" : '') + " \n                            " + (project.anonymousLink ? "<li>Anonymous Source: <a href=\"" + project.anonymousLink + "\">" + project.generateViewLink(project.anonymousLink) + "</a></li>" : '') + " \n                        </ul>\n                    </div>\n                </div>\n            </div>\n        ";
        };
        return _this;
    }
    Object.defineProperty(RHDPProjectItem.prototype, "userForumLink", {
        get: function () {
            return this._userForumLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._userForumLink === value)
                return;
            this._userForumLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "devForumLink", {
        get: function () {
            return this._devForumLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._devForumLink === value)
                return;
            this._devForumLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "mailingListLink", {
        get: function () {
            return this._mailingListLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._mailingListLink === value)
                return;
            this._mailingListLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "chatLink", {
        get: function () {
            return this._chatLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._chatLink === value)
                return;
            this._chatLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "blogLink", {
        get: function () {
            return this._blogLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._blogLink === value)
                return;
            this._blogLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "jiraLink", {
        get: function () {
            return this._jiraLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._jiraLink === value)
                return;
            this._jiraLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "srcLink", {
        get: function () {
            return this._srcLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._srcLink === value)
                return;
            this._srcLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "anonymousLink", {
        get: function () {
            return this._anonymousLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._anonymousLink === value)
                return;
            this._anonymousLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "commiterLink", {
        get: function () {
            return this._commiterLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._commiterLink === value)
                return;
            this._commiterLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "fisheyeLink", {
        get: function () {
            return this._fisheyeLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._fisheyeLink === value)
                return;
            this._fisheyeLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "viewvcLink", {
        get: function () {
            return this._viewvcLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._viewvcLink === value)
                return;
            this._viewvcLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "committerGitLink", {
        get: function () {
            return this._committerGitLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._committerGitLink === value)
                return;
            this._committerGitLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "buildLink", {
        get: function () {
            return this._buildLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._buildLink === value)
                return;
            this._buildLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "hudsonLink", {
        get: function () {
            return this._hudsonLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._hudsonLink === value)
                return;
            this._hudsonLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "knowledgebaseLink", {
        get: function () {
            return this._knowledgebaseLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._knowledgebaseLink === value)
                return;
            this._knowledgebaseLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "communityLink", {
        get: function () {
            return this._communityLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._communityLink === value)
                return;
            this._communityLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "imageUrl", {
        get: function () {
            return this._imageUrl;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._imageUrl === value)
                return;
            this._imageUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "projectName", {
        get: function () {
            return this._projectName;
        },
        set: function (value) {
            if (this._projectName === value)
                return;
            this._projectName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "downloadsLink", {
        get: function () {
            return this._downloadsLink;
        },
        set: function (value) {
            this.getCorrectUrl(value);
            if (this._downloadsLink === value)
                return;
            this._downloadsLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "sys_url_view", {
        get: function () {
            return this._sys_url_view;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._sys_url_view === value)
                return;
            this._sys_url_view = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "twitterLink", {
        get: function () {
            return this._twitterLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._twitterLink === value)
                return;
            this._twitterLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "descriptions", {
        get: function () {
            return this._descriptions;
        },
        set: function (value) {
            if (this._descriptions === value)
                return;
            this._descriptions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "docsLink", {
        get: function () {
            return this._docsLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._docsLink === value)
                return;
            this._docsLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "issueTracker", {
        get: function () {
            return this._issueTracker;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._issueTracker === value)
                return;
            this._issueTracker = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "githubLink", {
        get: function () {
            return this._githubLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._githubLink === value)
                return;
            this._githubLink = value;
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjectItem.prototype.getCorrectUrl = function (url) {
        if (url == null)
            return;
        if (url.constructor === Array && url.length > 0) {
            url = url[0];
        }
        if (url.indexOf("/") > 0) {
            return url;
        }
        else {
            return "https://developers.redhat.com" + url;
        }
    };
    RHDPProjectItem.prototype.connectedCallback = function () {
        this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this));
        var _a;
    };
    RHDPProjectItem.prototype.getTemplateHTML = function () {
        this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this));
        return this.innerHTML;
        var _a;
    };
    RHDPProjectItem.prototype.generateViewLink = function (viewLink) {
        return viewLink.replace(/https?:\/\//, '');
    };
    Object.defineProperty(RHDPProjectItem, "observedAttributes", {
        get: function () {
            return ['type', 'size', 'heading', 'text'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjectItem.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
        this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this));
        var _a;
    };
    return RHDPProjectItem;
}(HTMLElement));
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-project-item', RHDPProjectItem);
});
var RHDPProjectQuery = (function (_super) {
    __extends(RHDPProjectQuery, _super);
    function RHDPProjectQuery() {
        var _this = _super.call(this) || this;
        _this._dcpUrl = 'https://dcp2.jboss.org/v2/rest/search/suggest_project_name_ngram_more_fields?sort=sys_title&query=';
        _this._term = '';
        // Mock data should be used for unit testing
        _this._mockData = false;
        // TODO: Fix this ugly hack. Add upstream projects to products once Drupal REST endpoints are exposed.
        _this.productData = {
            "amq": { "upstream": ["activemq", "fabric8"] },
            "bpmsuite": { "upstream": ["drools", "guvnor", "optaplanner", "jbpm"] },
            "brms": { "upstream": ["optaplanner", "drools", "guvnor"] },
            "datagrid": { "upstream": ["infinispan", "jgroups", "hibernate_subprojects_search"] },
            "datavirt": { "upstream": ["teiid", "teiiddesigner", "modeshape"] },
            "devstudio": { "upstream": ["jbosstools"] },
            "eap": { "upstream": ["wildfly", "jgroups", "hibernate", "hornetq", "jbossclustering", "jbossmc", "narayana", "jbossweb", "jbossws", "ironjacamar", "jgroups", "mod_cluster", "jbossas_osgi", "jbosssso", "picketlink", "resteasy", "weld", "wise", "xnio"] },
            "fuse": { "upstream": ["camel", "karaf", "activemq", "cxf", "fabric8", "switchyard", "hawtio"] },
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
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-project-query', RHDPProjectQuery);
});
var RHDPProjectURL = (function (_super) {
    __extends(RHDPProjectURL, _super);
    function RHDPProjectURL() {
        var _this = _super.call(this) || this;
        _this._uri = new URL(window.location.href);
        _this._updateURI = _this._updateURI.bind(_this);
        return _this;
    }
    Object.defineProperty(RHDPProjectURL.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        set: function (value) {
            this._uri = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectURL.prototype, "term", {
        get: function () {
            return this._term;
        },
        set: function (value) {
            if (value.length > 0) {
                this.uri.searchParams.set('filter-text', value);
            }
            else {
                this.uri.searchParams.delete('filter-text');
            }
            this._term = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectURL.prototype, "filters", {
        get: function () {
            return this._filters;
        },
        set: function (value) {
            if (value.length > 0) {
                this.uri.searchParams.set('filter-product', value);
            }
            else {
                this.uri.searchParams.delete('filter-product');
            }
            this._filters = value;
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjectURL.prototype.connectedCallback = function () {
        top.addEventListener('data-results-complete', this._updateURI);
    };
    RHDPProjectURL.prototype._updateURI = function (e) {
        if (e.detail) {
            this.term = e.detail.term ? e.detail.term : '';
            this.filters = e.detail.filter ? e.detail.filter : '';
            history.pushState({}, 'RHDP Projects:', "" + this.uri.pathname + (this.uri.searchParams ? "#!" + this.uri.searchParams : ''));
        }
    };
    Object.defineProperty(RHDPProjectURL, "observedAttributes", {
        get: function () {
            return ['loading'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjectURL.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    return RHDPProjectURL;
}(HTMLElement));
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-project-url', RHDPProjectURL);
});
var RHDPProjects = (function (_super) {
    __extends(RHDPProjects, _super);
    function RHDPProjects() {
        var _this = _super.call(this) || this;
        _this._loading = true;
        _this._dcpUrl = '';
        _this.template = function (strings, project) {
            return "\n\n        <ul class=\"small-block-grid-2 large-block-grid-4 medium-block-grid-3 results\"></ul>\n        \n        ";
        };
        return _this;
    }
    Object.defineProperty(RHDPProjects.prototype, "dcpUrl", {
        get: function () {
            return this.getAttribute('dcp-url') ? this.getAttribute('dcp-url') : this._dcpUrl;
        },
        set: function (value) {
            if (this._dcpUrl === value)
                return;
            this._dcpUrl = value;
            this.setAttribute('dcp-url', this._dcpUrl);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjects.prototype, "loading", {
        get: function () {
            return this._loading;
        },
        set: function (value) {
            // Set the css for the loading symbol
            if (value == false) {
                this.querySelector('ul.results').classList.remove('loading');
            }
            else {
                this.querySelector('ul.results').classList.add('loading');
            }
            this._loading = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjects.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjects.prototype.connectedCallback = function () {
        this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this));
        this.addEventListener('data-results-complete', this._loadDataResult);
        var query = new RHDPProjectQuery();
        query.dcpUrl = this.dcpUrl;
        var url = new RHDPProjectURL();
        this.appendChild(query);
        this.appendChild(url);
        var _a;
    };
    RHDPProjects.prototype.removeAllProjects = function () {
        var childNodes = this.querySelector('ul.results');
        while (childNodes.firstChild) {
            childNodes.removeChild(childNodes.firstChild);
        }
    };
    RHDPProjects.prototype._loadDataResult = function (e) {
        this.removeAllProjects();
        this.loading = true;
        if (e.detail && e.detail.data) {
            var hits = void 0;
            if (e.detail.data.responses) {
                hits = e.detail.data.responses[0].hits.hits;
            }
            else {
                hits = e.detail.data.hits.hits;
            }
            for (var i = 0; i < hits.length; i++) {
                var project = new RHDPProjectItem();
                var props = hits[i].fields;
                var thumbnailSize = "200x150";
                project.imageUrl = "https://static.jboss.org/" + (props.specialIcon || props.sys_project) + "/images/" + (props.specialIcon || props.sys_project) + "_" + thumbnailSize + ".png";
                project.downloadsLink = props.downloadsLink;
                project.projectName = props.sys_project_name;
                project.sys_url_view = props.sys_url_view;
                project.descriptions = props.description;
                project.docsLink = props.docsLink;
                project.communityLink = props.communityLink;
                project.knowledgebaseLink = props.knowledgeBaseLink;
                project.userForumLink = props.userForumLink;
                project.devForumLink = props.devForumLink;
                project.mailingListLink = props.mailingListLink;
                project.chatLink = props.chatLink;
                project.blogLink = props.blogLink;
                project.issueTracker = props.issueTrackerLink;
                project.jiraLink = props.jiraLink;
                project.srcLink = props.srcLink;
                project.anonymousLink = props.anonymousLink;
                project.commiterLink = props.commiterLink;
                project.fisheyeLink = props.fisheyeLink;
                project.viewvcLink = props.viewvcLink;
                project.githubLink = props.githubLink;
                project.committerGitLink = props.committerGitLink;
                project.buildLink = props.buildLink;
                project.hudsonLink = props.hudsonLink;
                var listItem = document.createElement('li');
                listItem.setAttribute('class', 'upstream');
                listItem.appendChild(project);
                this.querySelector('ul.results').appendChild(listItem);
            }
            this.loading = false;
        }
    };
    Object.defineProperty(RHDPProjects, "observedAttributes", {
        get: function () {
            return [''];
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjects.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
        this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this));
        var _a;
    };
    return RHDPProjects;
}(HTMLElement));
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-projects', RHDPProjects);
});
var RHDPSearchBox = (function (_super) {
    __extends(RHDPSearchBox, _super);
    function RHDPSearchBox() {
        var _this = _super.call(this) || this;
        _this._term = '';
        _this.name = 'Search Box';
        _this.template = function (strings, name, term) {
            return "<form class=\"search-bar\" role=\"search\">\n        <div class=\"input-cont\">\n            <input value=\"" + term + "\" class=\"user-success user-search\" type=\"search\" id=\"query\" placeholder=\"Enter your search term\">\n        </div>\n        <button id=\"search-btn\"><span>SEARCH</span><i class='fa fa-search' aria-hidden='true'></i></button>\n        </form>";
        };
        _this._checkTerm = _this._checkTerm.bind(_this);
        return _this;
    }
    Object.defineProperty(RHDPSearchBox.prototype, "term", {
        get: function () {
            return this._term;
        },
        set: function (val) {
            if (this._term === val)
                return;
            this._term = decodeURI(val);
            this.querySelector('input').setAttribute('value', this.term);
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchBox.prototype.connectedCallback = function () {
        var _this = this;
        top.addEventListener('params-ready', this._checkTerm);
        //top.window.addEventListener('popstate', e => { this.term = null; });
        top.addEventListener('term-change', this._checkTerm);
        this.innerHTML = (_a = ["", "", ""], _a.raw = ["", "", ""], this.template(_a, this.name, this.term));
        this.addEventListener('submit', function (e) {
            e.preventDefault();
            _this._termChange();
            return false;
        });
        this.querySelector('#search-btn').addEventListener('click', function (e) {
        });
        var _a;
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
    RHDPSearchBox.prototype._checkTerm = function (e) {
        if (e.detail && e.detail.term) {
            this.term = e.detail.term;
        }
    };
    RHDPSearchBox.prototype._termChange = function () {
        this.term = this.querySelector('input').value;
        this.dispatchEvent(new CustomEvent('term-change', {
            detail: {
                term: this.term
            },
            bubbles: true
        }));
    };
    return RHDPSearchBox;
}(HTMLElement));
customElements.define('rhdp-search-box', RHDPSearchBox);
var RHDPSearchFilterGroup = (function (_super) {
    __extends(RHDPSearchFilterGroup, _super);
    function RHDPSearchFilterGroup() {
        var _this = _super.call(this) || this;
        _this._toggle = false;
        _this._more = false;
        _this.template = function (strings, name) {
            return "<h6 class=\"showFilters heading\"><span class=\"group-name\">" + name + "</span><span class=\"toggle\"><i class='fa fa-chevron-right' aria-hidden='true'></i></span></h6>\n        <div class=\"group hide\">\n            <div class=\"primary\"></div>\n            <div class=\"secondary hide\"></div>\n            <a href=\"#\" class=\"more\">Show More</a>\n        </div>";
        };
        _this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], _this.template(_a, _this.name));
        return _this;
        var _a;
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
            this.querySelector('.group-name').innerHTML = this._name;
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
        this.querySelector('h6').addEventListener('click', function (e) {
            e.preventDefault();
            _this.toggle = !_this.toggle;
        });
        this.querySelector('.more').addEventListener('click', function (e) {
            _this.more = !_this.more;
        });
        this.toggle = true;
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
    return RHDPSearchFilterGroup;
}(HTMLElement));
customElements.define('rhdp-search-filter-group', RHDPSearchFilterGroup);
var RHDPSearchFilterItem = (function (_super) {
    __extends(RHDPSearchFilterItem, _super);
    function RHDPSearchFilterItem() {
        var _this = _super.call(this) || this;
        _this._active = false;
        _this._inline = false;
        _this._bubble = true;
        _this._bounce = false;
        _this.template = function (strings, name, key, active) {
            var checked = active ? 'checked' : '';
            return "<div class=\"list\"><span>" + name + "</span><input type=\"checkbox\" " + checked + " id=\"filter-item-" + key + "\" value=\"" + key + "\"><label for=\"filter-item-" + key + "\">" + name + "</label></div>";
        };
        _this.inlineTemplate = function (strings, name, active) {
            return active ? "<div class=\"inline\">" + name + " <i class=\"fa fa-times clearItem\" aria-hidden=\"true\"></i></div>" : '';
        };
        _this._checkParams = _this._checkParams.bind(_this);
        _this._clearFilters = _this._clearFilters.bind(_this);
        _this._checkChange = _this._checkChange.bind(_this);
        _this._updateFacet = _this._updateFacet.bind(_this);
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
            this.setAttribute('name', this._name);
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
            this.className = "filter-item-" + this._key;
            this.setAttribute('key', this._key);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchFilterItem.prototype, "group", {
        get: function () {
            return this._group;
        },
        set: function (val) {
            if (this._group === val)
                return;
            this._group = val;
            this.setAttribute('group', this._group);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchFilterItem.prototype, "active", {
        get: function () {
            return this._active;
        },
        set: function (val) {
            if (typeof val === 'string') {
                val = true;
            }
            if (val === null) {
                val = false;
            }
            if (this._active === val) {
                return;
            }
            else {
                this._active = val;
                var chkbox = this.querySelector('input');
                if (this._active) {
                    this.setAttribute('active', '');
                }
                else {
                    this.removeAttribute('active');
                }
                if (chkbox) {
                    chkbox.checked = this._active;
                }
                if (this.inline) {
                    this.innerHTML = this._active ? (_a = ["", "", ""], _a.raw = ["", "", ""], this.inlineTemplate(_a, this.name, this._active)) : '';
                }
                this.dispatchEvent(new CustomEvent('filter-item-change', { detail: { facet: this }, bubbles: this.bubble }));
                this.bubble = true;
            }
            var _a;
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
            this.innerHTML = !this._inline ? (_a = ["", "", "", ""], _a.raw = ["", "", "", ""], this.template(_a, this.name, this.key, this.active)) : (_b = ["", "", ""], _b.raw = ["", "", ""], this.inlineTemplate(_b, this.name, this.active));
            var _a, _b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchFilterItem.prototype, "bubble", {
        get: function () {
            return this._bubble;
        },
        set: function (val) {
            if (this._bubble === val)
                return;
            this._bubble = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchFilterItem.prototype, "bounce", {
        get: function () {
            return this._bounce;
        },
        set: function (val) {
            if (this._bounce === val)
                return;
            this._bounce = val;
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchFilterItem.prototype.connectedCallback = function () {
        this.innerHTML = !this.inline ? (_a = ["", "", "", ""], _a.raw = ["", "", "", ""], this.template(_a, this.name, this.key, this.active)) : (_b = ["", "", ""], _b.raw = ["", "", ""], this.inlineTemplate(_b, this.name, this.active));
        if (!this.inline) {
            this.addEventListener('change', this._updateFacet);
        }
        else {
            this.addEventListener('click', this._updateFacet);
        }
        top.addEventListener('filter-item-change', this._checkChange);
        top.addEventListener('params-ready', this._checkParams);
        top.addEventListener('clear-filters', this._clearFilters);
        var _a, _b;
        //top.window.addEventListener('popstate', this._clearFilters);
    };
    Object.defineProperty(RHDPSearchFilterItem, "observedAttributes", {
        get: function () {
            return ['name', 'active', 'value', 'inline', 'key', 'group'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchFilterItem.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    RHDPSearchFilterItem.prototype._updateFacet = function (e) {
        this.bounce = true;
        if (this.inline) {
            if (e.target['className'].indexOf('clearItem') >= 0) {
                this.active = !this.active;
            }
        }
        else {
            this.active = !this.active;
        }
    };
    RHDPSearchFilterItem.prototype._checkParams = function (e) {
        var _this = this;
        var chk = false;
        if (e.detail && e.detail.filters) {
            Object.keys(e.detail.filters).forEach(function (group) {
                e.detail.filters[group].forEach(function (facet) {
                    if (group === _this.group) {
                        if (facet === _this.key) {
                            chk = true;
                            _this.bubble = false;
                            _this.active = true;
                            _this.dispatchEvent(new CustomEvent('filter-item-init', { detail: { facet: _this }, bubbles: _this.bubble }));
                        }
                    }
                });
            });
        }
        if (!chk) {
            this.bubble = false;
            this.active = false;
        }
    };
    RHDPSearchFilterItem.prototype._checkChange = function (e) {
        if (e.detail && e.detail.facet) {
            if (!this.bounce) {
                if (this.group === e.detail.facet.group && this.key === e.detail.facet.key) {
                    this.bubble = false;
                    this.active = e.detail.facet.active;
                }
            }
            this.bubble = true;
            this.bounce = false;
        }
    };
    RHDPSearchFilterItem.prototype._clearFilters = function (e) {
        this.bubble = false;
        this.bounce = false;
        this.active = false;
    };
    return RHDPSearchFilterItem;
}(HTMLElement));
customElements.define('rhdp-search-filter-item', RHDPSearchFilterItem);
// import {RHDPSearchFilterGroup} from './rhdp-search-filter-group';
// import {RHDPSearchFilterItem} from './rhdp-search-filter-item';
var RHDPSearchFilters = (function (_super) {
    __extends(RHDPSearchFilters, _super);
    function RHDPSearchFilters() {
        var _this = _super.call(this) || this;
        _this._type = '';
        _this._title = 'Filter By';
        _this._toggle = false;
        _this.modalTemplate = function (string, title) {
            return "<div class=\"cover\" id=\"cover\">\n            <div class=\"title\">" + title + " <a href=\"#\" class=\"cancel\" id=\"cancel\">Close</a></div>\n            <div class=\"groups\">\n            </div>\n            <div class=\"footer\">\n            <a href=\"#\" class=\"clearFilters\">Clear Filters</a> \n            <a href=\"#\" class=\"applyFilters\">Apply</a>\n            </div>\n        </div>";
        };
        _this.activeTemplate = function (strings, title) {
            return "<div class=\"active-type\">\n        <strong>" + title + "</strong>\n        <div class=\"activeFilters\"></div>\n        <a href=\"#\" class=\"clearFilters\">Clear Filters</a>\n      </div>";
        };
        _this.template = function (strings, title) {
            return "<a class=\"showBtn\">Show Filters</a>\n        <div class=\"control\" id=\"control\">\n            <div class=\"title\">" + title + "</div>\n            <div class=\"groups\">\n            </div>\n        </div>";
        };
        _this._toggleModal = _this._toggleModal.bind(_this);
        _this._clearFilters = _this._clearFilters.bind(_this);
        _this._addFilters = _this._addFilters.bind(_this);
        _this._checkActive = _this._checkActive.bind(_this);
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
                window.scrollTo(0, 0);
                document.body.style.overflow = 'hidden';
                this.style.height = window.innerHeight + 'px';
            }
            else {
                this.querySelector('.cover').className = 'cover';
                document.body.style.overflow = 'auto';
            }
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchFilters.prototype.connectedCallback = function () {
        var _this = this;
        if (this.type === 'active') {
            this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.activeTemplate(_a, this.title));
            top.addEventListener('filter-item-change', this._checkActive);
            top.addEventListener('filter-item-init', this._checkActive);
            top.addEventListener('search-complete', this._checkActive);
            top.addEventListener('params-ready', this._checkActive);
            top.addEventListener('clear-filters', this._clearFilters);
            this._addFilters();
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
            switch (e.target['className']) {
                case 'showBtn':
                case 'cancel':
                case 'applyFilters':
                    e.preventDefault();
                    _this.dispatchEvent(new CustomEvent('toggle-modal', {
                        bubbles: true
                    }));
                    break;
                case 'clearFilters':
                    e.preventDefault();
                    _this.dispatchEvent(new CustomEvent('clear-filters', {
                        bubbles: true
                    }));
                    break;
                case 'more':
                    e.preventDefault();
                    break;
            }
        });
        //top.addEventListener('clear-filters', this._clearFilters);
        top.addEventListener('toggle-modal', this._toggleModal);
        var _a, _b, _c;
    };
    Object.defineProperty(RHDPSearchFilters, "observedAttributes", {
        get: function () {
            return ['type', 'title', 'toggle'];
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
            var group = new RHDPSearchFilterGroup(), groupInfo = groups[i], groupNode = group.querySelector('.group'), primaryFilters = group.querySelector('.primary'), secondaryFilters = group.querySelector('.secondary'), len_1 = groupInfo.items ? groupInfo.items.length : 0;
            if (len_1 <= 5) {
                groupNode.removeChild(groupNode.lastChild);
            }
            for (var j = 0; j < len_1; j++) {
                var item = new RHDPSearchFilterItem();
                item.name = groupInfo.items[j].name;
                item.value = groupInfo.items[j].value;
                item.active = groupInfo.items[j].active;
                item.key = groupInfo.items[j].key;
                item.group = groupInfo.key;
                if (j < 5) {
                    primaryFilters.appendChild(item);
                }
                else {
                    secondaryFilters.appendChild(item);
                }
            }
            group.key = groupInfo.key;
            group.name = groupInfo.name;
            this.querySelector('.groups').appendChild(group);
        }
    };
    RHDPSearchFilters.prototype._checkActive = function (e) {
        if (e.detail) {
            if (e.detail.facet) {
                this.style.display = e.detail.facet.active ? 'block' : this.style.display;
            }
            else {
                var chk = this.querySelectorAll('rhdp-search-filter-item[active]');
                if (chk.length > 0) {
                    this.style.display = 'block';
                }
                else {
                    this.style.display = 'none';
                }
            }
        }
    };
    RHDPSearchFilters.prototype._initActive = function (e, group_key, item) {
        if (e.detail && e.detail.filters) {
            //console.log(e.detail.filters);
            Object.keys(e.detail.filters).forEach(function (group) {
                e.detail.filters[group].forEach(function (facet) {
                    if (group === group_key) {
                        if (facet === item.key) {
                            return true;
                        }
                    }
                });
            });
        }
        return false;
    };
    RHDPSearchFilters.prototype._addFilters = function () {
        var groups = this.filters.facets;
        for (var i = 0; i < groups.length; i++) {
            var items = groups[i].items;
            for (var j = 0; j < items.length; j++) {
                var item = new RHDPSearchFilterItem();
                item.name = items[j].name;
                item.value = items[j].value;
                item.inline = true;
                item.bubble = false;
                item.key = items[j].key;
                item.group = groups[i].key;
                this.querySelector('.activeFilters').appendChild(item);
            }
        }
        // if (this.type === 'active') {
        //     this._checkActive();
        // }
    };
    RHDPSearchFilters.prototype._toggleModal = function (e) {
        if (this.type === 'modal') {
            this.toggle = !this.toggle;
        }
    };
    RHDPSearchFilters.prototype.applyFilters = function () {
        this.dispatchEvent(new CustomEvent('apply-filters', {
            bubbles: true
        }));
    };
    RHDPSearchFilters.prototype._clearFilters = function (e) {
        this.style.display = 'none';
    };
    return RHDPSearchFilters;
}(HTMLElement));
customElements.define('rhdp-search-filters', RHDPSearchFilters);
var RHDPSearchOneBox = (function (_super) {
    __extends(RHDPSearchOneBox, _super);
    function RHDPSearchOneBox() {
        var _this = _super.call(this) || this;
        _this._term = '';
        _this._url = '../rhdp-apps/onebox/onebox.json';
        _this._mock = false;
        _this.slotTemplate = function (strings, slot, id) {
            return "" + (slot && slot.url && slot.text ? "<li><a href=\"" + slot.url + "?onebox=" + id + "\">" + _this.getIcon(slot.icon) + slot.text + "</a></li>" : '');
        };
        _this.template = function (strings, feature) {
            return "<div>\n            " + (feature.heading && feature.heading.url && feature.heading.text ? "<h4><a href=\"" + feature.heading.url + "\">" + feature.heading.text + "</a></h4>" : '') + "\n            " + (feature.details ? "<p>" + feature.details + "</p>" : '') + "\n            " + (feature.button && feature.button.url && feature.button.text ? "<a href=\"" + feature.button.url + "?onebox=" + feature.id + "\" class=\"button medium-cta blue\">" + feature.button.text + "</a>" : '') + "\n            " + (feature.slots && feature.slots.length > 0 ? "<ul class=\"slots\">\n                " + feature.slots.map(function (slot) {
                return (_a = ["", "", ""], _a.raw = ["", "", ""], _this.slotTemplate(_a, slot, feature.id));
                var _a;
            }).join('') + "\n            </ul>" : '') + "\n        </div>";
        };
        _this._termChange = _this._termChange.bind(_this);
        return _this;
    }
    Object.defineProperty(RHDPSearchOneBox.prototype, "term", {
        get: function () {
            if ((this._term === null) || (this._term === '')) {
                return this._term;
            }
            else {
                return this._term.replace(/(<([^>]+)>)/ig, '');
            }
        },
        set: function (val) {
            if (this._term === val)
                return;
            this._term = val;
            this.setAttribute('term', this._term);
            this.feature = this.getFeature();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchOneBox.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (val) {
            if (this._url === val)
                return;
            this._url = val;
            this.setAttribute('url', this._url);
            this.getData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchOneBox.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (val) {
            if (this._data === val)
                return;
            this._data = val;
            this.feature = this.getFeature();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchOneBox.prototype, "feature", {
        get: function () {
            return this._feature;
        },
        set: function (val) {
            if (this._feature === val)
                return;
            this._feature = val;
            this.innerHTML = this.feature ? (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this.feature)) : '';
            var _a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchOneBox.prototype, "mock", {
        get: function () {
            return this._mock;
        },
        set: function (val) {
            if (this._mock === val)
                return;
            this._mock = val;
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchOneBox.prototype.connectedCallback = function () {
        this.getData();
        top.addEventListener('term-change', this._termChange);
        top.addEventListener('params-ready', this._termChange);
    };
    Object.defineProperty(RHDPSearchOneBox, "observedAttributes", {
        get: function () {
            return ['term', 'url', 'mock'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchOneBox.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    RHDPSearchOneBox.prototype._termChange = function (e) {
        if (e.detail && e.detail.term && e.detail.term.length > 0) {
            this.term = e.detail.term;
        }
        else {
            this.term = '';
        }
    };
    RHDPSearchOneBox.prototype.getData = function () {
        var _this = this;
        if (this.mock || this.data) {
            return this.data;
        }
        else {
            var fInit = {
                method: 'GET',
                headers: new Headers(),
                mode: 'cors',
                cache: 'default'
            };
            fetch(this.url, fInit)
                .then(function (resp) { return resp.json(); })
                .then(function (data) {
                _this.data = data;
            });
        }
    };
    RHDPSearchOneBox.prototype.getFeature = function () {
        var len = this.data && this.data['features'] ? this.data['features'].length : 0, f;
        for (var i = 0; i < len; i++) {
            if (this.data['features'][i].match.indexOf(this.term.toLowerCase()) >= 0) {
                f = this.data['features'][i];
            }
        }
        return f;
    };
    RHDPSearchOneBox.prototype.getIcon = function (name) {
        var icons = {
            icon_help: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><title>icon_help</title><path d="M20.15,2C27.779,2,33.0651,5.2419,33.0651,12.1723A8.6318,8.6318,0,0,1,28.0266,20.4c-4.1859,1.9935-5.2333,3.14-5.3836,6.0819H15.81c0-4.736,1.3966-7.6775,7.0319-10.2718,2.4928-1.1469,3.24-1.9447,3.24-3.7393,0-2.2939-1.693-3.64-5.9317-3.64-3.792,0-6.4838,1.7945-8.729,4.1879L6.9349,7.7835A17.8438,17.8438,0,0,1,20.15,2M19.253,29.5248a4.2376,4.2376,0,1,1-4.2386,4.2366,4.2986,4.2986,0,0,1,4.2386-4.2366M20.15,1A18.8975,18.8975,0,0,0,6.211,7.0936a1,1,0,0,0-.0354,1.3406L10.6619,13.67a1,1,0,0,0,.7369.3491l.0225,0a1,1,0,0,0,.7293-.3158c2.5121-2.6779,4.9793-3.8721,8-3.8721,4.9317,0,4.9317,1.85,4.9317,2.64,0,1.167-.2291,1.7134-2.6579,2.8308-6.34,2.9189-7.6139,6.442-7.6139,11.18a1,1,0,0,0,1,1h6.833a1,1,0,0,0,.9987-.949c.121-2.3688.7339-3.2866,4.8148-5.23a9.61,9.61,0,0,0,5.6085-9.13C34.0651,5.0722,28.9933,1,20.15,1ZM19.253,28.5248a5.2376,5.2376,0,1,0,5.2386,5.2366,5.3078,5.3078,0,0,0-5.2386-5.2366Z"/></svg>',
            icon_helloworld: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.0005 38.0015"><title>icon_helloworld</title><path d="M14.0642,7.3037a.1761.1761,0,0,0-.1724-.0852l-3.5192.3888a.1775.1775,0,0,0-.14.0974.1751.1751,0,0,0,.0083.1709l.5161.853A14.6794,14.6794,0,0,0,6.9885,13.42a.5192.5192,0,0,0,.2284.6984.5112.5112,0,0,0,.2345.0563.519.519,0,0,0,.4639-.2847,13.6444,13.6444,0,0,1,3.3873-4.2595l.4622.7639a.1749.1749,0,0,0,.1471.0874.1822.1822,0,0,0,.1525-.0778L14.0588,7.496a.1788.1788,0,0,0,.0061-.192Z" transform="translate(-1 -1)"/><path d="M26.0891,7.9374a13.6292,13.6292,0,0,1,4.26,3.3871l-.7639.4621a.1747.1747,0,0,0-.0874.1471.182.182,0,0,0,.0778.1525l2.9084,1.9945a.1788.1788,0,0,0,.192.0061l0-.0007a.176.176,0,0,0,.0851-.1724l-.3888-3.5192a.1776.1776,0,0,0-.0974-.14.1751.1751,0,0,0-.1709.0084l-.8532.5162A14.6719,14.6719,0,0,0,26.559,7.0106a.52.52,0,1,0-.47.9268Z" transform="translate(-1 -1)"/><path d="M32.741,25.8826a.5183.5183,0,0,0-.6984.2284A13.64,13.64,0,0,1,28.6552,30.37l-.4623-.764a.1748.1748,0,0,0-.1471-.0874.1822.1822,0,0,0-.1526.0778l-1.9944,2.9084a.1787.1787,0,0,0-.0061.192l.0007,0a.176.176,0,0,0,.1724.0851l3.5192-.3888a.1776.1776,0,0,0,.14-.0974.1752.1752,0,0,0-.0083-.1709l-.5161-.853a14.6829,14.6829,0,0,0,3.7685-4.6916A.5192.5192,0,0,0,32.741,25.8826Z" transform="translate(-1 -1)"/><path d="M4.7816,17.938v.9587h.92v3.7573h1.481V17.197H5.92C5.7643,17.704,5.4836,17.8989,4.7816,17.938Z" transform="translate(-1 -1)"/><path d="M35.244,19.7464a1.1146,1.1146,0,0,0,.7253-1.0679c0-1.1536-.8735-1.5673-2.183-1.5673a3.304,3.304,0,0,0-2.1124.71l.7172.9821a2.1842,2.1842,0,0,1,1.3562-.4674c.538,0,.7562.1558.7562.4441,0,.3588-.1558.46-.6314.46h-.7014v1.177h.7872c.5532,0,.7715.14.7715.5223,0,.3741-.2649.5532-.8963.5532a2.49,2.49,0,0,1-1.5511-.569l-.78.9821a3.4268,3.4268,0,0,0,2.3.8344c1.481,0,2.3931-.5537,2.3931-1.8165A1.1471,1.1471,0,0,0,35.244,19.7464Z" transform="translate(-1 -1)"/><path d="M21.02,6.4467c1.0445-.4837,1.2942-.92,1.2942-1.6373,0-.99-.71-1.5358-2.0657-1.5358a4.1094,4.1094,0,0,0-2.3388.71l.6938,1.1151a2.8789,2.8789,0,0,1,1.6216-.5537c.4365,0,.608.1325.608.3741,0,.2182-.0858.304-.6629.5613a3.3785,3.3785,0,0,0-2.2764,3.3366h4.4593V7.5846H19.508C19.6252,7.2573,19.9292,6.9532,21.02,6.4467Z" transform="translate(-1 -1)"/><path d="M21.5569,30.9144H20.06L17.1215,34.29V35.397h3.0793v.9745h1.3562v-.9354h.7019V34.1576h-.7019ZM20.2008,33.62v.538h-.4055c-.3741,0-.7481.0076-1.0212.0233a9.1978,9.1978,0,0,0,.7172-.7953l.0782-.0934a8.66,8.66,0,0,0,.6547-.85C20.2084,32.7,20.2008,33.3,20.2008,33.62Z" transform="translate(-1 -1)"/><path d="M6.5184,14.6629c-.0662-.0029-.1421-.0045-.2175-.0045a5.3421,5.3421,0,0,0-.1365,10.681c.0543.0023.1168.0031.1794.0031a5.3413,5.3413,0,0,0,.1746-10.68Zm-.1746,9.64c-.0482,0-.0964-.0005-.1452-.0025a4.3027,4.3027,0,0,1,.1022-8.6027q.0911,0,.183.0039a4.3018,4.3018,0,0,1-.14,8.6013Z" transform="translate(-1 -1)"/><path d="M33.8363,14.6629c-.0535-.0023-.1164-.0031-.1786-.0031a5.3413,5.3413,0,0,0-.1751,10.68c.0548.0023.1177.0031.1807.0031a5.3413,5.3413,0,0,0,.173-10.68Zm2.7626,8.4794a4.2718,4.2718,0,0,1-2.9357,1.1607c-.0487,0-.0974-.0005-.1467-.0025a4.3018,4.3018,0,0,1,.1411-8.6013c.0477,0,.0959.0005.1441.0025a4.3022,4.3022,0,0,1,2.7971,7.4406Z" transform="translate(-1 -1)"/><path d="M20.1774,1.0044C20.1115,1.0016,20.0362,1,19.9614,1A5.3428,5.3428,0,0,0,16.1,9.9926a5.3041,5.3041,0,0,0,3.7236,1.6883c.0548.0023.1177.0031.1807.0031a5.3413,5.3413,0,0,0,.1728-10.68ZM22.94,9.4839a4.27,4.27,0,0,1-2.9352,1.1607c-.0487,0-.0974-.0005-.1467-.0025a4.3026,4.3026,0,0,1,.1036-8.6026q.09,0,.1817.0038A4.3018,4.3018,0,0,1,22.94,9.4839Z" transform="translate(-1 -1)"/><path d="M20.1776,28.3214c-.0657-.0029-.1416-.0045-.2171-.0045a5.3423,5.3423,0,0,0-.1371,10.6815c.0535.0023.1164.0031.1786.0031a5.3415,5.3415,0,0,0,.1756-10.68Zm-.1756,9.6407c-.0477,0-.0959-.0005-.1441-.0025a4.3022,4.3022,0,0,1-2.7971-7.4406,4.2219,4.2219,0,0,1,2.9-1.1627c.0606,0,.1216.0013.1826.0039a4.3021,4.3021,0,0,1-.1411,8.6018Z" transform="translate(-1 -1)"/></svg>',
            icon_docsandapi: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve"><g><g><g><path d="M37.5,19.3c0-0.1-0.1-0.2-0.2-0.3l-10.1-6.3l-8.6-9.6c-0.1-0.2-0.4-0.2-0.5,0l-2.7,2.4L13,4c-0.2-0.1-0.5-0.1-0.7,0.2L7,12.7l-3.1,2.7c-0.1,0.1-0.1,0.2-0.1,0.3c0,0.1,0,0.2,0.1,0.3l0.6,0.7l-1.9,3c-0.1,0.1-0.1,0.2-0.1,0.4c0,0.1,0.1,0.2,0.2,0.3l11.3,7l8.5,9.5c0.1,0.1,0.2,0.1,0.3,0.1c0.1,0,0.2,0,0.2-0.1l2.7-2.3l1.3,0.8c0.1,0.1,0.2,0.1,0.3,0.1c0.2,0,0.3-0.1,0.4-0.2l3.3-5.2l6.3-5.5c0.1-0.1,0.1-0.2,0.1-0.3c0-0.1,0-0.2-0.1-0.3l-1.5-1.7l1.7-2.7C37.5,19.6,37.5,19.5,37.5,19.3z M12.9,5.1l1.6,1l-4.9,4.3L12.9,5.1z M3.7,19.8l1.5-2.4l6.6,7.4L3.7,19.8z M27.1,34.3l-0.6-0.4l1.8-1.6L27.1,34.3z M22.8,36.1L14,26.2l0,0l0,0L4.7,15.7L18.3,3.9l9,10.2l0,0l0,0l9.1,10.2L22.8,36.1z M35.1,21.6l-5.5-6.2l6.8,4.2L35.1,21.6z"/><path d="M19.6,12c-0.1-0.2-0.4-0.2-0.5,0l-6.2,5.4c-0.1,0.1-0.1,0.2-0.1,0.3c0,0.1,0,0.2,0.1,0.3l6,6.7c0.1,0.2,0.4,0.2,0.5,0l1.5-1.3l2.6,2.9c0.1,0.1,0.2,0.1,0.3,0.1c0.1,0,0.2,0,0.2-0.1l4.5-3.9c0.1-0.1,0.1-0.2,0.1-0.3c0-0.1,0-0.2-0.1-0.3L19.6,12zM23.7,25.6l-2.6-2.9c-0.1-0.1-0.2-0.1-0.3-0.1c-0.1,0-0.2,0-0.2,0.1l-1.5,1.3l-5.5-6.2l5.7-5l8.3,9.3L23.7,25.6z"/><path d="M30.9,25.2c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0c0.1-0.1,0.1-0.2,0-0.3l-2-2.3c-0.1-0.1-0.2-0.1-0.3,0c-0.1,0.1-0.1,0.2,0,0.3L30.9,25.2z"/><path d="M29.2,21.7c0,0,0.1,0,0.1,0l1.4-1.2c0.1-0.1,0.1-0.2,0-0.3c-0.1-0.1-0.2-0.1-0.3,0l-1.4,1.2c-0.1,0.1-0.1,0.2,0,0.3C29.1,21.7,29.2,21.7,29.2,21.7z"/><path d="M18.7,11.5c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0c0.1-0.1,0.1-0.2,0-0.3L17,9c-0.1-0.1-0.2-0.1-0.3,0c-0.1,0.1-0.1,0.2,0,0.3L18.7,11.5z"/><path d="M12.5,16.8l-2-2.3c-0.1-0.1-0.2-0.1-0.3,0c-0.1,0.1-0.1,0.2,0,0.3l2,2.3c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0C12.6,17,12.6,16.9,12.5,16.8z"/><path d="M20.3,11.7c0,0,0.1,0,0.1,0l1.4-1.2c0.1-0.1,0.1-0.2,0-0.3c-0.1-0.1-0.2-0.1-0.3,0l-1.4,1.2c-0.1,0.1-0.1,0.2,0,0.3C20.1,11.6,20.2,11.7,20.3,11.7z"/><path d="M24.3,27c-0.1-0.1-0.2-0.1-0.3,0c-0.1,0.1-0.1,0.2,0,0.3l2,2.3c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0c0.1-0.1,0.1-0.2,0-0.3L24.3,27z"/><path d="M23,26.7l-1.4,1.2c-0.1,0.1-0.1,0.2,0,0.3c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0l1.4-1.2c0.1-0.1,0.1-0.2,0-0.3C23.2,26.6,23.1,26.6,23,26.7z"/><path d="M18.3,24.9l-1.4,1.2c-0.1,0.1-0.1,0.2,0,0.3c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0l1.4-1.2c0.1-0.1,0.1-0.2,0-0.3C18.5,24.8,18.4,24.8,18.3,24.9z"/><path d="M12.3,18.1l-1.4,1.2c-0.1,0.1-0.1,0.2,0,0.3c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0l1.4-1.2c0.1-0.1,0.1-0.2,0-0.3C12.5,18.1,12.4,18.1,12.3,18.1z"/></g></g></g></svg>'
        };
        return icons[name];
    };
    return RHDPSearchOneBox;
}(HTMLElement));
customElements.define('rhdp-search-onebox', RHDPSearchOneBox);
// import {RHDPSearchFilterItem} from './rhdp-search-filter-item';
var RHDPSearchQuery = (function (_super) {
    __extends(RHDPSearchQuery, _super);
    function RHDPSearchQuery() {
        var _this = _super.call(this) || this;
        _this._limit = 10;
        _this._from = 0;
        _this._sort = 'relevance';
        _this._valid = true;
        _this.urlTemplate = function (strings, url, term, from, limit, sort, types, tags, sys_types) {
            var order = '';
            if (sort === 'most-recent') {
                order = '&newFirst=true';
            }
            return url + "?tags_or_logic=true&filter_out_excluded=true&from=" + from + order + "&query=" + term + "&query_highlight=true&size" + limit + "=true" + types + tags + sys_types;
        };
        _this._changeAttr = _this._changeAttr.bind(_this);
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
    Object.defineProperty(RHDPSearchQuery.prototype, "activeFilters", {
        get: function () {
            return this._activeFilters;
        },
        set: function (val) {
            if (this._activeFilters === val)
                return;
            this._activeFilters = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchQuery.prototype, "from", {
        get: function () {
            return this._from;
        },
        set: function (val) {
            if (this._from === val)
                return;
            this._from = val;
            this.setAttribute('from', val.toString());
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
            this.setAttribute('limit', val.toString());
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
            this.setAttribute('sort', val);
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
            this.from = this.results && this.results.hits && typeof this.results.hits.hits !== 'undefined' ? this.from + this.results.hits.hits.length : 0;
            this.dispatchEvent(new CustomEvent('search-complete', {
                detail: {
                    term: this.term,
                    filters: this.activeFilters,
                    sort: this.sort,
                    limit: this.limit,
                    from: this.from,
                    results: this.results,
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
            this.setAttribute('term', val.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchQuery.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (val) {
            if (this._url === val)
                return;
            this._url = val;
            this.setAttribute('url', val.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchQuery.prototype, "valid", {
        get: function () {
            return this._valid;
        },
        set: function (val) {
            if (this._valid === val)
                return;
            this._valid = val;
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchQuery.prototype.filterString = function (facets) {
        var len = facets.length, filterArr = [];
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < facets[i].items.length; j++) {
                if (facets[i].items[j].active) {
                    var idx = 0;
                    while (idx < facets[i].items[j].value.length) {
                        filterArr.push(facets[i].items[j].value[idx]);
                        idx = idx + 1;
                    }
                }
            }
        }
        return filterArr.join(', ');
    };
    RHDPSearchQuery.prototype.connectedCallback = function () {
        top.addEventListener('params-ready', this._changeAttr);
        top.addEventListener('term-change', this._changeAttr);
        top.addEventListener('filter-item-change', this._changeAttr);
        top.addEventListener('sort-change', this._changeAttr);
        top.addEventListener('clear-filters', this._changeAttr);
        //top.window.addEventListener('popstate', e => { this.results = undefined; });
        top.addEventListener('load-more', this._changeAttr);
    };
    Object.defineProperty(RHDPSearchQuery, "observedAttributes", {
        get: function () {
            return ['term', 'sort', 'limit', 'results', 'url'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchQuery.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    RHDPSearchQuery.prototype._setFilters = function (item) {
        var _this = this;
        var add = item.active;
        if (add) {
            this.activeFilters[item.group] = this.activeFilters[item.group] || [];
            this.activeFilters[item.group].push(item.key);
        }
        else {
            Object.keys(this.activeFilters).forEach(function (group) {
                if (group === item.group) {
                    var idx = _this.activeFilters[group].indexOf(item.key);
                    if (idx >= 0) {
                        _this.activeFilters[group].splice(idx, 1);
                        if (_this.activeFilters[group].length === 0) {
                            delete _this.activeFilters[group];
                        }
                    }
                }
            });
        }
    };
    RHDPSearchQuery.prototype._changeAttr = function (e) {
        switch (e.type) {
            case 'term-change':
                if (e.detail && e.detail.term && e.detail.term.length > 0) {
                    this.term = e.detail.term;
                }
                else {
                    this.term = '';
                }
                this.from = 0;
                this.search();
                break;
            case 'filter-item-change'://detail.facet
                if (e.detail && e.detail.facet) {
                    this._setFilters(e.detail.facet);
                }
                this.from = 0;
                this.search();
                // Wait for params-ready event
                break;
            case 'sort-change':// detail.sort
                if (e.detail && e.detail.sort) {
                    this.sort = e.detail.sort;
                }
                this.from = 0;
                this.search();
                break;
            case 'load-more':// detail.qty
                this.search();
                break;
            case 'clear-filters':
                this.activeFilters = {};
                this.search();
                break;
            case 'params-ready':
                if (e.detail && e.detail.term) {
                    this.term = e.detail.term;
                }
                if (e.detail && e.detail.sort) {
                    this.sort = e.detail.sort;
                }
                if (e.detail && e.detail.filters) {
                    this.activeFilters = e.detail.filters;
                }
                this.from = 0;
                if (Object.keys(e.detail.filters).length > 0 || e.detail.term !== null || e.detail.sort !== null || e.detail.qty !== null) {
                    this.search();
                }
                break;
        }
    };
    // _checkValid(e) {
    //     let obj = e.detail;
    //     this.valid = ;
    // }
    RHDPSearchQuery.prototype.search = function () {
        var _this = this;
        this.dispatchEvent(new CustomEvent('search-start', { bubbles: true }));
        if (Object.keys(this.activeFilters).length > 0 || (this.term !== null && this.term !== '' && typeof this.term !== 'undefined')) {
            var qURL_1 = new URL(this.url);
            qURL_1.searchParams.set('tags_or_logic', 'true');
            qURL_1.searchParams.set('filter_out_excluded', 'true');
            qURL_1.searchParams.set('from', this.from.toString());
            if (this.sort === 'most-recent') {
                qURL_1.searchParams.set('newFirst', 'true');
            }
            qURL_1.searchParams.set('query', this.term || '');
            qURL_1.searchParams.set('query_highlight', 'true');
            qURL_1.searchParams.set('size' + this.limit.toString(), 'true');
            if (this.activeFilters) {
                Object.keys(this.activeFilters).forEach(function (filtergroup) {
                    _this.filters.facets.forEach(function (group) {
                        if (group.key === filtergroup) {
                            group.items.forEach(function (facet) {
                                if (_this.activeFilters[group.key].indexOf(facet.key) >= 0) {
                                    facet.value.forEach(function (fval) {
                                        qURL_1.searchParams.append(group.key, fval);
                                    });
                                }
                            });
                        }
                    });
                });
            }
            //console.log(qURL.toString());
            fetch(qURL_1.toString()) //this.urlTemplate`${this.url}${this.term}${this.from}${this.limit}${this.sort}${this.filters}`)
                .then(function (resp) { return resp.json(); })
                .then(function (data) {
                _this.results = data;
            });
        }
        else {
            this.dispatchEvent(new CustomEvent('search-complete', { detail: { invalid: true }, bubbles: true }));
        }
    };
    return RHDPSearchQuery;
}(HTMLElement));
customElements.define('rhdp-search-query', RHDPSearchQuery);
var RHDPSearchResultCount = (function (_super) {
    __extends(RHDPSearchResultCount, _super);
    function RHDPSearchResultCount() {
        var _this = _super.call(this) || this;
        _this._count = 0;
        _this._term = '';
        _this._loading = true;
        _this.template = function (strings, count, term) {
            return count + " results found for " + term.replace('<', '&lt;').replace('>', '&gt;');
        };
        _this._setText = _this._setText.bind(_this);
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchResultCount.prototype, "term", {
        get: function () {
            return this._term;
        },
        set: function (val) {
            val = decodeURI(val).replace('<', '&lt;').replace('>', '&gt;');
            if (this._term === val)
                return;
            this._term = val;
            this.setAttribute('term', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchResultCount.prototype, "loading", {
        get: function () {
            return this._loading;
        },
        set: function (val) {
            if (this._loading === val)
                return;
            this._loading = val;
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchResultCount.prototype.connectedCallback = function () {
        var _this = this;
        top.addEventListener('params-ready', this._setText);
        top.addEventListener('search-start', function (e) { _this.loading = true; _this._setText(e); });
        top.addEventListener('search-complete', function (e) { _this.loading = false; _this._setText(e); });
        //top.addEventListener('term-change', this._setText);
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
        this.innerHTML = this.count + " results found " + (this.term ? "for " + this.term : '');
    };
    RHDPSearchResultCount.prototype._setText = function (e) {
        if (e.detail) {
            if (typeof e.detail.invalid === 'undefined') {
                if (e.detail.term && e.detail.term.length > 0) {
                    this.term = e.detail.term;
                }
                else {
                    this.term = '';
                }
                if (e.detail.results && e.detail.results.hits && e.detail.results.hits.total) {
                    this.count = e.detail.results.hits.total;
                }
                else {
                    this.count = 0;
                }
                if (!this.loading) {
                    this.innerHTML = this.count + " results found " + (this.term ? "for " + this.term : '');
                }
            }
            else {
                this.term = '';
                this.count = 0;
                this.innerHTML = '';
            }
        }
        else {
            this.term = '';
            this.count = 0;
            this.innerHTML = '';
        }
    };
    return RHDPSearchResultCount;
}(HTMLElement));
customElements.define('rhdp-search-result-count', RHDPSearchResultCount);
var RHDPSearchResult = (function (_super) {
    __extends(RHDPSearchResult, _super);
    function RHDPSearchResult() {
        var _this = _super.call(this) || this;
        _this._url = ['', ''];
        _this.template = function (strings, url, title, kind, created, description, premium, thumbnail) {
            return "<div>\n            <h4>" + (url ? "<a href=\"" + url + "\">" + title + "</a>" : title) + "</h4>\n            <p " + (premium ? 'class="result-info subscription-required" data-tooltip="" title="Subscription Required" data-options="disable-for-touch:true"' : 'class="result-info"') + ">\n                <span class=\"caps\">" + kind + "</span>\n                " + (created ? "- <rh-datetime datetime=\"" + created + "\" type=\"local\" day=\"numeric\" month=\"long\" year=\"numeric\">" + created + "</rh-datetime>" : '') + "\n            </p>\n            <p class=\"result-description\">" + description + "</p>\n        </div>\n        " + (thumbnail ? "<div class=\"thumb\"><img src=\"" + thumbnail.replace('http:', 'https:') + "\"></div>" : '');
        };
        return _this;
    }
    Object.defineProperty(RHDPSearchResult.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (val) {
            if (this._url === val)
                return;
            this._url = val;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(RHDPSearchResult.prototype, "premium", {
        get: function () {
            return this._premium;
        },
        set: function (val) {
            if (this._premium === val)
                return;
            this._premium = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchResult.prototype, "thumbnail", {
        get: function () {
            return this._thumbnail;
        },
        set: function (val) {
            if (this._thumbnail === val)
                return;
            this._thumbnail = val;
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
            this.computeURL(val);
            this.computePremium(val);
            this.computeThumbnail(val);
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
        this.innerHTML = (_a = ["", "", "", "", "", "", "", ""], _a.raw = ["", "", "", "", "", "", "", ""], this.template(_a, this.url, this.title, this.kind, this.created, this.description, this.premium, this.thumbnail));
        var _a;
    };
    RHDPSearchResult.prototype.computeThumbnail = function (result) {
        if (result.fields.thumbnail) {
            this.thumbnail = result.fields.thumbnail[0];
        }
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
            jbossdeveloper_archetype: 'Archetype',
            article: 'Article',
            blogpost: 'Blog Post',
            jbossdeveloper_bom: 'Bom',
            book: 'Book',
            cheatsheet: 'Cheat Sheet',
            demo: 'Demo',
            event: 'Event',
            forumthread: 'Forum Thread',
            jbossdeveloper_example: 'Demo',
            quickstart: 'Quickstart',
            quickstart_early_access: 'Demo',
            solution: 'Article',
            stackoverflow_thread: 'Stack Overflow',
            video: 'Video',
            webpage: 'Web Page',
            website: 'Web Page'
        };
        this.kind = map[kind] || 'Web Page';
    };
    RHDPSearchResult.prototype.computeCreated = function (result) {
        this.created = result.fields.sys_created && result.fields.sys_created.length > 0 ? result.fields.sys_created[0] : '';
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
        // Removes all HTML tags from description
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = description;
        description = tempDiv.innerText;
        this.description = description;
    };
    RHDPSearchResult.prototype.computeURL = function (result) {
        if (result.fields && result.fields.sys_type === 'book' && result.fields.field_book_url) {
            this.url = result.fields.field_book_url;
        }
        else {
            this.url = (result.fields && result.fields.sys_url_view) ? result.fields.sys_url_view : '';
        }
    };
    RHDPSearchResult.prototype.computePremium = function (result) {
        var premium = false;
        if (result._type === "rht_knowledgebase_article" || result._type === "rht_knowledgebase_solution") {
            premium = true;
        }
        this.premium = premium;
    };
    return RHDPSearchResult;
}(HTMLElement));
customElements.define('rhdp-search-result', RHDPSearchResult);
// import {RHDPSearchResult} from './rhdp-search-result';
var RHDPSearchResults = (function (_super) {
    __extends(RHDPSearchResults, _super);
    function RHDPSearchResults() {
        var _this = _super.call(this) || this;
        _this._more = false;
        _this._last = 0;
        _this._valid = true;
        _this.invalidMsg = document.createElement('div');
        _this.loadMore = document.createElement('div');
        _this.endOfResults = document.createElement('div');
        _this.loading = document.createElement('div');
        _this._renderResults = _this._renderResults.bind(_this);
        _this._setLoading = _this._setLoading.bind(_this);
        _this._checkValid = _this._checkValid.bind(_this);
        _this._clearResults = _this._clearResults.bind(_this);
        return _this;
    }
    Object.defineProperty(RHDPSearchResults.prototype, "results", {
        get: function () {
            return this._results;
        },
        set: function (val) {
            if (this._results === val)
                return;
            this._results = val;
            this._renderResults(false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchResults.prototype, "more", {
        get: function () {
            return this._more;
        },
        set: function (val) {
            if (this._more === val)
                return;
            this._more = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchResults.prototype, "last", {
        get: function () {
            return this._last;
        },
        set: function (val) {
            if (this._last === val)
                return;
            this._last = val ? val : 0;
            this.setAttribute('last', val.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchResults.prototype, "valid", {
        get: function () {
            return this._valid;
        },
        set: function (val) {
            if (this._valid === val)
                return;
            this._valid = val;
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchResults.prototype.connectedCallback = function () {
        var _this = this;
        this.invalidMsg.className = 'invalidMsg';
        this.invalidMsg.innerHTML = "<h4>Well, this is awkward. No search term was entered yet, so this page is a little empty right now.</h4>\n        <p>After you enter a search term in the box above, you will see the results displayed here. \n        You can also use the filters to select a content type, product or topic to see some results too. Try it out!</p>";
        this.endOfResults.innerHTML = '<p class="end-of-results">- End of Results -</p>';
        this.loadMore.className = 'moreBtn';
        this.loadMore.innerHTML = '<a class="moreBtn" href="#">Load More</a>';
        this.loading.className = 'loading';
        this.loadMore.addEventListener('click', function (e) {
            e.preventDefault();
            _this.dispatchEvent(new CustomEvent('load-more', {
                detail: {
                    from: _this.last
                },
                bubbles: true
            }));
        });
        top.addEventListener('search-complete', this._renderResults);
        top.addEventListener('search-start', this._setLoading);
        top.addEventListener('params-ready', this._checkValid);
        top.window.addEventListener('popstate', this._clearResults);
        this.addEventListener('load-more', function (e) {
            _this.more = true;
        });
    };
    RHDPSearchResults.prototype.addResult = function (result) {
        var item = new RHDPSearchResult();
        item.result = result;
        this.appendChild(item);
    };
    RHDPSearchResults.prototype._setLoading = function (e) {
        if (!this.more) {
            while (this.firstChild) {
                this.removeChild(this.firstChild);
            }
        }
        else {
            if (this.querySelector('.moreBtn')) {
                this.removeChild(this.loadMore);
            }
            if (this.querySelector('.invalidMsg')) {
                this.removeChild(this.invalidMsg);
            }
            this.more = false;
        }
        this.appendChild(this.loading);
    };
    RHDPSearchResults.prototype._renderResults = function (e) {
        if (this.querySelector('.loading')) {
            this.removeChild(this.loading);
        }
        if (e.detail && typeof e.detail.results !== 'undefined' && typeof e.detail.invalid === 'undefined') {
            this.addResults(e.detail.results);
        }
        else {
            while (this.firstChild) {
                this.removeChild(this.firstChild);
            }
            this.appendChild(this.invalidMsg);
        }
        this.dispatchEvent(new CustomEvent('results-loaded', {
            detail: { results: this.results },
            bubbles: true
        }));
    };
    RHDPSearchResults.prototype._clearResults = function (e) {
        this.results = undefined;
    };
    RHDPSearchResults.prototype._checkValid = function (e) {
        var obj = e.detail;
        this.valid = Object.keys(obj.filters).length > 0 || (obj.term !== null && obj.term !== '' && typeof obj.term !== 'undefined');
        if (!this.valid) {
            this.appendChild(this.invalidMsg);
        }
        else {
            if (this.querySelector('.invalidMsg')) {
                this.removeChild(this.invalidMsg);
            }
        }
    };
    RHDPSearchResults.prototype.addResults = function (results) {
        if (results && results.hits && results.hits.hits) {
            var hits = results.hits.hits;
            var l = hits.length;
            for (var i = 0; i < l; i++) {
                this.addResult(hits[i]);
            }
            this.last = this.last + l;
            if (this.last >= results.hits.total) {
                this.appendChild(this.endOfResults);
            }
            if (l > 0 && this.last < results.hits.total) {
                if (this.querySelector('.end-of-results')) {
                    this.removeChild(this.endOfResults);
                }
                this.appendChild(this.loadMore);
            }
            else {
                if (this.querySelector('.moreBtn')) {
                    this.removeChild(this.loadMore);
                }
                this.appendChild(this.endOfResults);
            }
        }
    };
    return RHDPSearchResults;
}(HTMLElement));
customElements.define('rhdp-search-results', RHDPSearchResults);
var RHDPSearchSortPage = (function (_super) {
    __extends(RHDPSearchSortPage, _super);
    function RHDPSearchSortPage() {
        var _this = _super.call(this) || this;
        _this.template = "<p>\n        <span>Sort results by</span>\n        <select>\n        <option value=\"relevance\">Relevance</option>\n        <option value=\"most-recent\">Most Recent</option>\n        </select>\n        </p>";
        _this._sortChange = _this._sortChange.bind(_this);
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
            this.setAttribute('sort', this._sort);
            this.querySelector('select').value = val;
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchSortPage.prototype.connectedCallback = function () {
        this.innerHTML = this.template;
        top.addEventListener('params-ready', this._sortChange);
        this.querySelector('select').onchange = this._sortChange;
    };
    Object.defineProperty(RHDPSearchSortPage, "observedAttributes", {
        get: function () {
            return ['sort'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchSortPage.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    RHDPSearchSortPage.prototype._sortChange = function (e) {
        if (e.detail && e.detail.sort) {
            this.sort = e.detail.sort;
        }
        else {
            if (e.target['options'] && typeof e.target['selectedIndex'] !== 'undefined') {
                this.sort = e.target['options'][e.target['selectedIndex']].value;
                this.dispatchEvent(new CustomEvent('sort-change', {
                    detail: {
                        sort: this.sort
                    },
                    bubbles: true
                }));
            }
        }
    };
    return RHDPSearchSortPage;
}(HTMLElement));
customElements.define('rhdp-search-sort-page', RHDPSearchSortPage);
var RHDPSearchURL = (function (_super) {
    __extends(RHDPSearchURL, _super);
    //history.pushState({}, `Red Hat Developer Program Search: ${this.term}`, `?q=${decodeURIComponent(this.term).replace(' ', '+')}`);
    function RHDPSearchURL() {
        var _this = _super.call(this) || this;
        _this._uri = new URL(window.location.href); // https://developers.redhat.com/search/?q=term+term1+term2&f=a+b+c&s=sort&r=100
        _this._term = _this.uri.searchParams.get('t');
        _this._filters = _this._setFilters(_this.uri.searchParams.getAll('f'));
        _this._sort = _this.uri.searchParams.get('s') || 'relevance';
        _this._qty = _this.uri.searchParams.get('r');
        _this._init = true;
        _this._changeAttr = _this._changeAttr.bind(_this);
        _this._popState = _this._popState.bind(_this);
        return _this;
    }
    Object.defineProperty(RHDPSearchURL.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        set: function (val) {
            if (this._uri === val)
                return;
            this._uri = val;
            // https://developers.redhat.com/search/?q=term+term1+term2&f=a~1+2&f=b~2&f=c~1+4&s=sort&r=100
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchURL.prototype, "term", {
        get: function () {
            return this._term;
        },
        set: function (val) {
            if (this._term === val)
                return;
            this._term = val;
            this.uri.searchParams.set('t', this._term);
            this.setAttribute('term', this.term);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchURL.prototype, "filters", {
        get: function () {
            return this._filters;
        },
        set: function (val) {
            var _this = this;
            this._filters = val;
            this.uri.searchParams.delete('f');
            Object.keys(this._filters).forEach(function (group) {
                _this.uri.searchParams.append('f', group + "~" + _this._filters[group].join(' '));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchURL.prototype, "sort", {
        get: function () {
            return this._sort;
        },
        set: function (val) {
            if (this._sort === val)
                return;
            this._sort = val;
            this.uri.searchParams.set('s', this._sort);
            this.setAttribute('sort', this._sort);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchURL.prototype, "qty", {
        get: function () {
            return this._qty;
        },
        set: function (val) {
            if (this._qty === val)
                return;
            this._qty = val;
            this.setAttribute('qty', this._sort);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchURL.prototype, "init", {
        get: function () {
            return this._init;
        },
        set: function (val) {
            if (this._init === val)
                return;
            this._init = val;
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchURL.prototype.connectedCallback = function () {
        //top.addEventListener('term-change', this._changeAttr);
        //top.addEventListener('filter-item-change', this._changeAttr);
        //top.addEventListener('sort-change', this._changeAttr);
        //top.addEventListener('load-more', this._changeAttr);
        top.addEventListener('search-complete', this._changeAttr);
        top.addEventListener('clear-filters', this._changeAttr);
        top.window.addEventListener('popstate', this._popState);
        // Ignoring tracking these for now
        // top.addEventListener('filter-group-toggle', this._changeAttr);
        // top.addEventListener('filter-group-more-toggle', this._changeAttr);
        this._paramsReady();
    };
    Object.defineProperty(RHDPSearchURL, "observedAttributes", {
        get: function () {
            return ['sort', 'term', 'qty'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchURL.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    RHDPSearchURL.prototype._popState = function (e) {
        this.uri = new URL(document.location.href); // https://developers.redhat.com/search/?q=term+term1+term2&f=a+b+c&s=sort&r=100
        this.term = this.uri.searchParams.get('t') || null;
        this.filters = this._setFilters(this.uri.searchParams.getAll('f'));
        this.sort = this.uri.searchParams.get('s');
        this.qty = this.uri.searchParams.get('r');
        this._paramsReady();
    };
    RHDPSearchURL.prototype._paramsReady = function () {
        this.dispatchEvent(new CustomEvent('params-ready', {
            detail: {
                term: this.term,
                filters: this.filters,
                sort: this.sort,
                qty: this.qty
            },
            bubbles: true
        }));
    };
    RHDPSearchURL.prototype._setFilters = function (filtersQS) {
        var filters = {};
        filtersQS.forEach(function (filter) {
            var kv = filter.split('~'), k = kv[0], v = kv[1].split(' ');
            filters[k] = v;
        });
        return filters;
    };
    RHDPSearchURL.prototype._changeAttr = function (e) {
        switch (e.type) {
            case 'clear-filters':
                this.uri.searchParams.delete('f');
                this.filters = {};
                break;
            case 'load-more':// detail.qty
                break;
            case 'search-complete':// build querystring params
                // Term Change
                if (e.detail && typeof e.detail.term !== 'undefined' && e.detail.term.length > 0) {
                    this.term = e.detail.term;
                }
                else {
                    this.term = '';
                    this.uri.searchParams.delete('t');
                }
                // Filter Change
                if (e.detail && e.detail.filters) {
                    this.filters = e.detail.filters;
                }
                // Sort Change
                if (e.detail && typeof e.detail.sort !== 'undefined') {
                    this.sort = e.detail.sort;
                }
        }
        if (e.detail && typeof e.detail.invalid === 'undefined') {
            history.pushState({}, "RHDP Search: " + (this.term ? this.term : ''), "" + this.uri.pathname + this.uri.search);
        }
        else {
            this.term = '';
            this.filters = {};
            this.sort = 'relevance';
            this.uri.searchParams.delete('t');
            this.uri.searchParams.delete('f');
            this.uri.searchParams.delete('s');
            history.replaceState({}, 'RHDP Search Error', "" + this.uri.pathname + this.uri.search);
        }
    };
    return RHDPSearchURL;
}(HTMLElement));
customElements.define('rhdp-search-url', RHDPSearchURL);
// import {RHDPSearchURL} from './rhdp-search-url';
// import {RHDPSearchQuery} from './rhdp-search-query';
// import {RHDPSearchBox} from './rhdp-search-box';
// import {RHDPSearchResultCount} from './rhdp-search-result-count';
// import {RHDPSearchFilters} from './rhdp-search-filters';
// import {RHDPSearchOneBox} from './rhdp-search-onebox';
// import {RHDPSearchResults} from './rhdp-search-results';
// import {RHDPSearchSortPage} from './rhdp-search-sort-page';
var RHDPSearchApp = (function (_super) {
    __extends(RHDPSearchApp, _super);
    function RHDPSearchApp() {
        var _this = _super.call(this) || this;
        _this._name = 'Search';
        _this.template = "<div class=\"row\">\n    <span class=\"search-outage-msg\"></span>\n    <div class=\"large-24 medium-24 small-24 columns searchpage-middle\">\n        <div class=\"row\">\n            <div class=\"large-24 medium-24 small-24 columns\">\n                <h2>" + _this.name + "</h2>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"large-6 medium-8 small-24 columns\"></div>\n            <div class=\"large-18 medium-16 small-24 columns\"></div>\n        </div>\n    </div></div>";
        _this.urlEle = new RHDPSearchURL();
        _this.query = new RHDPSearchQuery();
        _this.box = new RHDPSearchBox();
        _this.count = new RHDPSearchResultCount();
        _this.filters = new RHDPSearchFilters();
        _this.active = new RHDPSearchFilters();
        _this.modal = new RHDPSearchFilters();
        _this.onebox = new RHDPSearchOneBox();
        _this.results = new RHDPSearchResults();
        _this.sort = new RHDPSearchSortPage();
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
                        { key: 'bpmsuite', name: 'JBoss BPM Suite', value: ['bpmsuite'] },
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
                        { key: 'devops', name: 'DevOps', value: ['DevOps', 'CI', 'CD', 'Continuous Delivery'] },
                        { key: 'enterprise-java', name: 'Enterprise Java', value: ['ActiveMQ', 'AMQP', 'apache camel', 'Arquillian', 'Camel', 'CDI', 'CEP', 'CXF', 'datagrid', 'devstudio', 'Drools', 'Eclipse', 'fabric8', 'Forge', 'fuse', 'Hawkular', 'Hawtio', 'Hibernate', 'Hibernate ORM', 'Infinispan', 'iPaas', 'java ee', 'JavaEE', 'JBDS', 'JBoss', 'JBoss BPM Suite', 'Red Hat Decision Manager', 'JBoss Data Grid', 'jboss eap', 'JBoss EAP', ''] },
                        { key: 'iot', name: 'Internet of Things', value: ['IoT', 'Internet of Things'] },
                        { key: 'microservices', name: 'Microservices', value: ['Microservices', ' WildFly Swarm'] },
                        { key: 'mobile', name: 'Mobile', value: ['Mobile', 'Red Hat Mobile', 'RHMAP', 'Cordova', 'FeedHenry'] },
                        { key: 'web-and-api-development', name: 'Web and API Development', value: ['Web', 'API', 'HTML5', 'REST', 'Camel', 'Node.js', 'RESTEasy', 'JAX-RS', 'Tomcat', 'nginx', 'Rails', 'Drupal', 'PHP', 'Bottle', 'Flask', 'Laravel', 'Dancer', 'Zope', 'TurboGears', 'Sinatra', 'httpd', 'Passenger'] },
                    ]
                }
            ]
        };
        return _this;
        //this.toggleModal = this.toggleModal.bind(this);
        //this.updateFacets = this.updateFacets.bind(this);
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
    RHDPSearchApp.prototype.connectedCallback = function () {
        this.innerHTML = this.template;
        this.active.setAttribute('type', 'active');
        this.active.title = 'Active Filters:';
        this.modal.setAttribute('type', 'modal');
        this.modal.filters = this.filterObj;
        this.active.filters = this.filterObj;
        this.filters.filters = this.filterObj;
        this.query.filters = this.filterObj;
        //document.querySelector('.wrapper').appendChild(this.modal);
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
            return ['url', 'name'];
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
customElements.define('rhdp-search-app', RHDPSearchApp);
