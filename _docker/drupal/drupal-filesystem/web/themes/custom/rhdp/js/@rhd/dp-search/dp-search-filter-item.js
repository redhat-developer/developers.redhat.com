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
    var pfelement_js_1, DPSearchFilterItem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pfelement_js_1_1) {
                pfelement_js_1 = pfelement_js_1_1;
            }
        ],
        execute: function () {
            DPSearchFilterItem = (function (_super) {
                __extends(DPSearchFilterItem, _super);
                function DPSearchFilterItem() {
                    var _this = _super.call(this, DPSearchFilterItem, { delayRender: true }) || this;
                    _this._active = false;
                    _this._inline = false;
                    _this._bounce = false;
                    _this._checkParams = _this._checkParams.bind(_this);
                    _this._clearFilters = _this._clearFilters.bind(_this);
                    _this._checkChange = _this._checkChange.bind(_this);
                    _this._updateFacet = _this._updateFacet.bind(_this);
                    _this._updateName = _this._updateName.bind(_this);
                    return _this;
                }
                Object.defineProperty(DPSearchFilterItem.prototype, "html", {
                    get: function () {
                        return "\n        <style>\n        .list {\n            clear: left;\n            cursor: pointer;\n            display: flex;\n            flex-direction: row;\n            font-size: 14px;\n            height: auto;\n            line-height: 1.25em;\n            padding: .5em .5em 0 1.1em;\n        }\n        span { display: none; }\n        input[type=checkbox] {\n            flex: 0 0 auto;\n            margin: .25em 5px 0 0;\n            order: 0;\n        }\n        label {\n            margin-left: 0;\n            color: #4d4d4d;\n            cursor: pointer;\n            display: block;\n            font-size: .875rem;\n            font-weight: 400;\n            line-height: 1.5;\n            margin-bottom: 0;\n        }\n        input[type=checkbox]+label,\n        input[type=radio]+label {\n            display: inline-block;\n            margin-bottom: 0;\n            margin-left: .5rem;\n            margin-right: 1rem;\n            vertical-align: baseline;\n        }\n\n        @media only screen and (max-width: 768px) {\n            .list {\n                line-height: 25px;\n                padding-left: 0;\n                font-size: 16px;\n            }\n            \n            span { display: inline; font-size: 16px; }\n            \n            input[type=checkbox]{\n                height: 0;\n                width: 0;\n                visibility: hidden;\n                order: 2;\n            }\n\n            label {\n                cursor: pointer;\n                text-indent: -1200px;\n                width: 50px;\n                height: 25px;\n                background: grey;\n                display: block;\n                border-radius: 25px;\n                position: absolute;\n                right: 0;\n            }\n    \n            label:after {\n                content: '';\n                position: absolute;\n                top: 1px;\n                left: 1px;\n                width: 23px;\n                height: 23px;\n                background: #fff;\n                border-radius: 20px;\n                transition: 0.3s;\n            }\n    \n            input:checked + label {\n                background: #08c0fc;;\n            }\n    \n            input:checked + label:after  {\n                left: calc(100% - 1px);\n                transform: translateX(-100%);\n            }\n    \n            label:active:after {\n                width: 33px;\n            }\n        }\n        </style>\n        <div class=\"list\">\n            <span>" + this.name + "</span>\n            <input type=\"checkbox\" " + (this.active ? 'checked' : '') + " id=\"filter-item-" + this.key + "\" value=\"" + this.key + "\">\n            <label for=\"filter-item-" + this.key + "\"><slot></slot></label>\n        </div>";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchFilterItem, "tag", {
                    get: function () { return 'dp-search-filter-item'; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchFilterItem.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (val) {
                        if (this._name === val)
                            return;
                        this._name = val;
                        this.setAttribute('name', this._name);
                        if (this.shadowRoot.querySelector('span')) {
                            this.shadowRoot.querySelector('span').innerText = this._name;
                        }
                        this.innerHTML = this._name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchFilterItem.prototype, "key", {
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
                Object.defineProperty(DPSearchFilterItem.prototype, "facet", {
                    get: function () {
                        return this._facet ? this._facet : this.group;
                    },
                    set: function (val) {
                        if (this._facet === val)
                            return;
                        this._facet = val;
                        this.setAttribute('facet', this._facet);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchFilterItem.prototype, "group", {
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
                Object.defineProperty(DPSearchFilterItem.prototype, "bounce", {
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
                Object.defineProperty(DPSearchFilterItem.prototype, "active", {
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
                            var chkbox = this.shadowRoot.querySelector('input');
                            if (this._active) {
                                this.setAttribute('active', '');
                            }
                            else {
                                this.removeAttribute('active');
                            }
                            if (chkbox) {
                                chkbox.checked = this._active;
                            }
                            if (!this.bounce) {
                                var evt = { detail: { facet: this }, bubbles: true, composed: true };
                                this.bounce = true;
                                this.dispatchEvent(new CustomEvent('filter-item-change', evt));
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPSearchFilterItem.prototype, "value", {
                    get: function () {
                        return this._value.split(',');
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
                DPSearchFilterItem.prototype.connectedCallback = function () {
                    _super.prototype.connectedCallback.call(this);
                    _super.prototype.render.call(this);
                    this.shadowRoot.addEventListener('change', this._updateFacet);
                    top.addEventListener('filter-item-change', this._checkChange);
                    top.addEventListener('params-ready', this._checkParams);
                    top.addEventListener('clear-filters', this._clearFilters);
                    top.addEventListener('search-complete', this._updateName);
                };
                Object.defineProperty(DPSearchFilterItem, "observedAttributes", {
                    get: function () {
                        return ['name', 'active', 'value', 'inline', 'key', 'group', 'facet'];
                    },
                    enumerable: true,
                    configurable: true
                });
                DPSearchFilterItem.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                };
                DPSearchFilterItem.prototype._updateName = function (e) {
                    if (e.detail && e.detail.facets && e.detail.facets.facet_fields) {
                        var facets = e.detail.facets.facet_fields;
                        if (facets[this.group] && facets[this.group].indexOf(this.value[0]) >= 0) {
                            if (this.name.indexOf('(') > 0) {
                                this.name = this.name.replace(/\([0-9]+\)/, "(" + facets[this.group][facets[this.group].indexOf(this.value[0]) + 1] + ")");
                            }
                            else {
                                this.name = this.name + " (" + facets[this.group][facets[this.group].indexOf(this.value[0]) + 1] + ")";
                            }
                        }
                        else if (facets[this.facet] && facets[this.facet].indexOf(this.value[0]) >= 0) {
                            if (this.name.indexOf('(') > 0) {
                                this.name = this.name.replace(/\([0-9]+\)/, "(" + facets[this.facet][facets[this.facet].indexOf(this.value[0]) + 1] + ")");
                            }
                            else {
                                this.name = this.name + " (" + facets[this.facet][facets[this.facet].indexOf(this.value[0]) + 1] + ")";
                            }
                        }
                        else {
                            this.name = this.name.replace(/\([0-9]+\)/, '');
                        }
                    }
                    else {
                        this.name = this.name.replace(/\([0-9]+\)/, '');
                    }
                };
                DPSearchFilterItem.prototype._updateFacet = function (e) {
                    this.bounce = false;
                    this.active = !this.active;
                };
                DPSearchFilterItem.prototype._checkParams = function (e) {
                    if (e.detail && e.detail.filters) {
                        this.bounce = true;
                        if (e.detail.filters.has(this.group) && e.detail.filters.get(this.group).has(this.key)) {
                            this.active = true;
                        }
                    }
                };
                DPSearchFilterItem.prototype._checkChange = function (e) {
                    if (e.detail && e.detail.facet) {
                        if (this.group === e.detail.facet.group && this.key === e.detail.facet.key) {
                            this.active = e.detail.facet.active;
                        }
                    }
                };
                DPSearchFilterItem.prototype._clearFilters = function (e) {
                    this.bounce = true;
                    this.active = false;
                };
                return DPSearchFilterItem;
            }(pfelement_js_1.default));
            exports_1("default", DPSearchFilterItem);
            pfelement_js_1.default.create(DPSearchFilterItem);
        }
    };
});
