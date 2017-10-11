import {BasePage} from "../Base.page"

class ForgotPassword extends BasePage {

    get forgotPasswordForm() {
        return browser.element('#kc-reset-password-form')
    }

    get submitBtn() {
        return browser.element('#kc-form-buttons .button')
    }

    resetPassword(email) {
        this.type(this.usernameField, email);
        return this.clickOn(this.submitBtn)
    }

}

const forgotPasswordPage = new ForgotPassword();

export {
    forgotPasswordPage
};
