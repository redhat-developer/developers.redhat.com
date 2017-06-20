class RHDPSearchResultCount extends HTMLElement {
    _count = 0;
    _term = '';

    get count() {
        return this._count;
    }

    set count(val) {
        if (this._count === val) return;
        this._count = val;
        this.setAttribute('count', val.toString());
        this.setText();
    }

    get term() {
        return this._term;
    }

    set term(val) {
        if (this._term === val) return;
        this._term = val;
        this.setAttribute('term', val);
        this.setText();
    }

    constructor() {
        super();
    }

    template = (strings, count, term) => {
        return `${count} results found for ${term}`; 
    };

    connectedCallback() {
        
    }

    static get observedAttributes() { 
        return ['count', 'term']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    setText() {
        if (this.term.length > 0 ) {
            this.innerHTML = this.template`${this.count}${this.term}`;
        }
    }
}
