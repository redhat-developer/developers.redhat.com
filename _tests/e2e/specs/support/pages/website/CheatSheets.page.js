const BasePage = require('../Base.page');

class CheatSheetsPage extends BasePage {

    constructor(cheatSheet) {
        super({
            path: `/cheat-sheets/${cheatSheet}/`.toString()
        });

        this.addSelectors({
            cheatSheetPage: '#rhd-cheat-sheet',
            loginToDownloadBtn: '.hidden-after-login',
            clickToDownloadBtn: '.shown-after-login',
            thankYou: '.thankyou',
            retryDownload: '#download-link'
        });
    }

    awaitLoaded() {
        return this.awaitIsVisible(this.getSelector('cheatSheetPage'));
    }

    awaitDownloadThankYou() {
        this.waitForUrlContaining('media-download-confirmation', 15000);
        return this.awaitIsVisible(this.getSelector('thankYou'), 15000);
    }

    clickLoginToDownloadBtn() {
        let downloadBtn = this.element(this.getSelector('loginToDownloadBtn'));
        let location = downloadBtn.getLocationInView();
        downloadBtn.scroll(location['x'], location['y']);
        return this.clickOn(downloadBtn);
    }

    retryDownload() {
        return this.clickOn(this.getSelector('retryDownload'))
    }

}

module.exports = CheatSheetsPage;
