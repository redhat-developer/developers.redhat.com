import {BasePage} from '../Base.page';
import {driver} from "../../../../config/browsers/DriverHelper";

class CheatSheetsPage extends BasePage {

    constructor(cheatSheet) {
        super({
            path: `/cheat-sheets/${cheatSheet}/`.toString(),
            selector: `.cheat-sheets${cheatSheet}`,
        });

        this.addSelectors({
            loginToDownloadBtn: '.hidden-after-login',
            downloadBtn: '//*[@id="rhd-cheat-sheet"]/div[2]//a[2]',
        });
    }

    clickLoginToDownloadBtn() {
        return driver.clickOn(this.getSelector('loginToDownloadBtn'))
    }

    clickToDownloadBtn() {
        return driver.clickOn(this.getSelector('downloadBtn'))
    }

    clickToDownload(product, url) {

    }

}

export {
    CheatSheetsPage
};
