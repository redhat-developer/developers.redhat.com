class RHDPSearchResultCount extends HTMLElement {
    _count = 0;
    _term = '';
    _loading = true;

    get count() {
        return this._count;
    }

    set count(val) {
        if (this._count === val) return;
        this._count = val;
        this.setAttribute('count', val.toString());
    }

    get term() {
        return this._term;
    }

    set term(val) {
        val = decodeURI(val).replace('<','&lt;').replace('>','&gt;');
        if (this._term === val) return;
        this._term = val;
        this.setAttribute('term', val);
    }

    get loading() {
        return this._loading;
    }
    set loading(val) {
        if (this._loading === val) return;
        this._loading = val;
    }

    constructor() {
        super();

        this._setText = this._setText.bind(this);
    }

    template = (strings, count, term) => {
        return `${count} results found for ${term.replace('<','&lt;').replace('>','&gt;')}`; 
    };

    connectedCallback() {
        top.addEventListener('params-ready', this._setText);
        top.addEventListener('search-start', e => { this.loading = true; this._setText(e); });
        top.addEventListener('search-complete', e => { this.loading = false; this._setText(e); });
        //top.addEventListener('term-change', this._setText);
    }

    static get observedAttributes() { 
        return ['count', 'term']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
        this.innerHTML = `${this.count} results found ${this.term ? `for ${this.term}` : ''}`
    }

    _setText(e) {
        if (e.detail) {
            if (typeof e.detail.invalid === 'undefined') {
                if (e.detail.term && e.detail.term.length > 0) {
                    this.term = e.detail.term;
                } else {
                    this.term = '';
                }
                if (e.detail.results && e.detail.results.hits && e.detail.results.hits.total) {
                    this.count = e.detail.results.hits.total;
                } else {
                    this.count = 0;
                }
                if (!this.loading) {
                    this.innerHTML = `${this.count} results found ${this.term ? `for ${this.term}` : ''}`;
                }
            } else { 
                this.term = '';
                this.count = 0;
                this.innerHTML = '';
            }
        } else {
            this.term = '';
            this.count = 0;
            this.innerHTML = '';
        }
    }
}

customElements.define('rhdp-search-result-count', RHDPSearchResultCount);