//import {PFElement} from '../../@pfelements/pfelement.umd.js';
// import { library, icon, dom } from '@fortawesome/fontawesome-svg-core/index'
// import {faChevronRight} from '@fortawesome/pro-solid-svg-icons/index';
import PFElement from '@patternfly/pfelement/dist/pfelement.umd';
import DPSearchFilterItem from './dp-search-filter-item';

// library.add(faChevronRight);
// const chevronRightIcon = icon(faChevronRight).html;

export default class DPSearchFilterGroup extends PFElement {
    get html() {
        return `
        <style>
            :host {
                cursor: pointer;
                display: block;
                position: relative;
                padding: 0 16px;
            }
            .primary, .secondary {
                padding-left: 8px;
            }

            .secondary {
                display: none;
            }

            h6 {
                font-size: 16px;
                font-weight: 700;
                padding: 16px 0;
                color: #72767b;
                margin: 0;
            }

            .toggle {
                float: right;
                font-weight: 600;
            }

            .toggle.expand {
                transform: rotate(90deg);
                transition: .1s ease-in-out;
            }

            a.more {
                color: #06c;
                cursor: pointer;
                text-decoration: none;
                line-height: 24px;
                font-size: 16px;
                font-weight: 700;
                display: block;
                padding-left: 8px;
            }
            a.more:hover {
                color: #004c98;
            }
            .hide, a.more.hide, [data-hide] {
                display: none;
            }
        </style>
        <h6 class="showFilters heading"><span class="group-name">${this.name}</span><span class="toggle"><i class="fas fa-chevron-right-icon"></i></span></h6>
        <div class="group">
            <div class="primary">
                <slot></slot>
            </div>
            <div class="secondary">
                <slot name="secondary"></slot>
            </div>
            <a href="#" class="more" data-hide>Show More</a>
        </div>`;
    }

    static get tag() { return 'dp-search-filter-group'; }

    _key;
    _name;
    _items: DPSearchFilterItem[] = [];
    _toggle = false;
    _more = false;

    get key() {
        return this._key;
    }
    set key(val) {
        if (this._key === val) return;
        this._key = val;
    }

    get name() {
        return this._name;
    }
    set name(val) {
        if (this._name === val) return;
        this._name = val;
        if (this.shadowRoot.querySelector('.group-name')) {
            this.shadowRoot.querySelector('.group-name').innerHTML = this._name;
        }
    }

    get items() {
        return this._items;
    }
    set items(val) {
        if (this._items === val) return;
        this._items = val;
        if (this._items.length > 5) {
            if (!this.shadowRoot.querySelector('.more')) {
                this.shadowRoot.querySelector(".moreBtn").removeAttribute('data-hide');
            }
        } else {
            if (this.shadowRoot.querySelector('.more')) {
                this.shadowRoot.removeChild(this.shadowRoot.lastChild);
            }
        }
    }

    get toggle() {
        return this._toggle;
    }
    set toggle(val) {
        if (this._toggle === val) return;
        this._toggle = val;
        this.shadowRoot.querySelector('.group').className = this.toggle ? 'group' : 'group hide';
        this.shadowRoot.querySelector('.toggle').className = this.toggle ? 'toggle expand' : 'toggle';
    }

    get more() {
        return this._more;
    }
    set more(val) {
        if (this._more === val) return;
        this._more = val;
        this.shadowRoot.querySelector('.more')['innerText'] = this.more ? 'Show Less' : 'Show More';
        this.shadowRoot.querySelector('.secondary')['style'].display = this.more ? 'block' : 'none';
    }

    constructor() {
        super(DPSearchFilterGroup, { delayRender: true });
    }

    connectedCallback() {
        super.connectedCallback();
        super.render();
        this.shadowRoot.querySelector('h6').addEventListener('click', e => {
            e.preventDefault();
            this.toggle = !this.toggle;
        });
        this.shadowRoot.querySelector('.group').addEventListener('click', e => {
            if (e.target['className'].indexOf('more') > -1) {
                e.preventDefault();
                this.more = !this.more;
            }            
        });

        let slotItems = this.querySelectorAll('dp-search-filter-item[slot]').length;
        if (slotItems === 0) {
            this.shadowRoot.querySelector('.more').setAttribute('data-hide','');
        }

        this.toggle = true;
    }

    static get observedAttributes() { 
        return ['name', 'key', 'toggle', 'items', 'more']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
}

PFElement.create(DPSearchFilterGroup);