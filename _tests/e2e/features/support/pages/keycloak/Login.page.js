import {BasePage} from "../Base.page";
import {driver} from "../../../../config/browsers/DriverHelper";

class LoginPage extends BasePage {

    constructor() {
        super({
            path: '/login',
            selector: '.kc-loginpage'
        });

        this.addSelectors({
            loginPage: '.kc-loginpage',
            usernameField: '#username',
            passwordField: '#password',
            loginButton: '#kc-login',
            gitHubBtn: '#social-github',
            forgotPasswordLink: '*=Forgot Password?',
            kcFeedback: '#kc-feedback',
            registerButton: '=REGISTER'
        });
    }

    awaitLoginPage() {
        return driver.awaitExists(this.getSelector('loginPage'), 30000)
    }

    loginPageDisplayed() {
        let el = driver.element(this.getSelector('loginPage'));
        return driver.isDisplayed(el)
    }

    feedback() {
        return driver.textOf(this.getSelector('kcFeedback'), 30000)
    }

    login(user) {
        driver.type(this.getSelector('usernameField'), user['email']);
        driver.type(this.getSelector('passwordField'), user['password']);
        return driver.clickOn(this.getSelector('loginButton'))
    }

    clickRegisterBtn() {
        return driver.clickOn(this.getSelector('registerButton'))
    }

    clickGithubBtn() {
        return driver.clickOn(this.getSelector('gitHubBtn'))
    }
}

const loginPage = new LoginPage();

export {
    loginPage
};
