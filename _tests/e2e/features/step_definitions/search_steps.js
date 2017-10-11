import {driver} from "../../config/browsers/DriverHelper";
import {searchPage} from "../support/pages/website/Search.page";
import {homePage} from "../support/pages/website/Home.page";
import {siteNav} from "../support/sections/NavigationBar.section";

const searchSteps = function () {

    let resultCount;

    this.Then(/^I am on the Search page$/, function () {
        searchPage.open();
    });

    this.Given(/^I navigate directly to search page with "([^"]*)"$/, function (searchTerm) {
        const openUrl = `/search/?t=${searchTerm}`;
        browser.url(process.env.RHD_BASE_URL + openUrl);
    });

    this.When(/^the search page is displayed$/, function () {
        searchPage.awaitSearchPage();
    });

    this.Then(/^search results are displayed$/, function () {
        searchPage.searchResults.waitForResultsLoaded()
    });

    this.When(/^I enter "([^"]*)" into the search bar$/, function (searchTerm) {
        searchPage.searchBox.enterSearch(searchTerm)
    });

    this.When(/^click on the search-button$/, function () {
        searchPage.searchBox.clickSearchBtn()
    });

    this.Then(/^the search field should contain "([^"]*)"$/, function (searchTerm) {
        let value = searchPage.searchBox.searchField.getValue();
        expect(value).to.equal(searchTerm);
    });

    this.Then(/^the search field should not be displayed within the site header$/, function () {
        expect(siteNav.searchBarDisplayed(), 'Site-wide search bar was displayed on Search page').to.be.false;
    });

    this.When(/^I search for "(.*)"$/, function (searchTerm) {
        searchPage.searchBox.searchFor(searchTerm.toString());
    });

    this.Then(/^the results should be sorted by "([^"]*)"$/, function (selectedResultSort) {
        let resultSort = searchPage.searchResultSort.getResultSort();
        expect(resultSort, `${resultSort} was not selected`).to.equal(selectedResultSort.replace(/\s+/g, '-').toLowerCase());

        if (selectedResultSort === 'Most Recent') {
            // iterate through results and verify that they are in order
            let sR = searchPage.searchResults.getAllResults();
            let firstResult = searchPage.searchResults.getResultDate(1);
            for (let i = 1; i < sR.length; i++) {
                let remainingResults = searchPage.searchResults.getResultDate(i);
                assert(new Date(remainingResults).getTime() <= new Date(firstResult).getTime(),
                    `Dates were not in most-recent order. Expected date '${new Date(remainingResults)}' to be equal to or after '${new Date(firstResult)}'`);
            }
        }
    });

    this.When(/^I sort results by "([^"]*)"$/, function (sortBy) {
        searchPage.searchResultSort.selectSortBy(sortBy);
    });

    this.When(/^there are 10 or less results available$/, function () {
        searchPage.searchResults.showLessThanTenResults()
    });

    this.Then(/^I (should|should not) see a Load More link$/, function (negate) {
        if (negate === 'should') {
            expect(searchPage.searchResults.loadMoreButtonIsDisplayed()).to.eq(true);
        } else {
            expect(searchPage.searchResults.loadMoreButtonIsDisplayed()).to.eq(false);
        }
    });

    this.Then(/^I (should|should not) see some text that says "(.*)"$/, function (negate, text) {
        if (negate === 'should') {
            let endOfResults = searchPage.searchResults.endOfResultsText().getText().indexOf(text) > -1;
            expect(endOfResults).to.eq(true);
        } else {
            expect(searchPage.searchResults.endOfResultsText().isVisible()).to.eq(false);
        }
    });

    this.Then(/^I should see a message "([^"]*)"$/, function (resultMsg) {
        let resultMessage = searchPage.searchResults.getResultCount();
        expect(resultMessage, `${resultMsg} was not displayed`).to.equal(resultMsg)
    });

    this.Then(/^the results should contain "([^"]*)"$/, function (searchTerm) {
        let sR = searchPage.searchResults.getAllResults();
        let result;
        for (let i = 1; i < sR.value.length; i++) {
            let title = searchPage.searchResults.getResultByIndex(i).getText();
            if (title.indexOf(searchTerm) > -1) {
                result = true;
                break;
            } else {
                result = false;
            }
        }
        expect(result, `None of the top 10 results included ${searchTerm}`).to.be.true
    });

    this.Then(/^the related topic page for "([^"]*)" should be the first result$/, function (topicUrl) {
        let title = searchPage.searchResults.getResultTitleByIndex(1);
        expect(title.getAttribute('href')).to.include("/topics/" + topicUrl)
    });

    this.Then(/^first result should be the RHD About Us page$/, function () {
        searchPage.searchResults.waitForResultsLoaded();
        let title = searchPage.searchResults.getResultTitleByIndex(1);
        expect(title.getText()).to.include('About Us');
    });

    this.Then(/^the "([^"]*)" product overview page should be the first result$/, function (product) {
        searchPage.searchResults.waitForResultsLoaded();
        let title = searchPage.searchResults.getResultTitleByIndex(1);
        expect(title.getAttribute('href')).to.include(`/products/${product}/overview`)
    });

    this.Given(/^I have searched for "([^"]*)"$/, function (searchTerm) {
        homePage.open();
        siteNav.searchFor(searchTerm);
        searchPage.awaitSearchPage();
        searchPage.searchResults.waitForResultsLoaded();
        resultCount = searchPage.searchResults.getResultCount();
    });

    this.When(/^I filter results by "([^"]*)" from "([^"]*)"$/, function (filterOption, filterType) {
        searchPage.searchFilter.chooseFilter(filterType, filterOption);
    });

    this.Then(/^the results should be updated and contain a "([^"]*)" tag/, function (filter) {
        searchPage.searchResults.awaitLoadingSpinner();
        expect(searchPage.searchFilter.activeFilter(), `Result did not include a tag for ${filter}`).to.include(filter);
    });

    this.Then(/^I (should|should not) see an alert$/, function (negate) {
        let alert = driver.hasAlert();
        if (negate === 'should') {
            expect(alert, 'Alert was not visible').to.be.true;
        } else {
            expect(alert, 'Warning! Alert was visible').to.be.false
        }
    });

    this.Then(/^I should see a OneBox for "(.*)" at the top of the results$/, function (product) {
        expect(searchPage.searchOneBox.getOneBoxTitle()).to.eq(product);
    });

    this.Then(/^I should not see a product OneBox for at the top of the results$/, function () {
        expect(searchPage.searchOneBox.getOneBoxElement('oneBoxTitle').isVisible(), 'OneBox should not be displayed').to.be.false;
    });

    this.Then(/^I am provided with a "(.*)" OneBox$/, function (product) {
        searchPage.open();
        searchPage.searchBox.searchFor(product.toString());
        searchPage.searchResults.awaitResultsFor(product)
    });

    this.Then(/^I select the OneBox "(.*)" Title$/, function (title) {
        searchPage.searchOneBox.clickOneBoxElement(title);
    });

    this.Then(/^I select the "(.*)" within the product OneBox$/, function (oneBoxEelement) {
        searchPage.searchOneBox.clickOneBoxElement(oneBoxEelement);
    });

    this.Then(/^I should see the "(.*)" (Download|Overview|Hello-world|Docs-and-apis|Help) page$/, function (productTitle, pageType) {
        driver.waitForTitle(productTitle);
    });

    this.Then(/^I select the oneBox "(.*)" link$/, function (link) {
        searchPage.searchOneBox.clickOneBoxElement(link)
    });

    this.Then(/^I should see a message that no search term was entered$/, function () {
        expect(searchPage.searchResults.noResultsDisplayed()).to.contain('Well, this is awkward. No search term was entered yet')
    });

};

module.exports = searchSteps;
