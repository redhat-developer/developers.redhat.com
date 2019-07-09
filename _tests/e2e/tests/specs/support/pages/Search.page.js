import Page from './Page';
import {Box} from './components/search/Box';
import {Filter} from './components/search/Filter';
import {OneBox} from './components/search/OneBox';
import {Results} from './components/search/Results';
import {ResultsSort} from './components/search/ResultsSort';
import Driver from '../utils/Driver.Extension';

class Search extends Page {
    get searchPage() {return $('.searchpage-middle');}

    constructor() {
        super();
        this.box = new Box();
        this.oneBox = new OneBox();
        this.filter = new Filter();
        this.results = new Results();
        this.resultsSort = new ResultsSort();
    }

    open() {
        super.open('/search/');
        Driver.awaitIsDisplayed(this.searchPage);
    }
}

export default new Search;
