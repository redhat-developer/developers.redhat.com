const HomePage = require("../support/pages/Home.page");
const homePage = new HomePage;

const homepageSteps = function () {

    this.Given(/^I am on the Home page$/, function () {
        homePage.open();
    });

};
module.exports = homepageSteps;
