let BasePage = require("./Base.page");

class AdditionalActionPage extends BasePage {

    get fulluserTac() {
        return $('.fulluser-ttac')
    }

    get submitBtn() {
        return $('.button')
    }

}

module.exports = AdditionalActionPage;
