const mixin = require("xmultiple");
const BasePage = require("./Base.page");
const NavigationBar = require('../sections/navigationBar.section');
const LoginPage = require('./Login.page');

class ForgotPassword extends mixin(LoginPage, BasePage, NavigationBar) {

    get forgotPasswordForm() {
        return $('#kc-reset-password-form')
    }

    get submitBtn() {
        return $('#kc-form-buttons .button')
    }

    resetPassword(email) {
        this.usernameField.setValue(email);
        this.submitBtn.click();
    }

}

module.exports = ForgotPassword;
