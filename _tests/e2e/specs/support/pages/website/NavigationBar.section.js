const BasePage = require('../Base.page');

class NavigationBarSection extends BasePage {

    constructor() {
        super();

        this.addSelectors({
            mobileMenuOpen: '.mobile-tray-open',
            login: "//a[text()='Log In']",
            mobileNavToggle: 'button*=Menu',
            searchToggle: '//*[@id="block-rhdnavigation"]/ul/li[@class="rhd-nav-search"]',
            searchOpen: '.rhd-nav-search.open',
            searchBar: '.user-search',
            searchButton: '#search-button',
            navToggle: 'body > div.site-wrapper > header > div > div > a',
            navOpen: '.rhd-mobile-tray',
        });
    }

    toggleMobileNav() {
        let mobileNavToggle;
        mobileNavToggle = this.isDisplayed(this.getSelector('mobileNavToggle'));
        if (mobileNavToggle) {
            this.clickOn(this.getSelector('mobileNavToggle'));
            // wait for modal to completely open
            this.awaitIsVisible(this.getSelector('mobileMenuOpen'));
            browser.pause(1000);
            return true
        } else {
            return false;
        }
    }

    clickLoginLink() {
        let isMobile = this.toggleMobileNav();
        let loginElements = this.elements(this.getSelector('login'));
        if (isMobile) {
            this.clickOn(loginElements.value[1])
        } else {
            this.clickOn(loginElements.value[0])
        }
    }

    toggleSearchBar() {
        this.clickOn(this.getSelector('searchToggle'));
        this.awaitIsVisible(this.getSelector('searchOpen')) && this.awaitIsVisible(this.getSelector('searchBar'))
    }

    searchField() {
        return this.elements(this.getSelector('searchBar'));
    }

    searchBtn() {
        return this.elements(this.getSelector('searchButton'));
    }

    enterSearch(searchTerm) {
        let isMobile = this.toggleMobileNav();
        if (isMobile === true) {
            return this.type(searchTerm, this.searchField().value[1]);
        } else {
            this.toggleSearchBar();
            return this.type(searchTerm, this.searchField().value[0]);
        }
    }

    searchFor(searchTerm) {
        this.enterSearch(searchTerm);
        return this.triggerSearch();
    }

    triggerSearch() {
        if (this.isDisplayed(this.getSelector('mobileMenuOpen'))) {
            return this.clickOn(this.searchBtn().value[1]);
        } else {
            return this.clickOn(this.searchBtn().value[0]);
        }
    }
}

module.exports = NavigationBarSection;