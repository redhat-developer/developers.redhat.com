const BrowserManager = require('./browsers/BrowserManager');
const commandlineArgs = require('minimist')(process.argv.slice(2));

typeof process.env.RHD_JS_DRIVER === 'undefined' ? browser = 'chrome' : browser = process.env.RHD_JS_DRIVER;
browserCaps = BrowserManager.createBrowser(browser);

if (typeof commandlineArgs['base-url'] === 'undefined') {
    process.env.RHD_DRUPAL_BASE_URL = 'http://docker:8888'
} else {
    process.env.RHD_DRUPAL_BASE_URL = commandlineArgs['base-url']
}

exports.config = {

    services: ['selenium-standalone'],

    maxInstances: 5,

    capabilities: [browserCaps],

    specs: `specs/*.js`,

    sync: true,

    deprecationWarnings: false,

    logLevel: 'silent',

    coloredLogs: true,

    baseUrl: process.env.RHD_DRUPAL_BASE_URL,

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

        process.env.RHD_DRUPAL_BASE_URL = this.baseUrl;
    },
};
