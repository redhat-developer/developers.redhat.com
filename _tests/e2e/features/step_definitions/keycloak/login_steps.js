import {loginPage} from "../../support/pages/keycloak/Login.page"
import {forgotPasswordPage} from "../../support/pages/keycloak/ForgotPassword.page"
import {additionalActionPage} from "../../support/pages/keycloak/AdditionalAction.page"
import {gitHubLoginPage} from "../../support/pages/keycloak/GitHubLogin.page"
import {siteUser} from "../../support/rest/keycloak/Site.user"
import {gmail} from "../../support/rest/keycloak/Gmail"

const loginSteps = function () {

    this.Given(/^I am on the Login page$/, function () {
        loginPage.open();
    });

    this.Then(/^the Login page is displayed$/, function () {
        expect(loginPage.loginPageDisplayed(), 'Login page was not displayed').to.eq(true);
    });

    this.When(/^I log in with my email address$/, function () {
        loginPage.login(siteUserDetails);
    });

    this.When(/^I have logged into my account$/, function () {
        loginPage.open();
        loginPage.login(siteUserDetails);
    });

    this.When(/^I log using my OpenShift account$/, function () {
        loginPage.login(siteUserDetails);
    });

    this.Given(/^I log in with Customer portal account$/, function () {
        loginPage.login(siteUserDetails);
    });

    this.Then(/^I should be logged in$/, function () {
        browser.waitUntil(function () {
            return browser.getUrl() === `${process.env.RHD_BASE_URL}/`
        }, 30000, `User was not redirected to ${process.env.RHD_BASE_URL} after 30 seconds`);

        let rhUserId = siteUser.getUserAttribute(siteUserDetails['email'], 'rhUserId');

        let rhUserIdCookie = browser.getCookie('rh_user_id');
        return expect(rhUserIdCookie['value'], `RH user: ${rhUserId} was not successfully logged in`).to.eq(rhUserId)
    });

    this.Given(/^I attempt to log in with an incorrect password$/, function () {
        siteUserDetails['password'] = 'incorrect';
        loginPage.login(siteUserDetails)
    });

    this.Given(/^I attempt to log in with an invalid email address$/, function () {
        siteUserDetails['email'] = 'invalid.com';
        loginPage.login(siteUserDetails)
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
        let passwordResetLink = gmail.process(siteUser['email']);
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
        siteUserDetails = siteUser.createUserWithLinkedSocialAccount();
        loginPage.socialGithubBtn.click();
        gitHubLoginPage.login(siteUserDetails['gitHubUsername'], siteUserDetails['gitHubPassword'])
    });

    this.When(/^click to register a new account$/, function () {
        loginPage.registerBtn.click();
    });

    this.Given(/^I have a GitHub account$/, function () {
        siteUserDetails = siteUser.gitHubAccountUser();
    });

    this.When(/^I log in using my Github account$/, function () {
        loginPage.socialGithubBtn.click();
        gitHubLoginPage.login(siteUserDetails['gitHubUsername'], siteUserDetails['gitHubPassword']);
    });

    this.When(/^I log in using my social account$/, function () {
        gitHubLoginPage.login(siteUserDetails['gitHubUsername'], siteUserDetails['gitHubPassword']);
    });

};

module.exports = loginSteps;
