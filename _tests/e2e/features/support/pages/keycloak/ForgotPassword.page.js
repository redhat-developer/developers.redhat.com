import {BasePage} from "../Base.page"
import {driver} from "../../../../config/browsers/DriverHelper";

class ForgotPassword extends BasePage {

    constructor() {
        super({
            selector: '#kc-reset-password-form',
        });

        this.addSelectors({
            submitBtn: '#kc-form-buttons .button',
            usernameField: '#username',
        });

    }

    resetPassword(email) {
        driver.type(this.getSelector('usernameField'), email);
        return driver.clickOn(this.getSelector('submitBtn'))
    }

}

export {
    ForgotPassword
};
