import RHDPSearchResult from './rhdp-search-result';

export default class RHDPSearchResults extends HTMLElement {
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

    invalidMsg = document.createElement('div');
    loadMore = document.createElement('div');
    endOfResults = document.createElement('div');
    loading = document.createElement('div');

    constructor() {
        super();

        this._renderResults = this._renderResults.bind(this);
        this._setLoading = this._setLoading.bind(this);
        this._checkValid = this._checkValid.bind(this);
        this._clearResults = this._clearResults.bind(this);
    }

    connectedCallback() {
        this.invalidMsg.className = 'invalidMsg';
        this.invalidMsg.innerHTML = `<h4>Well, this is awkward. No search term was entered yet, so this page is a little empty right now.</h4>
        <p>After you enter a search term in the box above, you will see the results displayed here. 
        You can also use the filters to select a content type, product or topic to see some results too. Try it out!</p>`;
        this.endOfResults.innerHTML = '<p class="end-of-results">- End of Results -</p>'
        this.loadMore.className = 'rhd-c-more-button';
        this.loadMore.innerHTML = '<a class="pf-c-button pf-m-primary" href="#">Load More</a>';
        this.loading.className = 'loading';

        this.loadMore.addEventListener('click', e => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('load-more', {
                detail: {
                    from: this.last
                },
                bubbles: true
            }));
        });

        top.addEventListener('search-complete', this._renderResults);
        top.addEventListener('search-start', this._setLoading);
        top.addEventListener('params-ready', this._checkValid);
        top.window.addEventListener('popstate', this._clearResults);
        this.addEventListener('load-more', e => { 
            this.more = true; 
        });
    }

    addResult(result) {
        var item = new RHDPSearchResult();
        item.result = result;
        this.appendChild(item);
    }

    _setLoading(e) {
        if(!this.more) {
            while(this.firstChild){
                this.removeChild(this.firstChild);
            }
        } else {
            if (this.querySelector('rhd-c-more-button')) {
                this.removeChild(this.loadMore);
            }
            if (this.querySelector('.invalidMsg')) {
                this.removeChild(this.invalidMsg);
            }
            this.more = false;
        }
        this.appendChild(this.loading);
    }

    _renderResults(e) {
        if (this.querySelector('.loading')) {
            this.removeChild(this.loading);
        }

        if (e.detail && typeof e.detail.results !== 'undefined' && typeof e.detail.invalid === 'undefined') {
            this.addResults(e.detail.results);
        } else {
            while(this.firstChild){
                this.removeChild(this.firstChild);
            }
            this.appendChild(this.invalidMsg);
        }
        this.dispatchEvent(new CustomEvent('results-loaded', { 
            detail: { results: this.results }, 
            bubbles: true 
        }));
    }

    _clearResults(e) {
        this.results = undefined;
    }

    _checkValid(e) {
        let obj = e.detail;
        this.valid = Object.keys(obj.filters).length > 0 || (obj.term !== null && obj.term !== '' && typeof obj.term !== 'undefined');
        if(!this.valid) {
            this.appendChild(this.invalidMsg);
        } else {
            if (this.querySelector('.invalidMsg')) {
                this.removeChild(this.invalidMsg);
            }
        }
    }

    addResults(results) {
        if (results && results.hits && results.hits.hits) {
            let hits = results.hits.hits;
            let l = hits.length;
            for( let i = 0; i < l; i++ ) {
                this.addResult(hits[i]);
            }
            this.last = this.last + l;
            if (this.last >= results.hits.total) {
                this.appendChild(this.endOfResults);
            }
            if (l > 0 && this.last < results.hits.total) {
                if (this.querySelector('.end-of-results')) { 
                    this.removeChild(this.endOfResults);
                }
                this.appendChild(this.loadMore);
            } else {
                if (this.querySelector('.rhd-c-more-button')) {
                    this.removeChild(this.loadMore);
                }
                this.appendChild(this.endOfResults);
            }
        }
    }
}

customElements.define('rhdp-search-results', RHDPSearchResults);