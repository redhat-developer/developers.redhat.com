export class PageExtension {

    visit(url) {
        try {
            return browser.url(url);
        } catch (err) {
            if (err && err.message.indexOf('stale element reference') >= 0) {
                return browser.url(url);
            }
        }
    }

    enter() {
        return this.key("\uE007");
    }

    pause(timeout = 1000) {
        browser.pause(timeout);
    }

    waitForPageTitle(title, timeout = 10000) {
        browser.waitUntil(function () {
            return browser.getTitle().indexOf(title) > -1;
        }, timeout, `Timed out after ${timeout} seconds waiting for page title to contain ${title}`);
    }

    title() {
        return browser.getTitle();
    }

    waitForUrlContaining(string, timeout = 10000) {
        browser.waitUntil(function () {
            return browser.getUrl().indexOf(string) > -1
        }, timeout, `Timed out after ${timeout} seconds waiting for url to contain ${string}`);
    }

    waitForSelectorContainingText(selector, string, timeout = 10000) {
        browser.waitUntil(function () {
            return browser.getText(selector).indexOf(string) > -1;
        }, timeout, `Timed out after ${timeout} seconds waiting for selector to contain ${string}`);
    }

    element(selector) {
        let element = browser.element(selector);
        this.awaitExists(element);
        return element;
    }

    elements(selector) {
        let elements = browser.elements(selector);
        this.awaitExists(elements[0]);
        return elements;
    }

    displayed(selector) {
        this.awaitExists(selector);
        if (typeof selector === 'string') {
            return browser.isVisible(selector);
        } else {
            return selector.isVisible();
        }
    }

    awaitIsVisible(selector, timeout = 10000) {
        if (typeof selector === 'string') {
            browser.waitForVisible(selector, timeout);
            return true;
        } else {
            return selector.waitForVisible(timeout);
        }
    }

    awaitIsNotVisible(selector, timeout = 10000) {
        if (typeof selector === 'string') {
            return browser.waitForVisible(selector, timeout, true);
        } else {
            return selector.waitForVisible(timeout, true);
        }
    }

    type(input, selector) {
        this.awaitExists(selector);
        if (typeof selector === 'string') {
            return browser.setValue(selector, input);
        } else {
            return selector.setValue(input);
        }
    }

    click(selector) {
        this.awaitExists(selector);
        if (typeof selector === 'string') {
            return browser.click(selector);
        } else {
            return selector.click();
        }
    }

    getValue(selector) {
        if (typeof selector === 'string') {
            return browser.getValue(selector);

        } else {
            return selector.getValue();
        }
    }

    selectByValue(selector, value) {
        this.awaitExists(selector);
        if (typeof selector === 'string') {
            browser.selectByValue(selector, value);
        } else {
            return selector.selectByValue(value);
        }
    }

    textOf(selector) {
        let text;
        this.awaitExists(selector);
        let i = 0;
        do {
            if (typeof selector === 'string') {
                text = browser.getText(selector);
            } else {
                text = selector.getText();
            }
            i++;
        }
        while (text === '' || i < 30);
        return text;
    }

    hasAlert() {
        let hasAlert;
        try {
            browser.alertText();
            hasAlert = true;
        } catch (e) {
            hasAlert = false;
        }
        return hasAlert;
    }

    key(key) {
        return browser.keys(key);
    }

    awaitExists(selector, timeout = 10000) {
        try {
            if (typeof selector === 'string') {
                return browser.waitForExist(selector, timeout);
            } else {
                return selector.waitForExist(timeout);
            }
        } catch (e) {
            return false;
        }
    }

    source() {
        return browser.getSource();
    }
}
