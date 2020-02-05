import Page from '../Page';
import Driver from '../../utils/Driver.Extension';

class Search extends Page {
    get searchPage() {
        return $('.searchpage-middle');
    }

    open() {
        super.open('/search/');
        return Driver.awaitIsDisplayed(this.searchPage);
    }
}

export default new Search;
