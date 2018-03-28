import {KeyCloakAdmin} from '../support/rest/keycloak/Keycloak.admin'
const fs = require('fs-extra');
const path = require('path');
const qs = require('querystring');

const hooks = function () {

    let getOs = process.platform;

    function getOperatingSystem() {
        switch (getOs) {
            case 'darwin':
                return 'macOS';
            case 'win32':
                return 'Windows';
            default:
                return "RHEL";
        }
    }

    this.Before(function () {
        browser.deleteCookie();
        global.siteUserDetails = "";
    });

    this.After(function () {
        let encodedURL = qs.escape(process.env.RHD_BASE_URL);
        if (process.env.RHD_BASE_URL === 'https://developers.stage.redhat.com') {
            browser.url(`https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`)
        } else {
            browser.url(`https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`)
        }

        if (typeof downloadStarted !== 'undefined') {
            let pathToChromeDownloads = path.resolve('tmp/chromeDownloads');
            let dirSize = [];
            fs.readdirSync(pathToChromeDownloads).forEach(file => {
                dirSize.push(file)
            });
            if (dirSize.length > 0) {
                fs.emptyDir(pathToChromeDownloads)
            }
        }

        if (typeof socialAccountHolder !== 'undefined') {
            let keycloakAdmin = new KeyCloakAdmin();
            keycloakAdmin.deleteUser(siteUserDetails['email'])
        }

        browser.deleteCookie();
        browser.execute('window.localStorage.clear();');
    });

};

module.exports = hooks;
