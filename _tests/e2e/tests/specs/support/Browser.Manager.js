/* eslint-disable quote-props */
const fs = require('fs-extra');
const path = require('path');

class Browser {
    constructor(browser) {
        this.browser = browser;
    }

    create() {
        switch (this.browser) {
            case 'chrome':
                return this.chrome();
            case 'firefox':
                return this.firefox();
            default:
                return this.emulatedDevice();
        }
    }

    chrome() {
        const pathToChromeDownloads = path.resolve('tmp_downloads');
        if (!fs.existsSync(pathToChromeDownloads)) {
            fs.mkdirSync(pathToChromeDownloads);
        }

        const chromeArgs = [
            '--start-maximized',
            '--headless',
            '--disable-gpu',
            '--no-sandbox',
            '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
            '--remote-debugging-port=3434',
          ];

        return {
            "browserName": 'chrome',
            "maxInstances": 5,
            'goog:chromeOptions': {
                args: chromeArgs,
                useAutomationExtension: false,
                prefs: {
                    "safebrowsing.enabled": false,
                    "safebrowsing.disable_download_protection": true,
                    "download": {
                        "default_directory": pathToChromeDownloads,
                        "prompt_for_download": false,
                    },
                    profile: {
                        "default_content_setting_values": {"automatic_downloads": 1},
                    },
                },
            },
        };
    }

    firefox() {
        const ffArgs = [];
        return {
            "browserName": 'firefox',
            "maxInstances": 5,
            "moz:firefoxOptions": {
                args: ffArgs,
            },
        };
    }

    emulatedDevice() {
        const chromeArgs = ['--headless', '--no-sandbox', '--incognito', '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'];
        return {
            browserName: 'chrome',
            acceptInsecureCerts: true,
            'goog:chromeOptions': {
                mobileEmulation: {deviceName: 'iPhone X'},
                args: chromeArgs,
            },
        };
    }

    browserstackBrowser(browser) {
        const browserstackBrowser = require('../support/utils/remote_browsers.json');
        const browserstackBrowserCaps = browserstackBrowser[browser];
        return {
            'project': `RHDP e2e tests: ${browserstackBrowserCaps.browserName}`,
            'browserstack.local': true,
            'acceptSslCerts': 'true',
            'os': browserstackBrowserCaps.os,
            'os_version': browserstackBrowserCaps.os_version,
            'browser_version': browserstackBrowserCaps.browser_version,
            'platform': browserstackBrowserCaps.platform,
            'device': browserstackBrowserCaps.device,
            'browserstack.debug': true,
            'javascriptEnabled': true,
            'acceptInsecureCerts': true,
        };
    }
}

module.exports = Browser;
