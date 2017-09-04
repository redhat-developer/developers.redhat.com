let mixin = require("xmultiple");
let BasePage = require("./Base.page");

class RegisterPage extends mixin(BasePage) {
    open() {
        super.open('register');
        this.kcRegisterForm.waitForVisible
    }

    get kcRegisterForm() {
        return $('#kc-register-form')
    }

    get emailError() {
        return $('#email-error')
    }

    get firstName() {
        return $('#firstName')
    }

    get lastName() {
        return $('#lastName')
    }

    get email() {
        return $('#email')
    }

    get password() {
        return $('#password')
    }

    get company() {
        return $('#user.attributes.company')
    }

    get phoneNumber() {
        return $('#user.attributes.phoneNumber')
    }

    country() {
        return $('#user.attributes.country')
    }

    addressLineOne() {
        return $('#user.attributes.addressLine1')
    }

    city() {
        return $('#user.attributes.addressCity')
    }

    state() {
        return $('#user.attributes.addressState')
    }

    postalCode() {
        return $('#user.attributes.addressPostalCode')
    }

    get tacBtn() {
        return $('.fulluser-ttac')
    }

    get tacCheckall() {
        return $('#tac-checkall')
    }

    get createAccountBtn() {
        return $('.button')
    }

    simpleRegister(user) {
        this.email.setValue(user['email']);
        this.password.setValue(user['password']);
        this.tacBtn.click();
        this.createAccountBtn.click()
    }

    extendedRegister(user) {
        this.firstName.setValue(user['firstName']);
        this.lastName.setValue(user['lastName']);
        this.email.setValue(user['email']);
        this.password.setValue(user['password']);
        this.company.setValue(user['company']);
        this.phoneNumber.setValue(user['phoneNumber']);
        this.country.selectByVisibleText(user['country']);
        this.addressLineOne.setValue(user['addressLineOne']);
        this.city.setValue(user['city']);
        if (user['state'] !== null) {
            this.state().selectByVisibleText(user['state']);
        }
        this.postalCode().setValue(user['postalCode']);
        this.tacCheckall.click()
    }
}

module.exports = RegisterPage;