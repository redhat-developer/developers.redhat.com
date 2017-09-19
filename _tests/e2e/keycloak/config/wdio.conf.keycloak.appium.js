'use strict';

const kcBaseConfig = require('./wdio.conf.keycloak').config;
// const BrowserManager = require('../../browsers/BrowserManager');
// const browserManager = new BrowserManager(process.env.RHD_JS_DRIVER);

// clone prod config and add new properties/overrides
const appiumConfig = Object.assign(kcBaseConfig, {
    port: 4723,

    // Note:
    // We need to execute E2E test script one by one because only one simulator
    // can exist in one local machine for iOS.
    // TODO: Run automated tests for iOS and Android in parallel
    maxInstances: 1,

    capabilities: [{
        browserName: 'Safari',
        deviceName: 'iPhone Simulator',
        platformVersion: '10.3',
        platformName: 'iOS'
    }],

    services: ['selenium-standalone'],

});

exports.config = appiumConfig;
