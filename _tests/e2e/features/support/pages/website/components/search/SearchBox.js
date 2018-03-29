import {driver} from "../../../../../../config/browsers/DriverHelper";
import {BasePage} from "../../../Base.page";
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
        return driver.type(searchTerm, this.getSelector('searchField'));
    }

    searchFor(searchTerm) {
        driver.type(searchTerm, this.getSelector('searchField'));
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
