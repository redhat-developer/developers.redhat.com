/* eslint-disable no-magic-numbers */
/* eslint-disable no-else-return */
import Page from '../Page';
import Driver from '../../utils/Driver.Extension';

class NavigationBar extends Page {
    get mobileMenuOpen() {return $('.rhd-c-nav-dropdown');}
    get loginLink() {return $$("li.login a");}
    get mobileNavToggle() {return $('.rhd-c-nav-mobile > .hamburger');}
    get searchToggle() {return $('[data-rhd-nav-search-toggle]');}
    get searchBar() {return $$('input[data-rhd-nav-search-input]');}

    toggle() {
        const mobileNavToggle = Driver.isVisible(this.mobileNavToggle);
        if (mobileNavToggle) {
            this.openMobileMenuWithRetry();
            return true;
        }
        return false;
    }

    openMobileMenu() {
        Driver.click(this.mobileNavToggle);
        Driver.awaitIsDisplayed(this.mobileMenuOpen, 10000);
    }

    openMobileMenuWithRetry() {
        try {
            this.openMobileMenu();
        } catch (err) {
            console.log("Failed to open mobile menu, retrying...");
            this.openMobileMenu();
        }
    }

    login() {
        const isMobile = this.toggle();
        const loginElements = this.loginLink;
        if (isMobile) {
            Driver.click(loginElements[1]);
        } else {
            Driver.click(loginElements[0]);
        }
    }

    enterSearch(searchTerm) {
        const isMobile = this.toggle();
        if (isMobile === true) {
            return Driver.type(searchTerm, this.searchBar[1]);
        } else {
            Driver.click(this.searchToggle);
            return Driver.type(searchTerm, this.searchBar[0]);
        }
    }

    searchFor(searchTerm) {
        this.enterSearch(searchTerm);
        return this.triggerSearch();
    }

    triggerSearch() {
        return Driver.enter();
    }
}

export default new NavigationBar;
