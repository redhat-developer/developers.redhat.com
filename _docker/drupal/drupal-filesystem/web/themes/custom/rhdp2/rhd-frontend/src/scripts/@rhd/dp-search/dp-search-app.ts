//import {PFElement} from '../../@pfelements/pfelement.umd.js';
import PFElement from '@patternfly/pfelement/pfelement.umd';
import DPSearchURL from './dp-search-url';
import DPSearchModalFilters from './dp-search-modal-filters';

export default class DPSearchApp extends PFElement {
    get html() {
        return `
        <style>

    :host { 
        display: flex;
        flex-flow: column;
        font-family: "Overpass", "Open Sans", Arial, Helvetica, sans-serif;
        margin-bottom: 30px;
    }

    .query { flex: 0 0 auto; }
    .content { flex: 1 1 auto; display: flex; flex-flow: row; position: relative;}
    .filters { flex: 0 0 28%; margin-right: 32px; }
    .results { flex: 1 1 auto; display: flex; flex-flow: column; }

    .hide { display: none; }
    
    .show { display: block; }
    
    .mobile { display: none; }

    h2 { 
        flex: 0 0 auto; 
        margin-top: 30px;
        font-size: 38px;
        line-height: 1.24;
        color: #242424;
        font-weight: 500;
        margin-bottom: 16px;
    }

    .loading {
        background:url("https://developers.redhat.com/images/icons/ajax-loader.gif") center 80px no-repeat;
        min-height:250px;
    }

    @media only screen and (max-width: 768px) {
        .content {
            flex-flow: column;
        }
        .filters { flex: 0 0 auto; margin-right: 0; }
    }
        </style>
    <h2>${this.name}</h2>
    <section class="query"><slot name="query"></slot></section>
    <section class="content">
        <section class="filters"><slot name="filters"></slot></section>
        <section class="results">
            <slot></slot>
        </section>
    </section>
    `;
    }

    static get tag() {
        return 'dp-search-app';
    }
    constructor() {
        super(DPSearchApp, {delayRender: true});
    }

    _name = 'Search';
    _url;

    get name() {
        return this._name;
    }

    set name(val) {
        if (this._name === val) return;
        this._name = val;
        this.setAttribute('name', this.name);
    }

    get url() {
        return this._url;
    }

    set url(val) {
        if (this._url === val) return;
        this._url = val;
        //this.query.url = this.url;
        this.setAttribute('url', this.url);
    }

    urlEle = new DPSearchURL();
    modal = new DPSearchModalFilters();

    connectedCallback() {
        super.connectedCallback();
        super.render();
        top.document.body.appendChild(this.modal);
        setTimeout(() => { top.document.body.appendChild(this.urlEle); }, 1000) 
    }

    static get observedAttributes() { 
        return ['url', 'name']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    toggleModal(e) {
        this.modal.toggle = e.detail.toggle;
    }
}

PFElement.create(DPSearchApp);