import {Page} from '../../../Page';
import {SearchResults} from './SearchResults';

export class SearchResultSort extends Page {
    constructor() {
        super();
        this.addSelectors({
            resultSort: '//rhdp-search-sort-page/p/select'
        });
        this.searchResults = new SearchResults();
    }

    get() {
        return this.getValue(this.getSelector('resultSort'));
    }

    sort(by) {
        this.selectByValue(this.getSelector('resultSort'), by.replace(/\s+/g, '-').toLowerCase());
        // wait for search to trigger
        browser.pause(1000);
        return this.searchResults.await();
    }
}
