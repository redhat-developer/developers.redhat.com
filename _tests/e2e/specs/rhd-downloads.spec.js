import {Login} from './support/pages/Login.page';
import {ProductOverview} from './support/pages/ProductOverview.page';
import {CheatSheets} from './support/pages/CheatSheets.page';
import {User} from './support/rest/keycloak/Site.user';
import {DownloadDir} from './support/DownloadDir';
import {Utils} from './support/Utils';

const tags = require('mocha-tags');

tags('desktop').describe('Download Manager', function () {
    this.retries(2);

    beforeEach(function () {
        let downloadDir = new DownloadDir();
        downloadDir.clear(global.downloadDir);
        new Utils().cleanSession();
    }, 2);

    tags('dm')
        .it('@sanity should allow users to login in and download RHEL', function () {
            let downloadDir = new DownloadDir();
            let siteUser = new User(process.env.RHD_BASE_URL).rhdAccountDetails();
            let loginPage = new Login();
            let productOverview = new ProductOverview('rhel', 'download', 'Red Hat Enterprise Linux');
            productOverview
                .open();
            productOverview
                .download();
            loginPage.keycloak
                .loginWith(siteUser);
            productOverview
                .awaitDownload();
            let downloadName = downloadDir.get();
            expect(downloadName.toString(), 'rhel download was not triggered').to.include('rhel');
        });

    tags('dm')
        .it('@sanity should allow users to log-in and download advanced-linux-commands', function () {
            let downloadDir = new DownloadDir();
            let siteUser = new User(process.env.RHD_BASE_URL).rhdAccountDetails();
            let loginPage = new Login();
            let cheatSheet = new CheatSheets('advanced-linux-commands');
            cheatSheet
                .open();
            cheatSheet
                .awaitLoaded();
            cheatSheet
                .loginToDownload();
            loginPage.keycloak
                .loginWith(siteUser);
            cheatSheet
                .awaitDownloadThankYou();
            let downloadName = downloadDir.get();
            expect(downloadName.toString(), 'rhel advanced linux cheatsheet download was not triggered').to.include('rheladvancedlinux_cheat_sheet')
        });

    afterEach(function () {
        let downloadDir = new DownloadDir();
        downloadDir.clear(global.downloadDir);
        new Utils().cleanSession();
    }, 2);
});
