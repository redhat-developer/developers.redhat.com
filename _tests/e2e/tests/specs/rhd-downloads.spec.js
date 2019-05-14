import login from './support/pages/KeyCloak.Login.page';
import productOverview from './support/pages/ProductOverview.page';
import cheatSheets from './support/pages/CheatSheets.page';
import downloadDir from './support/utils/DownloadDir';
import utils from './support/utils/Utils';
import driver from './support/utils/Driver.Extension';

// eslint-disable-next-line no-undef
tags('desktop').describe('Product Downloads', function() {
    // eslint-disable-next-line no-invalid-this
    this.retries(2);

    beforeEach(function() {
        utils.allowDownloads();
    });

    it('should allow users to login in and download RHEL', function() {
        productOverview
            .open('rhel', 'download')
            .download();
        login.with(process.env.RHD_KEYCLOAK_ADMIN_USERNAME, process.env.RHD_KEYCLOAK_ADMIN_PASSWORD);
        productOverview.awaitDownloadThankYou();
        const downloadName = downloadDir.get();
        expect(downloadName.toString(), 'rhel download was not triggered').to.include('rhel');
    });

    it('should allow users to log-in and download advanced-linux-commands', function() {
        cheatSheets
            .open('advanced-linux-commands')
            .loginToDownload();

        login.with(process.env.RHD_KEYCLOAK_ADMIN_USERNAME, process.env.RHD_KEYCLOAK_ADMIN_PASSWORD);

        cheatSheets.awaitDownloadThankYou();
        const downloadName = downloadDir.get();
        expect(downloadName.toString(), 'rhel advanced linux cheatsheet download was not triggered').to.include('rheladvancedlinux_cheat_sheet');
    });

    afterEach(function() {
        driver.takeScreenShot();
        downloadDir.clear(global.downloadDir);
        utils.cleanSession();
    });
});
