import {BasePage} from "../../Base.page";
import {driver} from "../../../../config/DriverHelper"
import {SearchResults} from "./SearchResults";

class SearchBox extends BasePage {
    constructor() {
        super();

        this.addSelectors(
            {
                searchField: '.user-search',
                searchButton: '#search-btn',
            });

        this.searchResults = new SearchResults();
    }

    enterSearch(searchTerm) {
        return driver.type(this.getSelector('searchField'), searchTerm);
    }

    searchFor(searchTerm) {
        driver.type(this.getSelector('searchField'), searchTerm);
        driver.clickOn(this.getSelector('searchButton'));
        return this.searchResults.awaitResultsFor(searchTerm)
    }

    clickSearchBtn() {
        return driver.clickOn(this.getSelector('searchButton'));
    }

}

export {
    SearchBox
};

