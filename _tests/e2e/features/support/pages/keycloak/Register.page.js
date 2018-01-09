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
            stateSelect: '//*[@id="user.attributes.addressState"]',
            countrySelect: '//*[@id="user.attributes.country"]',
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
        return driver.isDisplayed(this.getSelector('registerForm'), 30000);
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

    extendedRegister(user) {
        driver.type(this.getSelector('firstNameField'), user['firstName']);
        driver.type(this.getSelector('lastNameField'), user['lastName']);
        driver.type(this.getSelector('emailField'), user['email']);
        driver.type(this.getSelector('passwordField'), user['password']);
        driver.type(this.getSelector('companyField'), user['company']);
        driver.type(this.getSelector('phoneNumberField'), user['phoneNumber']);
        driver.selectByValue(this.getSelector('countrySelect'), user['countryCode']);

        if (user['state'] !== null) {
            driver.selectByValue(this.getSelector('stateSelect'), user['state']);
        }

        let el = driver.element(this.getSelector('tacCheckall'));
        driver.scrollIntoView(el);
        driver.clickOn(el);
        return driver.clickOn(this.getSelector('createAccountBtn'))
    }
}

const registerPage = new RegisterPage();

export {
    registerPage
};
