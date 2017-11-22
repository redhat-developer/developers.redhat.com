import {BasePage} from '../Base.page';

class GetStartedPage extends BasePage {

    waitForGetStartedPage(productID) {
        let pageId = browser.element(`.products${productID}hello-world`.toString());
        let thankYouSelector = browser.element('#downloadthankyou');
        this.awaitElement(pageId);
        return this.awaitElement(thankYouSelector)
    }

}

const getStartedPage = new GetStartedPage();

export {
    getStartedPage
};

