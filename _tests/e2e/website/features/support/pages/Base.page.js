class BasePage {
    open(path) {
        browser.url(path);
        // Wait for document to be fully loaded.
        browser.waitUntil(
            () => {
                const state = browser.execute(function () {
                    return document.readyState;
                });
                return state.value === 'complete';
            },
            100000,
            `Timed out on page load for path ${path}`,
            500
        );
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

    _sleep(delay) {
        let start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }
}

module.exports = BasePage;