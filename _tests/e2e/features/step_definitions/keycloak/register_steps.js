import {registerPage} from "../../support/pages/keycloak/Register.page"
import {loginPage} from "../../support/pages/keycloak/Login.page"
import {siteUser} from "../../support/rest/keycloak/Site.user"

const registerSteps = function () {

    this.Given(/^I am on the Registration page$/, function () {
        registerPage.open();
    });

    this.Then(/^the Register page is displayed$/, function () {
        expect(registerPage.kcRegisterFormDispalyed(), 'Register page was not displayed').to.be.true;
    });

    this.When(/^I try to register with an existing RHD registered email$/, function () {
        siteUserDetails = siteUser.createRHDSiteUser();
        registerPage.email.setValue(siteUserDetails['email']);
        registerPage.createAccountBtn.click();
    });

    this.When(/^I try to register with an existing OpenShift registered email$/, function () {
        siteUserDetails = siteUser.createOpenshiftUser();
        registerPage.email.setValue(siteUserDetails['email']);
        registerPage.password.setValue('');
    });

    this.When(/^I complete the registration form$/, function () {
        siteUserDetails = siteUser.generate();
        registerPage.simpleRegister(siteUserDetails);
    });

    this.When(/^I register a new account$/, function () {
        siteUserDetails = siteUser.generate();
        loginPage.registerBtn.click();
        registerPage.extendedRegister(siteUserDetails);
    });

    this.Then(/^I should be taken to a page informing me that I need to verify my email in order to continue$/, function () {
        registerPage.waitForTitle('Email address verification');
    });

    this.When(/^I verify my email address$/, function () {
        let confirmationEmail = siteUser.verifyRHDAccount(siteUserDetails['email']);
        browser.url(confirmationEmail)
    });

    this.Then(/^I should see an email field error with "([^"]*)"$/, function (msg) {
        expect(registerPage.emailError(), `email field error '${msg}' was not displayed after 3 seconds`).to.contains(msg)
    });

    this.Then(/^I should see the registration form with terms and conditions$/, function () {
        expect(registerPage.tacCheckall.isVisible(), 'Terms and conditions were not displayed').to.be.true;
    });
};

module.exports = registerSteps;
