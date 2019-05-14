const chai = require('chai');
const path = require('path');
const tags = require('mocha-tags');

const commandlineArgs = require('minimist')(process.argv.slice(2));
const testProfile = typeof commandlineArgs.profile === 'undefined' ? 'desktop' : commandlineArgs.profile;

exports.config = {
    specs: ['./tests/specs/*.spec.js'],
    sync: true,
    deprecationWarnings: true,
    logLevel: 'info',
    baseUrl: commandlineArgs['base-url'],
    waitforTimeout: 30000,
    connectionRetryTimeout: 95000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: `report/${testProfile}-results`,
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],
    mochaOpts: {
        ui: 'bdd',
        compilers: ['js:@babel/register'],
        timeout: 95000,
    },

    beforeSession: function(config, capabilities, specs) {
        require('@babel/register');
    },

    before: function() {
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();
        global.tags = tags;
        global.downloadDir = path.resolve('tmp_downloads');
    },

    afterTest: function(test) {
        if (test.error !== undefined) {
          browser.takeScreenshot();
        }
    },

    onComplete: function() {
        try {
            const {execSync} = require('child_process');
            execSync(`allure generate ./report/${testProfile}-results -o ./report/${testProfile}-report`);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    },
};
