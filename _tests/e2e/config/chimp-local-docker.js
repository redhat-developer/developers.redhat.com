/**
 * NOTE: To use this config ensure that you have a docker selenium chrome node running locally.
 * To start a local chrome node execute the following command:
 * `docker run -d --name selenium -p 5900:5900 -p 4444:4444 selenium/standalone-chrome-debug`
 */

const fs = require('fs-extra');
const path = require('path');
const faker = require('faker');

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

if (typeof process.env.RHD_BASE_URL.includes('pr')) {
    let parsedUrl = require('url').parse(process.env.RHD_BASE_URL);
    let getPullRequestNumber = parsedUrl.pathname.split('/')[2];
    process.env.RHD_DRUPAL_INSTANCE = `http://rhdp-jenkins-slave.lab4.eng.bos.redhat.com:${(35000) + (getPullRequestNumber - 0)}`;
    console.log(process.env.RHD_DRUPAL_INSTANCE)
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

if (process.env.RHD_JS_DRIVER === 'undefined') {
    process.env.RHD_JS_DRIVER = 'chrome';
}
const BrowserManager = require('../config/browsers/BrowserManager');
const browserCaps = BrowserManager.createBrowser(process.env.RHD_JS_DRIVER);

if (typeof process.env.RHD_CHIMP_TAGS !== 'undefined') {
    tagsArray = process.env.RHD_CHIMP_TAGS.split(',');
    tagsArray[tagsArray.length] = '~@ignore';
    cucumberTags = tagsArray;
} else {
    cucumberTags = ['~@ignore', '~@kc']
}

process.env.SESSION_ID = faker.random.number({'min': 100, 'max': 9000});

module.exports = {

    host: 'localhost',
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
    },

    // - - - - CHIMP SETTINGS - - - -
    chai: true,
    timeout: 6000,

    // - - - - CUCUMBER - - - -
    tags: cucumberTags,
    jsonOutput: `report/${testProfile}/cucumber-${testProfile}.json`,
    screenshotsOnError: true,
    screenshotsPath: `report/${testProfile}/screenshots`,
    saveScreenshotsToDisk: true,
    saveScreenshotsToReport: true,

    // - - - - REPORTER - - - -
    theme: 'bootstrap',
    jsonFile: `report/${testProfile}/cucumber-${testProfile}.json`,
    output: `report/${testProfile}/cucumber-${testProfile}.html`,
    reportSuiteAsScenarios: true,
    launchReport: false

};
