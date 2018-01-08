import {BasePage} from '../Base.page';
import {driver} from "../../../../config/browsers/DriverHelper";

class GetStartedPage extends BasePage {

    constructor(productID) {
        super({
            selector: `.products${productID}hello-world`.toString(),
        });

        this.addSelectors({
            downloadThankYou: '#downloadthankyou',
        });
    }

    awaitGetStartedPage() {
        return driver.awaitExists(this.getSelector('downloadThankYou'), 60000);
    }

}

export {
    GetStartedPage
};
