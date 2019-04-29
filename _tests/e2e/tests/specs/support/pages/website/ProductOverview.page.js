const config = require('../../../../config/wdio.conf.base').config;
import Page from '../Page';
import Driver from '../../utils/Driver.Extension';

class ProductOverview extends Page {
    get downloadBtn() {return $('//rhdp-os-download/div/a');}
    get downloadThankYou() {return $('#downloadthankyou');}

    open(productCode, tab) {
        super.open(`/products/${productCode}/${tab}`.toString());
        return this;
    }

    download() {
        return Driver.click(this.downloadBtn);
    }

    awaitDownload(productCode) {
        return this.awaitHelloWorldPage(productCode) && this.awaitDownloadThankYou();
    }

    awaitHelloWorldPage(productCode) {
        return Driver.waitForUrlContaining(`${config.baseUrl}/products/${productCode}/hello-world/`, 30000);
    }

    awaitDownloadThankYou() {
        return Driver.awaitIsDisplayed(this.downloadThankYou, 30000);
    }
}

export default new ProductOverview;
