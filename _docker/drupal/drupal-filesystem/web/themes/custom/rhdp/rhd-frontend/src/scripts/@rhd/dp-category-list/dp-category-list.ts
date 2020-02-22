import RHElement from '@rhelements/rhelement';
import DPCategoryItemList from './dp-category-item-list';

export default class DPCategoryList extends RHElement {
    template = (el: any) => {
        const tpl = document.createElement("template");
        tpl.innerHTML = `
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
                    max-width: 576px;
                }

                @media (min-width: 576px) {
                    section {
                        grid-template-columns: repeat(2, 1fr);
                        grid-column-gap: 15px;
                        margin: 0 15px;
                        max-width: 768px;
                        justify-items: center;
                    }
                }

                @media (min-width: 768px) {
                    section {
                        grid-template-columns: repeat(3, 1fr);
                        grid-column-gap: 30px;
                        margin: 0 30px;
                        max-width: 1024px;
                        justify-items: center;
                    }
                }

                @media (min-width: 1024px) {
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
        return tpl;
    }

    items = [];
    lastActive = 0;
    active = 0;

    constructor() {
        super('dp-category-list');
    }

    connectedCallback() {
        super.render(this.template(this));

        let resizeTimer: number;

        window.addEventListener('resize', e => {
            clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(this.windowRedrawComponent.bind(this), 666);
        });

        this.addEventListener('dp-category-selected', e => {
            let detail = e['detail'];
            this.dpCategorySelected(detail);
        });

        this.querySelector('dp-category').setAttribute('visible','');
    }

    static get observedAttributes() { 
        return ['url', 'name']; 
    }

    attributeChangedCallback(name: string | number, oldVal: any, newVal: any) {
        this[name] = newVal;
    }

    calculateColumns() {
        let w = window.innerWidth;
        let cols = 4;
        if (w < 576) {
            cols = 1;
        } else if (w < 768) {
            cols = 2;
        } else if (w < 1024) {
            cols = 3;
        }
        return cols;
    }

    windowRedrawComponent() {    
       if(this.active !== 0) {
        this.lastActive = this.active;
        this.dpCategorySelected({ index: this.active });
        this.dpCategorySelected({ index: this.lastActive });
       }
    }

    dpCategorySelected(detail: { index: number; }) {

        let cols = this.calculateColumns();
        let len = this.querySelectorAll('dp-category').length+1;
        let list = this.querySelector('dp-category-item-list[visible]');
        let calc = 1 + (Math.ceil(detail.index / cols) * cols);
        let idx = calc <= len ? calc : len;
        
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
    }

    _setVisibleCategories(index: any) {

    }
}

window.customElements.define('dp-category-list', DPCategoryList);