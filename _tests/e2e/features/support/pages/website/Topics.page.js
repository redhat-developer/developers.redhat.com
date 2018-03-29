import {driver} from "../../../../config/browsers/DriverHelper";
import {BasePage} from "../Base.page";

class TopicsPage extends BasePage {

    constructor(topic) {
        super({
            path: `/topics/${topic}/`,
            selector: `.page-topics-${topic}`
        });

        this.addSelectors({
            topicsHeader: '.topics-header',
            topicResources: '#topic-resources',
            tertiaryPromo: '.tertiary-promo',
            whiteCards: '#topic-resources > ul > a > li'
        });

    }

    awaitTopicsPage() {
        browser.waitUntil(function () {
            let resultCount = browser.execute(function () {
                return document.querySelectorAll('#topic-resources > ul > a > li').length;
            });
            return parseInt(resultCount.value) >= 12;
        }, 30000, `Topics page was still loading after 30 seconds`);
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
