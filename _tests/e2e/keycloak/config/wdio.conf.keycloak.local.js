// require keycloak base configuration
const kcBaseConfig = require('./wdio.conf.keycloak.js').config;
const BrowserManager = require('../../browsers/BrowserManager');

let rhdBrowser;
if (typeof process.env.RHD_JS_DRIVER !== 'undefined') {
    rhdBrowser = process.env.RHD_JS_DRIVER
} else {
    rhdBrowser = 'chrome'
}

const BrowserCaps = new BrowserManager(rhdBrowser, 5);

// clone keycloak base config and add new properties/overrides
const localConfig = Object.assign(kcBaseConfig, {

    maxInstances: 5,
    capabilities: [BrowserCaps.createBrowser()],

    reporters: ['cucumber'],

    services: ['selenium-standalone']

});

delete kcBaseConfig.reporterOptions;

exports.config = localConfig;
