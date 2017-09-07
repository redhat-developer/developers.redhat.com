class BrowserManager {

    constructor(browser) {
        this.browser = browser
    }

    createBrowser() {
        let driver;
        if (this.browser === 'chrome') {
            driver = this._chromeBrowser('desktop');
        } else if (this.browser === 'firefox') {
            driver = this._firefox();
        } else {
            driver = this._chromeBrowser(this.browser);
        }
        return driver;
    }

    _firefox() {
        return {
            browserName: 'firefox',
            acceptInsecureCerts: true,
        }
    }

    _chromeBrowser(browserType) {
        if (browserType === 'desktop') {
            console.log(`e2e tests running using ${browserType} Chrome browser`);
            return {
                browserName: 'chrome',
                acceptInsecureCerts: true,
            }
        } else {
            console.log(`e2e tests running using ${browserType} emulated Chrome browser`);
            return {
                browserName: 'chrome',
                acceptInsecureCerts: true,
                chromeOptions: {mobileEmulation: {deviceName: browserType}}
            }
        }
    }
}

module.exports = BrowserManager;