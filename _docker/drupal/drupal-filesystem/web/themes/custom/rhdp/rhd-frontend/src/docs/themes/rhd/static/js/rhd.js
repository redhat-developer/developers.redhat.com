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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
System.register("@rhelements/rhelement", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RHElement;
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
    var __moduleName = context_2 && context_2.id;
    var rhelement_1, RHDPAlert;
    return {
        setters: [
            function (rhelement_1_1) {
                rhelement_1 = rhelement_1_1;
            }
        ],
        execute: function () {
            RHDPAlert = (function (_super) {
                __extends(RHDPAlert, _super);
                function RHDPAlert() {
                    var _this = _super.call(this, 'rhdp-alert') || this;
                    _this.template = function (el) {
                        var tpl = document.createElement("template");
                        tpl.innerHTML = "\n        <style>\n        :host {\n            color: #363636 !important;\n            display: flex;\n            flex-direction: " + (el.size !== 'xl' ? 'row' : 'column') + ";\n            border-width: 1px;\n            border-style: solid;\n            padding: 10px 20px;\n            margin: 1.5em auto;\n            font-size: 1em;\n            background-color: " + el.background + ";\n            border-color: " + el.border + ";\n            line-height: 24px;\n            vertical-align: middle;\n        }\n\n        h3, strong {\n            margin-bottom: 0;\n            display: inline\n        }\n\n        strong { margin-right: .5em; }\n          \n        img {\n            flex: 0 0 1.5em;\n            height: 1.5em;\n            display: block;\n            position: relative;\n            margin-right: 10px;\n            " + (el.size !== 'xl' ? '' : "\n            display: inline;\n            float: left;\n            margin-left: 1em;\n            ") + "\n        }\n        \n        a.close {\n            top: 1em;\n            margin-right: 5px;\n            background-repeat: no-repeat;\n            height: 24px;\n            width: 24px;\n            color: #3b6e90;\n        }\n        \n        </style>\n        <img src=\"" + el.icon + "\">\n        " + (el.size === 'xl' ? '<h3>' : '') + "\n        " + (el.heading ? "<strong>" + el.heading + "</strong>" : '') + "\n        " + (el.size === 'xl' ? '</h3>' : '') + "\n        <slot></slot>\n        " + (el.size === 'xl' ? "<a class=\"close\"><i class=\"fas fa-times\"</a>" : '');
                        return tpl;
                    };
                    _this._type = 'info';
                    _this._icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_info.svg';
                    _this._background = '#dcedf8';
                    _this._border = '#87aac1';
                    _this.text = _this.innerHTML;
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
                                this.background = '#e9f4e9';
                                this.border = '#8db28a';
                                break;
                            case 'warning':
                                this.icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_warning.svg';
                                this.background = '#fdf2e5';
                                this.border = '#deb142';
                                break;
                            case 'error':
                                this.icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_error.svg';
                                this.background = '#ffe6e6';
                                this.border = '#d8aaab';
                                break;
                            case 'info':
                            default:
                                this.icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_info.svg';
                                this.background = '#dcedf8';
                                this.border = '#87aac1';
                                break;
                        }
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
                Object.defineProperty(RHDPAlert.prototype, "background", {
                    get: function () {
                        return this._background;
                    },
                    set: function (val) {
                        if (this._background === val)
                            return;
                        this._background = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPAlert.prototype, "border", {
                    get: function () {
                        return this._border;
                    },
                    set: function (val) {
                        if (this._border === val)
                            return;
                        this._border = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPAlert.prototype.connectedCallback = function () {
                    var _this = this;
                    _super.prototype.render.call(this, this.template(this));
                    this.addEventListener('click', function (e) {
                        if (e.target && e.target['className'] === 'close') {
                            _this.innerHTML = '';
                        }
                    });
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
System.register("@rhd/dp-category-list/dp-category-item-list", ["@rhelements/rhelement"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var rhelement_2, DPCategoryItemList;
    return {
        setters: [
            function (rhelement_2_1) {
                rhelement_2 = rhelement_2_1;
            }
        ],
        execute: function () {
            DPCategoryItemList = (function (_super) {
                __extends(DPCategoryItemList, _super);
                function DPCategoryItemList() {
                    var _this = _super.call(this, 'dp-category-item-list') || this;
                    _this.template = function (el) {
                        var tpl = document.createElement("template");
                        tpl.innerHTML = "\n            <style>\n            :host[visible] {\n                display: block;\n            }\n\n            :host {\n                display: none;\n                flex: 1 1 100%;\n                grid-column: span 1;\n                margin-bottom: 30px;\n            }\n\n            div {\n                display: grid;\n                grid-template-columns: 1fr;\n                grid-gap: 15px;\n                position: relative;\n                padding-top: 15px;\n                padding-right: 15px;\n                padding-left: 15px;\n            }\n\n            @media (min-width: 500px) {\n                :host {\n                    grid-column: span 2;\n                }\n\n                div {\n                    border: 1px solid #CCCCCC;\n                }\n            }\n\n            @media (min-width: 800px) {\n                :host {\n                    grid-column: span 3;\n                }\n\n                div {\n                    grid-template-columns: repeat(2, 1fr);\n                }\n            }\n\n            @media (min-width: 1200px) {\n                :host {\n                    grid-column: span 4;\n                }\n\n                div {\n                    grid-template-columns: repeat(3, 1fr);\n                    grid-gap: 30px;\n                    background-color: #FFFFFF;\n                    padding: 30px;\n                    margin-bottom: 30px;\n                }\n            }\n            </style>\n            <div>\n            <slot></slot>\n            </div>\n            ";
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
            }(rhelement_2.default));
            exports_3("default", DPCategoryItemList);
            window.customElements.define('dp-category-item-list', DPCategoryItemList);
        }
    };
});
System.register("@rhd/dp-category-list/dp-category-list", ["@rhelements/rhelement"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var rhelement_3, DPCategoryList;
    return {
        setters: [
            function (rhelement_3_1) {
                rhelement_3 = rhelement_3_1;
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
            }(rhelement_3.default));
            exports_4("default", DPCategoryList);
            window.customElements.define('dp-category-list', DPCategoryList);
        }
    };
});
System.register("@rhd/dp-category-list/dp-category", ["@rhelements/rhelement"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var rhelement_4, DPCategory;
    return {
        setters: [
            function (rhelement_4_1) {
                rhelement_4 = rhelement_4_1;
            }
        ],
        execute: function () {
            DPCategory = (function (_super) {
                __extends(DPCategory, _super);
                function DPCategory() {
                    var _this = _super.call(this, 'dp-category-list') || this;
                    _this.template = function (el) {
                        var tpl = document.createElement("template");
                        tpl.innerHTML = "\n<style>\n:host { \n    grid-column: span 1;\n    border-top: 1px solid var(--rhd-blue);\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    padding: 15px;\n    align-items: center;\n    background-color: var(--rhd-white, #ffffff);\n    position: relative;\n    z-index: 1;\n}\n\n:host([visible]):after, :host([visible]):before {\n    top: 100%;\n    left: 50%;\n    border: solid transparent;\n    content: \" \";\n    height: 0;\n    width: 0;\n    position: absolute;\n    pointer-events: none;\n}\n\n:host([visible]):before {\n    border-bottom-color: #CCCCCC;\n    border-width: 15px;\n    margin-left: -15px;\n}\n:host([visible]):after {\n    border-bottom-color: #FFFFFF;\n    border-width: 16px;\n    margin-left: -16px;\n}\n\nimg, svg { \n    flex: 0 0 60px; \n    padding-right: 24px; \n    height: 60px;   \n}\n\nh4 {\n    flex: 1 0 auto;\n    color: #0066CC;\n    font-family: Overpass;\n    font-size: 14px;\n    font-weight: normal;\n    line-height: 21px;\n    margin: 0 0 5px 0;\n}\n\n:host(:hover), :host([visible]) {\n    cursor: pointer;\n    color: var(--rhd-blue);\n    fill: var(--rhd-blue);\n    border-top: 5px solid var(--rhd-blue);\n    border-bottom: 5px solid var(--rhd-blue);\n}\n\n@media (min-width: 500px) {\n    :host, :host(:hover), :host([visible]) {\n        flex-direction: column;\n        text-align: center; \n        border-top: none;\n        border-bottom: none;\n        background-color: transparent;\n        margin-bottom:30px;\n    }\n\n    img, svg { flex: 0 0 150px; height: 150px; padding-right: 0; padding-bottom: 15px; }\n}\n\n@media (min-width: 800px) {\n    :host {\n        \n    }\n}\n\n@media (min-width: 1200px) {\n    :host {\n        \n    }\n}\n</style>\n" + (el.image && el.image.indexOf('svg') < 0 ? "<img src=\"" + el.image + "\">" : el.image) + "\n<h4>" + el.name + "</h4>\n<slot></slot>\n";
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
            }(rhelement_4.default));
            exports_5("default", DPCategory);
            window.customElements.define('dp-category', DPCategory);
        }
    };
});
System.register("@rhd/dp-category-list/dp-category-item", ["@rhelements/rhelement"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var rhelement_5, DPCategoryItem;
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
            exports_6("default", DPCategoryItem);
            window.customElements.define('dp-category-item', DPCategoryItem);
        }
    };
});
System.register("@rhd/dp-category-list/dp-product-short-teaser", ["@rhelements/rhelement"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var rhelement_6, DPProductShortTeaser;
    return {
        setters: [
            function (rhelement_6_1) {
                rhelement_6 = rhelement_6_1;
            }
        ],
        execute: function () {
            DPProductShortTeaser = (function (_super) {
                __extends(DPProductShortTeaser, _super);
                function DPProductShortTeaser() {
                    var _this = _super.call(this, 'dp-product-short-teaser') || this;
                    _this.template = function (el) {
                        var tpl = document.createElement("template");
                        tpl.innerHTML = "\n<style>\n    :host { \n        font-family: Overpass;\n        font-size: 14px;\n        line-height: 21px;\n        margin-bottom: 30px;\n        display: flex;\n        flex-direction: column;\n        text-align: left;\n    }\n    h4 { \n        flex: 0 0 24px;\n        font-family: Overpass;\n        font-size: 14px;\n        font-weight: bold;\n        line-height: 24px;\n        margin: 0 0 5px 0;\n    }\n    h4 a {\n        color: #0066CC;\n        text-decoration: none;\n    }\n\n    div {\n        flex: 1 1 auto;\n        margin-bottom: 16px;\n        color: #000000;\n    }\n\n    a.more {\n        flex: 0 0 25px;\n        display: block;\n        width: auto;\n        color: #0066CC;\n        font-size: 16px;\n        line-height: 25px;\n    }\n</style>\n<h4><a href=\"" + el.link + "\">" + el.name + "</a></h4>\n<div>\n<slot></slot>\n</div>\n<a class=\"more\" href=\"" + el.downloadLink + "\">View all downloads <i class=\"fas fa-caret-right\"></i></a>\n        ";
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
            }(rhelement_6.default));
            exports_7("default", DPProductShortTeaser);
            window.customElements.define('dp-product-short-teaser', DPProductShortTeaser);
        }
    };
});
System.register("@rhd/rhd-app", ["@rhd/rhdp-alert", "@rhd/dp-category-list/dp-category-list", "@rhd/dp-category-list/dp-category", "@rhd/dp-category-list/dp-category-item-list", "@rhd/dp-category-list/dp-category-item", "@rhd/dp-category-list/dp-product-short-teaser"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var rhdp_alert_1, dp_category_list_1, dp_category_1, dp_category_item_list_1, dp_category_item_1, dp_product_short_teaser_1, RHDApp;
    return {
        setters: [
            function (rhdp_alert_1_1) {
                rhdp_alert_1 = rhdp_alert_1_1;
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
                }
                return RHDApp;
            }());
            exports_8("default", RHDApp);
        }
    };
});
var RHDPOSDownload = (function (_super) {
    __extends(RHDPOSDownload, _super);
    function RHDPOSDownload() {
        var _this = _super.call(this) || this;
        _this._rhelURL = "";
        _this._macURL = "";
        _this._winURL = "";
        _this.stage_download_url = 'https://developers.stage.redhat.com';
        _this.productDownloads = {
            "devsuite": { "windowsUrl": "https://developers.redhat.com/download-manager/file/devsuite-2.3.0-GA-installer.exe", "macUrl": "https://developers.redhat.com/download-manager/file/devsuite-2.3.0-GA-bundle-installer-mac.dmg", "rhelUrl": "https://developers.redhat.com/products/devsuite/hello-world/#fndtn-rhel" },
            "cdk": { "windowsUrl": "https://developers.redhat.com/download-manager/file/devsuite-2.3.0-GA-bundle-installer.exe", "macUrl": "https://developers.redhat.com/download-manager/file/devsuite-2.3.0-GA-bundle-installer-mac.dmg", "rhelUrl": "https://developers.redhat.com/products/cdk/hello-world/#fndtn-rhel" }
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
        this.innerHTML = this.template(__makeTemplateObject(["", "", "", "", ""], ["", "", "", "", ""]), this.productName, this.downloadURL, this.platformType, this.version);
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
            case 'devsuite':
                this.winURL = this.getDownloadOrigin(this.productDownloads.devsuite.windowsUrl);
                this.macURL = this.getDownloadOrigin(this.productDownloads.devsuite.macUrl);
                this.rhelURL = this.getDownloadOrigin(this.productDownloads.devsuite.rhelUrl);
                break;
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
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-os-download', RHDPOSDownload);
});
var RHDPThankyou = (function (_super) {
    __extends(RHDPThankyou, _super);
    function RHDPThankyou() {
        var _this = _super.call(this) || this;
        _this.template = function (strings, name, directLink) {
            return "<div class=\"row\">\n                    <div class=\"large-24 medium-24 small-24 columns\">\n                        <div class=\"alert-box alert-info\">\n                            <div class=\"icon\"></div>\n                            <div class=\"alert-content\">\n                                <strong>Your download should start automatically.</strong>\n                                <p>If you have any problems with the download, please use the <a id=\"download-link\" href=\"" + directLink + "\">direct link.</a></p>\n                            </div>\n                        </div>\n                \n                        <div class=\"large-24 medium-16 small-24 columns thankyou\">\n                                <h2>Thank you for downloading the:</h2>\n                                <h2>" + name + "</h2>\n                            <iframe src=\"" + directLink + "\"></iframe>\n                        </div>\n                        <div class=\"large-24 medium-16 small-24 columns\">\n                            <div class=\"thankyou-button\">\n                                <a href=\"/\" class=\"button heavy-cta\">Continue\n                                    to Homepage</a>\n                            </div>\n                        </div>\n                \n                    </div>\n                </div>";
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
        this.mediaName = this.mediaName ? this.mediaName : this.stripLabelFromMedia(this.getParameterByName('p'));
        this.directLink = this.directLink ? this.directLink : this.getParameterByName('tcDownloadURL');
        this.innerHTML = this.template(__makeTemplateObject(["", "", ""], ["", "", ""]), this.mediaName, this.directLink);
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
    RHDPThankyou.prototype.getParameterByName = function (urlName) {
        this.url = this.url ? this.url : window.location.href;
        urlName = urlName.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + urlName + "(=([^&#]*)|&|#|$)"), results = regex.exec(this.url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };
    return RHDPThankyou;
}(HTMLElement));
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-thankyou', RHDPThankyou);
});
var RHDPTryItNow = (function (_super) {
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
        this.innerHTML = this.template(__makeTemplateObject(["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""]), this.title, this.subtitle, this.buttonlink, this.icon, this.buttontext, this.buttonid);
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
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-tryitnow', RHDPTryItNow);
});
var DevNationLiveSession = (function () {
    function DevNationLiveSession(obj) {
        var _this = this;
        this._title = '';
        this._date = '';
        this._youtube_id = '';
        this._speakers = [];
        this._abstract = '';
        this._confirmed = false;
        this._register = true;
        this._upcoming = false;
        this._inxpo = '';
        Object.keys(obj).map(function (key) {
            _this[key] = obj[key];
        });
        var dt = Date.parse(this.date);
        if (dt && (dt > Date.now() || dt > Date.now() - 259200000)) {
            this.upcoming = true;
        }
    }
    Object.defineProperty(DevNationLiveSession.prototype, "title", {
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
    Object.defineProperty(DevNationLiveSession.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (val) {
            if (this._date === val)
                return;
            this._date = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "youtube_id", {
        get: function () {
            return this._youtube_id;
        },
        set: function (val) {
            if (this._youtube_id === val)
                return;
            this._youtube_id = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "speakers", {
        get: function () {
            return this._speakers;
        },
        set: function (val) {
            if (this._speakers === val)
                return;
            this._speakers = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "abstract", {
        get: function () {
            return this._abstract;
        },
        set: function (val) {
            if (this._abstract === val)
                return;
            this._abstract = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "register", {
        get: function () {
            return this._register;
        },
        set: function (val) {
            if (this._register === val)
                return;
            this._register = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "confirmed", {
        get: function () {
            return this._confirmed;
        },
        set: function (val) {
            if (this._confirmed === val)
                return;
            this._confirmed = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "inxpo", {
        get: function () {
            return this._inxpo;
        },
        set: function (val) {
            if (this._inxpo === val)
                return;
            this._inxpo = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "upcoming", {
        get: function () {
            return this._upcoming;
        },
        set: function (val) {
            this._upcoming = val;
        },
        enumerable: true,
        configurable: true
    });
    return DevNationLiveSession;
}());
var DevNationLiveSpeaker = (function () {
    function DevNationLiveSpeaker(obj) {
        var _this = this;
        this._name = '';
        this._intro = '';
        this._twitter = '';
        this._image = '';
        Object.keys(obj).map(function (key) {
            _this[key] = obj[key];
        });
    }
    Object.defineProperty(DevNationLiveSpeaker.prototype, "name", {
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
    Object.defineProperty(DevNationLiveSpeaker.prototype, "intro", {
        get: function () {
            return this._intro;
        },
        set: function (val) {
            if (this._intro === val)
                return;
            this._intro = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSpeaker.prototype, "twitter", {
        get: function () {
            return this._twitter;
        },
        set: function (val) {
            if (this._twitter === val)
                return;
            this._twitter = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSpeaker.prototype, "image", {
        get: function () {
            return this._image;
        },
        set: function (val) {
            if (this._image === val)
                return;
            this._image = val;
        },
        enumerable: true,
        configurable: true
    });
    return DevNationLiveSpeaker;
}());
var DevNationLiveApp = (function (_super) {
    __extends(DevNationLiveApp, _super);
    function DevNationLiveApp() {
        var _this = _super.call(this) || this;
        _this._src = '../rhdp-apps/devnationlive/devnationlive.json';
        _this._form = '../rhdp-apps/devnationlive/';
        _this._upcoming = [];
        _this._past = [];
        _this._mode = 'cors';
        _this.speakerLongTemplate = function (strings, speaker) {
            return " <strong>" + speaker.name + "</strong>\n            " + (speaker.twitter ? "(<a href=\"https://twitter.com/" + speaker.twitter + "\" target=\"_blank\" class=\"external-link\">@" + speaker.twitter + "</a>)" : '') + "\n            " + (speaker.intro ? "<p>" + speaker.intro + "</p>" : '');
        };
        _this.speakerShortTemplate = function (strings, speaker) {
            return " <strong>" + speaker.name + "</strong>\n            " + (speaker.twitter ? "(<a href=\"https://twitter.com/" + speaker.twitter + "\" target=\"_blank\" class=\"external-link\">@" + speaker.twitter + "</a>)" : '');
        };
        _this.template = function (strings, next, upcoming, past, speakers) {
            return "<div class=\"wide wide-hero devnation-live\">\n        <div class=\"row\">\n            <div class=\"large-24 columns\">\n                <img class=\"show-for-large-up\" src=\"https://design.jboss.org/redhatdeveloper/website/redhatdeveloper_2_0/microsite_graphics/images/devnationlive_microsite_banner_desktop_logo_r4v1.png\" alt=\"DevNation Live logo\">\n                <img class=\"hide-for-large-up\" src=\"https://design.jboss.org/redhatdeveloper/website/redhatdeveloper_2_0/microsite_graphics/images/devnationlive_microsite_banner_mobile_logo_r4v1.png\" alt=\"DevNation Live logo\">\n            </div>\n        </div>\n    </div>\n    <div id=\"devnationLive-microsite\">\n        " + (next ? "<section class=\"next-session\">\n            <div class=\"row\">\n                <div class=\"large-24 columns\">\n                    <h5 class=\"caps session-label\">Next Live Session</h5>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"large-24 columns\">\n                    <div class=\"session-date right\"><i class=\"fa fa-calendar fa-2x\"></i> " + next.date + "</div>\n                    <h4 class=\"caps\">" + next.title + "</h4>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"large-14 small-24 columns\">\n                    <h5 class=\"caps session-label\">Session:</h5>\n                    <p class=\"abstract\">" + next.abstract + "</p>\n                    <a href=\"" + next.inxpo + "\" target=\"_blank\" class=\"button heavy-cta\">REGISTER</a>\n                </div>\n                <div class=\"large-10 columns\">\n                    <h5 class=\"caps session-label\">Speaker(s):</h5>\n                    " + next.speakers.map(function (speaker) { return _this.speakerLongTemplate(__makeTemplateObject(["", ""], ["", ""]), speakers[speaker]); }).join('') + "  \n                </div>\n            </div>\n        </section>" : '') + "\n        <section class=\"session-list\">\n            <div class=\"row\">\n                " + (upcoming.length > 0 ? "\n                " + (past.length > 0 ? "<div class=\"large-12 columns\">" : "<div class=\"large-24 columns\">") + "\n                    <h5 class=\"caps\">Upcoming Sessions</h5>\n                    <br>\n                    <ul class=\"events-list\">\n                    " + upcoming.map(function (sess) { return "" + (sess.confirmed ? "\n                        <li class=\"single-event\">\n                            <div class=\"row\">\n                                <div class=\"large-24 columns\">\n                                    <h4 class=\"caps\">" + sess.title + "</h4>\n                                    <p>Speaker(s): " + sess.speakers.map(function (speaker) { return _this.speakerShortTemplate(__makeTemplateObject(["", ""], ["", ""]), speakers[speaker]); }).join('') + " </p>\n                                    <p>" + sess.date + "</p>\n                                    <p>" + sess.abstract + "</p>\n                                    " + (sess.register ? "\n                                    <a href=\"" + sess.inxpo + "\" target=\"_blank\" class=\"button heavy-cta\">REGISTER</a>" : '') + "\n                                </div>\n                            </div>\n                        </li>"
                : ''); }).join('') + "\n                    </ul>\n                </div>" : '') + "\n                " + (past.length > 0 ? "\n                " + (upcoming.length > 0 ? "<div class=\"large-12 columns\">" : "<div class=\"large-24 columns\">") + "\n                    <h5 class=\"caps\">Past Sessions</h5>\n                        <br>\n                        <ul class=\"events-list\">\n                        " + past.map(function (sess) { return "" + (sess.confirmed ? "\n                            <li class=\"single-event\">\n                                <div class=\"row\">\n                                    <div class=\"large-24 columns\">\n                                        <h4 class=\"caps\">" + sess.title + "</h4>\n                                        <p>Speaker(s): " + sess.speakers.map(function (speaker) { return _this.speakerShortTemplate(__makeTemplateObject(["", ""], ["", ""]), speakers[speaker]); }).join('') + " </p>\n                                        <p>" + sess.date + "</p>\n                                        <p>" + sess.abstract + "</p>\n                                        <a href=\"https://developers.redhat.com/video/youtube/" + sess.youtube_id + "\" class=\"button external-link\">VIDEO</a>\n                                    </div>\n                                </div>\n                            </li>"
                : ''); }).join('') + "\n                        </ul>\n                    </div>"
                : '') + "\n            </div>\n        </section>\n    </div>";
        };
        return _this;
    }
    Object.defineProperty(DevNationLiveApp.prototype, "sessions", {
        get: function () {
            return this._sessions;
        },
        set: function (val) {
            if (this._sessions === val)
                return;
            this._sessions = val;
            var next = false;
            for (var i = 0; i < this.sessions.length; i++) {
                var sess = new DevNationLiveSession(this.sessions[i]);
                if (sess.confirmed) {
                    if (sess.upcoming) {
                        if (next) {
                            if (sess.inxpo.length > 0) {
                                this.upcoming.push(sess);
                            }
                        }
                        else {
                            if (sess.inxpo.length > 0) {
                                this.next = sess;
                                next = true;
                            }
                        }
                    }
                    else {
                        this.past.push(sess);
                    }
                }
            }
            this.past.sort(this.sortPastSessions);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "speakers", {
        get: function () {
            return this._speakers;
        },
        set: function (val) {
            if (this._speakers === val)
                return;
            this._speakers = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "next", {
        get: function () {
            return this._next;
        },
        set: function (val) {
            if (this._next === val)
                return;
            this._next = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "past", {
        get: function () {
            return this._past;
        },
        set: function (val) {
            if (this._past === val)
                return;
            this._past = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (val) {
            if (this._src === val)
                return;
            this._src = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (val) {
            if (this._mode === val)
                return;
            this._mode = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "form", {
        get: function () {
            return this._form;
        },
        set: function (val) {
            if (this._form === val)
                return;
            this._form = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "upcoming", {
        get: function () {
            return this._upcoming;
        },
        set: function (val) {
            if (this._upcoming === val)
                return;
            this._upcoming = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (val) {
            if (this._data === val)
                return;
            this._data = val;
            this.sessions = this._data['sessions'] ? this._data['sessions'].sort(this.sortSessions) : [];
            this.speakers = this._data['speakers'] ? this._data['speakers'] : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp, "observedAttributes", {
        get: function () {
            return ['src', 'form', 'mode'];
        },
        enumerable: true,
        configurable: true
    });
    DevNationLiveApp.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    DevNationLiveApp.prototype.connectedCallback = function () {
        var _this = this;
        var fHead = new Headers();
        var fInit = {
            method: 'GET',
            headers: fHead,
            mode: this.mode,
            cache: 'default'
        };
        fetch(this.src, fInit)
            .then(function (resp) { return resp.json(); })
            .then(function (data) {
            _this.data = data;
            _this.innerHTML = _this.template(__makeTemplateObject(["", "", "", "", ""], ["", "", "", "", ""]), _this.next, _this.upcoming, _this.past, _this.speakers);
        });
    };
    DevNationLiveApp.prototype.getCookie = function (name) {
        var re = new RegExp('(?:(?:^|.*;\\s*)' + name + '\\s*\\=\\s*([^;]*).*$)|^.*$');
        return document.cookie.replace(re, "$1");
    };
    DevNationLiveApp.prototype.sortSessions = function (a, b) {
        var da = (Date.parse(a.date) ? Date.parse(a.date) : new Date(9999999999999)).valueOf(), db = (Date.parse(b.date) ? Date.parse(b.date) : new Date(9999999999999)).valueOf();
        return da - db;
    };
    DevNationLiveApp.prototype.sortPastSessions = function (a, b) {
        var da = (Date.parse(a.date) ? Date.parse(a.date) : new Date(9999999999999)).valueOf(), db = (Date.parse(b.date) ? Date.parse(b.date) : new Date(9999999999999)).valueOf();
        return db - da;
    };
    return DevNationLiveApp;
}(HTMLElement));
customElements.define('devnation-live-app', DevNationLiveApp);
System.register("@rhd/dp-stackoverflow/dp-stackoverflow", ["@rhelements/rhelement"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var rhelement_7, DPStackOverflow;
    return {
        setters: [
            function (rhelement_7_1) {
                rhelement_7 = rhelement_7_1;
            }
        ],
        execute: function () {
            DPStackOverflow = (function (_super) {
                __extends(DPStackOverflow, _super);
                function DPStackOverflow() {
                    var _this = _super.call(this, 'dp-category-list') || this;
                    _this.template = function (el) {
                        var tpl = document.createElement("template");
                        tpl.innerHTML = "\n        <style>\n\n        </style>\n        <label for=\"filterByProduct\">Filter by Product</label>\n        <select id=\"filterByProduct\" name=\"filter-by-product\" ng-change=\"updateSearch(); resetPagination();\" ng-model=\"params.product\">\n<div ng-app=\"search\">\n<div class=\"row\" ng-controller=\"SearchController\">\n    <div class=\"large-24 columns\">\n    <div class=\"row\">\n        <div class=\"large-24 columns\">\n        <form class=\"search-bar\" ng-submit=\"updateSearch(); resetPagination();\" role=\"search\"> </form>\n        </div>\n        <div class=\"large-24 columns\" id=\"scrollPoint\">\n        <div class=\"row\">\n            <div class=\"large-14 columns stackoverflow-filters\">\n            <label for=\"filterByProduct\">Filter by Product</label>\n\n            <div class=\"styled-select\">\n<select id=\"filterByProduct\" name=\"filter-by-product\" ng-change=\"updateSearch(); resetPagination();\" ng-model=\"params.product\">\n    <option value=\"\">Show all</option>\n    <option value=\"openjdk\">OpenJDK</option>\n    <option value=\"rhamt\">Red Hat Application Migration Toolkit</option>\n    <option value=\"cdk\">Red Hat Developer Container Kit</option>\n    <option value=\"developertoolset\">Red Hat Developer Toolset</option>\n    <option value=\"rhel\">Red Hat Enterprise Linux</option>\n    <option value=\"amq\">Red Hat JBoss AMQ</option>\n    <option value=\"bpmsuite\">Red Hat JBoss BPM Suite</option>\n    <option value=\"brms\">Red Hat Decision Manager</option>\n    <option value=\"datagrid\">Red Hat JBoss Data Grid</option>\n    <option value=\"datavirt\">Red Hat JBoss Data Virtualization</option>\n    <option value=\"devstudio\">Red Hat JBoss Developer Studio</option>\n    <option value=\"eap\">Red Hat JBoss Enterprise Application Platform</option>\n    <option value=\"fuse\">Red Hat JBoss Fuse</option>\n    <option value=\"webserver\">Red Hat JBoss Web Server</option>\n    <option value=\"rhmap\">Red Hat Mobile Application Platform</option>\n    <option value=\"rhoar\">Red Hat Openshift Application Runtimes</option>\n    <option value=\"openshift\">Red Hat OpenShift Container Platform</option>\n    <option value=\"softwarecollections\">Red Hat Software Collections</option>\n    <option value=\"dotnet\">.NET Core for Red Hat Enterprise Linux</option>\n</select>\n</div>\n            </div>\n\n            <div class=\"large-10 columns\">\n            <div class=\"sorting so-sorting\">\n                <p ng-if=\"totalCount &gt; 10\">Show<select class=\"results-count\" ng-change=\"updateSearch()\" ng-model=\"params.size\"><option value=\"10\">10</option>\n<option value=\"25\">25</option>\n<option value=\"50\">50</option>\n<option value=\"100\">100</option></select>results per page</p>\n            </div>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"large-24 columns\">\n            <h3 class=\"results-title\" ng-bind-template=\"No results found\" ng-if=\"totalCount &lt;= 0\"> </h3>\n\n            <h4 class=\"results-sub-title\" ng-bind-template=\"Please select a different product\" ng-if=\"totalCount &lt;= 0\"> </h4>\n\n            <div class=\"stackoverflow-results-container\" ng-class=\"loading ? 'invisible' : 'search-results-loaded'\" ng-if=\"totalCount &gt; 0\">\n                <div ng-init=\"r = result\" ng-repeat=\"result in results\">\n                <div class=\"stackoverflow-update\">\n                    <div class=\"update\">\n                    <div class=\"update-meta\">\n                        <div class=\"row\">\n                        <div class=\"large-6 columns qtn-stats\">\n\n                            <div class=\"votes-count\">\n                            <h4 ng-bind=\"r._source.up_vote_count\"> </h4>\n                            <p ng-bind-template=\"Votes\"> </p>\n                            </div>\n                            <div class=\"answer-count\" ng-class=\"(r._source.answers[0].is_accepted == true) ? 'accepted-answer' : '' \">\n                            <h4 ng-bind=\"r._source.answer_count\"> </h4>\n                            <p ng-bind-template=\"Answers\"> </p>\n                            </div>\n                            <div class=\"views-count\">\n                            <h4 ng-bind=\"r._source.view_count\"> </h4>\n                            <p ng-bind-template=\"Views\"> </p>\n                            </div>\n                        </div>\n\n                        <div class=\"large-18 columns\">\n                            <a class=\"qtn-title\" ng-href=\"{{r._source.sys_url_view}}\" ng-bind-html=\"r._source.sys_title\"> </a>\n                            <p class=\"qtn-content\" ng-bind-html=\"r | question\"> </p>\n\n                            <div class=\"callout qtn-answer\" ng-class=\"r._source.answers[0] ? 'display-answer' : 'hide-answer' \">\n                            <p ng-show=\"r._source.answers[0].is_accepted == true\">\n                                <strong ng-bind-template=\"Accepted answer: \"> </strong>\n                            </p>\n                            <p ng-show=\"r._source.answers[0].is_accepted == false\">\n                                <strong ng-bind-template=\"Latest answer: \"> </strong>\n                            </p>\n                            <p ng-bind=\"r._source.answers[0].body | htmlToPlaintext\"></p>\n                            <a ng-href=\"{{r._source.sys_url_view}}\" target=\"_blank\" rel=\"noopener noreferrer\" ng-bind-template=\"Read full question at Stack Overflow \u203A\"> </a>\n                            </div>\n                            <div class=\"so-tags\">\n                            <strong class=\"tag-label\" ng-bind-template=\"Tags:\"> </strong>\n                            <span class=\"tag\" ng-repeat=\"tag in r._source.sys_tags\" ng-bind=\"tag\"> </span>\n                            <span class=\"so-author\" ng-bind-template=\"{{r | stackDate}} | {{r | author}}\"> </span>\n                            </div>\n                        </div>\n                        </div>\n                    </div>\n                    </div>\n                </div>\n                </div>\n            </div>\n            </div>\n        </div>\n\n        <nav id=\"paginator\" ng-hide=\"loading\" ng-if=\"paginate.pages &gt; 1\"><span ng-bind-template=\"Showing {{params.from + 1}}-{{paginate.lastVisible}} of  {{totalCount}} results\"></span>\n            <ul class=\"pagination\">\n<li id=\"pagination-first\" ng-class=\"paginate.currentPage &lt; 2 ? 'unavailable': 'available'\">\n                <a ng-click=\"goToPage('first'); scrollPosition();\">First</a>\n            </li>\n            <li id=\"pagination-prev\" ng-class=\"paginate.currentPage &lt; 2 ? 'unavailable': 'available'\">\n                <a ng-click=\"goToPage('prev'); scrollPosition();\">Previous</a>\n            </li>\n            <li class=\"pagination-page-number\" id=\"pagination-{{$index}}\" ng-class=\"{current: page == paginate.currentPage}\" ng-repeat=\"page in paginate.pagesArray track by $index\">\n                <a ng-click=\"goToPage(page); scrollPosition();\" data-page=\"{{page}}\" ng-bind=\"page\"> </a>\n            </li>\n            <li id=\"pagination-next\" ng-class=\"paginate.currentPage &gt;= paginate.pages ? 'unavailable': 'available'\">\n                <a ng-click=\"goToPage('next'); scrollPosition();\">Next</a>\n            </li>\n            <li id=\"pagination-last\" ng-class=\"paginate.currentPage  == paginate.pages ? 'unavailable': 'available'\">\n                <a ng-click=\"goToPage('last'); scrollPosition();\">Last</a>\n            </li>\n            </ul></nav>\n</div>\n";
                        return tpl;
                    };
                    return _this;
                }
                DPStackOverflow.prototype.connectedCallback = function () {
                    _super.prototype.render.call(this, this.template(this));
                };
                return DPStackOverflow;
            }(rhelement_7.default));
            exports_9("default", DPStackOverflow);
        }
    };
});
var RHDPDownloadsAllItem = (function (_super) {
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
        if (this.productId === 'devsuite' || this.productId === 'cdk') {
            this.osVersionExtract(this.productId);
            this.innerHTML = this.template(__makeTemplateObject(["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""]), this.name, this.productId, this.dataFallbackUrl, this.downloadUrl, this.learnMore, this.description, this.version, this.platform);
        }
        else {
            this.innerHTML = this.template(__makeTemplateObject(["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""]), this.name, this.productId, this.dataFallbackUrl, this.downloadUrl, this.learnMore, this.description, this.version, null);
        }
    };
    RHDPDownloadsAllItem.prototype.osVersionExtract = function (productId) {
        var osPlatform = new RHDPOSDownload();
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
var RHDPDownloadsAll = (function (_super) {
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
        this.innerHTML = this.template(__makeTemplateObject(["", "", ""], ["", "", ""]), this.id, this.heading);
        this.getProductsWithTargetHeading(this.products);
    };
    RHDPDownloadsAll.prototype.getProductsWithTargetHeading = function (productList) {
        if (productList.products) {
            var products = productList.products.products;
            var len = products.length;
            for (var i = 0; i < len; i++) {
                if (products[i].groupHeading === this.heading) {
                    var item = new RHDPDownloadsAllItem();
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
var RHDPDownloadsApp = (function (_super) {
    __extends(RHDPDownloadsApp, _super);
    function RHDPDownloadsApp() {
        var _this = _super.call(this) || this;
        _this.stage_download_url = 'https://developers.stage.redhat.com';
        _this.popularProduct = new RHDPDownloadsPopularProducts();
        _this.products = new RHDPDownloadsProducts();
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
        var downloads = new RHDPDownloadsAll();
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
var RHDPDownloadsPopularProduct = (function (_super) {
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
        var osPlatform = new RHDPOSDownload();
        osPlatform.platformType = osPlatform.getUserAgent();
        osPlatform.downloadURL = this.downloadUrl;
        osPlatform.setOSURL(productId);
        osPlatform.setDownloadURLByPlatform();
        this.downloadUrl = osPlatform.downloadURL;
    };
    RHDPDownloadsPopularProduct.prototype.connectedCallback = function () {
        this.osVersionExtract(this.productId);
        this.innerHTML = this.template(__makeTemplateObject(["", "", "", "", ""], ["", "", "", "", ""]), this.name, this.productId, this.dataFallbackUrl, this.downloadUrl);
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
var RHDPDownloadsPopularProducts = (function (_super) {
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
        var productNode = new RHDPDownloadsPopularProduct();
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
var RHDPDownloadsProducts = (function (_super) {
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
                    "productName": "Red Hat Development Suite",
                    "groupHeading": "DEVELOPER TOOLS",
                    "productCode": "devsuite",
                    "featured": true,
                    "dataFallbackUrl": "https://access.redhat.com/downloads",
                    "downloadLink": "",
                    "description": "A fully integrated development environment for modern enterprise development.",
                    "version": "",
                    "learnMoreLink": "/products/devsuite/overview/"
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
                    "productName": "Red Hat JBoss BPM Suite",
                    "groupHeading": "INTEGRATION AND AUTOMATION",
                    "productCode": "bpmsuite",
                    "featured": false,
                    "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?downloadType=distributions&product=bpm.suite&productChanged=yes",
                    "downloadLink": "",
                    "description": "A platform that combines business rules and process management (BPM), and complex event processing.",
                    "version": "",
                    "learnMoreLink": "/products/bpmsuite/overview/"
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
window.addEventListener('WebComponentsReady', function () {
    customElements.define('rhdp-downloads-all-item', RHDPDownloadsAllItem);
    customElements.define('rhdp-downloads-all', RHDPDownloadsAll);
    customElements.define('rhdp-downloads-popular-product', RHDPDownloadsPopularProduct);
    customElements.define('rhdp-downloads-popular-products', RHDPDownloadsPopularProducts);
    customElements.define('rhdp-downloads-products', RHDPDownloadsProducts);
    customElements.define('rhdp-downloads-app', RHDPDownloadsApp);
});
var RHDPProjectFilterBox = (function (_super) {
    __extends(RHDPProjectFilterBox, _super);
    function RHDPProjectFilterBox() {
        var _this = _super.call(this) || this;
        _this._term = '';
        _this._filter = '';
        _this.template = function (strings, project) {
            return "\n        <form action=\"\" class=\"project-filters\" method=\"GET\" data-drupal-form-fields=\"\">\n            <h4>Filters<a class=\"project-filters-clear\" href=\"#\">Clear All Filters</a></h4>\n            <input name=\"filter-text\" placeholder=\"Filter by keyword\" type=\"text\" value=\"" + project.term + "\">\n            <div class=\"filter-block\">\n                <h5>Included In</h5>\n        \n                <div class=\"styled-select\" ><select name=\"filter-products\" id=\"upstream-project-selection\">\n                    <option value=\"\">Select Product...</option>\n                    <option value=\"amq\">Red Hat JBoss AMQ</option>\n                    <option value=\"bpmsuite\">Red Hat JBoss BPM Suite</option>\n                    <option value=\"brms\">Red Hat Decision Manager</option>\n                    <option value=\"datagrid\">Red Hat JBoss Data Grid</option>\n                    <option value=\"datavirt\">Red Hat JBoss Data Virtualization</option>\n                    <option value=\"devstudio\">Red Hat JBoss Developer Studio</option>\n                    <option value=\"eap\">Red Hat JBoss Enterprise Application Platform</option>\n                    <option value=\"fuse\">Red Hat JBoss Fuse</option>\n                    <option value=\"rhel\">Red Hat Enterprise Linux</option>\n                    <option value=\"webserver\">Red Hat JBoss Web Server</option>\n                </select></div>\n            </div>\n        </form>\n";
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
            return "\n        \n            <div class=\"defaultprojectimage\">\n                <p class=\"image-link\"><img src=\"" + project.imageUrl + "\" alt=\"" + project.projectName + "\"></p></div>\n            <h5 class=\"solution-name\">\n                <p class=\"solution-name-link\">" + project.projectName + "</p>\n            </h5>\n            <p>\n        \n            </p>\n            <a class=\"solution-overlay-learn link-sm\">Learn more</a> " + (project.downloadsLink ? "| <a href=\"" + project.downloadsLink + "\" class=\"link-sm\">Download</a>" : '') + "\n            <div class=\"project-content row\">\n                <div class=\"large-6 project-content-left columns\"><img\n                        src=\"" + project.imageUrl + "\" alt=\"" + project.projectName + "\">\n                    <p><a class=\"upstream-download\" href=\"" + project.downloadsLink + "\"><i class=\"fa fa-download\"></i> Download</a></p>\n                    <p>\n                        " + (project.sys_url_view ? "<a href=\"" + project.sys_url_view + "\">Visit home page</a>" : '') + "\n                    </p>\n                    <ul class=\"project-social\"> \n                        " + (project.twitterLink ? "<li><a href=\"" + project.twitterLink + "\"><i class=\"fa fa-twitter\"></i></a></li>" : '') + "\n                    </ul>\n                </div>\n                <div class=\"large-18 project-content-right columns\"><h3><a href=\"" + project.sys_url_view + "\">" + project.projectName + "</a>\n                </h3>\n                    <p>" + project.descriptions + "</p>\n                    <div class=\"upstream-more-content\">\n                        <ul class=\"project-details-list\">\n                            " + (project.docsLink ? "<li>Docs: <a href=\"" + project.docsLink + "\">Documentation</a></li>" : '') + "\n                            " + (project.communityLink ? "<li>Community: <a href=\"" + project.communityLink + "\">" + project.generateViewLink(project.communityLink) + "</a></li>" : '') + "\n                            " + (project.mailingListLink ? "<li>Mailing List: <a href=\"" + project.mailingListLink + "\">" + project.generateViewLink(project.mailingListLink) + "</a></li>" : '') + "\n                            " + (project.chatLink ? "<li>Chat: <a href=\"" + project.chatLink + "\">" + project.generateViewLink(project.chatLink) + "</a></li>" : '') + "\n                            " + (project.jiraLink ? "<li>JIRA: <a href=\"" + project.jiraLink + "\">" + project.generateViewLink(project.jiraLink) + "</a></li>" : '') + "\n                            " + (project.srcLink ? "<li>Source: <a href=\"" + project.srcLink + "\">" + project.generateViewLink(project.srcLink) + "</a></li>" : '') + "\n                            " + (project.githubLink ? "<li>Github: <a href=\"" + project.githubLink + "\">" + project.generateViewLink(project.githubLink) + "</a></li>" : '') + "\n                            " + (project.buildLink ? "<li>Build: <a href=\"" + project.buildLink + "\">" + project.generateViewLink(project.buildLink) + "</a></li>" : '') + "\n                            " + (project.issueTracker ? "<li>Issue: <a href=\"" + project.issueTracker + "\">" + project.generateViewLink(project.issueTracker) + "</a></li>" : '') + "\n                            " + (project.userForumLink ? "<li>User Forum: <a href=\"" + project.userForumLink + "\">" + project.generateViewLink(project.userForumLink) + "</a></li>" : '') + "  \n                            " + (project.devForumLink ? "<li>Dev Forum: <a href=\"" + project.devForumLink + "\">" + project.generateViewLink(project.devForumLink) + "</a></li>" : '') + "  \n                            " + (project.knowledgebaseLink ? "<li>KnowledgeBase: <a href=\"" + project.knowledgebaseLink + "\">" + project.generateViewLink(project.knowledgebaseLink) + "</a></li>" : '') + " \n                            " + (project.blogLink ? "<li>Blog: <a href=\"" + project.blogLink + "\">" + project.generateViewLink(project.blogLink) + "</a></li>" : '') + " \n                            " + (project.anonymousLink ? "<li>Anonymous Source: <a href=\"" + project.anonymousLink + "\">" + project.generateViewLink(project.anonymousLink) + "</a></li>" : '') + " \n                        </ul>\n                    </div>\n                </div>\n            </div>\n        ";
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
            "bpmsuite": { "upstream": ["drools", "guvnor", "optaplanner", "jbpm"] },
            "brms": { "upstream": ["optaplanner", "drools", "guvnor"] },
            "datagrid": { "upstream": ["infinispan", "jgroups", "hibernate_subprojects_search"] },
            "datavirt": { "upstream": ["teiid", "teiiddesigner", "modeshape"] },
            "devstudio": { "upstream": ["jbosstools"] },
            "eap": { "upstream": ["wildfly", "jgroups", "hibernate", "hornetq", "jbossclustering", "jbossmc", "narayana", "jbossweb", "jbossws", "ironjacamar", "jgroups", "mod_cluster", "jbossas_osgi", "jbosssso", "picketlink", "resteasy", "weld", "wise", "xnio"] },
            "fuse": { "upstream": ["camel", "karaf", "activemq", "cxf", "fabric8", "switchyard", "hawtio"] },
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
        _this.communityTemplate = function (strings, project) {
            return "\n        <ul class=\"large-block-grid-4 small-block-grid-2 results\" id=\"product-upstream-projects\"></ul>\n        ";
        };
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
var RHDPSearchBox = (function (_super) {
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
        this.innerHTML = this.template(__makeTemplateObject(["", "", ""], ["", "", ""]), this.name, this.term);
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
customElements.define('rhdp-search-box', RHDPSearchBox);
var RHDPSearchFilterGroup = (function (_super) {
    __extends(RHDPSearchFilterGroup, _super);
    function RHDPSearchFilterGroup() {
        var _this = _super.call(this) || this;
        _this._toggle = false;
        _this._more = false;
        _this.template = function (strings, name) {
            return "<h6 class=\"showFilters heading\"><span class=\"group-name\">" + name + "</span><span class=\"toggle\"><i class='fa fa-chevron-right' aria-hidden='true'></i></span></h6>\n        <div class=\"group hide\">\n            <div class=\"primary\"></div>\n            <div class=\"secondary hide\"></div>\n            <a href=\"#\" class=\"more\">Show More</a>\n        </div>";
        };
        _this.innerHTML = _this.template(__makeTemplateObject(["", ""], ["", ""]), _this.name);
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
customElements.define('rhdp-search-filter-group', RHDPSearchFilterGroup);
var RHDPSearchFilterItem = (function (_super) {
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
                    this.innerHTML = this._active ? this.inlineTemplate(__makeTemplateObject(["", "", ""], ["", "", ""]), this.name, this._active) : '';
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
            this.innerHTML = !this._inline ? this.template(__makeTemplateObject(["", "", "", ""], ["", "", "", ""]), this.name, this.key, this.active) : this.inlineTemplate(__makeTemplateObject(["", "", ""], ["", "", ""]), this.name, this.active);
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
        this.innerHTML = !this.inline ? this.template(__makeTemplateObject(["", "", "", ""], ["", "", "", ""]), this.name, this.key, this.active) : this.inlineTemplate(__makeTemplateObject(["", "", ""], ["", "", ""]), this.name, this.active);
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
customElements.define('rhdp-search-filter-item', RHDPSearchFilterItem);
var RHDPSearchFilters = (function (_super) {
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
            this.innerHTML = this.activeTemplate(__makeTemplateObject(["", ""], ["", ""]), this.title);
            top.addEventListener('filter-item-change', this._checkActive);
            top.addEventListener('filter-item-init', this._checkActive);
            top.addEventListener('search-complete', this._checkActive);
            top.addEventListener('params-ready', this._checkActive);
            top.addEventListener('clear-filters', this._clearFilters);
            this._addFilters();
        }
        else if (this.type === 'modal') {
            this.innerHTML = this.modalTemplate(__makeTemplateObject(["", ""], ["", ""]), this.title);
            this.addGroups();
        }
        else {
            this.innerHTML = this.template(__makeTemplateObject(["", ""], ["", ""]), this.title);
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
            var group = new RHDPSearchFilterGroup(), groupInfo = groups[i], groupNode = group.querySelector('.group'), primaryFilters = group.querySelector('.primary'), secondaryFilters = group.querySelector('.secondary'), len_1 = groupInfo.items ? groupInfo.items.length : 0;
            if (len_1 <= 5) {
                groupNode.removeChild(groupNode.lastChild);
            }
            for (var j = 0; j < len_1; j++) {
                var item = new RHDPSearchFilterItem();
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
                var item = new RHDPSearchFilterItem();
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
customElements.define('rhdp-search-filters', RHDPSearchFilters);
var RHDPSearchOneBox = (function (_super) {
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
            return "<div>\n            " + (feature.heading && feature.heading.url && feature.heading.text ? "<h4><a href=\"" + feature.heading.url + "\">" + feature.heading.text + "</a></h4>" : '') + "\n            " + (feature.details ? "<p>" + feature.details + "</p>" : '') + "\n            " + (feature.button && feature.button.url && feature.button.text ? "<a href=\"" + feature.button.url + "?onebox=" + feature.id + "\" class=\"button medium-cta blue\">" + feature.button.text + "</a>" : '') + "\n            " + (feature.slots && feature.slots.length > 0 ? "<ul class=\"slots\">\n                " + feature.slots.map(function (slot) { return _this.slotTemplate(__makeTemplateObject(["", "", ""], ["", "", ""]), slot, feature.id); }).join('') + "\n            </ul>" : '') + "\n        </div>";
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
            this.innerHTML = this.feature ? this.template(__makeTemplateObject(["", ""], ["", ""]), this.feature) : '';
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
customElements.define('rhdp-search-onebox', RHDPSearchOneBox);
var RHDPSearchQuery = (function (_super) {
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
customElements.define('rhdp-search-query', RHDPSearchQuery);
var RHDPSearchResultCount = (function (_super) {
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
        this.innerHTML = this.count + " results found " + (this.term ? "for " + this.term : '');
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
customElements.define('rhdp-search-result-count', RHDPSearchResultCount);
var RHDPSearchResult = (function (_super) {
    __extends(RHDPSearchResult, _super);
    function RHDPSearchResult() {
        var _this = _super.call(this) || this;
        _this._url = ['', ''];
        _this.template = function (strings, url, title, kind, created, description, premium, thumbnail) {
            return "<div>\n            <h4>" + (url ? "<a href=\"" + url + "\">" + title + "</a>" : title) + "</h4>\n            <p " + (premium ? 'class="result-info subscription-required" data-tooltip="" title="Subscription Required" data-options="disable-for-touch:true"' : 'class="result-info"') + ">\n                <span class=\"caps\">" + kind + "</span>\n                " + (created ? "- <rh-datetime datetime=\"" + created + "\" type=\"local\" day=\"numeric\" month=\"long\" year=\"numeric\">" + created + "</rh-datetime>" : '') + "\n            </p>\n            <p class=\"result-description\">" + description + "</p>\n        </div>\n        " + (thumbnail ? "<div class=\"thumb\"><img src=\"" + thumbnail.replace('http:', 'https:') + "\"></div>" : '');
        };
        return _this;
    }
    Object.defineProperty(RHDPSearchResult.prototype, "url", {
        get: function () {
            return this._url;
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
            this._description = val;
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
        this.innerHTML = this.template(__makeTemplateObject(["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""]), this.url, this.title, this.kind, this.created, this.description, this.premium, this.thumbnail);
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
            this.url = result.fields.field_book_url;
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
customElements.define('rhdp-search-result', RHDPSearchResult);
var RHDPSearchResults = (function (_super) {
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
        var item = new RHDPSearchResult();
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
customElements.define('rhdp-search-results', RHDPSearchResults);
var RHDPSearchSortPage = (function (_super) {
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
customElements.define('rhdp-search-sort-page', RHDPSearchSortPage);
var RHDPSearchURL = (function (_super) {
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
            return this._term;
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
customElements.define('rhdp-search-url', RHDPSearchURL);
var RHDPSearchApp = (function (_super) {
    __extends(RHDPSearchApp, _super);
    function RHDPSearchApp() {
        var _this = _super.call(this) || this;
        _this._name = 'Search';
        _this._oburl = '../rhdp-apps/onebox/onebox.json';
        _this.template = "<div class=\"row\">\n    <span class=\"search-outage-msg\"></span>\n    <div class=\"large-24 medium-24 small-24 columns searchpage-middle\">\n        <div class=\"row\">\n            <div class=\"large-24 medium-24 small-24 columns\">\n                <h2>" + _this.name + "</h2>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"large-6 medium-8 small-24 columns\"></div>\n            <div class=\"large-18 medium-16 small-24 columns\"></div>\n        </div>\n    </div></div>";
        _this.urlEle = new RHDPSearchURL();
        _this.query = new RHDPSearchQuery();
        _this.box = new RHDPSearchBox();
        _this.count = new RHDPSearchResultCount();
        _this.filters = new RHDPSearchFilters();
        _this.active = new RHDPSearchFilters();
        _this.modal = new RHDPSearchFilters();
        _this.onebox = new RHDPSearchOneBox();
        _this.results = new RHDPSearchResults();
        _this.sort = new RHDPSearchSortPage();
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
                        { key: 'dotnet', name: '.NET Runtime for Red Hat Enterprise Linux', value: ['dotnet'] },
                        { key: 'amq', name: 'JBoss A-MQ', value: ['amq'] },
                        { key: 'bpmsuite', name: 'JBoss BPM Suite', value: ['bpmsuite'] },
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
                        { key: 'devsuite', name: 'Red Hat Development Suite', value: ['devsuite'] },
                        { key: 'rhel', name: 'Red Hat Enterprise Linux', value: ['rhel'] },
                        { key: 'mobileplatform', name: 'Red Hat Mobile Application Platform', value: ['mobileplatform'] },
                        { key: 'openshift', name: 'Red Hat OpenShift Container Platform', value: ['openshift'] },
                        { key: 'softwarecollections', name: 'Red Hat Software Collections', value: ['softwarecollections'] }
                    ]
                },
                { name: 'TOPIC', key: 'tag', items: [
                        { key: 'dotnet', name: '.NET', value: ['dotnet', '.net', 'visual studio', 'c#'] },
                        { key: 'containers', name: 'Containers', value: ['atomic', 'cdk', 'containers'] },
                        { key: 'devops', name: 'DevOps', value: ['DevOps', 'CI', 'CD', 'Continuous Delivery'] },
                        { key: 'enterprise-java', name: 'Enterprise Java', value: ['ActiveMQ', 'AMQP', 'apache camel', 'Arquillian', 'Camel', 'CDI', 'CEP', 'CXF', 'datagrid', 'devstudio', 'Drools', 'Eclipse', 'fabric8', 'Forge', 'fuse', 'Hawkular', 'Hawtio', 'Hibernate', 'Hibernate ORM', 'Infinispan', 'iPaas', 'java ee', 'JavaEE', 'JBDS', 'JBoss', 'JBoss BPM Suite', 'Red Hat Decision Manager', 'JBoss Data Grid', 'jboss eap', 'JBoss EAP', ''] },
                        { key: 'iot', name: 'Internet of Things', value: ['IoT', 'Internet of Things'] },
                        { key: 'microservices', name: 'Microservices', value: ['Microservices', ' WildFly Swarm'] },
                        { key: 'mobile', name: 'Mobile', value: ['Mobile', 'Red Hat Mobile', 'RHMAP', 'Cordova', 'FeedHenry'] },
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
customElements.define('rhdp-search-app', RHDPSearchApp);
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
    "bpmsuite": { "upstream": ["drools", "guvnor", "optaplanner", "jbpm"], "stackoverflow": "redhat-bpm", "buzz_tags": ["BPM Suite", "jBPM"] },
    "brms": { "upstream": ["optaplanner", "drools", "guvnor"], "stackoverflow": ["redhat-brms", "decision manager", "red hat decision manager"], "buzz_tags": ["brms", "JBoss BRMS"] },
    "cdk": { "upstream": null, "stackoverflow": "redhat-containers", "buzz_tags": ["containers"] },
    "datagrid": { "upstream": ["infinispan", "jgroups", "hibernate_subprojects_search"], "stackoverflow": "redhat-datagrid", "buzz_tags": ["datagrid", "jboss data grid"] },
    "datavirt": { "upstream": ["teiid", "teiiddesigner", "modeshape"], "stackoverflow": "redhat-datavirt", "buzz_tags": ["datavirt", "jboss datavirt"] },
    "developertoolset": { "upstream": null, "stackoverflow": { "AND": { "tag_set_one": ["redhat-dts", "gcc"], "tag_set_two": ["redhat-dts", "redhat", "rhel", "red hat"] } }, "buzz_tags": ["developertoolset"] },
    "devstudio": { "upstream": ["jbosstools"], "stackoverflow": "jboss-developer-studio", "buzz_tags": ["jbds", "JBoss DevStudio"] },
    "devsuite": { "upstream": null, "stackoverflow": "_none", "buzz_tags": "devsuite" },
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
    "devsuite": { "windowsUrl": "/download-manager/file/devsuite-2.3.0-GA-installer.exe", "macUrl": "/download-manager/file/devsuite-2.3.0-GA-bundle-installer-mac.dmg", "rhelUrl": "/products/devsuite/hello-world/#fndtn-rhel" },
    "cdk": { "windowsUrl": "/download-manager/file/devsuite-2.3.0-GA-bundle-installer.exe", "macUrl": "/download-manager/file/devsuite-2.3.0-GA-bundle-installer-mac.dmg", "rhelUrl": "/products/cdk/hello-world/#fndtn-rhel" }
};
app.mktg_ops = {};
app.ssoConfig = {};
app.ssoConfig.account_url = drupalSettings.rhd.keycloak.accountUrl;
app.ssoConfig.auth_url = drupalSettings.rhd.keycloak.authUrl;
var homeLink = document.getElementById('home-link');
app.ssoConfig.confirmation = homeLink.href + '/confirmation';
app.ssoConfig.logout_url = homeLink.href;
app.projects = {};
app.projects.defaultImage = "/images/design/projects/default_200x150.png";
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
                $('a.logged-in-name')
                    .text(logged_in_user)
                    .attr('href', app.ssoConfig.account_url)
                    .show();
                $('li.login, li.register, li.login-divider, section.register-banner, .hidden-after-login').hide();
                $('section.contributors-banner, .shown-after-login, li.logged-in').show();
                $('li.login a, a.keycloak-url').attr("href", keycloak.createAccountUrl());
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
            var namespace = (this.global.namespace === undefined) ? $('.foundation-data-attribute-namespace').css('font-family') : this.global.namespace;
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
    Foundation.libs.equalizer = {
        name: 'equalizer',
        version: '5.4.4',
        settings: {
            use_tallest: true,
            before_height_change: $.noop,
            after_height_change: $.noop,
            equalize_on_stack: false
        },
        init: function (scope, method, options) {
            Foundation.inherit(this, 'image_loaded');
            this.bindings(method, options);
            this.reflow();
        },
        events: function () {
            this.S(window).off('.equalizer').on('resize.fndtn.equalizer', function (e) {
                this.reflow();
            }.bind(this));
        },
        equalize: function (equalizer) {
            var isStacked = false, vals = equalizer.find('[' + this.attr_name() + '-watch]:visible'), settings = equalizer.data(this.attr_name(true) + '-init');
            if (vals.length === 0)
                return;
            var firstTopOffset = vals.first().offset().top;
            settings.before_height_change();
            equalizer.trigger('before-height-change').trigger('before-height-change.fndth.equalizer');
            vals.height('inherit');
            vals.each(function () {
                var el = $(this);
                if (el.offset().top !== firstTopOffset) {
                    isStacked = true;
                }
            });
            if (settings.equalize_on_stack === false) {
                if (isStacked)
                    return;
            }
            ;
            var heights = vals.map(function () { return $(this).outerHeight(false); }).get();
            if (settings.use_tallest) {
                var max = Math.max.apply(null, heights);
                vals.css('height', max);
            }
            else {
                var min = Math.min.apply(null, heights);
                vals.css('height', min);
            }
            settings.after_height_change();
            equalizer.trigger('after-height-change').trigger('after-height-change.fndtn.equalizer');
        },
        reflow: function () {
            var self = this;
            this.S('[' + this.attr_name() + ']', this.scope).each(function () {
                var $eq_target = $(this);
                self.image_loaded(self.S('img', this), function () {
                    self.equalize($eq_target);
                });
            });
        }
    };
})(jQuery, window, window.document);
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
            tcDownloadURL.contains(tcDownloadFileName)) {
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
    var nav = $('.' + className + '-nav'), win = $(window);
    if (!nav.length) {
        return;
    }
    var html = "", top = nav.offset().top, select = $("<select>").append('<option selected value="">Choose a section</option>');
    $('.' + className + ' ' + headerElement).each(function (i, el) {
        var replace_id = $(this).text().replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
        $(this).attr('id', replace_id);
        html += "<li><a href='#" + replace_id + "'>" + $(this).text() + "</a></li>";
        select.append("<option value='" + replace_id + "'>" + $(this).text() + "</option>");
    });
    nav.html(html);
    nav.after(select);
    win.on("scroll", function () {
        if (win.scrollTop() >= (top)) {
            var width = nav.parent().width();
            nav.addClass(className + "-nav-fixed").css('width', width);
        }
        else {
            nav.removeClass(className + "-nav-fixed").css('width', 'auto');
        }
        $('.' + className + ' ' + headerElement).each(function (i, el) {
            var el = $(this), top = el.offset().top, id = el.attr('id');
            if (win.scrollTop() >= (el.offset().top - 15)) {
                $('a[href="#' + id + '"]').addClass('past-block');
            }
            else {
                $('a[href="#' + id + '"]').removeClass('past-block');
            }
        });
        $('.past-block').not(':last').removeClass('past-block');
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
    var bodyHeight = $('body').height(), windowHeight = $(window).height(), wrapper = $('.wrapper');
    if (bodyHeight < windowHeight) {
        var headerHeight = $('header.main').outerHeight() + $('nav.top-bar').outerHeight(), footerHeight = $('footer.bottom').outerHeight(), devHeight = $('.under-development').outerHeight(), wrapperHeight = windowHeight - headerHeight - footerHeight - devHeight;
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
    stickySections = { 'faq': 'h2', 'gsi': 'h2' };
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
    fallbackImage: function (el) {
        el.src = "#{cdn( site.base_url + '/images/design/default_connector_200x150.png')}";
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
        app.connectors.connectorFilter(null, $('ul.connector-results'), targetProductFilter, null, app.connectors.orderBy.PRIORITY);
        $('.connectors-order a').removeClass('active');
        $('.order-priority').addClass('active');
    },
    orderByAlpha: function (e) {
        e.preventDefault();
        var targetProductFilter = $('[data-target-product]').data('target-product');
        app.connectors.connectorFilter(null, $('ul.connector-results'), targetProductFilter, null, app.connectors.orderBy.SYS_TITLE);
        $('.connectors-order a').removeClass('active');
        $('.order-alpha').addClass('active');
    },
    connectorFilter: function (query, container, target_product, thumbnailSize, orderBy, featuredIDs) {
        var url = app.dcp.url.connectors;
        var request_data = {};
        if (query) {
            request_data.query = query;
        }
        if (target_product) {
            request_data.target_product = target_product;
        }
        if (orderBy && orderBy == this.orderBy.SYS_TITLE) {
            request_data.sortAlpha = true;
        }
        if (featuredIDs && $.isArray(featuredIDs) && featuredIDs.length > 0) {
            request_data.id = featuredIDs;
        }
        $("ul.connector-results").addClass('loading');
        $.ajax({
            url: url,
            dataType: 'json',
            data: request_data,
            container: container,
            thumbnailSize: thumbnailSize,
            error: function () {
                $('ul.connector-results').html(app.dcp.error_message);
            }
        }).done(function (data) {
            var container = this.container || $('ul.connector-results');
            var thumbnailSize = this.thumbnailSize || "200x150";
            app.connectors.format(data, container, thumbnailSize);
        });
    },
    format: function (data, container, thumbnailSize) {
        if (data.responses) {
            var hits = data.responses[0].hits.hits;
        }
        else {
            var hits = data.hits.hits;
        }
        var html = "";
        for (var i = 0; i < hits.length; i++) {
            var props = hits[i]._source;
            props.img_path_thumb = "https://static.jboss.org/connectors/" + props.id + "_" + thumbnailSize + ".png";
            props.fallback_img = app.connectors.fallbackImage(this);
            if (!('sys_content' in props)) {
                props.sys_content = props.sys_description;
            }
            if (props.sys_description.length > 150) {
                props.sys_description = props.sys_description.slice(0, 146).concat(' ...');
            }
            if (!props.code_snippet_1) {
                props.code_snippet_1 = '';
            }
            if (!props.code_snippet_2) {
                props.code_snippet_2 = '';
            }
            if (!props.more_details_url) {
                props.more_details_url = '';
            }
            if (!props.link_1_text || !props.link_1_url) {
                props.link_1_text = '';
                props.link_1_url = '';
            }
            if (!props.link_2_text || !props.link_2_url) {
                props.link_2_text = '';
                props.link_2_url = '';
            }
            var connectorTemplate = app.templates.connectorTemplate;
            html += connectorTemplate.template(props);
        }
        container.html(html).removeClass('loading');
    }
};
$(function () {
    $('ul.connector-results').on('click', 'a.fn-open-connector', app.connectors.displayOverlay);
    $('ul.featured-connectors-results').on('click', 'a.fn-open-connector', app.connectors.displayOverlay);
    $('.link-list').on('click', 'a.order-priority', app.connectors.orderByPriority);
    $('.link-list').on('click', 'a.order-alpha', app.connectors.orderByAlpha);
    $('.overlay-close').on('click', app.connectors.close);
    var targetProductFilter = $('[data-target-product]').data('target-product');
    var orderBy = $('[data-order-by]').data('order-by');
    var connectorResults = $('.connector-results');
    if (connectorResults.length) {
        app.connectors.connectorFilter(null, $('ul.connector-results'), targetProductFilter, null, orderBy);
    }
    var featuredConnectorIds = $('.featured-connector-ids');
    if (featuredConnectorIds.length) {
        var featuredIds = JSON.parse(featuredConnectorIds.text());
        if ($.isArray(featuredIds) && featuredIds.length > 0) {
            app.connectors.connectorFilter(null, $('ul.featured-connectors-results'), targetProductFilter, '500x400', null, featuredIds);
        }
    }
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
    else if (data[0].productCode === "devsuite") {
        data[0].featuredWindowsArtifact = app.products.downloads.devsuite.windowsUrl;
        data[0].featuredMacArtifact = app.products.downloads.devsuite.macUrl;
        data[0].featuredRhelArtifact = app.products.downloads.devsuite.rhelUrl;
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
    var $allDownloadsTable = $("<div style='display:none;'>").addClass('large-24 columns');
    $allDownloadsTable.append(app.downloads.createDownloadTable(productArray.slice(end)));
    $downloads = $('<div>').addClass('rh-downloads').append($downloadLink, $latestDownloadsTables, $toggleLink, $allDownloadsTable);
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
        var referrerHTML = $('<section id="referral-alert"><div class="row alert-box alert-xl"><div class="row"><div class="icon"></div><div class="alert-content"><h3>You have been redirected from JBoss.org to Red Hat Developers.</h3><p>It' + "'" + 's true — JBoss Developer and Red Hat Developers are one and the same, and you can find all the great stuff you were looking for right here on <a href="https://developers.redhat.com/">developers.redhat.com.</a></p><a class="close"></a></div></div></div></section>');
        var jbdReferrerHTML = $('<section id="referral-alert"><div class="row alert-box alert-xl"><div class="row"><div class="icon"></div><div class="alert-content"><h3>Welcome jboss.org members!</h3><p>It' + "'" + 's true — JBoss Developer and Red Hat Developer Program are joining forces. You can find all the great Middleware information that you were looking for right here on developers.redhat.com.<a href="https://developer.jboss.org/blogs/mark.little/2017/08/31/we-are-moving?_sscc=t"> Read more about this on our blog.</a></p></div></div></div></section>');
        if (isReferrer('jbd')) {
            switch (getPrimaryCategory()) {
                case 'products':
                    if ($('.mobile.product-header').length > 0) {
                        referrerHTML.insertBefore('.mobile.product-header');
                    }
                    else {
                        referrerHTML.insertAfter('.hero');
                    }
                    break;
                case 'downloads':
                    referrerHTML.insertBefore('.most-popular-downloads');
                    break;
                case 'topics':
                    referrerHTML.insertBefore('.topics-main div:first');
                    break;
                case 'community':
                    referrerHTML.insertAfter('.contributors-main');
                    break;
                case 'about':
                case 'books':
                case 'quickstarts':
                    referrerHTML.insertBefore('.node__content');
                    break;
                case 'articles':
                case 'spotlights':
                case 'variants':
                case 'vjbug':
                case 'terms-and-conditions':
                case 'ticket-monster':
                case 'archetypes':
                case 'boms':
                case 'demos':
                case 'general-error':
                case 'video':
                case 'promotions':
                case 'webinars':
                case 'devnation2015':
                case 'forums':
                case 'events':
                    if ($('.hero').length > 0) {
                        referrerHTML.insertAfter('.hero');
                    }
                    else if ($('.wide-hero').length > 0) {
                        referrerHTML.insertAfter('.wide-hero');
                    }
                    else {
                        referrerHTML.insertBefore('#page');
                    }
                    break;
                case 'projects':
                case 'resources':
                case 'stack-overflow':
                    referrerHTML.insertAfter('header:first');
                    break;
                case 'middleware':
                    jbdReferrerHTML.insertBefore('.rh-jboss-middleware');
                    break;
                case '':
                    referrerHTML.insertAfter('.spotlights-wrap');
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
        prtcl = /https?:\/\//;
        category = window.location.href.replace(prtcl, '').replace(drupalSettings.rhd.urls.base_url, '').replace(drupalSettings.rhd.urls.final_base_url, '').replace(/\/$/, '').split('?')[0].split('#')[0].split(/\//);
        return category.length > 1 ? category[1] : category[0];
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
function checkRecentDownload() {
    var storageExpiration = 600000;
    if (window.location.href.indexOf('download-manager') > 0 && window.location.pathname.match(/.*\/products\/.*\/hello-world\/?/g)) {
        if (window.localStorage.getItem('recent-download-url')) {
            var recentDownload, timeOfRefer, currentTime;
            recentDownload = JSON.parse(window.localStorage.getItem('recent-download-url'));
            timeOfRefer = recentDownload.hasOwnProperty('timestamp') ? recentDownload['timestamp'] : 0;
            currentTime = new Date().getTime();
            if (currentTime - timeOfRefer > storageExpiration) {
                window.localStorage.removeItem('recent-download-url');
            }
        }
        else {
            var referrerDownload = { value: window.location.href, timestamp: new Date().getTime() };
            localStorage.setItem("recent-download-url", JSON.stringify(referrerDownload));
        }
    }
}
(function () {
    var productApp = angular.module('productApp', []);
    var pathRegex = window.location.pathname.match(/.*\/products\/.*\/hello-world\/?/g);
    if (pathRegex) {
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
        if (productCookie && productCookie != 'null') {
            window.location.hash = productCookie;
        }
    }
    checkRecentDownload();
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
$(document).ready(function () {
    $("a[href$='.pdf']").each(function () {
        var ignoredDomains = ['developers.redhat.com/download-manager/', 'jboss.org/download-manager/'];
        for (i = 0; i < ignoredDomains.length; i++) {
            if (this.href.indexOf(ignoredDomains[i]) != -1) {
                return true;
            }
        }
        if (this.href.indexOf(location.hostname) == -1) {
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
    var tags = ($('#video-related-cont').data('tags') || "");
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
    $.getJSON(app.dcp.url.search + '/developer_materials?tags_or_logic=true&filter_out_excluded=true&size10=true&tag=' + tagsString, function (data) {
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
                '<h4><span  >' + title + '</span></h4>',
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
};
$(function () {
    var $videoRelatedContentList = $('.video-related-content-list');
    if ($videoRelatedContentList.length) {
        app.relatedContent.fetch();
    }
});
