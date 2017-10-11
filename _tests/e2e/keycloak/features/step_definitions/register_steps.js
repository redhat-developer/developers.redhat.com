const RegisterPage = require("../support/pages/Register.page");
const registerPage = new RegisterPage;
const LoginPage = require("../support/pages/Login.page");
const loginPage = new LoginPage;
const SiteUser = require("../support/rest/Site.user");

const registerSteps = function () {

    this.Given(/^I am on the Registration page$/, function () {
        registerPage.open();
    });

    this.Then(/^the Register page is displayed$/, function () {
        expect(registerPage.kcRegisterForm.isVisible(), 'Register page was not displayed').to.be.true;
    });

    this.When(/^I try to register with an existing RHD registered email$/, function () {
        let user = new SiteUser();
        siteUser = user.createRHDSiteUser();
        registerPage.email.setValue(siteUser['email']);
        registerPage.createAccountBtn.click();
    });

    this.When(/^I try to register with an existing OpenShift registered email$/, function () {
        let user = new SiteUser();
        siteUser = user.createOpenshiftUser();
        registerPage.email.setValue(siteUser['email']);
        registerPage.password.setValue('');
    });

    this.When(/^I complete the registration form$/, function () {
        let user = new SiteUser();
        siteUser = user.generate();
        registerPage.simpleRegister(siteUser);
    });

    this.When(/^I register a new account$/, function () {
        let user = new SiteUser();
        siteUser = user.generate();
        loginPage.registerBtn.click();
        registerPage.extendedRegister(siteUser);
    });

    this.Then(/^I should be taken to a page informing me that I need to verify my email in order to continue$/, function () {
        registerPage.waitForTitle('Email address verification');
    });

    this.When(/^I verify my email address$/, function () {
        let user = new SiteUser();
        let confirmationEmail = user.verifyRHDAccount(siteUser['email']);
        browser.url(confirmationEmail)
    });

    this.Then(/^I should see an email field error with "([^"]*)"$/, function (msg) {
        registerPage.emailError.waitForVisible(6000);
        let error = registerPage.emailError;
        expect(error.getText(), `email field error '${msg}' was not displayed after 3 seconds`).to.contains(msg)
    });

    this.Then(/^I should see the registration form with terms and conditions$/, function () {
        registerPage.kcRegisterForm.waitForVisible(9000);
        expect(registerPage.tacCheckall.isVisible(), 'Terms and conditions were not displayed').to.be.true;
    });
};

module.exports = registerSteps;
