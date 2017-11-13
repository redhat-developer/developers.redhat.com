const wdioTimeout = 6000;

class Driver {

    visit(url) {
        browser.url(url)
    }

    waitForTitle(title) {
        browser.waitUntil(function () {
            return browser.getTitle().indexOf(title) > -1
        }, wdioTimeout, `Timed out after ${wdioTimeout} seconds waiting for page title to contain ${title}`);
    }

    waitForUrlContaining(string) {
        browser.waitUntil(function () {
            return browser.getUrl().indexOf(string) > -1
        }, wdioTimeout, `Timed out after ${wdioTimeout} seconds waiting for url to contain ${string}`);
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

    isDisplayed(selector) {
        if (typeof selector === 'string') {
            return browser.isVisible(selector);
        } else {
            return selector.isVisible();
        }
    }

    awaitIsVisible(selector, timeout = wdioTimeout) {
        if (typeof selector === 'string') {
            return browser.waitForVisible(selector, timeout);
        } else {
            return selector.waitForVisible(timeout);
        }
    }

    awaitIsNotVisible(selector, timeout = wdioTimeout) {
        if (typeof selector === 'string') {
            return browser.waitForVisible(selector, true, timeout);
        } else {
            return selector.waitForVisible(true, timeout);
        }
    }

    type(selector, input) {
        this.awaitIsVisible(selector);
        this.scrollIntoView(selector);
        if (typeof selector === 'string') {
            return browser.setValue(selector, input)
        } else {
            return selector.setValue(input)
        }
    }

    clickOn(selector) {
        this.awaitExists(selector);
        this.scrollIntoView(selector);
        if (typeof selector === 'string') {
            return browser.click(selector)
        } else {
            return selector.click()
        }
    }

    isSelected(selector) {
        this.scrollIntoView(selector);
        if (typeof selector === 'string') {
            return browser.isSelected(selector);
        } else {
            return selector.isSelected()
        }
    }

    getValue(selector) {
        this.scrollIntoView(selector);
        if (typeof selector === 'string') {
            return browser.getValue(selector);

        } else {
            return selector.getValue()
        }
    }

    selectByValue(selector, value) {
        this.awaitExists(selector);
        this.scrollIntoView(selector);
        if (typeof selector === 'string') {
            browser.selectByValue(selector, value);
        } else {
            return selector.selectByValue(value)
        }
    }

    textOf(selector) {
        let text;
        this.awaitExists(selector);
        this.scrollIntoView(selector);
        let i = 0;
        do {
            if (typeof selector === 'string') {
                text = browser.getText(selector)
            } else {
                text = selector.getText()
            }
            i++;
        }
        while (i < 30 || text === '');
        return text;
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

    key(key) {
        return browser.keys(key)
    }

    scrollIntoView(selector) {
        let location;
        if (typeof selector === 'string') {
            location = browser.getLocationInView(selector);
            return browser.scroll(location['x'], location['y'])
        } else {
            location = selector.getLocationInView();
            return selector.scroll(location['x'], location['y']);
        }
    }

    awaitExists(selector) {
        try {
            if (typeof selector === 'string') {
                return browser.waitForExist(selector);
            } else {
                return selector.waitForExist();
            }
        } catch (e) {
            return false
        }
    }
}

const
    driver = new Driver();

export {
    driver
};
