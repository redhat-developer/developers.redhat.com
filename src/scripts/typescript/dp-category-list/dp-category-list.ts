const template = document.createElement("template");
template.innerHTML = `
    <style>
    * {
        background: #f63;    
    }
    </style>
    <h4>Category List</h4>
    <slot></slot>
`;

class DPCategoryList extends RHElement {
    constructor() {
        super('dp-category-list', template);
        
    }

    connectedCallback() {

    }

    static get observedAttributes() { 
        return ['url', 'name']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
}

window.customElements.define('dp-category-list', DPCategoryList);