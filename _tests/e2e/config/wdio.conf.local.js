// require base configuration
var baseConfig = require('./wdio.conf.base.js').config;
var BrowserManager = require('./BrowserManager');

browserCaps = BrowserManager.createBrowser(process.env.RHD_JS_DRIVER);

// clone prod config and add new properties/overrides
var localConfig = Object.assign(baseConfig, {

    capabilities: [browserCaps],

    services: ['selenium-standalone']

});

exports.config = localConfig;