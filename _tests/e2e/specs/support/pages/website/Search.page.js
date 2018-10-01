import {Page} from '../Page';
import {SearchFilter} from './components/search/SearchFilter';
import {SearchOneBox} from './components/search/SearchOneBox';
import {SearchResults} from './components/search/SearchResults';
import {SearchResultSort} from './components/search/SearchResultSort';

export class Search extends Page {

    constructor() {
        super({
            path: '/search/',
            pageTitle: 'Search Results',
        });

        this.addSelectors({
            searchPage: '.searchpage-middle',
        });

        this.filter = new SearchFilter();
        this.results = new SearchResults();
        this.oneBox = new SearchOneBox();
        this.resultSort = new SearchResultSort();
    }

    awaitSearchPage() {
        return this.awaitIsVisible(this.getSelector('searchPage'), 30000) && this.results.await();
    }
}
