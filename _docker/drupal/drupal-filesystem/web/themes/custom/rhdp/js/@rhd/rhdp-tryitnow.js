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
    var RHDPTryItNow, templateObject_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RHDPTryItNow = (function (_super) {
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
                    this.innerHTML = this.template(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""])), this.title, this.subtitle, this.buttonlink, this.icon, this.buttontext, this.buttonid);
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
            exports_1("default", RHDPTryItNow);
            window.customElements.define('rhdp-tryitnow', RHDPTryItNow);
        }
    };
});
