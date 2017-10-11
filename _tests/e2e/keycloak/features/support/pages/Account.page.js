let BasePage = require("./Base.page");

class AccountPage extends BasePage {
    open() {
        super.open('auth/realms/rhd/account/');
        this.account.waitForVisible(9000)
    }

    get account() {
        return $('.user')
    }

    get firstName() {
        return $('#firstName')
    }

    get lastName() {
        return $('#lastName')
    }

    get company() {
        return $("//*[@id=\"user.attributes.company\"]")
    }

    clickSaveBtn() {
        let saveButton = $("//*[@value='Save']");
        let location = saveButton.getLocationInView();
        saveButton.scroll(location['x'], location['y']);
        saveButton.click();
    }

    get updateSuccess() {
        return $(".alert-success")
    }

    editProfile(user) {
        this.firstName.setValue(user['firstName']);
        this.lastName.setValue(user['lastName']);
        this.company.setValue(user['company']);
        this.clickSaveBtn()
    }
}

module.exports = AccountPage;
