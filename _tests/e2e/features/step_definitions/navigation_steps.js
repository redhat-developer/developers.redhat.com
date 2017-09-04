const HomePage = require("../support/pages/Home.page");
const LoginPage = require("../support/pages/Login.page");
const RegisterPage = require("../support/pages/Register.page");
const SearchPage = require("../support/pages/Search.page");
const SiteNav = require("../support/pages/Home.page");
const homePage = new HomePage;
const loginPage = new LoginPage;
const registerPage = new RegisterPage;
const searchPage = new SearchPage;
const siteNav = new SiteNav();

const navigationSteps = function () {

    this.Given(/^I am on the "([^"]*)" page$/, function(page) {
        if (page === "Home") {
            homePage.open();
        } else if (page === "Login") {
            loginPage.open();
        } else if (page === "Register") {
            registerPage.open();
        } else if (page === "Search") {
            searchPage.open();
        } else {
            throw new Error(`${page} is not a recognised page`)
        }
    });

    this.When(/^I click on the "([^"]*)" link within the primary nav bar$/, function (primaryNavLink) {
        homePage.clickMenuItem(primaryNavLink)
    });

    this.Given(/^I navigate directly to the "([^"]*)" page$/, function (page) {
        if (page === "Home") {
            homePage.open();
        } else if (page === "Login") {
            loginPage.open();
        } else if (page === "Register") {
            registerPage.open();
        } else if (page === "Search") {
            searchPage.open();
        } else {
            throw new Error(`${page} is not a recognised page`)
        }
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

module.exports = navigationSteps;
