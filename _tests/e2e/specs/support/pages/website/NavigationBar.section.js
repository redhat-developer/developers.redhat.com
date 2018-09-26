import {Base} from '../Base.page';
import {Search} from "./Search.page";

export class NavigationBar extends Base {

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

    toggle() {
        let mobileNavToggle;
        mobileNavToggle = this.displayed(this.getSelector('mobileNavToggle'));
        if (mobileNavToggle) {
            this.clickOn(this.getSelector('mobileNavToggle'));
            // wait for modal to completely open
            this.awaitIsVisible(this.getSelector('mobileMenuOpen'));
            browser.pause(1000);
            return true;
        } else {
            return false;
        }
    }

    clickLogin() {
        let isMobile = this.toggle();
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
        let isMobile = this.toggle();
        if (isMobile === true) {
            return this.type(searchTerm, this.searchField().value[1]);
        } else {
            this.toggleSearchBar();
            return this.type(searchTerm, this.searchField().value[0]);
        }
    }

    searchFor(searchTerm) {
        this.enterSearch(searchTerm);
        this.triggerSearch();
        return new Search().awaitSearchPage()
    }

    triggerSearch() {
        return this.key("\uE007");
    }
}
