import RHElement from '@rhelements/rhelement';

export default class DPCategoryItem extends RHElement {
    template = el => {
        const tpl = document.createElement("template");
        tpl.innerHTML = `
            <style>
                
            </style>
            <slot></slot>
            `;
        return tpl;
    }
    constructor() {
        super('dp-category-item');
        
    }

    connectedCallback() {
        super.render(this.template(this));
    }

    static get observedAttributes() { 
        return ['url', 'name']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
}

window.customElements.define('dp-category-item', DPCategoryItem);