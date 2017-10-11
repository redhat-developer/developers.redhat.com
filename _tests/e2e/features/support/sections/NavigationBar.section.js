import {BasePage} from "../pages/Base.page";
import {driver} from "../../../config/browsers/DriverHelper";

class NavigationBarSection extends BasePage {

    constructor() {
        super();

        this.addSelectors({
            alertBox: '.alert-box',
            login: '.login > a',
            register: '.register > a',
            mobileNavToggle: '.nav-toggle > .fa-angle-down',
            navToggle: 'body > div.site-wrapper > header > div > div > a',
            navOpen: '.nav-open',
            searchBar: '.search-wrapper',
            searchField: '.user-search',
            searchButton: '#search-button',
            subNavTopics: '#sub-nav-topics',
            subNavCommunity: '#sub-nav-community',
            subNavHelp: '#sub-nav-help',
            subNavTechnologies: '#sub-nav-technologies',
            subNavTechnologiesLinks: '#sub-nav-technologies > .sub-nav-group > .hide-on-mobile',
            subNavCommunityLinks: '//*[@id="sub-nav-community"]//*',
            subNavHelpLinks: '//*[@id="sub-nav-help"]/a',
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

    clickMenuItem(menuItem) {
        driver.clickOn(this.getSelector(`${menuItem}`))
    }

    primaryNavItem(item) {
        this.toggleMobileNav();
        let el = driver.element(`//a[text()='${item}']`);
        return driver.isDisplayed(el);
    }

    moveToMegaMenuItem(item) {
        let el = driver.element(`//a[text()='${item}']`);
        driver.awaitIsVisible(el);
        return el.moveToObject();
    }

    clickMegaMenuItem(item) {
        this.toggleMobileNav();
        let el = driver.element(`//a[text()='${item}']`);
        driver.awaitIsVisible(el);
        return driver.clickOn(el)
    }

    getSubNavItems(item) {
        let el = driver.element(this.getSelector(`subNav${item}`));
        return el.getText()
    }

    getSubNavLinks(item) {
       let el = driver.elements(this.getSelector(`subNav${item}Links`));
       return el.getAttribute('href')
    }

    alertBoxDisplayed() {
        let el = driver.element(this.getSelector('alertBox'));
        driver.awaitIsVisible(el);
        return driver.isDisplayed(el)
    }

}

const siteNav = new NavigationBarSection();

export {
    siteNav
};
