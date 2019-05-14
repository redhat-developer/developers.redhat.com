import Page from './Page';
import Driver from '../utils/Driver.Extension';

export class CheatSheets extends Page {
    get cheatSheetPage() {return $('#rhd-cheat-sheet');}
    get loginToDownloadBtn() {return $(".row a.button.heavy-cta.hidden-after-login");}
    get thankYou() {return $('.thankyou');}

    open(cheatSheet) {
        super.open(`/cheat-sheets/${cheatSheet}/`);
        return this;
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
