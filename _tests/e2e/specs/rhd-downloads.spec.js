// const qs = require('querystring');
// const nock = require('nock');
// const User = require("./support/rest/keycloak/Site.user");
// const Home = require('./support/pages/website/Home.page');
// const home = new Home();
// const Login = require('./support/pages/keycloak/Login.page');
// const login = new Login();
// const AdditionalInformation = require('./support/pages/keycloak/AdditionalInformation.page');
// const additionalInformation = new AdditionalInformation();
// const ProductOverview = require('./support/pages/website/ProductOverview.page');
// const CheatSheets = require('./support/pages/website/CheatSheets.page');
//
// const downloads = require('./support/DownloadHelper');
//
// const tags = require('mocha-tags');
//
// describe('Download Manager', function () {
//
//     beforeEach(function () {
//         downloads.clear(global.downloadDir)
//     });

    // tags('sanity', 'dm')
    //     .it('should allow users to login in and download RHD supportable Products', function () {
    //     this.retries(2);
    //     siteUser = new User(process.env.RHD_BASE_URL).rhdAccountDetails();
    //     let productOverview = new ProductOverview('rhel', 'download', 'Red Hat Enterprise Linux');
    //     productOverview
    //         .open();
    //     productOverview
    //         .download();
    //     login
    //         .awaitLogin();
    //     login
    //         .with(siteUser);
    //     home
    //         .awaitIsLoggedIn(siteUser);
    //     productOverview
    //         .awaitDownloadThankYou();
    //     expect(downloads.get()).to.eq(1)
    // });
    //
    // tags('dm', 'stage')
    //     .it('should allow users to login-in and download Red Hat JBoss/Red Hat Developer subscription products', function () {
    //     this.retries(2);
    //     siteUser = new User(process.env.RHD_BASE_URL).rhdAccountDetails();
    //     let productOverview = new ProductOverview('fuse', 'download', 'JBoss Fuse');
    //     productOverview
    //         .open();
    //     productOverview
    //         .download();
    //     login
    //         .awaitLogin();
    //     login
    //         .with(siteUser);
    //     home
    //         .awaitIsLoggedIn(siteUser);
    //     productOverview
    //         .awaitDownloadThankYou();
    //     expect(downloads.get()).to.eq(1)
    // });
    //
    // tags('dm', 'stage')
    //     .it('should allow users to login in and download RHD full user profile products', function () {
    //     this.retries(2);
    //     siteUser = new User(process.env.RHD_BASE_URL).rhdAccountDetails();
    //     let productOverview = new ProductOverview('devstudio', 'download', 'JBoss Developer Studio');
    //     productOverview
    //         .open();
    //     productOverview
    //         .download();
    //     login
    //         .awaitLogin();
    //     login
    //         .with(siteUser);
    //     home
    //         .awaitIsLoggedIn(siteUser);
    //     productOverview
    //         .awaitDownloadThankYou();
    //     expect(downloads.get()).to.eq(1)
    // });
    //
    // tags('dm', 'stage')
    //     .it('should allow active OpenShift.com account users (simple user account) to login and download RHD supportable user products', function () {
    //     this.retries(2);
    //     siteUser = new User(process.env.RHD_BASE_URL).createOpenshiftUser();
    //     let productOverviewPage = new ProductOverview('rhel', 'download', 'Red Hat Enterprise Linux');
    //     login
    //         .open();
    //     login
    //         .with(siteUser);
    //     home
    //         .awaitIsLoggedIn(siteUser);
    //     productOverviewPage
    //         .open();
    //     productOverviewPage
    //         .download();
    //     productOverviewPage
    //         .awaitDownloadThankYou();
    //     expect(downloads.get()).to.eq(1)
    // });
    //
    // tags('dm', 'stage')
    //     .it('should allow active Red Hat Customer Portal account (full user account) users to login and download RHD supportable user products', function () {
    //     this.retries(2);
    //     siteUser = new User(process.env.RHD_BASE_URL).createCustomerPortalAccount();
    //     let productOverviewPage = new ProductOverview('rhel', 'download', 'Red Hat Enterprise Linux');
    //     login
    //         .open();
    //     login
    //         .with(siteUser.createCustomerPortalAccount());
    //     additionalInformation
    //         .complete(siteUser);
    //     home
    //         .awaitIsLoggedIn(siteUser.rhdAccountDetails());
    //     productOverviewPage
    //         .open();
    //     productOverviewPage
    //         .download();
    //     productOverviewPage
    //         .awaitDownloadThankYou();
    //     expect(downloads.get()).to.eq(1)
    // });

    // tags('sanity', 'dm').it('should allow users to log-in and download promotional cheetsheets', function () {
        // this.retries(2);
        // let siteUser = new User(process.env.RHD_BASE_URL).rhdAccountDetails();
        // let cheatSheet = new CheatSheets('advanced-linux-commands');
        // cheatSheet
        //     .open();
        // cheatSheet
        //     .awaitLoaded();
        // cheatSheet
        //     .clickLoginToDownloadBtn();
        // login
        //     .awaitLogin();
        // login
        //     .with(siteUser);
        // home
        //     .awaitIsLoggedIn(siteUser);
        // cheatSheet
        //     .awaitDownloadThankYou();
        // expect(downloads.get()).to.eql(1)
    // });

    // afterEach(function () {
    //     try {
    //         let encodedURL = qs.escape(process.env.RHD_BASE_URL);
    //         if (process.env.RHD_BASE_URL === 'https://developers.stage.redhat.com') {
    //             browser.url(`https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`)
    //         } else {
    //             browser.url(`https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`)
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    //     downloads.clear(global.downloadDir)
    // });
// });
