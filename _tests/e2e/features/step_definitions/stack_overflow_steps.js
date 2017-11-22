import {stackOverflowPage} from "../support/pages/website/StackOverflow.page";

const stackOverflowSteps = function () {

    this.Given(/^I am on the Stack Overflow page$/, function () {
        stackOverflowPage.open();
        stackOverflowPage.awaitSearchResults()
    });

    this.Then(/^I should see a list of "([^"]*)" results$/, function (numberOfResults) {
        let results = stackOverflowPage.getAllResults().value.length;
        expect(results.toString()).to.eq(numberOfResults)
    });

    this.Then(/^each results should contain an activity summary:$/, function (dataTable) {
        let results = stackOverflowPage.getAllResults();
        let data = dataTable.raw();
        for (let result = 0; result < results.value.length; result++) {
            for (let i = 0; i < data.length; i++) {
                expect(results.value[result].getText(), `result ${results.value[result]} did not contain ${data[i]}`).to.contain(data[i]);
            }
        }
    });

    this.Then(/^each question should contain a question summary$/, function () {
        let results = stackOverflowPage.getAllResultsContent().value.length;
        expect(results).to.eq(10)
    });

    this.Then(/^each question should link to the relevant question on Stack Overflow$/, function () {
        let results = stackOverflowPage.stackOverflowLinks();
        for (let result = 0; result < results.value.length; result++) {
            expect(results.value[result].getAttribute('href')).to.contain('https://stackoverflow.com/questions/');
        }
    });

    let soElement;
    this.When(/^a question contains an answer$/, function () {
        soElement = stackOverflowPage.findQuestionWithAnswer();
    });

    this.When(/^a question does not contain an answer$/, function () {
        soElement = stackOverflowPage.findQuestionWithoutAnswer();
    });

    this.Then(/^I (should|should not) see a answer section$/, function (negate) {
        if (negate === 'should') {
            expect(soElement.getText()).to.contain('answer:')
        } else {
            expect(soElement.getText(), 'Question without an answer included an answered section').to.not.include('answer:')
        }
    });

    this.Then(/^a "([^"]*)" link that links to that question on Stack Overflow in a new window$/, function (arg1) {
        let currentWindowId = browser.getCurrentTabId();
        let currentWindowHandles = browser.windowHandles();
        stackOverflowPage.clickReadFullQuestion(soElement);
        let updatedWindowHandles = browser.windowHandles();
        browser.switchTab(currentWindowId);
        assert(updatedWindowHandles.value.length > currentWindowHandles.value.length);
    });


    this.Then(/^each question should display how long ago the question was asked$/, function () {
        let results = stackOverflowPage.getAllResults();
        let author = stackOverflowPage.stackOverflowAuthor();
        expect(author.value.length).to.eq(results.value.length)
    });

    this.When(/^I select "([^"]*)" from the products filter$/, function (filter) {
        stackOverflowPage.selectFilterByProduct(filter)
    });

    this.Then(/^the results should be updated containing questions relating to "([^"]*)"$/, function (productId) {
        stackOverflowPage.awaitResultsFor(productId);
        let sR = stackOverflowPage.getAllResults();
        for (let i = 1; i < sR.value.length; i++) {
            expect(sR.value[i].getText()).to.contain(productId)
        }
    });

    this.When(/^I select to show "([^"]*)" results per page$/, function (numberOfResults) {
        stackOverflowPage.selectResultsPerPage(numberOfResults)
    });
};

module.exports = stackOverflowSteps;
