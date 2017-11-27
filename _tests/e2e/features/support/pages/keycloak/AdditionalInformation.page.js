import {BasePage} from "../Base.page"

class AdditionalInformation extends BasePage {

    get additionalInformationForm() {
        return browser.element('#kc-update-profile-form')
    }

    get firstNameField() {
        return browser.element('#firstName')
    }

    get lastNameField() {
        return browser.element('#lastName')
    }

    get companyField() {
        return browser.element('//*[@id="user.attributes.company"]')
    }

    get phoneNumberField() {
        return browser.element('//*[@id="user.attributes.phoneNumber"]')
    }

    get addressLineOneField() {
        return browser.element('//*[@id="user.attributes.addressLine1"]')
    }

    get cityField() {
        return browser.element('//*[@id="user.attributes.addressCity"]')
    }

    get postalCodeField() {
        return browser.element('//*[@id="user.attributes.addressPostalCode"]')
    }

    selectState(state) {
        browser.selectByValue('//*[@id="user.attributes.addressState"]', state)
    }

    selectCountry(country) {
        browser.selectByValue('//*[@id="user.attributes.country"]', country)
    }

    get acceptTerms() {
        return browser.element('#tac-checkall')
    }

    get submitBtn() {
        return browser.element('.button')
    }

    completeAdditionalInformation(user, acceptTerms = false) {
        this.additionalInformationForm.waitForVisible(30000);
        this.firstNameField.setValue(user['firstName']);
        this.lastNameField.setValue(user['lastName']);
        this.companyField.setValue(user['company']);
        this.companyField.setValue(user['company']);
        this.phoneNumberField.setValue(user['phoneNumber']);
        this.selectCountry(user['country']);
        this.addressLineOneField.setValue(user['addressLineOne']);
        this.phoneNumberField.setValue(user['phoneNumber']);
        if (user['state'] !== null) {
            this.selectState(user['state']);
        }
        this.cityField.setValue(user['city']);
        this.postalCodeField.setValue(user['postalCode']);

        if (acceptTerms === true) {
            if (this.acceptTerms.isSelected() === false) {
                this.acceptTerms.click()
            }
        }
        return this.submitBtn.click()
    }

}

const additionalInformation = new AdditionalInformation();

export {
    additionalInformation
};
