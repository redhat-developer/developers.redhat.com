import {BasePage} from "../Base.page";

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
        this.type(username, this.getSelector('usernameField'));
        this.type(password, this.getSelector('passwordField'));
        return this.clickOn(this.getSelector('loginBtn'))
    }

}


const gitHubLoginPage = new GitHubLoginPage();

export {
    gitHubLoginPage
};
