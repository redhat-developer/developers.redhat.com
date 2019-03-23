System.register(["../../@patternfly/pfelement/pfelement.js"], function (exports_1, context_1) {
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
    var pfelement_js_1, DPCategoryList;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pfelement_js_1_1) {
                pfelement_js_1 = pfelement_js_1_1;
            }
        ],
        execute: function () {
            DPCategoryList = (function (_super) {
                __extends(DPCategoryList, _super);
                function DPCategoryList() {
                    var _this = _super.call(this, DPCategoryList) || this;
                    _this.items = [];
                    _this.active = 0;
                    return _this;
                }
                Object.defineProperty(DPCategoryList.prototype, "html", {
                    get: function () {
                        return "\n<style>\n    :host {\n        position: relative;\n        background-color: #F9F9F9;\n        padding: 30px 0 15px 0;\n        display: block;\n    }\n\n    section {\n        display: grid;\n        grid-template-columns: 1fr;\n        grid-template-rows: auto;\n        grid-auto-flow: row;\n        grid-gap: 0;\n        margin: 0;\n        max-width: 500px;\n    }\n\n    @media (min-width: 500px) {\n        section {\n            grid-template-columns: repeat(2, 1fr);\n            grid-column-gap: 15px;\n            margin: 0 15px;\n            max-width: 800px;\n            justify-items: center;\n        }\n    }\n\n    @media (min-width: 800px) {\n        section {\n            grid-template-columns: repeat(3, 1fr);\n            grid-column-gap: 30px;\n            margin: 0 30px;\n            max-width: 1200px;\n            justify-items: center;\n        }\n    }\n\n    @media (min-width: 1200px) {\n        section {\n            grid-template-columns: repeat(4, 1fr);\n            grid-column-gap: 30px;\n            margin: 0 auto;\n            max-width: 1260px;\n            justify-items: center;\n        }\n    }\n</style>\n<section >\n<slot></slot>\n</section>\n";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPCategoryList, "tag", {
                    get: function () { return 'dp-category-list'; },
                    enumerable: true,
                    configurable: true
                });
                DPCategoryList.prototype.connectedCallback = function () {
                    var _this = this;
                    _super.prototype.connectedCallback.call(this);
                    this.addEventListener('dp-category-selected', function (e) {
                        var w = window.innerWidth;
                        var cols = 4;
                        if (w < 500) {
                            cols = 1;
                        }
                        else if (w < 800) {
                            cols = 2;
                        }
                        else if (w < 1200) {
                            cols = 3;
                        }
                        var detail = e['detail'];
                        var len = _this.querySelectorAll('dp-category').length + 1;
                        var calc = 1 + (Math.ceil(detail.index / cols) * cols);
                        var idx = calc <= len ? calc : len;
                        var list = _this.querySelector('dp-category-item-list[visible]');
                        if (list) {
                            list.removeAttribute('visible');
                            _this.removeChild(list);
                        }
                        if (detail.index === _this.active) {
                            var a = _this.querySelector('dp-category[visible]');
                            if (a) {
                                a.appendChild(list);
                            }
                            _this.active = 0;
                        }
                        else {
                            if (_this.active > 0) {
                                var a = _this.querySelector("dp-category:nth-child(" + _this.active + ")");
                                if (a) {
                                    a.removeAttribute('visible');
                                    a.appendChild(list);
                                }
                                _this.active = 0;
                            }
                            _this.active = detail.index;
                            list = _this.querySelector("dp-category:nth-child(" + _this.active + ")").querySelector('dp-category-item-list');
                            if (idx < len) {
                                var rowEle = _this.querySelector("dp-category:nth-child(" + idx + ")");
                                _this.insertBefore(list, rowEle);
                            }
                            else {
                                _this.appendChild(list);
                            }
                            list.setAttribute('visible', '');
                        }
                    });
                    this.querySelector('dp-category').setAttribute('visible', '');
                };
                Object.defineProperty(DPCategoryList, "observedAttributes", {
                    get: function () {
                        return ['url', 'name'];
                    },
                    enumerable: true,
                    configurable: true
                });
                DPCategoryList.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                DPCategoryList.prototype._setVisibleCategories = function (index) {
                };
                return DPCategoryList;
            }(pfelement_js_1.default));
            exports_1("default", DPCategoryList);
            pfelement_js_1.default.create(DPCategoryList);
        }
    };
});
