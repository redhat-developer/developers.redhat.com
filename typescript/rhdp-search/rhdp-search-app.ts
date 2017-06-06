import {RHDPSearchQuery} from './rhdp-search-query';
import {RHDPSearchBox} from './rhdp-search-box';
import {RHDPSearchFilters} from './rhdp-search-filters';
import {RHDPSearchFilterGroup} from './rhdp-search-filter-group';
import {RHDPSearchFilterItem} from './rhdp-search-filter-item';
import {RHDPSearchResults} from './rhdp-search-results';
import {RHDPSearchResultCount} from './rhdp-search-result-count';
import {RHDPSearchSortPage} from './rhdp-search-sort-page';

export class RHDPSearchApp extends HTMLElement {
    name = 'Search';
    template = `<h1>${this.name}</h1>`;

    query = new RHDPSearchQuery();
    box = new RHDPSearchBox();
    count = new RHDPSearchResultCount();
    filters = new RHDPSearchFilters();
    active = new RHDPSearchFilters();
    results = new RHDPSearchResults();
    sort = new RHDPSearchSortPage();
        

    constructor() {
        super();

        this.addEventListener('do-search', this.doSearch);
        this.addEventListener('search-complete', this.setResults);
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.active.type = 'active';
        
        this.appendChild(this.query);
        this.appendChild(this.box);
        this.appendChild(this.filters);
        this.appendChild(this.active);
        this.appendChild(this.count);
        this.appendChild(this.sort);
        this.appendChild(this.results);

        /* To Do
          Set text and term from querystring "q" value if present
        */
        var loc = window.location.href.split('?'),
            term = loc.length > 1 ? loc[1].split('=')[1] : '';
        if (term.length > 0) {
            this.box.term = term;
            this.query.search(term);
        }
    }

    doSearch(e) {
        this.query.search(e.detail.term);
    }

    setResults(e) {
        this.count.term = e.detail.term;
        this.results.results = e.detail.results;
        this.count.count = e.detail.results.hits.total;
    }
}

customElements.define('rhdp-search-app', RHDPSearchApp);