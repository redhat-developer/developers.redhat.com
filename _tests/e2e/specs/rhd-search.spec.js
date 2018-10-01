import {Home} from './support/pages/website/Home.page';
import {Search} from './support/pages/website/Search.page';
import {NavigationBar} from './support/pages/website/NavigationBar.section';

describe('Search Page', function () {
    this.retries(2);
    let siteNav, home, search;

    beforeEach(() => {
        siteNav = new NavigationBar();
        home = new Home();
        search = new Search();
    });

    it('@sanity : should allow users to search for content via site-nav search field', function () {
        home.open('/');
        siteNav.searchFor('hello world');
        expect(search.results.all().value.length).to.be.gt(0);
    });

    it("should default result sorting should be 'Relevance'", function () {
        search.open();
        let resultSort = search.resultSort.get();
        expect(resultSort).to.equal('relevance');
    });

    it("should sort results by 'Most Recent'", function () {
        home.open('/');
        siteNav.searchFor('cdk');
        search.resultSort.sort('Most Recent');
        let sR = search.results.all();
        let firstResult = search.results.dateFor(1);
        for (let i = 1; i < sR.value.length; i++) {
            let remainingResults = search.results.dateFor(i);
            expect(new Date(remainingResults).getTime()).to.be.lte(new Date(firstResult).getTime())
        }
    });

    it('should filter results by Content Type', function () {
        home.open('/');
        siteNav.searchFor('java');
        search
            .filter.choose('Content Type', 'APIs and Docs');
        search
            .results.await();
        expect(search.filter.active().getText()).to.include('APIs and Docs');
    });

    it('should filter results by Product', function () {
        home.open('/');
        siteNav.searchFor('java');
        search
            .filter.choose('Product', 'Red Hat Enterprise Linux');
        search
            .results.await();
        expect(search.filter.active().getText()).to.include('Red Hat Enterprise Linux');
    });

    it('should filter results by Topic', function () {
        home.open('/');
        siteNav.searchFor('java');
        search
            .filter.choose('Topic', 'Containers');
        search
            .results.await();
        expect(search.filter.active().getText()).to.include('Containers');
    });

    it('should clear search filters', function () {
        home.open('/');
        siteNav.searchFor('java');
        search
            .filter.choose('Topic', 'Containers');
        search
            .results.await();
        search
            .filter.clear();
        search
            .results.await();
        expect(search.filter.active().isVisible()).to.be.false
    });

    it('should not alert when user searches via site-nav search field containing malicious scripts', function () {
        home.open('/');
        siteNav.searchFor('%3Cscript%3Ealert');
        expect(search.hasAlert()).to.be.false
    });

    it('should display a product associated with a OneBox at the top of the results', function () {
        home.open('/');
        siteNav.searchFor('cdk');
        search.results.awaitResultsFor('cdk');
        expect(search.oneBox.title()).to.eq('Red Hat Container Development Kit');
    });
});
