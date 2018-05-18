import {BasePage} from "../Base.page"

class SocialLoginPage extends BasePage {

    constructor() {
        super({
            path: '/auth/realms/rhd/account/identity',
            selector: '.social'
        });
        this.addSelectors({
            socialLogin: '.social',
            linkGithubBtn: '#add-github',
            unlinkGithubBtn: '#remove-github'
        });
    }

    clickGitHubBtn(btn) {
        return this.clickOn(this.getSelector(`${btn}GithubBtn`))
    }

    awaitGitHubBtn(btn) {
        return this.awaitExists(this.getSelector(`${btn}GithubBtn`))
    }
}

const socialAccountPage = new SocialLoginPage();

export {
    socialAccountPage
};
