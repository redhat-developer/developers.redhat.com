import {loginPage} from "../../support/pages/keycloak/Login.page"
import {accountPage} from "../../support/pages/keycloak/Account.page"
import {socialAccountPage} from "../../support/pages/keycloak/AccountSocialLogin.page"
import {updatePasswordPage} from "../../support/pages/keycloak/AccountUpdatePassword.page"
import {siteUser} from "../../support/rest/keycloak/Site.user"
import {itAdmin} from "../../support/rest/keycloak/IT.admin"
const qs = require('querystring');

const editAccountSteps = function () {

    this.Given(/^I am on the Edit Account page$/, function () {
        accountPage.open();
    });

    this.Given(/^I am on the Social Login Account page$/, function () {
        socialAccountPage.open();
    });

    this.Given(/^I am on the Password Account page$/, function () {
        updatePasswordPage.open();
    });

    this.When(/^I update my profile$/, function () {
        siteUserDetails['firstName'] = 'Test-Updated';
        siteUserDetails['lastName'] = 'Last-Name';
        accountPage.editProfile(siteUserDetails)
    });

    this.Then(/^my details should be updated$/, function () {
        accountPage.updateSuccess.waitForValue(9000);
    });

    this.Then(/^the customer portal should be updated$/, function () {
        let details = itAdmin.findUserByEmail(siteUserDetails['email']);
        expect(details['firstName'], 'User details were not propagated to Customer portal').to.eq(siteUserDetails['firstName']);
    });

    this.When(/^I (link|unlink) my social account$/, function (option) {
        if (option === 'unlink') {
            socialAccountPage.removeGithubBtn.click();
        } else {
            socialAccountPage.addGitHub.click()
        }
    });

    this.Then(/^I should not have any social accounts associated with me$/, function () {
        socialAccountPage.addGitHub.waitForVisible();
        let linkedSocialAccounts = siteUser.getSocialLogins(siteUserDetails['email']);
        expect(linkedSocialAccounts.length, 'User account still contains social login in KeyCloak Admin').to.eq(0)
    });

    this.Then(/^my account should be linked$/, function () {
        socialAccountPage.removeGithubBtn.waitForVisible();
        let linkedSocialAccounts = siteUser.getSocialLogins(siteUserDetails['email']);
        expect(linkedSocialAccounts.length, 'User account does not contain a social login in KeyCloak Admin').to.be > 0;
    });

    this.When(/^I change my password$/, function () {
        updatePasswordPage.updatePassword(siteUserDetails, 'P@$$wordUpdate01');
        siteUserDetails['password'] = 'P@$$wordUpdate01'
    });

    this.When(/^I Logout$/, function () {
        let encodedURL = qs.escape(process.env.RHD_BASE_URL);
        if (process.env.RHD_BASE_URL === 'https://developers.stage.redhat.com') {
            browser.url(`https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`)
        } else {
            browser.url(`https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`)
        }
    });

    this.Then(/^I log back into RHD using my newly created password$/, function () {
        loginPage.open();
        loginPage.login(siteUserDetails);
    });
};

module.exports = editAccountSteps;
