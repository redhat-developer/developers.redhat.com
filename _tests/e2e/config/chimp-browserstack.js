const faker = require('faker');

if (typeof process.env.RHD_BASE_URL !== 'undefined') {
    baseUrl = process.env.RHD_BASE_URL
} else {
    process.env.RHD_BASE_URL = 'https://developers.stage.redhat.com';
    console.log('No base url set, defaulting to staging');
    baseUrl = process.env.RHD_BASE_URL
}

if (process.env.RHD_BASE_URL.includes('pr.stage.redhat.com/pr/')) {
    let parsedUrl = require('url').parse(process.env.RHD_BASE_URL);
    let getPullRequestNumber = parsedUrl.pathname.split('/')[2];
    process.env.RHD_DRUPAL_INSTANCE = `http://rhdp-jenkins-slave.lab4.eng.bos.redhat.com:${(35000) + (getPullRequestNumber - 0)}`;
    console.log(process.env.RHD_DRUPAL_INSTANCE)
} else if (process.env.RHD_BASE_URL === 'https://developers.stage.redhat.com') {
    process.env.RHD_DRUPAL_INSTANCE = 'http://developer-drupal.web.stage.ext.phx2.redhat.com'
} else {
    process.env.RHD_DRUPAL_INSTANCE = 'http://developer-drupal.web.prod.ext.phx2.redhat.com'
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
    process.env.RHD_JS_DRIVER = 'bs_chrome';
}

const seleniumStandaloneOptions = require('../config/browsers/selenium-standalone-defaults.json');
const browserstackBrowser = require("../config/browsers/remote_browsers.json");
const browserstackBrowserCaps = browserstackBrowser[process.env.RHD_JS_DRIVER];
const BrowserManager = require('../config/browsers/BrowserManager');
const browserCaps = BrowserManager.createBrowser(process.env.RHD_JS_DRIVER);

if (typeof process.env.RHD_CHIMP_TAGS !== 'undefined') {
    tagsArray = process.env.RHD_CHIMP_TAGS.split(',');
    tagsArray[tagsArray.length] = '~@ignore';
    tagsArray[tagsArray.length] = browserstackBrowserCaps['tag'];
    cucumberTags = tagsArray;
} else {
    cucumberTags = ['~@ignore', '~@kc', '~dm', browserstackBrowserCaps['tag']]
}

process.env.SESSION_ID = faker.random.number({'min': 100, 'max': 9000});

module.exports = {

    user: process.env.RHD_BS_USERNAME,
    key: process.env.RHD_BS_AUTHKEY,
    port: 80,
    host: "hub-cloud.browserstack.com",
    browser: browserstackBrowserCaps['browserName'],

    // - - - - WEBDRIVER-IO  - - - -
    webdriverio: {
        desiredCapabilities: browserCaps,
        baseUrl: baseUrl,
        logLevel: logLevel,
        sync: true,
        coloredLogs: true,
        waitforTimeout: 15000,
        waitforInterval: 250,
        connectionRetryCount: 3,
        deprecationWarnings: false
    },
    // - - - - CHIMP SETTINGS - - - -
    chai: true,
    timeout: 6000,

    // - - - - CUCUMBER SETTINGS - - - -
    path: 'features',
    format: 'pretty',
    tags: cucumberTags,
    jsonOutput: './' + outputFolder + `/${testProfile}/cucumber-${browserstackBrowserCaps['browserName']}.json`,
    screenshotsOnError: true,
    screenshotsPath: './' + outputFolder + `/${browserstackBrowserCaps['browserName']}-screenshots`,
    saveScreenshotsToDisk: true,
    saveScreenshotsToReport: true,

    // - - - - REPORTER SETTINGS - - - -
    reportPath: './' + outputFolder,
    theme: 'bootstrap',
    jsonFile: './' + outputFolder + `/${testProfile}/cucumber-${browserstackBrowserCaps['browserName']}.json`,
    output: './' + outputFolder + `/${testProfile}/cucumber-${browserstackBrowserCaps['browserName']}.html`,
    reportSuiteAsScenarios: true,
    launchReport: false,

    // - - - - SELENIUM-STANDALONE
    seleniumStandaloneOptions: {
        // check for more recent versions of selenium here:
        // http://selenium-release.storage.googleapis.com/index.html
        version: seleniumStandaloneOptions['selenium-standalone']['version'],
        baseURL: seleniumStandaloneOptions['selenium-standalone']['baseURL'],
        drivers: {
            chrome: {
                // check for more recent versions of chrome driver here:
                // http://chromedriver.storage.googleapis.com/index.html
                version: seleniumStandaloneOptions['chrome']['version'],
                arch: process.arch,
                baseURL: seleniumStandaloneOptions['chrome']['baseURL']
            },
            ie: {
                // check for more recent versions of internet explorer driver here:
                // http://selenium-release.storage.googleapis.com/index.html
                version: seleniumStandaloneOptions['ie']['version'],
                arch: 'ia32',
                baseURL: seleniumStandaloneOptions['ie']['baseURL']
            },
            firefox: {
                // check for more recent versions of gecko  driver here:
                // https://github.com/mozilla/geckodriver/releases
                version: seleniumStandaloneOptions['firefox']['version'],
                arch: process.arch,
                baseURL: seleniumStandaloneOptions['firefox']['baseURL']
            }
        }
    },
};
