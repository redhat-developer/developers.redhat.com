import {additionalInformation} from "../../support/pages/keycloak/AdditionalInformation.page"

const additionalInformationSteps = function () {

    this.When(/^I complete the additional action required page(, accept terms and proceed|, and proceed)$/, function (negate) {
        if (negate === ', and proceed') {
            additionalInformation.completeAdditionalInformation(siteUserDetails)
        } else {
            additionalInformation.completeAdditionalInformation(siteUserDetails, true)
        }
    });

};

module.exports = additionalInformationSteps;
