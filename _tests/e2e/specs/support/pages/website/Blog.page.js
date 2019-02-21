import {Page} from "../Page";

export class Blog extends Page {
    constructor() {
        super({
            pageTitle: 'Red Hat Developer Blog'
        });
    }

    open() {
        this.visit('https://developers.redhat.com/blog');
        return this.waitForPageTitle(this.pageTitle);
    }
}
