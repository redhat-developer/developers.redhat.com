const AccountPage = require("../support/pages/Account.page");
const SocialAccountPage = require("../support/pages/AccountSocialLogin.page");
const PasswordAccountPage = require("../support/pages/AccountUpdatePassword.page");
const editAccountPage = new AccountPage;
const socialAccountPage = new SocialAccountPage;
const updatePasswordPage = new PasswordAccountPage;
const SiteUser = require('../support/rest/Site.user');
const ITAdmin = require("../support/rest/IT.admin");
const LoginPage = require("../support/pages/Login.page");
const loginPage = new LoginPage;

const editAccountSteps = function () {

    this.Given(/^I am on the Edit Account page$/, function () {
        editAccountPage.open();
    });

    this.Given(/^I am on the Social Login Account page$/, function () {
        socialAccountPage.open();
    });

    this.Given(/^I am on the Password Account page$/, function () {
        updatePasswordPage.open();
    });

    this.When(/^I update my profile$/, function () {
        siteUser['firstName'] = 'Test-Updated';
        siteUser['lastName'] = 'Last-Name';
        editAccountPage.editProfile(siteUser)
    });

    this.Then(/^my details should be updated$/, function () {
        editAccountPage.updateSuccess.waitForValue(9000);
    });

    this.Then(/^the customer portal should be updated$/, function () {
        let ITadmin = new ITAdmin();
        let details = ITadmin.findUserByEmail(siteUser['email']);
        expect(details['firstName'], 'User details were not propagated to Customer portal').to.eq(siteUser['firstName']);
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
        let user = new SiteUser();
        let linkedSocialAccounts = user.getSocialLogins(siteUser['email']);
        expect(linkedSocialAccounts.length, 'User account still contains social login in KeyCloak Admin').to.eq(0)
    });

    this.Then(/^my account should be linked$/, function () {
        socialAccountPage.removeGithubBtn.waitForVisible();
        let user = new SiteUser();
        let linkedSocialAccounts = user.getSocialLogins(siteUser['email']);
        expect(linkedSocialAccounts.length, 'User account does not contain a social login in KeyCloak Admin').to.be > 0;
    });

    this.When(/^I change my password$/, function () {
        updatePasswordPage.updatePassword(siteUser, 'P@$$wordUpdate01');
        siteUser['password'] = 'P@$$wordUpdate01'
    });

    this.When(/^I Logout$/, function () {
        if (baseUrl === 'https://developers.redhat.com') {
            browser.url('https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=https%3A%2F%2Fdevelopers.redhat.com%2F')
        } else {
            browser.url('https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=https%3A%2F%2Fdevelopers.stage.redhat.com%2F')
        }
    });

    this.Then(/^I log back into RHD using my newly created password$/, function () {
        loginPage.open();
        loginPage.login(siteUser);
    });
};

module.exports = editAccountSteps;
