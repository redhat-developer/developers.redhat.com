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
            createAccountBtn: '.button',
        });
    }

    completeAdditionalInformation(user, acceptTerms = false) {
        driver.type(this.getSelector('firstNameField'), user['firstName']);
        driver.type(this.getSelector('lastNameField'), user['lastName']);
        driver.type(this.getSelector('companyField'), user['company']);
        driver.type(this.getSelector('phoneNumberField'), user['phoneNumber']);
        driver.selectByValue(this.getSelector('countrySelect'), user['countryCode']);

        if (user['state'] !== null) {
            driver.selectByValue(this.getSelector('stateSelect'), user['state']);
        }

        if (driver.isDisplayed(this.getSelector('emailField'))) {
            driver.type(this.getSelector('emailField'), user['email']);
        }

        if (driver.isDisplayed(this.getSelector('passwordField'))) {
            driver.type(this.getSelector('passwordField'), user['password']);
        }

        if (acceptTerms === true) {
            let el = driver.element(this.getSelector('tacCheckall'));
            driver.scrollIntoView(el);
            if (el.isSelected() === false) {
                driver.clickOn(el);
            }
        }
        return driver.clickOn(this.getSelector('createAccountBtn'))
    }

}

const additionalInformation = new AdditionalInformation();

export {
    additionalInformation
};
