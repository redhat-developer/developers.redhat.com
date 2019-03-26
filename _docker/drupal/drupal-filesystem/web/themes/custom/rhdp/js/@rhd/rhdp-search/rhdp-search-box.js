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
    var RHDPSearchBox, templateObject_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RHDPSearchBox = (function (_super) {
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
                    top.addEventListener('term-change', this._checkTerm);
                    this.innerHTML = this.template(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", "", ""], ["", "", ""])), this.name, this.term);
                    this.addEventListener('submit', function (e) {
                        e.preventDefault();
                        _this._termChange();
                        return false;
                    });
                    this.querySelector('#search-btn').addEventListener('click', function (e) {
                    });
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
            exports_1("default", RHDPSearchBox);
            customElements.define('rhdp-search-box', RHDPSearchBox);
        }
    };
});
