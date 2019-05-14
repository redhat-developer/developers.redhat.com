import navigationBar from './support/pages/NavigationBar.section';
import home from './support/pages/Home.page';
import search from './support/pages/Search.page';

describe('Search Page', function() {
    // eslint-disable-next-line no-invalid-this
    this.retries(2);

    it('should allow users to search for content via site-nav search field', () => {
        home.open('/');
        navigationBar.searchFor('hello world');
        expect(search.results.all().length).to.be.gt(0);
    });

    it("should default result sorting should be 'Relevance'", () => {
        search.open();
        expect(search.resultsSort.get()).to.equal('relevance');
    });

    it("should sort results by 'Most Recent'", () => {
        home.open('/');
        navigationBar.searchFor('cdk');
        search.resultsSort.select('Most Recent');
        const sR = search.results.all();
        const firstResult = search.results.dateFor(1);
        for (let i = 1; i < sR.length; i++) {
            const remainingResults = search.results.dateFor(i);
            if (new Date(remainingResults).getTime()) {
                expect(new Date(remainingResults).getTime()).to.be.lte(new Date(firstResult).getTime());
            }
        }
    });

    it('should filter results by Content Type', () => {
        home.open('/');
        navigationBar.searchFor('java');
        search.filter.choose('Content Type', 'APIs and Docs');
        search.results.await();
        expect(search.filter.active().getText()).to.include('APIs and Docs');
    });

    it('should filter results by Product', () => {
        home.open('/');
        navigationBar.searchFor('java');
        search.filter.choose('Product', 'Red Hat Enterprise Linux');
        search.results.await();
        expect(search.filter.active().getText()).to.include('Red Hat Enterprise Linux');
    });

    it('should filter results by Topic', () => {
        home.open('/');
        navigationBar.searchFor('java');
        search.filter.choose('Topic', 'Containers');
        search.results.await();
        expect(search.filter.active().getText()).to.include('Containers');
    });

    it('should clear search filters', () => {
        home.open('/');
        navigationBar.searchFor('java');
        search.filter.choose('Topic', 'Containers');
        search.results.await();
        search.filter.clear();
        search.results.await();
        expect(search.filter.active().isDisplayed()).to.be.false;
    });

    it('should display a product associated with a OneBox at the top of the results', () => {
        home.open('/');
        navigationBar.searchFor('cdk');
        search.results.awaitResultsFor('cdk');
        expect(search.oneBox.title()).to.eq('Red Hat Container Development Kit');
    });
});
