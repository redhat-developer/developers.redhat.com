import {Page} from "../Page";

export class Home extends Page {
    constructor() {
        super({
            path: '/',
        });

        this.addSelectors({
            toolbarItemUser: '#toolbar-item-user',
        });
    }

    loggedInUser() {
        return this.textOf(this.getSelector('toolbarItemUser'))
    }

}
