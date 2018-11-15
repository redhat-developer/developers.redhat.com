const BrowserManager = require('./browsers/BrowserManager');
const commandlineArgs = require('minimist')(process.argv.slice(2));

if (typeof commandlineArgs['testType'] === 'undefined') {
    testType = 'export'
} else {
    testType = commandlineArgs['testType'];
    if (testType === 'drupal') {
        // user must set log in creds
        if (typeof commandlineArgs['user'] === 'undefined') {
            throw new Error('drupal admin user name and password must be set, for example; npm run e2e -- --testType=drupal --user=foo --password=bar')
        }
        process.env.RHD_DRUPAL_ADMIN_USERNAME = commandlineArgs['user'];
        process.env.RHD_DRUPAL_ADMIN_PASSWORD = commandlineArgs['password']
    }
}

if (testType === 'drupal') {
    exclude = 'export'
} else {
    exclude = 'drupal'
}

typeof process.env.RHD_JS_DRIVER === 'undefined' ? browser = 'chrome' : browser = process.env.RHD_JS_DRIVER;
browserCaps = BrowserManager.createBrowser(browser);

if (typeof commandlineArgs['base-url'] === 'undefined') {
    process.env.RHD_BASE_URL = 'http://docker:8888'
} else {
    if (commandlineArgs['base-url'].includes('developers-pr') && testType === 'drupal') {
        let parsedUrl = require('url').parse(commandlineArgs['base-url']);
        let prNumber = parseInt(parsedUrl.pathname.split('/')[2]);
        process.env.RHD_BASE_URL = `http://rhdp-jenkins-slave.lab4.eng.bos.redhat.com:${(35000 + prNumber)}`;
    } else {
        process.env.RHD_BASE_URL = commandlineArgs['base-url']
    }
}

exports.config = {

    services: ['selenium-standalone'],

    maxInstances: 5,

    capabilities: [browserCaps],

    specs: `specs/${testType}/*.js`,

    exclude: [`specs/${exclude}/*.js`, `specs/support/**/*.js`],

    sync: true,

    deprecationWarnings: false,

    logLevel: 'silent',

    coloredLogs: true,

    baseUrl: process.env.RHD_BASE_URL,

    waitforTimeout: 15000,

    connectionRetryTimeout: 90000,

    connectionRetryCount: 3,

    framework: 'mocha',

    reporters: ['dot'],

    screenshotPath: 'screenshots',

    mochaOpts: {
        compilers: ['js:babel-register'],
        ui: 'bdd',
        timeout: 90000,
        tags: 'not:stage'
    },

    before: function () {
        const chai = require('chai');
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();

        const path = require('path');
        global.downloadDir = path.resolve('tmp_downloads');

        const log4js = require('log4js');
        global.logger = log4js.getLogger();
        global.logger.level = 'debug';

        process.env.RHD_BASE_URL = this.baseUrl;
    },
};
