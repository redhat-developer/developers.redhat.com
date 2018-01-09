import {driver} from "../../../../../../config/browsers/DriverHelper";
import {BasePage} from "../../../Base.page";

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
            filter = driver.element(`//*[@id="cover"]/div[2]/rhdp-search-filter-group[${groupIndex}]/div/div[*]/rhdp-search-filter-item[*]/div/label[contains(text(), '${filterOption}')]`);
        } else {
            filter = driver.element(`//*[@id="control"]/div[2]/rhdp-search-filter-group[${groupIndex}]/div/div[*]/rhdp-search-filter-item/div//label[contains(text(), '${filterOption}')]`);
        }
        driver.clickOn(filter);
        if (isMobile) {
            this._clickApplyMobileFilter();
            // wait a second for the filter to close
            browser.pause(1000)
        }
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
