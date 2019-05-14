const commandlineArgs = require('minimist')(process.argv.slice(2));
const base = require('./wdio.conf.base.js').config;
const Browser = require('../specs/support/Browser.Manager');

const browserCaps = new Browser(commandlineArgs.browser).create();
const localConfig = Object.assign(base, {
    services: ['selenium-standalone'],
    seleniumArgs: {
        version: "3.141.5",
        drivers: {
            chrome: {
                version: "74.0.3729.6",
                arch: process.arch,
            },
        },
    },
    seleniumInstallArgs: {
        version: "3.141.5",
        baseURL: "https://selenium-release.storage.googleapis.com",
        drivers: {
            chrome: {
                version: "74.0.3729.6",
                arch: process.arch,
                baseURL: "https://chromedriver.storage.googleapis.com",
            },
        },
    },

    capabilities: [browserCaps],
});

exports.config = localConfig;
