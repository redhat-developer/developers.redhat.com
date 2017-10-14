const SiteNav = require("../../support/pages/home.page");
const siteNav = new SiteNav();
const FooterMenu = require("../../support/sections/footer");
const footerMenu = new FooterMenu();

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


    this.Then(/^the footer Related Sites section should contain the following links:$/, function (dataTable) {
        footerMenu.collapseFooter(1);
        let data = dataTable.raw();
        for (let i = 0; i < data.length; i++) {
            expect(footerMenu.sectionContent(1).getText()).to.includes(data[i]);
        }
    });

    this.Then(/^the footer Services section should contain the following links:$/, function (dataTable) {
        footerMenu.collapseFooter(2);
        let data = dataTable.raw();
        for (let i = 0; i < data.length; i++) {
            expect(footerMenu.sectionContent(2).getText()).to.includes(data[i]);
        }
    });

    this.Then(/^the footer Communication section should contain the following links:$/, function (dataTable) {
        footerMenu.collapseFooter(3);
        let data = dataTable.raw();
        for (let i = 0; i < data.length; i++) {
            expect(footerMenu.sectionContent(3).getText()).to.includes(data[i]);
        }
    });

};

module.exports = navigationMenuSteps;