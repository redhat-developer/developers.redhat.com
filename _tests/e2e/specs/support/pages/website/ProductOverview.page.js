import {Base} from '../Base.page'

export class ProductOverview extends Base {

    constructor(productCode, tab, productName) {
        super({
            path: `/products/${productCode}/${tab}`,
            pageTitle: `Red Hat Developer | ${productName}`,
        });

        this.productCode = productCode;
        this.productName = productName;

        this.addSelectors({
            downloadBtn: "//rhdp-os-download/div/a",
            downloadThankYou: '#downloadthankyou'
        });
    }

    download() {
        this.clickOn(this.getSelector('downloadBtn'))
    }

    awaitHelloWorldPage() {
        return this.waitForUrlContaining(`/products/${this.productCode}/hello-world/`, 30000);
    }

    awaitDownloadThankYou() {
        this.awaitHelloWorldPage();
        return this.awaitIsVisible(this.getSelector('downloadThankYou'), 30000);
    }
}
