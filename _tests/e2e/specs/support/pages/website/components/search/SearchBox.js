const BasePage = require('../../../Base.page');
const SearchResults = require('./SearchResults');

class SearchBox extends BasePage {
    constructor() {
        super();

        this.addSelectors(
            {
                searchField: '#query',
                searchButton: '#search-btn',
            });

        this.searchResults = new SearchResults();
    }

    enterSearch(searchTerm) {
        return this.type(searchTerm, this.getSelector('searchBar'));
    }

    searchFor(searchTerm) {
        this.enterSearch(searchTerm);
        return this.triggerSearch();
    }

    triggerSearch() {
        return this.clickOn(this.getSelector('searchButton'));
    }

}

module.exports = SearchBox;