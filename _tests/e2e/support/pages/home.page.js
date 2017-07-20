let mixin = require("xmultiple");
let BasePage = require("./base.page");
let NavigationBar = require('../sections/navigationBar.section');

class HomePage extends mixin(BasePage, NavigationBar) {
    open() {
        super.open('');
    }
}

module.exports = HomePage;
