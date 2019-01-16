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
            nextBtn: '#login-show-step2',
            passwordField: '#password',
            loginButton: '#kc-login',
            step2: '#step2'
        });
    }

    awaitLogin() {
        return this.awaitExists(this.getSelector('loginPage'), 30000) && this.waitForPageTitle('Log In', 30000);
    }

    awaitStepTwo() {
        return this.awaitIsVisible(this.getSelector('step2'), 30000);
    }

    isDisplayed() {
        this.awaitLogin();
        return this.displayed(this.getSelector('usernameField'));
    }

    with(user) {
        this.awaitLogin();
        this.type(user['email'], this.getSelector('usernameField'));
        this.click(this.getSelector('nextBtn'));
        this.awaitStepTwo();
        this.type(user['password'], this.getSelector('passwordField'));
        this.click(this.getSelector('loginButton'));
        return this.awaitIsLoggedIn(user)
    }
}
