//import {PFElement} from '../../@pfelements/pfelement.umd.js';
import PFElement from '@patternfly/pfelement/pfelement.umd';

export default class DPSearchSortPage extends PFElement {
    get html() {
        return `
        <style>
        :host {
            display: block;
            border-bottom: 1px solid #ccc;
            margin: 0 0 1em 0;
            padding-bottom: 1em;
        }

        select { 
            width: auto;
            -webkit-appearance: none!important;
            -webkit-border-radius: 0;
            background-color: #fafafa;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjEyIiB3aWR0aD0iMjQiIGhlaWdodD0iMyIgdmlld0JveD0iMCAwIDYgMyI+PHBhdGggZD0iTTUuOTkyIDBsLTMgMy0zLTN6Ii8+PC9zdmc+);
            background-position: 100%;
            background-repeat: no-repeat;
            border: 1px solid #ccc;
            border-radius: 0;
            color: rgba(0,0,0,.75);
            font-family: Overpass,Open Sans,Arial,Helvetica,sans-serif;
            font-size: .875rem;
            height: 2.3125rem;
            line-height: normal;
            padding: .5rem 20px .5rem .5rem;
        }
        
        select:focus, select:active {
            outline:0;
            border:0;
            outline: 1px solid white;
            outline-offset: -2px;
        }
    
        
        .tight {
            display: none;
        }

        .tight .button {
            background: #ccc;
            text-decoration: none;
            border: 0;
            font-weight: 600;
            font-size: 16px;
            padding: 9px 25px;
            transition: background .2s ease-in 0s;
            line-height: 1.2em;
            cursor: pointer;
            position: relative;
            text-align: center;
            color: #333; 
            width: 100%;
            display: block;
            width: 150px;
            margin-right: 2em;
        }
    
        @media only screen and (max-width: 768px) {
            :host {
                display:none;
                align-self: flex-end; 
                border-bottom: none;
            }
            span { display: none; }
            select { 
                width: 150px; 
                text-align: center;
                text-align-last: center;
                font-weight: 600;
                height: auto;
                border: 1px solid #06c;
                line-height: 1.44;
                background-color: transparent;
                padding: 8px 0;
                color: #06c;
                font-size: 16px;
                position: relative;
            }
    
            select:hover, select:focus {
                background-color: #06c;
                color: #fff;
            }
        
            .roomy {
                display: none;
            }
            .tight { 
                display: block; 
            }
            .clear {
                padding: 0;
                margin: 0; 
                border: 1px solid white;
                width: auto;
                font-weight: bold;
            }
        }
        
        @media only screen and (max-width: 365px) {
            :host {
                position: relative;
                left: 0; top: 0;
                margin-left: 0px;
            }
        }
        </style>
    <span>Sort results by</span>
    <select>
        <option value="relevance">Relevance</option>
        <option value="most-recent">Most Recent</option>
    </select>`;
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