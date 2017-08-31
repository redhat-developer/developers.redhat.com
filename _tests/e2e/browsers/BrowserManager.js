const path = require('path');
const fs = require('fs');

class BrowserManager {

    constructor(browser, maxInstances) {
        this.browser = browser;
        this.maxInstances = maxInstances
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
            maxInstances: this.maxInstances,
            browserName: 'firefox',
            acceptInsecureCerts: true,
        }
    }

    _chromeBrowser(browserType) {
        if (browserType === 'desktop') {
            console.log(`e2e tests running using ${browserType} Chrome browser`);
            return {
                maxInstances: this.maxInstances,
                browserName: 'chrome',
                acceptInsecureCerts: true,
                chromeOptions: {
                    prefs: {'download.default_directory': path.resolve('tmp/chromeDownloads')}
                }
            }
        } else {
            console.log(`e2e tests running using ${browserType} emulated Chrome browser`);
            return {
                maxInstances: this.maxInstances,
                browserName: 'chrome',
                acceptInsecureCerts: true,
                chromeOptions: {mobileEmulation: {deviceName: browserType}}
            }
        }
    }
}

module.exports = BrowserManager;
