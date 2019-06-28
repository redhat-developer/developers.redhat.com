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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "@patternfly/pfelement/pfelement.umd"], function (require, exports, pfelement_umd_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    pfelement_umd_1 = __importDefault(pfelement_umd_1);
    var DPCategoryItem = (function (_super) {
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
    }(pfelement_umd_1.default));
    exports.default = DPCategoryItem;
    pfelement_umd_1.default.create(DPCategoryItem);
});
