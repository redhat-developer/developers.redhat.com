import {BasePage} from '../Base.page';
import {driver} from "../../../../config/browsers/DriverHelper";

class CheatSheetsPage extends BasePage {

    constructor(cheatSheet) {
        super({
            path: `/cheat-sheets/${cheatSheet}/`.toString()
        });

        this.addSelectors({
            cheatSheetPage: '#rhd-cheat-sheet',
            loginToDownloadBtn: '.hidden-after-login',
            clickToDownloadBtn: '.shown-after-login',
            thankYou: '.thankyou'
        });
    }

    awaitLoaded() {
        return driver.awaitIsVisible(this.getSelector('cheatSheetPage'));
    }

    downloadConfirmation() {
        driver.waitForUrlContaining('media-download-confirmation', 30000);
        return driver.textOf(this.getSelector('thankYou'))
    }

    clickLoginToDownloadBtn() {
        let downloadBtn = driver.element(this.getSelector('loginToDownloadBtn'));
        let location = downloadBtn.getLocationInView();
        downloadBtn.scroll(location['x'], location['y']);
        return driver.clickOn(downloadBtn);
    }

    clickDownloadBtn() {
        driver.awaitIsVisible(this.getSelector('clickToDownloadBtn'));
        let downloadBtn = driver.element(this.getSelector('clickToDownloadBtn'));
        let location = downloadBtn.getLocationInView();
        downloadBtn.scroll(location['x'], location['y']);
        return driver.clickOn(downloadBtn);
    }
}

export {
    CheatSheetsPage
};
