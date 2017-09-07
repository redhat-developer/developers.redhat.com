const RegisterPage = require("../support/pages/Register.page");
const registerPage = new RegisterPage;
const SiteUser = require('../support/rest/Site.user');
const GetMail = require('../support/rest/Gmail');

const registerSteps = function () {

    this.Then(/^the Register page is displayed$/, function () {
        expect(registerPage.kcRegisterForm.isVisible(), 'Register page was not displayed').to.be.true;
    });

    this.When(/^I complete the registration form$/, function () {
        let user = new SiteUser();
        siteUser = user.generate();
        registerPage.register(siteUser['email'], siteUser['password']);
        siteUser['firstName'] = 'my';
        siteUser['lastName'] = 'account'
    });

    this.When(/^I verify my email address$/, function () {
        let email = new GetMail();
        let confirmationEmail = email.process(siteUser['email']);
        browser.url(confirmationEmail)
    });

    this.When(/^I try to register with an existing RHD registered email$/, function () {
        registerPage.email.setValue('uk.redhat.test.user+full-site-user@gmail.com');
        registerPage.createAccountBtn.click();
    });

    this.Then(/^I should see an email field error with "([^"]*)"$/, function (msg) {
        browser.pause(3000);
        let error = registerPage.emailError;
        expect(error.getText(), `email field error '${msg}' was not displayed after 3 seconds`).to.contains(msg)
    });

    this.When(/^I try to register with an existing OpenShift registered email$/, function () {
        registerPage.email.setValue('velias+emailveriftest@redhat.com');
        registerPage.createAccountBtn.click();
    });

};

module.exports = registerSteps;
