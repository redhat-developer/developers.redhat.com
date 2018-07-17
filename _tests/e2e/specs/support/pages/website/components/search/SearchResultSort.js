import {Base} from '../../../Base.page'
import {SearchResults} from './SearchResults'

export class SearchResultSort extends Base {
    constructor() {
        super();
        this.addSelectors({
            resultSort: '//rhdp-search-sort-page/p/select'
        });
        this.searchResults = new SearchResults();
    }

    getResultSort() {
        return this.getValue(this.getSelector('resultSort'))
    }

    selectSortBy(sortBy) {
        this.selectByValue(this.getSelector('resultSort'), sortBy.replace(/\s+/g, '-').toLowerCase());
        // wait for search to trigger
        browser.pause(1000);
        return this.searchResults.awaitLoadingSpinner()
    }
}
