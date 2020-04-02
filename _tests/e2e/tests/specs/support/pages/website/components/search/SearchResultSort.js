import Page from '../../../Page';
import SearchResults from './SearchResults';
import Driver from '../../../../utils/Driver.Extension';

class SearchResultSort extends Page {
    get resultSort() {
        return $('//rhdp-search-sort-page/div/select');
    }

    get() {
        return Driver.getValue(this.resultSort);
    }

    select(by) {
        Driver.selectByValue(this.resultSort, by.replace(/\s+/g, '-').toLowerCase());
        // wait for search to trigger
        return SearchResults.await();
    }
}
export default new SearchResultSort;
