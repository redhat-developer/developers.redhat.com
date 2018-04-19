const baseConfig = require('./wdio.conf.base.js').config;
const BrowserManager = require('./browsers/BrowserManager');

browserCaps = BrowserManager.createBrowser(process.env.RHD_JS_DRIVER);

let localConfig = Object.assign(baseConfig, {

    maxInstances: 1,
    capabilities: [browserCaps],
    services: ['selenium-standalone']

});

exports.config = localConfig;
