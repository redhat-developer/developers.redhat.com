import {BasePage} from "../Base.page";
import {driver} from "../../../../config/browsers/DriverHelper";

class HomePage extends BasePage {
    constructor() {
        super({
            path: '/',
            selector: '.homepage-resources'
        });
    }

    waitForResourcesLoaded() {
        driver.awaitIsVisible('.homepage-resources-latest', 30000)
    }
}

const homePage = new HomePage();

export {
    homePage
};
