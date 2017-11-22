const fs = require('fs-extra');
const path = require('path');
const qs = require('querystring');

const hooks = function () {

    this.Before(function () {
        global.siteUserDetails = "";
        const wdioDeprecationWarning = /^WARNING: the "\w+" command will be depcrecated soon. Please use a different command in order to avoid failures in your test after updating WebdriverIO./;
        // Monkey patch:
        const warn = console.warn;
        console.warn = function suppressWebdriverWarnings(message) {
            if (message.match(wdioDeprecationWarning)) return;
            warn.apply(console, arguments)
        };
    });

    // this.After(function () {
    //     let encodedURL = qs.escape(process.env.RHD_BASE_URL);
    //     if (process.env.RHD_BASE_URL === 'https://developers.stage.redhat.com') {
    //         browser.url(`https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`)
    //     } else {
    //         browser.url(`https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`)
    //     }
    //
    //     if (typeof downloadStarted !== 'undefined') {
    //         let pathToChromeDownloads = path.resolve('tmp/chromeDownloads');
    //         let dirSize = [];
    //         fs.readdirSync(pathToChromeDownloads).forEach(file => {
    //             dirSize.push(file)
    //         });
    //         if (dirSize.length > 0) {
    //             fs.emptyDir(pathToChromeDownloads)
    //         }
    //     }
    //     driver.execute('window.localStorage.clear();');
    // })

};

module.exports = hooks;
