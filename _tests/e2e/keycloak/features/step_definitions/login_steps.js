const LoginPage = require("../support/pages/Login.page");
const ForgotPasswordPage = require("../support/pages/ForgotPassword.page");
const AdditionalActionPage = require("../support/pages/AdditionalAction.page");
const GitHubLoginPage = require("../support/pages/GitHubLogin.page");
const loginPage = new LoginPage;
const gitHubLoginPage = new GitHubLoginPage;
const forgotPasswordPage = new ForgotPasswordPage;
const additionalActionPage = new AdditionalActionPage;
const SiteUser = require('../support/rest/Site.user');
const GetMail = require('../support/rest/Gmail');
const config = require('../../config/wdio.conf.keycloak').config;

const loginSteps = function () {

    let siteUser;

    this.Given(/^I am a RHD registered site visitor$/, function () {
        let user = new SiteUser();
        siteUser = user.createRHDSiteUser();
    });

    this.Given(/^I am an OpenShift registered site visitor$/, function () {
        let user = new SiteUser();
        siteUser = user.createOpenshiftUser()
    });

    this.Given(/^I have an active Customer portal account$/, function () {
        let user = new SiteUser();
        siteUser = user.createCustomerPortalAccount();
    });

    this.Given(/^I have an deactivated Customer portal account$/, function () {
        let user = new SiteUser();
        siteUser = user.createCustomerPortalAccount();
        user.disableCustomerPortalAccount(siteUser)
    });

    this.Given(/^I am on the Login page$/, function () {
        loginPage.open();
    });

    this.Then(/^the Login page is displayed$/, function () {
        expect(loginPage.kcLoginPage.isVisible(), 'Login page was not displayed').to.be.true;
    });

    this.When(/^I log in with my email address$/, function () {
        loginPage.login(siteUser)
    });

    this.When(/^I log using my OpenShift account$/, function () {
        loginPage.login(siteUser);
    });

    this.Given(/^I log in with Customer portal account$/, function () {
        loginPage.login(siteUser);
    });

    this.Then(/^I should be logged in$/, function () {
        browser.waitUntil(function () {
            return browser.getUrl() === `${config.baseUrl}/`
        }, 30000, `User was not redirected to ${config.baseUrl} after 30 seconds`);

        let user = new SiteUser();
        let rhUserId = user.getUserAttribute(siteUser['email'], 'rhUserId');

        let rhUserIdCookie = browser.getCookie('rh_user_id');
        expect(rhUserIdCookie['value'], `RH user: ${rhUserId} was not successfully logged in`).to.eq(rhUserId)
    });

    this.Given(/^I attempt to log in with an incorrect password$/, function () {
        siteUser['password'] = 'incorrect';
        loginPage.login(siteUser)
    });

    this.Given(/^I attempt to log in with an invalid email address$/, function () {
        siteUser['email'] = 'invalid.com';
        loginPage.login(siteUser)
    });

    this.Then(/^the following error message should be displayed: (.*)$/, function (message) {
        let errorMessage = loginPage.kcFeedbackText;
        errorMessage.waitForVisible();
        expect(errorMessage.getText()).to.eq(message)
    });

    this.When(/^I request a password reset$/, function () {
        loginPage.forgotPasswordLink.click();
        let emailForm = forgotPasswordPage.forgotPasswordForm;
        emailForm.waitForVisible();
        forgotPasswordPage.resetPassword(siteUser['email']);
        let confirmationMessage = loginPage.kcFeedbackText;
        confirmationMessage.waitForVisible();
    });

    this.When(/^I navigate to the password reset link$/, function () {
        let email = new GetMail();
        let passwordResetLink = email.process(siteUser['email']);
        browser.url(passwordResetLink)
    });

    this.Then(/^I should be asked to agree to the Red Hat Developer Program Terms & Conditions$/, function () {
        let additionalAction = additionalActionPage.fulluserTac;
        additionalAction.waitForVisible();
    });

    this.Then(/^I accept Red Hat Developer Program Terms & Conditions and Red Hat Subscription Agreement and proceed$/, function () {
        additionalActionPage.fulluserTac.click();
        additionalActionPage.submitBtn.click()
    });

    this.When(/^I log in with an account that is already linked to my Github account$/, function () {
        let user = new SiteUser();
        siteUser = user.createUserWithLinkedSocialAccount();
        loginPage.socialGithubBtn.click();
        gitHubLoginPage.login('rhdsociallogin', 'P@$$word01')
    });

};

module.exports = loginSteps;
