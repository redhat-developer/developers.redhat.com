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
            loadingSpinner: '#downloads .fa-refresh',
            cdkOSVersion: '//*[@id="developer_tools"]/div/rhdp-downloads-all-item[2]/div/div[3]',
            devsuiteOSVersion: '//*[@id="developer_tools"]/div/rhdp-downloads-all-item[3]/div/div[3]'
        });
    }

    awaitDownloadsPage() {
        driver.awaitExists(this.getSelector('downloadsPage'));
        return driver.awaitIsNotVisible(this.getSelector('loadingSpinner'), 30000)
    }

    clickToDownload(product, url) {
        let downloadBtn;
        if (product.includes('Container Development Kit')) {
            downloadBtn = browser.element(`//*[@id='downloads']//rhdp-downloads-all-item[2]//a[@href='${url}']`);
        } else if (product.includes('Development Suite')) {
            downloadBtn = browser.element(`//*[@id='downloads']//rhdp-downloads-all-item[3]//a[@href='${url}']`);
        } else {
            downloadBtn = browser.element(`//*[@id='downloads']//a[@href='${url}']`);
        }
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
