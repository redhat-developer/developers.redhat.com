import {Home} from "./support/pages/website/Home.page";
import {Login} from './support/pages/keycloak/Login.page';
import {AdditionalInformation} from './support/pages/keycloak/AdditionalInformation.page';
import {ProductOverview} from './support/pages/website/ProductOverview.page';
import {CheatSheets} from './support/pages/website/CheatSheets.page';
import {User} from './support/rest/keycloak/Site.user';
import {DownloadDir} from './support/DownloadDir';
import {Utils} from './support/Utils';

const tags = require('mocha-tags');

tags('desktop').describe('Download Manager', function () {
    this.retries(2);
    let downloadDir, downloadName, siteUser;
    let home, login, additionalInformation;

    beforeEach(function () {
        new Utils().logout(process.env.RHD_BASE_URL);
        login = new Login();
        home = new Home();
        additionalInformation = new AdditionalInformation();
        downloadDir = new DownloadDir();
        downloadDir.clear()
    });

    afterEach(function () {
        new Utils().logout(process.env.RHD_BASE_URL);
        downloadDir.clear(global.downloadDir)
    });

    tags('dm')
        .it('@sanity : should allow users to login in and download RHEL', function () {
            siteUser = new User(process.env.RHD_BASE_URL).rhdAccountDetails();
            let productOverview = new ProductOverview('rhel', 'download', 'Red Hat Enterprise Linux');
            productOverview
                .open();
            productOverview
                .download();
            login
                .awaitLogin();
            login
                .with(siteUser);
            productOverview
                .awaitHelloWorldPage();
            productOverview
                .awaitDownloadThankYou();
            downloadName = downloadDir.get();
            expect(downloadName.toString(), 'rhel download was not triggered').to.include('rhel');
        });

    tags('dm', 'stage')
        .it('should allow users to login-in and download Red Hat JBoss/Red Hat Developer subscription products', function () {
            siteUser = new User(process.env.RHD_BASE_URL).rhdAccountDetails();
            let productOverview = new ProductOverview('fuse', 'download', 'JBoss Fuse');
            productOverview
                .open();
            productOverview
                .download();
            login
                .awaitLogin();
            login
                .with(siteUser);
            productOverview
                .awaitHelloWorldPage();
            productOverview
                .awaitDownloadThankYou();
            downloadName = downloadDir.get();
            expect(downloadName.toString()).to.include('fuse');
        });

    tags('dm', 'stage')
        .it('should allow users to login in and download RHD full user profile products', function () {
            siteUser = new User(process.env.RHD_BASE_URL).rhdAccountDetails();
            let productOverview = new ProductOverview('devstudio', 'download', 'JBoss Developer Studio');
            productOverview
                .open();
            productOverview
                .download();
            login
                .awaitLogin();
            login
                .with(siteUser);
            productOverview
                .awaitHelloWorldPage();
            productOverview
                .awaitDownloadThankYou();
            downloadName = downloadDir.get();
            expect(downloadName.toString()).to.include('devstudio');
        });

    tags('dm', 'stage')
        .it('should allow active OpenShift.com account users (simple user account) to login and download RHD supportable user products', function () {
            siteUser = new User(process.env.RHD_BASE_URL).createOpenshiftUser();
            let productOverview = new ProductOverview('rhel', 'download', 'Red Hat Enterprise Linux');
            login
                .open();
            login
                .with(siteUser);
            productOverview
                .open();
            productOverview
                .download();
            productOverview
                .awaitHelloWorldPage();
            productOverview
                .awaitDownloadThankYou();
            downloadName = downloadDir.get();
            expect(downloadName.toString()).to.include('rhel');
        });

    tags('dm', 'stage')
        .it('should allow active Red Hat Customer Portal account (full user account) users to login and download RHD supportable user products', function () {
            siteUser = new User(process.env.RHD_BASE_URL).createCustomerPortalAccount();
            let productOverview = new ProductOverview('rhel', 'download', 'Red Hat Enterprise Linux');
            login
                .open();
            login
                .with(siteUser.createCustomerPortalAccount());
            additionalInformation
                .complete(siteUser);
            home
                .awaitIsLoggedIn(siteUser.rhdAccountDetails());
            productOverview
                .open();
            productOverview
                .download();
            productOverview
                .awaitHelloWorldPage();
            productOverview
                .awaitDownloadThankYou();
            downloadName = downloadDir.get();
            expect(downloadName.toString()).to.include('rhel');
        });

    tags('dm')
        .it('@sanity : should allow users to log-in and download advanced-linux-commands', function () {
            let siteUser = new User(process.env.RHD_BASE_URL).rhdAccountDetails();
            let cheatSheet = new CheatSheets('advanced-linux-commands');
            cheatSheet
                .open();
            cheatSheet
                .awaitLoaded();
            cheatSheet
                .clickLoginToDownloadBtn();
            login
                .with(siteUser);
            home
                .awaitIsLoggedIn(siteUser);
            cheatSheet
                .awaitDownloadConfirmation();
            cheatSheet
                .awaitDownloadThankYou();
            downloadName = downloadDir.get();
            expect(downloadName.toString(), 'rhel advanced linux cheatsheet download was not triggered').to.include('rheladvancedlinux_cheat_sheet')
        });
});
