import {homePage} from "../support/pages/website/Home.page"

const homepageSteps = function () {

    this.Given(/^I am on the Home page$/, function () {
        homePage.open('/');
        homePage.waitForResourcesLoaded()
    })

};

module.exports = homepageSteps;