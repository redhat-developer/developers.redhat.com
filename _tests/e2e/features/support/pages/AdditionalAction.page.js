let mixin = require("xmultiple");
let BasePage = require("./Base.page");
let NavigationBar = require('../sections/navigationBar.section');

class AdditionalActionPage extends mixin(BasePage, NavigationBar) {

    get fulluserTac() {
        return $('.fulluser-ttac')
    }

    get submitBtn() {
        return $('.button')
    }

}

module.exports = AdditionalActionPage;
