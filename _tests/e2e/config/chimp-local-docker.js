const fs = require('fs-extra');
const path = require('path');
const pathToChromeDownloads = path.resolve('tmp/chromeDownloads');
if (!fs.existsSync(pathToChromeDownloads)) {
    fs.mkdirSync(pathToChromeDownloads);
}

if (typeof process.env.RHD_BASE_URL !== 'undefined') {
    baseUrl = process.env.RHD_BASE_URL
} else {
    process.env.RHD_BASE_URL = 'https://developers.stage.redhat.com';
    console.log('No base url set, defaulting to staging');
    baseUrl = process.env.RHD_BASE_URL
}

if (process.env.RHD_BASE_URL.includes('pr.stage.redhat.com/pr')) {
    let parsedUrl = require('url').parse(process.env.RHD_BASE_URL);
    let getPullRequestNumber = parsedUrl.pathname.split('/')[2];
    process.env.RHD_DRUPAL_INSTANCE = `http://rhdp-jenkins-slave.lab4.eng.bos.redhat.com:${(35000) + (getPullRequestNumber - 0)}`;
    console.log(process.env.RHD_DRUPAL_INSTANCE)
} else if (process.env.RHD_BASE_URL === 'https://developers.stage.redhat.com') {
    process.env.RHD_DRUPAL_INSTANCE = 'http://rhdp-drupal.stage.redhat.com'
} else {
    process.env.RHD_DRUPAL_INSTANCE = 'http://rhdp-drupal.redhat.com'
}

if (process.env.RHD_VERBOSE_OUTPUT) {
    logLevel = 'verbose';
} else {
    logLevel = 'silent';
}

if (typeof process.env.RHD_TEST_PROFILE !== 'undefined') {
    testProfile = process.env.RHD_TEST_PROFILE
} else {
    testProfile = 'desktop';
}

const outputFolder = 'report';

if (typeof process.env.RHD_JS_DRIVER === 'undefined') {
    process.env.RHD_JS_DRIVER = 'chrome';
}

const BrowserManager = require('../config/browsers/BrowserManager');
const browserCaps = BrowserManager.createBrowser(process.env.RHD_JS_DRIVER);

if (typeof process.env.RHD_CHIMP_TAGS !== 'undefined') {
    tagsArray = process.env.RHD_CHIMP_TAGS.split(',');
    tagsArray[tagsArray.length] = '~@ignore';
    cucumberTags = tagsArray;
} else {
    cucumberTags = ['~@ignore', '~@mobile', '~@kc', '~dm']
}

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
        deprecationWarnings: false,
    },

    // - - - - CHIMP SETTINGS - - - -
    chai: true,
    timeout: 6000,

    // - - - - CUCUMBER SETTINGS - - - -
    path: 'features',
    format: 'pretty',
    tags: cucumberTags,
    jsonOutput: './' + outputFolder + `/cucumber-${testProfile}.json`,
    screenshotsOnError: true,
    screenshotsPath: './' + outputFolder + `${testProfile}-screenshots`,
    saveScreenshotsToDisk: true,
    saveScreenshotsToReport: true,

    // - - - - REPORTER SETTINGS - - - -
    reportPath: './' + outputFolder,
    theme: 'bootstrap',
    jsonFile: './' + outputFolder + `/cucumber-${testProfile}.json`,
    output: './' + outputFolder +  `/cucumber-${testProfile}.html`,
    reportSuiteAsScenarios: true,
    launchReport: false,

    // - - - - SELENIUM-STANDALONE
    seleniumStandaloneOptions: {
        // check for more recent versions of selenium here:
        // http://selenium-release.storage.googleapis.com/index.html
        version: '3.11.0',
        baseURL: 'https://selenium-release.storage.googleapis.com',
        drivers: {
            chrome: {
                // check for more recent versions of chrome driver here:
                // http://chromedriver.storage.googleapis.com/index.html
                version: '2.37',
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
};
