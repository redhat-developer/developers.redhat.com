//import {PFElement} from '../../@pfelements/pfelement.umd.js';
import PFElement from '@patternfly/pfelement/pfelement.umd';
import DPCategoryItemList from './dp-category-item-list';

export default class DPCategoryList extends PFElement {
    get html() {
        return `
<style>
    :host {
        position: relative;
        background-color: #F9F9F9;
        padding: 30px 0 15px 0;
        display: block;
    }

    section {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-auto-flow: row;
        grid-gap: 0;
        margin: 0;
        max-width: 500px;
    }

    @media (min-width: 500px) {
        section {
            grid-template-columns: repeat(2, 1fr);
            grid-column-gap: 15px;
            margin: 0 15px;
            max-width: 800px;
            justify-items: center;
        }
    }

    @media (min-width: 800px) {
        section {
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 30px;
            margin: 0 30px;
            max-width: 1200px;
            justify-items: center;
        }
    }

    @media (min-width: 1200px) {
        section {
            grid-template-columns: repeat(4, 1fr);
            grid-column-gap: 30px;
            margin: 0 auto;
            max-width: 1260px;
            justify-items: center;
        }
    }
</style>
<section >
<slot></slot>
</section>
`;
    }

    static get tag() { return 'dp-category-list'; }

    items = [];
    active = 0;

    constructor() {
        super(DPCategoryList);
    }

    connectedCallback() {
        super.connectedCallback();

        // let li = this.querySelectorAll('dp-category-item-list');
        // for( let ele in li ) {
        //     this.items.push(li[ele]);
        // };
        // //this.setAttribute('data-rhd-grid', 'quad');

        this.addEventListener('dp-category-selected', e => {
            let w = window.innerWidth;
            let cols = 4;
            if (w < 500) {
                cols = 1;
            } else if (w < 800) {
                cols = 2;
            } else if (w < 1200) {
                cols = 3;
            }
            let detail = e['detail'];
            let len = this.querySelectorAll('dp-category').length+1;
            let calc = 1 + (Math.ceil(detail.index / cols) * cols);
            let idx = calc <= len ? calc : len;
            let list = this.querySelector('dp-category-item-list[visible]');
            if (list) {
                list.removeAttribute('visible');
                this.removeChild(list);
            }
            
            if (detail.index === this.active) {
                let a = this.querySelector('dp-category[visible]');
                if (a) {
                    a.appendChild(list);
                }
                this.active = 0;
            } else {
                if (this.active > 0) {
                    let a = this.querySelector(`dp-category:nth-child(${this.active})`);
                    if (a) {
                        a.removeAttribute('visible');
                        a.appendChild(list);
                    }
                    //this.removeChild(this.items[this.active-1]);
                    this.active = 0;
                }
                
                this.active = detail.index;
                list = this.querySelector(`dp-category:nth-child(${this.active})`).querySelector('dp-category-item-list');
                
                if (idx < len) {
                    let rowEle = this.querySelector(`dp-category:nth-child(${idx})`);
                    this.insertBefore(list, rowEle);
                } else {
                    this.appendChild(list);
                }

                list.setAttribute('visible','');
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

    _setVisibleCategories(index) {

    }
}

PFElement.create(DPCategoryList);
// window.customElements.define('dp-category-list', DPCategoryList);