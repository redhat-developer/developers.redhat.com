import {Page} from "../Page"

export class Login extends Page {

    constructor() {
        super({
            path: '/user/login',
            pageTitle: 'Red Hat Developer | Log in',
        });

        this.addSelectors({
            usernameField: '#edit-name',
            passwordField: '#edit-pass',
            loginButton: '#edit-submit'
        });
    }

    isDisplayed() {
        this.awaitLogin();
        return this.displayed(this.getSelector('usernameField'));
    }

    with(user, password) {
        this.type(user, this.getSelector('usernameField'));
        this.type(password, this.getSelector('passwordField'));
        this.click(this.getSelector('loginButton'));
    }
}
