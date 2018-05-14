const BasePage = require('../../../Base.page');

class SearchResults extends BasePage {

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

    awaitLoadingSpinner() {
        this.awaitExists(this.getSelector('searchPage'));
        return this.awaitIsNotVisible(this.getSelector('loadingSpinner'), 30000)
    }

    awaitResultsFor(searchTerm) {
        this.waitForUrlContaining(searchTerm, 60000);
        return this.awaitLoadingSpinner();
    }

    getAllResults() {
        return this.elements(this.getSelector('allSearchResults'))
    }

    getResultByIndex(i) {
        return this.element(`//rhdp-search-result[${i}]/div`)
    }

    getResultDate(i) {
        return this.element(`//rhdp-search-results/rhdp-search-result[${i}]/div/p[1]//rh-datetime`).getAttribute('datetime');
    }

}

module.exports = SearchResults;