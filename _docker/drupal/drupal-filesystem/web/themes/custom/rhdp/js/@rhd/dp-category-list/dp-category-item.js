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
    var pfelement_js_1, DPCategoryItem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pfelement_js_1_1) {
                pfelement_js_1 = pfelement_js_1_1;
            }
        ],
        execute: function () {
            DPCategoryItem = (function (_super) {
                __extends(DPCategoryItem, _super);
                function DPCategoryItem() {
                    return _super.call(this, DPCategoryItem) || this;
                }
                Object.defineProperty(DPCategoryItem.prototype, "html", {
                    get: function () {
                        return "\n            <style>\n            \n            </style>\n            <slot></slot>\n            ";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPCategoryItem, "tag", {
                    get: function () { return 'dp-category-item'; },
                    enumerable: true,
                    configurable: true
                });
                DPCategoryItem.prototype.connectedCallback = function () {
                    _super.prototype.connectedCallback.call(this);
                };
                Object.defineProperty(DPCategoryItem, "observedAttributes", {
                    get: function () {
                        return ['url', 'name'];
                    },
                    enumerable: true,
                    configurable: true
                });
                DPCategoryItem.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                return DPCategoryItem;
            }(pfelement_js_1.default));
            exports_1("default", DPCategoryItem);
            pfelement_js_1.default.create(DPCategoryItem);
        }
    };
});
