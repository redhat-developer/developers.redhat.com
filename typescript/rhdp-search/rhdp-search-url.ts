class RHDPSearchURL extends HTMLElement {
    _url = window.location.href; // https://developers.redhat.com/search/?q=term+term1+term2&f=a+b+c&s=sort&r=100
    _term;
    _filters;
    _sort;
    _qty;
    _params;
    _history;

    get url() {
        return this._url;
    }

    set url(val) {
        if (this._url === val) return;
        this._url = val;
        window.location.href = this._url;
        this.setAttribute('url', this._url);
    }

    get term() {
        return this._term;
    }
    set term(val) {
        if (this._term === val) return;
        this._term = val;
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
    }

    get qty() {
        return this._qty;
    }
    set qty(val) {
        if (this._qty === val) return;
        this._qty = val;
    }

    //history.pushState({}, `Red Hat Developer Program Search: ${this.term}`, `?q=${decodeURIComponent(this.term).replace(' ', '+')}`);

    constructor() {
        super();
    }

    connectedCallback() {
        
    }

    static get observedAttributes() { 
        return ['count', 'term']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    
}
