import {BasePage} from "../Base.page"
import {driver} from "../../../../config/browsers/DriverHelper";

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
        driver.type(this.getSelector('currentPassword'), user['password']);
        driver.type(this.getSelector('newPassword'), newPassword);
        driver.type(this.getSelector('newPasswordConfirm'), newPassword);
        driver.clickOn(this.getSelector('saveNewPasswordBtn'));
        return driver.awaitExists(this.getSelector('updateSuccess'))
    }
}

const updatePasswordPage = new UpdatePasswordPage();

export {
    updatePasswordPage
};


