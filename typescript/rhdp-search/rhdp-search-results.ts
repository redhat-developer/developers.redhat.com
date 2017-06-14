import {RHDPSearchResult} from './rhdp-search-result';

export class RHDPSearchResults extends HTMLElement {
    _results;

    get results() {
        return this._results;
    }

    set results(val) {
        if (this._results === val) return;
        this._results = val;
        this.renderResults();
    }

    constructor() {
        super();
    }

    connectedCallback() {
        
    }

    static get observedAttributes() { 
        return ['results']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    addResult(result) {
        var item = new RHDPSearchResult();
        item.result = result;
        this.appendChild(item);
    }

    renderResults() {
        while (this.hasChildNodes()) {
            this.removeChild(this.lastChild);
        }
        
        if (this.results && this.results.hits && this.results.hits.hits) {
            let hits = this.results.hits.hits;
            let l = hits.length;
            for( let i = 0; i < l; i++ ) {
                this.addResult(hits[i]);
            }
        }
    }
}

customElements.define('rhdp-search-results', RHDPSearchResults);
