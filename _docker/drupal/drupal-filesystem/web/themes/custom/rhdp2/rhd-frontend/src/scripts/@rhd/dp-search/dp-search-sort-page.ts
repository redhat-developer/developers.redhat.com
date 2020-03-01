//import {PFElement} from '../../@pfelements/pfelement.umd.js';
import PFElement from '@patternfly/pfelement/pfelement.umd';

export default class DPSearchSortPage extends PFElement {
    get html() {
        return `<span>Sort results by</span>
        <div class="rhd-c-select">
          <select>
            <option value="relevance">Relevance</option>
            <option value="most-recent">Most Recent</option>
          </select>
        </div>`;
    }

    static get tag() { return 'dp-search-sort-page'; }

    _sort;

    get sort() {
        return this._sort;
    }
    set sort(val) {
        if (this._sort === val) return;
        this._sort = val;
        this.setAttribute('sort', this._sort);
        this.shadowRoot.querySelector('select').value = val;
    }
    constructor() {
        super(DPSearchSortPage, {delayRender: true});

        this._sortChange = this._sortChange.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        super.render();
        top.addEventListener('params-ready', this._sortChange);
        top.addEventListener('sort-change', this._sortChange);
        this.shadowRoot.querySelector('select').onchange = this._sortChange;
    }

    static get observedAttributes() {
        return ['sort'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    _sortChange(e) {
        if (e.detail && e.detail.sort) {
            this.sort = e.detail.sort;
        } else {
            if ( e.target['options'] && typeof e.target['selectedIndex'] !== 'undefined') {
                this.sort = e.target['options'][e.target['selectedIndex']].value;
                let evt = {
                    detail: {
                        sort: this.sort
                    },
                    bubbles: true,
                    composed: true
                };
                this.dispatchEvent(new CustomEvent('sort-change', evt));
            }
        }
    }
}

PFElement.create(DPSearchSortPage);
