import {BasePage} from "../Base.page"

class SocialLoginPage extends BasePage {

    constructor() {
        super({
            path: '/auth/realms/rhd/account/identity',
            selector: '.social'
        });
    }

    get socialLogin() {
        return browser.element('.social')
    }

    get addGitHub() {
        return browser.element('#add-github')
    }

    get removeGithubBtn() {
        return browser.element('#remove-github')
    }
}

const socialAccountPage = new SocialLoginPage();

export {
    socialAccountPage
};

