import {BasePage} from '../Base.page';
import {driver} from "../../../../config/browsers/DriverHelper";

class DownloadsPage extends BasePage {

    constructor() {
        super({
            path: '/downloads',
        });

        this.addSelectors({
            downloadsPage: '//rhdp-downloads-all',
            loadingSpinner: '#downloads .fa-refresh',
            cdkOSVersion: '//*[@id="developer_tools"]/div/rhdp-downloads-all-item[2]/div/div[3]',
            devsuiteOSVersion: '//*[@id="developer_tools"]/div/rhdp-downloads-all-item[3]/div/div[3]'
        });
    }

    awaitDownloadsPage() {
        return driver.awaitIsVisible(this.getSelector('downloadsPage'), 30000);
    }

    clickToDownload(productName) {
        let downloadBtn = driver.element(`//rhdp-downloads-all-item[@name='${productName}']//a[contains(text(), 'Download')]`);
        let location = downloadBtn.getLocationInView();
        downloadBtn.scroll(location['x'], location['y']);
        return driver.clickOn(downloadBtn)
    }

    osSpecificDownload(productCode) {
        let osType = driver.element(this.getSelector(`${productCode}OSVersion`));
        let location = osType.getLocationInView();
        osType.scroll(location['x'], location['y']);
        return osType.getText()
    }

}

const downloadsPage = new DownloadsPage();

export {
    downloadsPage
};
