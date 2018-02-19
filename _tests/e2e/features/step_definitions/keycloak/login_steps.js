import {loginPage} from "../../support/pages/keycloak/Login.page"
import {ForgotPassword} from "../../support/pages/keycloak/ForgotPassword.page"
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

    this.When(/^I log in with my (email|username) address$/, function (loginType) {
        loginPage.loginWith(siteUserDetails, loginType);
    });

    this.When(/^I have logged into my account$/, function () {
        loginPage.open();
        loginPage.login(siteUserDetails);
        expect(loginPage.isLoggedIn(siteUserDetails), 'User was not logged in').to.eq(true)
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

    this.Then(/^I should be registered and logged in$/, function () {
        browser.waitUntil(function () {
            return browser.getUrl() === `${process.env.RHD_BASE_URL}/confirmation/`
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
        let errorMessage = loginPage.feedback();
        expect(errorMessage).to.include(message)
    });

    this.When(/^I request a password reset$/, function () {
        loginPage.clickForgotPasswordLink();
        let forgotPasswordPage = new ForgotPassword();
        forgotPasswordPage.resetPassword(siteUserDetails['email']);
    });

    this.When(/^I navigate to the password reset link$/, function () {
        let passwordResetLink = gmail.process(siteUserDetails['email']);
        browser.url(passwordResetLink)
    });

    this.Then(/^I should be asked to agree to the Red Hat Developer Program Terms & Conditions$/, function () {
        additionalActionPage.awaitAditionalActionPage();
    });

    this.Then(/^I accept Red Hat Developer Program Terms & Conditions and Red Hat Subscription Agreement and proceed$/, function () {
        additionalActionPage.selectFulluserTac();
        additionalActionPage.clickSubmitBtn()
    });

    this.When(/^I log in with an account that is already linked to my Github account$/, function () {
        siteUserDetails = siteUser.createUserWithLinkedSocialAccount();
        loginPage.clickGithubBtn();
        gitHubLoginPage.login(siteUserDetails['gitHubUsername'], siteUserDetails['gitHubPassword'])
    });

    this.When(/^I click to register a new account$/, function () {
        loginPage.awaitLoginPage();
        loginPage.clickRegisterBtn();
    });

    this.Given(/^I have a GitHub account$/, function () {
        siteUserDetails = siteUser.gitHubAccountUser();
        global.socialAccountHolder = true
    });

    this.When(/^I log in using my Github account$/, function () {
        loginPage.clickGithubBtn();
        gitHubLoginPage.login(siteUserDetails['gitHubUsername'], siteUserDetails['gitHubPassword']);
    });

    this.When(/^I log in using my social account$/, function () {
        gitHubLoginPage.login(siteUserDetails['gitHubUsername'], siteUserDetails['gitHubPassword']);
    });

};

module.exports = loginSteps;
