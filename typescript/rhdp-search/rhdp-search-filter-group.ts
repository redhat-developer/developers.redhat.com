export class RHDPSearchFilterGroup extends HTMLElement {

    constructor() {
        super();
    }

    name = 'Search Filter Group';
    template = (strings, name) => {
        return `<div><strong>RHDP ${name}</strong></div>`; };

    connectedCallback() {
        this.innerHTML = this.template`${this.name}`;
    }

    static get observedAttributes() { 
        return ['name']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.innerHTML = this.template`${this.name}`;
    }
}

customElements.define('rhdp-search-filter-group', RHDPSearchFilterGroup);
