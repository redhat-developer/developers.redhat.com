import {BasePage} from '../Base.page';
import {driver} from "../../../../config/browsers/DriverHelper";

class GetStartedPage extends BasePage {

    constructor(productCode) {
        super();
        this.addSelectors({downloadThankYou: '#downloadthankyou',});
        this.productCode = productCode
    }

    awaitGetStartedPage() {
        driver.waitForUrlContaining(`/products/${this.productCode}/hello-world/`, 60000);
        return driver.awaitExists(this.getSelector('downloadThankYou'), 90000);
    }

}

export {
    GetStartedPage
};
