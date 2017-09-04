let mixin = require("xmultiple");
let BasePage = require("./Base.page");

class AdditionalActionPage extends mixin(BasePage) {

    get fulluserTac() {
        return $('.fulluser-ttac')
    }

    get submitBtn() {
        return $('.button')
    }

}

module.exports = AdditionalActionPage;
