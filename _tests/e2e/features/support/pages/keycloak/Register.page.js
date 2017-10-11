import {BasePage} from "../Base.page";

class RegisterPage extends BasePage {

    constructor() {
        super({
            path: '/register',
            selector: '#kc-register-form'
        });
    }

    kcRegisterFormDispalyed() {
        let el = browser.element('#kc-register-form');
        this.awaitElement(el);
        return this.isDisplayed(el)
    }

    emailError() {
        return this.textOf("#email-error")
    }

    get firstName() {
        return browser.element('#firstName')
    }

    get lastName() {
        return browser.element('#lastName')
    }

    get email() {
        return browser.element('#email')
    }

    get password() {
        return browser.element('#password')
    }

    get company() {
        return browser.element('//*[@id="user.attributes.company"]')
    }

    get phoneNumber() {
        return browser.element('//*[@id="user.attributes.phoneNumber"]')
    }

    get addressLineOne() {
        return browser.element('//*[@id="user.attributes.addressLine1"]')
    }

    get city() {
        return browser.element('//*[@id="user.attributes.addressCity"]')
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
        return browser.element('//*[@id="user.attributes.addressPostalCode"]')
    }

    get tacBtn() {
        return browser.element('.fulluser-ttac')
    }

    get tacCheckall() {
        return browser.element('#tac-checkall')
    }

    get createAccountBtn() {
        return browser.element('.button')
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

const registerPage = new RegisterPage();

export {
    registerPage
};
