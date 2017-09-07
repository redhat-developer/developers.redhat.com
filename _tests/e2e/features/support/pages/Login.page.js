let mixin = require("xmultiple");
let BasePage = require("./Base.page");
let NavigationBar = require('../sections/navigationBar.section');

class LoginPage extends mixin(BasePage, NavigationBar) {

    open() {
        super.open('login');
        browser.waitForVisible('.kc-loginpage')
    }

    get usernameField() {
        return $('#username');
    }

    get passwordField() {
        return $('#password');
    }

    get loginBtn() {
        return $('#kc-login');
    }

    get socialGithubBtn() {
        return $('#social-github')
    }

    get forgotPasswordLink() {
        return $('*=Forgot Password?')
    }

    get kcFeedbackText() {
        return $('.kc-feedback-text');
    }

    login(email, password) {
        this.usernameField.setValue(email);
        this.passwordField.setValue(password);
        this.loginBtn.click()
    }
}

module.exports = LoginPage;