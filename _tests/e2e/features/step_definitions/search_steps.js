const SearchPage = require("../../support/pages/search.page");
const HomePage = require("../../support/pages/home.page");
const searchPage = new SearchPage;
const homePage = new HomePage;

const searchSteps = function () {

    let resultCount;

    this.Then(/^the search page is displayed$/, function () {
        browser.getTitle().should.include('Search Results');
    });

    this.When(/^I enter "([^"]*)" into the search bar$/, function (searchTerm) {
        searchPage.enterSearch(searchTerm)
    });

    this.When(/^click on the search-button$/, function () {
        searchPage.searchButton.click()
    });

    this.Then(/^the search field should contain "([^"]*)"$/, function (searchTerm) {
        value = searchPage.searchField.getValue();
        value.should.equal(searchTerm)
    });

    this.Then(/^the search field should not be displayed within the site header$/, function () {
        let searchField = searchPage.searchBar;
        expect(searchField.isVisible(), 'Search bar exists').to.be.false;
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
                    remainingResults = searchPage.searchResultDate(i);
                    assert(new Date(remainingResults.getText()).getTime() <= new Date(firstResult.getText()).getTime(),
                        `Dates were not in most-recent order. Expected date '${new Date(remainingResults.getText())}' to be equal to or after '${new Date(firstResult.getText())}'`);
                }
            }
        }
    );

    this.When(/^I sort results by "([^"]*)"$/, function (resultSortSelect) {
        let resultSort = searchPage.resultSort;
        resultSort.selectByValue(resultSortSelect.replace(/\s+/g, '-').toLowerCase());
        // Give it a little time for the search to trigger until we have a loading spinner
        browser.pause(1500)
    });

    this.When(/^there are 10 or less results available$/, function () {
        browser.execute(function () {
            document.querySelector('rhdp-search-query').results = {
                hits: {
                    hits: [{
                        fields: {sys_type: ['stackoverflow_thread'], sys_content_plaintext: ['Cool Text']},
                        highlight: {sys_title: ['Cool Title 1']}
                    }], total: 1
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

    this.Then(/^I should see a message "([^"]*)"$/, function (arg) {
        let resultMessage = searchPage.resultCount();
        assert(resultMessage.getText() === arg,
            `${arg} was not displayed`)
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
        assert(result === true, `None of the top 10 results included ${searchTerm}`)
    });

    this.Then(/^the related topic page for "([^"]*)" should be the first result$/, function (topicUrl) {
        searchPage.waitForResultsLoaded();
        title = searchPage.searchResultTitle(1);
        expect(title.getAttribute('href')).to.include("/topics/" + topicUrl)
    });

    this.Then(/^first result should be the RHD About Us page$/, function () {
        searchPage.waitForResultsLoaded();
        title = searchPage.searchResultTitle(1);
        expect(title.getText()).to.include('About Us');
        expect(title.getAttribute('href')).to.include("/about")
    });

    this.Then(/^the "([^"]*)" product overview page should be the first result$/, function (product) {
        searchPage.waitForResultsLoaded();
        title = searchPage.searchResultTitle(1);
        expect(title.getAttribute('href')).to.include(`/products/${product}/overview`)
    });


    this.Then(/^search results are displayed$/, function () {
        searchPage.waitForResultsLoaded()
    });

    this.Given(/^I have searched for "([^"]*)"$/, function (searchTerm) {
        homePage.open();
        homePage.searchFor(searchTerm);
        searchPage.waitForResultsLoaded();
        resultCount = searchPage.resultCount().getText();
    });

    this.When(/^I filter results by "([^"]*)" from "([^"]*)"$/, function (filterOption, filterType) {
        searchPage.chooseFilter(filterType, filterOption);
    });

    this.Then(/^I should see a tag for "([^"]*)"$/, function (filterOption) {
        let activeFilters = searchPage.activeFilters();
        expect(activeFilters.getText()).to.include(filterOption);
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
        sR = searchPage.searchResults();
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
        assert(result === true, `None of the ${sR.length} results contained ${search}`)
    });


    this.Then(/^I (should|should not) see an alert$/, function (negate) {
        let alert = searchPage.hasAlert();
        if (negate === 'should') {
            assert(alert === true, 'Alert was not visible')
        } else {
            assert(alert === false, 'Warning! Alert was visible')
        }
    });

    this.Given(/^I navigate directly to search page with "(.*)"$/, function (searchUrl) {
        searchPage.open(searchUrl);
        browser.getTitle().should.include('Search Results');
    });
};

module.exports = searchSteps;
