//import {PFElement} from '../../@pfelements/pfelement.umd.js';
import PFElement from '@patternfly/pfelement/pfelement.umd';
import DPSearchResult from './dp-search-result';

export default class DPSearchResults extends PFElement {
    get html() {
        return `
        <style>
            :host {
                display: flex;
                flex-direction: column;
            }

            [data-hide] {
                display: none;
            }

            h4 { 
                font-size: 27px;
                font-weight: 600;
                color: #242424;
                line-height: 1.5;
                margin-bottom: 16px;
                margin-top: 16px;
            }

            p {
                font-size: 16px;
                line-height: 1.5;
                text-align: center;
            }

            div.moreBtn {
                text-align: center;
            }

            a.moreBtn {
                background-color: #fff;
                border: 1px solid #06c;
                color: #06c;
                display: block;
                font-weight: 600;
                line-height: 1.44;
                margin: 0 auto;
                max-width: 165px;
                padding: 8px 35px;
                text-transform: uppercase;
                cursor: pointer;
                text-decoration: none;
            }
            a.moreBtn:hover {
                background-color: #06c;
                color: #fff;
            }

            .loading {
                background: url(https://developers.redhat.com/images/icons/ajax-loader.gif) center 80px no-repeat;
                min-height: 250px;
            }
        </style>
        <slot></slot>
        <div class="loading" data-hide></div>
        <div class="moreBtn" data-hide><a class="moreBtn" href="#">Load More</a></div>
        <p class="end-of-results" data-hide>- End of Results -</p>
        <div class="invalidMsg" data-hide>
        <h4>Well, this is awkward. No search term was entered yet, so this page is a little empty right now.</h4>
        <p>After you enter a search term in the box above, you will see the results displayed here. 
        You can also use the filters to select a content type, product or topic to see some results too. 
        Try it out!</p>
        </div>`;
    }

    static get tag() { return 'dp-search-results'; }

    _results;
    _more = false;
    _last = 0;
    _valid = true;

    get results() {
        return this._results;
    }

    set results(val) {
        if (this._results === val) return;
        this._results = val;
        this._renderResults(false);
    }

    get more() {
        return this._more;
    }
    set more(val) {
        if (this._more === val) return;
        this._more = val;
    }

    get last() {
        return this._last;
    }

    set last(val) {
        if (this._last === val) return;
        this._last = val ? val : 0;
        this.setAttribute('last', val.toString())
    }

    get valid() {
        return this._valid;
    }
    set valid(val) {
        if (this._valid === val) return;
        this._valid = val;
    }

    constructor() {
        super(DPSearchResults, {delayRender: true});

        this._renderResults = this._renderResults.bind(this);
        this._setLoading = this._setLoading.bind(this);
        this._checkValid = this._checkValid.bind(this);
        this._clearResults = this._clearResults.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        super.render();

        this.shadowRoot.querySelector('div.moreBtn').addEventListener('click', e => {
            e.preventDefault();
            this.more = true;
            let evt = {
                detail: {
                    from: this.last
                },
                bubbles: true,
                composed: true
            };
            this.dispatchEvent(new CustomEvent('load-more', evt));
        });

        top.addEventListener('search-complete', this._renderResults);
        top.addEventListener('search-start', this._setLoading);
        top.addEventListener('params-ready', this._checkValid);
        top.window.addEventListener('popstate', this._clearResults);
    }

    addResult(result) {
        var item = new DPSearchResult();
        item.result = result;
        this.appendChild(item);
    }

    _setLoading(e) {
        this.shadowRoot.querySelector('div.moreBtn').setAttribute('data-hide','');
        this.shadowRoot.querySelector('.invalidMsg').setAttribute('data-hide','');
        if(!this.more) {
            this.last = 0;
            while(this.firstChild){
                this.removeChild(this.firstChild);
            }
        } else {
            this.more = false;
        }
        this.shadowRoot.querySelector('.loading').removeAttribute('data-hide');
    }

    _renderResults(e) {
        if (this.shadowRoot.querySelector('.loading')) {
            this.shadowRoot.querySelector('.loading').setAttribute('data-hide','');
        }
            
        if (e.detail && typeof e.detail.results !== 'undefined' && typeof e.detail.invalid === 'undefined') {
            this.addResults(e.detail.results);
        } else {
            while(this.firstChild){
                this.removeChild(this.firstChild);
            }
            this.shadowRoot.querySelector('.end-of-results').setAttribute('data-hide','');
            this.shadowRoot.querySelector('div.moreBtn').setAttribute('data-hide', '');
            this.shadowRoot.querySelector('.invalidMsg').removeAttribute('data-hide');
        }
        let evt = { 
            detail: { results: this.results }, 
            bubbles: true,
            composed: true
        };
        this.dispatchEvent(new CustomEvent('results-loaded', evt));
    }

    _clearResults(e) {
        this.results = undefined;
    }

    _checkValid(e) {
        let obj = e.detail;
        this.valid = Object.keys(obj.filters).length > 0 || (obj.term !== null && obj.term !== '' && typeof obj.term !== 'undefined');
        if(!this.valid) {
            this.shadowRoot.querySelector('.invalidMsg').removeAttribute('data-hide');
        } else {
            if (this.shadowRoot.querySelector('.invalidMsg')) {
                this.shadowRoot.querySelector('.invalidMsg').setAttribute('data-hide','');
            }
        }
    }

    addResults(results) {
        if (results && results.docs) {
            let hits = results.docs;
            let l = hits.length;
            for( let i = 0; i < l; i++ ) {
                this.addResult(hits[i]);
            }
            this.last = this.last + l;
            if (this.last >= results.numFound) {
                this.shadowRoot.querySelector('.end-of-results').removeAttribute('data-hide');
            }
            if (l > 0 && this.last < results.numFound) {
                this.shadowRoot.querySelector('.invalidMsg').setAttribute('data-hide','');
                this.shadowRoot.querySelector('.end-of-results').setAttribute('data-hide','');
                this.shadowRoot.querySelector('div.moreBtn').removeAttribute('data-hide');
            } else {
                this.shadowRoot.querySelector('div.moreBtn').setAttribute('data-hide','');
                this.shadowRoot.querySelector('.end-of-results').removeAttribute('data-hide');
            }
        }
    }
}

PFElement.create(DPSearchResults);