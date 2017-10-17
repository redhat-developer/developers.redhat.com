import {BasePage} from './Base.page';

class SearchPage extends BasePage {

    constructor() {
        super({
            path: '/search/',
            selector: '.search',
        });
    }

    get searchPage() {
        return browser.element('.search')
    }

    get showBtn() {
        return browser.element('.showBtn');
    }

    get cover() {
        return browser.element('.cover');
    }

    get applyFilters() {
        return browser.element('.applyFilters');
    }

    get loadingSpinner() {
        return browser.element('.loading');
    }

    get searchField() {
        return browser.element('.user-search');
    }

    get searchButton() {
        return browser.element('#search-btn');
    }

    get oneBox() {
        return browser.element('rhdp-search-onebox div h4');
    }

    get oneBoxDownLoadBtn() {
        return browser.element('rhdp-search-onebox .button');
    }

    get resultSort() {
        return browser.element('rhdp-search-sort-page > p > select');
    }

    get emptySearch() {
        return browser.element('rhdp-search-results > .invalidMsg')
    }

    resultCount() {
        return browser.getText('//rhdp-search-result-count');
    }

    get loadMoreButton() {
        return browser.element('.moreBtn');
    }

    searchResults() {
        return browser.elements('//rhdp-search-result');
    }

    get activeFilters() {
        return browser.element('.activeFilters')
    }

    get endOfResults() {
        return browser.element('.end-of-results');
    }

    searchResult(i) {
        return browser.element(`//rhdp-search-result[${i}]/div`);
    }

    searchResultTitle(i) {
        return browser.element(`//rhdp-search-results/rhdp-search-result[${i}]/div/h4/a`);
    }

    searchResultDate(i) {
        return browser.element(`//rhdp-search-results/rhdp-search-result[${i}]/div/p[1]/rh-datetime`).datetime;
    }

    awaitSearchPage() {
        this.awaitElement(this.searchPage);
        return this.awaitLoadingSpinner()
    }

    awaitLoadingSpinner() {
        if (this.isDisplayed(this.loadingSpinner)) {
            console.log('waiting for search to complete . . .');
            this.awaitElement(this.loadingSpinner, true)
        }
    }

    awaitSearchResultsFor(searchTerm) {
        browser.waitUntil(function () {
            return browser.getUrl().indexOf(searchTerm) > -1
        }, 30000, `results for search term ${searchTerm} were not displayed after 30 seconds`);
        return this.awaitLoadingSpinner();
    }

    waitForResultsLoaded() {
        // wait for result count value to be > 0
        browser.waitUntil(function () {
            let resultCount = browser.execute(function () {
                return document.querySelector('rhdp-search-result-count').count;
            });
            return resultCount.value !== '0';
        }, 30000, 'No results were found after 30 seconds');
        return this.awaitLoadingSpinner();
    }

    noResultsDisplayed() {
        return this.textOf(this.emptySearch)
    }

    loadMoreButtonIsDisplayed() {
        return this.isDisplayed(this.loadMoreButton)
    }

    waitForUpdatedResults(result) {
        let getResultCount = this.resultCount;
        browser.waitUntil(function () {
            let updatedCount = getResultCount();
            return updatedCount !== result;
        }, 60000, "Results were not updated after 60 seconds");
        return this.awaitLoadingSpinner();
    }

    enterSearch(searchTerm) {
        return this.type(this.searchField, searchTerm);
    }

    searchFor(searchTerm) {
        this.type(this.searchField, searchTerm);
        this.clickOn(this.searchButton);
        return this.awaitSearchResultsFor(searchTerm)
    }

    clickSearchBtn() {
        return this.clickOn(this.searchButton);
    }

    clickOneBoxTitle() {
        return this.clickOn(this.oneBox)
    }

    clickOneBoxDownLoadBtn() {
        return this.clickOn(this.oneBoxDownLoadBtn);
    }

    resultSortSelect(sortBy) {
        this.resultSort.selectByValue(sortBy.replace(/\s+/g, '-').toLowerCase());
        let selectedFilter = this.resultSort.getValue();
        if (selectedFilter !== sortBy.replace(/\s+/g, '-').toLowerCase()) {
            throw Error(`${sortBy} was not selected`)
        }
        return this.waitForResultsLoaded()
    }

    chooseFilter(filterType, filterOption) {
        let isMobile = this._clickOpenMobileFilter();
        let selectedFilter;
        if (filterType === 'Content Type') {
            selectedFilter = this._selectFilter(isMobile, 1, filterOption);
        } else if (filterType === 'Product') {
            selectedFilter = this._selectFilter(isMobile, 2, filterOption);
        } else {
            selectedFilter = this._selectFilter(isMobile, 3, filterOption);
        }
        this._clickApplyMobileFilter(isMobile);
        return selectedFilter
    }

    activeFilter() {
        return this.textOf(this.activeFilters)
    }

    clickOneBoxLink(link) {
        return this.clickOn(`*=${link}`);
    }

    endOfResultsText() {
        return this.textOf(this.endOfResults);
    }

    _selectFilter(isMobile, groupIndex, filterOption) {
        let filter;
        if (isMobile) {
            filter = browser.element(`//*[@id="cover"]/div[2]/rhdp-search-filter-group[${groupIndex}]/div/div[*]/rhdp-search-filter-item[*]/div/label[contains(text(), '${filterOption}')]`);
        } else {
            filter = browser.element(`//*[@id="control"]/div[2]/rhdp-search-filter-group[${groupIndex}]/div/div[*]/rhdp-search-filter-item/div//label[contains(text(), '${filterOption}')]`);
        }
        this.clickOn(filter);
        if (filter.isSelected) {
            return filter
        } else
            throw Error(`${filter} was not selected`);
    }

    _clickOpenMobileFilter() {
        let isMobile = this.isDisplayed(this.showBtn);
        if (isMobile) {
            this.clickOn(this.showBtn);
            this.awaitElement(this.cover);
            return true
        } else {
            return false
        }
    }

    _clickApplyMobileFilter() {
        if (this.isDisplayed(this.applyFilters)) {
            return this.clickOn(this.applyFilters);
        }
    }
}

const
    searchPage = new SearchPage();

export {
    searchPage
};
