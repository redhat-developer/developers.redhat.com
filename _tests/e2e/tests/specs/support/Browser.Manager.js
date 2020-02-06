/* eslint-disable quote-props */
const fs = require('fs-extra');
const path = require('path');

class Browser {
    constructor(browser, headlessMode) {
        this.browser = browser;
        this.headlessMode = headlessMode;
    }

    create() {
        switch (this.browser) {
            case 'chrome':
                return this.chrome(this.headlessMode);
            case 'firefox':
                return this.firefox(this.headlessMode);
            default:
                return this.emulatedDevice(this.headlessMode);
        }
    }

    chrome(browser, isHeadless) {
        const pathToChromeDownloads = path.resolve('tmp_downloads');
        if (!fs.existsSync(pathToChromeDownloads)) {
            fs.mkdirSync(pathToChromeDownloads);
        }

        const chromeArgs = ['--disable-gpu', '--start-maximized', 'disable-extensions', '--disable-infobars',
            '--disable-dev-shm-usage', 'disable-web-security', 'user-agent=Red Hat Developers Testing'];
        if (isHeadless) {
            chromeArgs.push('--headless');
        }

        return {
            "browserName": 'chrome',
            "maxInstances": 5,
            'goog:chromeOptions': {
                args: chromeArgs,
                useAutomationExtension: false,
                prefs: {
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
        if (this.headlessMode) {
            ffArgs.push('--headless');
        }
        return {
            "browserName": 'firefox',
            "maxInstances": 5,
            "moz:firefoxOptions": {
                args: ffArgs,
            },
        };
    }

    emulatedDevice(isHeadless) {
        const chromeArgs = ['--disable-gpu', 'disable-extensions', '--disable-infobars',
            '--disable-dev-shm-usage', 'disable-web-security', 'user-agent=Red Hat Developers Testing'];
        if (isHeadless) {
            chromeArgs.push('--headless');
        }
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
