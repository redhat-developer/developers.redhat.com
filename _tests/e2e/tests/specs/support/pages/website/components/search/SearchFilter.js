/* eslint-disable no-magic-numbers */
import Page from '../../../Page';
import Driver from '../../../../utils/Driver.Extension';

class SearchFilter extends Page {
    get showBtn() {
        return $('a[data-search-action="showFilters"]');
    }
    get cover() {
        return $('.cover');
    }
    get applyFilters() {
        return $('a[data-search-action="applyFilters"]');
    }
    get activeFilters() {
        return $('.activeFilters');
    }
    get clearFilters() {
        return $('a[data-search-action="clearFilters"]');
    }

    active() {
        return this.activeFilters;
    }

    clear() {
        return Driver.click(this.clearFilters);
    }

    choose(filterType, filterOption) {
        switch (filterType) {
            case 'Content Type':
                return this._selectFilter(2, filterOption);
            case 'Product':
                return this._selectFilter(3, filterOption);
            default:
                return this._selectFilter(1, filterOption);
        }
    }

    _selectFilter(groupIndex, filterOption) {
        let filter;
        let parentId = 'control';
        const isMobile = this._clickOpenMobileFilter();

        if (isMobile) {
            parentId = 'cover';
        }

        this._showMore(groupIndex, parentId);

        // eslint-disable-next-line prefer-const
        filter = $(`//*[@id="${parentId}"]/div[2]/rhdp-search-filter-group[${groupIndex}]//rhdp-search-filter-item//label[contains(text(), '${filterOption}')]`);

        Driver.click(filter);

        if (isMobile) {
            this._clickApplyMobileFilter();
        }
    }

    _showMore(groupIndex, parentId) {
        return Driver.click($(`//*[@id="${parentId}"]/div[2]/rhdp-search-filter-group[${groupIndex}]/div/a`));
    }

    _clickOpenMobileFilter() {
        const isMobile = Driver.isVisible(this.showBtn);
        if (isMobile) {
            Driver.click(this.showBtn);
            Driver.awaitIsDisplayed(this.cover);
            /*
                Seems we need to wait for the menu to be fully displayed because we're at times getting partial menu displays in the test.
                This solution is horrible. I've raised https://issues.jboss.org/browse/DEVELOPER-5896 for us to implement a better fix.
             */
            Driver.pause(3000);
            return true;
        }
        return false;
    }

    _clickApplyMobileFilter() {
        if (Driver.isVisible(this.applyFilters)) {
            return Driver.click(this.applyFilters);
        }
    }
}

export default new SearchFilter;
