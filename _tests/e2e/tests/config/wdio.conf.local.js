const commandlineArgs = require('minimist')(process.argv.slice(2));
const browser = typeof commandlineArgs.browser === 'undefined' ? 'chrome' : commandlineArgs.browser;
const base = require('./wdio.conf.base.js').config;
const Browser = require('../specs/support/Browser.Manager');
const browserCaps = new Browser(browser).create();
const localConfig = Object.assign(base, {
    services: ['selenium-standalone'],
    capabilities: [browserCaps],
});

exports.config = localConfig;
