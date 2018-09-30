import {Page} from "../Page";

export class GeneralErrorPage extends Page {
    constructor() {
        super({
            path: '/general-error/',
            pageTitle: 'Page Does Not Exist | Red Hat Developer'
        });
    }
}
