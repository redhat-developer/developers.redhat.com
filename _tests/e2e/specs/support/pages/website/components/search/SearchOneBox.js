import {Page} from '../../../Page';

export class SearchOneBox extends Page {
    constructor() {
        super();

        this.addSelectors(
            {
                oneBoxTitle: '//rhdp-search-onebox//h4/a'
            });
    }

    title() {
        return this.textOf(this.getSelector('oneBoxTitle'));
    }
}
