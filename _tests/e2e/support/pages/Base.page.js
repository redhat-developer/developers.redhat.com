class BasePage {
    constructor({
                    path = '/',
                    selector
                } = {}) {
        this.urlBase = process.env.RHD_BASE_URL;
        this.path = path;
        this.selector = selector;
        this.wdioTimeout = 30000
    }

    open() {
        const openUrl = `${this.urlBase}${this.path}`;
        browser.url(openUrl);

        if (this.selector) {
            browser.waitForVisible(this.selector);
        }
    }

    waitForTitle(title) {
        browser.waitUntil(function () {
            return browser.getTitle().indexOf(title) > -1
        }, 30000);
    }

    type(locator, input) {
        this.awaitElement(locator);
        this.scrollIntoView(locator);
        locator.setValue(input)
    }

    clickOn(locator) {
        this.awaitElement(locator);
        this.scrollIntoView(locator);
        if (typeof locator === 'string') {
            return browser.click(locator)
        } else {
            return locator.click()
        }
    }

    isDisplayed(locator) {
        let visibility;

        if (typeof locator === 'string') {
            visibility = browser.isVisible(locator);
        } else {
            visibility = locator.isVisible();
        }
        return visibility
    }

    textOf(locator) {
        this.awaitElement(locator);
        this.scrollIntoView(locator);
        let text;
        if (typeof locator === 'string') {
            text = browser.getText(locator)
        } else {
            text = locator.getText()
        }
        return text;
    }

    scrollIntoView(locator) {
        let location;
        if (typeof locator === 'string') {
            location = browser.getLocationInView(locator);
            browser.scroll(location['x'], location['y'])
        } else {
            location = locator.getLocationInView();
            locator.scroll(location['x'], location['y']);
        }
    }

    hasAlert() {
        let hasAlert;
        try {
            browser.alertText();
            hasAlert = true
        } catch (e) {
            hasAlert = false
        }
        return hasAlert
    }

    /**
     * @param locator
     * @param negate: defaults to null which will wait until locator is visible,
     * passing false waits for element to not be visible
     */
    awaitElement(locator, negate = false) {
        if (typeof locator === 'string') {
            browser.waitForVisible(locator, this.wdioTimeout, negate)
        } else {
            locator.waitForVisible(this.wdioTimeout, negate)
        }
    }

    /**
     * @private
     */
    _highlightElement(locator) {
        let selector = locator.selector;
        browser.execute(function (selector) {
            let el = document.querySelector(selector);
            el.setAttribute('style', 'background-color: yellow;');
        }, selector);
    }

}

export {
    BasePage
};
