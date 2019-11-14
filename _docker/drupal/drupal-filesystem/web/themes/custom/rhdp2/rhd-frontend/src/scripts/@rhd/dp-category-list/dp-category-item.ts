import PFElement from '@patternfly/pfelement/pfelement.umd';
// import PFElement from '@patternfly/pfelement/pfelement.umd';

export default class DPCategoryItem extends PFElement {
    get html() {
        return `
            <style>
            
            </style>
            <slot></slot>
            `;
    }

    static get tag() { return 'dp-category-item'; }

    constructor() {
        super(DPCategoryItem);
        
    }

    connectedCallback() {
        super.connectedCallback();
    }

    static get observedAttributes() { 
        return ['url', 'name']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
}

PFElement.create(DPCategoryItem);
// window.customElements.define('dp-category-item', DPCategoryItem);