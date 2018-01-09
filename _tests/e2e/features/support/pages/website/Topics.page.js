import {driver} from "../../../../config/browsers/DriverHelper";
import {BasePage} from "../Base.page";

class TopicsPage extends BasePage {

    constructor(topic) {
        super({
            path: `/topics/${topic}/`,
            selector: `.topics${topic}`.toLowerCase(),
        });

        this.addSelectors({
            loadingSpinner: '.loading',
            topicsHeader: '.topics-header',
            tertiaryPromo: '.tertiary-promo',
            whiteCards: '#topic-resources > ul > a > li'
        });

    }

    awaitTopicsPage() {
        driver.awaitExists(this.getSelector('topicsHeader'));
        if (driver.isDisplayed(this.getSelector('loadingSpinner'))) {
            return driver.awaitIsNotVisible(this.getSelector('loadingSpinner'))
        }
    }

    getTertiaryCards() {
        return driver.elements(this.getSelector('tertiaryPromo'));
    }

    getWhiteCards() {
        return driver.elements(this.getSelector('whiteCards'));
    }

}

export {
    TopicsPage
};
