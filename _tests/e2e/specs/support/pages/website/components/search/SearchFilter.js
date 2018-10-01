import {Page} from '../../../Page';

export class SearchFilter extends Page {

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

    active() {
        return this.element(this.getSelector('activeFilters'));
    }

    clear() {
        return this.click(this.getSelector('clearFilters'));
    }

    choose(filterType, filterOption) {
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
            filter = this.element(`//*[@id="cover"]//label[contains(text(), '${filterOption}')]`);
        } else {
            filter = this.element(`//*[@id="control"]//label[contains(text(), '${filterOption}')]`);
        }
        this.click(filter);
        if (isMobile) {
            this._clickApplyMobileFilter();
            // wait a second for the filter to close
            this.pause(1000);
        }
    }

    _clickOpenMobileFilter() {
        let isMobile = this.displayed(this.getSelector('showBtn'));
        if (isMobile) {
            this.click(this.getSelector('showBtn'));
            this.awaitIsVisible(this.getSelector('cover'));
            // await cover to fully expand before proceeding
            this.pause(1500);
            return true
        } else {
            return false
        }
    }

    _clickApplyMobileFilter() {
        if (this.displayed(this.getSelector('applyFilters'))) {
            return this.click(this.getSelector('applyFilters'));
        }
    }
}
