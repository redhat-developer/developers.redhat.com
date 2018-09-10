const BrowserManager = require('./browsers/BrowserManager');

browserCaps = BrowserManager.createBrowser('chrome');

if (typeof process.env.RHD_BASE_URL === 'undefined') {
    baseUrl = 'http://docker:8888'
} else {
    baseUrl = process.env.RHD_BASE_URL
}

exports.config = {

    services: ['selenium-standalone'],

    maxInstances: 5,

    capabilities: [browserCaps],

    specs: ['specs/**/*.js'],

    exclude: ['specs/support/**/*.js'],

    sync: true,

    deprecationWarnings: false,

    logLevel: 'silent',

    coloredLogs: true,

    baseUrl: baseUrl,

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
        /**
         * Setup the Chai assertion framework
         */
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