class RHDPSearchQuery extends HTMLElement {
    _filters;
    _limit = 10;
    _from = 0;
    _sort = 'relevance';
    _results;
    _term;
    _url;
    params;

    get filters() {
        return this._filters;
    }

    set filters(val) {
        if (this._filters === val) return;
        this._filters = val;
        this.setFilters();
    }

    get from() {
        return this._from;
    }
    set from(val) {
        if (this._from === val) return;
        this._from = val;
        this.setAttribute('from', val.toString());
    }

    get limit() {
        return this._limit;
    }
    set limit(val) {
        if (this._limit === val) return;
        this._limit = val;
        this.setAttribute('limit', val.toString());
    }

    get sort() {
        return this._sort;
    }
    set sort(val) {
        if (this._sort === val) return;
        this._sort = val;
        this.setAttribute('sort', val);
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
                from: this.from,
                filterStr: this.filterString(this.filters.facets),
                filters: this.filters,
                sort: this.sort,
                limit: this.limit
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
        this.setAttribute('term', val.toString());
    }

    get url() {
        return this._url;
    }

    set url(val) {
        if (this._url === val) return;
        this._url = val;
        this.setAttribute('url', val.toString());
    }

    get productString() {
        var defaults = [{active: true, value: [
            'eap'
            ,'webserver'
            ,'datagrid'
            ,'datavirt'
            ,'fuse'
            ,'amq'
            ,'brms'
            ,'bpmsuite'
            ,'devstudio'
            ,'cdk'
            ,'developertoolset'
            ,'rhel'
            ,'softwarecollections'
            ,'mobileplatform'
            ,'openshift'
            ,'rhamt'
        ]}],
        products = this.valStrings('project', this.filters.facets[1].items)
        return products.length > -1 ? products : this.valStrings('project', defaults);
    }

    get tagString() {
        return this.valStrings('tag', this.filters.facets[2].items);
    }
    get sysTypeString() {
        var defaults = [{active: true, value: [
                'jbossdeveloper_archetype'
                ,'article'
                ,'blogpost'
                ,'jbossdeveloper_bom'
                ,'book'
                ,'cheatsheet'
                ,'demo'
                ,'event'
                ,'forumthread'
                ,'jbossdeveloper_example'
                ,'quickstart'
                ,'solution'
                ,'stackoverflow_thread'
                ,'video'
                ,'website'
                ,'webpage'
            ]}],
            sysTypes = this.valStrings('sys_type', this.filters.facets[0].items);
        return sysTypes.length > -1 ? sysTypes : this.valStrings('sys_type', defaults);
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

    filterString(facets) {
        var len = facets.length,
            filterArr = [];
        for(let i=0; i < len; i++) {
            for(let j=0; j < facets[i].items.length; j++) {
                if(facets[i].items[j].active) {
                    let idx = 0;
                    while(idx <  facets[i].items[j].value.length) {
                        filterArr.push(facets[i].items[j].value[idx]);
                        idx = idx + 1;
                    }
                }
            }
        }
        return filterArr.join(', ');
    }

    urlTemplate = (strings, url, term, from, limit, sort, types, tags, sys_types) => {
        var order = '';
        if(sort === 'most-recent') {
            order = '&newFirst=true';
        } 
        return `${url}?tags_or_logic=true&filter_out_excluded=true&from=${from}${order}&query=${term}&query_highlight=true&size${limit}=true${types}${tags}${sys_types}`;
    };

    constructor() {
        super();
    }

    connectedCallback() {
        
    }

    static get observedAttributes() { 
        return ['term', 'sort', 'limit', 'results', 'filters', 'url']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    search(term) {
        this.term = term;
        this.dispatchEvent(new CustomEvent("search-message",{detail:{state:"standard",message:""},bubbles: true}));

        var searchResults = document.getElementsByTagName( 'rhdp-search-results' )[0];


        while(searchResults.firstChild && this.from === 0){
            searchResults.removeChild(searchResults.firstChild);
        }

        searchResults.setAttribute( 'class', 'loading' );
        
        fetch(this.urlTemplate`${this.url}${this.term}${this.from}${this.limit}${this.sort}${this.productString}${this.tagString}${this.sysTypeString}`)
        .then((resp) => resp.json())
        .then((data) => { 
            this.results = data; 
            history.pushState({}, `Red Hat Developer Program Search: ${this.term}`, `?q=${decodeURIComponent(this.term).replace(' ', '+')}`);
        });
    }

    setFilters() {
        return;
    }
}
