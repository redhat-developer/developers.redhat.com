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
    get loginForm() {
        return $('#user-login-form');
    }
    get loginButton() {
        return $('#edit-submit');
    }

    open() {
        super.open('/user/login');
        return this;
    }

    with(user, password) {
        Driver.displayElement(this.loginForm);
        Driver.type(user, this.usernameField);
        Driver.type(password, this.passwordField);
        return Driver.click(this.loginButton);
    }
}

export default new Login;
