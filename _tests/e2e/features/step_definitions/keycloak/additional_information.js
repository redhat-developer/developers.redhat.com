import {additionalInformation} from "../../support/pages/keycloak/AdditionalInformation.page"
import {additionalActionPage} from "../../support/pages/keycloak/AdditionalAction.page"

const additionalInformationSteps = function () {

    this.When(/^I complete the additional action required page(, accept terms and proceed|, and proceed)$/, function (negate) {
        if (negate === ', and proceed') {
            additionalInformation.completeAdditionalInformation(siteUserDetails)
        } else {
            additionalInformation.completeAdditionalInformation(siteUserDetails, true)
        }
    });

    this.When(/^I confirm my details, and proceed$/, function () {
        additionalActionPage.clickSubmitBtn()
    });

    this.When(/^I add a new password$/, function () {
        additionalActionPage.updatePassword();
    });
};

module.exports = additionalInformationSteps;
