import {BasePage} from "../Base.page"

class UpdatePasswordPage extends BasePage {

    constructor() {
        super({
            path: '/auth/realms/rhd/account/password',
            selector: '.password'
        });
    }

    get currentPassword() {
        return browser.element('#password')
    }

    get newPassword() {
        return browser.element('#password-new')
    }

    get newPasswordConfirm() {
        return browser.element('#password-confirm')
    }

    get saveNewPasswordBtn() {
        return browser.element("//*[@value='Save']")
    }

    get updateSuccess() {
        return browser.element('.alert-success')
    }

    updatePassword(user, newPassword) {
        this.type(this.currentPassword, user['password']);
        this.type(this.newPassword, newPassword);
        this.type(this.newPasswordConfirm, newPassword);
        this.clickOn(this.saveNewPasswordBtn);
        return this.updateSuccess.waitForVisible()
    }
}

const updatePasswordPage = new UpdatePasswordPage();

export {
    updatePasswordPage
};


