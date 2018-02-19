import {driver} from "../../../../config/browsers/DriverHelper";
import {BasePage} from "../Base.page";

class TopicsPage extends BasePage {

    constructor(topic) {
        super({
            path: `/topics/${topic}/`,
            selector: '.page-topics-containers'
        });

        this.addSelectors({
            topicsHeader: '.topics-header',
            topicResources: 'topic-resources',
            tertiaryPromo: '.tertiary-promo',
            whiteCards: '#topic-resources > ul > a > li'
        });

    }

    awaitTopicsPage() {
        driver.awaitExists(this.getSelector('topicResources'), 30000);
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
