import {BasePage} from "../Base.page"

class AdditionalActionPage extends BasePage {

    get fulluserTac() {
        return browser.element('.fulluser-ttac')
    }

    get submitBtn() {
        return browser.element('.button')
    }

}

const additionalActionPage = new AdditionalActionPage();

export {
    additionalActionPage
};
