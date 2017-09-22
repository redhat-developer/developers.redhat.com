class RHDPSearchURL extends HTMLElement {
    _uri = new URL(window.location.href); // https://developers.redhat.com/search/?q=term+term1+term2&f=a+b+c&s=sort&r=100
    _term = this.uri.searchParams.get('t');
    _filters = this._setFilters(this.uri.searchParams.getAll('f'));
    _sort = this.uri.searchParams.get('s');
    _qty = this.uri.searchParams.get('r');
    _params;
    _history;
    _init = true;

    get uri() {
        return this._uri;
    }

    set uri(val) {
        if (this._uri === val) return;
        this._uri = val;
        // https://developers.redhat.com/search/?q=term+term1+term2&f=a~1+2&f=b~2&f=c~1+4&s=sort&r=100
    }

    get term() {
        return this._term;
    }
    set term(val) {
        if (this._term === val) return;
        this._term = val;
        this.uri.searchParams.set('t', this._term);
        this.setAttribute('term', this.term);
    }

    get filters() {
        return this._filters;
    }
    set filters(val) {
        if (this._filters === val) return;
        this._filters = val;
    }

    get sort() {
        return this._sort;
    }
    set sort(val) {
        if (this._sort === val) return;
        this._sort = val;
        this.uri.searchParams.set('s', this._sort);
        this.setAttribute('sort', this._sort);
    }

    get qty() {
        return this._qty;
    }
    set qty(val) {
        if (this._qty === val) return;
        this._qty = val;
        this.setAttribute('qty', this._sort);
    }

    get init() {
        return this._init;
    }
    set init(val) {
        if (this._init === val) return;
        this._init = val;
    }

    //history.pushState({}, `Red Hat Developer Program Search: ${this.term}`, `?q=${decodeURIComponent(this.term).replace(' ', '+')}`);

    constructor() {
        super();

        this._changeAttr = this._changeAttr.bind(this);
        this._popState = this._popState.bind(this);
    }

    connectedCallback() {
        top.addEventListener('term-change', this._changeAttr);
        top.addEventListener('filter-item-change', this._changeAttr);
        top.addEventListener('sort-change', this._changeAttr);
        //top.addEventListener('load-more', this._changeAttr);
        top.addEventListener('search-complete', this._changeAttr);
        top.addEventListener('clear-filters', this._changeAttr);
        top.window.addEventListener('popstate', this._popState);
        // Ignoring tracking these for now
        // top.addEventListener('filter-group-toggle', this._changeAttr);
        // top.addEventListener('filter-group-more-toggle', this._changeAttr);
        //console.log(this.filters);
        this._paramsReady();
    }

    static get observedAttributes() { 
        return ['sort', 'term', 'qty']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    _popState(e) {
        this.uri = new URL(document.location.href); // https://developers.redhat.com/search/?q=term+term1+term2&f=a+b+c&s=sort&r=100
        this.term = this.uri.searchParams.get('t') || null;
        this.filters = this._setFilters(this.uri.searchParams.getAll('f'));
        this.sort = this.uri.searchParams.get('s');
        this.qty = this.uri.searchParams.get('r');
        this._paramsReady();
    }

    _paramsReady() {
        this.dispatchEvent(new CustomEvent('params-ready', {
            detail: { 
                term: this.term,
                filters: this.filters,
                sort: this.sort,
                qty: this.qty
            }, 
            bubbles: true 
        }));
    }

    _setFilters(filtersQS) {
        let filters = {};
        filtersQS.forEach(filter => {
            let kv = filter.split('~'),
                k = kv[0],
                v = kv[1].split(' ');
                filters[k] = v;
        });
        return filters;
    }

    _setFiltersQS(item : RHDPSearchFilterItem) {
        let filtersQS = {},
            add = item.active;
        
        if (add) {
            this.filters[item.group] = this.filters[item.group] || [];
            if (this.filters[item.group].indexOf(item.key) < 0) {
                this.filters[item.group].push(item.key);
            }
        } else {
            Object.keys(this.filters).forEach(group => {
                if (group === item.group) { 
                    let idx = this.filters[group].indexOf(item.key);
                    if (idx >= 0) {
                        this.filters[group].splice(idx, 1);
                        if (this.filters[group].length === 0) {
                            delete this.filters[group];
                        }
                    }
                }
            });
        }

        this.uri.searchParams.delete('f');
        Object.keys(this.filters).forEach(group => {
            this.uri.searchParams.append('f',`${group}~${this.filters[group].join(' ')}`)
        });
    }

    _changeAttr(e) {
        //console.log(e);
        switch (e.type) {
            case 'term-change':
                if (e.detail && typeof e.detail.term !== 'undefined' && e.detail.term.length > 0) {
                    this.term = e.detail.term;
                } else {
                    this.term = '';
                    this.uri.searchParams.delete('t');
                }
                break;
            case 'filter-item-change': //detail.facet
                //console.log('Filter Item Changed:', e.target);
                if (e.detail && e.detail.facet) {
                    this._setFiltersQS(e.detail.facet);
                }
                break;
            case 'clear-filters':
                this.uri.searchParams.delete('f');
                this.filters = {};
                break;
            case 'sort-change': // detail.sort
                if (e.detail && typeof e.detail.sort !== 'undefined') {
                    this.sort = e.detail.sort;
                }
                break;
            case 'load-more': // detail.qty
                break;
            case 'search-complete': // build querystring params
                return;
        }
        history.pushState({}, `RHDP Search: ${this.term ? this.term : ''}`, `${this.uri.pathname}${this.uri.search}`);
    }
}
