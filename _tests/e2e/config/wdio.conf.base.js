const BrowserManager = require('./browsers/BrowserManager');
const path = require('path');


if (typeof process.env.RHD_TEST_PROFILE === 'undefined') {
    testProfile = 'desktop';
} else {
    if (process.env.RHD_TEST_PROFILE === 'mobile') {
        testProfile = 'mobile'
    } else {
        testProfile = 'desktop'
    }
}

typeof process.env.RHD_JS_DRIVER === 'undefined' ? browser = 'chrome' : browser = process.env.RHD_JS_DRIVER;
browserCaps = BrowserManager.createBrowser(browser);

if (process.env.RHD_TEST_CONFIG === 'docker') {
    nodeModulePath = '/home/e2e/';
} else {
    nodeModulePath = path.resolve(process.cwd());
}

if (process.env.PULL_REQUEST_ID) {
    let port = 35000 + parseInt(process.env.PULL_REQUEST_ID);
    rhdBaseUrl = `${process.env.RHD_BASE_URL}:${port}`;
}

exports.config = {

    baseUrl: rhdBaseUrl,

    specs: 'specs/*.js',

    sync: true,

    deprecationWarnings: false,

    logLevel: 'silent',

    coloredLogs: true,

    waitforTimeout: 15000,

    connectionRetryTimeout: 95000,

    connectionRetryCount: 3,

    framework: 'mocha',

    reporters: ['dot', 'mochawesome'],

    screenshotPath: 'screenshots',

    mochawesomeOpts: {
        includeScreenshots: true,
        screenshotUseRelativePath: true
    },

    mochaOpts: {
        compilers: ['js:babel-register'],
        ui: 'bdd',
        timeout: 180000
    },

    reporterOptions: {
        outputDir: `./report/${testProfile}-results`,
        mochawesome_filename: 'results.json',
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

        process.env.RHD_BASE_URL = this.baseUrl

    },

    beforeSuite: function (suite) {
        let fs = require("fs-extra");
        fs.ensureDirSync(`./report/${testProfile}-results`);
    },

    onComplete: function (exitCode) {
        try {
            const {execSync} = require('child_process');
            execSync(`marge --reportDir report/${testProfile}-results report/${testProfile}-results/results.json  && cp -r screenshots report/${testProfile}-results/screenshots`);
        } catch (error) {
            console.log(error)
        }
    }
};
