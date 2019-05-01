import Login from '../support/pages/keycloak/Login.page';
import ProductOverview from '../support/pages/website/ProductOverview.page';
import CheatSheets from '../support/pages/website/CheatSheets.page';
import User from '../support/rest/keycloak/Site.user';
import DownloadDir from '../support/utils/DownloadDir';
import Utils from '../support/utils/Utils';

tags('desktop').describe('Download Manager', function() {
    // eslint-disable-next-line no-invalid-this
    this.retries(2);

    beforeEach(function() {
        DownloadDir.clear(global.downloadDir);
        Utils.cleanSession();
    }, 2);

    it('should allow users to login in and download RHEL', function() {
            const siteUser = new User().rhdAccountDetails();
            ProductOverview
                .open('rhel', 'download')
                .download();
            Login.with(siteUser);
            ProductOverview.awaitHelloWorldPage('rhel');
            ProductOverview.awaitDownloadThankYou();
            const downloadName = DownloadDir.get();
            expect(downloadName.toString(), 'rhel download was not triggered').to.include('rhel');
        });

    it('should allow users to log-in and download advanced-linux-commands', function() {
            const siteUser = new User().rhdAccountDetails();
            CheatSheets
                .open('advanced-linux-commands')
                .loginToDownload();
            Login.with(siteUser);
            CheatSheets.awaitDownloadThankYou();
            const downloadName = DownloadDir.get();
            expect(downloadName.toString(), 'rhel advanced linux cheatsheet download was not triggered').to.include('rheladvancedlinux_cheat_sheet');
        });

    afterEach(function() {
        DownloadDir.clear(global.downloadDir);
        Utils.cleanSession();
    }, 2);
});
