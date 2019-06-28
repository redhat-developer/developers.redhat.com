import Home from '../support/pages/website/Home.page';
import Search from '../support/pages/website/Search.page';
import NavigationBar from '../support/pages/website/NavigationBar.section';
import SearchResults from '../support/pages/website/components/search/SearchResults';
import SearchResultSort from '../support/pages/website/components/search/SearchResultSort';
import SearchFilter from '../support/pages/website/components/search/SearchFilter';
import SearchOneBox from '../support/pages/website/components/search/SearchOneBox';

import Driver from '../support/utils/Driver.Extension';

describe('Search Page', function() {
    // eslint-disable-next-line no-invalid-this
    this.retries(2);

    it('should allow users to search for content via site-nav search field', () => {
        Home.open('/');
        NavigationBar.searchFor('hello world');
        SearchResults.await();
        expect(SearchResults.all().length).to.be.gt(0);
    });

    it("should default result sorting should be 'Relevance'", () => {
        Search.open();
        const resultSort = SearchResultSort.get();
        expect(resultSort).to.equal('relevance');
    });

    it("should sort results by 'Most Recent'", () => {
        Home.open('/');
        NavigationBar.searchFor('cdk');
        SearchResults.await();
        SearchResultSort.select('Most Recent');
        SearchResults.await();
        const sR = SearchResults.all();
        const firstResult = SearchResults.dateFor(1);
        for (let i = 1; i < sR.length; i++) {
            const remainingResults = SearchResults.dateFor(i);
            if (new Date(remainingResults).getTime()) {
                expect(new Date(remainingResults).getTime()).to.be.lte(new Date(firstResult).getTime());
            }
        }
    });

    it('should filter results by Content Type', () => {
        Home.open('/');
        NavigationBar.searchFor('java');
        SearchResults.await();
        SearchFilter.choose('Content Type', 'APIs and Docs');
        SearchResults.await();
        expect(SearchFilter.active().getText()).to.include('APIs and Docs');
    });

    it('should filter results by Product', () => {
        Home.open('/');
        NavigationBar.searchFor('java');
        SearchResults.await();
        SearchFilter.choose('Product', 'Red Hat Enterprise Linux');
        SearchResults.await();
        expect(SearchFilter.active().getText()).to.include('Red Hat Enterprise Linux');
    });

    it('should filter results by Topic', () => {
        Home.open('/');
        NavigationBar.searchFor('java');
        SearchResults.await();
        SearchFilter.choose('Topic', 'Containers');
        SearchResults.await();
        expect(SearchFilter.active().getText()).to.include('Containers');
    });

    it('should clear search filters', () => {
        Home.open('/');
        NavigationBar.searchFor('java');
        SearchResults.await();
        SearchFilter.choose('Topic', 'Containers');
        SearchResults.await();
        SearchFilter.clear();
        SearchResults.await();
        expect(SearchFilter.active().isDisplayed()).to.be.false;
    });

    it('should display a product associated with a OneBox at the top of the results', () => {
        Home.open('/');
        NavigationBar.searchFor('cdk');
        SearchResults.awaitResultsFor('cdk');
        expect(SearchOneBox.title()).to.eq('Red Hat Container Development Kit');
    });
});
