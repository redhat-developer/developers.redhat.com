import Page from '../../Page';
import Driver from '../../../utils/Driver.Extension';

export class ResultsSort extends Page {
    get resultSort() {return $('//rhdp-search-sort-page/p/select');}

    get() {
        return Driver.getValue(this.resultSort);
    }

    select(by) {
        Driver.selectByValue(this.resultSort, by.replace(/\s+/g, '-').toLowerCase());
    }
}
