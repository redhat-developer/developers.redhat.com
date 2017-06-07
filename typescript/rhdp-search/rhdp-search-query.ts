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
        this.setFilters();
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

    get typeString() {
        return this.valStrings('tag', this.filters.facets[1].items);
    }

    get tagString() {
        return this.valStrings('tag', this.filters.facets[2].items);
    }
    get sysTypeString() {
        return this.valStrings('sys_type', this.filters.facets[0].items);
    }

    valStrings(txt, items) {
        var len = items.length,
            typeString = '';
        for(let i=0; i < len; i++) {
            var t = (items[i].value.join(`&${txt}=`)).toLowerCase().replace(' ', '+');
            typeString += items[i].active ? `&${txt}=${t}` : '';
        }
        return typeString;
    }

    urlTemplate = (strings, url, term, limit, sort, types, tags, sys_types) => {
        var order = '';
        if(sort === 'most-recent') {
            order = '&newFirst=true';
        } 
        return `${url}?tags_or_logic=true&filter_out_excluded=true&from=0${order}&project=&query=${term}&query_highlight=true&size${limit}=true${types}${tags}${sys_types}`;
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

        fetch(this.urlTemplate`${this.url}${this.term}${this.limit}${this.sort}${this.typeString}${this.tagString}${this.sysTypeString}`)
        .then((resp) => resp.json())
        .then((data) => { this.results = data; });
    }
    

    setFilters() {
        return;
    }
}

customElements.define('rhdp-search-query', RHDPSearchQuery);
