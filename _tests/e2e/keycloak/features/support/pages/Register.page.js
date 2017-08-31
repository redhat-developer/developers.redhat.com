let BasePage = require("./Base.page");

class RegisterPage extends BasePage {
    open() {
        super.open('register');
        this.kcRegisterForm.waitForVisible(9000)
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
        return $('//*[@id="user.attributes.company"]')
    }

    get phoneNumber() {
        return $('//*[@id="user.attributes.phoneNumber"]')
    }

    get addressLineOne() {
        return $('//*[@id="user.attributes.addressLine1"]')
    }

    get city() {
        return $('//*[@id="user.attributes.addressCity"]')
    }

    selectState(state) {
        browser.selectByValue('//*[@id="user.attributes.addressState"]', state);
        browser.pause(3000)
    }

    selectCountry(country) {
        browser.selectByValue('//*[@id="user.attributes.country"]', country);
        browser.pause(3000)
    }

    get postalCode() {
        return $('//*[@id="user.attributes.addressPostalCode"]')
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
        console.log(user['countryCode'] + user['state']);
        this.kcRegisterForm.waitForVisible(12000);
        this.firstName.setValue(user['firstName']);
        this.lastName.setValue(user['lastName']);
        this.email.setValue(user['email']);
        this.password.setValue(user['password']);
        this.company.setValue(user['company']);
        this.phoneNumber.setValue(user['phoneNumber']);
        this.selectCountry(user['countryCode']);
        this.addressLineOne.setValue('123 ' + user['addressLineOne']);
        this.city.setValue(user['city']);

        if (user['state'] !== null) {
            this.selectState(user['state']);
        }
        this.postalCode.setValue(user['postalCode']);

        let location = this.tacCheckall.getLocationInView();
        this.tacCheckall.scroll(location['x'], location['y']);
        this.tacCheckall.click();
        this.createAccountBtn.click()
         }
}

module.exports = RegisterPage;