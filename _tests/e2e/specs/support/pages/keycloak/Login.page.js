import {Base} from "../Base.page"

export class Login extends Base {

    constructor() {
        super({
            path: '/login',
            pageTitle: 'Log In | Red Hat Developer Program',
        });

        this.addSelectors({
            loginPage: '.kc-loginpage',
            usernameField: '#username',
            passwordField: '#password',
            loginButton: '#kc-login',
            gitHubBtn: '#social-github',
            forgotPasswordLink: '//*[@id="kc-form-login"]//a[contains(text(), "Forgot your password?")]',
            registerLink: '//a[contains(text(), "Create one now.")]',
            kcFeedback: '#kc-feedback',
        });
    }

    awaitLogin() {
        return this.awaitExists(this.getSelector('loginPage'), 30000)
    }

    isDisplayed() {
        this.waitForPageTitle('Log In', 30000);
        return this.displayed(this.getSelector('usernameField'))
    }

    feedback() {
        return this.textOf(this.getSelector('kcFeedback'), 30000)
    }

    with(user) {
        this.type(user['email'], this.getSelector('usernameField'));
        this.type(user['password'], this.getSelector('passwordField'));
        this.clickOn(this.getSelector('loginButton'));
        return this.awaitIsLoggedIn(user);
    }
}
