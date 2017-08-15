class RHDPSearchResults extends HTMLElement {
    _results;
    _more;
    _last = 0;

    get results() {
        return this._results;
    }

    set results(val) {
        if (this._results === val) return;
        this._results = val;
        this.renderResults(false);
    }

    get more() {
        return this._more;
    }
    set more(val) {
        if (this._more === val) return;
        this._more = val;
        this.renderResults(true);
    }

    get last() {
        return this._last;
    }

    set last(val) {
        if (this._last === val) return;
        this._last = val ? val : 0;
        this.setAttribute('last', val.toString())
    }

    loadMore = document.createElement('a');

    constructor() {
        super();
    }

    connectedCallback() {
        this.loadMore.className = 'moreBtn hide';
        this.loadMore.innerText = 'Load More';

        this.loadMore.addEventListener('click', e => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('load-more', {
                detail: {
                    from: this.last
                },
                bubbles: true
            }));
        });
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

    renderResults(add) {
        if(!add) {
            while (this.hasChildNodes()) {
                this.removeChild(this.lastChild);
            }
            this.addResults(this.results);
        } else {
            this.addResults(this.more);
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
            if (l > 0 && this.last < results.hits.total) {
                this.appendChild(this.loadMore);
            } else if (this.querySelector('.moreBtn')) {
                this.removeChild(this.loadMore);
            }
        }
    }

    nullResultsMessage(app){
        if (this._results == null) {
            app.sort.style.display = 'none';
            app.results.style.display = 'none';
            app.count.style.display = 'none';
            app.emptyQuery.empty = true;
        } else {
            app.sort.style.display = 'block';
            app.results.style.display = 'block';
            app.count.style.display = 'block';
            app.emptyQuery.empty = false;

        }



    }

}