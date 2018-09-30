import {Page} from '../../../Page';
import {SearchResults} from './SearchResults';

export class SearchBox extends Page {
    constructor() {
        super();

        this.addSelectors(
            {
                searchField: '#query'
            });

        this.searchResults = new SearchResults();
    }

    enterSearch(searchTerm) {
        return this.type(searchTerm, this.getSelector('searchBar'));
    }

    searchFor(searchTerm) {
        this.enterSearch(searchTerm);
        return this.triggerSearch();
    }

    triggerSearch() {
        return this.key("\uE007");
    }
}
