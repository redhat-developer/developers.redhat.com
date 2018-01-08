import {BasePage} from "../Base.page"
import {driver} from "../../../../config/browsers/DriverHelper";

class AccountPage extends BasePage {

    constructor() {
        super({
            path: '/auth/realms/rhd/account/',
            selector: '.user'
        });

        this.addSelectors({
            account: '.user',
            firstName: '#firstName',
            lastName: '#lastName',
            company: "//*[@id='user.attributes.company']",
            saveBtn: "//*[@value='Save']",
            updateSuccess: ".alert-success"
        });
    }

    editProfile(user) {
        driver.type(this.getSelector('firstName'), user['firstName']);
        driver.type(this.getSelector('lastName'), user['lastName']);
        driver.type(this.getSelector('company'), user['company']);
        return this.clickSaveBtn();
    }

    clickSaveBtn() {
        return driver.clickOn(this.getSelector('saveBtn'))
    }

    successMessage() {
        return driver.isDisplayed(this.getSelector('updateSuccess'))
    }

}

const accountPage = new AccountPage();

export {
    accountPage
};

