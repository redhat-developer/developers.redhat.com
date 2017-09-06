class BrowserManager {

    constructor(browser) {
        this.browser = browser
    }

    createBrowser() {
        let driver;
        if (this.browser === 'chrome') {
            driver = this._chromeBrowser('desktop');
        } else if (this.browser === 'headless_chrome') {
            driver = this._chromeBrowser('headless');
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
        if (browserType === 'headless') {
            console.log(`e2e tests running using ${browserType} Chrome browser`);
            return {
                browserName: 'chrome',
                chromeOptions: {
                    args: ['--headless', '--disable-gpu', '--window-size=1280,800'],
                    binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
                },
                acceptInsecureCerts: true
            }
        } else if (browserType === 'desktop') {
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