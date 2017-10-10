const SiteNav = require("../../support/pages/home.page");
const siteNav = new SiteNav();

const navigationMenuSteps = function () {

    this.When(/^I click on the "([^"]*)" link within the primary nav bar$/, function (primaryNavLink) {
        siteNav.clickMenuItem(primaryNavLink)
    });

    this.When(/^I search for "([^"]*)" via the site-nav search bar$/, function (searchTerm) {
        siteNav.searchFor(searchTerm);
    });

    this.When(/^I enter "([^"]*)" into the site-nav search bar$/, function (searchTerm) {
        siteNav.enterSearch(searchTerm);
    });

    this.When(/^I trigger the search via the (search-button|enter-key)$/, function (searchTrigger) {
        siteNav.triggerSearch(searchTrigger)
    });
};

module.exports = navigationMenuSteps;