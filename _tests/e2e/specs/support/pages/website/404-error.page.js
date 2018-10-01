import {Page} from "../Page";

export class Error404Page extends Page {
    constructor() {
        super({
            path: '/404-error/',
            pageTitle: 'Page Not Found | Red Hat Developer'
        });
    }
}
