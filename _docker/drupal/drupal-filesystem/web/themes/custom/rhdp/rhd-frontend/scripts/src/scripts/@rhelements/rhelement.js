System.register([], function (exports_1, context_1) {
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
