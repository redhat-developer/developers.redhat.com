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
