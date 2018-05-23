const request = require("sync-request");
const HomePage = require('./support/pages/website/Home.page');
const SearchPage = require('./support/pages/website/Search.page');
const SiteNav = require('./support/pages/website/NavigationBar.section');

const homePage = new HomePage();
const searchPage = new SearchPage();
const siteNav = new SiteNav();

describe('Search Page', function () {

    tags('sanity').it('should allow users to search for content via site-nav search field', function () {
        this.retries(2);
        homePage
            .open('/');
        siteNav
            .enterSearch('Hello world');
        siteNav
            .triggerSearch();
        searchPage
            .awaitSearchPage();
        expect(searchPage.searchResults.getAllResults().value.length,
            'Search page was not displayed').to.be.gt(0)
    });

    it("Default result sorting should be 'Relevance'", function () {
        this.retries(2);
        searchPage
            .open();
        let resultSort = searchPage.searchResultSort.getResultSort();
        expect(resultSort,
            `Relevance was not selected by default, was ${resultSort}`).to.equal('relevance');
    });

    it("should sort results by 'Most Recent'", function () {
        this.retries(2);
        homePage
            .open('/');
        siteNav
            .searchFor('cdk');
        searchPage
            .awaitSearchPage();
        searchPage
            .searchResultSort.selectSortBy('Most Recent');
        let sR = searchPage.searchResults.getAllResults();
        let firstResult = searchPage.searchResults.getResultDate(1);
        for (let i = 1; i < sR.value.length; i++) {
            let remainingResults = searchPage.searchResults.getResultDate(i);
            expect(new Date(remainingResults).getTime(),
                'Results for cdk were not ordered by most-recent').to.be.lte(new Date(firstResult).getTime())
        }
    });

    it('should filter results by Content Type', function () {
        this.retries(2);
        homePage
            .open('/');
        siteNav
            .searchFor('java');
        searchPage
            .awaitSearchPage();
        searchPage
            .searchFilter.chooseFilter('Content Type', 'APIs and Docs');
        searchPage
            .searchResults.awaitLoadingSpinner();
        expect(searchPage.searchFilter.activeFilter().getText(),
            'Results did not include a tag for APIs and Docs').to.include('APIs and Docs');
    });

    it('should filter results by Product', function () {
        this.retries(2);
        homePage
            .open('/');
        siteNav
            .searchFor('java');
        searchPage
            .awaitSearchPage();
        searchPage
            .searchFilter.chooseFilter('Product', 'Red Hat Enterprise Linux');
        searchPage
            .searchResults.awaitLoadingSpinner();
        expect(searchPage.searchFilter.activeFilter().getText(),
            'Results did not include a tag for Red Hat Enterprise Linux').to.include('Red Hat Enterprise Linux');
    });

    it('should filter results by Topic', function () {
        this.retries(2);
        homePage
            .open('/');
        siteNav
            .searchFor('java');
        searchPage
            .awaitSearchPage();
        searchPage
            .searchFilter.chooseFilter('Topic', 'Containers');
        searchPage
            .searchResults.awaitLoadingSpinner();
        expect(searchPage.searchFilter.activeFilter().getText(),
            'Results did not include a tag for Containers').to.include('Containers');
    });

    it('should clear search filters', function () {
        this.retries(2);
        homePage
            .open('/');
        siteNav
            .searchFor('java');
        searchPage
            .awaitSearchPage();
        searchPage
            .searchFilter.chooseFilter('Topic', 'Containers');
        searchPage
            .searchResults.awaitLoadingSpinner();
        searchPage
            .searchFilter.clearSearchFilters();
        searchPage
            .searchResults.awaitLoadingSpinner();
        expect(searchPage.searchFilter.activeFilter().isVisible(),
            'Filters were not cleared').to.be.false
    });

    it('should not alert when user searches via site-nav search field containing malicious scripts', function () {
        this.retries(2);
        homePage
            .open('/');
        siteNav
            .searchFor('%3Cscript%3Ealert');
        searchPage
            .awaitSearchPage();
        expect(searchPage.hasAlert(),
            'Warning! Alert was visible').to.be.false
    });

    it('should display a product associated with a OneBox at the top of the results', function () {
        this.retries(2);
        homePage
            .open('/');
        siteNav
            .searchFor('cdk');
        searchPage
            .searchResults.awaitResultsFor('cdk');
        expect(searchPage.searchOneBox.getOneBoxTitle(),
            'OneBox was not displayed for cdk').to.eq('Red Hat Container Development Kit');
    });

    afterEach(function () {
        if (this.currentTest.state === 'failed') {
            let request_header = {"Content-Type": "application/json"};
            let response = request('GET', 'https://dcp2.jboss.org/v2/rest/search/', {headers: request_header});
            global.logger.warn(`DCP Status was: ${response.statusCode}`)
        }
    });

});
