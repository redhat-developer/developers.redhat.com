import {BasePage} from "../Base.page"

class AccountPage extends BasePage {

    constructor() {
        super({
            path: '/auth/realms/rhd/account/',
            selector: '.user'
        });
    }

    get account() {
        return browser.element('.user')
    }

    get firstName() {
        return browser.element('#firstName')
    }

    get lastName() {
        return browser.element('#lastName')
    }

    get company() {
        return browser.element("//*[@id='user.attributes.company']")
    }

    clickSaveBtn() {
        return this.clickOn("//*[@value='Save']")
    }

    get updateSuccess() {
        return browser.element(".alert-success")
    }

    editProfile(user) {
        this.type(this.firstName, user['firstName']);
        this.type(this.lastName, user['lastName']);
        this.type(this.company, user['company']);
        return this.clickSaveBtn()
    }
}

const accountPage = new AccountPage();

export {
    accountPage
};

