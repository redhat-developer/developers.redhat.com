class BasePage {
    open(path) {
        browser.url(path);
    }

    waitForTitle(title) {
        browser.waitUntil(function () {
            return browser.getTitle().indexOf(title) > -1
        }, 30000);
    }

    /**
     * Verifies whether or not there is a JS Alert present on the page
     */
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
}

module.exports = BasePage;