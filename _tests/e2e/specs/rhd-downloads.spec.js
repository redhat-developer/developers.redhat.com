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
    let downloadDir, downloadName, siteUser;
    let home, login, additionalInformation;

    beforeEach(function () {
        new Utils().logout(process.env.RHD_BASE_URL);
        login = new Login();
        home = new Home();
        additionalInformation = new AdditionalInformation();
        downloadDir = new DownloadDir();
        downloadDir.clear();
    }, 2);

    afterEach(function () {
        new Utils().logout(process.env.RHD_BASE_URL);
        downloadDir.clear(global.downloadDir);
    }, 2);

    tags('dm')
        .it('@wip @sanity : should allow users to login in and download RHEL', function () {
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
        }, 2);

    tags('dm')
        .it('@wip @sanity : should allow users to log-in and download advanced-linux-commands', function () {
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
        }, 2);
});
