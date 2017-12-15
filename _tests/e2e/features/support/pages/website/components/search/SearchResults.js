import {driver} from "../../../../../../config/browsers/DriverHelper";
import {BasePage} from "../../../Base.page";

class SearchResults extends BasePage {

    constructor() {
        super();

        this.addSelectors(
            {
                loadingSpinner: '.loading',
                emptySearch: '.invalidMsg',
                resultCount: '//rhdp-search-result-count',
                loadMoreButton: "//rhdp-search-results/div/a[text()='Load More']",
                searchResults: '//rhdp-search-result',
                endOfResults: '.end-of-results',
            });
    }

    awaitLoadingSpinner() {
        return driver.awaitIsNotVisible(this.getSelector('loadingSpinner'), 30000)
    }

    awaitResultsFor(searchTerm) {
        driver.waitForUrlContaining(searchTerm, 30000);
        return this.awaitLoadingSpinner();
    }

    waitForResultsLoaded() {
        // wait for result count value to be > 0
        browser.waitUntil(function () {
            let resultCount = browser.execute(function () {
                return document.querySelectorAll('rhdp-search-result').length;
            });
            return parseInt(resultCount.value) === 10;
        }, 30000, 'No results were found after 30 seconds');
        return this.awaitLoadingSpinner();
    }

    showLessThanTenResults() {
        browser.execute(function () {
            return document.body.dispatchEvent(new CustomEvent('search-complete', {
                detail: {
                    results: {
                        hits: {
                            hits: [{
                                fields: {
                                    sys_type: ['stackoverflow_thread'],
                                    sys_content_plaintext: ['Test Title']
                                }, highlight: {sys_title: ['Test Title 1']}
                            }], total: 1
                        }
                    }
                }, bubbles: true
            }));
        });
    }

    getResultCount() {
        return driver.textOf(this.getSelector('resultCount'))
    }

    getResultTitleByIndex(i) {
        return driver.element(`//rhdp-search-results/rhdp-search-result[${i}]/div/h4/a`);
    }

    getResultByIndex(i) {
        return driver.element(`//rhdp-search-result[${i}]/div`);
    }

    getAllResults() {
        this.waitForResultsLoaded();
        return driver.elements(this.getSelector('searchResults'))
    }

    getResultDate(i) {
        return driver.element(`//rhdp-search-results/rhdp-search-result[${i}]/div/p[1]/rh-datetime`).datetime;
    }

    noResultsDisplayed() {
        return driver.textOf(this.getSelector('emptySearch'))
    }

    loadMoreButtonIsDisplayed() {
        return driver.isDisplayed(this.getSelector('loadMoreButton'))
    }

    endOfResultsText() {
        return driver.element(this.getSelector('endOfResults'));
    }

}

export {
    SearchResults
};
