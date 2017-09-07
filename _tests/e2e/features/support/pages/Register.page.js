let mixin = require("xmultiple");
let BasePage = require("./Base.page");
let NavigationBar = require('../sections/navigationBar.section');

class RegisterPage extends mixin(BasePage, NavigationBar) {
    open() {
        super.open('register');
        browser.waitForVisible('#kc-register-form')
    }

    get kcRegisterForm() {
        return $('#kc-register-form')
    }

    get emailError() {
        return $('#email-error')
    }

    get email() {
        return $('#email')
    }

    get password() {
        return $('#password')
    }

    get tacBtn() {
        return $('.fulluser-ttac')
    }

    get createAccountBtn() {
        return $('.button')
    }

    register(email, password) {
        this.email.setValue(email);
        this.password.setValue(password);
        this.tacBtn.click();
        this.createAccountBtn.click()
    }

}

module.exports = RegisterPage;