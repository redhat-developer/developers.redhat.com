const LoginPage = require("../support/pages/Login.page");
const ForgotPasswordPage = require("../support/pages/ForgotPassword.page");
const AdditionalActionPage = require("../support/pages/AdditionalAction.page");
const GitHubLoginPage = require("../support/pages/GitHubLogin.page");
const loginPage = new LoginPage;
const gitHubLoginPage = new GitHubLoginPage;
const forgotPasswordPage = new ForgotPasswordPage;
const additionalActionPage = new AdditionalActionPage;
const KeyCloakAdmin = require("../support/rest/Keycloak.admin");
const ITAdmin = require("../support/rest/IT.admin");
const SiteUser = require('../support/rest/Site.user');
const GetMail = require('../support/rest/Gmail');

const loginSteps = function () {

    this.Then(/^the Login page is displayed$/, function () {
        expect(loginPage.usernameField.isVisible(), 'Login page was not displayed').to.be.true;
    });

    this.Given(/^I am a (Developer.redhat.com|RHD|Customer Portal|Openshift) registered site visitor$/, function (persona) {
        let user = new SiteUser();
        siteUser = user.generate();
        let admin = new KeyCloakAdmin();
        admin.registerNewUser(siteUser['email'], siteUser['password'], siteUser['firstName'], siteUser['lastName']);
        console.log(`Created user with email: ${siteUser['email']}, and name ${siteUser['firstName']} ${siteUser['lastName']}`);
    });

    this.When(/^I log in with (an|a) (valid|incorrect|invalid) (username|email address)$/, function (arg, negate, loginType) {
        if (negate === 'valid') {
            loginPage.login(siteUser['email'], siteUser['password'])
        } else {
            loginPage.login('foo.com', 'password')
        }
    });

    this.When(/^I am an OpenShift registered site visitor$/, function () {
        let admin = new ITAdmin();
        let user = new SiteUser();
        siteUser = user.generate();
        admin.createSimpleUser(siteUser['email'], siteUser['password']);
        console.log(`Created OpenShift user with email: ${siteUser['email']} and password: ${siteUser['password']}`);
    });

    this.When(/^I log using my OpenShift account$/, function () {
        loginPage.login(siteUser['email'], siteUser['password']);
        siteUser['firstName'] = 'my';
        siteUser['lastName'] = 'account'
    });

    this.Given(/^I have an (active|deactivated) Customer portal account$/, function (accountType) {
        let admin = new ITAdmin();
        let user = new SiteUser();
        siteUser = user.generate();
        admin.createFullUser(siteUser['email'], siteUser['password']);

        console.log(`Created full site user: ${siteUser['email']} and password: ${siteUser['password']}`);

        if (accountType === 'deactivated') {
            admin.disableUser(siteUser['email'], siteUser['password'])
        }
    });

    this.Given(/^I log in with Customer portal account$/, function () {
        loginPage.login(siteUser['email'], siteUser['password']);
        siteUser['firstName'] = 'test';
        siteUser['lastName'] = 'engineer'
    });

    this.Then(/^I should be logged in$/, function () {
        let loggedInName = loginPage.getLoggedInName();
        expect(loggedInName.toLowerCase()).to.equal(`${siteUser['firstName']} ${siteUser['lastName']}`.toLowerCase())
    });

    this.Given(/^I log in with (an|a) (valid|incorrect) password$/, function (_arg, negate) {
        if (negate === 'valid') {
            loginPage.login(siteUser['email'], siteUser['password'])
        } else {
            loginPage.login(siteUser['email'], 'incorrect')
        }
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
        let confirmationEmail = email.process(siteUser['email']);
        browser.url(confirmationEmail)
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
        siteUser = user.generate();
        let admin = new KeyCloakAdmin();
        admin.registerNewUser(siteUser['email'], siteUser['password'], siteUser['firstName'], siteUser['lastName']);
        console.log(`Created user with email: ${siteUser['email']}, and name ${siteUser['firstName']} ${siteUser['lastName']}`);
        admin.linkSocialProvider(siteUser['email'], 'github', '20190656', 'rhdsociallogin');
        loginPage.socialGithubBtn.click();
        gitHubLoginPage.login('rhdsociallogin', 'P@$$word01')
    });

};

module.exports = loginSteps;
