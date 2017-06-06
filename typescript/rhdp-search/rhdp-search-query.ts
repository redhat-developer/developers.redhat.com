export class RHDPSearchQuery extends HTMLElement {
    _filters;
    _limit = 10;
    _sort = 'relevance';
    _results;
    _term = '';
    _url = 'http://dcp.stage.jboss.org/v2/rest/search/developer_materials';
    params;

    get filters() {
        return this._filters;
    }

    set filters(val) {
        if (this._filters === val) return;
        this._filters = val;
    }

    get limit() {
        return this._limit;
    }
    set limit(val) {
        if (this._limit === val) return;
        this._limit = val;
    }

    get sort() {
        return this._sort;
    }
    set sort(val) {
        if (this._sort === val) return;
        this._sort = val;
    }
    
    get results() {
        return this._results;
    }
    set results(val) {
        if (this._results === val) return;
        this._results = val;
        this.dispatchEvent(new CustomEvent('search-complete', {
            detail: { 
                results: this.results,
                term: this.term,
                filters: this.filters
            }, 
            bubbles: true 
        }));
    }

    get term() {
        return this._term;
    }

    set term(val) {
        if (this._term === val) return;
        this._term = val;
    }

    get url() {
        return this._url;
    }

    set url(val) {
        if (this._results === val) return;
        this._url = val;
    }

    urlTemplate = (strings, url, term, limit, sort) => {
        var order = '';
        if(sort === 'most recent') {
            order = '&newFirst=true';
        }
        return `${url}?filter_out_excluded=true&from=0${order}&project=&query=${term}&query_highlight=true&size${limit}=true&type=rht_website&type=jbossdeveloper_quickstart&type=jbossdeveloper_demo&type=jbossdeveloper_bom&type=jbossdeveloper_archetype&type=jbossdeveloper_example&type=jbossdeveloper_vimeo&type=jbossdeveloper_youtube&type=jbossdeveloper_book&type=jbossdeveloper_event&type=rht_knowledgebase_article&type=rht_knowledgebase_solution&type=stackoverflow_question&type=jbossorg_sbs_forum&type=jbossorg_blog&type=rht_apidocs`;
    };

    constructor() {
        super();
    }

    connectedCallback() {
        
    }

    static get observedAttributes() { 
        return ['term','sort','limit','results','filters','url']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    search(term) {
        if (term && term !== '') {
            this.term = term;
        }
        fetch(this.urlTemplate`${this.url}${this.term}${this.limit}${this.sort}`)
        .then((resp) => resp.json())
        .then((data) => { this.results = data; });
    }
}

customElements.define('rhdp-search-query', RHDPSearchQuery);
