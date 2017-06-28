let homePage = require("../../support/pages/home.page");
let searchPage = require("../../support/pages/search.page");

const myStepDefinitionsWrapper = function () {

    this.Given(/^I am on the "([^"]*)" page$/, function (page) {
        homePage.open();
    });

    this.When(/^I search for "([^"]*)"$/, function (searchTerm) {
        homePage.searchFor(searchTerm.toString());
    });

    this.Then(/^the search page is displayed$/, function () {
        browser.getTitle().should.include('Search Results');
    });

    this.Then(/^the search field should contain "([^"]*)"$/, function (arg1) {
        let value = searchPage.searchBar.getValue();
        value.should.equal(arg1.toString())
    });
};

module.exports = myStepDefinitionsWrapper;
