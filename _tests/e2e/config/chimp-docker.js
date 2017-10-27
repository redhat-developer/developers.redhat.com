const fs = require('fs-extra');
const path = require('path');

function checkDirectorySync(directory) {
    try {
        fs.statSync(directory);
    } catch(e) {
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

if (process.env.RHD_VERBOSE_OUTPUT) {
    logLevel = 'verbose';
} else {
    logLevel = 'commands';
}

checkDirectorySync(path.resolve('report'));

if (typeof process.env.RHD_TEST_PROFILE !== 'undefined') {
    testProfile = process.env.RHD_TEST_PROFILE
} else {
    testProfile = 'desktop';
}

if (process.env.RHD_JS_DRIVER === 'undefined') {
    process.env.RHD_JS_DRIVER = 'chrome';
}
const BrowserManager = require('./BrowserManager');
const browserCaps = BrowserManager.createBrowser(process.env.RHD_JS_DRIVER);

if (process.env.RHD_CHIMP_TAGS) {
    cucumberTags = process.env.RHD_CHIMP_TAGS;
} else {
    cucumberTags = '~@ignore'
}

module.exports = {

    host: process.env.NODE_SELENIUM_HOST,
    port: 4444,
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
    timeout: 10000,

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
    launchReport: false

};
