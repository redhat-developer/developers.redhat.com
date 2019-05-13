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

    awaitHelloWorldPage(productCode) {
        return Driver.waitForUrlContaining(`${config.baseUrl}/products/${productCode}/hello-world/`);
    }

    awaitDownloadThankYou() {
        return Driver.awaitIsDisplayed(this.downloadThankYou);
    }
}

export default new ProductOverview;
