import {BasePage} from "../Base.page"
import {driver} from "../../../../config/browsers/DriverHelper";

class AdditionalInformation extends BasePage {

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
        driver.type(user['firstName'], this.getSelector('firstNameField'));
        driver.type(user['lastName'], this.getSelector('lastNameField'));
        driver.type(user['company'], this.getSelector('companyField'));
        driver.type(user['phoneNumber'],this.getSelector('phoneNumberField'));
        driver.selectByValue(this.getSelector('countrySelect'), user['countryCode']);

        if (user['state'] !== null) {
            driver.selectByValue(this.getSelector('stateSelect'), user['state']);
        }

        driver.type(user['addressLineOne'], this.getSelector('addressLineOneField'));
        driver.type(user['city'], this.getSelector('cityField'));
        driver.type(user['postalCode'], this.getSelector('postalCodeField'));


        if (driver.isDisplayed(this.getSelector('emailField'))) {
            driver.type(user['email'], this.getSelector('emailField'));
        }

        if (driver.isDisplayed(this.getSelector('passwordField'))) {
            driver.type(user['password'], this.getSelector('passwordField'));
        }

        if (acceptTerms === true) {
            let el = driver.element(this.getSelector('tacCheckall'));
            driver.scrollIntoView(el);
            if (el.isSelected() === false) {
                driver.clickOn(el);
            }
        }
        return driver.clickOn(this.getSelector('submitBtn'))
    }

}

const additionalInformation = new AdditionalInformation();

export {
    additionalInformation
};
