import {BasePage} from "../Base.page"
import {driver} from "../../../../config/browsers/DriverHelper";

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
        return driver.clickOn(this.getSelector(`${btn}GithubBtn`))
    }

    awaitGitHubBtn(btn) {
        return driver.awaitExists(this.getSelector(`${btn}GithubBtn`))
    }
}

const socialAccountPage = new SocialLoginPage();

export {
    socialAccountPage
};

