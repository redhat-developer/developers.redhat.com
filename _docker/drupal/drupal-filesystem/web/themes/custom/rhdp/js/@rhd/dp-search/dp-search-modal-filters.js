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
    var pfelement_js_1, DPSearchModalFilters;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pfelement_js_1_1) {
                pfelement_js_1 = pfelement_js_1_1;
            }
        ],
        execute: function () {
            DPSearchModalFilters = (function (_super) {
                __extends(DPSearchModalFilters, _super);
                function DPSearchModalFilters() {
                    var _this = _super.call(this, DPSearchModalFilters, { delayRender: true }) || this;
                    _this._type = '';
                    _this._title = 'Filter By';
                    _this._toggle = false;
                    _this._toggleModal = _this._toggleModal.bind(_this);
                    _this._clearFilters = _this._clearFilters.bind(_this);
                    return _this;
                }
                Object.defineProperty(DPSearchModalFilters.prototype, "html", {
                    get: function () {
                        return "\n        <style>\n            :host {\n                display: none;\n                align-self: flex-start;\n                border: none;\n                flex: none;\n                float: left;\n                margin: 0 0 1.3em;\n            }\n            .cover {\n                background: rgba(0,0,0,.5);\n                border: none;\n                display: flex;\n                flex-direction: column;\n                height: 100%;\n                padding-top: 0;\n                position: absolute;\n                right: 100%;\n                top: 0;\n                width: 100%;\n                z-index: 99;\n                transform: translateX(100%);\n                transition: .5s ease-in-out;\n            }\n            .title {\n                flex: 0 0 40px;\n                order: 1;\n                vertical-align: middle;\n                background: #e6e7e8;\n                color: #000;\n                font-weight: 600;\n                padding: .5em 1em;\n                text-transform: uppercase;\n            }\n            .cancel {\n                color: #06c;\n                display: block;\n                float: right;\n                font-size: 14px;\n                cursor: pointer;\n                text-decoration: none;\n            }\n            .groups {\n                background: #fff;\n                flex: 1 1 100%;\n                order: 1;\n                overflow: auto;\n                padding-bottom: 30px;\n            }\n            .footer {\n                background-color: #000;\n                display: block;\n                flex: 1 0 auto;\n                height: 70px;\n                order: 2;\n                padding: 1em;\n                text-align: center;\n            }\n            .clearFilters {\n                background-color: #fff;\n                border: 1px solid #06c;\n                color: #06c;\n                display: inline-block;\n                font-weight: 600;\n                line-height: 1.44;\n                margin-right: 1em;\n                padding: 8px 20px;\n            }\n            .clearFilters:hover {\n                background-color: #06c;\n                color: #fff;\n            }\n            .applyFilters {\n                background: #c00;\n                color: #fff;\n                font-weight: 600;\n                padding: 10px 25px;\n                text-transform: uppercase;\n                transition: background .2s ease-in 0s;\n                cursor: pointer;\n                text-decoration: none;\n            }\n        </style>\n        <div class=\"cover\" id=\"cover\">\n            <div class=\"title\">" + this.title + " <a href=\"#\" class=\"cancel\" id=\"cancel\">Close</a></div>\n            <div class=\"groups\">\n            <slot></slot>\n            </div>\n            <div class=\"footer\">\n            <a href=\"#\" class=\"clearFilters\">Clear Filters</a> \n            <a href=\"#\" class=\"applyFilters\">Apply</a>\n            </div>\n        </div>";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchModalFilters, "tag", {
                    get: function () { return 'dp-search-modal-filters'; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchModalFilters.prototype, "type", {
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
                Object.defineProperty(DPSearchModalFilters.prototype, "title", {
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
                Object.defineProperty(DPSearchModalFilters.prototype, "filters", {
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
                Object.defineProperty(DPSearchModalFilters.prototype, "toggle", {
                    get: function () {
                        return this._toggle;
                    },
                    set: function (val) {
                        if (this._toggle === val)
                            return;
                        this._toggle = val;
                        if (this._toggle) {
                            this.shadowRoot.querySelector('.cover').className = 'cover modal';
                            window.scrollTo(0, 0);
                            document.body.style.overflow = 'hidden';
                            this.style.height = window.innerHeight + 'px';
                            this.style.display = 'block';
                        }
                        else {
                            this.shadowRoot.querySelector('.cover').className = 'cover';
                            document.body.style.overflow = 'auto';
                            this.style.display = 'none';
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                DPSearchModalFilters.prototype.connectedCallback = function () {
                    var _this = this;
                    _super.prototype.connectedCallback.call(this);
                    this.addGroups();
                    this.shadowRoot.addEventListener('click', function (e) {
                        var evt = { bubbles: true, composed: true };
                        switch (e.target['className']) {
                            case 'showBtn':
                            case 'cancel':
                            case 'applyFilters':
                                e.preventDefault();
                                _this.dispatchEvent(new CustomEvent('toggle-modal', evt));
                                break;
                            case 'clearFilters':
                                e.preventDefault();
                                _this.dispatchEvent(new CustomEvent('clear-filters', evt));
                                break;
                            case 'more':
                                e.preventDefault();
                                break;
                        }
                    });
                    top.addEventListener('toggle-modal', this._toggleModal);
                    _super.prototype.render.call(this);
                };
                Object.defineProperty(DPSearchModalFilters, "observedAttributes", {
                    get: function () {
                        return ['type', 'title', 'toggle'];
                    },
                    enumerable: true,
                    configurable: true
                });
                DPSearchModalFilters.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                DPSearchModalFilters.prototype.addGroups = function () {
                    var groups = top.document.querySelector('dp-search-filters').children;
                    for (var i = 0; i < groups.length; i++) {
                        var n = groups[i].cloneNode(true);
                        this.appendChild(n);
                    }
                };
                DPSearchModalFilters.prototype._toggleModal = function (e) {
                    this.toggle = !this.toggle;
                };
                DPSearchModalFilters.prototype.applyFilters = function () {
                    var evt = {
                        bubbles: true,
                        composed: true
                    };
                    this.dispatchEvent(new CustomEvent('apply-filters', evt));
                };
                DPSearchModalFilters.prototype._clearFilters = function (e) {
                    this.style.display = 'none';
                };
                return DPSearchModalFilters;
            }(pfelement_js_1.default));
            exports_1("default", DPSearchModalFilters);
            pfelement_js_1.default.create(DPSearchModalFilters);
        }
    };
});
