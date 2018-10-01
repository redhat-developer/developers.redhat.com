const BrowserManager = require('./browsers/BrowserManager');

if (typeof process.env.RHD_JS_DRIVER === 'undefined') {
    process.env.RHD_JS_DRIVER = 'chrome'
}

if (typeof process.env.RHD_BASE_URL === 'undefined') {
    process.env.RHD_BASE_URL = 'http://docker:8888'
}

browserCaps = BrowserManager.createBrowser(process.env.RHD_JS_DRIVER);

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