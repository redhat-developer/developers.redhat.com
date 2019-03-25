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
    var pfelement_js_1, DPCategoryItemList;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pfelement_js_1_1) {
                pfelement_js_1 = pfelement_js_1_1;
            }
        ],
        execute: function () {
            DPCategoryItemList = (function (_super) {
                __extends(DPCategoryItemList, _super);
                function DPCategoryItemList() {
                    var _this = _super.call(this, DPCategoryItemList) || this;
                    _this._index = 1;
                    _this._visible = false;
                    return _this;
                }
                Object.defineProperty(DPCategoryItemList.prototype, "html", {
                    get: function () {
                        return "\n            <style>\n            :host[visible] {\n                display: block;\n            }\n\n            :host {\n                display: none;\n                flex: 1 1 100%;\n                grid-column: span 1;\n            }\n\n            div {\n                background: white;\n                display: grid;\n                grid-template-columns: 1fr;\n                grid-gap: 15px;\n                position: relative;\n                padding-top: 15px;\n                padding-right: 15px;\n                padding-left: 15px;\n            }\n\n            @media (min-width: 500px) {\n                :host {\n                    grid-column: span 2;\n                    margin-bottom: 30px;\n                }\n\n                div {\n                    border: 1px solid #CCCCCC;\n                }\n            }\n\n            @media (min-width: 800px) {\n                :host {\n                    grid-column: span 3;\n                }\n\n                div {\n                    grid-template-columns: repeat(2, 1fr);\n                }\n            }\n\n            @media (min-width: 1200px) {\n                :host {\n                    grid-column: span 4;\n                }\n\n                div {\n                    grid-template-columns: repeat(3, 1fr);\n                    grid-gap: 30px;\n                    background-color: #FFFFFF;\n                    padding: 30px;\n                    margin-bottom: 30px;\n                }\n            }\n            </style>\n            <div>\n            <slot></slot>\n            </div>\n            ";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPCategoryItemList, "tag", {
                    get: function () { return 'dp-category-item-list'; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPCategoryItemList.prototype, "index", {
                    get: function () {
                        return this._index;
                    },
                    set: function (val) {
                        if (this._index === val)
                            return;
                        this._index = val;
                        _super.prototype.render.call(this);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPCategoryItemList.prototype, "visible", {
                    get: function () {
                        return this._visible;
                    },
                    set: function (val) {
                        val = val !== null && val !== false ? true : false;
                        if (this._visible === val)
                            return;
                        this._visible = val;
                        if (this._visible) {
                            this.style.display = 'block';
                            this.setAttribute('visible', '');
                        }
                        else {
                            this.style.display = 'none';
                            this.removeAttribute('visible');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                DPCategoryItemList.prototype.connectedCallback = function () {
                    _super.prototype.connectedCallback.call(this);
                };
                Object.defineProperty(DPCategoryItemList, "observedAttributes", {
                    get: function () {
                        return ['index', 'visible'];
                    },
                    enumerable: true,
                    configurable: true
                });
                DPCategoryItemList.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                return DPCategoryItemList;
            }(pfelement_js_1.default));
            exports_1("default", DPCategoryItemList);
            pfelement_js_1.default.create(DPCategoryItemList);
        }
    };
});
