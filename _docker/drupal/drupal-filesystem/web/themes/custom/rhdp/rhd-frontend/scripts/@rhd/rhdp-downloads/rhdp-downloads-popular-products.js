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
