import {driver} from "../../../../config/browsers/DriverHelper";
import {BasePage} from "../Base.page";

class RegisterPage extends BasePage {

    constructor() {
        super({
            path: '/register',
            selector: '#kc-register-form'
        });

        this.addSelectors({
            registerForm: '#kc-register-form',
            emailError: '#email-error',
            firstNameField: '#firstName',
            lastNameField: '#lastName',
            emailField: '#email',
            passwordField: '#password',
            companyField: '//*[@id="user.attributes.company"]',
            phoneNumberField: '//*[@id="user.attributes.phoneNumber"]',
            addressLineOneField: '//*[@id="user.attributes.addressLine1"]',
            cityField: '//*[@id="user.attributes.addressCity"]',
            stateSelect: '//*[@id="user.attributes.addressState"]',
            countrySelect: '//*[@id="user.attributes.country"]',
            postalCodeField: '//*[@id="user.attributes.addressPostalCode"]',
            fullUserTtac: '.fulluser-ttac',
            tacCheckall: '#tac-checkall',
            createAccountBtn: '.button',
        });
    }

    awaitRegisterPage() {
        driver.awaitExists(this.getSelector('registerForm'), 30000);
        return driver.isDisplayed(this.getSelector('tacCheckall'))
    }

    kcRegisterFormDispalyed() {
        let el = driver.awaitExists(this.getSelector('registerForm'), 30000);
        return driver.isDisplayed(el)
    }

    feedback(field) {
        return driver.textOf(this.getSelector(`${field}Error`))
    }

    simpleRegister(user) {
        driver.type(this.getSelector('emailField'), user['email']);
        driver.type(this.getSelector('passwordField'), user['password']);
        driver.clickOn(this.getSelector('fullUserTtac'));
        return driver.clickOn(this.getSelector('createAccountBtn'))
    }

    awaitVerifyEmail() {
        return driver.waitForTitle('Email address verification', 30000)
    }

    // extendedRegister(user) {
    //     console.log(user['countryCode'] + user['state']);
    //     this.kcRegisterForm.waitForVisible(12000);
    //     this.firstName.setValue(user['firstName']);
    //     this.lastName.setValue(user['lastName']);
    //     this.email.setValue(user['email']);
    //     this.password.setValue(user['password']);
    //     this.company.setValue(user['company']);
    //     this.phoneNumber.setValue(user['phoneNumber']);
    //     this.selectCountry(user['countryCode']);
    //     this.addressLineOne.setValue('123 ' + user['addressLineOne']);
    //     this.city.setValue(user['city']);
    //
    //     if (user['state'] !== null) {
    //         this.selectState(user['state']);
    //     }
    //     this.postalCode.setValue(user['postalCode']);
    //
    //     let location = this.tacCheckall.getLocationInView();
    //     this.tacCheckall.scroll(location['x'], location['y']);
    //     this.tacCheckall.click();
    //     this.createAccountBtn.click()
    // }
}

const registerPage = new RegisterPage();

export {
    registerPage
};
