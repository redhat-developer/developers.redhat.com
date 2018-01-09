import {BasePage} from "../Base.page"
import {driver} from "../../../../config/browsers/DriverHelper";

class AdditionalActionPage extends BasePage {

    constructor() {
        super({
            selector: '.fulluser-ttac'
        });

        this.addSelectors({
            fulluserTac: '.fulluser-ttac',
            submitBtn: '.button',
        });
    }

    awaitAditionalActionPage() {
        return driver.awaitExists(this.getSelector('fulluserTac'))
    }

    get selectFulluserTac() {
        return driver.clickOn(this.getSelector('fulluserTac'))
    }

    get clickSubmitBtn() {
        return driver.clickOn(this.getSelector('submitBtn'))
    }

}

const additionalActionPage = new AdditionalActionPage();

export {
    additionalActionPage
};
