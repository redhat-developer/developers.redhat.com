import Page from '../Page';
import Driver from '../../utils/Driver.Extension';

export class CheatSheets extends Page {
    get cheatSheetPage() {
        return $('#rhd-cheat-sheet');
    }
    get loginToDownloadBtn() {
        return $("//*[contains(text(),'Log in to download')]");
    }
    get thankYou() {
        return $('.thankyou');
    }

    open(cheatSheet) {
        super.open(`/cheat-sheets/${cheatSheet}/`.toString());
        this.awaitLoaded();
        return this;
    }

    awaitLoaded() {
        return Driver.awaitIsDisplayed(this.cheatSheetPage);
    }

    loginToDownload() {
        this.loginToDownloadBtn.scrollIntoView();
        return Driver.click(this.loginToDownloadBtn);
    }

    awaitDownloadThankYou() {
        return Driver.awaitIsDisplayed(this.thankYou);
    }
}
export default new CheatSheets;
