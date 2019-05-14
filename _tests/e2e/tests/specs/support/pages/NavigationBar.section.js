/* eslint-disable no-magic-numbers */
/* eslint-disable no-else-return */
import Page from './Page';
import Driver from '../utils/Driver.Extension';

class NavigationBar extends Page {
    get mobileMenuOpen() {return $('.mobile-tray-open');}
    get loginLink() {return $$("//a[text()='Log In']");}
    get mobileNavToggle() {return $('button*=Menu');}
    get searchToggle() {return $('//*[@id="block-rhdnavigation"]/ul/li[@class="rhd-nav-search"]');}
    get searchBar() {return $$('.user-search');}

    toggle() {
        const mobileNavToggle = Driver.isVisible(this.mobileNavToggle);
        if (mobileNavToggle) {
            Driver.click(this.mobileNavToggle);
            // wait for modal to completely open
            Driver.awaitIsDisplayed(this.mobileMenuOpen);
            return true;
        }
        return false;
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