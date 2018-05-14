const BasePage = require('../Base.page');

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
        this.awaitExists(this.getSelector('registerForm'), 30000);
        return this.isDisplayed(this.getSelector('tacCheckall'))
    }

    kcRegisterFormDispalyed() {
        this.waitForPageTitle('Register', 30000);
        return this.isDisplayed(this.getSelector('registerForm'), 30000);
    }

    feedback(field) {
        return this.textOf(this.getSelector(`${field}Error`))
    }

    simpleRegister(user) {
        this.type(user['username'], this.getSelector('usernameField'));
        this.type(user['email'], this.getSelector('emailField'));
        this.type(user['password'], this.getSelector('passwordField'));
        this.clickOn(this.getSelector('fullUserTtac'));
        return this.clickOn(this.getSelector('createAccountBtn'))
    }

    awaitVerifyEmail() {
        return this.waitForPageTitle('Email address verification', 50000)
    }

    extendedRegister(termsModel, user) {
        this.type(user['username'], this.getSelector('usernameField'));
        this.type(user['firstName'], this.getSelector('firstNameField'));
        this.type(user['lastName'], this.getSelector('lastNameField'));
        this.type(user['email'], this.getSelector('emailField'));
        this.type(user['password'], this.getSelector('passwordField'));
        this.type(user['company'], this.getSelector('companyField'));
        this.type(user['phoneNumber'], this.getSelector('phoneNumberField'));
        this.selectByValue(this.getSelector('countrySelect'), user['countryCode']);

        if (user['state'] !== null) {
            this.selectByValue(this.getSelector('stateSelect'), user['state']);
        }

        if (termsModel === 'RHD supportable user profile') {
            this.type(user['addressLineOne'], this.getSelector('addressLineOneField'));
            this.type(user['city'], this.getSelector('cityField'));
            this.type(user['postalCode'], this.getSelector('postcodeField'));
        }

        let el = this.element(this.getSelector('tacCheckall'));
        this.scrollIntoView(el);
        this.clickOn(el);
        return this.clickOn(this.getSelector('createAccountBtn'))
    }
}

module.exports = RegisterPage;