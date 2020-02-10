import Page from '../../../Page';
import Driver from '../../../../utils/Driver.Extension';

class SearchBox extends Page {
    get searchField() {
        return $('#query');
    }

    enterSearch(searchTerm) {
        return Driver.type(searchTerm, this.searchField);
    }

    searchFor(searchTerm) {
        this.enterSearch(searchTerm);
        return this.triggerSearch();
    }

    triggerSearch() {
        return Driver.key("\uE007");
    }
}

export default new SearchBox;
