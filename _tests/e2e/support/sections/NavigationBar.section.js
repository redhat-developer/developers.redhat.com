import {BasePage} from "../pages/Base.page";

class NavigationBarSection extends BasePage {

    constructor() {
        super();
    }

    get mobileNavToggle() {
        return browser.element('.nav-toggle')
    }

    get searchBar() {
        return browser.element('.search-wrapper');
    }

    get searchField() {
        return browser.element('.user-search');
    }

    get searchButton() {
        return browser.element('#search-button');
    }

    get navToggle() {
        return browser.element('body > div.site-wrapper > header > div > div > a');
    }

    isMobile() {
        if (this.mobileNavToggle.isVisible()) {
            this.clickOn(this.navToggle);
        }
    }

    enterSearch(searchTerm) {
        this.isMobile();
        this.type(this.searchField, searchTerm);
    }

    triggerSearch(searchTrigger = 'search-button') {
        if (searchTrigger === 'search-button') {
            this.clickOn(this.searchButton);
        } else {
            browser.keys('Enter')
        }
    }

    searchFor(searchTerm) {
        this.isMobile();
        this.type(this.searchField, searchTerm);
        this.clickOn(this.searchButton);
    }

    searchBarDisplayed() {
        return this.isDisplayed(this.searchBar);
    }

}

const siteNav = new NavigationBarSection();

export {
    siteNav
};
