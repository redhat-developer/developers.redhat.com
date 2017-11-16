const fs = require('fs-extra');
const path = require('path');

function checkDirectorySync(directory) {
    try {
        fs.statSync(directory);
    } catch (e) {
        fs.mkdirSync(directory);
    }
}

if (typeof process.env.RHD_BASE_URL !== 'undefined') {
    baseUrl = process.env.RHD_BASE_URL
} else {
    process.env.RHD_BASE_URL = 'https://developers.stage.redhat.com';
    console.log('No base url set, defaulting to staging');
    baseUrl = process.env.RHD_BASE_URL
}

if (process.env.RHD_VERBOSE_OUTPUT) {
    logLevel = 'verbose';
} else {
    logLevel = 'silent';
}

checkDirectorySync(path.resolve('report'));

if (typeof process.env.RHD_TEST_PROFILE !== 'undefined') {
    testProfile = process.env.RHD_TEST_PROFILE
} else {
    testProfile = 'desktop';
}

if (typeof process.env.RHD_JS_DRIVER === 'undefined') {
    process.env.RHD_JS_DRIVER = 'chrome';
}

const BrowserManager = require('./BrowserManager.js');

if (process.env.RHD_JS_DRIVER === 'chrome') {
    browserCaps = BrowserManager.createBrowser('chrome');
} else {
    // Check that the device being used for emulation is supported by chrome
    capability = require('./chromium_devices.json')[process.env.RHD_JS_DRIVER];
    let device = capability['device']['name'];
    browserCaps = BrowserManager.createBrowser(device.toString());
}

if (process.env.RHD_CHIMP_TAGS) {
    cucumberTags = process.env.RHD_CHIMP_TAGS;
} else {
    cucumberTags = '~@ignore'
}

module.exports = {

    browser: browserCaps['browserName'],

    // - - - - WEBDRIVER-IO  - - - -
    webdriverio: {
        browser: browserCaps['browserName'],
        desiredCapabilities: browserCaps,
        baseUrl: baseUrl,
        logLevel: logLevel,
        sync: true,
        coloredLogs: true,
        waitforTimeout: 15000,
        waitforInterval: 250,
        connectionRetryCount: 3,
    },

    // - - - - CHIMP SETTINGS - - - -
    chai: true,
    timeout: 6000,
    port: 4455,

    // - - - - CUCUMBER - - - -
    tags: [cucumberTags],
    jsonOutput: `./report/${testProfile}/cucumber-${testProfile}.json`,
    screenshotsOnError: true,
    screenshotsPath: `./report/${testProfile}/screenshots`,
    saveScreenshotsToDisk: true,
    saveScreenshotsToReport: true,

    // - - - - REPORTER - - - -
    theme: 'bootstrap',
    jsonFile: `./report/${testProfile}/cucumber-${testProfile}.json`,
    output: `./report/${testProfile}/cucumber-${testProfile}.html`,
    reportSuiteAsScenarios: true,
    launchReport: false,


    // - - - - SELENIUM-STANDALONE
    seleniumStandaloneOptions: {
        // check for more recent versions of selenium here:
        // http://selenium-release.storage.googleapis.com/index.html
        version: '3.0.1',
        baseURL: 'https://selenium-release.storage.googleapis.com',
        drivers: {
            chrome: {
                // check for more recent versions of chrome driver here:
                // http://chromedriver.storage.googleapis.com/index.html
                version: '2.30',
                arch: process.arch,
                baseURL: 'https://chromedriver.storage.googleapis.com'
            },
            ie: {
                // check for more recent versions of internet explorer driver here:
                // http://selenium-release.storage.googleapis.com/index.html
                version: '3.0.0',
                arch: 'ia32',
                baseURL: 'https://selenium-release.storage.googleapis.com'
            },
            firefox: {
                // check for more recent versions of gecko  driver here:
                // https://github.com/mozilla/geckodriver/releases
                version: '0.13.0',
                arch: process.arch,
                baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
            }
        }
    }
};
