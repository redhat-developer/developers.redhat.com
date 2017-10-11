let BasePage = require("./Base.page");

class LoginPage extends BasePage {

    open() {
        super.open('login');
        this.kcLoginPage.waitForVisible(9000)
    }

    get kcLoginPage() {
        return $('.kc-loginpage')
    }

    get usernameField() {
        return $('#username');
    }

    get passwordField() {
        return $('#password');
    }

    get loginBtn() {
        return $('#kc-login');
    }

    get socialGithubBtn() {
        return $('#social-github')
    }

    get forgotPasswordLink() {
        return $('*=Forgot Password?')
    }

    get kcFeedback() {
        return $('#kc-feedback');
    }

    get registerBtn() {
        return $('=REGISTER')
    }

    login(user) {
        this.usernameField.setValue(user['email']);
        this.passwordField.setValue(user['password']);
        this.loginBtn.click();
    }
}

module.exports = LoginPage;
