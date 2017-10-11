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

    this.Given(/^I am on the Login page$/, function () {
        loginPage.open();
    });

    this.Then(/^the Login page is displayed$/, function () {
        expect(loginPage.kcLoginPage.isVisible(), 'Login page was not displayed').to.be.true;
    });

    this.When(/^I log in with my email address$/, function () {
        loginPage.login(siteUser)
    });

    this.When(/^I have logged into my account$/, function () {
        loginPage.open();
        loginPage.login(siteUser);
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
        loginPage.kcFeedback.waitForVisible();
        let errorMessage = loginPage.kcFeedback.getText();
        expect(errorMessage).to.include(message)
    });

    this.When(/^I request a password reset$/, function () {
        loginPage.forgotPasswordLink.click();
        let emailForm = forgotPasswordPage.forgotPasswordForm;
        emailForm.waitForVisible(9000);
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
        gitHubLoginPage.login(user['gitHubUsername'], user['gitHubPassword'])
    });

    this.When(/^click to register a new account$/, function () {
        loginPage.registerBtn.click();
    });

    this.Given(/^I have a GitHub account$/, function () {
        let user = new SiteUser();
        siteUser = user.gitHubAccountUser();
    });

    this.When(/^I log in using my Github account$/, function () {
        loginPage.socialGithubBtn.click();
        gitHubLoginPage.login(siteUser['gitHubUsername'], siteUser['gitHubPassword'])
    });

    this.When(/^I log in using my social account$/, function () {
        gitHubLoginPage.login(siteUser['gitHubUsername'], siteUser['gitHubPassword'])
    });


};

module.exports = loginSteps;
