"use strict";
const fs = require('fs-extra');
const path = require('path');
const FirefoxProfile = require('firefox-profile');

class BrowserManager {


    createBrowser(browser) {
        if (browser === 'chrome') {
            return this.chromeBrowser('desktop');
        } else if (browser === 'firefox') {
            return this.firefoxBrowser();
        } else if (browser.indexOf('bs_') > -1) {
            return this.browserstackBrowser(browser);
        } else {
            // browser was not listed, must be mobile device
            // Check that the device being used for emulation is supported by chrome
            let capability = require('../browsers/chromium_devices.json')[browser];
            let device = capability['name'];
            return this.chromeBrowser(device)
        }
    }

    firefoxBrowser() {
        console.log('e2e tests running using Firefox browser');
        const myProfile = new FirefoxProfile();
        myProfile.setPreference("general.useragent.override", "Red Hat Developers Testing");

        return {
            browserName: 'firefox',
            firefox_profile: myProfile,
            acceptInsecureCerts: true,
        }
    }

    chromeBrowser(browser) {
        let pathToChromeDownloads = path.resolve('tmp_downloads');
        if (!fs.existsSync(pathToChromeDownloads)) {
            fs.mkdirSync(pathToChromeDownloads);
        }

        let caps;
        if (browser === 'desktop') {
            console.log(`e2e tests running using Chrome browser`);
            caps = {
                browserName: 'chrome',
                acceptInsecureCerts: true,

                chromeOptions: {
                    args: ['start-fullscreen', 'disable-web-security'],
                    prefs: {
                        "download": {
                            "default_directory": pathToChromeDownloads,
                            "prompt_for_download": false
                        },
                        profile: {
                            "default_content_setting_values": {"automatic_downloads": 1}
                        }
                    }
                }
            }
        } else {
            console.log(`e2e tests running using a Chrome ${browser} emulated browser`);
            caps = {
                browserName: 'chrome',
                acceptInsecureCerts: true,
                chromeOptions: {
                    mobileEmulation: {deviceName: browser},
                    args: ['disable-web-security'],
                    prefs: {
                        "download": {
                            "default_directory": pathToChromeDownloads,
                            "prompt_for_download": false
                        },
                        profile: {
                            "default_content_setting_values": {"automatic_downloads": 1}
                        },
                    }
                }
            }
        }
        return caps;
    }

    browserstackBrowser(browser) {
        let browserstackBrowser = require("../browsers/remote_browsers.json");
        let browserstackBrowserCaps = browserstackBrowser[browser];
        console.log(`e2e tests running via Browserstack using ${browser} browser`);
        return {
            'project': `RHDP e2e tests: ${browserstackBrowserCaps['browserName']}`,
            'browserstack.local': true,
            'acceptSslCerts': 'true',
            'os': browserstackBrowserCaps['os'],
            'os_version': browserstackBrowserCaps['os_version'],
            'browser_version': browserstackBrowserCaps['browser_version'],
            'platform': browserstackBrowserCaps['platform'],
            'device': browserstackBrowserCaps['device'],
            'browserstack.debug': true,
            'javascriptEnabled': true,
            'acceptInsecureCerts': true
        };
    }
}

module
    .exports = new BrowserManager;
