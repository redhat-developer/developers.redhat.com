var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
System.register("@rhelements/rhelement", [], function (exports_1, context_1) {
    "use strict";
    var RHElement;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RHElement = (function (_super) {
                __extends(RHElement, _super);
                function RHElement(id, template) {
                    var _this = _super.call(this) || this;
                    _this.id = id;
                    if (ShadyCSS && template) {
                        ShadyCSS.prepareTemplate(template, id);
                    }
                    _this.attachShadow({ mode: "open" });
                    if (template) {
                        _this.shadowRoot.appendChild(template.content.cloneNode(true));
                    }
                    return _this;
                }
                RHElement.prototype.connectedCallback = function () {
                    if (ShadyCSS) {
                        ShadyCSS.styleElement(this);
                    }
                };
                Object.defineProperty(RHElement, "observedAttributes", {
                    get: function () {
                        return ['url', 'name'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHElement.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHElement.prototype.render = function (template) {
                    if (ShadyCSS) {
                        ShadyCSS.prepareTemplate(template, this.id);
                    }
                    while (this.shadowRoot.firstChild) {
                        this.shadowRoot.removeChild(this.shadowRoot.firstChild);
                    }
                    this.shadowRoot.appendChild(template.content.cloneNode(true));
                    if (ShadyCSS) {
                        ShadyCSS.styleElement(this);
                    }
                };
                return RHElement;
            }(HTMLElement));
            exports_1("default", RHElement);
        }
    };
});
System.register("@rhd/rhdp-alert", ["@rhelements/rhelement"], function (exports_2, context_2) {
    "use strict";
    var rhelement_1, RHDPAlert;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (rhelement_1_1) {
                rhelement_1 = rhelement_1_1;
            }
        ],
        execute: function () {
            RHDPAlert = (function (_super) {
                __extends(RHDPAlert, _super);
                function RHDPAlert(element) {
                    if (element === void 0) { element = 'rhdp-alert'; }
                    var _this = _super.call(this, element) || this;
                    _this.template = function (el) {
                        var tpl = document.createElement("template");
                        tpl.innerHTML = "\n        <style>\n        :host {\n            color: #363636 !important;\n            display: flex;\n            flex-direction: row;\n            display: grid;\n            grid-template-columns: 1.5em auto 1fr;\n            grid-template-rows: auto;\n            grid-gap: .5em;\n            border-width: 1px;\n            border-style: solid;\n            padding: 10px 20px;\n            margin: 1.5em auto;\n            font-size: 1em;\n            background-color: #dcedf8;\n            border-color: #87aac1;\n            line-height: 24px;\n            vertical-align: middle;\n        }\n\n        h3, strong {\n            margin: 0;\n            display: inline;\n        }\n\n        p { margin: 0; }\n          \n        img {\n            flex: 0 0 1.5em;\n            height: 1.5em;\n            display: block;\n            position: relative;\n            margin-right: 10px;\n        }\n\n        :host([type=\"success\"]) {\n            background-color: #e9f4e9;\n            border-color: #8db28a;\n        }\n        :host([type=\"warning\"]) {\n            background-color: #fdf2e5;\n            border-color: #deb142;\n        }\n        :host([type=\"error\"]) {\n            background-color: #ffe6e6;\n            border-color: #d8aaab;\n        }\n\n        :host([size=\"xl\"]) {\n            grid-template-columns: 1.5em 1fr 1.5em;\n            grid-template-rows: auto 1fr;\n            flex-direction: column;\n        }\n\n        :host([size=\"xl\"]) img {\n            grid-column: 1;\n            grid-row: 1;\n        }\n\n        :host([size=\"xl\"]) h3, :host([size=\"xl\"]) strong {\n            font-weight: 400;\n            font-size: 27px;\n            grid-column: 2;\n            grid-row: 1;\n        }\n\n        :host([size=\"xl\"]) .close {\n            grid-column: 3;\n            grid-row: 1;\n        }\n\n        :host([size=\"xl\"]) p {\n            grid-column: 2;\n            grid-row: 2;\n        }\n        \n        a.close {\n            top: 1em;\n            margin-right: 5px;\n            background-repeat: no-repeat;\n            height: 24px;\n            width: 24px;\n            color: #3b6e90;\n        }\n        \n        </style>\n        <img src=\"" + el.icon + "\">\n        " + (el.size === 'xl' ? '<h3>' : '') + "\n        " + (el.heading ? "<strong>" + el.heading + "</strong>" : '') + "\n        " + (el.size === 'xl' ? '</h3>' : '') + "\n        <p><slot>" + el.text + "</slot></p>\n        " + (el.size === 'xl' ? "<a class=\"close\" href=\"#\"><i class=\"fas fa-times\"></i></a>" : '');
                        return tpl;
                    };
                    _this._type = 'info';
                    _this._icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_info.svg';
                    _this._background = '#dcedf8';
                    _this._border = '#87aac1';
                    return _this;
                }
                Object.defineProperty(RHDPAlert.prototype, "type", {
                    get: function () {
                        return this._type;
                    },
                    set: function (val) {
                        if (this._type === val)
                            return;
                        this._type = val;
                        switch (this._type) {
                            case 'success':
                                this.icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_success.svg';
                                break;
                            case 'warning':
                                this.icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_warning.svg';
                                break;
                            case 'error':
                                this.icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_error.svg';
                                break;
                            case 'info':
                            default:
                                this.icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_info.svg';
                                break;
                        }
                        this.setAttribute('type', this._type);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPAlert.prototype, "size", {
                    get: function () {
                        return this._size;
                    },
                    set: function (val) {
                        if (this._size === val)
                            return;
                        this._size = val;
                        this.setAttribute('size', this._size);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPAlert.prototype, "heading", {
                    get: function () {
                        return this._heading;
                    },
                    set: function (val) {
                        if (this._heading === val)
                            return;
                        this._heading = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPAlert.prototype, "text", {
                    get: function () {
                        return this._text;
                    },
                    set: function (val) {
                        if (this._text === val)
                            return;
                        this._text = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPAlert.prototype, "icon", {
                    get: function () {
                        return this._icon;
                    },
                    set: function (val) {
                        if (this._icon === val)
                            return;
                        this._icon = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPAlert.prototype.connectedCallback = function () {
                    var _this = this;
                    _super.prototype.render.call(this, this.template(this));
                    var lnk = this.shadowRoot.querySelector('.close');
                    if (lnk) {
                        lnk.addEventListener('click', function (e) {
                            e.preventDefault();
                            console.log('Close');
                            _this.innerHTML = '';
                        });
                    }
                };
                Object.defineProperty(RHDPAlert, "observedAttributes", {
                    get: function () {
                        return ['type', 'size', 'heading'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPAlert.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                    _super.prototype.render.call(this, this.template(this));
                    ;
                };
                return RHDPAlert;
            }(rhelement_1.default));
            exports_2("default", RHDPAlert);
            window.customElements.define('rhdp-alert', RHDPAlert);
        }
    };
});
System.register("@rhd/dp-referrer", ["@rhd/rhdp-alert"], function (exports_3, context_3) {
    "use strict";
    var rhdp_alert_1, DPReferrer;
    var __moduleName = context_3 && context_3.id;
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
            exports_3("default", DPReferrer);
            window.customElements.define('dp-referrer', DPReferrer);
        }
    };
});
System.register("@rhd/dp-stackoverflow", ["@rhelements/rhelement"], function (exports_4, context_4) {
    "use strict";
    var rhelement_2, DPStackOverflow;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (rhelement_2_1) {
                rhelement_2 = rhelement_2_1;
            }
        ],
        execute: function () {
            DPStackOverflow = (function (_super) {
                __extends(DPStackOverflow, _super);
                function DPStackOverflow() {
                    var _this = _super.call(this, 'dp-category-list') || this;
                    _this.template = function (el) {
                        var tpl = document.createElement("template");
                        tpl.innerHTML = "\n        <style>\n\n        </style>\n        <label for=\"filterByProduct\">Filter by Product</label>\n        <select id=\"filterByProduct\" name=\"filter-by-product\" ng-change=\"updateSearch(); resetPagination();\" ng-model=\"params.product\">\n<div ng-app=\"search\">\n<div class=\"row\" ng-controller=\"SearchController\">\n    <div class=\"large-24 columns\">\n    <div class=\"row\">\n        <div class=\"large-24 columns\">\n        <form class=\"search-bar\" ng-submit=\"updateSearch(); resetPagination();\" role=\"search\"> </form>\n        </div>\n        <div class=\"large-24 columns\" id=\"scrollPoint\">\n        <div class=\"row\">\n            <div class=\"large-14 columns stackoverflow-filters\">\n            <label for=\"filterByProduct\">Filter by Product</label>\n\n            <div class=\"styled-select\">\n<select id=\"filterByProduct\" name=\"filter-by-product\" ng-change=\"updateSearch(); resetPagination();\" ng-model=\"params.product\">\n    <option value=\"\">Show all</option>\n    <option value=\"openjdk\">OpenJDK</option>\n    <option value=\"rhamt\">Red Hat Application Migration Toolkit</option>\n    <option value=\"cdk\">Red Hat Developer Container Kit</option>\n    <option value=\"developertoolset\">Red Hat Developer Toolset</option>\n    <option value=\"rhel\">Red Hat Enterprise Linux</option>\n    <option value=\"amq\">Red Hat JBoss AMQ</option>\n    <option value=\"rhpam\">Red Hat Process Automation Manager</option>\n    <option value=\"brms\">Red Hat Decision Manager</option>\n    <option value=\"datagrid\">Red Hat JBoss Data Grid</option>\n    <option value=\"datavirt\">Red Hat JBoss Data Virtualization</option>\n    <option value=\"devstudio\">Red Hat JBoss Developer Studio</option>\n    <option value=\"eap\">Red Hat JBoss Enterprise Application Platform</option>\n    <option value=\"fuse\">Red Hat JBoss Fuse</option>\n    <option value=\"webserver\">Red Hat JBoss Web Server</option>\n    <option value=\"rhmap\">Red Hat Mobile Application Platform</option>\n    <option value=\"rhoar\">Red Hat Openshift Application Runtimes</option>\n    <option value=\"openshift\">Red Hat OpenShift Container Platform</option>\n    <option value=\"softwarecollections\">Red Hat Software Collections</option>\n    <option value=\"dotnet\">.NET Core for Red Hat Enterprise Linux</option>\n</select>\n</div>\n            </div>\n\n            <div class=\"large-10 columns\">\n            <div class=\"sorting so-sorting\">\n                <p ng-if=\"totalCount &gt; 10\">Show<select class=\"results-count\" ng-change=\"updateSearch()\" ng-model=\"params.size\"><option value=\"10\">10</option>\n<option value=\"25\">25</option>\n<option value=\"50\">50</option>\n<option value=\"100\">100</option></select>results per page</p>\n            </div>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"large-24 columns\">\n            <h3 class=\"results-title\" ng-bind-template=\"No results found\" ng-if=\"totalCount &lt;= 0\"> </h3>\n\n            <h4 class=\"results-sub-title\" ng-bind-template=\"Please select a different product\" ng-if=\"totalCount &lt;= 0\"> </h4>\n\n            <div class=\"stackoverflow-results-container\" ng-class=\"loading ? 'invisible' : 'search-results-loaded'\" ng-if=\"totalCount &gt; 0\">\n                <div ng-init=\"r = result\" ng-repeat=\"result in results\">\n                <div class=\"stackoverflow-update\">\n                    <div class=\"update\">\n                    <div class=\"update-meta\">\n                        <div class=\"row\">\n                        <div class=\"large-6 columns qtn-stats\">\n\n                            <div class=\"votes-count\">\n                            <h4 ng-bind=\"r._source.up_vote_count\"> </h4>\n                            <p ng-bind-template=\"Votes\"> </p>\n                            </div>\n                            <div class=\"answer-count\" ng-class=\"(r._source.answers[0].is_accepted == true) ? 'accepted-answer' : '' \">\n                            <h4 ng-bind=\"r._source.answer_count\"> </h4>\n                            <p ng-bind-template=\"Answers\"> </p>\n                            </div>\n                            <div class=\"views-count\">\n                            <h4 ng-bind=\"r._source.view_count\"> </h4>\n                            <p ng-bind-template=\"Views\"> </p>\n                            </div>\n                        </div>\n\n                        <div class=\"large-18 columns\">\n                            <a class=\"qtn-title\" ng-href=\"{{r._source.sys_url_view}}\" ng-bind-html=\"r._source.sys_title\"> </a>\n                            <p class=\"qtn-content\" ng-bind-html=\"r | question\"> </p>\n\n                            <div class=\"callout qtn-answer\" ng-class=\"r._source.answers[0] ? 'display-answer' : 'hide-answer' \">\n                            <p ng-show=\"r._source.answers[0].is_accepted == true\">\n                                <strong ng-bind-template=\"Accepted answer: \"> </strong>\n                            </p>\n                            <p ng-show=\"r._source.answers[0].is_accepted == false\">\n                                <strong ng-bind-template=\"Latest answer: \"> </strong>\n                            </p>\n                            <p ng-bind=\"r._source.answers[0].body | htmlToPlaintext\"></p>\n                            <a ng-href=\"{{r._source.sys_url_view}}\" target=\"_blank\" rel=\"noopener noreferrer\" ng-bind-template=\"Read full question at Stack Overflow \u203A\"> </a>\n                            </div>\n                            <div class=\"so-tags\">\n                            <strong class=\"tag-label\" ng-bind-template=\"Tags:\"> </strong>\n                            <span class=\"tag\" ng-repeat=\"tag in r._source.sys_tags\" ng-bind=\"tag\"> </span>\n                            <span class=\"so-author\" ng-bind-template=\"{{r | stackDate}} | {{r | author}}\"> </span>\n                            </div>\n                        </div>\n                        </div>\n                    </div>\n                    </div>\n                </div>\n                </div>\n            </div>\n            </div>\n        </div>\n\n        <nav id=\"paginator\" ng-hide=\"loading\" ng-if=\"paginate.pages &gt; 1\"><span ng-bind-template=\"Showing {{params.from + 1}}-{{paginate.lastVisible}} of  {{totalCount}} results\"></span>\n            <ul class=\"pagination\">\n<li id=\"pagination-first\" ng-class=\"paginate.currentPage &lt; 2 ? 'unavailable': 'available'\">\n                <a ng-click=\"goToPage('first'); scrollPosition();\">First</a>\n            </li>\n            <li id=\"pagination-prev\" ng-class=\"paginate.currentPage &lt; 2 ? 'unavailable': 'available'\">\n                <a ng-click=\"goToPage('prev'); scrollPosition();\">Previous</a>\n            </li>\n            <li class=\"pagination-page-number\" id=\"pagination-{{$index}}\" ng-class=\"{current: page == paginate.currentPage}\" ng-repeat=\"page in paginate.pagesArray track by $index\">\n                <a ng-click=\"goToPage(page); scrollPosition();\" data-page=\"{{page}}\" ng-bind=\"page\"> </a>\n            </li>\n            <li id=\"pagination-next\" ng-class=\"paginate.currentPage &gt;= paginate.pages ? 'unavailable': 'available'\">\n                <a ng-click=\"goToPage('next'); scrollPosition();\">Next</a>\n            </li>\n            <li id=\"pagination-last\" ng-class=\"paginate.currentPage  == paginate.pages ? 'unavailable': 'available'\">\n                <a ng-click=\"goToPage('last'); scrollPosition();\">Last</a>\n            </li>\n            </ul></nav>\n</div>\n";
                        return tpl;
                    };
                    return _this;
                }
                DPStackOverflow.prototype.connectedCallback = function () {
                    _super.prototype.render.call(this, this.template(this));
                };
                return DPStackOverflow;
            }(rhelement_2.default));
            exports_4("default", DPStackOverflow);
        }
    };
});
System.register("@rhd/rh-keycloak", ["@rhelements/rhelement"], function (exports_5, context_5) {
    "use strict";
    var rhelement_3, RHKeycloak;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (rhelement_3_1) {
                rhelement_3 = rhelement_3_1;
            }
        ],
        execute: function () {
            RHKeycloak = (function (_super) {
                __extends(RHKeycloak, _super);
                function RHKeycloak(element) {
                    if (element === void 0) { element = 'rh-keycloak'; }
                    var _this = _super.call(this, element) || this;
                    _this.template = function (el) {
                        var tpl = document.createElement("template");
                        tpl.innerHTML = "";
                        return tpl;
                    };
                    return _this;
                }
                Object.defineProperty(RHKeycloak.prototype, "url", {
                    get: function () {
                        return this._url;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHKeycloak.prototype.connectedCallback = function () {
                };
                RHKeycloak.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHKeycloak.prototype.updateToken = function () {
                };
                return RHKeycloak;
            }(rhelement_3.default));
            exports_5("default", RHKeycloak);
            window.customElements.define('rhdp-alert', RHKeycloak);
        }
    };
});
System.register("@rhd/rhdp-os-download", [], function (exports_6, context_6) {
    "use strict";
    var RHDPOSDownload, templateObject_1;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            RHDPOSDownload = (function (_super) {
                __extends(RHDPOSDownload, _super);
                function RHDPOSDownload() {
                    var _this = _super.call(this) || this;
                    _this._rhelURL = "";
                    _this._macURL = "";
                    _this._winURL = "";
                    _this.stage_download_url = 'https://developers.stage.redhat.com';
                    _this.productDownloads = {
                        "cdk": { "windowsUrl": "/download-manager/file/cdk-3.11.0-1-minishift-windows-amd64.exe", "macUrl": "/download-manager/file/cdk-3.11.0-1-minishift-darwin-amd64", "rhelUrl": "/download-manager/file/cdk-3.11.0-1-minishift-linux-amd64" }
                    };
                    _this.template = function (strings, product, downloadUrl, platform, version) {
                        return "<div class=\"large-8 columns download-link\">\n                    <a class=\"button heavy-cta\" href=\"" + downloadUrl + "\">\n                        <i class=\"fa fa-download\"></i> Download</a>\n                    <div class=\"version-name\">" + product + " " + version + " " + (_this.displayOS ? "for " + platform : '') + "</div>\n                </div>\n                ";
                    };
                    _this.downloadsTemplate = function (strings, product, downloadUrl, platform, version) {
                        return "<div class=\"large-8 columns download-link\">\n                    <a class=\"button heavy-cta\" href=\"" + downloadUrl + "\">\n                        <i class=\"fa fa-download\"></i> Download</a>\n                    <div class=\"version-name\">" + product + " " + version + " " + (_this.displayOS ? "for " + platform : '') + "</div>\n                </div>\n                ";
                    };
                    return _this;
                }
                Object.defineProperty(RHDPOSDownload.prototype, "url", {
                    get: function () {
                        return this._url;
                    },
                    set: function (value) {
                        if (this._url === value)
                            return;
                        this._url = value;
                        this.setAttribute('url', this._url);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "productCode", {
                    get: function () {
                        return this._productCode;
                    },
                    set: function (value) {
                        if (this._productCode === value)
                            return;
                        this._productCode = value;
                        this.setAttribute('product-code', this._productCode);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "platformType", {
                    get: function () {
                        return this._platformType;
                    },
                    set: function (value) {
                        if (this._platformType === value)
                            return;
                        this._platformType = value;
                        this.setAttribute('platform-type', this._platformType);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "downloadURL", {
                    get: function () {
                        return this._downloadURL;
                    },
                    set: function (value) {
                        if (this._downloadURL === value)
                            return;
                        this._downloadURL = value;
                        this.setAttribute('download-url', this._downloadURL);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "rhelURL", {
                    get: function () {
                        return this._rhelURL;
                    },
                    set: function (value) {
                        if (this._rhelURL === value)
                            return;
                        this._rhelURL = value;
                        this.setAttribute('rhel-download', this._rhelURL);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "macURL", {
                    get: function () {
                        return this._macURL;
                    },
                    set: function (value) {
                        if (this._macURL === value)
                            return;
                        this._macURL = value;
                        this.setAttribute('mac-download', this._macURL);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "winURL", {
                    get: function () {
                        return this._winURL;
                    },
                    set: function (value) {
                        if (this._winURL === value)
                            return;
                        this._winURL = value;
                        this.setAttribute('windows-download', this._winURL);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "productName", {
                    get: function () {
                        return this._productName;
                    },
                    set: function (value) {
                        if (this._productName === value)
                            return;
                        this._productName = value;
                        this.setAttribute('name', this._productName);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "version", {
                    get: function () {
                        return this._version;
                    },
                    set: function (value) {
                        if (this._version === value)
                            return;
                        this._version = value;
                        this.setAttribute('version', this._version);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPOSDownload.prototype, "displayOS", {
                    get: function () {
                        return this._displayOS;
                    },
                    set: function (value) {
                        if (this._displayOS === value)
                            return;
                        this._displayOS = value;
                        this.setAttribute('display-os', this._displayOS);
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPOSDownload.prototype.connectedCallback = function () {
                    this.platformType = this.getUserAgent();
                    this.setDownloadURLByPlatform();
                    this.innerHTML = this.template(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", "", "", "", ""], ["", "", "", "", ""])), this.productName, this.downloadURL, this.platformType, this.version);
                };
                Object.defineProperty(RHDPOSDownload, "observedAttributes", {
                    get: function () {
                        return ['product-code', 'platform-type', 'download-url', 'name'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPOSDownload.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPOSDownload.prototype.getUserAgent = function () {
                    var OSName = "Windows";
                    if (navigator.appVersion.indexOf("Mac") != -1)
                        OSName = "MacOS";
                    if (navigator.appVersion.indexOf("Linux") != -1)
                        OSName = "RHEL";
                    return OSName;
                };
                RHDPOSDownload.prototype.getDownloadOrigin = function (productUrl) {
                    if (window.location.origin.indexOf('developers.stage.redhat.com') > 0) {
                        productUrl = productUrl.replace(/http(s)?:\/\/developers.redhat.com/g, this.stage_download_url);
                    }
                    return productUrl;
                };
                RHDPOSDownload.prototype.setOSURL = function (productId) {
                    switch (productId) {
                        case 'cdk':
                            this.winURL = this.getDownloadOrigin(this.productDownloads.cdk.windowsUrl);
                            this.macURL = this.getDownloadOrigin(this.productDownloads.cdk.macUrl);
                            this.rhelURL = this.getDownloadOrigin(this.productDownloads.cdk.rhelUrl);
                            break;
                        default:
                            this.winURL = this.getDownloadOrigin(this.downloadURL);
                            this.macURL = this.getDownloadOrigin(this.downloadURL);
                            this.rhelURL = this.getDownloadOrigin(this.downloadURL);
                    }
                };
                RHDPOSDownload.prototype.setDownloadURLByPlatform = function () {
                    if (this.winURL.length <= 0 || this.macURL.length <= 0 || this.rhelURL.length <= 0) {
                        return;
                    }
                    this.displayOS = true;
                    switch (this.platformType) {
                        case "Windows":
                            this.downloadURL = this.getDownloadOrigin(this.winURL);
                            break;
                        case "MacOS":
                            this.downloadURL = this.getDownloadOrigin(this.macURL);
                            break;
                        case "RHEL":
                            this.downloadURL = this.getDownloadOrigin(this.rhelURL);
                            break;
                        default:
                            this.downloadURL = this.getDownloadOrigin(this.winURL);
                    }
                };
                return RHDPOSDownload;
            }(HTMLElement));
            exports_6("default", RHDPOSDownload);
            window.addEventListener('WebComponentsReady', function () {
                customElements.define('rhdp-os-download', RHDPOSDownload);
            });
        }
    };
});
System.register("@rhd/rhdp-thankyou-page", [], function (exports_7, context_7) {
    "use strict";
    var RHDPThankyou, templateObject_2;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            RHDPThankyou = (function (_super) {
                __extends(RHDPThankyou, _super);
                function RHDPThankyou() {
                    var _this = _super.call(this) || this;
                    _this.template = function (strings, name, directLink, recentDownload, boldMsg, normMsg, dnlMsg) {
                        return "<div class=\"row\">\n                    <div class=\"large-24 medium-24 small-24 columns\">\n                        <div class=\"alert-box alert-info\">\n                            <div class=\"icon\"></div>\n                            <div class=\"alert-content\">\n                                <strong>" + boldMsg + "</strong>\n                                <p>" + normMsg + "<a id=\"download-link\" href=\"" + directLink + "\">direct link.</a></p>\n                            </div>\n                        </div>\n                \n                        <div class=\"large-24 medium-24 small-24 columns thankyou\">\n                                <h2>" + dnlMsg + "</h2>\n                                <h2>" + name + "</h2>\n                            " + (recentDownload ? '' : "<iframe src=\"" + directLink + "\"></iframe>") + "\n                        </div>\n                        <div class=\"large-24 medium-24 small-24 columns\">\n                            <div class=\"thankyou-button\">\n                                <a href=\"/\" class=\"button heavy-cta\">Continue to Homepage</a>\n                            </div>\n                        </div>\n                \n                    </div>\n                </div>";
                    };
                    return _this;
                }
                Object.defineProperty(RHDPThankyou.prototype, "url", {
                    get: function () {
                        return this._url;
                    },
                    set: function (value) {
                        if (this._url === value)
                            return;
                        this._url = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPThankyou.prototype, "mediaName", {
                    get: function () {
                        return this._mediaName;
                    },
                    set: function (value) {
                        if (this._mediaName === value)
                            return;
                        this._mediaName = value;
                        this.setAttribute('media-name', this._mediaName);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPThankyou.prototype, "directLink", {
                    get: function () {
                        return this._directLink;
                    },
                    set: function (value) {
                        if (this._directLink === value)
                            return;
                        this._directLink = value;
                        this.setAttribute('direct-download', this._directLink);
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPThankyou.prototype.connectedCallback = function () {
                    this._recentDownload = this.checkRecentDownload();
                    this.mediaName = this.mediaName ? this.mediaName : this.stripLabelFromMedia(this.getParameterByName('p'));
                    this.directLink = this.directLink ? this.directLink : this.getParameterByName('tcDownloadURL');
                    this.innerHTML = this.template(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""])), this.mediaName, this.directLink, this._recentDownload, this.getCorrectMsgTextForBoldMsg(), this.getCorrectMsgTextForNormMsg(), this.getCorrectMsgTextForDnlMsg());
                };
                Object.defineProperty(RHDPThankyou, "observedAttributes", {
                    get: function () {
                        return ['media-name', 'direct-link'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPThankyou.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPThankyou.prototype.stripLabelFromMedia = function (name) {
                    if (name) {
                        name = name.replace(/Media:[\s]/g, "");
                    }
                    return name;
                };
                RHDPThankyou.prototype.getOS = function () {
                    var userAgent = window.navigator.userAgent, platform = window.navigator.platform, macPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'], windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'], iosPlatforms = ['iPhone', 'iPad', 'iPod'], os = "unknown";
                    if (macPlatforms.indexOf(platform) !== -1) {
                        os = 'Mac OS';
                    }
                    else if (iosPlatforms.indexOf(platform) !== -1) {
                        os = 'iOS';
                    }
                    else if (windowsPlatforms.indexOf(platform) !== -1) {
                        os = 'Windows';
                    }
                    else if (/Android/.test(userAgent)) {
                        os = 'Android';
                    }
                    else if (!os && /Linux/.test(platform)) {
                        os = 'Linux';
                    }
                    return os;
                };
                RHDPThankyou.prototype.getCorrectMsgTextForDnlMsg = function () {
                    var desktopDnlMsg = "Thank you for downloading the:";
                    var mobileDnlMsg = "Use the direct link above to download:";
                    var testOS = this.getOS();
                    if (testOS === "iOS" || testOS === "Android") {
                        return mobileDnlMsg;
                    }
                    else {
                        return desktopDnlMsg;
                    }
                };
                RHDPThankyou.prototype.getCorrectMsgTextForBoldMsg = function () {
                    var desktopBoldMsg = "Your download should start automatically.";
                    var mobileBoldMsg = "To download on your mobile,";
                    var testOS = this.getOS();
                    if (testOS === "iOS" || testOS === "Android") {
                        return mobileBoldMsg;
                    }
                    else {
                        return desktopBoldMsg;
                    }
                };
                RHDPThankyou.prototype.getCorrectMsgTextForNormMsg = function () {
                    var desktopNormMsg = "If you have any problems with the download, please use the ";
                    var mobileNormMsg = "Please use the ";
                    var testOS = this.getOS();
                    if (testOS === "iOS" || testOS === "Android") {
                        return mobileNormMsg;
                    }
                    else {
                        return desktopNormMsg;
                    }
                };
                RHDPThankyou.prototype.getParameterByName = function (urlName) {
                    this.url = this.url ? this.url : window.location.href;
                    urlName = urlName.replace(/[\[\]]/g, "\\$&");
                    var regex = new RegExp("[?&]" + urlName + "(=([^&#]*)|&|#|$)"), results = regex.exec(this.url);
                    if (!results)
                        return null;
                    if (!results[2])
                        return '';
                    var i = 0;
                    var result = results[2];
                    var tmpResult = decodeURIComponent(result);
                    var decodedResult = decodeURIComponent(tmpResult);
                    do {
                        i = i + 1;
                        tmpResult = decodeURIComponent(decodedResult);
                        decodedResult = decodeURIComponent(tmpResult);
                    } while (tmpResult != decodedResult && i <= 5);
                    return decodedResult.replace(/\+/g, " ");
                };
                RHDPThankyou.prototype.checkRecentDownload = function () {
                    var storageExpiration = 30000, storageName = 'media-download-url';
                    if (window.location.href.indexOf('media-download-confirmation') > 0) {
                        if (window.localStorage.getItem(storageName)) {
                            var recentDownload, timeOfRefer, currentTime;
                            recentDownload = JSON.parse(window.localStorage.getItem(storageName));
                            timeOfRefer = recentDownload.hasOwnProperty('timestamp') ? recentDownload['timestamp'] : 0;
                            currentTime = new Date().getTime();
                            if (currentTime - timeOfRefer > storageExpiration) {
                                window.localStorage.removeItem(storageName);
                                return false;
                            }
                            return true;
                        }
                        else {
                            var referrerDownload = { value: window.location.href, timestamp: new Date().getTime() };
                            localStorage.setItem(storageName, JSON.stringify(referrerDownload));
                            return false;
                        }
                    }
                };
                return RHDPThankyou;
            }(HTMLElement));
            exports_7("default", RHDPThankyou);
            window.addEventListener('WebComponentsReady', function () {
                customElements.define('rhdp-thankyou', RHDPThankyou);
            });
        }
    };
});
System.register("@rhd/rhdp-tryitnow", [], function (exports_8, context_8) {
    "use strict";
    var RHDPTryItNow, templateObject_3;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
            RHDPTryItNow = (function (_super) {
                __extends(RHDPTryItNow, _super);
                function RHDPTryItNow() {
                    var _this = _super.call(this) || this;
                    _this._title = '';
                    _this._subtitle = '';
                    _this._buttonID = '';
                    _this._buttonText = '';
                    _this._buttonLink = '';
                    _this._icon = '';
                    _this.template = function (strings, title, subtitle, buttonLink, icon, buttonText, buttonID) {
                        return "<section> \n                    <div class=\"row\"> \n                        " + (icon ? "<img src=\"" + icon + "\"> " : '') + "\n                        <div class=\"tryitnow-titles\">\n                            " + (title ? "<h4>" + title + "</h4>" : '') + "\n                            " + (subtitle ? "<h5>" + subtitle + "</h5>" : '') + "\n                        </div>\n                        <a " + (buttonID ? "id=\"" + buttonID + "\" " : '') + " href=\"" + buttonLink + "\" class=\"button medium-cta white\">" + buttonText + "</a>\n                    </div>\n                </section>";
                    };
                    return _this;
                }
                Object.defineProperty(RHDPTryItNow.prototype, "title", {
                    get: function () {
                        return this._title;
                    },
                    set: function (value) {
                        if (this._title === value)
                            return;
                        this._title = value;
                        this.setAttribute('title', this._title);
                        this.querySelector('h4') ? this.querySelector('h4').innerHTML = this._title : '';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPTryItNow.prototype, "subtitle", {
                    get: function () {
                        return this._subtitle;
                    },
                    set: function (value) {
                        if (this._subtitle === value)
                            return;
                        this._subtitle = value;
                        this.setAttribute('subtitle', this._subtitle);
                        this.querySelector('h5') ? this.querySelector('h5').innerHTML = this._subtitle : '';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPTryItNow.prototype, "buttonid", {
                    get: function () {
                        return this._buttonID;
                    },
                    set: function (value) {
                        if (this._buttonID === value)
                            return;
                        this._buttonID = value;
                        this.setAttribute('buttonid', this._buttonID);
                        this.querySelector('a') ? this.querySelector('a').id = this._buttonID : '';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPTryItNow.prototype, "buttonlink", {
                    get: function () {
                        return this._buttonLink;
                    },
                    set: function (value) {
                        if (this._buttonLink === value)
                            return;
                        this._buttonLink = value;
                        this.setAttribute('buttonlink', this._buttonLink);
                        this.querySelector('a') ? this.querySelector('a').href = this._buttonLink : '';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPTryItNow.prototype, "icon", {
                    get: function () {
                        return this._icon;
                    },
                    set: function (value) {
                        if (this._icon === value)
                            return;
                        this._icon = value;
                        this.setAttribute('icon', this._icon);
                        this.querySelector('img') ? this.querySelector('img').src = this._icon : '';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPTryItNow.prototype, "buttontext", {
                    get: function () {
                        return this._buttonText;
                    },
                    set: function (value) {
                        if (this._buttonText === value)
                            return;
                        this._buttonText = value;
                        this.setAttribute('buttontext', this._buttonText);
                        this.querySelector('a') ? this.querySelector('a').innerHTML = this._buttonText : '';
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPTryItNow.prototype.connectedCallback = function () {
                    this.innerHTML = this.template(templateObject_3 || (templateObject_3 = __makeTemplateObject(["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""])), this.title, this.subtitle, this.buttonlink, this.icon, this.buttontext, this.buttonid);
                };
                ;
                Object.defineProperty(RHDPTryItNow, "observedAttributes", {
                    get: function () {
                        return ['buttontext', 'icon', 'buttonlink', 'buttonid', 'subtitle', 'title'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPTryItNow.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                return RHDPTryItNow;
            }(HTMLElement));
            exports_8("default", RHDPTryItNow);
            window.customElements.define('rhdp-tryitnow', RHDPTryItNow);
        }
    };
});
System.register("@rhd/dp-category-list/dp-category-item-list", ["@rhelements/rhelement"], function (exports_9, context_9) {
    "use strict";
    var rhelement_4, DPCategoryItemList;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (rhelement_4_1) {
                rhelement_4 = rhelement_4_1;
            }
        ],
        execute: function () {
            DPCategoryItemList = (function (_super) {
                __extends(DPCategoryItemList, _super);
                function DPCategoryItemList() {
                    var _this = _super.call(this, 'dp-category-item-list') || this;
                    _this.template = function (el) {
                        var tpl = document.createElement("template");
                        tpl.innerHTML = "\n            <style>\n            :host[visible] {\n                display: block;\n            }\n\n            :host {\n                display: none;\n                flex: 1 1 100%;\n                grid-column: span 1;\n            }\n\n            div {\n                background: white;\n                display: grid;\n                grid-template-columns: 1fr;\n                grid-gap: 15px;\n                position: relative;\n                padding-top: 15px;\n                padding-right: 15px;\n                padding-left: 15px;\n            }\n\n            @media (min-width: 500px) {\n                :host {\n                    grid-column: span 2;\n                    margin-bottom: 30px;\n                }\n\n                div {\n                    border: 1px solid #CCCCCC;\n                }\n            }\n\n            @media (min-width: 800px) {\n                :host {\n                    grid-column: span 3;\n                }\n\n                div {\n                    grid-template-columns: repeat(2, 1fr);\n                }\n            }\n\n            @media (min-width: 1200px) {\n                :host {\n                    grid-column: span 4;\n                }\n\n                div {\n                    grid-template-columns: repeat(3, 1fr);\n                    grid-gap: 30px;\n                    background-color: #FFFFFF;\n                    padding: 30px;\n                    margin-bottom: 30px;\n                }\n            }\n            </style>\n            <div>\n            <slot></slot>\n            </div>\n            ";
                        return tpl;
                    };
                    _this._index = 1;
                    _this._visible = false;
                    return _this;
                }
                Object.defineProperty(DPCategoryItemList.prototype, "index", {
                    get: function () {
                        return this._index;
                    },
                    set: function (val) {
                        if (this._index === val)
                            return;
                        this._index = val;
                        _super.prototype.render.call(this, this.template(this));
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
                    _super.prototype.render.call(this, this.template(this));
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
            }(rhelement_4.default));
            exports_9("default", DPCategoryItemList);
            window.customElements.define('dp-category-item-list', DPCategoryItemList);
        }
    };
});
System.register("@rhd/dp-category-list/dp-category-item", ["@rhelements/rhelement"], function (exports_10, context_10) {
    "use strict";
    var rhelement_5, DPCategoryItem;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (rhelement_5_1) {
                rhelement_5 = rhelement_5_1;
            }
        ],
        execute: function () {
            DPCategoryItem = (function (_super) {
                __extends(DPCategoryItem, _super);
                function DPCategoryItem() {
                    var _this = _super.call(this, 'dp-category-item') || this;
                    _this.template = function (el) {
                        var tpl = document.createElement("template");
                        tpl.innerHTML = "\n            <style>\n            \n            </style>\n            <slot></slot>\n            ";
                        return tpl;
                    };
                    return _this;
                }
                DPCategoryItem.prototype.connectedCallback = function () {
                    _super.prototype.render.call(this, this.template(this));
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
            }(rhelement_5.default));
            exports_10("default", DPCategoryItem);
            window.customElements.define('dp-category-item', DPCategoryItem);
        }
    };
});
System.register("@rhd/dp-category-list/dp-category-list", ["@rhelements/rhelement"], function (exports_11, context_11) {
    "use strict";
    var rhelement_6, DPCategoryList;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (rhelement_6_1) {
                rhelement_6 = rhelement_6_1;
            }
        ],
        execute: function () {
            DPCategoryList = (function (_super) {
                __extends(DPCategoryList, _super);
                function DPCategoryList() {
                    var _this = _super.call(this, 'dp-category-list') || this;
                    _this.template = function (el) {
                        var tpl = document.createElement("template");
                        tpl.innerHTML = "\n<style>\n    :host {\n        position: relative;\n        background-color: #F9F9F9;\n        padding: 30px 0;\n        display: block;\n    }\n\n    section {\n        display: grid;\n        grid-template-columns: 1fr;\n        grid-template-rows: auto;\n        grid-auto-flow: row;\n        grid-gap: 0;\n        margin: 0;\n        max-width: 500px;\n    }\n\n    @media (min-width: 500px) {\n        section {\n            grid-template-columns: repeat(2, 1fr);\n            grid-column-gap: 15px;\n            margin: 0 15px;\n            max-width: 800px;\n            justify-items: center;\n        }\n    }\n\n    @media (min-width: 800px) {\n        section {\n            grid-template-columns: repeat(3, 1fr);\n            grid-column-gap: 30px;\n            margin: 0 30px;\n            max-width: 1200px;\n            justify-items: center;\n        }\n    }\n\n    @media (min-width: 1200px) {\n        section {\n            grid-template-columns: repeat(4, 1fr);\n            grid-column-gap: 30px;\n            margin: 0 auto;\n            max-width: 1260px;\n            justify-items: center;\n        }\n    }\n</style>\n<section >\n<slot></slot>\n</section>\n";
                        return tpl;
                    };
                    _this.items = [];
                    _this.active = 0;
                    return _this;
                }
                DPCategoryList.prototype.connectedCallback = function () {
                    var _this = this;
                    _super.prototype.render.call(this, this.template(this));
                    this.addEventListener('dp-category-selected', function (e) {
                        var w = window.innerWidth;
                        var cols = 4;
                        if (w < 500) {
                            cols = 1;
                        }
                        else if (w < 800) {
                            cols = 2;
                        }
                        else if (w < 1200) {
                            cols = 3;
                        }
                        var detail = e['detail'];
                        var len = _this.querySelectorAll('dp-category').length + 1;
                        var calc = 1 + (Math.ceil(detail.index / cols) * cols);
                        var idx = calc <= len ? calc : len;
                        var list = _this.querySelector('dp-category-item-list[visible]');
                        if (list) {
                            list.removeAttribute('visible');
                            _this.removeChild(list);
                        }
                        if (detail.index === _this.active) {
                            var a = _this.querySelector('dp-category[visible]');
                            if (a) {
                                a.appendChild(list);
                            }
                            _this.active = 0;
                        }
                        else {
                            if (_this.active > 0) {
                                var a = _this.querySelector("dp-category:nth-child(" + _this.active + ")");
                                if (a) {
                                    a.removeAttribute('visible');
                                    a.appendChild(list);
                                }
                                _this.active = 0;
                            }
                            _this.active = detail.index;
                            list = _this.querySelector("dp-category:nth-child(" + _this.active + ")").querySelector('dp-category-item-list');
                            if (idx < len) {
                                var rowEle = _this.querySelector("dp-category:nth-child(" + idx + ")");
                                _this.insertBefore(list, rowEle);
                            }
                            else {
                                _this.appendChild(list);
                            }
                            list.setAttribute('visible', '');
                        }
                    });
                    this.querySelector('dp-category').setAttribute('visible', '');
                };
                Object.defineProperty(DPCategoryList, "observedAttributes", {
                    get: function () {
                        return ['url', 'name'];
                    },
                    enumerable: true,
                    configurable: true
                });
                DPCategoryList.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                DPCategoryList.prototype._setVisibleCategories = function (index) {
                };
                return DPCategoryList;
            }(rhelement_6.default));
            exports_11("default", DPCategoryList);
            window.customElements.define('dp-category-list', DPCategoryList);
        }
    };
});
System.register("@rhd/dp-category-list/dp-category", ["@rhelements/rhelement"], function (exports_12, context_12) {
    "use strict";
    var rhelement_7, DPCategory;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (rhelement_7_1) {
                rhelement_7 = rhelement_7_1;
            }
        ],
        execute: function () {
            DPCategory = (function (_super) {
                __extends(DPCategory, _super);
                function DPCategory() {
                    var _this = _super.call(this, 'dp-category-list') || this;
                    _this.template = function (el) {
                        var tpl = document.createElement("template");
                        tpl.innerHTML = "\n<style>\n:host { \n    grid-column: span 1;\n    border-top: 1px solid var(--rhd-blue);\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    padding: 15px;\n    align-items: center;\n    background-color: var(--rhd-white, #ffffff);\n    position: relative;\n    z-index: 1;\n}\n\nimg, svg { \n    flex: 0 0 60px; \n    padding-right: 24px; \n    height: 60px;   \n}\n\nh4 {\n    flex: 1 0 auto;\n    color: #0066CC;\n    font-family: \"Overpass\", \"Open Sans\", Arial, Helvetica, sans-serif;\n    font-size: 14px;\n    font-weight: normal;\n    line-height: 21px;\n    margin: 0 0 5px 0;\n}\n\n:host(:hover), :host([visible]) {\n    cursor: pointer;\n    color: var(--rhd-blue);\n    fill: var(--rhd-blue);\n    border-top: 5px solid var(--rhd-blue);\n    border-bottom: 5px solid var(--rhd-blue);\n}\n\n@media (min-width: 500px) {\n    :host, :host(:hover), :host([visible]) {\n        flex-direction: column;\n        text-align: center; \n        border-top: none;\n        border-bottom: none;\n        background-color: transparent;\n        margin-bottom:30px;\n    }\n\n    :host([visible]):after, :host([visible]):before {\n        top: 100%;\n        left: 50%;\n        border: solid transparent;\n        content: \" \";\n        height: 0;\n        width: 0;\n        position: absolute;\n        pointer-events: none;\n    }\n    \n    :host([visible]):before {\n        border-bottom-color: #CCCCCC;\n        border-width: 15px;\n        margin-left: -15px;\n    }\n    :host([visible]):after {\n        border-bottom-color: #FFFFFF;\n        border-width: 16px;\n        margin-left: -16px;\n    }\n    \n\n    img, svg { flex: 0 0 150px; height: 150px; padding-right: 0; padding-bottom: 15px; }\n}\n\n@media (min-width: 800px) {\n    :host {\n        \n    }\n}\n\n@media (min-width: 1200px) {\n    :host {\n        \n    }\n}\n</style>\n" + (el.image && el.image.indexOf('svg') < 0 ? "<img src=\"" + el.image + "\">" : el.image) + "\n<h4>" + el.name + "</h4>\n<slot></slot>\n";
                        return tpl;
                    };
                    _this._visible = false;
                    _this._index = -1;
                    _this._showList = _this._showList.bind(_this);
                    return _this;
                }
                Object.defineProperty(DPCategory.prototype, "name", {
                    get: function () { return this._name; },
                    set: function (val) {
                        if (this._name === val)
                            return;
                        this._name = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPCategory.prototype, "image", {
                    get: function () { return this._image; },
                    set: function (val) {
                        if (this._image === val)
                            return;
                        if (!val.match(/\.svg$/)) {
                            this._image = val;
                        }
                        else {
                            this._getSVG(val);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPCategory.prototype, "visible", {
                    get: function () { return this._visible; },
                    set: function (val) {
                        val = val !== null && val !== false ? true : false;
                        if (this._visible === val)
                            return;
                        this._visible = val;
                        var evt = {
                            detail: {
                                index: this._getIndex(this)
                            },
                            bubbles: true,
                            composed: true
                        };
                        this.dispatchEvent(new CustomEvent('dp-category-selected', evt));
                        if (this._visible) {
                            this.setAttribute('visible', '');
                        }
                        else {
                            this.removeAttribute('visible');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPCategory.prototype, "index", {
                    get: function () {
                        return this._index;
                    },
                    set: function (val) {
                        if (this._index === val)
                            return;
                        this._index = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                DPCategory.prototype.connectedCallback = function () {
                    var _this = this;
                    _super.prototype.render.call(this, this.template(this));
                    this.addEventListener('click', function (e) {
                        e.preventDefault();
                        _this.visible = !_this.visible;
                        return false;
                    });
                };
                Object.defineProperty(DPCategory, "observedAttributes", {
                    get: function () {
                        return ['name', 'image', 'visible'];
                    },
                    enumerable: true,
                    configurable: true
                });
                DPCategory.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                DPCategory.prototype._showList = function () {
                    this.visible = !this.visible;
                };
                DPCategory.prototype._getIndex = function (node) {
                    if (this.index < 0) {
                        var i = 1;
                        while (node = node.previousElementSibling) {
                            if (node.nodeName === 'DP-CATEGORY') {
                                ++i;
                            }
                        }
                        return i;
                    }
                    else {
                        return this.index;
                    }
                };
                DPCategory.prototype._getSVG = function (path) {
                    return __awaiter(this, void 0, void 0, function () {
                        var resp, svg;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, fetch(path)];
                                case 1:
                                    resp = _a.sent();
                                    return [4, resp.text()];
                                case 2:
                                    svg = _a.sent();
                                    this.image = svg.substring(svg.indexOf('<svg'));
                                    _super.prototype.render.call(this, this.template(this));
                                    return [2];
                            }
                        });
                    });
                };
                return DPCategory;
            }(rhelement_7.default));
            exports_12("default", DPCategory);
            window.customElements.define('dp-category', DPCategory);
        }
    };
});
System.register("@rhd/dp-category-list/dp-product-short-teaser", ["@rhelements/rhelement"], function (exports_13, context_13) {
    "use strict";
    var rhelement_8, DPProductShortTeaser;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (rhelement_8_1) {
                rhelement_8 = rhelement_8_1;
            }
        ],
        execute: function () {
            DPProductShortTeaser = (function (_super) {
                __extends(DPProductShortTeaser, _super);
                function DPProductShortTeaser() {
                    var _this = _super.call(this, 'dp-product-short-teaser') || this;
                    _this.template = function (el) {
                        var tpl = document.createElement("template");
                        tpl.innerHTML = "\n<style>\n    :host { \n        font-family: \"Overpass\", \"Open Sans\", Arial, Helvetica, sans-serif;\n        font-size: 14px;\n        line-height: 21px;\n        margin-bottom: 30px;\n        display: flex;\n        flex-direction: column;\n        text-align: left;\n    }\n    h4 { \n        flex: 0 0 24px;\n        font-family: \"Overpass\", \"Open Sans\", Arial, Helvetica, sans-serif;\n        font-size: 14px;\n        font-weight: bold;\n        line-height: 24px;\n        margin: 0 0 5px 0;\n    }\n    h4 a {\n        color: #0066CC;\n        text-decoration: none;\n    }\n\n    div {\n        flex: 1 1 auto;\n        margin-bottom: 16px;\n        color: #000000;\n    }\n\n    a.more {\n        flex: 0 0 25px;\n        display: block;\n        width: auto;\n        color: #0066CC;\n        font-size: 16px;\n        line-height: 25px;\n    }\n</style>\n<h4><a href=\"" + el.link + "\">" + el.name + "</a></h4>\n<div>\n<slot></slot>\n</div>\n<a class=\"more\" href=\"" + el.downloadLink + "\">View all downloads <i class=\"fas fa-caret-right\"></i></a>\n        ";
                        return tpl;
                    };
                    return _this;
                }
                Object.defineProperty(DPProductShortTeaser.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (val) {
                        if (this._name === val)
                            return;
                        this._name = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPProductShortTeaser.prototype, "link", {
                    get: function () {
                        return this._link;
                    },
                    set: function (val) {
                        if (this._link === val)
                            return;
                        this._link = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPProductShortTeaser.prototype, "downloadLink", {
                    get: function () {
                        return this._downloadLink;
                    },
                    set: function (val) {
                        if (this._downloadLink === val)
                            return;
                        this._downloadLink = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                DPProductShortTeaser.prototype.connectedCallback = function () {
                    _super.prototype.render.call(this, this.template(this));
                };
                Object.defineProperty(DPProductShortTeaser, "observedAttributes", {
                    get: function () {
                        return ['name', 'link', 'download-link'];
                    },
                    enumerable: true,
                    configurable: true
                });
                DPProductShortTeaser.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    if (name !== 'download-link') {
                        this[name] = newVal;
                    }
                    else {
                        this.downloadLink = newVal;
                    }
                };
                return DPProductShortTeaser;
            }(rhelement_8.default));
            exports_13("default", DPProductShortTeaser);
            window.customElements.define('dp-product-short-teaser', DPProductShortTeaser);
        }
    };
});
System.register("@rhd/rhdp-downloads/rhdp-downloads-all-item", ["@rhd/rhdp-os-download"], function (exports_14, context_14) {
    "use strict";
    var rhdp_os_download_1, RHDPDownloadsAllItem, templateObject_4, templateObject_5;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [
            function (rhdp_os_download_1_1) {
                rhdp_os_download_1 = rhdp_os_download_1_1;
            }
        ],
        execute: function () {
            RHDPDownloadsAllItem = (function (_super) {
                __extends(RHDPDownloadsAllItem, _super);
                function RHDPDownloadsAllItem() {
                    var _this = _super.call(this) || this;
                    _this.template = function (strings, name, productId, dataFallbackUrl, downloadUrl, learnMore, description, version, platform) {
                        return "\n            <div class=\"row\">\n                <hr>\n                <div class=\"large-24 column\">\n                    <h5>" + name + "</h5>\n                </div>\n            \n                <div class=\"large-10 columns\">\n                    <p></p>\n            \n                    <div class=\"paragraph\">\n                        <p>" + description + "</p>\n                    </div>\n                    <a href=\"" + learnMore + "\">Learn More</a></div>\n            \n                <div class=\"large-9 center columns\">\n                \n                  " + (version ? "<p data-download-id-version=\"" + productId + "\">Version: " + version + " " + (_this.platform ? "for " + platform : '') + "</p>" : "<p data-download-id-version=\"" + productId + "\">&nbsp;</p>") + "  \n                </div>\n            \n                <div class=\"large-5 columns\"><a class=\"button medium-cta blue\" data-download-id=\"" + productId + "\"\n                                                data-fallback-url=\"" + dataFallbackUrl + "\"\n                                                href=\"" + downloadUrl + "\">Download</a></div>\n            </div>\n";
                    };
                    return _this;
                }
                Object.defineProperty(RHDPDownloadsAllItem.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        if (this._name === value)
                            return;
                        this._name = value;
                        this.setAttribute('name', this.name);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsAllItem.prototype, "productId", {
                    get: function () {
                        return this._productId;
                    },
                    set: function (value) {
                        if (this.productId === value)
                            return;
                        this._productId = value;
                        this.setAttribute('productid', this._productId);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsAllItem.prototype, "dataFallbackUrl", {
                    get: function () {
                        return this._dataFallbackUrl;
                    },
                    set: function (value) {
                        if (this.dataFallbackUrl === value)
                            return;
                        this._dataFallbackUrl = value;
                        this.setAttribute('datafallbackurl', this._dataFallbackUrl);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsAllItem.prototype, "downloadUrl", {
                    get: function () {
                        return this._downloadUrl;
                    },
                    set: function (value) {
                        if (this.downloadUrl === value)
                            return;
                        this._downloadUrl = value;
                        this.setAttribute('downloadurl', this._downloadUrl);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsAllItem.prototype, "description", {
                    get: function () {
                        return this._description;
                    },
                    set: function (value) {
                        this._description = value;
                        this.setAttribute('description', this._description);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsAllItem.prototype, "learnMore", {
                    get: function () {
                        return this._learnMore;
                    },
                    set: function (value) {
                        this._learnMore = value;
                        this.setAttribute('learnmore', this._learnMore);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsAllItem.prototype, "version", {
                    get: function () {
                        return this._version;
                    },
                    set: function (value) {
                        this._version = value;
                        this.setAttribute('version', this._version);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsAllItem.prototype, "platform", {
                    get: function () {
                        return this._platform;
                    },
                    set: function (value) {
                        this._platform = value;
                        this.setAttribute('platform', this._platform);
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPDownloadsAllItem.prototype.connectedCallback = function () {
                    if (this.productId === 'cdk') {
                        this.osVersionExtract(this.productId);
                        this.innerHTML = this.template(templateObject_4 || (templateObject_4 = __makeTemplateObject(["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""])), this.name, this.productId, this.dataFallbackUrl, this.downloadUrl, this.learnMore, this.description, this.version, this.platform);
                    }
                    else {
                        this.innerHTML = this.template(templateObject_5 || (templateObject_5 = __makeTemplateObject(["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""])), this.name, this.productId, this.dataFallbackUrl, this.downloadUrl, this.learnMore, this.description, this.version, null);
                    }
                };
                RHDPDownloadsAllItem.prototype.osVersionExtract = function (productId) {
                    var osPlatform = new rhdp_os_download_1.default();
                    osPlatform.platformType = osPlatform.getUserAgent();
                    osPlatform.downloadURL = this.downloadUrl;
                    osPlatform.setOSURL(productId);
                    osPlatform.setDownloadURLByPlatform();
                    this.downloadUrl = osPlatform.downloadURL;
                    this.platform = osPlatform.platformType;
                };
                Object.defineProperty(RHDPDownloadsAllItem, "observedAttributes", {
                    get: function () {
                        return ['name'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPDownloadsAllItem.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                return RHDPDownloadsAllItem;
            }(HTMLElement));
            exports_14("default", RHDPDownloadsAllItem);
            window.customElements.define('rhdp-downloads-all-item', RHDPDownloadsAllItem);
        }
    };
});
System.register("@rhd/rhdp-downloads/rhdp-downloads-all", ["@rhd/rhdp-downloads/rhdp-downloads-all-item"], function (exports_15, context_15) {
    "use strict";
    var rhdp_downloads_all_item_1, RHDPDownloadsAll, templateObject_6;
    var __moduleName = context_15 && context_15.id;
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
                    this.innerHTML = this.template(templateObject_6 || (templateObject_6 = __makeTemplateObject(["", "", ""], ["", "", ""])), this.id, this.heading);
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
            exports_15("default", RHDPDownloadsAll);
            window.customElements.define('rhdp-downloads-all', RHDPDownloadsAll);
        }
    };
});
System.register("@rhd/rhdp-downloads/rhdp-downloads-popular-product", ["@rhd/rhdp-os-download"], function (exports_16, context_16) {
    "use strict";
    var rhdp_os_download_2, RHDPDownloadsPopularProduct, templateObject_7;
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [
            function (rhdp_os_download_2_1) {
                rhdp_os_download_2 = rhdp_os_download_2_1;
            }
        ],
        execute: function () {
            RHDPDownloadsPopularProduct = (function (_super) {
                __extends(RHDPDownloadsPopularProduct, _super);
                function RHDPDownloadsPopularProduct() {
                    var _this = _super.call(this) || this;
                    _this.template = function (strings, name, id, dataFallbackUrl, url) {
                        return "\n        <div class=\"large-6 column\">\n            <div class=\"popular-download-box\">\n                <h4>" + name + "</h4>\n                <a class=\"button heavy-cta\" data-download-id=\"" + id + "\" data-fallback-url=\"" + dataFallbackUrl + "\" href=\"" + url + "\"><i class=\"fa fa-download\"></i> Download</a>\n            </div>\n        </div>";
                    };
                    return _this;
                }
                Object.defineProperty(RHDPDownloadsPopularProduct.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        if (this._name === value)
                            return;
                        this._name = value;
                        this.setAttribute('name', this.name);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsPopularProduct.prototype, "productId", {
                    get: function () {
                        return this._productId;
                    },
                    set: function (value) {
                        if (this.productId === value)
                            return;
                        this._productId = value;
                        this.setAttribute('productid', this.productId);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsPopularProduct.prototype, "dataFallbackUrl", {
                    get: function () {
                        return this._dataFallbackUrl;
                    },
                    set: function (value) {
                        if (this.dataFallbackUrl === value)
                            return;
                        this._dataFallbackUrl = value;
                        this.setAttribute('datafallbackurl', this.dataFallbackUrl);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsPopularProduct.prototype, "downloadUrl", {
                    get: function () {
                        return this._downloadUrl;
                    },
                    set: function (value) {
                        if (this.downloadUrl === value)
                            return;
                        this._downloadUrl = value;
                        this.setAttribute('downloadurl', this.downloadUrl);
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPDownloadsPopularProduct.prototype.osVersionExtract = function (productId) {
                    var osPlatform = new rhdp_os_download_2.default();
                    osPlatform.platformType = osPlatform.getUserAgent();
                    osPlatform.downloadURL = this.downloadUrl;
                    osPlatform.setOSURL(productId);
                    osPlatform.setDownloadURLByPlatform();
                    this.downloadUrl = osPlatform.downloadURL;
                };
                RHDPDownloadsPopularProduct.prototype.connectedCallback = function () {
                    this.osVersionExtract(this.productId);
                    this.innerHTML = this.template(templateObject_7 || (templateObject_7 = __makeTemplateObject(["", "", "", "", ""], ["", "", "", "", ""])), this.name, this.productId, this.dataFallbackUrl, this.downloadUrl);
                };
                Object.defineProperty(RHDPDownloadsPopularProduct, "observedAttributes", {
                    get: function () {
                        return ['name', 'productid', 'downloadurl', 'datafallbackurl'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPDownloadsPopularProduct.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                return RHDPDownloadsPopularProduct;
            }(HTMLElement));
            exports_16("default", RHDPDownloadsPopularProduct);
            window.customElements.define('rhdp-downloads-popular-product', RHDPDownloadsPopularProduct);
        }
    };
});
System.register("@rhd/rhdp-downloads/rhdp-downloads-popular-products", ["@rhd/rhdp-downloads/rhdp-downloads-popular-product"], function (exports_17, context_17) {
    "use strict";
    var rhdp_downloads_popular_product_1, RHDPDownloadsPopularProducts;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [
            function (rhdp_downloads_popular_product_1_1) {
                rhdp_downloads_popular_product_1 = rhdp_downloads_popular_product_1_1;
            }
        ],
        execute: function () {
            RHDPDownloadsPopularProducts = (function (_super) {
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
            exports_17("default", RHDPDownloadsPopularProducts);
            window.customElements.define('rhdp-downloads-popular-products', RHDPDownloadsPopularProducts);
        }
    };
});
System.register("@rhd/rhdp-downloads/rhdp-downloads-products", [], function (exports_18, context_18) {
    "use strict";
    var RHDPDownloadsProducts;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
            RHDPDownloadsProducts = (function (_super) {
                __extends(RHDPDownloadsProducts, _super);
                function RHDPDownloadsProducts() {
                    var _this = _super.call(this) || this;
                    _this._products = {
                        "products": [{
                                "productName": "Red Hat JBoss Data Grid",
                                "groupHeading": "ACCELERATED DEVELOPMENT AND MANAGEMENT",
                                "productCode": "datagrid",
                                "featured": false,
                                "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=data.grid&downloadType=distributions",
                                "downloadLink": "",
                                "description": "An in-memory data grid to accelerate performance that is fast, distributed, scalable, and independent from the data tier.",
                                "version": "",
                                "learnMoreLink": "/products/datagrid/overview/"
                            }, {
                                "productName": "Red Hat JBoss Enterprise Application Platform",
                                "groupHeading": "ACCELERATED DEVELOPMENT AND MANAGEMENT",
                                "productCode": "eap",
                                "featured": false,
                                "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=appplatform&downloadType=distributions",
                                "downloadLink": "",
                                "description": "An innovative, modular, cloud-ready application platform that addresses management, automation and developer productivity.",
                                "version": "",
                                "learnMoreLink": "/products/eap/overview/"
                            }, {
                                "productName": "Red Hat JBoss Web Server",
                                "groupHeading": "ACCELERATED DEVELOPMENT AND MANAGEMENT",
                                "featured": false,
                                "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?downloadType=distributions&product=webserver&productChanged=yes",
                                "downloadLink": "/products/webserver/download/",
                                "description": "Apache httpd, Tomcat, etc. to provide a single solution for large-scale websites and light-weight Java web applications.",
                                "version": "",
                                "learnMoreLink": "/products/webserver/overview/"
                            }, {
                                "productName": "Red Hat Application Migration Toolkit",
                                "groupHeading": "DEVELOPER TOOLS",
                                "productCode": "migrationtoolkit",
                                "featured": false,
                                "dataFallbackUrl": "https://access.redhat.com/downloads",
                                "downloadLink": "",
                                "description": "Red Hat Application Migration Toolkit is an assembly of open source tools that enables large-scale application migrations and modernizations. The tooling consists of multiple individual components that provide support for each phase of a migration process.",
                                "version": "",
                                "learnMoreLink": "/products/rhamt/overview/"
                            }, {
                                "productName": "Red Hat Container Development Kit",
                                "groupHeading": "DEVELOPER TOOLS",
                                "productCode": "cdk",
                                "featured": false,
                                "dataFallbackUrl": "https://access.redhat.com/downloads/content/293/",
                                "downloadLink": "",
                                "description": "For container development, includes RHEL and OpenShift 3.",
                                "version": "",
                                "learnMoreLink": "/products/cdk/overview/"
                            }, {
                                "productName": "Red Hat JBoss Developer Studio",
                                "groupHeading": "DEVELOPER TOOLS",
                                "productCode": "devstudio",
                                "featured": false,
                                "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=jbossdeveloperstudio&downloadType=distributions",
                                "downloadLink": "",
                                "description": "An Eclipse-based IDE to create apps for web, mobile, transactional enterprise, and SOA-based integration apps/services.",
                                "version": "",
                                "learnMoreLink": "/products/devstudio/overview/"
                            }, {
                                "productName": "Red Hat Enterprise Linux",
                                "groupHeading": "INFRASTRUCTURE",
                                "productCode": "rhel",
                                "featured": true,
                                "dataFallbackUrl": "https://access.redhat.com/downloads/content/69/",
                                "downloadLink": "",
                                "description": "For traditional development, includes Software Collections and Developer Toolset.",
                                "version": "",
                                "learnMoreLink": "/products/rhel/overview/"
                            }, {
                                "productName": "Red Hat JBoss AMQ",
                                "groupHeading": "INTEGRATION AND AUTOMATION",
                                "productCode": "amq",
                                "featured": false,
                                "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=jboss.amq&downloadType=distributions",
                                "downloadLink": "",
                                "description": "A small-footprint, performant, robust messaging platform that enables real-time app, device, and service integration.",
                                "version": "",
                                "learnMoreLink": "/products/amq/overview/"
                            }, {
                                "productName": "Red Hat Decision Manager",
                                "groupHeading": "INTEGRATION AND AUTOMATION",
                                "productCode": "brms",
                                "featured": false,
                                "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=brms&downloadType=distributions",
                                "downloadLink": "",
                                "description": "A programming platform to easily capture and maintain rules for business changes, without impacting static applications.",
                                "version": "",
                                "learnMoreLink": "/products/red-hat-decision-manager/overview/"
                            }, {
                                "productName": "Red Hat Process Automation Manager",
                                "groupHeading": "INTEGRATION AND AUTOMATION",
                                "productCode": "rhpam",
                                "featured": false,
                                "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?downloadType=distributions&product=bpm.suite&productChanged=yes",
                                "downloadLink": "",
                                "description": "A platform that combines business rules and process management (BPM), and complex event processing.",
                                "version": "",
                                "learnMoreLink": "/products/rhpam/overview/"
                            }, {
                                "productName": "Red Hat JBoss Data Virtualization",
                                "groupHeading": "INTEGRATION AND AUTOMATION",
                                "productCode": "datavirt",
                                "featured": false,
                                "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=data.services.platform&downloadType=distributions",
                                "downloadLink": "",
                                "description": "A tool that brings operational and analytical insight from data dispersed in various business units, apps, and technologies.",
                                "version": "",
                                "learnMoreLink": "/products/datavirt/overview/"
                            }, {
                                "productName": "Red Hat JBoss Fuse",
                                "groupHeading": "INTEGRATION AND AUTOMATION",
                                "productCode": "fuse",
                                "featured": true,
                                "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=jboss.fuse&downloadType=distributions",
                                "downloadLink": "",
                                "description": "A small-footprint enterprise service bus (ESB) that lets you build, deploy and integrate applications and services.",
                                "version": "",
                                "learnMoreLink": "/products/fuse/overview/"
                            }, {
                                "productName": "Red Hat Mobile Application Platform",
                                "groupHeading": "MOBILE",
                                "featured": true,
                                "dataFallbackUrl": "https://access.redhat.com/downloads/content/316/",
                                "downloadLink": "/products/mobileplatform/download/",
                                "description": "Develop and deploy mobile apps in an agile and flexible manner.",
                                "version": "",
                                "learnMoreLink": "/products/mobileplatform/overview/"
                            }, {
                                "productName": "Red Hat OpenShift Container Platform",
                                "groupHeading": "CLOUD",
                                "productCode": "openshift",
                                "featured": false,
                                "dataFallbackUrl": "https://access.redhat.com/downloads/content/290/",
                                "downloadLink": "",
                                "description": "An open, hybrid Platform-as-a-Service (PaaS) to quickly develop, host, scale, and deliver apps in the cloud.",
                                "version": "",
                                "learnMoreLink": "/products/openshift/overview/"
                            }, {
                                "productName": "OpenJDK",
                                "groupHeading": "LANGUAGES AND COMPILERS",
                                "productCode": "openjdk",
                                "featured": false,
                                "dataFallbackUrl": "/products/openjdk/overview/",
                                "downloadLink": "",
                                "description": "A Tried, Tested and Trusted open source implementation of the Java platform",
                                "version": "",
                                "learnMoreLink": "/products/openjdk/overview/"
                            }]
                    };
                    return _this;
                }
                Object.defineProperty(RHDPDownloadsProducts.prototype, "category", {
                    get: function () {
                        return this._category;
                    },
                    set: function (value) {
                        if (this._category === value)
                            return;
                        this._category = value;
                        this.setAttribute('category', this._category);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsProducts.prototype, "products", {
                    get: function () {
                        return this._products;
                    },
                    set: function (value) {
                        if (this._products === value)
                            return;
                        this._products = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPDownloadsProducts.prototype, "data", {
                    get: function () {
                        return this._data;
                    },
                    set: function (value) {
                        if (this._data === value)
                            return;
                        this._data = value;
                        this.setAttribute('data', this._data);
                        this._createProductList();
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPDownloadsProducts.prototype._createProductList = function () {
                    var tempProductList = { "products": [] };
                    if (this._data) {
                        var productLen = this.products.products.length;
                        var dataLen = this.data.length;
                        for (var i = 0; i < productLen; i++) {
                            var product = this.products.products[i];
                            for (var j = 0; j < dataLen; j++) {
                                var data = this.data[j];
                                if (data['productCode'] == product['productCode']) {
                                    this.products.products[i]['downloadLink'] = data['featuredArtifact']['url'];
                                    this.products.products[i]['version'] = data['featuredArtifact']['versionName'];
                                }
                            }
                            tempProductList['products'].push(product);
                        }
                    }
                    this.products = tempProductList;
                };
                return RHDPDownloadsProducts;
            }(HTMLElement));
            exports_18("default", RHDPDownloadsProducts);
            window.customElements.define('rhdp-downloads-products', RHDPDownloadsProducts);
        }
    };
});
System.register("@rhd/rhdp-downloads/rhdp-downloads-app", ["@rhd/rhdp-downloads/rhdp-downloads-popular-products", "@rhd/rhdp-downloads/rhdp-downloads-products", "@rhd/rhdp-downloads/rhdp-downloads-all"], function (exports_19, context_19) {
    "use strict";
    var rhdp_downloads_popular_products_1, rhdp_downloads_products_1, rhdp_downloads_all_1, RHDPDownloadsApp;
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [
            function (rhdp_downloads_popular_products_1_1) {
                rhdp_downloads_popular_products_1 = rhdp_downloads_popular_products_1_1;
            },
            function (rhdp_downloads_products_1_1) {
                rhdp_downloads_products_1 = rhdp_downloads_products_1_1;
            },
            function (rhdp_downloads_all_1_1) {
                rhdp_downloads_all_1 = rhdp_downloads_all_1_1;
            }
        ],
        execute: function () {
            RHDPDownloadsApp = (function (_super) {
                __extends(RHDPDownloadsApp, _super);
                function RHDPDownloadsApp() {
                    var _this = _super.call(this) || this;
                    _this.stage_download_url = 'https://developers.stage.redhat.com';
                    _this.popularProduct = new rhdp_downloads_popular_products_1.default();
                    _this.products = new rhdp_downloads_products_1.default();
                    _this.template = "<div class=\"hero hero-wide hero-downloads\">\n                    <div class=\"row\">\n                        <div class=\"large-12 medium-24 columns\" id=\"downloads\">\n                            <h2>Downloads</h2>\n                        </div>\n                    </div>\n                </div>\n                <span class=\"dl-outage-msg\"></span>\n                <div class=\"most-popular-downloads\">\n                    <div class=\"row\">\n                        <div class=\"large-24 column\">\n                            <h3>Most Popular</h3>\n                        </div>\n                    </div>\n                \n                    <div class=\"row\">\n                    </div>\n                </div>\n                <div class=\"row\" id=\"downloads\">\n                    <div class=\"large-24 columns\">\n                        <h3 class=\"downloads-header\">All Downloads</h3>\n                    </div>\n                </div>";
                    return _this;
                }
                Object.defineProperty(RHDPDownloadsApp.prototype, "url", {
                    get: function () {
                        return this._url;
                    },
                    set: function (val) {
                        if (this._url === val)
                            return;
                        this._url = val;
                        this.setAttribute('url', this.url);
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPDownloadsApp.prototype.connectedCallback = function () {
                    this.innerHTML = this.template;
                    this.setProductsDownloadData(this.url);
                };
                RHDPDownloadsApp.prototype.addGroups = function (productList) {
                    this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('accelerated_development_and_management', 'ACCELERATED DEVELOPMENT AND MANAGEMENT', productList));
                    this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('developer_tools', 'DEVELOPER TOOLS', productList));
                    this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('infrastructure', 'INFRASTRUCTURE', productList));
                    this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('integration_and_automation', 'INTEGRATION AND AUTOMATION', productList));
                    this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('mobile', 'MOBILE', productList));
                    this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('cloud', 'CLOUD', productList));
                    this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('runtimes', 'LANGUAGES AND COMPILERS', productList));
                };
                RHDPDownloadsApp.prototype.setPopularProducts = function (productList) {
                    this.popularProduct.productList = productList.products;
                    this.querySelector('.most-popular-downloads .row').appendChild(this.popularProduct);
                };
                RHDPDownloadsApp.prototype.downloadsAllFactory = function (id, heading, productList) {
                    var downloads = new rhdp_downloads_all_1.default();
                    downloads.id = id;
                    downloads.heading = heading;
                    downloads.products = productList;
                    return downloads;
                };
                RHDPDownloadsApp.prototype.setProductsDownloadData = function (url) {
                    var _this = this;
                    if (window.location.origin.indexOf('developers.stage.redhat.com') > 0) {
                        url = url.replace(/http(s)?:\/\/developers.redhat.com/g, this.stage_download_url);
                    }
                    var fInit = {
                        method: 'GET',
                        headers: new Headers(),
                        mode: 'cors',
                        cache: 'default'
                    };
                    fetch(url, fInit)
                        .then(function (resp) { return resp.json(); })
                        .then(function (data) {
                        _this.products.data = data;
                        _this.setPopularProducts(_this.products);
                        _this.addGroups(_this.products);
                    });
                };
                Object.defineProperty(RHDPDownloadsApp, "observedAttributes", {
                    get: function () {
                        return ['url'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPDownloadsApp.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                return RHDPDownloadsApp;
            }(HTMLElement));
            exports_19("default", RHDPDownloadsApp);
            window.customElements.define('rhdp-downloads-app', RHDPDownloadsApp);
        }
    };
});
var RHDPProjectFilterBox = (function (_super) {
    __extends(RHDPProjectFilterBox, _super);
    function RHDPProjectFilterBox() {
        var _this = _super.call(this) || this;
        _this._term = '';
        _this._filter = '';
        _this.template = function (strings, project) {
            return "\n        <form action=\"\" class=\"project-filters\" method=\"GET\" data-drupal-form-fields=\"\">\n            <h4>Filters<a class=\"project-filters-clear\" href=\"#\">Clear All Filters</a></h4>\n            <input name=\"filter-text\" placeholder=\"Filter by keyword\" type=\"text\" value=\"" + project.term + "\">\n            <div class=\"filter-block\">\n                <h5>Included In</h5>\n        \n                <div class=\"styled-select\" ><select name=\"filter-products\" id=\"upstream-project-selection\">\n                    <option value=\"\">Select Product...</option>\n                    <option value=\"amq\">Red Hat JBoss AMQ</option>\n                    <option value=\"rhpam\">Red Hat Process Automation Manager</option>\n                    <option value=\"brms\">Red Hat Decision Manager</option>\n                    <option value=\"datagrid\">Red Hat JBoss Data Grid</option>\n                    <option value=\"datavirt\">Red Hat JBoss Data Virtualization</option>\n                    <option value=\"devstudio\">Red Hat JBoss Developer Studio</option>\n                    <option value=\"eap\">Red Hat JBoss Enterprise Application Platform</option>\n                    <option value=\"fuse\">Red Hat JBoss Fuse</option>\n                    <option value=\"rhel\">Red Hat Enterprise Linux</option>\n                    <option value=\"webserver\">Red Hat JBoss Web Server</option>\n                </select></div>\n            </div>\n        </form>\n";
        };
        return _this;
    }
    Object.defineProperty(RHDPProjectFilterBox.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        set: function (value) {
            this._filter = decodeURI(value);
            var filterAttrib = this.querySelector('select[name="filter-products"]');
            if (value === "") {
                filterAttrib.selectedIndex = 0;
            }
            else {
                filterAttrib.setAttribute('value', this.filter);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectFilterBox.prototype, "term", {
        get: function () {
            return this._term;
        },
        set: function (value) {
            this._term = decodeURI(value);
            this.querySelector('input').value = this.term;
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjectFilterBox.prototype.connectedCallback = function () {
        var _this = this;
        this.innerHTML = this.template(__makeTemplateObject(["", ""], ["", ""]), this);
        this.addEventListener('submit', function (e) {
            e.preventDefault();
            _this._filterChange(e);
        });
        this.querySelector('select[name="filter-products"]').addEventListener('change', function (e) {
            e.preventDefault();
            _this._filterChange(e);
        });
        this.querySelector('.project-filters-clear').addEventListener('click', function (e) {
            e.preventDefault();
            _this._clearFilters(e);
        });
    };
    RHDPProjectFilterBox.prototype._clearFilters = function (e) {
        e.preventDefault();
        this.filter = "";
        this.term = "";
        this._updateProjectFilters();
    };
    RHDPProjectFilterBox.prototype._filterChange = function (e) {
        if (e.currentTarget.id == "upstream-project-selection") {
            this.filter = e.currentTarget.value;
        }
        this.term = this.querySelector('input').value;
        this._updateProjectFilters();
    };
    RHDPProjectFilterBox.prototype._updateProjectFilters = function () {
        this.dispatchEvent(new CustomEvent('project-filter-change', {
            detail: {
                filter: this.filter,
                term: this.term
            },
            bubbles: true
        }));
    };
    Object.defineProperty(RHDPProjectFilterBox, "observedAttributes", {
        get: function () {
            return ['loading'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjectFilterBox.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    return RHDPProjectFilterBox;
}(HTMLElement));
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-project-filter-box', RHDPProjectFilterBox);
});
var RHDPProjectItem = (function (_super) {
    __extends(RHDPProjectItem, _super);
    function RHDPProjectItem() {
        var _this = _super.call(this) || this;
        _this.template = function (strings, project) {
            return "\n        \n            <div class=\"defaultprojectimage\">\n                <p class=\"image-link\"><img src=\"" + project.imageUrl + "\" alt=\"" + project.projectName + "\"></p></div>\n            <h5 class=\"solution-name\">\n                <p class=\"solution-name-link\">" + project.projectName + "</p>\n            </h5>\n            <p>\n        \n            </p>\n            <a class=\"solution-overlay-learn link-sm\">Learn more</a> " + (project.downloadsLink ? "| <a href=\"" + project.downloadsLink + "\" class=\"link-sm\">Download</a>" : '') + "\n            <div class=\"project-content row\">\n                <div class=\"large-6 project-content-left columns\"><img\n                        src=\"" + project.imageUrl + "\" alt=\"" + project.projectName + "\">\n                    <p><a class=\"upstream-download\" href=\"" + project.downloadsLink + "\"><i class=\"fa fa-download\"></i> Download</a></p>\n                    <p>\n                        " + (project.sys_url_view ? "<a href=\"" + project.sys_url_view + "\">Visit home page</a>" : '') + "\n                    </p>\n                    <ul class=\"project-social\"> \n                        " + (project.twitterLink ? "<li><a href=\"" + project.twitterLink + "\"><i class=\"fa fa-twitter\"></i></a></li>" : '') + "\n                    </ul>\n                </div>\n                <div class=\"large-18 project-content-right columns\"><h3><a href=\"" + project.sys_url_view + "\">" + project.projectName + "</a>\n                </h3>\n                    <p>" + project.descriptions + "</p>\n                    <div class=\"upstream-more-content\">\n                        <ul class=\"project-details-list\">\n                            " + (project.docsLink ? "<li>Docs: <a href=\"" + project.docsLink + "\">Documentation</a></li>" : '') + "\n                            " + (project.communityLink ? "<li>Community: <a href=\"" + project.communityLink + "\">" + project.generateViewLink(project.communityLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "\n                            " + (project.mailingListLink ? "<li>Mailing List: <a href=\"" + project.mailingListLink + "\">" + project.generateViewLink(project.mailingListLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "\n                            " + (project.chatLink ? "<li>Chat: <a href=\"" + project.chatLink + "\">" + project.generateViewLink(project.chatLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "\n                            " + (project.jiraLink ? "<li>JIRA: <a href=\"" + project.jiraLink + "\">" + project.generateViewLink(project.jiraLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "\n                            " + (project.srcLink ? "<li>Source: <a href=\"" + project.srcLink + "\">" + project.generateViewLink(project.srcLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "\n                            " + (project.githubLink ? "<li>Github: <a href=\"" + project.githubLink + "\">" + project.generateViewLink(project.githubLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "\n                            " + (project.buildLink ? "<li>Build: <a href=\"" + project.buildLink + "\">" + project.generateViewLink(project.buildLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "\n                            " + (project.issueTracker ? "<li>Issue: <a href=\"" + project.issueTracker + "\">" + project.generateViewLink(project.issueTracker) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "\n                            " + (project.userForumLink ? "<li>User Forum: <a href=\"" + project.userForumLink + "\">" + project.generateViewLink(project.userForumLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "  \n                            " + (project.devForumLink ? "<li>Dev Forum: <a href=\"" + project.devForumLink + "\">" + project.generateViewLink(project.devForumLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "  \n                            " + (project.knowledgebaseLink ? "<li>KnowledgeBase: <a href=\"" + project.knowledgebaseLink + "\">" + project.generateViewLink(project.knowledgebaseLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + " \n                            " + (project.blogLink ? "<li>Blog: <a href=\"" + project.blogLink + "\">" + project.generateViewLink(project.blogLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + " \n                            " + (project.anonymousLink ? "<li>Anonymous Source: <a href=\"" + project.anonymousLink + "\">" + project.generateViewLink(project.anonymousLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + " \n                        </ul>\n                    </div>\n                </div>\n            </div>\n        ";
        };
        return _this;
    }
    Object.defineProperty(RHDPProjectItem.prototype, "userForumLink", {
        get: function () {
            return this._userForumLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._userForumLink === value)
                return;
            this._userForumLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "devForumLink", {
        get: function () {
            return this._devForumLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._devForumLink === value)
                return;
            this._devForumLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "mailingListLink", {
        get: function () {
            return this._mailingListLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._mailingListLink === value)
                return;
            this._mailingListLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "chatLink", {
        get: function () {
            return this._chatLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._chatLink === value)
                return;
            this._chatLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "blogLink", {
        get: function () {
            return this._blogLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._blogLink === value)
                return;
            this._blogLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "jiraLink", {
        get: function () {
            return this._jiraLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._jiraLink === value)
                return;
            this._jiraLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "srcLink", {
        get: function () {
            return this._srcLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._srcLink === value)
                return;
            this._srcLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "anonymousLink", {
        get: function () {
            return this._anonymousLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._anonymousLink === value)
                return;
            this._anonymousLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "commiterLink", {
        get: function () {
            return this._commiterLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._commiterLink === value)
                return;
            this._commiterLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "fisheyeLink", {
        get: function () {
            return this._fisheyeLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._fisheyeLink === value)
                return;
            this._fisheyeLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "viewvcLink", {
        get: function () {
            return this._viewvcLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._viewvcLink === value)
                return;
            this._viewvcLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "committerGitLink", {
        get: function () {
            return this._committerGitLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._committerGitLink === value)
                return;
            this._committerGitLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "buildLink", {
        get: function () {
            return this._buildLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._buildLink === value)
                return;
            this._buildLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "hudsonLink", {
        get: function () {
            return this._hudsonLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._hudsonLink === value)
                return;
            this._hudsonLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "knowledgebaseLink", {
        get: function () {
            return this._knowledgebaseLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._knowledgebaseLink === value)
                return;
            this._knowledgebaseLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "communityLink", {
        get: function () {
            return this._communityLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._communityLink === value)
                return;
            this._communityLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "imageUrl", {
        get: function () {
            return this._imageUrl;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._imageUrl === value)
                return;
            this._imageUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "projectName", {
        get: function () {
            return this._projectName;
        },
        set: function (value) {
            if (this._projectName === value)
                return;
            this._projectName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "downloadsLink", {
        get: function () {
            return this._downloadsLink;
        },
        set: function (value) {
            this.getCorrectUrl(value);
            if (this._downloadsLink === value)
                return;
            this._downloadsLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "sys_url_view", {
        get: function () {
            return this._sys_url_view;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._sys_url_view === value)
                return;
            this._sys_url_view = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "twitterLink", {
        get: function () {
            return this._twitterLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._twitterLink === value)
                return;
            this._twitterLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "descriptions", {
        get: function () {
            return this._descriptions;
        },
        set: function (value) {
            if (this._descriptions === value)
                return;
            this._descriptions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "docsLink", {
        get: function () {
            return this._docsLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._docsLink === value)
                return;
            this._docsLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "issueTracker", {
        get: function () {
            return this._issueTracker;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._issueTracker === value)
                return;
            this._issueTracker = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectItem.prototype, "githubLink", {
        get: function () {
            return this._githubLink;
        },
        set: function (value) {
            value = this.getCorrectUrl(value);
            if (this._githubLink === value)
                return;
            this._githubLink = value;
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjectItem.prototype.getCorrectUrl = function (url) {
        if (url == null)
            return;
        if (url.constructor === Array && url.length > 0) {
            url = url[0];
        }
        if (url.indexOf("/") > 0) {
            return url;
        }
        else {
            return "https://developers.redhat.com" + url;
        }
    };
    RHDPProjectItem.prototype.connectedCallback = function () {
        this.innerHTML = this.template(__makeTemplateObject(["", ""], ["", ""]), this);
    };
    RHDPProjectItem.prototype.getTemplateHTML = function () {
        this.innerHTML = this.template(__makeTemplateObject(["", ""], ["", ""]), this);
        return this.innerHTML;
    };
    RHDPProjectItem.prototype.generateViewLink = function (viewLink) {
        return viewLink.replace(/https?:\/\//, '');
    };
    Object.defineProperty(RHDPProjectItem, "observedAttributes", {
        get: function () {
            return ['type', 'size', 'heading', 'text'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjectItem.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
        this.innerHTML = this.template(__makeTemplateObject(["", ""], ["", ""]), this);
    };
    return RHDPProjectItem;
}(HTMLElement));
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-project-item', RHDPProjectItem);
});
var RHDPProjectQuery = (function (_super) {
    __extends(RHDPProjectQuery, _super);
    function RHDPProjectQuery() {
        var _this = _super.call(this) || this;
        _this._dcpUrl = 'https://dcp2.jboss.org/v2/rest/search/suggest_project_name_ngram_more_fields?sort=sys_title&query=';
        _this._term = '';
        _this._mockData = false;
        _this.productData = {
            "amq": { "upstream": ["activemq", "fabric8"] },
            "rhpam": { "upstream": ["drools", "guvnor", "optaplanner", "jbpm"] },
            "brms": { "upstream": ["optaplanner", "drools", "guvnor"] },
            "datagrid": { "upstream": ["infinispan", "jgroups", "hibernate_subprojects_search"] },
            "datavirt": { "upstream": ["teiid", "teiiddesigner", "modeshape"] },
            "devstudio": { "upstream": ["jbosstools"] },
            "eap": { "upstream": ["wildfly", "jgroups", "hibernate", "hornetq", "jbossclustering", "jbossmc", "narayana", "jbossweb", "jbossws", "ironjacamar", "jgroups", "mod_cluster", "jbossas_osgi", "jbosssso", "picketlink", "resteasy", "weld", "wise", "xnio"] },
            "fuse": { "upstream": ["camel", "karaf", "wildfly-camel", "cxf", "syndesis", "apicurio", "hawtio"] },
            "rhel": { "upstream": ["fedora"] },
            "webserver": { "upstream": ["tomcat", "httpd", "mod_cluster"] },
        };
        _this._filterChange = _this._filterChange.bind(_this);
        return _this;
    }
    Object.defineProperty(RHDPProjectQuery.prototype, "mockData", {
        get: function () {
            return this._mockData;
        },
        set: function (value) {
            this._mockData = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectQuery.prototype, "term", {
        get: function () {
            return this._term;
        },
        set: function (value) {
            this._term = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectQuery.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        set: function (value) {
            this._filter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectQuery.prototype, "dcpUrl", {
        get: function () {
            return this._dcpUrl;
        },
        set: function (value) {
            this._dcpUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectQuery.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjectQuery.prototype.connectedCallback = function () {
        top.addEventListener('project-filter-change', this._filterChange);
        this.doSearch();
    };
    RHDPProjectQuery.prototype.doSearch = function () {
        var _this = this;
        var qUrl = new URL(this.dcpUrl);
        qUrl.searchParams.set('sort', 'sys_title');
        qUrl.searchParams.set('query', this.term);
        if (this.filter) {
            var upstreamProjects = this.productData[this.filter]['upstream'];
            for (var i = 0; i < upstreamProjects.length; i++) {
                qUrl.searchParams.append('project', upstreamProjects[i]);
            }
        }
        if (!this.mockData) {
            fetch(qUrl.toString())
                .then(function (resp) { return resp.json(); })
                .then(function (data) {
                _this.data = data;
                _this.dispatchEvent(new CustomEvent('data-results-complete', {
                    detail: {
                        data: _this.data,
                        term: _this.term,
                        filter: _this.filter
                    },
                    bubbles: true
                }));
            });
        }
    };
    RHDPProjectQuery.prototype._filterChange = function (e) {
        if (e.detail) {
            this.filter = e.detail.filter ? e.detail.filter : '';
            this.term = e.detail.term ? e.detail.term : '';
        }
        this.doSearch();
    };
    Object.defineProperty(RHDPProjectQuery, "observedAttributes", {
        get: function () {
            return ['loading'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjectQuery.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    return RHDPProjectQuery;
}(HTMLElement));
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-project-query', RHDPProjectQuery);
});
var RHDPProjectURL = (function (_super) {
    __extends(RHDPProjectURL, _super);
    function RHDPProjectURL() {
        var _this = _super.call(this) || this;
        _this._uri = new URL(window.location.href);
        _this._updateURI = _this._updateURI.bind(_this);
        return _this;
    }
    Object.defineProperty(RHDPProjectURL.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        set: function (value) {
            this._uri = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectURL.prototype, "term", {
        get: function () {
            return this._term;
        },
        set: function (value) {
            if (value.length > 0) {
                this.uri.searchParams.set('filter-text', value);
            }
            else {
                this.uri.searchParams.delete('filter-text');
            }
            this._term = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjectURL.prototype, "filters", {
        get: function () {
            return this._filters;
        },
        set: function (value) {
            if (value.length > 0) {
                this.uri.searchParams.set('filter-product', value);
            }
            else {
                this.uri.searchParams.delete('filter-product');
            }
            this._filters = value;
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjectURL.prototype.connectedCallback = function () {
        top.addEventListener('data-results-complete', this._updateURI);
    };
    RHDPProjectURL.prototype._updateURI = function (e) {
        if (e.detail) {
            this.term = e.detail.term ? e.detail.term : '';
            this.filters = e.detail.filter ? e.detail.filter : '';
            history.pushState({}, 'RHDP Projects:', "" + this.uri.pathname + (this.uri.searchParams ? "#!" + this.uri.searchParams : ''));
        }
    };
    Object.defineProperty(RHDPProjectURL, "observedAttributes", {
        get: function () {
            return ['loading'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjectURL.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    return RHDPProjectURL;
}(HTMLElement));
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-project-url', RHDPProjectURL);
});
var RHDPProjects = (function (_super) {
    __extends(RHDPProjects, _super);
    function RHDPProjects() {
        var _this = _super.call(this) || this;
        _this._loading = true;
        _this._dcpUrl = '';
        _this.template = function (strings, project) {
            return "\n\n        <ul class=\"small-block-grid-2 large-block-grid-4 medium-block-grid-3 results\"></ul>\n        \n        ";
        };
        return _this;
    }
    Object.defineProperty(RHDPProjects.prototype, "dcpUrl", {
        get: function () {
            return this.getAttribute('dcp-url') ? this.getAttribute('dcp-url') : this._dcpUrl;
        },
        set: function (value) {
            if (this._dcpUrl === value)
                return;
            this._dcpUrl = value;
            this.setAttribute('dcp-url', this._dcpUrl);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjects.prototype, "loading", {
        get: function () {
            return this._loading;
        },
        set: function (value) {
            if (value == false) {
                this.querySelector('ul.results').classList.remove('loading');
            }
            else {
                this.querySelector('ul.results').classList.add('loading');
            }
            this._loading = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPProjects.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjects.prototype.connectedCallback = function () {
        this.innerHTML = this.template(__makeTemplateObject(["", ""], ["", ""]), this);
        this.addEventListener('data-results-complete', this._loadDataResult);
        var query = new RHDPProjectQuery();
        query.dcpUrl = this.dcpUrl;
        if (this._getProductId()) {
            query.filter = this._getProductId();
        }
        var url = new RHDPProjectURL();
        this.appendChild(query);
        this.appendChild(url);
    };
    RHDPProjects.prototype.removeAllProjects = function () {
        var childNodes = this.querySelector('ul.results');
        while (childNodes.firstChild) {
            childNodes.removeChild(childNodes.firstChild);
        }
    };
    RHDPProjects.prototype._getProductId = function () {
        var productId = this.getAttribute('upstream-product-id');
        return productId;
    };
    RHDPProjects.prototype._loadDataResult = function (e) {
        this.removeAllProjects();
        this.loading = true;
        if (e.detail && e.detail.data) {
            var hits = void 0;
            if (e.detail.data.responses) {
                hits = e.detail.data.responses[0].hits.hits;
            }
            else {
                hits = e.detail.data.hits.hits;
            }
            for (var i = 0; i < hits.length; i++) {
                var project = new RHDPProjectItem();
                var props = hits[i].fields;
                var thumbnailSize = "200x150";
                project.imageUrl = "https://static.jboss.org/" + (props.specialIcon || props.sys_project) + "/images/" + (props.specialIcon || props.sys_project) + "_" + thumbnailSize + ".png";
                project.downloadsLink = props.downloadsLink;
                project.projectName = props.sys_project_name;
                project.sys_url_view = props.sys_url_view;
                project.descriptions = props.description;
                project.docsLink = props.docsLink;
                project.communityLink = props.communityLink;
                project.knowledgebaseLink = props.knowledgeBaseLink;
                project.userForumLink = props.userForumLink;
                project.devForumLink = props.devForumLink;
                project.mailingListLink = props.mailingListLink;
                project.chatLink = props.chatLink;
                project.blogLink = props.blogLink;
                project.issueTracker = props.issueTrackerLink;
                project.jiraLink = props.jiraLink;
                project.srcLink = props.srcLink;
                project.anonymousLink = props.anonymousLink;
                project.commiterLink = props.commiterLink;
                project.fisheyeLink = props.fisheyeLink;
                project.viewvcLink = props.viewvcLink;
                project.githubLink = props.githubLink;
                project.committerGitLink = props.committerGitLink;
                project.buildLink = props.buildLink;
                project.hudsonLink = props.hudsonLink;
                var listItem = document.createElement('li');
                listItem.setAttribute('class', 'upstream');
                listItem.appendChild(project);
                this.querySelector('ul.results').appendChild(listItem);
            }
            this.loading = false;
        }
    };
    Object.defineProperty(RHDPProjects, "observedAttributes", {
        get: function () {
            return [''];
        },
        enumerable: true,
        configurable: true
    });
    RHDPProjects.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
        this.innerHTML = this.template(__makeTemplateObject(["", ""], ["", ""]), this);
    };
    return RHDPProjects;
}(HTMLElement));
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-projects', RHDPProjects);
});
System.register("@rhd/rhdp-search/rhdp-search-url", [], function (exports_20, context_20) {
    "use strict";
    var RHDPSearchURL;
    var __moduleName = context_20 && context_20.id;
    return {
        setters: [],
        execute: function () {
            RHDPSearchURL = (function (_super) {
                __extends(RHDPSearchURL, _super);
                function RHDPSearchURL() {
                    var _this = _super.call(this) || this;
                    _this._uri = new URL(window.location.href);
                    _this._term = _this.uri.searchParams.get('t');
                    _this._filters = _this._setFilters(_this.uri.searchParams.getAll('f'));
                    _this._sort = _this.uri.searchParams.get('s') || 'relevance';
                    _this._qty = _this.uri.searchParams.get('r');
                    _this._init = true;
                    _this._changeAttr = _this._changeAttr.bind(_this);
                    _this._popState = _this._popState.bind(_this);
                    return _this;
                }
                Object.defineProperty(RHDPSearchURL.prototype, "uri", {
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
                Object.defineProperty(RHDPSearchURL.prototype, "term", {
                    get: function () {
                        var ua = window.navigator.userAgent;
                        var trident = ua.indexOf('Trident/');
                        var isIE = trident > 0;
                        var tmpTerm = this._term;
                        if (isIE) {
                            tmpTerm = tmpTerm.replace("+", " ");
                        }
                        return tmpTerm;
                    },
                    set: function (val) {
                        if (this._term === val)
                            return;
                        this._term = val;
                        this.uri.searchParams.set('t', this._term);
                        this.setAttribute('term', this.term);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchURL.prototype, "filters", {
                    get: function () {
                        return this._filters;
                    },
                    set: function (val) {
                        var _this = this;
                        this._filters = val;
                        this.uri.searchParams.delete('f');
                        Object.keys(this._filters).forEach(function (group) {
                            _this.uri.searchParams.append('f', group + "~" + _this._filters[group].join(' '));
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchURL.prototype, "sort", {
                    get: function () {
                        return this._sort;
                    },
                    set: function (val) {
                        if (this._sort === val)
                            return;
                        this._sort = val;
                        this.uri.searchParams.set('s', this._sort);
                        this.setAttribute('sort', this._sort);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchURL.prototype, "qty", {
                    get: function () {
                        return this._qty;
                    },
                    set: function (val) {
                        if (this._qty === val)
                            return;
                        this._qty = val;
                        this.setAttribute('qty', this._sort);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchURL.prototype, "init", {
                    get: function () {
                        return this._init;
                    },
                    set: function (val) {
                        if (this._init === val)
                            return;
                        this._init = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchURL.prototype.connectedCallback = function () {
                    top.addEventListener('search-complete', this._changeAttr);
                    top.addEventListener('clear-filters', this._changeAttr);
                    top.window.addEventListener('popstate', this._popState);
                    this._paramsReady();
                };
                Object.defineProperty(RHDPSearchURL, "observedAttributes", {
                    get: function () {
                        return ['sort', 'term', 'qty'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchURL.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchURL.prototype._popState = function (e) {
                    this.uri = new URL(document.location.href);
                    this.term = this.uri.searchParams.get('t') || null;
                    this.filters = this._setFilters(this.uri.searchParams.getAll('f'));
                    this.sort = this.uri.searchParams.get('s');
                    this.qty = this.uri.searchParams.get('r');
                    this._paramsReady();
                };
                RHDPSearchURL.prototype._paramsReady = function () {
                    this.dispatchEvent(new CustomEvent('params-ready', {
                        detail: {
                            term: this.term,
                            filters: this.filters,
                            sort: this.sort,
                            qty: this.qty
                        },
                        bubbles: true
                    }));
                };
                RHDPSearchURL.prototype._setFilters = function (filtersQS) {
                    var filters = {};
                    filtersQS.forEach(function (filter) {
                        var kv = filter.split('~'), k = kv[0], v = kv[1].split(' ');
                        filters[k] = v;
                    });
                    return filters;
                };
                RHDPSearchURL.prototype._changeAttr = function (e) {
                    switch (e.type) {
                        case 'clear-filters':
                            this.uri.searchParams.delete('f');
                            this.filters = {};
                            break;
                        case 'load-more':
                            break;
                        case 'search-complete':
                            if (e.detail && typeof e.detail.term !== 'undefined' && e.detail.term.length > 0) {
                                this.term = e.detail.term;
                            }
                            else {
                                this.term = '';
                                this.uri.searchParams.delete('t');
                            }
                            if (e.detail && e.detail.filters) {
                                this.filters = e.detail.filters;
                            }
                            if (e.detail && typeof e.detail.sort !== 'undefined') {
                                this.sort = e.detail.sort;
                            }
                    }
                    if (e.detail && typeof e.detail.invalid === 'undefined') {
                        history.pushState({}, "RHDP Search: " + (this.term ? this.term : ''), "" + this.uri.pathname + this.uri.search);
                    }
                    else {
                        this.term = '';
                        this.filters = {};
                        this.sort = 'relevance';
                        this.uri.searchParams.delete('t');
                        this.uri.searchParams.delete('f');
                        this.uri.searchParams.delete('s');
                        history.replaceState({}, 'RHDP Search Error', "" + this.uri.pathname + this.uri.search);
                    }
                };
                return RHDPSearchURL;
            }(HTMLElement));
            exports_20("default", RHDPSearchURL);
            customElements.define('rhdp-search-url', RHDPSearchURL);
        }
    };
});
System.register("@rhd/rhdp-search/rhdp-search-filter-item", [], function (exports_21, context_21) {
    "use strict";
    var RHDPSearchFilterItem, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
    var __moduleName = context_21 && context_21.id;
    return {
        setters: [],
        execute: function () {
            RHDPSearchFilterItem = (function (_super) {
                __extends(RHDPSearchFilterItem, _super);
                function RHDPSearchFilterItem() {
                    var _this = _super.call(this) || this;
                    _this._active = false;
                    _this._inline = false;
                    _this._bubble = true;
                    _this._bounce = false;
                    _this.template = function (strings, name, key, active) {
                        var checked = active ? 'checked' : '';
                        return "<div class=\"list\"><span>" + name + "</span><input type=\"checkbox\" " + checked + " id=\"filter-item-" + key + "\" value=\"" + key + "\"><label for=\"filter-item-" + key + "\">" + name + "</label></div>";
                    };
                    _this.inlineTemplate = function (strings, name, active) {
                        return active ? "<div class=\"inline\">" + name + " <i class=\"fa fa-times clearItem\" aria-hidden=\"true\"></i></div>" : '';
                    };
                    _this._checkParams = _this._checkParams.bind(_this);
                    _this._clearFilters = _this._clearFilters.bind(_this);
                    _this._checkChange = _this._checkChange.bind(_this);
                    _this._updateFacet = _this._updateFacet.bind(_this);
                    return _this;
                }
                Object.defineProperty(RHDPSearchFilterItem.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (val) {
                        if (this._name === val)
                            return;
                        this._name = val;
                        this.setAttribute('name', this._name);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterItem.prototype, "key", {
                    get: function () {
                        return this._key;
                    },
                    set: function (val) {
                        if (this._key === val)
                            return;
                        this._key = val;
                        this.className = "filter-item-" + this._key;
                        this.setAttribute('key', this._key);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterItem.prototype, "group", {
                    get: function () {
                        return this._group;
                    },
                    set: function (val) {
                        if (this._group === val)
                            return;
                        this._group = val;
                        this.setAttribute('group', this._group);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterItem.prototype, "active", {
                    get: function () {
                        return this._active;
                    },
                    set: function (val) {
                        if (typeof val === 'string') {
                            val = true;
                        }
                        if (val === null) {
                            val = false;
                        }
                        if (this._active === val) {
                            return;
                        }
                        else {
                            this._active = val;
                            var chkbox = this.querySelector('input');
                            if (this._active) {
                                this.setAttribute('active', '');
                            }
                            else {
                                this.removeAttribute('active');
                            }
                            if (chkbox) {
                                chkbox.checked = this._active;
                            }
                            if (this.inline) {
                                this.innerHTML = this._active ? this.inlineTemplate(templateObject_8 || (templateObject_8 = __makeTemplateObject(["", "", ""], ["", "", ""])), this.name, this._active) : '';
                            }
                            this.dispatchEvent(new CustomEvent('filter-item-change', { detail: { facet: this }, bubbles: this.bubble }));
                            this.bubble = true;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterItem.prototype, "value", {
                    get: function () {
                        return this._value;
                    },
                    set: function (val) {
                        if (this._value === val)
                            return;
                        this._value = val;
                        this.setAttribute('value', this.value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterItem.prototype, "inline", {
                    get: function () {
                        return this._inline;
                    },
                    set: function (val) {
                        if (this._inline === val)
                            return;
                        this._inline = val;
                        this.innerHTML = !this._inline ? this.template(templateObject_9 || (templateObject_9 = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), this.name, this.key, this.active) : this.inlineTemplate(templateObject_10 || (templateObject_10 = __makeTemplateObject(["", "", ""], ["", "", ""])), this.name, this.active);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterItem.prototype, "bubble", {
                    get: function () {
                        return this._bubble;
                    },
                    set: function (val) {
                        if (this._bubble === val)
                            return;
                        this._bubble = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterItem.prototype, "bounce", {
                    get: function () {
                        return this._bounce;
                    },
                    set: function (val) {
                        if (this._bounce === val)
                            return;
                        this._bounce = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchFilterItem.prototype.connectedCallback = function () {
                    this.innerHTML = !this.inline ? this.template(templateObject_11 || (templateObject_11 = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), this.name, this.key, this.active) : this.inlineTemplate(templateObject_12 || (templateObject_12 = __makeTemplateObject(["", "", ""], ["", "", ""])), this.name, this.active);
                    if (!this.inline) {
                        this.addEventListener('change', this._updateFacet);
                    }
                    else {
                        this.addEventListener('click', this._updateFacet);
                    }
                    top.addEventListener('filter-item-change', this._checkChange);
                    top.addEventListener('params-ready', this._checkParams);
                    top.addEventListener('clear-filters', this._clearFilters);
                };
                Object.defineProperty(RHDPSearchFilterItem, "observedAttributes", {
                    get: function () {
                        return ['name', 'active', 'value', 'inline', 'key', 'group'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchFilterItem.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchFilterItem.prototype._updateFacet = function (e) {
                    this.bounce = true;
                    if (this.inline) {
                        if (e.target['className'].indexOf('clearItem') >= 0) {
                            this.active = !this.active;
                        }
                    }
                    else {
                        this.active = !this.active;
                    }
                };
                RHDPSearchFilterItem.prototype._checkParams = function (e) {
                    var _this = this;
                    var chk = false;
                    if (e.detail && e.detail.filters) {
                        Object.keys(e.detail.filters).forEach(function (group) {
                            e.detail.filters[group].forEach(function (facet) {
                                if (group === _this.group) {
                                    if (facet === _this.key) {
                                        chk = true;
                                        _this.bubble = false;
                                        _this.active = true;
                                        _this.dispatchEvent(new CustomEvent('filter-item-init', { detail: { facet: _this }, bubbles: _this.bubble }));
                                    }
                                }
                            });
                        });
                    }
                    if (!chk) {
                        this.bubble = false;
                        this.active = false;
                    }
                };
                RHDPSearchFilterItem.prototype._checkChange = function (e) {
                    if (e.detail && e.detail.facet) {
                        if (!this.bounce) {
                            if (this.group === e.detail.facet.group && this.key === e.detail.facet.key) {
                                this.bubble = false;
                                this.active = e.detail.facet.active;
                            }
                        }
                        this.bubble = true;
                        this.bounce = false;
                    }
                };
                RHDPSearchFilterItem.prototype._clearFilters = function (e) {
                    this.bubble = false;
                    this.bounce = false;
                    this.active = false;
                };
                return RHDPSearchFilterItem;
            }(HTMLElement));
            exports_21("default", RHDPSearchFilterItem);
            customElements.define('rhdp-search-filter-item', RHDPSearchFilterItem);
        }
    };
});
System.register("@rhd/rhdp-search/rhdp-search-query", [], function (exports_22, context_22) {
    "use strict";
    var RHDPSearchQuery;
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [],
        execute: function () {
            RHDPSearchQuery = (function (_super) {
                __extends(RHDPSearchQuery, _super);
                function RHDPSearchQuery() {
                    var _this = _super.call(this) || this;
                    _this._limit = 10;
                    _this._from = 0;
                    _this._sort = 'relevance';
                    _this._valid = true;
                    _this.urlTemplate = function (strings, url, term, from, limit, sort, types, tags, sys_types) {
                        var order = '';
                        if (sort === 'most-recent') {
                            order = '&newFirst=true';
                        }
                        return url + "?tags_or_logic=true&filter_out_excluded=true&from=" + from + order + "&query=" + term + "&query_highlight=true&size" + limit + "=true" + types + tags + sys_types;
                    };
                    _this._changeAttr = _this._changeAttr.bind(_this);
                    return _this;
                }
                Object.defineProperty(RHDPSearchQuery.prototype, "filters", {
                    get: function () {
                        return this._filters;
                    },
                    set: function (val) {
                        if (this._filters === val)
                            return;
                        this._filters = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchQuery.prototype, "activeFilters", {
                    get: function () {
                        return this._activeFilters;
                    },
                    set: function (val) {
                        if (this._activeFilters === val)
                            return;
                        this._activeFilters = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchQuery.prototype, "from", {
                    get: function () {
                        return this._from;
                    },
                    set: function (val) {
                        if (this._from === val)
                            return;
                        this._from = val;
                        this.setAttribute('from', val.toString());
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchQuery.prototype, "limit", {
                    get: function () {
                        return this._limit;
                    },
                    set: function (val) {
                        if (this._limit === val)
                            return;
                        this._limit = val;
                        this.setAttribute('limit', val.toString());
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchQuery.prototype, "sort", {
                    get: function () {
                        return this._sort;
                    },
                    set: function (val) {
                        if (this._sort === val)
                            return;
                        this._sort = val;
                        this.setAttribute('sort', val);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchQuery.prototype, "results", {
                    get: function () {
                        return this._results;
                    },
                    set: function (val) {
                        if (this._results === val)
                            return;
                        this._results = val;
                        this.from = this.results && this.results.hits && typeof this.results.hits.hits !== 'undefined' ? this.from + this.results.hits.hits.length : 0;
                        this.dispatchEvent(new CustomEvent('search-complete', {
                            detail: {
                                term: this.term,
                                filters: this.activeFilters,
                                sort: this.sort,
                                limit: this.limit,
                                from: this.from,
                                results: this.results,
                            },
                            bubbles: true
                        }));
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchQuery.prototype, "term", {
                    get: function () {
                        return this._term;
                    },
                    set: function (val) {
                        if (this._term === val)
                            return;
                        this._term = val;
                        this.setAttribute('term', val.toString());
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchQuery.prototype, "url", {
                    get: function () {
                        return this._url;
                    },
                    set: function (val) {
                        if (this._url === val)
                            return;
                        this._url = val;
                        this.setAttribute('url', val.toString());
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchQuery.prototype, "valid", {
                    get: function () {
                        return this._valid;
                    },
                    set: function (val) {
                        if (this._valid === val)
                            return;
                        this._valid = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchQuery.prototype.filterString = function (facets) {
                    var len = facets.length, filterArr = [];
                    for (var i = 0; i < len; i++) {
                        for (var j = 0; j < facets[i].items.length; j++) {
                            if (facets[i].items[j].active) {
                                var idx = 0;
                                while (idx < facets[i].items[j].value.length) {
                                    filterArr.push(facets[i].items[j].value[idx]);
                                    idx = idx + 1;
                                }
                            }
                        }
                    }
                    return filterArr.join(', ');
                };
                RHDPSearchQuery.prototype.connectedCallback = function () {
                    top.addEventListener('params-ready', this._changeAttr);
                    top.addEventListener('term-change', this._changeAttr);
                    top.addEventListener('filter-item-change', this._changeAttr);
                    top.addEventListener('sort-change', this._changeAttr);
                    top.addEventListener('clear-filters', this._changeAttr);
                    top.addEventListener('load-more', this._changeAttr);
                };
                Object.defineProperty(RHDPSearchQuery, "observedAttributes", {
                    get: function () {
                        return ['term', 'sort', 'limit', 'results', 'url'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchQuery.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchQuery.prototype._setFilters = function (item) {
                    var _this = this;
                    var add = item.active;
                    if (add) {
                        this.activeFilters[item.group] = this.activeFilters[item.group] || [];
                        this.activeFilters[item.group].push(item.key);
                    }
                    else {
                        Object.keys(this.activeFilters).forEach(function (group) {
                            if (group === item.group) {
                                var idx = _this.activeFilters[group].indexOf(item.key);
                                if (idx >= 0) {
                                    _this.activeFilters[group].splice(idx, 1);
                                    if (_this.activeFilters[group].length === 0) {
                                        delete _this.activeFilters[group];
                                    }
                                }
                            }
                        });
                    }
                };
                RHDPSearchQuery.prototype._changeAttr = function (e) {
                    switch (e.type) {
                        case 'term-change':
                            if (e.detail && e.detail.term && e.detail.term.length > 0) {
                                this.term = e.detail.term;
                            }
                            else {
                                this.term = '';
                            }
                            this.from = 0;
                            this.search();
                            break;
                        case 'filter-item-change':
                            if (e.detail && e.detail.facet) {
                                this._setFilters(e.detail.facet);
                            }
                            this.from = 0;
                            this.search();
                            break;
                        case 'sort-change':
                            if (e.detail && e.detail.sort) {
                                this.sort = e.detail.sort;
                            }
                            this.from = 0;
                            this.search();
                            break;
                        case 'load-more':
                            this.search();
                            break;
                        case 'clear-filters':
                            this.activeFilters = {};
                            this.search();
                            break;
                        case 'params-ready':
                            if (e.detail && e.detail.term) {
                                this.term = e.detail.term;
                            }
                            if (e.detail && e.detail.sort) {
                                this.sort = e.detail.sort;
                            }
                            if (e.detail && e.detail.filters) {
                                this.activeFilters = e.detail.filters;
                            }
                            this.from = 0;
                            if (Object.keys(e.detail.filters).length > 0 || e.detail.term !== null || e.detail.sort !== null || e.detail.qty !== null) {
                                this.search();
                            }
                            break;
                    }
                };
                RHDPSearchQuery.prototype.search = function () {
                    var _this = this;
                    this.dispatchEvent(new CustomEvent('search-start', { bubbles: true }));
                    if (Object.keys(this.activeFilters).length > 0 || (this.term !== null && this.term !== '' && typeof this.term !== 'undefined')) {
                        var qURL_1 = new URL(this.url);
                        qURL_1.searchParams.set('tags_or_logic', 'true');
                        qURL_1.searchParams.set('filter_out_excluded', 'true');
                        qURL_1.searchParams.set('from', this.from.toString());
                        if (this.sort === 'most-recent') {
                            qURL_1.searchParams.set('newFirst', 'true');
                        }
                        qURL_1.searchParams.set('query', this.term || '');
                        qURL_1.searchParams.set('query_highlight', 'true');
                        qURL_1.searchParams.set('size' + this.limit.toString(), 'true');
                        if (this.activeFilters) {
                            Object.keys(this.activeFilters).forEach(function (filtergroup) {
                                _this.filters.facets.forEach(function (group) {
                                    if (group.key === filtergroup) {
                                        group.items.forEach(function (facet) {
                                            if (_this.activeFilters[group.key].indexOf(facet.key) >= 0) {
                                                facet.value.forEach(function (fval) {
                                                    qURL_1.searchParams.append(group.key, fval);
                                                });
                                            }
                                        });
                                    }
                                });
                            });
                        }
                        fetch(qURL_1.toString())
                            .then(function (resp) { return resp.json(); })
                            .then(function (data) {
                            _this.results = data;
                        });
                    }
                    else {
                        this.dispatchEvent(new CustomEvent('search-complete', { detail: { invalid: true }, bubbles: true }));
                    }
                };
                return RHDPSearchQuery;
            }(HTMLElement));
            exports_22("default", RHDPSearchQuery);
            customElements.define('rhdp-search-query', RHDPSearchQuery);
        }
    };
});
System.register("@rhd/rhdp-search/rhdp-search-box", [], function (exports_23, context_23) {
    "use strict";
    var RHDPSearchBox, templateObject_13;
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [],
        execute: function () {
            RHDPSearchBox = (function (_super) {
                __extends(RHDPSearchBox, _super);
                function RHDPSearchBox() {
                    var _this = _super.call(this) || this;
                    _this._term = '';
                    _this.name = 'Search Box';
                    _this.template = function (strings, name, term) {
                        return "<form class=\"search-bar\" role=\"search\">\n        <div class=\"input-cont\">\n            <input value=\"" + term + "\" class=\"user-success user-search\" type=\"search\" id=\"query\" placeholder=\"Enter your search term\">\n        </div>\n        <button id=\"search-btn\"><span>SEARCH</span><i class='fa fa-search' aria-hidden='true'></i></button>\n        </form>";
                    };
                    _this._checkTerm = _this._checkTerm.bind(_this);
                    return _this;
                }
                Object.defineProperty(RHDPSearchBox.prototype, "term", {
                    get: function () {
                        return this._term;
                    },
                    set: function (val) {
                        if (this._term === val)
                            return;
                        this._term = decodeURI(val);
                        this.querySelector('input').setAttribute('value', this.term);
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchBox.prototype.connectedCallback = function () {
                    var _this = this;
                    top.addEventListener('params-ready', this._checkTerm);
                    top.addEventListener('term-change', this._checkTerm);
                    this.innerHTML = this.template(templateObject_13 || (templateObject_13 = __makeTemplateObject(["", "", ""], ["", "", ""])), this.name, this.term);
                    this.addEventListener('submit', function (e) {
                        e.preventDefault();
                        _this._termChange();
                        return false;
                    });
                    this.querySelector('#search-btn').addEventListener('click', function (e) {
                    });
                };
                Object.defineProperty(RHDPSearchBox, "observedAttributes", {
                    get: function () {
                        return ['term'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchBox.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchBox.prototype._checkTerm = function (e) {
                    if (e.detail && e.detail.term) {
                        this.term = e.detail.term;
                    }
                };
                RHDPSearchBox.prototype._termChange = function () {
                    this.term = this.querySelector('input').value;
                    this.dispatchEvent(new CustomEvent('term-change', {
                        detail: {
                            term: this.term
                        },
                        bubbles: true
                    }));
                };
                return RHDPSearchBox;
            }(HTMLElement));
            exports_23("default", RHDPSearchBox);
            customElements.define('rhdp-search-box', RHDPSearchBox);
        }
    };
});
System.register("@rhd/rhdp-search/rhdp-search-result-count", [], function (exports_24, context_24) {
    "use strict";
    var RHDPSearchResultCount;
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [],
        execute: function () {
            RHDPSearchResultCount = (function (_super) {
                __extends(RHDPSearchResultCount, _super);
                function RHDPSearchResultCount() {
                    var _this = _super.call(this) || this;
                    _this._count = 0;
                    _this._term = '';
                    _this._loading = true;
                    _this.template = function (strings, count, term) {
                        return count + " results found for " + term.replace('<', '&lt;').replace('>', '&gt;');
                    };
                    _this._setText = _this._setText.bind(_this);
                    return _this;
                }
                Object.defineProperty(RHDPSearchResultCount.prototype, "count", {
                    get: function () {
                        return this._count;
                    },
                    set: function (val) {
                        if (this._count === val)
                            return;
                        this._count = val;
                        this.setAttribute('count', val.toString());
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchResultCount.prototype, "term", {
                    get: function () {
                        return this._term;
                    },
                    set: function (val) {
                        val = decodeURI(val).replace('<', '&lt;').replace('>', '&gt;');
                        if (this._term === val)
                            return;
                        this._term = val;
                        this.setAttribute('term', val);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchResultCount.prototype, "loading", {
                    get: function () {
                        return this._loading;
                    },
                    set: function (val) {
                        if (this._loading === val)
                            return;
                        this._loading = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchResultCount.prototype.connectedCallback = function () {
                    var _this = this;
                    top.addEventListener('params-ready', this._setText);
                    top.addEventListener('search-start', function (e) { _this.loading = true; _this._setText(e); });
                    top.addEventListener('search-complete', function (e) { _this.loading = false; _this._setText(e); });
                };
                Object.defineProperty(RHDPSearchResultCount, "observedAttributes", {
                    get: function () {
                        return ['count', 'term'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchResultCount.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                    this.innerHTML = this.count + " results found" + (this.term ? " for " + this.term : '');
                };
                RHDPSearchResultCount.prototype._setText = function (e) {
                    if (e.detail) {
                        if (typeof e.detail.invalid === 'undefined') {
                            if (e.detail.term && e.detail.term.length > 0) {
                                this.term = e.detail.term;
                            }
                            else {
                                this.term = '';
                            }
                            if (e.detail.results && e.detail.results.hits && e.detail.results.hits.total) {
                                this.count = e.detail.results.hits.total;
                            }
                            else {
                                this.count = 0;
                            }
                            if (!this.loading) {
                                this.innerHTML = this.count + " results found " + (this.term ? "for " + this.term : '');
                            }
                        }
                        else {
                            this.term = '';
                            this.count = 0;
                            this.innerHTML = '';
                        }
                    }
                    else {
                        this.term = '';
                        this.count = 0;
                        this.innerHTML = '';
                    }
                };
                return RHDPSearchResultCount;
            }(HTMLElement));
            exports_24("default", RHDPSearchResultCount);
            customElements.define('rhdp-search-result-count', RHDPSearchResultCount);
        }
    };
});
System.register("@rhd/rhdp-search/rhdp-search-filter-group", [], function (exports_25, context_25) {
    "use strict";
    var RHDPSearchFilterGroup, templateObject_14;
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [],
        execute: function () {
            RHDPSearchFilterGroup = (function (_super) {
                __extends(RHDPSearchFilterGroup, _super);
                function RHDPSearchFilterGroup() {
                    var _this = _super.call(this) || this;
                    _this._toggle = false;
                    _this._more = false;
                    _this.template = function (strings, name) {
                        return "<h6 class=\"showFilters heading\"><span class=\"group-name\">" + name + "</span><span class=\"toggle\"><i class='fa fa-chevron-right' aria-hidden='true'></i></span></h6>\n        <div class=\"group hide\">\n            <div class=\"primary\"></div>\n            <div class=\"secondary hide\"></div>\n            <a href=\"#\" class=\"more\">Show More</a>\n        </div>";
                    };
                    _this.innerHTML = _this.template(templateObject_14 || (templateObject_14 = __makeTemplateObject(["", ""], ["", ""])), _this.name);
                    return _this;
                }
                Object.defineProperty(RHDPSearchFilterGroup.prototype, "key", {
                    get: function () {
                        return this._key;
                    },
                    set: function (val) {
                        if (this._key === val)
                            return;
                        this._key = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterGroup.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (val) {
                        if (this._name === val)
                            return;
                        this._name = val;
                        this.querySelector('.group-name').innerHTML = this._name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterGroup.prototype, "items", {
                    get: function () {
                        return this._items;
                    },
                    set: function (val) {
                        if (this._items === val)
                            return;
                        this._items = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterGroup.prototype, "toggle", {
                    get: function () {
                        return this._toggle;
                    },
                    set: function (val) {
                        if (this._toggle === val)
                            return;
                        this._toggle = val;
                        this.querySelector('.group').className = this.toggle ? 'group' : 'group hide';
                        this.querySelector('.toggle').className = this.toggle ? 'toggle expand' : 'toggle';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilterGroup.prototype, "more", {
                    get: function () {
                        return this._more;
                    },
                    set: function (val) {
                        if (this._more === val)
                            return;
                        this._more = val;
                        this.querySelector('.more').innerHTML = this.more ? 'Show Less' : 'Show More';
                        this.querySelector('.secondary').className = this.more ? 'secondary' : 'secondary hide';
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchFilterGroup.prototype.connectedCallback = function () {
                    var _this = this;
                    this.querySelector('h6').addEventListener('click', function (e) {
                        e.preventDefault();
                        _this.toggle = !_this.toggle;
                    });
                    this.querySelector('.more').addEventListener('click', function (e) {
                        _this.more = !_this.more;
                    });
                    this.toggle = true;
                };
                Object.defineProperty(RHDPSearchFilterGroup, "observedAttributes", {
                    get: function () {
                        return ['name', 'key', 'toggle', 'items', 'more'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchFilterGroup.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                return RHDPSearchFilterGroup;
            }(HTMLElement));
            exports_25("default", RHDPSearchFilterGroup);
            customElements.define('rhdp-search-filter-group', RHDPSearchFilterGroup);
        }
    };
});
System.register("@rhd/rhdp-search/rhdp-search-filters", ["@rhd/rhdp-search/rhdp-search-filter-group", "@rhd/rhdp-search/rhdp-search-filter-item"], function (exports_26, context_26) {
    "use strict";
    var rhdp_search_filter_group_1, rhdp_search_filter_item_1, RHDPSearchFilters, templateObject_15, templateObject_16, templateObject_17;
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [
            function (rhdp_search_filter_group_1_1) {
                rhdp_search_filter_group_1 = rhdp_search_filter_group_1_1;
            },
            function (rhdp_search_filter_item_1_1) {
                rhdp_search_filter_item_1 = rhdp_search_filter_item_1_1;
            }
        ],
        execute: function () {
            RHDPSearchFilters = (function (_super) {
                __extends(RHDPSearchFilters, _super);
                function RHDPSearchFilters() {
                    var _this = _super.call(this) || this;
                    _this._type = '';
                    _this._title = 'Filter By';
                    _this._toggle = false;
                    _this.modalTemplate = function (string, title) {
                        return "<div class=\"cover\" id=\"cover\">\n            <div class=\"title\">" + title + " <a href=\"#\" class=\"cancel\" id=\"cancel\">Close</a></div>\n            <div class=\"groups\">\n            </div>\n            <div class=\"footer\">\n            <a href=\"#\" class=\"clearFilters\">Clear Filters</a> \n            <a href=\"#\" class=\"applyFilters\">Apply</a>\n            </div>\n        </div>";
                    };
                    _this.activeTemplate = function (strings, title) {
                        return "<div class=\"active-type\">\n        <strong>" + title + "</strong>\n        <div class=\"activeFilters\"></div>\n        <a href=\"#\" class=\"clearFilters\">Clear Filters</a>\n      </div>";
                    };
                    _this.template = function (strings, title) {
                        return "<a class=\"showBtn\">Show Filters</a>\n        <div class=\"control\" id=\"control\">\n            <div class=\"title\">" + title + "</div>\n            <div class=\"groups\">\n            </div>\n        </div>";
                    };
                    _this._toggleModal = _this._toggleModal.bind(_this);
                    _this._clearFilters = _this._clearFilters.bind(_this);
                    _this._addFilters = _this._addFilters.bind(_this);
                    _this._checkActive = _this._checkActive.bind(_this);
                    return _this;
                }
                Object.defineProperty(RHDPSearchFilters.prototype, "type", {
                    get: function () {
                        return this._type;
                    },
                    set: function (val) {
                        if (this._type === val)
                            return;
                        this._type = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilters.prototype, "title", {
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
                Object.defineProperty(RHDPSearchFilters.prototype, "filters", {
                    get: function () {
                        return this._filters;
                    },
                    set: function (val) {
                        if (this._filters === val)
                            return;
                        this._filters = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchFilters.prototype, "toggle", {
                    get: function () {
                        return this._toggle;
                    },
                    set: function (val) {
                        if (this._toggle === val)
                            return;
                        this._toggle = val;
                        if (this._toggle) {
                            this.querySelector('.cover').className = 'cover modal';
                            window.scrollTo(0, 0);
                            document.body.style.overflow = 'hidden';
                            this.style.height = window.innerHeight + 'px';
                        }
                        else {
                            this.querySelector('.cover').className = 'cover';
                            document.body.style.overflow = 'auto';
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchFilters.prototype.connectedCallback = function () {
                    var _this = this;
                    if (this.type === 'active') {
                        this.innerHTML = this.activeTemplate(templateObject_15 || (templateObject_15 = __makeTemplateObject(["", ""], ["", ""])), this.title);
                        top.addEventListener('filter-item-change', this._checkActive);
                        top.addEventListener('filter-item-init', this._checkActive);
                        top.addEventListener('search-complete', this._checkActive);
                        top.addEventListener('params-ready', this._checkActive);
                        top.addEventListener('clear-filters', this._clearFilters);
                        this._addFilters();
                    }
                    else if (this.type === 'modal') {
                        this.innerHTML = this.modalTemplate(templateObject_16 || (templateObject_16 = __makeTemplateObject(["", ""], ["", ""])), this.title);
                        this.addGroups();
                    }
                    else {
                        this.innerHTML = this.template(templateObject_17 || (templateObject_17 = __makeTemplateObject(["", ""], ["", ""])), this.title);
                        this.addGroups();
                    }
                    this.addEventListener('click', function (e) {
                        switch (e.target['className']) {
                            case 'showBtn':
                            case 'cancel':
                            case 'applyFilters':
                                e.preventDefault();
                                _this.dispatchEvent(new CustomEvent('toggle-modal', {
                                    bubbles: true
                                }));
                                break;
                            case 'clearFilters':
                                e.preventDefault();
                                _this.dispatchEvent(new CustomEvent('clear-filters', {
                                    bubbles: true
                                }));
                                break;
                            case 'more':
                                e.preventDefault();
                                break;
                        }
                    });
                    top.addEventListener('toggle-modal', this._toggleModal);
                };
                Object.defineProperty(RHDPSearchFilters, "observedAttributes", {
                    get: function () {
                        return ['type', 'title', 'toggle'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchFilters.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchFilters.prototype.addGroups = function () {
                    var groups = this.filters.facets, len = groups.length;
                    for (var i = 0; i < len; i++) {
                        var group = new rhdp_search_filter_group_1.default(), groupInfo = groups[i], groupNode = group.querySelector('.group'), primaryFilters = group.querySelector('.primary'), secondaryFilters = group.querySelector('.secondary'), len_1 = groupInfo.items ? groupInfo.items.length : 0;
                        if (len_1 <= 5) {
                            groupNode.removeChild(groupNode.lastChild);
                        }
                        for (var j = 0; j < len_1; j++) {
                            var item = new rhdp_search_filter_item_1.default();
                            item.name = groupInfo.items[j].name;
                            item.value = groupInfo.items[j].value;
                            item.active = groupInfo.items[j].active;
                            item.key = groupInfo.items[j].key;
                            item.group = groupInfo.key;
                            if (j < 5) {
                                primaryFilters.appendChild(item);
                            }
                            else {
                                secondaryFilters.appendChild(item);
                            }
                        }
                        group.key = groupInfo.key;
                        group.name = groupInfo.name;
                        this.querySelector('.groups').appendChild(group);
                    }
                };
                RHDPSearchFilters.prototype._checkActive = function (e) {
                    if (e.detail) {
                        if (e.detail.facet) {
                            this.style.display = e.detail.facet.active ? 'block' : this.style.display;
                        }
                        else {
                            var chk = this.querySelectorAll('rhdp-search-filter-item[active]');
                            if (chk.length > 0) {
                                this.style.display = 'block';
                            }
                            else {
                                this.style.display = 'none';
                            }
                        }
                    }
                };
                RHDPSearchFilters.prototype._initActive = function (e, group_key, item) {
                    if (e.detail && e.detail.filters) {
                        Object.keys(e.detail.filters).forEach(function (group) {
                            e.detail.filters[group].forEach(function (facet) {
                                if (group === group_key) {
                                    if (facet === item.key) {
                                        return true;
                                    }
                                }
                            });
                        });
                    }
                    return false;
                };
                RHDPSearchFilters.prototype._addFilters = function () {
                    var groups = this.filters.facets;
                    for (var i = 0; i < groups.length; i++) {
                        var items = groups[i].items;
                        for (var j = 0; j < items.length; j++) {
                            var item = new rhdp_search_filter_item_1.default();
                            item.name = items[j].name;
                            item.value = items[j].value;
                            item.inline = true;
                            item.bubble = false;
                            item.key = items[j].key;
                            item.group = groups[i].key;
                            this.querySelector('.activeFilters').appendChild(item);
                        }
                    }
                };
                RHDPSearchFilters.prototype._toggleModal = function (e) {
                    if (this.type === 'modal') {
                        this.toggle = !this.toggle;
                    }
                };
                RHDPSearchFilters.prototype.applyFilters = function () {
                    this.dispatchEvent(new CustomEvent('apply-filters', {
                        bubbles: true
                    }));
                };
                RHDPSearchFilters.prototype._clearFilters = function (e) {
                    this.style.display = 'none';
                };
                return RHDPSearchFilters;
            }(HTMLElement));
            exports_26("default", RHDPSearchFilters);
            customElements.define('rhdp-search-filters', RHDPSearchFilters);
        }
    };
});
System.register("@rhd/rhdp-search/rhdp-search-onebox", [], function (exports_27, context_27) {
    "use strict";
    var RHDPSearchOneBox, templateObject_18, templateObject_19;
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [],
        execute: function () {
            RHDPSearchOneBox = (function (_super) {
                __extends(RHDPSearchOneBox, _super);
                function RHDPSearchOneBox() {
                    var _this = _super.call(this) || this;
                    _this._term = '';
                    _this._url = '../rhdp-apps/onebox/onebox.json';
                    _this._mock = false;
                    _this.slotTemplate = function (strings, slot, id) {
                        return "" + (slot && slot.url && slot.text ? "<li><a href=\"" + slot.url + "?onebox=" + id + "\">" + _this.getIcon(slot.icon) + slot.text + "</a></li>" : '');
                    };
                    _this.template = function (strings, feature) {
                        return "<div>\n            " + (feature.heading && feature.heading.url && feature.heading.text ? "<h4><a href=\"" + feature.heading.url + "\">" + feature.heading.text + "</a></h4>" : '') + "\n            " + (feature.details ? "<p>" + feature.details + "</p>" : '') + "\n            " + (feature.button && feature.button.url && feature.button.text ? "<a href=\"" + feature.button.url + "?onebox=" + feature.id + "\" class=\"button medium-cta blue\">" + feature.button.text + "</a>" : '') + "\n            " + (feature.slots && feature.slots.length > 0 ? "<ul class=\"slots\">\n                " + feature.slots.map(function (slot) { return _this.slotTemplate(templateObject_18 || (templateObject_18 = __makeTemplateObject(["", "", ""], ["", "", ""])), slot, feature.id); }).join('') + "\n            </ul>" : '') + "\n        </div>";
                    };
                    _this._termChange = _this._termChange.bind(_this);
                    return _this;
                }
                Object.defineProperty(RHDPSearchOneBox.prototype, "term", {
                    get: function () {
                        if ((this._term === null) || (this._term === '')) {
                            return this._term;
                        }
                        else {
                            return this._term.replace(/(<([^>]+)>)/ig, '');
                        }
                    },
                    set: function (val) {
                        if (this._term === val)
                            return;
                        this._term = val;
                        this.setAttribute('term', this._term);
                        this.feature = this.getFeature();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchOneBox.prototype, "url", {
                    get: function () {
                        return this._url;
                    },
                    set: function (val) {
                        if (this._url === val)
                            return;
                        this._url = val;
                        this.setAttribute('url', this._url);
                        this.getData();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchOneBox.prototype, "data", {
                    get: function () {
                        return this._data;
                    },
                    set: function (val) {
                        if (this._data === val)
                            return;
                        this._data = val;
                        this.feature = this.getFeature();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchOneBox.prototype, "feature", {
                    get: function () {
                        return this._feature;
                    },
                    set: function (val) {
                        if (this._feature === val)
                            return;
                        this._feature = val;
                        this.innerHTML = this.feature ? this.template(templateObject_19 || (templateObject_19 = __makeTemplateObject(["", ""], ["", ""])), this.feature) : '';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchOneBox.prototype, "mock", {
                    get: function () {
                        return this._mock;
                    },
                    set: function (val) {
                        if (this._mock === val)
                            return;
                        this._mock = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchOneBox.prototype.connectedCallback = function () {
                    this.getData();
                    top.addEventListener('term-change', this._termChange);
                    top.addEventListener('params-ready', this._termChange);
                };
                Object.defineProperty(RHDPSearchOneBox, "observedAttributes", {
                    get: function () {
                        return ['term', 'url', 'mock'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchOneBox.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchOneBox.prototype._termChange = function (e) {
                    if (e.detail && e.detail.term && e.detail.term.length > 0) {
                        this.term = e.detail.term;
                    }
                    else {
                        this.term = '';
                    }
                };
                RHDPSearchOneBox.prototype.getData = function () {
                    var _this = this;
                    if (this.mock || this.data) {
                        return this.data;
                    }
                    else {
                        var fInit = {
                            method: 'GET',
                            headers: new Headers(),
                            mode: 'cors',
                            cache: 'default'
                        };
                        fetch(this.url, fInit)
                            .then(function (resp) { return resp.json(); })
                            .then(function (data) {
                            _this.data = data;
                        });
                    }
                };
                RHDPSearchOneBox.prototype.getFeature = function () {
                    var len = this.data && this.data['features'] ? this.data['features'].length : 0, f;
                    for (var i = 0; i < len; i++) {
                        if (this.data['features'][i].match.indexOf(this.term.toLowerCase()) >= 0) {
                            f = this.data['features'][i];
                        }
                    }
                    return f;
                };
                RHDPSearchOneBox.prototype.getIcon = function (name) {
                    var icons = {
                        icon_help: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><title>icon_help</title><path d="M20.15,2C27.779,2,33.0651,5.2419,33.0651,12.1723A8.6318,8.6318,0,0,1,28.0266,20.4c-4.1859,1.9935-5.2333,3.14-5.3836,6.0819H15.81c0-4.736,1.3966-7.6775,7.0319-10.2718,2.4928-1.1469,3.24-1.9447,3.24-3.7393,0-2.2939-1.693-3.64-5.9317-3.64-3.792,0-6.4838,1.7945-8.729,4.1879L6.9349,7.7835A17.8438,17.8438,0,0,1,20.15,2M19.253,29.5248a4.2376,4.2376,0,1,1-4.2386,4.2366,4.2986,4.2986,0,0,1,4.2386-4.2366M20.15,1A18.8975,18.8975,0,0,0,6.211,7.0936a1,1,0,0,0-.0354,1.3406L10.6619,13.67a1,1,0,0,0,.7369.3491l.0225,0a1,1,0,0,0,.7293-.3158c2.5121-2.6779,4.9793-3.8721,8-3.8721,4.9317,0,4.9317,1.85,4.9317,2.64,0,1.167-.2291,1.7134-2.6579,2.8308-6.34,2.9189-7.6139,6.442-7.6139,11.18a1,1,0,0,0,1,1h6.833a1,1,0,0,0,.9987-.949c.121-2.3688.7339-3.2866,4.8148-5.23a9.61,9.61,0,0,0,5.6085-9.13C34.0651,5.0722,28.9933,1,20.15,1ZM19.253,28.5248a5.2376,5.2376,0,1,0,5.2386,5.2366,5.3078,5.3078,0,0,0-5.2386-5.2366Z"/></svg>',
                        icon_helloworld: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.0005 38.0015"><title>icon_helloworld</title><path d="M14.0642,7.3037a.1761.1761,0,0,0-.1724-.0852l-3.5192.3888a.1775.1775,0,0,0-.14.0974.1751.1751,0,0,0,.0083.1709l.5161.853A14.6794,14.6794,0,0,0,6.9885,13.42a.5192.5192,0,0,0,.2284.6984.5112.5112,0,0,0,.2345.0563.519.519,0,0,0,.4639-.2847,13.6444,13.6444,0,0,1,3.3873-4.2595l.4622.7639a.1749.1749,0,0,0,.1471.0874.1822.1822,0,0,0,.1525-.0778L14.0588,7.496a.1788.1788,0,0,0,.0061-.192Z" transform="translate(-1 -1)"/><path d="M26.0891,7.9374a13.6292,13.6292,0,0,1,4.26,3.3871l-.7639.4621a.1747.1747,0,0,0-.0874.1471.182.182,0,0,0,.0778.1525l2.9084,1.9945a.1788.1788,0,0,0,.192.0061l0-.0007a.176.176,0,0,0,.0851-.1724l-.3888-3.5192a.1776.1776,0,0,0-.0974-.14.1751.1751,0,0,0-.1709.0084l-.8532.5162A14.6719,14.6719,0,0,0,26.559,7.0106a.52.52,0,1,0-.47.9268Z" transform="translate(-1 -1)"/><path d="M32.741,25.8826a.5183.5183,0,0,0-.6984.2284A13.64,13.64,0,0,1,28.6552,30.37l-.4623-.764a.1748.1748,0,0,0-.1471-.0874.1822.1822,0,0,0-.1526.0778l-1.9944,2.9084a.1787.1787,0,0,0-.0061.192l.0007,0a.176.176,0,0,0,.1724.0851l3.5192-.3888a.1776.1776,0,0,0,.14-.0974.1752.1752,0,0,0-.0083-.1709l-.5161-.853a14.6829,14.6829,0,0,0,3.7685-4.6916A.5192.5192,0,0,0,32.741,25.8826Z" transform="translate(-1 -1)"/><path d="M4.7816,17.938v.9587h.92v3.7573h1.481V17.197H5.92C5.7643,17.704,5.4836,17.8989,4.7816,17.938Z" transform="translate(-1 -1)"/><path d="M35.244,19.7464a1.1146,1.1146,0,0,0,.7253-1.0679c0-1.1536-.8735-1.5673-2.183-1.5673a3.304,3.304,0,0,0-2.1124.71l.7172.9821a2.1842,2.1842,0,0,1,1.3562-.4674c.538,0,.7562.1558.7562.4441,0,.3588-.1558.46-.6314.46h-.7014v1.177h.7872c.5532,0,.7715.14.7715.5223,0,.3741-.2649.5532-.8963.5532a2.49,2.49,0,0,1-1.5511-.569l-.78.9821a3.4268,3.4268,0,0,0,2.3.8344c1.481,0,2.3931-.5537,2.3931-1.8165A1.1471,1.1471,0,0,0,35.244,19.7464Z" transform="translate(-1 -1)"/><path d="M21.02,6.4467c1.0445-.4837,1.2942-.92,1.2942-1.6373,0-.99-.71-1.5358-2.0657-1.5358a4.1094,4.1094,0,0,0-2.3388.71l.6938,1.1151a2.8789,2.8789,0,0,1,1.6216-.5537c.4365,0,.608.1325.608.3741,0,.2182-.0858.304-.6629.5613a3.3785,3.3785,0,0,0-2.2764,3.3366h4.4593V7.5846H19.508C19.6252,7.2573,19.9292,6.9532,21.02,6.4467Z" transform="translate(-1 -1)"/><path d="M21.5569,30.9144H20.06L17.1215,34.29V35.397h3.0793v.9745h1.3562v-.9354h.7019V34.1576h-.7019ZM20.2008,33.62v.538h-.4055c-.3741,0-.7481.0076-1.0212.0233a9.1978,9.1978,0,0,0,.7172-.7953l.0782-.0934a8.66,8.66,0,0,0,.6547-.85C20.2084,32.7,20.2008,33.3,20.2008,33.62Z" transform="translate(-1 -1)"/><path d="M6.5184,14.6629c-.0662-.0029-.1421-.0045-.2175-.0045a5.3421,5.3421,0,0,0-.1365,10.681c.0543.0023.1168.0031.1794.0031a5.3413,5.3413,0,0,0,.1746-10.68Zm-.1746,9.64c-.0482,0-.0964-.0005-.1452-.0025a4.3027,4.3027,0,0,1,.1022-8.6027q.0911,0,.183.0039a4.3018,4.3018,0,0,1-.14,8.6013Z" transform="translate(-1 -1)"/><path d="M33.8363,14.6629c-.0535-.0023-.1164-.0031-.1786-.0031a5.3413,5.3413,0,0,0-.1751,10.68c.0548.0023.1177.0031.1807.0031a5.3413,5.3413,0,0,0,.173-10.68Zm2.7626,8.4794a4.2718,4.2718,0,0,1-2.9357,1.1607c-.0487,0-.0974-.0005-.1467-.0025a4.3018,4.3018,0,0,1,.1411-8.6013c.0477,0,.0959.0005.1441.0025a4.3022,4.3022,0,0,1,2.7971,7.4406Z" transform="translate(-1 -1)"/><path d="M20.1774,1.0044C20.1115,1.0016,20.0362,1,19.9614,1A5.3428,5.3428,0,0,0,16.1,9.9926a5.3041,5.3041,0,0,0,3.7236,1.6883c.0548.0023.1177.0031.1807.0031a5.3413,5.3413,0,0,0,.1728-10.68ZM22.94,9.4839a4.27,4.27,0,0,1-2.9352,1.1607c-.0487,0-.0974-.0005-.1467-.0025a4.3026,4.3026,0,0,1,.1036-8.6026q.09,0,.1817.0038A4.3018,4.3018,0,0,1,22.94,9.4839Z" transform="translate(-1 -1)"/><path d="M20.1776,28.3214c-.0657-.0029-.1416-.0045-.2171-.0045a5.3423,5.3423,0,0,0-.1371,10.6815c.0535.0023.1164.0031.1786.0031a5.3415,5.3415,0,0,0,.1756-10.68Zm-.1756,9.6407c-.0477,0-.0959-.0005-.1441-.0025a4.3022,4.3022,0,0,1-2.7971-7.4406,4.2219,4.2219,0,0,1,2.9-1.1627c.0606,0,.1216.0013.1826.0039a4.3021,4.3021,0,0,1-.1411,8.6018Z" transform="translate(-1 -1)"/></svg>',
                        icon_docsandapi: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve"><g><g><g><path d="M37.5,19.3c0-0.1-0.1-0.2-0.2-0.3l-10.1-6.3l-8.6-9.6c-0.1-0.2-0.4-0.2-0.5,0l-2.7,2.4L13,4c-0.2-0.1-0.5-0.1-0.7,0.2L7,12.7l-3.1,2.7c-0.1,0.1-0.1,0.2-0.1,0.3c0,0.1,0,0.2,0.1,0.3l0.6,0.7l-1.9,3c-0.1,0.1-0.1,0.2-0.1,0.4c0,0.1,0.1,0.2,0.2,0.3l11.3,7l8.5,9.5c0.1,0.1,0.2,0.1,0.3,0.1c0.1,0,0.2,0,0.2-0.1l2.7-2.3l1.3,0.8c0.1,0.1,0.2,0.1,0.3,0.1c0.2,0,0.3-0.1,0.4-0.2l3.3-5.2l6.3-5.5c0.1-0.1,0.1-0.2,0.1-0.3c0-0.1,0-0.2-0.1-0.3l-1.5-1.7l1.7-2.7C37.5,19.6,37.5,19.5,37.5,19.3z M12.9,5.1l1.6,1l-4.9,4.3L12.9,5.1z M3.7,19.8l1.5-2.4l6.6,7.4L3.7,19.8z M27.1,34.3l-0.6-0.4l1.8-1.6L27.1,34.3z M22.8,36.1L14,26.2l0,0l0,0L4.7,15.7L18.3,3.9l9,10.2l0,0l0,0l9.1,10.2L22.8,36.1z M35.1,21.6l-5.5-6.2l6.8,4.2L35.1,21.6z"/><path d="M19.6,12c-0.1-0.2-0.4-0.2-0.5,0l-6.2,5.4c-0.1,0.1-0.1,0.2-0.1,0.3c0,0.1,0,0.2,0.1,0.3l6,6.7c0.1,0.2,0.4,0.2,0.5,0l1.5-1.3l2.6,2.9c0.1,0.1,0.2,0.1,0.3,0.1c0.1,0,0.2,0,0.2-0.1l4.5-3.9c0.1-0.1,0.1-0.2,0.1-0.3c0-0.1,0-0.2-0.1-0.3L19.6,12zM23.7,25.6l-2.6-2.9c-0.1-0.1-0.2-0.1-0.3-0.1c-0.1,0-0.2,0-0.2,0.1l-1.5,1.3l-5.5-6.2l5.7-5l8.3,9.3L23.7,25.6z"/><path d="M30.9,25.2c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0c0.1-0.1,0.1-0.2,0-0.3l-2-2.3c-0.1-0.1-0.2-0.1-0.3,0c-0.1,0.1-0.1,0.2,0,0.3L30.9,25.2z"/><path d="M29.2,21.7c0,0,0.1,0,0.1,0l1.4-1.2c0.1-0.1,0.1-0.2,0-0.3c-0.1-0.1-0.2-0.1-0.3,0l-1.4,1.2c-0.1,0.1-0.1,0.2,0,0.3C29.1,21.7,29.2,21.7,29.2,21.7z"/><path d="M18.7,11.5c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0c0.1-0.1,0.1-0.2,0-0.3L17,9c-0.1-0.1-0.2-0.1-0.3,0c-0.1,0.1-0.1,0.2,0,0.3L18.7,11.5z"/><path d="M12.5,16.8l-2-2.3c-0.1-0.1-0.2-0.1-0.3,0c-0.1,0.1-0.1,0.2,0,0.3l2,2.3c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0C12.6,17,12.6,16.9,12.5,16.8z"/><path d="M20.3,11.7c0,0,0.1,0,0.1,0l1.4-1.2c0.1-0.1,0.1-0.2,0-0.3c-0.1-0.1-0.2-0.1-0.3,0l-1.4,1.2c-0.1,0.1-0.1,0.2,0,0.3C20.1,11.6,20.2,11.7,20.3,11.7z"/><path d="M24.3,27c-0.1-0.1-0.2-0.1-0.3,0c-0.1,0.1-0.1,0.2,0,0.3l2,2.3c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0c0.1-0.1,0.1-0.2,0-0.3L24.3,27z"/><path d="M23,26.7l-1.4,1.2c-0.1,0.1-0.1,0.2,0,0.3c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0l1.4-1.2c0.1-0.1,0.1-0.2,0-0.3C23.2,26.6,23.1,26.6,23,26.7z"/><path d="M18.3,24.9l-1.4,1.2c-0.1,0.1-0.1,0.2,0,0.3c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0l1.4-1.2c0.1-0.1,0.1-0.2,0-0.3C18.5,24.8,18.4,24.8,18.3,24.9z"/><path d="M12.3,18.1l-1.4,1.2c-0.1,0.1-0.1,0.2,0,0.3c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0l1.4-1.2c0.1-0.1,0.1-0.2,0-0.3C12.5,18.1,12.4,18.1,12.3,18.1z"/></g></g></g></svg>'
                    };
                    return icons[name];
                };
                return RHDPSearchOneBox;
            }(HTMLElement));
            exports_27("default", RHDPSearchOneBox);
            customElements.define('rhdp-search-onebox', RHDPSearchOneBox);
        }
    };
});
System.register("@rhd/rhdp-search/rhdp-search-result", [], function (exports_28, context_28) {
    "use strict";
    var RHDPSearchResult, templateObject_20;
    var __moduleName = context_28 && context_28.id;
    return {
        setters: [],
        execute: function () {
            RHDPSearchResult = (function (_super) {
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
                    this.innerHTML = this.template(templateObject_20 || (templateObject_20 = __makeTemplateObject(["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""])), this.url, this.title, this.kind, this.created, this.description, this.premium, this.thumbnail);
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
                        description = result.fields.sys_content_plaintext ? result.fields.sys_content_plaintext[0] : '';
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
            exports_28("default", RHDPSearchResult);
            customElements.define('rhdp-search-result', RHDPSearchResult);
        }
    };
});
System.register("@rhd/rhdp-search/rhdp-search-results", ["@rhd/rhdp-search/rhdp-search-result"], function (exports_29, context_29) {
    "use strict";
    var rhdp_search_result_1, RHDPSearchResults;
    var __moduleName = context_29 && context_29.id;
    return {
        setters: [
            function (rhdp_search_result_1_1) {
                rhdp_search_result_1 = rhdp_search_result_1_1;
            }
        ],
        execute: function () {
            RHDPSearchResults = (function (_super) {
                __extends(RHDPSearchResults, _super);
                function RHDPSearchResults() {
                    var _this = _super.call(this) || this;
                    _this._more = false;
                    _this._last = 0;
                    _this._valid = true;
                    _this.invalidMsg = document.createElement('div');
                    _this.loadMore = document.createElement('div');
                    _this.endOfResults = document.createElement('div');
                    _this.loading = document.createElement('div');
                    _this._renderResults = _this._renderResults.bind(_this);
                    _this._setLoading = _this._setLoading.bind(_this);
                    _this._checkValid = _this._checkValid.bind(_this);
                    _this._clearResults = _this._clearResults.bind(_this);
                    return _this;
                }
                Object.defineProperty(RHDPSearchResults.prototype, "results", {
                    get: function () {
                        return this._results;
                    },
                    set: function (val) {
                        if (this._results === val)
                            return;
                        this._results = val;
                        this._renderResults(false);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchResults.prototype, "more", {
                    get: function () {
                        return this._more;
                    },
                    set: function (val) {
                        if (this._more === val)
                            return;
                        this._more = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchResults.prototype, "last", {
                    get: function () {
                        return this._last;
                    },
                    set: function (val) {
                        if (this._last === val)
                            return;
                        this._last = val ? val : 0;
                        this.setAttribute('last', val.toString());
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchResults.prototype, "valid", {
                    get: function () {
                        return this._valid;
                    },
                    set: function (val) {
                        if (this._valid === val)
                            return;
                        this._valid = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchResults.prototype.connectedCallback = function () {
                    var _this = this;
                    this.invalidMsg.className = 'invalidMsg';
                    this.invalidMsg.innerHTML = "<h4>Well, this is awkward. No search term was entered yet, so this page is a little empty right now.</h4>\n        <p>After you enter a search term in the box above, you will see the results displayed here. \n        You can also use the filters to select a content type, product or topic to see some results too. Try it out!</p>";
                    this.endOfResults.innerHTML = '<p class="end-of-results">- End of Results -</p>';
                    this.loadMore.className = 'moreBtn';
                    this.loadMore.innerHTML = '<a class="moreBtn" href="#">Load More</a>';
                    this.loading.className = 'loading';
                    this.loadMore.addEventListener('click', function (e) {
                        e.preventDefault();
                        _this.dispatchEvent(new CustomEvent('load-more', {
                            detail: {
                                from: _this.last
                            },
                            bubbles: true
                        }));
                    });
                    top.addEventListener('search-complete', this._renderResults);
                    top.addEventListener('search-start', this._setLoading);
                    top.addEventListener('params-ready', this._checkValid);
                    top.window.addEventListener('popstate', this._clearResults);
                    this.addEventListener('load-more', function (e) {
                        _this.more = true;
                    });
                };
                RHDPSearchResults.prototype.addResult = function (result) {
                    var item = new rhdp_search_result_1.default();
                    item.result = result;
                    this.appendChild(item);
                };
                RHDPSearchResults.prototype._setLoading = function (e) {
                    if (!this.more) {
                        while (this.firstChild) {
                            this.removeChild(this.firstChild);
                        }
                    }
                    else {
                        if (this.querySelector('.moreBtn')) {
                            this.removeChild(this.loadMore);
                        }
                        if (this.querySelector('.invalidMsg')) {
                            this.removeChild(this.invalidMsg);
                        }
                        this.more = false;
                    }
                    this.appendChild(this.loading);
                };
                RHDPSearchResults.prototype._renderResults = function (e) {
                    if (this.querySelector('.loading')) {
                        this.removeChild(this.loading);
                    }
                    if (e.detail && typeof e.detail.results !== 'undefined' && typeof e.detail.invalid === 'undefined') {
                        this.addResults(e.detail.results);
                    }
                    else {
                        while (this.firstChild) {
                            this.removeChild(this.firstChild);
                        }
                        this.appendChild(this.invalidMsg);
                    }
                    this.dispatchEvent(new CustomEvent('results-loaded', {
                        detail: { results: this.results },
                        bubbles: true
                    }));
                };
                RHDPSearchResults.prototype._clearResults = function (e) {
                    this.results = undefined;
                };
                RHDPSearchResults.prototype._checkValid = function (e) {
                    var obj = e.detail;
                    this.valid = Object.keys(obj.filters).length > 0 || (obj.term !== null && obj.term !== '' && typeof obj.term !== 'undefined');
                    if (!this.valid) {
                        this.appendChild(this.invalidMsg);
                    }
                    else {
                        if (this.querySelector('.invalidMsg')) {
                            this.removeChild(this.invalidMsg);
                        }
                    }
                };
                RHDPSearchResults.prototype.addResults = function (results) {
                    if (results && results.hits && results.hits.hits) {
                        var hits = results.hits.hits;
                        var l = hits.length;
                        for (var i = 0; i < l; i++) {
                            this.addResult(hits[i]);
                        }
                        this.last = this.last + l;
                        if (this.last >= results.hits.total) {
                            this.appendChild(this.endOfResults);
                        }
                        if (l > 0 && this.last < results.hits.total) {
                            if (this.querySelector('.end-of-results')) {
                                this.removeChild(this.endOfResults);
                            }
                            this.appendChild(this.loadMore);
                        }
                        else {
                            if (this.querySelector('.moreBtn')) {
                                this.removeChild(this.loadMore);
                            }
                            this.appendChild(this.endOfResults);
                        }
                    }
                };
                return RHDPSearchResults;
            }(HTMLElement));
            exports_29("default", RHDPSearchResults);
            customElements.define('rhdp-search-results', RHDPSearchResults);
        }
    };
});
System.register("@rhd/rhdp-search/rhdp-search-sort-page", [], function (exports_30, context_30) {
    "use strict";
    var RHDPSearchSortPage;
    var __moduleName = context_30 && context_30.id;
    return {
        setters: [],
        execute: function () {
            RHDPSearchSortPage = (function (_super) {
                __extends(RHDPSearchSortPage, _super);
                function RHDPSearchSortPage() {
                    var _this = _super.call(this) || this;
                    _this.template = "<p>\n        <span>Sort results by</span>\n        <select>\n        <option value=\"relevance\">Relevance</option>\n        <option value=\"most-recent\">Most Recent</option>\n        </select>\n        </p>";
                    _this._sortChange = _this._sortChange.bind(_this);
                    return _this;
                }
                Object.defineProperty(RHDPSearchSortPage.prototype, "sort", {
                    get: function () {
                        return this._sort;
                    },
                    set: function (val) {
                        if (this._sort === val)
                            return;
                        this._sort = val;
                        this.setAttribute('sort', this._sort);
                        this.querySelector('select').value = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchSortPage.prototype.connectedCallback = function () {
                    this.innerHTML = this.template;
                    top.addEventListener('params-ready', this._sortChange);
                    this.querySelector('select').onchange = this._sortChange;
                };
                Object.defineProperty(RHDPSearchSortPage, "observedAttributes", {
                    get: function () {
                        return ['sort'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchSortPage.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchSortPage.prototype._sortChange = function (e) {
                    if (e.detail && e.detail.sort) {
                        this.sort = e.detail.sort;
                    }
                    else {
                        if (e.target['options'] && typeof e.target['selectedIndex'] !== 'undefined') {
                            this.sort = e.target['options'][e.target['selectedIndex']].value;
                            this.dispatchEvent(new CustomEvent('sort-change', {
                                detail: {
                                    sort: this.sort
                                },
                                bubbles: true
                            }));
                        }
                    }
                };
                return RHDPSearchSortPage;
            }(HTMLElement));
            exports_30("default", RHDPSearchSortPage);
            customElements.define('rhdp-search-sort-page', RHDPSearchSortPage);
        }
    };
});
System.register("@rhd/rhdp-search/rhdp-search-app", ["@rhd/rhdp-search/rhdp-search-url", "@rhd/rhdp-search/rhdp-search-query", "@rhd/rhdp-search/rhdp-search-box", "@rhd/rhdp-search/rhdp-search-result-count", "@rhd/rhdp-search/rhdp-search-filters", "@rhd/rhdp-search/rhdp-search-onebox", "@rhd/rhdp-search/rhdp-search-results", "@rhd/rhdp-search/rhdp-search-sort-page"], function (exports_31, context_31) {
    "use strict";
    var rhdp_search_url_1, rhdp_search_query_1, rhdp_search_box_1, rhdp_search_result_count_1, rhdp_search_filters_1, rhdp_search_onebox_1, rhdp_search_results_1, rhdp_search_sort_page_1, RHDPSearchApp;
    var __moduleName = context_31 && context_31.id;
    return {
        setters: [
            function (rhdp_search_url_1_1) {
                rhdp_search_url_1 = rhdp_search_url_1_1;
            },
            function (rhdp_search_query_1_1) {
                rhdp_search_query_1 = rhdp_search_query_1_1;
            },
            function (rhdp_search_box_1_1) {
                rhdp_search_box_1 = rhdp_search_box_1_1;
            },
            function (rhdp_search_result_count_1_1) {
                rhdp_search_result_count_1 = rhdp_search_result_count_1_1;
            },
            function (rhdp_search_filters_1_1) {
                rhdp_search_filters_1 = rhdp_search_filters_1_1;
            },
            function (rhdp_search_onebox_1_1) {
                rhdp_search_onebox_1 = rhdp_search_onebox_1_1;
            },
            function (rhdp_search_results_1_1) {
                rhdp_search_results_1 = rhdp_search_results_1_1;
            },
            function (rhdp_search_sort_page_1_1) {
                rhdp_search_sort_page_1 = rhdp_search_sort_page_1_1;
            }
        ],
        execute: function () {
            RHDPSearchApp = (function (_super) {
                __extends(RHDPSearchApp, _super);
                function RHDPSearchApp() {
                    var _this = _super.call(this) || this;
                    _this._name = 'Search';
                    _this._oburl = '../rhdp-apps/onebox/onebox.json';
                    _this.template = "<div class=\"row\">\n    <span class=\"search-outage-msg\"></span>\n    <div class=\"large-24 medium-24 small-24 columns searchpage-middle\">\n        <div class=\"row\">\n            <div class=\"large-24 medium-24 small-24 columns\">\n                <h2>" + _this.name + "</h2>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"large-6 medium-8 small-24 columns\"></div>\n            <div class=\"large-18 medium-16 small-24 columns\"></div>\n        </div>\n    </div></div>";
                    _this.urlEle = new rhdp_search_url_1.default();
                    _this.query = new rhdp_search_query_1.default();
                    _this.box = new rhdp_search_box_1.default();
                    _this.count = new rhdp_search_result_count_1.default();
                    _this.filters = new rhdp_search_filters_1.default();
                    _this.active = new rhdp_search_filters_1.default();
                    _this.modal = new rhdp_search_filters_1.default();
                    _this.onebox = new rhdp_search_onebox_1.default();
                    _this.results = new rhdp_search_results_1.default();
                    _this.sort = new rhdp_search_sort_page_1.default();
                    _this.filterObj = {
                        term: '',
                        facets: [
                            { name: 'CONTENT TYPE', key: 'type', items: [
                                    { key: 'apidocs', name: 'APIs and Docs', value: ['rht_website', 'rht_apidocs'], type: ['apidocs'] },
                                    { key: 'archetype', name: 'Archetype', value: ['jbossdeveloper_archetype'], type: ['jbossdeveloper_archetype'] },
                                    { key: 'article', name: 'Article', value: ['rht_knowledgebase_article', 'rht_knowledgebase_solution'], type: ['rht_knowledgebase_article', 'rht_knowledgebase_solution'] },
                                    { key: 'blogpost', name: "Blog Posts", value: ['jbossorg_blog'], type: ['jbossorg_blog'] },
                                    { key: 'book', name: "Book", value: ["jbossdeveloper_book"], type: ["jbossdeveloper_book"] },
                                    { key: 'bom', name: "BOM", value: ["jbossdeveloper_bom"], type: ['jbossdeveloper_bom'] },
                                    { key: 'cheatsheet', name: "Cheat Sheet", value: ['jbossdeveloper_cheatsheet'], type: ['jbossdeveloper_cheatsheet'] },
                                    { key: 'demo', name: 'Demo', value: ['jbossdeveloper_demo'], type: ['jbossdeveloper_demo'] },
                                    { key: 'event', name: 'Event', value: ['jbossdeveloper_event'], type: ['jbossdeveloper_event'] },
                                    { key: 'forum', name: 'Forum', value: ['jbossorg_sbs_forum'], type: ['jbossorg_sbs_forum'] },
                                    { key: 'get-started', name: "Get Started", value: ["jbossdeveloper_example"], type: ['jbossdeveloper_example'] },
                                    { key: 'quickstart', name: "Quickstart", value: ['jbossdeveloper_quickstart'], type: ['jbossdeveloper_quickstart'] },
                                    { key: 'stackoverflow', name: 'Stack Overflow', value: ['stackoverflow_question'], type: ['stackoverflow_question'] },
                                    { key: 'video', name: "Video", value: ['jbossdeveloper_vimeo', 'jbossdeveloper_youtube'], type: ['jbossdeveloper_vimeo', 'jbossdeveloper_youtube'] },
                                    { key: 'webpage', name: "Web Page", value: ['rht_website'], type: ['rht_website'] }
                                ]
                            },
                            {
                                name: 'PRODUCT',
                                key: 'project',
                                items: [
                                    { key: 'dotnet', name: '.NET Core', value: ['dotnet'] },
                                    { key: 'amq', name: 'JBoss A-MQ', value: ['amq'] },
                                    { key: 'rhpam', name: 'Red Hat Process Automation Manager', value: ['rhpam', 'bpmsuite'] },
                                    { key: 'brms', name: 'Red Hat Decision Manager', value: ['brms'] },
                                    { key: 'datagrid', name: 'JBoss Data Grid', value: ['datagrid'] },
                                    { key: 'datavirt', name: 'JBoss Data Virtualization', value: ['datavirt'] },
                                    { key: 'devstudio', name: 'JBoss Developer Studio', value: ['devstudio'] },
                                    { key: 'eap', name: 'JBoss Enterprise Application Platform', value: ['eap'] },
                                    { key: 'fuse', name: 'JBoss Fuse', value: ['fuse'] },
                                    { key: 'webserver', name: 'JBoss Web Server', value: ['webserver'] },
                                    { key: 'openjdk', name: 'OpenJDK', value: ['openjdk'] },
                                    { key: 'rhamt', name: 'Red Hat Application Migration Toolkit', value: ['rhamt'] },
                                    { key: 'cdk', name: 'Red Hat Container Development Kit', value: ['cdk'] },
                                    { key: 'developertoolset', name: 'Red Hat Developer Toolset', value: ['developertoolset'] },
                                    { key: 'rhel', name: 'Red Hat Enterprise Linux', value: ['rhel'] },
                                    { key: 'mobileplatform', name: 'Red Hat Mobile Application Platform', value: ['mobileplatform'] },
                                    { key: 'openshift', name: 'Red Hat OpenShift Container Platform', value: ['openshift'] },
                                    { key: 'softwarecollections', name: 'Red Hat Software Collections', value: ['softwarecollections'] }
                                ]
                            },
                            { name: 'TOPIC', key: 'tag', items: [
                                    { key: 'dotnet', name: '.NET', value: ['dotnet', '.net', 'visual studio', 'c#'] },
                                    { key: 'containers', name: 'Containers', value: ['atomic', 'cdk', 'containers'] },
                                    { key: 'devops', name: 'DevOps', value: ['devops', 'CI', 'CD', 'Continuous Delivery'] },
                                    { key: 'enterprise-java', name: 'Enterprise Java', value: ['ActiveMQ', 'AMQP', 'apache camel', 'Arquillian', 'Camel', 'CDI', 'CEP', 'CXF', 'datagrid', 'devstudio', 'Drools', 'Eclipse', 'fabric8', 'Forge', 'fuse', 'Hawkular', 'Hawtio', 'Hibernate', 'Hibernate ORM', 'Infinispan', 'iPaas', 'java ee', 'JavaEE', 'JBDS', 'JBoss', 'JBoss BPM Suite', 'Red Hat Decision Manager', 'JBoss Data Grid', 'jboss eap', 'JBoss EAP', ''] },
                                    { key: 'iot', name: 'Internet of Things', value: ['iot', 'Internet of Things'] },
                                    { key: 'microservices', name: 'Microservices', value: ['microservices', ' WildFly Swarm'] },
                                    { key: 'mobile', name: 'Mobile', value: ['mobile', 'Red Hat Mobile', 'RHMAP', 'Cordova', 'FeedHenry'] },
                                    { key: 'web-and-api-development', name: 'Web and API Development', value: ['Web', 'API', 'HTML5', 'REST', 'Camel', 'Node.js', 'RESTEasy', 'JAX-RS', 'Tomcat', 'nginx', 'Rails', 'Drupal', 'PHP', 'Bottle', 'Flask', 'Laravel', 'Dancer', 'Zope', 'TurboGears', 'Sinatra', 'httpd', 'Passenger'] },
                                ]
                            }
                        ]
                    };
                    return _this;
                }
                Object.defineProperty(RHDPSearchApp.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (val) {
                        if (this._name === val)
                            return;
                        this._name = val;
                        this.setAttribute('name', this.name);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchApp.prototype, "url", {
                    get: function () {
                        return this._url;
                    },
                    set: function (val) {
                        if (this._url === val)
                            return;
                        this._url = val;
                        this.query.url = this.url;
                        this.setAttribute('url', this.url);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchApp.prototype, "oburl", {
                    get: function () {
                        return this._oburl;
                    },
                    set: function (val) {
                        if (this._oburl === val)
                            return;
                        this._oburl = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchApp.prototype.connectedCallback = function () {
                    this.innerHTML = this.template;
                    this.active.setAttribute('type', 'active');
                    this.active.title = 'Active Filters:';
                    this.modal.setAttribute('type', 'modal');
                    this.modal.filters = this.filterObj;
                    this.active.filters = this.filterObj;
                    this.filters.filters = this.filterObj;
                    this.query.filters = this.filterObj;
                    this.onebox.url = this.oburl;
                    document.body.appendChild(this.modal);
                    this.querySelector('.row .large-24 .row .large-24').appendChild(this.query);
                    this.querySelector('.row .large-24 .row .large-24').appendChild(this.box);
                    this.querySelector('.large-6').appendChild(this.filters);
                    this.querySelector('.large-18').appendChild(this.active);
                    this.querySelector('.large-18').appendChild(this.count);
                    this.querySelector('.large-18').appendChild(this.sort);
                    this.querySelector('.large-18').appendChild(this.onebox);
                    this.querySelector('.large-18').appendChild(this.results);
                    document.body.appendChild(this.urlEle);
                };
                Object.defineProperty(RHDPSearchApp, "observedAttributes", {
                    get: function () {
                        return ['url', 'name', 'oburl'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchApp.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                RHDPSearchApp.prototype.toggleModal = function (e) {
                    this.modal.toggle = e.detail.toggle;
                };
                RHDPSearchApp.prototype.updateSort = function (e) {
                    this.query.sort = e.detail.sort;
                    this.query.from = 0;
                    this.results.last = 0;
                    this.count.term = this.box.term;
                };
                return RHDPSearchApp;
            }(HTMLElement));
            exports_31("default", RHDPSearchApp);
            customElements.define('rhdp-search-app', RHDPSearchApp);
        }
    };
});
var $ = jQuery;
var app = window.app = {};
var full_base_url = Drupal.url.toAbsolute(drupalSettings.path.baseUrl);
app.baseUrl = full_base_url.substring(0, full_base_url.lastIndexOf('/'));
app.downloadManagerBaseUrl = drupalSettings.rhd.downloadManager.baseUrl;
app.cache = {};
app.templates = {};
app.templates.searchpageTemplate = drupalSettings.rhd.templates.searchPageTemplate;
app.templates.miniBuzzTemplate = drupalSettings.rhd.templates.miniBuzz;
app.templates.productBuzzTemplate = drupalSettings.rhd.templates.productBuzz;
app.templates.buzzTemplate = drupalSettings.rhd.templates.buzz;
app.templates.termsAndConditionsTemplate = drupalSettings.rhd.templates.termsConditions;
app.templates.bookTemplate = drupalSettings.rhd.templates.book;
app.templates.connectorTemplate = drupalSettings.rhd.templates.connector;
app.templates.productStackoverflowTemplate = drupalSettings.rhd.templates.productStackoverflowTemplate;
app.templates.stackoverflowTemplate = drupalSettings.rhd.templates.stackoverflowTemplate;
app.fastClick = false;
app.dcp = {};
app.dcp.url = {};
app.dcp.url.search = drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/search';
app.dcp.url.stackoverflow = drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/search/stackoverflow/';
app.dcp.url.content = drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/content';
app.dcp.url.auth_status = drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/auth/status';
app.dcp.url.rating = drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/rating';
app.dcp.url.project = drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/search/suggest_project_name_ngram_more_fields';
app.dcp.url.events = drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/search/events';
app.dcp.url.connectors = drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/search/connectors';
app.dcp.url.broker = drupalSettings.rhd.broker;
app.dcp.error_message = "<div class='dcp-error-message'>It appears we're unable to access this data right now. Look at <a href='http://twitter.com/jbossorg' target=_blank>@jbossorg</a> to see if there is scheduled maintenance, or try again shortly.</div>";
app.dcp.url.developer_materials = drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/search/developer_materials';
app.dcp.excludeResourceTags = ["red hat", "Red Hat", "redhat"];
app.dcp.availableTopics = ["AOP", "ActiveMQ", "ActiveMQ Endpoint", "Android", "AngularJS", "Apache Cordova",
    "Apache Deltaspike", "AppClient", "Arquillian", "Asynchronous EJB", "Asynchronous Servlet", "BMT", "BPMS", "BRMS",
    "BV", "Backbone", "Batch", "Batch 1.0", "Bean Validation 1.1", "Bundle packaging and deployment", "CDI", "CDI 1.1",
    "CEP", "CMT", "CXF", "CXFRS Endpoint", "Camel", "Concurrency Utilities", "Content Base Routing", "Cordova",
    "Crash Recovery", "DOM", "DOM4J", "Dandellion", "DeltaSpike", "Deltaspike", "Drools", "EAR",
    "EE Concurrency Utilities", "EJB", "EJB 3.1 Timer", "EJB 3", "EL 3.0", "Fabric8", "File Endpoint", "Forge", "Fuse",
    "GWT", "Github API", "H2", "HASingleton", "HTML5", "Hibernate", "Hibernate 3", "Hibernate 4", "HornetQ", "Hot Rod",
    "HotRod", "Http4 Endpoint", "Infinispan", "Interceptor 1.2", "Interceptors", "JAAS", "JACC", "JASPIC", "JAX-RS",
    "JAX-RS 2.0", "JAX-RS Client API", "JAX-WS", "JAX-WS 2.2", "JAXB transformation", "JAXP", "JBoss BPM Suite",
    "JBoss BRMS", "JBoss Data Grid", "JBoss DataVirt", "JBoss EAP", "JBoss Fuse", "JBoss Logging Tools", "JBoss Modules",
    "JBoss ON", "JCA 1.7", "JMS", "JMS 2.0", "JMX", "JNDI", "JPA", "JPA 2.0", "JPA 2.1", "JQuery", "JSF", "JSF 2.2", "JSF2",
    "JSON", "JSON-P", "JSON-P 1.0", "JSP", "JSTL", "JTA", "JTA 1.2", "JTS", "JUnit", "JWS", "JWT", "Java", "Java EE 7",
    "Java Servlet", "JavaMail", "JavaScript", "JavaScript Cordova", "Javamail 1.5", "Jenkins", "Junit", "Logging", "MBean",
    "MDB", "Maven", "Memcached", "Nexus", "OAuth", "OSGi", "Objective-C", "Optaplanner", "PicketLink",
    "PicketLink Federation", "PicketLink IDM", "Portal Container", "Portal Extension", "Portlet", "Portlet Bridge",
    "REST", "RESTful", "RF4", "RecipientList Endpoint with dynamic Restful URL",
    "Red Hat JBoss Enterprise Application Platform (JBoss EAP)", "Red Hat JBoss Portal", "Remote Query", "RestEasy",
    "Resteasy", "RichFaces", "SAML", "SAML v2.0", "SAX", "SFSB EJB", "SLSB EJB", "SQL Endpoint", "Security", "Servlet",
    "Servlet 3.1", "Servlet Filter", "Servlet Listener", "Servlets", "Set up the activemq for messaging broker.",
    "Shrinkwrap", "Singleton", "Sonar", "Spring", "Spring Boot", "Spring Data", "Spring MVC", "Spring MVC Annotations",
    "Topcoat", "Transactions", "Unified Push Java Client", "WAR", "WS-AT", "WS-BA", "WS-Trust", "WebSocket",
    "WebSocket through STOMP", "Websocket 1.0", "i18n", "iOS", "jBPM", "jQuery", "jQuery Mobile", "l10n", "webjars"];
app.dcp.thumbnails = {
    "jbossdeveloper_quickstart": "/images/design/get-started/jbossdeveloper_quickstart.png",
    "jbossdeveloper_archetype": "/images/design/get-started/jbossdeveloper_archetype.png",
    "jbossdeveloper_bom": "/images/design/get-started/jbossdeveloper_bom.png",
    "jbossdeveloper_demo": "/images/design/get-started/jbossdeveloper_demo.png",
    "quickstart": "/images/design/get-started/jbossdeveloper_quickstart.png",
    "archetype": "/images/design/get-started/jbossdeveloper_archetype.png",
    "bom": "/images/design/get-started/jbossdeveloper_bom.png",
    "demo": "/images/design/get-started/jbossdeveloper_demo.png",
    "solution": "/images/design/get-started/solution.png",
    "article": "/images/design/get-started/article.png",
    "rht_knowledgebase_article": "/images/design/get-started/article.png",
    "rht_knowledgebase_solution": "/images/design/get-started/solution.png",
    "jbossdeveloper_vimeo": "/images/design/get-started/article.png",
    "jbossdeveloper_connector": "/images/design/get-started/article.png"
};
app.products = {
    "amq": { "upstream": ["activemq", "fabric8"], "stackoverflow": ["jbossamq", "amq"], "buzz_tags": ["amq", "JBoss A-MQ"] },
    "rhpam": { "upstream": ["drools", "guvnor", "optaplanner", "jbpm"], "stackoverflow": "redhat-bpm", "buzz_tags": ["BPM Suite", "jBPM"] },
    "brms": { "upstream": ["optaplanner", "drools", "guvnor"], "stackoverflow": ["redhat-brms", "decision manager", "red hat decision manager"], "buzz_tags": ["brms", "JBoss BRMS"] },
    "cdk": { "upstream": null, "stackoverflow": "redhat-containers", "buzz_tags": ["containers"] },
    "datagrid": { "upstream": ["infinispan", "jgroups", "hibernate_subprojects_search"], "stackoverflow": "redhat-datagrid", "buzz_tags": ["datagrid", "jboss data grid"] },
    "datavirt": { "upstream": ["teiid", "teiiddesigner", "modeshape"], "stackoverflow": "redhat-datavirt", "buzz_tags": ["datavirt", "jboss datavirt"] },
    "developertoolset": { "upstream": null, "stackoverflow": { "AND": { "tag_set_one": ["redhat-dts", "gcc"], "tag_set_two": ["redhat-dts", "redhat", "rhel", "red hat"] } }, "buzz_tags": ["developertoolset"] },
    "devstudio": { "upstream": ["jbosstools"], "stackoverflow": "jboss-developer-studio", "buzz_tags": ["jbds", "JBoss DevStudio"] },
    "dotnet": { "upstream": null, "stackoverflow": "rhel.net", "buzz_tags": "dotnet" },
    "eap": { "upstream": ["wildfly", "jgroups", "hibernate", "hornetq", "jbossclustering", "jbossmc", "narayana", "jbossweb", "jbossws", "ironjacamar", "jgroups", "mod_cluster", "jbossas_osgi", "jbosssso", "picketlink", "resteasy", "weld", "wise", "xnio"], "stackoverflow": ["jboss-eap-6", "jboss-eap-7"], "buzz_tags": ["eap", "jboss eap"] },
    "fuse": { "upstream": ["camel", "karaf", "activemq", "cxf", "fabric8", "switchyard", "hawtio"], "stackoverflow": ["jbossfuse"], "buzz_tags": ["fuse", "jboss fuse"] },
    "mobileplatform": { "upstream": null, "stackoverflow": "redhat-mobile", "buzz_tags": ["mobileplatform", "mobile"] },
    "openjdk": { "upstream": null, "stackoverflow": "redhat-openjdk", "buzz_tags": "openjdk" },
    "openshift": { "upstream": null, "stackoverflow": ["openshift", "openshift-client-tools", "openshift-enterprise", "openshift-cartridge", "openshift-php-cartridges", "openshift-gears", "openshift-web-console", "openshift-env-variables"], "buzz_tags": ["openshift", "openshiftv3"] },
    "rhel": { "upstream": ["fedora"], "stackoverflow": ["rhel", "rhel5", "rhel6", "rhel7"], "buzz_tags": ["rhel", "rhel7"] },
    "rhoar": { "stackoverflow": ["redhat-rhoar"] },
    "softwarecollections": { "upstream": null, "stackoverflow": ["rhel", "rhel5", "rhel6", "rhel7"], "buzz_tags": ["software collections"] },
    "webserver": { "upstream": ["tomcat", "httpd", "mod_cluster"], "stackoverflow": ["jboss-web"], "buzz_tags": ["webserver"] },
    "rhmap": { "upstream": ["feedhenry"], "stackoverflow": ["rhmap"], "buzz_tags": ["mobileplatform", "mobile"] },
    "clang-llvm-go-rust": { "upstream": null, "stackoverflow": { "AND": { "tag_set_one": ["redhat", "red hat", "rhel"], "tag_set_two": ["go", "golang", "rust", "llvm", "clang"] } }, "buzz_tags": ["rhel", "rhel7"] },
    "migrationtoolkit": { "upstream": null, "stackoverflow": ["rhamt"], "buzz_tags": ["windup", "rhamt"] }
};
app.products.downloads = {
    "cdk": { "windowsUrl": "/download-manager/file/cdk-3.11.0-1-minishift-windows-amd64.exe", "macUrl": "/download-manager/file/cdk-3.11.0-1-minishift-darwin-amd64", "rhelUrl": "/download-manager/file/cdk-3.11.0-1-minishift-linux-amd64" }
};
app.mktg_ops = {};
app.ssoConfig = {};
app.ssoConfig.account_url = drupalSettings.rhd.keycloak.accountUrl;
app.ssoConfig.auth_url = drupalSettings.rhd.keycloak.authUrl;
var homeLink = document.getElementById('home-link') || { href: '' };
app.ssoConfig.confirmation = homeLink.href + '/confirmation';
app.ssoConfig.logout_url = homeLink.href;
app.projects = {};
app.projects.defaultImage = "/images/design/projects/default_200x150.png";
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    }
    else {
        factory(jQuery);
    }
}(function ($) {
    if ($.support.cors || !$.ajaxTransport || !window.XDomainRequest) {
        return;
    }
    var httpRegEx = /^https?:\/\//i;
    var getOrPostRegEx = /^get|post$/i;
    var sameSchemeRegEx = new RegExp('^' + location.protocol, 'i');
    $.ajaxTransport('* text html xml json', function (options, userOptions, jqXHR) {
        if (!options.crossDomain || !options.async || !getOrPostRegEx.test(options.type) || !httpRegEx.test(options.url) || !sameSchemeRegEx.test(options.url)) {
            return;
        }
        var xdr = null;
        return {
            send: function (headers, complete) {
                var postData = '';
                var userType = (userOptions.dataType || '').toLowerCase();
                xdr = new XDomainRequest();
                if (/^\d+$/.test(userOptions.timeout)) {
                    xdr.timeout = userOptions.timeout;
                }
                xdr.ontimeout = function () {
                    complete(500, 'timeout');
                };
                xdr.onload = function () {
                    var allResponseHeaders = 'Content-Length: ' + xdr.responseText.length + '\r\nContent-Type: ' + xdr.contentType;
                    var status = {
                        code: 200,
                        message: 'success'
                    };
                    var responses = {
                        text: xdr.responseText
                    };
                    try {
                        if (userType === 'html' || /text\/html/i.test(xdr.contentType)) {
                            responses.html = xdr.responseText;
                        }
                        else if (userType === 'json' || (userType !== 'text' && /\/json/i.test(xdr.contentType))) {
                            try {
                                responses.json = $.parseJSON(xdr.responseText);
                            }
                            catch (e) {
                                status.code = 500;
                                status.message = 'parseerror';
                            }
                        }
                        else if (userType === 'xml' || (userType !== 'text' && /\/xml/i.test(xdr.contentType))) {
                            var doc = new ActiveXObject('Microsoft.XMLDOM');
                            doc.async = false;
                            try {
                                doc.loadXML(xdr.responseText);
                            }
                            catch (e) {
                                doc = undefined;
                            }
                            if (!doc || !doc.documentElement || doc.getElementsByTagName('parsererror').length) {
                                status.code = 500;
                                status.message = 'parseerror';
                                throw 'Invalid XML: ' + xdr.responseText;
                            }
                            responses.xml = doc;
                        }
                    }
                    catch (parseMessage) {
                        throw parseMessage;
                    }
                    finally {
                        complete(status.code, status.message, responses, allResponseHeaders);
                    }
                };
                xdr.onprogress = function () { };
                xdr.onerror = function () {
                    complete(500, 'error', {
                        text: xdr.responseText
                    });
                };
                if (userOptions.data) {
                    postData = ($.type(userOptions.data) === 'string') ? userOptions.data : $.param(userOptions.data);
                }
                xdr.open(options.type, options.url);
                xdr.send(postData);
            },
            abort: function () {
                if (xdr) {
                    xdr.abort();
                }
            }
        };
    });
}));
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (len === 0) {
                return false;
            }
            var n = fromIndex | 0;
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            while (k < len) {
                if (o[k] === searchElement) {
                    return true;
                }
                k++;
            }
            return false;
        }
    });
}
jQuery.ajaxSettings.traditional = true;
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match;
    });
};
if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (searchString, position) {
            position = position || 0;
            return this.lastIndexOf(searchString, position) === position;
        }
    });
}
if (!String.prototype.contains) {
    String.prototype.contains = function () {
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}
Array.prototype.sortJsonArrayByProperty = function sortJsonArrayByProperty(prop, direction) {
    if (arguments.length < 1)
        throw new Error("sortJsonArrayByProperty requires 1 argument");
    var direct = arguments.length > 2 ? arguments[2] : 1;
    var propPath = (prop.constructor === Array) ? prop : prop.split(".");
    this.sort(function (a, b) {
        for (var p = 0; p < propPath.length; p++) {
            if (a[propPath[p]] && b[propPath[p]]) {
                a = a[propPath[p]];
                b = b[propPath[p]];
            }
            else if (a[propPath[p]]) {
                return -1 * direct;
            }
            else if (b[propPath[p]]) {
                return direct;
            }
            else {
                return 0;
            }
        }
        a = isNaN(Math.floor(a)) ? a.toLowerCase() : a;
        b = isNaN(Math.floor(b)) ? b.toLowerCase() : b;
        return ((a < b) ? (-1 * direct) : ((a > b) ? (1 * direct) : 0));
    });
};
Array.prototype.unique = function () {
    var o = {}, i, l = this.length, r = [];
    for (i = 0; i < l; i += 1)
        o[this[i]] = this[i];
    for (i in o)
        r.push(o[i]);
    return r;
};
Array.prototype.peek = function () {
    var n = this.length;
    if (n > 0)
        return this[n - 1];
};
(function () {
    var cache = {};
    String.prototype.template = function (data) {
        var fn = !/\W/.test(this) ?
            cache[this] = cache[this] ||
                tmpl(document.getElementById(this).innerHTML) :
            new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" +
                "with(obj){p.push('" +
                this
                    .replace(/[\r\t\n]/g, " ")
                    .split("<!").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)!>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("!>").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");
        return data ? fn(data) : fn;
    };
})();
app.utils = {};
app.utils.getParameterByName = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};
app.utils.getFragmentParameterByName = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\!&]" + name + "=([^&?]*)"), results = regex.exec(location.hash);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};
app.utils.getParametersFromHash = function () {
    var match, pl = /\+/g, search = /([^&\!#=]+)=?([^&]*)/g, decode = function (s) {
        return decodeURIComponent(s.replace(pl, " "));
    }, query = window.location.hash || (window.location.search.match(/\?_escaped_fragment_/gi) ? window.location.search.replace('?_escaped_fragment_=', '#') : ""), urlParams = {};
    while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
    }
    return urlParams;
};
app.utils.convertParametersToHash = function (urlParams) {
    var hashArray = [];
    for (k in urlParams) {
        if (urlParams[k]) {
            hashArray.push(k + "=" + encodeURIComponent(urlParams[k]));
        }
    }
    return hashArray.join("&");
};
app.utils.updatePageHash = function (el) {
    var urlParams = app.utils.getParametersFromHash();
    var name = el.attr('name');
    urlParams[name] = el.val();
    window.location.hash = "!" + app.utils.convertParametersToHash(urlParams);
    if (!!window.location.search) {
        window.location = window.location.href.replace(window.location.search, '');
    }
};
app.utils.restoreFromHash = function (urlParams) {
    var urlParams = urlParams || app.utils.getParametersFromHash();
    for (k in urlParams) {
        var input = $('[name="' + k + '"]');
        var tagName = input.prop('tagName');
        if (tagName === "SELECT") {
            input.find('option[value="' + urlParams[k] + '"]').attr('selected', 'selected').trigger('change');
        }
        else {
            input.val(urlParams[k]).trigger('keyup');
        }
    }
};
app.utils.parseDataAttributes = function () {
    var values = {};
    $('[data-set]').each(function (i, el) {
        var el = $(this);
        var data = el.data();
        for (key in data) {
            if (key.match(/^set[A-Z]/g)) {
                var attr = key.replace('set', '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                values[attr] = data[key];
            }
        }
    });
    app.dm.restoreFilter(values);
    app.utils.restoreFromHash(values);
};
app.utils.getQueryVariable = function (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
};
app.utils.diplayPagination = function (currentPage, totalPages, pagesToShow) {
    if (!pagesToShow) {
        pagesToShow = 4;
    }
    else if (pagesToShow % 2) {
        pagesToShow++;
    }
    var pagesToShow = pagesToShow || 4;
    var startPage = (currentPage < 5) ? 1 : currentPage - (pagesToShow / 2);
    var endPage = pagesToShow + startPage;
    endPage = (totalPages < endPage) ? totalPages : endPage;
    var diff = startPage - endPage + pagesToShow;
    startPage -= (startPage - diff > 0) ? diff : 0;
    var display = [];
    if (startPage > 1) {
        display.push(1);
        display.push("⋯");
    }
    for (i = startPage; i <= endPage; i++) {
        display.push(i);
    }
    if (endPage < totalPages) {
        display.push("⋯");
        display.push(totalPages);
    }
    return display;
};
app.utils.isMobile = {
    Android: function () {
        return !!navigator.userAgent.match(/Android/i);
    },
    iOS: function () {
        return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    any: function () {
        return (app.utils.isMobile.Android() || app.utils.isMobile.iOS());
    }
};
app.utils.getMonth = function (monthNum) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNum];
};
function roundHalf(num) {
    var num = Math.round(num * 2) / 2;
    var html = "";
    for (var i = num; i >= 0; i--) {
        if (i >= 1) {
            html += "<i class='fa fa-star'></i>";
        }
        else if (i > 0) {
            html += "<i class='fa fa-star-half-empty'></i>";
        }
    }
    ;
    return html;
}
if (typeof Object.assign != 'function') {
    (function () {
        Object.assign = function (target) {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    })();
}
app.sso = function () {
    function updateUser() {
        window.digitalData = window.digitalData || {};
        digitalData.user = digitalData.user || [{ profile: [{ profileInfo: {} }] }];
        var usr = digitalData.user[0].profile[0].profileInfo || {};
        if (window.location.href.toLowerCase().indexOf('/login') >= 0 && window.location.href.toLowerCase().indexOf('/user') < 0) {
            keycloak.login({ "redirectUri": app.ssoConfig.logout_url });
        }
        if (keycloak.authenticated) {
            keycloak.updateToken().success(function () {
                saveTokens();
                var logged_in_user = keycloak.tokenParsed.name || "My Account";
                if (logged_in_user.replace(/\s/g, "").length < 1) {
                    logged_in_user = "My Account";
                }
                $('span.logged-in-name')
                    .text(logged_in_user)
                    .show();
                $('a.account-info').attr('href', app.ssoConfig.account_url);
                $('li.login, li.register, li.login-divider, section.register-banner, .hidden-after-login').hide();
                $('section.contributors-banner, .shown-after-login, li.logged-in').show();
                $('li.login a, a.keycloak-url').attr("href", keycloak.createAccountUrl());
                $('[data-audience="authenticated"]').show();
                $('a.logout').on('click', function (e) {
                    e.preventDefault();
                    keycloak.logout({ "redirectUri": app.ssoConfig.logout_url });
                });
                usr.loggedIn = true;
                usr.keyCloakID = keycloak.tokenParsed.id;
                usr.daysSinceRegistration = daysDiff(Date.now(), keycloak.tokenParsed.createdTimestamp);
                if (typeof Object.keys == "function") {
                    usr.socialAccountsLinked = Object.keys(keycloak.tokenParsed['user-social-links']);
                }
                else {
                    for (social in keycloak.tokenParsed['user-social-links']) {
                        usr.socialAccountsLinked.push(social);
                    }
                }
            }).error(clearTokens);
        }
        else {
            $('li.login, section.register-banner, .hidden-after-login').show();
            $('li.logged-in, section.contributors-banner, .shown-after-login, li.logged-in').hide();
            $('li.logged-in').hide();
            $('[data-audience="unauthenticated"]').show();
            $('li.login a').on('click', function (e) {
                e.preventDefault();
                keycloak.login();
            });
            $('li.register a, a.keycloak-url').on('click', function (e) {
                e.preventDefault();
                keycloak.login({ action: 'register', redirectUri: app.ssoConfig.confirmation });
            });
        }
        updateAnalytics(usr);
    }
    function daysDiff(dt1, dt2) {
        return Math.floor(Math.abs(dt1 - dt2) / (1000 * 60 * 60 * 24));
    }
    function updateAnalytics(usr) {
        var ddUserAuthEvent = {
            eventInfo: {
                eventName: 'user data',
                eventAction: 'available',
                user: [{
                        profile: [{
                                profileInfo: usr
                            }]
                    }],
                timeStamp: new Date(),
                processed: {
                    adobeAnalytics: false
                }
            }
        };
        window.digitalData = window.digitalData || {};
        digitalData.event = digitalData.event || [];
        digitalData.event.push(ddUserAuthEvent);
        digitalData.user = digitalData.user || [{ profile: [{ profileInfo: {} }] }];
        digitalData.user[0].profile[0].profileInfo = usr;
        sendCustomEvent('ajaxAuthEvent');
    }
    function saveTokens() {
        if (keycloak.authenticated) {
            var tokens = { token: keycloak.token, refreshToken: keycloak.refreshToken };
            if (storageAvailable('localStorage')) {
                window.localStorage.token = JSON.stringify(tokens);
            }
            else {
                document.cookie = 'token=' + btoa(JSON.stringify(tokens));
            }
        }
        else {
            if (storageAvailable('localStorage')) {
                delete window.localStorage.token;
            }
            else {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            }
        }
    }
    function loadTokens() {
        if (storageAvailable('localStorage')) {
            if (window.localStorage.token) {
                return JSON.parse(window.localStorage.token);
            }
        }
        else {
            var name = 'token=';
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return JSON.parse(atob(c.substring(name.length, c.length)));
                }
            }
        }
    }
    function clearTokens() {
        keycloak.clearToken();
        if (storageAvailable('localStorage')) {
            window.localStorage.token = "";
        }
        else {
            document.cookie = 'token=' + btoa("");
        }
    }
    function checkIfProtectedPage() {
        if ($('.protected').length) {
            if (!keycloak.authenticated) {
                keycloak.login();
            }
        }
    }
    var keycloak = Keycloak({
        url: app.ssoConfig.auth_url,
        realm: 'rhd',
        clientId: 'web'
    });
    app.keycloak = keycloak;
    var tokens = loadTokens();
    var init = { onLoad: 'check-sso', checkLoginIframeInterval: 10 };
    if (tokens) {
        init.token = tokens.token;
        init.refreshToken = tokens.refreshToken;
    }
    keycloak.onAuthLogout = updateUser;
    keycloak.init(init).success(function (authenticated) {
        updateUser(authenticated);
        saveTokens();
        checkIfProtectedPage();
        if ($('.downloadthankyou').length && app.termsAndConditions) {
            app.termsAndConditions.download();
        }
    }).error(function () {
        updateUser();
    });
};
function storageAvailable(type) {
    try {
        var storage = window[type], x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return false;
    }
}
if (typeof Keycloak !== 'undefined') {
    app.sso();
}
app.dcp.getNameFromContributor = function (contributor) {
    return contributor.substring(0, contributor.lastIndexOf("<") - 1);
};
app.dcp.generateContributorSpan = function (tmpl, contributor) {
    var d = {};
    d.contributor = contributor;
    d.contributorName = app.dcp.getNameFromContributor(contributor);
    return tmpl.template(d);
};
app.dcp.authStatus = function () {
    return $.ajax({
        type: "GET",
        url: app.dcp.url.auth_status,
        xhrFields: { withCredentials: true }
    });
};
app.dcp.resolveContributors = function (sysContributors) {
    if (!sysContributors) {
        var sysContributors = [];
        $('[data-sys-contributor]').each(function (i, el) {
            var contributor = $(el).data('sys-contributor');
            if (contributor) {
                sysContributors.push(contributor);
            }
        });
        sysContributors = $.unique(sysContributors);
    }
    contributors = sysContributors.unique();
    app.dcp.currentRequest = $.ajax({
        url: app.dcp.url.search,
        data: {
            "sys_type": "contributor_profile",
            "field": ["sys_url_view", "sys_title", "sys_contributors", "accounts"],
            "contributor": contributors,
            "size": contributors.length
        },
        beforeSend: function () {
            if (app.dcp.currentRequest && app.dcp.currentRequest.readyState != 4) {
                app.dcp.currentRequest.abort();
            }
        }
    }).done(function (data) {
        var hits = data.hits.hits;
        for (var i = 0; i < hits.length; i++) {
            var accounts = {};
            if (hits[i].fields.accounts) {
                for (var j = 0; j < hits[i].fields.accounts.length; j++) {
                    accounts[hits[i].fields.accounts[j].domain] = hits[i].fields.accounts[j].username;
                }
            }
            $("span.contributor[data-sys-contributor='" + hits[i].fields.sys_contributors + "']").each(function () {
                var followable = false;
                $(this).find('a.name').each(function () {
                    $(this).html(hits[i].fields.sys_title).attr('href', hits[i].fields.sys_url_view);
                });
                $(this).find('a.rss').each(function () {
                    if (false) {
                        $(this).attr('href', '');
                        followable = true;
                    }
                    else {
                        $(this).hide();
                    }
                });
                $(this).find('a.facebook').each(function () {
                    if (accounts['facebook.com']) {
                        $(this).attr('href', 'http://www.facebook.com/' + accounts['facebook.com']);
                        followable = true;
                    }
                    else {
                        $(this).hide();
                    }
                });
                $(this).find('a.twitter').each(function () {
                    if (accounts['twitter.com']) {
                        $(this).attr('href', 'http://www.twitter.com/' + accounts['twitter.com']);
                        followable = true;
                    }
                    else {
                        $(this).hide();
                    }
                });
                $(this).find('a.linkedin').each(function () {
                    if (accounts['linkedin']) {
                        $(this).attr('href', 'http://www.linkedin.com/in/' + accounts['linkedin.com']);
                        followable = true;
                    }
                    else {
                        $(this).hide();
                    }
                });
                if (!followable) {
                    $(this).find('span.follow').hide();
                }
            });
        }
    });
};
app.buzz = {
    filter: function (tmpl, container, itemCount, append, from, dataIndex, callback) {
        itemCount = itemCount || 8;
        container.addClass('buzz-loading');
        var keyword = $('input[name="buzz-filter-text"]').val();
        var filters = {
            "keyword": keyword
        };
        var currentFilters = {};
        $.each(filters, function (key, val) {
            if (val && val.length) {
                currentFilters[key] = val;
            }
        });
        var query = [];
        window.dataLayer = window.dataLayer || [];
        if (currentFilters.keyword) {
            query.push(keyword);
            window.dataLayer.push({ 'keyword': keyword });
        }
        else {
            window.dataLayer.push({ 'keyword': null });
        }
        var tags = container.data('tags') || "";
        if (Array.isArray(tags)) {
            tags = tags.map(Function.prototype.call, String.prototype.trim);
        }
        try {
            if (typeof tags === "string") {
                tags = JSON.parse(tags.replace(/'/g, "\""));
            }
        }
        catch (e) {
            tags = "";
        }
        if (tags) {
            var tagsString = "";
            for (var i = 0; i < tags.length; i++) {
                if (i > 0) {
                    tagsString += " ";
                }
                tagsString += tags[i];
            }
            window.dataLayer.push({ 'tags': tags });
        }
        else {
            window.dataLayer.push({ 'tags': null });
        }
        window.dataLayer.push({ 'event': 'buzz-search' });
        $.ajax({
            url: app.dcp.url.search,
            dataType: 'json',
            data: {
                "field": ["sys_url_view", "sys_title", "sys_contributors", "sys_description", "sys_created", "author", "sys_tags", "sys_content_id"],
                "query": query,
                "tag": tags,
                "size": itemCount,
                "sys_type": "blogpost",
                "sortBy": "new-create",
                "from": dataIndex
            },
            beforeSend: function () {
                if (app.buzz.currentRequest && app.buzz.currentRequest.readyState != 4) {
                    app.buzz.currentRequest.abort();
                }
            },
            error: function () {
                $('.buzz-filters').html(app.dcp.error_message);
                $('.mini-buzz-container').html(app.dcp.error_message);
                $('.buzz-loading').removeClass('buzz-loading');
            }
        }).done(function (data) {
            $(function () {
                app.buzz.infiniteScrollCalled = false;
                app.buzz.noScroll = false;
                var hits = data.hits.hits;
                if (hits.length < 8) {
                    app.buzz.noScroll = true;
                }
                if (keyword && keyword.length) {
                    app.search.format(keyword, hits, $('.buzz-filters .searchResults'));
                }
                var html = "";
                for (var i = 0; i < hits.length; i++) {
                    var d = hits[i].fields;
                    var pat = /(?:([^"]+))? <?(.*?@[^>,]+)>?,? ?/g;
                    d.authorName = "";
                    d.authorMail = "";
                    while (m = pat.exec(d.sys_contributors)) {
                        d.authorName = m[1];
                        d.authorMail = m[2];
                    }
                    if (!d.authorName) {
                        d.authorName = d.author;
                    }
                    d.updatedDate = jQuery.timeago(new Date(d.sys_created));
                    d.sys_description = d.sys_description[0].substr(0, 197) + '...';
                    if (d.sys_url_view[0].startsWith('https://developers.redhat.com/blog/') || d.sys_url_view[0].startsWith('http://developers.redhat.com/blog/')) {
                        d.permanentLink = d.sys_url_view;
                    }
                    else if (d.sys_url_view[0].match(/http(s?):\/\/developerblog.redhat.com\/.*/g)) {
                        d.permanentLink = d.sys_url_view[0].replace(/http(s?):\/\/developerblog.redhat.com\//, 'https://developers.redhat.com/blog/');
                    }
                    else {
                        d.permanentLink = "//planet.jboss.org/post/" + d.sys_content_id;
                    }
                    html += tmpl.template(d);
                }
                if (!html) {
                    html = "Sorry, no results to display.";
                }
                if (append) {
                    container.append(html);
                }
                else {
                    container.html(html);
                }
                container.removeClass('buzz-loading');
            });
        });
    },
    init: function () {
        var $mbuzz = $('.mini-buzz-container');
        var dataIndex = 0;
        if ($mbuzz.length) {
            app.buzz.filter(app.templates.miniBuzzTemplate, $mbuzz);
        }
        var $buzz = $('.buzz-container, .product-buzz-container');
        if ($buzz.length) {
            app.buzz.filter(app.templates.buzzTemplate, $buzz, 8);
            app.buzz.infiniteScrollCalled = false;
            var currentPagination = 0;
            var buzzFlag = true;
            var win = $(window);
            var offset = 700;
            win.on('scroll', function () {
                var scrollBottom = win.scrollTop() + win.height();
                var scrollTop = win.scrollTop();
                var buzzBottom = $buzz.position().top + $buzz.height();
                if ((scrollBottom + offset > buzzBottom) && !app.buzz.infiniteScrollCalled && buzzFlag && !app.buzz.noScroll) {
                    buzzFlag = false;
                    window.setTimeout(function () { buzzFlag = true; }, 1000);
                    app.buzz.infiniteScrollCalled = true;
                    var from = $('.buzz-container > div').length;
                    dataIndex += 8;
                    app.buzz.filter(app.templates.buzzTemplate, $buzz, 8, true, from, dataIndex, function () {
                        if (win.scrollTop() < 400) {
                            win.scrollTop(scrollTop);
                        }
                    });
                }
            });
        }
        var $pbuzz = $('.product-buzz-container');
        if ($pbuzz.length) {
            app.buzz.filter(app.templates.productBuzzTemplate, $pbuzz);
        }
        var timeOut;
        var lastSearch = "";
        $('form.buzz-filters').on('keyup', 'input', function (e) {
            var el = $(this);
            var query = el.val();
            clearTimeout(timeOut);
            timeOut = setTimeout(function () {
                var $buzz = $('.buzz-container');
                if (lastSearch !== query) {
                    app.buzz.filter(app.templates.buzzTemplate, $buzz);
                    app.utils.updatePageHash(el);
                }
                lastSearch = query;
            }, 300);
        });
        $('form.buzz-filters').on('submit', function (e) {
            e.preventDefault();
        });
    }
};
app.buzz.init();
(function (deparam) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        var jquery = require('jquery');
        module.exports = deparam(jquery);
    }
    else if (typeof define === 'function' && define.amd) {
        define(['jquery'], function (jquery) {
            return deparam(jquery);
        });
    }
    else {
        var global = (false || eval)('this');
        global.deparam = deparam(jQuery);
    }
})(function ($) {
    return function (params, coerce) {
        var obj = {}, coerce_types = { 'true': !0, 'false': !1, 'null': null };
        $.each(params.replace(/\+/g, ' ').split('&'), function (j, v) {
            var param = v.split('='), key = decodeURIComponent(param[0]), val, cur = obj, i = 0, keys = key.split(']['), keys_last = keys.length - 1;
            if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
                keys[keys_last] = keys[keys_last].replace(/\]$/, '');
                keys = keys.shift().split('[').concat(keys);
                keys_last = keys.length - 1;
            }
            else {
                keys_last = 0;
            }
            if (param.length === 2) {
                val = decodeURIComponent(param[1]);
                if (coerce) {
                    val = val && !isNaN(val) ? +val
                        : val === 'undefined' ? undefined
                            : coerce_types[val] !== undefined ? coerce_types[val]
                                : val;
                }
                if (keys_last) {
                    for (; i <= keys_last; i++) {
                        key = keys[i] === '' ? cur.length : keys[i];
                        cur = cur[key] = i < keys_last
                            ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : [])
                            : val;
                    }
                }
                else {
                    if ($.isArray(obj[key])) {
                        obj[key].push(val);
                    }
                    else if (obj[key] !== undefined) {
                        obj[key] = [obj[key], val];
                    }
                    else {
                        obj[key] = val;
                    }
                }
            }
            else if (key) {
                obj[key] = coerce
                    ? undefined
                    : '';
            }
        });
        return obj;
    };
});
var dcp = angular.module('dcp', []);
dcp.config(['$provide', function ($provide) {
        $provide.decorator('$browser', function ($delegate) {
            var superUrl = $delegate.url;
            $delegate.url = function (url, replace) {
                if (url !== undefined) {
                    return superUrl(url.replace(/\%20/g, "+"), replace);
                }
                else {
                    return superUrl().replace(/\+/g, "%20");
                }
            };
            return $delegate;
        });
    }]);
dcp.factory('httpInterceptor', ['$q', '$injector', function ($q, $injector) {
        return {
            request: function (config) {
                if (config.method == 'GET' && config.url.indexOf(app.dcp.url.developer_materials) > -1) {
                    $injector.get('$rootScope').$broadcast('_START_REQUEST_');
                }
                return config;
            },
            requestError: function (rejection) {
                return $q.reject(rejection);
            },
            response: function (response) {
                if (response.config.method == 'GET' && response.config.url.indexOf(app.dcp.url.developer_materials) > -1) {
                    $injector.get('$rootScope').$broadcast('_END_REQUEST_');
                }
                return response;
            },
            responseError: function (rejection) {
                if (rejection.config.method == 'GET' && rejection.config.url.indexOf(app.dcp.url.developer_materials) > -1) {
                    $injector.get('$rootScope').$broadcast('_END_REQUEST_');
                }
                return $q.reject(rejection);
            }
        };
    }]);
dcp.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }]);
dcp.service('materialService', ['$http', '$q', function ($http, $q) {
        this.deferred_ = $q.defer();
        this.getMaterials = function (params) {
            var params = params || {};
            var query = {};
            query.newFirst = true;
            if (params.project === 'devstudio' && params.sys_type === 'quickstart') {
                params.project = '';
            }
            if (params.query) {
                query.query = params.query;
            }
            if (params.project) {
                query.project = params.project;
            }
            if (params.randomize) {
                query.randomize = params.randomize;
            }
            if (params.size) {
                query['size' + params.size] = true;
            }
            if (params.sys_type &&
                (($.isArray(params.sys_type) && params.sys_type.length > 0) ||
                    ($.trim(params.sys_type).length > 0))) {
                query.sys_type = params.sys_type;
            }
            if (!params.type) {
                query.type = ['jbossdeveloper_quickstart', 'jbossdeveloper_demo', 'jbossdeveloper_bom', 'jbossdeveloper_archetype', 'jbossdeveloper_example', 'jbossdeveloper_vimeo', 'jbossdeveloper_youtube', 'jbossdeveloper_book', 'rht_knowledgebase_article', 'rht_knowledgebase_solution', 'jbossorg_blog'];
            }
            if (params.publish_date_from) {
                query.publish_date_from = params.publish_date_from;
            }
            if (params.from) {
                query.from = params.from;
            }
            if (true) {
                this.deferred_.resolve(undefined);
            }
            this.deferred_ = $q.defer();
            var promise = this.deferred_.promise;
            var deferred = this.deferred_;
            $http.get(app.dcp.url.developer_materials, { params: query, timeout: promise })
                .success(function (data) {
                deferred.resolve(data);
            })
                .error(function () {
                $(".panel[ng-hide='data.materials.length']").replaceWith(app.dcp.error_message);
            });
            return promise;
        };
    }]);
dcp.factory('dataFlowService', ['$location', function ($location) {
        var service = function () {
            this.processParams = function (params) {
                var params_ = params || {};
                $location.path($.param(params_));
            };
        };
        return new service();
    }]);
dcp.factory('helper', function () {
    var Helper = function () {
        this.firstIfArray = function (input) {
            if ($.isArray(input) && input.length > 0) {
                return input[0];
            }
            return input;
        };
        this.parsePath = function (path) {
            var path_ = path || '';
            if (path_.indexOf('/') == 0) {
                path_ = path_.substr(1);
            }
            return deparam(path_);
        };
        this.safeParams = function (params) {
            var p = angular.isObject(params) ? params : {};
            var obj = {};
            angular.copy(p, obj);
            for (var key in obj) {
                if (!obj.hasOwnProperty(key))
                    continue;
                if (!this.isValidParam_(key)) {
                    delete obj[key];
                }
            }
            return obj;
        };
        this.VALID_URL_PARAMS_ = [
            "sys_type",
            "rating",
            "publish_date_from",
            "tag",
            "level",
            "from",
            "query",
            "project",
            "product",
            "size"
        ];
        this.isValidParam_ = function (key) {
            return this.VALID_URL_PARAMS_.indexOf(key) >= 0;
        };
        this.removeTagItems = function (input) {
            var indexes = [];
            if ($.isArray(input) && input.length > 0) {
                var excludes = app.dcp.excludeResourceTags;
                angular.forEach(input, function (str) {
                    var index = excludes.indexOf(str);
                    if (index == -1) {
                        indexes.push(str);
                    }
                });
            }
            return indexes.join(',');
        };
        this.availableFormats = [
            { value: "quickstart", "name": "Quickstart", "description": "Single use-case code examples tested with the latest stable product releases" },
            { value: "video", "name": "Video", "description": "Short tutorials and presentations for Red Hat JBoss Middleware products and upstream projects" },
            { value: "demo", "name": "Demo", "description": "Full applications that show what you can achieve with Red Hat JBoss Middleware" },
            { value: "jbossdeveloper_example", "name": "Tutorial", "description": "Guided content, teaching you how to build complex applications from the ground up" },
            { value: "jbossdeveloper_archetype", "name": "Archetype", "description": "Maven Archetypes for building Red Hat JBoss Middleware applications" },
            { value: "jbossdeveloper_bom", "name": "BOM", "description": "Maven BOMs for managing dependencies within Red Hat JBoss Middleware applications" },
            { value: "quickstart_early_access", "name": "Early Access", "description": "Single use-case code examples demonstrating features not yet available in a product release" },
            { value: "article", "name": "Articles (Premium)", "description": "Technical articles and best practices for Red Hat JBoss Middleware products" },
            { value: "solution", "name": "Solutions (Premium)", "description": "Answers to questions or issues you may be experiencing" }
        ];
    };
    return new Helper();
});
dcp.filter('thumbnailURL', function () {
    return function (item) {
        var thumbnails = app.dcp.thumbnails;
        if (item.fields.thumbnail && item.fields.thumbnail[0]) {
            return item.fields.thumbnail[0];
        }
        else if (item._type) {
            return thumbnails[item._type];
        }
        else {
            return thumbnails["rht_knowledgebase_article"];
        }
    };
});
dcp.filter('isPremium', ['helper', function (helper) {
        return function (url) {
            url = helper.firstIfArray(url);
            if (url) {
                return !!url.match("access.redhat.com");
            }
            else {
                return false;
            }
        };
    }]);
dcp.filter('brackets', ['helper', function (helper) {
        return function (num) {
            num = helper.firstIfArray(num);
            if (num > 0) {
                return "  (" + num + ")";
            }
        };
    }]);
dcp.filter('truncate', ['helper', function (helper) {
        return function (str) {
            str = helper.firstIfArray(str);
            str = $("<p>").html(str).text();
            if (str.length <= 150) {
                return str;
            }
            return str.slice(0, 150) + "…";
        };
    }]);
dcp.filter('HHMMSS', ['helper', function (helper) {
        return function (sec_string) {
            sec_string = helper.firstIfArray(sec_string);
            var sec_num = parseInt(sec_string, 10);
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var time = minutes + ':' + seconds;
            if (parseInt(hours) > 0) {
                time = hours + ':' + time;
            }
            return time;
        };
    }]);
dcp.filter('timeAgo', ['helper', function (helper) {
        return function (timestamp) {
            timestamp = helper.firstIfArray(timestamp);
            if (!timestamp)
                return;
            var date = new Date(timestamp);
            return $.timeago(date);
        };
    }]);
dcp.filter('firstIfArray', ['helper', function (helper) {
        return function (input) {
            return helper.firstIfArray(input);
        };
    }]);
dcp.filter('noURL', function () {
    return function (str) {
        var filterArray = [];
        angular.forEach(str, function (ref) {
            if (ref.fields.sys_url_view) {
                filterArray.push(ref);
            }
        });
        return filterArray;
    };
});
dcp.filter('removeExcludedTags', ['helper', function (helper) {
        return function (input) {
            return helper.removeTagItems(input);
        };
    }]);
dcp.filter('urlFix', ['helper', function (helper) {
        return function (str) {
            str = helper.firstIfArray(str);
            if (!str.length) {
                return;
            }
            else if (str.contains("access.redhat.com") || str.contains("hub-osdevelopers.rhcloud.com")) {
                return str;
            }
            else {
                return str.replace(/^http(s)?:\/\/(\w|\.|\-|:)*(\/pr\/\d+\/build\/\d+)?(\/docker-nightly)?/, app.baseUrl);
            }
        };
    }]);
dcp.filter('trim', ['helper', function (helper) {
        return function (str) {
            str = helper.firstIfArray(str);
            return str.trim();
        };
    }]);
dcp.filter('name', ['helper', function (helper) {
        return function (str) {
            str = helper.firstIfArray(str);
            str = str || "";
            var pieces = str.split('<');
            if (pieces.length) {
                return pieces[0].trim();
            }
        };
    }]);
dcp.filter('formatName', ['helper', function (helper) {
        return function (value, scope) {
            value = helper.firstIfArray(value);
            for (var f in scope.data.availableFormats) {
                var format = scope.data.availableFormats[f];
                if (format.value === value) {
                    return format.name;
                }
            }
            return value;
        };
    }]);
dcp.filter('safeNumber', ['helper', function (helper) {
        return function (input) {
            input = helper.firstIfArray(input);
            var n = parseInt(input, 10);
            return isNaN(n) ? 0 : n;
        };
    }]);
dcp.filter('checkInternal', ['helper', '$location', function (helper, $location) {
        return function (item) {
            if (!helper.firstIfArray(item.fields.sys_url_view)) {
                return true;
            }
            else if (!!helper.firstIfArray(item.fields.sys_url_view).match($location.host())) {
                return true;
            }
            return false;
        };
    }]);
dcp.controller('developerMaterialsController', ['$scope', 'materialService', '$rootScope', '$location', 'helper', 'dataFlowService',
    function ($scope, materialService, $rootScope, $location, helper, dataFlowService) {
        window.scope = $scope;
        $scope.params = {};
        $scope.Math = Math;
        $scope.data = {
            layout: 'list',
            dateNumber: 0
        };
        $scope.randomize = false;
        $scope.pagination = { size: 10 };
        $scope.filters = {};
        $scope.filter = {};
        var needsToBeUnregistered = $rootScope.$on('$locationChangeSuccess', function () {
            $scope.fetchAndUpdate();
        });
        $rootScope.$on('$destroy', needsToBeUnregistered);
        $scope.$on('_START_REQUEST_', function () {
            $scope.data.loading = true;
        });
        $scope.$on('_END_REQUEST_', function () {
            $scope.data.loading = false;
        });
        $scope.data.availableTopics = app.dcp.availableTopics;
        $scope.data.availableFormats = helper.availableFormats;
        $scope.fetchAndUpdate = function () {
            $scope.params = helper.safeParams(helper.parsePath($location.path()));
            $scope.params.size = $scope.pagination.size;
            $scope.params.project = $scope.filters.project;
            materialService.getMaterials($scope.params)
                .then(function (data) {
                if (data && data.hits && data.hits.hits) {
                    $scope.data.materials = data.hits.hits;
                    $scope.data.total = data.hits.total;
                    $scope.paginate($scope.paginate.currentPage || 1);
                }
                else {
                    $scope.data.materials = [];
                    $scope.data.total = 0;
                }
            })
                .then(function () {
                $scope.filters.query = $scope.params.query;
                $scope.filters.sys_type = $scope.params.sys_type;
            });
        };
        $scope.paginate = function (page) {
            $scope.pagination.size = ($scope.pagination.viewall ? 500 : $scope.pagination.size);
            $scope.pagination.size = parseInt($scope.pagination.size);
            var startAt = (page * $scope.pagination.size) - $scope.pagination.size;
            var endAt = page * $scope.pagination.size;
            var pages = Math.ceil($scope.data.total / $scope.pagination.size);
            if (page > pages || page < 1 || typeof page === "string") {
                return;
            }
            $scope.paginate.pages = pages;
            $scope.paginate.currentPage = page;
            $scope.data.displayedMaterials = $scope.data.materials;
            $scope.paginate.pagesArray = app.utils.diplayPagination($scope.paginate.currentPage, pages, 4);
        };
        $scope.filters.sys_tags = [];
        $scope.filters.sys_type = [];
        $scope.filter.toggleSelection = function toggleSelection(itemName, selectedArray) {
            if (!$scope.filters[selectedArray]) {
                $scope.filters[selectedArray] = [];
            }
            var idx = $scope.filters[selectedArray].indexOf(itemName);
            if (idx > -1) {
                $scope.filters[selectedArray].splice(idx, 1);
            }
            else {
                $scope.filters[selectedArray].push(itemName);
            }
        };
        $scope.filter.updateDate = function () {
            var n = parseInt($scope.data.dateNumber);
            var d = new Date();
            var labels = ["All", "Within 1 Year", "Within 30 days", "Within 7 days", "Within 24hrs"];
            $scope.data.displayDate = labels[n];
            switch (n) {
                case 0:
                    delete $scope.filters.publish_date_from;
                    break;
                case 1:
                    d.setFullYear(d.getFullYear() - 1);
                    break;
                case 2:
                    d.setDate(d.getDate() - 30);
                    break;
                case 3:
                    d.setDate(d.getDate() - 7);
                    break;
                case 4:
                    d.setDate(d.getDate() - 1);
                    break;
            }
            if (n) {
                $scope.filters.publish_date_from = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            }
        };
        $scope.filter.clear = function () {
            $scope.filters.sys_tags = [];
            $scope.filters.sys_type = [];
            $scope.data.dateNumber = 0;
            $scope.data.skillNumber = 0;
            delete $scope.filters.query;
            delete $scope.filters.sys_rating_avg;
            delete $scope.filters.level;
            delete $scope.filters.publish_date_from;
            delete localStorage[$scope.data.pageType + '-filters'];
            $(".chosen").trigger("chosen:updated");
        };
        $scope.firstPage = function () {
            $scope.paginate.currentPage = 1;
            $scope.processPagination_();
        };
        $scope.previousPage = function () {
            $scope.paginate.currentPage -= 1;
            $scope.processPagination_();
        };
        $scope.nextPage = function () {
            $scope.paginate.currentPage += 1;
            $scope.processPagination_();
        };
        $scope.lastPage = function () {
            $scope.paginate.currentPage = $scope.paginate.pages;
            $scope.processPagination_();
        };
        $scope.goToPage = function (page) {
            if (typeof page !== 'number') {
                return;
            }
            $scope.paginate.currentPage = page;
            $scope.processPagination_();
        };
        $scope.processPagination_ = function () {
            $scope.filters.from = ($scope.paginate.currentPage - 1) * $scope.pagination.size;
            $scope.filter.applyFilters();
        };
        $scope.filter.applyFilters = function () {
            $scope.data.displayedMaterials = [];
            $scope.filter.store();
            dataFlowService.processParams($scope.filters);
        };
        $scope.filter.store = function () {
            window.localStorage[$scope.data.pageType + '-filters'] = JSON.stringify(scope.filters);
            window.localStorage[$scope.data.pageType + '-filtersTimeStamp'] = new Date().getTime();
        };
        $scope.filter.restore = function () {
            $scope.data.skillNumber = 0;
            $scope.data.dateNumber = 0;
            if (!window.location.hash && (!window.localStorage || !window.localStorage[$scope.data.pageType + '-filters'])) {
                $scope.filter.applyFilters();
                return;
            }
            if ($location.path().length > 0) {
                var filters = deparam($location.path().slice(1));
                if (typeof filters.sys_type === "string") {
                    var filterArr = [];
                    filterArr.push(filters.sys_type);
                    filters.sys_type = filterArr;
                }
                $scope.filters = filters;
                if ($scope.filters.level) {
                    var labels = ["All", "Beginner", "Intermediate", "Advanced"];
                    var idx = labels.indexOf($scope.filters.level);
                    if (idx >= 0) {
                        $scope.data.skillNumber = idx;
                    }
                    $scope.filter.updateSkillLevel();
                }
                if ($scope.filters.publish_date_from) {
                    var parts = scope.filters.publish_date_from.split('-');
                    var d = new Date(parts[0], parts[1], parts[2]);
                    var now = new Date().getTime();
                    var ago = now - d;
                    var daysAgo = Math.floor(ago / 1000 / 60 / 60 / 24);
                    if (daysAgo <= 1) {
                        $scope.data.dateNumber = 4;
                    }
                    else if (daysAgo > 1 && daysAgo <= 7) {
                        $scope.data.dateNumber = 3;
                    }
                    else if (daysAgo > 7 && daysAgo <= 30) {
                        $scope.data.dateNumber = 2;
                    }
                    else {
                        $scope.data.dateNumber = 1;
                    }
                    $scope.filter.updateDate();
                }
            }
            else if (window.localStorage && window.localStorage[$scope.data.pageType + '-filters']) {
                var now = new Date().getTime();
                var then = window.localStorage[$scope.data.pageType + '-filtersTimeStamp'] || 0;
                if ((now - then) < 7200000) {
                    $scope.filters = JSON.parse(window.localStorage[$scope.data.pageType + '-filters']);
                }
            }
            $scope.filter.applyFilters();
            $scope.fetchAndUpdate();
        };
        $scope.chosen = function () {
            $('select.chosen').unbind().chosen().change(function () {
                var tags = $(this).val();
                if (tags) {
                    $scope.filters.sys_tags = tags;
                }
                else {
                    delete $scope.filters.sys_tags;
                }
                $scope.$apply();
                $scope.filter.applyFilters();
            }).trigger('chosen:updated');
        };
        $scope.$watch('data.availableTopics', function () {
            window.setTimeout(function () {
                $scope.chosen();
            }, 0);
        });
        $scope.$watch('data.layout', function (newVal, oldVal) {
            if ($scope.data.layout) {
                window.localStorage.layout = $scope.data.layout;
            }
        });
    }]);
$(function () {
    $('form.dev-mat-filters').on('submit', function (e) {
        e.preventDefault();
    });
    $('.filters-clear').on('click', function (e) {
        e.preventDefault();
        app.dm.clearFilters($(this));
    });
    $('.filter-block h5').on('click', function () {
        if (window.innerWidth <= 768) {
            var el = $(this);
            el.toggleClass('filter-block-open');
            el.next('.filter-block-inputs').slideToggle(300);
        }
    });
    $('.filter-toggle').on('click', function () {
        if (window.innerWidth <= 768) {
            $('.developer-materials-sidebar').toggleClass('open');
        }
    });
});
!function () { var a, AbstractChosen, Chosen, SelectParser, b, c = {}.hasOwnProperty, d = function (a, b) { function d() { this.constructor = a; } for (var e in b)
    c.call(b, e) && (a[e] = b[e]); return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a; }; SelectParser = function () { function SelectParser() { this.options_index = 0, this.parsed = []; } return SelectParser.prototype.add_node = function (a) { return "OPTGROUP" === a.nodeName.toUpperCase() ? this.add_group(a) : this.add_option(a); }, SelectParser.prototype.add_group = function (a) { var b, c, d, e, f, g; for (b = this.parsed.length, this.parsed.push({ array_index: b, group: !0, label: this.escapeExpression(a.label), children: 0, disabled: a.disabled }), f = a.childNodes, g = [], d = 0, e = f.length; e > d; d++)
    c = f[d], g.push(this.add_option(c, b, a.disabled)); return g; }, SelectParser.prototype.add_option = function (a, b, c) { return "OPTION" === a.nodeName.toUpperCase() ? ("" !== a.text ? (null != b && (this.parsed[b].children += 1), this.parsed.push({ array_index: this.parsed.length, options_index: this.options_index, value: a.value, text: a.text, html: a.innerHTML, selected: a.selected, disabled: c === !0 ? c : a.disabled, group_array_index: b, classes: a.className, style: a.style.cssText })) : this.parsed.push({ array_index: this.parsed.length, options_index: this.options_index, empty: !0 }), this.options_index += 1) : void 0; }, SelectParser.prototype.escapeExpression = function (a) { var b, c; return null == a || a === !1 ? "" : /[\&\<\>\"\'\`]/.test(a) ? (b = { "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" }, c = /&(?!\w+;)|[\<\>\"\'\`]/g, a.replace(c, function (a) { return b[a] || "&amp;"; })) : a; }, SelectParser; }(), SelectParser.select_to_array = function (a) { var b, c, d, e, f; for (c = new SelectParser, f = a.childNodes, d = 0, e = f.length; e > d; d++)
    b = f[d], c.add_node(b); return c.parsed; }, AbstractChosen = function () { function AbstractChosen(a, b) { this.form_field = a, this.options = null != b ? b : {}, AbstractChosen.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers()); } return AbstractChosen.prototype.set_default_values = function () { var a = this; return this.click_test_action = function (b) { return a.test_active_click(b); }, this.activate_action = function (b) { return a.activate_field(b); }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text ? this.options.allow_single_deselect : !1, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null != this.options.enable_split_word_search ? this.options.enable_split_word_search : !0, this.group_search = null != this.options.group_search ? this.options.group_search : !0, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null != this.options.single_backstroke_delete ? this.options.single_backstroke_delete : !0, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null != this.options.display_selected_options ? this.options.display_selected_options : !0, this.display_disabled_options = null != this.options.display_disabled_options ? this.options.display_disabled_options : !0; }, AbstractChosen.prototype.set_default_text = function () { return this.default_text = this.form_field.getAttribute("data-placeholder") ? this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text : this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text, this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || AbstractChosen.default_no_result_text; }, AbstractChosen.prototype.mouse_enter = function () { return this.mouse_on_container = !0; }, AbstractChosen.prototype.mouse_leave = function () { return this.mouse_on_container = !1; }, AbstractChosen.prototype.input_focus = function () { var a = this; if (this.is_multiple) {
    if (!this.active_field)
        return setTimeout(function () { return a.container_mousedown(); }, 50);
}
else if (!this.active_field)
    return this.activate_field(); }, AbstractChosen.prototype.input_blur = function () { var a = this; return this.mouse_on_container ? void 0 : (this.active_field = !1, setTimeout(function () { return a.blur_test(); }, 100)); }, AbstractChosen.prototype.results_option_build = function (a) { var b, c, d, e, f; for (b = "", f = this.results_data, d = 0, e = f.length; e > d; d++)
    c = f[d], b += c.group ? this.result_add_group(c) : this.result_add_option(c), (null != a ? a.first : void 0) && (c.selected && this.is_multiple ? this.choice_build(c) : c.selected && !this.is_multiple && this.single_set_selected_text(c.text)); return b; }, AbstractChosen.prototype.result_add_option = function (a) { var b, c; return a.search_match ? this.include_option_in_results(a) ? (b = [], a.disabled || a.selected && this.is_multiple || b.push("active-result"), !a.disabled || a.selected && this.is_multiple || b.push("disabled-result"), a.selected && b.push("result-selected"), null != a.group_array_index && b.push("group-option"), "" !== a.classes && b.push(a.classes), c = document.createElement("li"), c.className = b.join(" "), c.style.cssText = a.style, c.setAttribute("data-option-array-index", a.array_index), c.innerHTML = a.search_text, this.outerHTML(c)) : "" : ""; }, AbstractChosen.prototype.result_add_group = function (a) { var b; return a.search_match || a.group_match ? a.active_options > 0 ? (b = document.createElement("li"), b.className = "group-result", b.innerHTML = a.search_text, this.outerHTML(b)) : "" : ""; }, AbstractChosen.prototype.results_update_field = function () { return this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.results_build(), this.results_showing ? this.winnow_results() : void 0; }, AbstractChosen.prototype.reset_single_select_options = function () { var a, b, c, d, e; for (d = this.results_data, e = [], b = 0, c = d.length; c > b; b++)
    a = d[b], a.selected ? e.push(a.selected = !1) : e.push(void 0); return e; }, AbstractChosen.prototype.results_toggle = function () { return this.results_showing ? this.results_hide() : this.results_show(); }, AbstractChosen.prototype.results_search = function () { return this.results_showing ? this.winnow_results() : this.results_show(); }, AbstractChosen.prototype.winnow_results = function () { var a, b, c, d, e, f, g, h, i, j, k, l, m; for (this.no_results_clear(), e = 0, g = this.get_search_text(), a = g.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), d = this.search_contains ? "" : "^", c = new RegExp(d + a, "i"), j = new RegExp(a, "i"), m = this.results_data, k = 0, l = m.length; l > k; k++)
    b = m[k], b.search_match = !1, f = null, this.include_option_in_results(b) && (b.group && (b.group_match = !1, b.active_options = 0), null != b.group_array_index && this.results_data[b.group_array_index] && (f = this.results_data[b.group_array_index], 0 === f.active_options && f.search_match && (e += 1), f.active_options += 1), (!b.group || this.group_search) && (b.search_text = b.group ? b.label : b.html, b.search_match = this.search_string_match(b.search_text, c), b.search_match && !b.group && (e += 1), b.search_match ? (g.length && (h = b.search_text.search(j), i = b.search_text.substr(0, h + g.length) + "</em>" + b.search_text.substr(h + g.length), b.search_text = i.substr(0, h) + "<em>" + i.substr(h)), null != f && (f.group_match = !0)) : null != b.group_array_index && this.results_data[b.group_array_index].search_match && (b.search_match = !0))); return this.result_clear_highlight(), 1 > e && g.length ? (this.update_results_content(""), this.no_results(g)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight()); }, AbstractChosen.prototype.search_string_match = function (a, b) { var c, d, e, f; if (b.test(a))
    return !0; if (this.enable_split_word_search && (a.indexOf(" ") >= 0 || 0 === a.indexOf("[")) && (d = a.replace(/\[|\]/g, "").split(" "), d.length))
    for (e = 0, f = d.length; f > e; e++)
        if (c = d[e], b.test(c))
            return !0; }, AbstractChosen.prototype.choices_count = function () { var a, b, c, d; if (null != this.selected_option_count)
    return this.selected_option_count; for (this.selected_option_count = 0, d = this.form_field.options, b = 0, c = d.length; c > b; b++)
    a = d[b], a.selected && (this.selected_option_count += 1); return this.selected_option_count; }, AbstractChosen.prototype.choices_click = function (a) { return a.preventDefault(), this.results_showing || this.is_disabled ? void 0 : this.results_show(); }, AbstractChosen.prototype.keyup_checker = function (a) { var b, c; switch (b = null != (c = a.which) ? c : a.keyCode, this.search_field_scale(), b) {
    case 8:
        if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0)
            return this.keydown_backstroke();
        if (!this.pending_backstroke)
            return this.result_clear_highlight(), this.results_search();
        break;
    case 13:
        if (a.preventDefault(), this.results_showing)
            return this.result_select(a);
        break;
    case 27: return this.results_showing && this.results_hide(), !0;
    case 9:
    case 38:
    case 40:
    case 16:
    case 91:
    case 17: break;
    default: return this.results_search();
} }, AbstractChosen.prototype.clipboard_event_checker = function () { var a = this; return setTimeout(function () { return a.results_search(); }, 50); }, AbstractChosen.prototype.container_width = function () { return null != this.options.width ? this.options.width : "" + this.form_field.offsetWidth + "px"; }, AbstractChosen.prototype.include_option_in_results = function (a) { return this.is_multiple && !this.display_selected_options && a.selected ? !1 : !this.display_disabled_options && a.disabled ? !1 : a.empty ? !1 : !0; }, AbstractChosen.prototype.search_results_touchstart = function (a) { return this.touch_started = !0, this.search_results_mouseover(a); }, AbstractChosen.prototype.search_results_touchmove = function (a) { return this.touch_started = !1, this.search_results_mouseout(a); }, AbstractChosen.prototype.search_results_touchend = function (a) { return this.touch_started ? this.search_results_mouseup(a) : void 0; }, AbstractChosen.prototype.outerHTML = function (a) { var b; return a.outerHTML ? a.outerHTML : (b = document.createElement("div"), b.appendChild(a), b.innerHTML); }, AbstractChosen.browser_is_supported = function () { return "Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : /iP(od|hone)/i.test(window.navigator.userAgent) ? !1 : /Android/i.test(window.navigator.userAgent) && /Mobile/i.test(window.navigator.userAgent) ? !1 : !0; }, AbstractChosen.default_multiple_text = "Select Some Options", AbstractChosen.default_single_text = "Select an Option", AbstractChosen.default_no_result_text = "No results match", AbstractChosen; }(), a = jQuery, a.fn.extend({ chosen: function (b) { return AbstractChosen.browser_is_supported() ? this.each(function () { var c, d; c = a(this), d = c.data("chosen"), "destroy" === b && d ? d.destroy() : d || c.data("chosen", new Chosen(this, b)); }) : this; } }), Chosen = function (c) { function Chosen() { return b = Chosen.__super__.constructor.apply(this, arguments); } return d(Chosen, c), Chosen.prototype.setup = function () { return this.form_field_jq = a(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex, this.is_rtl = this.form_field_jq.hasClass("chosen-rtl"); }, Chosen.prototype.set_up_html = function () { var b, c; return b = ["chosen-container"], b.push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && b.push(this.form_field.className), this.is_rtl && b.push("chosen-rtl"), c = { "class": b.join(" "), style: "width: " + this.container_width() + ";", title: this.form_field.title }, this.form_field.id.length && (c.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = a("<div />", c), this.is_multiple ? this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>') : this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior(), this.form_field_jq.trigger("chosen:ready", { chosen: this }); }, Chosen.prototype.register_observers = function () { var a = this; return this.container.bind("mousedown.chosen", function (b) { a.container_mousedown(b); }), this.container.bind("mouseup.chosen", function (b) { a.container_mouseup(b); }), this.container.bind("mouseenter.chosen", function (b) { a.mouse_enter(b); }), this.container.bind("mouseleave.chosen", function (b) { a.mouse_leave(b); }), this.search_results.bind("mouseup.chosen", function (b) { a.search_results_mouseup(b); }), this.search_results.bind("mouseover.chosen", function (b) { a.search_results_mouseover(b); }), this.search_results.bind("mouseout.chosen", function (b) { a.search_results_mouseout(b); }), this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function (b) { a.search_results_mousewheel(b); }), this.search_results.bind("touchstart.chosen", function (b) { a.search_results_touchstart(b); }), this.search_results.bind("touchmove.chosen", function (b) { a.search_results_touchmove(b); }), this.search_results.bind("touchend.chosen", function (b) { a.search_results_touchend(b); }), this.form_field_jq.bind("chosen:updated.chosen", function (b) { a.results_update_field(b); }), this.form_field_jq.bind("chosen:activate.chosen", function (b) { a.activate_field(b); }), this.form_field_jq.bind("chosen:open.chosen", function (b) { a.container_mousedown(b); }), this.form_field_jq.bind("chosen:close.chosen", function (b) { a.input_blur(b); }), this.search_field.bind("blur.chosen", function (b) { a.input_blur(b); }), this.search_field.bind("keyup.chosen", function (b) { a.keyup_checker(b); }), this.search_field.bind("keydown.chosen", function (b) { a.keydown_checker(b); }), this.search_field.bind("focus.chosen", function (b) { a.input_focus(b); }), this.search_field.bind("cut.chosen", function (b) { a.clipboard_event_checker(b); }), this.search_field.bind("paste.chosen", function (b) { a.clipboard_event_checker(b); }), this.is_multiple ? this.search_choices.bind("click.chosen", function (b) { a.choices_click(b); }) : this.container.bind("click.chosen", function (a) { a.preventDefault(); }); }, Chosen.prototype.destroy = function () { return a(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show(); }, Chosen.prototype.search_field_disabled = function () { return this.is_disabled = this.form_field_jq[0].disabled, this.is_disabled ? (this.container.addClass("chosen-disabled"), this.search_field[0].disabled = !0, this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_action), this.close_field()) : (this.container.removeClass("chosen-disabled"), this.search_field[0].disabled = !1, this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_action)); }, Chosen.prototype.container_mousedown = function (b) { return this.is_disabled || (b && "mousedown" === b.type && !this.results_showing && b.preventDefault(), null != b && a(b.target).hasClass("search-choice-close")) ? void 0 : (this.active_field ? this.is_multiple || !b || a(b.target)[0] !== this.selected_item[0] && !a(b.target).parents("a.chosen-single").length || (b.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), a(this.container[0].ownerDocument).bind("click.chosen", this.click_test_action), this.results_show()), this.activate_field()); }, Chosen.prototype.container_mouseup = function (a) { return "ABBR" !== a.target.nodeName || this.is_disabled ? void 0 : this.results_reset(a); }, Chosen.prototype.search_results_mousewheel = function (a) { var b; return a.originalEvent && (b = -a.originalEvent.wheelDelta || a.originalEvent.detail), null != b ? (a.preventDefault(), "DOMMouseScroll" === a.type && (b = 40 * b), this.search_results.scrollTop(b + this.search_results.scrollTop())) : void 0; }, Chosen.prototype.blur_test = function () { return !this.active_field && this.container.hasClass("chosen-container-active") ? this.close_field() : void 0; }, Chosen.prototype.close_field = function () { return a(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale(); }, Chosen.prototype.activate_field = function () { return this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus(); }, Chosen.prototype.test_active_click = function (b) { var c; return c = a(b.target).closest(".chosen-container"), c.length && this.container[0] === c[0] ? this.active_field = !0 : this.close_field(); }, Chosen.prototype.results_build = function () { return this.parsing = !0, this.selected_option_count = null, this.results_data = SelectParser.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({ first: !0 })), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1; }, Chosen.prototype.result_do_highlight = function (a) { var b, c, d, e, f; if (a.length) {
    if (this.result_clear_highlight(), this.result_highlight = a, this.result_highlight.addClass("highlighted"), d = parseInt(this.search_results.css("maxHeight"), 10), f = this.search_results.scrollTop(), e = d + f, c = this.result_highlight.position().top + this.search_results.scrollTop(), b = c + this.result_highlight.outerHeight(), b >= e)
        return this.search_results.scrollTop(b - d > 0 ? b - d : 0);
    if (f > c)
        return this.search_results.scrollTop(c);
} }, Chosen.prototype.result_clear_highlight = function () { return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null; }, Chosen.prototype.results_show = function () { return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", { chosen: this }), !1) : (this.container.addClass("chosen-with-drop"), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.search_field.val()), this.winnow_results(), this.form_field_jq.trigger("chosen:showing_dropdown", { chosen: this })); }, Chosen.prototype.update_results_content = function (a) { return this.search_results.html(a); }, Chosen.prototype.results_hide = function () { return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", { chosen: this })), this.results_showing = !1; }, Chosen.prototype.set_tab_index = function () { var a; return this.form_field.tabIndex ? (a = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = a) : void 0; }, Chosen.prototype.set_label_behavior = function () { var b = this; return this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = a("label[for='" + this.form_field.id + "']")), this.form_field_label.length > 0 ? this.form_field_label.bind("click.chosen", function (a) { return b.is_multiple ? b.container_mousedown(a) : b.activate_field(); }) : void 0; }, Chosen.prototype.show_search_field_default = function () { return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default")); }, Chosen.prototype.search_results_mouseup = function (b) { var c; return c = a(b.target).hasClass("active-result") ? a(b.target) : a(b.target).parents(".active-result").first(), c.length ? (this.result_highlight = c, this.result_select(b), this.search_field.focus()) : void 0; }, Chosen.prototype.search_results_mouseover = function (b) { var c; return c = a(b.target).hasClass("active-result") ? a(b.target) : a(b.target).parents(".active-result").first(), c ? this.result_do_highlight(c) : void 0; }, Chosen.prototype.search_results_mouseout = function (b) { return a(b.target).hasClass("active-result") ? this.result_clear_highlight() : void 0; }, Chosen.prototype.choice_build = function (b) { var c, d, e = this; return c = a("<li />", { "class": "search-choice" }).html("<span>" + b.html + "</span>"), b.disabled ? c.addClass("search-choice-disabled") : (d = a("<a />", { "class": "search-choice-close", "data-option-array-index": b.array_index }), d.bind("click.chosen", function (a) { return e.choice_destroy_link_click(a); }), c.append(d)), this.search_container.before(c); }, Chosen.prototype.choice_destroy_link_click = function (b) { return b.preventDefault(), b.stopPropagation(), this.is_disabled ? void 0 : this.choice_destroy(a(b.target)); }, Chosen.prototype.choice_destroy = function (a) { return this.result_deselect(a[0].getAttribute("data-option-array-index")) ? (this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1 && this.results_hide(), a.parents("li").first().remove(), this.search_field_scale()) : void 0; }, Chosen.prototype.results_reset = function () { return this.reset_single_select_options(), this.form_field.options[0].selected = !0, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.form_field_jq.trigger("change"), this.active_field ? this.results_hide() : void 0; }, Chosen.prototype.results_reset_cleanup = function () { return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove(); }, Chosen.prototype.result_select = function (a) { var b, c; return this.result_highlight ? (b = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", { chosen: this }), !1) : (this.is_multiple ? b.removeClass("active-result") : this.reset_single_select_options(), c = this.results_data[b[0].getAttribute("data-option-array-index")], c.selected = !0, this.form_field.options[c.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(c) : this.single_set_selected_text(c.text), (a.metaKey || a.ctrlKey) && this.is_multiple || this.results_hide(), this.search_field.val(""), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.form_field_jq.trigger("change", { selected: this.form_field.options[c.options_index].value }), this.current_selectedIndex = this.form_field.selectedIndex, this.search_field_scale())) : void 0; }, Chosen.prototype.single_set_selected_text = function (a) { return null == a && (a = this.default_text), a === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").text(a); }, Chosen.prototype.result_deselect = function (a) { var b; return b = this.results_data[a], this.form_field.options[b.options_index].disabled ? !1 : (b.selected = !1, this.form_field.options[b.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.form_field_jq.trigger("change", { deselected: this.form_field.options[b.options_index].value }), this.search_field_scale(), !0); }, Chosen.prototype.single_deselect_control_build = function () { return this.allow_single_deselect ? (this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")) : void 0; }, Chosen.prototype.get_search_text = function () { return this.search_field.val() === this.default_text ? "" : a("<div/>").text(a.trim(this.search_field.val())).html(); }, Chosen.prototype.winnow_results_set_highlight = function () { var a, b; return b = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), a = b.length ? b.first() : this.search_results.find(".active-result").first(), null != a ? this.result_do_highlight(a) : void 0; }, Chosen.prototype.no_results = function (b) { var c; return c = a('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'), c.find("span").first().html(b), this.search_results.append(c), this.form_field_jq.trigger("chosen:no_results", { chosen: this }); }, Chosen.prototype.no_results_clear = function () { return this.search_results.find(".no-results").remove(); }, Chosen.prototype.keydown_arrow = function () { var a; return this.results_showing && this.result_highlight ? (a = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(a) : void 0 : this.results_show(); }, Chosen.prototype.keyup_arrow = function () { var a; return this.results_showing || this.is_multiple ? this.result_highlight ? (a = this.result_highlight.prevAll("li.active-result"), a.length ? this.result_do_highlight(a.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight())) : void 0 : this.results_show(); }, Chosen.prototype.keydown_backstroke = function () { var a; return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (a = this.search_container.siblings("li.search-choice").last(), a.length && !a.hasClass("search-choice-disabled") ? (this.pending_backstroke = a, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0); }, Chosen.prototype.clear_backstroke = function () { return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null; }, Chosen.prototype.keydown_checker = function (a) { var b, c; switch (b = null != (c = a.which) ? c : a.keyCode, this.search_field_scale(), 8 !== b && this.pending_backstroke && this.clear_backstroke(), b) {
    case 8:
        this.backstroke_length = this.search_field.val().length;
        break;
    case 9:
        this.results_showing && !this.is_multiple && this.result_select(a), this.mouse_on_container = !1;
        break;
    case 13:
        a.preventDefault();
        break;
    case 38:
        a.preventDefault(), this.keyup_arrow();
        break;
    case 40: a.preventDefault(), this.keydown_arrow();
} }, Chosen.prototype.search_field_scale = function () { var b, c, d, e, f, g, h, i, j; if (this.is_multiple) {
    for (d = 0, h = 0, f = "position:absolute; left: -1000px; top: -1000px; display:none;", g = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"], i = 0, j = g.length; j > i; i++)
        e = g[i], f += e + ":" + this.search_field.css(e) + ";";
    return b = a("<div />", { style: f }), b.text(this.search_field.val()), a("body").append(b), h = b.width() + 25, b.remove(), c = this.container.outerWidth(), h > c - 10 && (h = c - 10), this.search_field.css({ width: h + "px" });
} }, Chosen; }(AbstractChosen); }.call(this);
$(function () {
    $('ul.results, ul.featured-projects-results').on('click', '.upstream-toggle-more', function (e) {
        e.preventDefault();
        var el = $(this);
        el.toggleClass('upstream-toggle-open');
        el.prev('.upstream-more-content').slideToggle();
    });
    $('ul.results, ul.featured-projects-results').on('click', 'li.upstream a.solution-overlay-learn', function (e) {
        e.preventDefault();
        var html = $(this).parents('li').find('.project-content').html();
        app.overlay.open(html);
    });
});
app.books = {
    supportsLocalStorage: function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        }
        catch (e) {
            return false;
        }
    },
    restoreFilter: function (hashParams) {
        if (!this.supportsLocalStorage()) {
            return;
        }
        var filterKeys = [
            "keyword",
        ];
        var hashParams = hashParams || app.utils.getParametersFromHash();
        $.each(filterKeys, function (idx, key) {
            if ($.isEmptyObject(hashParams)) {
                var formValue = window.localStorage.getItem("booksFilter." + key);
            }
            else {
                var formValue = hashParams[key];
            }
            if (formValue === 'undefined') {
                formValue = '';
            }
            if (formValue) {
                switch (key) {
                    case "keyword":
                        $('input[name="filter-text"]').val(formValue).trigger('change');
                        break;
                }
            }
        });
    },
    performFilter: function () {
        var bookTemplate = app.templates.bookTemplate;
        var contributorTemplate = "<span class=\"contributor\" data-sys-contributor=\"<!=author!>\">" +
            "<a class=\"name link-sm\"><!=normalizedAuthor!></a>" +
            "</span>";
        $('ul.book-list').empty();
        filters = typeof filters !== 'undefined' ? filters : {};
        if (!maxResults) {
            var maxResults = 500;
        }
        var keyword = $('input[name="filter-text"]').val();
        $.extend(filters, {
            "keyword": keyword,
        });
        var formValues = {
            "keyword": keyword,
        };
        if (this.supportsLocalStorage()) {
            $.each(formValues, function (key, val) {
                window.localStorage.setItem("booksFilter." + key, val);
            });
        }
        var currentFilters = {};
        $.each(filters, function (key, val) {
            if (val.length) {
                currentFilters[key] = val;
            }
        });
        var query = [];
        if (currentFilters['keyword']) {
            query.push(keyword);
        }
        $("ul.book-list").addClass('loading');
        var data = {
            "field": ["preview_link", "thumbnail", "sys_title", "sys_contributor", "average_rating", "sys_created", "sys_description", "sys_url_view", "isbn", "authors"],
            "query": query,
            "size": maxResults,
            "sys_type": "book",
            "sortBy": "new-create"
        };
        app.books.currentRequest = $.ajax({
            dataType: 'json',
            url: app.dcp.url.search,
            data: data,
            beforeSend: function () {
                if (app.books.currentRequest && app.books.currentRequest.readyState != 4) {
                    app.books.currentRequest.abort();
                }
            },
            error: function () {
                $("ul.book-list").html(app.dcp.error_message);
            }
        }).done(function (data) {
            var results = data.hits.hits;
            for (var k = 0; k < results.length; k++) {
                var book = results[k].fields;
                var authors = "";
                if (!book.sys_url_view) {
                    book.sys_url_view = "";
                }
                if (book.sys_contributor) {
                    if (book.sys_contributor.length == 1) {
                        authors += "Author: ";
                    }
                    else {
                        authors += "Authors: ";
                    }
                    for (var i = 0; i < book.sys_contributor.length; i++) {
                        authors += contributorTemplate.template({ "author": book.sys_contributor[i], "normalizedAuthor": app.dcp.getNameFromContributor(book.sys_contributor[i]) });
                        if (i < (book.sys_contributor.length - 1)) {
                            authors += ", ";
                        }
                    }
                }
                else if (book.authors) {
                    var str = "";
                    if (book.authors.length == 1) {
                        authors += "Author: ";
                    }
                    else {
                        authors += "Authors: ";
                    }
                    for (var i = 0; i < book.authors.length; i++) {
                        authors += book.authors[i];
                        if (i < (book.authors.length - 1)) {
                            authors += ", ";
                        }
                    }
                }
                book.authors = authors;
                book.average_rating = roundHalf(book.average_rating) || "";
                book.sys_description = book.sys_description || "";
                if (book.sys_created) {
                    var published = new Date(book.sys_created);
                    var now = new Date();
                    var oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
                    if (published > oneYearAgo) {
                        book.published = "Published: " + jQuery.timeago(published);
                    }
                    else {
                        book.published = "Published: " + published.getFullYear() + "-" + published.getMonth() + "-" + published.getDate();
                    }
                }
                else {
                    book.published = "";
                }
                $('ul.book-list').append(bookTemplate.template(book));
            }
            $("ul.book-list").removeClass('loading');
        });
    }
};
(function () {
    var timeOut;
    $('form.books-filters').on('change keyup', 'input, select', function (e) {
        var keys = [37, 38, 39, 40, 9, 91, 92, 18, 17, 16];
        if (e.type === "keyup" && ($(this).attr('name') !== 'filter-text' || keys.indexOf(e.keyCode) !== -1)) {
            return;
        }
        clearTimeout(timeOut);
        timeOut = setTimeout(function () {
            app.books.performFilter();
        }, 300);
    });
    $('form.books-filters').on('submit', function (e) {
        e.preventDefault();
    });
    if ($('[data-set]').length) {
        app.utils.parseDataAttributes();
    }
    else if (window.location.search && !!window.location.search.match(/_escaped_fragment/)) {
        var hashParams = app.utils.getParametersFromHash();
        app.utils.restoreFromHash();
        app.books.restoreFilter(hashParams);
    }
    else if (window.location.hash) {
        app.utils.restoreFromHash();
        app.books.restoreFilter();
    }
    else if ($('form.books-filters').length) {
        app.books.restoreFilter();
    }
})();
app.rating = {
    displayYour: function () {
        var num = Math.round(app.rating.your * 2) / 2;
        $('#your-rating').children('i[data-rating]').each(function () {
            var r = $(this).data('rating');
            if (num >= r) {
                $(this).addClass('fa-star');
                $(this).removeClass('fa-star-o');
            }
        });
        $('#your-rating').show();
    },
    initYour: function () {
        app.dcp.authStatus().done(function (data) {
            if (data.authenticated) {
                var user_rating = $.ajax({
                    type: 'GET',
                    url: app.dcp.url.rating + '?id=' + app.rating.searchiskoId,
                    xhrFields: { withCredentials: true }
                }).done(function (data) {
                    if (data[app.rating.searchiskoId] && data[app.rating.searchiskoId].rating) {
                        app.rating.your = data[app.rating.searchiskoId].rating;
                    }
                    else {
                        app.rating.your = 0;
                    }
                    app.rating.displayYour();
                });
            }
        });
    },
    displayAvg: function (rating_avg, rating_count) {
        var elm = $('#avg-rating');
        elm.html(roundHalf(rating_avg)).append('<span>(' + rating_count + ')</span>');
        elm.show();
    },
    initAvg: function () {
        if ($('#rating-section').length) {
            $.get(app.dcp.url.content + '/' + app.rating.searchiskoId.split('-').join('/'))
                .done(function (item) {
                if (item.sys_rating_avg) {
                    app.rating.displayAvg(item.sys_rating_avg, item.sys_rating_num);
                }
            });
        }
    },
    update: function (rating) {
        app.dm.authStatus().done(function (data) {
            if (data.authenticated) {
                app.rating.your = rating;
                var post = $.ajax({
                    type: "POST",
                    url: app.dcp.url.rating + '/' + app.rating.searchiskoId,
                    xhrFields: { withCredentials: true },
                    contentType: "application/json",
                    data: "{\"rating\":\"" + app.rating.your + "\"}"
                });
                post.done(function (ratingData) {
                    app.rating.displayAvg(ratingData.sys_rating_avg, ratingData.sys_rating_num);
                    app.rating.displayYour();
                });
            }
            else {
                alert("Please log in to rate.");
            }
        });
    }
};
(function () {
    $('.readonly-rating').html(function () {
        var rating = $(this).attr('data-rating');
        if (rating) {
            return roundHalf(rating);
        }
        else {
            return "";
        }
    });
    $('.rating').on('mouseover', function () {
        var elm = $(this), rating = $(this).prop('id').split('-')[1];
        for (var i = 1; i <= 5; i++) {
            if (i <= rating) {
                $('#rate-' + i).removeClass('fa-star-o');
                $('#rate-' + i).addClass('fa-star');
            }
            else {
                $('#rate-' + i).addClass('fa-star-o');
                $('#rate-' + i).removeClass('fa-star');
            }
        }
        elm.removeClass('fa-star-o');
        elm.addClass('fa-star');
        elm.css('cursor', 'pointer');
    });
    $('#your-rating').on('mouseout', function () {
        if (app.rating.your) {
            app.rating.displayYour();
        }
    });
    $('.rating').on('click', function (event) {
        app.rating.update($(event.target).data('rating'));
    });
    if ($('#rating-section').length) {
        app.rating.searchiskoId = $('#rating-section').data('searchisko-id');
        app.rating.initYour();
        app.rating.initAvg();
    }
})();
window.Modernizr = function (a, b, c) { function d(a) { r.cssText = a; } function e(a, b) { return typeof a === b; } function f(a, b) { return !!~("" + a).indexOf(b); } function g(a, b) { for (var d in a) {
    var e = a[d];
    if (!f(e, "-") && r[e] !== c)
        return "pfx" == b ? e : !0;
} return !1; } function h(a, b, d) { for (var f in a) {
    var g = b[a[f]];
    if (g !== c)
        return d === !1 ? a[f] : e(g, "function") ? g.bind(d || b) : g;
} return !1; } function i(a, b, c) { var d = a.charAt(0).toUpperCase() + a.slice(1), f = (a + " " + w.join(d + " ") + d).split(" "); return e(b, "string") || e(b, "undefined") ? g(f, b) : (f = (a + " " + x.join(d + " ") + d).split(" "), h(f, b, c)); } function j() { n.input = function (c) { for (var d = 0, e = c.length; e > d; d++)
    A[c[d]] = !!(c[d] in s); return A.list && (A.list = !(!b.createElement("datalist") || !a.HTMLDataListElement)), A; }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), n.inputtypes = function (a) { for (var d, e, f, g = 0, h = a.length; h > g; g++)
    s.setAttribute("type", e = a[g]), d = "text" !== s.type, d && (s.value = t, s.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(e) && s.style.WebkitAppearance !== c ? (o.appendChild(s), f = b.defaultView, d = f.getComputedStyle && "textfield" !== f.getComputedStyle(s, null).WebkitAppearance && 0 !== s.offsetHeight, o.removeChild(s)) : /^(search|tel)$/.test(e) || (d = /^(url|email)$/.test(e) ? s.checkValidity && s.checkValidity() === !1 : s.value != t)), z[a[g]] = !!d; return z; }("search tel url email datetime date month week time datetime-local number range color".split(" ")); } var k, l, m = "2.7.1", n = {}, o = b.documentElement, p = "modernizr", q = b.createElement(p), r = q.style, s = b.createElement("input"), t = ":)", u = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")), v = "Webkit Moz O ms", w = v.split(" "), x = v.toLowerCase().split(" "), y = {}, z = {}, A = {}, B = [], C = B.slice, D = {}.hasOwnProperty; l = e(D, "undefined") || e(D.call, "undefined") ? function (a, b) { return b in a && e(a.constructor.prototype[b], "undefined"); } : function (a, b) { return D.call(a, b); }, Function.prototype.bind || (Function.prototype.bind = function (a) { var b = this; if ("function" != typeof b)
    throw new TypeError; var c = C.call(arguments, 1), d = function () { if (this instanceof d) {
    var e = function () { };
    e.prototype = b.prototype;
    var f = new e, g = b.apply(f, c.concat(C.call(arguments)));
    return Object(g) === g ? g : f;
} return b.apply(a, c.concat(C.call(arguments))); }; return d; }), y.canvas = function () { var a = b.createElement("canvas"); return !(!a.getContext || !a.getContext("2d")); }, y.geolocation = function () { return "geolocation" in navigator; }, y.video = function () { var a = b.createElement("video"), c = !1; try {
    (c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""));
}
catch (d) { } return c; }, y.audio = function () { var a = b.createElement("audio"), c = !1; try {
    (c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""));
}
catch (d) { } return c; }; for (var E in y)
    l(y, E) && (k = E.toLowerCase(), n[k] = y[E](), B.push((n[k] ? "" : "no-") + k)); return n.input || j(), n.addTest = function (a, b) { if ("object" == typeof a)
    for (var d in a)
        l(a, d) && n.addTest(d, a[d]);
else {
    if (a = a.toLowerCase(), n[a] !== c)
        return n;
    b = "function" == typeof b ? b() : b, "undefined" != typeof enableClasses && enableClasses && (o.className += " " + (b ? "" : "no-") + a), n[a] = b;
} return n; }, d(""), q = s = null, function (a, b) { function c(a, b) { var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement; return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild); } function d() { var a = s.elements; return "string" == typeof a ? a.split(" ") : a; } function e(a) { var b = r[a[p]]; return b || (b = {}, q++, a[p] = q, r[q] = b), b; } function f(a, c, d) { if (c || (c = b), k)
    return c.createElement(a); d || (d = e(c)); var f; return f = d.cache[a] ? d.cache[a].cloneNode() : o.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), !f.canHaveChildren || n.test(a) || f.tagUrn ? f : d.frag.appendChild(f); } function g(a, c) { if (a || (a = b), k)
    return a.createDocumentFragment(); c = c || e(a); for (var f = c.frag.cloneNode(), g = 0, h = d(), i = h.length; i > g; g++)
    f.createElement(h[g]); return f; } function h(a, b) { b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function (c) { return s.shivMethods ? f(c, a, b) : b.createElem(c); }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/[\w\-]+/g, function (a) { return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'; }) + ");return n}")(s, b.frag); } function i(a) { a || (a = b); var d = e(a); return !s.shivCSS || j || d.hasCSS || (d.hasCSS = !!c(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || h(a, d), a; } var j, k, l = "3.7.0", m = a.html5 || {}, n = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, o = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, p = "_html5shiv", q = 0, r = {}; !function () { try {
    var a = b.createElement("a");
    a.innerHTML = "<xyz></xyz>", j = "hidden" in a, k = 1 == a.childNodes.length || function () { b.createElement("a"); var a = b.createDocumentFragment(); return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement; }();
}
catch (c) {
    j = !0, k = !0;
} }(); var s = { elements: m.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video", version: l, shivCSS: m.shivCSS !== !1, supportsUnknownElements: k, shivMethods: m.shivMethods !== !1, type: "default", shivDocument: i, createElement: f, createDocumentFragment: g }; a.html5 = s, i(b); }(this, b), n._version = m, n._prefixes = u, n._domPrefixes = x, n._cssomPrefixes = w, n.testProp = function (a) { return g([a]); }, n.testAllProps = i, n.prefixed = function (a, b, c) { return b ? i(a, b, c) : i(a, "pfx"); }, n; }(this, this.document);
(function ($, window, document, undefined) {
    var header_helpers = function (class_array) {
        var i = class_array.length;
        var head = $('head');
        while (i--) {
            if (head.has('.' + class_array[i]).length === 0) {
                head.append('<meta class="' + class_array[i] + '" />');
            }
        }
    };
    header_helpers([
        'foundation-mq-small',
        'foundation-mq-medium',
        'foundation-mq-large',
        'foundation-mq-xlarge',
        'foundation-mq-xxlarge',
        'foundation-data-attribute-namespace'
    ]);
    $(function () {
        if (typeof FastClick !== 'undefined') {
            if (typeof document.body !== 'undefined') {
                FastClick.attach(document.body);
            }
        }
    });
    var S = function (selector, context) {
        if (typeof selector === 'string') {
            if (context) {
                var cont;
                if (context.jquery) {
                    cont = context[0];
                    if (!cont)
                        return context;
                }
                else {
                    cont = context;
                }
                return $(cont.querySelectorAll(selector));
            }
            return $(document.querySelectorAll(selector));
        }
        return $(selector, context);
    };
    var attr_name = function (init) {
        var arr = [];
        if (!init)
            arr.push('data');
        if (this.namespace.length > 0)
            arr.push(this.namespace);
        arr.push(this.name);
        return arr.join('-');
    };
    var add_namespace = function (str) {
        var parts = str.split('-'), i = parts.length, arr = [];
        while (i--) {
            if (i !== 0) {
                arr.push(parts[i]);
            }
            else {
                if (this.namespace.length > 0) {
                    arr.push(this.namespace, parts[i]);
                }
                else {
                    arr.push(parts[i]);
                }
            }
        }
        return arr.reverse().join('-');
    };
    var bindings = function (method, options) {
        var self = this, should_bind_events = !S(this).data(this.attr_name(true));
        if (S(this.scope).is('[' + this.attr_name() + ']')) {
            S(this.scope).data(this.attr_name(true) + '-init', $.extend({}, this.settings, (options || method), this.data_options(S(this.scope))));
            if (should_bind_events) {
                this.events(this.scope);
            }
        }
        else {
            S('[' + this.attr_name() + ']', this.scope).each(function () {
                var should_bind_events = !S(this).data(self.attr_name(true) + '-init');
                S(this).data(self.attr_name(true) + '-init', $.extend({}, self.settings, (options || method), self.data_options(S(this))));
                if (should_bind_events) {
                    self.events(this);
                }
            });
        }
        if (typeof method === 'string') {
            return this[method].call(this, options);
        }
    };
    var single_image_loaded = function (image, callback) {
        function loaded() {
            callback(image[0]);
        }
        function bindLoad() {
            this.one('load', loaded);
            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                var src = this.attr('src'), param = src.match(/\?/) ? '&' : '?';
                param += 'random=' + (new Date()).getTime();
                this.attr('src', src + param);
            }
        }
        if (!image.attr('src')) {
            loaded();
            return;
        }
        if (image[0].complete || image[0].readyState === 4) {
            loaded();
        }
        else {
            bindLoad.call(image);
        }
    };
    window.matchMedia = window.matchMedia || (function (doc) {
        var bool, docElem = doc.documentElement, refNode = docElem.firstElementChild || docElem.firstChild, fakeBody = doc.createElement("body"), div = doc.createElement("div");
        div.id = "mq-test-1";
        div.style.cssText = "position:absolute;top:-100em";
        fakeBody.style.background = "none";
        fakeBody.appendChild(div);
        return function (q) {
            div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";
            docElem.insertBefore(fakeBody, refNode);
            bool = div.offsetWidth === 42;
            docElem.removeChild(fakeBody);
            return {
                matches: bool,
                media: q
            };
        };
    }(document));
    (function ($) {
        var animating, lastTime = 0, vendors = ['webkit', 'moz'], requestAnimationFrame = window.requestAnimationFrame, cancelAnimationFrame = window.cancelAnimationFrame, jqueryFxAvailable = 'undefined' !== typeof jQuery.fx;
        for (; lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
            requestAnimationFrame = window[vendors[lastTime] + "RequestAnimationFrame"];
            cancelAnimationFrame = cancelAnimationFrame ||
                window[vendors[lastTime] + "CancelAnimationFrame"] ||
                window[vendors[lastTime] + "CancelRequestAnimationFrame"];
        }
        function raf() {
            if (animating) {
                requestAnimationFrame(raf);
                if (jqueryFxAvailable) {
                    jQuery.fx.tick();
                }
            }
        }
        if (requestAnimationFrame) {
            window.requestAnimationFrame = requestAnimationFrame;
            window.cancelAnimationFrame = cancelAnimationFrame;
            if (jqueryFxAvailable) {
                jQuery.fx.timer = function (timer) {
                    if (timer() && jQuery.timers.push(timer) && !animating) {
                        animating = true;
                        raf();
                    }
                };
                jQuery.fx.stop = function () {
                    animating = false;
                };
            }
        }
        else {
            window.requestAnimationFrame = function (callback) {
                var currTime = new Date().getTime(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }
    }(jQuery));
    function removeQuotes(string) {
        if (typeof string === 'string' || string instanceof String) {
            string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
        }
        return string;
    }
    window.Foundation = {
        name: 'Foundation',
        version: '5.4.4',
        media_queries: {
            small: S('.foundation-mq-small').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
            medium: S('.foundation-mq-medium').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
            large: S('.foundation-mq-large').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
            xlarge: S('.foundation-mq-xlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
            xxlarge: S('.foundation-mq-xxlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, '')
        },
        stylesheet: $('<style></style>').appendTo('head')[0].sheet,
        global: {
            namespace: undefined
        },
        init: function (scope, libraries, method, options, response) {
            var args = [scope, method, options, response], responses = [];
            this.rtl = /rtl/i.test(S('html').attr('dir'));
            this.scope = scope || this.scope;
            this.set_namespace();
            if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
                if (this.libs.hasOwnProperty(libraries)) {
                    responses.push(this.init_lib(libraries, args));
                }
            }
            else {
                for (var lib in this.libs) {
                    responses.push(this.init_lib(lib, libraries));
                }
            }
            S(window).on("load", function () {
                S(window)
                    .trigger('resize.fndtn.clearing')
                    .trigger('resize.fndtn.dropdown')
                    .trigger('resize.fndtn.equalizer')
                    .trigger('resize.fndtn.interchange')
                    .trigger('resize.fndtn.joyride')
                    .trigger('resize.fndtn.magellan')
                    .trigger('resize.fndtn.topbar')
                    .trigger('resize.fndtn.slider');
            });
            return scope;
        },
        init_lib: function (lib, args) {
            if (this.libs.hasOwnProperty(lib)) {
                this.patch(this.libs[lib]);
                if (args && args.hasOwnProperty(lib)) {
                    if (typeof this.libs[lib].settings !== 'undefined') {
                        $.extend(true, this.libs[lib].settings, args[lib]);
                    }
                    else if (typeof this.libs[lib].defaults !== 'undefined') {
                        $.extend(true, this.libs[lib].defaults, args[lib]);
                    }
                    return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]);
                }
                args = args instanceof Array ? args : new Array(args);
                return this.libs[lib].init.apply(this.libs[lib], args);
            }
            return function () { };
        },
        patch: function (lib) {
            lib.scope = this.scope;
            lib.namespace = this.global.namespace;
            lib.rtl = this.rtl;
            lib['data_options'] = this.utils.data_options;
            lib['attr_name'] = attr_name;
            lib['add_namespace'] = add_namespace;
            lib['bindings'] = bindings;
            lib['S'] = this.utils.S;
        },
        inherit: function (scope, methods) {
            var methods_arr = methods.split(' '), i = methods_arr.length;
            while (i--) {
                if (this.utils.hasOwnProperty(methods_arr[i])) {
                    scope[methods_arr[i]] = this.utils[methods_arr[i]];
                }
            }
        },
        set_namespace: function () {
            var namespace = (this.global.namespace === undefined) ? '' : this.global.namespace;
            this.global.namespace = (namespace === undefined || /false/i.test(namespace)) ? '' : namespace;
        },
        libs: {},
        utils: {
            S: S,
            throttle: function (func, delay) {
                var timer = null;
                return function () {
                    var context = this, args = arguments;
                    if (timer == null) {
                        timer = setTimeout(function () {
                            func.apply(context, args);
                            timer = null;
                        }, delay);
                    }
                };
            },
            debounce: function (func, delay, immediate) {
                var timeout, result;
                return function () {
                    var context = this, args = arguments;
                    var later = function () {
                        timeout = null;
                        if (!immediate)
                            result = func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, delay);
                    if (callNow)
                        result = func.apply(context, args);
                    return result;
                };
            },
            data_options: function (el, data_attr_name) {
                data_attr_name = data_attr_name || 'options';
                var opts = {}, ii, p, opts_arr, data_options = function (el) {
                    var namespace = Foundation.global.namespace;
                    if (namespace.length > 0) {
                        return el.data(namespace + '-' + data_attr_name);
                    }
                    return el.data(data_attr_name);
                };
                var cached_options = data_options(el);
                if (typeof cached_options === 'object') {
                    return cached_options;
                }
                opts_arr = (cached_options || ':').split(';');
                ii = opts_arr.length;
                function isNumber(o) {
                    return !isNaN(o - 0) && o !== null && o !== "" && o !== false && o !== true;
                }
                function trim(str) {
                    if (typeof str === 'string')
                        return $.trim(str);
                    return str;
                }
                while (ii--) {
                    p = opts_arr[ii].split(':');
                    p = [p[0], p.slice(1).join(':')];
                    if (/true/i.test(p[1]))
                        p[1] = true;
                    if (/false/i.test(p[1]))
                        p[1] = false;
                    if (isNumber(p[1])) {
                        if (p[1].indexOf('.') === -1) {
                            p[1] = parseInt(p[1], 10);
                        }
                        else {
                            p[1] = parseFloat(p[1]);
                        }
                    }
                    if (p.length === 2 && p[0].length > 0) {
                        opts[trim(p[0])] = trim(p[1]);
                    }
                }
                return opts;
            },
            register_media: function (media, media_class) {
                if (Foundation.media_queries[media] === undefined) {
                    $('head').append('<meta class="' + media_class + '"/>');
                    Foundation.media_queries[media] = removeQuotes($('.' + media_class).css('font-family'));
                }
            },
            add_custom_rule: function (rule, media) {
                if (media === undefined && Foundation.stylesheet) {
                    Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
                }
                else {
                    var query = Foundation.media_queries[media];
                    if (query !== undefined) {
                        Foundation.stylesheet.insertRule('@media ' +
                            Foundation.media_queries[media] + '{ ' + rule + ' }');
                    }
                }
            },
            image_loaded: function (images, callback) {
                var self = this, unloaded = images.length;
                if (unloaded === 0) {
                    callback(images);
                }
                images.each(function () {
                    single_image_loaded(self.S(this), function () {
                        unloaded -= 1;
                        if (unloaded === 0) {
                            callback(images);
                        }
                    });
                });
            },
            random_str: function () {
                if (!this.fidx)
                    this.fidx = 0;
                this.prefix = this.prefix || [(this.name || 'F'), (+new Date).toString(36)].join('-');
                return this.prefix + (this.fidx++).toString(36);
            }
        }
    };
    $.fn.foundation = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        return this.each(function () {
            Foundation.init.apply(Foundation, [this].concat(args));
            return this;
        });
    };
}(jQuery, window, window.document));
;
(function ($, window, document, undefined) {
    Foundation.libs.tab = {
        name: 'tab',
        version: '5.5.3',
        settings: {
            active_class: 'active',
            callback: function () { },
            deep_linking: false,
            scroll_to_content: true,
            is_hover: false
        },
        default_tab_hashes: [],
        init: function (scope, method, options) {
            var self = this, S = this.S;
            S('[' + this.attr_name() + '] > .active > a', this.scope).each(function () {
                self.default_tab_hashes.push(this.hash);
            });
            this.bindings(method, options);
            this.handle_location_hash_change();
        },
        events: function () {
            var self = this, S = this.S;
            var usual_tab_behavior = function (e, target) {
                var settings = S(target).closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');
                if (!settings.is_hover || Modernizr.touch) {
                    var keyCode = e.keyCode || e.which;
                    if (keyCode !== 9) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    self.toggle_active_tab(S(target).parent());
                }
            };
            S(this.scope)
                .off('.tab')
                .on('keydown.fndtn.tab', '[' + this.attr_name() + '] > * > a', function (e) {
                var keyCode = e.keyCode || e.which;
                if (keyCode === 13 || keyCode === 32) {
                    var el = this;
                    usual_tab_behavior(e, el);
                }
            })
                .on('click.fndtn.tab', '[' + this.attr_name() + '] > * > a', function (e) {
                var el = this;
                usual_tab_behavior(e, el);
            })
                .on('mouseenter.fndtn.tab', '[' + this.attr_name() + '] > * > a', function (e) {
                var settings = S(this).closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');
                if (settings.is_hover) {
                    self.toggle_active_tab(S(this).parent());
                }
            });
            S(window).on('hashchange.fndtn.tab', function (e) {
                e.preventDefault();
                self.handle_location_hash_change();
            });
        },
        handle_location_hash_change: function () {
            var self = this, S = this.S;
            S('[' + this.attr_name() + ']', this.scope).each(function () {
                var settings = S(this).data(self.attr_name(true) + '-init');
                if (settings.deep_linking) {
                    var hash;
                    if (settings.scroll_to_content) {
                        hash = self.scope.location.hash;
                    }
                    else {
                        hash = self.scope.location.hash.replace('fndtn-', '');
                    }
                    if (hash != '') {
                        var hash_element = S(hash);
                        if (hash_element.hasClass('content') && hash_element.parent().hasClass('tabs-content')) {
                            self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href="' + hash + '"]').parent());
                        }
                        else {
                            var hash_tab_container_id = hash_element.closest('.content').attr('id');
                            if (hash_tab_container_id != undefined) {
                                self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href="#' + hash_tab_container_id + '"]').parent(), hash);
                            }
                        }
                    }
                    else {
                        for (var ind = 0; ind < self.default_tab_hashes.length; ind++) {
                            self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href="' + self.default_tab_hashes[ind] + '"]').parent());
                        }
                    }
                }
            });
        },
        toggle_active_tab: function (tab, location_hash) {
            var self = this, S = self.S, tabs = tab.closest('[' + this.attr_name() + ']'), tab_link = tab.find('a'), anchor = tab.children('a').first(), target_hash = '#' + anchor.attr('href').split('#')[1], target = S(target_hash), siblings = tab.siblings(), settings = tabs.data(this.attr_name(true) + '-init'), interpret_keyup_action = function (e) {
                var $original = $(this);
                var $prev = $(this).parents('li').prev().children('[role="tab"]');
                var $next = $(this).parents('li').next().children('[role="tab"]');
                var $target;
                switch (e.keyCode) {
                    case 37:
                        $target = $prev;
                        break;
                    case 39:
                        $target = $next;
                        break;
                    default:
                        $target = false;
                        break;
                }
                if ($target.length) {
                    $original.attr({
                        'tabindex': '-1',
                        'aria-selected': null
                    });
                    $target.attr({
                        'tabindex': '0',
                        'aria-selected': true
                    }).focus();
                }
                $('[role="tabpanel"]')
                    .attr('aria-hidden', 'true');
                $('#' + $(document.activeElement).attr('href').substring(1))
                    .attr('aria-hidden', null);
            }, go_to_hash = function (hash) {
                var default_hash = settings.scroll_to_content ? self.default_tab_hashes[0] : 'fndtn-' + self.default_tab_hashes[0].replace('#', '');
                if (hash !== default_hash || window.location.hash) {
                    window.location.hash = hash;
                }
            };
            if (anchor.data('tab-content')) {
                target_hash = '#' + anchor.data('tab-content').split('#')[1];
                target = S(target_hash);
            }
            if (settings.deep_linking) {
                if (settings.scroll_to_content) {
                    go_to_hash(location_hash || target_hash);
                    if (location_hash == undefined || location_hash == target_hash) {
                        tab.parent()[0].scrollIntoView();
                    }
                    else {
                        S(target_hash)[0].scrollIntoView();
                    }
                }
                else {
                    if (location_hash != undefined) {
                        go_to_hash('fndtn-' + location_hash.replace('#', ''));
                    }
                    else {
                        go_to_hash('fndtn-' + target_hash.replace('#', ''));
                    }
                }
            }
            tab.addClass(settings.active_class).triggerHandler('opened');
            tab_link.attr({ 'aria-selected': 'true', tabindex: 0 });
            siblings.removeClass(settings.active_class);
            siblings.find('a').attr({ 'aria-selected': 'false' });
            target.siblings().removeClass(settings.active_class).attr({ 'aria-hidden': 'true' });
            target.addClass(settings.active_class).attr('aria-hidden', 'false').removeAttr('tabindex');
            settings.callback(tab);
            target.triggerHandler('toggled', [target]);
            tabs.triggerHandler('toggled', [tab]);
            tab_link.off('keydown').on('keydown', interpret_keyup_action);
        },
        data_attr: function (str) {
            if (this.namespace.length > 0) {
                return this.namespace + '-' + str;
            }
            return str;
        },
        off: function () { },
        reflow: function () { }
    };
}(jQuery, window, window.document));
;
(function ($, window, document, undefined) {
    Foundation.libs.reveal = {
        name: 'reveal',
        version: '5.4.4',
        locked: false,
        settings: {
            animation: 'fadeAndPop',
            animation_speed: 250,
            close_on_background_click: true,
            close_on_esc: true,
            dismiss_modal_class: 'close-reveal-modal',
            bg_class: 'reveal-modal-bg',
            root_element: 'body',
            open: function () { },
            opened: function () { },
            close: function () { },
            closed: function () { },
            bg: $('.reveal-modal-bg'),
            css: {
                open: {
                    'opacity': 0,
                    'visibility': 'visible',
                    'display': 'block'
                },
                close: {
                    'opacity': 1,
                    'visibility': 'hidden',
                    'display': 'none'
                }
            }
        },
        init: function (scope, method, options) {
            $.extend(true, this.settings, method, options);
            this.bindings(method, options);
        },
        events: function (scope) {
            var self = this, S = self.S;
            S(this.scope)
                .off('.reveal')
                .on('click.fndtn.reveal', '[' + this.add_namespace('data-reveal-id') + ']:not([disabled])', function (e) {
                e.preventDefault();
                if (!self.locked) {
                    var element = S(this), ajax = element.data(self.data_attr('reveal-ajax'));
                    self.locked = true;
                    if (typeof ajax === 'undefined') {
                        self.open.call(self, element);
                    }
                    else {
                        var url = ajax === true ? element.attr('href') : ajax;
                        self.open.call(self, element, { url: url });
                    }
                }
            });
            S(document)
                .on('click.fndtn.reveal', this.close_targets(), function (e) {
                e.preventDefault();
                if (!self.locked) {
                    var settings = S('[' + self.attr_name() + '].open').data(self.attr_name(true) + '-init'), bg_clicked = S(e.target)[0] === S('.' + settings.bg_class)[0];
                    if (bg_clicked) {
                        if (settings.close_on_background_click) {
                            e.stopPropagation();
                        }
                        else {
                            return;
                        }
                    }
                    self.locked = true;
                    self.close.call(self, bg_clicked ? S('[' + self.attr_name() + '].open') : S(this).closest('[' + self.attr_name() + ']'));
                }
            });
            if (S('[' + self.attr_name() + ']', this.scope).length > 0) {
                S(this.scope)
                    .on('open.fndtn.reveal', this.settings.open)
                    .on('opened.fndtn.reveal', this.settings.opened)
                    .on('opened.fndtn.reveal', this.open_video)
                    .on('close.fndtn.reveal', this.settings.close)
                    .on('closed.fndtn.reveal', this.settings.closed)
                    .on('closed.fndtn.reveal', this.close_video);
            }
            else {
                S(this.scope)
                    .on('open.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.open)
                    .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.opened)
                    .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.open_video)
                    .on('close.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.close)
                    .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.closed)
                    .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.close_video);
            }
            return true;
        },
        key_up_on: function (scope) {
            var self = this;
            self.S('body').off('keyup.fndtn.reveal').on('keyup.fndtn.reveal', function (event) {
                var open_modal = self.S('[' + self.attr_name() + '].open'), settings = open_modal.data(self.attr_name(true) + '-init') || self.settings;
                if (settings && event.which === 27 && settings.close_on_esc && !self.locked) {
                    self.close.call(self, open_modal);
                }
            });
            return true;
        },
        key_up_off: function (scope) {
            this.S('body').off('keyup.fndtn.reveal');
            return true;
        },
        open: function (target, ajax_settings) {
            var self = this, modal;
            if (target) {
                if (typeof target.selector !== 'undefined') {
                    modal = self.S('#' + target.data(self.data_attr('reveal-id'))).first();
                }
                else {
                    modal = self.S(this.scope);
                    ajax_settings = target;
                }
            }
            else {
                modal = self.S(this.scope);
            }
            var settings = modal.data(self.attr_name(true) + '-init');
            settings = settings || this.settings;
            if (modal.hasClass('open') && target.attr('data-reveal-id') == modal.attr('id')) {
                return self.close(modal);
            }
            if (!modal.hasClass('open')) {
                var open_modal = self.S('[' + self.attr_name() + '].open');
                if (typeof modal.data('css-top') === 'undefined') {
                    modal.data('css-top', parseInt(modal.css('top'), 10))
                        .data('offset', this.cache_offset(modal));
                }
                this.key_up_on(modal);
                modal.trigger('open').trigger('open.fndtn.reveal');
                if (open_modal.length < 1) {
                    this.toggle_bg(modal, true);
                }
                if (typeof ajax_settings === 'string') {
                    ajax_settings = {
                        url: ajax_settings
                    };
                }
                if (typeof ajax_settings === 'undefined' || !ajax_settings.url) {
                    if (open_modal.length > 0) {
                        this.hide(open_modal, settings.css.close);
                    }
                    this.show(modal, settings.css.open);
                }
                else {
                    var old_success = typeof ajax_settings.success !== 'undefined' ? ajax_settings.success : null;
                    $.extend(ajax_settings, {
                        success: function (data, textStatus, jqXHR) {
                            if ($.isFunction(old_success)) {
                                old_success(data, textStatus, jqXHR);
                            }
                            modal.html(data);
                            self.S(modal).foundation('section', 'reflow');
                            self.S(modal).children().foundation();
                            if (open_modal.length > 0) {
                                self.hide(open_modal, settings.css.close);
                            }
                            self.show(modal, settings.css.open);
                        }
                    });
                    $.ajax(ajax_settings);
                }
            }
            self.S(window).trigger('resize');
        },
        close: function (modal) {
            var modal = modal && modal.length ? modal : this.S(this.scope), open_modals = this.S('[' + this.attr_name() + '].open'), settings = modal.data(this.attr_name(true) + '-init') || this.settings;
            if (open_modals.length > 0) {
                this.locked = true;
                this.key_up_off(modal);
                modal.trigger('close').trigger('close.fndtn.reveal');
                this.toggle_bg(modal, false);
                this.hide(open_modals, settings.css.close, settings);
            }
        },
        close_targets: function () {
            var base = '.' + this.settings.dismiss_modal_class;
            if (this.settings.close_on_background_click) {
                return base + ', .' + this.settings.bg_class;
            }
            return base;
        },
        toggle_bg: function (modal, state) {
            if (this.S('.' + this.settings.bg_class).length === 0) {
                this.settings.bg = $('<div />', { 'class': this.settings.bg_class })
                    .appendTo('body').hide();
            }
            var visible = this.settings.bg.filter(':visible').length > 0;
            if (state != visible) {
                if (state == undefined ? visible : !state) {
                    this.hide(this.settings.bg);
                }
                else {
                    this.show(this.settings.bg);
                }
            }
        },
        show: function (el, css) {
            if (css) {
                var settings = el.data(this.attr_name(true) + '-init') || this.settings, root_element = settings.root_element;
                if (el.parent(root_element).length === 0) {
                    var placeholder = el.wrap('<div style="display: none;" />').parent();
                    el.on('closed.fndtn.reveal.wrapped', function () {
                        el.detach().appendTo(placeholder);
                        el.unwrap().unbind('closed.fndtn.reveal.wrapped');
                    });
                    el.detach().appendTo(root_element);
                }
                var animData = getAnimationData(settings.animation);
                if (!animData.animate) {
                    this.locked = false;
                }
                if (animData.pop) {
                    css.top = $(window).scrollTop() - el.data('offset') + 'px';
                    var end_css = {
                        top: $(window).scrollTop() + el.data('css-top') + 'px',
                        opacity: 1
                    };
                    return setTimeout(function () {
                        return el
                            .css(css)
                            .animate(end_css, settings.animation_speed, 'linear', function () {
                            this.locked = false;
                            el.trigger('opened').trigger('opened.fndtn.reveal');
                        }.bind(this))
                            .addClass('open');
                    }.bind(this), settings.animation_speed / 2);
                }
                if (animData.fade) {
                    css.top = $(window).scrollTop() + el.data('css-top') + 'px';
                    var end_css = { opacity: 1 };
                    return setTimeout(function () {
                        return el
                            .css(css)
                            .animate(end_css, settings.animation_speed, 'linear', function () {
                            this.locked = false;
                            el.trigger('opened').trigger('opened.fndtn.reveal');
                        }.bind(this))
                            .addClass('open');
                    }.bind(this), settings.animation_speed / 2);
                }
                return el.css(css).show().css({ opacity: 1 }).addClass('open').trigger('opened').trigger('opened.fndtn.reveal');
            }
            var settings = this.settings;
            if (getAnimationData(settings.animation).fade) {
                return el.fadeIn(settings.animation_speed / 2);
            }
            this.locked = false;
            return el.show();
        },
        hide: function (el, css) {
            if (css) {
                var settings = el.data(this.attr_name(true) + '-init');
                settings = settings || this.settings;
                var animData = getAnimationData(settings.animation);
                if (!animData.animate) {
                    this.locked = false;
                }
                if (animData.pop) {
                    var end_css = {
                        top: -$(window).scrollTop() - el.data('offset') + 'px',
                        opacity: 0
                    };
                    return setTimeout(function () {
                        return el
                            .animate(end_css, settings.animation_speed, 'linear', function () {
                            this.locked = false;
                            el.css(css).trigger('closed').trigger('closed.fndtn.reveal');
                        }.bind(this))
                            .removeClass('open');
                    }.bind(this), settings.animation_speed / 2);
                }
                if (animData.fade) {
                    var end_css = { opacity: 0 };
                    return setTimeout(function () {
                        return el
                            .animate(end_css, settings.animation_speed, 'linear', function () {
                            this.locked = false;
                            el.css(css).trigger('closed').trigger('closed.fndtn.reveal');
                        }.bind(this))
                            .removeClass('open');
                    }.bind(this), settings.animation_speed / 2);
                }
                return el.hide().css(css).removeClass('open').trigger('closed').trigger('closed.fndtn.reveal');
            }
            var settings = this.settings;
            if (getAnimationData(settings.animation).fade) {
                return el.fadeOut(settings.animation_speed / 2);
            }
            return el.hide();
        },
        close_video: function (e) {
            var video = $('.flex-video', e.target), iframe = $('iframe', video);
            if (iframe.length > 0) {
                iframe.attr('data-src', iframe[0].src);
                iframe.attr('src', iframe.attr('src'));
                video.hide();
            }
        },
        open_video: function (e) {
            var video = $('.flex-video', e.target), iframe = video.find('iframe');
            if (iframe.length > 0) {
                var data_src = iframe.attr('data-src');
                if (typeof data_src === 'string') {
                    iframe[0].src = iframe.attr('data-src');
                }
                else {
                    var src = iframe[0].src;
                    iframe[0].src = undefined;
                    iframe[0].src = src;
                }
                video.show();
            }
        },
        data_attr: function (str) {
            if (this.namespace.length > 0) {
                return this.namespace + '-' + str;
            }
            return str;
        },
        cache_offset: function (modal) {
            var offset = modal.show().height() + parseInt(modal.css('top'), 10);
            modal.hide();
            return offset;
        },
        off: function () {
            $(this.scope).off('.fndtn.reveal');
        },
        reflow: function () { }
    };
    function getAnimationData(str) {
        var fade = /fade/i.test(str);
        var pop = /pop/i.test(str);
        return {
            animate: fade || pop,
            pop: pop,
            fade: fade
        };
    }
}(jQuery, window, window.document));
;
(function ($, window, document, undefined) {
    Foundation.libs.tooltip = {
        name: 'tooltip',
        version: '5.4.4',
        settings: {
            additional_inheritable_classes: [],
            tooltip_class: '.tooltip',
            append_to: 'body',
            touch_close_text: 'Tap To Close',
            disable_for_touch: false,
            hover_delay: 200,
            show_on: 'all',
            tip_template: function (selector, content) {
                return '<span data-selector="' + selector + '" id="' + selector + '" class="'
                    + Foundation.libs.tooltip.settings.tooltip_class.substring(1)
                    + '" role="tooltip">' + content + '<span class="nub"></span></span>';
            }
        },
        cache: {},
        init: function (scope, method, options) {
            Foundation.inherit(this, 'random_str');
            this.bindings(method, options);
        },
        should_show: function (target, tip) {
            var settings = $.extend({}, this.settings, this.data_options(target));
            if (settings.show_on === 'all') {
                return true;
            }
            else if (this.small() && settings.show_on === 'small') {
                return true;
            }
            else if (this.medium() && settings.show_on === 'medium') {
                return true;
            }
            else if (this.large() && settings.show_on === 'large') {
                return true;
            }
            return false;
        },
        medium: function () {
            return matchMedia(Foundation.media_queries['medium']).matches;
        },
        large: function () {
            return matchMedia(Foundation.media_queries['large']).matches;
        },
        events: function (instance) {
            var self = this, S = self.S;
            self.create(this.S(instance));
            $(this.scope)
                .off('.tooltip')
                .on('mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', '[' + this.attr_name() + ']', function (e) {
                var $this = S(this), settings = $.extend({}, self.settings, self.data_options($this)), is_touch = false;
                if (Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type) && S(e.target).is('a')) {
                    return false;
                }
                if (/mouse/i.test(e.type) && self.ie_touch(e))
                    return false;
                if ($this.hasClass('open')) {
                    if (Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type))
                        e.preventDefault();
                    self.hide($this);
                }
                else {
                    if (settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
                        return;
                    }
                    else if (!settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
                        e.preventDefault();
                        S(settings.tooltip_class + '.open').hide();
                        is_touch = true;
                    }
                    if (/enter|over/i.test(e.type)) {
                        this.timer = setTimeout(function () {
                            var tip = self.showTip($this);
                        }.bind(this), self.settings.hover_delay);
                    }
                    else if (e.type === 'mouseout' || e.type === 'mouseleave') {
                        clearTimeout(this.timer);
                        self.hide($this);
                    }
                    else {
                        self.showTip($this);
                    }
                }
            })
                .on('mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', '[' + this.attr_name() + '].open', function (e) {
                if (/mouse/i.test(e.type) && self.ie_touch(e))
                    return false;
                if ($(this).data('tooltip-open-event-type') == 'touch' && e.type == 'mouseleave') {
                    return;
                }
                else if ($(this).data('tooltip-open-event-type') == 'mouse' && /MSPointerDown|touchstart/i.test(e.type)) {
                    self.convert_to_touch($(this));
                }
                else {
                    self.hide($(this));
                }
            })
                .on('DOMNodeRemoved DOMAttrModified', '[' + this.attr_name() + ']:not(a)', function (e) {
                self.hide(S(this));
            });
        },
        ie_touch: function (e) {
            return false;
        },
        showTip: function ($target) {
            var $tip = this.getTip($target);
            if (this.should_show($target, $tip)) {
                return this.show($target);
            }
            return;
        },
        getTip: function ($target) {
            var selector = this.selector($target), settings = $.extend({}, this.settings, this.data_options($target)), tip = null;
            if (selector) {
                tip = this.S('span[data-selector="' + selector + '"]' + settings.tooltip_class);
            }
            return (typeof tip === 'object') ? tip : false;
        },
        selector: function ($target) {
            var id = $target.attr('id'), dataSelector = $target.attr(this.attr_name()) || $target.attr('data-selector');
            if ((id && id.length < 1 || !id) && typeof dataSelector != 'string') {
                dataSelector = this.random_str(6);
                $target
                    .attr('data-selector', dataSelector)
                    .attr('aria-describedby', dataSelector);
            }
            return (id && id.length > 0) ? id : dataSelector;
        },
        create: function ($target) {
            var self = this, settings = $.extend({}, this.settings, this.data_options($target)), tip_template = this.settings.tip_template;
            if (typeof settings.tip_template === 'string' && window.hasOwnProperty(settings.tip_template)) {
                tip_template = window[settings.tip_template];
            }
            var $tip = $(tip_template(this.selector($target), $('<div></div>').html($target.attr('title')).html())), classes = this.inheritable_classes($target);
            $tip.addClass(classes).appendTo(settings.append_to);
            if (Modernizr.touch) {
                $tip.append('<span class="tap-to-close">' + settings.touch_close_text + '</span>');
                $tip.on('touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', function (e) {
                    self.hide($target);
                });
            }
            $target.removeAttr('title').attr('title', '');
        },
        reposition: function (target, tip, classes) {
            var width, nub, nubHeight, nubWidth, column, objPos;
            tip.css('visibility', 'hidden').show();
            width = target.data('width');
            nub = tip.children('.nub');
            nubHeight = nub.outerHeight();
            nubWidth = nub.outerHeight();
            if (this.small()) {
                tip.css({ 'width': '100%' });
            }
            else {
                tip.css({ 'width': (width) ? width : 'auto' });
            }
            objPos = function (obj, top, right, bottom, left, width) {
                return obj.css({
                    'top': (top) ? top : 'auto',
                    'bottom': (bottom) ? bottom : 'auto',
                    'left': (left) ? left : 'auto',
                    'right': (right) ? right : 'auto'
                }).end();
            };
            objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', target.offset().left);
            if (this.small()) {
                objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', 12.5, $(this.scope).width());
                tip.addClass('tip-override');
                objPos(nub, -nubHeight, 'auto', 'auto', target.offset().left);
            }
            else {
                var left = target.offset().left;
                if (Foundation.rtl) {
                    nub.addClass('rtl');
                    left = target.offset().left + target.outerWidth() - tip.outerWidth();
                }
                objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', left);
                tip.removeClass('tip-override');
                if (classes && classes.indexOf('tip-top') > -1) {
                    if (Foundation.rtl)
                        nub.addClass('rtl');
                    objPos(tip, (target.offset().top - tip.outerHeight()), 'auto', 'auto', left)
                        .removeClass('tip-override');
                }
                else if (classes && classes.indexOf('tip-left') > -1) {
                    objPos(tip, (target.offset().top + (target.outerHeight() / 2) - (tip.outerHeight() / 2)), 'auto', 'auto', (target.offset().left - tip.outerWidth() - nubHeight))
                        .removeClass('tip-override');
                    nub.removeClass('rtl');
                }
                else if (classes && classes.indexOf('tip-right') > -1) {
                    objPos(tip, (target.offset().top + (target.outerHeight() / 2) - (tip.outerHeight() / 2)), 'auto', 'auto', (target.offset().left + target.outerWidth() + nubHeight))
                        .removeClass('tip-override');
                    nub.removeClass('rtl');
                }
            }
            tip.css('visibility', 'visible').hide();
        },
        small: function () {
            return matchMedia(Foundation.media_queries.small).matches &&
                !matchMedia(Foundation.media_queries.medium).matches;
        },
        inheritable_classes: function ($target) {
            var settings = $.extend({}, this.settings, this.data_options($target)), inheritables = ['tip-top', 'tip-left', 'tip-bottom', 'tip-right', 'radius', 'round'].concat(settings.additional_inheritable_classes), classes = $target.attr('class'), filtered = classes ? $.map(classes.split(' '), function (el, i) {
                if ($.inArray(el, inheritables) !== -1) {
                    return el;
                }
            }).join(' ') : '';
            return $.trim(filtered);
        },
        convert_to_touch: function ($target) {
            var self = this, $tip = self.getTip($target), settings = $.extend({}, self.settings, self.data_options($target));
            if ($tip.find('.tap-to-close').length === 0) {
                $tip.append('<span class="tap-to-close">' + settings.touch_close_text + '</span>');
                $tip.on('click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose', function (e) {
                    self.hide($target);
                });
            }
            $target.data('tooltip-open-event-type', 'touch');
        },
        show: function ($target) {
            var $tip = this.getTip($target);
            if ($target.data('tooltip-open-event-type') == 'touch') {
                this.convert_to_touch($target);
            }
            this.reposition($target, $tip, $target.attr('class'));
            $target.addClass('open');
            $tip.fadeIn(150);
        },
        hide: function ($target) {
            var $tip = this.getTip($target);
            $tip.fadeOut(150, function () {
                $tip.find('.tap-to-close').remove();
                $tip.off('click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose');
                $target.removeClass('open');
            });
        },
        off: function () {
            var self = this;
            this.S(this.scope).off('.fndtn.tooltip');
            this.S(this.settings.tooltip_class).each(function (i) {
                $('[' + self.attr_name() + ']').eq(i).attr('title', $(this).text());
            }).remove();
        },
        reflow: function () { }
    };
}(jQuery, window, window.document));
;
(function ($, window, document, undefined) {
    Foundation.libs.dropdown = {
        name: 'dropdown',
        version: '5.4.4',
        settings: {
            active_class: 'open',
            mega_class: 'mega',
            align: 'bottom',
            is_hover: false,
            opened: function () { },
            closed: function () { }
        },
        init: function (scope, method, options) {
            Foundation.inherit(this, 'throttle');
            this.bindings(method, options);
        },
        events: function (scope) {
            var self = this, S = self.S;
            S(this.scope)
                .off('.dropdown')
                .on('click.fndtn.dropdown', '[' + this.attr_name() + ']', function (e) {
                var settings = S(this).data(self.attr_name(true) + '-init') || self.settings;
                if (!settings.is_hover || Modernizr.touch) {
                    e.preventDefault();
                    self.toggle($(this));
                }
            })
                .on('mouseenter.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
                var $this = S(this), dropdown, target;
                clearTimeout(self.timeout);
                if ($this.data(self.data_attr())) {
                    dropdown = S('#' + $this.data(self.data_attr()));
                    target = $this;
                }
                else {
                    dropdown = $this;
                    target = S("[" + self.attr_name() + "='" + dropdown.attr('id') + "']");
                }
                var settings = target.data(self.attr_name(true) + '-init') || self.settings;
                if (S(e.target).data(self.data_attr()) && settings.is_hover) {
                    self.closeall.call(self);
                }
                if (settings.is_hover)
                    self.open.apply(self, [dropdown, target]);
            })
                .on('mouseleave.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
                var $this = S(this);
                self.timeout = setTimeout(function () {
                    if ($this.data(self.data_attr())) {
                        var settings = $this.data(self.data_attr(true) + '-init') || self.settings;
                        if (settings.is_hover)
                            self.close.call(self, S('#' + $this.data(self.data_attr())));
                    }
                    else {
                        var target = S('[' + self.attr_name() + '="' + S(this).attr('id') + '"]'), settings = target.data(self.attr_name(true) + '-init') || self.settings;
                        if (settings.is_hover)
                            self.close.call(self, $this);
                    }
                }.bind(this), 150);
            })
                .on('click.fndtn.dropdown', function (e) {
                var parent = S(e.target).closest('[' + self.attr_name() + '-content]');
                if (S(e.target).closest('[' + self.attr_name() + ']').length > 0) {
                    return;
                }
                if (!(S(e.target).data('revealId')) &&
                    (parent.length > 0 && (S(e.target).is('[' + self.attr_name() + '-content]') ||
                        $.contains(parent.first()[0], e.target)))) {
                    e.stopPropagation();
                    return;
                }
                self.close.call(self, S('[' + self.attr_name() + '-content]'));
            })
                .on('opened.fndtn.dropdown', '[' + self.attr_name() + '-content]', function () {
                self.settings.opened.call(this);
            })
                .on('closed.fndtn.dropdown', '[' + self.attr_name() + '-content]', function () {
                self.settings.closed.call(this);
            });
            S(window)
                .off('.dropdown')
                .on('resize.fndtn.dropdown', self.throttle(function () {
                self.resize.call(self);
            }, 50));
            this.resize();
        },
        close: function (dropdown) {
            var self = this;
            dropdown.each(function () {
                var original_target = $('[' + self.attr_name() + '=' + dropdown[0].id + ']') || $('aria-controls=' + dropdown[0].id + ']');
                original_target.attr('aria-expanded', "false");
                if (self.S(this).hasClass(self.settings.active_class)) {
                    self.S(this)
                        .css(Foundation.rtl ? 'right' : 'left', '-99999px')
                        .attr('aria-hidden', "true")
                        .removeClass(self.settings.active_class)
                        .prev('[' + self.attr_name() + ']')
                        .removeClass(self.settings.active_class)
                        .removeData('target');
                    self.S(this).trigger('closed').trigger('closed.fndtn.dropdown', [dropdown]);
                }
            });
        },
        closeall: function () {
            var self = this;
            $.each(self.S('[' + this.attr_name() + '-content]'), function () {
                self.close.call(self, self.S(this));
            });
        },
        open: function (dropdown, target) {
            this
                .css(dropdown
                .addClass(this.settings.active_class), target);
            dropdown.prev('[' + this.attr_name() + ']').addClass(this.settings.active_class);
            dropdown.data('target', target.get(0)).trigger('opened').trigger('opened.fndtn.dropdown', [dropdown, target]);
            dropdown.attr('aria-hidden', 'false');
            target.attr('aria-expanded', 'true');
            dropdown.focus();
        },
        data_attr: function () {
            if (this.namespace.length > 0) {
                return this.namespace + '-' + this.name;
            }
            return this.name;
        },
        toggle: function (target) {
            var dropdown = this.S('#' + target.data(this.data_attr()));
            if (dropdown.length === 0) {
                return;
            }
            this.close.call(this, this.S('[' + this.attr_name() + '-content]').not(dropdown));
            if (dropdown.hasClass(this.settings.active_class)) {
                this.close.call(this, dropdown);
                if (dropdown.data('target') !== target.get(0))
                    this.open.call(this, dropdown, target);
            }
            else {
                this.open.call(this, dropdown, target);
            }
        },
        resize: function () {
            var dropdown = this.S('[' + this.attr_name() + '-content].open'), target = this.S("[" + this.attr_name() + "='" + dropdown.attr('id') + "']");
            if (dropdown.length && target.length) {
                this.css(dropdown, target);
            }
        },
        css: function (dropdown, target) {
            var left_offset = Math.max((target.width() - dropdown.width()) / 2, 8), settings = target.data(this.attr_name(true) + '-init') || this.settings;
            this.clear_idx();
            if (this.small()) {
                var p = this.dirs.bottom.call(dropdown, target, settings);
                dropdown.attr('style', '').removeClass('drop-left drop-right drop-top').css({
                    position: 'absolute',
                    width: '95%',
                    'max-width': 'none',
                    top: p.top
                });
                dropdown.css(Foundation.rtl ? 'right' : 'left', left_offset);
            }
            else {
                this.style(dropdown, target, settings);
            }
            return dropdown;
        },
        style: function (dropdown, target, settings) {
            var css = $.extend({ position: 'absolute' }, this.dirs[settings.align].call(dropdown, target, settings));
            dropdown.attr('style', '').css(css);
        },
        dirs: {
            _base: function (t) {
                var o_p = this.offsetParent(), o = o_p.offset(), p = t.offset();
                p.top -= o.top;
                p.left -= o.left;
                return p;
            },
            top: function (t, s) {
                var self = Foundation.libs.dropdown, p = self.dirs._base.call(this, t);
                this.addClass('drop-top');
                if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
                    self.adjust_pip(this, t, s, p);
                }
                if (Foundation.rtl) {
                    return { left: p.left - this.outerWidth() + t.outerWidth(),
                        top: p.top - this.outerHeight() };
                }
                return { left: p.left, top: p.top - this.outerHeight() };
            },
            bottom: function (t, s) {
                var self = Foundation.libs.dropdown, p = self.dirs._base.call(this, t);
                if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
                    self.adjust_pip(this, t, s, p);
                }
                if (self.rtl) {
                    return { left: p.left - this.outerWidth() + t.outerWidth(), top: p.top + t.outerHeight() };
                }
                return { left: p.left, top: p.top + t.outerHeight() };
            },
            left: function (t, s) {
                var p = Foundation.libs.dropdown.dirs._base.call(this, t);
                this.addClass('drop-left');
                return { left: p.left - this.outerWidth(), top: p.top };
            },
            right: function (t, s) {
                var p = Foundation.libs.dropdown.dirs._base.call(this, t);
                this.addClass('drop-right');
                return { left: p.left + t.outerWidth(), top: p.top };
            }
        },
        adjust_pip: function (dropdown, target, settings, position) {
            var sheet = Foundation.stylesheet, pip_offset_base = 8;
            if (dropdown.hasClass(settings.mega_class)) {
                pip_offset_base = position.left + (target.outerWidth() / 2) - 8;
            }
            else if (this.small()) {
                pip_offset_base += position.left - 8;
            }
            this.rule_idx = sheet.cssRules.length;
            var sel_before = '.f-dropdown.open:before', sel_after = '.f-dropdown.open:after', css_before = 'left: ' + pip_offset_base + 'px;', css_after = 'left: ' + (pip_offset_base - 1) + 'px;';
            if (sheet.insertRule) {
                sheet.insertRule([sel_before, '{', css_before, '}'].join(' '), this.rule_idx);
                sheet.insertRule([sel_after, '{', css_after, '}'].join(' '), this.rule_idx + 1);
            }
            else {
                sheet.addRule(sel_before, css_before, this.rule_idx);
                sheet.addRule(sel_after, css_after, this.rule_idx + 1);
            }
        },
        clear_idx: function () {
            var sheet = Foundation.stylesheet;
            if (this.rule_idx) {
                sheet.deleteRule(this.rule_idx);
                sheet.deleteRule(this.rule_idx);
                delete this.rule_idx;
            }
        },
        small: function () {
            return matchMedia(Foundation.media_queries.small).matches &&
                !matchMedia(Foundation.media_queries.medium).matches;
        },
        off: function () {
            this.S(this.scope).off('.fndtn.dropdown');
            this.S('html, body').off('.fndtn.dropdown');
            this.S(window).off('.fndtn.dropdown');
            this.S('[data-dropdown-content]').off('.fndtn.dropdown');
        },
        reflow: function () { }
    };
}(jQuery, window, window.document));
;
(function ($, window, document, undefined) {
    Foundation.libs.accordion = {
        name: 'accordion',
        version: '5.4.4',
        settings: {
            active_class: 'active',
            multi_expand: false,
            toggleable: true,
            callback: function () { }
        },
        init: function (scope, method, options) {
            this.bindings(method, options);
        },
        events: function () {
            var self = this;
            var S = this.S;
            S(this.scope)
                .off('.fndtn.accordion')
                .on('click.fndtn.accordion', '[' + this.attr_name() + '] > dd > a', function (e) {
                var accordion = S(this).closest('[' + self.attr_name() + ']'), groupSelector = self.attr_name() + '=' + accordion.attr(self.attr_name()), settings = accordion.data(self.attr_name(true) + '-init'), target = S('#' + this.href.split('#')[1]), aunts = $('> dd', accordion), siblings = aunts.children('.content'), active_content = siblings.filter('.' + settings.active_class);
                e.preventDefault();
                if (accordion.attr(self.attr_name())) {
                    siblings = siblings.add('[' + groupSelector + '] dd > .content');
                    aunts = aunts.add('[' + groupSelector + '] dd');
                }
                if (settings.toggleable && target.is(active_content)) {
                    target.parent('dd').toggleClass(settings.active_class, false);
                    target.toggleClass(settings.active_class, false);
                    settings.callback(target);
                    target.triggerHandler('toggled', [accordion]);
                    accordion.triggerHandler('toggled', [target]);
                    return;
                }
                if (!settings.multi_expand) {
                    siblings.removeClass(settings.active_class);
                    aunts.removeClass(settings.active_class);
                }
                target.addClass(settings.active_class).parent().addClass(settings.active_class);
                settings.callback(target);
                target.triggerHandler('toggled', [accordion]);
                accordion.triggerHandler('toggled', [target]);
            });
        },
        off: function () { },
        reflow: function () { }
    };
}(jQuery, window, window.document));
function Swipe(container, options) {
    var noop = function () { };
    var offloadFn = function (fn) { setTimeout(fn || noop, 0); };
    var paused = false;
    var browser = {
        addEventListener: !!window.addEventListener,
        touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
        transitions: (function (temp) {
            var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
            for (var i in props)
                if (temp.style[props[i]] !== undefined)
                    return true;
            return false;
        })(document.createElement('swipe'))
    };
    if (!container)
        return;
    var element = container.children[0];
    var slides, slidePos, width, length;
    options = options || {};
    var index = parseInt(options.startSlide, 10) || 0;
    var speed = options.speed || 300;
    options.continuous = options.continuous !== undefined ? options.continuous : true;
    function setup() {
        slides = element.children;
        length = slides.length;
        if (slides.length < 2)
            options.continuous = false;
        if (browser.transitions && options.continuous && slides.length < 3) {
            element.appendChild(slides[0].cloneNode(true));
            element.appendChild(element.children[1].cloneNode(true));
            slides = element.children;
        }
        slidePos = new Array(slides.length);
        width = container.getBoundingClientRect().width || container.offsetWidth;
        element.style.width = (slides.length * width) + 'px';
        var pos = slides.length;
        while (pos--) {
            var slide = slides[pos];
            slide.style.width = width + 'px';
            slide.setAttribute('data-index', pos);
            if (browser.transitions) {
                slide.style.left = (pos * -width) + 'px';
                move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
            }
        }
        if (options.continuous && browser.transitions) {
            move(circle(index - 1), -width, 0);
            move(circle(index + 1), width, 0);
        }
        if (!browser.transitions)
            element.style.left = (index * -width) + 'px';
        container.style.visibility = 'visible';
    }
    function prev() {
        if (options.continuous)
            slide(index - 1);
        else if (index)
            slide(index - 1);
    }
    function next() {
        if (options.continuous)
            slide(index + 1);
        else if (index < slides.length - 1)
            slide(index + 1);
    }
    function circle(index) {
        return (slides.length + (index % slides.length)) % slides.length;
    }
    function slide(to, slideSpeed) {
        if (index == to)
            return;
        if (browser.transitions) {
            var direction = Math.abs(index - to) / (index - to);
            if (options.continuous) {
                var natural_direction = direction;
                direction = -slidePos[circle(to)] / width;
                if (direction !== natural_direction)
                    to = -direction * slides.length + to;
            }
            var diff = Math.abs(index - to) - 1;
            while (diff--)
                move(circle((to > index ? to : index) - diff - 1), width * direction, 0);
            to = circle(to);
            move(index, width * direction, slideSpeed || speed);
            move(to, 0, slideSpeed || speed);
            if (options.continuous)
                move(circle(to - direction), -(width * direction), 0);
        }
        else {
            to = circle(to);
            animate(index * -width, to * -width, slideSpeed || speed);
        }
        index = to;
        offloadFn(options.callback && options.callback(index, slides[index]));
    }
    function move(index, dist, speed) {
        translate(index, dist, speed);
        slidePos[index] = dist;
    }
    function translate(index, dist, speed) {
        var slide = slides[index];
        var style = slide && slide.style;
        if (!style)
            return;
        style.webkitTransitionDuration =
            style.MozTransitionDuration =
                style.msTransitionDuration =
                    style.OTransitionDuration =
                        style.transitionDuration = speed + 'ms';
        style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
        style.msTransform =
            style.MozTransform =
                style.OTransform = 'translateX(' + dist + 'px)';
    }
    function animate(from, to, speed) {
        if (!speed) {
            element.style.left = to + 'px';
            return;
        }
        var start = new Date().getTime();
        var timer = setInterval(function () {
            var timeElap = new Date().getTime() - start;
            if (timeElap > speed) {
                element.style.left = to + 'px';
                if (!paused && delay)
                    begin();
                options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
                clearInterval(timer);
                return;
            }
            element.style.left = (((to - from) * (Math.floor((timeElap / speed) * 100) / 100)) + from) + 'px';
        }, 4);
    }
    var delay = options.auto > 0 ? options.auto : 0;
    var interval;
    function begin() {
        interval = setTimeout(next, delay);
    }
    function stop() {
        delay = 0;
        clearTimeout(interval);
    }
    var start = {};
    var delta = {};
    var isScrolling;
    var events = {
        handleEvent: function (event) {
            switch (event.type) {
                case 'touchstart':
                    this.start(event);
                    break;
                case 'touchmove':
                    this.move(event);
                    break;
                case 'touchend':
                    offloadFn(this.end(event));
                    break;
                case 'webkitTransitionEnd':
                case 'msTransitionEnd':
                case 'oTransitionEnd':
                case 'otransitionend':
                case 'transitionend':
                    offloadFn(this.transitionEnd(event));
                    break;
                case 'resize':
                    offloadFn(setup.call());
                    break;
            }
            if (options.stopPropagation)
                event.stopPropagation();
        },
        start: function (event) {
            var touches = event.touches[0];
            start = {
                x: touches.pageX,
                y: touches.pageY,
                time: new Date().getTime()
            };
            isScrolling = undefined;
            delta = {};
            element.addEventListener('touchmove', this, false);
            element.addEventListener('touchend', this, false);
        },
        move: function (event) {
            if (event.touches.length > 1 || event.scale && event.scale !== 1)
                return;
            if (options.disableScroll)
                event.preventDefault();
            var touches = event.touches[0];
            delta = {
                x: touches.pageX - start.x,
                y: touches.pageY - start.y
            };
            if (typeof isScrolling == 'undefined') {
                isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
            }
            if (!isScrolling) {
                event.preventDefault();
                stop();
                if (options.continuous) {
                    translate(circle(index - 1), delta.x + slidePos[circle(index - 1)], 0);
                    translate(index, delta.x + slidePos[index], 0);
                    translate(circle(index + 1), delta.x + slidePos[circle(index + 1)], 0);
                }
                else {
                    delta.x =
                        delta.x /
                            ((!index && delta.x > 0
                                || index == slides.length - 1
                                    && delta.x < 0) ?
                                (Math.abs(delta.x) / width + 1)
                                : 1);
                    translate(index - 1, delta.x + slidePos[index - 1], 0);
                    translate(index, delta.x + slidePos[index], 0);
                    translate(index + 1, delta.x + slidePos[index + 1], 0);
                }
            }
        },
        end: function (event) {
            var duration = new Date().getTime() - start.time;
            var isValidSlide = Number(duration) < 250
                && Math.abs(delta.x) > 20
                || Math.abs(delta.x) > width / 2;
            var isPastBounds = !index && delta.x > 0
                || index == slides.length - 1 && delta.x < 0;
            if (options.continuous)
                isPastBounds = false;
            var direction = delta.x < 0;
            if (!isScrolling) {
                if (isValidSlide && !isPastBounds) {
                    if (direction) {
                        if (options.continuous) {
                            move(circle(index - 1), -width, 0);
                            move(circle(index + 2), width, 0);
                        }
                        else {
                            move(index - 1, -width, 0);
                        }
                        move(index, slidePos[index] - width, speed);
                        move(circle(index + 1), slidePos[circle(index + 1)] - width, speed);
                        index = circle(index + 1);
                    }
                    else {
                        if (options.continuous) {
                            move(circle(index + 1), width, 0);
                            move(circle(index - 2), -width, 0);
                        }
                        else {
                            move(index + 1, width, 0);
                        }
                        move(index, slidePos[index] + width, speed);
                        move(circle(index - 1), slidePos[circle(index - 1)] + width, speed);
                        index = circle(index - 1);
                    }
                    options.callback && options.callback(index, slides[index]);
                }
                else {
                    if (options.continuous) {
                        move(circle(index - 1), -width, speed);
                        move(index, 0, speed);
                        move(circle(index + 1), width, speed);
                    }
                    else {
                        move(index - 1, -width, speed);
                        move(index, 0, speed);
                        move(index + 1, width, speed);
                    }
                }
            }
            element.removeEventListener('touchmove', events, false);
            element.removeEventListener('touchend', events, false);
        },
        transitionEnd: function (event) {
            if (parseInt(event.target.getAttribute('data-index'), 10) == index) {
                delay = options.auto || 0;
                if (!paused && delay)
                    begin();
                options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
            }
        }
    };
    setup();
    if (delay)
        begin();
    if (browser.addEventListener) {
        if (browser.touch)
            element.addEventListener('touchstart', events, false);
        if (browser.transitions) {
            element.addEventListener('webkitTransitionEnd', events, false);
            element.addEventListener('msTransitionEnd', events, false);
            element.addEventListener('oTransitionEnd', events, false);
            element.addEventListener('otransitionend', events, false);
            element.addEventListener('transitionend', events, false);
        }
        window.addEventListener('resize', events, false);
    }
    else {
        window.onresize = function () { setup(); };
    }
    return {
        setup: function () {
            setup();
        },
        start: function () {
            delay = options.auto || 0;
            paused = false;
            begin();
        },
        stop: function () {
            paused = true;
            stop();
        },
        slide: function (to, speed) {
            stop();
            slide(to, speed);
        },
        prev: function () {
            stop();
            prev();
        },
        next: function () {
            stop();
            next();
        },
        getPos: function () {
            return index;
        },
        getNumSlides: function () {
            return length;
        },
        kill: function () {
            stop();
            element.style.width = 'auto';
            element.style.left = 0;
            var pos = slides.length;
            while (pos--) {
                var slide = slides[pos];
                slide.style.width = '100%';
                slide.style.left = 0;
                if (browser.transitions)
                    translate(pos, 0, 0);
            }
            if (browser.addEventListener) {
                element.removeEventListener('touchstart', events, false);
                element.removeEventListener('webkitTransitionEnd', events, false);
                element.removeEventListener('msTransitionEnd', events, false);
                element.removeEventListener('oTransitionEnd', events, false);
                element.removeEventListener('otransitionend', events, false);
                element.removeEventListener('transitionend', events, false);
                window.removeEventListener('resize', events, false);
            }
            else {
                window.onresize = null;
            }
        }
    };
}
if (window.jQuery || window.Zepto) {
    (function ($) {
        $.fn.Swipe = function (params) {
            return this.each(function () {
                $(this).data('Swipe', new Swipe($(this)[0], params));
            });
        };
    })(window.jQuery || window.Zepto);
}
app.createSlider = function ($el) {
    var slider = Swipe($el[0], {
        auto: 0,
        transitionEnd: function () {
            $('.current-slide').text(slider.getPos() + 1);
        }
    });
    $('.solutions-slider-controls a').unbind();
    $('.solutions-slider-controls a').on('click', function (e) {
        e.preventDefault();
        var el = $(this);
        var direction = (el.hasClass('next') ? 'next' : 'prev');
        slider[direction]();
    });
    $('span.current-slide').text('1');
    $('.total-slides').text(slider.getNumSlides());
    return slider;
};
(function () {
    var sliderEl = document.getElementById('slider');
    var $sliderEl = $(sliderEl);
    var shouldShuffle = $sliderEl.data('shuffle');
    if (shouldShuffle) {
        var slides = $sliderEl.find('.slide');
        slides = slides.sort(function () {
            return 0.5 - Math.random();
        });
        $sliderEl.find('.swipe-wrap').html(slides);
    }
    app.slider = Swipe(sliderEl, {
        auto: $(sliderEl).data('timeout') || 0,
        transitionEnd: function () {
            var idx = app.slider.getPos();
            $('.slider-pager-active').removeClass('slider-pager-active');
            $('.slider-pager a:eq(' + idx + ')').addClass('slider-pager-active');
            $('.slider-item a[data-index="' + idx + '"]').parent().addClass('slider-pager-active');
        }
    });
    if (app.slider) {
        $(sliderEl).addClass('slider-loaded');
        var numSlides = app.slider.getNumSlides(), pagerHtml = "";
        for (var i = 0; i < numSlides; i++) {
            pagerHtml += "<a href='#" + i + "'>" + (i + 1) + "</a>";
        }
        $('.slider-pager').html(pagerHtml);
        $('.slider-pager a:first').addClass('slider-pager-active');
        $('.slider-controls').on('click', 'a', function (e) {
            e.preventDefault();
            app.slider.stop();
            var el = $(this);
            var direction = el.data('direction');
            var index = el.data('index');
            if (index >= 0) {
                app.slider.slide(index);
            }
            else {
                app.slider[direction]();
            }
        });
        $('.slider-pager').on('click', 'a', function (e) {
            e.preventDefault();
            var idx = this.href.split('#').pop();
            app.slider.slide(idx);
        });
        if ($sliderEl.data('pause-on-hover')) {
            $sliderEl.on('mouseenter', function () {
                app.slider.stop();
            }).on('mouseleave', function () {
                app.slider.start();
            });
        }
    }
})();
app.touchSupport = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch);
$('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $('body').toggleClass('nav-open');
});
$('.has-sub-nav > a').on('click', function (e) {
    if (app.touchSupport || window.innerWidth <= 768) {
        e.preventDefault();
        $('.sub-nav-open').not($(this).parent()).removeClass('sub-nav-open');
        $(this).parent().toggleClass('sub-nav-open');
    }
});
$('a[href*="download-manager"]').on('click', function (e) {
    e.preventDefault();
    window.location.href = e.currentTarget.href;
});
;
(function (e, t, n) {
    "$:nomunge";
    function c() { s = t[o](function () { r.each(function () { var t = e(this), n = t.width(), r = t.height(), i = e.data(this, a); if (n !== i.w || r !== i.h) {
        t.trigger(u, [i.w = n, i.h = r]);
    } }); c(); }, i[f]); }
    var r = e([]), i = e.resize = e.extend(e.resize, {}), s, o = "setTimeout", u = "resize", a = u + "-special-event", f = "delay", l = "throttleWindow";
    i[f] = 250;
    i[l] = true;
    e.event.special[u] = { setup: function () { if (!i[l] && this[o]) {
            return false;
        } var t = e(this); r = r.add(t); e.data(this, a, { w: t.width(), h: t.height() }); if (r.length === 1) {
            c();
        } }, teardown: function () { if (!i[l] && this[o]) {
            return false;
        } var t = e(this); r = r.not(t); t.removeData(a); if (!r.length) {
            clearTimeout(s);
        } }, add: function (t) { function s(t, i, s) { var o = e(this), u = e.data(this, a); u.w = i !== n ? i : o.width(); u.h = s !== n ? s : o.height(); if (typeof r == "function") {
            r.apply(this, arguments);
        } } if (!i[l] && this[o]) {
            return false;
        } var r; if (e.isFunction(t)) {
            r = t;
            return s;
        }
        else {
            r = t.handler;
            t.handler = s;
        } } };
})(jQuery, this);
(function ($) {
    $.timeago = function (timestamp) {
        if (timestamp instanceof Date) {
            return inWords(timestamp);
        }
        else if (typeof timestamp === "string") {
            return inWords($.timeago.parse(timestamp));
        }
        else if (typeof timestamp === "number") {
            return inWords(new Date(timestamp));
        }
        else {
            return inWords($.timeago.datetime(timestamp));
        }
    };
    var $t = $.timeago;
    $.extend($.timeago, {
        settings: {
            refreshMillis: 60000,
            allowFuture: false,
            localeTitle: false,
            cutoff: 0,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                seconds: "less than a minute",
                minute: "about a minute",
                minutes: "%d minutes",
                hour: "about an hour",
                hours: "about %d hours",
                day: "a day",
                days: "%d days",
                month: "about a month",
                months: "%d months",
                year: "about a year",
                years: "%d years",
                wordSeparator: " ",
                numbers: []
            }
        },
        inWords: function (distanceMillis) {
            var $l = this.settings.strings;
            var prefix = $l.prefixAgo;
            var suffix = $l.suffixAgo;
            if (this.settings.allowFuture) {
                if (distanceMillis < 0) {
                    prefix = $l.prefixFromNow;
                    suffix = $l.suffixFromNow;
                }
            }
            var seconds = Math.abs(distanceMillis) / 1000;
            var minutes = seconds / 60;
            var hours = minutes / 60;
            var days = hours / 24;
            var years = days / 365;
            function substitute(stringOrFunction, number) {
                var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
                var value = ($l.numbers && $l.numbers[number]) || number;
                return string.replace(/%d/i, value);
            }
            var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
                seconds < 90 && substitute($l.minute, 1) ||
                minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
                minutes < 90 && substitute($l.hour, 1) ||
                hours < 24 && substitute($l.hours, Math.round(hours)) ||
                hours < 42 && substitute($l.day, 1) ||
                days < 30 && substitute($l.days, Math.round(days)) ||
                days < 45 && substitute($l.month, 1) ||
                days < 365 && substitute($l.months, Math.round(days / 30)) ||
                years < 1.5 && substitute($l.year, 1) ||
                substitute($l.years, Math.round(years));
            var separator = $l.wordSeparator || "";
            if ($l.wordSeparator === undefined) {
                separator = " ";
            }
            return $.trim([prefix, words, suffix].join(separator));
        },
        parse: function (iso8601) {
            var s = $.trim(iso8601);
            s = s.replace(/\.\d+/, "");
            s = s.replace(/-/, "/").replace(/-/, "/");
            s = s.replace(/T/, " ").replace(/Z/, " UTC");
            s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
            s = s.replace(/([\+\-]\d\d)$/, " $100");
            return new Date(s);
        },
        datetime: function (elem) {
            var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
            return $t.parse(iso8601);
        },
        isTime: function (elem) {
            return $(elem).get(0).tagName.toLowerCase() === "time";
        }
    });
    var functions = {
        init: function () {
            var refresh_el = $.proxy(refresh, this);
            refresh_el();
            var $s = $t.settings;
            if ($s.refreshMillis > 0) {
                this._timeagoInterval = setInterval(refresh_el, $s.refreshMillis);
            }
        },
        update: function (time) {
            var parsedTime = $t.parse(time);
            $(this).data('timeago', { datetime: parsedTime });
            if ($t.settings.localeTitle)
                $(this).attr("title", parsedTime.toLocaleString());
            refresh.apply(this);
        },
        updateFromDOM: function () {
            $(this).data('timeago', { datetime: $t.parse($t.isTime(this) ? $(this).attr("datetime") : $(this).attr("title")) });
            refresh.apply(this);
        },
        dispose: function () {
            if (this._timeagoInterval) {
                window.clearInterval(this._timeagoInterval);
                this._timeagoInterval = null;
            }
        }
    };
    $.fn.timeago = function (action, options) {
        var fn = action ? functions[action] : functions.init;
        if (!fn) {
            throw new Error("Unknown function name '" + action + "' for timeago");
        }
        this.each(function () {
            fn.call(this, options);
        });
        return this;
    };
    function refresh() {
        var data = prepareData(this);
        var $s = $t.settings;
        if (!isNaN(data.datetime)) {
            if ($s.cutoff == 0 || distance(data.datetime) < $s.cutoff) {
                $(this).text(inWords(data.datetime));
            }
        }
        return this;
    }
    function prepareData(element) {
        element = $(element);
        if (!element.data("timeago")) {
            element.data("timeago", { datetime: $t.datetime(element) });
            var text = $.trim(element.text());
            if ($t.settings.localeTitle) {
                element.attr("title", element.data('timeago').datetime.toLocaleString());
            }
            else if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
                element.attr("title", text);
            }
        }
        return element.data("timeago");
    }
    function inWords(date) {
        return $t.inWords(distance(date));
    }
    function distance(date) {
        return (new Date().getTime() - date.getTime());
    }
    document.createElement("abbr");
    document.createElement("time");
}(jQuery));
(function (k, p, n) {
    k.fn.paging = function (v, w) {
        var t = this, s = { setOptions: function (b) {
                this.a = k.extend(this.a || { lapping: 0, perpage: 10, page: 1, refresh: { interval: 10, url: null }, format: "", onFormat: function () { }, onSelect: function () { return !0; }, onRefresh: function () { } }, b || {});
                this.a.lapping |= 0;
                this.a.perpage |= 0;
                null !== this.a.page && (this.a.page |= 0);
                1 > this.a.perpage && (this.a.perpage = 10);
                this.k && p.clearInterval(this.k);
                this.a.refresh.url && (this.k = p.setInterval(function (b) {
                    k.ajax({ url: b.a.refresh.url, success: function (g) {
                            if ("string" === typeof g)
                                try {
                                    g =
                                        k.parseJSON(g);
                                }
                                catch (f) {
                                    return;
                                }
                            b.a.onRefresh(g);
                        } });
                }, 1E3 * this.a.refresh.interval, this));
                this.l = function (b) {
                    for (var g = 0, f = 0, h = 1, d = { e: [], h: 0, g: 0, b: 5, d: 3, j: 0, m: 0 }, a, l = /[*<>pq\[\]().-]|[nc]+!?/g, k = { "[": "first", "]": "last", "<": "prev", ">": "next", q: "left", p: "right", "-": "fill", ".": "leap" }, e = {}; a = l.exec(b);) {
                        a = "" + a;
                        if (n === k[a])
                            if ("(" === a)
                                f = ++g;
                            else if (")" === a)
                                f = 0;
                            else {
                                if (h) {
                                    if ("*" === a) {
                                        d.h = 1;
                                        d.g = 0;
                                    }
                                    else {
                                        d.h = 0;
                                        d.g = "!" === a.charAt(a.length - 1);
                                        d.b = a.length - d.g;
                                        if (!(d.d = 1 + a.indexOf("c")))
                                            d.d = 1 + d.b >> 1;
                                    }
                                    d.e[d.e.length] =
                                        { f: "block", i: 0, c: 0 };
                                    h = 0;
                                }
                            }
                        else {
                            d.e[d.e.length] = { f: k[a], i: f, c: n === e[a] ? e[a] = 1 : ++e[a] };
                            "q" === a ? ++d.m : "p" === a && ++d.j;
                        }
                    }
                    return d;
                }(this.a.format);
                return this;
            }, setNumber: function (b) { this.o = n === b || 0 > b ? -1 : b; return this; }, setPage: function (b) {
                function q(b, a, c) { c = "" + b.onFormat.call(a, c); l = a.value ? l + c.replace("<a", '<a data-page="' + a.value + '"') : l + c; }
                if (n === b) {
                    if (b = this.a.page, null === b)
                        return this;
                }
                else if (this.a.page == b)
                    return this;
                this.a.page = b |= 0;
                var g = this.o, f = this.a, h, d, a, l, r = 1, e = this.l, c, i, j, m, u = e.e.length, o = u;
                f.perpage <= f.lapping && (f.lapping = f.perpage - 1);
                m = g <= f.lapping ? 0 : f.lapping | 0;
                0 > g ? (a = g = -1, h = Math.max(1, b - e.d + 1 - m), d = h + e.b) : (a = 1 + Math.ceil((g - f.perpage) / (f.perpage - m)), b = Math.max(1, Math.min(0 > b ? 1 + a + b : b, a)), e.h ? (h = 1, d = 1 + a, e.d = b, e.b = a) : (h = Math.max(1, Math.min(b - e.d, a - e.b) + 1), d = e.g ? h + e.b : Math.min(h + e.b, 1 + a)));
                for (; o--;) {
                    i = 0;
                    j = e.e[o];
                    switch (j.f) {
                        case "left":
                            i = j.c < h;
                            break;
                        case "right":
                            i = d <= a - e.j + j.c;
                            break;
                        case "first":
                            i = e.d < b;
                            break;
                        case "last":
                            i = e.b < e.d + a - b;
                            break;
                        case "prev":
                            i = 1 < b;
                            break;
                        case "next": i = b < a;
                    }
                    r |=
                        i << j.i;
                }
                c = { number: g, lapping: m, pages: a, perpage: f.perpage, page: b, slice: [(i = b * (f.perpage - m) + m) - f.perpage, Math.min(i, g)] };
                for (l = ""; ++o < u;) {
                    j = e.e[o];
                    i = r >> j.i & 1;
                    switch (j.f) {
                        case "block":
                            for (; h < d; ++h)
                                c.value = h, c.pos = 1 + e.b - d + h, c.active = h <= a || 0 > g, c.first = 1 === h, c.last = h == a && 0 < g, q(f, c, j.f);
                            continue;
                        case "left":
                            c.value = j.c;
                            c.active = j.c < h;
                            break;
                        case "right":
                            c.value = a - e.j + j.c;
                            c.active = d <= c.value;
                            break;
                        case "first":
                            c.value = 1;
                            c.active = i && 1 < b;
                            break;
                        case "prev":
                            c.value = Math.max(1, b - 1);
                            c.active = i && 1 < b;
                            break;
                        case "last":
                            (c.active =
                                0 > g) ? c.value = 1 + b : (c.value = a, c.active = i && b < a);
                            break;
                        case "next":
                            (c.active = 0 > g) ? c.value = 1 + b : (c.value = Math.min(1 + b, a), c.active = i && b < a);
                            break;
                        case "leap":
                        case "fill":
                            c.pos = j.c;
                            c.active = i;
                            q(f, c, j.f);
                            continue;
                    }
                    c.pos = j.c;
                    c.last = c.first = n;
                    q(f, c, j.f);
                }
                t.length && (k("a", t.html(l)).click(function (a) { a.preventDefault(); a = this; do
                    if ("a" === a.nodeName.toLowerCase())
                        break;
                while (a = a.parentNode); s.setPage(k(a).data("page")); if (s.n)
                    p.location = a.href; }), this.n = f.onSelect.call({ number: g, lapping: m, pages: a, slice: c.slice }, b));
                return this;
            } };
        return s.setNumber(v).setOptions(w).setPage();
    };
})(jQuery, this);
var ytEmbed = {
    ytQuery: 0,
    cl: 0,
    callback: {},
    cfg: {},
    player: false,
    init: function (cfg) {
        this.cfg = cfg || {};
        if (!this.cfg.key) {
            this.cfg.key = 'AIzaSyA8OmKcw2DMNkJicyCJ0vqvf90xgeH52zE';
        }
        if (!this.cfg.block) {
            this.message('Please set the block element in the config file.');
        }
        else {
            if (!this.cfg.type) {
                this.message('You must provide a type: search, user, playlist, featured in the insertVideos function.');
            }
            else if (!this.cfg.q && !this.cfg.id) {
                this.message('You must provide a query: search keywords, playlist ID, or username.');
            }
            else if (!this.cfg.key) {
                this.message('New: You must provide a Google Developer API key: <strong><a href="https://developers.google.com/youtube/registering_an_application">get key</a></strong>.');
            }
            else {
                var script = document.createElement('script');
                script.setAttribute('type', 'text/javascript');
                this.ytQuery++;
                if (!this.cfg.paging) {
                    this.cfg.paging = true;
                }
                if (!this.cfg.results) {
                    this.cfg.results = 10;
                }
                if (!this.cfg.meta) {
                    this.cfg.meta = false;
                }
                if (!this.cfg.order) {
                    this.cfg.orderby = 'relevance';
                    this.cfg.sortorder = 'descending';
                }
                if (!this.cfg.thumbnail) {
                    this.cfg.thumbnail = 200;
                }
                if (!this.cfg.height) {
                    this.cfg.height = 390;
                }
                if (!this.cfg.width) {
                    this.cfg.width = 640;
                }
                switch (this.cfg.order) {
                    case "new_first":
                        this.cfg.orderby = 'date';
                        break;
                    case "highest_rating":
                        this.cfg.orderby = 'rating';
                        break;
                    case "most_relevance":
                        this.cfg.orderby = 'relevance';
                        break;
                }
                var url = "https://www.googleapis.com";
                switch (this.cfg.type) {
                    case "search":
                        url += '/youtube/v3/search?q=' + this.cfg.q + '&type=video&callback=ytEmbed.callback[' + this.ytQuery + ']&order=' + this.cfg.orderby;
                        break;
                    case "user":
                        url += '/youtube/v3/channels?forUsername=' + this.cfg.q + '&callback=ytEmbed.callback[' + this.ytQuery + ']';
                        break;
                    case "playlist":
                        url += '/youtube/v3/playlistItems?playlistId=' + this.cfg.q + '&callback=ytEmbed.callback[' + this.ytQuery + ']&order=' + this.cfg.orderby;
                        break;
                    case "videos":
                        url += '/youtube/v3/videos?id=' + this.cfg.q + '&callback=ytEmbed.callback[' + this.ytQuery + ']&order=' + this.cfg.orderby;
                        break;
                    case "featured":
                        url += '/youtube/v3/videos?chart=mostPopular&callback=ytEmbed.callback[' + this.ytQuery + ']';
                        break;
                    case "channel":
                        url += '/youtube/v3/channels?id=' + this.cfg.q + '&callback=ytEmbed.callback[' + this.ytQuery + ']';
                        break;
                    default:
                        this.message('Unknown setting type. Use: search, playlist or user.');
                        return;
                        break;
                }
                if (this.cfg.type == "user" || this.cfg.type == "channel") {
                    url += '&part=contentDetails';
                }
                else if (this.cfg.type == "search" && this.cfg.meta) {
                    url += '&part=id';
                }
                else if (this.cfg.type == "search") {
                    url += '&part=snippet';
                }
                else if (this.cfg.type == "videos") {
                    url += '&part=snippet,contentDetails,statistics';
                }
                else {
                    url += '&part=snippet,contentDetails';
                }
                if (this.cfg.type == "user" || this.cfg.type == "channel") {
                    url += '&maxResults=1';
                }
                else if (this.cfg.results) {
                    url += '&maxResults=' + this.cfg.results;
                }
                if (this.cfg.pageToken) {
                    url += '&pageToken=' + this.cfg.pageToken;
                }
                url += '&key=' + this.cfg.key;
                url += '&prettyPrint=false';
                script.setAttribute('src', url);
                cfg.mC = this.ytQuery;
                if (this.cfg.type == "user" || this.cfg.type == "channel") {
                    this.callback[this.ytQuery] = function (json) {
                        if (json.pageInfo.totalResults == 1) {
                            var playlistId = json.items[0].contentDetails.relatedPlaylists.uploads;
                            cfg.type = 'playlist';
                            cfg.q = playlistId;
                            ytEmbed.init(cfg);
                        }
                        else {
                            ytEmbed.message('Can\'t find this user defined in q');
                        }
                    };
                }
                else if ((this.cfg.type == "playlist" || this.cfg.type == "search") && this.cfg.meta) {
                    this.callback[this.ytQuery] = function (json) {
                        if (json.items) {
                            var ids = '';
                            for (var i = 0; i < json.items.length; i++) {
                                if (json.items[i].snippet) {
                                    ids += json.items[i].snippet.resourceId.videoId + ",";
                                }
                                else if (json.items[i].id) {
                                    ids += json.items[i].id.videoId + ",";
                                }
                            }
                            cfg.type = 'videos';
                            cfg.q = ids;
                            ytEmbed.init(cfg);
                        }
                        else {
                            ytEmbed.message('An error occured:<br>' + json.error.message);
                        }
                    };
                }
                else {
                    this.callback[this.ytQuery] = function (json) {
                        ytEmbed.listVideos(json, cfg);
                    };
                }
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }
    },
    listVideos: function (json, cfg) {
        this.cfg = cfg;
        if (!this.cfg.player) {
            this.cfg.player = 'embed';
        }
        if (!this.cfg.layout) {
            this.cfg.layout = 'full';
        }
        var div = document.getElementById(this.cfg.block);
        var children = div.childNodes;
        for (var i = children.length; i > -1; i--) {
            if (children[i] && (children[i].className.indexOf("error") !== -1 || children[i].tagName === "UL")) {
                div.removeChild(children[i]);
            }
        }
        if (json.error) {
            this.message('An error occured:<br>' + json.error.message);
        }
        else if (json.items) {
            var ul = document.createElement('ul');
            ul.className = 'ytlist';
            var playlist = "";
            for (var i = 0; i < json.items.length; i++) {
                var entry = json.items[i];
                if (entry.snippet && entry.snippet.resourceId) {
                    var id = entry.snippet.resourceId.videoId;
                }
                else if (entry.id.videoId) {
                    var id = entry.id.videoId;
                }
                else {
                    var id = entry.id;
                }
                if (id) {
                    playlist += id + ",";
                }
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.className = 'clip';
                if (this.cfg.player == 'embed') {
                    if (this.cfg.parent) {
                    }
                    else {
                    }
                    a.style.cursor = 'pointer';
                    if (a.addEventListener) {
                        a.addEventListener('click', this.playVideo.bind(this, {
                            'id': id,
                            'cfg': cfg
                        }), false);
                    }
                    else if (a.attachEvent) {
                        a.attachEvent('onclick', this.playVideo.bind(this, {
                            'id': id,
                            'cfg': cfg
                        }));
                    }
                }
                else {
                    a.setAttribute('href', app.baseUrl + '/video/youtube/' + id);
                }
                var span = document.createElement('span');
                a.appendChild(span);
                var img = document.createElement('img');
                img.setAttribute('src', (entry.snippet.thumbnails ? entry.snippet.thumbnails.medium.url : ''));
                span.appendChild(img);
                var em = document.createElement('em');
                span.appendChild(em);
                if (this.cfg.layout == 'thumbnails') {
                    li.className = 'small';
                    li.appendChild(a);
                }
                else {
                    li.innerHTML = '<table cellspacing="0" cellpadding="0" border="0"><tr><td valign="top" rowspan="2"></td><td valign="top"><h3>' + entry.snippet.title + '</h3><span>' + this.formatDescription(entry.snippet.description) + '</span></td><td valign="top" style="width: 150px" class="meta"><div>' + (entry.contentDetails ? 'Duration: ' + ytEmbed.formatDuration(entry.contentDetails.duration) + '<br>' : '') + (entry.statistics ? 'Views: ' + entry.statistics.viewCount + '<br>' : '') + 'From: <a href="http://www.youtube.com/channel/' + entry.snippet.channelId + '">' + entry.snippet.channelTitle + '</a></div></td></tr></table>';
                    li.firstChild.firstChild.firstChild.firstChild.appendChild(a);
                }
                ul.appendChild(li);
            }
            if (this.cfg.position == "fixed_bottom") {
                div.style.position = "fixed";
                div.style.bottom = '0px';
                div.style.left = '0px';
            }
            div.innerHTML = "";
            div.appendChild(ul);
            if (this.cfg.playlist == true) {
                this.cfg.playerVars.playlist = playlist.substr(0, playlist.length - 1);
            }
            if (this.cfg.player == "embed" && this.cfg.display_first == true) {
                ytPlayerParams.videoId = id;
                if (this.cfg.playerVars) {
                    ytPlayerParams.playerVars = this.cfg.playerVars;
                }
                this.player = this.createPlayer(this.cfg);
            }
            if (this.cfg.paging == true && json.nextPageToken) {
                this.cfg.display_first = false;
                var pul = document.createElement('ul');
                pul.setAttribute('id', 'ytPage');
                if (json.nextPageToken) {
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    a.className = 'ytNext';
                    a.style.cursor = 'pointer';
                    li.appendChild(a);
                    if (a.addEventListener) {
                        a.addEventListener('click', ytEmbed.loadNext.bind(this, {
                            cfg: cfg,
                            token: json.nextPageToken
                        }), false);
                    }
                    a.innerHTML = 'Load next...';
                    li.appendChild(a);
                    pul.appendChild(li);
                }
                if (json.prevPageToken) {
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    a.setAttribute('class', 'ytPrev');
                    a.style.cursor = 'pointer';
                    if (a.addEventListener) {
                        a.addEventListener('click', ytEmbed.loadPrevious.bind(this, {
                            cfg: cfg,
                            token: json.prevPageToken
                        }), false);
                    }
                    a.innerHTML = 'Load previous...';
                    li.appendChild(a);
                    pul.appendChild(li);
                }
                div.appendChild(pul);
            }
        }
        else {
            this.message('No YouTube videos found for your query:<br>Type:\'' + this.cfg.type + '\'<br>Query: \'' + this.cfg.q + '\'');
        }
    },
    createPlayer: function (cfg) {
        var div = document.getElementById(cfg.block);
        var hold = document.createElement('div');
        hold.className = 'ytPlayer';
        var iframe = document.createElement('iframe');
        iframe.setAttribute('id', cfg.block + 'Player');
        iframe.setAttribute('width', cfg.width);
        iframe.setAttribute('height', cfg.height);
        iframe.setAttribute('frameBorder', '0');
        iframe.setAttribute('src', 'http://www.youtube.com/embed/' + ytPlayerParams.videoId + '?autoplay=' + ytPlayerParams.autoplay + '&modestbranding=1');
        hold.appendChild(iframe);
        div.insertBefore(hold, div.firstChild);
        return iframe;
    },
    formatRating: function (rt, rc) {
    },
    formatDuration: function (dr) {
        return dr.replace(/(M|H)/g, ':').replace("S", "").substr(2);
    },
    formatDescription: function (ds) {
        if (ds) {
            if (ds.length > 255) {
                return ds.substr(0, 252) + '...';
            }
            else {
                return ds;
            }
        }
        else {
            return "No description available.";
        }
    },
    formatDate: function (dt) {
        if (dt) {
            return dt.substr(0, 10);
        }
        else {
            return "unknown";
        }
    },
    mousOverImage: function (a, b, c) {
    },
    mouseOutImage: function (a, b) {
    },
    loadNext: function (data) {
        data.cfg.pageToken = data.token;
        ytEmbed.init(data.cfg);
    },
    loadPrevious: function (data) {
        data.cfg.pageToken = data.token;
        ytEmbed.init(data.cfg);
    },
    sortList: function (json) {
    },
    playVideo: function (data) {
        console.log(data);
        if (data.cfg.parent) {
            var player = document.getElementById(data.cfg.parent + "Player");
        }
        else {
            var player = document.getElementById(data.cfg.block + "Player");
        }
        if (!player) {
            ytPlayerParams.videoId = data.id;
            ytPlayerParams.autoplay = 1;
            this.createPlayer(data.cfg);
        }
        else {
            player.setAttribute('src', 'http://www.youtube.com/embed/' + data.id + '?autoplay=1&modestbranding=1&origin=' + document.location.protocol + '//' + document.location.hostname);
        }
    },
    test: function (e, b) {
        console.log(e);
        console.log(b);
        console.log(this.cfg.block);
    },
    onPlayerReady: function (id) {
    },
    onPlayerStateChange: function (id) {
    },
    message: function (msg) {
        if (!ytEmbed.cfg.block) {
        }
        else {
            document.getElementById(ytEmbed.cfg.block).innerHTML = '<div class="error">' + msg + '</div>';
        }
    }
};
var ytPlayer;
var ytPlayerParams = {
    autoplay: 0,
    modestbranding: 1,
    events: {
        'onReady': ytEmbed.onPlayerReady,
        'onStateChange': ytEmbed.onPlayerStateChange
    }
};
/*!
* Clamp.js 0.5.1
*
* Copyright 2011-2013, Joseph Schmitt http://joe.sh
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*/
(function () {
    function clamp(element, options) {
        options = options || {};
        var self = this, win = window, opt = {
            clamp: options.clamp || 2,
            useNativeClamp: typeof (options.useNativeClamp) != 'undefined' ? options.useNativeClamp : true,
            splitOnChars: options.splitOnChars || ['.', '-', '–', '—', ' '],
            animate: options.animate || false,
            truncationChar: options.truncationChar || '…',
            truncationHTML: options.truncationHTML
        }, sty = element.style, originalText = element.innerHTML, supportsNativeClamp = typeof (element.style.webkitLineClamp) != 'undefined', clampValue = opt.clamp, isCSSValue = clampValue.indexOf && (clampValue.indexOf('px') > -1 || clampValue.indexOf('em') > -1), truncationHTMLContainer;
        if (opt.truncationHTML) {
            truncationHTMLContainer = document.createElement('span');
            truncationHTMLContainer.innerHTML = opt.truncationHTML;
        }
        function computeStyle(elem, prop) {
            if (!win.getComputedStyle) {
                win.getComputedStyle = function (el, pseudo) {
                    this.el = el;
                    this.getPropertyValue = function (prop) {
                        var re = /(\-([a-z]){1})/g;
                        if (prop == 'float')
                            prop = 'styleFloat';
                        if (re.test(prop)) {
                            prop = prop.replace(re, function () {
                                return arguments[2].toUpperCase();
                            });
                        }
                        return el.currentStyle && el.currentStyle[prop] ? el.currentStyle[prop] : null;
                    };
                    return this;
                };
            }
            return win.getComputedStyle(elem, null).getPropertyValue(prop);
        }
        function getMaxLines(height) {
            var availHeight = height || element.clientHeight;
            var lineHeight = getLineHeight(element);
            var returnVal = Math.max(Math.floor(availHeight / lineHeight), 0);
            return returnVal;
        }
        function getMaxHeight(clmp) {
            var lineHeight = getLineHeight(element);
            var reminder = lineHeight % 2;
            var compVal = reminder == 0 ? 0 : 1;
            var returnVal = Math.floor(lineHeight * clmp) + compVal;
            return returnVal;
        }
        function getLineHeight(elem) {
            var lh = computeStyle(elem, 'line-height');
            if (lh == 'normal') {
                lh = parseInt(computeStyle(elem, 'font-size')) * 1.1;
            }
            return parseInt(lh);
        }
        var splitOnChars = opt.splitOnChars.slice(0), splitChar = splitOnChars[0], chunks, lastChunk;
        function getLastChild(elem) {
            if (elem.lastChild.children && elem.lastChild.children.length > 0) {
                return getLastChild(Array.prototype.slice.call(elem.children).pop());
            }
            else if (!elem.lastChild || !elem.lastChild.nodeValue || elem.lastChild.nodeValue == '' || elem.lastChild.nodeValue == opt.truncationChar) {
                elem.lastChild.parentNode.removeChild(elem.lastChild);
                return getLastChild(element);
            }
            else {
                return elem.lastChild;
            }
        }
        function truncate(target, maxHeight) {
            if (!maxHeight) {
                return;
            }
            function reset() {
                splitOnChars = opt.splitOnChars.slice(0);
                splitChar = splitOnChars[0];
                chunks = null;
                lastChunk = null;
            }
            var nodeValue = target.nodeValue.replace(opt.truncationChar, '');
            if (!chunks) {
                if (splitOnChars.length > 0) {
                    splitChar = splitOnChars.shift();
                }
                else {
                    splitChar = '';
                }
                chunks = nodeValue.split(splitChar);
            }
            if (chunks.length > 1) {
                lastChunk = chunks.pop();
                applyEllipsis(target, chunks.join(splitChar));
            }
            else {
                chunks = null;
            }
            if (truncationHTMLContainer) {
                target.nodeValue = target.nodeValue.replace(opt.truncationChar, '');
                element.innerHTML = target.nodeValue + ' ' + truncationHTMLContainer.innerHTML + opt.truncationChar;
            }
            if (chunks) {
                if (element.clientHeight <= maxHeight) {
                    if (splitOnChars.length >= 0 && splitChar != '') {
                        applyEllipsis(target, chunks.join(splitChar) + splitChar + lastChunk);
                        chunks = null;
                    }
                    else {
                        return element.innerHTML;
                    }
                }
            }
            else {
                if (splitChar == '') {
                    applyEllipsis(target, '');
                    target = getLastChild(element);
                    reset();
                }
            }
            if (opt.animate) {
                setTimeout(function () {
                    truncate(target, maxHeight);
                }, opt.animate === true ? 10 : opt.animate);
            }
            else {
                return truncate(target, maxHeight);
            }
        }
        function applyEllipsis(elem, str) {
            elem.nodeValue = str + opt.truncationChar;
        }
        if (clampValue == 'auto') {
            clampValue = getMaxLines();
        }
        else if (isCSSValue) {
            clampValue = getMaxLines(parseInt(clampValue));
        }
        var clampedText;
        if (supportsNativeClamp && opt.useNativeClamp) {
            sty.overflow = 'hidden';
            sty.textOverflow = 'ellipsis';
            sty.webkitBoxOrient = 'vertical';
            sty.display = '-webkit-box';
            sty.webkitLineClamp = clampValue;
            if (isCSSValue) {
                sty.height = opt.clamp + 'px';
            }
        }
        else {
            var height = getMaxHeight(clampValue);
            var tmpClientHeight = element.clientHeight;
            if (height < tmpClientHeight) {
                clampedText = truncate(getLastChild(element), height);
            }
        }
        return {
            'original': originalText,
            'clamped': clampedText
        };
    }
    window.$clamp = clamp;
})();
$(function () {
    var $clampItems = $("[class^='line-clamp-']");
    $clampItems.each(function () {
        var $tmpItem = $(this);
        var testClass = $tmpItem.attr("class");
        var lineCountArray = testClass.split("-");
        var testLineCount = parseInt(lineCountArray[lineCountArray.length - 1], 10);
        if (!isNaN(testLineCount)) {
            if (testLineCount <= 10 && testLineCount >= 1) {
                $clamp($tmpItem.get(0), { clamp: testLineCount, useNativeClamp: true });
            }
        }
    });
});
app.termsAndConditions = {
    urlParam: function (name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (!!results) {
            return results[1] || 0;
        }
        else {
            return null;
        }
    },
    download: function () {
        var tcUser = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcUser'));
        var whenSigned = app.termsAndConditions.urlParam('tcWhenSigned') || '';
        var tcWhenSigned = $.encoder.canonicalize(whenSigned).replace(/\+/g, ' ');
        var tcEndsIn = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcEndsIn'));
        var tcDownloadURL = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcDownloadURL'));
        var tcDownloadFileName = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcDownloadFileName'));
        var product = $.encoder.canonicalize(app.termsAndConditions.urlParam('p'));
        var tcProduct = $.encoder.canonicalize(product) || '';
        tcProduct = tcProduct.replace(/\+/g, ' ');
        if (tcWhenSigned) {
            $("#tcWhenSigned").html($.encoder.encodeForHTML(tcWhenSigned));
        }
        if (tcProduct) {
            $("h2#thank-you").append($.encoder.encodeForHTML(" " + tcProduct));
        }
        if (!tcWhenSigned) {
            $('.downloadthankyou p, .thankyoupanels').hide();
            $('#download-problems').show();
        }
        if (tcEndsIn) {
            if (tcEndsIn == "1") {
                $("#tcEndsIn").html("one day ");
            }
            else {
                $("#tcEndsIn").html($.encoder.encodeForHTML(tcEndsIn) + " days ");
            }
        }
        if (tcDownloadFileName) {
            $('div#downloadthankyou').show('slow');
            $('.pending-download-box').addClass('download-completed-box');
            $('.pending-download').removeClass('active').addClass('download-completed');
        }
        if (tcDownloadURL &&
            tcDownloadURL.startsWith('https://access.cdn.redhat.com/') &&
            tcDownloadURL.contains(tcDownloadFileName) && !checkRecentDownload()) {
            tcDownloadURL = $.encoder.canonicalize(window.location.href.substr(window.location.href.indexOf("tcDownloadURL=") + 14));
            $("a#tcDownloadLink").attr("href", tcDownloadURL);
            if (tcDownloadFileName) {
                $("#tcDownloadFileName").html($.encoder.encodeForHTML(tcDownloadFileName));
            }
            $.fileDownload(tcDownloadURL);
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ 'product_download_file_name': tcDownloadFileName });
            window.dataLayer.push({ 'event': 'Product Download Requested' });
        }
        var ddDownloadEvent = {
            eventInfo: {
                eventAction: 'download',
                eventName: 'download',
                fileName: tcDownloadFileName,
                fileType: tcProduct,
                productDetail: tcProduct,
                timeStamp: new Date(),
                processed: {
                    adobeAnalytics: false
                }
            }
        };
        window.digitalData = window.digitalData || {};
        digitalData.event = digitalData.event || [];
        digitalData.event.push(ddDownloadEvent);
        sendCustomEvent('downloadEvent');
        function setRecentUrlValue() {
            var referrerDownload = { value: window.location.href, timestamp: new Date().getTime() };
            localStorage.setItem("recent-download-url", JSON.stringify(referrerDownload));
        }
        function checkRecentDownload() {
            var storageExpiration = 600000;
            if (window.location.href.indexOf('download-manager') > 0 && window.location.pathname.match(/.*\/products\/.*\/hello-world\/?/g)) {
                if (window.localStorage.getItem('recent-download-url')) {
                    var recentDownload, timeOfRefer, currentTime;
                    recentDownload = JSON.parse(window.localStorage.getItem('recent-download-url'));
                    timeOfRefer = recentDownload && recentDownload.hasOwnProperty('timestamp') ? recentDownload['timestamp'] : 0;
                    currentTime = new Date().getTime();
                    if (currentTime - timeOfRefer > storageExpiration) {
                        setRecentUrlValue();
                        return false;
                    }
                    if (recentDownload['value'] !== window.location.href) {
                        setRecentUrlValue();
                        return false;
                    }
                    return true;
                }
                else {
                    setRecentUrlValue();
                    return false;
                }
            }
        }
    },
    callback: function (data) {
        if (data.tac.accepted) {
            var dateParsed = new Date(data.tac.acceptanceTimestamp);
            data.tac.acceptanceTimestamp = dateParsed.toISOString().substr(0, 10);
            var newHtml = app.templates.termsAndConditionsTemplate.template(data.tac);
            $('#_developer_program_terms_conditions').before(newHtml);
        }
    },
    banner: function () {
        app.dcp.authStatus().done(function (data) {
            if (data.authenticated) {
                var tac = document.createElement('script');
                tac.type = 'text/javascript';
                tac.async = true;
                tac.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'developer.jboss.org/api/custom/v1/account/info?callback=app.termsAndConditions.callback';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(tac, s);
            }
        });
    }
};
$(function () {
    if ($('#_developer_program_terms_conditions').length) {
        app.termsAndConditions.banner();
    }
});
var search = angular.module('search', ['ngSanitize']), searchRefinement = [];
function indexOfObjectValueInArray(arr, key, val) {
    idx = -1;
    for (var i = 0, l = arr.length; i < l; i++) {
        if (arr[i][key] && arr[i][key] === val) {
            idx = i;
        }
    }
    return idx;
}
search.service('searchService', ['$http', '$q', function ($http, $q) {
        this.getSearchResults = function (params) {
            var deferred = $q.defer();
            if ((/stack-overflow/.test(window.location.href)) || (/help/.test(window.location.href))) {
                var isStackOverflow = true;
            }
            if (isStackOverflow) {
                var search = Object.assign(params, {
                    field: ["sys_url_view", "sys_title", "is_answered", "author", "sys_tags", "answers", "sys_created", "view_count", "answer_count", "down_vote_count", "up_vote_count", "sys_content"],
                    query_highlight: true
                });
                var endpoint = app.dcp.url.stackoverflow;
            }
            else {
                var search = Object.assign(params, {
                    query_highlight: true,
                    type: ['rht_website', 'jbossdeveloper_quickstart', 'jbossdeveloper_demo', 'jbossdeveloper_bom', 'jbossdeveloper_archetype', 'jbossdeveloper_example', 'jbossdeveloper_vimeo', 'jbossdeveloper_youtube', 'jbossdeveloper_book', 'jbossdeveloper_event', 'rht_knowledgebase_article', 'rht_knowledgebase_solution', 'stackoverflow_question', 'jbossorg_sbs_forum', 'jbossorg_blog', 'rht_apidocs']
                });
                var endpoint = app.dcp.url.developer_materials;
            }
            $http.get(endpoint, { params: search })
                .success(function (data) {
                deferred.resolve(data);
            })
                .error(function (err) {
                throw new Error(err);
            });
            return deferred.promise;
        };
    }]);
search.directive('resourceType', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            if (attrs.resourceType == 'solution')
                element.attr("target", "_blank");
            else
                element.attr("target", "_self");
        }
    };
});
search.filter('timeAgo', function () {
    return function (timestamp) {
        if (!timestamp)
            return;
        var date = new Date(timestamp);
        return $.timeago(date);
    };
});
search.filter('type', function () {
    return function (sys_type) {
        var types = {
            video: 'Video',
            blogpost: 'Blog Post',
            book: 'Book',
            article: 'Article',
            solution: 'Article',
            demo: 'Demo',
            event: 'Event',
            quickstart: 'Quickstart',
            quickstart_early_access: 'Demo',
            forumthread: 'Forum Thread',
            stackoverflow_thread: 'Stack Overflow',
            webpage: 'Webpage',
            jbossdeveloper_quickstart: 'Quickstart',
            jbossdeveloper_demo: 'Demo',
            jbossdeveloper_bom: 'Bom',
            jbossdeveloper_archetype: 'Archetype',
            jbossdeveloper_example: 'Demo',
            jbossdeveloper_vimeo: 'Video',
            jbossdeveloper_youtube: 'Video',
            jbossdeveloper_book: 'Book',
            jbossdeveloper_event: 'Event',
            rht_knowledgebase_article: 'Article',
            rht_knowledgebase_solution: 'Article',
            stackoverflow_question: 'Stack Overflow',
            jbossorg_sbs_forum: 'Forum Thread',
            jbossorg_blog: 'Blog Post',
            rht_website: 'Website',
            rht_apidocs: 'Docs & APIs'
        };
        return types[sys_type];
    };
});
search.filter('MDY', function () {
    return function (timestamp) {
        if (!timestamp)
            return;
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var d = new Date(timestamp);
        var date = new Date([d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()].join('-'));
        window.date = date;
        if (!!window.location.href.match(/\/search/)) {
            return " | " + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
        }
        ;
        return months[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear();
    };
});
search.filter('timestamp', function () {
    return function (timestamp) {
        var date = new Date(timestamp);
        return date.getTime();
    };
});
search.filter('wordcount', function () {
    return function (description) {
        description = description || '';
        var wordCount = 50;
        var peices = description.split(' ');
        peices = peices.slice(0, wordCount);
        return peices.join(' ') + (peices.length >= wordCount ? '…' : '');
    };
});
search.filter('icon', function () {
    return function (sys_type) {
        var icons = {
            video: 'icon-RHDev_-resources_icons_video',
            blogpost: 'icon-RHDev_-resources_icons_blogpost',
            jbossdeveloper_book: 'icon-RHDev_-resources_icons_book',
            book: 'icon-RHDev_-resources_icons_book',
            article: 'icon-RHDev_-resources_icons_article',
            solution: 'icon-RHDev_-resources_icons_article',
            demo: 'icon-RHDev_-resources_icons_demo',
            quickstart: 'icon-RHDev_-resources_icons_demo',
            jbossdeveloper_archetype: 'icon-RHDev_-resources_icons_demo',
            jbossdeveloper_bom: 'icon-RHDev_-resources_icons_demo',
            quickstart_early_access: 'icon-RHDev_-resources_icons_demo',
            jbossdeveloper_example: 'icon-RHDev_-resources_icons_getstarted'
        };
        return icons[sys_type] || icons.blog;
    };
});
search.filter('broker', function () {
    return function (url) {
        if (url && url.match('access.redhat.com')) {
            return app.dcp.url.broker + encodeURIComponent(url);
        }
        return url;
    };
});
search.filter('jbossfix', function () {
    return function (url) {
        var matcher = new RegExp('http(s)?:\/\/(www.)?jboss.org', 'gi');
        if (url && url.match(matcher)) {
            return url.replace(matcher, 'https://developer.redhat.com');
        }
        return url;
    };
});
search.filter('tagGroup', function () {
    return function (tag) {
        var modifiedTags = [];
        var matcher = new RegExp('feed_group_name_.*|feed_name_.*|red hat|redhat');
        angular.forEach(tag, function (value) {
            if (!value.match(matcher))
                modifiedTags.push(value);
        });
        return modifiedTags;
    };
});
search.filter('title', ['$sce', function ($sce) {
        return function (result) {
            if (result.highlight && result.highlight.sys_title) {
                return $sce.trustAsHtml(result.highlight.sys_title[0]);
            }
            return $sce.trustAsHtml(result.fields.sys_title[0]);
        };
    }]);
search.filter('description', ['$sce', '$sanitize', function ($sce, $sanitize) {
        return function (result) {
            var description = "";
            if (result.highlight && result.highlight.sys_content_plaintext) {
                description = result.highlight.sys_content_plaintext.join('...');
            }
            else if (result.highlight && result.highlight.sys_description) {
                description = result.highlight.sys_description[0];
            }
            else if (!result.highlight && result.fields.sys_content_plaintext) {
                description = result.fields.sys_content_plaintext[0];
            }
            else {
                description = result.fields.sys_description[0];
            }
            return description;
        };
    }]);
search.filter('question', ['$sce', function ($sce) {
        return function (result) {
            if (result.highlight && result.highlight._source.sys_content_plaintext) {
                return $sce.trustAsHtml(result.highlight._source.sys_content_plaintext[0].replace(/<[^>]+>/gm, ''));
            }
            return $sce.trustAsHtml(result._source.sys_content_plaintext.replace(/<[^>]+>/gm, ''));
        };
    }]);
search.filter('htmlToPlaintext', ['$sce', function ($sce) {
        return function (result) {
            return String(result).replace(/<[^>]+>/gm, '');
        };
    }]);
search.filter('author', ['$sce', function ($sce) {
        return function (result) {
            var authorName = result._source.author.split('-')[0];
            return authorName;
        };
    }]);
search.filter('stackDate', ['$sce', function ($sce) {
        return function (result) {
            var time = jQuery.timeago(new Date((result._source.sys_created / 1000) * 1000));
            return time;
        };
    }]);
search.controller('SearchController', ['$scope', '$window', 'searchService', searchCtrlFunc]);
function searchCtrlFunc($scope, $window, searchService) {
    var isStackOverflow = ((/stack-overflow/.test(window.location.href)) || (/help/.test(window.location.href)));
    var isSearch = !!window.location.href.match(/\/search/);
    var searchTerm = window.location.search.split('=');
    var isFirstSearch = true;
    var q = '';
    $scope.data = {};
    $scope.filter = {};
    $scope.params = {
        sys_type: [],
        project: '',
        sortBy: 'relevance',
        size: 10,
        query: q,
        size10: true,
        from: 0,
        newFirst: false
    };
    $scope.$watch('params', function (newVal, oldVal) {
        var idx;
        if (newVal === oldVal) {
            return;
        }
        else {
            if (newVal.project !== oldVal.project) {
                idx = indexOfObjectValueInArray(searchRefinement, 'refinementType', 'product');
                if (idx < 0) {
                    searchRefinement.push({ refinementType: 'product', refinementValue: $scope.params.project });
                }
                else {
                    if ($scope.params.project.length > 0) {
                        searchRefinement[idx].refinementValue = $scope.params.project;
                    }
                    else {
                        searchRefinement = searchRefinement.splice(i, 1);
                    }
                }
            }
            if (newVal.sortBy !== oldVal.sortBy) {
                idx = indexOfObjectValueInArray(searchRefinement, 'refinementType', 'sort');
                if (idx < 0) {
                    searchRefinement.push({ refinementType: 'sort', refinementValue: $scope.params.sortBy });
                }
                else {
                    if ($scope.params.sortBy.length > 0) {
                        searchRefinement[idx].refinementValue = $scope.params.sortBy;
                    }
                    else {
                        searchRefinement = searchRefinement.splice(i, 1);
                    }
                }
            }
            if (newVal.publish_date_from !== oldVal.publish_date_from) {
                idx = indexOfObjectValueInArray(searchRefinement, 'refinementType', 'publish date');
                if (idx < 0) {
                    searchRefinement.push({ refinementType: 'publish date', refinementValue: $scope.params.publish_date_from });
                }
                else {
                    if ($scope.params.publish_date_from.length > 0) {
                        searchRefinement[idx].refinementValue = $scope.params.publish_date_from;
                    }
                    else {
                        searchRefinement = searchRefinement.splice(i, 1);
                    }
                }
            }
            if (newVal.sys_type[0] !== oldVal.sys_type[0]) {
                idx = indexOfObjectValueInArray(searchRefinement, 'refinementType', 'sys_type');
                if (idx < 0) {
                    searchRefinement.push({ refinementType: 'sys_type', refinementValue: $scope.params.sys_type[0] });
                }
                else {
                    if ($scope.params.sys_type[0].length > 0) {
                        searchRefinement[idx].refinementValue = $scope.params.sys_type[0];
                    }
                    else {
                        searchRefinement = searchRefinement.splice(i, 1);
                    }
                }
            }
        }
    }, true);
    if (isSearch && searchTerm) {
        $scope.params.filter_out_excluded = true;
        $scope.params.query = decodeURIComponent(searchTerm.pop().replace(/\+/g, ' '));
    }
    if (isStackOverflow && searchTerm) {
        var selectedProduct = $window.location.hash.replace('#!q=', '');
        $scope.params.product = selectedProduct;
        $scope.params.tag = [];
    }
    $scope.paginate = {
        currentPage: 1
    };
    $scope.loading = true;
    $scope.resetPagination = function () {
        $scope.params.from = 0;
        $scope.paginate.currentPage = 1;
    };
    $scope.cleanParams = function (p) {
        var params = Object.assign({}, p);
        if (params.publish_date_from && params.publish_date_from === 'custom') {
            params.publish_date_from = params.publish_date_from_custom;
        }
        else {
            delete params.publish_date_from_custom;
            delete params.publish_date_to;
        }
        if (params.sortBy === "relevance") {
            params.newFirst = false;
        }
        else {
            params.newFirst = true;
        }
        delete params.sortBy;
        if (params.newFirst === false) {
            delete params.newFirst;
        }
        ['10', '25', '50', '100'].forEach(function (size) {
            delete params['size' + size];
        });
        params['size' + params.size] = true;
        if (isStackOverflow != true) {
            delete params.size;
        }
        return params;
    };
    $scope.updateSearch = function () {
        $scope.loading = true;
        $scope.query = $scope.params.query;
        $scope.tag = $scope.params.tag;
        var params = $scope.cleanParams($scope.params);
        if (params.sortBy === "relevance") {
            delete params.newFirst;
        }
        if (isSearch) {
            var searchPage = $window.location.protocol + '//' + $window.location.hostname + ($window.location.port ? (':' + $window.location.port) : '') + $window.location.pathname;
            history.pushState($scope.params, $scope.params.query, searchPage + '?q=' + $scope.params.query);
        }
        if (isStackOverflow) {
            if (window.location.href.indexOf('products') >= 0 && window.location.href.indexOf('help') >= 0) {
                if ($('#stackOverflowProduct').length) {
                    var product = $('#stackOverflowProduct').data('product');
                }
                else {
                    product = (window.location.href).split("/")[4];
                }
                $scope.params.product = product;
                var tags = app.products[product]['stackoverflow'];
                if (tags.AND) {
                    params.tag = tags.AND.tag_set_one.slice();
                    params.tags_and_logic = tags.AND.tag_set_two.slice();
                }
                else {
                    params.tag = tags.slice();
                }
            }
            else {
                var product = $('select[name="filter-by-product"]').val();
                if (params.product !== "") {
                    product = params.product;
                    var tags = app.products[product]['stackoverflow'];
                    if (tags.AND) {
                        params.tag = tags.AND.tag_set_one.slice();
                        params.tags_and_logic = tags.AND.tag_set_two.slice();
                    }
                    else {
                        params.tag = tags.slice();
                    }
                }
                window.location.hash = "#!q=" + params.product;
            }
        }
        if (!$scope.userFilters && $scope.data.restoredPage) {
            history.pushState("", document.title, window.location.pathname);
        }
        searchService.getSearchResults(params).then(function (data) {
            var digitalData = digitalData || { page: { listing: {}, category: {} }, event: [] }, types = {
                video: 'Video',
                blogpost: 'Blog Post',
                jbossdeveloper_book: 'Book',
                book: 'Book',
                article: 'Article',
                solution: 'Article',
                demo: 'Demo',
                quickstart: 'quickstart',
                jbossdeveloper_archetype: 'Demo',
                jbossdeveloper_bom: 'Demo',
                quickstart_early_access: 'Demo',
                jbossdeveloper_example: 'Get Started',
                jbossdeveloper_event: 'Event',
                jbossorg_sbs_forum: 'Forum',
                forumthread: 'Forum',
                stackoverflow_thread: 'Stack Overflow',
                webpage: 'Webpage'
            }, ddSearchEvent = {
                eventInfo: {
                    eventName: 'internal search',
                    eventAction: 'search',
                    listing: {
                        browseFilter: types[$scope.params.sys_type[0]] || "internal search",
                        query: $scope.params.query,
                        queryMethod: "system generated",
                        resultCount: data.hits.total,
                        resultsShown: $scope.params.size,
                        searchType: digitalData.page.category.primaryCategory || "",
                        refinement: searchRefinement
                    },
                    timeStamp: new Date(),
                    processed: {
                        adobeAnalytics: false
                    }
                }
            };
            if (!isFirstSearch) {
                ddSearchEvent.eventInfo.listing.listSorting = [{
                        sortAttribute: $scope.params.sortBy,
                        sortOrder: "descending"
                    }];
                ddSearchEvent.eventInfo.listing.queryMethod = $scope.params.query === "" ? "system generated" : "manual";
            }
            else {
                isFirstSearch = false;
            }
            digitalData.event.push(ddSearchEvent);
            digitalData.page.listing = ddSearchEvent.eventInfo.listing;
            sendCustomEvent('ajaxSearch');
            $scope.results = data.hits.hits;
            $scope.totalCount = data.hits.total;
            $scope.buildPagination();
            $scope.loading = false;
        });
    };
    $scope.filter.restore = function () {
        if (!window.location.hash) {
            $scope.updateSearch();
            return;
        }
        if (window.location.hash) {
            var hashFilters = window.location.hash.replace('#!', '');
            $scope.userFilters = deparam(hashFilters);
            switch (true) {
                case $scope.userFilters.type === "blog_posts":
                    $scope.params.sys_type = "blogpost";
                    break;
                case $scope.userFilters.type === "book":
                    $scope.params.sys_type = ["jbossdeveloper_book", "book"];
                    break;
                case $scope.userFilters.type === "code_artifact":
                    $scope.params.sys_type = ["demo", "quickstart", "jbossdeveloper_archetype", "jbossdeveloper_bom", "quickstart_early_access"];
                    break;
                case $scope.userFilters.type === "get_started":
                    $scope.params.sys_type = "jbossdeveloper_example";
                    break;
                case $scope.userFilters.type === "article_solution":
                    $scope.params.sys_type = ["solution", "article"];
                    break;
                case $scope.userFilters.type === "video":
                    $scope.params.sys_type = "video";
                    break;
                default:
                    break;
            }
            if ($scope.userFilters.product) {
                $scope.params.project = $scope.userFilters.product;
            }
            if ($scope.userFilters.q) {
                $scope.params.query = $scope.userFilters.q;
            }
            if ($scope.userFilters.publish_date_from) {
                $scope.params.publish_date_from = $scope.userFilters.publish_date_from;
            }
            if ($scope.userFilters.publish_date_from_custom) {
                $scope.params.publish_date_from_custom = $scope.userFilters.publish_date_from_custom;
            }
            if ($scope.userFilters.publish_date_to) {
                $scope.params.publish_date_to = $scope.userFilters.publish_date_to;
            }
            if ($scope.userFilters.sort) {
                $scope.params.sortBy = $scope.userFilters.sort;
            }
            if ($scope.userFilters.size) {
                $scope.params.size = $scope.userFilters.size;
            }
        }
        $scope.data.restoredPage = true;
        $scope.updateSearch();
    };
    $scope.urlFilters = function () {
        var filterParams = {};
        switch (true) {
            case $scope.params.sys_type.includes("blogpost"):
                filterParams.type = "blog_posts";
                break;
            case $scope.params.sys_type.includes("jbossdeveloper_book") || $scope.params.sys_type.includes("book"):
                filterParams.type = "book";
                break;
            case $scope.params.sys_type.includes("demo") || $scope.params.sys_type.includes("quickstart") || $scope.params.sys_type.includes("jbossdeveloper_archetype") || $scope.params.sys_type.includes("jbossdeveloper_bom") || $scope.params.sys_type.includes("quickstart_early_access"):
                filterParams.type = "code_artifact";
                break;
            case $scope.params.sys_type.includes("jbossdeveloper_example"):
                filterParams.type = "get_started";
                break;
            case $scope.params.sys_type.includes("solution") || $scope.params.sys_type.includes("article"):
                filterParams.type = "article_solution";
                break;
            case $scope.params.sys_type.includes("video"):
                filterParams.type = "video";
                break;
            default:
                break;
        }
        if ($scope.params.query) {
            filterParams.q = $scope.params.query;
        }
        if ($scope.params.project) {
            filterParams.product = $scope.params.project;
        }
        if ($scope.params.publish_date_from) {
            filterParams.publish_date_from = $scope.params.publish_date_from;
        }
        if ($scope.params.publish_date_from_custom) {
            filterParams.publish_date_from_custom = $scope.params.publish_date_from_custom;
        }
        if ($scope.params.publish_date_to) {
            filterParams.publish_date_to = $scope.params.publish_date_to;
        }
        if ($scope.params.size10 === false) {
            filterParams.size10 = $scope.params.size10;
        }
        if ($scope.params.from > 0) {
            filterParams.from = $scope.params.from;
        }
        if ($scope.params.sortBy === "relevance") {
            filterParams.sort = $scope.params.sortBy;
        }
        if ($scope.params.size > 10) {
            filterParams.size = $scope.params.size;
        }
        window.location.hash = "!" + $.param(filterParams);
        return filterParams;
    };
    $scope.buildPagination = function () {
        var page = $scope.paginate.currentPage;
        var startAt = (page * $scope.totalCount) - $scope.params.size;
        var endAt = page * $scope.params.size;
        var pages = Math.ceil($scope.totalCount / $scope.params.size);
        var lastVisible = parseFloat($scope.params.size) + $scope.params.from;
        if ($scope.totalCount < lastVisible) {
            lastVisible = $scope.totalCount;
        }
        $scope.paginate = {
            currentPage: page,
            pagesArray: app.utils.diplayPagination(page, pages, 4),
            pages: pages,
            lastVisible: lastVisible
        };
    };
    $scope.goToPage = function (page) {
        switch (page) {
            case 'first':
                page = 1;
                break;
            case 'prev':
                page = $scope.paginate.currentPage - 1;
                break;
            case 'next':
                page = $scope.paginate.currentPage + 1;
                break;
            case 'last':
                page = Math.ceil($scope.totalCount / $scope.params.size);
                break;
            default:
                break;
        }
        if (typeof page !== 'number')
            return;
        $scope.params.from = (page * $scope.params.size) - $scope.params.size;
        $scope.paginate.currentPage = page;
        $scope.updateSearch();
    };
    $scope.scrollPosition = function (page) {
        if (isSearch) {
            $(window).scrollTop(0);
        }
        if (!isSearch) {
            var element = document.getElementById("scrollPoint");
            element.scrollIntoView();
        }
    };
    $scope.toggleSelection = function toggleSelection(event) {
        var checkbox = event.target;
        var topicNames = checkbox.value.split(' ');
        if (checkbox.checked) {
            $scope.params.sys_type = topicNames;
        }
        else {
            if (typeof $scope.params.sys_type === "string") {
                var filterArr = [];
                filterArr.push($scope.params.sys_type);
                $scope.params.sys_type = filterArr;
            }
            topicNames.forEach(function (topic) {
                var idx = $scope.params.sys_type.indexOf(topic);
                $scope.params.sys_type.splice(idx, 1);
            });
        }
        $scope.updateSearch();
        $scope.resetPagination();
    };
    $scope.updateSearch();
}
app.os = {
    process: function () {
        $('dt').each(function () {
            var el = $(this);
            var text = el.text();
            var mac = new RegExp("\\bos\\ ?x\\b|\\bmac\\b", "gi");
            var windows = new RegExp("windows", "gi");
            var linux = new RegExp("\\blinux\\b|\\bunix\\b", "gi");
            if (text.match(mac)) {
                el.addClass('os-mac');
                el.next().addClass('os-mac');
            }
            if (text.match(windows)) {
                el.addClass('os-windows');
                el.next().addClass('os-windows');
            }
            if (text.match(linux)) {
                el.addClass('os-linux');
                el.next().addClass('os-linux');
            }
            if ($('.os-mac, .os-linux, .os-windows').length) {
                $('ul.os-selector').removeClass('hidden');
            }
            app.os.bind();
        });
    },
    detectOs: function () {
        if (navigator.platform.toUpperCase().indexOf('MAC') !== -1) {
            return "mac";
        }
        if (navigator.platform.toUpperCase().indexOf('WIN') !== -1) {
            return "windows";
        }
        if (navigator.platform.toUpperCase().indexOf('LINUX') !== -1 || navigator.appVersion.indexOf("X11") !== -1) {
            return "linux";
        }
        else {
            return "other";
        }
    },
    bind: function () {
        $('input[name="os"]').on('change', function () {
            var val = $(this).val();
            $('.os-mac, .os-windows, .os-linux').hide();
            $('dd.os-' + val).show();
        });
        var os = app.os.detectOs();
        (os === "other" ? "linux" : os);
        $('input#' + os).trigger('click').trigger('change');
    }
};
$(function () {
    if ($('dt').length) {
        app.os.process();
    }
});
$(function () {
    $('.share-this').on('click mouseover', function () {
        Socialite.load(this);
    });
    $('.share-this.visible-by-default').each(function () {
        Socialite.load(this);
    });
});
app.init = function () {
    $(document).foundation();
    $('table.demos a.view-more').on('click', function (e) {
        e.preventDefault();
        var el = $(this);
        el.toggleClass('open');
        el.parent().parent().next().find('p').slideToggle();
    });
    $('input[name="referrer"]').val(document.referrer);
};
app.equalizeBottoms = function ($selector) {
    $selector.first().on('resize', function (e) {
        $selector.css('height', 'auto');
        var heights = [];
        $selector.each(function () {
            var h = $(this).outerHeight();
            heights.push(h);
        });
        var maxHeight = Math.max.apply(Math, heights);
        $selector.css('height', maxHeight);
    });
    $selector.first().trigger('resize');
};
app.stickyNav = function (className, headerElement) {
    var nav = $('.' + className + '-nav');
    if (!nav.length) {
        return;
    }
    var win = $(window);
    var resizeTimer;
    var html = "";
    var top = nav.offset().top;
    var select = $("<select>").append('<option selected value="">Choose a section</option>');
    $('.' + className + ' ' + headerElement).each(function (i, el) {
        var replace_id = $(this).text().replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
        $(this).attr('id', replace_id);
        html += "<li><a href='#" + replace_id + "'>" + $(this).text() + "</a></li>";
        select.append("<option value='" + replace_id + "'>" + $(this).text() + "</option>");
    });
    nav.html(html);
    nav.after(select);
    win.on("resize", function (e) {
        nav.removeClass(className + "-nav-fixed").css('width', 'auto');
        top = nav.offset().top;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            positionNav();
        }, 500);
    });
    function positionNav() {
        if (win.scrollTop() >= (top)) {
            var width = nav.parent().width();
            nav.addClass(className + "-nav-fixed").css('width', width);
        }
        else {
            nav.removeClass(className + "-nav-fixed").css('width', 'auto');
        }
        $('.' + className + ' ' + headerElement).each(function () {
            var el = $(this);
            var id = el.attr('id');
            if (win.scrollTop() >= (el.offset().top - 15)) {
                $('a[href="#' + id + '"]').addClass('past-block');
            }
            else {
                $('a[href="#' + id + '"]').removeClass('past-block');
            }
        });
        $('.past-block').not(':last').removeClass('past-block');
    }
    win.on("scroll", function () {
        positionNav();
    });
    $(select).on('change', function () {
        var header = $(this).find('option:selected').val();
        window.location.hash = header;
    }).wrap('<div class="styled-select mobile-selector">');
    $('.transcript-toggle-more').on('click', function (e) {
        e.preventDefault();
        $('.transcript-wrap').toggleClass('transcript-wrap--open');
    });
};
app.stickyFooter = function () {
    var bodyHeight = $('body').height();
    var windowHeight = $(window).height();
    var wrapper = $('.wrapper');
    if (bodyHeight < windowHeight) {
        var headerHeight = $('header.main').outerHeight() + $('nav.top-bar').outerHeight();
        var footerHeight = $('footer.bottom').outerHeight();
        var devHeight = $('.under-development').outerHeight();
        var wrapperHeight = windowHeight - headerHeight - footerHeight - devHeight;
        wrapper.css('min-height', wrapperHeight);
    }
};
app.sideNav = function () {
    $('.side-nav-toggle a').on('click', function (e) {
        e.preventDefault();
        $('.side-nav').toggleClass('side-nav-open');
    });
};
$(function () {
    app.init();
    app.sideNav();
    var stickySections = { 'faq': 'h2', 'gsi': 'h2' };
    for (var key in stickySections) {
        app.stickyNav(key, stickySections[key]);
    }
    app.stickyFooter();
});
$(function () {
    var microSiteNav = $('.microsite-nav');
    if (microSiteNav.length) {
        $('.microsite-nav li.active a').on('click', function (e) {
            e.preventDefault();
            console.log("Micosite nav opened");
            microSiteNav.toggleClass('microsite-nav--open');
        });
        $('.microsite-nav li a').not('li.active a').on('click', function (e) {
            console.log("closing...");
            microSiteNav.removeClass('microsite-nav--open');
        });
    }
    var heroEls = $('.wide-hero > .row > div');
    if (heroEls.length === 2) {
        app.equalizeBottoms(heroEls);
    }
});
app.connectors = {
    orderBy: {
        PRIORITY: 'priority',
        SYS_TITLE: 'sys_title'
    },
    open: function (html) {
        $('.overlay-content').html(html);
        $('body').addClass('overlay-open');
    },
    close: function () {
        $('body').removeClass('overlay-open');
        $('.overlay-content').empty();
    },
    hideCodeSnippetIfEmpty: function (snippet_elem) {
        var snippet_value = snippet_elem.find('.snippet-value');
        if (!snippet_value.val()) {
            snippet_elem.hide();
        }
    },
    hideDocsLinkIfEmpty: function (docs_elem) {
        var docs_link = docs_elem.find('.docs-link');
        var docs_link_text = docs_elem.find('.docs-link-text');
        if (!docs_link.attr("href")) {
            docs_link_text.hide();
        }
    },
    hideExtLinkIfEmpty: function (ext_elem) {
        var link_1 = ext_elem.find('.link_1');
        var link_1_text = ext_elem.find('.link_1_text');
        var link_2 = ext_elem.find('.link_2');
        var link_2_text = ext_elem.find('.link_2_text');
        if (!link_1.attr("href")) {
            link_1_text.hide();
        }
        if (!link_2.attr("href")) {
            link_2_text.hide();
        }
    },
    displayOverlay: function (e) {
        e.preventDefault();
        var overlay_content = $(this).parents('li').find('.connector-overlay-content');
        app.connectors.hideCodeSnippetIfEmpty(overlay_content.find('.connector-a'));
        app.connectors.hideCodeSnippetIfEmpty(overlay_content.find('.connector-b'));
        app.connectors.hideDocsLinkIfEmpty(overlay_content);
        app.connectors.hideExtLinkIfEmpty(overlay_content);
        app.connectors.open(overlay_content.html());
    },
    orderByPriority: function (e) {
        e.preventDefault();
        var targetProductFilter = $('[data-target-product]').data('target-product');
        var thumbnailSize = this.thumbnailSize || "200x150";
        app.connectors.sort($('ul.connector-results'), thumbnailSize, app.connectors.orderBy.PRIORITY);
        $('.connectors-order a').removeClass('active');
        $('.order-priority').addClass('active');
    },
    orderByAlpha: function (e) {
        e.preventDefault();
        var targetProductFilter = $('[data-target-product]').data('target-product');
        var thumbnailSize = this.thumbnailSize || "200x150";
        app.connectors.sort($('ul.connector-results'), thumbnailSize, app.connectors.orderBy.SYS_TITLE);
        $('.connectors-order a').removeClass('active');
        $('.order-alpha').addClass('active');
    },
    sort: function (container, thumbnailSize, orderBy) {
        container.addClass('loading');
        if (orderBy == app.connectors.orderBy.SYS_TITLE) {
            container.find('.connector')
                .sort(function (a, b) { return (a.dataset.connectortitle.toUpperCase() < b.dataset.connectortitle.toUpperCase()) ? -1 : (a.dataset.connectortitle.toUpperCase() > b.dataset.connectortitle.toUpperCase()) ? 1 : 0; })
                .appendTo('ul.connector-results');
        }
        else if (orderBy == app.connectors.orderBy.PRIORITY) {
            container.find('.connector')
                .sort(function (a, b) { return a.dataset.connectorpriority - b.dataset.connectorpriority; })
                .appendTo('ul.connector-results');
        }
        container.removeClass('loading');
    },
};
$(function () {
    $('ul.connector-results').on('click', 'a.fn-open-connector', app.connectors.displayOverlay);
    $('ul.featured-connectors-results').on('click', 'a.fn-open-connector', app.connectors.displayOverlay);
    $('.link-list').on('click', 'a.order-priority', app.connectors.orderByPriority);
    $('.link-list').on('click', 'a.order-alpha', app.connectors.orderByAlpha);
    $('.overlay-close').on('click', app.connectors.close);
});
app.overlay = {};
app.overlay.open = function (html) {
    $('body').addClass('overlay-open');
    if (html) {
        app.overlay.setContent(html);
    }
};
app.overlay.close = function () {
    $('body').removeClass('overlay-open');
};
app.overlay.toggle = function () {
    $('body').toggleClass('overlay-open');
};
app.overlay.setContent = function (content) {
    $('.overlay-content').html(content);
};
$(function () {
    $('a.overlay-close').on('click', function (e) {
        e.preventDefault();
        app.overlay.close();
    });
    $(window).on('keyup', function (e) {
        if (e.keyCode === 27) {
            app.overlay.close();
        }
    });
});
$(function () {
    var ytThumbs = $('#ytThumbs');
    if (ytThumbs.length) {
        ytEmbed.init({ 'block': 'ytThumbs', 'q': 'PLnLQldO10NUMqPvW5loz6aLGL3GrqJEGq', 'type': 'playlist', 'results': 50, 'meta': true, 'player': 'link', 'layout': 'full' });
    }
});
app.bookDownload = {
    urlParam: function (name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (!!results) {
            return results[1] || 0;
        }
        else {
            return null;
        }
    },
    download: function () {
        var tcDownloadURL = $.encoder.canonicalize(app.bookDownload.urlParam('tcDownloadURL'));
        var tcDownloadFileName = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcDownloadFileName'));
        if (tcDownloadURL &&
            tcDownloadURL.startsWith('https://access.cdn.redhat.com/')) {
            tcDownloadURL = $.encoder.canonicalize(window.location.href.substr(window.location.href.indexOf("tcDownloadURL=") + 14));
            $('.promotion-header').prepend("<div class='alert-box alert-success'><div class='icon'></div><div class='alert-content'><p><a href='" + tcDownloadURL + "'>Click here</a> if your download does not begin automatically.</p></div></div>");
            $("a#tcDownloadLink").attr("href", tcDownloadURL);
            if (!app.utils.isMobile.any()) {
                $.fileDownload(tcDownloadURL);
            }
            var ddDownloadEvent = {
                eventInfo: {
                    eventAction: 'book_download',
                    eventName: 'download',
                    fileName: tcDownloadFileName,
                    fileType: 'book',
                    productDetail: "",
                    timeStamp: new Date(),
                    processed: {
                        adobeAnalytics: false
                    }
                }
            };
            window.digitalData = window.digitalData || {};
            digitalData.event = digitalData.event || [];
            digitalData.event.push(ddDownloadEvent);
            sendCustomEvent('downloadEvent');
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ 'product_download_file_name': tcDownloadFileName });
            window.dataLayer.push({ 'event': 'Book Download Requested' });
        }
    },
};
$(function () {
    if ($('#book-download-promotion').length) {
        app.bookDownload.download();
    }
});
app.carousel = app.carousel || {
    init: function ($carousel) {
        $carousel.on('click', '.carousel-pager', function () {
            app.carousel.slide($carousel, $(this).hasClass('prev'));
        });
    },
    slide: function ($carousel, reverse) {
        var slides = $carousel.find('li');
        var $slideWrapper = $carousel.find('ul');
        var scrollLeft = $slideWrapper.scrollLeft();
        var $nextItem;
        var pagerWidth = $carousel.find('a.carousel-pager:first').width();
        var itemWidth = $carousel.find('li:first').outerWidth(true);
        var ammount = (reverse ? '+=' + (-itemWidth) : '+=' + itemWidth);
        $slideWrapper.animate({ 'scrollLeft': ammount });
    }
};
$(function () {
    $('.video-carousel').each(function (i, el) {
        app.carousel.init($(el));
    });
});
app.video = app.video || {};
app.video.fetchRelated = function () {
    $('[data-similar-videos]').each(function () {
        var $el = $(this);
        var productId = $el.data('similar-videos');
        if (!productId) {
            $el.prev('h2').remove();
            $el.remove();
            return;
        }
        var url = app.dcp.url.search + "/developer_materials?newFirst=true&project=" + productId + "&sys_type=video";
        $.getJSON(url, function (data) {
            if (data.hits.hits) {
                app.video.displayRelated($el, data.hits.hits.slice(0, 14));
            }
            else {
                $el.remove();
            }
        });
    });
};
app.video.displayRelated = function ($el, videos) {
    var html = '';
    var html = videos.map(function (video) {
        var videoUrl = video.fields.sys_url_view[0].replace(/^.*\/video/, app.baseUrl + "/video");
        var li = [
            '<li>',
            '<a href="' + videoUrl + '">',
            '<img src="' + video.fields.thumbnail[0] + '">',
            '<h4>' + video.fields.sys_title + '</h4>',
            '</a>',
            '<p class="video-speaker">' + video.fields.sys_title + '</p>',
            '</li>'
        ].join('');
        return li;
    }).join('');
    $el.find('ul').html(html);
};
$(function () {
    app.video.fetchRelated();
});
app.downloads = {};
app.downloads.url = app.downloadManagerBaseUrl + '/download-manager/rest/available/';
app.downloads.createDownloadTable = function (products) {
    var lastVersionName, lastDescription, row;
    var $table = $('<table>').addClass('large-24 small-24 columns downloads-table');
    var headers = ['Version', 'Release Date', 'Description', 'Download'].map(function (text) {
        return $('<th>').text(text);
    });
    var head = $('<thead>');
    row = $('<tr>').append(headers);
    head.append(row);
    $table.append(head);
    row = null;
    $.each(products, function (i, product) {
        $.each(product.files, function (j, file) {
            var versionName = product.versionName;
            var date = new Date(product.releaseDate);
            var dateString = ([date.getFullYear(), date.getMonth() + 1, date.getDate()].map(function (int) {
                return (int < 10 ? '0' + int : int);
            })).join('-');
            if (versionName === lastVersionName) {
                versionName = '';
                dateString = '';
            }
            if (file.description !== lastDescription || versionName !== '') {
                row = $('<tr>').append($('<td>').text(versionName), $('<td>').text(dateString), $('<td>').text(file.description !== lastDescription || versionName !== '' ? file.description : ''), $('<td>').addClass('download-links link-sm').append(app.downloads.createInstallerLink(file)));
            }
            else {
                var link = app.downloads.createInstallerLink(file);
                $(row).find('.download-links').append(link);
            }
            if ((j + 1) === product.files.length || file.description !== lastDescription || versionName !== '') {
                $table.append(row);
            }
            lastVersionName = product.versionName;
            lastDescription = file.description;
        });
    });
    return $table;
};
app.downloads.bytesToSize = function (bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0)
        return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};
app.downloads.createDownloadLink = function (data) {
    if (data[0].productCode === "rhoar") {
        return "";
    }
    else if (data[0].productCode === "cdk") {
        data[0].featuredWindowsArtifact = app.products.downloads.cdk.windowsUrl;
        data[0].featuredMacArtifact = app.products.downloads.cdk.macUrl;
        data[0].featuredRhelArtifact = app.products.downloads.cdk.rhelUrl;
    }
    else if (!data[0].featuredArtifact) {
        return "";
    }
    else {
        data[0].featuredWindowsArtifact = "";
        data[0].featuredMacArtifact = "";
        data[0].featuredRhelArtifact = "";
    }
    var $downloadLink = new RHDPOSDownload();
    $downloadLink.productCode = data[0].productCode;
    $downloadLink.downloadURL = data[0].featuredArtifact.url;
    $downloadLink.winURL = data[0].featuredWindowsArtifact;
    $downloadLink.macURL = data[0].featuredMacArtifact;
    $downloadLink.rhelURL = data[0].featuredRhelArtifact;
    $downloadLink.productName = data[0].name;
    $downloadLink.version = data[0].featuredArtifact.versionName;
    return $downloadLink;
};
app.downloads.createReleaseNotesLink = function () {
    var link = $('<a>').text(' View Release Notes').attr('href', 'https://access.redhat.com/documentation/en/').prepend($('<i>').addClass('fa fa-pencil'));
    return link;
};
app.downloads.createInstallerLink = function (file) {
    var label = ' ' + file.label;
    if (file.fileSize) {
        label += ' (' + app.downloads.bytesToSize(file.fileSize) + ')';
    }
    var link = $('<a>').text(label).attr('href', file.url).prepend($('<i>').addClass('fa fa-download'));
    return link;
};
app.downloads.display = function (data) {
    var productArray = data[0].productVersions.sort(function (a, b) {
        return (a.releaseDate > b.releaseDate) ? -1 : 1;
    });
    var $downloadLink = app.downloads.createDownloadLink(data);
    var $toggleLink = $('<a>').text('View Older Downloads ▾').addClass('large-24 columns view-older-downloads').attr('href', '#').on('click touchstart', function (e) {
        e.preventDefault();
        $(this).next('div').toggle();
    });
    for (var i = 0; i < productArray.length; i++) {
        var match = productArray[i].versionName.match(/alpha|beta|EA/gi);
        if (!match) {
            break;
        }
    }
    ;
    var end = i + 1;
    var currentDownloads = productArray.slice(0, end);
    var $latestDownloadsTables = $("<div>").addClass('large-24 columns');
    $latestDownloadsTables.append(app.downloads.createDownloadTable(currentDownloads));
    var $titleContainer = $("<div>").addClass('large-24 columns');
    var $tryTitle = $("<h4>").addClass('caps').append('Try it');
    $titleContainer.append($tryTitle);
    var $allContainer = $("<div>").addClass('large-24 columns');
    var $allTitle = $("<h4>").addClass('caps').append('All Downloads');
    $allContainer.append($allTitle);
    var $allDownloadsTable = $("<div style='display:none;'>").addClass('large-24 columns');
    $allDownloadsTable.append(app.downloads.createDownloadTable(productArray.slice(end)));
    $downloads = $('<div>').addClass('rh-downloads').append($titleContainer, $downloadLink, $allContainer, $latestDownloadsTables, $toggleLink, $allDownloadsTable);
    $('.product-downloads').html($downloads);
    $("div.download-loading").removeClass('loading');
};
app.downloads.populateLinks = function () {
    var links = $('[data-download-id]');
    if (!links.length) {
        return;
    }
    $.each(links, function (i, el) {
        var productCode = $(this).data('download-id');
        $.getJSON(app.downloads.url + productCode, function (data) {
            var $el = $(el);
            $el.html('<i class="fa fa-download"></i> Download');
            if (data[0] && data[0].featuredArtifact && data[0].featuredArtifact.url) {
                var timeStamp = new Date(data[0].featuredArtifact.releaseDate);
                var releaseDate = moment(timeStamp).format('LL');
                $el.attr('href', data[0].featuredArtifact.url);
                $('[data-download-id-version="' + productCode + '"]').text('Version: ' + data[0].featuredArtifact.versionName);
                $('[data-download-id-release="' + productCode + '"]').text(releaseDate);
            }
            else {
                $el.attr('href', $el.data('fallback-url'));
            }
        });
    });
};
$(function () {
    var $productDownloads = $('[data-product-code]');
    var productCode = $productDownloads.data('product-code');
    if ($productDownloads && productCode) {
        $.getJSON(app.downloads.url + productCode, function (data) {
            if (!data.length || !data[0].productVersions.length || !data[0].featuredArtifact) {
                $("div.download-loading").removeClass('loading');
                $('.no-download').show();
                return;
            }
            $('.has-download').show();
            app.downloads.display(data);
        });
    }
});
app.jdf = {
    init: function () {
        if ($('.jdfadvise').length) {
            app.jdf.showAdvise();
        }
    },
    supportsLocalStorage: function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        }
        catch (e) {
            return false;
        }
    },
    showAdvise: function () {
        var referrer = document.referrer;
        var jdfAvise = false;
        if (this.supportsLocalStorage()) {
            jdfAvise = window.localStorage.getItem("jdfAviseRead");
        }
        if ((referrer.indexOf('site-jdf.rhcloud.com') > 0 || referrer.indexOf(' www.jboss.org/jdf') > 0) & !jdfAvise) {
            $('div#jdfadvise').show('slow');
        }
    },
    hideAdvise: function () {
        $('div#jdfadvise').hide('slow');
        if (!this.supportsLocalStorage()) {
            return;
        }
        window.localStorage.setItem("jdfAviseRead", true);
    }
};
app.jdf.init();
(function () {
    var initializing = false, fnTest = /xyz/.test(function () { xyz; }) ? /\b_super\b/ : /.*/;
    this.Class = function () { };
    Class.extend = function (prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            prototype[name] = typeof prop[name] == "function" &&
                typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function (name, fn) {
                    return function () {
                        var tmp = this._super;
                        this._super = _super[name];
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }
        function Class() {
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }
        Class.prototype = prototype;
        Class.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
})();
(function ($) {
    var default_immune = { 'js': [',', '.', '_', ' '] };
    var attr_whitelist_classes = { 'default': [',', '.', '-', '_', ' '] };
    var attr_whitelist = { 'width': ['%'], 'height': ['%'] };
    var css_whitelist_classes = { 'default': ['-', ' ', '%'], 'color': ['#', ' ', '(', ')'], 'image': ['(', ')', ':', '/', '?', '&', '-', '.', '"', '=', ' '] };
    var css_whitelist = { 'background': ['(', ')', ':', '%', '/', '?', '&', '-', ' ', '.', '"', '=', '#'], 'background-image': css_whitelist_classes['image'], 'background-color': css_whitelist_classes['color'], 'border-color': css_whitelist_classes['color'], 'border-image': css_whitelist_classes['image'], 'color': css_whitelist_classes['color'], 'icon': css_whitelist_classes['image'], 'list-style-image': css_whitelist_classes['image'], 'outline-color': css_whitelist_classes['color'] };
    var unsafeKeys = { 'attr_name': ['on[a-z]{1,}', 'style', 'href', 'src'], 'attr_val': ['javascript:'], 'css_key': ['behavior', '-moz-behavior', '-ms-behavior'], 'css_val': ['expression'] };
    var options = { blacklist: true };
    var hasBeenInitialized = false;
    var immune;
    $.encoder = { author: 'Chris Schmidt (chris.schmidt@owasp.org)', version: '${project.version}', init: function (opts) {
            if (hasBeenInitialized)
                throw "jQuery Encoder has already been initialized - cannot set options after initialization";
            hasBeenInitialized = true;
            $.extend(options, opts);
        }, encodeForHTML: function (input) { hasBeenInitialized = true; var div = document.createElement('div'); $(div).text(input); return $(div).html(); }, encodeForHTMLAttribute: function (attr, input, omitAttributeName) {
            hasBeenInitialized = true;
            attr = $.encoder.canonicalize(attr).toLowerCase();
            input = $.encoder.canonicalize(input);
            if ($.inArray(attr, unsafeKeys['attr_name']) >= 0) {
                throw "Unsafe attribute name used: " + attr;
            }
            for (var a = 0; a < unsafeKeys['attr_val']; a++) {
                if (input.toLowerCase().match(unsafeKeys['attr_val'][a])) {
                    throw "Unsafe attribute value used: " + input;
                }
            }
            immune = attr_whitelist[attr];
            if (!immune)
                immune = attr_whitelist_classes['default'];
            var encoded = '';
            if (!omitAttributeName) {
                for (var p = 0; p < attr.length; p++) {
                    var pc = attr.charAt(p);
                    if (!pc.match(/[a-zA-Z\-0-9]/)) {
                        throw "Invalid attribute name specified";
                    }
                    encoded += pc;
                }
                encoded += '="';
            }
            for (var i = 0; i < input.length; i++) {
                var ch = input.charAt(i), cc = input.charCodeAt(i);
                if (!ch.match(/[a-zA-Z0-9]/) && $.inArray(ch, immune) < 0) {
                    var hex = cc.toString(16);
                    encoded += '&#x' + hex + ';';
                }
                else {
                    encoded += ch;
                }
            }
            if (!omitAttributeName) {
                encoded += '"';
            }
            return encoded;
        }, encodeForCSS: function (propName, input, omitPropertyName) {
            hasBeenInitialized = true;
            propName = $.encoder.canonicalize(propName).toLowerCase();
            input = $.encoder.canonicalize(input);
            if ($.inArray(propName, unsafeKeys['css_key']) >= 0) {
                throw "Unsafe property name used: " + propName;
            }
            for (var a = 0; a < unsafeKeys['css_val'].length; a++) {
                if (input.toLowerCase().indexOf(unsafeKeys['css_val'][a]) >= 0) {
                    throw "Unsafe property value used: " + input;
                }
            }
            immune = css_whitelist[propName];
            if (!immune)
                immune = css_whitelist_classes['default'];
            var encoded = '';
            if (!omitPropertyName) {
                for (var p = 0; p < propName.length; p++) {
                    var pc = propName.charAt(p);
                    if (!pc.match(/[a-zA-Z\-]/)) {
                        throw "Invalid Property Name specified";
                    }
                    encoded += pc;
                }
                encoded += ': ';
            }
            for (var i = 0; i < input.length; i++) {
                var ch = input.charAt(i), cc = input.charCodeAt(i);
                if (!ch.match(/[a-zA-Z0-9]/) && $.inArray(ch, immune) < 0) {
                    var hex = cc.toString(16);
                    var pad = '000000'.substr((hex.length));
                    encoded += '\\' + pad + hex;
                }
                else {
                    encoded += ch;
                }
            }
            return encoded;
        }, encodeForURL: function (input, attr) {
            hasBeenInitialized = true;
            var encoded = '';
            if (attr) {
                if (attr.match(/^[A-Za-z\-0-9]{1,}$/)) {
                    encoded += $.encoder.canonicalize(attr).toLowerCase();
                }
                else {
                    throw "Illegal Attribute Name Specified";
                }
                encoded += '="';
            }
            encoded += encodeURIComponent(input);
            encoded += attr ? '"' : '';
            return encoded;
        }, encodeForJavascript: function (input) {
            hasBeenInitialized = true;
            if (!immune)
                immune = default_immune['js'];
            var encoded = '';
            for (var i = 0; i < input.length; i++) {
                var ch = input.charAt(i), cc = input.charCodeAt(i);
                if ($.inArray(ch, immune) >= 0 || hex[cc] == null) {
                    encoded += ch;
                    continue;
                }
                var temp = cc.toString(16), pad;
                if (cc < 256) {
                    pad = '00'.substr(temp.length);
                    encoded += '\\x' + pad + temp.toUpperCase();
                }
                else {
                    pad = '0000'.substr(temp.length);
                    encoded += '\\u' + pad + temp.toUpperCase();
                }
            }
            return encoded;
        }, canonicalize: function (input, strict) {
            hasBeenInitialized = true;
            if (input === null)
                return null;
            var out = input, cycle_out = input;
            var decodeCount = 0, cycles = 0;
            var codecs = [new HTMLEntityCodec(), new PercentCodec(), new CSSCodec()];
            while (true) {
                cycle_out = out;
                for (var i = 0; i < codecs.length; i++) {
                    var new_out = codecs[i].decode(out);
                    if (new_out != out) {
                        decodeCount++;
                        out = new_out;
                    }
                }
                if (cycle_out == out) {
                    break;
                }
                cycles++;
            }
            if (strict && decodeCount > 1) {
                throw "Attack Detected - Multiple/Double Encodings used in input";
            }
            return out;
        } };
    var hex = [];
    for (var c = 0; c < 0xFF; c++) {
        if (c >= 0x30 && c <= 0x39 || c >= 0x41 && c <= 0x5a || c >= 0x61 && c <= 0x7a) {
            hex[c] = null;
        }
        else {
            hex[c] = c.toString(16);
        }
    }
    var methods = { html: function (opts) { return $.encoder.encodeForHTML(opts.unsafe); }, css: function (opts) {
            var work = [];
            var out = [];
            if (opts.map) {
                work = opts.map;
            }
            else {
                work[opts.name] = opts.unsafe;
            }
            for (var k in work) {
                if (!(typeof work[k] == 'function') && work.hasOwnProperty(k)) {
                    out[k] = $.encoder.encodeForCSS(k, work[k], true);
                }
            }
            return out;
        }, attr: function (opts) {
            var work = [];
            var out = [];
            if (opts.map) {
                work = opts.map;
            }
            else {
                work[opts.name] = opts.unsafe;
            }
            for (var k in work) {
                if (!(typeof work[k] == 'function') && work.hasOwnProperty(k)) {
                    out[k] = $.encoder.encodeForHTMLAttribute(k, work[k], true);
                }
            }
            return out;
        } };
    $.fn.encode = function () {
        hasBeenInitialized = true;
        var argCount = arguments.length;
        var opts = { 'context': 'html', 'unsafe': null, 'name': null, 'map': null, 'setter': null, 'strict': true };
        if (argCount == 1 && typeof arguments[0] == 'object') {
            $.extend(opts, arguments[0]);
        }
        else {
            opts.context = arguments[0];
            if (arguments.length == 2) {
                if (opts.context == 'html') {
                    opts.unsafe = arguments[1];
                }
                else if (opts.content == 'attr' || opts.content == 'css') {
                    opts.map = arguments[1];
                }
            }
            else {
                opts.name = arguments[1];
                opts.unsafe = arguments[2];
            }
        }
        if (opts.context == 'html') {
            opts.setter = this.html;
        }
        else if (opts.context == 'css') {
            opts.setter = this.css;
        }
        else if (opts.context == 'attr') {
            opts.setter = this.attr;
        }
        return opts.setter.call(this, methods[opts.context].call(this, opts));
    };
    var PushbackString = Class.extend({ _input: null, _pushback: null, _temp: null, _index: 0, _mark: 0, _hasNext: function () { if (this._input == null)
            return false; if (this._input.length == 0)
            return false; return this._index < this._input.length; }, init: function (input) { this._input = input; }, pushback: function (c) { this._pushback = c; }, index: function () { return this._index; }, hasNext: function () { if (this._pushback != null)
            return true; return this._hasNext(); }, next: function () {
            if (this._pushback != null) {
                var save = this._pushback;
                this._pushback = null;
                return save;
            }
            return (this._hasNext()) ? this._input.charAt(this._index++) : null;
        }, nextHex: function () { var c = this.next(); if (c == null)
            return null; if (c.match(/[0-9A-Fa-f]/))
            return c; return null; }, peek: function (c) {
            if (c) {
                if (this._pushback && this._pushback == c)
                    return true;
                return this._hasNext() ? this._input.charAt(this._index) == c : false;
            }
            if (this._pushback)
                return this._pushback;
            return this._hasNext() ? this._input.charAt(this._index) : null;
        }, mark: function () { this._temp = this._pushback; this._mark = this._index; }, reset: function () { this._pushback = this._temp; this._index = this._mark; }, remainder: function () {
            var out = this._input.substr(this._index);
            if (this._pushback != null) {
                out = this._pushback + out;
            }
            return out;
        } });
    var Codec = Class.extend({ decode: function (input) {
            var out = '', pbs = new PushbackString(input);
            while (pbs.hasNext()) {
                var c = this.decodeCharacter(pbs);
                if (c != null) {
                    out += c;
                }
                else {
                    out += pbs.next();
                }
            }
            return out;
        }, decodeCharacter: function (pbs) { return pbs.next(); } });
    var HTMLEntityCodec = Codec.extend({ decodeCharacter: function (input) {
            input.mark();
            var first = input.next();
            if (first == null || first != '&') {
                input.reset();
                return null;
            }
            var second = input.next();
            if (second == null) {
                input.reset();
                return null;
            }
            var c;
            if (second == '#') {
                c = this._getNumericEntity(input);
                if (c != null)
                    return c;
            }
            else if (second.match(/[A-Za-z]/)) {
                input.pushback(second);
                c = this._getNamedEntity(input);
                if (c != null)
                    return c;
            }
            input.reset();
            return null;
        }, _getNamedEntity: function (input) {
            var possible = '', entry, len;
            len = Math.min(input.remainder().length, ENTITY_TO_CHAR_TRIE.getMaxKeyLength());
            for (var i = 0; i < len; i++) {
                possible += input.next().toLowerCase();
            }
            entry = ENTITY_TO_CHAR_TRIE.getLongestMatch(possible);
            if (entry == null)
                return null;
            input.reset();
            input.next();
            len = entry.getKey().length;
            for (var j = 0; j < len; j++) {
                input.next();
            }
            if (input.peek(';'))
                input.next();
            return entry.getValue();
        }, _getNumericEntity: function (input) {
            var first = input.peek();
            if (first == null)
                return null;
            if (first == 'x' || first == 'X') {
                input.next();
                return this._parseHex(input);
            }
            return this._parseNumber(input);
        }, _parseHex: function (input) {
            var out = '';
            while (input.hasNext()) {
                var c = input.peek();
                if (!isNaN(parseInt(c, 16))) {
                    out += c;
                    input.next();
                }
                else if (c == ';') {
                    input.next();
                    break;
                }
                else {
                    break;
                }
            }
            var i = parseInt(out, 16);
            if (!isNaN(i) && isValidCodePoint(i))
                return String.fromCharCode(i);
            return null;
        }, _parseNumber: function (input) {
            var out = '';
            while (input.hasNext()) {
                var ch = input.peek();
                if (!isNaN(parseInt(ch, 10))) {
                    out += ch;
                    input.next();
                }
                else if (ch == ';') {
                    input.next();
                    break;
                }
                else {
                    break;
                }
            }
            var i = parseInt(out, 10);
            if (!isNaN(i) && isValidCodePoint(i))
                return String.fromCharCode(i);
            return null;
        } });
    var PercentCodec = Codec.extend({ decodeCharacter: function (input) {
            input.mark();
            var first = input.next();
            if (first == null) {
                input.reset();
                return null;
            }
            if (first != '%') {
                input.reset();
                return null;
            }
            var out = '';
            for (var i = 0; i < 2; i++) {
                var c = input.nextHex();
                if (c != null)
                    out += c;
            }
            if (out.length == 2) {
                var p = parseInt(out, 16);
                if (isValidCodePoint(p))
                    return String.fromCharCode(p);
            }
            input.reset();
            return null;
        } });
    var CSSCodec = Codec.extend({ decodeCharacter: function (input) {
            input.mark();
            var first = input.next();
            if (first == null || first != '\\') {
                input.reset();
                return null;
            }
            var second = input.next();
            if (second == null) {
                input.reset();
                return null;
            }
            switch (second) {
                case '\r': if (input.peek('\n')) {
                    input.next();
                }
                case '\n':
                case '\f':
                case '\u0000': return this.decodeCharacter(input);
            }
            if (parseInt(second, 16) == 'NaN') {
                return second;
            }
            var out = second;
            for (var j = 0; j < 5; j++) {
                var c = input.next();
                if (c == null || isWhiteSpace(c)) {
                    break;
                }
                if (parseInt(c, 16) != 'NaN') {
                    out += c;
                }
                else {
                    input.pushback(c);
                    break;
                }
            }
            var p = parseInt(out, 16);
            if (isValidCodePoint(p))
                return String.fromCharCode(p);
            return '\ufffd';
        } });
    var Trie = Class.extend({ root: null, maxKeyLen: 0, size: 0, init: function () { this.clear(); }, getLongestMatch: function (key) { return (this.root == null && key == null) ? null : this.root.getLongestMatch(key, 0); }, getMaxKeyLength: function () { return this.maxKeyLen; }, clear: function () { this.root = null, this.maxKeyLen = 0, this.size = 0; }, put: function (key, val) {
            var len, old;
            if (this.root == null)
                this.root = new Trie.Node();
            if ((old = this.root.put(key, 0, val)) != null)
                return old;
            if ((len = key.length) > this.maxKeyLen)
                this.maxKeyLen = key.length;
            this.size++;
            return null;
        } });
    Trie.Entry = Class.extend({ _key: null, _value: null, init: function (key, value) { this._key = key, this._value = value; }, getKey: function () { return this._key; }, getValue: function () { return this._value; }, equals: function (other) {
            if (!(other instanceof Trie.Entry)) {
                return false;
            }
            return this._key == other._key && this._value == other._value;
        } });
    Trie.Node = Class.extend({ _value: null, _nextMap: null, setValue: function (value) { this._value = value; }, getNextNode: function (ch) { if (!this._nextMap)
            return null; return this._nextMap[ch]; }, put: function (key, pos, value) {
            var nextNode, ch, old;
            if (key.length == pos) {
                old = this._value;
                this.setValue(value);
                return old;
            }
            ch = key.charAt(pos);
            if (this._nextMap == null) {
                this._nextMap = Trie.Node.newNodeMap();
                nextNode = new Trie.Node();
                this._nextMap[ch] = nextNode;
            }
            else if ((nextNode = this._nextMap[ch]) == null) {
                nextNode = new Trie.Node();
                this._nextMap[ch] = nextNode;
            }
            return nextNode.put(key, pos + 1, value);
        }, get: function (key, pos) {
            var nextNode;
            if (key.length <= pos)
                return this._value;
            if ((nextNode = this.getNextNode(key.charAt(pos))) == null)
                return null;
            return nextNode.get(key, pos + 1);
        }, getLongestMatch: function (key, pos) {
            var nextNode, ret;
            if (key.length <= pos) {
                return Trie.Entry.newInstanceIfNeeded(key, this._value);
            }
            if ((nextNode = this.getNextNode(key.charAt(pos))) == null) {
                return Trie.Entry.newInstanceIfNeeded(key, pos, this._value);
            }
            if ((ret = nextNode.getLongestMatch(key, pos + 1)) != null) {
                return ret;
            }
            return Trie.Entry.newInstanceIfNeeded(key, pos, this._value);
        } });
    Trie.Entry.newInstanceIfNeeded = function () {
        var key = arguments[0], value, keyLength;
        if (typeof arguments[1] == 'string') {
            value = arguments[1];
            keyLength = key.length;
        }
        else {
            keyLength = arguments[1];
            value = arguments[2];
        }
        if (value == null || key == null) {
            return null;
        }
        if (key.length > keyLength) {
            key = key.substr(0, keyLength);
        }
        return new Trie.Entry(key, value);
    };
    Trie.Node.newNodeMap = function () { return {}; };
    var isValidCodePoint = function (codepoint) { return codepoint >= 0x0000 && codepoint <= 0x10FFFF; };
    var isWhiteSpace = function (input) { return input.match(/[\s]/); };
    var MAP_ENTITY_TO_CHAR = [];
    var MAP_CHAR_TO_ENTITY = [];
    var ENTITY_TO_CHAR_TRIE = new Trie();
    (function () {
        MAP_ENTITY_TO_CHAR["&quot"] = "34";
        MAP_ENTITY_TO_CHAR["&amp"] = "38";
        MAP_ENTITY_TO_CHAR["&lt"] = "60";
        MAP_ENTITY_TO_CHAR["&gt"] = "62";
        MAP_ENTITY_TO_CHAR["&nbsp"] = "160";
        MAP_ENTITY_TO_CHAR["&iexcl"] = "161";
        MAP_ENTITY_TO_CHAR["&cent"] = "162";
        MAP_ENTITY_TO_CHAR["&pound"] = "163";
        MAP_ENTITY_TO_CHAR["&curren"] = "164";
        MAP_ENTITY_TO_CHAR["&yen"] = "165";
        MAP_ENTITY_TO_CHAR["&brvbar"] = "166";
        MAP_ENTITY_TO_CHAR["&sect"] = "167";
        MAP_ENTITY_TO_CHAR["&uml"] = "168";
        MAP_ENTITY_TO_CHAR["&copy"] = "169";
        MAP_ENTITY_TO_CHAR["&ordf"] = "170";
        MAP_ENTITY_TO_CHAR["&laquo"] = "171";
        MAP_ENTITY_TO_CHAR["&not"] = "172";
        MAP_ENTITY_TO_CHAR["&shy"] = "173";
        MAP_ENTITY_TO_CHAR["&reg"] = "174";
        MAP_ENTITY_TO_CHAR["&macr"] = "175";
        MAP_ENTITY_TO_CHAR["&deg"] = "176";
        MAP_ENTITY_TO_CHAR["&plusmn"] = "177";
        MAP_ENTITY_TO_CHAR["&sup2"] = "178";
        MAP_ENTITY_TO_CHAR["&sup3"] = "179";
        MAP_ENTITY_TO_CHAR["&acute"] = "180";
        MAP_ENTITY_TO_CHAR["&micro"] = "181";
        MAP_ENTITY_TO_CHAR["&para"] = "182";
        MAP_ENTITY_TO_CHAR["&middot"] = "183";
        MAP_ENTITY_TO_CHAR["&cedil"] = "184";
        MAP_ENTITY_TO_CHAR["&sup1"] = "185";
        MAP_ENTITY_TO_CHAR["&ordm"] = "186";
        MAP_ENTITY_TO_CHAR["&raquo"] = "187";
        MAP_ENTITY_TO_CHAR["&frac14"] = "188";
        MAP_ENTITY_TO_CHAR["&frac12"] = "189";
        MAP_ENTITY_TO_CHAR["&frac34"] = "190";
        MAP_ENTITY_TO_CHAR["&iquest"] = "191";
        MAP_ENTITY_TO_CHAR["&Agrave"] = "192";
        MAP_ENTITY_TO_CHAR["&Aacute"] = "193";
        MAP_ENTITY_TO_CHAR["&Acirc"] = "194";
        MAP_ENTITY_TO_CHAR["&Atilde"] = "195";
        MAP_ENTITY_TO_CHAR["&Auml"] = "196";
        MAP_ENTITY_TO_CHAR["&Aring"] = "197";
        MAP_ENTITY_TO_CHAR["&AElig"] = "198";
        MAP_ENTITY_TO_CHAR["&Ccedil"] = "199";
        MAP_ENTITY_TO_CHAR["&Egrave"] = "200";
        MAP_ENTITY_TO_CHAR["&Eacute"] = "201";
        MAP_ENTITY_TO_CHAR["&Ecirc"] = "202";
        MAP_ENTITY_TO_CHAR["&Euml"] = "203";
        MAP_ENTITY_TO_CHAR["&Igrave"] = "204";
        MAP_ENTITY_TO_CHAR["&Iacute"] = "205";
        MAP_ENTITY_TO_CHAR["&Icirc"] = "206";
        MAP_ENTITY_TO_CHAR["&Iuml"] = "207";
        MAP_ENTITY_TO_CHAR["&ETH"] = "208";
        MAP_ENTITY_TO_CHAR["&Ntilde"] = "209";
        MAP_ENTITY_TO_CHAR["&Ograve"] = "210";
        MAP_ENTITY_TO_CHAR["&Oacute"] = "211";
        MAP_ENTITY_TO_CHAR["&Ocirc"] = "212";
        MAP_ENTITY_TO_CHAR["&Otilde"] = "213";
        MAP_ENTITY_TO_CHAR["&Ouml"] = "214";
        MAP_ENTITY_TO_CHAR["&times"] = "215";
        MAP_ENTITY_TO_CHAR["&Oslash"] = "216";
        MAP_ENTITY_TO_CHAR["&Ugrave"] = "217";
        MAP_ENTITY_TO_CHAR["&Uacute"] = "218";
        MAP_ENTITY_TO_CHAR["&Ucirc"] = "219";
        MAP_ENTITY_TO_CHAR["&Uuml"] = "220";
        MAP_ENTITY_TO_CHAR["&Yacute"] = "221";
        MAP_ENTITY_TO_CHAR["&THORN"] = "222";
        MAP_ENTITY_TO_CHAR["&szlig"] = "223";
        MAP_ENTITY_TO_CHAR["&agrave"] = "224";
        MAP_ENTITY_TO_CHAR["&aacute"] = "225";
        MAP_ENTITY_TO_CHAR["&acirc"] = "226";
        MAP_ENTITY_TO_CHAR["&atilde"] = "227";
        MAP_ENTITY_TO_CHAR["&auml"] = "228";
        MAP_ENTITY_TO_CHAR["&aring"] = "229";
        MAP_ENTITY_TO_CHAR["&aelig"] = "230";
        MAP_ENTITY_TO_CHAR["&ccedil"] = "231";
        MAP_ENTITY_TO_CHAR["&egrave"] = "232";
        MAP_ENTITY_TO_CHAR["&eacute"] = "233";
        MAP_ENTITY_TO_CHAR["&ecirc"] = "234";
        MAP_ENTITY_TO_CHAR["&euml"] = "235";
        MAP_ENTITY_TO_CHAR["&igrave"] = "236";
        MAP_ENTITY_TO_CHAR["&iacute"] = "237";
        MAP_ENTITY_TO_CHAR["&icirc"] = "238";
        MAP_ENTITY_TO_CHAR["&iuml"] = "239";
        MAP_ENTITY_TO_CHAR["&eth"] = "240";
        MAP_ENTITY_TO_CHAR["&ntilde"] = "241";
        MAP_ENTITY_TO_CHAR["&ograve"] = "242";
        MAP_ENTITY_TO_CHAR["&oacute"] = "243";
        MAP_ENTITY_TO_CHAR["&ocirc"] = "244";
        MAP_ENTITY_TO_CHAR["&otilde"] = "245";
        MAP_ENTITY_TO_CHAR["&ouml"] = "246";
        MAP_ENTITY_TO_CHAR["&divide"] = "247";
        MAP_ENTITY_TO_CHAR["&oslash"] = "248";
        MAP_ENTITY_TO_CHAR["&ugrave"] = "249";
        MAP_ENTITY_TO_CHAR["&uacute"] = "250";
        MAP_ENTITY_TO_CHAR["&ucirc"] = "251";
        MAP_ENTITY_TO_CHAR["&uuml"] = "252";
        MAP_ENTITY_TO_CHAR["&yacute"] = "253";
        MAP_ENTITY_TO_CHAR["&thorn"] = "254";
        MAP_ENTITY_TO_CHAR["&yuml"] = "255";
        MAP_ENTITY_TO_CHAR["&OElig"] = "338";
        MAP_ENTITY_TO_CHAR["&oelig"] = "339";
        MAP_ENTITY_TO_CHAR["&Scaron"] = "352";
        MAP_ENTITY_TO_CHAR["&scaron"] = "353";
        MAP_ENTITY_TO_CHAR["&Yuml"] = "376";
        MAP_ENTITY_TO_CHAR["&fnof"] = "402";
        MAP_ENTITY_TO_CHAR["&circ"] = "710";
        MAP_ENTITY_TO_CHAR["&tilde"] = "732";
        MAP_ENTITY_TO_CHAR["&Alpha"] = "913";
        MAP_ENTITY_TO_CHAR["&Beta"] = "914";
        MAP_ENTITY_TO_CHAR["&Gamma"] = "915";
        MAP_ENTITY_TO_CHAR["&Delta"] = "916";
        MAP_ENTITY_TO_CHAR["&Epsilon"] = "917";
        MAP_ENTITY_TO_CHAR["&Zeta"] = "918";
        MAP_ENTITY_TO_CHAR["&Eta"] = "919";
        MAP_ENTITY_TO_CHAR["&Theta"] = "920";
        MAP_ENTITY_TO_CHAR["&Iota"] = "921";
        MAP_ENTITY_TO_CHAR["&Kappa"] = "922";
        MAP_ENTITY_TO_CHAR["&Lambda"] = "923";
        MAP_ENTITY_TO_CHAR["&Mu"] = "924";
        MAP_ENTITY_TO_CHAR["&Nu"] = "925";
        MAP_ENTITY_TO_CHAR["&Xi"] = "926";
        MAP_ENTITY_TO_CHAR["&Omicron"] = "927";
        MAP_ENTITY_TO_CHAR["&Pi"] = "928";
        MAP_ENTITY_TO_CHAR["&Rho"] = "929";
        MAP_ENTITY_TO_CHAR["&Sigma"] = "931";
        MAP_ENTITY_TO_CHAR["&Tau"] = "932";
        MAP_ENTITY_TO_CHAR["&Upsilon"] = "933";
        MAP_ENTITY_TO_CHAR["&Phi"] = "934";
        MAP_ENTITY_TO_CHAR["&Chi"] = "935";
        MAP_ENTITY_TO_CHAR["&Psi"] = "936";
        MAP_ENTITY_TO_CHAR["&Omega"] = "937";
        MAP_ENTITY_TO_CHAR["&alpha"] = "945";
        MAP_ENTITY_TO_CHAR["&beta"] = "946";
        MAP_ENTITY_TO_CHAR["&gamma"] = "947";
        MAP_ENTITY_TO_CHAR["&delta"] = "948";
        MAP_ENTITY_TO_CHAR["&epsilon"] = "949";
        MAP_ENTITY_TO_CHAR["&zeta"] = "950";
        MAP_ENTITY_TO_CHAR["&eta"] = "951";
        MAP_ENTITY_TO_CHAR["&theta"] = "952";
        MAP_ENTITY_TO_CHAR["&iota"] = "953";
        MAP_ENTITY_TO_CHAR["&kappa"] = "954";
        MAP_ENTITY_TO_CHAR["&lambda"] = "955";
        MAP_ENTITY_TO_CHAR["&mu"] = "956";
        MAP_ENTITY_TO_CHAR["&nu"] = "957";
        MAP_ENTITY_TO_CHAR["&xi"] = "958";
        MAP_ENTITY_TO_CHAR["&omicron"] = "959";
        MAP_ENTITY_TO_CHAR["&pi"] = "960";
        MAP_ENTITY_TO_CHAR["&rho"] = "961";
        MAP_ENTITY_TO_CHAR["&sigmaf"] = "962";
        MAP_ENTITY_TO_CHAR["&sigma"] = "963";
        MAP_ENTITY_TO_CHAR["&tau"] = "964";
        MAP_ENTITY_TO_CHAR["&upsilon"] = "965";
        MAP_ENTITY_TO_CHAR["&phi"] = "966";
        MAP_ENTITY_TO_CHAR["&chi"] = "967";
        MAP_ENTITY_TO_CHAR["&psi"] = "968";
        MAP_ENTITY_TO_CHAR["&omega"] = "969";
        MAP_ENTITY_TO_CHAR["&thetasym"] = "977";
        MAP_ENTITY_TO_CHAR["&upsih"] = "978";
        MAP_ENTITY_TO_CHAR["&piv"] = "982";
        MAP_ENTITY_TO_CHAR["&ensp"] = "8194";
        MAP_ENTITY_TO_CHAR["&emsp"] = "8195";
        MAP_ENTITY_TO_CHAR["&thinsp"] = "8201";
        MAP_ENTITY_TO_CHAR["&zwnj"] = "8204";
        MAP_ENTITY_TO_CHAR["&zwj"] = "8205";
        MAP_ENTITY_TO_CHAR["&lrm"] = "8206";
        MAP_ENTITY_TO_CHAR["&rlm"] = "8207";
        MAP_ENTITY_TO_CHAR["&ndash"] = "8211";
        MAP_ENTITY_TO_CHAR["&mdash"] = "8212";
        MAP_ENTITY_TO_CHAR["&lsquo"] = "8216";
        MAP_ENTITY_TO_CHAR["&rsquo"] = "8217";
        MAP_ENTITY_TO_CHAR["&sbquo"] = "8218";
        MAP_ENTITY_TO_CHAR["&ldquo"] = "8220";
        MAP_ENTITY_TO_CHAR["&rdquo"] = "8221";
        MAP_ENTITY_TO_CHAR["&bdquo"] = "8222";
        MAP_ENTITY_TO_CHAR["&dagger"] = "8224";
        MAP_ENTITY_TO_CHAR["&Dagger"] = "8225";
        MAP_ENTITY_TO_CHAR["&bull"] = "8226";
        MAP_ENTITY_TO_CHAR["&hellip"] = "8230";
        MAP_ENTITY_TO_CHAR["&permil"] = "8240";
        MAP_ENTITY_TO_CHAR["&prime"] = "8242";
        MAP_ENTITY_TO_CHAR["&Prime"] = "8243";
        MAP_ENTITY_TO_CHAR["&lsaquo"] = "8249";
        MAP_ENTITY_TO_CHAR["&rsaquo"] = "8250";
        MAP_ENTITY_TO_CHAR["&oline"] = "8254";
        MAP_ENTITY_TO_CHAR["&frasl"] = "8260";
        MAP_ENTITY_TO_CHAR["&euro"] = "8364";
        MAP_ENTITY_TO_CHAR["&image"] = "8365";
        MAP_ENTITY_TO_CHAR["&weierp"] = "8472";
        MAP_ENTITY_TO_CHAR["&real"] = "8476";
        MAP_ENTITY_TO_CHAR["&trade"] = "8482";
        MAP_ENTITY_TO_CHAR["&alefsym"] = "8501";
        MAP_ENTITY_TO_CHAR["&larr"] = "8592";
        MAP_ENTITY_TO_CHAR["&uarr"] = "8593";
        MAP_ENTITY_TO_CHAR["&rarr"] = "8594";
        MAP_ENTITY_TO_CHAR["&darr"] = "8595";
        MAP_ENTITY_TO_CHAR["&harr"] = "8596";
        MAP_ENTITY_TO_CHAR["&crarr"] = "8629";
        MAP_ENTITY_TO_CHAR["&lArr"] = "8656";
        MAP_ENTITY_TO_CHAR["&uArr"] = "8657";
        MAP_ENTITY_TO_CHAR["&rArr"] = "8658";
        MAP_ENTITY_TO_CHAR["&dArr"] = "8659";
        MAP_ENTITY_TO_CHAR["&hArr"] = "8660";
        MAP_ENTITY_TO_CHAR["&forall"] = "8704";
        MAP_ENTITY_TO_CHAR["&part"] = "8706";
        MAP_ENTITY_TO_CHAR["&exist"] = "8707";
        MAP_ENTITY_TO_CHAR["&empty"] = "8709";
        MAP_ENTITY_TO_CHAR["&nabla"] = "8711";
        MAP_ENTITY_TO_CHAR["&isin"] = "8712";
        MAP_ENTITY_TO_CHAR["&notin"] = "8713";
        MAP_ENTITY_TO_CHAR["&ni"] = "8715";
        MAP_ENTITY_TO_CHAR["&prod"] = "8719";
        MAP_ENTITY_TO_CHAR["&sum"] = "8721";
        MAP_ENTITY_TO_CHAR["&minus"] = "8722";
        MAP_ENTITY_TO_CHAR["&lowast"] = "8727";
        MAP_ENTITY_TO_CHAR["&radic"] = "8730";
        MAP_ENTITY_TO_CHAR["&prop"] = "8733";
        MAP_ENTITY_TO_CHAR["&infin"] = "8734";
        MAP_ENTITY_TO_CHAR["&ang"] = "8736";
        MAP_ENTITY_TO_CHAR["&and"] = "8743";
        MAP_ENTITY_TO_CHAR["&or"] = "8744";
        MAP_ENTITY_TO_CHAR["&cap"] = "8745";
        MAP_ENTITY_TO_CHAR["&cup"] = "8746";
        MAP_ENTITY_TO_CHAR["&int"] = "8747";
        MAP_ENTITY_TO_CHAR["&there4"] = "8756";
        MAP_ENTITY_TO_CHAR["&sim"] = "8764";
        MAP_ENTITY_TO_CHAR["&cong"] = "8773";
        MAP_ENTITY_TO_CHAR["&asymp"] = "8776";
        MAP_ENTITY_TO_CHAR["&ne"] = "8800";
        MAP_ENTITY_TO_CHAR["&equiv"] = "8801";
        MAP_ENTITY_TO_CHAR["&le"] = "8804";
        MAP_ENTITY_TO_CHAR["&ge"] = "8805";
        MAP_ENTITY_TO_CHAR["&sub"] = "8834";
        MAP_ENTITY_TO_CHAR["&sup"] = "8835";
        MAP_ENTITY_TO_CHAR["&nsub"] = "8836";
        MAP_ENTITY_TO_CHAR["&sube"] = "8838";
        MAP_ENTITY_TO_CHAR["&supe"] = "8839";
        MAP_ENTITY_TO_CHAR["&oplus"] = "8853";
        MAP_ENTITY_TO_CHAR["&otimes"] = "8855";
        MAP_ENTITY_TO_CHAR["&perp"] = "8869";
        MAP_ENTITY_TO_CHAR["&sdot"] = "8901";
        MAP_ENTITY_TO_CHAR["&lceil"] = "8968";
        MAP_ENTITY_TO_CHAR["&rceil"] = "8969";
        MAP_ENTITY_TO_CHAR["&lfloor"] = "8970";
        MAP_ENTITY_TO_CHAR["&rfloor"] = "8971";
        MAP_ENTITY_TO_CHAR["&lang"] = "9001";
        MAP_ENTITY_TO_CHAR["&rang"] = "9002";
        MAP_ENTITY_TO_CHAR["&loz"] = "9674";
        MAP_ENTITY_TO_CHAR["&spades"] = "9824";
        MAP_ENTITY_TO_CHAR["&clubs"] = "9827";
        MAP_ENTITY_TO_CHAR["&hearts"] = "9829";
        MAP_ENTITY_TO_CHAR["&diams"] = "9830";
        for (var entity in MAP_ENTITY_TO_CHAR) {
            if (!(typeof MAP_ENTITY_TO_CHAR[entity] == 'function') && MAP_ENTITY_TO_CHAR.hasOwnProperty(entity)) {
                MAP_CHAR_TO_ENTITY[MAP_ENTITY_TO_CHAR[entity]] = entity;
            }
        }
        for (var c in MAP_CHAR_TO_ENTITY) {
            if (!(typeof MAP_CHAR_TO_ENTITY[c] == 'function') && MAP_CHAR_TO_ENTITY.hasOwnProperty(c)) {
                var ent = MAP_CHAR_TO_ENTITY[c].toLowerCase().substr(1);
                ENTITY_TO_CHAR_TRIE.put(ent, String.fromCharCode(c));
            }
        }
    })();
    if (Object.freeze) {
        $.encoder = Object.freeze($.encoder);
        $.fn.encode = Object.freeze($.fn.encode);
    }
    else if (Object.seal) {
        $.encoder = Object.seal($.encoder);
        $.fn.encode = Object.seal($.fn.encode);
    }
    else if (Object.preventExtensions) {
        $.encoder = Object.preventExtensions($.encoder);
        $.fn.encode = Object.preventExtensions($.fn.encode);
    }
})(jQuery);
(function ($, window) {
    var htmlSpecialCharsRegEx = /[<>&\r\n"']/gm;
    var htmlSpecialCharsPlaceHolders = {
        '<': 'lt;',
        '>': 'gt;',
        '&': 'amp;',
        '\r': "#13;",
        '\n': "#10;",
        '"': 'quot;',
        "'": '#39;'
    };
    $.extend({
        fileDownload: function (fileUrl, options) {
            var settings = $.extend({
                preparingMessageHtml: null,
                failMessageHtml: null,
                androidPostUnsupportedMessageHtml: "Unfortunately your Android browser doesn't support this type of file download. Please try again with a different browser.",
                dialogOptions: { modal: true },
                prepareCallback: function (url) { },
                successCallback: function (url) { },
                failCallback: function (responseHtml, url) { },
                httpMethod: "GET",
                data: null,
                checkInterval: 100,
                cookieName: "fileDownload",
                cookieValue: "true",
                cookiePath: "/",
                cookieDomain: null,
                popupWindowTitle: "Initiating file download...",
                encodeHTMLEntities: true
            }, options);
            var deferred = new $.Deferred();
            var userAgent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();
            var isIos;
            var isAndroid;
            var isOtherMobileBrowser;
            if (/ip(ad|hone|od)/.test(userAgent)) {
                isIos = true;
            }
            else if (userAgent.indexOf('android') !== -1) {
                isAndroid = true;
            }
            else {
                isOtherMobileBrowser = /avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|playbook|silk|iemobile|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4));
            }
            var httpMethodUpper = settings.httpMethod.toUpperCase();
            if (isAndroid && httpMethodUpper !== "GET") {
                if ($().dialog) {
                    $("<div>").html(settings.androidPostUnsupportedMessageHtml).dialog(settings.dialogOptions);
                }
                else {
                    alert(settings.androidPostUnsupportedMessageHtml);
                }
                return deferred.reject();
            }
            var $preparingDialog = null;
            var internalCallbacks = {
                onPrepare: function (url) {
                    if (settings.preparingMessageHtml) {
                        $preparingDialog = $("<div>").html(settings.preparingMessageHtml).dialog(settings.dialogOptions);
                    }
                    else if (settings.prepareCallback) {
                        settings.prepareCallback(url);
                    }
                },
                onSuccess: function (url) {
                    if ($preparingDialog) {
                        $preparingDialog.dialog('close');
                    }
                    ;
                    settings.successCallback(url);
                    deferred.resolve(url);
                },
                onFail: function (responseHtml, url) {
                    if ($preparingDialog) {
                        $preparingDialog.dialog('close');
                    }
                    ;
                    if (settings.failMessageHtml) {
                        $("<div>").html(settings.failMessageHtml).dialog(settings.dialogOptions);
                    }
                    settings.failCallback(responseHtml, url);
                    deferred.reject(responseHtml, url);
                }
            };
            internalCallbacks.onPrepare(fileUrl);
            if (settings.data !== null && typeof settings.data !== "string") {
                settings.data = $.param(settings.data);
            }
            var $iframe, downloadWindow, formDoc, $form;
            if (httpMethodUpper === "GET") {
                if (settings.data !== null) {
                    var qsStart = fileUrl.indexOf('?');
                    if (qsStart !== -1) {
                        if (fileUrl.substring(fileUrl.length - 1) !== "&") {
                            fileUrl = fileUrl + "&";
                        }
                    }
                    else {
                        fileUrl = fileUrl + "?";
                    }
                    fileUrl = fileUrl + settings.data;
                }
                if (isIos || isAndroid) {
                    downloadWindow = window.open(fileUrl);
                    downloadWindow.document.title = settings.popupWindowTitle;
                    window.focus();
                }
                else if (isOtherMobileBrowser) {
                    window.location(fileUrl);
                }
                else {
                    $iframe = $("<iframe>")
                        .hide()
                        .prop("src", fileUrl)
                        .appendTo("body");
                }
            }
            else {
                var formInnerHtml = "";
                if (settings.data !== null) {
                    $.each(settings.data.replace(/\+/g, ' ').split("&"), function () {
                        var kvp = this.split("=");
                        var key = settings.encodeHTMLEntities ? htmlSpecialCharsEntityEncode(decodeURIComponent(kvp[0])) : decodeURIComponent(kvp[0]);
                        if (key) {
                            var value = settings.encodeHTMLEntities ? htmlSpecialCharsEntityEncode(decodeURIComponent(kvp[1])) : decodeURIComponent(kvp[1]);
                            formInnerHtml += '<input type="hidden" name="' + key + '" value="' + value + '" />';
                        }
                    });
                }
                if (isOtherMobileBrowser) {
                    $form = $("<form>").appendTo("body");
                    $form.hide()
                        .prop('method', settings.httpMethod)
                        .prop('action', fileUrl)
                        .html(formInnerHtml);
                }
                else {
                    if (isIos) {
                        downloadWindow = window.open("about:blank");
                        downloadWindow.document.title = settings.popupWindowTitle;
                        formDoc = downloadWindow.document;
                        window.focus();
                    }
                    else {
                        $iframe = $("<iframe style='display: none' src='about:blank'></iframe>").appendTo("body");
                        formDoc = getiframeDocument($iframe);
                    }
                    formDoc.write("<html><head></head><body><form method='" + settings.httpMethod + "' action='" + fileUrl + "'>" + formInnerHtml + "</form>" + settings.popupWindowTitle + "</body></html>");
                    $form = $(formDoc).find('form');
                }
                $form.submit();
            }
            setTimeout(checkFileDownloadComplete, settings.checkInterval);
            function checkFileDownloadComplete() {
                if (document.cookie.indexOf(settings.cookieName + "=" + settings.cookieValue) != -1) {
                    internalCallbacks.onSuccess(fileUrl);
                    var cookieData = settings.cookieName + "=; path=" + settings.cookiePath + "; expires=" + new Date(0).toUTCString() + ";";
                    if (settings.cookieDomain)
                        cookieData += " domain=" + settings.cookieDomain + ";";
                    document.cookie = cookieData;
                    cleanUp(false);
                    return;
                }
                if (downloadWindow || $iframe) {
                    try {
                        var formDoc = downloadWindow ? downloadWindow.document : getiframeDocument($iframe);
                        if (formDoc && formDoc.body != null && formDoc.body.innerHTML.length) {
                            var isFailure = true;
                            if ($form && $form.length) {
                                var $contents = $(formDoc.body).contents().first();
                                try {
                                    if ($contents.length && $contents[0] === $form[0]) {
                                        isFailure = false;
                                    }
                                }
                                catch (e) {
                                    if (e && e.number == -2146828218) {
                                        isFailure = true;
                                    }
                                    else {
                                        throw e;
                                    }
                                }
                            }
                            if (isFailure) {
                                setTimeout(function () {
                                    internalCallbacks.onFail(formDoc.body.innerHTML, fileUrl);
                                    cleanUp(true);
                                }, 100);
                                return;
                            }
                        }
                    }
                    catch (err) {
                        internalCallbacks.onFail('', fileUrl);
                        cleanUp(true);
                        return;
                    }
                }
                setTimeout(checkFileDownloadComplete, settings.checkInterval);
            }
            function getiframeDocument($iframe) {
                var iframeDoc = $iframe[0].contentWindow || $iframe[0].contentDocument;
                if (iframeDoc.document) {
                    iframeDoc = iframeDoc.document;
                }
                return iframeDoc;
            }
            function cleanUp(isFailure) {
                setTimeout(function () {
                    if (downloadWindow) {
                        if (isAndroid) {
                            downloadWindow.close();
                        }
                        if (isIos) {
                            if (downloadWindow.focus) {
                                downloadWindow.focus();
                                if (isFailure) {
                                    downloadWindow.close();
                                }
                            }
                        }
                    }
                }, 0);
            }
            function htmlSpecialCharsEntityEncode(str) {
                return str.replace(htmlSpecialCharsRegEx, function (match) {
                    return '&' + htmlSpecialCharsPlaceHolders[match];
                });
            }
            return deferred.promise();
        }
    });
})(jQuery, this);
var hljs = new function () { function k(v) { return v.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;"); } function t(v) { return v.nodeName.toLowerCase(); } function i(w, x) { var v = w && w.exec(x); return v && v.index == 0; } function d(v) { return Array.prototype.map.call(v.childNodes, function (w) { if (w.nodeType == 3) {
    return b.useBR ? w.nodeValue.replace(/\n/g, "") : w.nodeValue;
} if (t(w) == "br") {
    return "\n";
} return d(w); }).join(""); } function r(w) { var v = (w.className + " " + (w.parentNode ? w.parentNode.className : "")).split(/\s+/); v = v.map(function (x) { return x.replace(/^language-/, ""); }); return v.filter(function (x) { return j(x) || x == "no-highlight"; })[0]; } function o(x, y) { var v = {}; for (var w in x) {
    v[w] = x[w];
} if (y) {
    for (var w in y) {
        v[w] = y[w];
    }
} return v; } function u(x) { var v = []; (function w(y, z) { for (var A = y.firstChild; A; A = A.nextSibling) {
    if (A.nodeType == 3) {
        z += A.nodeValue.length;
    }
    else {
        if (t(A) == "br") {
            z += 1;
        }
        else {
            if (A.nodeType == 1) {
                v.push({ event: "start", offset: z, node: A });
                z = w(A, z);
                v.push({ event: "stop", offset: z, node: A });
            }
        }
    }
} return z; })(x, 0); return v; } function q(w, y, C) { var x = 0; var F = ""; var z = []; function B() { if (!w.length || !y.length) {
    return w.length ? w : y;
} if (w[0].offset != y[0].offset) {
    return (w[0].offset < y[0].offset) ? w : y;
} return y[0].event == "start" ? w : y; } function A(H) { function G(I) { return " " + I.nodeName + '="' + k(I.value) + '"'; } F += "<" + t(H) + Array.prototype.map.call(H.attributes, G).join("") + ">"; } function E(G) { F += "</" + t(G) + ">"; } function v(G) { (G.event == "start" ? A : E)(G.node); } while (w.length || y.length) {
    var D = B();
    F += k(C.substr(x, D[0].offset - x));
    x = D[0].offset;
    if (D == w) {
        z.reverse().forEach(E);
        do {
            v(D.splice(0, 1)[0]);
            D = B();
        } while (D == w && D.length && D[0].offset == x);
        z.reverse().forEach(A);
    }
    else {
        if (D[0].event == "start") {
            z.push(D[0].node);
        }
        else {
            z.pop();
        }
        v(D.splice(0, 1)[0]);
    }
} return F + k(C.substr(x)); } function m(y) { function v(z) { return (z && z.source) || z; } function w(A, z) { return RegExp(v(A), "m" + (y.cI ? "i" : "") + (z ? "g" : "")); } function x(D, C) { if (D.compiled) {
    return;
} D.compiled = true; D.k = D.k || D.bK; if (D.k) {
    var z = {};
    function E(G, F) { if (y.cI) {
        F = F.toLowerCase();
    } F.split(" ").forEach(function (H) { var I = H.split("|"); z[I[0]] = [G, I[1] ? Number(I[1]) : 1]; }); }
    if (typeof D.k == "string") {
        E("keyword", D.k);
    }
    else {
        Object.keys(D.k).forEach(function (F) { E(F, D.k[F]); });
    }
    D.k = z;
} D.lR = w(D.l || /\b[A-Za-z0-9_]+\b/, true); if (C) {
    if (D.bK) {
        D.b = D.bK.split(" ").join("|");
    }
    if (!D.b) {
        D.b = /\B|\b/;
    }
    D.bR = w(D.b);
    if (!D.e && !D.eW) {
        D.e = /\B|\b/;
    }
    if (D.e) {
        D.eR = w(D.e);
    }
    D.tE = v(D.e) || "";
    if (D.eW && C.tE) {
        D.tE += (D.e ? "|" : "") + C.tE;
    }
} if (D.i) {
    D.iR = w(D.i);
} if (D.r === undefined) {
    D.r = 1;
} if (!D.c) {
    D.c = [];
} var B = []; D.c.forEach(function (F) { if (F.v) {
    F.v.forEach(function (G) { B.push(o(F, G)); });
}
else {
    B.push(F == "self" ? D : F);
} }); D.c = B; D.c.forEach(function (F) { x(F, D); }); if (D.starts) {
    x(D.starts, C);
} var A = D.c.map(function (F) { return F.bK ? "\\.?\\b(" + F.b + ")\\b\\.?" : F.b; }).concat([D.tE]).concat([D.i]).map(v).filter(Boolean); D.t = A.length ? w(A.join("|"), true) : { exec: function (F) { return null; } }; D.continuation = {}; } x(y); } function c(S, L, J, R) { function v(U, V) { for (var T = 0; T < V.c.length; T++) {
    if (i(V.c[T].bR, U)) {
        return V.c[T];
    }
} } function z(U, T) { if (i(U.eR, T)) {
    return U;
} if (U.eW) {
    return z(U.parent, T);
} } function A(T, U) { return !J && i(U.iR, T); } function E(V, T) { var U = M.cI ? T[0].toLowerCase() : T[0]; return V.k.hasOwnProperty(U) && V.k[U]; } function w(Z, X, W, V) { var T = V ? "" : b.classPrefix, U = '<span class="' + T, Y = W ? "" : "</span>"; U += Z + '">'; return U + X + Y; } function N() { var U = k(C); if (!I.k) {
    return U;
} var T = ""; var X = 0; I.lR.lastIndex = 0; var V = I.lR.exec(U); while (V) {
    T += U.substr(X, V.index - X);
    var W = E(I, V);
    if (W) {
        H += W[1];
        T += w(W[0], V[0]);
    }
    else {
        T += V[0];
    }
    X = I.lR.lastIndex;
    V = I.lR.exec(U);
} return T + U.substr(X); } function F() { if (I.sL && !f[I.sL]) {
    return k(C);
} var T = I.sL ? c(I.sL, C, true, I.continuation.top) : g(C); if (I.r > 0) {
    H += T.r;
} if (I.subLanguageMode == "continuous") {
    I.continuation.top = T.top;
} return w(T.language, T.value, false, true); } function Q() { return I.sL !== undefined ? F() : N(); } function P(V, U) { var T = V.cN ? w(V.cN, "", true) : ""; if (V.rB) {
    D += T;
    C = "";
}
else {
    if (V.eB) {
        D += k(U) + T;
        C = "";
    }
    else {
        D += T;
        C = U;
    }
} I = Object.create(V, { parent: { value: I } }); } function G(T, X) { C += T; if (X === undefined) {
    D += Q();
    return 0;
} var V = v(X, I); if (V) {
    D += Q();
    P(V, X);
    return V.rB ? 0 : X.length;
} var W = z(I, X); if (W) {
    var U = I;
    if (!(U.rE || U.eE)) {
        C += X;
    }
    D += Q();
    do {
        if (I.cN) {
            D += "</span>";
        }
        H += I.r;
        I = I.parent;
    } while (I != W.parent);
    if (U.eE) {
        D += k(X);
    }
    C = "";
    if (W.starts) {
        P(W.starts, "");
    }
    return U.rE ? 0 : X.length;
} if (A(X, I)) {
    throw new Error('Illegal lexeme "' + X + '" for mode "' + (I.cN || "<unnamed>") + '"');
} C += X; return X.length || 1; } var M = j(S); if (!M) {
    throw new Error('Unknown language: "' + S + '"');
} m(M); var I = R || M; var D = ""; for (var K = I; K != M; K = K.parent) {
    if (K.cN) {
        D = w(K.cN, D, true);
    }
} var C = ""; var H = 0; try {
    var B, y, x = 0;
    while (true) {
        I.t.lastIndex = x;
        B = I.t.exec(L);
        if (!B) {
            break;
        }
        y = G(L.substr(x, B.index - x), B[0]);
        x = B.index + y;
    }
    G(L.substr(x));
    for (var K = I; K.parent; K = K.parent) {
        if (K.cN) {
            D += "</span>";
        }
    }
    return { r: H, value: D, language: S, top: I };
}
catch (O) {
    if (O.message.indexOf("Illegal") != -1) {
        return { r: 0, value: k(L) };
    }
    else {
        throw O;
    }
} } function g(y, x) { x = x || b.languages || Object.keys(f); var v = { r: 0, value: k(y) }; var w = v; x.forEach(function (z) { if (!j(z)) {
    return;
} var A = c(z, y, false); A.language = z; if (A.r > w.r) {
    w = A;
} if (A.r > v.r) {
    w = v;
    v = A;
} }); if (w.language) {
    v.second_best = w;
} return v; } function h(v) { if (b.tabReplace) {
    v = v.replace(/^((<[^>]+>|\t)+)/gm, function (w, z, y, x) { return z.replace(/\t/g, b.tabReplace); });
} if (b.useBR) {
    v = v.replace(/\n/g, "<br>");
} return v; } function p(z) { var y = d(z); var A = r(z); if (A == "no-highlight") {
    return;
} var v = A ? c(A, y, true) : g(y); var w = u(z); if (w.length) {
    var x = document.createElementNS("http://www.w3.org/1999/xhtml", "pre");
    x.innerHTML = v.value;
    v.value = q(w, u(x), y);
} v.value = h(v.value); z.innerHTML = v.value; z.className += " hljs " + (!A && v.language || ""); z.result = { language: v.language, re: v.r }; if (v.second_best) {
    z.second_best = { language: v.second_best.language, re: v.second_best.r };
} } var b = { classPrefix: "hljs-", tabReplace: null, useBR: false, languages: undefined }; function s(v) { b = o(b, v); } function l() { if (l.called) {
    return;
} l.called = true; var v = document.querySelectorAll("pre code"); Array.prototype.forEach.call(v, p); } function a() { addEventListener("DOMContentLoaded", l, false); addEventListener("load", l, false); } var f = {}; var n = {}; function e(v, x) { var w = f[v] = x(this); if (w.aliases) {
    w.aliases.forEach(function (y) { n[y] = v; });
} } function j(v) { return f[v] || f[n[v]]; } this.highlight = c; this.highlightAuto = g; this.fixMarkup = h; this.highlightBlock = p; this.configure = s; this.initHighlighting = l; this.initHighlightingOnLoad = a; this.registerLanguage = e; this.getLanguage = j; this.inherit = o; this.IR = "[a-zA-Z][a-zA-Z0-9_]*"; this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*"; this.NR = "\\b\\d+(\\.\\d+)?"; this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)"; this.BNR = "\\b(0b[01]+)"; this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~"; this.BE = { b: "\\\\[\\s\\S]", r: 0 }; this.ASM = { cN: "string", b: "'", e: "'", i: "\\n", c: [this.BE] }; this.QSM = { cN: "string", b: '"', e: '"', i: "\\n", c: [this.BE] }; this.CLCM = { cN: "comment", b: "//", e: "$" }; this.CBLCLM = { cN: "comment", b: "/\\*", e: "\\*/" }; this.HCM = { cN: "comment", b: "#", e: "$" }; this.NM = { cN: "number", b: this.NR, r: 0 }; this.CNM = { cN: "number", b: this.CNR, r: 0 }; this.BNM = { cN: "number", b: this.BNR, r: 0 }; this.REGEXP_MODE = { cN: "regexp", b: /\//, e: /\/[gim]*/, i: /\n/, c: [this.BE, { b: /\[/, e: /\]/, r: 0, c: [this.BE] }] }; this.TM = { cN: "title", b: this.IR, r: 0 }; this.UTM = { cN: "title", b: this.UIR, r: 0 }; }();
hljs.registerLanguage("ruleslanguage", function (a) { return { k: { keyword: "BILL_PERIOD BILL_START BILL_STOP RS_EFFECTIVE_START RS_EFFECTIVE_STOP RS_JURIS_CODE RS_OPCO_CODE INTDADDATTRIBUTE|5 INTDADDVMSG|5 INTDBLOCKOP|5 INTDBLOCKOPNA|5 INTDCLOSE|5 INTDCOUNT|5 INTDCOUNTSTATUSCODE|5 INTDCREATEMASK|5 INTDCREATEDAYMASK|5 INTDCREATEFACTORMASK|5 INTDCREATEHANDLE|5 INTDCREATEOVERRIDEDAYMASK|5 INTDCREATEOVERRIDEMASK|5 INTDCREATESTATUSCODEMASK|5 INTDCREATETOUPERIOD|5 INTDDELETE|5 INTDDIPTEST|5 INTDEXPORT|5 INTDGETERRORCODE|5 INTDGETERRORMESSAGE|5 INTDISEQUAL|5 INTDJOIN|5 INTDLOAD|5 INTDLOADACTUALCUT|5 INTDLOADDATES|5 INTDLOADHIST|5 INTDLOADLIST|5 INTDLOADLISTDATES|5 INTDLOADLISTENERGY|5 INTDLOADLISTHIST|5 INTDLOADRELATEDCHANNEL|5 INTDLOADSP|5 INTDLOADSTAGING|5 INTDLOADUOM|5 INTDLOADUOMDATES|5 INTDLOADUOMHIST|5 INTDLOADVERSION|5 INTDOPEN|5 INTDREADFIRST|5 INTDREADNEXT|5 INTDRECCOUNT|5 INTDRELEASE|5 INTDREPLACE|5 INTDROLLAVG|5 INTDROLLPEAK|5 INTDSCALAROP|5 INTDSCALE|5 INTDSETATTRIBUTE|5 INTDSETDSTPARTICIPANT|5 INTDSETSTRING|5 INTDSETVALUE|5 INTDSETVALUESTATUS|5 INTDSHIFTSTARTTIME|5 INTDSMOOTH|5 INTDSORT|5 INTDSPIKETEST|5 INTDSUBSET|5 INTDTOU|5 INTDTOURELEASE|5 INTDTOUVALUE|5 INTDUPDATESTATS|5 INTDVALUE|5 STDEV INTDDELETEEX|5 INTDLOADEXACTUAL|5 INTDLOADEXCUT|5 INTDLOADEXDATES|5 INTDLOADEX|5 INTDLOADEXRELATEDCHANNEL|5 INTDSAVEEX|5 MVLOAD|5 MVLOADACCT|5 MVLOADACCTDATES|5 MVLOADACCTHIST|5 MVLOADDATES|5 MVLOADHIST|5 MVLOADLIST|5 MVLOADLISTDATES|5 MVLOADLISTHIST|5 IF FOR NEXT DONE SELECT END CALL ABORT CLEAR CHANNEL FACTOR LIST NUMBER OVERRIDE SET WEEK DISTRIBUTIONNODE ELSE WHEN THEN OTHERWISE IENUM CSV INCLUDE LEAVE RIDER SAVE DELETE NOVALUE SECTION WARN SAVE_UPDATE DETERMINANT LABEL REPORT REVENUE EACH IN FROM TOTAL CHARGE BLOCK AND OR CSV_FILE RATE_CODE AUXILIARY_DEMAND UIDACCOUNT RS BILL_PERIOD_SELECT HOURS_PER_MONTH INTD_ERROR_STOP SEASON_SCHEDULE_NAME ACCOUNTFACTOR ARRAYUPPERBOUND CALLSTOREDPROC GETADOCONNECTION GETCONNECT GETDATASOURCE GETQUALIFIER GETUSERID HASVALUE LISTCOUNT LISTOP LISTUPDATE LISTVALUE PRORATEFACTOR RSPRORATE SETBINPATH SETDBMONITOR WQ_OPEN BILLINGHOURS DATE DATEFROMFLOAT DATETIMEFROMSTRING DATETIMETOSTRING DATETOFLOAT DAY DAYDIFF DAYNAME DBDATETIME HOUR MINUTE MONTH MONTHDIFF MONTHHOURS MONTHNAME ROUNDDATE SAMEWEEKDAYLASTYEAR SECOND WEEKDAY WEEKDIFF YEAR YEARDAY YEARSTR COMPSUM HISTCOUNT HISTMAX HISTMIN HISTMINNZ HISTVALUE MAXNRANGE MAXRANGE MINRANGE COMPIKVA COMPKVA COMPKVARFROMKQKW COMPLF IDATTR FLAG LF2KW LF2KWH MAXKW POWERFACTOR READING2USAGE AVGSEASON MAXSEASON MONTHLYMERGE SEASONVALUE SUMSEASON ACCTREADDATES ACCTTABLELOAD CONFIGADD CONFIGGET CREATEOBJECT CREATEREPORT EMAILCLIENT EXPBLKMDMUSAGE EXPMDMUSAGE EXPORT_USAGE FACTORINEFFECT GETUSERSPECIFIEDSTOP INEFFECT ISHOLIDAY RUNRATE SAVE_PROFILE SETREPORTTITLE USEREXIT WATFORRUNRATE TO TABLE ACOS ASIN ATAN ATAN2 BITAND CEIL COS COSECANT COSH COTANGENT DIVQUOT DIVREM EXP FABS FLOOR FMOD FREPM FREXPN LOG LOG10 MAX MAXN MIN MINNZ MODF POW ROUND ROUND2VALUE ROUNDINT SECANT SIN SINH SQROOT TAN TANH FLOAT2STRING FLOAT2STRINGNC INSTR LEFT LEN LTRIM MID RIGHT RTRIM STRING STRINGNC TOLOWER TOUPPER TRIM NUMDAYS READ_DATE STAGING", built_in: "IDENTIFIER OPTIONS XML_ELEMENT XML_OP XML_ELEMENT_OF DOMDOCCREATE DOMDOCLOADFILE DOMDOCLOADXML DOMDOCSAVEFILE DOMDOCGETROOT DOMDOCADDPI DOMNODEGETNAME DOMNODEGETTYPE DOMNODEGETVALUE DOMNODEGETCHILDCT DOMNODEGETFIRSTCHILD DOMNODEGETSIBLING DOMNODECREATECHILDELEMENT DOMNODESETATTRIBUTE DOMNODEGETCHILDELEMENTCT DOMNODEGETFIRSTCHILDELEMENT DOMNODEGETSIBLINGELEMENT DOMNODEGETATTRIBUTECT DOMNODEGETATTRIBUTEI DOMNODEGETATTRIBUTEBYNAME DOMNODEGETBYNAME" }, c: [a.CLCM, a.CBLCLM, a.ASM, a.QSM, a.CNM, { cN: "array", b: "#[a-zA-Z .]+" }] }; });
hljs.registerLanguage("ruby", function (e) { var h = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?"; var g = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor"; var a = { cN: "yardoctag", b: "@[A-Za-z]+" }; var i = { cN: "comment", v: [{ b: "#", e: "$", c: [a] }, { b: "^\\=begin", e: "^\\=end", c: [a], r: 10 }, { b: "^__END__", e: "\\n$" }] }; var c = { cN: "subst", b: "#\\{", e: "}", k: g }; var d = { cN: "string", c: [e.BE, c], v: [{ b: /'/, e: /'/ }, { b: /"/, e: /"/ }, { b: "%[qw]?\\(", e: "\\)" }, { b: "%[qw]?\\[", e: "\\]" }, { b: "%[qw]?{", e: "}" }, { b: "%[qw]?<", e: ">", r: 10 }, { b: "%[qw]?/", e: "/", r: 10 }, { b: "%[qw]?%", e: "%", r: 10 }, { b: "%[qw]?-", e: "-", r: 10 }, { b: "%[qw]?\\|", e: "\\|", r: 10 }, { b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/ }] }; var b = { cN: "params", b: "\\(", e: "\\)", k: g }; var f = [d, i, { cN: "class", bK: "class module", e: "$|;", i: /=/, c: [e.inherit(e.TM, { b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?" }), { cN: "inheritance", b: "<\\s*", c: [{ cN: "parent", b: "(" + e.IR + "::)?" + e.IR }] }, i] }, { cN: "function", bK: "def", e: " |$|;", r: 0, c: [e.inherit(e.TM, { b: h }), b, i] }, { cN: "constant", b: "(::)?(\\b[A-Z]\\w*(::)?)+", r: 0 }, { cN: "symbol", b: ":", c: [d, { b: h }], r: 0 }, { cN: "symbol", b: e.UIR + "(\\!|\\?)?:", r: 0 }, { cN: "number", b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b", r: 0 }, { cN: "variable", b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))" }, { b: "(" + e.RSR + ")\\s*", c: [i, { cN: "regexp", c: [e.BE, c], i: /\n/, v: [{ b: "/", e: "/[a-z]*" }, { b: "%r{", e: "}[a-z]*" }, { b: "%r\\(", e: "\\)[a-z]*" }, { b: "%r!", e: "![a-z]*" }, { b: "%r\\[", e: "\\][a-z]*" }] }], r: 0 }]; c.c = f; b.c = f; return { k: g, c: f }; });
hljs.registerLanguage("haml", function (a) { return { cI: true, c: [{ cN: "doctype", b: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$", r: 10 }, { cN: "comment", b: "^\\s*(!=#|=#|-#|/).*$", r: 0 }, { b: "^\\s*(-|=|!=)(?!#)", starts: { e: "\\n", sL: "ruby" } }, { cN: "tag", b: "^\\s*%", c: [{ cN: "title", b: "\\w+" }, { cN: "value", b: "[#\\.]\\w+" }, { b: "{\\s*", e: "\\s*}", eE: true, c: [{ b: ":\\w+\\s*=>", e: ",\\s+", rB: true, eW: true, c: [{ cN: "symbol", b: ":\\w+" }, { cN: "string", b: '"', e: '"' }, { cN: "string", b: "'", e: "'" }, { b: "\\w+", r: 0 }] }] }, { b: "\\(\\s*", e: "\\s*\\)", eE: true, c: [{ b: "\\w+\\s*=", e: "\\s+", rB: true, eW: true, c: [{ cN: "attribute", b: "\\w+", r: 0 }, { cN: "string", b: '"', e: '"' }, { cN: "string", b: "'", e: "'" }, { b: "\\w+", r: 0 }] },] }] }, { cN: "bullet", b: "^\\s*[=~]\\s*", r: 0 }, { b: "#{", starts: { e: "}", sL: "ruby" } }] }; });
hljs.registerLanguage("haskell", function (f) { var g = { cN: "comment", v: [{ b: "--", e: "$" }, { b: "{-", e: "-}", c: ["self"] }] }; var e = { cN: "pragma", b: "{-#", e: "#-}" }; var b = { cN: "preprocessor", b: "^#", e: "$" }; var d = { cN: "type", b: "\\b[A-Z][\\w']*", r: 0 }; var c = { cN: "container", b: "\\(", e: "\\)", i: '"', c: [e, g, b, { cN: "type", b: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?" }, f.inherit(f.TM, { b: "[_a-z][\\w']*" })] }; var a = { cN: "container", b: "{", e: "}", c: c.c }; return { k: "let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec", c: [{ cN: "module", b: "\\bmodule\\b", e: "where", k: "module where", c: [c, g], i: "\\W\\.|;" }, { cN: "import", b: "\\bimport\\b", e: "$", k: "import|0 qualified as hiding", c: [c, g], i: "\\W\\.|;" }, { cN: "class", b: "^(\\s*)?(class|instance)\\b", e: "where", k: "class family instance where", c: [d, c, g] }, { cN: "typedef", b: "\\b(data|(new)?type)\\b", e: "$", k: "data family type newtype deriving", c: [e, g, d, c, a] }, { cN: "default", bK: "default", e: "$", c: [d, c, g] }, { cN: "infix", bK: "infix infixl infixr", e: "$", c: [f.CNM, g] }, { cN: "foreign", b: "\\bforeign\\b", e: "$", k: "foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe", c: [d, f.QSM, g] }, { cN: "shebang", b: "#!\\/usr\\/bin\\/env runhaskell", e: "$" }, e, g, b, f.QSM, f.CNM, d, f.inherit(f.TM, { b: "^[_a-z][\\w']*" }), { b: "->|<-" }] }; });
hljs.registerLanguage("xml", function (a) { var c = "[A-Za-z0-9\\._:-]+"; var d = { b: /<\?(php)?(?!\w)/, e: /\?>/, sL: "php", subLanguageMode: "continuous" }; var b = { eW: true, i: /</, r: 0, c: [d, { cN: "attribute", b: c, r: 0 }, { b: "=", r: 0, c: [{ cN: "value", v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }, { b: /[^\s\/>]+/ }] }] }] }; return { aliases: ["html"], cI: true, c: [{ cN: "doctype", b: "<!DOCTYPE", e: ">", r: 10, c: [{ b: "\\[", e: "\\]" }] }, { cN: "comment", b: "<!--", e: "-->", r: 10 }, { cN: "cdata", b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10 }, { cN: "tag", b: "<style(?=\\s|>|$)", e: ">", k: { title: "style" }, c: [b], starts: { e: "</style>", rE: true, sL: "css" } }, { cN: "tag", b: "<script(?=\\s|>|$)", e: ">", k: { title: "script" }, c: [b], starts: { e: "<\/script>", rE: true, sL: "javascript" } }, { b: "<%", e: "%>", sL: "vbscript" }, d, { cN: "pi", b: /<\?\w+/, e: /\?>/, r: 10 }, { cN: "tag", b: "</?", e: "/?>", c: [{ cN: "title", b: "[^ /><]+", r: 0 }, b] }] }; });
hljs.registerLanguage("django", function (a) { var b = { cN: "filter", b: /\|[A-Za-z]+\:?/, k: "truncatewords removetags linebreaksbr yesno get_digit timesince random striptags filesizeformat escape linebreaks length_is ljust rjust cut urlize fix_ampersands title floatformat capfirst pprint divisibleby add make_list unordered_list urlencode timeuntil urlizetrunc wordcount stringformat linenumbers slice date dictsort dictsortreversed default_if_none pluralize lower join center default truncatewords_html upper length phone2numeric wordwrap time addslashes slugify first escapejs force_escape iriencode last safe safeseq truncatechars localize unlocalize localtime utc timezone", c: [{ cN: "argument", b: /"/, e: /"/ }, { cN: "argument", b: /'/, e: /'/ }] }; return { cI: true, sL: "xml", subLanguageMode: "continuous", c: [{ cN: "template_comment", b: /\{%\s*comment\s*%}/, e: /\{%\s*endcomment\s*%}/ }, { cN: "template_comment", b: /\{#/, e: /#}/ }, { cN: "template_tag", b: /\{%/, e: /%}/, k: "comment endcomment load templatetag ifchanged endifchanged if endif firstof for endfor in ifnotequal endifnotequal widthratio extends include spaceless endspaceless regroup by as ifequal endifequal ssi now with cycle url filter endfilter debug block endblock else autoescape endautoescape csrf_token empty elif endwith static trans blocktrans endblocktrans get_static_prefix get_media_prefix plural get_current_language language get_available_languages get_current_language_bidi get_language_info get_language_info_list localize endlocalize localtime endlocaltime timezone endtimezone get_current_timezone verbatim", c: [b] }, { cN: "variable", b: /\{\{/, e: /}}/, c: [b] }] }; });
hljs.registerLanguage("bash", function (b) { var a = { cN: "variable", v: [{ b: /\$[\w\d#@][\w\d_]*/ }, { b: /\$\{(.*?)\}/ }] }; var d = { cN: "string", b: /"/, e: /"/, c: [b.BE, a, { cN: "variable", b: /\$\(/, e: /\)/, c: [b.BE] }] }; var c = { cN: "string", b: /'/, e: /'/ }; return { l: /-?[a-z\.]+/, k: { keyword: "if then else elif fi for break continue while in do done exit return set declare case esac export exec", literal: "true false", built_in: "printf echo read cd pwd pushd popd dirs let eval unset typeset readonly getopts source shopt caller type hash bind help sudo", operator: "-ne -eq -lt -gt -f -d -e -s -l -a" }, c: [{ cN: "shebang", b: /^#![^\n]+sh\s*$/, r: 10 }, { cN: "function", b: /\w[\w\d_]*\s*\(\s*\)\s*\{/, rB: true, c: [b.inherit(b.TM, { b: /\w[\w\d_]*/ })], r: 0 }, b.HCM, b.NM, d, c, a] }; });
hljs.registerLanguage("ini", function (a) { return { cI: true, i: /\S/, c: [{ cN: "comment", b: ";", e: "$" }, { cN: "title", b: "^\\[", e: "\\]" }, { cN: "setting", b: "^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*", e: "$", c: [{ cN: "value", eW: true, k: "on off true false yes no", c: [a.QSM, a.NM], r: 0 }] }] }; });
hljs.registerLanguage("objectivec", function (a) { var d = { keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign self synchronized id nonatomic super unichar IBOutlet IBAction strong weak @private @protected @public @try @property @end @throw @catch @finally @synthesize @dynamic @selector @optional @required", literal: "false true FALSE TRUE nil YES NO NULL", built_in: "NSString NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController UINavigationBar UINavigationController UITabBarController UIPopoverController UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor UIFont UIApplication NSNotFound NSNotificationCenter NSNotification UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection UIInterfaceOrientation MPMoviePlayerController dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once" }; var c = /[a-zA-Z@][a-zA-Z0-9_]*/; var b = "@interface @class @protocol @implementation"; return { k: d, l: c, i: "</", c: [a.CLCM, a.CBLCLM, a.CNM, a.QSM, { cN: "string", b: "'", e: "[^\\\\]'", i: "[^\\\\][^']" }, { cN: "preprocessor", b: "#import", e: "$", c: [{ cN: "title", b: '"', e: '"' }, { cN: "title", b: "<", e: ">" }] }, { cN: "preprocessor", b: "#", e: "$" }, { cN: "class", b: "(" + b.split(" ").join("|") + ")\\b", e: "({|$)", k: b, l: c, c: [a.UTM] }, { cN: "variable", b: "\\." + a.UIR, r: 0 }] }; });
hljs.registerLanguage("scss", function (a) { var c = "[a-zA-Z-][a-zA-Z0-9_-]*"; var d = { cN: "function", b: c + "\\(", e: "\\)", c: ["self", a.NM, a.ASM, a.QSM] }; var b = { cN: "hexcolor", b: "#[0-9A-Fa-f]+" }; var e = { cN: "attribute", b: "[A-Z\\_\\.\\-]+", e: ":", eE: true, i: "[^\\s]", starts: { cN: "value", eW: true, eE: true, c: [d, b, a.NM, a.QSM, a.ASM, a.CBLCLM, { cN: "important", b: "!important" }] } }; return { cI: true, i: "[=/|']", c: [a.CLCM, a.CBLCLM, { cN: "function", b: c + "\\(", e: "\\)", c: ["self", a.NM, a.ASM, a.QSM] }, { cN: "id", b: "\\#[A-Za-z0-9_-]+", r: 0 }, { cN: "class", b: "\\.[A-Za-z0-9_-]+", r: 0 }, { cN: "attr_selector", b: "\\[", e: "\\]", i: "$" }, { cN: "tag", b: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b", r: 0 }, { cN: "pseudo", b: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)" }, { cN: "pseudo", b: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)" }, { cN: "attribute", b: "\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b", i: "[^\\s]" }, { cN: "value", b: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b" }, { cN: "value", b: ":", e: ";", c: [b, a.NM, a.QSM, a.ASM, { cN: "important", b: "!important" }] }, { cN: "at_rule", b: "@", e: "[{;]", k: "mixin include extend for if else each while charset import debug media page content font-face namespace warn", c: [d, a.QSM, a.ASM, b, a.NM, { cN: "preprocessor", b: "\\s[A-Za-z0-9_.-]+", r: 0 }] }] }; });
hljs.registerLanguage("python", function (a) { var f = { cN: "prompt", b: /^(>>>|\.\.\.) / }; var b = { cN: "string", c: [a.BE], v: [{ b: /(u|b)?r?'''/, e: /'''/, c: [f], r: 10 }, { b: /(u|b)?r?"""/, e: /"""/, c: [f], r: 10 }, { b: /(u|r|ur)'/, e: /'/, r: 10 }, { b: /(u|r|ur)"/, e: /"/, r: 10 }, { b: /(b|br)'/, e: /'/, }, { b: /(b|br)"/, e: /"/, }, a.ASM, a.QSM] }; var d = { cN: "number", r: 0, v: [{ b: a.BNR + "[lLjJ]?" }, { b: "\\b(0o[0-7]+)[lLjJ]?" }, { b: a.CNR + "[lLjJ]?" }] }; var e = { cN: "params", b: /\(/, e: /\)/, c: ["self", f, d, b] }; var c = { e: /:/, i: /[${=;\n]/, c: [a.UTM, e] }; return { k: { keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False", built_in: "Ellipsis NotImplemented" }, i: /(<\/|->|\?)/, c: [f, d, b, a.HCM, a.inherit(c, { cN: "function", bK: "def", r: 10 }), a.inherit(c, { cN: "class", bK: "class" }), { cN: "decorator", b: /@/, e: /$/ }, { b: /\b(print|exec)\(/ }] }; });
hljs.registerLanguage("mel", function (a) { return { k: "int float string vector matrix if else switch case default while do for in break continue global proc return about abs addAttr addAttributeEditorNodeHelp addDynamic addNewShelfTab addPP addPanelCategory addPrefixToName advanceToNextDrivenKey affectedNet affects aimConstraint air alias aliasAttr align alignCtx alignCurve alignSurface allViewFit ambientLight angle angleBetween animCone animCurveEditor animDisplay animView annotate appendStringArray applicationName applyAttrPreset applyTake arcLenDimContext arcLengthDimension arclen arrayMapper art3dPaintCtx artAttrCtx artAttrPaintVertexCtx artAttrSkinPaintCtx artAttrTool artBuildPaintMenu artFluidAttrCtx artPuttyCtx artSelectCtx artSetPaintCtx artUserPaintCtx assignCommand assignInputDevice assignViewportFactories attachCurve attachDeviceAttr attachSurface attrColorSliderGrp attrCompatibility attrControlGrp attrEnumOptionMenu attrEnumOptionMenuGrp attrFieldGrp attrFieldSliderGrp attrNavigationControlGrp attrPresetEditWin attributeExists attributeInfo attributeMenu attributeQuery autoKeyframe autoPlace bakeClip bakeFluidShading bakePartialHistory bakeResults bakeSimulation basename basenameEx batchRender bessel bevel bevelPlus binMembership bindSkin blend2 blendShape blendShapeEditor blendShapePanel blendTwoAttr blindDataType boneLattice boundary boxDollyCtx boxZoomCtx bufferCurve buildBookmarkMenu buildKeyframeMenu button buttonManip CBG cacheFile cacheFileCombine cacheFileMerge cacheFileTrack camera cameraView canCreateManip canvas capitalizeString catch catchQuiet ceil changeSubdivComponentDisplayLevel changeSubdivRegion channelBox character characterMap characterOutlineEditor characterize chdir checkBox checkBoxGrp checkDefaultRenderGlobals choice circle circularFillet clamp clear clearCache clip clipEditor clipEditorCurrentTimeCtx clipSchedule clipSchedulerOutliner clipTrimBefore closeCurve closeSurface cluster cmdFileOutput cmdScrollFieldExecuter cmdScrollFieldReporter cmdShell coarsenSubdivSelectionList collision color colorAtPoint colorEditor colorIndex colorIndexSliderGrp colorSliderButtonGrp colorSliderGrp columnLayout commandEcho commandLine commandPort compactHairSystem componentEditor compositingInterop computePolysetVolume condition cone confirmDialog connectAttr connectControl connectDynamic connectJoint connectionInfo constrain constrainValue constructionHistory container containsMultibyte contextInfo control convertFromOldLayers convertIffToPsd convertLightmap convertSolidTx convertTessellation convertUnit copyArray copyFlexor copyKey copySkinWeights cos cpButton cpCache cpClothSet cpCollision cpConstraint cpConvClothToMesh cpForces cpGetSolverAttr cpPanel cpProperty cpRigidCollisionFilter cpSeam cpSetEdit cpSetSolverAttr cpSolver cpSolverTypes cpTool cpUpdateClothUVs createDisplayLayer createDrawCtx createEditor createLayeredPsdFile createMotionField createNewShelf createNode createRenderLayer createSubdivRegion cross crossProduct ctxAbort ctxCompletion ctxEditMode ctxTraverse currentCtx currentTime currentTimeCtx currentUnit curve curveAddPtCtx curveCVCtx curveEPCtx curveEditorCtx curveIntersect curveMoveEPCtx curveOnSurface curveSketchCtx cutKey cycleCheck cylinder dagPose date defaultLightListCheckBox defaultNavigation defineDataServer defineVirtualDevice deformer deg_to_rad delete deleteAttr deleteShadingGroupsAndMaterials deleteShelfTab deleteUI deleteUnusedBrushes delrandstr detachCurve detachDeviceAttr detachSurface deviceEditor devicePanel dgInfo dgdirty dgeval dgtimer dimWhen directKeyCtx directionalLight dirmap dirname disable disconnectAttr disconnectJoint diskCache displacementToPoly displayAffected displayColor displayCull displayLevelOfDetail displayPref displayRGBColor displaySmoothness displayStats displayString displaySurface distanceDimContext distanceDimension doBlur dolly dollyCtx dopeSheetEditor dot dotProduct doubleProfileBirailSurface drag dragAttrContext draggerContext dropoffLocator duplicate duplicateCurve duplicateSurface dynCache dynControl dynExport dynExpression dynGlobals dynPaintEditor dynParticleCtx dynPref dynRelEdPanel dynRelEditor dynamicLoad editAttrLimits editDisplayLayerGlobals editDisplayLayerMembers editRenderLayerAdjustment editRenderLayerGlobals editRenderLayerMembers editor editorTemplate effector emit emitter enableDevice encodeString endString endsWith env equivalent equivalentTol erf error eval evalDeferred evalEcho event exactWorldBoundingBox exclusiveLightCheckBox exec executeForEachObject exists exp expression expressionEditorListen extendCurve extendSurface extrude fcheck fclose feof fflush fgetline fgetword file fileBrowserDialog fileDialog fileExtension fileInfo filetest filletCurve filter filterCurve filterExpand filterStudioImport findAllIntersections findAnimCurves findKeyframe findMenuItem findRelatedSkinCluster finder firstParentOf fitBspline flexor floatEq floatField floatFieldGrp floatScrollBar floatSlider floatSlider2 floatSliderButtonGrp floatSliderGrp floor flow fluidCacheInfo fluidEmitter fluidVoxelInfo flushUndo fmod fontDialog fopen formLayout format fprint frameLayout fread freeFormFillet frewind fromNativePath fwrite gamma gauss geometryConstraint getApplicationVersionAsFloat getAttr getClassification getDefaultBrush getFileList getFluidAttr getInputDeviceRange getMayaPanelTypes getModifiers getPanel getParticleAttr getPluginResource getenv getpid glRender glRenderEditor globalStitch gmatch goal gotoBindPose grabColor gradientControl gradientControlNoAttr graphDollyCtx graphSelectContext graphTrackCtx gravity grid gridLayout group groupObjectsByName HfAddAttractorToAS HfAssignAS HfBuildEqualMap HfBuildFurFiles HfBuildFurImages HfCancelAFR HfConnectASToHF HfCreateAttractor HfDeleteAS HfEditAS HfPerformCreateAS HfRemoveAttractorFromAS HfSelectAttached HfSelectAttractors HfUnAssignAS hardenPointCurve hardware hardwareRenderPanel headsUpDisplay headsUpMessage help helpLine hermite hide hilite hitTest hotBox hotkey hotkeyCheck hsv_to_rgb hudButton hudSlider hudSliderButton hwReflectionMap hwRender hwRenderLoad hyperGraph hyperPanel hyperShade hypot iconTextButton iconTextCheckBox iconTextRadioButton iconTextRadioCollection iconTextScrollList iconTextStaticLabel ikHandle ikHandleCtx ikHandleDisplayScale ikSolver ikSplineHandleCtx ikSystem ikSystemInfo ikfkDisplayMethod illustratorCurves image imfPlugins inheritTransform insertJoint insertJointCtx insertKeyCtx insertKnotCurve insertKnotSurface instance instanceable instancer intField intFieldGrp intScrollBar intSlider intSliderGrp interToUI internalVar intersect iprEngine isAnimCurve isConnected isDirty isParentOf isSameObject isTrue isValidObjectName isValidString isValidUiName isolateSelect itemFilter itemFilterAttr itemFilterRender itemFilterType joint jointCluster jointCtx jointDisplayScale jointLattice keyTangent keyframe keyframeOutliner keyframeRegionCurrentTimeCtx keyframeRegionDirectKeyCtx keyframeRegionDollyCtx keyframeRegionInsertKeyCtx keyframeRegionMoveKeyCtx keyframeRegionScaleKeyCtx keyframeRegionSelectKeyCtx keyframeRegionSetKeyCtx keyframeRegionTrackCtx keyframeStats lassoContext lattice latticeDeformKeyCtx launch launchImageEditor layerButton layeredShaderPort layeredTexturePort layout layoutDialog lightList lightListEditor lightListPanel lightlink lineIntersection linearPrecision linstep listAnimatable listAttr listCameras listConnections listDeviceAttachments listHistory listInputDeviceAxes listInputDeviceButtons listInputDevices listMenuAnnotation listNodeTypes listPanelCategories listRelatives listSets listTransforms listUnselected listerEditor loadFluid loadNewShelf loadPlugin loadPluginLanguageResources loadPrefObjects localizedPanelLabel lockNode loft log longNameOf lookThru ls lsThroughFilter lsType lsUI Mayatomr mag makeIdentity makeLive makePaintable makeRoll makeSingleSurface makeTubeOn makebot manipMoveContext manipMoveLimitsCtx manipOptions manipRotateContext manipRotateLimitsCtx manipScaleContext manipScaleLimitsCtx marker match max memory menu menuBarLayout menuEditor menuItem menuItemToShelf menuSet menuSetPref messageLine min minimizeApp mirrorJoint modelCurrentTimeCtx modelEditor modelPanel mouse movIn movOut move moveIKtoFK moveKeyCtx moveVertexAlongDirection multiProfileBirailSurface mute nParticle nameCommand nameField namespace namespaceInfo newPanelItems newton nodeCast nodeIconButton nodeOutliner nodePreset nodeType noise nonLinear normalConstraint normalize nurbsBoolean nurbsCopyUVSet nurbsCube nurbsEditUV nurbsPlane nurbsSelect nurbsSquare nurbsToPoly nurbsToPolygonsPref nurbsToSubdiv nurbsToSubdivPref nurbsUVSet nurbsViewDirectionVector objExists objectCenter objectLayer objectType objectTypeUI obsoleteProc oceanNurbsPreviewPlane offsetCurve offsetCurveOnSurface offsetSurface openGLExtension openMayaPref optionMenu optionMenuGrp optionVar orbit orbitCtx orientConstraint outlinerEditor outlinerPanel overrideModifier paintEffectsDisplay pairBlend palettePort paneLayout panel panelConfiguration panelHistory paramDimContext paramDimension paramLocator parent parentConstraint particle particleExists particleInstancer particleRenderInfo partition pasteKey pathAnimation pause pclose percent performanceOptions pfxstrokes pickWalk picture pixelMove planarSrf plane play playbackOptions playblast plugAttr plugNode pluginInfo pluginResourceUtil pointConstraint pointCurveConstraint pointLight pointMatrixMult pointOnCurve pointOnSurface pointPosition poleVectorConstraint polyAppend polyAppendFacetCtx polyAppendVertex polyAutoProjection polyAverageNormal polyAverageVertex polyBevel polyBlendColor polyBlindData polyBoolOp polyBridgeEdge polyCacheMonitor polyCheck polyChipOff polyClipboard polyCloseBorder polyCollapseEdge polyCollapseFacet polyColorBlindData polyColorDel polyColorPerVertex polyColorSet polyCompare polyCone polyCopyUV polyCrease polyCreaseCtx polyCreateFacet polyCreateFacetCtx polyCube polyCut polyCutCtx polyCylinder polyCylindricalProjection polyDelEdge polyDelFacet polyDelVertex polyDuplicateAndConnect polyDuplicateEdge polyEditUV polyEditUVShell polyEvaluate polyExtrudeEdge polyExtrudeFacet polyExtrudeVertex polyFlipEdge polyFlipUV polyForceUV polyGeoSampler polyHelix polyInfo polyInstallAction polyLayoutUV polyListComponentConversion polyMapCut polyMapDel polyMapSew polyMapSewMove polyMergeEdge polyMergeEdgeCtx polyMergeFacet polyMergeFacetCtx polyMergeUV polyMergeVertex polyMirrorFace polyMoveEdge polyMoveFacet polyMoveFacetUV polyMoveUV polyMoveVertex polyNormal polyNormalPerVertex polyNormalizeUV polyOptUvs polyOptions polyOutput polyPipe polyPlanarProjection polyPlane polyPlatonicSolid polyPoke polyPrimitive polyPrism polyProjection polyPyramid polyQuad polyQueryBlindData polyReduce polySelect polySelectConstraint polySelectConstraintMonitor polySelectCtx polySelectEditCtx polySeparate polySetToFaceNormal polySewEdge polyShortestPathCtx polySmooth polySoftEdge polySphere polySphericalProjection polySplit polySplitCtx polySplitEdge polySplitRing polySplitVertex polyStraightenUVBorder polySubdivideEdge polySubdivideFacet polyToSubdiv polyTorus polyTransfer polyTriangulate polyUVSet polyUnite polyWedgeFace popen popupMenu pose pow preloadRefEd print progressBar progressWindow projFileViewer projectCurve projectTangent projectionContext projectionManip promptDialog propModCtx propMove psdChannelOutliner psdEditTextureFile psdExport psdTextureFile putenv pwd python querySubdiv quit rad_to_deg radial radioButton radioButtonGrp radioCollection radioMenuItemCollection rampColorPort rand randomizeFollicles randstate rangeControl readTake rebuildCurve rebuildSurface recordAttr recordDevice redo reference referenceEdit referenceQuery refineSubdivSelectionList refresh refreshAE registerPluginResource rehash reloadImage removeJoint removeMultiInstance removePanelCategory rename renameAttr renameSelectionList renameUI render renderGlobalsNode renderInfo renderLayerButton renderLayerParent renderLayerPostProcess renderLayerUnparent renderManip renderPartition renderQualityNode renderSettings renderThumbnailUpdate renderWindowEditor renderWindowSelectContext renderer reorder reorderDeformers requires reroot resampleFluid resetAE resetPfxToPolyCamera resetTool resolutionNode retarget reverseCurve reverseSurface revolve rgb_to_hsv rigidBody rigidSolver roll rollCtx rootOf rot rotate rotationInterpolation roundConstantRadius rowColumnLayout rowLayout runTimeCommand runup sampleImage saveAllShelves saveAttrPreset saveFluid saveImage saveInitialState saveMenu savePrefObjects savePrefs saveShelf saveToolSettings scale scaleBrushBrightness scaleComponents scaleConstraint scaleKey scaleKeyCtx sceneEditor sceneUIReplacement scmh scriptCtx scriptEditorInfo scriptJob scriptNode scriptTable scriptToShelf scriptedPanel scriptedPanelType scrollField scrollLayout sculpt searchPathArray seed selLoadSettings select selectContext selectCurveCV selectKey selectKeyCtx selectKeyframeRegionCtx selectMode selectPref selectPriority selectType selectedNodes selectionConnection separator setAttr setAttrEnumResource setAttrMapping setAttrNiceNameResource setConstraintRestPosition setDefaultShadingGroup setDrivenKeyframe setDynamic setEditCtx setEditor setFluidAttr setFocus setInfinity setInputDeviceMapping setKeyCtx setKeyPath setKeyframe setKeyframeBlendshapeTargetWts setMenuMode setNodeNiceNameResource setNodeTypeFlag setParent setParticleAttr setPfxToPolyCamera setPluginResource setProject setStampDensity setStartupMessage setState setToolTo setUITemplate setXformManip sets shadingConnection shadingGeometryRelCtx shadingLightRelCtx shadingNetworkCompare shadingNode shapeCompare shelfButton shelfLayout shelfTabLayout shellField shortNameOf showHelp showHidden showManipCtx showSelectionInTitle showShadingGroupAttrEditor showWindow sign simplify sin singleProfileBirailSurface size sizeBytes skinCluster skinPercent smoothCurve smoothTangentSurface smoothstep snap2to2 snapKey snapMode snapTogetherCtx snapshot soft softMod softModCtx sort sound soundControl source spaceLocator sphere sphrand spotLight spotLightPreviewPort spreadSheetEditor spring sqrt squareSurface srtContext stackTrace startString startsWith stitchAndExplodeShell stitchSurface stitchSurfacePoints strcmp stringArrayCatenate stringArrayContains stringArrayCount stringArrayInsertAtIndex stringArrayIntersector stringArrayRemove stringArrayRemoveAtIndex stringArrayRemoveDuplicates stringArrayRemoveExact stringArrayToString stringToStringArray strip stripPrefixFromName stroke subdAutoProjection subdCleanTopology subdCollapse subdDuplicateAndConnect subdEditUV subdListComponentConversion subdMapCut subdMapSewMove subdMatchTopology subdMirror subdToBlind subdToPoly subdTransferUVsToCache subdiv subdivCrease subdivDisplaySmoothness substitute substituteAllString substituteGeometry substring surface surfaceSampler surfaceShaderList swatchDisplayPort switchTable symbolButton symbolCheckBox sysFile system tabLayout tan tangentConstraint texLatticeDeformContext texManipContext texMoveContext texMoveUVShellContext texRotateContext texScaleContext texSelectContext texSelectShortestPathCtx texSmudgeUVContext texWinToolCtx text textCurves textField textFieldButtonGrp textFieldGrp textManip textScrollList textToShelf textureDisplacePlane textureHairColor texturePlacementContext textureWindow threadCount threePointArcCtx timeControl timePort timerX toNativePath toggle toggleAxis toggleWindowVisibility tokenize tokenizeList tolerance tolower toolButton toolCollection toolDropped toolHasOptions toolPropertyWindow torus toupper trace track trackCtx transferAttributes transformCompare transformLimits translator trim trunc truncateFluidCache truncateHairCache tumble tumbleCtx turbulence twoPointArcCtx uiRes uiTemplate unassignInputDevice undo undoInfo ungroup uniform unit unloadPlugin untangleUV untitledFileName untrim upAxis updateAE userCtx uvLink uvSnapshot validateShelfName vectorize view2dToolCtx viewCamera viewClipPlane viewFit viewHeadOn viewLookAt viewManip viewPlace viewSet visor volumeAxis vortex waitCursor warning webBrowser webBrowserPrefs whatIs window windowPref wire wireContext workspace wrinkle wrinkleContext writeTake xbmLangPathList xform", i: "</", c: [a.CNM, a.ASM, a.QSM, { cN: "string", b: "`", e: "`", c: [a.BE] }, { cN: "variable", v: [{ b: "\\$\\d" }, { b: "[\\$\\%\\@](\\^\\w\\b|#\\w+|[^\\s\\w{]|{\\w+}|\\w+)" }, { b: "\\*(\\^\\w\\b|#\\w+|[^\\s\\w{]|{\\w+}|\\w+)", r: 0 }] }, a.CLCM, a.CBLCLM] }; });
hljs.registerLanguage("dos", function (a) { return { cI: true, k: { flow: "if else goto for in do call exit not exist errorlevel defined equ neq lss leq gtr geq", keyword: "shift cd dir echo setlocal endlocal set pause copy", stream: "prn nul lpt3 lpt2 lpt1 con com4 com3 com2 com1 aux", winutils: "ping net ipconfig taskkill xcopy ren del" }, c: [{ cN: "envvar", b: "%%[^ ]" }, { cN: "envvar", b: "%[^ ]+?%" }, { cN: "envvar", b: "![^ ]+?!" }, { cN: "number", b: "\\b\\d+", r: 0 }, { cN: "comment", b: "@?rem", e: "$" }] }; });
hljs.registerLanguage("java", function (b) { var a = "false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws"; return { k: a, i: /<\//, c: [{ cN: "javadoc", b: "/\\*\\*", e: "\\*/", c: [{ cN: "javadoctag", b: "(^|\\s)@[A-Za-z]+" }], r: 10 }, b.CLCM, b.CBLCLM, b.ASM, b.QSM, { bK: "protected public private", e: /[{;=]/, k: a, c: [{ cN: "class", bK: "class interface", eW: true, i: /[:"<>]/, c: [{ bK: "extends implements", r: 10 }, b.UTM] }, { b: b.UIR + "\\s*\\(", rB: true, c: [b.UTM] }] }, b.CNM, { cN: "annotation", b: "@[A-Za-z]+" }] }; });
hljs.registerLanguage("tex", function (a) { var d = { cN: "command", b: "\\\\[a-zA-Zа-яА-я]+[\\*]?" }; var c = { cN: "command", b: "\\\\[^a-zA-Zа-яА-я0-9]" }; var b = { cN: "special", b: "[{}\\[\\]\\&#~]", r: 0 }; return { c: [{ b: "\\\\[a-zA-Zа-яА-я]+[\\*]? *= *-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?", rB: true, c: [d, c, { cN: "number", b: " *=", e: "-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?", eB: true }], r: 10 }, d, c, b, { cN: "formula", b: "\\$\\$", e: "\\$\\$", c: [d, c, b], r: 0 }, { cN: "formula", b: "\\$", e: "\\$", c: [d, c, b], r: 0 }, { cN: "comment", b: "%", e: "$", r: 0 }] }; });
hljs.registerLanguage("glsl", function (a) { return { k: { keyword: "atomic_uint attribute bool break bvec2 bvec3 bvec4 case centroid coherent const continue default discard dmat2 dmat2x2 dmat2x3 dmat2x4 dmat3 dmat3x2 dmat3x3 dmat3x4 dmat4 dmat4x2 dmat4x3 dmat4x4 do double dvec2 dvec3 dvec4 else flat float for highp if iimage1D iimage1DArray iimage2D iimage2DArray iimage2DMS iimage2DMSArray iimage2DRect iimage3D iimageBuffer iimageCube iimageCubeArray image1D image1DArray image2D image2DArray image2DMS image2DMSArray image2DRect image3D imageBuffer imageCube imageCubeArray in inout int invariant isampler1D isampler1DArray isampler2D isampler2DArray isampler2DMS isampler2DMSArray isampler2DRect isampler3D isamplerBuffer isamplerCube isamplerCubeArray ivec2 ivec3 ivec4 layout lowp mat2 mat2x2 mat2x3 mat2x4 mat3 mat3x2 mat3x3 mat3x4 mat4 mat4x2 mat4x3 mat4x4 mediump noperspective out patch precision readonly restrict return sample sampler1D sampler1DArray sampler1DArrayShadow sampler1DShadow sampler2D sampler2DArray sampler2DArrayShadow sampler2DMS sampler2DMSArray sampler2DRect sampler2DRectShadow sampler2DShadow sampler3D samplerBuffer samplerCube samplerCubeArray samplerCubeArrayShadow samplerCubeShadow smooth struct subroutine switch uimage1D uimage1DArray uimage2D uimage2DArray uimage2DMS uimage2DMSArray uimage2DRect uimage3D uimageBuffer uimageCube uimageCubeArray uint uniform usampler1D usampler1DArray usampler2D usampler2DArray usampler2DMS usampler2DMSArray usampler2DRect usampler3D usamplerBuffer usamplerCube usamplerCubeArray uvec2 uvec3 uvec4 varying vec2 vec3 vec4 void volatile while writeonly", built_in: "gl_BackColor gl_BackLightModelProduct gl_BackLightProduct gl_BackMaterial gl_BackSecondaryColor gl_ClipDistance gl_ClipPlane gl_ClipVertex gl_Color gl_DepthRange gl_EyePlaneQ gl_EyePlaneR gl_EyePlaneS gl_EyePlaneT gl_Fog gl_FogCoord gl_FogFragCoord gl_FragColor gl_FragCoord gl_FragData gl_FragDepth gl_FrontColor gl_FrontFacing gl_FrontLightModelProduct gl_FrontLightProduct gl_FrontMaterial gl_FrontSecondaryColor gl_InstanceID gl_InvocationID gl_Layer gl_LightModel gl_LightSource gl_MaxAtomicCounterBindings gl_MaxAtomicCounterBufferSize gl_MaxClipDistances gl_MaxClipPlanes gl_MaxCombinedAtomicCounterBuffers gl_MaxCombinedAtomicCounters gl_MaxCombinedImageUniforms gl_MaxCombinedImageUnitsAndFragmentOutputs gl_MaxCombinedTextureImageUnits gl_MaxDrawBuffers gl_MaxFragmentAtomicCounterBuffers gl_MaxFragmentAtomicCounters gl_MaxFragmentImageUniforms gl_MaxFragmentInputComponents gl_MaxFragmentUniformComponents gl_MaxFragmentUniformVectors gl_MaxGeometryAtomicCounterBuffers gl_MaxGeometryAtomicCounters gl_MaxGeometryImageUniforms gl_MaxGeometryInputComponents gl_MaxGeometryOutputComponents gl_MaxGeometryOutputVertices gl_MaxGeometryTextureImageUnits gl_MaxGeometryTotalOutputComponents gl_MaxGeometryUniformComponents gl_MaxGeometryVaryingComponents gl_MaxImageSamples gl_MaxImageUnits gl_MaxLights gl_MaxPatchVertices gl_MaxProgramTexelOffset gl_MaxTessControlAtomicCounterBuffers gl_MaxTessControlAtomicCounters gl_MaxTessControlImageUniforms gl_MaxTessControlInputComponents gl_MaxTessControlOutputComponents gl_MaxTessControlTextureImageUnits gl_MaxTessControlTotalOutputComponents gl_MaxTessControlUniformComponents gl_MaxTessEvaluationAtomicCounterBuffers gl_MaxTessEvaluationAtomicCounters gl_MaxTessEvaluationImageUniforms gl_MaxTessEvaluationInputComponents gl_MaxTessEvaluationOutputComponents gl_MaxTessEvaluationTextureImageUnits gl_MaxTessEvaluationUniformComponents gl_MaxTessGenLevel gl_MaxTessPatchComponents gl_MaxTextureCoords gl_MaxTextureImageUnits gl_MaxTextureUnits gl_MaxVaryingComponents gl_MaxVaryingFloats gl_MaxVaryingVectors gl_MaxVertexAtomicCounterBuffers gl_MaxVertexAtomicCounters gl_MaxVertexAttribs gl_MaxVertexImageUniforms gl_MaxVertexOutputComponents gl_MaxVertexTextureImageUnits gl_MaxVertexUniformComponents gl_MaxVertexUniformVectors gl_MaxViewports gl_MinProgramTexelOffsetgl_ModelViewMatrix gl_ModelViewMatrixInverse gl_ModelViewMatrixInverseTranspose gl_ModelViewMatrixTranspose gl_ModelViewProjectionMatrix gl_ModelViewProjectionMatrixInverse gl_ModelViewProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixTranspose gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_Normal gl_NormalMatrix gl_NormalScale gl_ObjectPlaneQ gl_ObjectPlaneR gl_ObjectPlaneS gl_ObjectPlaneT gl_PatchVerticesIn gl_PerVertex gl_Point gl_PointCoord gl_PointSize gl_Position gl_PrimitiveID gl_PrimitiveIDIn gl_ProjectionMatrix gl_ProjectionMatrixInverse gl_ProjectionMatrixInverseTranspose gl_ProjectionMatrixTranspose gl_SampleID gl_SampleMask gl_SampleMaskIn gl_SamplePosition gl_SecondaryColor gl_TessCoord gl_TessLevelInner gl_TessLevelOuter gl_TexCoord gl_TextureEnvColor gl_TextureMatrixInverseTranspose gl_TextureMatrixTranspose gl_Vertex gl_VertexID gl_ViewportIndex gl_in gl_out EmitStreamVertex EmitVertex EndPrimitive EndStreamPrimitive abs acos acosh all any asin asinh atan atanh atomicCounter atomicCounterDecrement atomicCounterIncrement barrier bitCount bitfieldExtract bitfieldInsert bitfieldReverse ceil clamp cos cosh cross dFdx dFdy degrees determinant distance dot equal exp exp2 faceforward findLSB findMSB floatBitsToInt floatBitsToUint floor fma fract frexp ftransform fwidth greaterThan greaterThanEqual imageAtomicAdd imageAtomicAnd imageAtomicCompSwap imageAtomicExchange imageAtomicMax imageAtomicMin imageAtomicOr imageAtomicXor imageLoad imageStore imulExtended intBitsToFloat interpolateAtCentroid interpolateAtOffset interpolateAtSample inverse inversesqrt isinf isnan ldexp length lessThan lessThanEqual log log2 matrixCompMult max memoryBarrier min mix mod modf noise1 noise2 noise3 noise4 normalize not notEqual outerProduct packDouble2x32 packHalf2x16 packSnorm2x16 packSnorm4x8 packUnorm2x16 packUnorm4x8 pow radians reflect refract round roundEven shadow1D shadow1DLod shadow1DProj shadow1DProjLod shadow2D shadow2DLod shadow2DProj shadow2DProjLod sign sin sinh smoothstep sqrt step tan tanh texelFetch texelFetchOffset texture texture1D texture1DLod texture1DProj texture1DProjLod texture2D texture2DLod texture2DProj texture2DProjLod texture3D texture3DLod texture3DProj texture3DProjLod textureCube textureCubeLod textureGather textureGatherOffset textureGatherOffsets textureGrad textureGradOffset textureLod textureLodOffset textureOffset textureProj textureProjGrad textureProjGradOffset textureProjLod textureProjLodOffset textureProjOffset textureQueryLod textureSize transpose trunc uaddCarry uintBitsToFloat umulExtended unpackDouble2x32 unpackHalf2x16 unpackSnorm2x16 unpackSnorm4x8 unpackUnorm2x16 unpackUnorm4x8 usubBorrow gl_TextureMatrix gl_TextureMatrixInverse", literal: "true false" }, i: '"', c: [a.CLCM, a.CBLCLM, a.CNM, { cN: "preprocessor", b: "#", e: "$" }] }; });
hljs.registerLanguage("brainfuck", function (b) { var a = { cN: "literal", b: "[\\+\\-]", r: 0 }; return { c: [{ cN: "comment", b: "[^\\[\\]\\.,\\+\\-<> \r\n]", rE: true, e: "[\\[\\]\\.,\\+\\-<> \r\n]", r: 0 }, { cN: "title", b: "[\\[\\]]", r: 0 }, { cN: "string", b: "[\\.,]", r: 0 }, { b: /\+\+|\-\-/, rB: true, c: [a] }, a] }; });
hljs.registerLanguage("mathematica", function (a) { return { aliases: ["mma"], l: "(\\$|\\b)" + a.IR + "\\b", k: "AbelianGroup Abort AbortKernels AbortProtect Above Abs Absolute AbsoluteCorrelation AbsoluteCorrelationFunction AbsoluteCurrentValue AbsoluteDashing AbsoluteFileName AbsoluteOptions AbsolutePointSize AbsoluteThickness AbsoluteTime AbsoluteTiming AccountingForm Accumulate Accuracy AccuracyGoal ActionDelay ActionMenu ActionMenuBox ActionMenuBoxOptions Active ActiveItem ActiveStyle AcyclicGraphQ AddOnHelpPath AddTo AdjacencyGraph AdjacencyList AdjacencyMatrix AdjustmentBox AdjustmentBoxOptions AdjustTimeSeriesForecast AffineTransform After AiryAi AiryAiPrime AiryAiZero AiryBi AiryBiPrime AiryBiZero AlgebraicIntegerQ AlgebraicNumber AlgebraicNumberDenominator AlgebraicNumberNorm AlgebraicNumberPolynomial AlgebraicNumberTrace AlgebraicRules AlgebraicRulesData Algebraics AlgebraicUnitQ Alignment AlignmentMarker AlignmentPoint All AllowedDimensions AllowGroupClose AllowInlineCells AllowKernelInitialization AllowReverseGroupClose AllowScriptLevelChange AlphaChannel AlternatingGroup AlternativeHypothesis Alternatives AmbientLight Analytic AnchoredSearch And AndersonDarlingTest AngerJ AngleBracket AngularGauge Animate AnimationCycleOffset AnimationCycleRepetitions AnimationDirection AnimationDisplayTime AnimationRate AnimationRepetitions AnimationRunning Animator AnimatorBox AnimatorBoxOptions AnimatorElements Annotation Annuity AnnuityDue Antialiasing Antisymmetric Apart ApartSquareFree Appearance AppearanceElements AppellF1 Append AppendTo Apply ArcCos ArcCosh ArcCot ArcCoth ArcCsc ArcCsch ArcSec ArcSech ArcSin ArcSinDistribution ArcSinh ArcTan ArcTanh Arg ArgMax ArgMin ArgumentCountQ ARIMAProcess ArithmeticGeometricMean ARMAProcess ARProcess Array ArrayComponents ArrayDepth ArrayFlatten ArrayPad ArrayPlot ArrayQ ArrayReshape ArrayRules Arrays Arrow Arrow3DBox ArrowBox Arrowheads AspectRatio AspectRatioFixed Assert Assuming Assumptions AstronomicalData Asynchronous AsynchronousTaskObject AsynchronousTasks AtomQ Attributes AugmentedSymmetricPolynomial AutoAction AutoDelete AutoEvaluateEvents AutoGeneratedPackage AutoIndent AutoIndentSpacings AutoItalicWords AutoloadPath AutoMatch Automatic AutomaticImageSize AutoMultiplicationSymbol AutoNumberFormatting AutoOpenNotebooks AutoOpenPalettes AutorunSequencing AutoScaling AutoScroll AutoSpacing AutoStyleOptions AutoStyleWords Axes AxesEdge AxesLabel AxesOrigin AxesStyle Axis BabyMonsterGroupB Back Background BackgroundTasksSettings Backslash Backsubstitution Backward Band BandpassFilter BandstopFilter BarabasiAlbertGraphDistribution BarChart BarChart3D BarLegend BarlowProschanImportance BarnesG BarOrigin BarSpacing BartlettHannWindow BartlettWindow BaseForm Baseline BaselinePosition BaseStyle BatesDistribution BattleLemarieWavelet Because BeckmannDistribution Beep Before Begin BeginDialogPacket BeginFrontEndInteractionPacket BeginPackage BellB BellY Below BenfordDistribution BeniniDistribution BenktanderGibratDistribution BenktanderWeibullDistribution BernoulliB BernoulliDistribution BernoulliGraphDistribution BernoulliProcess BernsteinBasis BesselFilterModel BesselI BesselJ BesselJZero BesselK BesselY BesselYZero Beta BetaBinomialDistribution BetaDistribution BetaNegativeBinomialDistribution BetaPrimeDistribution BetaRegularized BetweennessCentrality BezierCurve BezierCurve3DBox BezierCurve3DBoxOptions BezierCurveBox BezierCurveBoxOptions BezierFunction BilateralFilter Binarize BinaryFormat BinaryImageQ BinaryRead BinaryReadList BinaryWrite BinCounts BinLists Binomial BinomialDistribution BinomialProcess BinormalDistribution BiorthogonalSplineWavelet BipartiteGraphQ BirnbaumImportance BirnbaumSaundersDistribution BitAnd BitClear BitGet BitLength BitNot BitOr BitSet BitShiftLeft BitShiftRight BitXor Black BlackmanHarrisWindow BlackmanNuttallWindow BlackmanWindow Blank BlankForm BlankNullSequence BlankSequence Blend Block BlockRandom BlomqvistBeta BlomqvistBetaTest Blue Blur BodePlot BohmanWindow Bold Bookmarks Boole BooleanConsecutiveFunction BooleanConvert BooleanCountingFunction BooleanFunction BooleanGraph BooleanMaxterms BooleanMinimize BooleanMinterms Booleans BooleanTable BooleanVariables BorderDimensions BorelTannerDistribution Bottom BottomHatTransform BoundaryStyle Bounds Box BoxBaselineShift BoxData BoxDimensions Boxed Boxes BoxForm BoxFormFormatTypes BoxFrame BoxID BoxMargins BoxMatrix BoxRatios BoxRotation BoxRotationPoint BoxStyle BoxWhiskerChart Bra BracketingBar BraKet BrayCurtisDistance BreadthFirstScan Break Brown BrownForsytheTest BrownianBridgeProcess BrowserCategory BSplineBasis BSplineCurve BSplineCurve3DBox BSplineCurveBox BSplineCurveBoxOptions BSplineFunction BSplineSurface BSplineSurface3DBox BubbleChart BubbleChart3D BubbleScale BubbleSizes BulletGauge BusinessDayQ ButterflyGraph ButterworthFilterModel Button ButtonBar ButtonBox ButtonBoxOptions ButtonCell ButtonContents ButtonData ButtonEvaluator ButtonExpandable ButtonFrame ButtonFunction ButtonMargins ButtonMinHeight ButtonNote ButtonNotebook ButtonSource ButtonStyle ButtonStyleMenuListing Byte ByteCount ByteOrdering C CachedValue CacheGraphics CalendarData CalendarType CallPacket CanberraDistance Cancel CancelButton CandlestickChart Cap CapForm CapitalDifferentialD CardinalBSplineBasis CarmichaelLambda Cases Cashflow Casoratian Catalan CatalanNumber Catch CauchyDistribution CauchyWindow CayleyGraph CDF CDFDeploy CDFInformation CDFWavelet Ceiling Cell CellAutoOverwrite CellBaseline CellBoundingBox CellBracketOptions CellChangeTimes CellContents CellContext CellDingbat CellDynamicExpression CellEditDuplicate CellElementsBoundingBox CellElementSpacings CellEpilog CellEvaluationDuplicate CellEvaluationFunction CellEventActions CellFrame CellFrameColor CellFrameLabelMargins CellFrameLabels CellFrameMargins CellGroup CellGroupData CellGrouping CellGroupingRules CellHorizontalScrolling CellID CellLabel CellLabelAutoDelete CellLabelMargins CellLabelPositioning CellMargins CellObject CellOpen CellPrint CellProlog Cells CellSize CellStyle CellTags CellularAutomaton CensoredDistribution Censoring Center CenterDot CentralMoment CentralMomentGeneratingFunction CForm ChampernowneNumber ChanVeseBinarize Character CharacterEncoding CharacterEncodingsPath CharacteristicFunction CharacteristicPolynomial CharacterRange Characters ChartBaseStyle ChartElementData ChartElementDataFunction ChartElementFunction ChartElements ChartLabels ChartLayout ChartLegends ChartStyle Chebyshev1FilterModel Chebyshev2FilterModel ChebyshevDistance ChebyshevT ChebyshevU Check CheckAbort CheckAll Checkbox CheckboxBar CheckboxBox CheckboxBoxOptions ChemicalData ChessboardDistance ChiDistribution ChineseRemainder ChiSquareDistribution ChoiceButtons ChoiceDialog CholeskyDecomposition Chop Circle CircleBox CircleDot CircleMinus CirclePlus CircleTimes CirculantGraph CityData Clear ClearAll ClearAttributes ClearSystemCache ClebschGordan ClickPane Clip ClipboardNotebook ClipFill ClippingStyle ClipPlanes ClipRange Clock ClockGauge ClockwiseContourIntegral Close Closed CloseKernels ClosenessCentrality Closing ClosingAutoSave ClosingEvent ClusteringComponents CMYKColor Coarse Coefficient CoefficientArrays CoefficientDomain CoefficientList CoefficientRules CoifletWavelet Collect Colon ColonForm ColorCombine ColorConvert ColorData ColorDataFunction ColorFunction ColorFunctionScaling Colorize ColorNegate ColorOutput ColorProfileData ColorQuantize ColorReplace ColorRules ColorSelectorSettings ColorSeparate ColorSetter ColorSetterBox ColorSetterBoxOptions ColorSlider ColorSpace Column ColumnAlignments ColumnBackgrounds ColumnForm ColumnLines ColumnsEqual ColumnSpacings ColumnWidths CommonDefaultFormatTypes Commonest CommonestFilter CommonUnits CommunityBoundaryStyle CommunityGraphPlot CommunityLabels CommunityRegionStyle CompatibleUnitQ CompilationOptions CompilationTarget Compile Compiled CompiledFunction Complement CompleteGraph CompleteGraphQ CompleteKaryTree CompletionsListPacket Complex Complexes ComplexExpand ComplexInfinity ComplexityFunction ComponentMeasurements ComponentwiseContextMenu Compose ComposeList ComposeSeries Composition CompoundExpression CompoundPoissonDistribution CompoundPoissonProcess CompoundRenewalProcess Compress CompressedData Condition ConditionalExpression Conditioned Cone ConeBox ConfidenceLevel ConfidenceRange ConfidenceTransform ConfigurationPath Congruent Conjugate ConjugateTranspose Conjunction Connect ConnectedComponents ConnectedGraphQ ConnesWindow ConoverTest ConsoleMessage ConsoleMessagePacket ConsolePrint Constant ConstantArray Constants ConstrainedMax ConstrainedMin ContentPadding ContentsBoundingBox ContentSelectable ContentSize Context ContextMenu Contexts ContextToFilename ContextToFileName Continuation Continue ContinuedFraction ContinuedFractionK ContinuousAction ContinuousMarkovProcess ContinuousTimeModelQ ContinuousWaveletData ContinuousWaveletTransform ContourDetect ContourGraphics ContourIntegral ContourLabels ContourLines ContourPlot ContourPlot3D Contours ContourShading ContourSmoothing ContourStyle ContraharmonicMean Control ControlActive ControlAlignment ControllabilityGramian ControllabilityMatrix ControllableDecomposition ControllableModelQ ControllerDuration ControllerInformation ControllerInformationData ControllerLinking ControllerManipulate ControllerMethod ControllerPath ControllerState ControlPlacement ControlsRendering ControlType Convergents ConversionOptions ConversionRules ConvertToBitmapPacket ConvertToPostScript ConvertToPostScriptPacket Convolve ConwayGroupCo1 ConwayGroupCo2 ConwayGroupCo3 CoordinateChartData CoordinatesToolOptions CoordinateTransform CoordinateTransformData CoprimeQ Coproduct CopulaDistribution Copyable CopyDirectory CopyFile CopyTag CopyToClipboard CornerFilter CornerNeighbors Correlation CorrelationDistance CorrelationFunction CorrelationTest Cos Cosh CoshIntegral CosineDistance CosineWindow CosIntegral Cot Coth Count CounterAssignments CounterBox CounterBoxOptions CounterClockwiseContourIntegral CounterEvaluator CounterFunction CounterIncrements CounterStyle CounterStyleMenuListing CountRoots CountryData Covariance CovarianceEstimatorFunction CovarianceFunction CoxianDistribution CoxIngersollRossProcess CoxModel CoxModelFit CramerVonMisesTest CreateArchive CreateDialog CreateDirectory CreateDocument CreateIntermediateDirectories CreatePalette CreatePalettePacket CreateScheduledTask CreateTemporary CreateWindow CriticalityFailureImportance CriticalitySuccessImportance CriticalSection Cross CrossingDetect CrossMatrix Csc Csch CubeRoot Cubics Cuboid CuboidBox Cumulant CumulantGeneratingFunction Cup CupCap Curl CurlyDoubleQuote CurlyQuote CurrentImage CurrentlySpeakingPacket CurrentValue CurvatureFlowFilter CurveClosed Cyan CycleGraph CycleIndexPolynomial Cycles CyclicGroup Cyclotomic Cylinder CylinderBox CylindricalDecomposition D DagumDistribution DamerauLevenshteinDistance DampingFactor Darker Dashed Dashing DataCompression DataDistribution DataRange DataReversed Date DateDelimiters DateDifference DateFunction DateList DateListLogPlot DateListPlot DatePattern DatePlus DateRange DateString DateTicksFormat DaubechiesWavelet DavisDistribution DawsonF DayCount DayCountConvention DayMatchQ DayName DayPlus DayRange DayRound DeBruijnGraph Debug DebugTag Decimal DeclareKnownSymbols DeclarePackage Decompose Decrement DedekindEta Default DefaultAxesStyle DefaultBaseStyle DefaultBoxStyle DefaultButton DefaultColor DefaultControlPlacement DefaultDuplicateCellStyle DefaultDuration DefaultElement DefaultFaceGridsStyle DefaultFieldHintStyle DefaultFont DefaultFontProperties DefaultFormatType DefaultFormatTypeForStyle DefaultFrameStyle DefaultFrameTicksStyle DefaultGridLinesStyle DefaultInlineFormatType DefaultInputFormatType DefaultLabelStyle DefaultMenuStyle DefaultNaturalLanguage DefaultNewCellStyle DefaultNewInlineCellStyle DefaultNotebook DefaultOptions DefaultOutputFormatType DefaultStyle DefaultStyleDefinitions DefaultTextFormatType DefaultTextInlineFormatType DefaultTicksStyle DefaultTooltipStyle DefaultValues Defer DefineExternal DefineInputStreamMethod DefineOutputStreamMethod Definition Degree DegreeCentrality DegreeGraphDistribution DegreeLexicographic DegreeReverseLexicographic Deinitialization Del Deletable Delete DeleteBorderComponents DeleteCases DeleteContents DeleteDirectory DeleteDuplicates DeleteFile DeleteSmallComponents DeleteWithContents DeletionWarning Delimiter DelimiterFlashTime DelimiterMatching Delimiters Denominator DensityGraphics DensityHistogram DensityPlot DependentVariables Deploy Deployed Depth DepthFirstScan Derivative DerivativeFilter DescriptorStateSpace DesignMatrix Det DGaussianWavelet DiacriticalPositioning Diagonal DiagonalMatrix Dialog DialogIndent DialogInput DialogLevel DialogNotebook DialogProlog DialogReturn DialogSymbols Diamond DiamondMatrix DiceDissimilarity DictionaryLookup DifferenceDelta DifferenceOrder DifferenceRoot DifferenceRootReduce Differences DifferentialD DifferentialRoot DifferentialRootReduce DifferentiatorFilter DigitBlock DigitBlockMinimum DigitCharacter DigitCount DigitQ DihedralGroup Dilation Dimensions DiracComb DiracDelta DirectedEdge DirectedEdges DirectedGraph DirectedGraphQ DirectedInfinity Direction Directive Directory DirectoryName DirectoryQ DirectoryStack DirichletCharacter DirichletConvolve DirichletDistribution DirichletL DirichletTransform DirichletWindow DisableConsolePrintPacket DiscreteChirpZTransform DiscreteConvolve DiscreteDelta DiscreteHadamardTransform DiscreteIndicator DiscreteLQEstimatorGains DiscreteLQRegulatorGains DiscreteLyapunovSolve DiscreteMarkovProcess DiscretePlot DiscretePlot3D DiscreteRatio DiscreteRiccatiSolve DiscreteShift DiscreteTimeModelQ DiscreteUniformDistribution DiscreteVariables DiscreteWaveletData DiscreteWaveletPacketTransform DiscreteWaveletTransform Discriminant Disjunction Disk DiskBox DiskMatrix Dispatch DispersionEstimatorFunction Display DisplayAllSteps DisplayEndPacket DisplayFlushImagePacket DisplayForm DisplayFunction DisplayPacket DisplayRules DisplaySetSizePacket DisplayString DisplayTemporary DisplayWith DisplayWithRef DisplayWithVariable DistanceFunction DistanceTransform Distribute Distributed DistributedContexts DistributeDefinitions DistributionChart DistributionDomain DistributionFitTest DistributionParameterAssumptions DistributionParameterQ Dithering Div Divergence Divide DivideBy Dividers Divisible Divisors DivisorSigma DivisorSum DMSList DMSString Do DockedCells DocumentNotebook DominantColors DOSTextFormat Dot DotDashed DotEqual Dotted DoubleBracketingBar DoubleContourIntegral DoubleDownArrow DoubleLeftArrow DoubleLeftRightArrow DoubleLeftTee DoubleLongLeftArrow DoubleLongLeftRightArrow DoubleLongRightArrow DoubleRightArrow DoubleRightTee DoubleUpArrow DoubleUpDownArrow DoubleVerticalBar DoublyInfinite Down DownArrow DownArrowBar DownArrowUpArrow DownLeftRightVector DownLeftTeeVector DownLeftVector DownLeftVectorBar DownRightTeeVector DownRightVector DownRightVectorBar Downsample DownTee DownTeeArrow DownValues DragAndDrop DrawEdges DrawFrontFaces DrawHighlighted Drop DSolve Dt DualLinearProgramming DualSystemsModel DumpGet DumpSave DuplicateFreeQ Dynamic DynamicBox DynamicBoxOptions DynamicEvaluationTimeout DynamicLocation DynamicModule DynamicModuleBox DynamicModuleBoxOptions DynamicModuleParent DynamicModuleValues DynamicName DynamicNamespace DynamicReference DynamicSetting DynamicUpdating DynamicWrapper DynamicWrapperBox DynamicWrapperBoxOptions E EccentricityCentrality EdgeAdd EdgeBetweennessCentrality EdgeCapacity EdgeCapForm EdgeColor EdgeConnectivity EdgeCost EdgeCount EdgeCoverQ EdgeDashing EdgeDelete EdgeDetect EdgeForm EdgeIndex EdgeJoinForm EdgeLabeling EdgeLabels EdgeLabelStyle EdgeList EdgeOpacity EdgeQ EdgeRenderingFunction EdgeRules EdgeShapeFunction EdgeStyle EdgeThickness EdgeWeight Editable EditButtonSettings EditCellTagsSettings EditDistance EffectiveInterest Eigensystem Eigenvalues EigenvectorCentrality Eigenvectors Element ElementData Eliminate EliminationOrder EllipticE EllipticExp EllipticExpPrime EllipticF EllipticFilterModel EllipticK EllipticLog EllipticNomeQ EllipticPi EllipticReducedHalfPeriods EllipticTheta EllipticThetaPrime EmitSound EmphasizeSyntaxErrors EmpiricalDistribution Empty EmptyGraphQ EnableConsolePrintPacket Enabled Encode End EndAdd EndDialogPacket EndFrontEndInteractionPacket EndOfFile EndOfLine EndOfString EndPackage EngineeringForm Enter EnterExpressionPacket EnterTextPacket Entropy EntropyFilter Environment Epilog Equal EqualColumns EqualRows EqualTilde EquatedTo Equilibrium EquirippleFilterKernel Equivalent Erf Erfc Erfi ErlangB ErlangC ErlangDistribution Erosion ErrorBox ErrorBoxOptions ErrorNorm ErrorPacket ErrorsDialogSettings EstimatedDistribution EstimatedProcess EstimatorGains EstimatorRegulator EuclideanDistance EulerE EulerGamma EulerianGraphQ EulerPhi Evaluatable Evaluate Evaluated EvaluatePacket EvaluationCell EvaluationCompletionAction EvaluationElements EvaluationMode EvaluationMonitor EvaluationNotebook EvaluationObject EvaluationOrder Evaluator EvaluatorNames EvenQ EventData EventEvaluator EventHandler EventHandlerTag EventLabels ExactBlackmanWindow ExactNumberQ ExactRootIsolation ExampleData Except ExcludedForms ExcludePods Exclusions ExclusionsStyle Exists Exit ExitDialog Exp Expand ExpandAll ExpandDenominator ExpandFileName ExpandNumerator Expectation ExpectationE ExpectedValue ExpGammaDistribution ExpIntegralE ExpIntegralEi Exponent ExponentFunction ExponentialDistribution ExponentialFamily ExponentialGeneratingFunction ExponentialMovingAverage ExponentialPowerDistribution ExponentPosition ExponentStep Export ExportAutoReplacements ExportPacket ExportString Expression ExpressionCell ExpressionPacket ExpToTrig ExtendedGCD Extension ExtentElementFunction ExtentMarkers ExtentSize ExternalCall ExternalDataCharacterEncoding Extract ExtractArchive ExtremeValueDistribution FaceForm FaceGrids FaceGridsStyle Factor FactorComplete Factorial Factorial2 FactorialMoment FactorialMomentGeneratingFunction FactorialPower FactorInteger FactorList FactorSquareFree FactorSquareFreeList FactorTerms FactorTermsList Fail FailureDistribution False FARIMAProcess FEDisableConsolePrintPacket FeedbackSector FeedbackSectorStyle FeedbackType FEEnableConsolePrintPacket Fibonacci FieldHint FieldHintStyle FieldMasked FieldSize File FileBaseName FileByteCount FileDate FileExistsQ FileExtension FileFormat FileHash FileInformation FileName FileNameDepth FileNameDialogSettings FileNameDrop FileNameJoin FileNames FileNameSetter FileNameSplit FileNameTake FilePrint FileType FilledCurve FilledCurveBox Filling FillingStyle FillingTransform FilterRules FinancialBond FinancialData FinancialDerivative FinancialIndicator Find FindArgMax FindArgMin FindClique FindClusters FindCurvePath FindDistributionParameters FindDivisions FindEdgeCover FindEdgeCut FindEulerianCycle FindFaces FindFile FindFit FindGeneratingFunction FindGeoLocation FindGeometricTransform FindGraphCommunities FindGraphIsomorphism FindGraphPartition FindHamiltonianCycle FindIndependentEdgeSet FindIndependentVertexSet FindInstance FindIntegerNullVector FindKClan FindKClique FindKClub FindKPlex FindLibrary FindLinearRecurrence FindList FindMaximum FindMaximumFlow FindMaxValue FindMinimum FindMinimumCostFlow FindMinimumCut FindMinValue FindPermutation FindPostmanTour FindProcessParameters FindRoot FindSequenceFunction FindSettings FindShortestPath FindShortestTour FindThreshold FindVertexCover FindVertexCut Fine FinishDynamic FiniteAbelianGroupCount FiniteGroupCount FiniteGroupData First FirstPassageTimeDistribution FischerGroupFi22 FischerGroupFi23 FischerGroupFi24Prime FisherHypergeometricDistribution FisherRatioTest FisherZDistribution Fit FitAll FittedModel FixedPoint FixedPointList FlashSelection Flat Flatten FlattenAt FlatTopWindow FlipView Floor FlushPrintOutputPacket Fold FoldList Font FontColor FontFamily FontForm FontName FontOpacity FontPostScriptName FontProperties FontReencoding FontSize FontSlant FontSubstitutions FontTracking FontVariations FontWeight For ForAll Format FormatRules FormatType FormatTypeAutoConvert FormatValues FormBox FormBoxOptions FortranForm Forward ForwardBackward Fourier FourierCoefficient FourierCosCoefficient FourierCosSeries FourierCosTransform FourierDCT FourierDCTFilter FourierDCTMatrix FourierDST FourierDSTMatrix FourierMatrix FourierParameters FourierSequenceTransform FourierSeries FourierSinCoefficient FourierSinSeries FourierSinTransform FourierTransform FourierTrigSeries FractionalBrownianMotionProcess FractionalPart FractionBox FractionBoxOptions FractionLine Frame FrameBox FrameBoxOptions Framed FrameInset FrameLabel Frameless FrameMargins FrameStyle FrameTicks FrameTicksStyle FRatioDistribution FrechetDistribution FreeQ FrequencySamplingFilterKernel FresnelC FresnelS Friday FrobeniusNumber FrobeniusSolve FromCharacterCode FromCoefficientRules FromContinuedFraction FromDate FromDigits FromDMS Front FrontEndDynamicExpression FrontEndEventActions FrontEndExecute FrontEndObject FrontEndResource FrontEndResourceString FrontEndStackSize FrontEndToken FrontEndTokenExecute FrontEndValueCache FrontEndVersion FrontFaceColor FrontFaceOpacity Full FullAxes FullDefinition FullForm FullGraphics FullOptions FullSimplify Function FunctionExpand FunctionInterpolation FunctionSpace FussellVeselyImportance GaborFilter GaborMatrix GaborWavelet GainMargins GainPhaseMargins Gamma GammaDistribution GammaRegularized GapPenalty Gather GatherBy GaugeFaceElementFunction GaugeFaceStyle GaugeFrameElementFunction GaugeFrameSize GaugeFrameStyle GaugeLabels GaugeMarkers GaugeStyle GaussianFilter GaussianIntegers GaussianMatrix GaussianWindow GCD GegenbauerC General GeneralizedLinearModelFit GenerateConditions GeneratedCell GeneratedParameters GeneratingFunction Generic GenericCylindricalDecomposition GenomeData GenomeLookup GeodesicClosing GeodesicDilation GeodesicErosion GeodesicOpening GeoDestination GeodesyData GeoDirection GeoDistance GeoGridPosition GeometricBrownianMotionProcess GeometricDistribution GeometricMean GeometricMeanFilter GeometricTransformation GeometricTransformation3DBox GeometricTransformation3DBoxOptions GeometricTransformationBox GeometricTransformationBoxOptions GeoPosition GeoPositionENU GeoPositionXYZ GeoProjectionData GestureHandler GestureHandlerTag Get GetBoundingBoxSizePacket GetContext GetEnvironment GetFileName GetFrontEndOptionsDataPacket GetLinebreakInformationPacket GetMenusPacket GetPageBreakInformationPacket Glaisher GlobalClusteringCoefficient GlobalPreferences GlobalSession Glow GoldenRatio GompertzMakehamDistribution GoodmanKruskalGamma GoodmanKruskalGammaTest Goto Grad Gradient GradientFilter GradientOrientationFilter Graph GraphAssortativity GraphCenter GraphComplement GraphData GraphDensity GraphDiameter GraphDifference GraphDisjointUnion GraphDistance GraphDistanceMatrix GraphElementData GraphEmbedding GraphHighlight GraphHighlightStyle GraphHub Graphics Graphics3D Graphics3DBox Graphics3DBoxOptions GraphicsArray GraphicsBaseline GraphicsBox GraphicsBoxOptions GraphicsColor GraphicsColumn GraphicsComplex GraphicsComplex3DBox GraphicsComplex3DBoxOptions GraphicsComplexBox GraphicsComplexBoxOptions GraphicsContents GraphicsData GraphicsGrid GraphicsGridBox GraphicsGroup GraphicsGroup3DBox GraphicsGroup3DBoxOptions GraphicsGroupBox GraphicsGroupBoxOptions GraphicsGrouping GraphicsHighlightColor GraphicsRow GraphicsSpacing GraphicsStyle GraphIntersection GraphLayout GraphLinkEfficiency GraphPeriphery GraphPlot GraphPlot3D GraphPower GraphPropertyDistribution GraphQ GraphRadius GraphReciprocity GraphRoot GraphStyle GraphUnion Gray GrayLevel GreatCircleDistance Greater GreaterEqual GreaterEqualLess GreaterFullEqual GreaterGreater GreaterLess GreaterSlantEqual GreaterTilde Green Grid GridBaseline GridBox GridBoxAlignment GridBoxBackground GridBoxDividers GridBoxFrame GridBoxItemSize GridBoxItemStyle GridBoxOptions GridBoxSpacings GridCreationSettings GridDefaultElement GridElementStyleOptions GridFrame GridFrameMargins GridGraph GridLines GridLinesStyle GroebnerBasis GroupActionBase GroupCentralizer GroupElementFromWord GroupElementPosition GroupElementQ GroupElements GroupElementToWord GroupGenerators GroupMultiplicationTable GroupOrbits GroupOrder GroupPageBreakWithin GroupSetwiseStabilizer GroupStabilizer GroupStabilizerChain Gudermannian GumbelDistribution HaarWavelet HadamardMatrix HalfNormalDistribution HamiltonianGraphQ HammingDistance HammingWindow HankelH1 HankelH2 HankelMatrix HannPoissonWindow HannWindow HaradaNortonGroupHN HararyGraph HarmonicMean HarmonicMeanFilter HarmonicNumber Hash HashTable Haversine HazardFunction Head HeadCompose Heads HeavisideLambda HeavisidePi HeavisideTheta HeldGroupHe HeldPart HelpBrowserLookup HelpBrowserNotebook HelpBrowserSettings HermiteDecomposition HermiteH HermitianMatrixQ HessenbergDecomposition Hessian HexadecimalCharacter Hexahedron HexahedronBox HexahedronBoxOptions HiddenSurface HighlightGraph HighlightImage HighpassFilter HigmanSimsGroupHS HilbertFilter HilbertMatrix Histogram Histogram3D HistogramDistribution HistogramList HistogramTransform HistogramTransformInterpolation HitMissTransform HITSCentrality HodgeDual HoeffdingD HoeffdingDTest Hold HoldAll HoldAllComplete HoldComplete HoldFirst HoldForm HoldPattern HoldRest HolidayCalendar HomeDirectory HomePage Horizontal HorizontalForm HorizontalGauge HorizontalScrollPosition HornerForm HotellingTSquareDistribution HoytDistribution HTMLSave Hue HumpDownHump HumpEqual HurwitzLerchPhi HurwitzZeta HyperbolicDistribution HypercubeGraph HyperexponentialDistribution Hyperfactorial Hypergeometric0F1 Hypergeometric0F1Regularized Hypergeometric1F1 Hypergeometric1F1Regularized Hypergeometric2F1 Hypergeometric2F1Regularized HypergeometricDistribution HypergeometricPFQ HypergeometricPFQRegularized HypergeometricU Hyperlink HyperlinkCreationSettings Hyphenation HyphenationOptions HypoexponentialDistribution HypothesisTestData I Identity IdentityMatrix If IgnoreCase Im Image Image3D Image3DSlices ImageAccumulate ImageAdd ImageAdjust ImageAlign ImageApply ImageAspectRatio ImageAssemble ImageCache ImageCacheValid ImageCapture ImageChannels ImageClip ImageColorSpace ImageCompose ImageConvolve ImageCooccurrence ImageCorners ImageCorrelate ImageCorrespondingPoints ImageCrop ImageData ImageDataPacket ImageDeconvolve ImageDemosaic ImageDifference ImageDimensions ImageDistance ImageEffect ImageFeatureTrack ImageFileApply ImageFileFilter ImageFileScan ImageFilter ImageForestingComponents ImageForwardTransformation ImageHistogram ImageKeypoints ImageLevels ImageLines ImageMargins ImageMarkers ImageMeasurements ImageMultiply ImageOffset ImagePad ImagePadding ImagePartition ImagePeriodogram ImagePerspectiveTransformation ImageQ ImageRangeCache ImageReflect ImageRegion ImageResize ImageResolution ImageRotate ImageRotated ImageScaled ImageScan ImageSize ImageSizeAction ImageSizeCache ImageSizeMultipliers ImageSizeRaw ImageSubtract ImageTake ImageTransformation ImageTrim ImageType ImageValue ImageValuePositions Implies Import ImportAutoReplacements ImportString ImprovementImportance In IncidenceGraph IncidenceList IncidenceMatrix IncludeConstantBasis IncludeFileExtension IncludePods IncludeSingularTerm Increment Indent IndentingNewlineSpacings IndentMaxFraction IndependenceTest IndependentEdgeSetQ IndependentUnit IndependentVertexSetQ Indeterminate IndexCreationOptions Indexed IndexGraph IndexTag Inequality InexactNumberQ InexactNumbers Infinity Infix Information Inherited InheritScope Initialization InitializationCell InitializationCellEvaluation InitializationCellWarning InlineCounterAssignments InlineCounterIncrements InlineRules Inner Inpaint Input InputAliases InputAssumptions InputAutoReplacements InputField InputFieldBox InputFieldBoxOptions InputForm InputGrouping InputNamePacket InputNotebook InputPacket InputSettings InputStream InputString InputStringPacket InputToBoxFormPacket Insert InsertionPointObject InsertResults Inset Inset3DBox Inset3DBoxOptions InsetBox InsetBoxOptions Install InstallService InString Integer IntegerDigits IntegerExponent IntegerLength IntegerPart IntegerPartitions IntegerQ Integers IntegerString Integral Integrate Interactive InteractiveTradingChart Interlaced Interleaving InternallyBalancedDecomposition InterpolatingFunction InterpolatingPolynomial Interpolation InterpolationOrder InterpolationPoints InterpolationPrecision Interpretation InterpretationBox InterpretationBoxOptions InterpretationFunction InterpretTemplate InterquartileRange Interrupt InterruptSettings Intersection Interval IntervalIntersection IntervalMemberQ IntervalUnion Inverse InverseBetaRegularized InverseCDF InverseChiSquareDistribution InverseContinuousWaveletTransform InverseDistanceTransform InverseEllipticNomeQ InverseErf InverseErfc InverseFourier InverseFourierCosTransform InverseFourierSequenceTransform InverseFourierSinTransform InverseFourierTransform InverseFunction InverseFunctions InverseGammaDistribution InverseGammaRegularized InverseGaussianDistribution InverseGudermannian InverseHaversine InverseJacobiCD InverseJacobiCN InverseJacobiCS InverseJacobiDC InverseJacobiDN InverseJacobiDS InverseJacobiNC InverseJacobiND InverseJacobiNS InverseJacobiSC InverseJacobiSD InverseJacobiSN InverseLaplaceTransform InversePermutation InverseRadon InverseSeries InverseSurvivalFunction InverseWaveletTransform InverseWeierstrassP InverseZTransform Invisible InvisibleApplication InvisibleTimes IrreduciblePolynomialQ IsolatingInterval IsomorphicGraphQ IsotopeData Italic Item ItemBox ItemBoxOptions ItemSize ItemStyle ItoProcess JaccardDissimilarity JacobiAmplitude Jacobian JacobiCD JacobiCN JacobiCS JacobiDC JacobiDN JacobiDS JacobiNC JacobiND JacobiNS JacobiP JacobiSC JacobiSD JacobiSN JacobiSymbol JacobiZeta JankoGroupJ1 JankoGroupJ2 JankoGroupJ3 JankoGroupJ4 JarqueBeraALMTest JohnsonDistribution Join Joined JoinedCurve JoinedCurveBox JoinForm JordanDecomposition JordanModelDecomposition K KagiChart KaiserBesselWindow KaiserWindow KalmanEstimator KalmanFilter KarhunenLoeveDecomposition KaryTree KatzCentrality KCoreComponents KDistribution KelvinBei KelvinBer KelvinKei KelvinKer KendallTau KendallTauTest KernelExecute KernelMixtureDistribution KernelObject Kernels Ket Khinchin KirchhoffGraph KirchhoffMatrix KleinInvariantJ KnightTourGraph KnotData KnownUnitQ KolmogorovSmirnovTest KroneckerDelta KroneckerModelDecomposition KroneckerProduct KroneckerSymbol KuiperTest KumaraswamyDistribution Kurtosis KuwaharaFilter Label Labeled LabeledSlider LabelingFunction LabelStyle LaguerreL LambdaComponents LambertW LanczosWindow LandauDistribution Language LanguageCategory LaplaceDistribution LaplaceTransform Laplacian LaplacianFilter LaplacianGaussianFilter Large Larger Last Latitude LatitudeLongitude LatticeData LatticeReduce Launch LaunchKernels LayeredGraphPlot LayerSizeFunction LayoutInformation LCM LeafCount LeapYearQ LeastSquares LeastSquaresFilterKernel Left LeftArrow LeftArrowBar LeftArrowRightArrow LeftDownTeeVector LeftDownVector LeftDownVectorBar LeftRightArrow LeftRightVector LeftTee LeftTeeArrow LeftTeeVector LeftTriangle LeftTriangleBar LeftTriangleEqual LeftUpDownVector LeftUpTeeVector LeftUpVector LeftUpVectorBar LeftVector LeftVectorBar LegendAppearance Legended LegendFunction LegendLabel LegendLayout LegendMargins LegendMarkers LegendMarkerSize LegendreP LegendreQ LegendreType Length LengthWhile LerchPhi Less LessEqual LessEqualGreater LessFullEqual LessGreater LessLess LessSlantEqual LessTilde LetterCharacter LetterQ Level LeveneTest LeviCivitaTensor LevyDistribution Lexicographic LibraryFunction LibraryFunctionError LibraryFunctionInformation LibraryFunctionLoad LibraryFunctionUnload LibraryLoad LibraryUnload LicenseID LiftingFilterData LiftingWaveletTransform LightBlue LightBrown LightCyan Lighter LightGray LightGreen Lighting LightingAngle LightMagenta LightOrange LightPink LightPurple LightRed LightSources LightYellow Likelihood Limit LimitsPositioning LimitsPositioningTokens LindleyDistribution Line Line3DBox LinearFilter LinearFractionalTransform LinearModelFit LinearOffsetFunction LinearProgramming LinearRecurrence LinearSolve LinearSolveFunction LineBox LineBreak LinebreakAdjustments LineBreakChart LineBreakWithin LineColor LineForm LineGraph LineIndent LineIndentMaxFraction LineIntegralConvolutionPlot LineIntegralConvolutionScale LineLegend LineOpacity LineSpacing LineWrapParts LinkActivate LinkClose LinkConnect LinkConnectedQ LinkCreate LinkError LinkFlush LinkFunction LinkHost LinkInterrupt LinkLaunch LinkMode LinkObject LinkOpen LinkOptions LinkPatterns LinkProtocol LinkRead LinkReadHeld LinkReadyQ Links LinkWrite LinkWriteHeld LiouvilleLambda List Listable ListAnimate ListContourPlot ListContourPlot3D ListConvolve ListCorrelate ListCurvePathPlot ListDeconvolve ListDensityPlot Listen ListFourierSequenceTransform ListInterpolation ListLineIntegralConvolutionPlot ListLinePlot ListLogLinearPlot ListLogLogPlot ListLogPlot ListPicker ListPickerBox ListPickerBoxBackground ListPickerBoxOptions ListPlay ListPlot ListPlot3D ListPointPlot3D ListPolarPlot ListQ ListStreamDensityPlot ListStreamPlot ListSurfacePlot3D ListVectorDensityPlot ListVectorPlot ListVectorPlot3D ListZTransform Literal LiteralSearch LocalClusteringCoefficient LocalizeVariables LocationEquivalenceTest LocationTest Locator LocatorAutoCreate LocatorBox LocatorBoxOptions LocatorCentering LocatorPane LocatorPaneBox LocatorPaneBoxOptions LocatorRegion Locked Log Log10 Log2 LogBarnesG LogGamma LogGammaDistribution LogicalExpand LogIntegral LogisticDistribution LogitModelFit LogLikelihood LogLinearPlot LogLogisticDistribution LogLogPlot LogMultinormalDistribution LogNormalDistribution LogPlot LogRankTest LogSeriesDistribution LongEqual Longest LongestAscendingSequence LongestCommonSequence LongestCommonSequencePositions LongestCommonSubsequence LongestCommonSubsequencePositions LongestMatch LongForm Longitude LongLeftArrow LongLeftRightArrow LongRightArrow Loopback LoopFreeGraphQ LowerCaseQ LowerLeftArrow LowerRightArrow LowerTriangularize LowpassFilter LQEstimatorGains LQGRegulator LQOutputRegulatorGains LQRegulatorGains LUBackSubstitution LucasL LuccioSamiComponents LUDecomposition LyapunovSolve LyonsGroupLy MachineID MachineName MachineNumberQ MachinePrecision MacintoshSystemPageSetup Magenta Magnification Magnify MainSolve MaintainDynamicCaches Majority MakeBoxes MakeExpression MakeRules MangoldtLambda ManhattanDistance Manipulate Manipulator MannWhitneyTest MantissaExponent Manual Map MapAll MapAt MapIndexed MAProcess MapThread MarcumQ MardiaCombinedTest MardiaKurtosisTest MardiaSkewnessTest MarginalDistribution MarkovProcessProperties Masking MatchingDissimilarity MatchLocalNameQ MatchLocalNames MatchQ Material MathematicaNotation MathieuC MathieuCharacteristicA MathieuCharacteristicB MathieuCharacteristicExponent MathieuCPrime MathieuGroupM11 MathieuGroupM12 MathieuGroupM22 MathieuGroupM23 MathieuGroupM24 MathieuS MathieuSPrime MathMLForm MathMLText Matrices MatrixExp MatrixForm MatrixFunction MatrixLog MatrixPlot MatrixPower MatrixQ MatrixRank Max MaxBend MaxDetect MaxExtraBandwidths MaxExtraConditions MaxFeatures MaxFilter Maximize MaxIterations MaxMemoryUsed MaxMixtureKernels MaxPlotPoints MaxPoints MaxRecursion MaxStableDistribution MaxStepFraction MaxSteps MaxStepSize MaxValue MaxwellDistribution McLaughlinGroupMcL Mean MeanClusteringCoefficient MeanDegreeConnectivity MeanDeviation MeanFilter MeanGraphDistance MeanNeighborDegree MeanShift MeanShiftFilter Median MedianDeviation MedianFilter Medium MeijerG MeixnerDistribution MemberQ MemoryConstrained MemoryInUse Menu MenuAppearance MenuCommandKey MenuEvaluator MenuItem MenuPacket MenuSortingValue MenuStyle MenuView MergeDifferences Mesh MeshFunctions MeshRange MeshShading MeshStyle Message MessageDialog MessageList MessageName MessageOptions MessagePacket Messages MessagesNotebook MetaCharacters MetaInformation Method MethodOptions MexicanHatWavelet MeyerWavelet Min MinDetect MinFilter MinimalPolynomial MinimalStateSpaceModel Minimize Minors MinRecursion MinSize MinStableDistribution Minus MinusPlus MinValue Missing MissingDataMethod MittagLefflerE MixedRadix MixedRadixQuantity MixtureDistribution Mod Modal Mode Modular ModularLambda Module Modulus MoebiusMu Moment Momentary MomentConvert MomentEvaluate MomentGeneratingFunction Monday Monitor MonomialList MonomialOrder MonsterGroupM MorletWavelet MorphologicalBinarize MorphologicalBranchPoints MorphologicalComponents MorphologicalEulerNumber MorphologicalGraph MorphologicalPerimeter MorphologicalTransform Most MouseAnnotation MouseAppearance MouseAppearanceTag MouseButtons Mouseover MousePointerNote MousePosition MovingAverage MovingMedian MoyalDistribution MultiedgeStyle MultilaunchWarning MultiLetterItalics MultiLetterStyle MultilineFunction Multinomial MultinomialDistribution MultinormalDistribution MultiplicativeOrder Multiplicity Multiselection MultivariateHypergeometricDistribution MultivariatePoissonDistribution MultivariateTDistribution N NakagamiDistribution NameQ Names NamespaceBox Nand NArgMax NArgMin NBernoulliB NCache NDSolve NDSolveValue Nearest NearestFunction NeedCurrentFrontEndPackagePacket NeedCurrentFrontEndSymbolsPacket NeedlemanWunschSimilarity Needs Negative NegativeBinomialDistribution NegativeMultinomialDistribution NeighborhoodGraph Nest NestedGreaterGreater NestedLessLess NestedScriptRules NestList NestWhile NestWhileList NevilleThetaC NevilleThetaD NevilleThetaN NevilleThetaS NewPrimitiveStyle NExpectation Next NextPrime NHoldAll NHoldFirst NHoldRest NicholsGridLines NicholsPlot NIntegrate NMaximize NMaxValue NMinimize NMinValue NominalVariables NonAssociative NoncentralBetaDistribution NoncentralChiSquareDistribution NoncentralFRatioDistribution NoncentralStudentTDistribution NonCommutativeMultiply NonConstants None NonlinearModelFit NonlocalMeansFilter NonNegative NonPositive Nor NorlundB Norm Normal NormalDistribution NormalGrouping Normalize NormalizedSquaredEuclideanDistance NormalsFunction NormFunction Not NotCongruent NotCupCap NotDoubleVerticalBar Notebook NotebookApply NotebookAutoSave NotebookClose NotebookConvertSettings NotebookCreate NotebookCreateReturnObject NotebookDefault NotebookDelete NotebookDirectory NotebookDynamicExpression NotebookEvaluate NotebookEventActions NotebookFileName NotebookFind NotebookFindReturnObject NotebookGet NotebookGetLayoutInformationPacket NotebookGetMisspellingsPacket NotebookInformation NotebookInterfaceObject NotebookLocate NotebookObject NotebookOpen NotebookOpenReturnObject NotebookPath NotebookPrint NotebookPut NotebookPutReturnObject NotebookRead NotebookResetGeneratedCells Notebooks NotebookSave NotebookSaveAs NotebookSelection NotebookSetupLayoutInformationPacket NotebooksMenu NotebookWrite NotElement NotEqualTilde NotExists NotGreater NotGreaterEqual NotGreaterFullEqual NotGreaterGreater NotGreaterLess NotGreaterSlantEqual NotGreaterTilde NotHumpDownHump NotHumpEqual NotLeftTriangle NotLeftTriangleBar NotLeftTriangleEqual NotLess NotLessEqual NotLessFullEqual NotLessGreater NotLessLess NotLessSlantEqual NotLessTilde NotNestedGreaterGreater NotNestedLessLess NotPrecedes NotPrecedesEqual NotPrecedesSlantEqual NotPrecedesTilde NotReverseElement NotRightTriangle NotRightTriangleBar NotRightTriangleEqual NotSquareSubset NotSquareSubsetEqual NotSquareSuperset NotSquareSupersetEqual NotSubset NotSubsetEqual NotSucceeds NotSucceedsEqual NotSucceedsSlantEqual NotSucceedsTilde NotSuperset NotSupersetEqual NotTilde NotTildeEqual NotTildeFullEqual NotTildeTilde NotVerticalBar NProbability NProduct NProductFactors NRoots NSolve NSum NSumTerms Null NullRecords NullSpace NullWords Number NumberFieldClassNumber NumberFieldDiscriminant NumberFieldFundamentalUnits NumberFieldIntegralBasis NumberFieldNormRepresentatives NumberFieldRegulator NumberFieldRootsOfUnity NumberFieldSignature NumberForm NumberFormat NumberMarks NumberMultiplier NumberPadding NumberPoint NumberQ NumberSeparator NumberSigns NumberString Numerator NumericFunction NumericQ NuttallWindow NValues NyquistGridLines NyquistPlot O ObservabilityGramian ObservabilityMatrix ObservableDecomposition ObservableModelQ OddQ Off Offset OLEData On ONanGroupON OneIdentity Opacity Open OpenAppend Opener OpenerBox OpenerBoxOptions OpenerView OpenFunctionInspectorPacket Opening OpenRead OpenSpecialOptions OpenTemporary OpenWrite Operate OperatingSystem OptimumFlowData Optional OptionInspectorSettings OptionQ Options OptionsPacket OptionsPattern OptionValue OptionValueBox OptionValueBoxOptions Or Orange Order OrderDistribution OrderedQ Ordering Orderless OrnsteinUhlenbeckProcess Orthogonalize Out Outer OutputAutoOverwrite OutputControllabilityMatrix OutputControllableModelQ OutputForm OutputFormData OutputGrouping OutputMathEditExpression OutputNamePacket OutputResponse OutputSizeLimit OutputStream Over OverBar OverDot Overflow OverHat Overlaps Overlay OverlayBox OverlayBoxOptions Overscript OverscriptBox OverscriptBoxOptions OverTilde OverVector OwenT OwnValues PackingMethod PaddedForm Padding PadeApproximant PadLeft PadRight PageBreakAbove PageBreakBelow PageBreakWithin PageFooterLines PageFooters PageHeaderLines PageHeaders PageHeight PageRankCentrality PageWidth PairedBarChart PairedHistogram PairedSmoothHistogram PairedTTest PairedZTest PaletteNotebook PalettePath Pane PaneBox PaneBoxOptions Panel PanelBox PanelBoxOptions Paneled PaneSelector PaneSelectorBox PaneSelectorBoxOptions PaperWidth ParabolicCylinderD ParagraphIndent ParagraphSpacing ParallelArray ParallelCombine ParallelDo ParallelEvaluate Parallelization Parallelize ParallelMap ParallelNeeds ParallelProduct ParallelSubmit ParallelSum ParallelTable ParallelTry Parameter ParameterEstimator ParameterMixtureDistribution ParameterVariables ParametricFunction ParametricNDSolve ParametricNDSolveValue ParametricPlot ParametricPlot3D ParentConnect ParentDirectory ParentForm Parenthesize ParentList ParetoDistribution Part PartialCorrelationFunction PartialD ParticleData Partition PartitionsP PartitionsQ ParzenWindow PascalDistribution PassEventsDown PassEventsUp Paste PasteBoxFormInlineCells PasteButton Path PathGraph PathGraphQ Pattern PatternSequence PatternTest PauliMatrix PaulWavelet Pause PausedTime PDF PearsonChiSquareTest PearsonCorrelationTest PearsonDistribution PerformanceGoal PeriodicInterpolation Periodogram PeriodogramArray PermutationCycles PermutationCyclesQ PermutationGroup PermutationLength PermutationList PermutationListQ PermutationMax PermutationMin PermutationOrder PermutationPower PermutationProduct PermutationReplace Permutations PermutationSupport Permute PeronaMalikFilter Perpendicular PERTDistribution PetersenGraph PhaseMargins Pi Pick PIDData PIDDerivativeFilter PIDFeedforward PIDTune Piecewise PiecewiseExpand PieChart PieChart3D PillaiTrace PillaiTraceTest Pink Pivoting PixelConstrained PixelValue PixelValuePositions Placed Placeholder PlaceholderReplace Plain PlanarGraphQ Play PlayRange Plot Plot3D Plot3Matrix PlotDivision PlotJoined PlotLabel PlotLayout PlotLegends PlotMarkers PlotPoints PlotRange PlotRangeClipping PlotRangePadding PlotRegion PlotStyle Plus PlusMinus Pochhammer PodStates PodWidth Point Point3DBox PointBox PointFigureChart PointForm PointLegend PointSize PoissonConsulDistribution PoissonDistribution PoissonProcess PoissonWindow PolarAxes PolarAxesOrigin PolarGridLines PolarPlot PolarTicks PoleZeroMarkers PolyaAeppliDistribution PolyGamma Polygon Polygon3DBox Polygon3DBoxOptions PolygonBox PolygonBoxOptions PolygonHoleScale PolygonIntersections PolygonScale PolyhedronData PolyLog PolynomialExtendedGCD PolynomialForm PolynomialGCD PolynomialLCM PolynomialMod PolynomialQ PolynomialQuotient PolynomialQuotientRemainder PolynomialReduce PolynomialRemainder Polynomials PopupMenu PopupMenuBox PopupMenuBoxOptions PopupView PopupWindow Position Positive PositiveDefiniteMatrixQ PossibleZeroQ Postfix PostScript Power PowerDistribution PowerExpand PowerMod PowerModList PowerSpectralDensity PowersRepresentations PowerSymmetricPolynomial Precedence PrecedenceForm Precedes PrecedesEqual PrecedesSlantEqual PrecedesTilde Precision PrecisionGoal PreDecrement PredictionRoot PreemptProtect PreferencesPath Prefix PreIncrement Prepend PrependTo PreserveImageOptions Previous PriceGraphDistribution PrimaryPlaceholder Prime PrimeNu PrimeOmega PrimePi PrimePowerQ PrimeQ Primes PrimeZetaP PrimitiveRoot PrincipalComponents PrincipalValue Print PrintAction PrintForm PrintingCopies PrintingOptions PrintingPageRange PrintingStartingPageNumber PrintingStyleEnvironment PrintPrecision PrintTemporary Prism PrismBox PrismBoxOptions PrivateCellOptions PrivateEvaluationOptions PrivateFontOptions PrivateFrontEndOptions PrivateNotebookOptions PrivatePaths Probability ProbabilityDistribution ProbabilityPlot ProbabilityPr ProbabilityScalePlot ProbitModelFit ProcessEstimator ProcessParameterAssumptions ProcessParameterQ ProcessStateDomain ProcessTimeDomain Product ProductDistribution ProductLog ProgressIndicator ProgressIndicatorBox ProgressIndicatorBoxOptions Projection Prolog PromptForm Properties Property PropertyList PropertyValue Proportion Proportional Protect Protected ProteinData Pruning PseudoInverse Purple Put PutAppend Pyramid PyramidBox PyramidBoxOptions QBinomial QFactorial QGamma QHypergeometricPFQ QPochhammer QPolyGamma QRDecomposition QuadraticIrrationalQ Quantile QuantilePlot Quantity QuantityForm QuantityMagnitude QuantityQ QuantityUnit Quartics QuartileDeviation Quartiles QuartileSkewness QueueingNetworkProcess QueueingProcess QueueProperties Quiet Quit Quotient QuotientRemainder RadialityCentrality RadicalBox RadicalBoxOptions RadioButton RadioButtonBar RadioButtonBox RadioButtonBoxOptions Radon RamanujanTau RamanujanTauL RamanujanTauTheta RamanujanTauZ Random RandomChoice RandomComplex RandomFunction RandomGraph RandomImage RandomInteger RandomPermutation RandomPrime RandomReal RandomSample RandomSeed RandomVariate RandomWalkProcess Range RangeFilter RangeSpecification RankedMax RankedMin Raster Raster3D Raster3DBox Raster3DBoxOptions RasterArray RasterBox RasterBoxOptions Rasterize RasterSize Rational RationalFunctions Rationalize Rationals Ratios Raw RawArray RawBoxes RawData RawMedium RayleighDistribution Re Read ReadList ReadProtected Real RealBlockDiagonalForm RealDigits RealExponent Reals Reap Record RecordLists RecordSeparators Rectangle RectangleBox RectangleBoxOptions RectangleChart RectangleChart3D RecurrenceFilter RecurrenceTable RecurringDigitsForm Red Reduce RefBox ReferenceLineStyle ReferenceMarkers ReferenceMarkerStyle Refine ReflectionMatrix ReflectionTransform Refresh RefreshRate RegionBinarize RegionFunction RegionPlot RegionPlot3D RegularExpression Regularization Reinstall Release ReleaseHold ReliabilityDistribution ReliefImage ReliefPlot Remove RemoveAlphaChannel RemoveAsynchronousTask Removed RemoveInputStreamMethod RemoveOutputStreamMethod RemoveProperty RemoveScheduledTask RenameDirectory RenameFile RenderAll RenderingOptions RenewalProcess RenkoChart Repeated RepeatedNull RepeatedString Replace ReplaceAll ReplaceHeldPart ReplaceImageValue ReplaceList ReplacePart ReplacePixelValue ReplaceRepeated Resampling Rescale RescalingTransform ResetDirectory ResetMenusPacket ResetScheduledTask Residue Resolve Rest Resultant ResumePacket Return ReturnExpressionPacket ReturnInputFormPacket ReturnPacket ReturnTextPacket Reverse ReverseBiorthogonalSplineWavelet ReverseElement ReverseEquilibrium ReverseGraph ReverseUpEquilibrium RevolutionAxis RevolutionPlot3D RGBColor RiccatiSolve RiceDistribution RidgeFilter RiemannR RiemannSiegelTheta RiemannSiegelZ Riffle Right RightArrow RightArrowBar RightArrowLeftArrow RightCosetRepresentative RightDownTeeVector RightDownVector RightDownVectorBar RightTee RightTeeArrow RightTeeVector RightTriangle RightTriangleBar RightTriangleEqual RightUpDownVector RightUpTeeVector RightUpVector RightUpVectorBar RightVector RightVectorBar RiskAchievementImportance RiskReductionImportance RogersTanimotoDissimilarity Root RootApproximant RootIntervals RootLocusPlot RootMeanSquare RootOfUnityQ RootReduce Roots RootSum Rotate RotateLabel RotateLeft RotateRight RotationAction RotationBox RotationBoxOptions RotationMatrix RotationTransform Round RoundImplies RoundingRadius Row RowAlignments RowBackgrounds RowBox RowHeights RowLines RowMinHeight RowReduce RowsEqual RowSpacings RSolve RudvalisGroupRu Rule RuleCondition RuleDelayed RuleForm RulerUnits Run RunScheduledTask RunThrough RuntimeAttributes RuntimeOptions RussellRaoDissimilarity SameQ SameTest SampleDepth SampledSoundFunction SampledSoundList SampleRate SamplingPeriod SARIMAProcess SARMAProcess SatisfiabilityCount SatisfiabilityInstances SatisfiableQ Saturday Save Saveable SaveAutoDelete SaveDefinitions SawtoothWave Scale Scaled ScaleDivisions ScaledMousePosition ScaleOrigin ScalePadding ScaleRanges ScaleRangeStyle ScalingFunctions ScalingMatrix ScalingTransform Scan ScheduledTaskActiveQ ScheduledTaskData ScheduledTaskObject ScheduledTasks SchurDecomposition ScientificForm ScreenRectangle ScreenStyleEnvironment ScriptBaselineShifts ScriptLevel ScriptMinSize ScriptRules ScriptSizeMultipliers Scrollbars ScrollingOptions ScrollPosition Sec Sech SechDistribution SectionGrouping SectorChart SectorChart3D SectorOrigin SectorSpacing SeedRandom Select Selectable SelectComponents SelectedCells SelectedNotebook Selection SelectionAnimate SelectionCell SelectionCellCreateCell SelectionCellDefaultStyle SelectionCellParentStyle SelectionCreateCell SelectionDebuggerTag SelectionDuplicateCell SelectionEvaluate SelectionEvaluateCreateCell SelectionMove SelectionPlaceholder SelectionSetStyle SelectWithContents SelfLoops SelfLoopStyle SemialgebraicComponentInstances SendMail Sequence SequenceAlignment SequenceForm SequenceHold SequenceLimit Series SeriesCoefficient SeriesData SessionTime Set SetAccuracy SetAlphaChannel SetAttributes Setbacks SetBoxFormNamesPacket SetDelayed SetDirectory SetEnvironment SetEvaluationNotebook SetFileDate SetFileLoadingContext SetNotebookStatusLine SetOptions SetOptionsPacket SetPrecision SetProperty SetSelectedNotebook SetSharedFunction SetSharedVariable SetSpeechParametersPacket SetStreamPosition SetSystemOptions Setter SetterBar SetterBox SetterBoxOptions Setting SetValue Shading Shallow ShannonWavelet ShapiroWilkTest Share Sharpen ShearingMatrix ShearingTransform ShenCastanMatrix Short ShortDownArrow Shortest ShortestMatch ShortestPathFunction ShortLeftArrow ShortRightArrow ShortUpArrow Show ShowAutoStyles ShowCellBracket ShowCellLabel ShowCellTags ShowClosedCellArea ShowContents ShowControls ShowCursorTracker ShowGroupOpenCloseIcon ShowGroupOpener ShowInvisibleCharacters ShowPageBreaks ShowPredictiveInterface ShowSelection ShowShortBoxForm ShowSpecialCharacters ShowStringCharacters ShowSyntaxStyles ShrinkingDelay ShrinkWrapBoundingBox SiegelTheta SiegelTukeyTest Sign Signature SignedRankTest SignificanceLevel SignPadding SignTest SimilarityRules SimpleGraph SimpleGraphQ Simplify Sin Sinc SinghMaddalaDistribution SingleEvaluation SingleLetterItalics SingleLetterStyle SingularValueDecomposition SingularValueList SingularValuePlot SingularValues Sinh SinhIntegral SinIntegral SixJSymbol Skeleton SkeletonTransform SkellamDistribution Skewness SkewNormalDistribution Skip SliceDistribution Slider Slider2D Slider2DBox Slider2DBoxOptions SliderBox SliderBoxOptions SlideView Slot SlotSequence Small SmallCircle Smaller SmithDelayCompensator SmithWatermanSimilarity SmoothDensityHistogram SmoothHistogram SmoothHistogram3D SmoothKernelDistribution SocialMediaData Socket SokalSneathDissimilarity Solve SolveAlways SolveDelayed Sort SortBy Sound SoundAndGraphics SoundNote SoundVolume Sow Space SpaceForm Spacer Spacings Span SpanAdjustments SpanCharacterRounding SpanFromAbove SpanFromBoth SpanFromLeft SpanLineThickness SpanMaxSize SpanMinSize SpanningCharacters SpanSymmetric SparseArray SpatialGraphDistribution Speak SpeakTextPacket SpearmanRankTest SpearmanRho Spectrogram SpectrogramArray Specularity SpellingCorrection SpellingDictionaries SpellingDictionariesPath SpellingOptions SpellingSuggestionsPacket Sphere SphereBox SphericalBesselJ SphericalBesselY SphericalHankelH1 SphericalHankelH2 SphericalHarmonicY SphericalPlot3D SphericalRegion SpheroidalEigenvalue SpheroidalJoiningFactor SpheroidalPS SpheroidalPSPrime SpheroidalQS SpheroidalQSPrime SpheroidalRadialFactor SpheroidalS1 SpheroidalS1Prime SpheroidalS2 SpheroidalS2Prime Splice SplicedDistribution SplineClosed SplineDegree SplineKnots SplineWeights Split SplitBy SpokenString Sqrt SqrtBox SqrtBoxOptions Square SquaredEuclideanDistance SquareFreeQ SquareIntersection SquaresR SquareSubset SquareSubsetEqual SquareSuperset SquareSupersetEqual SquareUnion SquareWave StabilityMargins StabilityMarginsStyle StableDistribution Stack StackBegin StackComplete StackInhibit StandardDeviation StandardDeviationFilter StandardForm Standardize StandbyDistribution Star StarGraph StartAsynchronousTask StartingStepSize StartOfLine StartOfString StartScheduledTask StartupSound StateDimensions StateFeedbackGains StateOutputEstimator StateResponse StateSpaceModel StateSpaceRealization StateSpaceTransform StationaryDistribution StationaryWaveletPacketTransform StationaryWaveletTransform StatusArea StatusCentrality StepMonitor StieltjesGamma StirlingS1 StirlingS2 StopAsynchronousTask StopScheduledTask StrataVariables StratonovichProcess StreamColorFunction StreamColorFunctionScaling StreamDensityPlot StreamPlot StreamPoints StreamPosition Streams StreamScale StreamStyle String StringBreak StringByteCount StringCases StringCount StringDrop StringExpression StringForm StringFormat StringFreeQ StringInsert StringJoin StringLength StringMatchQ StringPosition StringQ StringReplace StringReplaceList StringReplacePart StringReverse StringRotateLeft StringRotateRight StringSkeleton StringSplit StringTake StringToStream StringTrim StripBoxes StripOnInput StripWrapperBoxes StrokeForm StructuralImportance StructuredArray StructuredSelection StruveH StruveL Stub StudentTDistribution Style StyleBox StyleBoxAutoDelete StyleBoxOptions StyleData StyleDefinitions StyleForm StyleKeyMapping StyleMenuListing StyleNameDialogSettings StyleNames StylePrint StyleSheetPath Subfactorial Subgraph SubMinus SubPlus SubresultantPolynomialRemainders SubresultantPolynomials Subresultants Subscript SubscriptBox SubscriptBoxOptions Subscripted Subset SubsetEqual Subsets SubStar Subsuperscript SubsuperscriptBox SubsuperscriptBoxOptions Subtract SubtractFrom SubValues Succeeds SucceedsEqual SucceedsSlantEqual SucceedsTilde SuchThat Sum SumConvergence Sunday SuperDagger SuperMinus SuperPlus Superscript SuperscriptBox SuperscriptBoxOptions Superset SupersetEqual SuperStar Surd SurdForm SurfaceColor SurfaceGraphics SurvivalDistribution SurvivalFunction SurvivalModel SurvivalModelFit SuspendPacket SuzukiDistribution SuzukiGroupSuz SwatchLegend Switch Symbol SymbolName SymletWavelet Symmetric SymmetricGroup SymmetricMatrixQ SymmetricPolynomial SymmetricReduction Symmetrize SymmetrizedArray SymmetrizedArrayRules SymmetrizedDependentComponents SymmetrizedIndependentComponents SymmetrizedReplacePart SynchronousInitialization SynchronousUpdating Syntax SyntaxForm SyntaxInformation SyntaxLength SyntaxPacket SyntaxQ SystemDialogInput SystemException SystemHelpPath SystemInformation SystemInformationData SystemOpen SystemOptions SystemsModelDelay SystemsModelDelayApproximate SystemsModelDelete SystemsModelDimensions SystemsModelExtract SystemsModelFeedbackConnect SystemsModelLabels SystemsModelOrder SystemsModelParallelConnect SystemsModelSeriesConnect SystemsModelStateFeedbackConnect SystemStub Tab TabFilling Table TableAlignments TableDepth TableDirections TableForm TableHeadings TableSpacing TableView TableViewBox TabSpacings TabView TabViewBox TabViewBoxOptions TagBox TagBoxNote TagBoxOptions TaggingRules TagSet TagSetDelayed TagStyle TagUnset Take TakeWhile Tally Tan Tanh TargetFunctions TargetUnits TautologyQ TelegraphProcess TemplateBox TemplateBoxOptions TemplateSlotSequence TemporalData Temporary TemporaryVariable TensorContract TensorDimensions TensorExpand TensorProduct TensorQ TensorRank TensorReduce TensorSymmetry TensorTranspose TensorWedge Tetrahedron TetrahedronBox TetrahedronBoxOptions TeXForm TeXSave Text Text3DBox Text3DBoxOptions TextAlignment TextBand TextBoundingBox TextBox TextCell TextClipboardType TextData TextForm TextJustification TextLine TextPacket TextParagraph TextRecognize TextRendering TextStyle Texture TextureCoordinateFunction TextureCoordinateScaling Therefore ThermometerGauge Thick Thickness Thin Thinning ThisLink ThompsonGroupTh Thread ThreeJSymbol Threshold Through Throw Thumbnail Thursday Ticks TicksStyle Tilde TildeEqual TildeFullEqual TildeTilde TimeConstrained TimeConstraint Times TimesBy TimeSeriesForecast TimeSeriesInvertibility TimeUsed TimeValue TimeZone Timing Tiny TitleGrouping TitsGroupT ToBoxes ToCharacterCode ToColor ToContinuousTimeModel ToDate ToDiscreteTimeModel ToeplitzMatrix ToExpression ToFileName Together Toggle ToggleFalse Toggler TogglerBar TogglerBox TogglerBoxOptions ToHeldExpression ToInvertibleTimeSeries TokenWords Tolerance ToLowerCase ToNumberField TooBig Tooltip TooltipBox TooltipBoxOptions TooltipDelay TooltipStyle Top TopHatTransform TopologicalSort ToRadicals ToRules ToString Total TotalHeight TotalVariationFilter TotalWidth TouchscreenAutoZoom TouchscreenControlPlacement ToUpperCase Tr Trace TraceAbove TraceAction TraceBackward TraceDepth TraceDialog TraceForward TraceInternal TraceLevel TraceOff TraceOn TraceOriginal TracePrint TraceScan TrackedSymbols TradingChart TraditionalForm TraditionalFunctionNotation TraditionalNotation TraditionalOrder TransferFunctionCancel TransferFunctionExpand TransferFunctionFactor TransferFunctionModel TransferFunctionPoles TransferFunctionTransform TransferFunctionZeros TransformationFunction TransformationFunctions TransformationMatrix TransformedDistribution TransformedField Translate TranslationTransform TransparentColor Transpose TreeForm TreeGraph TreeGraphQ TreePlot TrendStyle TriangleWave TriangularDistribution Trig TrigExpand TrigFactor TrigFactorList Trigger TrigReduce TrigToExp TrimmedMean True TrueQ TruncatedDistribution TsallisQExponentialDistribution TsallisQGaussianDistribution TTest Tube TubeBezierCurveBox TubeBezierCurveBoxOptions TubeBox TubeBSplineCurveBox TubeBSplineCurveBoxOptions Tuesday TukeyLambdaDistribution TukeyWindow Tuples TuranGraph TuringMachine Transparent UnateQ Uncompress Undefined UnderBar Underflow Underlined Underoverscript UnderoverscriptBox UnderoverscriptBoxOptions Underscript UnderscriptBox UnderscriptBoxOptions UndirectedEdge UndirectedGraph UndirectedGraphQ UndocumentedTestFEParserPacket UndocumentedTestGetSelectionPacket Unequal Unevaluated UniformDistribution UniformGraphDistribution UniformSumDistribution Uninstall Union UnionPlus Unique UnitBox UnitConvert UnitDimensions Unitize UnitRootTest UnitSimplify UnitStep UnitTriangle UnitVector Unprotect UnsameQ UnsavedVariables Unset UnsetShared UntrackedVariables Up UpArrow UpArrowBar UpArrowDownArrow Update UpdateDynamicObjects UpdateDynamicObjectsSynchronous UpdateInterval UpDownArrow UpEquilibrium UpperCaseQ UpperLeftArrow UpperRightArrow UpperTriangularize Upsample UpSet UpSetDelayed UpTee UpTeeArrow UpValues URL URLFetch URLFetchAsynchronous URLSave URLSaveAsynchronous UseGraphicsRange Using UsingFrontEnd V2Get ValidationLength Value ValueBox ValueBoxOptions ValueForm ValueQ ValuesData Variables Variance VarianceEquivalenceTest VarianceEstimatorFunction VarianceGammaDistribution VarianceTest VectorAngle VectorColorFunction VectorColorFunctionScaling VectorDensityPlot VectorGlyphData VectorPlot VectorPlot3D VectorPoints VectorQ Vectors VectorScale VectorStyle Vee Verbatim Verbose VerboseConvertToPostScriptPacket VerifyConvergence VerifySolutions VerifyTestAssumptions Version VersionNumber VertexAdd VertexCapacity VertexColors VertexComponent VertexConnectivity VertexCoordinateRules VertexCoordinates VertexCorrelationSimilarity VertexCosineSimilarity VertexCount VertexCoverQ VertexDataCoordinates VertexDegree VertexDelete VertexDiceSimilarity VertexEccentricity VertexInComponent VertexInDegree VertexIndex VertexJaccardSimilarity VertexLabeling VertexLabels VertexLabelStyle VertexList VertexNormals VertexOutComponent VertexOutDegree VertexQ VertexRenderingFunction VertexReplace VertexShape VertexShapeFunction VertexSize VertexStyle VertexTextureCoordinates VertexWeight Vertical VerticalBar VerticalForm VerticalGauge VerticalSeparator VerticalSlider VerticalTilde ViewAngle ViewCenter ViewMatrix ViewPoint ViewPointSelectorSettings ViewPort ViewRange ViewVector ViewVertical VirtualGroupData Visible VisibleCell VoigtDistribution VonMisesDistribution WaitAll WaitAsynchronousTask WaitNext WaitUntil WakebyDistribution WalleniusHypergeometricDistribution WaringYuleDistribution WatershedComponents WatsonUSquareTest WattsStrogatzGraphDistribution WaveletBestBasis WaveletFilterCoefficients WaveletImagePlot WaveletListPlot WaveletMapIndexed WaveletMatrixPlot WaveletPhi WaveletPsi WaveletScale WaveletScalogram WaveletThreshold WeaklyConnectedComponents WeaklyConnectedGraphQ WeakStationarity WeatherData WeberE Wedge Wednesday WeibullDistribution WeierstrassHalfPeriods WeierstrassInvariants WeierstrassP WeierstrassPPrime WeierstrassSigma WeierstrassZeta WeightedAdjacencyGraph WeightedAdjacencyMatrix WeightedData WeightedGraphQ Weights WelchWindow WheelGraph WhenEvent Which While White Whitespace WhitespaceCharacter WhittakerM WhittakerW WienerFilter WienerProcess WignerD WignerSemicircleDistribution WilksW WilksWTest WindowClickSelect WindowElements WindowFloating WindowFrame WindowFrameElements WindowMargins WindowMovable WindowOpacity WindowSelected WindowSize WindowStatusArea WindowTitle WindowToolbars WindowWidth With WolframAlpha WolframAlphaDate WolframAlphaQuantity WolframAlphaResult Word WordBoundary WordCharacter WordData WordSearch WordSeparators WorkingPrecision Write WriteString Wronskian XMLElement XMLObject Xnor Xor Yellow YuleDissimilarity ZernikeR ZeroSymmetric ZeroTest ZeroWidthTimes Zeta ZetaZero ZipfDistribution ZTest ZTransform $Aborted $ActivationGroupID $ActivationKey $ActivationUserRegistered $AddOnsDirectory $AssertFunction $Assumptions $AsynchronousTask $BaseDirectory $BatchInput $BatchOutput $BoxForms $ByteOrdering $Canceled $CharacterEncoding $CharacterEncodings $CommandLine $CompilationTarget $ConditionHold $ConfiguredKernels $Context $ContextPath $ControlActiveSetting $CreationDate $CurrentLink $DateStringFormat $DefaultFont $DefaultFrontEnd $DefaultImagingDevice $DefaultPath $Display $DisplayFunction $DistributedContexts $DynamicEvaluation $Echo $Epilog $ExportFormats $Failed $FinancialDataSource $FormatType $FrontEnd $FrontEndSession $GeoLocation $HistoryLength $HomeDirectory $HTTPCookies $IgnoreEOF $ImagingDevices $ImportFormats $InitialDirectory $Input $InputFileName $InputStreamMethods $Inspector $InstallationDate $InstallationDirectory $InterfaceEnvironment $IterationLimit $KernelCount $KernelID $Language $LaunchDirectory $LibraryPath $LicenseExpirationDate $LicenseID $LicenseProcesses $LicenseServer $LicenseSubprocesses $LicenseType $Line $Linked $LinkSupported $LoadedFiles $MachineAddresses $MachineDomain $MachineDomains $MachineEpsilon $MachineID $MachineName $MachinePrecision $MachineType $MaxExtraPrecision $MaxLicenseProcesses $MaxLicenseSubprocesses $MaxMachineNumber $MaxNumber $MaxPiecewiseCases $MaxPrecision $MaxRootDegree $MessageGroups $MessageList $MessagePrePrint $Messages $MinMachineNumber $MinNumber $MinorReleaseNumber $MinPrecision $ModuleNumber $NetworkLicense $NewMessage $NewSymbol $Notebooks $NumberMarks $Off $OperatingSystem $Output $OutputForms $OutputSizeLimit $OutputStreamMethods $Packages $ParentLink $ParentProcessID $PasswordFile $PatchLevelID $Path $PathnameSeparator $PerformanceGoal $PipeSupported $Post $Pre $PreferencesDirectory $PrePrint $PreRead $PrintForms $PrintLiteral $ProcessID $ProcessorCount $ProcessorType $ProductInformation $ProgramName $RandomState $RecursionLimit $ReleaseNumber $RootDirectory $ScheduledTask $ScriptCommandLine $SessionID $SetParentLink $SharedFunctions $SharedVariables $SoundDisplay $SoundDisplayFunction $SuppressInputFormHeads $SynchronousEvaluation $SyntaxHandler $System $SystemCharacterEncoding $SystemID $SystemWordLength $TemporaryDirectory $TemporaryPrefix $TextStyle $TimedOut $TimeUnit $TimeZone $TopDirectory $TraceOff $TraceOn $TracePattern $TracePostAction $TracePreAction $Urgent $UserAddOnsDirectory $UserBaseDirectory $UserDocumentsDirectory $UserName $Version $VersionNumber", c: [{ cN: "comment", b: /\(\*/, e: /\*\)/ }, a.ASM, a.QSM, a.CNM, { cN: "list", b: /\{/, e: /\}/, i: /:/ }] }; });
hljs.registerLanguage("cs", function (b) { var a = "abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async await ascending descending from get group into join let orderby partial select set value var where yield"; return { k: a, c: [{ cN: "comment", b: "///", e: "$", rB: true, c: [{ cN: "xmlDocTag", b: "///|<!--|-->" }, { cN: "xmlDocTag", b: "</?", e: ">" }] }, b.CLCM, b.CBLCLM, { cN: "preprocessor", b: "#", e: "$", k: "if else elif endif define undef warning error line region endregion pragma checksum" }, { cN: "string", b: '@"', e: '"', c: [{ b: '""' }] }, b.ASM, b.QSM, b.CNM, { bK: "protected public private internal", e: /[{;=]/, k: a, c: [{ bK: "class namespace interface", starts: { c: [b.TM] } }, { b: b.IR + "\\s*\\(", rB: true, c: [b.TM] }] }] }; });
hljs.registerLanguage("http", function (a) { return { i: "\\S", c: [{ cN: "status", b: "^HTTP/[0-9\\.]+", e: "$", c: [{ cN: "number", b: "\\b\\d{3}\\b" }] }, { cN: "request", b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$", rB: true, e: "$", c: [{ cN: "string", b: " ", e: " ", eB: true, eE: true }] }, { cN: "attribute", b: "^\\w", e: ": ", eE: true, i: "\\n|\\s|=", starts: { cN: "string", e: "$" } }, { b: "\\n\\n", starts: { sL: "", eW: true } }] }; });
hljs.registerLanguage("rust", function (b) { var c = { cN: "number", b: "\\b(0[xb][A-Za-z0-9_]+|[0-9_]+(\\.[0-9_]+)?([uif](8|16|32|64)?)?)", r: 0 }; var a = "assert bool break char check claim comm const cont copy dir do drop else enum extern export f32 f64 fail false float fn for i16 i32 i64 i8 if impl int let log loop match mod move mut priv pub pure ref return self static str struct task true trait type u16 u32 u64 u8 uint unsafe use vec while"; return { k: a, i: "</", c: [b.CLCM, b.CBLCLM, b.inherit(b.QSM, { i: null }), b.ASM, c, { cN: "function", bK: "fn", e: "(\\(|<)", c: [b.UTM] }, { cN: "preprocessor", b: "#\\[", e: "\\]" }, { bK: "type", e: "(=|<)", c: [b.UTM], i: "\\S" }, { bK: "trait enum", e: "({|<)", c: [b.UTM], i: "\\S" }] }; });
hljs.registerLanguage("handlebars", function (b) { var a = "each in with if else unless bindattr action collection debugger log outlet template unbound view yield"; return { cI: true, sL: "xml", subLanguageMode: "continuous", c: [{ cN: "expression", b: "{{", e: "}}", c: [{ cN: "begin-block", b: "#[a-zA-Z- .]+", k: a }, { cN: "string", b: '"', e: '"' }, { cN: "end-block", b: "\\/[a-zA-Z- .]+", k: a }, { cN: "variable", b: "[a-zA-Z-.]+", k: a }] }] }; });
hljs.registerLanguage("cmake", function (a) { return { cI: true, k: { keyword: "add_custom_command add_custom_target add_definitions add_dependencies add_executable add_library add_subdirectory add_test aux_source_directory break build_command cmake_minimum_required cmake_policy configure_file create_test_sourcelist define_property else elseif enable_language enable_testing endforeach endfunction endif endmacro endwhile execute_process export find_file find_library find_package find_path find_program fltk_wrap_ui foreach function get_cmake_property get_directory_property get_filename_component get_property get_source_file_property get_target_property get_test_property if include include_directories include_external_msproject include_regular_expression install link_directories load_cache load_command macro mark_as_advanced message option output_required_files project qt_wrap_cpp qt_wrap_ui remove_definitions return separate_arguments set set_directory_properties set_property set_source_files_properties set_target_properties set_tests_properties site_name source_group string target_link_libraries try_compile try_run unset variable_watch while build_name exec_program export_library_dependencies install_files install_programs install_targets link_libraries make_directory remove subdir_depends subdirs use_mangled_mesa utility_source variable_requires write_file qt5_use_modules qt5_use_package qt5_wrap_cpp on off true false and or", operator: "equal less greater strless strgreater strequal matches" }, c: [{ cN: "envvar", b: "\\${", e: "}" }, a.HCM, a.QSM, a.NM] }; });
hljs.registerLanguage("lisp", function (h) { var k = "[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*"; var l = "(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?"; var j = { cN: "shebang", b: "^#!", e: "$" }; var b = { cN: "literal", b: "\\b(t{1}|nil)\\b" }; var d = { cN: "number", v: [{ b: l, r: 0 }, { b: "#b[0-1]+(/[0-1]+)?" }, { b: "#o[0-7]+(/[0-7]+)?" }, { b: "#x[0-9a-f]+(/[0-9a-f]+)?" }, { b: "#c\\(" + l + " +" + l, e: "\\)" }] }; var g = h.inherit(h.QSM, { i: null }); var m = { cN: "comment", b: ";", e: "$" }; var f = { cN: "variable", b: "\\*", e: "\\*" }; var n = { cN: "keyword", b: "[:&]" + k }; var c = { b: "\\(", e: "\\)", c: ["self", b, g, d] }; var a = { cN: "quoted", c: [d, g, f, n, c], v: [{ b: "['`]\\(", e: "\\)", }, { b: "\\(quote ", e: "\\)", k: { title: "quote" }, }] }; var i = { cN: "list", b: "\\(", e: "\\)" }; var e = { eW: true, r: 0 }; i.c = [{ cN: "title", b: k }, e]; e.c = [a, i, b, d, g, m, f, n]; return { i: /\S/, c: [d, j, b, g, m, a, i] }; });
hljs.registerLanguage("rib", function (a) { return { k: "ArchiveRecord AreaLightSource Atmosphere Attribute AttributeBegin AttributeEnd Basis Begin Blobby Bound Clipping ClippingPlane Color ColorSamples ConcatTransform Cone CoordinateSystem CoordSysTransform CropWindow Curves Cylinder DepthOfField Detail DetailRange Disk Displacement Display End ErrorHandler Exposure Exterior Format FrameAspectRatio FrameBegin FrameEnd GeneralPolygon GeometricApproximation Geometry Hider Hyperboloid Identity Illuminate Imager Interior LightSource MakeCubeFaceEnvironment MakeLatLongEnvironment MakeShadow MakeTexture Matte MotionBegin MotionEnd NuPatch ObjectBegin ObjectEnd ObjectInstance Opacity Option Orientation Paraboloid Patch PatchMesh Perspective PixelFilter PixelSamples PixelVariance Points PointsGeneralPolygons PointsPolygons Polygon Procedural Projection Quantize ReadArchive RelativeDetail ReverseOrientation Rotate Scale ScreenWindow ShadingInterpolation ShadingRate Shutter Sides Skew SolidBegin SolidEnd Sphere SubdivisionMesh Surface TextureCoordinates Torus Transform TransformBegin TransformEnd TransformPoints Translate TrimCurve WorldBegin WorldEnd", i: "</", c: [a.HCM, a.CNM, a.ASM, a.QSM] }; });
hljs.registerLanguage("css", function (a) { var b = "[a-zA-Z-][a-zA-Z0-9_-]*"; var c = { cN: "function", b: b + "\\(", e: "\\)", c: ["self", a.NM, a.ASM, a.QSM] }; return { cI: true, i: "[=/|']", c: [a.CBLCLM, { cN: "id", b: "\\#[A-Za-z0-9_-]+" }, { cN: "class", b: "\\.[A-Za-z0-9_-]+", r: 0 }, { cN: "attr_selector", b: "\\[", e: "\\]", i: "$" }, { cN: "pseudo", b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+" }, { cN: "at_rule", b: "@(font-face|page)", l: "[a-z-]+", k: "font-face page" }, { cN: "at_rule", b: "@", e: "[{;]", c: [{ cN: "keyword", b: /\S+/ }, { b: /\s/, eW: true, eE: true, r: 0, c: [c, a.ASM, a.QSM, a.NM] }] }, { cN: "tag", b: b, r: 0 }, { cN: "rules", b: "{", e: "}", i: "[^\\s]", r: 0, c: [a.CBLCLM, { cN: "rule", b: "[^\\s]", rB: true, e: ";", eW: true, c: [{ cN: "attribute", b: "[A-Z\\_\\.\\-]+", e: ":", eE: true, i: "[^\\s]", starts: { cN: "value", eW: true, eE: true, c: [c, a.NM, a.QSM, a.ASM, a.CBLCLM, { cN: "hexcolor", b: "#[0-9A-Fa-f]+" }, { cN: "important", b: "!important" }] } }] }] }] }; });
hljs.registerLanguage("avrasm", function (a) { return { cI: true, k: { keyword: "adc add adiw and andi asr bclr bld brbc brbs brcc brcs break breq brge brhc brhs brid brie brlo brlt brmi brne brpl brsh brtc brts brvc brvs bset bst call cbi cbr clc clh cli cln clr cls clt clv clz com cp cpc cpi cpse dec eicall eijmp elpm eor fmul fmuls fmulsu icall ijmp in inc jmp ld ldd ldi lds lpm lsl lsr mov movw mul muls mulsu neg nop or ori out pop push rcall ret reti rjmp rol ror sbc sbr sbrc sbrs sec seh sbi sbci sbic sbis sbiw sei sen ser ses set sev sez sleep spm st std sts sub subi swap tst wdr", built_in: "r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 r16 r17 r18 r19 r20 r21 r22 r23 r24 r25 r26 r27 r28 r29 r30 r31 x|0 xh xl y|0 yh yl z|0 zh zl ucsr1c udr1 ucsr1a ucsr1b ubrr1l ubrr1h ucsr0c ubrr0h tccr3c tccr3a tccr3b tcnt3h tcnt3l ocr3ah ocr3al ocr3bh ocr3bl ocr3ch ocr3cl icr3h icr3l etimsk etifr tccr1c ocr1ch ocr1cl twcr twdr twar twsr twbr osccal xmcra xmcrb eicra spmcsr spmcr portg ddrg ping portf ddrf sreg sph spl xdiv rampz eicrb eimsk gimsk gicr eifr gifr timsk tifr mcucr mcucsr tccr0 tcnt0 ocr0 assr tccr1a tccr1b tcnt1h tcnt1l ocr1ah ocr1al ocr1bh ocr1bl icr1h icr1l tccr2 tcnt2 ocr2 ocdr wdtcr sfior eearh eearl eedr eecr porta ddra pina portb ddrb pinb portc ddrc pinc portd ddrd pind spdr spsr spcr udr0 ucsr0a ucsr0b ubrr0l acsr admux adcsr adch adcl porte ddre pine pinf" }, c: [a.CBLCLM, { cN: "comment", b: ";", e: "$", r: 0 }, a.CNM, a.BNM, { cN: "number", b: "\\b(\\$[a-zA-Z0-9]+|0o[0-7]+)" }, a.QSM, { cN: "string", b: "'", e: "[^\\\\]'", i: "[^\\\\][^']" }, { cN: "label", b: "^[A-Za-z0-9_.$]+:" }, { cN: "preprocessor", b: "#", e: "$" }, { cN: "preprocessor", b: "\\.[a-zA-Z]+" }, { cN: "localvars", b: "@[0-9]+" }] }; });
hljs.registerLanguage("apache", function (a) { var b = { cN: "number", b: "[\\$%]\\d+" }; return { cI: true, c: [a.HCM, { cN: "tag", b: "</?", e: ">" }, { cN: "keyword", b: /\w+/, r: 0, k: { common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername" }, starts: { e: /$/, r: 0, k: { literal: "on off all" }, c: [{ cN: "sqbracket", b: "\\s\\[", e: "\\]$" }, { cN: "cbracket", b: "[\\$%]\\{", e: "\\}", c: ["self", b] }, b, a.QSM] } }], i: /\S/ }; });
hljs.registerLanguage("1c", function (b) { var f = "[a-zA-Zа-яА-Я][a-zA-Z0-9_а-яА-Я]*"; var c = "возврат дата для если и или иначе иначеесли исключение конецесли конецпопытки конецпроцедуры конецфункции конеццикла константа не перейти перем перечисление по пока попытка прервать продолжить процедура строка тогда фс функция цикл число экспорт"; var e = "ansitooem oemtoansi ввестивидсубконто ввестидату ввестизначение ввестиперечисление ввестипериод ввестиплансчетов ввестистроку ввестичисло вопрос восстановитьзначение врег выбранныйплансчетов вызватьисключение датагод датамесяц датачисло добавитьмесяц завершитьработусистемы заголовоксистемы записьжурналарегистрации запуститьприложение зафиксироватьтранзакцию значениевстроку значениевстрокувнутр значениевфайл значениеизстроки значениеизстрокивнутр значениеизфайла имякомпьютера имяпользователя каталогвременныхфайлов каталогиб каталогпользователя каталогпрограммы кодсимв командасистемы конгода конецпериодаби конецрассчитанногопериодаби конецстандартногоинтервала конквартала конмесяца коннедели лев лог лог10 макс максимальноеколичествосубконто мин монопольныйрежим названиеинтерфейса названиенабораправ назначитьвид назначитьсчет найти найтипомеченныенаудаление найтиссылки началопериодаби началостандартногоинтервала начатьтранзакцию начгода начквартала начмесяца начнедели номерднягода номерднянедели номернеделигода нрег обработкаожидания окр описаниеошибки основнойжурналрасчетов основнойплансчетов основнойязык открытьформу открытьформумодально отменитьтранзакцию очиститьокносообщений периодстр полноеимяпользователя получитьвремята получитьдатута получитьдокументта получитьзначенияотбора получитьпозициюта получитьпустоезначение получитьта прав праводоступа предупреждение префиксавтонумерации пустаястрока пустоезначение рабочаядаттьпустоезначение рабочаядата разделительстраниц разделительстрок разм разобратьпозициюдокумента рассчитатьрегистрына рассчитатьрегистрыпо сигнал симв символтабуляции создатьобъект сокрл сокрлп сокрп сообщить состояние сохранитьзначение сред статусвозврата стрдлина стрзаменить стрколичествострок стрполучитьстроку  стрчисловхождений сформироватьпозициюдокумента счетпокоду текущаядата текущеевремя типзначения типзначениястр удалитьобъекты установитьтана установитьтапо фиксшаблон формат цел шаблон"; var a = { cN: "dquote", b: '""' }; var d = { cN: "string", b: '"', e: '"|$', c: [a] }; var g = { cN: "string", b: "\\|", e: '"|$', c: [a] }; return { cI: true, l: f, k: { keyword: c, built_in: e }, c: [b.CLCM, b.NM, d, g, { cN: "function", b: "(процедура|функция)", e: "$", l: f, k: "процедура функция", c: [b.inherit(b.TM, { b: f }), { cN: "tail", eW: true, c: [{ cN: "params", b: "\\(", e: "\\)", l: f, k: "знач", c: [d, g] }, { cN: "export", b: "экспорт", eW: true, l: f, k: "экспорт", c: [b.CLCM] }] }, b.CLCM] }, { cN: "preprocessor", b: "#", e: "$" }, { cN: "date", b: "'\\d{2}\\.\\d{2}\\.(\\d{2}|\\d{4})'" }] }; });
hljs.registerLanguage("javascript", function (a) { return { aliases: ["js"], k: { keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class", literal: "true false null undefined NaN Infinity", built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require" }, c: [{ cN: "pi", b: /^\s*('|")use strict('|")/, r: 10 }, a.ASM, a.QSM, a.CLCM, a.CBLCLM, a.CNM, { b: "(" + a.RSR + "|\\b(case|return|throw)\\b)\\s*", k: "return throw case", c: [a.CLCM, a.CBLCLM, a.REGEXP_MODE, { b: /</, e: />;/, r: 0, sL: "xml" }], r: 0 }, { cN: "function", bK: "function", e: /\{/, c: [a.inherit(a.TM, { b: /[A-Za-z$_][0-9A-Za-z$_]*/ }), { cN: "params", b: /\(/, e: /\)/, c: [a.CLCM, a.CBLCLM], i: /["'\(]/ }], i: /\[|%/ }, { b: /\$[(.]/ }, { b: "\\." + a.IR, r: 0 }] }; });
hljs.registerLanguage("vbnet", function (a) { return { cI: true, k: { keyword: "addhandler addressof alias and andalso aggregate ansi as assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into is isfalse isnot istrue join key let lib like loop me mid mod module mustinherit mustoverride mybase myclass namespace narrowing new next not notinheritable notoverridable of off on operator option optional or order orelse overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim rem removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly xor", built_in: "boolean byte cbool cbyte cchar cdate cdec cdbl char cint clng cobj csbyte cshort csng cstr ctype date decimal directcast double gettype getxmlnamespace iif integer long object sbyte short single string trycast typeof uinteger ulong ushort", literal: "true false nothing" }, i: "//|{|}|endif|gosub|variant|wend", c: [a.inherit(a.QSM, { c: [{ b: '""' }] }), { cN: "comment", b: "'", e: "$", rB: true, c: [{ cN: "xmlDocTag", b: "'''|<!--|-->" }, { cN: "xmlDocTag", b: "</?", e: ">" },] }, a.CNM, { cN: "preprocessor", b: "#", e: "$", k: "if else elseif end region externalsource" },] }; });
hljs.registerLanguage("fsharp", function (a) { return { k: "abstract and as assert base begin class default delegate do done downcast downto elif else end exception extern false finally for fun function global if in inherit inline interface internal lazy let match member module mutable namespace new null of open or override private public rec return sig static struct then to true try type upcast use val void when while with yield", c: [{ cN: "string", b: '@"', e: '"', c: [{ b: '""' }] }, { cN: "string", b: '"""', e: '"""' }, { cN: "comment", b: "\\(\\*", e: "\\*\\)" }, { cN: "class", bK: "type", e: "\\(|=|$", c: [a.UTM] }, { cN: "annotation", b: "\\[<", e: ">\\]" }, { cN: "attribute", b: "\\B('[A-Za-z])\\b", c: [a.BE] }, a.CLCM, a.inherit(a.QSM, { i: null }), a.CNM] }; });
hljs.registerLanguage("matlab", function (a) { var b = [a.CNM, { cN: "string", b: "'", e: "'", c: [a.BE, { b: "''" }] }]; return { k: { keyword: "break case catch classdef continue else elseif end enumerated events for function global if methods otherwise parfor persistent properties return spmd switch try while", built_in: "sin sind sinh asin asind asinh cos cosd cosh acos acosd acosh tan tand tanh atan atand atan2 atanh sec secd sech asec asecd asech csc cscd csch acsc acscd acsch cot cotd coth acot acotd acoth hypot exp expm1 log log1p log10 log2 pow2 realpow reallog realsqrt sqrt nthroot nextpow2 abs angle complex conj imag real unwrap isreal cplxpair fix floor ceil round mod rem sign airy besselj bessely besselh besseli besselk beta betainc betaln ellipj ellipke erf erfc erfcx erfinv expint gamma gammainc gammaln psi legendre cross dot factor isprime primes gcd lcm rat rats perms nchoosek factorial cart2sph cart2pol pol2cart sph2cart hsv2rgb rgb2hsv zeros ones eye repmat rand randn linspace logspace freqspace meshgrid accumarray size length ndims numel disp isempty isequal isequalwithequalnans cat reshape diag blkdiag tril triu fliplr flipud flipdim rot90 find sub2ind ind2sub bsxfun ndgrid permute ipermute shiftdim circshift squeeze isscalar isvector ans eps realmax realmin pi i inf nan isnan isinf isfinite j why compan gallery hadamard hankel hilb invhilb magic pascal rosser toeplitz vander wilkinson" }, i: '(//|"|#|/\\*|\\s+/\\w+)', c: [{ cN: "function", bK: "function", e: "$", c: [a.UTM, { cN: "params", b: "\\(", e: "\\)" }, { cN: "params", b: "\\[", e: "\\]" }] }, { cN: "transposed_variable", b: "[a-zA-Z_][a-zA-Z_0-9]*('+[\\.']*|[\\.']+)", e: "", r: 0 }, { cN: "matrix", b: "\\[", e: "\\]'*[\\.']*", c: b, r: 0 }, { cN: "cell", b: "\\{", e: "\\}'*[\\.']*", c: b, i: /:/ }, { cN: "comment", b: "\\%", e: "$" }].concat(b) }; });
hljs.registerLanguage("applescript", function (a) { var b = a.inherit(a.QSM, { i: "" }); var d = { cN: "params", b: "\\(", e: "\\)", c: ["self", a.CNM, b] }; var c = [{ cN: "comment", b: "--", e: "$", }, { cN: "comment", b: "\\(\\*", e: "\\*\\)", c: ["self", { b: "--", e: "$" }] }, a.HCM]; return { k: { keyword: "about above after against and around as at back before beginning behind below beneath beside between but by considering contain contains continue copy div does eighth else end equal equals error every exit fifth first for fourth from front get given global if ignoring in into is it its last local me middle mod my ninth not of on onto or over prop property put ref reference repeat returning script second set seventh since sixth some tell tenth that the then third through thru timeout times to transaction try until where while whose with without", constant: "AppleScript false linefeed return pi quote result space tab true", type: "alias application boolean class constant date file integer list number real record string text", command: "activate beep count delay launch log offset read round run say summarize write", property: "character characters contents day frontmost id item length month name paragraph paragraphs rest reverse running time version weekday word words year" }, c: [b, a.CNM, { cN: "type", b: "\\bPOSIX file\\b" }, { cN: "command", b: "\\b(clipboard info|the clipboard|info for|list (disks|folder)|mount volume|path to|(close|open for) access|(get|set) eof|current date|do shell script|get volume settings|random number|set volume|system attribute|system info|time to GMT|(load|run|store) script|scripting components|ASCII (character|number)|localized string|choose (application|color|file|file name|folder|from list|remote application|URL)|display (alert|dialog))\\b|^\\s*return\\b" }, { cN: "constant", b: "\\b(text item delimiters|current application|missing value)\\b" }, { cN: "keyword", b: "\\b(apart from|aside from|instead of|out of|greater than|isn't|(doesn't|does not) (equal|come before|come after|contain)|(greater|less) than( or equal)?|(starts?|ends|begins?) with|contained by|comes (before|after)|a (ref|reference))\\b" }, { cN: "property", b: "\\b(POSIX path|(date|time) string|quoted form)\\b" }, { cN: "function_start", bK: "on", i: "[${=;\\n]", c: [a.UTM, d] }].concat(c), i: "//" }; });
hljs.registerLanguage("delphi", function (b) { var a = "exports register file shl array record property for mod while set ally label uses raise not stored class safecall var interface or private static exit index inherited to else stdcall override shr asm far resourcestring finalization packed virtual out and protected library do xorwrite goto near function end div overload object unit begin string on inline repeat until destructor write message program with read initialization except default nil if case cdecl in downto threadvar of try pascal const external constructor type public then implementation finally published procedure"; var e = { cN: "comment", v: [{ b: /\{/, e: /\}/, r: 0 }, { b: /\(\*/, e: /\*\)/, r: 10 }] }; var c = { cN: "string", b: /'/, e: /'/, c: [{ b: /''/ }] }; var d = { cN: "string", b: /(#\d+)+/ }; var f = { b: b.IR + "\\s*=\\s*class\\s*\\(", rB: true, c: [b.TM] }; var g = { cN: "function", bK: "function constructor destructor procedure", e: /[:;]/, k: "function constructor|10 destructor|10 procedure|10", c: [b.TM, { cN: "params", b: /\(/, e: /\)/, k: a, c: [c, d] }, e] }; return { cI: true, k: a, i: /("|\$[G-Zg-z]|\/\*|<\/)/, c: [e, b.CLCM, c, d, b.NM, f, g] }; });
hljs.registerLanguage("cpp", function (a) { var b = { keyword: "false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginary", built_in: "std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf" }; return { aliases: ["c"], k: b, i: "</", c: [a.CLCM, a.CBLCLM, a.QSM, { cN: "string", b: "'\\\\?.", e: "'", i: "." }, { cN: "number", b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)" }, a.CNM, { cN: "preprocessor", b: "#", e: "$", c: [{ b: "include\\s*<", e: ">", i: "\\n" }, a.CLCM] }, { cN: "stl_container", b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<", e: ">", k: b, r: 10, c: ["self"] }] }; });
hljs.registerLanguage("json", function (a) { var e = { literal: "true false null" }; var d = [a.QSM, a.CNM]; var c = { cN: "value", e: ",", eW: true, eE: true, c: d, k: e }; var b = { b: "{", e: "}", c: [{ cN: "attribute", b: '\\s*"', e: '"\\s*:\\s*', eB: true, eE: true, c: [a.BE], i: "\\n", starts: c }], i: "\\S" }; var f = { b: "\\[", e: "\\]", c: [a.inherit(c, { cN: null })], i: "\\S" }; d.splice(d.length, 0, b, f); return { c: d, k: e, i: "\\S" }; });
hljs.registerLanguage("perl", function (c) { var d = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when"; var f = { cN: "subst", b: "[$@]\\{", e: "\\}", k: d }; var g = { b: "->{", e: "}" }; var a = { cN: "variable", v: [{ b: /\$\d/ }, { b: /[\$\%\@\*](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/ }, { b: /[\$\%\@\*][^\s\w{]/, r: 0 }] }; var e = { cN: "comment", b: "^(__END__|__DATA__)", e: "\\n$", r: 5 }; var h = [c.BE, f, a]; var b = [a, c.HCM, e, { cN: "comment", b: "^\\=\\w", e: "\\=cut", eW: true }, g, { cN: "string", c: h, v: [{ b: "q[qwxr]?\\s*\\(", e: "\\)", r: 5 }, { b: "q[qwxr]?\\s*\\[", e: "\\]", r: 5 }, { b: "q[qwxr]?\\s*\\{", e: "\\}", r: 5 }, { b: "q[qwxr]?\\s*\\|", e: "\\|", r: 5 }, { b: "q[qwxr]?\\s*\\<", e: "\\>", r: 5 }, { b: "qw\\s+q", e: "q", r: 5 }, { b: "'", e: "'", c: [c.BE] }, { b: '"', e: '"' }, { b: "`", e: "`", c: [c.BE] }, { b: "{\\w+}", c: [], r: 0 }, { b: "-?\\w+\\s*\\=\\>", c: [], r: 0 }] }, { cN: "number", b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b", r: 0 }, { b: "(\\/\\/|" + c.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*", k: "split return print reverse grep", r: 0, c: [c.HCM, e, { cN: "regexp", b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*", r: 10 }, { cN: "regexp", b: "(m|qr)?/", e: "/[a-z]*", c: [c.BE], r: 0 }] }, { cN: "sub", bK: "sub", e: "(\\s*\\(.*?\\))?[;{]", r: 5 }, { cN: "operator", b: "-\\w\\b", r: 0 }]; f.c = b; g.c = b; return { k: d, c: b }; });
hljs.registerLanguage("markdown", function (a) { return { c: [{ cN: "header", v: [{ b: "^#{1,6}", e: "$" }, { b: "^.+?\\n[=-]{2,}$" }] }, { b: "<", e: ">", sL: "xml", r: 0 }, { cN: "bullet", b: "^([*+-]|(\\d+\\.))\\s+" }, { cN: "strong", b: "[*_]{2}.+?[*_]{2}" }, { cN: "emphasis", v: [{ b: "\\*.+?\\*" }, { b: "_.+?_", r: 0 }] }, { cN: "blockquote", b: "^>\\s+", e: "$" }, { cN: "code", v: [{ b: "`.+?`" }, { b: "^( {4}|\t)", e: "$", r: 0 }] }, { cN: "horizontal_rule", b: "^[-\\*]{3,}", e: "$" }, { b: "\\[.+?\\][\\(\\[].+?[\\)\\]]", rB: true, c: [{ cN: "link_label", b: "\\[", e: "\\]", eB: true, rE: true, r: 0 }, { cN: "link_url", b: "\\]\\(", e: "\\)", eB: true, eE: true }, { cN: "link_reference", b: "\\]\\[", e: "\\]", eB: true, eE: true, }], r: 10 }, { b: "^\\[.+\\]:", e: "$", rB: true, c: [{ cN: "link_reference", b: "\\[", e: "\\]", eB: true, eE: true }, { cN: "link_url", b: "\\s", e: "$" }] }] }; });
hljs.registerLanguage("ocaml", function (a) { return { k: { keyword: "and as assert asr begin class constraint do done downto else end exception external false for fun function functor if in include inherit initializer land lazy let lor lsl lsr lxor match method mod module mutable new object of open or private rec ref sig struct then to true try type val virtual when while with parser value", built_in: "bool char float int list unit array exn option int32 int64 nativeint format4 format6 lazy_t in_channel out_channel string", }, i: /\/\//, c: [{ cN: "string", b: '"""', e: '"""' }, { cN: "comment", b: "\\(\\*", e: "\\*\\)", c: ["self"] }, { cN: "class", bK: "type", e: "\\(|=|$", c: [a.UTM] }, { cN: "annotation", b: "\\[<", e: ">\\]" }, a.CBLCLM, a.inherit(a.ASM, { i: null }), a.inherit(a.QSM, { i: null }), a.CNM] }; });
hljs.registerLanguage("d", function (x) { var b = { keyword: "abstract alias align asm assert auto body break byte case cast catch class const continue debug default delete deprecated do else enum export extern final finally for foreach foreach_reverse|10 goto if immutable import in inout int interface invariant is lazy macro mixin module new nothrow out override package pragma private protected public pure ref return scope shared static struct super switch synchronized template this throw try typedef typeid typeof union unittest version void volatile while with __FILE__ __LINE__ __gshared|10 __thread __traits __DATE__ __EOF__ __TIME__ __TIMESTAMP__ __VENDOR__ __VERSION__", built_in: "bool cdouble cent cfloat char creal dchar delegate double dstring float function idouble ifloat ireal long real short string ubyte ucent uint ulong ushort wchar wstring", literal: "false null true" }; var c = "(0|[1-9][\\d_]*)", q = "(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)", h = "0[bB][01_]+", v = "([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)", y = "0[xX]" + v, p = "([eE][+-]?" + q + ")", o = "(" + q + "(\\.\\d*|" + p + ")|\\d+\\." + q + q + "|\\." + c + p + "?)", k = "(0[xX](" + v + "\\." + v + "|\\.?" + v + ")[pP][+-]?" + q + ")", l = "(" + c + "|" + h + "|" + y + ")", n = "(" + k + "|" + o + ")"; var z = "\\\\(['\"\\?\\\\abfnrtv]|u[\\dA-Fa-f]{4}|[0-7]{1,3}|x[\\dA-Fa-f]{2}|U[\\dA-Fa-f]{8})|&[a-zA-Z\\d]{2,};"; var m = { cN: "number", b: "\\b" + l + "(L|u|U|Lu|LU|uL|UL)?", r: 0 }; var j = { cN: "number", b: "\\b(" + n + "([fF]|L|i|[fF]i|Li)?|" + l + "(i|[fF]i|Li))", r: 0 }; var s = { cN: "string", b: "'(" + z + "|.)", e: "'", i: "." }; var r = { b: z, r: 0 }; var w = { cN: "string", b: '"', c: [r], e: '"[cwd]?' }; var f = { cN: "string", b: '[rq]"', e: '"[cwd]?', r: 5 }; var u = { cN: "string", b: "`", e: "`[cwd]?" }; var i = { cN: "string", b: 'x"[\\da-fA-F\\s\\n\\r]*"[cwd]?', r: 10 }; var t = { cN: "string", b: 'q"\\{', e: '\\}"' }; var e = { cN: "shebang", b: "^#!", e: "$", r: 5 }; var g = { cN: "preprocessor", b: "#(line)", e: "$", r: 5 }; var d = { cN: "keyword", b: "@[a-zA-Z_][a-zA-Z_\\d]*" }; var a = { cN: "comment", b: "\\/\\+", c: ["self"], e: "\\+\\/", r: 10 }; return { l: x.UIR, k: b, c: [x.CLCM, x.CBLCLM, a, i, w, f, u, t, j, m, s, e, g, d] }; });
hljs.registerLanguage("coffeescript", function (c) { var b = { keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not", literal: "true false null undefined yes no on off", reserved: "case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf", built_in: "npm require console print module exports global window document" }; var a = "[A-Za-z$_][0-9A-Za-z$_]*"; var f = c.inherit(c.TM, { b: a }); var e = { cN: "subst", b: /#\{/, e: /}/, k: b }; var d = [c.BNM, c.inherit(c.CNM, { starts: { e: "(\\s*/)?", r: 0 } }), { cN: "string", v: [{ b: /'''/, e: /'''/, c: [c.BE] }, { b: /'/, e: /'/, c: [c.BE] }, { b: /"""/, e: /"""/, c: [c.BE, e] }, { b: /"/, e: /"/, c: [c.BE, e] }] }, { cN: "regexp", v: [{ b: "///", e: "///", c: [e, c.HCM] }, { b: "//[gim]*", r: 0 }, { b: "/\\S(\\\\.|[^\\n])*?/[gim]*(?=\\s|\\W|$)" }] }, { cN: "property", b: "@" + a }, { b: "`", e: "`", eB: true, eE: true, sL: "javascript" }]; e.c = d; return { k: b, c: d.concat([{ cN: "comment", b: "###", e: "###" }, c.HCM, { cN: "function", b: "(" + a + "\\s*=\\s*)?(\\(.*\\))?\\s*\\B[-=]>", e: "[-=]>", rB: true, c: [f, { cN: "params", b: "\\(", rB: true, c: [{ b: /\(/, e: /\)/, k: b, c: ["self"].concat(d) }] }] }, { cN: "class", bK: "class", e: "$", i: /[:="\[\]]/, c: [{ bK: "extends", eW: true, i: /[:="\[\]]/, c: [f] }, f] }, { cN: "attribute", b: a + ":", e: ":", rB: true, eE: true, r: 0 }]) }; });
hljs.registerLanguage("lua", function (b) { var a = "\\[=*\\["; var e = "\\]=*\\]"; var c = { b: a, e: e, c: ["self"] }; var d = [{ cN: "comment", b: "--(?!" + a + ")", e: "$" }, { cN: "comment", b: "--" + a, e: e, c: [c], r: 10 }]; return { l: b.UIR, k: { keyword: "and break do else elseif end false for if in local nil not or repeat return then true until while", built_in: "_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table" }, c: d.concat([{ cN: "function", bK: "function", e: "\\)", c: [b.inherit(b.TM, { b: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*" }), { cN: "params", b: "\\(", eW: true, c: d }].concat(d) }, b.CNM, b.ASM, b.QSM, { cN: "string", b: a, e: e, c: [c], r: 10 }]) }; });
hljs.registerLanguage("makefile", function (a) { var b = { cN: "variable", b: /\$\(/, e: /\)/, c: [a.BE] }; return { c: [a.HCM, { b: /^\w+\s*\W*=/, rB: true, r: 0, starts: { cN: "constant", e: /\s*\W*=/, eE: true, starts: { e: /$/, r: 0, c: [b], } } }, { cN: "title", b: /^[\w]+:\s*$/ }, { cN: "phony", b: /^\.PHONY:/, e: /$/, k: ".PHONY", l: /[\.\w]+/ }, { b: /^\t+/, e: /$/, c: [a.QSM, b] }] }; });
hljs.registerLanguage("rsl", function (a) { return { k: { keyword: "float color point normal vector matrix while for if do return else break extern continue", built_in: "abs acos ambient area asin atan atmosphere attribute calculatenormal ceil cellnoise clamp comp concat cos degrees depth Deriv diffuse distance Du Dv environment exp faceforward filterstep floor format fresnel incident length lightsource log match max min mod noise normalize ntransform opposite option phong pnoise pow printf ptlined radians random reflect refract renderinfo round setcomp setxcomp setycomp setzcomp shadow sign sin smoothstep specular specularbrdf spline sqrt step tan texture textureinfo trace transform vtransform xcomp ycomp zcomp" }, i: "</", c: [a.CLCM, a.CBLCLM, a.QSM, a.ASM, a.CNM, { cN: "preprocessor", b: "#", e: "$" }, { cN: "shader", bK: "surface displacement light volume imager", e: "\\(" }, { cN: "shading", bK: "illuminate illuminance gather", e: "\\(" }] }; });
hljs.registerLanguage("vbscript", function (a) { return { cI: true, k: { keyword: "call class const dim do loop erase execute executeglobal exit for each next function if then else on error option explicit new private property let get public randomize redim rem select case set stop sub while wend with end to elseif is or xor and not class_initialize class_terminate default preserve in me byval byref step resume goto", built_in: "lcase month vartype instrrev ubound setlocale getobject rgb getref string weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency conversions csng timevalue second year space abs clng timeserial fixs len asc isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim strcomp int createobject loadpicture tan formatnumber mid scriptenginebuildversion scriptengine split scriptengineminorversion cint sin datepart ltrim sqr scriptenginemajorversion time derived eval date formatpercent exp inputbox left ascw chrw regexp server response request cstr err", literal: "true false null nothing empty" }, i: "//", c: [a.inherit(a.QSM, { c: [{ b: '""' }] }), { cN: "comment", b: /'/, e: /$/, r: 0 }, a.CNM] }; });
hljs.registerLanguage("go", function (a) { var b = { keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer", constant: "true false iota nil", typename: "bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune", built_in: "append cap close complex copy imag len make new panic print println real recover delete" }; return { aliases: ["golang"], k: b, i: "</", c: [a.CLCM, a.CBLCLM, a.QSM, { cN: "string", b: "'", e: "[^\\\\]'" }, { cN: "string", b: "`", e: "`" }, { cN: "number", b: "[^a-zA-Z_0-9](\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?", r: 0 }, a.CNM] }; });
hljs.registerLanguage("axapta", function (a) { return { k: "false int abstract private char boolean static null if for true while long throw finally protected final return void enum else break new catch byte super case short default double public try this switch continue reverse firstfast firstonly forupdate nofetch sum avg minof maxof count order group by asc desc index hint like dispaly edit client server ttsbegin ttscommit str real date container anytype common div mod", c: [a.CLCM, a.CBLCLM, a.ASM, a.QSM, a.CNM, { cN: "preprocessor", b: "#", e: "$" }, { cN: "class", bK: "class interface", e: "{", i: ":", c: [{ cN: "inheritance", bK: "extends implements", r: 10 }, a.UTM] }] }; });
hljs.registerLanguage("vala", function (a) { return { k: { keyword: "char uchar unichar int uint long ulong short ushort int8 int16 int32 int64 uint8 uint16 uint32 uint64 float double bool struct enum string void weak unowned owned async signal static abstract interface override while do for foreach else switch case break default return try catch public private protected internal using new this get set const stdout stdin stderr var", built_in: "DBus GLib CCode Gee Object", literal: "false true null" }, c: [{ cN: "class", bK: "class interface delegate namespace", e: "{", i: "[^,:\\n\\s\\.]", c: [a.UTM] }, a.CLCM, a.CBLCLM, { cN: "string", b: '"""', e: '"""', r: 5 }, a.ASM, a.QSM, a.CNM, { cN: "preprocessor", b: "^#", e: "$", r: 2 }, { cN: "constant", b: " [A-Z_]+ ", r: 0 }] }; });
hljs.registerLanguage("erlang", function (i) { var c = "[a-z'][a-zA-Z0-9_']*"; var o = "(" + c + ":" + c + "|" + c + ")"; var f = { keyword: "after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun let not of orelse|10 query receive rem try when xor", literal: "false true" }; var l = { cN: "comment", b: "%", e: "$", r: 0 }; var e = { cN: "number", b: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)", r: 0 }; var g = { b: "fun\\s+" + c + "/\\d+" }; var n = { b: o + "\\(", e: "\\)", rB: true, r: 0, c: [{ cN: "function_name", b: o, r: 0 }, { b: "\\(", e: "\\)", eW: true, rE: true, r: 0 }] }; var h = { cN: "tuple", b: "{", e: "}", r: 0 }; var a = { cN: "variable", b: "\\b_([A-Z][A-Za-z0-9_]*)?", r: 0 }; var m = { cN: "variable", b: "[A-Z][a-zA-Z0-9_]*", r: 0 }; var b = { b: "#" + i.UIR, r: 0, rB: true, c: [{ cN: "record_name", b: "#" + i.UIR, r: 0 }, { b: "{", e: "}", r: 0 }] }; var k = { bK: "fun receive if try case", e: "end", k: f }; k.c = [l, g, i.inherit(i.ASM, { cN: "" }), k, n, i.QSM, e, h, a, m, b]; var j = [l, g, k, n, i.QSM, e, h, a, m, b]; n.c[1].c = j; h.c = j; b.c[1].c = j; var d = { cN: "params", b: "\\(", e: "\\)", c: j }; return { k: f, i: "(</|\\*=|\\+=|-=|/=|/\\*|\\*/|\\(\\*|\\*\\))", c: [{ cN: "function", b: "^" + c + "\\s*\\(", e: "->", rB: true, i: "\\(|#|//|/\\*|\\\\|:|;", c: [d, i.inherit(i.TM, { b: c })], starts: { e: ";|\\.", k: f, c: j } }, l, { cN: "pp", b: "^-", e: "\\.", r: 0, eE: true, rB: true, l: "-" + i.IR, k: "-module -record -undef -export -ifdef -ifndef -author -copyright -doc -vsn -import -include -include_lib -compile -define -else -endif -file -behaviour -behavior", c: [d] }, e, i.QSM, b, a, m, h] }; });
hljs.registerLanguage("sql", function (a) { return { cI: true, i: /[<>]/, c: [{ cN: "operator", b: "\\b(begin|end|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant|merge)\\b(?!:)", e: ";", eW: true, k: { keyword: "all partial global month current_timestamp using go revoke smallint indicator end-exec disconnect zone with character assertion to add current_user usage input local alter match collate real then rollback get read timestamp session_user not integer bit unique day minute desc insert execute like ilike|2 level decimal drop continue isolation found where constraints domain right national some module transaction relative second connect escape close system_user for deferred section cast current sqlstate allocate intersect deallocate numeric public preserve full goto initially asc no key output collation group by union session both last language constraint column of space foreign deferrable prior connection unknown action commit view or first into float year primary cascaded except restrict set references names table outer open select size are rows from prepare distinct leading create only next inner authorization schema corresponding option declare precision immediate else timezone_minute external varying translation true case exception join hour default double scroll value cursor descriptor values dec fetch procedure delete and false int is describe char as at in varchar null trailing any absolute current_time end grant privileges when cross check write current_date pad begin temporary exec time update catalog user sql date on identity timezone_hour natural whenever interval work order cascade diagnostics nchar having left call do handler load replace truncate start lock show pragma exists number trigger if before after each row merge matched database", aggregate: "count sum min max avg" }, c: [{ cN: "string", b: "'", e: "'", c: [a.BE, { b: "''" }] }, { cN: "string", b: '"', e: '"', c: [a.BE, { b: '""' }] }, { cN: "string", b: "`", e: "`", c: [a.BE] }, a.CNM] }, a.CBLCLM, { cN: "comment", b: "--", e: "$" }] }; });
hljs.registerLanguage("mizar", function (a) { return { k: ["environ vocabularies notations constructors definitions registrations theorems schemes requirements", "begin end definition registration cluster existence pred func defpred deffunc theorem proof", "let take assume then thus hence ex for st holds consider reconsider such that and in provided of as from", "be being by means equals implies iff redefine define now not or attr is mode suppose per cases set", "thesis contradiction scheme reserve struct", "correctness compatibility coherence symmetry assymetry reflexivity irreflexivity", "connectedness uniqueness commutativity idempotence involutiveness projectivity"].join(" "), c: [{ cN: "comment", b: "::", e: "$" }] }; });
hljs.registerLanguage("lasso", function (d) { var b = "[a-zA-Z_][a-zA-Z0-9_.]*"; var i = "<\\?(lasso(script)?|=)"; var c = "\\]|\\?>"; var g = { literal: "true false none minimal full all void and or not bw nbw ew new cn ncn lt lte gt gte eq neq rx nrx ft", built_in: "array date decimal duration integer map pair string tag xml null bytes list queue set stack staticarray tie local var variable global data self inherited", keyword: "error_code error_msg error_pop error_push error_reset cache database_names database_schemanames database_tablenames define_tag define_type email_batch encode_set html_comment handle handle_error header if inline iterate ljax_target link link_currentaction link_currentgroup link_currentrecord link_detail link_firstgroup link_firstrecord link_lastgroup link_lastrecord link_nextgroup link_nextrecord link_prevgroup link_prevrecord log loop namespace_using output_none portal private protect records referer referrer repeating resultset rows search_args search_arguments select sort_args sort_arguments thread_atomic value_list while abort case else if_empty if_false if_null if_true loop_abort loop_continue loop_count params params_up return return_value run_children soap_definetag soap_lastrequest soap_lastresponse tag_name ascending average by define descending do equals frozen group handle_failure import in into join let match max min on order parent protected provide public require returnhome skip split_thread sum take thread to trait type where with yield yieldhome" }; var a = { cN: "comment", b: "<!--", e: "-->", r: 0 }; var j = { cN: "preprocessor", b: "\\[noprocess\\]", starts: { cN: "markup", e: "\\[/noprocess\\]", rE: true, c: [a] } }; var e = { cN: "preprocessor", b: "\\[/noprocess|" + i }; var h = { cN: "variable", b: "'" + b + "'" }; var f = [d.CLCM, { cN: "javadoc", b: "/\\*\\*!", e: "\\*/" }, d.CBLCLM, d.inherit(d.CNM, { b: d.CNR + "|-?(infinity|nan)\\b" }), d.inherit(d.ASM, { i: null }), d.inherit(d.QSM, { i: null }), { cN: "string", b: "`", e: "`" }, { cN: "variable", v: [{ b: "[#$]" + b }, { b: "#", e: "\\d+", i: "\\W" }] }, { cN: "tag", b: "::\\s*", e: b, i: "\\W" }, { cN: "attribute", b: "\\.\\.\\.|-" + d.UIR }, { cN: "subst", v: [{ b: "->\\s*", c: [h] }, { b: ":=|/(?!\\w)=?|[-+*%=<>&|!?\\\\]+", r: 0 }] }, { cN: "built_in", b: "\\.\\.?", r: 0, c: [h] }, { cN: "class", bK: "define", rE: true, e: "\\(|=>", c: [d.inherit(d.TM, { b: d.UIR + "(=(?!>))?" })] }]; return { aliases: ["ls", "lassoscript"], cI: true, l: b + "|&[lg]t;", k: g, c: [{ cN: "preprocessor", b: c, r: 0, starts: { cN: "markup", e: "\\[|" + i, rE: true, r: 0, c: [a] } }, j, e, { cN: "preprocessor", b: "\\[no_square_brackets", starts: { e: "\\[/no_square_brackets\\]", l: b + "|&[lg]t;", k: g, c: [{ cN: "preprocessor", b: c, r: 0, starts: { cN: "markup", e: i, rE: true, c: [a] } }, j, e].concat(f) } }, { cN: "preprocessor", b: "\\[", r: 0 }, { cN: "shebang", b: "^#!.+lasso9\\b", r: 10 }].concat(f) }; });
hljs.registerLanguage("r", function (a) { var b = "([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*"; return { c: [a.HCM, { b: b, l: b, k: { keyword: "function if in break next repeat else for return switch while try tryCatch|10 stop warning require library attach detach source setMethod setGeneric setGroupGeneric setClass ...|10", literal: "NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10" }, r: 0 }, { cN: "number", b: "0[xX][0-9a-fA-F]+[Li]?\\b", r: 0 }, { cN: "number", b: "\\d+(?:[eE][+\\-]?\\d*)?L\\b", r: 0 }, { cN: "number", b: "\\d+\\.(?!\\d)(?:i\\b)?", r: 0 }, { cN: "number", b: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b", r: 0 }, { cN: "number", b: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b", r: 0 }, { b: "`", e: "`", r: 0 }, { cN: "string", c: [a.BE], v: [{ b: '"', e: '"' }, { b: "'", e: "'" }] }] }; });
hljs.registerLanguage("scala", function (a) { var c = { cN: "annotation", b: "@[A-Za-z]+" }; var b = { cN: "string", b: 'u?r?"""', e: '"""', r: 10 }; return { k: "type yield lazy override def with val var false true sealed abstract private trait object null if for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws", c: [{ cN: "javadoc", b: "/\\*\\*", e: "\\*/", c: [{ cN: "javadoctag", b: "@[A-Za-z]+" }], r: 10 }, a.CLCM, a.CBLCLM, b, a.ASM, a.QSM, { cN: "class", b: "((case )?class |object |trait )", e: "({|$)", i: ":", k: "case class trait object", c: [{ bK: "extends with", r: 10 }, a.UTM, { cN: "params", b: "\\(", e: "\\)", c: [a.ASM, a.QSM, b, c] }] }, a.CNM, c] }; });
hljs.registerLanguage("livecodeserver", function (a) { var e = { cN: "variable", b: "\\b[gtps][A-Z]+[A-Za-z0-9_\\-]*\\b|\\$_[A-Z]+", r: 0 }; var b = { cN: "comment", e: "$", v: [a.CBLCLM, a.HCM, { b: "--", }, { b: "[^:]//", }] }; var d = a.inherit(a.TM, { v: [{ b: "\\b_*rig[A-Z]+[A-Za-z0-9_\\-]*" }, { b: "\\b_[a-z0-9\\-]+" }] }); var c = a.inherit(a.TM, { b: "\\b([A-Za-z0-9_\\-]+)\\b" }); return { cI: false, k: { keyword: "after byte bytes english the until http forever descending using line real8 with seventh for stdout finally element word fourth before black ninth sixth characters chars stderr uInt1 uInt1s uInt2 uInt2s stdin string lines relative rel any fifth items from middle mid at else of catch then third it file milliseconds seconds second secs sec int1 int1s int4 int4s internet int2 int2s normal text item last long detailed effective uInt4 uInt4s repeat end repeat URL in try into switch to words https token binfile each tenth as ticks tick system real4 by dateItems without char character ascending eighth whole dateTime numeric short first ftp integer abbreviated abbr abbrev private case while if", constant: "SIX TEN FORMFEED NINE ZERO NONE SPACE FOUR FALSE COLON CRLF PI COMMA ENDOFFILE EOF EIGHT FIVE QUOTE EMPTY ONE TRUE RETURN CR LINEFEED RIGHT BACKSLASH NULL SEVEN TAB THREE TWO six ten formfeed nine zero none space four false colon crlf pi comma endoffile eof eight five quote empty one true return cr linefeed right backslash null seven tab three two RIVERSION RISTATE FILE_READ_MODE FILE_WRITE_MODE FILE_WRITE_MODE DIR_WRITE_MODE FILE_READ_UMASK FILE_WRITE_UMASK DIR_READ_UMASK DIR_WRITE_UMASK", operator: "div mod wrap and or bitAnd bitNot bitOr bitXor among not in a an within contains ends with begins the keys of keys", built_in: "put abs acos aliasReference annuity arrayDecode arrayEncode asin atan atan2 average avg base64Decode base64Encode baseConvert binaryDecode binaryEncode byteToNum cachedURL cachedURLs charToNum cipherNames commandNames compound compress constantNames cos date dateFormat decompress directories diskSpace DNSServers exp exp1 exp2 exp10 extents files flushEvents folders format functionNames global globals hasMemory hostAddress hostAddressToName hostName hostNameToAddress isNumber ISOToMac itemOffset keys len length libURLErrorData libUrlFormData libURLftpCommand libURLLastHTTPHeaders libURLLastRHHeaders libUrlMultipartFormAddPart libUrlMultipartFormData libURLVersion lineOffset ln ln1 localNames log log2 log10 longFilePath lower macToISO matchChunk matchText matrixMultiply max md5Digest median merge millisec millisecs millisecond milliseconds min monthNames num number numToByte numToChar offset open openfiles openProcesses openProcessIDs openSockets paramCount param params peerAddress pendingMessages platform processID random randomBytes replaceText result revCreateXMLTree revCreateXMLTreeFromFile revCurrentRecord revCurrentRecordIsFirst revCurrentRecordIsLast revDatabaseColumnCount revDatabaseColumnIsNull revDatabaseColumnLengths revDatabaseColumnNames revDatabaseColumnNamed revDatabaseColumnNumbered revDatabaseColumnTypes revDatabaseConnectResult revDatabaseCursors revDatabaseID revDatabaseTableNames revDatabaseType revDataFromQuery revdb_closeCursor revdb_columnbynumber revdb_columncount revdb_columnisnull revdb_columnlengths revdb_columnnames revdb_columntypes revdb_commit revdb_connect revdb_connections revdb_connectionerr revdb_currentrecord revdb_cursorconnection revdb_cursorerr revdb_cursors revdb_dbtype revdb_disconnect revdb_execute revdb_iseof revdb_isbof revdb_movefirst revdb_movelast revdb_movenext revdb_moveprev revdb_query revdb_querylist revdb_recordcount revdb_rollback revdb_tablenames revGetDatabaseDriverPath revNumberOfRecords revOpenDatabase revOpenDatabases revQueryDatabase revQueryDatabaseBlob revQueryResult revQueryIsAtStart revQueryIsAtEnd revUnixFromMacPath revXMLAttribute revXMLAttributes revXMLAttributeValues revXMLChildContents revXMLChildNames revXMLFirstChild revXMLMatchingNode revXMLNextSibling revXMLNodeContents revXMLNumberOfChildren revXMLParent revXMLPreviousSibling revXMLRootNode revXMLRPC_CreateRequest revXMLRPC_Documents revXMLRPC_Error revXMLRPC_Execute revXMLRPC_GetHost revXMLRPC_GetMethod revXMLRPC_GetParam revXMLText revXMLRPC_GetParamCount revXMLRPC_GetParamNode revXMLRPC_GetParamType revXMLRPC_GetPath revXMLRPC_GetPort revXMLRPC_GetProtocol revXMLRPC_GetRequest revXMLRPC_GetResponse revXMLRPC_GetSocket revXMLTree revXMLTrees revXMLValidateDTD revZipDescribeItem revZipEnumerateItems revZipOpenArchives round sec secs seconds sha1Digest shell shortFilePath sin specialFolderPath sqrt standardDeviation statRound stdDev sum sysError systemVersion tan tempName tick ticks time to toLower toUpper transpose trunc uniDecode uniEncode upper URLDecode URLEncode URLStatus value variableNames version waitDepth weekdayNames wordOffset add breakpoint cancel clear local variable file word line folder directory URL close socket process combine constant convert create new alias folder directory decrypt delete variable word line folder directory URL dispatch divide do encrypt filter get include intersect kill libURLDownloadToFile libURLFollowHttpRedirects libURLftpUpload libURLftpUploadFile libURLresetAll libUrlSetAuthCallback libURLSetCustomHTTPHeaders libUrlSetExpect100 libURLSetFTPListCommand libURLSetFTPMode libURLSetFTPStopTime libURLSetStatusCallback load multiply socket process post seek rel relative read from process rename replace require resetAll revAddXMLNode revAppendXML revCloseCursor revCloseDatabase revCommitDatabase revCopyFile revCopyFolder revCopyXMLNode revDeleteFolder revDeleteXMLNode revDeleteAllXMLTrees revDeleteXMLTree revExecuteSQL revGoURL revInsertXMLNode revMoveFolder revMoveToFirstRecord revMoveToLastRecord revMoveToNextRecord revMoveToPreviousRecord revMoveToRecord revMoveXMLNode revPutIntoXMLNode revRollBackDatabase revSetDatabaseDriverPath revSetXMLAttribute revXMLRPC_AddParam revXMLRPC_DeleteAllDocuments revXMLAddDTD revXMLRPC_Free revXMLRPC_FreeAll revXMLRPC_DeleteDocument revXMLRPC_DeleteParam revXMLRPC_SetHost revXMLRPC_SetMethod revXMLRPC_SetPort revXMLRPC_SetProtocol revXMLRPC_SetSocket revZipAddItemWithData revZipAddItemWithFile revZipAddUncompressedItemWithData revZipAddUncompressedItemWithFile revZipCancel revZipCloseArchive revZipDeleteItem revZipExtractItemToFile revZipExtractItemToVariable revZipSetProgressCallback revZipRenameItem revZipReplaceItemWithData revZipReplaceItemWithFile revZipOpenArchive send set sort split subtract union unload wait write" }, c: [e, { cN: "keyword", b: "\\bend\\sif\\b" }, { cN: "function", bK: "function", e: "$", c: [e, c, a.ASM, a.QSM, a.BNM, a.CNM, d] }, { cN: "function", bK: "end", e: "$", c: [c, d] }, { cN: "command", bK: "command on", e: "$", c: [e, c, a.ASM, a.QSM, a.BNM, a.CNM, d] }, { cN: "command", bK: "end", e: "$", c: [c, d] }, { cN: "preprocessor", b: "<\\?rev|<\\?lc|<\\?livecode", r: 10 }, { cN: "preprocessor", b: "<\\?" }, { cN: "preprocessor", b: "\\?>" }, b, a.ASM, a.QSM, a.BNM, a.CNM, d], i: ";$|^\\[|^=" }; });
hljs.registerLanguage("profile", function (a) { return { c: [a.CNM, { cN: "built_in", b: "{", e: "}$", eB: true, eE: true, c: [a.ASM, a.QSM], r: 0 }, { cN: "filename", b: "[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}", e: ":", eE: true }, { cN: "header", b: "(ncalls|tottime|cumtime)", e: "$", k: "ncalls tottime|10 cumtime|10 filename", r: 10 }, { cN: "summary", b: "function calls", e: "$", c: [a.CNM], r: 10 }, a.ASM, a.QSM, { cN: "function", b: "\\(", e: "\\)$", c: [a.UTM], r: 0 }] }; });
hljs.registerLanguage("php", function (b) { var e = { cN: "variable", b: "\\$+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*" }; var a = { cN: "preprocessor", b: /<\?(php)?|\?>/ }; var c = { cN: "string", c: [b.BE, a], v: [{ b: 'b"', e: '"' }, { b: "b'", e: "'" }, b.inherit(b.ASM, { i: null }), b.inherit(b.QSM, { i: null })] }; var d = { v: [b.BNM, b.CNM] }; return { cI: true, k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally", c: [b.CLCM, b.HCM, { cN: "comment", b: "/\\*", e: "\\*/", c: [{ cN: "phpdoc", b: "\\s@[A-Za-z]+" }, a] }, { cN: "comment", b: "__halt_compiler.+?;", eW: true, k: "__halt_compiler", l: b.UIR }, { cN: "string", b: "<<<['\"]?\\w+['\"]?$", e: "^\\w+;", c: [b.BE] }, a, e, { cN: "function", bK: "function", e: /[;{]/, i: "\\$|\\[|%", c: [b.UTM, { cN: "params", b: "\\(", e: "\\)", c: ["self", e, b.CBLCLM, c, d] }] }, { cN: "class", bK: "class interface", e: "{", i: /[:\(\$"]/, c: [{ bK: "extends implements", r: 10 }, b.UTM] }, { bK: "namespace", e: ";", i: /[\.']/, c: [b.UTM] }, { bK: "use", e: ";", c: [b.UTM] }, { b: "=>" }, c, d] }; });
hljs.registerLanguage("parser3", function (a) { return { sL: "xml", r: 0, c: [{ cN: "comment", b: "^#", e: "$" }, { cN: "comment", b: "\\^rem{", e: "}", r: 10, c: [{ b: "{", e: "}", c: ["self"] }] }, { cN: "preprocessor", b: "^@(?:BASE|USE|CLASS|OPTIONS)$", r: 10 }, { cN: "title", b: "@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$" }, { cN: "variable", b: "\\$\\{?[\\w\\-\\.\\:]+\\}?" }, { cN: "keyword", b: "\\^[\\w\\-\\.\\:]+" }, { cN: "number", b: "\\^#[0-9a-fA-F]+" }, a.CNM] }; });
hljs.registerLanguage("actionscript", function (a) { var c = "[a-zA-Z_$][a-zA-Z0-9_$]*"; var b = "([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)"; var d = { cN: "rest_arg", b: "[.]{3}", e: c, r: 10 }; return { k: { keyword: "as break case catch class const continue default delete do dynamic each else extends final finally for function get if implements import in include instanceof interface internal is namespace native new override package private protected public return set static super switch this throw try typeof use var void while with", literal: "true false null undefined" }, c: [a.ASM, a.QSM, a.CLCM, a.CBLCLM, a.CNM, { cN: "package", bK: "package", e: "{", c: [a.TM] }, { cN: "class", bK: "class interface", e: "{", c: [{ bK: "extends implements" }, a.TM] }, { cN: "preprocessor", bK: "import include", e: ";" }, { cN: "function", bK: "function", e: "[{;]", i: "\\S", c: [a.TM, { cN: "params", b: "\\(", e: "\\)", c: [a.ASM, a.QSM, a.CLCM, a.CBLCLM, d] }, { cN: "type", b: ":", e: b, r: 10 }] }] }; });
hljs.registerLanguage("nginx", function (c) { var b = { cN: "variable", v: [{ b: /\$\d+/ }, { b: /\$\{/, e: /}/ }, { b: "[\\$\\@]" + c.UIR }] }; var a = { eW: true, l: "[a-z/_]+", k: { built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll" }, r: 0, i: "=>", c: [c.HCM, { cN: "string", c: [c.BE, b], v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }] }, { cN: "url", b: "([a-z]+):/", e: "\\s", eW: true, eE: true }, { cN: "regexp", c: [c.BE, b], v: [{ b: "\\s\\^", e: "\\s|{|;", rE: true }, { b: "~\\*?\\s+", e: "\\s|{|;", rE: true }, { b: "\\*(\\.[a-z\\-]+)+" }, { b: "([a-z\\-]+\\.)+\\*" }] }, { cN: "number", b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b" }, { cN: "number", b: "\\b\\d+[kKmMgGdshdwy]*\\b", r: 0 }, b] }; return { c: [c.HCM, { b: c.UIR + "\\s", e: ";|{", rB: true, c: [c.inherit(c.UTM, { starts: a })], r: 0 }], i: "[^\\s\\}]" }; });
hljs.registerLanguage("vhdl", function (a) { return { cI: true, k: { keyword: "abs access after alias all and architecture array assert attribute begin block body buffer bus case component configuration constant context cover disconnect downto default else elsif end entity exit fairness file for force function generate generic group guarded if impure in inertial inout is label library linkage literal loop map mod nand new next nor not null of on open or others out package port postponed procedure process property protected pure range record register reject release rem report restrict restrict_guarantee return rol ror select sequence severity shared signal sla sll sra srl strong subtype then to transport type unaffected units until use variable vmode vprop vunit wait when while with xnor xor", typename: "boolean bit character severity_level integer time delay_length natural positive string bit_vector file_open_kind file_open_status std_ulogic std_ulogic_vector std_logic std_logic_vector unsigned signed boolean_vector integer_vector real_vector time_vector" }, i: "{", c: [a.CBLCLM, { cN: "comment", b: "--", e: "$" }, a.QSM, a.CNM, { cN: "literal", b: "'(U|X|0|1|Z|W|L|H|-)'", c: [a.BE] }, { cN: "attribute", b: "'[A-Za-z](_?[A-Za-z0-9])*", c: [a.BE] }] }; });
hljs.registerLanguage("fix", function (a) { return { c: [{ b: /[^\u2401\u0001]+/, e: /[\u2401\u0001]/, eE: true, rB: true, rE: false, c: [{ b: /([^\u2401\u0001=]+)/, e: /=([^\u2401\u0001=]+)/, rE: true, rB: false, cN: "attribute" }, { b: /=/, e: /([\u2401\u0001])/, eE: true, eB: true, cN: "string" }] }], cI: true }; });
hljs.registerLanguage("diff", function (a) { return { c: [{ cN: "chunk", r: 10, v: [{ b: /^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/ }, { b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/ }, { b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/ }] }, { cN: "header", v: [{ b: /Index: /, e: /$/ }, { b: /=====/, e: /=====$/ }, { b: /^\-\-\-/, e: /$/ }, { b: /^\*{3} /, e: /$/ }, { b: /^\+\+\+/, e: /$/ }, { b: /\*{5}/, e: /\*{5}$/ }] }, { cN: "addition", b: "^\\+", e: "$" }, { cN: "deletion", b: "^\\-", e: "$" }, { cN: "change", b: "^\\!", e: "$" }] }; });
hljs.registerLanguage("smalltalk", function (a) { var b = "[a-z][a-zA-Z0-9_]*"; var d = { cN: "char", b: "\\$.{1}" }; var c = { cN: "symbol", b: "#" + a.UIR }; return { k: "self super nil true false thisContext", c: [{ cN: "comment", b: '"', e: '"' }, a.ASM, { cN: "class", b: "\\b[A-Z][A-Za-z0-9_]*", r: 0 }, { cN: "method", b: b + ":", r: 0 }, a.CNM, c, d, { cN: "localvars", b: "\\|[ ]*" + b + "([ ]+" + b + ")*[ ]*\\|", rB: true, e: /\|/, i: /\S/, c: [{ b: "(\\|[ ]*)?" + b }] }, { cN: "array", b: "\\#\\(", e: "\\)", c: [a.ASM, d, a.CNM, c] }] }; });
hljs.registerLanguage("clojure", function (l) { var e = { built_in: "def cond apply if-not if-let if not not= = &lt; < > &lt;= <= >= == + / * - rem quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last drop-while while intern condp case reduced cycle split-at split-with repeat replicate iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter monitor-exit defmacro defn defn- macroexpand macroexpand-1 for dosync and or when when-not when-let comp juxt partial sequence memoize constantly complement identity assert peek pop doto proxy defstruct first rest cons defprotocol cast coll deftype defrecord last butlast sigs reify second ffirst fnext nfirst nnext defmulti defmethod meta with-meta ns in-ns create-ns import refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! assoc! dissoc! pop! disj! use class type num float double short byte boolean bigint biginteger bigdec print-method print-dup throw-if printf format load compile get-in update-in pr pr-on newline flush read slurp read-line subvec with-open memfn time re-find re-groups rand-int rand mod locking assert-valid-fdecl alias resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! new next conj set! to-array future future-call into-array aset gen-class reduce map filter find empty hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize" }; var f = "[a-zA-Z_0-9\\!\\.\\?\\-\\+\\*\\/\\<\\=\\>\\&\\#\\$';]+"; var a = "[\\s:\\(\\{]+\\d+(\\.\\d+)?"; var d = { cN: "number", b: a, r: 0 }; var j = l.inherit(l.QSM, { i: null }); var o = { cN: "comment", b: ";", e: "$", r: 0 }; var n = { cN: "collection", b: "[\\[\\{]", e: "[\\]\\}]" }; var c = { cN: "comment", b: "\\^" + f }; var b = { cN: "comment", b: "\\^\\{", e: "\\}" }; var h = { cN: "attribute", b: "[:]" + f }; var m = { cN: "list", b: "\\(", e: "\\)" }; var g = { eW: true, k: { literal: "true false nil" }, r: 0 }; var i = { k: e, l: f, cN: "title", b: f, starts: g }; m.c = [{ cN: "comment", b: "comment" }, i, g]; g.c = [m, j, c, b, o, h, n, d]; n.c = [m, j, c, o, h, n, d]; return { i: /\S/, c: [o, m, { cN: "prompt", b: /^=> /, starts: { e: /\n\n|\Z/ } }] }; });
hljs.registerLanguage("oxygene", function (b) { var g = "abstract add and array as asc aspect assembly async begin break block by case class concat const copy constructor continue create default delegate desc distinct div do downto dynamic each else empty end ensure enum equals event except exit extension external false final finalize finalizer finally flags for forward from function future global group has if implementation implements implies in index inherited inline interface into invariants is iterator join locked locking loop matching method mod module namespace nested new nil not notify nullable of old on operator or order out override parallel params partial pinned private procedure property protected public queryable raise read readonly record reintroduce remove repeat require result reverse sealed select self sequence set shl shr skip static step soft take then to true try tuple type union unit unsafe until uses using var virtual raises volatile where while with write xor yield await mapped deprecated stdcall cdecl pascal register safecall overload library platform reference packed strict published autoreleasepool selector strong weak unretained"; var a = { cN: "comment", b: "{", e: "}", r: 0 }; var e = { cN: "comment", b: "\\(\\*", e: "\\*\\)", r: 10 }; var c = { cN: "string", b: "'", e: "'", c: [{ b: "''" }] }; var d = { cN: "string", b: "(#\\d+)+" }; var f = { cN: "function", bK: "function constructor destructor procedure method", e: "[:;]", k: "function constructor|10 destructor|10 procedure|10 method|10", c: [b.TM, { cN: "params", b: "\\(", e: "\\)", k: g, c: [c, d] }, a, e] }; return { cI: true, k: g, i: '("|\\$[G-Zg-z]|\\/\\*|</)', c: [a, e, b.CLCM, c, d, b.NM, f, { cN: "class", b: "=\\bclass\\b", e: "end;", k: g, c: [c, d, a, e, b.CLCM, f] }] }; });
hljs.registerLanguage("asciidoc", function (a) { return { c: [{ cN: "comment", b: "^/{4,}\\n", e: "\\n/{4,}$", r: 10 }, { cN: "comment", b: "^//", e: "$", r: 0 }, { cN: "title", b: "^\\.\\w.*$" }, { b: "^[=\\*]{4,}\\n", e: "\\n^[=\\*]{4,}$", r: 10 }, { cN: "header", b: "^(={1,5}) .+?( \\1)?$", r: 10 }, { cN: "header", b: "^[^\\[\\]\\n]+?\\n[=\\-~\\^\\+]{2,}$", r: 10 }, { cN: "attribute", b: "^:.+?:", e: "\\s", eE: true, r: 10 }, { cN: "attribute", b: "^\\[.+?\\]$", r: 0 }, { cN: "blockquote", b: "^_{4,}\\n", e: "\\n_{4,}$", r: 10 }, { cN: "code", b: "^[\\-\\.]{4,}\\n", e: "\\n[\\-\\.]{4,}$", r: 10 }, { b: "^\\+{4,}\\n", e: "\\n\\+{4,}$", c: [{ b: "<", e: ">", sL: "xml", r: 0 }], r: 10 }, { cN: "bullet", b: "^(\\*+|\\-+|\\.+|[^\\n]+?::)\\s+" }, { cN: "label", b: "^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s+", r: 10 }, { cN: "strong", b: "\\B\\*(?![\\*\\s])", e: "(\\n{2}|\\*)", c: [{ b: "\\\\*\\w", r: 0 }] }, { cN: "emphasis", b: "\\B'(?!['\\s])", e: "(\\n{2}|')", c: [{ b: "\\\\'\\w", r: 0 }], r: 0 }, { cN: "emphasis", b: "_(?![_\\s])", e: "(\\n{2}|_)", r: 0 }, { cN: "smartquote", b: "``.+?''", r: 10 }, { cN: "smartquote", b: "`.+?'", r: 10 }, { cN: "code", b: "(`.+?`|\\+.+?\\+)", r: 0 }, { cN: "code", b: "^[ \\t]", e: "$", r: 0 }, { cN: "horizontal_rule", b: "^'{3,}[ \\t]*$", r: 10 }, { b: "(link:)?(http|https|ftp|file|irc|image:?):\\S+\\[.*?\\]", rB: true, c: [{ b: "(link|image:?):", r: 0 }, { cN: "link_url", b: "\\w", e: "[^\\[]+", r: 0 }, { cN: "link_label", b: "\\[", e: "\\]", eB: true, eE: true, r: 0 }], r: 10 }] }; });
hljs.registerLanguage("erlang-repl", function (a) { return { k: { special_functions: "spawn spawn_link self", reserved: "after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if let not of or orelse|10 query receive rem try when xor" }, c: [{ cN: "prompt", b: "^[0-9]+> ", r: 10 }, { cN: "comment", b: "%", e: "$" }, { cN: "number", b: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)", r: 0 }, a.ASM, a.QSM, { cN: "constant", b: "\\?(::)?([A-Z]\\w*(::)?)+" }, { cN: "arrow", b: "->" }, { cN: "ok", b: "ok" }, { cN: "exclamation_mark", b: "!" }, { cN: "function_or_atom", b: "(\\b[a-z'][a-zA-Z0-9_']*:[a-z'][a-zA-Z0-9_']*)|(\\b[a-z'][a-zA-Z0-9_']*)", r: 0 }, { cN: "variable", b: "[A-Z][a-zA-Z0-9_']*", r: 0 }] }; });
hljs.registerLanguage("autohotkey", function (b) { var d = { cN: "escape", b: "`[\\s\\S]" }; var c = { cN: "comment", b: ";", e: "$", r: 0 }; var a = [{ cN: "built_in", b: "A_[a-zA-Z0-9]+" }, { cN: "built_in", bK: "ComSpec Clipboard ClipboardAll ErrorLevel" }]; return { cI: true, k: { keyword: "Break Continue Else Gosub If Loop Return While", literal: "A true false NOT AND OR" }, c: a.concat([d, b.inherit(b.QSM, { c: [d] }), c, { cN: "number", b: b.NR, r: 0 }, { cN: "var_expand", b: "%", e: "%", i: "\\n", c: [d] }, { cN: "label", c: [d], v: [{ b: '^[^\\n";]+::(?!=)' }, { b: '^[^\\n";]+:(?!=)', r: 0 }] }, { b: ",\\s*,", r: 10 }]) }; });
hljs.registerLanguage("scilab", function (a) { var b = [a.CNM, { cN: "string", b: "'|\"", e: "'|\"", c: [a.BE, { b: "''" }] }]; return { k: { keyword: "abort break case clear catch continue do elseif else endfunction end for functionglobal if pause return resume select try then while%f %F %t %T %pi %eps %inf %nan %e %i %z %s", built_in: "abs and acos asin atan ceil cd chdir clearglobal cosh cos cumprod deff disp errorexec execstr exists exp eye gettext floor fprintf fread fsolve imag isdef isemptyisinfisnan isvector lasterror length load linspace list listfiles log10 log2 logmax min msprintf mclose mopen ones or pathconvert poly printf prod pwd rand realround sinh sin size gsort sprintf sqrt strcat strcmps tring sum system tanh tantype typename warning zeros matrix" }, i: '("|#|/\\*|\\s+/\\w+)', c: [{ cN: "function", bK: "function endfunction", e: "$", k: "function endfunction|10", c: [a.UTM, { cN: "params", b: "\\(", e: "\\)" },], }, { cN: "transposed_variable", b: "[a-zA-Z_][a-zA-Z_0-9]*('+[\\.']*|[\\.']+)", e: "", r: 0 }, { cN: "matrix", b: "\\[", e: "\\]'*[\\.']*", r: 0, c: b }, { cN: "comment", b: "//", e: "$" }].concat(b) }; });
(function (undefined) {
    var moment, VERSION = '2.9.0', globalScope = (typeof global !== 'undefined' && (typeof window === 'undefined' || window === global.window)) ? global : this, oldGlobalMoment, round = Math.round, hasOwnProperty = Object.prototype.hasOwnProperty, i, YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, locales = {}, momentProperties = [], hasModule = (typeof module !== 'undefined' && module && module.exports), aspNetJsonRegex = /^\/?Date\((\-?\d+)/i, aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, parseTokenOneOrTwoDigits = /\d\d?/, parseTokenOneToThreeDigits = /\d{1,3}/, parseTokenOneToFourDigits = /\d{1,4}/, parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, parseTokenDigits = /\d+/, parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, parseTokenT = /T/i, parseTokenOffsetMs = /[\+\-]?\d+/, parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, parseTokenOneDigit = /\d/, parseTokenTwoDigits = /\d\d/, parseTokenThreeDigits = /\d{3}/, parseTokenFourDigits = /\d{4}/, parseTokenSixDigits = /[+-]?\d{6}/, parseTokenSignedNumber = /[+-]?\d+/, isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, isoFormat = 'YYYY-MM-DDTHH:mm:ssZ', isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
        ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
        ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d{2}/],
        ['YYYY-DDD', /\d{4}-\d{3}/]
    ], isoTimes = [
        ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
        ['HH:mm', /(T| )\d\d:\d\d/],
        ['HH', /(T| )\d\d/]
    ], parseTimezoneChunker = /([\+\-]|\d\d)/gi, proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'), unitMillisecondFactors = {
        'Milliseconds': 1,
        'Seconds': 1e3,
        'Minutes': 6e4,
        'Hours': 36e5,
        'Days': 864e5,
        'Months': 2592e6,
        'Years': 31536e6
    }, unitAliases = {
        ms: 'millisecond',
        s: 'second',
        m: 'minute',
        h: 'hour',
        d: 'day',
        D: 'date',
        w: 'week',
        W: 'isoWeek',
        M: 'month',
        Q: 'quarter',
        y: 'year',
        DDD: 'dayOfYear',
        e: 'weekday',
        E: 'isoWeekday',
        gg: 'weekYear',
        GG: 'isoWeekYear'
    }, camelFunctions = {
        dayofyear: 'dayOfYear',
        isoweekday: 'isoWeekday',
        isoweek: 'isoWeek',
        weekyear: 'weekYear',
        isoweekyear: 'isoWeekYear'
    }, formatFunctions = {}, relativeTimeThresholds = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }, ordinalizeTokens = 'DDD w W M D d'.split(' '), paddedTokens = 'M D H h m s w W'.split(' '), formatTokenFunctions = {
        M: function () {
            return this.month() + 1;
        },
        MMM: function (format) {
            return this.localeData().monthsShort(this, format);
        },
        MMMM: function (format) {
            return this.localeData().months(this, format);
        },
        D: function () {
            return this.date();
        },
        DDD: function () {
            return this.dayOfYear();
        },
        d: function () {
            return this.day();
        },
        dd: function (format) {
            return this.localeData().weekdaysMin(this, format);
        },
        ddd: function (format) {
            return this.localeData().weekdaysShort(this, format);
        },
        dddd: function (format) {
            return this.localeData().weekdays(this, format);
        },
        w: function () {
            return this.week();
        },
        W: function () {
            return this.isoWeek();
        },
        YY: function () {
            return leftZeroFill(this.year() % 100, 2);
        },
        YYYY: function () {
            return leftZeroFill(this.year(), 4);
        },
        YYYYY: function () {
            return leftZeroFill(this.year(), 5);
        },
        YYYYYY: function () {
            var y = this.year(), sign = y >= 0 ? '+' : '-';
            return sign + leftZeroFill(Math.abs(y), 6);
        },
        gg: function () {
            return leftZeroFill(this.weekYear() % 100, 2);
        },
        gggg: function () {
            return leftZeroFill(this.weekYear(), 4);
        },
        ggggg: function () {
            return leftZeroFill(this.weekYear(), 5);
        },
        GG: function () {
            return leftZeroFill(this.isoWeekYear() % 100, 2);
        },
        GGGG: function () {
            return leftZeroFill(this.isoWeekYear(), 4);
        },
        GGGGG: function () {
            return leftZeroFill(this.isoWeekYear(), 5);
        },
        e: function () {
            return this.weekday();
        },
        E: function () {
            return this.isoWeekday();
        },
        a: function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), true);
        },
        A: function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), false);
        },
        H: function () {
            return this.hours();
        },
        h: function () {
            return this.hours() % 12 || 12;
        },
        m: function () {
            return this.minutes();
        },
        s: function () {
            return this.seconds();
        },
        S: function () {
            return toInt(this.milliseconds() / 100);
        },
        SS: function () {
            return leftZeroFill(toInt(this.milliseconds() / 10), 2);
        },
        SSS: function () {
            return leftZeroFill(this.milliseconds(), 3);
        },
        SSSS: function () {
            return leftZeroFill(this.milliseconds(), 3);
        },
        Z: function () {
            var a = this.utcOffset(), b = '+';
            if (a < 0) {
                a = -a;
                b = '-';
            }
            return b + leftZeroFill(toInt(a / 60), 2) + ':' + leftZeroFill(toInt(a) % 60, 2);
        },
        ZZ: function () {
            var a = this.utcOffset(), b = '+';
            if (a < 0) {
                a = -a;
                b = '-';
            }
            return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
        },
        z: function () {
            return this.zoneAbbr();
        },
        zz: function () {
            return this.zoneName();
        },
        x: function () {
            return this.valueOf();
        },
        X: function () {
            return this.unix();
        },
        Q: function () {
            return this.quarter();
        }
    }, deprecations = {}, lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'], updateInProgress = false;
    function dfl(a, b, c) {
        switch (arguments.length) {
            case 2: return a != null ? a : b;
            case 3: return a != null ? a : b != null ? b : c;
            default: throw new Error('Implement me');
        }
    }
    function hasOwnProp(a, b) {
        return hasOwnProperty.call(a, b);
    }
    function defaultParsingFlags() {
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false
        };
    }
    function printMsg(msg) {
        if (moment.suppressDeprecationWarnings === false &&
            typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }
    function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function () {
            if (firstTime) {
                printMsg(msg);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }
    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            printMsg(msg);
            deprecations[name] = true;
        }
    }
    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.localeData().ordinal(func.call(this, a), period);
        };
    }
    function monthDiff(a, b) {
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, 'months'), anchor2, adjust;
        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            adjust = (b - anchor) / (anchor - anchor2);
        }
        else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            adjust = (b - anchor) / (anchor2 - anchor);
        }
        return -(wholeMonthDiff + adjust);
    }
    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);
    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;
        if (meridiem == null) {
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        }
        else if (locale.isPM != null) {
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        }
        else {
            return hour;
        }
    }
    function Locale() {
    }
    function Moment(config, skipOverflow) {
        if (skipOverflow !== false) {
            checkOverflow(config);
        }
        copyConfig(this, config);
        this._d = new Date(+config._d);
        if (updateInProgress === false) {
            updateInProgress = true;
            moment.updateOffset(this);
            updateInProgress = false;
        }
    }
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration), years = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months = normalizedInput.month || 0, weeks = normalizedInput.week || 0, days = normalizedInput.day || 0, hours = normalizedInput.hour || 0, minutes = normalizedInput.minute || 0, seconds = normalizedInput.second || 0, milliseconds = normalizedInput.millisecond || 0;
        this._milliseconds = +milliseconds +
            seconds * 1e3 +
            minutes * 6e4 +
            hours * 36e5;
        this._days = +days +
            weeks * 7;
        this._months = +months +
            quarters * 3 +
            years * 12;
        this._data = {};
        this._locale = moment.localeData();
        this._bubble();
    }
    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }
        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }
        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }
        return a;
    }
    function copyConfig(to, from) {
        var i, prop, val;
        if (typeof from._isAMomentObject !== 'undefined') {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (typeof from._i !== 'undefined') {
            to._i = from._i;
        }
        if (typeof from._f !== 'undefined') {
            to._f = from._f;
        }
        if (typeof from._l !== 'undefined') {
            to._l = from._l;
        }
        if (typeof from._strict !== 'undefined') {
            to._strict = from._strict;
        }
        if (typeof from._tzm !== 'undefined') {
            to._tzm = from._tzm;
        }
        if (typeof from._isUTC !== 'undefined') {
            to._isUTC = from._isUTC;
        }
        if (typeof from._offset !== 'undefined') {
            to._offset = from._offset;
        }
        if (typeof from._pf !== 'undefined') {
            to._pf = from._pf;
        }
        if (typeof from._locale !== 'undefined') {
            to._locale = from._locale;
        }
        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== 'undefined') {
                    to[prop] = val;
                }
            }
        }
        return to;
    }
    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        }
        else {
            return Math.floor(number);
        }
    }
    function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number), sign = number >= 0;
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }
    function positiveMomentsDifference(base, other) {
        var res = { milliseconds: 0, months: 0 };
        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }
        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));
        return res;
    }
    function momentsDifference(base, other) {
        var res;
        other = makeAs(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        }
        else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }
        return res;
    }
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val;
                val = period;
                period = tmp;
            }
            val = typeof val === 'string' ? +val : val;
            dur = moment.duration(val, period);
            addOrSubtractDurationFromMoment(this, dur, direction);
            return this;
        };
    }
    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds, days = duration._days, months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;
        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
        }
        if (months) {
            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            moment.updateOffset(mom, days || months);
        }
    }
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }
    function isDate(input) {
        return Object.prototype.toString.call(input) === '[object Date]' ||
            input instanceof Date;
    }
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }
    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }
    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {}, normalizedProp, prop;
        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }
        return normalizedInput;
    }
    function makeList(field) {
        var count, setter;
        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }
        moment[field] = function (format, index) {
            var i, getter, method = moment._locale[field], results = [];
            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }
            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment._locale, m, format || '');
            };
            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }
    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion, value = 0;
        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            }
            else {
                value = Math.ceil(coercedNumber);
            }
        }
        return value;
    }
    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }
    function weeksInYear(year, dow, doy) {
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
    }
    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                    m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                        m._a[HOUR] < 0 || m._a[HOUR] > 24 ||
                            (m._a[HOUR] === 24 && (m._a[MINUTE] !== 0 ||
                                m._a[SECOND] !== 0 ||
                                m._a[MILLISECOND] !== 0)) ? HOUR :
                            m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                                    m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                                        -1;
            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            m._pf.overflow = overflow;
        }
    }
    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;
            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0 &&
                    m._pf.bigHour === undefined;
            }
        }
        return m._isValid;
    }
    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;
        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }
    function loadLocale(name) {
        var oldLocale = null;
        if (!locales[name] && hasModule) {
            try {
                oldLocale = moment.locale();
                require('./locale/' + name);
                moment.locale(oldLocale);
            }
            catch (e) { }
        }
        return locales[name];
    }
    function makeAs(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (moment.isMoment(input) || isDate(input) ?
                +input : +moment(input)) - (+res);
            res._d.setTime(+res._d + diff);
            moment.updateOffset(res, false);
            return res;
        }
        else {
            return moment(input).local();
        }
    }
    extend(Locale.prototype, {
        set: function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                }
                else {
                    this['_' + i] = prop;
                }
            }
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + /\d{1,2}/.source);
        },
        _months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        months: function (m) {
            return this._months[m.month()];
        },
        _monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        monthsShort: function (m) {
            return this._monthsShort[m.month()];
        },
        monthsParse: function (monthName, format, strict) {
            var i, mom, regex;
            if (!this._monthsParse) {
                this._monthsParse = [];
                this._longMonthsParse = [];
                this._shortMonthsParse = [];
            }
            for (i = 0; i < 12; i++) {
                mom = moment.utc([2000, i]);
                if (strict && !this._longMonthsParse[i]) {
                    this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                    this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
                }
                if (!strict && !this._monthsParse[i]) {
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                    return i;
                }
                else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                    return i;
                }
                else if (!strict && this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },
        _weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdays: function (m) {
            return this._weekdays[m.day()];
        },
        _weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysShort: function (m) {
            return this._weekdaysShort[m.day()];
        },
        _weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        weekdaysMin: function (m) {
            return this._weekdaysMin[m.day()];
        },
        weekdaysParse: function (weekdayName) {
            var i, mom, regex;
            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }
            for (i = 0; i < 7; i++) {
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },
        _longDateFormat: {
            LTS: 'h:mm:ss A',
            LT: 'h:mm A',
            L: 'MM/DD/YYYY',
            LL: 'MMMM D, YYYY',
            LLL: 'MMMM D, YYYY LT',
            LLLL: 'dddd, MMMM D, YYYY LT'
        },
        longDateFormat: function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },
        isPM: function (input) {
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },
        _meridiemParse: /[ap]\.?m?\.?/i,
        meridiem: function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            }
            else {
                return isLower ? 'am' : 'AM';
            }
        },
        _calendar: {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'L'
        },
        calendar: function (key, mom, now) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom, [now]) : output;
        },
        _relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years'
        },
        relativeTime: function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },
        pastFuture: function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },
        ordinal: function (number) {
            return this._ordinal.replace('%d', number);
        },
        _ordinal: '%d',
        _ordinalParse: /\d{1,2}/,
        preparse: function (string) {
            return string;
        },
        postformat: function (string) {
            return string;
        },
        week: function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },
        _week: {
            dow: 0,
            doy: 6
        },
        firstDayOfWeek: function () {
            return this._week.dow;
        },
        firstDayOfYear: function () {
            return this._week.doy;
        },
        _invalidDate: 'Invalid date',
        invalidDate: function () {
            return this._invalidDate;
        }
    });
    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }
    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;
        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            }
            else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }
        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }
        format = expandFormat(format, m.localeData());
        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }
        return formatFunctions[format](m);
    }
    function expandFormat(format, locale) {
        var i = 5;
        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }
        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }
        return format;
    }
    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
            case 'Q':
                return parseTokenOneDigit;
            case 'DDDD':
                return parseTokenThreeDigits;
            case 'YYYY':
            case 'GGGG':
            case 'gggg':
                return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
            case 'Y':
            case 'G':
            case 'g':
                return parseTokenSignedNumber;
            case 'YYYYYY':
            case 'YYYYY':
            case 'GGGGG':
            case 'ggggg':
                return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
            case 'S':
                if (strict) {
                    return parseTokenOneDigit;
                }
            case 'SS':
                if (strict) {
                    return parseTokenTwoDigits;
                }
            case 'SSS':
                if (strict) {
                    return parseTokenThreeDigits;
                }
            case 'DDD':
                return parseTokenOneToThreeDigits;
            case 'MMM':
            case 'MMMM':
            case 'dd':
            case 'ddd':
            case 'dddd':
                return parseTokenWord;
            case 'a':
            case 'A':
                return config._locale._meridiemParse;
            case 'x':
                return parseTokenOffsetMs;
            case 'X':
                return parseTokenTimestampMs;
            case 'Z':
            case 'ZZ':
                return parseTokenTimezone;
            case 'T':
                return parseTokenT;
            case 'SSSS':
                return parseTokenDigits;
            case 'MM':
            case 'DD':
            case 'YY':
            case 'GG':
            case 'gg':
            case 'HH':
            case 'hh':
            case 'mm':
            case 'ss':
            case 'ww':
            case 'WW':
                return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
            case 'M':
            case 'D':
            case 'd':
            case 'H':
            case 'h':
            case 'm':
            case 's':
            case 'w':
            case 'W':
            case 'e':
            case 'E':
                return parseTokenOneOrTwoDigits;
            case 'Do':
                return strict ? config._locale._ordinalParse : config._locale._ordinalParseLenient;
            default:
                a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), 'i'));
                return a;
        }
    }
    function utcOffsetFromString(string) {
        string = string || '';
        var possibleTzMatches = (string.match(parseTokenTimezone) || []), tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [], parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0], minutes = +(parts[1] * 60) + toInt(parts[2]);
        return parts[0] === '+' ? minutes : -minutes;
    }
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;
        switch (token) {
            case 'Q':
                if (input != null) {
                    datePartArray[MONTH] = (toInt(input) - 1) * 3;
                }
                break;
            case 'M':
            case 'MM':
                if (input != null) {
                    datePartArray[MONTH] = toInt(input) - 1;
                }
                break;
            case 'MMM':
            case 'MMMM':
                a = config._locale.monthsParse(input, token, config._strict);
                if (a != null) {
                    datePartArray[MONTH] = a;
                }
                else {
                    config._pf.invalidMonth = input;
                }
                break;
            case 'D':
            case 'DD':
                if (input != null) {
                    datePartArray[DATE] = toInt(input);
                }
                break;
            case 'Do':
                if (input != null) {
                    datePartArray[DATE] = toInt(parseInt(input.match(/\d{1,2}/)[0], 10));
                }
                break;
            case 'DDD':
            case 'DDDD':
                if (input != null) {
                    config._dayOfYear = toInt(input);
                }
                break;
            case 'YY':
                datePartArray[YEAR] = moment.parseTwoDigitYear(input);
                break;
            case 'YYYY':
            case 'YYYYY':
            case 'YYYYYY':
                datePartArray[YEAR] = toInt(input);
                break;
            case 'a':
            case 'A':
                config._meridiem = input;
                break;
            case 'h':
            case 'hh':
                config._pf.bigHour = true;
            case 'H':
            case 'HH':
                datePartArray[HOUR] = toInt(input);
                break;
            case 'm':
            case 'mm':
                datePartArray[MINUTE] = toInt(input);
                break;
            case 's':
            case 'ss':
                datePartArray[SECOND] = toInt(input);
                break;
            case 'S':
            case 'SS':
            case 'SSS':
            case 'SSSS':
                datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
                break;
            case 'x':
                config._d = new Date(toInt(input));
                break;
            case 'X':
                config._d = new Date(parseFloat(input) * 1000);
                break;
            case 'Z':
            case 'ZZ':
                config._useUTC = true;
                config._tzm = utcOffsetFromString(input);
                break;
            case 'dd':
            case 'ddd':
            case 'dddd':
                a = config._locale.weekdaysParse(input);
                if (a != null) {
                    config._w = config._w || {};
                    config._w['d'] = a;
                }
                else {
                    config._pf.invalidWeekday = input;
                }
                break;
            case 'w':
            case 'ww':
            case 'W':
            case 'WW':
            case 'd':
            case 'e':
            case 'E':
                token = token.substr(0, 1);
            case 'gggg':
            case 'GGGG':
            case 'GGGGG':
                token = token.substr(0, 2);
                if (input) {
                    config._w = config._w || {};
                    config._w[token] = toInt(input);
                }
                break;
            case 'gg':
            case 'GG':
                config._w = config._w || {};
                config._w[token] = moment.parseTwoDigitYear(input);
        }
    }
    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;
        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
            week = dfl(w.W, 1);
            weekday = dfl(w.E, 1);
        }
        else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;
            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
            week = dfl(w.w, 1);
            if (w.d != null) {
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            }
            else if (w.e != null) {
                weekday = w.e + dow;
            }
            else {
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
    function dateFromConfig(config) {
        var i, date, input = [], currentDate, yearToUse;
        if (config._d) {
            return;
        }
        currentDate = currentDateArray(config);
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }
        if (config._dayOfYear) {
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);
            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }
            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }
        if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }
        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }
        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }
    function dateFromObject(config) {
        var normalizedInput;
        if (config._d) {
            return;
        }
        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day || normalizedInput.date,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];
        dateFromConfig(config);
    }
    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        }
        else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }
    function makeDateFromStringAndFormat(config) {
        if (config._f === moment.ISO_8601) {
            parseISO(config);
            return;
        }
        config._a = [];
        config._pf.empty = true;
        var string = '' + config._i, i, parsedInput, tokens, token, skipped, stringLength = string.length, totalParsedInputLength = 0;
        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }
        if (config._pf.bigHour === true && config._a[HOUR] <= 12) {
            config._pf.bigHour = undefined;
        }
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
        dateFromConfig(config);
        checkOverflow(config);
    }
    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
    function makeDateFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore;
        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }
        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);
            if (!isValid(tempConfig)) {
                continue;
            }
            currentScore += tempConfig._pf.charsLeftOver;
            currentScore += tempConfig._pf.unusedTokens.length * 10;
            tempConfig._pf.score = currentScore;
            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }
        extend(config, bestMoment || tempConfig);
    }
    function parseISO(config) {
        var i, l, string = config._i, match = isoRegex.exec(string);
        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    config._f = isoDates[i][0] + (match[6] || ' ');
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += 'Z';
            }
            makeDateFromStringAndFormat(config);
        }
        else {
            config._isValid = false;
        }
    }
    function makeDateFromString(config) {
        parseISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            moment.createFromInputFallback(config);
        }
    }
    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }
    function makeDateFromInput(config) {
        var input = config._i, matched;
        if (input === undefined) {
            config._d = new Date();
        }
        else if (isDate(input)) {
            config._d = new Date(+input);
        }
        else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
            config._d = new Date(+matched[1]);
        }
        else if (typeof input === 'string') {
            makeDateFromString(config);
        }
        else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            dateFromConfig(config);
        }
        else if (typeof (input) === 'object') {
            dateFromObject(config);
        }
        else if (typeof (input) === 'number') {
            config._d = new Date(input);
        }
        else {
            moment.createFromInputFallback(config);
        }
    }
    function makeDate(y, m, d, h, M, s, ms) {
        var date = new Date(y, m, d, h, M, s, ms);
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }
    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }
    function parseWeekday(input, locale) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = locale.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }
    function relativeTime(posNegDuration, withoutSuffix, locale) {
        var duration = moment.duration(posNegDuration).abs(), seconds = round(duration.as('s')), minutes = round(duration.as('m')), hours = round(duration.as('h')), days = round(duration.as('d')), months = round(duration.as('M')), years = round(duration.as('y')), args = seconds < relativeTimeThresholds.s && ['s', seconds] ||
            minutes === 1 && ['m'] ||
            minutes < relativeTimeThresholds.m && ['mm', minutes] ||
            hours === 1 && ['h'] ||
            hours < relativeTimeThresholds.h && ['hh', hours] ||
            days === 1 && ['d'] ||
            days < relativeTimeThresholds.d && ['dd', days] ||
            months === 1 && ['M'] ||
            months < relativeTimeThresholds.M && ['MM', months] ||
            years === 1 && ['y'] || ['yy', years];
        args[2] = withoutSuffix;
        args[3] = +posNegDuration > 0;
        args[4] = locale;
        return substituteTimeAgo.apply({}, args);
    }
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek, daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(), adjustedMoment;
        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }
        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }
        adjustedMoment = moment(mom).add(daysToDayOfWeek, 'd');
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;
        d = d === 0 ? 7 : d;
        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;
        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ? dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }
    function makeMoment(config) {
        var input = config._i, format = config._f, res;
        config._locale = config._locale || moment.localeData(config._l);
        if (input === null || (format === undefined && input === '')) {
            return moment.invalid({ nullInput: true });
        }
        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }
        if (moment.isMoment(input)) {
            return new Moment(input, true);
        }
        else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            }
            else {
                makeDateFromStringAndFormat(config);
            }
        }
        else {
            makeDateFromInput(config);
        }
        res = new Moment(config);
        if (res._nextDay) {
            res.add(1, 'd');
            res._nextDay = undefined;
        }
        return res;
    }
    moment = function (input, format, locale, strict) {
        var c;
        if (typeof (locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = locale;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();
        return makeMoment(c);
    };
    moment.suppressDeprecationWarnings = false;
    moment.createFromInputFallback = deprecate('moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.', function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    });
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return moment();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }
    moment.min = function () {
        var args = [].slice.call(arguments, 0);
        return pickBy('isBefore', args);
    };
    moment.max = function () {
        var args = [].slice.call(arguments, 0);
        return pickBy('isAfter', args);
    };
    moment.utc = function (input, format, locale, strict) {
        var c;
        if (typeof (locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();
        return makeMoment(c).utc();
    };
    moment.unix = function (input) {
        return moment(input * 1000);
    };
    moment.duration = function (input, key) {
        var duration = input, match = null, sign, ret, parseIso, diffRes;
        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        }
        else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            }
            else {
                duration.milliseconds = input;
            }
        }
        else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        }
        else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            parseIso = function (inp) {
                var res = inp && parseFloat(inp.replace(',', '.'));
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        }
        else if (duration == null) {
            duration = {};
        }
        else if (typeof duration === 'object' &&
            ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(moment(duration.from), moment(duration.to));
            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }
        ret = new Duration(duration);
        if (moment.isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }
        return ret;
    };
    moment.version = VERSION;
    moment.defaultFormat = isoFormat;
    moment.ISO_8601 = function () { };
    moment.momentProperties = momentProperties;
    moment.updateOffset = function () { };
    moment.relativeTimeThreshold = function (threshold, limit) {
        if (relativeTimeThresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return relativeTimeThresholds[threshold];
        }
        relativeTimeThresholds[threshold] = limit;
        return true;
    };
    moment.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', function (key, value) {
        return moment.locale(key, value);
    });
    moment.locale = function (key, values) {
        var data;
        if (key) {
            if (typeof (values) !== 'undefined') {
                data = moment.defineLocale(key, values);
            }
            else {
                data = moment.localeData(key);
            }
            if (data) {
                moment.duration._locale = moment._locale = data;
            }
        }
        return moment._locale._abbr;
    };
    moment.defineLocale = function (name, values) {
        if (values !== null) {
            values.abbr = name;
            if (!locales[name]) {
                locales[name] = new Locale();
            }
            locales[name].set(values);
            moment.locale(name);
            return locales[name];
        }
        else {
            delete locales[name];
            return null;
        }
    };
    moment.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', function (key) {
        return moment.localeData(key);
    });
    moment.localeData = function (key) {
        var locale;
        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }
        if (!key) {
            return moment._locale;
        }
        if (!isArray(key)) {
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }
        return chooseLocale(key);
    };
    moment.isMoment = function (obj) {
        return obj instanceof Moment ||
            (obj != null && hasOwnProp(obj, '_isAMomentObject'));
    };
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };
    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }
    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };
    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }
        return m;
    };
    moment.parseZone = function () {
        return moment.apply(null, arguments).parseZone();
    };
    moment.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };
    moment.isDate = isDate;
    extend(moment.fn = Moment.prototype, {
        clone: function () {
            return moment(this);
        },
        valueOf: function () {
            return +this._d - ((this._offset || 0) * 60000);
        },
        unix: function () {
            return Math.floor(+this / 1000);
        },
        toString: function () {
            return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        },
        toDate: function () {
            return this._offset ? new Date(+this) : this._d;
        },
        toISOString: function () {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                if ('function' === typeof Date.prototype.toISOString) {
                    return this.toDate().toISOString();
                }
                else {
                    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
                }
            }
            else {
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        },
        toArray: function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },
        isValid: function () {
            return isValid(this);
        },
        isDSTShifted: function () {
            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }
            return false;
        },
        parsingFlags: function () {
            return extend({}, this._pf);
        },
        invalidAt: function () {
            return this._pf.overflow;
        },
        utc: function (keepLocalTime) {
            return this.utcOffset(0, keepLocalTime);
        },
        local: function (keepLocalTime) {
            if (this._isUTC) {
                this.utcOffset(0, keepLocalTime);
                this._isUTC = false;
                if (keepLocalTime) {
                    this.subtract(this._dateUtcOffset(), 'm');
                }
            }
            return this;
        },
        format: function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.localeData().postformat(output);
        },
        add: createAdder(1, 'add'),
        subtract: createAdder(-1, 'subtract'),
        diff: function (input, units, asFloat) {
            var that = makeAs(input, this), zoneDiff = (that.utcOffset() - this.utcOffset()) * 6e4, anchor, diff, output, daysAdjust;
            units = normalizeUnits(units);
            if (units === 'year' || units === 'month' || units === 'quarter') {
                output = monthDiff(this, that);
                if (units === 'quarter') {
                    output = output / 3;
                }
                else if (units === 'year') {
                    output = output / 12;
                }
            }
            else {
                diff = this - that;
                output = units === 'second' ? diff / 1e3 :
                    units === 'minute' ? diff / 6e4 :
                        units === 'hour' ? diff / 36e5 :
                            units === 'day' ? (diff - zoneDiff) / 864e5 :
                                units === 'week' ? (diff - zoneDiff) / 6048e5 :
                                    diff;
            }
            return asFloat ? output : absRound(output);
        },
        from: function (time, withoutSuffix) {
            return moment.duration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
        },
        fromNow: function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },
        calendar: function (time) {
            var now = time || moment(), sod = makeAs(now, this).startOf('day'), diff = this.diff(sod, 'days', true), format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                    diff < 0 ? 'lastDay' :
                        diff < 1 ? 'sameDay' :
                            diff < 2 ? 'nextDay' :
                                diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.localeData().calendar(format, this, moment(now)));
        },
        isLeapYear: function () {
            return isLeapYear(this.year());
        },
        isDST: function () {
            return (this.utcOffset() > this.clone().month(0).utcOffset() ||
                this.utcOffset() > this.clone().month(5).utcOffset());
        },
        day: function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.localeData());
                return this.add(input - day, 'd');
            }
            else {
                return day;
            }
        },
        month: makeAccessor('Month', true),
        startOf: function (units) {
            units = normalizeUnits(units);
            switch (units) {
                case 'year':
                    this.month(0);
                case 'quarter':
                case 'month':
                    this.date(1);
                case 'week':
                case 'isoWeek':
                case 'day':
                    this.hours(0);
                case 'hour':
                    this.minutes(0);
                case 'minute':
                    this.seconds(0);
                case 'second':
                    this.milliseconds(0);
            }
            if (units === 'week') {
                this.weekday(0);
            }
            else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }
            if (units === 'quarter') {
                this.month(Math.floor(this.month() / 3) * 3);
            }
            return this;
        },
        endOf: function (units) {
            units = normalizeUnits(units);
            if (units === undefined || units === 'millisecond') {
                return this;
            }
            return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
        },
        isAfter: function (input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this > +input;
            }
            else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return inputMs < +this.clone().startOf(units);
            }
        },
        isBefore: function (input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this < +input;
            }
            else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return +this.clone().endOf(units) < inputMs;
            }
        },
        isBetween: function (from, to, units) {
            return this.isAfter(from, units) && this.isBefore(to, units);
        },
        isSame: function (input, units) {
            var inputMs;
            units = normalizeUnits(units || 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this === +input;
            }
            else {
                inputMs = +moment(input);
                return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
            }
        },
        min: deprecate('moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548', function (other) {
            other = moment.apply(null, arguments);
            return other < this ? this : other;
        }),
        max: deprecate('moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548', function (other) {
            other = moment.apply(null, arguments);
            return other > this ? this : other;
        }),
        zone: deprecate('moment().zone is deprecated, use moment().utcOffset instead. ' +
            'https://github.com/moment/moment/issues/1779', function (input, keepLocalTime) {
            if (input != null) {
                if (typeof input !== 'string') {
                    input = -input;
                }
                this.utcOffset(input, keepLocalTime);
                return this;
            }
            else {
                return -this.utcOffset();
            }
        }),
        utcOffset: function (input, keepLocalTime) {
            var offset = this._offset || 0, localAdjust;
            if (input != null) {
                if (typeof input === 'string') {
                    input = utcOffsetFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                if (!this._isUTC && keepLocalTime) {
                    localAdjust = this._dateUtcOffset();
                }
                this._offset = input;
                this._isUTC = true;
                if (localAdjust != null) {
                    this.add(localAdjust, 'm');
                }
                if (offset !== input) {
                    if (!keepLocalTime || this._changeInProgress) {
                        addOrSubtractDurationFromMoment(this, moment.duration(input - offset, 'm'), 1, false);
                    }
                    else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        moment.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }
                return this;
            }
            else {
                return this._isUTC ? offset : this._dateUtcOffset();
            }
        },
        isLocal: function () {
            return !this._isUTC;
        },
        isUtcOffset: function () {
            return this._isUTC;
        },
        isUtc: function () {
            return this._isUTC && this._offset === 0;
        },
        zoneAbbr: function () {
            return this._isUTC ? 'UTC' : '';
        },
        zoneName: function () {
            return this._isUTC ? 'Coordinated Universal Time' : '';
        },
        parseZone: function () {
            if (this._tzm) {
                this.utcOffset(this._tzm);
            }
            else if (typeof this._i === 'string') {
                this.utcOffset(utcOffsetFromString(this._i));
            }
            return this;
        },
        hasAlignedHourOffset: function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).utcOffset();
            }
            return (this.utcOffset() - input) % 60 === 0;
        },
        daysInMonth: function () {
            return daysInMonth(this.year(), this.month());
        },
        dayOfYear: function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
        },
        quarter: function (input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        },
        weekYear: function (input) {
            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return input == null ? year : this.add((input - year), 'y');
        },
        isoWeekYear: function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add((input - year), 'y');
        },
        week: function (input) {
            var week = this.localeData().week(this);
            return input == null ? week : this.add((input - week) * 7, 'd');
        },
        isoWeek: function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add((input - week) * 7, 'd');
        },
        weekday: function (input) {
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return input == null ? weekday : this.add(input - weekday, 'd');
        },
        isoWeekday: function (input) {
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },
        isoWeeksInYear: function () {
            return weeksInYear(this.year(), 1, 4);
        },
        weeksInYear: function () {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        },
        get: function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },
        set: function (units, value) {
            var unit;
            if (typeof units === 'object') {
                for (unit in units) {
                    this.set(unit, units[unit]);
                }
            }
            else {
                units = normalizeUnits(units);
                if (typeof this[units] === 'function') {
                    this[units](value);
                }
            }
            return this;
        },
        locale: function (key) {
            var newLocaleData;
            if (key === undefined) {
                return this._locale._abbr;
            }
            else {
                newLocaleData = moment.localeData(key);
                if (newLocaleData != null) {
                    this._locale = newLocaleData;
                }
                return this;
            }
        },
        lang: deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (key) {
            if (key === undefined) {
                return this.localeData();
            }
            else {
                return this.locale(key);
            }
        }),
        localeData: function () {
            return this._locale;
        },
        _dateUtcOffset: function () {
            return -Math.round(this._d.getTimezoneOffset() / 15) * 15;
        }
    });
    function rawMonthSetter(mom, value) {
        var dayOfMonth;
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            if (typeof value !== 'number') {
                return mom;
            }
        }
        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }
    function rawGetter(mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }
    function rawSetter(mom, unit, value) {
        if (unit === 'Month') {
            return rawMonthSetter(mom, value);
        }
        else {
            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }
    function makeAccessor(unit, keepTime) {
        return function (value) {
            if (value != null) {
                rawSetter(this, unit, value);
                moment.updateOffset(this, keepTime);
                return this;
            }
            else {
                return rawGetter(this, unit);
            }
        };
    }
    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
    moment.fn.date = makeAccessor('Date', true);
    moment.fn.dates = deprecate('dates accessor is deprecated. Use date instead.', makeAccessor('Date', true));
    moment.fn.year = makeAccessor('FullYear', true);
    moment.fn.years = deprecate('years accessor is deprecated. Use year instead.', makeAccessor('FullYear', true));
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;
    moment.fn.quarters = moment.fn.quarter;
    moment.fn.toJSON = moment.fn.toISOString;
    moment.fn.isUTC = moment.fn.isUtc;
    function daysToYears(days) {
        return days * 400 / 146097;
    }
    function yearsToDays(years) {
        return years * 146097 / 400;
    }
    extend(moment.duration.fn = Duration.prototype, {
        _bubble: function () {
            var milliseconds = this._milliseconds, days = this._days, months = this._months, data = this._data, seconds, minutes, hours, years = 0;
            data.milliseconds = milliseconds % 1000;
            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;
            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;
            hours = absRound(minutes / 60);
            data.hours = hours % 24;
            days += absRound(hours / 24);
            years = absRound(daysToYears(days));
            days -= absRound(yearsToDays(years));
            months += absRound(days / 30);
            days %= 30;
            years += absRound(months / 12);
            months %= 12;
            data.days = days;
            data.months = months;
            data.years = years;
        },
        abs: function () {
            this._milliseconds = Math.abs(this._milliseconds);
            this._days = Math.abs(this._days);
            this._months = Math.abs(this._months);
            this._data.milliseconds = Math.abs(this._data.milliseconds);
            this._data.seconds = Math.abs(this._data.seconds);
            this._data.minutes = Math.abs(this._data.minutes);
            this._data.hours = Math.abs(this._data.hours);
            this._data.months = Math.abs(this._data.months);
            this._data.years = Math.abs(this._data.years);
            return this;
        },
        weeks: function () {
            return absRound(this.days() / 7);
        },
        valueOf: function () {
            return this._milliseconds +
                this._days * 864e5 +
                (this._months % 12) * 2592e6 +
                toInt(this._months / 12) * 31536e6;
        },
        humanize: function (withSuffix) {
            var output = relativeTime(this, !withSuffix, this.localeData());
            if (withSuffix) {
                output = this.localeData().pastFuture(+this, output);
            }
            return this.localeData().postformat(output);
        },
        add: function (input, val) {
            var dur = moment.duration(input, val);
            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;
            this._bubble();
            return this;
        },
        subtract: function (input, val) {
            var dur = moment.duration(input, val);
            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;
            this._bubble();
            return this;
        },
        get: function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },
        as: function (units) {
            var days, months;
            units = normalizeUnits(units);
            if (units === 'month' || units === 'year') {
                days = this._days + this._milliseconds / 864e5;
                months = this._months + daysToYears(days) * 12;
                return units === 'month' ? months : months / 12;
            }
            else {
                days = this._days + Math.round(yearsToDays(this._months / 12));
                switch (units) {
                    case 'week': return days / 7 + this._milliseconds / 6048e5;
                    case 'day': return days + this._milliseconds / 864e5;
                    case 'hour': return days * 24 + this._milliseconds / 36e5;
                    case 'minute': return days * 24 * 60 + this._milliseconds / 6e4;
                    case 'second': return days * 24 * 60 * 60 + this._milliseconds / 1000;
                    case 'millisecond': return Math.floor(days * 24 * 60 * 60 * 1000) + this._milliseconds;
                    default: throw new Error('Unknown unit ' + units);
                }
            }
        },
        lang: moment.fn.lang,
        locale: moment.fn.locale,
        toIsoString: deprecate('toIsoString() is deprecated. Please use toISOString() instead ' +
            '(notice the capitals)', function () {
            return this.toISOString();
        }),
        toISOString: function () {
            var years = Math.abs(this.years()), months = Math.abs(this.months()), days = Math.abs(this.days()), hours = Math.abs(this.hours()), minutes = Math.abs(this.minutes()), seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);
            if (!this.asSeconds()) {
                return 'P0D';
            }
            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        },
        localeData: function () {
            return this._locale;
        },
        toJSON: function () {
            return this.toISOString();
        }
    });
    moment.duration.fn.toString = moment.duration.fn.toISOString;
    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }
    for (i in unitMillisecondFactors) {
        if (hasOwnProp(unitMillisecondFactors, i)) {
            makeDurationGetter(i.toLowerCase());
        }
    }
    moment.duration.fn.asMilliseconds = function () {
        return this.as('ms');
    };
    moment.duration.fn.asSeconds = function () {
        return this.as('s');
    };
    moment.duration.fn.asMinutes = function () {
        return this.as('m');
    };
    moment.duration.fn.asHours = function () {
        return this.as('h');
    };
    moment.duration.fn.asDays = function () {
        return this.as('d');
    };
    moment.duration.fn.asWeeks = function () {
        return this.as('weeks');
    };
    moment.duration.fn.asMonths = function () {
        return this.as('M');
    };
    moment.duration.fn.asYears = function () {
        return this.as('y');
    };
    moment.locale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (number) {
            var b = number % 10, output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                    (b === 2) ? 'nd' :
                        (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });
    function makeGlobal(shouldDeprecate) {
        if (typeof ender !== 'undefined') {
            return;
        }
        oldGlobalMoment = globalScope.moment;
        if (shouldDeprecate) {
            globalScope.moment = deprecate('Accessing Moment through the global scope is ' +
                'deprecated, and will be removed in an upcoming ' +
                'release.', moment);
        }
        else {
            globalScope.moment = moment;
        }
    }
    if (hasModule) {
        module.exports = moment;
    }
    else if (typeof define === 'function' && define.amd) {
        define(function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                globalScope.moment = oldGlobalMoment;
            }
            return moment;
        });
        makeGlobal(true);
    }
    else {
        makeGlobal();
    }
}).call(this);
/*!
 * pickadate.js v3.4.0, 2014/02/15
 * By Amsul, http://amsul.ca
 * Hosted on http://amsul.github.io/pickadate.js
 * Licensed under MIT
 */
var Picker = (function ($) {
    var $document = $(document);
    function PickerConstructor(ELEMENT, NAME, COMPONENT, OPTIONS) {
        if (!ELEMENT)
            return PickerConstructor;
        var STATE = {
            id: ELEMENT.id || 'P' + Math.abs(~~(Math.random() * new Date()))
        }, SETTINGS = COMPONENT ? $.extend(true, {}, COMPONENT.defaults, OPTIONS) : OPTIONS || {}, CLASSES = $.extend({}, PickerConstructor.klasses(), SETTINGS.klass), $ELEMENT = $(ELEMENT), PickerInstance = function () {
            return this.start();
        }, P = PickerInstance.prototype = {
            constructor: PickerInstance,
            $node: $ELEMENT,
            start: function () {
                if (STATE && STATE.start)
                    return P;
                STATE.methods = {};
                STATE.start = true;
                STATE.open = false;
                STATE.type = ELEMENT.type;
                ELEMENT.autofocus = ELEMENT == document.activeElement;
                ELEMENT.type = 'text';
                ELEMENT.readOnly = !SETTINGS.editable;
                ELEMENT.id = ELEMENT.id || STATE.id;
                P.component = new COMPONENT(P, SETTINGS);
                P.$root = $(PickerConstructor._.node('div', createWrappedComponent(), CLASSES.picker, 'id="' + ELEMENT.id + '_root"'));
                prepareElementRoot();
                if (SETTINGS.formatSubmit) {
                    prepareElementHidden();
                }
                prepareElement();
                if (SETTINGS.container)
                    $(SETTINGS.container).append(P.$root);
                else
                    $ELEMENT.after(P.$root);
                P.on({
                    start: P.component.onStart,
                    render: P.component.onRender,
                    stop: P.component.onStop,
                    open: P.component.onOpen,
                    close: P.component.onClose,
                    set: P.component.onSet
                }).on({
                    start: SETTINGS.onStart,
                    render: SETTINGS.onRender,
                    stop: SETTINGS.onStop,
                    open: SETTINGS.onOpen,
                    close: SETTINGS.onClose,
                    set: SETTINGS.onSet
                });
                if (ELEMENT.autofocus) {
                    P.open();
                }
                return P.trigger('start').trigger('render');
            },
            render: function (entireComponent) {
                if (entireComponent)
                    P.$root.html(createWrappedComponent());
                else
                    P.$root.find('.' + CLASSES.box).html(P.component.nodes(STATE.open));
                return P.trigger('render');
            },
            stop: function () {
                if (!STATE.start)
                    return P;
                P.close();
                if (P._hidden) {
                    P._hidden.parentNode.removeChild(P._hidden);
                }
                P.$root.remove();
                $ELEMENT.removeClass(CLASSES.input).removeData(NAME);
                setTimeout(function () {
                    $ELEMENT.off('.' + STATE.id);
                }, 0);
                ELEMENT.type = STATE.type;
                ELEMENT.readOnly = false;
                P.trigger('stop');
                STATE.methods = {};
                STATE.start = false;
                return P;
            },
            open: function (dontGiveFocus) {
                if (STATE.open)
                    return P;
                $ELEMENT.addClass(CLASSES.active);
                aria(ELEMENT, 'expanded', true);
                P.$root.addClass(CLASSES.opened);
                aria(P.$root[0], 'hidden', false);
                if (dontGiveFocus !== false) {
                    STATE.open = true;
                    $ELEMENT.trigger('focus');
                    $document.on('click.' + STATE.id + ' focusin.' + STATE.id, function (event) {
                        var target = event.target;
                        if (target != ELEMENT && target != document && event.which != 3) {
                            P.close(target === P.$root.children()[0]);
                        }
                    }).on('keydown.' + STATE.id, function (event) {
                        var keycode = event.keyCode, keycodeToMove = P.component.key[keycode], target = event.target;
                        if (keycode == 27) {
                            P.close(true);
                        }
                        else if (target == ELEMENT && (keycodeToMove || keycode == 13)) {
                            event.preventDefault();
                            if (keycodeToMove) {
                                PickerConstructor._.trigger(P.component.key.go, P, [PickerConstructor._.trigger(keycodeToMove)]);
                            }
                            else if (!P.$root.find('.' + CLASSES.highlighted).hasClass(CLASSES.disabled)) {
                                P.set('select', P.component.item.highlight).close();
                            }
                        }
                        else if ($.contains(P.$root[0], target) && keycode == 13) {
                            event.preventDefault();
                            target.click();
                        }
                    });
                }
                return P.trigger('open');
            },
            close: function (giveFocus) {
                if (giveFocus) {
                    $ELEMENT.off('focus.' + STATE.id).trigger('focus');
                    setTimeout(function () {
                        $ELEMENT.on('focus.' + STATE.id, focusToOpen);
                    }, 0);
                }
                $ELEMENT.removeClass(CLASSES.active);
                aria(ELEMENT, 'expanded', false);
                P.$root.removeClass(CLASSES.opened + ' ' + CLASSES.focused);
                aria(P.$root[0], 'hidden', true);
                aria(P.$root[0], 'selected', false);
                if (!STATE.open)
                    return P;
                STATE.open = false;
                $document.off('.' + STATE.id);
                return P.trigger('close');
            },
            clear: function () {
                return P.set('clear');
            },
            set: function (thing, value, options) {
                var thingItem, thingValue, thingIsObject = $.isPlainObject(thing), thingObject = thingIsObject ? thing : {};
                options = thingIsObject && $.isPlainObject(value) ? value : options || {};
                if (thing) {
                    if (!thingIsObject) {
                        thingObject[thing] = value;
                    }
                    for (thingItem in thingObject) {
                        thingValue = thingObject[thingItem];
                        if (thingItem in P.component.item) {
                            P.component.set(thingItem, thingValue, options);
                        }
                        if (thingItem == 'select' || thingItem == 'clear') {
                            $ELEMENT.val(thingItem == 'clear' ?
                                '' : P.get(thingItem, SETTINGS.format)).trigger('change');
                        }
                    }
                    P.render();
                }
                return options.muted ? P : P.trigger('set', thingObject);
            },
            get: function (thing, format) {
                thing = thing || 'value';
                if (STATE[thing] != null) {
                    return STATE[thing];
                }
                if (thing == 'value') {
                    return ELEMENT.value;
                }
                if (thing in P.component.item) {
                    if (typeof format == 'string') {
                        return PickerConstructor._.trigger(P.component.formats.toString, P.component, [format, P.component.get(thing)]);
                    }
                    return P.component.get(thing);
                }
            },
            on: function (thing, method) {
                var thingName, thingMethod, thingIsObject = $.isPlainObject(thing), thingObject = thingIsObject ? thing : {};
                if (thing) {
                    if (!thingIsObject) {
                        thingObject[thing] = method;
                    }
                    for (thingName in thingObject) {
                        thingMethod = thingObject[thingName];
                        STATE.methods[thingName] = STATE.methods[thingName] || [];
                        STATE.methods[thingName].push(thingMethod);
                    }
                }
                return P;
            },
            off: function () {
                var i, thingName, names = arguments;
                for (i = 0, namesCount = names.length; i < namesCount; i += 1) {
                    thingName = names[i];
                    if (thingName in STATE.methods) {
                        delete STATE.methods[thingName];
                    }
                }
                return P;
            },
            trigger: function (name, data) {
                var methodList = STATE.methods[name];
                if (methodList) {
                    methodList.map(function (method) {
                        PickerConstructor._.trigger(method, P, [data]);
                    });
                }
                return P;
            }
        };
        function createWrappedComponent() {
            return PickerConstructor._.node('div', PickerConstructor._.node('div', PickerConstructor._.node('div', PickerConstructor._.node('div', P.component.nodes(STATE.open), CLASSES.box), CLASSES.wrap), CLASSES.frame), CLASSES.holder);
        }
        function prepareElement() {
            $ELEMENT.
                data(NAME, P).
                addClass(CLASSES.input).
                val($ELEMENT.data('value') ?
                P.get('select', SETTINGS.format) :
                ELEMENT.value).
                on('focus.' + STATE.id + ' click.' + STATE.id, focusToOpen);
            if (!SETTINGS.editable) {
                $ELEMENT.on('keydown.' + STATE.id, function (event) {
                    var keycode = event.keyCode, isKeycodeDelete = /^(8|46)$/.test(keycode);
                    if (keycode == 27) {
                        P.close();
                        return false;
                    }
                    if (keycode == 32 || isKeycodeDelete || !STATE.open && P.component.key[keycode]) {
                        event.preventDefault();
                        event.stopPropagation();
                        if (isKeycodeDelete) {
                            P.clear().close();
                        }
                        else {
                            P.open();
                        }
                    }
                });
            }
            aria(ELEMENT, {
                haspopup: true,
                expanded: false,
                readonly: false,
                owns: ELEMENT.id + '_root' + (P._hidden ? ' ' + P._hidden.id : '')
            });
        }
        function prepareElementRoot() {
            P.$root.
                on({
                focusin: function (event) {
                    P.$root.removeClass(CLASSES.focused);
                    aria(P.$root[0], 'selected', false);
                    event.stopPropagation();
                },
                'mousedown click': function (event) {
                    var target = event.target;
                    if (target != P.$root.children()[0]) {
                        event.stopPropagation();
                        if (event.type == 'mousedown' && !$(target).is(':input') && target.nodeName != 'OPTION') {
                            event.preventDefault();
                            ELEMENT.focus();
                        }
                    }
                }
            }).
                on('click', '[data-pick], [data-nav], [data-clear]', function () {
                var $target = $(this), targetData = $target.data(), targetDisabled = $target.hasClass(CLASSES.navDisabled) || $target.hasClass(CLASSES.disabled), activeElement = document.activeElement;
                activeElement = activeElement && (activeElement.type || activeElement.href) && activeElement;
                if (targetDisabled || activeElement && !$.contains(P.$root[0], activeElement)) {
                    ELEMENT.focus();
                }
                if (targetData.nav && !targetDisabled) {
                    P.set('highlight', P.component.item.highlight, { nav: targetData.nav });
                }
                else if (PickerConstructor._.isInteger(targetData.pick) && !targetDisabled) {
                    P.set('select', targetData.pick).close(true);
                }
                else if (targetData.clear) {
                    P.clear().close(true);
                }
            });
            aria(P.$root[0], 'hidden', true);
        }
        function prepareElementHidden() {
            var id = [
                typeof SETTINGS.hiddenPrefix == 'string' ? SETTINGS.hiddenPrefix : '',
                typeof SETTINGS.hiddenSuffix == 'string' ? SETTINGS.hiddenSuffix : '_submit'
            ];
            P._hidden = $('<input ' +
                'type=hidden ' +
                'name="' + id[0] + ELEMENT.name + id[1] + '"' +
                'id="' + id[0] + ELEMENT.id + id[1] + '"' +
                ($ELEMENT.data('value') || ELEMENT.value ?
                    ' value="' + P.get('select', SETTINGS.formatSubmit) + '"' :
                    '') +
                '>')[0];
            $ELEMENT.
                on('change.' + STATE.id, function () {
                P._hidden.value = ELEMENT.value ?
                    P.get('select', SETTINGS.formatSubmit) :
                    '';
            }).
                after(P._hidden);
        }
        function focusToOpen(event) {
            event.stopPropagation();
            if (event.type == 'focus') {
                P.$root.addClass(CLASSES.focused);
                aria(P.$root[0], 'selected', true);
            }
            P.open();
        }
        return new PickerInstance();
    }
    PickerConstructor.klasses = function (prefix) {
        prefix = prefix || 'picker';
        return {
            picker: prefix,
            opened: prefix + '--opened',
            focused: prefix + '--focused',
            input: prefix + '__input',
            active: prefix + '__input--active',
            holder: prefix + '__holder',
            frame: prefix + '__frame',
            wrap: prefix + '__wrap',
            box: prefix + '__box'
        };
    };
    PickerConstructor._ = {
        group: function (groupObject) {
            var loopObjectScope, nodesList = '', counter = PickerConstructor._.trigger(groupObject.min, groupObject);
            for (; counter <= PickerConstructor._.trigger(groupObject.max, groupObject, [counter]); counter += groupObject.i) {
                loopObjectScope = PickerConstructor._.trigger(groupObject.item, groupObject, [counter]);
                nodesList += PickerConstructor._.node(groupObject.node, loopObjectScope[0], loopObjectScope[1], loopObjectScope[2]);
            }
            return nodesList;
        },
        node: function (wrapper, item, klass, attribute) {
            if (!item)
                return '';
            item = $.isArray(item) ? item.join('') : item;
            klass = klass ? ' class="' + klass + '"' : '';
            attribute = attribute ? ' ' + attribute : '';
            return '<' + wrapper + klass + attribute + '>' + item + '</' + wrapper + '>';
        },
        lead: function (number) {
            return (number < 10 ? '0' : '') + number;
        },
        trigger: function (callback, scope, args) {
            return typeof callback == 'function' ? callback.apply(scope, args || []) : callback;
        },
        digits: function (string) {
            return (/\d/).test(string[1]) ? 2 : 1;
        },
        isDate: function (value) {
            return {}.toString.call(value).indexOf('Date') > -1 && this.isInteger(value.getDate());
        },
        isInteger: function (value) {
            return {}.toString.call(value).indexOf('Number') > -1 && value % 1 === 0;
        },
        ariaAttr: ariaAttr
    };
    PickerConstructor.extend = function (name, Component) {
        $.fn[name] = function (options, action) {
            var componentData = this.data(name);
            if (options == 'picker') {
                return componentData;
            }
            if (componentData && typeof options == 'string') {
                PickerConstructor._.trigger(componentData[options], componentData, [action]);
                return this;
            }
            return this.each(function () {
                var $this = $(this);
                if (!$this.data(name)) {
                    new PickerConstructor(this, name, Component, options);
                }
            });
        };
        $.fn[name].defaults = Component.defaults;
    };
    function aria(element, attribute, value) {
        if ($.isPlainObject(attribute)) {
            for (var key in attribute) {
                ariaSet(element, key, attribute[key]);
            }
        }
        else {
            ariaSet(element, attribute, value);
        }
    }
    function ariaSet(element, attribute, value) {
        element.setAttribute((attribute == 'role' ? '' : 'aria-') + attribute, value);
    }
    function ariaAttr(attribute, data) {
        if (!$.isPlainObject(attribute)) {
            attribute = { attribute: data };
        }
        data = '';
        for (var key in attribute) {
            var attr = (key == 'role' ? '' : 'aria-') + key, attrVal = attribute[key];
            data += attrVal == null ? '' : attr + '="' + attribute[key] + '"';
        }
        return data;
    }
    return PickerConstructor;
}(jQuery));
/*!
 * Date picker for pickadate.js v3.4.0
 * http://amsul.github.io/pickadate.js/date.htm
 */
(function (Picker, $) {
    var DAYS_IN_WEEK = 7, WEEKS_IN_CALENDAR = 6, _ = Picker._;
    function DatePicker(picker, settings) {
        var calendar = this, elementValue = picker.$node[0].value, elementDataValue = picker.$node.data('value'), valueString = elementDataValue || elementValue, formatString = elementDataValue ? settings.formatSubmit : settings.format, isRTL = function () {
            return getComputedStyle(picker.$root[0]).direction === 'rtl';
        };
        calendar.settings = settings;
        calendar.$node = picker.$node;
        calendar.queue = {
            min: 'measure create',
            max: 'measure create',
            now: 'now create',
            select: 'parse create validate',
            highlight: 'parse navigate create validate',
            view: 'parse create validate viewset',
            disable: 'deactivate',
            enable: 'activate'
        };
        calendar.item = {};
        calendar.item.disable = (settings.disable || []).slice(0);
        calendar.item.enable = -(function (collectionDisabled) {
            return collectionDisabled[0] === true ? collectionDisabled.shift() : -1;
        })(calendar.item.disable);
        calendar.
            set('min', settings.min).
            set('max', settings.max).
            set('now');
        if (valueString) {
            calendar.set('select', valueString, {
                format: formatString,
                fromValue: !!elementValue
            });
        }
        else {
            calendar.
                set('select', null).
                set('highlight', calendar.item.now);
        }
        calendar.key = {
            40: 7,
            38: -7,
            39: function () { return isRTL() ? -1 : 1; },
            37: function () { return isRTL() ? 1 : -1; },
            go: function (timeChange) {
                var highlightedObject = calendar.item.highlight, targetDate = new Date(highlightedObject.year, highlightedObject.month, highlightedObject.date + timeChange);
                calendar.set('highlight', [targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()], { interval: timeChange });
                this.render();
            }
        };
        picker.
            on('render', function () {
            picker.$root.find('.' + settings.klass.selectMonth).on('change', function () {
                var value = this.value;
                if (value) {
                    picker.set('highlight', [picker.get('view').year, value, picker.get('highlight').date]);
                    picker.$root.find('.' + settings.klass.selectMonth).trigger('focus');
                }
            });
            picker.$root.find('.' + settings.klass.selectYear).on('change', function () {
                var value = this.value;
                if (value) {
                    picker.set('highlight', [value, picker.get('view').month, picker.get('highlight').date]);
                    picker.$root.find('.' + settings.klass.selectYear).trigger('focus');
                }
            });
        }).
            on('open', function () {
            picker.$root.find('button, select').attr('disabled', false);
        }).
            on('close', function () {
            picker.$root.find('button, select').attr('disabled', true);
        });
    }
    DatePicker.prototype.set = function (type, value, options) {
        var calendar = this, calendarItem = calendar.item;
        if (value === null) {
            calendarItem[type] = value;
            return calendar;
        }
        calendarItem[(type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type)] = calendar.queue[type].split(' ').map(function (method) {
            value = calendar[method](type, value, options);
            return value;
        }).pop();
        if (type == 'select') {
            calendar.set('highlight', calendarItem.select, options);
        }
        else if (type == 'highlight') {
            calendar.set('view', calendarItem.highlight, options);
        }
        else if (type.match(/^(flip|min|max|disable|enable)$/)) {
            if (calendarItem.select && calendar.disabled(calendarItem.select)) {
                calendar.set('select', calendarItem.select, options);
            }
            if (calendarItem.highlight && calendar.disabled(calendarItem.highlight)) {
                calendar.set('highlight', calendarItem.highlight, options);
            }
        }
        return calendar;
    };
    DatePicker.prototype.get = function (type) {
        return this.item[type];
    };
    DatePicker.prototype.create = function (type, value, options) {
        var isInfiniteValue, calendar = this;
        value = value === undefined ? type : value;
        if (value == -Infinity || value == Infinity) {
            isInfiniteValue = value;
        }
        else if ($.isPlainObject(value) && _.isInteger(value.pick)) {
            value = value.obj;
        }
        else if ($.isArray(value)) {
            value = new Date(value[0], value[1], value[2]);
            value = _.isDate(value) ? value : calendar.create().obj;
        }
        else if (_.isInteger(value) || _.isDate(value)) {
            value = calendar.normalize(new Date(value), options);
        }
        else {
            value = calendar.now(type, value, options);
        }
        return {
            year: isInfiniteValue || value.getFullYear(),
            month: isInfiniteValue || value.getMonth(),
            date: isInfiniteValue || value.getDate(),
            day: isInfiniteValue || value.getDay(),
            obj: isInfiniteValue || value,
            pick: isInfiniteValue || value.getTime()
        };
    };
    DatePicker.prototype.createRange = function (from, to) {
        var calendar = this, createDate = function (date) {
            if (date === true || $.isArray(date) || _.isDate(date)) {
                return calendar.create(date);
            }
            return date;
        };
        if (!_.isInteger(from)) {
            from = createDate(from);
        }
        if (!_.isInteger(to)) {
            to = createDate(to);
        }
        if (_.isInteger(from) && $.isPlainObject(to)) {
            from = [to.year, to.month, to.date + from];
        }
        else if (_.isInteger(to) && $.isPlainObject(from)) {
            to = [from.year, from.month, from.date + to];
        }
        return {
            from: createDate(from),
            to: createDate(to)
        };
    };
    DatePicker.prototype.withinRange = function (range, dateUnit) {
        range = this.createRange(range.from, range.to);
        return dateUnit.pick >= range.from.pick && dateUnit.pick <= range.to.pick;
    };
    DatePicker.prototype.overlapRanges = function (one, two) {
        var calendar = this;
        one = calendar.createRange(one.from, one.to);
        two = calendar.createRange(two.from, two.to);
        return calendar.withinRange(one, two.from) || calendar.withinRange(one, two.to) ||
            calendar.withinRange(two, one.from) || calendar.withinRange(two, one.to);
    };
    DatePicker.prototype.now = function (type, value, options) {
        value = new Date();
        if (options && options.rel) {
            value.setDate(value.getDate() + options.rel);
        }
        return this.normalize(value, options);
    };
    DatePicker.prototype.navigate = function (type, value, options) {
        var targetDateObject, targetYear, targetMonth, targetDate, isTargetArray = $.isArray(value), isTargetObject = $.isPlainObject(value), viewsetObject = this.item.view;
        if (isTargetArray || isTargetObject) {
            if (isTargetObject) {
                targetYear = value.year;
                targetMonth = value.month;
                targetDate = value.date;
            }
            else {
                targetYear = +value[0];
                targetMonth = +value[1];
                targetDate = +value[2];
            }
            if (options && options.nav && viewsetObject && viewsetObject.month !== targetMonth) {
                targetYear = viewsetObject.year;
                targetMonth = viewsetObject.month;
            }
            targetDateObject = new Date(targetYear, targetMonth + (options && options.nav ? options.nav : 0), 1);
            targetYear = targetDateObject.getFullYear();
            targetMonth = targetDateObject.getMonth();
            while (new Date(targetYear, targetMonth, targetDate).getMonth() !== targetMonth) {
                targetDate -= 1;
            }
            value = [targetYear, targetMonth, targetDate];
        }
        return value;
    };
    DatePicker.prototype.normalize = function (value) {
        value.setHours(0, 0, 0, 0);
        return value;
    };
    DatePicker.prototype.measure = function (type, value) {
        var calendar = this;
        if (!value) {
            value = type == 'min' ? -Infinity : Infinity;
        }
        else if (_.isInteger(value)) {
            value = calendar.now(type, value, { rel: value });
        }
        return value;
    };
    DatePicker.prototype.viewset = function (type, dateObject) {
        return this.create([dateObject.year, dateObject.month, 1]);
    };
    DatePicker.prototype.validate = function (type, dateObject, options) {
        var calendar = this, originalDateObject = dateObject, interval = options && options.interval ? options.interval : 1, isFlippedBase = calendar.item.enable === -1, hasEnabledBeforeTarget, hasEnabledAfterTarget, minLimitObject = calendar.item.min, maxLimitObject = calendar.item.max, reachedMin, reachedMax, hasEnabledWeekdays = isFlippedBase && calendar.item.disable.filter(function (value) {
            if ($.isArray(value)) {
                var dateTime = calendar.create(value).pick;
                if (dateTime < dateObject.pick)
                    hasEnabledBeforeTarget = true;
                else if (dateTime > dateObject.pick)
                    hasEnabledAfterTarget = true;
            }
            return _.isInteger(value);
        }).length;
        if (!options || !options.nav)
            if ((!isFlippedBase && calendar.disabled(dateObject)) ||
                (isFlippedBase && calendar.disabled(dateObject) && (hasEnabledWeekdays || hasEnabledBeforeTarget || hasEnabledAfterTarget)) ||
                (!isFlippedBase && (dateObject.pick <= minLimitObject.pick || dateObject.pick >= maxLimitObject.pick))) {
                if (isFlippedBase && !hasEnabledWeekdays && ((!hasEnabledAfterTarget && interval > 0) || (!hasEnabledBeforeTarget && interval < 0))) {
                    interval *= -1;
                }
                while (calendar.disabled(dateObject)) {
                    if (Math.abs(interval) > 1 && (dateObject.month < originalDateObject.month || dateObject.month > originalDateObject.month)) {
                        dateObject = originalDateObject;
                        interval = interval > 0 ? 1 : -1;
                    }
                    if (dateObject.pick <= minLimitObject.pick) {
                        reachedMin = true;
                        interval = 1;
                        dateObject = calendar.create([minLimitObject.year, minLimitObject.month, minLimitObject.date - 1]);
                    }
                    else if (dateObject.pick >= maxLimitObject.pick) {
                        reachedMax = true;
                        interval = -1;
                        dateObject = calendar.create([maxLimitObject.year, maxLimitObject.month, maxLimitObject.date + 1]);
                    }
                    if (reachedMin && reachedMax) {
                        break;
                    }
                    dateObject = calendar.create([dateObject.year, dateObject.month, dateObject.date + interval]);
                }
            }
        return dateObject;
    };
    DatePicker.prototype.disabled = function (dateToVerify) {
        var calendar = this, isDisabledMatch = calendar.item.disable.filter(function (dateToDisable) {
            if (_.isInteger(dateToDisable)) {
                return dateToVerify.day === (calendar.settings.firstDay ? dateToDisable : dateToDisable - 1) % 7;
            }
            if ($.isArray(dateToDisable) || _.isDate(dateToDisable)) {
                return dateToVerify.pick === calendar.create(dateToDisable).pick;
            }
            if ($.isPlainObject(dateToDisable)) {
                return calendar.withinRange(dateToDisable, dateToVerify);
            }
        });
        isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function (dateToDisable) {
            return $.isArray(dateToDisable) && dateToDisable[3] == 'inverted' ||
                $.isPlainObject(dateToDisable) && dateToDisable.inverted;
        }).length;
        return calendar.item.enable === -1 ? !isDisabledMatch : isDisabledMatch ||
            dateToVerify.pick < calendar.item.min.pick ||
            dateToVerify.pick > calendar.item.max.pick;
    };
    DatePicker.prototype.parse = function (type, value, options) {
        var calendar = this, parsingObject = {}, monthIndex;
        if (!value || _.isInteger(value) || $.isArray(value) || _.isDate(value) || $.isPlainObject(value) && _.isInteger(value.pick)) {
            return value;
        }
        if (!(options && options.format)) {
            options = options || {};
            options.format = calendar.settings.format;
        }
        monthIndex = typeof value == 'string' && !options.fromValue ? 1 : 0;
        calendar.formats.toArray(options.format).map(function (label) {
            var formattingLabel = calendar.formats[label], formatLength = formattingLabel ? _.trigger(formattingLabel, calendar, [value, parsingObject]) : label.replace(/^!/, '').length;
            if (formattingLabel) {
                parsingObject[label] = value.substr(0, formatLength);
            }
            value = value.substr(formatLength);
        });
        return [
            parsingObject.yyyy || parsingObject.yy,
            +(parsingObject.mm || parsingObject.m) - monthIndex,
            parsingObject.dd || parsingObject.d
        ];
    };
    DatePicker.prototype.formats = (function () {
        function getWordLengthFromCollection(string, collection, dateObject) {
            var word = string.match(/\w+/)[0];
            if (!dateObject.mm && !dateObject.m) {
                dateObject.m = collection.indexOf(word);
            }
            return word.length;
        }
        function getFirstWordLength(string) {
            return string.match(/\w+/)[0].length;
        }
        return {
            d: function (string, dateObject) {
                return string ? _.digits(string) : dateObject.date;
            },
            dd: function (string, dateObject) {
                return string ? 2 : _.lead(dateObject.date);
            },
            ddd: function (string, dateObject) {
                return string ? getFirstWordLength(string) : this.settings.weekdaysShort[dateObject.day];
            },
            dddd: function (string, dateObject) {
                return string ? getFirstWordLength(string) : this.settings.weekdaysFull[dateObject.day];
            },
            m: function (string, dateObject) {
                return string ? _.digits(string) : dateObject.month + 1;
            },
            mm: function (string, dateObject) {
                return string ? 2 : _.lead(dateObject.month + 1);
            },
            mmm: function (string, dateObject) {
                var collection = this.settings.monthsShort;
                return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month];
            },
            mmmm: function (string, dateObject) {
                var collection = this.settings.monthsFull;
                return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month];
            },
            yy: function (string, dateObject) {
                return string ? 2 : ('' + dateObject.year).slice(2);
            },
            yyyy: function (string, dateObject) {
                return string ? 4 : dateObject.year;
            },
            toArray: function (formatString) { return formatString.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g); },
            toString: function (formatString, itemObject) {
                var calendar = this;
                return calendar.formats.toArray(formatString).map(function (label) {
                    return _.trigger(calendar.formats[label], calendar, [0, itemObject]) || label.replace(/^!/, '');
                }).join('');
            }
        };
    })();
    DatePicker.prototype.isDateExact = function (one, two) {
        var calendar = this;
        if ((_.isInteger(one) && _.isInteger(two)) ||
            (typeof one == 'boolean' && typeof two == 'boolean')) {
            return one === two;
        }
        if ((_.isDate(one) || $.isArray(one)) &&
            (_.isDate(two) || $.isArray(two))) {
            return calendar.create(one).pick === calendar.create(two).pick;
        }
        if ($.isPlainObject(one) && $.isPlainObject(two)) {
            return calendar.isDateExact(one.from, two.from) && calendar.isDateExact(one.to, two.to);
        }
        return false;
    };
    DatePicker.prototype.isDateOverlap = function (one, two) {
        var calendar = this;
        if (_.isInteger(one) && (_.isDate(two) || $.isArray(two))) {
            return one === calendar.create(two).day + 1;
        }
        if (_.isInteger(two) && (_.isDate(one) || $.isArray(one))) {
            return two === calendar.create(one).day + 1;
        }
        if ($.isPlainObject(one) && $.isPlainObject(two)) {
            return calendar.overlapRanges(one, two);
        }
        return false;
    };
    DatePicker.prototype.flipEnable = function (val) {
        var itemObject = this.item;
        itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1);
    };
    DatePicker.prototype.deactivate = function (type, datesToDisable) {
        var calendar = this, disabledItems = calendar.item.disable.slice(0);
        if (datesToDisable == 'flip') {
            calendar.flipEnable();
        }
        else if (datesToDisable === false) {
            calendar.flipEnable(1);
            disabledItems = [];
        }
        else if (datesToDisable === true) {
            calendar.flipEnable(-1);
            disabledItems = [];
        }
        else {
            datesToDisable.map(function (unitToDisable) {
                var matchFound;
                for (var index = 0; index < disabledItems.length; index += 1) {
                    if (calendar.isDateExact(unitToDisable, disabledItems[index])) {
                        matchFound = true;
                        break;
                    }
                }
                if (!matchFound) {
                    if (_.isInteger(unitToDisable) ||
                        _.isDate(unitToDisable) ||
                        $.isArray(unitToDisable) ||
                        ($.isPlainObject(unitToDisable) && unitToDisable.from && unitToDisable.to)) {
                        disabledItems.push(unitToDisable);
                    }
                }
            });
        }
        return disabledItems;
    };
    DatePicker.prototype.activate = function (type, datesToEnable) {
        var calendar = this, disabledItems = calendar.item.disable, disabledItemsCount = disabledItems.length;
        if (datesToEnable == 'flip') {
            calendar.flipEnable();
        }
        else if (datesToEnable === true) {
            calendar.flipEnable(1);
            disabledItems = [];
        }
        else if (datesToEnable === false) {
            calendar.flipEnable(-1);
            disabledItems = [];
        }
        else {
            datesToEnable.map(function (unitToEnable) {
                var matchFound, disabledUnit, index, isExactRange;
                for (index = 0; index < disabledItemsCount; index += 1) {
                    disabledUnit = disabledItems[index];
                    if (calendar.isDateExact(disabledUnit, unitToEnable)) {
                        matchFound = disabledItems[index] = null;
                        isExactRange = true;
                        break;
                    }
                    else if (calendar.isDateOverlap(disabledUnit, unitToEnable)) {
                        if ($.isPlainObject(unitToEnable)) {
                            unitToEnable.inverted = true;
                            matchFound = unitToEnable;
                        }
                        else if ($.isArray(unitToEnable)) {
                            matchFound = unitToEnable;
                            if (!matchFound[3])
                                matchFound.push('inverted');
                        }
                        else if (_.isDate(unitToEnable)) {
                            matchFound = [unitToEnable.getFullYear(), unitToEnable.getMonth(), unitToEnable.getDate(), 'inverted'];
                        }
                        break;
                    }
                }
                if (matchFound)
                    for (index = 0; index < disabledItemsCount; index += 1) {
                        if (calendar.isDateExact(disabledItems[index], unitToEnable)) {
                            disabledItems[index] = null;
                            break;
                        }
                    }
                if (isExactRange)
                    for (index = 0; index < disabledItemsCount; index += 1) {
                        if (calendar.isDateOverlap(disabledItems[index], unitToEnable)) {
                            disabledItems[index] = null;
                            break;
                        }
                    }
                if (matchFound) {
                    disabledItems.push(matchFound);
                }
            });
        }
        return disabledItems.filter(function (val) { return val != null; });
    };
    DatePicker.prototype.nodes = function (isOpen) {
        var calendar = this, settings = calendar.settings, calendarItem = calendar.item, nowObject = calendarItem.now, selectedObject = calendarItem.select, highlightedObject = calendarItem.highlight, viewsetObject = calendarItem.view, disabledCollection = calendarItem.disable, minLimitObject = calendarItem.min, maxLimitObject = calendarItem.max, tableHead = (function (collection) {
            if (settings.firstDay) {
                collection.push(collection.shift());
            }
            return _.node('thead', _.node('tr', _.group({
                min: 0,
                max: DAYS_IN_WEEK - 1,
                i: 1,
                node: 'th',
                item: function (counter) {
                    return [
                        collection[counter],
                        settings.klass.weekdays
                    ];
                }
            })));
        })((settings.showWeekdaysFull ? settings.weekdaysFull : settings.weekdaysShort).slice(0)), createMonthNav = function (next) {
            return _.node('div', ' ', settings.klass['nav' + (next ? 'Next' : 'Prev')] + ((next && viewsetObject.year >= maxLimitObject.year && viewsetObject.month >= maxLimitObject.month) ||
                (!next && viewsetObject.year <= minLimitObject.year && viewsetObject.month <= minLimitObject.month) ?
                ' ' + settings.klass.navDisabled : ''), 'data-nav=' + (next || -1));
        }, createMonthLabel = function (monthsCollection) {
            if (settings.selectMonths) {
                return _.node('select', _.group({
                    min: 0,
                    max: 11,
                    i: 1,
                    node: 'option',
                    item: function (loopedMonth) {
                        return [
                            monthsCollection[loopedMonth], 0,
                            'value=' + loopedMonth +
                                (viewsetObject.month == loopedMonth ? ' selected' : '') +
                                (((viewsetObject.year == minLimitObject.year && loopedMonth < minLimitObject.month) ||
                                    (viewsetObject.year == maxLimitObject.year && loopedMonth > maxLimitObject.month)) ?
                                    ' disabled' : '')
                        ];
                    }
                }), settings.klass.selectMonth, isOpen ? '' : 'disabled');
            }
            return _.node('div', monthsCollection[viewsetObject.month], settings.klass.month);
        }, createYearLabel = function () {
            var focusedYear = viewsetObject.year, numberYears = settings.selectYears === true ? 5 : ~~(settings.selectYears / 2);
            if (numberYears) {
                var minYear = minLimitObject.year, maxYear = maxLimitObject.year, lowestYear = focusedYear - numberYears, highestYear = focusedYear + numberYears;
                if (minYear > lowestYear) {
                    highestYear += minYear - lowestYear;
                    lowestYear = minYear;
                }
                if (maxYear < highestYear) {
                    var availableYears = lowestYear - minYear, neededYears = highestYear - maxYear;
                    lowestYear -= availableYears > neededYears ? neededYears : availableYears;
                    highestYear = maxYear;
                }
                return _.node('select', _.group({
                    min: lowestYear,
                    max: highestYear,
                    i: 1,
                    node: 'option',
                    item: function (loopedYear) {
                        return [
                            loopedYear, 0,
                            'value=' + loopedYear + (focusedYear == loopedYear ? ' selected' : '')
                        ];
                    }
                }), settings.klass.selectYear, isOpen ? '' : 'disabled');
            }
            return _.node('div', focusedYear, settings.klass.year);
        };
        return _.node('div', createMonthNav() + createMonthNav(1) +
            createMonthLabel(settings.showMonthsShort ? settings.monthsShort : settings.monthsFull) +
            createYearLabel(), settings.klass.header) + _.node('table', tableHead +
            _.node('tbody', _.group({
                min: 0,
                max: WEEKS_IN_CALENDAR - 1,
                i: 1,
                node: 'tr',
                item: function (rowCounter) {
                    var shiftDateBy = settings.firstDay && calendar.create([viewsetObject.year, viewsetObject.month, 1]).day === 0 ? -7 : 0;
                    return [
                        _.group({
                            min: DAYS_IN_WEEK * rowCounter - viewsetObject.day + shiftDateBy + 1,
                            max: function () {
                                return this.min + DAYS_IN_WEEK - 1;
                            },
                            i: 1,
                            node: 'td',
                            item: function (targetDate) {
                                targetDate = calendar.create([viewsetObject.year, viewsetObject.month, targetDate + (settings.firstDay ? 1 : 0)]);
                                var isSelected = selectedObject && selectedObject.pick == targetDate.pick, isHighlighted = highlightedObject && highlightedObject.pick == targetDate.pick, isDisabled = disabledCollection && calendar.disabled(targetDate) || targetDate.pick < minLimitObject.pick || targetDate.pick > maxLimitObject.pick;
                                return [
                                    _.node('div', targetDate.date, (function (klasses) {
                                        klasses.push(viewsetObject.month == targetDate.month ? settings.klass.infocus : settings.klass.outfocus);
                                        if (nowObject.pick == targetDate.pick) {
                                            klasses.push(settings.klass.now);
                                        }
                                        if (isSelected) {
                                            klasses.push(settings.klass.selected);
                                        }
                                        if (isHighlighted) {
                                            klasses.push(settings.klass.highlighted);
                                        }
                                        if (isDisabled) {
                                            klasses.push(settings.klass.disabled);
                                        }
                                        return klasses.join(' ');
                                    })([settings.klass.day]), 'data-pick=' + targetDate.pick + ' ' + _.ariaAttr({
                                        role: 'button',
                                        controls: calendar.$node[0].id,
                                        checked: isSelected && calendar.$node.val() === _.trigger(calendar.formats.toString, calendar, [settings.format, targetDate]) ? true : null,
                                        activedescendant: isHighlighted ? true : null,
                                        disabled: isDisabled ? true : null
                                    }))
                                ];
                            }
                        })
                    ];
                }
            })), settings.klass.table) +
            _.node('div', _.node('button', settings.today, settings.klass.buttonToday, 'type=button data-pick=' + nowObject.pick + (isOpen ? '' : ' disabled')) +
                _.node('button', settings.clear, settings.klass.buttonClear, 'type=button data-clear=1' + (isOpen ? '' : ' disabled')), settings.klass.footer);
    };
    DatePicker.defaults = (function (prefix) {
        return {
            monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            today: 'Today',
            clear: 'Clear',
            format: 'd mmmm, yyyy',
            klass: {
                table: prefix + 'table',
                header: prefix + 'header',
                navPrev: prefix + 'nav--prev',
                navNext: prefix + 'nav--next',
                navDisabled: prefix + 'nav--disabled',
                month: prefix + 'month',
                year: prefix + 'year',
                selectMonth: prefix + 'select--month',
                selectYear: prefix + 'select--year',
                weekdays: prefix + 'weekday',
                day: prefix + 'day',
                disabled: prefix + 'day--disabled',
                selected: prefix + 'day--selected',
                highlighted: prefix + 'day--highlighted',
                now: prefix + 'day--today',
                infocus: prefix + 'day--infocus',
                outfocus: prefix + 'day--outfocus',
                footer: prefix + 'footer',
                buttonClear: prefix + 'button--clear',
                buttonToday: prefix + 'button--today'
            }
        };
    })(Picker.klasses().picker + '__');
    Picker.extend('pickadate', DatePicker);
}(Picker, jQuery));
app = window.app || {};
app.topics = {};
app.topics.fetch = function () {
    $("ul.topic-resources.topic-resources-list").addClass('loading');
    var tags = ($('#topic-resources').data('tags') || "");
    try {
        tags = JSON.parse(tags.replace(/'/g, "\""));
    }
    catch (e) {
        tags = "";
    }
    if (tags) {
        var tagsString = "";
        for (var i = 0; i < tags.length; i++) {
            if (i > 0) {
                tags[i] = "&tag=" + tags[i];
            }
            tagsString += (tags[i]).toLowerCase();
        }
    }
    $.getJSON(app.dcp.url.search + '/developer_materials?tags_or_logic=true&newFirst=true&size15=true&type=jbossdeveloper_vimeo&type=jbossdeveloper_youtube&type=jbossdeveloper_book&type=jbossorg_blog&tag=' + tagsString, function (data) {
        if (data.hits && data.hits.hits) {
            app.topics.render(data.hits.hits);
        }
    });
};
app.topics.render = function (materials) {
    var html = [];
    materials.forEach(function (material) {
        var type = material.fields.sys_type[0];
        var timeStamp = new Date(material.fields.sys_created[0]);
        var timeAgo = $.timeago(timeStamp);
        var canDisplay = material.fields.sys_title && material.fields.sys_description && material.fields.sys_description.length > 0;
        if (canDisplay) {
            if (material.fields.sys_type[0] == 'blogpost') {
                if (material.fields.sys_url_view[0].startsWith('https://developers.redhat.com/blog') || material.fields.sys_url_view[0].startsWith('https://developers.redhat.com/blog')) {
                    material.fields.sys_url_view[0] = material.fields.sys_url_view[0];
                }
                else if (material.fields.sys_url_view[0].match(/http(s?):\/\/developerblog.redhat.com\/.*/g)) {
                    material.fields.sys_url_view[0] = material.fields.sys_url_view[0].replace(/http(s?):\/\/developerblog.redhat.com\//, 'https://developers.redhat.com/blog/');
                }
                else {
                    var post_id = /-(.+)/.exec(material._id)[1];
                    material.fields.sys_url_view[0] = "//planet.jboss.org/post/" + post_id;
                }
            }
            var title = material.fields.sys_title[0];
            var tags = material.fields.sys_tags.join(', ').substr(0, 30);
            tags = tags.substr(0, Math.min(tags.length, tags.lastIndexOf(",")));
            var item = [
                '<a href="' + material.fields.sys_url_view[0] + '">',
                '<li class="large-6 columns">',
                '<h5>',
                title,
                '</h5>',
                '<p class="description">',
                material.fields.sys_description[0],
                '</p>',
                '</li>',
                '</a>'
            ].join('');
            html.push(item);
            $("ul.topic-resources.topic-resources-list").removeClass('loading');
        }
    });
    $('.topic-resources-list').html(html.join(''));
};
$(function () {
    var $topicsResourceList = $('.topic-resources-list');
    if ($topicsResourceList.length) {
        app.topics.fetch();
    }
});
$('.datepicker').pickadate();
app = window.app || {};
app.latest = {};
app.latest.fetch = function () {
    $("ul.homepage-resources.homepage-resources-latest").addClass('loading');
    $.getJSON(app.dcp.url.search + '/developer_materials?newFirst=true&size10=true&stype=quickstart&stype=video&stype=demo&stype=jbossdeveloper_example&stype=jbossdeveloper_archetype&stype=jbossdeveloper_bom&stype=blogpost&stype=book&blogbyurl=developers.redhat.com', function (data) {
        if (data.hits && data.hits.hits) {
            app.latest.render(data.hits.hits);
        }
    });
};
app.latest.render = function (materials) {
    materials = materials.slice(0, 6);
    var html = [];
    materials.forEach(function (material) {
        var type = material.fields.sys_type[0];
        var timeStamp = new Date(material.fields.sys_created[0]);
        var formattedDate = moment(timeStamp).format('ll');
        var item = [
            '<li>',
            '<i class="icon-RHDev_-resources_icons_' + type + '"></i>',
            '<a href="' + material.fields.sys_url_view[0] + '" class="title">',
            material.fields.sys_title[0],
            '<p class="date">',
            formattedDate,
            '</p>',
            '</a>',
            '</li>'
        ].join('');
        html.push(item);
        $("ul.homepage-resources.homepage-resources-latest").removeClass('loading');
    });
    $('.homepage-resources-latest').html(html.join(''));
};
$(function () {
    var $latestResourceList = $('.homepage-resources-latest');
    if ($latestResourceList.length) {
        app.latest.fetch();
    }
});
$(document).ready(function () {
    $("input[type='radio']").on("click", function (event) {
        if (($('input[type="radio"][name="Q1"]:checked').attr("value") == "q1a1") && ($('input[type="radio"][name="Q2"]:checked').attr("value") == "q2a1")) {
            $('.result-title').text("Lucky you! You're both a Most Valuable Contributor (MVC) & Developer on the Street (DOTS).");
            $('.result-text').text("Based upon your selections above, you should sign up to be both a MVC and DOTS.");
        }
        if (($('input[type="radio"][name="Q1"]:checked').attr("value") == "q1a1") && ($('input[type="radio"][name="Q2"]:checked').attr("value") == "q2a2")) {
            $('.result-title').text("Way to go! You're a match with being a Most Valuable Contributor (MVC).");
            $('.result-text').text("Based upon your selections above, you should sign up to be a MVC.");
        }
        if (($('input[type="radio"][name="Q1"]:checked').attr("value") == "q1a2") && ($('input[type="radio"][name="Q2"]:checked').attr("value") == "q2a1")) {
            $('.result-title').text("That’s awesome! You're both a General Contributor & Developer on the Street (DOTS).");
            $('.result-text').text("Based upon your selections above, you should sign up to be both a General Contributor and DOTS.");
        }
        if (($('input[type="radio"][name="Q1"]:checked').attr("value") == "q1a2") && ($('input[type="radio"][name="Q2"]:checked').attr("value") == "q2a2")) {
            $('.result-title').text("You would be great as a General Contributor.");
            $('.result-text').text("Based upon your selections above, you should sign up to be a General Contributor.");
        }
        if (($('input[type="radio"][name="Q1"]').is(':checked')) && ($('input[type="radio"][name="Q2"]').is(':checked'))) {
            $("div.answer-block").show();
        }
    });
});
if ($('#vJBug-microsite').length) {
    jQuery.ajax({
        url: "https://issues.jboss.org/s/d670f033c7e5871b6e13374e1a8bdb0a-T/en_UKm1cjro/64026/82/1.4.27/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-UK&collectorId=4b53add2",
        type: "get",
        cache: true,
        dataType: "script"
    });
}
app.vjbug = {
    processDate: function () {
        var eventDate = document.getElementById('hiddenDate');
        if (eventDate === null)
            return;
        var eventDate = new Date(eventDate.innerHTML);
        var timezone = (String(String(eventDate).split("(")[1]).split(")")[0]);
        var d = eventDate.toLocaleDateString();
        var t = eventDate.toLocaleTimeString();
        t = t.replace(/\u200E/g, '');
        t = t.replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
        $('.event-day').text(d);
        $('.event-time').text(t);
        $('.event-timezone').text(timezone);
        var currentDate = new Date();
        if (currentDate > (eventDate.setMinutes(eventDate.getMinutes() + 90))) {
            $('.session-label').text('Our Most Recent Session...');
            $('.rsvp-button').hide();
        }
        else {
            $('.session-label').text('Next Live Session');
        }
    }
};
$(function () {
    app.vjbug.processDate();
});
var tab = document.querySelector('.drupal-header .tab');
if (tab !== null) {
    tab.addEventListener('click', function () {
        this.parentElement.classList.toggle('open');
    });
}
var app = app || {};
app.abTest = {
    swap: function (path, selector) {
        var url = app.baseUrl + '/' + path;
        $.get(url)
            .then(function (html) {
            $(selector).html(html);
        });
    }
};
app = window.app || {};
app.productForums = {};
app.productForums.fetch = function () {
    var productId = $('.product-forums').data('tags');
    $.getJSON('https://dcp2.jboss.org/v2/rest/search/forum_threads_by_project?project=' + productId, function (data) {
        if (data.hits && data.hits.hits) {
            app.productForums.render(data.hits.hits);
        }
        if (data.hits.total != 0) {
            document.getElementById("forumsContainer").style.display = "block";
        }
    });
};
app.productForums.render = function (materials) {
    var resultNum = 4;
    if ($('.multi-column').length) {
        resultNum = 8;
    }
    materials = materials.slice(0, resultNum);
    var html = [];
    materials.forEach(function (material) {
        var timeStamp = new Date(material.fields.sys_last_activity_date[0]);
        var formattedDate = moment(timeStamp).format('ll');
        var item = [
            '<li>',
            '<h5>',
            '<a href="' + material.fields.sys_url_view[0] + '" class="qtn-title" target="_blank" rel="noopener noreferrer">',
            material.fields.sys_title[0],
            '</a>',
            '</h5>',
            '<small>',
            '<span class="replies">' + material.fields.replies_count + ' replies</span>',
            '<span class="date right">Last reply on ' + formattedDate + '</span>',
            '</small>',
            '</li>'
        ].join('');
        html.push(item);
    });
    $('.product-forums-latest').html(html.join(''));
};
$(function () {
    var $latestResourceList = $('.product-forums-latest');
    if ($latestResourceList.length) {
        app.productForums.fetch();
    }
});
window.ATL_JQ_PAGE_PROPS = $.extend(window.ATL_JQ_PAGE_PROPS, {
    '03f305bd': {
        triggerFunction: function (showCollectorDialog) {
            jQuery("#rhdCustomTrigger").on("click", function (e) {
                e.preventDefault();
                showCollectorDialog();
            });
        }
    },
    '98c38440': {
        triggerFunction: function (showCollectorDialog) {
            jQuery("#errorPageCustomTrigger").on("click", function (e) {
                e.preventDefault();
                showCollectorDialog();
            });
        }
    }
});
app.adaptivePlaceholder = {
    changeFilledState: function () {
        var input = $(this);
        var value = input.val();
        if (value !== "" && value != undefined) {
            input.addClass('filled');
        }
        else {
            input.removeClass('filled');
        }
    }
};
$(function () {
    if ($('.rhd-adaptive-placeholder').length) {
        $('input, textarea, select').on('blur', app.adaptivePlaceholder.changeFilledState);
    }
});
(function () {
    $(function () {
        var referrerHTML = $('<section id="referral-alert"><div class="row alert-box alert-xl"><div class="row"><div class="icon"></div><div class="alert-content"><h3>You have been redirected from JBoss.org to Red Hat Developers.</h3><p>It' + "'" + 's true — JBoss Developer and Red Hat Developers are one and the same, and you can find all the great stuff you were looking for right here on <a href="https://developers.redhat.com/">developers.redhat.com.</a></p><a class="close"><i class="fas fa-times"></i></a></div></div></div></section>');
        var jbdReferrerHTML = $('<section id="referral-alert"><div class="row alert-box alert-xl"><div class="row"><div class="icon"></div><div class="alert-content"><h3>Welcome jboss.org members!</h3><p>It' + "'" + 's true — JBoss Developer and Red Hat Developer Program are joining forces. You can find all the great Middleware information that you were looking for right here on developers.redhat.com.<a href="https://developer.jboss.org/blogs/mark.little/2017/08/31/we-are-moving?_sscc=t"> Read more about this on our blog.</a></p></div></div></div></section>');
        if (isReferrer('jbd')) {
            switch (getPrimaryCategory()) {
                case 'middleware':
                    jbdReferrerHTML.insertBefore('main');
                    break;
                default:
                    referrerHTML.insertBefore('main');
                    break;
            }
            $('#referral-alert .close').on("click", function () {
                $('#referral-alert').addClass('hide');
            });
        }
    });
    function isReferrer(ref) {
        var referrer = false, url = window.location.href, querystring = url.split('?').pop(), qsList = [], vals = {};
        if (querystring !== url) {
            qsList = querystring.split('&');
            for (var i = 0, o = qsList.length; i < o; i++) {
                vals[qsList[i].split('=')[0]] = qsList[i].split('=')[1];
            }
            referrer = vals['referrer'] === ref;
        }
        return referrer;
    }
    function getPrimaryCategory() {
        var bc = window.location.href.replace(/^https?\:\/\/([a-z._-]|[0-9])+(:?[0-9]*)?(\/pr\/[0-9]+\/export)?\//, '').replace(/\/$/, '').split('?')[0].split('#')[0].split(/\//);
        return bc[0];
    }
}());
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}
function setCookie(name, value, expireDays) {
    var d = new Date();
    d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function getUserAgent() {
    var OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1)
        OSName = "MacOS";
    if (navigator.appVersion.indexOf("Linux") != -1)
        OSName = "RHEL";
    return OSName;
}
function setProductOSTab(systemType) {
    switch (systemType) {
        case 'Windows':
            return 'fndtn-windows';
            break;
        case 'MacOS':
            return 'fndtn-macos';
            break;
        case 'RHEL':
            return 'fndtn-rhel';
            break;
        default:
            return 'fndtn-windows';
    }
}
(function () {
    var productApp = angular.module('productApp', []), productOSHash = setProductOSTab(getUserAgent()), pathRegex = window.location.pathname.match(/.*\/products\/.*\/hello-world\/?/g);
    if (pathRegex) {
        window.location.hash = productOSHash;
        if (window.location.pathname != getCookie('product_path')) {
            setCookie('product_page_cookie', null, 1);
        }
        var tabList = document.querySelectorAll('[role="presentation"]');
        setCookie('product_path', window.location.pathname);
        for (var i = 0; i < tabList.length; i++) {
            var tabItem = tabList[i];
            tabItem.onclick = function (event) {
                var target = getEventTarget(event);
                setCookie('product_page_cookie', target.hash, 1);
            };
        }
        ;
        var productCookie = getCookie('product_page_cookie');
        if (productCookie && productCookie != 'null' && !window.location.href.contains('tcDownloadFile')) {
            window.location.hash = productCookie;
        }
    }
}());
$(function () {
    $("input[type='text']").on("click", function () {
        $(this).select();
    });
    $("div.more-info-link a").on("click", function (e) {
        e.preventDefault();
        var el = $("div.more-info[name=" + $(this).parent().attr('name') + "]");
        el.slideToggle();
    });
});
var verifyMemberApp = angular.module('member-verify', []);
verifyMemberApp.controller('VerifyCtrl', ['$scope', 'validateMember', function VerifyCtrl($scope, validateMember) {
        var eChk = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.isMember = false;
        $scope.emailChecked = false;
        $scope.checkMember = function (e) {
            if (typeof e === 'undefined' || e.keyCode == 13) {
                $scope.emailChecked = false;
                $scope.isMember = false;
                if (eChk.test($scope.email)) {
                    validateMember($scope.email).then(function (resp) {
                        if (resp.data.exists) {
                            $scope.isMember = true;
                        }
                        $scope.emailChecked = true;
                    }, function (resp) {
                        $scope.emailChecked = true;
                    });
                }
            }
        };
        $scope.goToRegister = function (e) {
            e.preventDefault();
            app.keycloak.login({ action: 'register', redirectUri: app.ssoConfig.confirmation });
        };
    }]);
verifyMemberApp.factory('validateMember', ['$http', function ($http) {
        return function validateMember(email) {
            return $http.post(app.ssoConfig.auth_url + 'realms/rhd/rhdtools/emailUsed', JSON.stringify({ email: email }));
        };
    }]);
jQuery(function () {
    var href = window.location.href.split('#')[0];
    var topicPages = ['/containers', '/devops', '/enterprise-java', '/iot', '/microservices', '/mobile', '/web-and-api-development', '/dotnet', '/security/'];
    var communityPages = ['/blog', '/events', '/projects', '/community/contributor'];
    var helpPages = ['/stack-overflow', '/forums', '/resources'];
    var tLength = topicPages.length;
    var cLength = communityPages.length;
    var hLength = helpPages.length;
    while (tLength--) {
        if (href.indexOf(topicPages[tLength]) !== -1 && href.indexOf('/products') < 0) {
            jQuery('.sub-nav-topics').addClass('active');
        }
    }
    while (cLength--) {
        if (href.indexOf(communityPages[cLength]) !== -1) {
            jQuery('.sub-nav-community').addClass('active');
        }
    }
    while (hLength--) {
        if (href.indexOf(helpPages[hLength]) !== -1) {
            jQuery('.sub-nav-help').addClass('active');
        }
    }
    if (href.indexOf('/products') !== -1) {
        jQuery('.sub-nav-products').addClass('active');
    }
    if (href.indexOf('/downloads') !== -1) {
        jQuery('.sub-nav-downloads').addClass('active');
    }
});
app = window.app || {};
app.middlewareBlog = {};
app.middlewareBlog.fetch = function () {
    $.getJSON(app.dcp.url.search + '/middlewareblogs?newFirst=true&from=0&size=2', function (data) {
        if (data.hits && data.hits.hits) {
            app.middlewareBlog.render(data.hits.hits);
        }
    });
};
app.middlewareBlog.render = function (materials) {
    var html = [];
    materials.forEach(function (material) {
        var timeStamp = new Date(material.fields.sys_created[0]);
        var timeAgo = $.timeago(timeStamp);
        var item = [
            '<li>',
            '<a href="' + material.fields.sys_url_view[0] + '" class="title">',
            material.fields.sys_title[0],
            '</a>',
            '<p class="blog-info">',
            '<span class="author">',
            material.fields.author[0],
            '</span>',
            '<span class="date">',
            timeAgo,
            '</span>',
            '</p>',
            '<p class="description">',
            material.fields.sys_description[0],
            '</p>',
            '</li>'
        ].join('');
        html.push(item);
    });
    $('.middleware-blog-latest').html(html.join(''));
};
$(function () {
    var $middlewareBlogResourceList = $('.middleware-blog-latest');
    if ($middlewareBlogResourceList.length) {
        app.middlewareBlog.fetch();
    }
});
$(function () {
    if ($('#scroll-to-top').length) {
        var showBtn = 200, scrollUp = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > showBtn) {
                $("a[href='#top']").fadeIn(500);
            }
            else {
                $("a[href='#top']").fadeOut(500);
            }
        };
        scrollUp();
        $(window).on('scroll', function () {
            scrollUp();
        });
        $("a[href='#top']").on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
});
$(function () {
    $(".rhd-menu .menu-item--expanded > a").each(function () {
        $(this).replaceWith("<h3 class='section-toggle'>" + $(this).text() + "</h3>");
    });
});
$(function () {
    $(".rhd-menu .menu-item--expanded h3").on("click", function () {
        var windowsize = document.body.clientWidth;
        if (windowsize <= 1170) {
            $(this).parent().toggleClass("collapsed");
        }
        else {
            return false;
        }
    });
});
var $window = $(window);
function checkWidth() {
    var windowsize = document.body.clientWidth;
    ;
    if (windowsize <= 1170) {
        $(".menu-item--expanded").addClass("collapsed");
    }
    else {
        $(".menu-item--expanded").removeClass("collapsed");
    }
}
;
checkWidth();
$(window).on("resize", checkWidth);
$(function () {
    $(document).click(function (event) {
        if (!$(event.target).closest("a.dropdwn-trigger").length) {
            if ($('ul.rh-user-menu').is(":visible")) {
                $('ul.rh-user-menu').hide();
            }
        }
    });
    $("a.dropdwn-trigger").on("click", function () {
        var width = $('ul.rh-universal-login').outerWidth();
        $('ul.rh-user-menu').width(width);
        $('ul.rh-user-menu').show();
    });
});
var g = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : this;
(function (e) { var t = function () { try {
    return !!Symbol.iterator;
}
catch (e) {
    return false;
} }; var n = t(); var r = function (e) { var t = { next: function () { var t = e.shift(); return { done: t === void 0, value: t }; } }; if (n) {
    t[Symbol.iterator] = function () { return t; };
} return t; }; var i = function () { var t = function (e) { Object.defineProperty(this, "_entries", { value: {} }); if (typeof e === "string") {
    if (e !== "") {
        e = e.replace(/^\?/, "");
        var n = e.split("&");
        var r;
        for (var i = 0; i < n.length; i++) {
            r = n[i].split("=");
            this.append(decodeURIComponent(r[0]), r.length > 1 ? decodeURIComponent(r[1]) : "");
        }
    }
}
else if (e instanceof t) {
    var o = this;
    e.forEach(function (e, t) { o.append(e, t); });
} }; var i = t.prototype; i.append = function (e, t) { if (e in this._entries) {
    this._entries[e].push(t.toString());
}
else {
    this._entries[e] = [t.toString()];
} }; i.delete = function (e) { delete this._entries[e]; }; i.get = function (e) { return e in this._entries ? this._entries[e][0] : null; }; i.getAll = function (e) { return e in this._entries ? this._entries[e].slice(0) : []; }; i.has = function (e) { return e in this._entries; }; i.set = function (e, t) { this._entries[e] = [t.toString()]; }; i.forEach = function (e, t) { var n; for (var r in this._entries) {
    if (this._entries.hasOwnProperty(r)) {
        n = this._entries[r];
        for (var i = 0; i < n.length; i++) {
            e.call(t, n[i], r, this);
        }
    }
} }; i.keys = function () { var e = []; this.forEach(function (t, n) { e.push(n); }); return r(e); }; i.values = function () { var e = []; this.forEach(function (t) { e.push(t); }); return r(e); }; i.entries = function () { var e = []; this.forEach(function (t, n) { e.push([n, t]); }); return r(e); }; if (n) {
    i[Symbol.iterator] = i.entries;
} i.toString = function () { var e = ""; this.forEach(function (t, n) { if (e.length > 0)
    e += "&"; e += encodeURIComponent(n) + "=" + encodeURIComponent(t); }); return e; }; e.URLSearchParams = t; }; if (!("URLSearchParams" in e)) {
    i();
} })(g);
(function (e) { var t = function () { try {
    var e = new URL("b", "http://a");
    e.pathname = "c%20d";
    return e.href === "http://a/c%20d" && e.searchParams;
}
catch (e) {
    return false;
} }; var n = function () { var t = e.URL; var n = function (e, t) { if (typeof e !== "string")
    throw new TypeError("Failed to construct 'URL': Invalid URL"); var n = document.implementation.createHTMLDocument(""); window.doc = n; if (t) {
    var r = n.createElement("base");
    r.href = t;
    n.head.appendChild(r);
} var i = n.createElement("a"); i.href = e; n.body.appendChild(i); i.href = i.href; if (i.protocol === ":" || !/:/.test(i.href)) {
    throw new TypeError("Invalid URL");
} Object.defineProperty(this, "_anchorElement", { value: i }); }; var r = n.prototype; var i = function (e) { Object.defineProperty(r, e, { get: function () { return this._anchorElement[e]; }, set: function (t) { this._anchorElement[e] = t; }, enumerable: true }); }; ["hash", "host", "hostname", "port", "protocol", "search"].forEach(function (e) { i(e); }); Object.defineProperties(r, { toString: { get: function () { var e = this; return function () { return e.href; }; } }, href: { get: function () { return this._anchorElement.href.replace(/\?$/, ""); }, set: function (e) { this._anchorElement.href = e; }, enumerable: true }, pathname: { get: function () { return this._anchorElement.pathname.replace(/(^\/?)/, "/"); }, set: function (e) { this._anchorElement.pathname = e; }, enumerable: true }, origin: { get: function () { return this._anchorElement.protocol + "//" + this._anchorElement.hostname + (this._anchorElement.port ? ":" + this._anchorElement.port : ""); }, enumerable: true }, password: { get: function () { return ""; }, set: function (e) { }, enumerable: true }, username: { get: function () { return ""; }, set: function (e) { }, enumerable: true }, searchParams: { get: function () { var e = new URLSearchParams(this.search); var t = this; ["append", "delete", "set"].forEach(function (n) { var r = e[n]; e[n] = function () { r.apply(e, arguments); t.search = e.toString(); }; }); return e; }, enumerable: true } }); n.createObjectURL = function (e) { return t.createObjectURL.apply(t, arguments); }; n.revokeObjectURL = function (e) { return t.revokeObjectURL.apply(t, arguments); }; e.URL = n; }; if (!t()) {
    n();
} if (e.location !== void 0 && !("origin" in e.location)) {
    var r = function () { return e.location.protocol + "//" + e.location.hostname + (e.location.port ? ":" + e.location.port : ""); };
    try {
        Object.defineProperty(e.location, "origin", { get: r, enumerable: true });
    }
    catch (t) {
        setInterval(function () { e.location.origin = r(); }, 100);
    }
} })(g);
var _createClass = function () { function e(e, t) { for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
} } return function (t, n, i) { return n && e(t.prototype, n), i && e(t, i), t; }; }();
function _classCallCheck(e, t) { if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function"); }
function _possibleConstructorReturn(e, t) { if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t; }
function _inherits(e, t) { if ("function" != typeof t && null !== t)
    throw new TypeError("Super expression must either be null or a function, not " + typeof t); e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t); }
var datetimeTemplate = document.createElement("template");
datetimeTemplate.innerHTML = "\n  <style>\n    :host {\n      display: inline;\n    }\n  </style>\n  <span></span>\n", window.ShadyCSS && ShadyCSS.prepareTemplate(datetimeTemplate, "rh-datetime");
var RHDatetime = function (e) { function t() { _classCallCheck(this, t); var e = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)); return e.attachShadow({ mode: "open" }), e.shadowRoot.appendChild(datetimeTemplate.content.cloneNode(!0)), e.type = e.getAttribute("type") || "local", e; } return _inherits(t, HTMLElement), _createClass(t, [{ key: "connectedCallback", value: function () { window.ShadyCSS && ShadyCSS.styleElement(this); } }, { key: "attributeChangedCallback", value: function (e, t, n) { this[e] = n; } }, { key: "_getOptions", value: function () { var e = { weekday: { short: "short", long: "long" }, day: { numeric: "numeric", "2-digit": "2-digit" }, month: { short: "short", long: "long" }, year: { numeric: "numeric", "2-digit": "2-digit" }, hour: { numeric: "numeric", "2-digit": "2-digit" }, minute: { numeric: "numeric", "2-digit": "2-digit" }, second: { numeric: "numeric", "2-digit": "2-digit" }, timeZoneName: { short: "short", long: "long" } }, t = {}; for (var n in e) {
            var i = e[n][this.getAttribute(n)];
            i && (t[n] = i);
        } return t; } }, { key: "_getTypeString", value: function () { var e = this._getOptions(), t = this.getAttribute("locale") || navigator.language, n = ""; switch (this.type) {
            case "local":
                n = new Intl.DateTimeFormat(t, e).format(this._datetime);
                break;
            case "relative":
                n = this._getTimeRelative(this._datetime - Date.now());
                break;
            default: n = this._datetime;
        } return n; } }, { key: "_getTimeRelative", value: function (e) { var t = e > 0 ? "until" : "ago", n = "just now", i = Math.round(Math.abs(e) / 1e3), a = Math.round(i / 60), r = Math.round(a / 60), o = Math.round(r / 24), s = Math.round(o / 30), u = Math.round(s / 12); return s >= 18 ? n = u + " years" : s >= 12 ? n = "a year" : o >= 45 ? n = s + " months" : o >= 30 ? n = "a month" : r >= 36 ? n = o + " days" : r >= 24 ? n = "a day" : a >= 90 ? n = r + " hours" : a >= 45 ? n = "an hour" : i >= 90 ? n = a + " minutes" : i >= 45 ? n = "a minute" : i >= 10 && (n = i + " seconds"), "just now" !== n ? n + " " + t : n; } }, { key: "datetime", get: function () { return this._datetime; }, set: function (e) { Date.parse(e) && (Date.parse(e) && this._datetime === Date.parse(e) || (this._datetime = Date.parse(e), this.shadowRoot.querySelector("span").innerText = window.Intl ? this._getTypeString() : e)); } }, { key: "type", get: function () { return this._type; }, set: function (e) { this._type !== e && (this._type = e); } }], [{ key: "observedAttributes", get: function () { return ["datetime", "type"]; } }]), t; }();
window.customElements.define("rh-datetime", RHDatetime);
$(document).ready(function () {
    $("a[href$='.pdf']").each(function () {
        var ignoredDomains = ['developers.redhat.com/download-manager/', 'jboss.org/download-manager/'];
        for (i = 0; i < ignoredDomains.length; i++) {
            if (this.href.indexOf(ignoredDomains[i]) != -1) {
                return true;
            }
        }
        if (this.href.indexOf(location.hostname) == -1) {
            $(this).append(" <i class='far fa-file-pdf'></i>");
            $(this).on("click", function () { return true; });
            $(this).attr({ target: "_blank" });
            $(this).trigger("click");
        }
    });
});
var showMoreText = $('.show-more-text').text();
var charCount = $('.show-more-text').attr('data-count');
var maxWidth = $('.show-more-text').attr('data-max-width');
if (showMoreText.length < charCount) {
    $('a.show-more').hide();
}
$('.show-more').on('click', function () {
    var x = $(this);
    var $showMoreBtn = x.find('span');
    var $showMoreContent = x.prev();
    $showMoreContent.toggleClass('open');
    return $showMoreBtn.toggle();
});
app = window.app || {};
app.relatedContent = {};
app.relatedContent.fetch = function () {
    $("div.video-related-content.video-related-content-list").addClass('loading');
    var contentCount = $('#video-related-cont').find('.field--name-field-related-content .related-content-card').length;
    contentCount = 4 - contentCount;
    var typeString = '&sys_type=cheatsheet&sys_type=video&sys_type=book&sys_type=article&sys_type=blogpost';
    var tags = ($('#video-related-cont').data('tags') || "");
    var tagsString = "";
    try {
        tags = JSON.parse(tags.replace(/'/g, "\""));
    }
    catch (e) {
        tags = "";
    }
    if (tags) {
        for (var i = 0; i < tags.length; i++) {
            if (i > 0) {
                tags[i] = "&tag=" + tags[i];
            }
            tagsString += (tags[i]).toLowerCase();
        }
    }
    $.getJSON(app.dcp.url.search + '/developer_materials?tags_or_logic=true&filter_out_excluded=true&size10=true&tag=' + tagsString + typeString, function (data) {
        if (data.hits && data.hits.hits) {
            data.hits.hits.length = contentCount;
            app.relatedContent.render(data.hits.hits);
        }
    });
};
app.relatedContent.render = function (materials) {
    var html = [];
    materials.forEach(function (material) {
        var type = material.fields.sys_type[0];
        var canDisplay = material.fields.sys_title && material.fields.sys_description && material.fields.sys_description.length > 0;
        if (canDisplay) {
            if (material.fields.sys_type[0] == 'blogpost') {
                if (material.fields.sys_url_view[0].startsWith('https://developers.redhat.com/blog') || material.fields.sys_url_view[0].startsWith('https://developers.redhat.com/blog')) {
                    material.fields.sys_url_view[0] = material.fields.sys_url_view[0];
                }
                else if (material.fields.sys_url_view[0].match(/http(s?):\/\/developerblog.redhat.com\/.*/g)) {
                    material.fields.sys_url_view[0] = material.fields.sys_url_view[0].replace(/http(s?):\/\/developerblog.redhat.com\//, 'https://developers.redhat.com/blog/');
                }
                else {
                    var post_id = /-(.+)/.exec(material._id)[1];
                    material.fields.sys_url_view[0] = "//planet.jboss.org/post/" + post_id;
                }
            }
            switch (material.fields.sys_type[0]) {
                case 'blogpost':
                    material.fields.sys_type[0] = 'Blog Post';
                    break;
                case 'jbossdeveloper_archetype':
                    material.fields.sys_type[0] = 'Archetype';
                    break;
                case 'jbossdeveloper_bom':
                    material.fields.sys_type[0] = 'Bom';
                    break;
                case 'cheatsheet':
                    material.fields.sys_type[0] = 'Cheat Sheet';
                    break;
                case 'forumthread':
                    material.fields.sys_type[0] = 'Forum Thread';
                    break;
                case 'jbossdeveloper_example' || 'quickstart_early_access':
                    material.fields.sys_type[0] = 'Demo';
                    break;
                case 'solution':
                    material.fields.sys_type[0] = 'Article';
                    break;
                case 'stackoverflow_thread':
                    material.fields.sys_type[0] = 'Stack Overflow';
                    break;
                case 'webpage' || 'website':
                    material.fields.sys_type[0] = 'Web Page';
                    break;
            }
            var title = material.fields.sys_title[0];
            title = title.replace("| Red Hat Developer Program", "");
            var item = [
                '<div class="large-6 columns related-content-card">',
                '<h6>Related ' + material.fields.sys_type + '</h6>',
                '<h4><span class="line-clamp-2">' + title + '</span></h4>',
                '<p class="description">',
                '<a class="light-cta" href="' + material.fields.sys_url_view[0] + '">Read More</a>',
                '</p>',
                '</div>'
            ].join('');
            html.push(item);
            $("div.video-related-content.video-related-content-list").removeClass('loading');
        }
    });
    $('.video-related-content-list').html(html.join(''));
    var $clampItems = $('.video-related-content-list').find(".line-clamp-2");
    $clampItems.each(function () {
        var $tmpItem = $(this);
        $clamp($tmpItem.get(0), { clamp: 2, useNativeClamp: true });
    });
};
$(function () {
    var $videoRelatedContentList = $('.video-related-content-list');
    if ($videoRelatedContentList.length) {
        app.relatedContent.fetch();
    }
});
