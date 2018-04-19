const BasePage = require('../Base.page');
const SearchBox = require("./components/search/SearchBox");
const SearchFilter = require("./components/search/SearchFilter");
const SearchOneBox = require("./components/search/SearchOneBox");
const SearchResults = require("./components/search/SearchResults");
const SearchResultSort = require("./components/search/SearchResultSort");

class SearchPage extends BasePage {

    constructor() {
        super({
            path: '/search/',
            pageTitle: 'Search Results',
            selector: '//rhdp-search-results',
        });

        this.addSelectors({
            searchPage: '.searchpage-middle',
        });

        this.searchBox = new SearchBox();
        this.searchFilter = new SearchFilter();
        this.searchResults = new SearchResults();
        this.searchOneBox = new SearchOneBox();
        this.searchResultSort = new SearchResultSort();
    }

    awaitSearchPage() {
        this.awaitIsVisible(this.getSelector('searchPage'), 30000);
        return this.searchResults.awaitLoadingSpinner()
    }

}

module.exports = SearchPage;
