// import {RHDPSearchFilterItem} from './rhdp-search-filter-item';

class RHDPSearchQuery extends HTMLElement {
    _filters;
    _activeFilters;
    _limit = 10;
    _from = 0;
    _sort = 'relevance';
    _results;
    _term;
    _url;
    _valid = true;

    get filters() {
        return this._filters;
    }

    set filters(val) {
        if (this._filters === val) return;
        this._filters = val;
    }

    get activeFilters() {
        return this._activeFilters;
    }

    set activeFilters(val) {
        if (this._activeFilters === val) return;
        this._activeFilters = val;
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
        this.from = this.results && this.results.hits && typeof this.results.hits.hits !== 'undefined' ? this.from + this.results.hits.hits.length : 0;
        this.dispatchEvent(new CustomEvent('search-complete', {
            detail: { 
                term: this.term,
                filters: this.activeFilters,
                sort: this.sort,
                limit: this.limit,
                from: this.from,
                results: this.results,
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

    get valid() {
        return this._valid;
    }
    set valid(val) {
        if (this._valid === val) return;
        this._valid = val;
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

        this._changeAttr = this._changeAttr.bind(this);
    }

    connectedCallback() {
        top.addEventListener('params-ready', this._changeAttr);
        top.addEventListener('term-change', this._changeAttr);
        top.addEventListener('filter-item-change', this._changeAttr);
        top.addEventListener('sort-change', this._changeAttr);
        top.addEventListener('clear-filters', this._changeAttr);
        //top.window.addEventListener('popstate', e => { this.results = undefined; });
        top.addEventListener('load-more', this._changeAttr);
    }

    static get observedAttributes() { 
        return ['term', 'sort', 'limit', 'results', 'url']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    _setFilters(item : RHDPSearchFilterItem) {
        let add = item.active;
        
        if (add) {
            this.activeFilters[item.group] = this.activeFilters[item.group] || [];
            this.activeFilters[item.group].push(item.key);
        } else {
            Object.keys(this.activeFilters).forEach(group => {
                if (group === item.group) { 
                    let idx = this.activeFilters[group].indexOf(item.key);
                    if (idx >= 0) {
                        this.activeFilters[group].splice(idx, 1);
                        if (this.activeFilters[group].length === 0) {
                            delete this.activeFilters[group];
                        }
                    }
                }
            });
        }
    }

    _changeAttr(e) {
        switch (e.type) {
            case 'term-change':
                if (e.detail && e.detail.term && e.detail.term.length > 0) {
                    this.term = e.detail.term;
                } else {
                    this.term = '';
                }
                this.from = 0;
                this.search();
                
                break;
            case 'filter-item-change': //detail.facet
                if (e.detail && e.detail.facet) {
                    this._setFilters(e.detail.facet);
                }
                this.from = 0;
                this.search();
                // Wait for params-ready event
                break;
            case 'sort-change': // detail.sort
                if (e.detail && e.detail.sort) {
                    this.sort = e.detail.sort;
                }
                this.from = 0;
                this.search();
                break;
            case 'load-more': // detail.qty
                this.search();
                break;
            case 'clear-filters':
                this.activeFilters = {};
                this.search();
                break;
            case 'params-ready':
                if (e.detail && e.detail.term) {
                    this.term = e.detail.term;
                }
                if (e.detail && e.detail.sort) {
                    this.sort = e.detail.sort;
                }
                if (e.detail && e.detail.filters) {
                    this.activeFilters = e.detail.filters;
                }

                this.from = 0;
                if (Object.keys(e.detail.filters).length > 0 || e.detail.term !== null || e.detail.sort !== null || e.detail.qty !== null) {
                    this.search();
                }
                break;
        }   
    }

    // _checkValid(e) {
    //     let obj = e.detail;
    //     this.valid = ;
    // }

    search() {
        this.dispatchEvent(new CustomEvent('search-start', { bubbles: true }));
        if (Object.keys(this.activeFilters).length > 0 || (this.term !== null && this.term !== '' && typeof this.term !== 'undefined')) {

            let qURL = new URL(this.url);
            qURL.searchParams.set('tags_or_logic', 'true');
            qURL.searchParams.set('filter_out_excluded', 'true');
            qURL.searchParams.set('from', this.from.toString());
            if (this.sort === 'most-recent') {
                qURL.searchParams.set('newFirst', 'true');
            }
            qURL.searchParams.set('query', this.term || '');
            qURL.searchParams.set('query_highlight', 'true');
            qURL.searchParams.set('size'+this.limit.toString(), 'true');
            if (this.activeFilters) {
                Object.keys(this.activeFilters).forEach(filtergroup => {
                    this.filters.facets.forEach(group => {
                        if (group.key === filtergroup) {
                            group.items.forEach(facet => {
                                if (this.activeFilters[group.key].indexOf(facet.key) >= 0) {
                                    facet.value.forEach(fval => {
                                        qURL.searchParams.append(group.key, fval);
                                    });
                                }
                            });
                        }
                    });
                });
            }
            //console.log(qURL.toString());
            fetch(qURL.toString()) //this.urlTemplate`${this.url}${this.term}${this.from}${this.limit}${this.sort}${this.filters}`)
            .then((resp) => resp.json())
            .then((data) => { 
                this.results = data; 
            });
        } else {
            this.dispatchEvent(new CustomEvent('search-complete', { detail: { invalid: true }, bubbles: true }));
        }
    }
}

customElements.define('rhdp-search-query', RHDPSearchQuery);