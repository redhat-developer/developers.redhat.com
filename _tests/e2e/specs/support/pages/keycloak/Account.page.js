import {BasePage} from "../Base.page"

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
        this.type(user['firstName'], this.getSelector('firstName'),);
        this.type(user['lastName'], this.getSelector('lastName'), );
        this.type(user['company'], this.getSelector('company'));
        return this.clickSaveBtn();
    }

    clickSaveBtn() {
        return this.clickOn(this.getSelector('saveBtn'))
    }

    successMessage() {
        return this.isDisplayed(this.getSelector('updateSuccess'))
    }

}

const accountPage = new AccountPage();

export {
    accountPage
};

