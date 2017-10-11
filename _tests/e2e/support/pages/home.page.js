let mixin = require("xmultiple");
let BasePage = require("./base.page");
let NavigationBar = require('../sections/navigationBar.section');
let FooterSection = require('../sections/footer');

class HomePage extends mixin(BasePage, NavigationBar, FooterSection) {
    open() {
        super.open('');
        browser.waitForVisible('.home')
    }
}

module.exports = HomePage;