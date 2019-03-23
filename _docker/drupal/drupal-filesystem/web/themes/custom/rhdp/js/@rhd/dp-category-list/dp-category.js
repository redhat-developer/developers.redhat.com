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
    var pfelement_js_1, DPCategory;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pfelement_js_1_1) {
                pfelement_js_1 = pfelement_js_1_1;
            }
        ],
        execute: function () {
            DPCategory = (function (_super) {
                __extends(DPCategory, _super);
                function DPCategory() {
                    var _this = _super.call(this, DPCategory, { delayRender: true }) || this;
                    _this._visible = false;
                    _this._index = -1;
                    _this._showList = _this._showList.bind(_this);
                    return _this;
                }
                Object.defineProperty(DPCategory.prototype, "html", {
                    get: function () {
                        return "\n<style>\n:host { \n    grid-column: span 1;\n    border-top: 1px solid var(--rhd-blue);\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    padding: 15px;\n    align-items: center;\n    background-color: var(--rhd-white, #ffffff);\n    position: relative;\n    z-index: 1;\n}\n\nimg, svg { \n    flex: 0 0 60px; \n    padding-right: 24px; \n    height: 60px;   \n}\n\nh4 {\n    flex: 1 0 auto;\n    color: #0066CC;\n    font-family: \"Overpass\", \"Open Sans\", Arial, Helvetica, sans-serif;\n    font-size: 14px;\n    font-weight: normal;\n    line-height: 21px;\n    margin: 0 0 5px 0;\n}\n\n:host(:hover), :host([visible]) {\n    cursor: pointer;\n    color: var(--rhd-blue);\n    fill: var(--rhd-blue);\n    border-top: 5px solid var(--rhd-blue);\n    border-bottom: 5px solid var(--rhd-blue);\n}\n\n@media (min-width: 500px) {\n    :host, :host(:hover), :host([visible]) {\n        flex-direction: column;\n        text-align: center; \n        border-top: none;\n        border-bottom: none;\n        background-color: transparent;\n        margin-bottom:30px;\n    }\n\n    :host([visible]):after, :host([visible]):before {\n        top: 100%;\n        left: 50%;\n        border: solid transparent;\n        content: \" \";\n        height: 0;\n        width: 0;\n        position: absolute;\n        pointer-events: none;\n    }\n    \n    :host([visible]):before {\n        border-bottom-color: #CCCCCC;\n        border-width: 15px;\n        margin-left: -15px;\n    }\n    :host([visible]):after {\n        border-bottom-color: #FFFFFF;\n        border-width: 16px;\n        margin-left: -16px;\n    }\n    \n\n    img, svg { flex: 0 0 150px; height: 150px; padding-right: 0; padding-bottom: 15px; }\n}\n\n@media (min-width: 800px) {\n    :host {\n        \n    }\n}\n\n@media (min-width: 1200px) {\n    :host {\n        \n    }\n}\n</style>\n" + (this.image && this.image.indexOf('svg') < 0 ? "<img src=\"" + this.image + "\">" : this.image) + "\n<h4>" + this.name + "</h4>\n<slot></slot>\n";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DPCategory, "tag", {
                    get: function () { return 'dp-category'; },
                    enumerable: true,
                    configurable: true
                });
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
                    _super.prototype.connectedCallback.call(this);
                    this.addEventListener('click', function (e) {
                        e.preventDefault();
                        _this.visible = !_this.visible;
                        return false;
                    });
                    _super.prototype.render.call(this);
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
                                    _super.prototype.render.call(this);
                                    return [2];
                            }
                        });
                    });
                };
                return DPCategory;
            }(pfelement_js_1.default));
            exports_1("default", DPCategory);
            pfelement_js_1.default.create(DPCategory);
        }
    };
});
