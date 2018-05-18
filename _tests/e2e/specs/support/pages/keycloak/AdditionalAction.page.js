import {BasePage} from "../Base.page"

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
        return this.awaitExists(this.getSelector('fulluserTac'))
    }

    selectFulluserTac() {
        return this.clickOn(this.getSelector('fulluserTac'))
    }

    clickSubmitBtn() {
        return this.clickOn(this.getSelector('submitBtn'))
    }

    updatePassword() {
        this.type('password01', this.getSelector('newPasswordField'));
        this.clickOn(this.getSelector('submitBtn'))
    }

}

const additionalActionPage = new AdditionalActionPage();

export {
    additionalActionPage
};
