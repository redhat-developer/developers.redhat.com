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
    var pfelement_js_1, DPSearchSortPage;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pfelement_js_1_1) {
                pfelement_js_1 = pfelement_js_1_1;
            }
        ],
        execute: function () {
            DPSearchSortPage = (function (_super) {
                __extends(DPSearchSortPage, _super);
                function DPSearchSortPage() {
                    var _this = _super.call(this, DPSearchSortPage, { delayRender: true }) || this;
                    _this._sortChange = _this._sortChange.bind(_this);
                    return _this;
                }
                Object.defineProperty(DPSearchSortPage.prototype, "html", {
                    get: function () {
                        return "\n        <style>\n        :host {\n            display: block;\n            border-bottom: 1px solid #ccc;\n            margin: 0 0 1em 0;\n            padding-bottom: 1em;\n        }\n\n        select { \n            width: auto;\n            -webkit-appearance: none!important;\n            -webkit-border-radius: 0;\n            background-color: #fafafa;\n            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjEyIiB3aWR0aD0iMjQiIGhlaWdodD0iMyIgdmlld0JveD0iMCAwIDYgMyI+PHBhdGggZD0iTTUuOTkyIDBsLTMgMy0zLTN6Ii8+PC9zdmc+);\n            background-position: 100%;\n            background-repeat: no-repeat;\n            border: 1px solid #ccc;\n            border-radius: 0;\n            color: rgba(0,0,0,.75);\n            font-family: Overpass,Open Sans,Arial,Helvetica,sans-serif;\n            font-size: .875rem;\n            height: 2.3125rem;\n            line-height: normal;\n            padding: .5rem 20px .5rem .5rem;\n        }\n        \n        select:focus, select:active {\n            outline:0;\n            border:0;\n            outline: 1px solid white;\n            outline-offset: -2px;\n        }\n    \n        \n        .tight {\n            display: none;\n        }\n\n        .tight .button {\n            background: #ccc;\n            text-decoration: none;\n            border: 0;\n            font-weight: 600;\n            font-size: 16px;\n            padding: 9px 25px;\n            transition: background .2s ease-in 0s;\n            line-height: 1.2em;\n            cursor: pointer;\n            position: relative;\n            text-align: center;\n            color: #333; \n            width: 100%;\n            display: block;\n            width: 150px;\n            margin-right: 2em;\n        }\n    \n        @media only screen and (max-width: 768px) {\n            :host {\n                display:none;\n                align-self: flex-end; \n                border-bottom: none;\n            }\n            span { display: none; }\n            select { \n                width: 150px; \n                text-align: center;\n                text-align-last: center;\n                font-weight: 600;\n                height: auto;\n                border: 1px solid #06c;\n                line-height: 1.44;\n                background-color: transparent;\n                padding: 8px 0;\n                color: #06c;\n                font-size: 16px;\n                position: relative;\n            }\n    \n            select:hover, select:focus {\n                background-color: #06c;\n                color: #fff;\n            }\n        \n            .roomy {\n                display: none;\n            }\n            .tight { \n                display: block; \n            }\n            .clear {\n                padding: 0;\n                margin: 0; \n                border: 1px solid white;\n                width: auto;\n                font-weight: bold;\n            }\n        }\n        \n        @media only screen and (max-width: 365px) {\n            :host {\n                position: relative;\n                left: 0; top: 0;\n                margin-left: 0px;\n            }\n        }\n        </style>\n    <span>Sort results by</span>\n    <select>\n        <option value=\"relevance\">Relevance</option>\n        <option value=\"most-recent\">Most Recent</option>\n    </select>";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchSortPage, "tag", {
                    get: function () { return 'dp-search-sort-page'; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchSortPage.prototype, "sort", {
                    get: function () {
                        return this._sort;
                    },
                    set: function (val) {
                        if (this._sort === val)
                            return;
                        this._sort = val;
                        this.setAttribute('sort', this._sort);
                        this.shadowRoot.querySelector('select').value = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                DPSearchSortPage.prototype.connectedCallback = function () {
                    _super.prototype.connectedCallback.call(this);
                    _super.prototype.render.call(this);
                    top.addEventListener('params-ready', this._sortChange);
                    top.addEventListener('sort-change', this._sortChange);
                    this.shadowRoot.querySelector('select').onchange = this._sortChange;
                };
                Object.defineProperty(DPSearchSortPage, "observedAttributes", {
                    get: function () {
                        return ['sort'];
                    },
                    enumerable: true,
                    configurable: true
                });
                DPSearchSortPage.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                DPSearchSortPage.prototype._sortChange = function (e) {
                    if (e.detail && e.detail.sort) {
                        this.sort = e.detail.sort;
                    }
                    else {
                        if (e.target['options'] && typeof e.target['selectedIndex'] !== 'undefined') {
                            this.sort = e.target['options'][e.target['selectedIndex']].value;
                            var evt = {
                                detail: {
                                    sort: this.sort
                                },
                                bubbles: true,
                                composed: true
                            };
                            this.dispatchEvent(new CustomEvent('sort-change', evt));
                        }
                    }
                };
                return DPSearchSortPage;
            }(pfelement_js_1.default));
            exports_1("default", DPSearchSortPage);
            pfelement_js_1.default.create(DPSearchSortPage);
        }
    };
});
