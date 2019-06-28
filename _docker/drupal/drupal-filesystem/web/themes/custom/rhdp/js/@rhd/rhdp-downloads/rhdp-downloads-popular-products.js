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
define(["require", "exports", "./rhdp-downloads-popular-product"], function (require, exports, rhdp_downloads_popular_product_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    rhdp_downloads_popular_product_1 = __importDefault(rhdp_downloads_popular_product_1);
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
            var productNode = new rhdp_downloads_popular_product_1.default();
            productNode.name = product.productName;
            productNode.productId = product.productCode;
            productNode.dataFallbackUrl = product.dataFallbackUrl;
            productNode.downloadUrl = product.downloadLink;
            this.appendChild(productNode);
        };
        RHDPDownloadsPopularProducts.prototype.renderProductList = function () {
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
    exports.default = RHDPDownloadsPopularProducts;
    window.customElements.define('rhdp-downloads-popular-products', RHDPDownloadsPopularProducts);
});
