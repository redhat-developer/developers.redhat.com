import {siteUser} from "../../support/rest/keycloak/Site.user"

const restSteps = function () {

    this.Given(/^I am a RHD registered site visitor$/, function () {
        siteUserDetails = siteUser.createRHDSiteUser();
    });

    this.Given(/^I am an OpenShift registered site visitor$/, function () {
        siteUserDetails = siteUser.createOpenshiftUser()
    });

    this.Given(/^I have an active Customer portal account$/, function () {
        siteUserDetails = siteUser.createCustomerPortalAccount();
    });

    this.Given(/^I am a Developers.redhat.com registered site visitor$/, function () {
        siteUserDetails = siteUser.productionSiteUser();
    });

    this.Given(/^I have an deactivated Customer portal account$/, function () {
        siteUserDetails = siteUser.createCustomerPortalAccount();
        siteUser.disableCustomerPortalAccount(siteUserDetails)
    });

    this.Given(/^I am a RHD registered site vistor with a linked social account$/, function () {
        siteUserDetails = siteUser.createUserWithLinkedSocialAccount();
    });

    this.Given(/^I am a RHD registered site vistor with a social account$/, function () {
        siteUserDetails = siteUser.createUserWithUnLinkedSocialAccount();
    });
};

module.exports = restSteps;
