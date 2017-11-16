import {driver} from "../../config/DriverHelper"

class BasePage {
    constructor({
                    path = '/',
                    selector
                } = {}) {
        this.urlBase = process.env.RHD_BASE_URL;
        this.path = path;
        this.selector = selector;
        this.selectors = {};
    }

    open() {
        const openUrl = `${this.urlBase}${this.path}`;
        driver.visit(openUrl);

        if (this.selector) {
            driver.awaitIsVisible(this.selector);
        }
    }

    addSelectors(selectors) {
        this.selectors = Object.assign(this.selectors, selectors);
    }

    getSelector(selectorName) {
        if (!this.selectors[selectorName]) {
            return '';
        }
        let selector = '';
        selector += this.selectors[selectorName];
        return selector.trim();
    }

}

export {
    BasePage
};
