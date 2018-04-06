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
            forgotPasswordLink: '//*[@id="kc-form-login"]//a[contains(text(), "Forgot your password?")]',
            registerLink: '//a[contains(text(), "Create one now.")]',
            kcFeedback: '#kc-feedback',
        });
    }

    awaitLoginPage() {
        return driver.awaitExists(this.getSelector('loginPage'), 30000)
    }

    loginPageDisplayed() {
        driver.waitForTitle('Log In', 30000);
        let el = driver.element(this.getSelector('loginPage'));
        return driver.isDisplayed(el)
    }

    feedback() {
        return driver.textOf(this.getSelector('kcFeedback'), 30000)
    }

    login(user) {
        driver.type(user['email'], this.getSelector('usernameField'));
        driver.type(user['password'], this.getSelector('passwordField'));
        return driver.clickOn(this.getSelector('loginButton'))
    }

    loginWith(user, loginType) {
        if (loginType === 'email') {
            driver.type(user['email'], this.getSelector('usernameField'));
        } else {
            driver.type(user['username'], this.getSelector('usernameField'));
        }
        driver.type(user['password'], this.getSelector('passwordField'));
        return driver.clickOn(this.getSelector('loginButton'))
    }

    clickRegisterBtn() {
        return driver.clickOn(this.getSelector('registerLink'))
    }

    clickGithubBtn() {
        return driver.clickOn(this.getSelector('gitHubBtn'))
    }

    clickForgotPasswordLink() {
        return driver.clickOn(this.getSelector('forgotPasswordLink'))
    }
}

const loginPage = new LoginPage();

export {
    loginPage
};
