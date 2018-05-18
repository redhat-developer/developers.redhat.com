import {BasePage} from "../Base.page"

class ForgotPassword extends BasePage {

    constructor() {
        super();
        this.addSelectors({
            forgotPasswordPage: '#kc-reset-password-form',
            submitBtn: '#kc-form-buttons .button',
            usernameField: '#username',
        });
    }

    awaitPassowrdResetForm() {
        this.awaitIsVisible(this.getSelector('forgotPasswordPage'))
    }


    resetPassword(email) {
        this.awaitPassowrdResetForm();
        this.type(email, this.getSelector('usernameField'));
        return this.clickOn(this.getSelector('submitBtn'))
    }

}

export {
    ForgotPassword
};
