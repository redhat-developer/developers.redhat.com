const baseConfig = require('./wdio.conf.base.js').config;
const BrowserManager = require('./browsers/BrowserManager');

browserCaps = BrowserManager.createBrowser(process.env.RHD_JS_DRIVER);

if (typeof process.env.NODE_SELENIUM_HOST === 'undefined') {
    dockerHost = 'localhost'
} else {
    dockerHost = process.env.NODE_SELENIUM_HOST
}

const dockerConfig = Object.assign(baseConfig, {

    host: dockerHost,
    maxInstances: 1,
    capabilities: [browserCaps],

});

exports.config = dockerConfig;
