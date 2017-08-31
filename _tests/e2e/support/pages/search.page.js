const mixin = require('xmultiple');
const BasePage = require('./base.page');
const NavigationBar = require('../sections/navigationBar.section');

/**
 * This page class contains all elements and common methods related to the Search page.
 */
class SearchPage extends mixin(BasePage, NavigationBar) {

    /**
     * Open search page using empty search term or by using a user specified search term.
     * @param  {String}  searchTerm   The user specified search term
     */
    open(searchTerm = '') {
        super.open(`search/?q=${searchTerm}`);
        browser.waitForVisible('.search')
    }

    isOnSearchPage () {
        return browser.getTitle().includes('Search Results | Red Hat Developers')
    }

    /**
     * Search page elements
     */
    get searchField () { return $('.user-search'); }

    get searchButton () { return $('#search-btn'); }

    get clearFilter () { return $('.clearItem'); }

    get oneBox () { return $('rhdp-search-onebox div h4'); }

    get oneBoxDownLoadBtn () { return $('rhdp-search-onebox .button'); }

    get resultSort () { return $('rhdp-search-sort-page > p > select'); }

    get emptySearch () { return $('rhdp-search-empty-query')}

    resultCount () { return $('//rhdp-search-result-count').getText(); }

    loadMoreButton () { return $('.moreBtn'); }

    searchResults () { return $$('.result'); }

    searchResult (i) { return $(`//rhdp-search-result[${i}]/div`); }

    searchResultTitle (i) { return $(`//rhdp-search-results/rhdp-search-result[${i}]/div/h4/a`); }

    resultInfo (i) { return $(`//rhdp-search-result[${i}]/div/p[1]`); }

    searchResultDate (i) { return $(`//rhdp-search-results/rhdp-search-result[${i}]/div/p[1]/span[2]`).getText(); }

    activeFilters () { return $('.activeFilters') }

    /**
     * Wait for search results to complete
     */
    waitForResultsLoaded() {
        // wait for result count value to be > 0
        browser.waitUntil(function () {
            var resultCount = browser.execute(function () {
                return document.querySelector('rhdp-search-result-count').count;
            });
            return resultCount.value !== '0';
        }, 30000, 'No results were found after 30 seconds');
        browser.waitForVisible('.result');
    }

    /**
     * Wait for search results to be updated
     * @param  {String}  result   Initial number of results found. To be supplied from.
     * resultCount variable within the search_steps.js.
     */
    waitForUpdatedResults(result) {
        var getResultCount = this.resultCount;
        browser.waitUntil(function () {
            var updatedCount = getResultCount();
            return updatedCount !== result;
        }, 60000, "Results were not updated after 60 seconds");
        browser.pause(1000)
    }

    /**
     * Enters search term into search field, but does not trigger search.
     * @param  {String}  searchTerm   User specified search term.
     * resultCount variable within the search_steps.js.
     */
    enterSearch(searchTerm) {
        this.searchField.setValue(searchTerm);
    }

    /**
     * Enters search term into search field, and triggers search.
     * @param  {String}  searchTerm   Initial number of results found. To be supplied from
     * resultCount variable within the search_steps.js.
     */
    searchFor(searchTerm) {
        this.searchField.setValue(searchTerm);
        this.searchButton.click();
        // wait for loading spinner
        browser.waitForVisible('.loading');
        this.waitForResultsLoaded()
    }

    /**
     * Selects to sort results by most-recent or back to recent (default)
     * @param  {String}  sortBy   Filter, curretly most-recent or default recent.
     */
    resultSortSelect(sortBy) {
        this.resultSort.selectByValue(sortBy.replace(/\s+/g, '-').toLowerCase());
        let selectedFilter = this.resultSort.getValue();
        if (selectedFilter !== sortBy.replace(/\s+/g, '-').toLowerCase()) {
            throw Error(`${sortBy} was not selected`)
        }
        browser.waitForVisible('.loading');
        this.waitForResultsLoaded()
    }

    /**
     * Selects a filter from specified filter type.
     * @param  {String}  filterType    User specified filter type.
     * @param  {String}  filterOption  User specified filter option.
     * If test uses a mobile browser it will open the mobile filter
     * and then click on the apply filter.
     */
    chooseFilter(filterType, filterOption) {
        const isMobile = this._clickOpenMobileFilter();
        let selectedFilter;
        this._clickShowMore(isMobile);
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

    /**
     * Selects link within OneBox Search
     * @param  {String}  link         Link that you wish to select.
     */
    clickOneBoxLink(link) {
        browser.click(`*=${link}`);
    }

    /**
     * Selects a specified filter from filter group
     * @param  {String}  isMobile          If test browser is mobile selects mobile filter.
     * @param  {Integer} groupIndex        Index of the filter group, i.e. 1, 2, or 3.
     * @param {String}   filterOption      The filter to select
     */
    _selectFilter(isMobile, groupIndex, filterOption) {
        let filter;
        if (isMobile) {
            filter = browser.element(`//*[@id="cover"]/div[2]/rhdp-search-filter-group[${groupIndex}]/div/div[*]/rhdp-search-filter-item[*]/div/label[contains(text(), '${filterOption}')]`);
        } else {
            filter = browser.element(`//*[@id="control"]/div[2]/rhdp-search-filter-group[${groupIndex}]/div/div[*]/rhdp-search-filter-item/div//label[contains(text(), '${filterOption}')]`);
        }
        filter.click();
        if (filter.isSelected) {
            return filter
        } else
            throw Error(`${filter} was not selected`);
    }

    /**
     * Opens the 'Show More' menu when using mobile browser.
     */
    _clickOpenMobileFilter() {
        var isMobile = browser.isVisible('.showBtn');
        if (isMobile) {
            browser.click('.showBtn');
            browser.waitForVisible('.cover');
            // pause to allow cover to completely open.
            browser.pause(1000);
            return true
        } else {
            return false
        }
    }

    /**
     * Clicks the 'Show More' links to make sure that all filters are visible.
     * * @param  {String}  isMobile  If test browser is mobile selects 'Show More' from mobile cover.
     */
    _clickShowMore(isMobile) {
        for (var index = 1; index < 3; index++) {
            if (isMobile) {
                browser.click(`//*[@id="cover"]/div[2]/rhdp-search-filter-group[${index}]/div/a`);
            } else {
                browser.click(`//*[@id="control"]/*/rhdp-search-filter-group[${index}]/div/a`);
            }
        }
    }

    /**
     * Clicks the 'Apply' button when user has chosen a filter.
     */
    _clickApplyMobileFilter() {
        var isMobile = browser.isVisible('.applyFilters');
        if (isMobile) {
            browser.click('.applyFilters');
            browser.pause(1000)
        }
    }

}

module.exports = SearchPage;