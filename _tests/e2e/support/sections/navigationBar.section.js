"use strict";

class NavigationBarSection {
    constructor() {
    }

    // get searchForm() { return $("#submit-search"); }
    get searchField() { return $(".user-search"); }

    searchFor(searchTerm) {
        this.searchField.setValue(searchTerm);
        browser.keys('Enter')

    }
}

module.exports = NavigationBarSection;
