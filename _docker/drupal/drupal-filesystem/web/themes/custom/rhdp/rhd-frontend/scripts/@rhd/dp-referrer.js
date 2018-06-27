System.register(["@rhd/rhdp-alert"], function (exports_1, context_1) {
    "use strict";
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
    var __moduleName = context_1 && context_1.id;
    var rhdp_alert_1, DPReferrer;
    return {
        setters: [
            function (rhdp_alert_1_1) {
                rhdp_alert_1 = rhdp_alert_1_1;
            }
        ],
        execute: function () {
            DPReferrer = (function (_super) {
                __extends(DPReferrer, _super);
                function DPReferrer() {
                    var _this = _super.call(this, 'dp-referrer') || this;
                    _this._uri = new URL(window.location.href);
                    return _this;
                }
                Object.defineProperty(DPReferrer.prototype, "uri", {
                    get: function () {
                        return this._uri;
                    },
                    set: function (val) {
                        if (this._uri === val)
                            return;
                        this._uri = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                DPReferrer.prototype.connectedCallback = function () {
                    if (this.uri.searchParams.get('referrer') === 'jbd') {
                        var category = window.location.href.replace(/^https?\:\/\/([a-z._-]|[0-9])+(:?[0-9]*)?(\/pr\/[0-9]+\/export)?\//, '').replace(/\/$/, '').split('?')[0].split('#')[0].split(/\//);
                        this.size = 'xl';
                        this.heading = category[0] !== 'middleware' ? 'Welcome jboss.org members!' : 'You have been redirected from JBoss.org to Red Hat Developer.';
                        this.innerHTML = category[0] !== 'middleware' ? "It's true \u2014 JBoss Developer and Red Hat Developer Program are joining forces. You can find all the great Middleware information that you were looking for right here on developers.redhat.com.<a href=\"https://developer.jboss.org/blogs/mark.little/2017/08/31/we-are-moving?_sscc=t\"> Read more about this on our blog.</a>" : "It's true &mdash; JBoss Developer and Red Hat Developer are one and the same, and you can find all the great stuff you were looking for right here on <a href=\"https://developers.redhat.com/\">developers.redhat.com.</a>";
                        _super.prototype.render.call(this, this.template(this));
                    }
                    else {
                        this.innerHTML = '';
                    }
                };
                return DPReferrer;
            }(rhdp_alert_1.default));
            exports_1("default", DPReferrer);
            window.customElements.define('dp-referrer', DPReferrer);
        }
    };
});
