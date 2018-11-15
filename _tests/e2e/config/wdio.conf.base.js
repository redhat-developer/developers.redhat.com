const BrowserManager = require('./browsers/BrowserManager');

if (typeof process.env.RHD_DRUPAL_ADMIN === 'undefined') {
    testType = 'export'
}

if (typeof process.env.RHD_TEST_PROFILE === 'undefined') {
    testProfile = 'desktop';
    testType = 'export';
} else {
    if (process.env.RHD_TEST_PROFILE === 'drupal') {
        testType = 'drupal';
        testProfile = 'drupal'
    } else {
        if (process.env.RHD_TEST_PROFILE === 'mobile') {
            testProfile = 'mobile'
        } else {
            testProfile = 'desktop'
        }
        testType = 'export';
    }
}

if (testType === 'drupal') {
    exclude = 'export'
} else {
    exclude = 'drupal'
}

typeof process.env.RHD_JS_DRIVER === 'undefined' ? browser = 'chrome' : browser = process.env.RHD_JS_DRIVER;
browserCaps = BrowserManager.createBrowser(browser);

if (typeof process.env.RHD_BASE_URL === 'undefined') {
    process.env.RHD_BASE_URL = 'http://docker:8888'
} else {
    if (process.env.RHD_BASE_URL.includes('developers-pr') && testType === 'drupal') {
        let parsedUrl = require('url').parse(process.env.RHD_BASE_URL);
        let prNumber = parseInt(parsedUrl.pathname.split('/')[2]);
        process.env.RHD_BASE_URL = `http://rhdp-jenkins-slave.lab4.eng.bos.redhat.com:${(35000 + prNumber)}`;
        console.log(`Drupal url: ${process.env.RHD_BASE_URL}`)
    }
}

const path = require('path');
if (process.env.RHD_TEST_CONFIG === 'docker') {
    nodeModulePath = '/home/e2e/';
} else {
    nodeModulePath = path.resolve(process.cwd());
}

exports.config = {

    specs: `specs/${testType}/*.js`,

    exclude: [`specs/${exclude}/*.js`, `specs/support/**/*.js`],

    sync: true,

    deprecationWarnings: false,

    logLevel: 'silent',

    coloredLogs: true,

    baseUrl: process.env.RHD_BASE_URL,

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
