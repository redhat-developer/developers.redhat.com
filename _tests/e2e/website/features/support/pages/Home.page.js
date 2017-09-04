let mixin = require("xmultiple");
let BasePage = require("./Base.page");
let NavigationBar = require('../sections/navigationBar.section');

class HomePage extends mixin(BasePage, NavigationBar) {

    open() {
        super.open('');
        browser.waitForVisible('.home')
    }

}

module.exports = HomePage;