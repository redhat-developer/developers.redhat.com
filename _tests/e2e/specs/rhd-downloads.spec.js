import {Home} from "./support/pages/website/Home.page";
import {Login} from './support/pages/keycloak/Login.page';
import {ProductOverview} from './support/pages/website/ProductOverview.page';
import {CheatSheets} from './support/pages/website/CheatSheets.page';
import {User} from './support/rest/keycloak/Site.user';
import {DownloadDir} from './support/DownloadDir';
import {Utils} from './support/Utils';

const tags = require('mocha-tags');

tags('desktop').describe('Download Manager', function () {
    this.retries(2);
    let downloadDir, downloadName, siteUser;
    let home, login;

    beforeEach(function () {
        this.retries(2);
        new Utils().logout(process.env.RHD_BASE_URL);
        login = new Login();
        home = new Home();
        downloadDir = new DownloadDir();
        downloadDir.clear();
    });

    afterEach(function () {
        this.retries(2);
        new Utils().logout(process.env.RHD_BASE_URL);
        downloadDir.clear(global.downloadDir);
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
                .with(siteUser);
            productOverview
                .awaitDownload();
            downloadName = downloadDir.get();
            expect(downloadName.toString(), 'rhel download was not triggered').to.include('rhel');
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
                .loginToDownload();
            login
                .with(siteUser);
            cheatSheet
                .awaitDownload();
            downloadName = downloadDir.get();
            expect(downloadName.toString(), 'rhel advanced linux cheatsheet download was not triggered').to.include('rheladvancedlinux_cheat_sheet')
        });
});
