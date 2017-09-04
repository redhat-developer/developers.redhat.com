const RegisterPage = require("../support/pages/Register.page");
const registerPage = new RegisterPage;
const SiteUser = require("../support/rest/Site.user");

const registerSteps = function () {

    let siteUser;

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

};

module.exports = registerSteps;
