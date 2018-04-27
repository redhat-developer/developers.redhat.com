import RHElement from '../rhelement';
import DPCategoryItemList from './dp-category-item-list';

export default class DPCategoryList extends RHElement {
    template = el => {
        const tpl = document.createElement("template");
        tpl.innerHTML = `
<style>
    :host {
        position: relative;
        background-color: #F9F9F9;
        padding: 30px 0;
        display: block;
    }
    section {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 30px;
        margin: 0 auto;
        width: 1200px;
        justify-items: center;
    }
</style>
<section data-rhd-grid="quad">
<slot></slot>
</section>
`;
        return tpl;
    }

    items = [];
    active = 0;

    constructor() {
        super('dp-category-list');
    }

    connectedCallback() {
        super.render(this.template(this));

        let li = this.querySelectorAll('dp-category-item-list');
        for( let ele in li ) {
            this.items.push(li[ele]);
        };
        //this.setAttribute('data-rhd-grid', 'quad');

        this.addEventListener('dp-category-selected', e => {
            let detail = e['detail'];
            let len = this.querySelectorAll('dp-category').length;
            let idx = 1 + (Math.ceil(detail.index / 4) * 4) || len;
            let list = this.items[detail.index-1];
            if (detail.index === this.active) {
                this.removeChild(this.items[this.active-1]);
                this.active = 0;
            } else {
                if (this.active > 0) {
                    this.removeChild(this.items[this.active-1]);
                    this.active = 0;
                }
                let rowEle = this.querySelector(`dp-category:nth-child(${idx})`)
                this.active = detail.index;
                list.index = detail.index || 1;
                list['style'].display = 'block';
                if (idx <= len) {
                    this.insertBefore(list, rowEle);
                } else {
                    this.appendChild(list);
                }
            }
        });

        this.querySelector('dp-category').setAttribute('visible','');
        
    }

    static get observedAttributes() { 
        return ['url', 'name']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
}

window.customElements.define('dp-category-list', DPCategoryList);