const SiteUser = require('../support/rest/Site.user');

const restSteps = function () {

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

    this.Given(/^I am a Developers.redhat.com registered site visitor$/, function () {
        let user = new SiteUser();
        siteUser = user.productionSiteUser();
    });

    this.Given(/^I have an deactivated Customer portal account$/, function () {
        let user = new SiteUser();
        siteUser = user.createCustomerPortalAccount();
        user.disableCustomerPortalAccount(siteUser)
    });

    this.Given(/^I am a RHD registered site vistor with a linked social account$/, function () {
        let user = new SiteUser();
        siteUser = user.createUserWithLinkedSocialAccount();
    });

    this.Given(/^I am a RHD registered site vistor with a social account$/, function () {
        let user = new SiteUser();
        siteUser = user.createUserWithUnLinkedSocialAccount();
    });
};

module.exports = restSteps;
