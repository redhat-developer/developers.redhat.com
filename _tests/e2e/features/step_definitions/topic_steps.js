import {TopicsPage} from "../support/pages/website/Topics.page";

const topicsSteps = function () {

    let topicsPage;
    this.Given(/^I am on the "([^"]*)" Topic page$/, function (topic) {
        topicsPage = new TopicsPage(topic);
        topicsPage.open();
        topicsPage.awaitTopicsPage()

    });

    this.Then(/^I should see at least (\d+) Resource Cards$/, function (expectedCards) {
        let tertiaryCards = topicsPage.getTertiaryCards().value.length;
        let whiteCards = topicsPage.getWhiteCards().value.length;
        let actualCards = tertiaryCards + whiteCards;
        expect(actualCards).to.be.gte(expectedCards)
    });

};
module.exports = topicsSteps;