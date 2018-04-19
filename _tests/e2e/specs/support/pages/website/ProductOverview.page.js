const BasePage = require('../Base.page');

class ProductOverviewPage extends BasePage {

    constructor(productCode, tab, productName) {
        super({
            path: `/products/${productCode}/${tab}`,
            pageTitle: `Red Hat Developer | ${productName}`,
            selector: '.products-content'
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

module.exports = ProductOverviewPage;