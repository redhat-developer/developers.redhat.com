System.register([], function (exports_1, context_1) {
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
    var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };
    var RHDPProjectFilterBox, templateObject_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RHDPProjectFilterBox = (function (_super) {
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
                    this.innerHTML = this.template(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), this);
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
            exports_1("default", RHDPProjectFilterBox);
            window.customElements.define('rhdp-project-filter-box', RHDPProjectFilterBox);
        }
    };
});
