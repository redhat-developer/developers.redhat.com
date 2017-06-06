export class RHDPSearchFilters extends HTMLElement {
    _type = '';

    get type() {
        return this._type;
    }

    set type(val) {
        if (this._type === val) return;
        this._type = val;
    }

    constructor() {
        super();
    }

    name = 'Search Filters';
    template = (strings, name, type) => {
        return `<div><strong>RHDP ${type} ${name}</strong></div>`; };

    connectedCallback() {
        this.innerHTML = this.template`${this.name}${this.type}`;
    }

    static get observedAttributes() { 
        return ['name']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.innerHTML = this.template`${this.name}${this.type}`;
    }
}

customElements.define('rhdp-search-filters', RHDPSearchFilters);
