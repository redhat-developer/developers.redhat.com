// import {PFElement} from '../../@pfelements/pfelement.umd.js';
// import { library, icon, dom } from '@fortawesome/fontawesome-svg-core/index'
// import {faSearch} from '@fortawesome/pro-solid-svg-icons/index';
import PFElement from '@patternfly/pfelement/pfelement.umd';

// library.add(faSearch);

// const searchIcon = icon(faSearch,{ transform: {
//     size: 18
//     }}).html;

export default class DPSearchBox extends PFElement {
    get html() {
        return `
        <style>
            * {
                font-family: Overpass,Open Sans,Arial,Helvetica,sans-serif;
            }
            .fa-search { font-size: 18px; }

            :host {
                flex: 0 0 auto;
                margin: 0 0 1em;
            }

            form.search-bar { 
                box-sizing: border-box;
                color: rgb(66,66,66);
                cursor: auto;
                display: flex;
                flex-direction: row;
                font-size: 16px;
                line-height: 24px;
                position: relative; 
                margin: 0;
                width: 100%;
            }
        
            form.search-bar div {
                flex: 1 1 100%;
            }
            
            input.user-search {
                background-color: white;
                border: 1px solid #ccc;
                box-sizing: border-box;
                font-size: 16px;
                font-weight: 600;
                height: 40px;
                text-align: start;
                padding: 8px;
                transition-property: box-shadow, border-color;
                transition-delay: 0s, 0s;
                transition-duration: 0.45s, 0.45s;
                transition-timing-function: ease, ease-in-out;
                user-select: text;
                width: 100%;
                margin-bottom: 1em;
            }
        
            input.user-search::-webkit-search-cancel-button{
                position:relative;
                -webkit-appearance: none;
                height: 20px;
                width: 20px;
                background-image: url('https://static.jboss.org/rhd/images/icons/fa_times_icon.svg');
                opacity: 1;
                pointer-events: auto;
            }
        
            button {
                background: #c00;
                border: 0;
                color: #fff;
                cursor: pointer;
                font-size: 16px;
                font-weight: 600;
                height: 40px;
                line-height: 1.2em;
                padding: 9px 30px;
                position: relative;
                text-align: center;
                text-decoration: none;
                text-transform: uppercase;
                transition: background .2s ease-in 0s;
            }

            button: hover { background-color: #8f0000; }
        
            button svg.svg-inline--fa { display:none; }
        
            @media only screen and (max-width: 768px) {
                :host {
                    margin-bottom: .5em;
                }
                button { display: block; padding: 9px 20px; }
                button svg.svg-inline--fa { display: inline-block; }
                button span { display: none; }
            }
        </style>
<form class="search-bar" role="search">
    <div class="input-cont">
        <input value="${this.term}" class="user-success user-search" type="search" id="query" placeholder="Enter your search term">
    </div>
    <button id="search-btn"><span>SEARCH</span><i class="fas fa-search"></i></button>
</form>`;
    }
    _term = '';

    static get tag() {
        return 'dp-search-box';
    }

    get term() {
        return this._term;
    }
    set term(val) {
        if (this._term === val) return;
        this._term = decodeURI(val);
        this.shadowRoot.querySelector('input').setAttribute('value', this.term);
    }

    name = 'Search Box';

    constructor() {
        super(DPSearchBox, {delayRender: true});
        this._checkTerm = this._checkTerm.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        super.render();
        top.addEventListener('params-ready', this._checkTerm);
        top.addEventListener('term-change', this._checkTerm);

        this.shadowRoot.addEventListener('submit', e => {
            e.preventDefault();
            this._termChange();
            return false;
        });

        this.shadowRoot.querySelector('#search-btn').addEventListener('click', e => { 
            
        });
    }

    static get observedAttributes() { 
        return ['term']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    _checkTerm(e) {
        if(e.detail && e.detail.term) {
            this.term = e.detail.term;
        }
    }

    _termChange() {
        this.term = this.shadowRoot.querySelector('input').value;
        let evt = {
            detail: { 
                term: this.term
            }, 
            bubbles: true,
            composed: true
        };
        this.dispatchEvent(new CustomEvent('term-change', evt));
    }
}

PFElement.create(DPSearchBox);