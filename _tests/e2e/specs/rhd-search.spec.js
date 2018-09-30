import {Home} from './support/pages/website/Home.page';
import {Search} from './support/pages/website/Search.page';
import {NavigationBar} from './support/pages/website/NavigationBar.section';

describe('Search Page', function () {
    let siteNav, home, search;

    beforeEach(() => {
        siteNav = new NavigationBar();
        home = new Home();
        search = new Search();
    }, 2);

    it('@sanity : should allow users to search for content via site-nav search field', function () {
        home.open('/');
        siteNav.searchFor('hello world');
        expect(search.searchResults.getAllResults().value.length).to.be.gt(0);
    }, 2);

    it("should default result sorting should be 'Relevance'", function () {
        search.open();
        let resultSort = search.searchResultSort.getResultSort();
        expect(resultSort).to.equal('relevance');
    }, 2);

    it("should sort results by 'Most Recent'", function () {
        home.open('/');
        siteNav.searchFor('cdk');
        search.searchResultSort.selectSortBy('Most Recent');
        let sR = search.searchResults.getAllResults();
        let firstResult = search.searchResults.getResultDate(1);
        for (let i = 1; i < sR.value.length; i++) {
            let remainingResults = search.searchResults.getResultDate(i);
            expect(new Date(remainingResults).getTime()).to.be.lte(new Date(firstResult).getTime())
        }
    }, 2);

    it('should filter results by Content Type', function () {
        home.open('/');
        siteNav.searchFor('java');
        search
            .searchFilter.chooseFilter('Content Type', 'APIs and Docs');
        search
            .searchResults.awaitLoadingSpinner();
        expect(search.searchFilter.activeFilter().getText()).to.include('APIs and Docs');
    }, 2);

    it('should filter results by Product', function () {
        home.open('/');
        siteNav.searchFor('java');
        search
            .searchFilter.chooseFilter('Product', 'Red Hat Enterprise Linux');
        search
            .searchResults.awaitLoadingSpinner();
        expect(search.searchFilter.activeFilter().getText()).to.include('Red Hat Enterprise Linux');
    }, 2);

    it('should filter results by Topic', function () {
        home.open('/');
        siteNav.searchFor('java');
        search
            .searchFilter.chooseFilter('Topic', 'Containers');
        search
            .searchResults.awaitLoadingSpinner();
        expect(search.searchFilter.activeFilter().getText()).to.include('Containers');
    }, 2);

    it('should clear search filters', function () {
        home.open('/');
        siteNav.searchFor('java');
        search
            .searchFilter.chooseFilter('Topic', 'Containers');
        search
            .searchResults.awaitLoadingSpinner();
        search
            .searchFilter.clearSearchFilters();
        search
            .searchResults.awaitLoadingSpinner();
        expect(search.searchFilter.activeFilter().isVisible()).to.be.false
    }, 2);

    it('should not alert when user searches via site-nav search field containing malicious scripts', function () {
        home.open('/');
        siteNav.searchFor('%3Cscript%3Ealert');
        expect(search.hasAlert()).to.be.false
    }, 2);

    it('should display a product associated with a OneBox at the top of the results', function () {
        home.open('/');
        siteNav.searchFor('cdk');
        search.searchResults.awaitResultsFor('cdk');
        expect(search.searchOneBox.getOneBoxTitle()).to.eq('Red Hat Container Development Kit');
    }, 2);
});
