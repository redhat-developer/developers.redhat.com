/* eslint-disable no-magic-numbers */
/* eslint-disable no-else-return */
import Page from '../Page';
import Driver from '../../utils/Driver.Extension';

class NavigationBar extends Page {
    get mobileMenuOpen() {return $('.rhd-c-nav-mobile');}
    get loginLink() {return $$("li.login a");}
    get mobileNavToggle() {return $('div.rhd-c-nav-mobile label');}
    get searchToggle() {return $('a[data-rhd-nav-search-toggle]');}
    get searchBar() {return $$('input[data-rhd-nav-search-input]');}

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
