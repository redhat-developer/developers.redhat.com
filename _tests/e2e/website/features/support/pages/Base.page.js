class BasePage {
    open(path) {
        browser.url(path);
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