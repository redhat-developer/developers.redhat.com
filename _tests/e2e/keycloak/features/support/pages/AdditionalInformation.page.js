let BasePage = require("./Base.page");

class AdditionalInformation extends BasePage {

    get additionalInformationForm() {
        return $('#kc-update-profile-form')
    }

    get firstNameField() {
        return $('#firstName')
    }

    get lastNameField() {
        return $('#lastName')
    }

    get companyField() {
        return $('//*[@id="user.attributes.company"]')
    }

    get phoneNumberField() {
        return $('//*[@id="user.attributes.phoneNumber"]')
    }

    get addressLineOneField() {
        return $('//*[@id="user.attributes.addressLine1"]')
    }

    get cityField() {
        return $('//*[@id="user.attributes.addressCity"]')
    }

    get postalCodeField() {
        return $('//*[@id="user.attributes.addressPostalCode"]')
    }

    slectState(state) {
        browser.selectByValue('//*[@id="user.attributes.addressState"]', state)
    }

    selectCountry(country) {
        browser.selectByValue('//*[@id="user.attributes.country"]', country)
    }

    get acceptTerms() {
        return $('#tac-checkall')
    }

    get submitBtn() {
        return $('.button')
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
            this.slectState(user['state']);
        }
        this.cityField.setValue(user['city']);
        this.postalCodeField.setValue(user['postalCode']);

        if (acceptTerms === true) {
            if (this.acceptTerms.isSelected() === false) {
                this.acceptTerms.click()
            }
        }
        this.submitBtn.click()
    }

}

module.exports = AdditionalInformation;
