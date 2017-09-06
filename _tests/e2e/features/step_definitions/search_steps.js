const SearchPage = require("../../support/pages/search.page");
const HomePage = require("../../support/pages/home.page");
const searchPage = new SearchPage;
const homePage = new HomePage;

module.exports = function () {

    let resultCount;

    this.Then(/^the search page is displayed$/, function () {
        expect(searchPage.isOnSearchPage(), 'Search Page was not displayed').to.be.true;
    });

    this.When(/^I enter "([^"]*)" into the search bar$/, function (searchTerm) {
        searchPage.enterSearch(searchTerm)
    });

    this.When(/^click on the search-button$/, function () {
        searchPage.searchButton.click()
    });

    this.Then(/^the search field should contain "([^"]*)"$/, function (searchTerm) {
        let value = searchPage.searchField.getValue();
        expect(value).to.equal(searchTerm);
    });

    this.Then(/^the search field should not be displayed within the site header$/, function () {
        let searchField = searchPage.searchBar;
        expect(searchField.isVisible(), 'Site-wide search bar was displayed on Search page').to.be.false;
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
            document.querySelector('rhdp-search-query').results = {
                hits: {
                    hits: [{
                        fields: {sys_type: ['stackoverflow_thread'], sys_content_plaintext: ['Test Title']},
                        highlight: {sys_title: ['Test Title 1']}
                    }],
                    total: 1
                }
            }
        });
        browser.pause(1000)
    });

    this.Then(/^I (should|should not) see a Load More link$/, function (negate) {
        searchPage.waitForResultsLoaded();
        if (negate === 'should') {
            expect(searchPage.loadMoreButton().isVisible(), 'Load More button was not visible').to.be.true;
        } else {
            expect(searchPage.loadMoreButton().isVisible(), 'Load More button was visible').to.be.false;
        }
    });

    this.Then(/^I should see a message "([^"]*)"$/, function (resultMsg) {
        let resultMessage = searchPage.resultCount();
        expect(resultMessage, `${resultMsg} was not displayed`).to.equal(resultMsg)
    });

    this.Then(/^the results should contain "([^"]*)"$/, function (searchTerm) {
        searchPage.waitForResultsLoaded();
        sR = searchPage.searchResults();
        let result;
        for (let i = 1; i < sR.length; i++) {
            title = searchPage.searchResultTitle(i);
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
        searchPage.waitForResultsLoaded();
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


    this.Then(/^search results are displayed$/, function () {
        searchPage.waitForResultsLoaded()
    });

    this.Given(/^I have searched for "([^"]*)"$/, function (searchTerm) {
        homePage.open();
        homePage.searchFor(searchTerm);
        searchPage.waitForResultsLoaded();
        resultCount = searchPage.resultCount();
    });

    this.When(/^I filter results by "([^"]*)" from "([^"]*)"$/, function (filterOption, filterType) {
        searchPage.chooseFilter(filterType, filterOption);
    });

    this.Then(/^I should see a tag for "([^"]*)"$/, function (filterOption) {
        let activeFilters = searchPage.activeFilters();
        expect(activeFilters.getText(), `Result did not include a tag for ${filterOption}`).to.include(filterOption);
    });

    this.Then(/^the results should be updated and contain a "([^"]*)" label$/, function (filter) {
        searchPage.waitForUpdatedResults(resultCount);
        let label = searchPage.resultInfo(1).getText();
        if (filter === 'Get Started') {
            expect(label.toLowerCase()).to.include('demo');
        } else {
            expect(label.toLowerCase()).to.include(filter.toLowerCase())
        }
    });

    this.Then(/^the results should be updated and contain "([^"]*)"$/, function (search) {
        searchPage.waitForUpdatedResults(resultCount);
        let sR = searchPage.searchResults();
        let result;
        for (let i = 1; i < sR.length; i++) {
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


    this.Then(/^I (should|should not) see an alert$/, function (negate) {
        let alert = searchPage.hasAlert();
        if (negate === 'should') {
            expect(alert, 'Alert was not visible').to.be.true;
        } else {
            expect(alert, 'Warning! Alert was visible').to.be.false
        }
    });

    this.Given(/^I navigate directly to search page with "(.*)"$/, function (searchUrl) {
        searchPage.open(searchUrl);
        expect(searchPage.isOnSearchPage(), 'Search page was not displayed').to.be.true
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
    });

    this.Then(/^I select the OneBox Title$/, function () {
        searchPage.oneBox.click();
    });

    this.Then(/^I select the View Downloads button$/, function () {
        searchPage.oneBoxDownLoadBtn.click();
    });

    this.Then(/^I should see the "(.*)" (Download|Overview|Hello-world|Docs-and-apis|Help) page$/, function (productTitle, pageType) {
        expect(browser.getTitle(), `${pageType} page for ${productTitle} was not displayed`).to.includes(`${productTitle} ${pageType}`)
    });

    this.Then(/^I select the oneBox "(.*)" link$/, function (link) {
        searchPage.clickOneBoxLink(link)
    });

    this.Then(/^I should see a message that no search term was entered$/, function () {
       let noSearchText = searchPage.emptySearch.getText();
        expect(noSearchText).to.includes('Well, this is awkward. No search term was entered yet')
    });

};
