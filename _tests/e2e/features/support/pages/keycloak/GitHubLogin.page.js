import {BasePage} from "../Base.page";

class GitHubLoginPage extends BasePage {

    get githubLogin() {
        return browser.element('#login')
    }

    get usernameField() {
        return browser.element('#login_field')
    }

    get passwordField() {
        return browser.element('#password')
    }

    get loginBtn() {
        return browser.element('.btn')
    }

    login(username, password) {
        this.awaitElement(this.githubLogin);
        this.type(this.usernameField, username);
        this.type(this.passwordField, password);
        return this.clickOn(this.loginBtn)
    }
}


const gitHubLoginPage = new GitHubLoginPage();

export {
    gitHubLoginPage
};
