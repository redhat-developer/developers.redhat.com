import {BasePage} from "../pages/Base.page";
import {driver} from "../../config/DriverHelper"

class NavigationBarSection extends BasePage {

    constructor() {
        super();

        this.addSelectors({
            mobileNavToggle: '.nav-toggle > .fa-angle-down',
            navToggle: 'body > div.site-wrapper > header > div > div > a',
            navOpen: '.nav-open',
            searchBar: '.search-wrapper',
            searchField: '.user-search',
            searchButton: '#search-button'
        });
    }

    toggleMobileNav() {
        let mobileNavToggle;
        mobileNavToggle = driver.isDisplayed(this.getSelector('mobileNavToggle'));
        if (mobileNavToggle === true) {
            driver.clickOn(this.getSelector('navToggle'));
            driver.awaitIsVisible(this.getSelector('navOpen'));
            // wait for modal to completely open
            browser.pause(1000)
        }
    }

    enterSearch(searchTerm) {
        this.toggleMobileNav();
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
        this.toggleMobileNav();
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
