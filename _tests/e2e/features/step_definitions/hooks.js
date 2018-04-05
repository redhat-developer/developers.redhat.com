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
        global.operatingSystem = getOperatingSystem();
        global.siteUserDetails = "";
        global.downloadDir = 'tmp_downloads';
        let pathToChromeDownloads = path.resolve(global.downloadDir);
        let dirSize = [];
        fs.readdirSync(pathToChromeDownloads).forEach(file => {
            dirSize.push(file)
        });
        if (dirSize.length > 0) {
            fs.emptyDir(pathToChromeDownloads)
        }
    });

    this.After(function () {
        try {
            let encodedURL = qs.escape(process.env.RHD_BASE_URL);
            if (process.env.RHD_BASE_URL === 'https://developers.stage.redhat.com') {
                browser.url(`https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`)
            } else {
                browser.url(`https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`)
            }
        } catch (e) {
            console.log(e)
        }

        if (typeof downloadStarted !== 'undefined') {
            try {
                let dirSize = [];
                fs.readdirSync(global.downloadDir).forEach(file => {
                    dirSize.push(file)
                });
                if (dirSize.length > 0) {
                    fs.emptyDir(global.downloadDir)
                }
            } catch (e) {
                console.log(e)
            }
        }

        if (typeof socialAccountHolder !== 'undefined') {
            try {
                let keycloakAdmin = new KeyCloakAdmin();
                keycloakAdmin.deleteUser(siteUserDetails['email'])
            } catch (e) {
                console.log(e)
            }
        }
        browser.deleteCookie();
        browser.execute('window.localStorage.clear();');
    });

};

module.exports = hooks;
