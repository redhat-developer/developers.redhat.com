import {siteNav} from '../support/sections/NavigationBar.section';
import {footerMenu} from '../support/sections/Footer';
import {DrupalInstance} from "../support/rest/Drupal.instance";

const navigationMenuSteps = function () {

    this.When(/^I click on the "([^"]*)" link within the primary nav bar$/, function (primaryNavLink) {
        siteNav.clickMenuItem(primaryNavLink.toLowerCase())
    });

    this.When(/^I search for "([^"]*)" via the site-nav search bar$/, function (searchTerm) {
        siteNav.searchFor(searchTerm);
    });

    this.When(/^I enter "([^"]*)" into the site-nav search bar$/, function (searchTerm) {
        siteNav.enterSearch(searchTerm);
    });

    this.When(/^I trigger the search via the search-button$/, function () {
        siteNav.triggerSearch()
    });

    this.Given(/^I scroll to the footer section$/, function () {
        footerMenu.scrollToFooter();
    });

    this.Given(/^I collapse the footer section$/, function () {
        for (let i = 1; i < 4; i++) {
            footerMenu.collapseFooter(i);
            browser.pause(1000);
        }
    });

    this.Then(/^the footer Related Sites section should contain the following links:$/, function (dataTable) {
        let data = dataTable.raw();
        for (let i = 0; i < data.length; i++) {
            expect(footerMenu.sectionContent(1)).to.contain(data[i]);
        }
    });

    this.Then(/^the footer Services section should contain the following links:$/, function (dataTable) {
        let data = dataTable.raw();
        for (let i = 0; i < data.length; i++) {
            expect(footerMenu.sectionContent(2)).to.contain(data[i]);
        }
    });

    this.Then(/^the footer Communication section should contain the following links:$/, function (dataTable) {
        let data = dataTable.raw();
        for (let i = 0; i < data.length; i++) {
            expect(footerMenu.sectionContent(3)).to.contain(data[i]);
        }
    });

    this.Given(/^I am on a JBOSS referred page as "([^"]*)"$/, function (url) {
        browser.url(`${process.env.RHD_BASE_URL}/${url}/?referrer=jbd`)
    });

    this.Then(/^I should see a "([^"]*)" alert$/, function (arg1) {
        expect(siteNav.alertBoxDisplayed()).to.eq(true)
    });

    this.Then(/^I should see a primary nav bar with the following tabs:$/, function (dataTable) {
        let data = dataTable.raw();
        for (let i = 0; i < data.length; i++) {
            expect(siteNav.primaryNavItem(data[i])).to.eq(true);
        }
    });

    this.When(/^I scroll to the "([^"]*)" menu item$/, function (menuItem) {
        siteNav.moveToMegaMenuItem(menuItem)
    });

    this.Then(/^I should see the following "(.*)" sub-menu items:$/, function (item, dataTable) {
        let data = dataTable.raw();
        for (let i = 0; i < data.length; i++) {
            expect(siteNav.getSubNavItems(item)).to.contain(data[i]);
        }
    });

    this.When(/^I tap on the "([^"]*)" menu item$/, function (menuItem) {
        siteNav.clickMegaMenuItem(menuItem)
    });

    this.Then(/^the sub\-menu should include a list of available technologies that link to a retrospective product overview page$/, function () {
        let drupal = new DrupalInstance();
        let products = drupal.getProducts()[1];
        for (let i = 0; i < products.length; i++) {
            expect(siteNav.getSubNavLinks('Technologies').toString()).to.contain(`${process.env.RHD_BASE_URL}/products/${products[i]}/overview`);
        }
    });

    this.Then(/^the sub\-menu should not include a list of available technologies$/, function () {
        let drupal = new DrupalInstance();
        let products = drupal.getProducts()[0];
        for (let i = 0; i < products.length; i++) {
            let res = siteNav.getSubNavItems('Technologies').includes(products[i]);
            expect(res).to.eq(false)
        }
    });

    this.Then(/^each "(.*)" sub\-menu item should contain a link to its retrospective page:$/, function (menuItem, dataTable) {
        let data = dataTable.raw();
        for (let i = 0; i < data.length; i++) {
            expect(siteNav.getSubNavLinks(menuItem).toString()).to.contain(data[i]);
        }
    });

};

module.exports = navigationMenuSteps;
