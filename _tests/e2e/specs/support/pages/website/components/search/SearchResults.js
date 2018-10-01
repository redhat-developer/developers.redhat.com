import {Page} from '../../../Page';

export class SearchResults extends Page {

    constructor() {
        super();

        this.addSelectors(
            {
                searchPage: 'rhdp-search-results',
                loadingSpinner: '.loading',
                emptySearch: '.invalidMsg',
                resultCount: 'rhdp-search-result-count',
                loadMoreButton: "rhdp-search-results .moreBtn",
                allSearchResults: 'rhdp-search-result h4 a',
                endOfResults: '.end-of-results'
            });
    }

    await() {
        this.awaitExists(this.getSelector('searchPage'));
        return this.awaitIsNotVisible(this.getSelector('loadingSpinner'), 30000);
    }

    awaitResultsFor(searchTerm) {
        this.waitForUrlContaining(searchTerm, 60000);
        return this.await();
    }

    all() {
        return this.elements(this.getSelector('allSearchResults'));
    }

    dateFor(i) {
        return this.element(`//rhdp-search-results/rhdp-search-result[${i}]/div/p[1]//rh-datetime`).getAttribute('datetime');
    }
}
