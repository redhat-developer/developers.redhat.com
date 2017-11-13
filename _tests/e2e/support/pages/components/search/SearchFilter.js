import {BasePage} from "../../Base.page";
import {driver} from "../../../../config/DriverHelper"

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
            });
    }

    activeFilter() {
        return driver.textOf(this.getSelector('activeFilters'));
    }

    chooseFilter(filterType, filterOption) {
        let selectedFilter;
        if (filterType === 'Content Type') {
            selectedFilter = this._selectFilter(1, filterOption);
        } else if (filterType === 'Product') {
            selectedFilter = this._selectFilter(2, filterOption);
        } else {
            selectedFilter = this._selectFilter(3, filterOption);
        }
        return selectedFilter
    }

    _selectFilter(groupIndex, filterOption) {
        let filter;
        let isMobile = this._clickOpenMobileFilter();
        if (isMobile) {
            filter = driver.element(`//*[@id="cover"]/div[2]/rhdp-search-filter-group[${groupIndex}]/div/div[*]/rhdp-search-filter-item[*]/div/label[contains(text(), '${filterOption}')]`);
            this._clickApplyMobileFilter();
        } else {
            filter = driver.element(`//*[@id="control"]/div[2]/rhdp-search-filter-group[${groupIndex}]/div/div[*]/rhdp-search-filter-item/div//label[contains(text(), '${filterOption}')]`);
        }
        driver.clickOn(filter);
        if (driver.isSelected(filter)) {
            return filter
        } else
            return Error(`${filter} was not selected`);
    }

    _clickOpenMobileFilter() {
        let isMobile = driver.isDisplayed(this.getSelector('showBtn'));
        if (isMobile) {
            driver.clickOn(this.getSelector('showBtn'));
            driver.awaitIsVisible(this.getSelector('cover'));
            // await cover to fully expand before proceeding
            browser.pause(1500);
            return true
        } else {
            return false
        }
    }

    _clickApplyMobileFilter() {
        if (driver.isDisplayed(this.getSelector('applyFilters'))) {
            return driver.clickOn(this.getSelector('applyFilters'));
        }
    }

}

export {
    SearchFilter
};
