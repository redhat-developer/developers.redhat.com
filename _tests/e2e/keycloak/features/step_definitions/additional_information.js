const AdditionalInformationPage = require("../support/pages/AdditionalInformation.page");
const additionalInformationPage = new AdditionalInformationPage;

const additionalInformationSteps = function () {

    this.When(/^I complete the additional action required page(, accept terms and proceed|, and proceed)$/, function (negate) {
        if (negate === ', and proceed') {
            additionalInformationPage.completeAdditionalInformation(siteUser)
        } else {
            additionalInformationPage.completeAdditionalInformation(siteUser, true)
        }
    });

};

module.exports = additionalInformationSteps;
