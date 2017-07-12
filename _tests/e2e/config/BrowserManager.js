"use strict";
class BrowserManager {

    createBrowser(browser) {
        if (browser === 'chrome') {
            return this.chromeBrowser('desktop');
        } else if (browser === 'headless_chrome') {
            return this.chromeBrowser('headless');
        } else if (browser === 'firefox') {
            console.log('e2e tests running using firefox browser');
            return {
                browserName: 'firefox',
                "acceptInsecureCerts": true,
            }
        } else {
            return this.chromeBrowser(browser);
        }
    }

    chromeBrowser(browser) {
        if (browser === 'headless') {
            console.log(`e2e tests running using ${browser} Chrome browser`);
            return {
                browserName: 'chrome',
                chromeOptions: {
                    args: ['--headless', '--disable-gpu', '--window-size=1280,800'],
                    binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
                },
                "acceptInsecureCerts": true
            }
        } else if (browser === 'desktop') {
            console.log(`e2e tests running using Chrome ${browser} browser`);
            return {
                browserName: 'chrome',
                "acceptInsecureCerts": true,
            }
        } else {
            console.log(`e2e tests running using a Chrome ${browser} emulated browser`);
            return {
                browserName: 'chrome',
                "acceptInsecureCerts": true,
                chromeOptions: {mobileEmulation: {deviceName: browser}}
            }
        }
    }
}

module.exports = new BrowserManager;
