/* eslint-disable no-magic-numbers */
import Page from '../../Page';
import Driver from '../../../../support/utils/Driver.Extension';

class SearchFilter extends Page {
    get showBtn() {return $('.showBtn');}
    get cover() {return $('.cover');}
    get applyFilters() {return $('.applyFilters');}
    get activeFilters() {return $('.activeFilters');}
    get clearFilters() {return $('.clearFilters');}

    active() {
        return this.activeFilters;
    }

    clear() {
        return Driver.click(this.clearFilters);
    }

    choose(filterType, filterOption) {
        switch (filterType) {
            case 'Content Type':
                return this._selectFilter(1, filterOption);
            case 'Product':
                return this._selectFilter(2, filterOption);
            default:
                return this._selectFilter(3, filterOption);
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
            // wait for slider to complete
            Driver.pause(1000);
            return true;
        }
        return false;
    }

    _clickApplyMobileFilter() {
        if (Driver.isVisible(this.applyFilters)) {
            Driver.click(this.applyFilters);
            Driver.pause(1000);
        }
    }
}

export default new SearchFilter;
