const BrowserManager = require('./browsers/BrowserManager');
browserCaps = BrowserManager.createBrowser(process.env.RHD_JS_DRIVER);

let baseConfig = require('./wdio.conf.base.js').config;
let browserstackBrowser = require("./browsers/remote_browsers.json");
let browserstackBrowserCaps = browserstackBrowser[process.env.RHD_JS_DRIVER];

// clone base config and add new properties/overrides
var browserstackConfig = Object.assign(baseConfig, {

    user: process.env.RHD_BS_USERNAME,
    key: process.env.RHD_BS_AUTHKEY,
    browserstackLocal: true,

    capabilities: [{
        'acceptSslCerts': 'true',
        project: 'RHD e2e Tests',
        browserName: browserstackBrowserCaps['browserName'],
        browser_version: browserstackBrowserCaps['browser_version'],
        os: browserstackBrowserCaps['os'],
        os_version: browserstackBrowserCaps['os_version'],
        resolution: browserstackBrowserCaps['resolution'],
        'browserstack.local': true
    }],
    services: ['browserstack'],
    maxInstances: 1
});

exports.config = browserstackConfig;