let BasePage = require("./Base.page");

class SocialLoginPage extends BasePage {
    open() {
        super.open('auth/realms/rhd/account/identity');
        this.socialLogin.waitForVisible(9000)
    }

    get socialLogin() {
        return $('.social')
    }

    get addGitHub() {
        return $('#add-github')
    }

    get removeGithubBtn() {
        return $('#remove-github')
    }
}

module.exports = SocialLoginPage;
