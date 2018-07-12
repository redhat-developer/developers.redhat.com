import {Base} from '../Base.page'
import {SearchFilter} from './components/search/SearchFilter'
import {SearchOneBox} from './components/search/SearchOneBox'
import {SearchResults} from './components/search/SearchResults'
import {SearchResultSort} from './components/search/SearchResultSort'

export class Search extends Base {

    constructor() {
        super({
            path: '/search/',
            pageTitle: 'Search Results',
        });

        this.addSelectors({
            searchPage: '.searchpage-middle',
        });

        this.searchFilter = new SearchFilter();
        this.searchResults = new SearchResults();
        this.searchOneBox = new SearchOneBox();
        this.searchResultSort = new SearchResultSort();
    }

    awaitSearchPage() {
        this.awaitIsVisible(this.getSelector('searchPage'), 30000);
        return this.searchResults.awaitLoadingSpinner()
    }
}
