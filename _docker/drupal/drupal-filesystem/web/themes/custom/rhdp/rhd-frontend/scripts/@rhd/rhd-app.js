System.register(["./rhdp-alert", "./dp-referrer", "./dp-category-list/dp-category-list", "./dp-category-list/dp-category", "./dp-category-list/dp-category-item-list", "./dp-category-list/dp-category-item", "./dp-category-list/dp-product-short-teaser"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var rhdp_alert_1, dp_referrer_1, dp_category_list_1, dp_category_1, dp_category_item_list_1, dp_category_item_1, dp_product_short_teaser_1, RHDApp;
    return {
        setters: [
            function (rhdp_alert_1_1) {
                rhdp_alert_1 = rhdp_alert_1_1;
            },
            function (dp_referrer_1_1) {
                dp_referrer_1 = dp_referrer_1_1;
            },
            function (dp_category_list_1_1) {
                dp_category_list_1 = dp_category_list_1_1;
            },
            function (dp_category_1_1) {
                dp_category_1 = dp_category_1_1;
            },
            function (dp_category_item_list_1_1) {
                dp_category_item_list_1 = dp_category_item_list_1_1;
            },
            function (dp_category_item_1_1) {
                dp_category_item_1 = dp_category_item_1_1;
            },
            function (dp_product_short_teaser_1_1) {
                dp_product_short_teaser_1 = dp_product_short_teaser_1_1;
            }
        ],
        execute: function () {
            RHDApp = (function () {
                function RHDApp() {
                    this.a = new rhdp_alert_1.default();
                    this.b = new dp_category_list_1.default();
                    this.c = new dp_category_1.default();
                    this.d = new dp_category_item_list_1.default();
                    this.e = new dp_category_item_1.default();
                    this.f = new dp_product_short_teaser_1.default();
                    this.g = new dp_referrer_1.default();
                }
                return RHDApp;
            }());
            exports_1("default", RHDApp);
        }
    };
});
