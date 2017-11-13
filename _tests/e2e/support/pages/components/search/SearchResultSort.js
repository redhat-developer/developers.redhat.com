import {BasePage} from "../../Base.page";
import {driver} from "../../../../config/DriverHelper"
import {SearchResults} from "./SearchResults";

class SearchResultSort extends BasePage {
    constructor() {
        super();
        this.addSelectors({
            resultSort: '//rhdp-search-sort-page/p/select'
        });
        this.searchResults = new SearchResults();
    }

    getResultSort() {
        return driver.getValue(this.getSelector('resultSort'))
    }

    selectSortBy(sortBy) {
        driver.selectByValue(this.getSelector('resultSort'), sortBy.replace(/\s+/g, '-').toLowerCase());
        return this.searchResults.waitForResultsLoaded()
    }

}

export {
    SearchResultSort
};
