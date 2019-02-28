import {Page} from "./Page"

export class Drupal extends Page {

    constructor() {
        super({
            path: '/user/login'
        });

        this.addSelectors({
            usernameField: '#edit-name',
            passwordField: '#edit-pass',
            loginButton: '#edit-submit',
            legacyLoginButton: '#drupalUserLoginToggleVisibility'
        });
    }

    loginWith(user, password) {
        this.click(this.getSelector("legacyLoginButton"));
        this.type(user, this.getSelector('usernameField'));
        this.type(password, this.getSelector('passwordField'));
        this.click(this.getSelector('loginButton'));
    }
}
