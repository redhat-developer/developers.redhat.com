import {DEFAULT_TIMEOUT} from '../utils/constants';

export default class Driver {
    static visit(url) {
        browser.url(url);
    }

    static enter() {
        this.key("\uE007");
    }

    static pause(timeout = DEFAULT_TIMEOUT) {
        browser.pause(timeout);
    }

    static title() {
        return browser.getTitle();
    }

    static waitForUrlContaining(string, timeout = DEFAULT_TIMEOUT) {
        browser.waitUntil(() => {
            const pageUrl = browser.getUrl();
            return pageUrl.indexOf(string) > -1;
          }, timeout);
    }

    static isVisible(selector) {
        return selector.isDisplayed();
    }

    static type(input, selector) {
        this.awaitIsDisplayed(selector);
        selector.setValue(input);
    }

    static click(selector) {
        this.hideCookieBanner();
        this.awaitIsDisplayed(selector);
        selector.click();
    }

    static getValue(selector) {
      return selector.getValue();
    }

    static selectByValue(selector, value) {
        this.awaitIsDisplayed(selector);
        selector.selectByAttribute('value', value);
    }

    static textOf(selector) {
        this.awaitIsDisplayed(selector);
        return selector.getText();
    }

    static key(key) {
        browser.keys(key);
    }

    static awaitExists(selector, timeout = DEFAULT_TIMEOUT) {
        selector.waitForExist(timeout);
    }

    static awaitIsDisplayed(selector, timeout = DEFAULT_TIMEOUT, isShown = true) {
        selector.waitForDisplayed(timeout, !isShown);
    }

    static hideCookieBanner() {
        if (this.isVisible($('#redhat-cookie-privacy-banner'))) {
            browser.execute(function() {
                // eslint-disable-next-line no-return-assign
                return document.getElementById('redhat-cookie-privacy-banner').style.display = 'none';
            });
        }
    }

    static allowDownloads() {
        browser.sendCommand('Page.setDownloadBehavior', {'behavior': 'allow', 'downloadPath': global.downloadDir});
    }

    static takeScreenShot() {
        browser.takeScreenshot();
    }
}

module.exports = Driver;
