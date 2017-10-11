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
        return $('body > div.site-wrapper > header > div > div > a');
    }

    get loginLink() {
        return $('.login')
    }

    get registerLink() {
        return $('.register')
    }

    get loggedInName() {
        return $('.logged-in-name');
    }

    get logoutLink() {
        return $('.logout');
    }

    isMobile() {
        let isVisible = browser.isVisible('.nav-toggle');
        if (isVisible) {
            this.navToggle.click();
        }
    }

    getLoggedInName() {
        this.isMobile();
        let loggedInName = this.loggedInName;
        loggedInName.waitForVisible(8000);
        return loggedInName.getText();
    }

    clickLogout() {
        this.isMobile();
        let logoutLink = this.logoutLink;
        if (logoutLink.isVisible()) {
            logoutLink.click()
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

    clickMenuItem(menuItem) {
        this.isMobile();
        if (menuItem === 'Login') {
            this.loginLink.waitForVisible();
            this.loginLink.click()
        } else {
            this.registerLink.waitForVisible();
            this.registerLink.click()
        }
    }
}

module.exports = NavigationBarSection;