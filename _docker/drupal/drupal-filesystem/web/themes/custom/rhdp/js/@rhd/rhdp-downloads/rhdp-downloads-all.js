System.register(["@rhd/rhdp-downloads/rhdp-downloads-all-item"], function (exports_1, context_1) {
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
    var rhdp_downloads_all_item_1, RHDPDownloadsAll, templateObject_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (rhdp_downloads_all_item_1_1) {
                rhdp_downloads_all_item_1 = rhdp_downloads_all_item_1_1;
            }
        ],
        execute: function () {
            RHDPDownloadsAll = (function (_super) {
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
                    this.innerHTML = this.template(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", "", ""], ["", "", ""])), this.id, this.heading);
                    this.getProductsWithTargetHeading(this.products);
                };
                RHDPDownloadsAll.prototype.getProductsWithTargetHeading = function (productList) {
                    if (productList.products) {
                        var products = productList.products.products;
                        var len = products.length;
                        for (var i = 0; i < len; i++) {
                            if (products[i].groupHeading === this.heading) {
                                var item = new rhdp_downloads_all_item_1.default();
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
            exports_1("default", RHDPDownloadsAll);
            window.customElements.define('rhdp-downloads-all', RHDPDownloadsAll);
        }
    };
});
