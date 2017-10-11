import {BasePage} from '../Base.page';
import {driver} from "../../../../config/browsers/DriverHelper";

class DownloadsPage extends BasePage {

    constructor() {
        super({
            path: '/downloads',
            selector: '.downloads',
        });

        this.addSelectors({
            downloadsPage: '.alert-box',
            loadingSpinner: '#downloads .fa-refresh'
        });
    }

    awaitDownloadsPage() {
        driver.awaitExists(this.getSelector('downloadsPage'));
        return driver.awaitIsNotVisible(this.getSelector('loadingSpinner'), 30000)
    }

    clickToDownload(url) {
        let downloadBtn = browser.element(`//*[@id='downloads']//a[@href='${url}']`);
        let location = browser.getLocationInView(`//*[@id='downloads']//a[@href='${url}']`);
        downloadBtn.scroll(location['x'], location['y']);
        return downloadBtn.click()
    }

}

const downloadsPage = new DownloadsPage();

export {
    downloadsPage
};
