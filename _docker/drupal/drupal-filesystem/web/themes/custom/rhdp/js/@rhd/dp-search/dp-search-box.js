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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "@fortawesome/fontawesome-svg-core/index", "@fortawesome/pro-solid-svg-icons/index", "@patternfly/pfelement/pfelement.umd"], function (require, exports, index_1, index_2, pfelement_umd_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    pfelement_umd_1 = __importDefault(pfelement_umd_1);
    index_1.library.add(index_2.faSearch);
    var searchIcon = index_1.icon(index_2.faSearch, { transform: {
            size: 18
        } }).html;
    var DPSearchBox = (function (_super) {
        __extends(DPSearchBox, _super);
        function DPSearchBox() {
            var _this = _super.call(this, DPSearchBox, { delayRender: true }) || this;
            _this._term = '';
            _this.name = 'Search Box';
            _this._checkTerm = _this._checkTerm.bind(_this);
            return _this;
        }
        Object.defineProperty(DPSearchBox.prototype, "html", {
            get: function () {
                return "\n        <style>\n            * {\n                font-family: Overpass,Open Sans,Arial,Helvetica,sans-serif;\n            }\n\n            :host {\n                flex: 0 0 auto;\n                margin: 0 0 1em;\n            }\n\n            form.search-bar { \n                box-sizing: border-box;\n                color: rgb(66,66,66);\n                cursor: auto;\n                display: flex;\n                flex-direction: row;\n                font-size: 16px;\n                line-height: 24px;\n                position: relative; \n                margin: 0;\n                width: 100%;\n            }\n        \n            form.search-bar div {\n                flex: 1 1 100%;\n            }\n            \n            input.user-search {\n                background-color: white;\n                border: 1px solid #ccc;\n                box-sizing: border-box;\n                font-size: 16px;\n                font-weight: 600;\n                height: 40px;\n                text-align: start;\n                padding: 8px;\n                transition-property: box-shadow, border-color;\n                transition-delay: 0s, 0s;\n                transition-duration: 0.45s, 0.45s;\n                transition-timing-function: ease, ease-in-out;\n                user-select: text;\n                width: 100%;\n                margin-bottom: 1em;\n            }\n        \n            input.user-search::-webkit-search-cancel-button{\n                position:relative;\n                -webkit-appearance: none;\n                height: 20px;\n                width: 20px;\n                background-image: url('https://static.jboss.org/rhd/images/icons/fa_times_icon.svg');\n                opacity: 1;\n            \u2002\u2002\u2002\u2002pointer-events: auto;\n            }\n        \n            button {\n                background: #c00;\n                border: 0;\n                color: #fff;\n                cursor: pointer;\n                font-size: 16px;\n                font-weight: 600;\n                height: 40px;\n                line-height: 1.2em;\n                padding: 9px 30px;\n                position: relative;\n                text-align: center;\n                text-decoration: none;\n                text-transform: uppercase;\n                transition: background .2s ease-in 0s;\n            }\n\n            button: hover { background-color: #8f0000; }\n        \n            button svg.svg-inline--fa { display:none; }\n        \n            @media only screen and (max-width: 768px) {\n                :host {\n                    margin-bottom: .5em;\n                }\n                button { display: block; padding: 9px 20px; }\n                button svg.svg-inline--fa { display: inline-block; }\n                button span { display: none; }\n            }\n            \n            " + index_1.dom.css() + "\n        </style>\n<form class=\"search-bar\" role=\"search\">\n    <div class=\"input-cont\">\n        <input value=\"" + this.term + "\" class=\"user-success user-search\" type=\"search\" id=\"query\" placeholder=\"Enter your search term\">\n    </div>\n    <button id=\"search-btn\"><span>SEARCH</span>" + searchIcon + "</button>\n</form>";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DPSearchBox, "tag", {
            get: function () {
                return 'dp-search-box';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DPSearchBox.prototype, "term", {
            get: function () {
                return this._term;
            },
            set: function (val) {
                if (this._term === val)
                    return;
                this._term = decodeURI(val);
                this.shadowRoot.querySelector('input').setAttribute('value', this.term);
            },
            enumerable: true,
            configurable: true
        });
        DPSearchBox.prototype.connectedCallback = function () {
            var _this = this;
            _super.prototype.connectedCallback.call(this);
            _super.prototype.render.call(this);
            top.addEventListener('params-ready', this._checkTerm);
            top.addEventListener('term-change', this._checkTerm);
            this.shadowRoot.addEventListener('submit', function (e) {
                e.preventDefault();
                _this._termChange();
                return false;
            });
            this.shadowRoot.querySelector('#search-btn').addEventListener('click', function (e) {
            });
        };
        Object.defineProperty(DPSearchBox, "observedAttributes", {
            get: function () {
                return ['term'];
            },
            enumerable: true,
            configurable: true
        });
        DPSearchBox.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
            this[name] = newVal;
        };
        DPSearchBox.prototype._checkTerm = function (e) {
            if (e.detail && e.detail.term) {
                this.term = e.detail.term;
            }
        };
        DPSearchBox.prototype._termChange = function () {
            this.term = this.shadowRoot.querySelector('input').value;
            var evt = {
                detail: {
                    term: this.term
                },
                bubbles: true,
                composed: true
            };
            this.dispatchEvent(new CustomEvent('term-change', evt));
        };
        return DPSearchBox;
    }(pfelement_umd_1.default));
    exports.default = DPSearchBox;
    pfelement_umd_1.default.create(DPSearchBox);
});
