const BasePage = require('../Base.page');

class AdditionalInformationPage extends BasePage {

    constructor() {
        super({
            selector: '#kc-update-profile-form'
        });

        this.addSelectors({
            emailField: '#email',
            passwordField: '//*[@id="user.attributes.pwd"]',
            firstNameField: '#firstName',
            lastNameField: '#lastName',
            companyField: '//*[@id="user.attributes.company"]',
            phoneNumberField: '//*[@id="user.attributes.phoneNumber"]',
            countrySelect: '//*[@id="user.attributes.country"]',
            stateSelect: '//*[@id="user.attributes.addressState"]',
            addressLineOneField: '//*[@id="user.attributes.addressLine1"]',
            cityField: '//*[@id="user.attributes.addressCity"]',
            postalCodeField: '//*[@id="user.attributes.addressPostalCode"]',
            fullUserTtac: '.fulluser-ttac',
            tacCheckall: '#tac-checkall',
            submitBtn: '.button',
        });
    }

    completeAdditionalInformation(user, acceptTerms = false) {
        this.type(user['firstName'], this.getSelector('firstNameField'));
        this.type(user['lastName'], this.getSelector('lastNameField'));
        this.type(user['company'], this.getSelector('companyField'));
        this.type(user['phoneNumber'],this.getSelector('phoneNumberField'));
        this.selectByValue(this.getSelector('countrySelect'), user['countryCode']);

        if (user['state'] !== null) {
            this.selectByValue(this.getSelector('stateSelect'), user['state']);
        }

        this.type(user['addressLineOne'], this.getSelector('addressLineOneField'));
        this.type(user['city'], this.getSelector('cityField'));
        this.type(user['postalCode'], this.getSelector('postalCodeField'));


        if (this.isDisplayed(this.getSelector('emailField'))) {
            this.type(user['email'], this.getSelector('emailField'));
        }

        if (this.isDisplayed(this.getSelector('passwordField'))) {
            this.type(user['password'], this.getSelector('passwordField'));
        }

        if (acceptTerms === true) {
            let el = this.element(this.getSelector('tacCheckall'));
            this.scrollIntoView(el);
            if (el.isSelected() === false) {
                this.clickOn(el);
            }
        }
        return this.clickOn(this.getSelector('submitBtn'))
    }

}

module.exports = AdditionalInformationPage;
