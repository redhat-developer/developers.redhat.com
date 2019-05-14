import home from './support/pages/website/Home.page';
import search from './support/pages/website/Search.page';
import navigationBar from './support/pages/website/NavigationBar.section';
import searchResults from './support/pages/website/components/search/SearchResults';
import searchResultSort from './support/pages/website/components/search/SearchResultSort';
import searchFilter from './support/pages/website/components/search/SearchFilter';
import searchOneBox from './support/pages/website/components/search/SearchOneBox';

describe('Search Page', function() {
    // eslint-disable-next-line no-invalid-this
    this.retries(2);

    it('should allow users to search for content via site-nav search field', () => {
        home.open('/');
        navigationBar.searchFor('hello world');
        expect(searchResults.all().length).to.be.gt(0);
    });

    it("should default result sorting should be 'Relevance'", () => {
        search.open();
        const resultSort = searchResultSort.get();
        expect(resultSort).to.equal('relevance');
    });

    it("should sort results by 'Most Recent'", () => {
        home.open('/');
        navigationBar.searchFor('cdk');
        searchResultSort.select('Most Recent');
        const sR = searchResults.all();
        const firstResult = searchResults.dateFor(1);
        for (let i = 1; i < sR.length; i++) {
            const remainingResults = searchResults.dateFor(i);
            if (new Date(remainingResults).getTime()) {
                expect(new Date(remainingResults).getTime()).to.be.lte(new Date(firstResult).getTime());
            }
        }
    });

    it('should filter results by Content Type', () => {
        home.open('/');
        navigationBar.searchFor('java');
        searchFilter.choose('Content Type', 'APIs and Docs');
        searchResults.await();
        expect(searchFilter.active().getText()).to.include('APIs and Docs');
    });

    it('should filter results by Product', () => {
        home.open('/');
        navigationBar.searchFor('java');
        searchFilter.choose('Product', 'Red Hat Enterprise Linux');
        searchResults.await();
        expect(searchFilter.active().getText()).to.include('Red Hat Enterprise Linux');
    });

    it('should filter results by Topic', () => {
        home.open('/');
        navigationBar.searchFor('java');
        searchFilter.choose('Topic', 'Containers');
        searchResults.await();
        expect(searchFilter.active().getText()).to.include('Containers');
    });

    it('should clear search filters', () => {
        home.open('/');
        navigationBar.searchFor('java');
        searchFilter.choose('Topic', 'Containers');
        searchResults.await();
        searchFilter.clear();
        searchResults.await();
        expect(searchFilter.active().isDisplayed()).to.be.false;
    });

    it('should display a product associated with a OneBox at the top of the results', () => {
        home.open('/');
        navigationBar.searchFor('cdk');
        searchResults.awaitResultsFor('cdk');
        expect(searchOneBox.title()).to.eq('Red Hat Container Development Kit');
    });
});
