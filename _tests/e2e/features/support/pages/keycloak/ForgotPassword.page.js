import {BasePage} from "../Base.page"
import {driver} from "../../../../config/browsers/DriverHelper";

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
        driver.awaitIsVisible(this.getSelector('forgotPasswordPage'))
    }


    resetPassword(email) {
        this.awaitPassowrdResetForm();
        driver.type(email, this.getSelector('usernameField'));
        return driver.clickOn(this.getSelector('submitBtn'))
    }

}

export {
    ForgotPassword
};
