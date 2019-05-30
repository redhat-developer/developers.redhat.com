import Page from '../../Page';
import Driver from '../../../../support/utils/Driver.Extension';

class SearchOneBox extends Page {
    get oneBoxTitle() {return $('//rhdp-search-onebox//h4/a');}

    title() {
        return Driver.textOf(this.oneBoxTitle);
    }
}
export default new SearchOneBox;
