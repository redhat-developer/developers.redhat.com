import {searchPage} from '../../support/pages/Search.page';
import {homePage} from '../../support/pages/Home.page';
import {siteNav} from "../../support/sections/NavigationBar.section";


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
        searchPage.waitForResultsLoaded()
    });

    this.When(/^I enter "([^"]*)" into the search bar$/, function (searchTerm) {
        searchPage.enterSearch(searchTerm)
    });

    this.When(/^click on the search-button$/, function () {
        searchPage.clickSearchBtn()
    });

    this.Then(/^the search field should contain "([^"]*)"$/, function (searchTerm) {
        let value = searchPage.searchField.getValue();
        expect(value).to.equal(searchTerm);
    });

    this.Then(/^the search field should not be displayed within the site header$/, function () {
        expect(siteNav.searchBarDisplayed(), 'Site-wide search bar was displayed on Search page').to.be.false;
    });

    this.When(/^I search for "(.*)"$/, function (searchTerm) {
        searchPage.searchFor(searchTerm.toString());
    });

    this.Then(/^the results should be sorted by "([^"]*)"$/, function (selectedResultSort) {
        let resultSort = searchPage.resultSort;
        expect(resultSort.getValue(), `${resultSort} was not selected`).to.equal(selectedResultSort.replace(/\s+/g, '-').toLowerCase());

        if (selectedResultSort === 'Most Recent') {
            // iterate through results and verify that they are in order
            let sR = searchPage.searchResults();
            let firstResult = searchPage.searchResultDate(1);
            for (let i = 1; i < sR.length; i++) {
                let remainingResults = searchPage.searchResultDate(i);
                assert(new Date(remainingResults).getTime() <= new Date(firstResult).getTime(),
                    `Dates were not in most-recent order. Expected date '${new Date(remainingResults)}' to be equal to or after '${new Date(firstResult)}'`);
            }
        }
    });

    this.When(/^I sort results by "([^"]*)"$/, function (sortBy) {
        searchPage.resultSortSelect(sortBy);
    });

    this.When(/^there are 10 or less results available$/, function () {
        browser.execute(function () {
            return document.body.dispatchEvent(new CustomEvent('search-complete', {
                detail: {
                    results: {
                        hits: {
                            hits: [{
                                fields: {
                                    sys_type: ['stackoverflow_thread'],
                                    sys_content_plaintext: ['Test Title']
                                }, highlight: {sys_title: ['Test Title 1']}
                            }], total: 1
                        }
                    }
                }, bubbles: true
            }));
        });
    });

    this.Then(/^I (should|should not) see a Load More link$/, function (negate) {
        if (negate === 'should') {
            expect(searchPage.loadMoreButtonIsDisplayed()).to.eq(true);
        } else {
            expect(searchPage.loadMoreButtonIsDisplayed()).to.eq(false);
        }
    });

    this.Then(/^I (should|should not) see some text that says "(.*)"$/, function (negate, text) {
        if (negate === 'should') {
            let endOfResults = searchPage.endOfResultsText().indexOf(text) > -1;
            expect(endOfResults).to.eq(true);
        } else {
            expect(searchPage.endOfResults.isVisible()).to.eq(false);
        }
    });

    this.Then(/^I should see a message "([^"]*)"$/, function (resultMsg) {
        let resultMessage = searchPage.resultCount();
        expect(resultMessage, `${resultMsg} was not displayed`).to.equal(resultMsg)
    });

    this.Then(/^the results should contain "([^"]*)"$/, function (searchTerm) {
        let sR = searchPage.searchResults();
        let result;
        for (let i = 1; i < sR.value.length; i++) {
            let title = searchPage.searchResultTitle(i);
            if (title.getText() === searchTerm) {
                result = true;
                break;
            } else {
                result = false;
            }
        }
        expect(result, `None of the top 10 results included ${searchTerm}`).to.be.true
    });

    this.Then(/^the related topic page for "([^"]*)" should be the first result$/, function (topicUrl) {
        let title = searchPage.searchResultTitle(1);
        expect(title.getAttribute('href')).to.include("/topics/" + topicUrl)
    });

    this.Then(/^first result should be the RHD About Us page$/, function () {
        searchPage.waitForResultsLoaded();
        let title = searchPage.searchResultTitle(1);
        expect(title.getText()).to.include('About Us');
        expect(title.getAttribute('href')).to.include("/about")
    });

    this.Then(/^the "([^"]*)" product overview page should be the first result$/, function (product) {
        searchPage.waitForResultsLoaded();
        let title = searchPage.searchResultTitle(1);
        expect(title.getAttribute('href')).to.include(`/products/${product}/overview`)
    });

    this.Given(/^I have searched for "([^"]*)"$/, function (searchTerm) {
        homePage.open();
        siteNav.searchFor(searchTerm);
        searchPage.awaitSearchPage();
        searchPage.waitForResultsLoaded();
        resultCount = searchPage.resultCount();
    });

    this.When(/^I filter results by "([^"]*)" from "([^"]*)"$/, function (filterOption, filterType) {
        searchPage.chooseFilter(filterType, filterOption);
    });

    this.Then(/^the results should be updated and contain "([^"]*)"$/, function (search) {
        searchPage.waitForUpdatedResults(resultCount);
        let sR = searchPage.searchResults();
        let result;
        let res;
        for (let i = 1; i < sR.value.length; i++) {
            res = searchPage.searchResult(i).getText();
            if (res.includes(search)) {
                result = true;
                break;
            } else {
                result = false;
            }
        }
        expect(result, `None of the ${sR.length} results contained ${search}`).to.be.true
    });

    this.Then(/^the results should be updated and contain a "([^"]*)" tag/, function (filter) {
        searchPage.awaitLoadingSpinner();
        expect(searchPage.activeFilter(), `Result did not include a tag for ${filter}`).to.include(filter);
    });

    this.Then(/^I (should|should not) see an alert$/, function (negate) {
        let alert = searchPage.hasAlert();
        if (negate === 'should') {
            expect(alert, 'Alert was not visible').to.be.true;
        } else {
            expect(alert, 'Warning! Alert was visible').to.be.false
        }
    });

    this.Then(/^I (should|should not) see a OneBox for "(.*)" at the top of the results$/, function (negate, product) {
        if (negate === 'should') {
            expect(searchPage.oneBox.getText(), `OneBox was not displayed for ${product}`).to.includes(product);
        } else {
            expect(searchPage.oneBox.isVisible(), `OneBox should not be displayed for ${product}`).to.be.false;
        }
    });

    this.Then(/^I am provided with a "(.*)" OneBox$/, function (product) {
        searchPage.open();
        searchPage.searchFor(product.toString());
        searchPage.awaitSearchResultsFor(product)
    });

    this.Then(/^I select the OneBox Title$/, function () {
        searchPage.clickOneBoxTitle();
    });

    this.Then(/^I select the View Downloads button$/, function () {
        searchPage.clickOneBoxDownLoadBtn();
    });

    this.Then(/^I should see the "(.*)" (Download|Overview|Hello-world|Docs-and-apis|Help) page$/, function (productTitle, pageType) {
        siteNav.waitForTitle(productTitle);
    });

    this.Then(/^I select the oneBox "(.*)" link$/, function (link) {
        searchPage.clickOneBoxLink(link)
    });

    this.Then(/^I should see a message that no search term was entered$/, function () {
        expect(searchPage.noResultsDisplayed()).to.includes('Well, this is awkward. No search term was entered yet')
    });

};

module.exports = searchSteps;