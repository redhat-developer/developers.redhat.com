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

let browserstackBrowser = require("./remote_browsers.json");
let browserstackBrowserCaps = browserstackBrowser[process.env.RHD_JS_DRIVER];

module.exports = {

    user: process.env.RHD_BS_AUTHKEY,
    key: process.env.RHD_BS_USERNAME,
    port: 80,
    host: "hub-cloud.browserstack.com",
    browser: browserCaps['browserName'],

    // - - - - WEBDRIVER-IO  - - - -
    webdriverio: {
        browser: browserCaps['browserName'],
        desiredCapabilities: [{
            'acceptSslCerts': 'true',
            project: 'RHD e2e Tests',
            browserName: browserstackBrowserCaps['browserName'],
            browser_version: browserstackBrowserCaps['browser_version'],
            os: browserstackBrowserCaps['os'],
            os_version: browserstackBrowserCaps['os_version'],
            resolution: browserstackBrowserCaps['resolution'],
            'browserstack.local': true
        }],
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
