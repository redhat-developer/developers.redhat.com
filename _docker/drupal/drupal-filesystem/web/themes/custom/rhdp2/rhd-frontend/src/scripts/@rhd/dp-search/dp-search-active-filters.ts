// import {PFElement} from '../../@pfelements/pfelement.umd.js';
import PFElement from '@patternfly/pfelement/pfelement.umd';
import DPSearchFilterGroup from './dp-search-filter-group';
import DPSearchFilterActiveItem from './dp-search-filter-active-item';

export default class DPSearchActiveFilters extends PFElement {
    get html() {
        return `
        <style>
            :host {
                display: flex;
                flex-direction: row;
                margin-bottom: 1em;
            }

            strong {
                flex: 0 1 auto;
                font-size: 1.2em;
                font-weight: 600;
                margin: .3em .7em 0 0;
                order: 1;
                white-space: nowrap;
            }

            .clearFilters {
                color: #06c;
                flex: 0 1 auto;
                font-size: 14px;
                font-weight: 100;
                margin-top: .3em;
                order: 3;
                text-decoration: none;
                white-space: nowrap;
                cursor: pointer;
            }

            @media only screen and (max-width: 768px) {
                strong {
                    display: none;
                }
            }
        </style>
        <strong>${this.title}</strong>
        <slot></slot>
        <a href="#" class="clearFilters">Clear Filters</a>`;
    }

    static get tag() { return 'dp-search-active-filters'; }

    _title = 'Active Filters:';
    _filters;
    _toggle = false;
    _modal;

    get title() {
        return this._title;
    }

    set title(val) {
        if (this._title === val) return;
        this._title = val;
    }

    get filters() {
        return this._filters;
    }

    set filters(val) {
        if (this._filters === val) return;
        this._filters = val;
    }

    constructor() {
        super(DPSearchActiveFilters, {delayRender: true});
        this._clearFilters = this._clearFilters.bind(this);
        this._addFilters = this._addFilters.bind(this);
        this._checkActive = this._checkActive.bind(this);
    }
    
    connectedCallback() {
        super.connectedCallback();
        super.render();

        top.addEventListener('filter-item-change', this._checkActive);
        top.addEventListener('filter-item-init', this._checkActive);
        top.addEventListener('search-complete', this._checkActive);
        top.addEventListener('params-ready', this._checkActive);
        top.addEventListener('clear-filters', this._clearFilters);
        this._addFilters();
        
        this.shadowRoot.addEventListener('click', e => {
            let evt = { bubbles: true, composed: true };
            switch (e.target['className']) {
                case 'showBtn':
                case 'cancel':
                case 'applyFilters':
                    e.preventDefault();
                    this.dispatchEvent(new CustomEvent('toggle-modal', evt));
                    break;
                case 'clearFilters':
                    e.preventDefault();
                    this.dispatchEvent(new CustomEvent('clear-filters', evt));
                    break;
                case 'more':
                    e.preventDefault();
                    break;
            }
        });
    }

    static get observedAttributes() { 
        return ['title']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    _checkActive(e) {
        if (e.detail) {
            let chk = top.document.querySelectorAll('dp-search-filter-item[active]');
            if (chk.length > 0) {
                this.style.display = 'block';
            } else {
                this.style.display = 'none';
            }
        }
    }

    _initActive(e, group_key, item) {
        if (e.detail && e.detail.filters) {
            Object.keys(e.detail.filters).forEach(group => {
                e.detail.filters[group].forEach(facet => {
                    if (group === group_key) {
                        if (facet === item.key) {
                            return true;
                        }
                    }
                });
            });
            
        }
        return false;
    }

    _addFilters() {
        var groups = this.filters && this.filters.facets ? this.filters.facets : [];
        for(let i=0; i < groups.length; i++) {
            var items = groups[i].items;
            for(let j=0; j < items.length; j++) {
                let item = new DPSearchFilterActiveItem();
                    item.name = items[j].name;
                    item.value = items[j].value;
                    item.inline = true;
                    item.bubble = false;
                    item.key = items[j].key;
                    item.group = groups[i].key;
                    this.appendChild(item)
                }
            }
    }

    applyFilters() {
        let evt = {
            bubbles: true,
            composed: true
        }
        this.dispatchEvent(new CustomEvent('apply-filters', evt));
    }

    _clearFilters(e) {
        this.style.display = 'none';
    }
}

PFElement.create(DPSearchActiveFilters);