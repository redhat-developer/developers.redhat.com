import {homePage} from "../support/pages/website/Home.page"

const homepageSteps = function () {

    this.Given(/^I am on the Home page$/, function () {
        homePage.open('/');
        homePage.waitForResourcesLoaded()
    });

    this.Then(/^the HTML title is prefixed with the text "([^"]*)"$/, function (title) {
        expect(browser.getTitle()).to.contain(title)
    });
};

module.exports = homepageSteps;