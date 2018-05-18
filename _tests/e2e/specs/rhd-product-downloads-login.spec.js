const qs = require('querystring');
const User = require("./support/rest/keycloak/Site.user");
const dowloadHelper = require('./support/DownloadHelper');
const DownloadManager = require("./support/rest/Download.Manager");
const HomePage = require('./support/pages/website/Home.page');
const homePage = new HomePage();
const LoginPage = require('./support/pages/keycloak/Login.page');
const loginPage = new LoginPage();
const AdditionalInformationPage = require('./support/pages/keycloak/AdditionalInformation.page');
const additionalInformationPage = new AdditionalInformationPage();
const ProductOverview = require('./support/pages/website/ProductOverview.page');

const tags = require('mocha-tags');

describe('Products Downloads: Login', function () {

    let siteUser;

    beforeEach(function () {
        dowloadHelper.clearDownloadDirectory(global.downloadDir)
    });

    tags('sanity', 'dm').it('RHD supportable Product: User must login in order to download products', function () {
        this.retries(2);
        siteUser = new User(process.env.RHD_BASE_URL).rhdAccountDetails();
        let productOverviewPage = new ProductOverview('rhel', 'download', 'Red Hat Enterprise Linux');
        productOverviewPage
            .open();
        productOverviewPage
            .download();
        loginPage
            .awaitLoginPage();
        loginPage
            .login(siteUser);
        homePage
            .awaitIsLoggedIn(siteUser);
        productOverviewPage
            .awaitDownloadThankYou();
        expect(dowloadHelper.getDownloads().length,
            `Expected 1 download, but got ${dowloadHelper.getDownloads().length}`).to.eq(1)
    });

    tags('dm', 'stage').it('Red Hat JBoss/Red Hat Developer subscription: User must login in order to download JBoss Fuse', function () {
        this.retries(2);
        siteUser = new User(process.env.RHD_BASE_URL).rhdAccountDetails();
        let productOverviewPage = new ProductOverview('fuse', 'download', 'JBoss Fuse');
        productOverviewPage
            .open();
        productOverviewPage
            .download();
        loginPage
            .awaitLoginPage();
        loginPage
            .login(siteUser);
        homePage
            .awaitIsLoggedIn(siteUser);
        productOverviewPage
            .awaitDownloadThankYou();
        expect(dowloadHelper.getDownloads().length,
            `Expected 1 download, but got ${dowloadHelper.getDownloads().length}`).to.eq(1)
    });

    tags('dm', 'stage').it('RHD full user profile: User must login in order to download Red Hat JBoss Developer Studio', function () {
        this.retries(2);
        siteUser = new User(process.env.RHD_BASE_URL).rhdAccountDetails();
        let productOverviewPage = new ProductOverview('devstudio', 'download', 'JBoss Developer Studio');
        productOverviewPage
            .open();
        productOverviewPage
            .download();
        loginPage
            .awaitLoginPage();
        loginPage
            .login(siteUser);
        homePage
            .awaitIsLoggedIn(siteUser);
        productOverviewPage
            .awaitDownloadThankYou();
        expect(dowloadHelper.getDownloads().length,
            `Expected 1 download, but got ${dowloadHelper.getDownloads().length}`).to.eq(1)
    });

    tags('dm', 'stage').it('authenticated user can download RHD products', function () {
        this.retries(2);
        siteUser = new User(process.env.RHD_BASE_URL).rhdAccountDetails();
        let productOverviewPage = new ProductOverview('rhel', 'download', 'Red Hat Enterprise Linux');
        loginPage
            .open();
        loginPage
            .login(siteUser);
        homePage
            .awaitIsLoggedIn(siteUser);
        productOverviewPage
            .open();
        productOverviewPage
            .download();
        productOverviewPage
            .awaitDownloadThankYou();
        expect(dowloadHelper.getDownloads().length,
            `Expected 1 download, but got ${dowloadHelper.getDownloads().length}`).to.eq(1)
    });

    tags('dm', 'stage').it('should allow active OpenShift.com account users (simple user account) to login and download RHD supportable user products', function () {
        this.retries(2);
        siteUser = new User(process.env.RHD_BASE_URL).createOpenshiftUser();
        let productOverviewPage = new ProductOverview('rhel', 'download', 'Red Hat Enterprise Linux');
        loginPage
            .open();
        loginPage
            .login(siteUser);
        homePage
            .awaitIsLoggedIn(siteUser);
        productOverviewPage
            .open();
        productOverviewPage
            .download();
        productOverviewPage
            .awaitDownloadThankYou();
        expect(dowloadHelper.getDownloads().length,
            `Expected 1 download, but got ${dowloadHelper.getDownloads().length}`).to.eq(1)
    });

    tags('dm', 'stage').it('@ignore @stage should allow active Red Hat Customer Portal account (full user account) users to login and download RHD supportable user products', function () {
        this.retries(2);
        siteUser = new User(process.env.RHD_BASE_URL).createCustomerPortalAccount();
        let productOverviewPage = new ProductOverview('rhel', 'download', 'Red Hat Enterprise Linux');
        loginPage
            .open();
        loginPage
            .login(siteUser.createCustomerPortalAccount());
        additionalInformationPage
            .completeAdditionalInformation(siteUser);
        homePage
            .awaitIsLoggedIn(siteUser.rhdAccountDetails());
        productOverviewPage
            .open();
        productOverviewPage
            .download();
        productOverviewPage
            .awaitDownloadThankYou();
        expect(dowloadHelper.getDownloads().length,
            `Expected 1 download, but got ${dowloadHelper.getDownloads().length}`).to.eq(1)
    });

    afterEach(function () {
        let downloadManager = new DownloadManager(process.env.RHD_BASE_URL);
        if (this.currentTest.state === 'failed') {
            global.logger.warn(`Product download failed! Download Manager status was: ${downloadManager.isDMRunning()}`)
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
