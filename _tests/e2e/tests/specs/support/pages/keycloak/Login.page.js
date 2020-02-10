import Page from '../Page';
import Driver from '../../utils/Driver.Extension';

class Login extends Page {
    get loginPage() {
        return $('.kc-loginpage');
    }
    get usernameField() {
        return $('#username');
    }
    get nextBtn() {
        return $('#login-show-step2');
    }
    get passwordField() {
        return $('#password');
    }
    get loginButton() {
        return $('#kc-login');
    }
    get step2() {
        return $('#step2');
    }

    open() {
        super.open('/login');
        this.awaitLogin();
    }

    awaitLogin() {
        return Driver.awaitExists(this.loginPage);
    }

    awaitStepTwo() {
        return Driver.awaitIsDisplayed(this.step2);
    }

    isCurrent() {
        this.awaitLogin();
        return Driver.isVisible(this.usernameField);
    }

    with(user, password) {
        Driver.type(user, this.usernameField);
        Driver.click(this.nextBtn);
        this.awaitStepTwo();
        Driver.type(password, this.passwordField);
        return Driver.click(this.loginButton);
    }
}

export default new Login;
