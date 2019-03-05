import {Page} from "../Page";

export class Home extends Page {
    constructor() {
        super({
            path: '/',
        });

        this.addSelectors({
            drupalAdminToolBar: '#toolbar-bar',
        });
    }

    isAdminLoggedIn() {
        return this.displayed(this.getSelector('drupalAdminToolBar'))
    }

}
