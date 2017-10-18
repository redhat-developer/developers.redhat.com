const mixin = require("xmultiple");
const LoginPage = require('./Login.page');
let BasePage = require("./Base.page");

class ForgotPassword extends mixin(LoginPage, BasePage) {

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
