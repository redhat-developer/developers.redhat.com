import RHElement from '../rhelement';

export default class DPCategoryItemList extends RHElement {
    template = el => {
        const tpl = document.createElement("template");
        tpl.innerHTML = `
            <style>
            :host {
                display: none;
                grid-column: span 4;
            }

            div {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-gap: 30px;
                position: relative;
                border: 1px solid #CCCCCC;
                background-color: #FFFFFF;
                padding: 30px;
                margin-bottom: 30px;
            }

            div:after, div:before {
                bottom: 100%;
                left: ${el.index%4 > 0 ? ((2*(el.index%4))-1) * 12.5 : 7 * 12.5}%;
                border: solid transparent;
                content: " ";
                height: 0;
                width: 0;
                position: absolute;
                pointer-events: none;
            }
            
            div:after {
                border-bottom-color: #FFFFFF;
                border-width: 15px;
                margin-left: -15px;
            }
            div:before {
                border-bottom-color: #CCCCCC;
                border-width: 16px;
                margin-left: -16px;
            }
            </style>
            <div>
            <slot></slot>
            </div>
            `;
        return tpl;
    }

    _index = 1;

    get index() {
        return this._index;
    }
    set index(val) {
        if (this._index === val) return;
        this._index = val;
        super.render(this.template(this));
    }

    constructor() {
        super('dp-category-item-list');
        
    }

    connectedCallback() {
        super.render(this.template(this));
    }

    static get observedAttributes() { 
        return ['index']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
}

window.customElements.define('dp-category-item-list', DPCategoryItemList);