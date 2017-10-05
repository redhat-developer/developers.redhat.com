let BasePage = require("./Base.page");

class UpdatePasswordPage extends BasePage {
    open() {
        super.open('auth/realms/rhd/account/password');
        this.passwordPage.waitForVisible(9000)
    }

    get passwordPage() {
        return $('.password')
    }

    get currentPassword() {
        return $('#password')
    }

    get newPassword() {
        return $('#password-new')
    }

    get newPasswordConfirm() {
        return $('#password-confirm')
    }

    get saveNewPasswordBtn() {
        return $("//*[@value='Save']")
    }

    get updateSuccess() {
        return $('.alert-success')
    }

    updatePassword(user, newPassword) {
        this.currentPassword.setValue(user['password']);
        this.newPassword.setValue(newPassword);
        this.newPasswordConfirm.setValue(newPassword);
        this.saveNewPasswordBtn.click();
        this.updateSuccess.waitForVisible()
    }
}

module.exports = UpdatePasswordPage;

