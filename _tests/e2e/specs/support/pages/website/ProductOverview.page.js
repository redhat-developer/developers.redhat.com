import {Page} from '../Page';

export class ProductOverview extends Page {

    constructor(productCode, tab, productName) {
        super({
            path: `/products/${productCode}/${tab}`,
            pageTitle: `Red Hat Developer | ${productName}`
        });

        this.productCode = productCode;
        this.productName = productName;

        this.addSelectors({
            downloadBtn: "//rhdp-os-download/div/a",
            downloadThankYou: '#downloadthankyou'
        });
    }

    download() {
        this.clickOn(this.getSelector('downloadBtn'));
    }

    awaitDownload() {
        return this.awaitHelloWorldPage() && this.awaitDownloadThankYou();
    }

    awaitHelloWorldPage() {
        return this.waitForUrlContaining(`/products/${this.productCode}/hello-world/`, 60000);
    }

    awaitDownloadThankYou() {
        return this.awaitIsVisible(this.getSelector('downloadThankYou'), 30000);
    }
}
