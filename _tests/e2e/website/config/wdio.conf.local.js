// require base configuration
const baseConfig = require('./wdio.conf.base.js').config;
const BrowserManager = require('../../browsers/BrowserManager');
const BrowserCaps = new BrowserManager(process.env.RHD_JS_DRIVER);

// clone prod config and add new properties/overrides
var localConfig = Object.assign(baseConfig, {

    maxInstances: 5,
    capabilities: [BrowserCaps.createBrowser()],

    services: ['selenium-standalone']

});

exports.config = localConfig;
