import {technologiesPage} from "../support/pages/website/Technologies.page";

const technologiesSteps = function () {

    this.Given(/^I am on the Technologies page$/, function () {
        technologiesPage.open()
    });

    this.Then(/^I should see a list of available products$/, function () {
        let productIds = new Set(technologiesPage.drupalProducts()[1]).delete('rhoar');
        for (let i = 1; i < productIds.length; i++) {
            expect(technologiesPage.productHeading(productIds[i]).isVisible(),`${productIds[i]} was not visible`).to.eq(true)
        }
    });

    this.Then(/^each product title should link to the relevant product overview page$/, function () {
        let productIds = new Set(technologiesPage.drupalProducts()[1]).delete('rhoar');
        for (let i = 1; i < productIds.length; i++) {
            expect(technologiesPage.productHeading(productIds[i]).getAttribute('href')).to.contain(`${productIds[i]}/overview/`)
        }
    });

    this.Then(/^each product has a Get Started button/, function () {
        let productIds = new Set(technologiesPage.drupalProducts()[1]).delete('rhoar');
        for (let i = 1; i < productIds.length; i++) {
            expect(technologiesPage.getStartedButton(productIds[i]).isVisible(), `${productIds[i]} did not contain a get started button`).to.eq(true)
        }
    });

    this.Then(/^the get started buttons should link to the relevant get started page/, function () {
        let productIds = new Set(technologiesPage.drupalProducts()[1]).delete('rhoar');
        for (let i = 1; i < productIds.length; i++) {
            expect(technologiesPage.getStartedButton(productIds[i]).getAttribute('href')).to.contain(`${productIds[i]}/hello-world/`)
        }
    });

};
module.exports = technologiesSteps;