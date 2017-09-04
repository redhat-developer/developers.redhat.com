// require base configuration
var baseConfig = require('./wdio.conf.base.js').config;
var BrowserManager = require('./BrowserManager');

browserCaps = BrowserManager.createBrowser(process.env.RHD_JS_DRIVER);

// clone prod config and add new properties/overrides
var dockerConfig = Object.assign(baseConfig, {

    host: process.env.NODE_SELENIUM_HOST,

    // set maxInstance for all browsers: As we increase the tests, we increase this for speed.
    maxInstances: 5,
    capabilities: [browserCaps],

});

exports.config = dockerConfig;
