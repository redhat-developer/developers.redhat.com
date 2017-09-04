// require base configuration
const kcBaseConfig = require('./wdio.conf.keycloak').config;
const BrowserManager = require('../../browsers/BrowserManager');
const browserManager = new BrowserManager(process.env.RHD_JS_DRIVER);

// clone prod config and add new properties/overrides
const dockerConfig = Object.assign(kcBaseConfig, {

    host: process.env.NODE_SELENIUM_HOST,

    // set maxInstance for all browsers: As we increase the tests, we increase this for speed.
    maxInstances: 5,
    capabilities: [browserManager.createBrowser()],

});

exports.config = dockerConfig;
