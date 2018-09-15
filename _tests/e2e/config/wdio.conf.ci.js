const baseConfig = require('./wdio.conf.base.js').config;
const BrowserManager = require('./browsers/BrowserManager');

browserCaps = BrowserManager.createBrowser(process.env.RHD_JS_DRIVER);

if (typeof process.env.GRID_HOST === 'undefined') {
    HOST = 'localhost'
} else {
    HOST = process.env.GRID_HOST
}

const dockerConfig = Object.assign(baseConfig, {
    host: HOST,
    maxInstances: 10,
    capabilities: [browserCaps],
});

exports.config = dockerConfig;
