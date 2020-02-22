import {DEFAULT_TIMEOUT} from '../utils/constants';

export default class Driver {
    static visit(url) {
        try {
            return browser.url(url);
        }
        catch (err) {
            if (err && err.message.indexOf('stale element reference') >= 0) {
                return browser.url(url);
            }
        }
    }

    static enter() {
        return this.key("\uE007");
    }

    static pause(timeout = DEFAULT_TIMEOUT) {
        browser.pause(timeout);
    }

    static title() {
        return browser.getTitle();
    }

    static waitForUrlContaining(string, timeout = DEFAULT_TIMEOUT) {
        browser.waitUntil(function () {
            return browser.getUrl().indexOf(string) > -1;
        }, timeout, `Timed out after ${timeout} seconds waiting for url to contain ${string}`);
    }

    static isVisible(selector) {
        return selector.isDisplayed();
    }

    static type(input, selector) {
        this.awaitIsDisplayed(selector);
        return selector.setValue(input);
    }

    static click(selector) {
        this.hideCookieOverlay();
        this.hideCookieBanner();
        this.awaitIsDisplayed(selector);
        return selector.click();
    }

    static getValue(selector) {
      return selector.getValue();
    }

    static displayElement(selector) {
      browser.execute(function (selector) {
          return selector.style.display = 'block';
      }, selector);
    }

    static selectByValue(selector, value) {
        this.awaitIsDisplayed(selector);
        return selector.selectByAttribute('value', value);
    }

    static textOf(selector) {
        this.awaitExists(selector);
        return selector.getText();
    }

    static key(key) {
        return browser.keys(key);
    }

    static getPageSource() {
        return browser.getPageSource();
    }

    static awaitExists(selector, timeout = DEFAULT_TIMEOUT) {
        return selector.waitForExist(timeout);
    }

    static awaitIsDisplayed(selector, timeout = DEFAULT_TIMEOUT, isShown = true) {
        return selector.waitForDisplayed(timeout, !isShown);
    }

    static getAdobeDdo() {
        return browser.execute(function () {
            // eslint-disable-next-line no-return-assign
            return window.digitalData;
        });
    }

    static hideCookieBanner() {
        if (this.isVisible($('#redhat-cookie-privacy-banner'))) {
            browser.execute(function () {
                // eslint-disable-next-line no-return-assign
                return document.getElementById('redhat-cookie-privacy-banner').style.display = 'none';
            });
        }
    }

    static hideCookieOverlay() {
        if (this.isVisible($('.truste_overlay'))) {
            browser.execute(function () {
                // eslint-disable-next-line no-return-assign
                return document.querySelector('.truste_overlay').style.display = 'none';
            });
        }
        if (this.isVisible($('.truste_box_overlay'))) {
            browser.execute(function () {
                // eslint-disable-next-line no-return-assign
                return document.querySelector('.truste_box_overlay').style.display = 'none';
            });
        }
    }

}

module.exports = Driver;
