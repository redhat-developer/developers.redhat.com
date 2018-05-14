const BasePage = require('../../../Base.page');

class SearchFilter extends BasePage {
    constructor() {
        super();

        this.addSelectors(
            {
                searchFilterBox: '//rhdp-search-filters',
                showBtn: '.showBtn',
                cover: '.cover',
                applyFilters: '.applyFilters',
                activeFilters: '.activeFilters',
                clearFilters: '.clearFilters'
            });
    }

    activeFilter() {
        return this.element(this.getSelector('activeFilters'))
    }

    clearSearchFilters() {
        return this.clickOn(this.getSelector('clearFilters'))
    }

    chooseFilter(filterType, filterOption) {
        if (filterType === 'Content Type') {
            return this._selectFilter(1, filterOption);
        } else if (filterType === 'Product') {
            return this._selectFilter(2, filterOption);
        } else {
            return this._selectFilter(3, filterOption);
        }
    }

    _selectFilter(groupIndex, filterOption) {
        let filter;
        let isMobile = this._clickOpenMobileFilter();
        if (isMobile) {
            filter = this.element(`//*[@id="cover"]/div[2]/rhdp-search-filter-group[${groupIndex}]/div/div[*]/rhdp-search-filter-item[*]/div/label[contains(text(), '${filterOption}')]`);
        } else {
            filter = this.element(`//*[@id="control"]/div[2]/rhdp-search-filter-group[${groupIndex}]/div/div[*]/rhdp-search-filter-item/div//label[contains(text(), '${filterOption}')]`);
        }
        this.clickOn(filter);
        if (isMobile) {
            this._clickApplyMobileFilter();
            // wait a second for the filter to close
            browser.pause(1000)
        }
    }

    _clickOpenMobileFilter() {
        let isMobile = this.isDisplayed(this.getSelector('showBtn'));
        if (isMobile) {
            this.clickOn(this.getSelector('showBtn'));
            this.awaitIsVisible(this.getSelector('cover'));
            // await cover to fully expand before proceeding
            browser.pause(1500);
            return true
        } else {
            return false
        }
    }

    _clickApplyMobileFilter() {
        if (this.isDisplayed(this.getSelector('applyFilters'))) {
            return this.clickOn(this.getSelector('applyFilters'));
        }
    }

}

module.exports = SearchFilter;
