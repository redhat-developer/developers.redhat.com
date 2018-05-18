import {BasePage} from "../Base.page"

class UpdatePasswordPage extends BasePage {

    constructor() {
        super({
            path: '/auth/realms/rhd/account/password',
            selector: '.password'
        });
        this.addSelectors({
            currentPassword: '#password',
            newPassword: '#password-new',
            newPasswordConfirm: '#password-confirm',
            saveNewPasswordBtn: "//*[@value='Save']",
            updateSuccess: '.alert-success'
        });
    }

    updatePassword(user, newPassword) {
        this.type(user['password'], this.getSelector('currentPassword'));
        this.type(newPassword, this.getSelector('newPassword'));
        this.type(newPassword, this.getSelector('newPasswordConfirm'));
        this.clickOn(this.getSelector('saveNewPasswordBtn'));
        return this.awaitExists(this.getSelector('updateSuccess'))
    }
}

const updatePasswordPage = new UpdatePasswordPage();

export {
    updatePasswordPage
};
