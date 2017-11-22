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
            gitHubButton: '#social-github',
            forgotPasswordLink: '*=Forgot Password?',
            kcFeedback: '#kc-feedback',
            registerButton: '=REGISTER'
        });
    }

    loginPageDisplayed() {
        let el = driver.element(this.getSelector('loginPage'));
        return driver.isDisplayed(el)
    }

    login(user) {
        driver.type(this.getSelector('usernameField'), user['email']);
        driver.type(this.getSelector('passwordField'), user['password']);
        return driver.clickOn(this.getSelector('loginButton'))
    }
}

const loginPage = new LoginPage();

export {
    loginPage
};
