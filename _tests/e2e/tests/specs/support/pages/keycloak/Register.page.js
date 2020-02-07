import {Page} from "../Page";
import Driver from "../../utils/Driver.Extension";

class Register extends Page {
    get registerForm() {
        return $('#kc-register-form');
    }

    open() {
        super.open('/register');
    }

    isDisplayed() {
        return Driver.isVisible(this.registerForm);
    }
}

export default new Register;
