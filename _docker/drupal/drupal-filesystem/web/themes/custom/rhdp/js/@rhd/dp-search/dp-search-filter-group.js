System.register(["../../@fortawesome/fontawesome-svg-core/index.es.js", "../../@fortawesome/pro-solid-svg-icons/index.es.js", "../../@patternfly/pfelement/pfelement.js"], function (exports_1, context_1) {
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
    var index_es_js_1, index_es_js_2, pfelement_js_1, chevronRightIcon, DPSearchFilterGroup;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_es_js_1_1) {
                index_es_js_1 = index_es_js_1_1;
            },
            function (index_es_js_2_1) {
                index_es_js_2 = index_es_js_2_1;
            },
            function (pfelement_js_1_1) {
                pfelement_js_1 = pfelement_js_1_1;
            }
        ],
        execute: function () {
            index_es_js_1.library.add(index_es_js_2.faChevronRight);
            chevronRightIcon = index_es_js_1.icon(index_es_js_2.faChevronRight).html;
            DPSearchFilterGroup = (function (_super) {
                __extends(DPSearchFilterGroup, _super);
                function DPSearchFilterGroup() {
                    var _this = _super.call(this, DPSearchFilterGroup, { delayRender: true }) || this;
                    _this._items = [];
                    _this._toggle = false;
                    _this._more = false;
                    return _this;
                }
                Object.defineProperty(DPSearchFilterGroup.prototype, "html", {
                    get: function () {
                        return "\n        <style>\n            :host {\n                cursor: pointer;\n                display: block;\n                margin: 0 1em .5em;\n                position: relative;\n            }\n\n            .secondary {\n                display: none;\n            }\n\n            h6 {\n                border-bottom: 1px solid #8c8f91;\n                font-weight: 600;\n                margin: .5em 0;\n                padding-bottom: .3em;\n                text-transform: uppercase;\n                color: #242424;\n            }\n\n            .toggle {\n                float: right;\n                font-weight: 600;\n            }\n\n            .toggle.expand {\n                transform: rotate(90deg);\n                transition: .1s ease-in-out;\n            }\n\n            a.more {\n                color: #06c;\n                cursor: pointer;\n                text-decoration: none;\n                font-size: 14px;\n                display: block;\n                margin-bottom: 10px;\n                margin-left: 2.3em;\n                margin-top: 10px;\n            }\n            a.more:hover {\n                color: #004c98;\n            }\n            .hide, a.more.hide, [data-hide] {\n                display: none;\n            }\n\n            " + index_es_js_1.dom.css() + "\n\n        </style>\n        <h6 class=\"showFilters heading\"><span class=\"group-name\">" + this.name + "</span><span class=\"toggle\">" + chevronRightIcon + "</span></h6>\n        <div class=\"group\">\n            <div class=\"primary\">\n                <slot></slot>\n            </div>\n            <div class=\"secondary\">\n                <slot name=\"secondary\"></slot>\n            </div>\n            <a href=\"#\" class=\"more\" data-hide>Show More</a>\n        </div>";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchFilterGroup, "tag", {
                    get: function () { return 'dp-search-filter-group'; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchFilterGroup.prototype, "key", {
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
                Object.defineProperty(DPSearchFilterGroup.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (val) {
                        if (this._name === val)
                            return;
                        this._name = val;
                        if (this.shadowRoot.querySelector('.group-name')) {
                            this.shadowRoot.querySelector('.group-name').innerHTML = this._name;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchFilterGroup.prototype, "items", {
                    get: function () {
                        return this._items;
                    },
                    set: function (val) {
                        if (this._items === val)
                            return;
                        this._items = val;
                        if (this._items.length > 5) {
                            if (!this.shadowRoot.querySelector('.more')) {
                                this.shadowRoot.querySelector(".moreBtn").removeAttribute('data-hide');
                            }
                        }
                        else {
                            if (this.shadowRoot.querySelector('.more')) {
                                this.shadowRoot.removeChild(this.shadowRoot.lastChild);
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchFilterGroup.prototype, "toggle", {
                    get: function () {
                        return this._toggle;
                    },
                    set: function (val) {
                        if (this._toggle === val)
                            return;
                        this._toggle = val;
                        this.shadowRoot.querySelector('.group').className = this.toggle ? 'group' : 'group hide';
                        this.shadowRoot.querySelector('.toggle').className = this.toggle ? 'toggle expand' : 'toggle';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchFilterGroup.prototype, "more", {
                    get: function () {
                        return this._more;
                    },
                    set: function (val) {
                        if (this._more === val)
                            return;
                        this._more = val;
                        this.shadowRoot.querySelector('.more')['innerText'] = this.more ? 'Show Less' : 'Show More';
                        this.shadowRoot.querySelector('.secondary')['style'].display = this.more ? 'block' : 'none';
                    },
                    enumerable: true,
                    configurable: true
                });
                DPSearchFilterGroup.prototype.connectedCallback = function () {
                    var _this = this;
                    _super.prototype.connectedCallback.call(this);
                    _super.prototype.render.call(this);
                    this.shadowRoot.querySelector('h6').addEventListener('click', function (e) {
                        e.preventDefault();
                        _this.toggle = !_this.toggle;
                    });
                    this.shadowRoot.querySelector('.group').addEventListener('click', function (e) {
                        if (e.target['className'].indexOf('more') > -1) {
                            e.preventDefault();
                            _this.more = !_this.more;
                        }
                    });
                    var slotItems = this.querySelectorAll('dp-search-filter-item[slot]').length;
                    if (slotItems === 0) {
                        this.shadowRoot.querySelector('.more').setAttribute('data-hide', '');
                    }
                    this.toggle = true;
                };
                Object.defineProperty(DPSearchFilterGroup, "observedAttributes", {
                    get: function () {
                        return ['name', 'key', 'toggle', 'items', 'more'];
                    },
                    enumerable: true,
                    configurable: true
                });
                DPSearchFilterGroup.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                return DPSearchFilterGroup;
            }(pfelement_js_1.default));
            exports_1("default", DPSearchFilterGroup);
            pfelement_js_1.default.create(DPSearchFilterGroup);
        }
    };
});
