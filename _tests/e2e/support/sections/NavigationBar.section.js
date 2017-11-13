import {BasePage} from "../pages/Base.page";
import {driver} from "../../config/DriverHelper"

class NavigationBarSection extends BasePage {

    constructor() {
        super();

        this.addSelectors({
            mobileNavToggle: '.nav-toggle',
            navToggle: 'body > div.site-wrapper > header > div > div > a',
            searchBar: '.search-wrapper',
            searchField: '.user-search',
            searchButton: '#search-button'
        });
    }

    isMobile() {
        if (driver.isDisplayed(this.getSelector('mobileNavToggle'))) {
            this.clickOn(this.getSelector('navToggle'));
        }
    }

    enterSearch(searchTerm) {
        this.isMobile();
        return driver.type(this.getSelector('searchField'), searchTerm);
    }

    triggerSearch(searchTrigger = 'search-button') {
        if (searchTrigger === 'search-button') {
            driver.clickOn(this.getSelector('searchButton'));
        } else {
            driver.key('Enter')
        }
    }

    searchFor(searchTerm) {
        this.isMobile();
        driver.type(this.getSelector('searchField'), searchTerm);
        driver.clickOn(this.getSelector('searchButton'));
    }

    searchBarDisplayed() {
        return driver.isDisplayed(this.getSelector('searchBar'));
    }

}

const siteNav = new NavigationBarSection();

export {
    siteNav
};
