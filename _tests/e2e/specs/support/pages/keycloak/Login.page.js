import {Page} from "../Page"

export class Login extends Page {

    constructor() {
        super({
            path: '/login',
            pageTitle: 'Log In | Red Hat Developer Program',
        });

        this.addSelectors({
            loginPage: '.kc-loginpage',
            usernameField: '#username',
            passwordField: '#password',
            loginButton: '#kc-login'
        });
    }

    awaitLogin() {
        return this.awaitExists(this.getSelector('loginPage'), 30000) && this.waitForPageTitle('Log In', 30000);
    }

    isDisplayed() {
        this.awaitLogin();
        return this.displayed(this.getSelector('usernameField'));
    }

    with(user) {
        this.awaitLogin();
        this.type(user['email'], this.getSelector('usernameField'));
        this.type(user['password'], this.getSelector('passwordField'));
        this.click(this.getSelector('loginButton'));
        return this.awaitIsLoggedIn(user)
    }
}
