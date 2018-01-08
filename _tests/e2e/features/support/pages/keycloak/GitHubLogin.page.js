import {BasePage} from "../Base.page";
import {driver} from "../../../../config/browsers/DriverHelper";

class GitHubLoginPage extends BasePage {

    constructor() {
        super({
            selector: '#login'
        });

        this.addSelectors({
            usernameField: '#login_field',
            passwordField: '#password',
            loginBtn: '.btn'

        });
    }

    login(username, password) {
        driver.type(this.getSelector('usernameField'), username);
        driver.type(this.getSelector('passwordField'), password);
        return driver.clickOn(this.getSelector('loginBtn'))
    }

}


const gitHubLoginPage = new GitHubLoginPage();

export {
    gitHubLoginPage
};
