if (typeof process.env.RHD_BASE_URL === 'undefined') {
    process.env.RHD_BASE_URL = 'https://developers.redhat.com';
    console.log('No base url set, defaulting to staging');
    baseUrl = process.env.RHD_BASE_URL
} else {
    baseUrl = process.env.RHD_BASE_URL
}

if (typeof process.env.RHD_BASE_URL === 'undefined') {
    process.env.RHD_DRUPAL_INSTANCE = 'http://rhdp-drupal.redhat.com'
} else {
    if (process.env.RHD_BASE_URL.includes('pr.stage.redhat.com/pr')) {
        let parsedUrl = require('url').parse(process.env.RHD_BASE_URL);
        let getPullRequestNumber = parsedUrl.pathname.split('/')[2];
        process.env.RHD_DRUPAL_INSTANCE = `http://rhdp-jenkins-slave.lab4.eng.bos.redhat.com:${(35000) + (getPullRequestNumber - 0)}`;
        console.log(process.env.RHD_DRUPAL_INSTANCE)
    } else if (process.env.RHD_BASE_URL === 'https://developers.stage.redhat.com') {
        process.env.RHD_DRUPAL_INSTANCE = 'http://rhdp-drupal.stage.redhat.com'
    }
}

if (typeof process.env.RHD_TEST_PROFILE === 'undefined') {
    testProfile = 'desktop'
} else {
    testProfile = process.env.RHD_TEST_PROFILE
}

if (typeof process.env.RHD_JS_DRIVER === 'undefined') {
    process.env.RHD_JS_DRIVER = 'chrome';
}

const path = require('path');
if (process.env.RHD_TEST_CONFIG === 'docker') {
    nodeModulePath = '/home/e2e/';
} else {
    nodeModulePath = path.resolve(process.cwd());
}

exports.config = {

    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        'specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        'specs/support/**/*.js'
    ],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async way
    // e.g. using promises you can set the sync option to false.
    sync: true,

    deprecationWarnings: false,
    //
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: 'silent',
    //
    // Enables colors for log output.
    coloredLogs: true,
    //
    // Saves a screenshot to a given path if a command fails.
    //
    // Set a base URL in order to shorten url command calls. If your url parameter starts
    // with "/", then the base url gets prepended.
    baseUrl: baseUrl,
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 15000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Initialize the browser instance with a WebdriverIO plugin. The object should have the
    // plugin name as key and the desired plugin options as properties. Make sure you have
    // the plugin installed before running any tests. The following plugins are currently
    // available:
    // WebdriverCSS: https://github.com/webdriverio/webdrivercss
    // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
    // Browserevent: https://github.com/webdriverio/browserevent
    // plugins: {
    // webdrivercss: {
    // screenshotRoot: 'my-shots',
    // failedComparisonsRoot: 'diffs',
    // misMatchTolerance: 0.05,
    // screenWidth: [320,480,640,1024]
    // },
    // webdriverrtc: {},
    // browserevent: {}
    // },
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['selenium-standalone'],
    //
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: http://webdriver.io/guide/testrunner/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/guide/testrunner/reporters.html
    reporters: ['dot', 'mochawesome'],

    screenshotPath: 'screenshots',

    mochawesomeOpts: {
        includeScreenshots: true,
        screenshotUseRelativePath: true
    },

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    reporterOptions: {
        outputDir: `./report/${testProfile}-results`, //json file will be written to this directory
        mochawesome_filename: 'results.json', //will default to wdiomochawesome.json if no name is provided
    },
//
// =====
// Hooks
// =====
// WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
// it and to build services around it. You can either apply a single function or an array of
// methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
// resolved to continue.
//
// Gets executed once before all workers get launched.
// onPrepare: function (config, capabilities) {
// },
//
// Gets executed before test execution begins. At this point you can access all global
// variables, such as `browser`. It is the perfect place to define custom commands.
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
        global.tags = require('mocha-tags');

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
            console.log('Generating mochawesome report . . .');
            execSync(`marge --reportDir report/${testProfile}-results report/${testProfile}-results/results.json  && cp -r screenshots report/${testProfile}-results/screenshots`);
            console.log('Generated mochawesome report!');
        } catch (e) {
            console.log('>>> failed to generate test report <<<')
        }
    }
};
