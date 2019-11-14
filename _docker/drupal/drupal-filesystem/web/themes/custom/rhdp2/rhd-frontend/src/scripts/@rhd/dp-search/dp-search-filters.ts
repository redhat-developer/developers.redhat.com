// import {PFElement} from '../../@pfelements/pfelement.umd.js';
import PFElement from '@patternfly/pfelement/pfelement.umd';
import DPSearchFilterGroup from './dp-search-filter-group';
import DPSearchFilterItem from './dp-search-filter-item';

export default class DPSearchFilters extends PFElement {
    get html() {
        return `
        <style>
            :host {
                display: block;
            }
            .title {
                background: #e6e7e8; 
                color: #000;
                text-transform: uppercase;
                padding: .5em 1em;
                font-weight: 600;
            }
            .cancel { display: none; }
            .showBtn { 
                display: none;
                background: #ccc;
                text-decoration: none;
                border: 0;
                height: 40px;
                font-weight: 600;
                font-size: 16px;
                padding: 9px 40px;
                transition: background .2s ease-in 0s;
                line-height: 1.2em;
                cursor: pointer;
                position: relative;
                text-align: center;
                color: #333; 
                width: 100%;
                }
            dp-search-sort-page { display: none; }
            .groups {
                background-color: #f9f9f9;
                padding-bottom: 30px;
                padding-top: 20px;
            }
            .active-type {
                display: flex;
                flex-direction: row;
                margin-bottom: 1em;
                .inline {
                    font-size: 16px;
                    font-weight: 600;
                }

                .clearFilters {
                    font-size: 16px;
                }

            }
            .active-type strong {
                flex: 0 1 auto; 
                order: 1; 
                font-weight: 600;
                font-size: 1.2em;
                margin: 0.3em .7em 0 0;
                white-space: nowrap;
            }
            .active-type div { flex: 1 1 auto; order: 2; list-style: none; }
            .active-type a {
                flex: 0 1 auto;
                order: 3;
                text-decoration: none;
                color: #0066CC;
                margin-top: .3em;
                font-weight: 100;
                font-size: 14px;
                white-space: nowrap;
                &:hover, &:active, &:focus { color: #004080; }
            }

            #footer { display: none; }

            @media only screen and (max-width: 768px) {
                :host {
                    display: flex;
                    flex-direction: row;
                    flex: none; 
                    align-self: flex-start; 
                    border: none;
                    margin: 0 0 1.3em 0; 
                }

                .split { flex: 1 0 auto; }
                .split.right { text-align: right; }

                dp-search-sort-page { display: inline-block; margin: 0;}

                .control {
                    display: none;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    padding-top: 51px;
                    background: rgba(0,0,0,.5);
                    border: none;
                    z-index: 99;
                    right: 100%;
                    position: absolute;
                    top: 100px;
                }
                .title { flex: 0 0 40px; order: 1; vertical-align: middle; }
                .showBtn {
                    display: block;
                    width: 150px;
                    height: auto;
                    border: 1px solid #06c;
                    line-height: 1.44;
                    background-color: transparent;
                    padding: 8px 0;
                    color: #06c;
                }

                .showBtn:hover, .showBtn:focus {
                        background-color: #06c;
                        color: #fff;
                }
            }

        </style>
<div class="split"><a class="showBtn">Show Filters</a></div>
<div class="split right"><dp-search-sort-page></dp-search-sort-page></div>
<div class="control" id="control">
    <div class="title">${this.title}</div>
    <div class="groups">
    <slot></slot>
    </div>
</div>`;
    }

    static get tag() { return 'dp-search-filters'; }

    _type = '';
    _title = 'Filter By';
    _filters;
    _toggle = false;
    _modal;

    get type() {
        return this._type;
    }

    set type(val) {
        if (this._type === val) return;
        this._type = val;
    }

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

    get toggle() {
        return this._toggle;
    }

    set toggle(val) {
        if (this._toggle === val) return;
        this._toggle = val;
        if(this._toggle) {
            this.shadowRoot.querySelector('.cover').className = 'cover modal';
            window.scrollTo(0,0);
            document.body.style.overflow = 'hidden';
            this.style.height = window.innerHeight + 'px';
        } else {
            this.shadowRoot.querySelector('.cover').className = 'cover';
            document.body.style.overflow = 'auto';
        }
    }

    constructor() {
        super(DPSearchFilters, {delayRender: true});
        this._toggleModal = this._toggleModal.bind(this);
        this._clearFilters = this._clearFilters.bind(this);
    }
    
    connectedCallback() {
        super.connectedCallback();
        super.render();
        this.addGroups();
        
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
        top.addEventListener('toggle-modal', this._toggleModal);
    }

    static get observedAttributes() { 
        return ['type', 'title', 'toggle']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    addGroups() {
        let groups = this.filters && this.filters.facets ? this.filters.facets : [],
            len = groups.length;
        for(let i=0; i < len; i++) {
            let group = new DPSearchFilterGroup(),
                groupInfo = groups[i],
                gLen = groupInfo.items.length;
                for(let j=0; j < gLen; j++) {
                    let item = new DPSearchFilterItem();
                    item.name = groupInfo.items[j].name;
                    item.value = groupInfo.items[j].value;
                    item.active = groupInfo.items[j].active;
                    item.key = groupInfo.items[j].key;
                    item.group = groupInfo.key;
                    group.items.push(item);
                }
            group.key = groupInfo.key;
            group.name = groupInfo.name;        
            this.shadowRoot.querySelector('.groups').appendChild(group);
        }

    }

    _toggleModal(e) {
        if (this.type === 'modal') {
            this.toggle = !this.toggle;
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

PFElement.create(DPSearchFilters);