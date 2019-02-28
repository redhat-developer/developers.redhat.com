const baseConfig = require('./wdio.conf.base.js').config;
const BrowserManager = require('./browsers/BrowserManager');

browserCaps = BrowserManager.createBrowser(process.env.RHD_JS_DRIVER);

if (typeof process.env.GRID_HOST === 'undefined') {
    HOST = 'localhost'
} else {
    HOST = process.env.GRID_HOST
}

if (process.env.PULL_REQUEST_ID) {
    process.env.RHD_BASE_URL = `${process.env.RHD_BASE_URL}:${35000 + parseInt(process.env.PULL_REQUEST_ID)}`;
}

const dockerConfig = Object.assign(baseConfig, {
    host: HOST,
    maxInstances: 10,
    capabilities: [browserCaps],
    baseUrl: process.env.RHD_BASE_URL

});

exports.config = dockerConfig;
