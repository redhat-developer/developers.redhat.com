import login from './support/pages/KeyCloak.Login.page';
import productOverview from './support/pages/ProductOverview.page';
import cheatSheets from './support/pages/CheatSheets.page';
import downloadDir from './support/utils/DownloadDir';
import utils from './support/utils/Utils';
import Driver from "./support/utils/Driver.Extension";

tags('desktop').describe('Download Manager', function() {
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

    /*
        Disabling this in managed paas environments until we can work out how to support downloads of content in lower environments
     */
    it('should allow users to log-in and download advanced-linux-commands', function() {
        if (utils.isManagedPaasEnvironment() === false) {
            cheatSheets
                .open('advanced-linux-commands')
                .loginToDownload();
            login.with(process.env.RHD_KEYCLOAK_ADMIN_USERNAME, process.env.RHD_KEYCLOAK_ADMIN_PASSWORD);
            cheatSheets.awaitDownloadThankYou();
            const downloadName = downloadDir.get();
            expect(downloadName.toString(), 'rhel advanced linux cheatsheet download was not triggered').to.include('rheladvancedlinux_cheat_sheet');
        }
    });

    afterEach(function() {
        Driver.takeScreenShot();
        downloadDir.clear(global.downloadDir);
        utils.cleanSession();
    });
});
