class NavigationBarSection {

    get searchBar() {
        return $('.search-wrapper');
    }

    get searchField() {
        return $('.user-search');
    }

    get searchButton() {
        return $('#search-button');
    }

    get navToggle() {
        // not possible to click .nav-toggle, using xpath
        return $('body > div.site-wrapper > header > div > div > a');
    }

    isMobile() {
        var isVisible = browser.isVisible('.nav-toggle');
        if (isVisible) {
            this.navToggle.click();
        }
    }

    enterSearch(searchTerm) {
        this.isMobile();
        this.searchField.setValue(searchTerm);
    }

    triggerSearch(searchTrigger = 'search-button') {
        // trigger search by defined trigger
        if (searchTrigger === 'search-button') {
            this.searchButton.click();
        } else {
            browser.keys('Enter')
        }
    }

    searchFor(searchTerm) {
        this.isMobile();
        this.searchField.setValue(searchTerm);
        this.searchButton.click();
    }
}

module.exports = NavigationBarSection;