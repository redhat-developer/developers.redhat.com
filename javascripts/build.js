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
window.addEventListener('WebComponentsReady', function () {
    System.import('main');
});
System.register("rhdp-search-app", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RHDPSearchApp;
    return {
        setters: [],
        execute: function () {
            RHDPSearchApp = (function (_super) {
                __extends(RHDPSearchApp, _super);
                function RHDPSearchApp() {
                    return _super.call(this) || this;
                }
                RHDPSearchApp.prototype.connectedCallback = function () {
                    this.innerHTML = 'RHDP Search App';
                };
                return RHDPSearchApp;
            }(HTMLElement));
            exports_1("RHDPSearchApp", RHDPSearchApp);
        }
    };
});
System.register("main", ["rhdp-search-app"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var rhdp_search_app_1;
    return {
        setters: [
            function (rhdp_search_app_1_1) {
                rhdp_search_app_1 = rhdp_search_app_1_1;
            }
        ],
        execute: function () {
            customElements.define('rhdp-search-app', rhdp_search_app_1.RHDPSearchApp);
        }
    };
});
