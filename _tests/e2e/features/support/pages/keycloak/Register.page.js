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
            usernameField: '#username',
            emailError: '#email-error',
            firstNameField: '#firstName',
            lastNameField: '#lastName',
            emailField: '#email',
            passwordField: '#password',
            companyField: '//*[@id="user.attributes.company"]',
            phoneNumberField: '//*[@id="user.attributes.phoneNumber"]',
            addressLineOneField: '//*[@id="user.attributes.addressLine1"]',
            cityField: '//*[@id="user.attributes.addressCity"]',
            postcodeField: '//*[@id="user.attributes.addressPostalCode"]',
            stateSelect: '//*[@id="user.attributes.addressState"]',
            countrySelect: '//*[@id="user.attributes.country"]',
            fullUserTtac: '.fulluser-ttac',
            tacCheckall: '#tac-checkall',
            receiveNewsletter: '//*[@id="user.attributes.newsletter]',
            createAccountBtn: '.button',
        });
    }

    awaitRegisterPage() {
        driver.awaitExists(this.getSelector('registerForm'), 30000);
        return driver.isDisplayed(this.getSelector('tacCheckall'))
    }

    kcRegisterFormDispalyed() {
        driver.waitForTitle('Register', 30000);
        return driver.isDisplayed(this.getSelector('registerForm'), 30000);
    }

    feedback(field) {
        return driver.textOf(this.getSelector(`${field}Error`))
    }

    simpleRegister(user) {
        driver.type(user['username'], this.getSelector('usernameField'));
        driver.type(user['email'], this.getSelector('emailField'));
        driver.type(user['password'], this.getSelector('passwordField'));
        driver.clickOn(this.getSelector('fullUserTtac'));
        return driver.clickOn(this.getSelector('createAccountBtn'))
    }

    awaitVerifyEmail() {
        return driver.waitForTitle('Email address verification', 50000)
    }

    extendedRegister(termsModel, user) {
        driver.type(user['username'], this.getSelector('usernameField'));
        driver.type(user['firstName'], this.getSelector('firstNameField'));
        driver.type(user['lastName'], this.getSelector('lastNameField'));
        driver.type(user['email'], this.getSelector('emailField'));
        driver.type(user['password'], this.getSelector('passwordField'),);
        driver.type(user['company'], this.getSelector('companyField'));
        driver.type(user['phoneNumber'], this.getSelector('phoneNumberField'));
        driver.selectByValue(this.getSelector('countrySelect'), user['countryCode']);

        if (user['state'] !== null) {
            driver.selectByValue(this.getSelector('stateSelect'), user['state']);
        }

        if (termsModel === 'RHD supportable user profile') {
            driver.type(user['addressLineOne'], this.getSelector('addressLineOneField'));
            driver.type(user['city'], this.getSelector('cityField'));
            driver.type(user['postalCode'], this.getSelector('postcodeField'));
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
