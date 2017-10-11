const mixin = require("xmultiple");
const BasePage = require("./Base.page");
const NavigationBar = require('../sections/navigationBar.section');

class GetStartedPage extends mixin(BasePage, NavigationBar) {

    waitForGetStartedPage(productID) {
        let pageId = $(`.products${productID}hello-world`);
        let thankYouSelector = $('#downloadthankyou');
        pageId.waitForVisible(60000);
        thankYouSelector.waitForVisible(60000)
    }

}

module.exports = GetStartedPage;
