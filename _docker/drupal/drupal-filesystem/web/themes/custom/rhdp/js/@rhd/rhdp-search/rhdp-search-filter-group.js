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
    var RHDPSearchFilterGroup, templateObject_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RHDPSearchFilterGroup = (function (_super) {
                __extends(RHDPSearchFilterGroup, _super);
                function RHDPSearchFilterGroup() {
                    var _this = _super.call(this) || this;
                    _this._toggle = false;
                    _this._more = false;
                    _this.template = function (strings, name) {
                        return "<h6 class=\"showFilters heading\"><span class=\"group-name\">" + name + "</span><span class=\"toggle\"><i class='fa fa-chevron-right' aria-hidden='true'></i></span></h6>\n        <div class=\"group hide\">\n            <div class=\"primary\"></div>\n            <div class=\"secondary hide\"></div>\n            <a href=\"#\" class=\"more\">Show More</a>\n        </div>";
                    };
                    _this.innerHTML = _this.template(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), _this.name);
                    return _this;
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
            exports_1("default", RHDPSearchFilterGroup);
            customElements.define('rhdp-search-filter-group', RHDPSearchFilterGroup);
        }
    };
});
