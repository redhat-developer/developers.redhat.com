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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RHDPSearchResult = (function (_super) {
        __extends(RHDPSearchResult, _super);
        function RHDPSearchResult() {
            var _this = _super.call(this) || this;
            _this.template = function (strings, url, title, kind, created, description, premium, thumbnail) {
                return "<div>\n            <h4>" + (url ? "<a href=\"" + url + "\">" + title + "</a>" : title) + "</h4>\n            <p " + (premium ? 'class="result-info subscription-required" data-tooltip="" title="Subscription Required" data-options="disable-for-touch:true"' : 'class="result-info"') + ">\n                <span class=\"caps\">" + kind + "</span>\n                " + (created ? "- <rh-datetime datetime=\"" + created + "\" type=\"local\" day=\"numeric\" month=\"long\" year=\"numeric\">" + created + "</rh-datetime>" : '') + "\n            </p>\n            <p class=\"result-description\">" + description + "</p>\n        </div>\n        " + (thumbnail ? "<div class=\"thumb\"><img src=\"" + thumbnail.replace('http:', 'https:') + "\"></div>" : '');
            };
            return _this;
        }
        Object.defineProperty(RHDPSearchResult.prototype, "url", {
            get: function () {
                var stage = window.location.href.indexOf('stage') >= 0 || window.location.href.indexOf('developers') < 0 ? '.stage' : '';
                return !this.premium ? this._url : "https://broker" + stage + ".redhat.com/partner/drc/userMapping?redirect=" + encodeURIComponent(this._url);
            },
            set: function (val) {
                if (this._url === val)
                    return;
                this._url = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RHDPSearchResult.prototype, "title", {
            get: function () {
                return this._title;
            },
            set: function (val) {
                if (this._title === val)
                    return;
                this._title = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RHDPSearchResult.prototype, "kind", {
            get: function () {
                return this._kind;
            },
            set: function (val) {
                if (this._kind === val)
                    return;
                this._kind = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RHDPSearchResult.prototype, "created", {
            get: function () {
                return this._created;
            },
            set: function (val) {
                if (this._created === val)
                    return;
                this._created = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RHDPSearchResult.prototype, "description", {
            get: function () {
                return this._description;
            },
            set: function (val) {
                if (this._description === val)
                    return;
                this._description = val.replace('>', '&gt;').replace('<', '&lt;');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RHDPSearchResult.prototype, "premium", {
            get: function () {
                return this._premium;
            },
            set: function (val) {
                if (this._premium === val)
                    return;
                this._premium = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RHDPSearchResult.prototype, "thumbnail", {
            get: function () {
                return this._thumbnail;
            },
            set: function (val) {
                if (this._thumbnail === val)
                    return;
                this._thumbnail = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RHDPSearchResult.prototype, "result", {
            get: function () {
                return this._result;
            },
            set: function (val) {
                if (this._result === val)
                    return;
                this._result = val;
                this.computeTitle(val);
                this.computeKind(val);
                this.computeCreated(val);
                this.computeDescription(val);
                this.computeURL(val);
                this.computePremium(val);
                this.computeThumbnail(val);
                this.renderResult();
            },
            enumerable: true,
            configurable: true
        });
        RHDPSearchResult.prototype.connectedCallback = function () {
        };
        Object.defineProperty(RHDPSearchResult, "observedAttributes", {
            get: function () {
                return ['result'];
            },
            enumerable: true,
            configurable: true
        });
        RHDPSearchResult.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
            this[name] = newVal;
        };
        RHDPSearchResult.prototype.renderResult = function () {
            this.innerHTML = this.template(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""])), this.url, this.title, this.kind, this.created, this.description, this.premium, this.thumbnail);
        };
        RHDPSearchResult.prototype.computeThumbnail = function (result) {
            if (result.fields.thumbnail) {
                this.thumbnail = result.fields.thumbnail[0];
            }
        };
        RHDPSearchResult.prototype.computeTitle = function (result) {
            var title = '';
            if (result.highlight && result.highlight.sys_title) {
                title = result.highlight.sys_title[0];
            }
            else {
                title = result.fields.sys_title[0];
            }
            this.title = title;
        };
        RHDPSearchResult.prototype.computeKind = function (result) {
            var kind = result.fields.sys_type || "webpage", map = {
                jbossdeveloper_archetype: 'Archetype',
                article: 'Article',
                blogpost: 'Blog Post',
                jbossdeveloper_bom: 'Bom',
                book: 'Book',
                cheatsheet: 'Cheat Sheet',
                demo: 'Demo',
                event: 'Event',
                forumthread: 'Forum Thread',
                jbossdeveloper_example: 'Demo',
                quickstart: 'Quickstart',
                quickstart_early_access: 'Demo',
                solution: 'Article',
                stackoverflow_thread: 'Stack Overflow',
                video: 'Video',
                webpage: 'Web Page',
                website: 'Web Page'
            };
            this.kind = map[kind] || 'Web Page';
        };
        RHDPSearchResult.prototype.computeCreated = function (result) {
            this.created = result.fields.sys_created && result.fields.sys_created.length > 0 ? result.fields.sys_created[0] : '';
        };
        RHDPSearchResult.prototype.computeDescription = function (result) {
            var description = '';
            if (result.highlight && result.highlight.sys_description) {
                description = result.highlight.sys_description[0];
            }
            else if (result.highlight && result.highlight.sys_content_plaintext) {
                description = result.highlight.sys_content_plaintext[0];
            }
            else if (result.fields && result.fields.sys_description) {
                description = result.fields.sys_description[0];
            }
            else {
                description = result.fields.sys_content_plaintext[0];
            }
            var tempDiv = document.createElement("div");
            tempDiv.innerHTML = description;
            description = tempDiv.innerText;
            this.description = description;
        };
        RHDPSearchResult.prototype.computeURL = function (result) {
            if (result.fields && result.fields.sys_type === 'book' && result.fields.field_book_url) {
                this.url = result.fields.field_book_url ? result.fields.field_book_url : '';
            }
            else {
                this.url = (result.fields && result.fields.sys_url_view) ? result.fields.sys_url_view : '';
            }
        };
        RHDPSearchResult.prototype.computePremium = function (result) {
            var premium = false;
            if (result._type === "rht_knowledgebase_article" || result._type === "rht_knowledgebase_solution") {
                premium = true;
            }
            this.premium = premium;
        };
        return RHDPSearchResult;
    }(HTMLElement));
    exports.default = RHDPSearchResult;
    customElements.define('rhdp-search-result', RHDPSearchResult);
    var templateObject_1;
});
