import Page from "../Page";
import Driver from "../../utils/Driver.Extension";

class Login extends Page {
    get loginPage() {
        return $('.kc-loginpage');
    }
    get usernameField() {
        return $('#edit-name');
    }
    get passwordField() {
        return $('#edit-pass');
    }
    get loginButton() {
        return $('#edit-submit');
    }
    get legacyLoginButton() {
        return $('#drupalUserLoginToggleVisibility');
    }

    open() {
        super.open('/user/login');
        return this;
    }

    isDisplayed() {
        this.awaitLogin();
        return Driver.isVisible(this.usernameField);
    }

    with(user, password) {
        Driver.click(this.legacyLoginButton);
        Driver.type(user, this.usernameField);
        Driver.type(password, this.passwordField);
        return Driver.click(this.loginButton);
    }
}

export default new Login;
