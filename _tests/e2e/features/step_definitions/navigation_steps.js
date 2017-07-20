const HomePage = require("../../support/pages/home.page");
const SearchPage = require("../../support/pages/search.page");

const homePage = new HomePage;
const searchPage = new SearchPage;

const navigationSteps = function () {

    this.Given(/^I am on the "([^"]*)" page$/, function (page) {
        if (page === "Home") {
            homePage.open();
        } else if (page === "Search") {
            searchPage.open();
        } else {
            throw new Error(`${page} is not a recognised page`)
        }
    });
};

module.exports = navigationSteps;
