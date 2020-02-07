const chai = require('chai');
const path = require('path');
const tags = require('mocha-tags');

const commandlineArgs = require('minimist')(process.argv.slice(2));
const testProfile = typeof commandlineArgs.profile === 'undefined' ? 'desktop' : commandlineArgs.profile;
const testType = typeof commandlineArgs.testType === 'undefined' ? 'export' : commandlineArgs.testType;
const exclude = testType === 'export' ? 'drupal' : 'export';
const host = typeof commandlineArgs['base-url'] === 'undefined' ? 'https://localhost' : commandlineArgs['base-url'];
const keyCloakUser = process.env.RHD_KEYCLOAK_ADMIN_USERNAME;
const keyCloakPassword = process.env.RHD_KEYCLOAK_ADMIN_PASSWORD;
const drupalUser = process.env.RHD_DRUPAL_ADMIN_USERNAME;
const drupalPassword = process.env.RHD_DRUPAL_ADMIN_PASSWORD;

checkPropertySet(keyCloakUser, 'RHD_KEYCLOAK_ADMIN_USERNAME');
checkPropertySet(keyCloakPassword, 'RHD_KEYCLOAK_ADMIN_PASSWORD');
checkPropertySet(drupalUser, 'RHD_DRUPAL_ADMIN_USERNAME');
checkPropertySet(drupalPassword, 'RHD_DRUPAL_ADMIN_PASSWORD');

function checkPropertySet(property, propertyName) {
    if (property === undefined || property === '') {
        throw new Error("You must set the environment variable '" + propertyName + "' for the tests to run.");
    }
}

exports.config = {
    specs: [`tests/specs/${testType}/*.js`],
    exclude: [`tests/specs/${exclude}/*.js`],
    sync: true,
    deprecationWarnings: true,
    logLevel: 'error',
    baseUrl: host,
    waitforTimeout: 15000,
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
        timeout: 90000,
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
