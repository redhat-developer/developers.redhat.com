import {Base} from "../Base.page";

export class Blog extends Base {
    constructor() {
        super({
            pageTitle: 'RHD Blog - Insights and news on Red Hat developer tools, platforms and more'
        });
    }

    open() {
        this.visit('https://developers.redhat.com/blog');
        return this.waitForPageTitle(this.pageTitle);
    }
}
