const DownloadManager = require("./support/rest/Download.Manager");
const CheatSheetsPage = require('./support/pages/website/CheatSheets.page');
const LoginPage = require('./support/pages/keycloak/Login.page');
const loginPage = new LoginPage();
const HomePage = require('./support/pages/website/Home.page');
const homePage = new HomePage();

const qs = require('querystring');
const dowloadHelper = require('./support/DownloadHelper');
const User = require("./support/rest/keycloak/Site.user");

describe('RHD Cheatsheet downloads', function () {

    let siteUser;
    let cheatSheetPage;

    beforeEach(function () {
        dowloadHelper.clearDownloadDirectory(global.downloadDir);
        siteUser = new User(process.env.RHD_BASE_URL).rhdAccountDetails();
    });

    tags('sanity', 'dm').it('User can log in and download RHD promotional cheetsheets', function () {
        this.retries(2);
        cheatSheetPage = new CheatSheetsPage('advanced-linux-commands');
        cheatSheetPage
            .open();
        cheatSheetPage
            .awaitLoaded();
        cheatSheetPage
            .clickLoginToDownloadBtn();
        loginPage
            .awaitLoginPage();
        loginPage
            .login(siteUser);
        homePage
            .awaitIsLoggedIn(siteUser);
        cheatSheetPage
            .awaitDownloadThankYou();
        expect(dowloadHelper.getDownloads().length,
            'Failed to download cheatsheet').to.be.at.least(1)
    });

    afterEach(function () {
        let downloadManager = new DownloadManager(process.env.RHD_BASE_URL);
        if (this.currentTest.state === 'failed') {
            global.logger.warn(`Cheatsheet download failed. Download Manager status was: ${downloadManager.isDMRunning()}`)
        }

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
    });

});
