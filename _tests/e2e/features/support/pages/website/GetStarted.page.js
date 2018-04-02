import {BasePage} from '../Base.page';
import {driver} from "../../../../config/browsers/DriverHelper";

class GetStartedPage extends BasePage {

    constructor(productCode) {
        super();
        this.addSelectors({
            downloadThankYou: '#downloadthankyou'
        });
        this.productCode = productCode
    }

    awaitGetStartedPage() {
        return driver.waitForUrlContaining(`/products/${this.productCode}/hello-world/`, 30000);
    }

    awaitDownloadThankYou(downloadThankYouMsg) {
        this.awaitGetStartedPage();
        return driver.waitForSelectorContainingText(this.getSelector('downloadThankYou'), downloadThankYouMsg, 30000);
    }
}

export {
    GetStartedPage
};
