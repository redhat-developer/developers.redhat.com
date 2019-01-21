import {Page} from "../Page";

export class CheatSheets extends Page {

    constructor(cheatSheet) {
        super({
            path: `/cheat-sheets/${cheatSheet}/`.toString()
        });

        this.addSelectors({
            cheatSheetPage: '#rhd-cheat-sheet',
            loginToDownloadBtn: "//*[contains(text(),'Log in to download')]",
            thankYou: '.thankyou'
        });
    }

    awaitLoaded() {
        return this.awaitIsVisible(this.getSelector('cheatSheetPage'));
    }

    awaitDownload() {
        //wait for frontend js issue (double page refresh causing stale element exception)
        //sleeps are bad, never use sleeps, this is a hack for a longstanding frontend issue
        this.pause(6000);
        return this.awaitDownloadConfirmation() && this.awaitDownloadThankYou();
    }

    awaitDownloadConfirmation() {
        return this.waitForUrlContaining('media-download-confirmation', 60000);
    }

    awaitDownloadThankYou() {
        this.awaitIsVisible(this.getSelector('thankYou'), 60000);
    }

    loginToDownload() {
        let downloadBtn = this.element(this.getSelector('loginToDownloadBtn'));
        let location = downloadBtn.getLocationInView();
        downloadBtn.scroll(location['x'], location['y']);
        return this.click(downloadBtn);
    }
}
