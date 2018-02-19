import {BasePage} from "../Base.page"
import {driver} from "../../../../config/browsers/DriverHelper";

class AdditionalActionPage extends BasePage {

    constructor() {
        super({
            selector: '.fulluser-ttac'
        });

        this.addSelectors({
            fulluserTac: '.fulluser-ttac',
            newPasswordField: '//*[@id="user.attributes.pwd"]',
            submitBtn: '.button'
        });
    }

    awaitAditionalActionPage() {
        return driver.awaitExists(this.getSelector('fulluserTac'))
    }

    selectFulluserTac() {
        return driver.clickOn(this.getSelector('fulluserTac'))
    }

    clickSubmitBtn() {
        return driver.clickOn(this.getSelector('submitBtn'))
    }

    updatePassword() {
        driver.type('password01', this.getSelector('newPasswordField'));
        driver.clickOn(this.getSelector('submitBtn'))
    }

}

const additionalActionPage = new AdditionalActionPage();

export {
    additionalActionPage
};
