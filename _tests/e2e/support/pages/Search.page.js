import {BasePage} from './Base.page';
import {driver} from "../../config/DriverHelper"
import {SearchBox} from "./components/search/SearchBox";
import {SearchFilter} from "./components/search/SearchFilter";
import {SearchOneBox} from "./components/search/SearchOneBox";
import {SearchResults} from "./components/search/SearchResults";
import {SearchResultSort} from "./components/search/SearchResultSort";

class SearchPage extends BasePage {

    constructor() {
        super({
            path: '/search/',
            selector: '.search',
        });

        this.addSelectors({
            searchPage: '.search'
        });

        this.searchBox = new SearchBox();
        this.searchFilter = new SearchFilter();
        this.searchResults = new SearchResults();
        this.searchOneBox = new SearchOneBox();
        this.searchResultSort = new SearchResultSort();

    }

    awaitSearchPage() {
        driver.awaitIsVisible(this.getSelector('searchPage'));
        return this.searchResults.awaitLoadingSpinner()
    }

}

const
    searchPage = new SearchPage();

export {
    searchPage
};
