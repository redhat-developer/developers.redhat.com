const BasePage = require('../Base.page');

class LoginPage extends BasePage {

    constructor() {
        super({
            path: '/login',
            pageTitle: 'Log In | Red Hat Developer Program',
            selector: '.kc-loginpage'
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

    awaitLoginPage() {
        return this.awaitExists(this.getSelector('loginPage'), 30000)
    }

    isOnLoginPage() {
        this.waitForPageTitle('Log In', 30000);
        let el = this.element(this.getSelector('loginPage'));
        return this.isDisplayed(el)
    }

    feedback() {
        return this.textOf(this.getSelector('kcFeedback'), 30000)
    }

    login(user) {
        this.type(user['email'], this.getSelector('usernameField'));
        this.type(user['password'], this.getSelector('passwordField'));
        return this.clickOn(this.getSelector('loginButton'))
    }

    clickCreateAccountLink() {
        return this.clickOn(this.getSelector('registerLink'))
    }

    clickGithubBtn() {
        return this.clickOn(this.getSelector('gitHubBtn'))
    }

    clickForgotPasswordLink() {
        return this.clickOn(this.getSelector('forgotPasswordLink'))
    }
}

module.exports = LoginPage;
